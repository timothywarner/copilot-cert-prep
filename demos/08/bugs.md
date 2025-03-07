# Bugs in fileUtils.js

## 1. Incorrect Filename
**Bug:** The script attempts to read and write to `dat.csv` instead of `data.csv`.
**Impact:** The script will fail if `dat.csv` does not exist.
**Fix:** Change `const filePath = path.join(__dirname, 'dat.csv');` to `const filePath = path.join(__dirname, 'data.csv');`.

## 2. Overwriting Existing Data
**Bug:** The `writeData()` function writes to the file before `readData()` runs.
**Impact:** Any existing data in the file is lost before it can be read.
**Fix:** Swap the order of `writeData();` and `readData();` or modify `writeData()` to append data instead of overwriting.

## 3. No Error Handling for File Reset
**Bug:** `resetFile()` uses `fs.writeFileSync()` but does not handle potential errors.
**Impact:** If the file is locked or unavailable, the script will crash.
**Fix:** Wrap `fs.writeFileSync()` in a try-catch block to handle errors gracefully.

## 4. Hardcoded Data in Reset Function
**Bug:** `resetFile()` writes a fixed dataset each time the script runs.
**Impact:** This may not reflect the actual intended default state.
**Fix:** Use a configuration file or environment variables to manage default data.

## 5. No Confirmation of Read Success
**Bug:** `readData()` only logs errors but does not confirm a successful read.
**Impact:** If the file is empty or corrupted, the user may not realize it.
**Fix:** Add a success message when data is read successfully.

