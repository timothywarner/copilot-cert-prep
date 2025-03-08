// DOM Elements
const userProfileEl = document.getElementById('user-profile');
const repoCountEl = document.getElementById('repo-count');
const starCountEl = document.getElementById('star-count');
const followerCountEl = document.getElementById('follower-count');
const forkCountEl = document.getElementById('fork-count');
const topReposEl = document.getElementById('top-repos');
const lastUpdatedEl = document.getElementById('last-updated');
const copilotAcceptanceRateEl = document.getElementById('copilot-acceptance-rate');
const copilotTimeSavedEl = document.getElementById('copilot-time-saved');

// Chart Elements
const languageChartEl = document.getElementById('language-chart');
const contributionChartEl = document.getElementById('contribution-chart');
const copilotLanguagesChartEl = document.getElementById('copilot-languages-chart');
const copilotWeeklyChartEl = document.getElementById('copilot-weekly-chart');

// Charts
let languageChart;
let contributionChart;
let copilotLanguagesChart;
let copilotWeeklyChart;

// Initialize the dashboard
async function initDashboard() {
  try {
    // Fetch all data in parallel
    const [userData, statsData, contributionsData, copilotData] = await Promise.all([
      fetchData('/api/user'),
      fetchData('/api/stats'),
      fetchData('/api/contributions'),
      fetchData('/api/copilot')
    ]);

    // Update the UI with the fetched data
    updateUserProfile(userData);
    updateStats(statsData);
    updateTopRepos(statsData.topRepos);
    createLanguageChart(statsData.languageDistribution);
    createContributionChart(contributionsData);
    updateCopilotStats(copilotData);
    createCopilotLanguagesChart(copilotData.languageBreakdown);
    createCopilotWeeklyChart(copilotData.weeklySuggestions);
    
    // Display educational Copilot API information if available
    if (copilotData.rawApiData) {
      displayCopilotApiInfo(copilotData.rawApiData);
    }

    // Update last updated timestamp
    lastUpdatedEl.textContent = `Last updated: ${new Date().toLocaleString()}`;
  } catch (error) {
    console.error('Error initializing dashboard:', error);
    showError('Failed to load dashboard data. Please try again later.');
  }
}

// Fetch data from the API
async function fetchData(endpoint) {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
}

// Update user profile section
function updateUserProfile(userData) {
  userProfileEl.innerHTML = `
    <img src="${userData.avatar_url}" alt="${userData.login}" class="user-avatar">
    <div class="user-info text-white">
      <h5 class="mb-0">${userData.name || userData.login}</h5>
      <p class="mb-0 small">${userData.bio || ''}</p>
    </div>
  `;
}

// Update stats cards
function updateStats(statsData) {
  repoCountEl.textContent = statsData.publicRepos;
  starCountEl.textContent = statsData.totalStars;
  followerCountEl.textContent = statsData.followers;
  forkCountEl.textContent = statsData.totalForks;
}

// Update top repositories table
function updateTopRepos(topRepos) {
  if (topRepos.length === 0) {
    topReposEl.innerHTML = '<tr><td colspan="3" class="text-center">No repositories found</td></tr>';
    return;
  }

  topReposEl.innerHTML = topRepos.map(repo => `
    <tr>
      <td>
        <a href="${repo.url}" target="_blank" class="fw-bold text-decoration-none">
          ${repo.name}
        </a>
      </td>
      <td><i class="bi bi-star-fill text-warning me-1"></i> ${repo.stars}</td>
      <td><i class="bi bi-diagram-2 text-secondary me-1"></i> ${repo.forks}</td>
    </tr>
  `).join('');
}

