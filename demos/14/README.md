# GitHub Stats Dashboard

A web dashboard that displays GitHub statistics and metrics for the user `timothywarner`, with a special focus on GitHub Copilot usage.

## Features

- **User Profile**: Displays basic user information and avatar
- **Repository Stats**: Shows count of public repositories, stars, followers, and forks
- **Language Distribution**: Visualizes the distribution of programming languages used across repositories
- **Contribution Activity**: Tracks commits, pull requests, issues, and reviews over time
- **GitHub Copilot Metrics**: Displays Copilot acceptance rate, time saved, and language breakdown
- **Top Repositories**: Lists the most starred repositories
- **Educational Resources**: Comprehensive information about GitHub Copilot metrics API

## Technologies Used

- **Backend**: Node.js with Express
- **Frontend**: HTML, CSS, JavaScript
- **Charting**: Chart.js
- **Styling**: Bootstrap 5 with Bootstrap Icons
- **API**: GitHub REST API, including the official GitHub Copilot metrics API structure

## Setup and Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory (or use system environment variables)
   - Add your GitHub token as `TIM_GITHUB_TOKEN`
   - Note: To access Copilot metrics, your token needs appropriate permissions (see "Copilot Metrics Access" below)

5. Start the server:
   ```
   npm start
   ```
6. Open your browser and navigate to `http://localhost:3000`

## Environment Variables

- `TIM_GITHUB_TOKEN`: Your GitHub personal access token (required for API access)
- `PORT`: The port on which the server will run (default: 3000)

## API Endpoints

The application provides several API endpoints:

- `/api/user`: Returns the user's GitHub profile information
- `/api/repos`: Returns the user's repositories
- `/api/contributions`: Returns contribution statistics
- `/api/stats`: Returns aggregated GitHub statistics
- `/api/copilot`: Returns GitHub Copilot usage metrics (using the official GitHub Copilot metrics API structure)

## Synthetic Data Mode

This dashboard is configured to use comprehensive synthetic data for all endpoints, making it ideal for educational purposes. The synthetic data:

- Follows the exact structure of the real GitHub API responses
- Provides realistic and consistent values across all metrics
- Includes detailed GitHub Copilot usage statistics
- Works without requiring actual API access or specific permissions

To use real GitHub API data instead of synthetic data, set the `USE_SYNTHETIC_DATA` flag to `false` in `server.js`.

## Copilot Metrics Access

The GitHub Copilot metrics API has specific requirements to access real data:

1. The user must be an organization owner or have appropriate permissions
2. The organization must have at least 5 members with active Copilot licenses
3. The Copilot Metrics API access policy must be enabled for the organization
4. Your GitHub token must have one of these scopes:
   - `manage_billing:copilot`
   - `read:org`
   - `read:enterprise`

## Notes on GitHub Copilot Data

The dashboard uses the official GitHub Copilot metrics API structure. This API provides:

- Data for the last 28 days
- Numbers of active users and engaged users
- Breakdowns by language and IDE
- Metrics for code suggestions, acceptances, and more

For more information, see the [GitHub Copilot metrics API documentation](https://docs.github.com/en/rest/copilot/copilot-metrics).

## Educational Resources

The dashboard includes a comprehensive educational section about GitHub Copilot metrics:

- **API Structure**: Detailed explanation of the Copilot metrics API structure
- **Key Requirements**: Information about the 5+ license requirement, 28-day data window, and more
- **Permission Details**: Required token scopes and access levels
- **Business Value**: Metrics showing the productivity benefits of GitHub Copilot
- **Sample API Response**: Example of the raw API data structure
- **Documentation Links**: References to official GitHub documentation

These resources are especially valuable for:

- Microsoft Press students learning about GitHub Copilot
- Developers who want to understand the Copilot metrics API structure
- Instructors teaching GitHub Copilot features and benefits

## License

MIT

## Author

timothywarner 