# Lesson 3: GitHub Copilot Business Features

## Lesson Overview

**Duration**: 20 minutes

**Target Audience**: IT administrators, development team leads, and enterprise developers who need to understand the enterprise-specific features of GitHub Copilot Business.

## Learning Objectives

By the end of this lesson, students will be able to:

1. Configure and manage organization-wide policies for GitHub Copilot
2. Implement content exclusion strategies to protect sensitive code
3. Monitor Copilot usage through audit logs
4. Automate Copilot administration using the REST API

## Required Materials

- GitHub Copilot Business subscription
- Administrator access to a GitHub organization
- Visual Studio Code with GitHub Copilot extension
- Demo application files (`copilot-business-demo/`)
- Documentation guides:
  - File Exclusion Guide
  - Policy Management Guide
  - Audit Logs Guide
  - REST API Guide

## Lesson Structure

### 1. Introduction (2 minutes)

- Welcome students and introduce the focus on GitHub Copilot Business features
- Highlight the key differences between Individual and Business tiers
- Explain the importance of these features for enterprise environments

### 2. Organization-wide Policy Management (5 minutes)

- Explain the concept of centralized policy management
- Demonstrate the policy management interface in the demo application
- Cover key policy components:
  - Feature controls (enabling/disabling specific Copilot features)
  - Privacy settings
  - Assignment hierarchy (organization → team → repository)
- Show how to create, edit, and assign policies
- Discuss best practices for policy design

### 3. Content Exclusion Strategies (5 minutes)

- Explain why organizations need to exclude sensitive code from AI processing
- Demonstrate the three exclusion methods:
  - Organization-level exclusions
  - Repository-level exclusions via `.copilotignore`
  - Policy-based exclusions
- Show pattern syntax and examples
- Discuss best practices for designing exclusion patterns
- Demonstrate how to verify exclusions are working

### 4. Audit Logs and Monitoring (4 minutes)

- Explain the compliance and governance benefits of audit logging
- Demonstrate the audit logs interface in the demo application
- Cover the different types of audit events:
  - Access events
  - Policy events
  - Feature usage events
  - Content exclusion events
- Show how to filter and search for specific events
- Discuss monitoring strategies and reporting

### 5. REST API Integration (3 minutes)

- Explain the benefits of programmatic management
- Demonstrate the REST API explorer in the demo application
- Cover key API endpoints:
  - Seat management
  - Policy management
  - Usage statistics
- Show example API requests and responses
- Discuss automation scenarios and integration possibilities

### 6. Conclusion and Q&A (1 minute)

- Recap the key enterprise features of GitHub Copilot Business
- Emphasize the importance of proper configuration for security and compliance
- Address any questions from students

## Teaching Tips

- **Hands-on Approach**: Encourage students to follow along with the demo application on their own devices.
- **Real-world Examples**: Share specific use cases where these features have helped organizations.
- **Interactive Questioning**: Pause regularly to ask students how they might apply these features in their environment.
- **Visual Learning**: Use the demo application to visually reinforce concepts.
- **Practical Application**: Discuss how these features address common enterprise concerns around AI code generation.

## Assessment Ideas

- **Policy Design Challenge**: Have students design a policy for a specific scenario (e.g., financial services company, healthcare organization).
- **Exclusion Pattern Exercise**: Provide a list of sensitive files and have students create appropriate exclusion patterns.
- **Audit Scenario Analysis**: Present an audit log and ask students to identify potential issues or compliance concerns.
- **API Integration Planning**: Have students outline how they would integrate Copilot management into their existing workflows.

## Extended Learning Resources

- [GitHub Copilot for Business documentation](https://docs.github.com/en/enterprise-cloud@latest/copilot/overview-of-github-copilot/about-github-copilot-for-business)
- [GitHub Copilot Trust Center](https://resources.github.com/copilot-trust-center/)
- [GitHub REST API documentation](https://docs.github.com/en/rest/copilot)
- [GitHub Advanced Security integration](https://docs.github.com/en/get-started/learning-about-github/about-github-advanced-security)

## Adaptations for Different Audiences

### For IT Administrators

- Focus more on policy management, audit logs, and compliance aspects
- Emphasize integration with existing security tools and workflows
- Discuss user management and license allocation strategies

### For Development Team Leads

- Focus more on balancing security with developer productivity
- Discuss strategies for designing appropriate exclusion patterns
- Emphasize monitoring team usage and adoption metrics

### For Enterprise Developers

- Focus more on how policies and exclusions affect their daily workflow
- Discuss best practices for working within organizational constraints
- Emphasize the benefits of standardized configurations across teams 