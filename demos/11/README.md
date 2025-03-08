# GitHub Copilot Metrics Dashboard

A simple Flask web application that displays developer productivity statistics using the GitHub Copilot metrics API.

## Features

- Display GitHub Copilot usage metrics
- Visualize developer productivity statistics
- Simple authentication with GitHub

## Prerequisites

- Python 3.7 or higher
- GitHub account with Copilot access
- GitHub Personal Access Token with appropriate permissions

## Installation

1. Clone this repository
2. Create a virtual environment:
   ```
   python -m venv venv
   ```
3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`
4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
5. Create a `.env` file with your GitHub credentials:
   ```
   GITHUB_TOKEN=your_personal_access_token
   ```

## Running the Application

1. Activate your virtual environment (if not already activated)
2. Start the Flask application:
   ```
   python app.py
   ```
3. Open your browser and navigate to `http://localhost:5000`

## Project Structure

```
copilot-metrics-dashboard/
├── app.py                 # Main application file
├── config.py              # Configuration settings
├── requirements.txt       # Python dependencies
├── .env                   # Environment variables (create this file)
├── static/                # Static assets
│   ├── css/               # CSS stylesheets
│   └── js/                # JavaScript files
└── templates/             # HTML templates
    ├── base.html          # Base template
    ├── index.html         # Home page
    └── dashboard.html     # Dashboard page
```

## Future Improvements

This application is intentionally built with older technologies to demonstrate how generative AI can be used to migrate it to:

- Node.js for the backend
- Docker for containerization
- Modern frontend frameworks

## License

MIT 