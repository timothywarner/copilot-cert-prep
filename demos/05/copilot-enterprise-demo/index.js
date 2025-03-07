
// Simple calculator functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

// Function to fetch user data (mocked for now)
async function fetchUserData(userId) {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: 'John Doe' });
    }, 1000);
  });
}

// Utility function to capitalize a string
function capitalize(str) {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Export functions for testing
module.exports = {
  add,
  subtract,
  multiply,
  divide,
  fetchUserData,
  capitalize,
};
