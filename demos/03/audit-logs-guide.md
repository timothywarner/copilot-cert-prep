# GitHub Copilot Business: Audit Logs and Monitoring Guide

This guide demonstrates how to use GitHub's audit logs to monitor GitHub Copilot activity across your organization, providing visibility into usage patterns and potential policy violations.

## Audit Logging Overview

GitHub Copilot Business includes comprehensive audit logging capabilities that allow organization administrators to:

- Monitor Copilot usage across the organization
- Track policy changes and enforcement
- Identify potential security or compliance issues
- Generate reports for governance requirements

## Types of Audit Events

GitHub Copilot generates several types of audit events:

### Access Events

- **Copilot.access**: Records when a user accesses GitHub Copilot
- **Copilot.block**: Records when a user is blocked from using Copilot due to policy restrictions

### Policy Events

- **Copilot.policy.creation**: Records when a new policy is created
- **Copilot.policy.deletion**: Records when a policy is deleted
- **Copilot.policy.update**: Records when a policy is modified
- **Copilot.policy.assignment**: Records when a policy is assigned to a team or repository

### Feature Usage Events

- **Copilot.feature.suggestion**: Records when code suggestions are provided
- **Copilot.feature.accept**: Records when a user accepts a suggestion
- **Copilot.feature.reject**: Records when a user rejects a suggestion
- **Copilot.feature.chat**: Records usage of GitHub Copilot Chat

### Content Exclusion Events

- **Copilot.exclusion.creation**: Records when a content exclusion pattern is created
- **Copilot.exclusion.deletion**: Records when a content exclusion pattern is deleted
- **Copilot.exclusion.match**: Records when Copilot is prevented from analyzing content due to an exclusion pattern

## Accessing Audit Logs

### Organization Audit Logs

For organization administrators:

1. **Navigate to Organization Settings**:
   - Go to your organization's GitHub page
   - Click "Settings" in the top navigation
   - Select "Audit log" from the sidebar menu

2. **Filter for Copilot Events**:
   - Use the search field to filter for "Copilot"
   - Or use the category filter to select "GitHub Copilot"

### Enterprise Audit Logs

For enterprise administrators:

1. **Navigate to Enterprise Settings**:
   - Go to your enterprise dashboard
   - Click "Policies" in the sidebar
   - Select "Audit log"

2. **Filter for Copilot Events**:
   - Use the search field to filter for "Copilot"
   - Or use the category filter to select "GitHub Copilot"

## Understanding Audit Log Entries

Each audit log entry contains detailed information:

```json
{
  "action": "copilot.policy.assignment",
  "actor": "admin-username",
  "actor_ip": "192.0.2.1",
  "actor_location": {
    "country_code": "US"
  },
  "created_at": "2023-06-15T16:34:21Z",
  "org": "example-org",
  "target_policy": "security-policy",
  "target_team": "security-team",
  "user_agent": "Mozilla/5.0..."
}
```

Key fields include:

- **action**: The specific event type
- **actor**: The user who performed the action
- **created_at**: When the event occurred
- **target_policy/target_team/target_repo**: The affected resources
- **additional_details**: Context-specific information about the event

## Monitoring Strategies

### Regular Review

Establish a routine for reviewing Copilot audit logs:

1. **Daily Review**:
   - Check for policy violations
   - Monitor for unusual access patterns

2. **Weekly Review**:
   - Analyze usage patterns
   - Identify potential policy improvements

3. **Monthly Review**:
   - Generate compliance reports
   - Review effectiveness of policies

### Automated Alerting

Set up automated alerts for critical events:

1. **Using GitHub Advanced Security**:
   - Configure custom alerts for specific Copilot events
   - Set up notification channels (email, Slack, etc.)

2. **Using External SIEM Tools**:
   - Export audit logs to your Security Information and Event Management system
   - Configure alerts based on your security policies

### Compliance Reporting

Generate reports for compliance requirements:

