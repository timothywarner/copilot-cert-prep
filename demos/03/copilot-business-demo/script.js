// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    initTabs();
    
    // Policy management functionality
    initPolicyManagement();
    
    // File exclusion functionality
    initFileExclusion();
    
    // Audit logs functionality
    initAuditLogs();
    
    // REST API functionality
    initRestApi();
});

/**
 * Initialize tab switching functionality
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

/**
 * Initialize policy management functionality
 */
function initPolicyManagement() {
    // Policy list selection
    const policyItems = document.querySelectorAll('.policy-list li:not(.add-policy)');
    policyItems.forEach(item => {
        item.addEventListener('click', () => {
            policyItems.forEach(pi => pi.classList.remove('selected'));
            item.classList.add('selected');
            
            // In a real app, we would load the policy details here
            // For demo purposes, we'll just update the policy name
            const policyHeader = document.querySelector('.policy-header h3');
            if (policyHeader) {
                policyHeader.textContent = item.textContent.replace(/\s*Default\s*/, '').trim();
            }
        });
    });
    
    // Add policy button
    const addPolicyButton = document.querySelector('.add-policy');
    if (addPolicyButton) {
        addPolicyButton.addEventListener('click', () => {
            alert('In a real application, this would open a form to create a new policy.');
        });
    }
    
    // Toggle switches
    const toggles = document.querySelectorAll('.toggle input[type="checkbox"]');
    toggles.forEach(toggle => {
        toggle.addEventListener('change', () => {
            // In a real app, we would update the policy settings here
            console.log(`Toggle ${toggle.id} changed to ${toggle.checked}`);
        });
    });
    
    // Assignment tabs
    const assignmentTabs = document.querySelectorAll('.assignment-tab');
    const assignmentContents = document.querySelectorAll('.assignment-content');
    
    assignmentTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            assignmentTabs.forEach(t => t.classList.remove('active'));
            assignmentContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding content
            const assignmentType = tab.getAttribute('data-assignment');
            document.getElementById(`${assignmentType}-assignment`).classList.add('active');
        });
    });
    
    // Save changes button
    const saveButton = document.querySelector('.policy-actions .btn-primary');
    if (saveButton) {
        saveButton.addEventListener('click', () => {
            showNotification('Policy saved successfully!', 'success');
        });
    }
}

/**
 * Initialize file exclusion functionality
 */
function initFileExclusion() {
    // Exclusion method selection
    const methodOptions = document.querySelectorAll('.method-option');
    methodOptions.forEach(option => {
        const radio = option.querySelector('input[type="radio"]');
        radio.addEventListener('change', () => {
            methodOptions.forEach(opt => opt.classList.remove('selected'));
            if (radio.checked) {
                option.classList.add('selected');
                
                // Update preview based on selected method
                updateExclusionPreview(radio.id);
            }
        });
    });
    
    // Delete pattern buttons
    const deleteButtons = document.querySelectorAll('.pattern-item:not(.new-pattern) .btn-icon');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const patternItem = e.target.closest('.pattern-item');
            if (patternItem && confirm('Are you sure you want to delete this pattern?')) {
                patternItem.remove();
                updateExclusionPreview();
            }
        });
    });
    
    // Add new pattern
    const newPatternInput = document.querySelector('.new-pattern input');
    const addPatternButton = document.querySelector('.new-pattern .btn-icon');
    
    if (newPatternInput && addPatternButton) {
        addPatternButton.addEventListener('click', () => {
            const pattern = newPatternInput.value.trim();
            if (pattern) {
                addExclusionPattern(pattern);
                newPatternInput.value = '';
                updateExclusionPreview();
            }
        });
        
        newPatternInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const pattern = newPatternInput.value.trim();
                if (pattern) {
                    addExclusionPattern(pattern);
                    newPatternInput.value = '';
                    updateExclusionPreview();
                }
            }
        });
    }
    
    // Save exclusions button
    const saveButton = document.querySelector('.exclusion-config .btn-primary');
    if (saveButton) {
        saveButton.addEventListener('click', () => {
            showNotification('Exclusion patterns saved successfully!', 'success');
        });
    }
}

/**
 * Add a new exclusion pattern to the list
 * @param {string} pattern - The pattern to add
 */
