import os
import json
import requests
from datetime import datetime, timedelta
from flask import Flask, render_template, redirect, url_for, flash, session, request
from dotenv import load_dotenv
from werkzeug.exceptions import HTTPException

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'dev-key-for-session')

# GitHub API configuration
GITHUB_API_URL = "https://api.github.com"
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')

# Check if token is available
if not GITHUB_TOKEN:
    print("Warning: GITHUB_TOKEN not found in environment variables.")

def get_github_headers():
    """Return headers for GitHub API requests."""
    return {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    }

def get_user_info():
    """Get authenticated user information."""
    if not GITHUB_TOKEN:
        return None
    
    response = requests.get(
        f"{GITHUB_API_URL}/user",
        headers=get_github_headers()
    )
    
    if response.status_code == 200:
        return response.json()
    return None

def get_copilot_metrics(username, days=30):
    """
    Get GitHub Copilot metrics for a user.
    Note: This is a placeholder function as the actual Copilot metrics API
    may require different endpoints or authentication.
    """
    # This is a mock implementation since the actual Copilot metrics API
    # details might differ. Replace with actual API calls when available.
    
    # For demonstration purposes, we'll return mock data
    today = datetime.now()
    
    # Generate mock data for the past 'days'
    daily_data = []
    for i in range(days):
        date = today - timedelta(days=i)
        date_str = date.strftime("%Y-%m-%d")
        
        # Random-ish but deterministic data based on the date
        day_value = (date.day * 7) % 100
        suggestions = 15 + day_value
        acceptances = int(suggestions * (0.4 + (date.day % 10) / 30))
        
        daily_data.append({
            "date": date_str,
            "suggestions": suggestions,
            "acceptances": acceptances,
            "acceptance_rate": round(acceptances / suggestions * 100, 1) if suggestions > 0 else 0
        })
    
    # Calculate summary metrics
    total_suggestions = sum(day["suggestions"] for day in daily_data)
    total_acceptances = sum(day["acceptances"] for day in daily_data)
    avg_acceptance_rate = round(total_acceptances / total_suggestions * 100, 1) if total_suggestions > 0 else 0
    
    # Time saved estimate (assuming each acceptance saves 30 seconds on average)
    time_saved_seconds = total_acceptances * 30
    time_saved_hours = round(time_saved_seconds / 3600, 1)
    
    return {
        "username": username,
        "period": f"Last {days} days",
        "total_suggestions": total_suggestions,
        "total_acceptances": total_acceptances,
        "avg_acceptance_rate": avg_acceptance_rate,
        "time_saved_hours": time_saved_hours,
        "daily_data": daily_data
    }

@app.route('/')
def index():
    """Home page route."""
    user_info = get_user_info()
    if user_info:
        return render_template('index.html', user=user_info)
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    """Dashboard page showing Copilot metrics."""
    user_info = get_user_info()
    
    if not user_info:
        flash('Please set your GitHub token in the .env file', 'warning')
        return redirect(url_for('index'))
    
    # Get metrics for the authenticated user
    metrics = get_copilot_metrics(user_info['login'])
    
    return render_template(
        'dashboard.html',
        user=user_info,
        metrics=metrics
    )

@app.route('/api/metrics')
def api_metrics():
    """API endpoint to get metrics data as JSON."""
    user_info = get_user_info()
    
    if not user_info:
        return {"error": "Authentication required"}, 401
    
    days = request.args.get('days', default=30, type=int)
    metrics = get_copilot_metrics(user_info['login'], days=days)
    
    return metrics

@app.errorhandler(Exception)
def handle_error(e):
    """Global error handler."""
    code = 500
    if isinstance(e, HTTPException):
        code = e.code
    
    return render_template('error.html', error=str(e), code=code), code

if __name__ == '__main__':
    app.run(debug=True) 