# GitHub Copilot Usage Statistics Script
# Author: Timothy Warner
# Purpose: Gather GitHub Copilot metrics from top 5 organization repositories
# Note: This version excludes sensitive data for public sharing

# Ensure GitHub CLI is installed
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Error "GitHub CLI is not installed. Please install it from https://cli.github.com/"
    exit 1
}

# Configuration
$baseDir = "demos/03"
$outputDir = "$baseDir/github-copilot-stats"
$copilotDir = "$outputDir/copilot"
$date = Get-Date -Format "yyyy-MM-dd"

# Clean up old files
Get-ChildItem -Path $copilotDir -Filter "*-.json" | Remove-Item -Force

# Create output directories
foreach ($dir in @($baseDir, $outputDir, $copilotDir)) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
}

Write-Host "Fetching GitHub Copilot statistics..." -ForegroundColor Cyan

try {
    # Get user and organization info
    $user = gh api user --jq '.login'
    $orgName = gh api user/orgs --jq '.[0].login'
    Write-Host "Using organization: $orgName" -ForegroundColor Yellow
    Write-Host "Authenticated as: $user" -ForegroundColor Yellow

    # 1. Get top 5 repositories by activity
    Write-Host "`nFetching top 5 repositories..."
    $topRepos = gh api "orgs/$orgName/repos?sort=updated&per_page=5" --jq '.[] | {name: .name, updated_at: .updated_at, language: .language}'
    $topRepos | Out-File -FilePath "$copilotDir/top-repos-$date.json"

    # 2. Get Copilot seat usage (non-sensitive data only)
    Write-Host "Fetching Copilot seat summary..."
    $seatSummary = gh api "orgs/$orgName/copilot/billing/seats" --jq '{total_seats: .total_seats, pending_cancellation_seats: .pending_cancellation_seats}'
    $seatSummary | Out-File -FilePath "$copilotDir/seat-summary-$date.json"

    # 3. Try both org and user Copilot metrics
    Write-Host "Fetching Copilot usage metrics..."
    
    # Try organization metrics
    $orgUsage = gh api "orgs/$orgName/copilot/usage" 2>$null
    if ($orgUsage -and $orgUsage -ne "[]") {
        Write-Host "  Found organization-level metrics" -ForegroundColor Green
        $usageData = $orgUsage | ConvertFrom-Json
    }
    else {
        Write-Host "  No organization metrics found, checking user metrics..." -ForegroundColor Yellow
        # Try user metrics
        $userUsage = gh api "user/copilot/usage" 2>$null
        if ($userUsage -and $userUsage -ne "[]") {
            Write-Host "  Found user-level metrics" -ForegroundColor Green
            $usageData = $userUsage | ConvertFrom-Json
        }
        else {
            Write-Host "  No usage metrics found. This could be because:" -ForegroundColor Yellow
            Write-Host "  - Metrics collection was recently enabled and needs time" -ForegroundColor Yellow
            Write-Host "  - No Copilot activity in the measured period" -ForegroundColor Yellow
            Write-Host "  - Missing required permissions" -ForegroundColor Yellow
        }
    }

    # Generate summary report
    Write-Host "`nGitHub Copilot Summary Report" -ForegroundColor Cyan
    Write-Host "----------------------------------------" -ForegroundColor Cyan
    
    # Parse and display summary data
    $seatData = Get-Content "$copilotDir/seat-summary-$date.json" | ConvertFrom-Json
    $repoData = Get-Content "$copilotDir/top-repos-$date.json" | ConvertFrom-Json
    
    Write-Host "`nCopilot Seats:" -ForegroundColor Green
    Write-Host "  Total seats: $($seatData.total_seats)"
    Write-Host "  Pending cancellations: $($seatData.pending_cancellation_seats)"
    
    if ($usageData) {
        Write-Host "`nCopilot Usage Metrics:" -ForegroundColor Green
        $usageData | Select-Object -First 5 | ForEach-Object {
            Write-Host "  Date: $($_.date)"
            Write-Host "    Suggestions shown: $($_.suggestions_shown)"
            Write-Host "    Suggestions accepted: $($_.suggestions_accepted)"
            if ($_.suggestions_shown -gt 0) {
                $rate = [math]::Floor(($_.suggestions_accepted / $_.suggestions_shown) * 100)
                Write-Host "    Acceptance rate: $rate%"
            }
            Write-Host "    Lines suggested: $($_.lines_suggested)"
            Write-Host "    Lines accepted: $($_.lines_accepted)`n"
        }
    }
    
    Write-Host "`nTop 5 Active Repositories:" -ForegroundColor Green
    $repoData | ForEach-Object {
        Write-Host "  - $($_.name) ($($_.language))"
        Write-Host "    Last updated: $($_.updated_at)"
    }

    Write-Host "`nReports saved to: $outputDir" -ForegroundColor Yellow
}
catch {
    Write-Error "Error fetching GitHub statistics: $_"
    exit 1
}