function addExclusionPattern(pattern) {
    const patternList = document.querySelector('.pattern-list');
    const newPatternItem = document.querySelector('.new-pattern');
    
    if (patternList && newPatternItem) {
        const patternItem = document.createElement('div');
        patternItem.className = 'pattern-item';
        patternItem.innerHTML = `
            <input type="text" value="${pattern}" readonly>
            <button class="btn-icon"><i class="fas fa-trash"></i></button>
        `;
        
        // Add delete functionality to the new button
        const deleteButton = patternItem.querySelector('.btn-icon');
        deleteButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this pattern?')) {
                patternItem.remove();
                updateExclusionPreview();
            }
        });
        
        // Insert before the "Add new pattern" item
        patternList.insertBefore(patternItem, newPatternItem);
    }
}

/**
 * Update the exclusion preview based on the selected method and patterns
 * @param {string} methodId - The ID of the selected method radio button
 */
function updateExclusionPreview(methodId) {
    const codePreview = document.querySelector('.code-preview code');
    if (!codePreview) return;
    
    // Get all patterns
    const patterns = [];
    document.querySelectorAll('.pattern-item:not(.new-pattern) input').forEach(input => {
        patterns.push(input.value);
    });
    
    // Generate preview based on method
    let previewContent = '# GitHub Copilot Exclusion File\n# Prevents sensitive code from being processed\n\n';
    
    // Add method-specific header
    if (methodId) {
        if (methodId === 'org-level') {
            previewContent = '# Organization-Level Exclusions\n# Applied to all repositories in the organization\n\n';
        } else if (methodId === 'policy-level') {
            previewContent = '# Policy-Based Exclusions\n# Applied to teams and repositories assigned to this policy\n\n';
        }
    }
    
    // Add standard categories
    previewContent += '# Environment files\n';
    if (patterns.includes('**/.env')) {
        previewContent += '**/.env\n';
    }
    previewContent += '**/.env.*\n**/config/secrets.*\n\n';
    
    previewContent += '# Security-related files\n';
    if (patterns.includes('**/security/*.key')) {
        previewContent += '**/security/*.key\n';
    }
    previewContent += '**/security/*.pem\n**/security/*.cert\n**/certificates/**\n\n';
    
    previewContent += '# Credentials\n';
    if (patterns.includes('**/credentials/**')) {
        previewContent += '**/credentials/**\n';
    }
    previewContent += '**/passwords/**\n**/tokens/**\n\n';
    
    previewContent += '# Proprietary code\n';
    if (patterns.includes('**/proprietary/**')) {
        previewContent += '**/proprietary/**\n';
    }
    previewContent += '**/internal-algorithms/**\n\n';
    
    previewContent += '# Generated code (optional)\n# **/generated/**\n\n';
    
    previewContent += '# Add your custom patterns below\n';
    
    // Add any remaining custom patterns
    patterns.forEach(pattern => {
        if (!['**/.env', '**/security/*.key', '**/credentials/**', '**/proprietary/**'].includes(pattern)) {
            previewContent += `${pattern}\n`;
        }
    });
    
    codePreview.textContent = previewContent;
}

/**
 * Initialize audit logs functionality
 */
function initAuditLogs() {
    // Filter controls
    const filterSelects = document.querySelectorAll('.audit-filters select');
    filterSelects.forEach(select => {
        select.addEventListener('change', () => {
            // In a real app, we would filter the audit logs here
            console.log(`Filter ${select.previousElementSibling.textContent} changed to ${select.value}`);
        });
    });
    
    // Apply filters button
    const applyButton = document.querySelector('.filter-actions .btn-primary');
    if (applyButton) {
        applyButton.addEventListener('click', () => {
            // In a real app, we would apply all filters here
            showNotification('Filters applied', 'success');
        });
    }
    
    // Reset filters button
    const resetButton = document.querySelector('.filter-actions .btn-secondary');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            // Reset all filter controls
            filterSelects.forEach(select => {
                select.selectedIndex = 0;
            });
            
            document.querySelector('.filter-group input').value = '';
            
            showNotification('Filters reset', 'success');
        });
    }
    
    // Export button
    const exportButton = document.querySelector('.results-actions .btn-secondary');
    if (exportButton) {
        exportButton.addEventListener('click', () => {
            showNotification('Audit logs exported to CSV', 'success');
        });
    }
    
    // Info buttons
    const infoButtons = document.querySelectorAll('.audit-table .btn-icon');
    infoButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const row = e.target.closest('tr');
            const event = row.querySelector('.event-type').textContent;
            const user = row.querySelector('td:nth-child(3)').textContent;
            const details = row.querySelector('td:nth-child(4)').textContent;
            
            alert(`Event Details:\n\nEvent: ${event}\nUser: ${user}\nDetails: ${details}`);
        });
    });
    
    // Pagination buttons
    const paginationButtons = document.querySelectorAll('.pagination .btn-icon');
    paginationButtons.forEach(button => {
        button.addEventListener('click', () => {
            // In a real app, we would handle pagination here
            showNotification('Pagination is not implemented in this demo', 'warning');
        });
    });
}

