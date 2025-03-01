# GitHub Copilot Business Features Demo

This interactive demo application showcases the key enterprise features of GitHub Copilot Business for the GitHub Copilot Certification course.

## Demo Overview

This application provides a visual and interactive demonstration of the four key enterprise features that differentiate GitHub Copilot Business from the Individual tier:

1. **Organization-wide Policy Management**: Create, manage, and enforce policies across your entire organization.
2. **Content Exclusion Management**: Prevent sensitive code from being processed by GitHub Copilot.
3. **Audit Logs Explorer**: Monitor GitHub Copilot activity across your organization.
4. **REST API Integration**: Manage GitHub Copilot Business programmatically.

## How to Use This Demo

### Setup

1. Open the demo in a web browser by opening the `index.html` file.
2. No server or build process is required - this is a standalone web application.

### Navigation

The demo is organized into four tabs, each focusing on a specific enterprise feature:

1. **Policy Management Tab**: 
   - Browse and select policies from the left sidebar
   - Configure feature controls, privacy settings, and assignments
   - Save changes to see notification feedback

2. **File Exclusion Tab**:
   - Choose between organization-level, repository-level, or policy-based exclusions
   - Add, edit, or remove exclusion patterns
   - See a live preview of the resulting `.copilotignore` file

3. **Audit Logs Tab**:
   - Filter audit events by type, time range, and user
   - View detailed event information
   - Explore pagination and export functionality

4. **REST API Tab**:
   - Select different API endpoints from the sidebar
   - Configure request parameters
   - Send requests and view formatted JSON responses

## Teaching Points

### Policy Management

- Demonstrate how organizations can create standardized policies for different teams or repositories
- Highlight the ability to control feature availability (suggestions, chat, etc.)
- Show how privacy settings can be managed centrally
- Explain the hierarchy of policy assignments (organization → team → repository)

### Content Exclusion

- Explain the importance of preventing sensitive code from being processed
- Demonstrate the different levels of exclusion (organization, repository, policy)
- Show how pattern matching works with examples
- Discuss best practices for designing exclusion patterns

### Audit Logs

- Highlight the compliance and governance benefits of comprehensive logging
- Show how to filter and search for specific events
- Demonstrate how to investigate potential issues
- Explain the different event types and their significance

### REST API

- Showcase the automation possibilities for seat management
- Demonstrate how to integrate Copilot management into existing workflows
- Explain authentication and permission requirements
- Show example responses and how to parse them

## Customization

This demo can be extended or modified in several ways:

- Add more realistic data to the audit logs
- Implement additional API endpoints
- Create more complex policy examples
- Add visualization of usage statistics

## Technical Details

- Built with vanilla HTML, CSS, and JavaScript
- No external dependencies or frameworks required
- Responsive design works on desktop and tablet devices
- All interactions are simulated - no actual connection to GitHub services

## Credits

Created for the GitHub Copilot Certification course to demonstrate the enterprise features of GitHub Copilot Business. 