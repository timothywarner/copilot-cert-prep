# Lesson 3: GitHub Copilot Business Features Demo

This demo folder contains materials to help instructors demonstrate the key features of GitHub Copilot Business during training sessions.

## Lesson Objectives

- 3.1 Exclude specific files from GitHub Copilot suggestions
- 3.2 Establish organization-wide policy management for AI usage
- 3.3 Learn the purpose and use of organization audit logs to monitor GitHub Copilot activity
- 3.4 Manage GitHub Copilot Business subscriptions via the REST API

## Demo Contents

1. **Policy Management Dashboard**: An interactive demo showing how to configure organization-wide policies
2. **File Exclusion Guide**: Documentation on configuring content exclusions at the organization level
3. **Audit Logs Explorer**: A visualization tool demonstrating how to monitor Copilot usage
4. **REST API Examples**: Code samples for managing Copilot Business programmatically

## How to Use This Demo

1. Walk through the `copilot-business-demo` application to show organization-level controls
2. Use the file exclusion guide to demonstrate how to protect sensitive code
3. Explore the audit logs visualization to show monitoring capabilities
4. Review the REST API examples for programmatic management

## Teaching Tips

- Emphasize the enterprise-focused features that differentiate Business from Individual
- Highlight compliance and governance benefits for regulated industries
- Demonstrate how centralized management reduces administrative overhead
- Show real-world examples of policy configurations for different organization types
- Connect features to specific business needs (security, compliance, IP protection)

## Additional Resources

- [GitHub Copilot for Business Documentation](https://docs.github.com/en/enterprise-cloud@latest/copilot/overview-of-github-copilot/about-github-copilot-for-business)
- [GitHub Copilot Policy Management](https://docs.github.com/en/enterprise-cloud@latest/copilot/configuring-github-copilot/configuring-github-copilot-settings-in-your-organization)
- [GitHub Copilot Audit Logs](https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/audit-log-events-for-your-enterprise#github_copilot-category-actions)
- [GitHub Copilot REST API](https://docs.github.com/en/rest/copilot)

# GitHub Organization Statistics Script

This PowerShell script uses the GitHub CLI to fetch comprehensive statistics about a GitHub organization, with a focus on GitHub Copilot usage.

## Purpose

This script demonstrates how to use the GitHub CLI to:

1. Fetch GitHub Copilot usage statistics
2. Gather repository information
3. Collect user and team data
4. Retrieve security information
5. Access billing data

## Prerequisites

- [GitHub CLI](https://cli.github.com/) installed
- PowerShell 5.1 or higher
- Appropriate permissions in the GitHub organization

## Usage

1. Authenticate with GitHub CLI:
   ```powershell
   gh auth login
   ```

2. Edit the script to set your organization name:
   ```powershell
   $orgName = "YOUR-ORGANIZATION-NAME"
   ```

3. Run the script:
   ```powershell
   pwsh -File gh-cli-audit-log.ps1
   ```

## Security Considerations

- **NEVER hardcode authentication tokens in scripts**
- The script collects potentially sensitive organization data
- Review collected data before sharing
- Consider using environment variables for authentication

## Data Collected

The script collects and organizes data into the following categories:

### Copilot Data
- Seat assignments
- Business usage statistics
- User access information
- Audit log entries related to Copilot

### Repository Data
- Repository list and details
- Commit activity
- Contributor information
- Summary statistics (stars, forks, issues)

### User Data
- Organization members
- Team information
- Team memberships

### Security Data
- Security managers
- Security advisories
- Secret scanning alerts

### Billing Data
- GitHub Actions usage
- Packages usage
- Shared storage usage

## Output

The script creates a directory structure with JSON files containing the collected data:

```
github-stats/
├── copilot/
├── repositories/
├── users/
├── security/
└── billing/
```

A summary of key statistics is displayed in the console after execution.

## Educational Use

This script is intended for educational purposes to demonstrate GitHub API capabilities. Use responsibly and with appropriate permissions.

## Author

Timothy Warner 