/**
 * Initialize REST API functionality
 */
function initRestApi() {
    // Endpoint selection
    const endpointItems = document.querySelectorAll('.api-endpoints li');
    endpointItems.forEach(item => {
        item.addEventListener('click', () => {
            endpointItems.forEach(ei => ei.classList.remove('selected'));
            item.classList.add('selected');
            
            // In a real app, we would load the endpoint details here
            const endpointName = item.textContent.trim();
            updateApiEndpoint(endpointName);
        });
    });
    
    // Send request button
    const sendButton = document.querySelector('.request-actions .btn-primary');
    if (sendButton) {
        sendButton.addEventListener('click', () => {
            // In a real app, we would send the API request here
            const orgInput = document.querySelector('.param-group input[type="text"]');
            const authInput = document.querySelector('.param-group input[type="password"]');
            
            if (orgInput.value.trim() && authInput.value.trim()) {
                // Simulate API request
                showApiResponse();
            } else {
                showNotification('Please fill in all required fields', 'error');
            }
        });
    }
}

/**
 * Update the API endpoint details
 * @param {string} endpointName - The name of the selected endpoint
 */
function updateApiEndpoint(endpointName) {
    const requestHeader = document.querySelector('.request-header h3');
    const methodSpan = document.querySelector('.method');
    const endpointSpan = document.querySelector('.endpoint');
    const responseStatus = document.querySelector('.response-status');
    const responseBody = document.querySelector('.response-body pre code');
    
    if (!requestHeader || !methodSpan || !endpointSpan || !responseStatus || !responseBody) return;
    
    // Update request details based on endpoint
    requestHeader.textContent = endpointName;
    
    switch (endpointName) {
        case 'List Seats':
            methodSpan.className = 'method get';
            methodSpan.textContent = 'GET';
            endpointSpan.textContent = '/orgs/{org}/copilot/billing/seats';
            break;
        case 'Assign Seats':
            methodSpan.className = 'method post';
            methodSpan.textContent = 'POST';
            endpointSpan.textContent = '/orgs/{org}/copilot/billing/selected_users';
            break;
        case 'Remove Seats':
            methodSpan.className = 'method delete';
            methodSpan.textContent = 'DELETE';
            endpointSpan.textContent = '/orgs/{org}/copilot/billing/selected_users';
            break;
        case 'Get Policies':
            methodSpan.className = 'method get';
            methodSpan.textContent = 'GET';
            endpointSpan.textContent = '/orgs/{org}/copilot/policies';
            break;
        case 'Create Policy':
            methodSpan.className = 'method post';
            methodSpan.textContent = 'POST';
            endpointSpan.textContent = '/orgs/{org}/copilot/policies';
            break;
        case 'Update Policy':
            methodSpan.className = 'method patch';
            methodSpan.textContent = 'PATCH';
            endpointSpan.textContent = '/orgs/{org}/copilot/policies/{policy_id}';
            break;
        case 'Assign Policy':
            methodSpan.className = 'method post';
            methodSpan.textContent = 'POST';
            endpointSpan.textContent = '/orgs/{org}/copilot/policies/{policy_id}/assignments/teams';
            break;
        case 'Get Usage Stats':
            methodSpan.className = 'method get';
            methodSpan.textContent = 'GET';
            endpointSpan.textContent = '/orgs/{org}/copilot/usage';
            break;
    }
    
    // Clear response
    responseStatus.className = 'response-status';
    responseStatus.innerHTML = '<span class="status-code">-</span><span class="status-text">Waiting for request</span>';
    responseBody.textContent = 'Send a request to see the response.';
}

