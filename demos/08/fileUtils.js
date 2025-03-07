const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'data.csv'); // Fixed file name

function resetFile() {
    const defaultData = 'name,age,email\nAlice,30,alice@example.com\nBob,25,bob@example.com\nCharlie,35,charlie@example.com';
    try {
        fs.writeFileSync(filePath, defaultData, 'utf8');
        console.log('File reset to default state.');
    } catch (err) {
        console.error('\x1b[31m%s\x1b[0m', 'Error resetting file:', err); // Red color
        throw new Error('Critical failure: Unable to reset file.'); // Force script termination
    }
}

function readData() {
    console.log('Attempting to read file...');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('\x1b[31m%s\x1b[0m', 'Error reading file:', err); // Red color
            debugger; // Forces debugger to pause on error
            throw new Error('Critical failure: Unable to read file.'); // Force script termination
        }
        console.log('File content:\n', data);

        // Simulate parsing error
        try {
            JSON.parse(data);
        } catch (parseErr) {
            console.error('\x1b[31m%s\x1b[0m', 'Error parsing file content:', parseErr); // Red color
        }
    });
}

function writeData() {
    const newData = 'name,age,email\nJohn,28,john@example.com';
    fs.writeFile(filePath, newData, 'utf8', (err) => {
        if (err) {
            console.error('\x1b[31m%s\x1b[0m', 'Error writing file:', err); // Red color
            debugger; // Forces debugger to pause on error
            throw new Error('Critical failure: Unable to write to file.'); // Force script termination
        }
        console.log('File written successfully');
    });
}

// Ensure file is reset before every run
resetFile();
writeData();
readData();