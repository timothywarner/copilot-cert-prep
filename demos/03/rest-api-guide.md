# GitHub Copilot Business: REST API Integration Guide

This guide demonstrates how to use the GitHub REST API to manage GitHub Copilot Business subscriptions, settings, and policies programmatically, enabling automation of administrative tasks.

## API Overview

GitHub provides REST API endpoints that allow organization administrators to:

- Manage Copilot Business seat assignments
- Configure organization-wide policies
- Monitor usage and adoption
- Automate administrative workflows

## Authentication

Before using the API, you need to authenticate:

### Creating a Personal Access Token (PAT)

1. **Navigate to GitHub Settings**:
   - Go to your GitHub profile
   - Click "Settings" → "Developer settings" → "Personal access tokens" → "Fine-grained tokens"

2. **Generate a New Token**:
   - Click "Generate new token"
   - Name your token (e.g., "Copilot Business Administration")
   - Set an expiration date
   - Select the organization where you'll use the token

3. **Set Permissions**:
   - For Organization permissions:
     - "Copilot" → "Read and write"
     - "Members" → "Read" (for seat management)
   - For Repository permissions (if needed):
     - "Contents" → "Read"

4. **Generate and Save the Token**:
   - Click "Generate token"
   - Copy and securely store the token value

## Managing Seat Assignments

### Listing Copilot Seats

```bash
# List all seats in your organization
curl -X GET \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer YOUR_PAT" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "https://api.github.com/orgs/YOUR_ORG/copilot/billing/seats"
```

Response format:
```json
{
  "total_seats": 100,
  "assigned_seats": 75,
  "pending_invitations": 5,
  "seats": [
    {
      "assignee": {
        "login": "username",
        "id": 1234567,
        "type": "User"
      },
      "assigned_at": "2023-05-15T12:34:56Z",
      "last_activity_at": "2023-06-01T09:12:34Z",
      "last_activity_editor": "vscode"
    },
    // Additional seat entries...
  ]
}
```

### Assigning Seats

```bash
# Assign seats to specific users
curl -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer YOUR_PAT" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  -d '{"selected_usernames":["username1","username2"]}' \
  "https://api.github.com/orgs/YOUR_ORG/copilot/billing/selected_users"
```

### Removing Seat Assignments

```bash
# Remove seat assignments
curl -X DELETE \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer YOUR_PAT" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  -d '{"selected_usernames":["username1","username2"]}' \
  "https://api.github.com/orgs/YOUR_ORG/copilot/billing/selected_users"
```

## Managing Policies

### Retrieving Current Policies

```bash
# Get organization policies
curl -X GET \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer YOUR_PAT" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "https://api.github.com/orgs/YOUR_ORG/copilot/policies"
```

Response format:
```json
{
  "policies": [
    {
      "id": "pol_12345abcde",
      "name": "Security Policy",
      "description": "Policy for security-sensitive teams",
      "created_at": "2023-05-10T14:23:45Z",
      "updated_at": "2023-05-15T09:12:34Z",
      "settings": {
        "feature_flags": {
          "chat_enabled": true,
          "code_suggestions_enabled": true
        },
        "privacy": {
          "allow_telemetry": false
        },
        "exclusions": {
          "patterns": [
            "**/.env",
            "**/security/*.key"
          ]
        }
      },
      "assignments": {
        "teams": ["security-team", "compliance-team"],
        "repositories": []
      }
    },
    // Additional policy entries...
  ]
}
```

### Creating a New Policy

```bash
# Create a new policy
curl -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer YOUR_PAT" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  -d '{
    "name": "Development Policy",
    "description": "Standard policy for development teams",
    "settings": {
      "feature_flags": {
        "chat_enabled": true,
        "code_suggestions_enabled": true
      },
      "privacy": {
        "allow_telemetry": true
      },
      "exclusions": {
        "patterns": ["**/sensitive-data/*"]
      }
    }
  }' \
  "https://api.github.com/orgs/YOUR_ORG/copilot/policies"
```

### Updating an Existing Policy