// Create language distribution chart
function createLanguageChart(languageData) {
  if (languageChart) {
    languageChart.destroy();
  }

  const languages = Object.keys(languageData);
  const counts = Object.values(languageData);
  
  // Generate colors for each language
  const backgroundColors = languages.map((_, index) => {
    const hue = (index * 137) % 360; // Golden angle approximation for good color distribution
    return `hsl(${hue}, 70%, 60%)`;
  });

  languageChart = new Chart(languageChartEl, {
    type: 'doughnut',
    data: {
      labels: languages,
      datasets: [{
        data: counts,
        backgroundColor: backgroundColors,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            boxWidth: 15,
            font: {
              size: 11
            }
          }
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label || '';
              const value = context.raw || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = Math.round((value / total) * 100);
              return `${label}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    }
  });
}

// Create contribution activity chart
function createContributionChart(contributionsData) {
  if (contributionChart) {
    contributionChart.destroy();
  }

  // Get the last 7 dates from the contributions data
  const dates = Object.keys(contributionsData.byDate).sort().slice(-7);
  
  // Prepare data for each contribution type
  const commitData = dates.map(date => contributionsData.byDate[date]?.commits || 0);
  const prData = dates.map(date => contributionsData.byDate[date]?.pullRequests || 0);
  const issueData = dates.map(date => contributionsData.byDate[date]?.issues || 0);
  const reviewData = dates.map(date => contributionsData.byDate[date]?.reviews || 0);

  // Format dates for display
  const formattedDates = dates.map(date => {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  });

  contributionChart = new Chart(contributionChartEl, {
    type: 'bar',
    data: {
      labels: formattedDates,
      datasets: [
        {
          label: 'Commits',
          data: commitData,
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Pull Requests',
          data: prData,
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Issues',
          data: issueData,
          backgroundColor: 'rgba(255, 206, 86, 0.7)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1
        },
        {
          label: 'Reviews',
          data: reviewData,
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: true
        },
        y: {
          stacked: true,
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          position: 'top'
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      }
    }
  });
}

// Update Copilot stats
function updateCopilotStats(copilotData) {
  // Format the acceptance rate to show only 1 decimal place
  copilotAcceptanceRateEl.textContent = `${copilotData.acceptanceRate.toFixed(1)}%`;
  // Format the time saved as a whole number
  copilotTimeSavedEl.textContent = `${Math.round(copilotData.timesSaved)} hrs`;
}

// Create Copilot languages chart
function createCopilotLanguagesChart(languageData) {
  if (copilotLanguagesChart) {
    copilotLanguagesChart.destroy();
  }

  const languages = Object.keys(languageData);
  const percentages = Object.values(languageData);
  
  // Generate colors for each language
  const backgroundColors = languages.map((lang) => {
    switch (lang) {
      case 'JavaScript': return 'rgba(240, 219, 79, 0.7)';
      case 'Python': return 'rgba(53, 114, 165, 0.7)';
      case 'TypeScript': return 'rgba(49, 120, 198, 0.7)';
      case 'Csharp': return 'rgba(104, 33, 122, 0.7)';
      case 'Powershell': return 'rgba(0, 122, 204, 0.7)';
      case 'Go': return 'rgba(0, 173, 216, 0.7)';
      case 'Java': return 'rgba(176, 114, 25, 0.7)';
      case 'Ruby': return 'rgba(204, 52, 45, 0.7)';
      default: return 'rgba(160, 160, 160, 0.7)';
    }
  });

  copilotLanguagesChart = new Chart(copilotLanguagesChartEl, {
    type: 'pie',
    data: {
      labels: languages,
      datasets: [{
        data: percentages,
        backgroundColor: backgroundColors,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 12,
            font: {
              size: 11
            }
          }
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label || '';
              const value = context.raw || 0;
              return `${label}: ${value}%`;
            }
          }
        }
      }
    }
  });
}

// Create Copilot weekly activity chart
function createCopilotWeeklyChart(weeklyData) {
  if (copilotWeeklyChart) {
    copilotWeeklyChart.destroy();
  }

  const weeks = weeklyData.map(item => {
    const date = new Date(item.week);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  });
  
  const acceptedData = weeklyData.map(item => item.accepted);
  const totalData = weeklyData.map(item => item.total);
  const acceptanceRateData = weeklyData.map(item => Math.round((item.accepted / item.total) * 100));

  copilotWeeklyChart = new Chart(copilotWeeklyChartEl, {
    type: 'line',
    data: {
      labels: weeks,
      datasets: [
        {
          label: 'Accepted Suggestions',
          data: acceptedData,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          yAxisID: 'y'
        },
        {
          label: 'Total Suggestions',
          data: totalData,
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          yAxisID: 'y'
        },
        {
          label: 'Acceptance Rate (%)',
          data: acceptanceRateData,
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 2,
          borderDash: [5, 5],
          fill: false,
          tension: 0.4,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          position: 'left',
          title: {
            display: true,
            text: 'Suggestions Count'
          },
          min: 0,
          max: 7000, // Set a fixed max to ensure consistent display
          ticks: {
            stepSize: 1000
          }
        },
        y1: {
          beginAtZero: true,
          position: 'right',
          min: 0,
          max: 100,
          title: {
            display: true,
            text: 'Acceptance Rate (%)'
          },
          grid: {
            drawOnChartArea: false
          }
        }
      },
      plugins: {
        legend: {
          position: 'top'
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      }
    }
  });
}

// Display educational Copilot API information
function displayCopilotApiInfo(apiData) {
  const apiStructureEl = document.getElementById('api-structure-code');
  const apiSampleEl = document.getElementById('api-sample-code');
  
  if (apiStructureEl && apiData.apiStructure) {
    // Format the API structure as JSON for display
    apiStructureEl.textContent = JSON.stringify(apiData.apiStructure, null, 2);
  }
  
  if (apiSampleEl && apiData.sample) {
    // Format the sample data as JSON for display, but limit its size
    const sampleData = apiData.sample;
    
    // Create a simplified version of the sample to avoid overwhelming the UI
    const simplifiedSample = {
      date: sampleData.date,
      total_active_users: sampleData.total_active_users,
      total_engaged_users: sampleData.total_engaged_users,
      copilot_ide_code_completions: {
        total_engaged_users: sampleData.copilot_ide_code_completions?.total_engaged_users,
        languages: sampleData.copilot_ide_code_completions?.languages,
        editors: [{
          name: sampleData.copilot_ide_code_completions?.editors?.[0]?.name,
          total_engaged_users: sampleData.copilot_ide_code_completions?.editors?.[0]?.total_engaged_users,
          models: [{
            name: sampleData.copilot_ide_code_completions?.editors?.[0]?.models?.[0]?.name,
            is_custom_model: sampleData.copilot_ide_code_completions?.editors?.[0]?.models?.[0]?.is_custom_model,
            languages: [
              // Include just the first language as an example
              sampleData.copilot_ide_code_completions?.editors?.[0]?.models?.[0]?.languages?.[0]
            ]
          }]
        }]
      },
      copilot_ide_chat: {
        total_engaged_users: sampleData.copilot_ide_chat?.total_engaged_users,
        editors: [{
          name: sampleData.copilot_ide_chat?.editors?.[0]?.name,
          // ... other properties truncated for brevity
        }]
      },
      // ... other sections truncated with a comment
      "...": "Additional data truncated for readability"
    };
    
    apiSampleEl.textContent = JSON.stringify(simplifiedSample, null, 2);
  }
}

// Show error message
function showError(message) {
  const alertEl = document.createElement('div');
  alertEl.className = 'alert alert-danger alert-dismissible fade show';
  alertEl.innerHTML = `
    <strong>Error:</strong> ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
  
  document.querySelector('.container-fluid').prepend(alertEl);
}

// Initialize the dashboard when the page loads
document.addEventListener('DOMContentLoaded', initDashboard); 