1. **Export Audit Logs**:
   - Use the GitHub API to export logs
   - Filter for relevant time periods and event types

2. **Create Compliance Reports**:
   - Summarize Copilot usage
   - Document policy enforcement
   - Highlight any remediated issues

## Example Monitoring Scenarios

### Security Monitoring

Monitor for potential security issues:

1. **Excluded Content Access Attempts**:
   - Filter for `Copilot.exclusion.match` events
   - Identify users repeatedly attempting to use Copilot with sensitive code

2. **Unusual Usage Patterns**:
   - Look for access from unusual locations
   - Monitor for off-hours usage

3. **Policy Bypass Attempts**:
   - Monitor for users attempting to use features disabled by policy
   - Track failed access attempts

### Compliance Monitoring

Ensure adherence to organizational policies:

1. **Policy Changes**:
   - Track all policy creation, update, and deletion events
   - Verify changes were authorized

2. **Policy Assignment**:
   - Monitor policy assignments to teams and repositories
   - Ensure sensitive repositories have appropriate policies

3. **Feature Usage Compliance**:
   - Verify that restricted features are not being used
   - Monitor acceptance rates of suggestions in regulated code areas

### Usage Analytics

Understand how Copilot is being used across your organization:

1. **Adoption Metrics**:
   - Track unique users accessing Copilot
   - Monitor usage frequency by team

2. **Feature Utilization**:
   - Analyze which Copilot features are most used
   - Track suggestion acceptance rates

3. **ROI Analysis**:
   - Correlate Copilot usage with development velocity
   - Identify teams benefiting most from Copilot

## Audit Log API Integration

For programmatic access to audit logs:

### Using the GitHub REST API

```bash
# Get Copilot audit log events for an organization
curl -H "Authorization: token YOUR_TOKEN" \
     -H "Accept: application/vnd.github.v3+json" \
     "https://api.github.com/orgs/YOUR_ORG/audit-log?phrase=action:copilot"
```

### Using the GraphQL API

```graphql
query {
  organization(login: "your-org") {
    auditLog(first: 100, query: "action:copilot") {
      edges {
        node {
          ... on AuditEntry {
            action
            actorLogin
            createdAt
            operationType
            user {
              login
            }
          }
        }
      }
    }
  }
}
```

## Best Practices for Audit Log Management

### Data Retention

- **Define Retention Periods**: Establish how long audit logs should be retained
- **Archive Historical Data**: Set up a process for archiving older logs
- **Compliance Alignment**: Ensure retention periods meet regulatory requirements

### Access Control

- **Limit Access**: Restrict audit log access to security and compliance teams
- **Role-Based Access**: Define specific roles for audit log review
- **Document Access**: Keep records of who accessed audit logs and why

### Incident Response

- **Define Procedures**: Create clear procedures for responding to audit log alerts
- **Escalation Path**: Establish who should be notified for different types of events
- **Documentation**: Maintain records of incidents and responses

## Demo Exercise: Setting Up an Audit Monitoring System

1. **Define Monitoring Requirements**:
   - Identify critical events to monitor
   - Determine review frequency
   - Establish alerting thresholds

2. **Create Filtering Templates**:
   - Develop search queries for common monitoring scenarios
   - Create saved filters for regular reviews

3. **Design Reporting Process**:
   - Create templates for compliance reports
   - Define reporting schedule
   - Identify report recipients

4. **Implement Automation**:
   - Set up automated exports of audit data
   - Configure alerts for critical events
   - Create dashboards for visualizing audit data

## Troubleshooting

### Common Issues

1. **Missing Events**:
   - Verify audit logging is enabled
   - Check user permissions
   - Ensure correct filtering criteria

2. **Too Many Events**:
   - Refine filtering criteria
   - Focus on high-priority event types
   - Consider aggregating similar events

3. **API Rate Limiting**:
   - Implement pagination for large data sets
   - Use conditional requests to reduce API calls
   - Consider batching requests 