```bash
# Update a policy
curl -X PATCH \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer YOUR_PAT" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  -d '{
    "description": "Updated policy for development teams",
    "settings": {
      "feature_flags": {
        "chat_enabled": false
      }
    }
  }' \
  "https://api.github.com/orgs/YOUR_ORG/copilot/policies/pol_12345abcde"
```

### Assigning Policies

```bash
# Assign policy to teams
curl -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer YOUR_PAT" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  -d '{
    "team_slugs": ["frontend-team", "backend-team"]
  }' \
  "https://api.github.com/orgs/YOUR_ORG/copilot/policies/pol_12345abcde/assignments/teams"

# Assign policy to repositories
curl -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer YOUR_PAT" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  -d '{
    "repository_names": ["org/repo1", "org/repo2"]
  }' \
  "https://api.github.com/orgs/YOUR_ORG/copilot/policies/pol_12345abcde/assignments/repositories"
```

## Monitoring Usage

### Getting Usage Statistics

```bash
# Get organization-wide usage statistics
curl -X GET \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer YOUR_PAT" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "https://api.github.com/orgs/YOUR_ORG/copilot/usage"
```

Response format:
```json
{
  "total_suggestions": 15243,
  "accepted_suggestions": 8976,
  "active_users": 68,
  "usage_by_day": [
    {
      "date": "2023-06-01",
      "suggestions": 523,
      "acceptances": 312,
      "active_users": 45
    },
    // Additional daily entries...
  ],
  "usage_by_team": [
    {
      "team": "frontend-team",
      "suggestions": 5432,
      "acceptances": 3210,
      "active_users": 12
    },
    // Additional team entries...
  ]
}
```

## Automation Examples

### Onboarding Script

This example shows how to automatically assign Copilot seats to new team members:

```python
#!/usr/bin/env python3
import requests
import json
import sys

# Configuration
ORG_NAME = "your-organization"
TEAM_SLUG = "development-team"
PAT = "your_personal_access_token"
POLICY_ID = "pol_12345abcde"

# API Headers
headers = {
    "Accept": "application/vnd.github+json",
    "Authorization": f"Bearer {PAT}",
    "X-GitHub-Api-Version": "2022-11-28"
}

# Get team members
team_members_url = f"https://api.github.com/orgs/{ORG_NAME}/teams/{TEAM_SLUG}/members"
response = requests.get(team_members_url, headers=headers)
if response.status_code != 200:
    print(f"Error getting team members: {response.status_code}")
    sys.exit(1)

team_members = [member["login"] for member in response.json()]

# Get current Copilot seat assignments
seats_url = f"https://api.github.com/orgs/{ORG_NAME}/copilot/billing/seats"
response = requests.get(seats_url, headers=headers)
if response.status_code != 200:
    print(f"Error getting seat assignments: {response.status_code}")
    sys.exit(1)

assigned_users = [seat["assignee"]["login"] for seat in response.json().get("seats", [])]

# Find team members without Copilot seats
users_to_assign = [user for user in team_members if user not in assigned_users]

if not users_to_assign:
    print("All team members already have Copilot seats assigned.")
    sys.exit(0)

# Assign seats to users
assign_url = f"https://api.github.com/orgs/{ORG_NAME}/copilot/billing/selected_users"
data = {"selected_usernames": users_to_assign}
response = requests.post(assign_url, headers=headers, json=data)

if response.status_code == 204:
    print(f"Successfully assigned Copilot seats to {len(users_to_assign)} users.")
else:
    print(f"Error assigning seats: {response.status_code}")
    print(response.text)
```

### Policy Compliance Checker

This example checks repositories for proper policy assignments:

```python
#!/usr/bin/env python3
import requests
import json
import sys

# Configuration
ORG_NAME = "your-organization"
PAT = "your_personal_access_token"
SECURITY_POLICY_ID = "pol_security123"
SECURITY_TEAM_REPOS = ["security-repo1", "security-repo2"]

# API Headers
headers = {
    "Accept": "application/vnd.github+json",
    "Authorization": f"Bearer {PAT}",
    "X-GitHub-Api-Version": "2022-11-28"
}

# Get policy assignments
policy_url = f"https://api.github.com/orgs/{ORG_NAME}/copilot/policies/{SECURITY_POLICY_ID}"
response = requests.get(policy_url, headers=headers)
if response.status_code != 200:
    print(f"Error getting policy: {response.status_code}")
    sys.exit(1)

policy_data = response.json()
assigned_repos = [repo["name"] for repo in policy_data.get("assignments", {}).get("repositories", [])]

# Check for unassigned security repositories
unassigned_repos = [repo for repo in SECURITY_TEAM_REPOS if repo not in assigned_repos]

if not unassigned_repos:
    print("All security repositories have the security policy assigned.")
    sys.exit(0)

# Assign policy to unassigned repositories
assign_url = f"https://api.github.com/orgs/{ORG_NAME}/copilot/policies/{SECURITY_POLICY_ID}/assignments/repositories"
data = {"repository_names": [f"{ORG_NAME}/{repo}" for repo in unassigned_repos]}
response = requests.post(assign_url, headers=headers, json=data)

if response.status_code == 204:
    print(f"Successfully assigned security policy to {len(unassigned_repos)} repositories.")
else:
    print(f"Error assigning policy: {response.status_code}")
    print(response.text)
```

## GitHub Actions Integration

### Automated Seat Management Workflow

Create a GitHub Actions workflow file (`.github/workflows/copilot-seat-management.yml`):

```yaml
name: Copilot Seat Management

on:
  schedule:
    - cron: '0 0 * * 1'  # Run weekly on Mondays
  workflow_dispatch:     # Allow manual triggering

jobs:
  manage-seats:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
        
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.10'
          
      - name: Install dependencies
        run: pip install requests
        
      - name: Run seat management script
        env:
          GITHUB_TOKEN: ${{ secrets.COPILOT_ADMIN_PAT }}
          ORG_NAME: ${{ secrets.ORG_NAME }}
        run: python .github/scripts/manage-copilot-seats.py
```

## Best Practices for API Usage

### Rate Limiting

- **Monitor Rate Limits**: Check the `X-RateLimit-*` headers in API responses
- **Implement Exponential Backoff**: When approaching rate limits
- **Use Conditional Requests**: Include `If-None-Match` with ETags to reduce rate limit consumption

### Security Considerations

- **Rotate PATs Regularly**: Set up a schedule for rotating access tokens
- **Use Least Privilege**: Only request the permissions your integration needs
- **Secure Token Storage**: Store tokens in secure locations (e.g., GitHub Secrets)
- **Audit API Usage**: Regularly review API access logs

### Error Handling

- **Implement Robust Error Handling**: Check status codes and handle errors gracefully
- **Log API Interactions**: Maintain logs of API calls for troubleshooting
- **Set Up Monitoring**: Alert on repeated failures or unexpected responses

## Troubleshooting

### Common API Issues

1. **Authentication Errors (401)**:
   - Verify your PAT has not expired
   - Ensure the PAT has the correct permissions
   - Check that the organization access is granted

2. **Permission Errors (403)**:
   - Verify you have admin permissions in the organization
   - Check if the organization has Copilot Business enabled
   - Ensure your PAT has the necessary scopes

3. **Not Found Errors (404)**:
   - Verify organization name, repository names, and policy IDs
   - Check if resources have been deleted or renamed

4. **Validation Errors (422)**:
   - Review the error message for specific validation failures
   - Ensure request payloads match the expected format
   - Check for typos in field names

## Demo Exercise: Building a Copilot Dashboard

This exercise demonstrates how to build a simple dashboard for monitoring Copilot usage:

1. **Set Up the Project**:
   - Create a new repository
   - Set up a web application framework (e.g., Flask, Express)
   - Configure authentication with GitHub OAuth

2. **Implement API Integration**:
   - Create service classes for Copilot API endpoints
   - Implement caching to reduce API calls
   - Set up scheduled data collection

3. **Build Dashboard Views**:
   - Usage statistics by team and repository
   - Seat allocation and utilization
   - Policy compliance monitoring
   - Cost and ROI analysis

4. **Deploy and Share**:
   - Deploy the dashboard to a secure environment
   - Share access with stakeholders
   - Set up automated reporting 