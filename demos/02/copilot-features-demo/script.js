/**
 * GitHub Copilot Features Demo
 * Interactive JavaScript for the demo application
 */

document.addEventListener('DOMContentLoaded', () => {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Accept/Reject button functionality
    const acceptButtons = document.querySelectorAll('.accept-btn');
    const rejectButtons = document.querySelectorAll('.reject-btn');

    acceptButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const suggestionElement = e.target.closest('.copilot-suggestion');
            const codeEditor = suggestionElement.closest('.code-editor');
            
            // Simulate accepting the suggestion
            suggestionElement.style.backgroundColor = 'rgba(46, 160, 67, 0.3)';
            button.textContent = 'Accepted ✓';
            button.disabled = true;
            
            // Show a success message
            const message = document.createElement('div');
            message.className = 'success-message';
            message.textContent = 'Suggestion accepted! In a real IDE, this code would be inserted into your editor.';
            message.style.padding = '0.5rem 1rem';
            message.style.backgroundColor = 'rgba(46, 160, 67, 0.2)';
            message.style.borderTop = '1px dashed var(--border-color)';
            message.style.fontSize = '0.9rem';
            
            // Add the message after the suggestion actions
            suggestionElement.appendChild(message);
            
            // Disable the reject button
            const rejectBtn = suggestionElement.querySelector('.reject-btn');
            rejectBtn.disabled = true;
        });
    });

    rejectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const suggestionElement = e.target.closest('.copilot-suggestion');
            
            // Simulate rejecting the suggestion
            suggestionElement.style.backgroundColor = 'rgba(248, 81, 73, 0.15)';
            button.textContent = 'Rejected ✗';
            button.disabled = true;
            
            // Show a message
            const message = document.createElement('div');
            message.className = 'reject-message';
            message.textContent = 'Suggestion rejected! In a real IDE, this suggestion would be dismissed.';
            message.style.padding = '0.5rem 1rem';
            message.style.backgroundColor = 'rgba(248, 81, 73, 0.1)';
            message.style.borderTop = '1px dashed var(--border-color)';
            message.style.fontSize = '0.9rem';
            
            // Add the message after the suggestion actions
            suggestionElement.appendChild(message);
            
            // Disable the accept button
            const acceptBtn = suggestionElement.querySelector('.accept-btn');
            acceptBtn.disabled = true;
        });
    });

    // Settings interaction
    const inlineSuggestions = document.querySelector('.setting-card:nth-child(1) input');
    const tabCompletion = document.querySelector('.setting-card:nth-child(2) input');
    const suggestionDelay = document.querySelector('.setting-card:nth-child(3) input');
    const delayValue = document.querySelector('.setting-card:nth-child(3) p');
    const languageSupport = document.querySelector('.setting-card:nth-child(4) select');

    // Update delay value display
    suggestionDelay.addEventListener('input', () => {
        delayValue.textContent = `${suggestionDelay.value}ms`;
    });

    // Toggle inline suggestions
    inlineSuggestions.addEventListener('change', () => {
        const suggestions = document.querySelectorAll('.copilot-suggestion');
        suggestions.forEach(suggestion => {
            suggestion.style.display = inlineSuggestions.checked ? 'block' : 'none';
        });
        
        // Show a notification
        showNotification(
            inlineSuggestions.checked 
                ? 'Inline suggestions enabled' 
                : 'Inline suggestions disabled'
        );
    });

    // Toggle tab completion
    tabCompletion.addEventListener('change', () => {
        const acceptBtns = document.querySelectorAll('.accept-btn');
        acceptBtns.forEach(btn => {
            btn.textContent = tabCompletion.checked ? 'Accept (Tab)' : 'Accept';
        });
        
        // Show a notification
        showNotification(
            tabCompletion.checked 
                ? 'Tab completion enabled' 
                : 'Tab completion disabled'
        );
    });

    // Change language support
    languageSupport.addEventListener('change', () => {
        // Show a notification
        showNotification(`Language support changed to: ${languageSupport.value}`);
    });

    // Function to show a notification
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: 'var(--secondary-color)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '4px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            zIndex: '1000',
            transition: 'opacity 0.3s, transform 0.3s',
            opacity: '0',
            transform: 'translateY(10px)'
        });
        
        // Add to document
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(10px)';
            
            // Remove from DOM after animation
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Add Copilot logo
    const logoImg = document.querySelector('.logo');
    logoImg.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDEuNUMxMiAxLjUgNS4yNSA1LjI1IDQuNSA1LjI1QzMuNzUgNS4yNSAzIDYgMyA2Ljc1QzMgNy41IDMgMTYuNSAzIDE2LjVDMyAxNi41IDMgMTcuMjUgMy43NSAxNy4yNUM0LjUgMTcuMjUgMTIgMjEgMTIgMjFDMTIgMjEgMTkuNSAxNy4yNSAyMC4yNSAxNy4yNUMyMSAxNy4yNSAyMS43NSAxNi41IDIxLjc1IDE1Ljc1QzIxLjc1IDE1IDIxLjc1IDYgMjEuNzUgNkMyMS43NSA2IDIxLjc1IDUuMjUgMjEgNS4yNUMyMC4yNSA1LjI1IDEyIDEuNSAxMiAxLjVaIiBmaWxsPSIjMkVBNDRGIi8+CjxwYXRoIGQ9Ik0xMiA0LjVDMTIgNC41IDcuNSA3LjEyNSA2Ljc1IDcuMTI1QzYgNy4xMjUgNS4yNSA3Ljg3NSA1LjI1IDguNjI1QzUuMjUgOS4zNzUgNS4yNSAxNS4zNzUgNS4yNSAxNS4zNzVDNS4yNSAxNS4zNzUgNS4yNSAxNi4xMjUgNiAxNi4xMjVDNi43NSAxNi4xMjUgMTIgMTguNzUgMTIgMTguNzVDMTIgMTguNzUgMTcuMjUgMTYuMTI1IDE4IDE2LjEyNUMxOC43NSAxNi4xMjUgMTkuNSAxNS4zNzUgMTkuNSAxNC42MjVDMTkuNSAxMy44NzUgMTkuNSA3Ljg3NSAxOS41IDcuODc1QzE5LjUgNy44NzUgMTkuNSA3LjEyNSAxOC43NSA3LjEyNUMxOCA3LjEyNSAxMiA0LjUgMTIgNC41WiIgZmlsbD0iIzFGNzAzQiIvPgo8cGF0aCBkPSJNMTIgNy41QzEyIDcuNSA5IDkuMzc1IDguMjUgOS4zNzVDNy41IDkuMzc1IDYuNzUgMTAuMTI1IDYuNzUgMTAuODc1QzYuNzUgMTEuNjI1IDYuNzUgMTQuMTI1IDYuNzUgMTQuMTI1QzYuNzUgMTQuMTI1IDYuNzUgMTQuODc1IDcuNSAxNC44NzVDOC4yNSAxNC44NzUgMTIgMTYuNSAxMiAxNi41QzEyIDE2LjUgMTUuNzUgMTQuODc1IDE2LjUgMTQuODc1QzE3LjI1IDE0Ljg3NSAxOCAxNC4xMjUgMTggMTMuMzc1QzE4IDEyLjYyNSAxOCA5Ljg3NSAxOCA5Ljg3NUMxOCA5Ljg3NSAxOCA5LjEyNSAxNy4yNSA5LjEyNUMxNi41IDkuMTI1IDEyIDcuNSAxMiA3LjVaIiBmaWxsPSIjMTM0QTJCIi8+CjxwYXRoIGQ9Ik0xMiAxMC41QzEyIDEwLjUgMTAuNSAxMS42MjUgOS43NSAxMS42MjVDOSAxMS42MjUgOC4yNSAxMi4zNzUgOC4yNSAxMy4xMjVDOC4yNSAxMy44NzUgOC4yNSAxMy44NzUgOC4yNSAxMy44NzVDOC4yNSAxMy44NzUgOC4yNSAxNC42MjUgOSAxNC42MjVDOS43NSAxNC42MjUgMTIgMTYuNSAxMiAxNi41QzEyIDE2LjUgMTQuMjUgMTQuNjI1IDE1IDE0LjYyNUMxNS43NSAxNC42MjUgMTYuNSAxMy44NzUgMTYuNSAxMy4xMjVDMTYuNSAxMi4zNzUgMTYuNSAxMi4zNzUgMTYuNSAxMi4zNzVDMTYuNSAxMi4zNzUgMTYuNSAxMS42MjUgMTUuNzUgMTEuNjI1QzE1IDExLjYyNSAxMiAxMC41IDEyIDEwLjVaIiBmaWxsPSIjMDcyNDE1Ii8+Cjwvc3ZnPgo=';
}); 