/**
 * Show a simulated API response
 */
function showApiResponse() {
    const responseStatus = document.querySelector('.response-status');
    const responseBody = document.querySelector('.response-body pre code');
    const endpointName = document.querySelector('.request-header h3').textContent;
    
    if (!responseStatus || !responseBody) return;
    
    // Simulate loading
    responseStatus.className = 'response-status';
    responseStatus.innerHTML = '<span class="status-code">-</span><span class="status-text">Loading...</span>';
    responseBody.textContent = 'Sending request...';
    
    // Simulate network delay
    setTimeout(() => {
        responseStatus.className = 'response-status success';
        responseStatus.innerHTML = '<span class="status-code">200</span><span class="status-text">OK</span>';
        
        // Generate response based on endpoint
        let responseJson = '';
        
        switch (endpointName) {
            case 'List Seats':
                responseJson = `{
  "total_seats": 100,
  "assigned_seats": 75,
  "pending_invitations": 5,
  "seats": [
    {
      "assignee": {
        "login": "developer1",
        "id": 1234567,
        "type": "User"
      },
      "assigned_at": "2023-05-15T12:34:56Z",
      "last_activity_at": "2023-06-01T09:12:34Z",
      "last_activity_editor": "vscode"
    },
    {
      "assignee": {
        "login": "developer2",
        "id": 2345678,
        "type": "User"
      },
      "assigned_at": "2023-05-16T10:11:12Z",
      "last_activity_at": "2023-06-02T14:15:16Z",
      "last_activity_editor": "vscode"
    }
    // Additional seat entries...
  ]
}`;
                break;
            case 'Assign Seats':
                responseJson = `{
  "success": true,
  "assigned_users": ["username1", "username2"],
  "failed_assignments": []
}`;
                break;
            case 'Get Policies':
                responseJson = `{
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
    }
    // Additional policy entries...
  ]
}`;
                break;
            case 'Get Usage Stats':
                responseJson = `{
  "total_suggestions": 15243,
  "accepted_suggestions": 8976,
  "active_users": 68,
  "usage_by_day": [
    {
      "date": "2023-06-01",
      "suggestions": 523,
      "acceptances": 312,
      "active_users": 45
    }
    // Additional daily entries...
  ],
  "usage_by_team": [
    {
      "team": "frontend-team",
      "suggestions": 5432,
      "acceptances": 3210,
      "active_users": 12
    }
    // Additional team entries...
  ]
}`;
                break;
            default:
                responseJson = `{
  "success": true,
  "message": "Operation completed successfully",
  "timestamp": "${new Date().toISOString()}"
}`;
        }
        
        responseBody.textContent = responseJson;
        
        showNotification('API request successful', 'success');
    }, 1000);
}

/**
 * Show a notification message
 * @param {string} message - The message to display
 * @param {string} type - The type of notification (success, error, warning)
 */
function showNotification(message, type = 'success') {
    // Check if notification container exists, create if not
    let notificationContainer = document.querySelector('.notification-container');
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
        
        // Add styles for notifications
        const style = document.createElement('style');
        style.textContent = `
            .notification-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
            }
            
            .notification {
                padding: 12px 20px;
                margin-bottom: 10px;
                border-radius: 6px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-width: 300px;
                max-width: 400px;
                animation: slideIn 0.3s ease-out forwards;
            }
            
            .notification.success {
                background-color: #def7ec;
                color: #03543e;
                border-left: 4px solid #0e9f6e;
            }
            
            .notification.error {
                background-color: #fde8e8;
                color: #9b1c1c;
                border-left: 4px solid #f05252;
            }
            
            .notification.warning {
                background-color: #feecdc;
                color: #9a3412;
                border-left: 4px solid #ff5a1f;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: inherit;
                cursor: pointer;
                font-size: 16px;
                opacity: 0.7;
            }
            
            .notification-close:hover {
                opacity: 1;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes fadeOut {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Add to container
    notificationContainer.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
} 