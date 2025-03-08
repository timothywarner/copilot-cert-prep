const express = require('express');
const axios = require('axios');
const path = require('path');
const dotenv = require('dotenv');
const moment = require('moment');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// GitHub API base URL
const GITHUB_API_URL = 'https://api.github.com';

// Get GitHub token from environment variable
const GITHUB_TOKEN = process.env.TIM_GITHUB_TOKEN;

// Configure axios for GitHub API requests
const githubApi = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    'Authorization': `Bearer ${GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28'
  }
});

// Flag to use synthetic data for all endpoints (for educational purposes)
const USE_SYNTHETIC_DATA = true;

// Routes
app.get('/api/user', async (req, res) => {
  try {
    if (!USE_SYNTHETIC_DATA) {
      const response = await githubApi.get('/user');
      res.json(response.data);
    } else {
      // Generate synthetic user data for a GitHub Copilot certification student
      const syntheticUserData = {
        login: "copilot-student",
        id: 12345678,
        node_id: "MDQ6VXNlcjEyMzQ1Njc4",
        avatar_url: "https://avatars.githubusercontent.com/u/12345678?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/copilot-student",
        html_url: "https://github.com/copilot-student",
        followers_url: "https://api.github.com/users/copilot-student/followers",
        following_url: "https://api.github.com/users/copilot-student/following{/other_user}",
        gists_url: "https://api.github.com/users/copilot-student/gists{/gist_id}",
        starred_url: "https://api.github.com/users/copilot-student/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/copilot-student/subscriptions",
        organizations_url: "https://api.github.com/users/copilot-student/orgs",
        repos_url: "https://api.github.com/users/copilot-student/repos",
        events_url: "https://api.github.com/users/copilot-student/events{/privacy}",
        received_events_url: "https://api.github.com/users/copilot-student/received_events",
        type: "User",
        site_admin: false,
        name: "GitHub Copilot Student",
        company: "Certification Team",
        blog: "https://github.blog/copilot",
        location: "GitHub Universe",
        email: "student@github.com",
        hireable: true,
        bio: "GitHub Copilot Certification Student | AI Enthusiast | Developer | Learning to code with AI pair programming",
        twitter_username: "GitHubStudent",
        public_repos: 42,
        public_gists: 15,
        followers: 350,
        following: 125,
        created_at: "2020-05-15T14:32:45Z",
        updated_at: moment().subtract(2, 'days').toISOString()
      };
      
      res.json(syntheticUserData);
    }
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    
    // Fallback to synthetic data on error
    const syntheticUserData = {
      login: "copilot-student",
      id: 12345678,
      avatar_url: "https://avatars.githubusercontent.com/u/12345678?v=4",
      name: "GitHub Copilot Student",
      company: "Certification Team",
      blog: "https://github.blog/copilot",
      location: "GitHub Universe",
      bio: "GitHub Copilot Certification Student | AI Enthusiast | Developer | Learning to code with AI pair programming",
      twitter_username: "GitHubStudent",
      public_repos: 42,
      followers: 350,
      following: 125
    };
    
    res.json(syntheticUserData);
  }
});

app.get('/api/repos', async (req, res) => {
  try {
    if (!USE_SYNTHETIC_DATA) {
      const response = await githubApi.get('/user/repos?per_page=100&sort=updated');
      res.json(response.data);
    } else {
      // Generate synthetic repository data for a GitHub Copilot certification student
      const repoCount = 25; // Number of synthetic repos to generate
      const syntheticRepos = [];
      
      const repoTemplates = [
        { name: "copilot-demo-app", description: "Demo application built with GitHub Copilot assistance", language: "JavaScript", stars: 245, forks: 123 },
        { name: "ai-pair-programming", description: "Examples of AI pair programming with GitHub Copilot", language: "Python", stars: 187, forks: 82 },
        { name: "copilot-prompts-collection", description: "Collection of effective prompts for GitHub Copilot", language: "Markdown", stars: 156, forks: 68 },
        { name: "copilot-chat-examples", description: "Examples of using GitHub Copilot Chat effectively", language: "TypeScript", stars: 142, forks: 53 },
        { name: "copilot-certification-prep", description: "Study materials for GitHub Copilot certification", language: "Markdown", stars: 138, forks: 47 },
        { name: "copilot-vscode-extension", description: "Custom VS Code extension that enhances GitHub Copilot", language: "TypeScript", stars: 124, forks: 42 },
        { name: "copilot-code-challenges", description: "Coding challenges solved with GitHub Copilot", language: "Python", stars: 118, forks: 39 },
        { name: "copilot-productivity-tracker", description: "Tool to track productivity gains from GitHub Copilot", language: "JavaScript", stars: 105, forks: 36 },
        { name: "copilot-pr-summarizer", description: "Tool that uses Copilot to summarize pull requests", language: "TypeScript", stars: 98, forks: 32 },
        { name: "copilot-test-generator", description: "Generates unit tests using GitHub Copilot", language: "Python", stars: 92, forks: 28 }
      ];
      
      for (let i = 0; i < repoCount; i++) {
        // Use template for first 10 repos, then generate random ones
        const template = i < 10 ? repoTemplates[i] : repoTemplates[Math.floor(Math.random() * repoTemplates.length)];
        const createdDate = moment().subtract(Math.floor(Math.random() * 1000), 'days').toISOString();
        const updatedDate = moment(createdDate).add(Math.floor(Math.random() * 100), 'days').toISOString();
        
        const repo = {
          id: 100000 + i,
          node_id: `MDEwOlJlcG9zaXRvcnkxMDAwMDAke i}`,
          name: i < 10 ? template.name : `${template.name}-${i}`,
          full_name: `copilot-student/${i < 10 ? template.name : `${template.name}-${i}`}`,
          private: false,
          owner: {
            login: "copilot-student",
            id: 12345678,
            avatar_url: "https://avatars.githubusercontent.com/u/12345678?v=4",
            url: "https://api.github.com/users/copilot-student"
          },
          html_url: `https://github.com/copilot-student/${i < 10 ? template.name : `${template.name}-${i}`}`,
          description: template.description,
          fork: false,
          url: `https://api.github.com/repos/copilot-student/${i < 10 ? template.name : `${template.name}-${i}`}`,
          created_at: createdDate,
          updated_at: updatedDate,
          pushed_at: updatedDate,
          homepage: i % 5 === 0 ? "https://github.blog/copilot" : null,
          size: Math.floor(Math.random() * 10000),
          stargazers_count: i < 10 ? template.stars : Math.floor(Math.random() * 200),
          watchers_count: i < 10 ? Math.floor(template.stars / 3) : Math.floor(Math.random() * 100),
          language: template.language,
          forks_count: i < 10 ? template.forks : Math.floor(Math.random() * 100),
          open_issues_count: Math.floor(Math.random() * 30),
          license: {
            key: "mit",
            name: "MIT License",
            url: "https://api.github.com/licenses/mit"
          },
          topics: [
            "github-copilot",
            "ai",
            "pair-programming",
            "productivity",
            "code-generation",
            "machine-learning"
          ].slice(0, Math.floor(Math.random() * 6) + 1),
          visibility: "public",
          default_branch: "main"
        };
        
        syntheticRepos.push(repo);
      }
      
      res.json(syntheticRepos);
    }
  } catch (error) {
    console.error('Error fetching repos:', error.message);
    
    // Fallback to minimal synthetic data on error
    const syntheticRepos = [
      {
        name: "copilot-demo-app",
        full_name: "copilot-student/copilot-demo-app",
        description: "Demo application built with GitHub Copilot assistance",
        language: "JavaScript",
        stargazers_count: 245,
        forks_count: 123,
        html_url: "https://github.com/copilot-student/copilot-demo-app"
      },
      {
        name: "ai-pair-programming",
        full_name: "copilot-student/ai-pair-programming",
        description: "Examples of AI pair programming with GitHub Copilot",
        language: "Python",
        stargazers_count: 187,
        forks_count: 82,
        html_url: "https://github.com/copilot-student/ai-pair-programming"
      }
    ];
    
    res.json(syntheticRepos);
  }
});

app.get('/api/contributions', async (req, res) => {
  try {
    if (!USE_SYNTHETIC_DATA) {
      const username = 'timothywarner';
      const now = new Date();
      const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
      const since = oneYearAgo.toISOString();
      
      // Get user events
      const response = await githubApi.get(`/users/${username}/events?per_page=100`);
      
      // Process events to count contributions
      const contributions = {
        commits: 0,
        pullRequests: 0,
        issues: 0,
        reviews: 0,
        byDate: {}
      };
      
      response.data.forEach(event => {
        const date = moment(event.created_at).format('YYYY-MM-DD');
        
        if (!contributions.byDate[date]) {
          contributions.byDate[date] = {
            commits: 0,
            pullRequests: 0,
            issues: 0,
            reviews: 0
          };
        }
        
        switch (event.type) {
          case 'PushEvent':
            const commitCount = event.payload.commits ? event.payload.commits.length : 0;
            contributions.commits += commitCount;
            contributions.byDate[date].commits += commitCount;
            break;
          case 'PullRequestEvent':
            if (event.payload.action === 'opened' || event.payload.action === 'reopened') {
              contributions.pullRequests++;
              contributions.byDate[date].pullRequests++;
            }
            break;
          case 'IssuesEvent':
            if (event.payload.action === 'opened' || event.payload.action === 'reopened') {
              contributions.issues++;
              contributions.byDate[date].issues++;
            }
            break;
          case 'PullRequestReviewEvent':
            contributions.reviews++;
            contributions.byDate[date].reviews++;
            break;
        }
      });
      
      res.json(contributions);
    } else {
      // Generate synthetic contribution data for a GitHub Copilot certification student
      // with impressive activity patterns showing heavy Copilot usage
      const contributions = {
        commits: 0,
        pullRequests: 0,
        issues: 0,
        reviews: 0,
        byDate: {}
      };
      
      // Generate data for the last 90 days with impressive activity
      const today = moment();
      
      // Define a pattern that shows increasing activity over time (as they learn Copilot)
      // This simulates a student getting more productive with Copilot over time
      for (let i = 0; i < 90; i++) {
        const date = moment(today).subtract(i, 'days').format('YYYY-MM-DD');
        
        // Generate more activity on weekdays, less on weekends
        const dayOfWeek = moment(date).day();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const activityMultiplier = isWeekend ? 0.5 : 1.0;
        
        // Generate some patterns - more activity on Tuesdays and Wednesdays (workshop days)
        const isTuesdayOrWednesday = dayOfWeek === 2 || dayOfWeek === 3;
        const dayBoost = isTuesdayOrWednesday ? 1.8 : 1.0;
        
        // Activity increases as we get closer to today (student is learning and becoming more productive)
        // This creates a nice upward trend in the contribution graph
        const recencyBoost = 1 + ((90 - i) / 90);
        
        // Create impressive contribution counts that increase over time
        const dailyCommits = Math.floor(Math.random() * 12 * activityMultiplier * dayBoost * recencyBoost);
        const dailyPRs = Math.floor(Math.random() * 4 * activityMultiplier * dayBoost * recencyBoost);
        const dailyIssues = Math.floor(Math.random() * 5 * activityMultiplier * dayBoost * recencyBoost);
        const dailyReviews = Math.floor(Math.random() * 6 * activityMultiplier * dayBoost * recencyBoost);
        
        // Add to totals
        contributions.commits += dailyCommits;
        contributions.pullRequests += dailyPRs;
        contributions.issues += dailyIssues;
        contributions.reviews += dailyReviews;
        
        // Store daily data
        contributions.byDate[date] = {
          commits: dailyCommits,
          pullRequests: dailyPRs,
          issues: dailyIssues,
          reviews: dailyReviews
        };
      }
      
      res.json(contributions);
    }
  } catch (error) {
    console.error('Error fetching contributions:', error.message);
    
    // Fallback to impressive synthetic contribution data
    const contributions = {
      commits: 845,
      pullRequests: 156,
      issues: 178,
      reviews: 212,
      byDate: {}
    };
    
    // Generate minimal data for the last 7 days
    const today = moment();
    
    for (let i = 0; i < 7; i++) {
      const date = moment(today).subtract(i, 'days').format('YYYY-MM-DD');
      
      // Impressive daily numbers
      contributions.byDate[date] = {
        commits: Math.floor(8 + Math.random() * 12),
        pullRequests: Math.floor(2 + Math.random() * 4),
        issues: Math.floor(2 + Math.random() * 5),
        reviews: Math.floor(3 + Math.random() * 6)
      };
    }
    
    res.json(contributions);
  }
});

app.get('/api/copilot', async (req, res) => {
  try {
    // Generate impressive synthetic Copilot data for a GitHub Copilot certification student
    console.log('Generating impressive synthetic Copilot data for educational purposes');
    
    // Create impressive synthetic data that matches the GitHub Copilot metrics API structure
    const today = new Date();
    const mockRawData = [];
    
    // Generate 28 days of impressive mock data
    for (let i = 0; i < 28; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD format
      
      // Create a single day's data structure with impressive metrics
      const dayData = {
        date: dateString,
        total_active_users: 25, // Impressive team size
        total_engaged_users: 22, // High engagement rate
        copilot_ide_code_completions: {
          total_engaged_users: 22,
          languages: [
            { name: "javascript", total_engaged_users: 18 },
            { name: "python", total_engaged_users: 15 },
            { name: "typescript", total_engaged_users: 14 },
            { name: "csharp", total_engaged_users: 12 },
            { name: "powershell", total_engaged_users: 10 },
            { name: "go", total_engaged_users: 8 },
            { name: "java", total_engaged_users: 7 },
            { name: "ruby", total_engaged_users: 5 }
          ],
          editors: [
            {
              name: "vscode",
              total_engaged_users: 20,
              models: [
                {
                  name: "default",
                  is_custom_model: false,
                  custom_model_training_date: null,
                  total_engaged_users: 20,
                  languages: [
                    {
                      name: "javascript",
                      total_engaged_users: 18,
                      // Impressive numbers - high suggestion count and acceptance rate
                      total_code_suggestions: Math.floor(800 + Math.random() * 200),
                      total_code_acceptances: Math.floor(650 + Math.random() * 150),
                      total_code_lines_suggested: Math.floor(2000 + Math.random() * 500),
                      total_code_lines_accepted: Math.floor(1600 + Math.random() * 400)
                    },
                    {
                      name: "python",
                      total_engaged_users: 15,
                      total_code_suggestions: Math.floor(700 + Math.random() * 150),
                      total_code_acceptances: Math.floor(580 + Math.random() * 120),
                      total_code_lines_suggested: Math.floor(1800 + Math.random() * 400),
                      total_code_lines_accepted: Math.floor(1500 + Math.random() * 300)
                    },
                    {
                      name: "typescript",
                      total_engaged_users: 14,
                      total_code_suggestions: Math.floor(650 + Math.random() * 150),
                      total_code_acceptances: Math.floor(540 + Math.random() * 110),
                      total_code_lines_suggested: Math.floor(1700 + Math.random() * 350),
                      total_code_lines_accepted: Math.floor(1400 + Math.random() * 300)
                    },
                    {
                      name: "csharp",
                      total_engaged_users: 12,
                      total_code_suggestions: Math.floor(600 + Math.random() * 120),
                      total_code_acceptances: Math.floor(500 + Math.random() * 100),
                      total_code_lines_suggested: Math.floor(1500 + Math.random() * 300),
                      total_code_lines_accepted: Math.floor(1250 + Math.random() * 250)
                    },
                    {
                      name: "powershell",
                      total_engaged_users: 10,
                      total_code_suggestions: Math.floor(450 + Math.random() * 100),
                      total_code_acceptances: Math.floor(380 + Math.random() * 70),
                      total_code_lines_suggested: Math.floor(1200 + Math.random() * 250),
                      total_code_lines_accepted: Math.floor(1000 + Math.random() * 200)
                    },
                    {
                      name: "go",
                      total_engaged_users: 8,
                      total_code_suggestions: Math.floor(400 + Math.random() * 80),
                      total_code_acceptances: Math.floor(340 + Math.random() * 60),
                      total_code_lines_suggested: Math.floor(1000 + Math.random() * 200),
                      total_code_lines_accepted: Math.floor(850 + Math.random() * 150)
                    },
                    {
                      name: "java",
                      total_engaged_users: 7,
                      total_code_suggestions: Math.floor(350 + Math.random() * 70),
                      total_code_acceptances: Math.floor(290 + Math.random() * 60),
                      total_code_lines_suggested: Math.floor(900 + Math.random() * 180),
                      total_code_lines_accepted: Math.floor(750 + Math.random() * 150)
                    },
                    {
                      name: "ruby",
                      total_engaged_users: 5,
                      total_code_suggestions: Math.floor(300 + Math.random() * 60),
                      total_code_acceptances: Math.floor(250 + Math.random() * 50),
                      total_code_lines_suggested: Math.floor(800 + Math.random() * 160),
                      total_code_lines_accepted: Math.floor(650 + Math.random() * 130)
                    }
                  ]
                }
              ]
            },
            {
              name: "visual studio",
              total_engaged_users: 12,
              models: [
                {
                  name: "default",
                  is_custom_model: false,
                  custom_model_training_date: null,
                  total_engaged_users: 12,
                  languages: [
                    {
                      name: "csharp",
                      total_engaged_users: 12,
                      total_code_suggestions: Math.floor(550 + Math.random() * 110),
                      total_code_acceptances: Math.floor(460 + Math.random() * 90),
                      total_code_lines_suggested: Math.floor(1400 + Math.random() * 280),
                      total_code_lines_accepted: Math.floor(1150 + Math.random() * 230)
                    },
                    {
                      name: "javascript",
                      total_engaged_users: 8,
                      total_code_suggestions: Math.floor(350 + Math.random() * 70),
                      total_code_acceptances: Math.floor(290 + Math.random() * 60),
                      total_code_lines_suggested: Math.floor(900 + Math.random() * 180),
                      total_code_lines_accepted: Math.floor(750 + Math.random() * 150)
                    }
                  ]
                }
              ]
            },
            {
              name: "jetbrains",
              total_engaged_users: 8,
              models: [
                {
                  name: "default",
                  is_custom_model: false,
                  custom_model_training_date: null,
                  total_engaged_users: 8,
                  languages: [
                    {
                      name: "python",
                      total_engaged_users: 6,
                      total_code_suggestions: Math.floor(400 + Math.random() * 80),
                      total_code_acceptances: Math.floor(330 + Math.random() * 70),
                      total_code_lines_suggested: Math.floor(1000 + Math.random() * 200),
                      total_code_lines_accepted: Math.floor(830 + Math.random() * 170)
                    },
                    {
                      name: "java",
                      total_engaged_users: 5,
                      total_code_suggestions: Math.floor(350 + Math.random() * 70),
                      total_code_acceptances: Math.floor(290 + Math.random() * 60),
                      total_code_lines_suggested: Math.floor(900 + Math.random() * 180),
                      total_code_lines_accepted: Math.floor(750 + Math.random() * 150)
                    }
                  ]
                }
              ]
            }
          ]
        },
        copilot_ide_chat: {
          total_engaged_users: 20,
          editors: [
            {
              name: "vscode",
              total_engaged_users: 18,
              models: [
                {
                  name: "default",
                  is_custom_model: false,
                  custom_model_training_date: null,
                  total_engaged_users: 18,
                  // Impressive Copilot Chat usage
                  total_chats: Math.floor(120 + Math.random() * 30),
                  total_chat_insertion_events: Math.floor(80 + Math.random() * 20),
                  total_chat_copy_events: Math.floor(40 + Math.random() * 10)
                }
              ]
            },
            {
              name: "visual studio",
              total_engaged_users: 10,
              models: [
                {
                  name: "default",
                  is_custom_model: false,
                  custom_model_training_date: null,
                  total_engaged_users: 10,
                  total_chats: Math.floor(70 + Math.random() * 20),
                  total_chat_insertion_events: Math.floor(45 + Math.random() * 15),
                  total_chat_copy_events: Math.floor(25 + Math.random() * 10)
                }
              ]
            }
          ]
        },
        copilot_dotcom_chat: {
          total_engaged_users: 15,
          models: [
            {
              name: "default",
              is_custom_model: false,
              custom_model_training_date: null,
              total_engaged_users: 15,
              total_chats: Math.floor(90 + Math.random() * 20)
            }
          ]
        },
        copilot_dotcom_pull_requests: {
          total_engaged_users: 18,
          repositories: [
            {
              name: "certification-team/copilot-workshop",
              total_engaged_users: 15,
              models: [
                {
                  name: "default",
                  is_custom_model: false,
                  custom_model_training_date: null,
                  total_pr_summaries_created: Math.floor(25 + Math.random() * 10),
                  total_engaged_users: 15
                }
              ]
            },
            {
              name: "certification-team/azure-solutions",
              total_engaged_users: 12,
              models: [
                {
                  name: "default",
                  is_custom_model: false,
                  custom_model_training_date: null,
                  total_pr_summaries_created: Math.floor(20 + Math.random() * 8),
                  total_engaged_users: 12
                }
              ]
            },
            {
              name: "certification-team/training-materials",
              total_engaged_users: 10,
              models: [
                {
                  name: "default",
                  is_custom_model: false,
                  custom_model_training_date: null,
                  total_pr_summaries_created: Math.floor(15 + Math.random() * 7),
                  total_engaged_users: 10
                }
              ]
            }
          ]
        }
      };
      
      mockRawData.push(dayData);
    }
    
    // Process the impressive synthetic data
    const copilotData = mockRawData;
    
    // Get the most recent day's data
    const latestData = copilotData[0];
    
    // Extract code completion metrics
    const codeCompletions = latestData.copilot_ide_code_completions || {};
    
    // Calculate total suggestions and acceptances across all languages and editors
    let totalSuggestions = 0;
    let totalAcceptances = 0;
    let totalLinesSuggested = 0;
    let totalLinesAccepted = 0;
    
    // Language breakdown for Copilot usage - more realistic distribution
    const languageBreakdown = {
      "JavaScript": 30,
      "Python": 25,
      "TypeScript": 18,
      "Csharp": 12,
      "Powershell": 6,
      "Go": 4,
      "Java": 3,
      "Ruby": 2
    };
    
    // Process each editor's data to get totals
    if (codeCompletions.editors && codeCompletions.editors.length > 0) {
      codeCompletions.editors.forEach(editor => {
        if (editor.models && editor.models.length > 0) {
          editor.models.forEach(model => {
            if (model.languages && model.languages.length > 0) {
              model.languages.forEach(lang => {
                // Add to totals
                totalSuggestions += lang.total_code_suggestions || 0;
                totalAcceptances += lang.total_code_acceptances || 0;
                totalLinesSuggested += lang.total_code_lines_suggested || 0;
                totalLinesAccepted += lang.total_code_lines_accepted || 0;
              });
            }
          });
        }
      });
    }
    
    // Calculate acceptance rate (realistic rate between 82-85%)
    const acceptanceRate = 84.2; // Fixed to a reasonable number with 1 decimal place
    
    // Estimate time saved (realistic number - around 140-150 hours)
    const timesSaved = 144; // Fixed to a whole number
    
    // Generate weekly data for the last 7 days with more detailed patterns
    const weeklySuggestions = [];
    
    // Create a pattern that shows realistic fluctuations but maintains high acceptance rate
    const weeklyPatterns = [
      { total: 5800, accepted: 4872, date: moment().subtract(6, 'days').format('YYYY-MM-DD') }, // Day 1
      { total: 6100, accepted: 5124, date: moment().subtract(5, 'days').format('YYYY-MM-DD') }, // Day 2
      { total: 5900, accepted: 4956, date: moment().subtract(4, 'days').format('YYYY-MM-DD') }, // Day 3
      { total: 6200, accepted: 5208, date: moment().subtract(3, 'days').format('YYYY-MM-DD') }, // Day 4
      { total: 5700, accepted: 4788, date: moment().subtract(2, 'days').format('YYYY-MM-DD') }, // Day 5
      { total: 6000, accepted: 5040, date: moment().subtract(1, 'days').format('YYYY-MM-DD') }, // Day 6
      { total: 6300, accepted: 5292, date: moment().format('YYYY-MM-DD') }                      // Day 7
    ];
    
    // Use the predefined patterns
    weeklyPatterns.forEach(pattern => {
      weeklySuggestions.push({
        week: pattern.date,
        total: pattern.total,
        accepted: pattern.accepted
      });
    });
    
    // Construct the response in the format expected by our frontend
    const processedCopilotData = {
      acceptedSuggestions: totalAcceptances,
      totalSuggestions: totalSuggestions,
      acceptanceRate: acceptanceRate,
      timesSaved: timesSaved,
      languageBreakdown: languageBreakdown,
      weeklySuggestions: weeklySuggestions,
      // Add additional educational data for Microsoft Press students
      rawApiData: {
        sample: copilotData[0], // Include a sample of the raw API data for educational purposes
        apiStructure: {
          date: "ISO date string (YYYY-MM-DD)",
          total_active_users: "Number of users with Copilot license who were active",
          total_engaged_users: "Number of users who actively used Copilot features",
          copilot_ide_code_completions: {
            description: "Metrics for code completions in IDEs",
            structure: "Contains language and editor breakdowns"
          },
          copilot_ide_chat: {
            description: "Metrics for Copilot Chat in IDEs",
            structure: "Contains chat usage statistics by editor"
          },
          copilot_dotcom_chat: {
            description: "Metrics for Copilot Chat on GitHub.com",
            structure: "Contains chat usage statistics"
          },
          copilot_dotcom_pull_requests: {
            description: "Metrics for Copilot PR features",
            structure: "Contains PR summary statistics by repository"
          }
        },
        documentation: "https://docs.github.com/en/rest/copilot/copilot-metrics"
      }
    };
    
    res.json(processedCopilotData);
  } catch (error) {
    console.error('Error generating Copilot data:', error.message);
    
    // Fallback to impressive synthetic data on error with fixed values
    const mockWeeklySuggestions = [
      { week: moment().subtract(6, 'days').format('YYYY-MM-DD'), accepted: 4872, total: 5800 },
      { week: moment().subtract(5, 'days').format('YYYY-MM-DD'), accepted: 5124, total: 6100 },
      { week: moment().subtract(4, 'days').format('YYYY-MM-DD'), accepted: 4956, total: 5900 },
      { week: moment().subtract(3, 'days').format('YYYY-MM-DD'), accepted: 5208, total: 6200 },
      { week: moment().subtract(2, 'days').format('YYYY-MM-DD'), accepted: 4788, total: 5700 },
      { week: moment().subtract(1, 'days').format('YYYY-MM-DD'), accepted: 5040, total: 6000 },
      { week: moment().format('YYYY-MM-DD'), accepted: 5292, total: 6300 }
    ];
    
    const mockCopilotData = {
      acceptedSuggestions: 24500,
      totalSuggestions: 29800,
      acceptanceRate: 84.2,
      timesSaved: 144,
      languageBreakdown: {
        "JavaScript": 30,
        "Python": 25,
        "TypeScript": 18,
        "Csharp": 12,
        "Powershell": 6,
        "Go": 4,
        "Java": 3,
        "Ruby": 2
      },
      weeklySuggestions: mockWeeklySuggestions,
      // Add educational data about the API structure
      rawApiData: {
        apiStructure: {
          date: "ISO date string (YYYY-MM-DD)",
          total_active_users: "Number of users with Copilot license who were active",
          total_engaged_users: "Number of users who actively used Copilot features",
          copilot_ide_code_completions: {
            description: "Metrics for code completions in IDEs",
            structure: "Contains language and editor breakdowns"
          },
          copilot_ide_chat: {
            description: "Metrics for Copilot Chat in IDEs",
            structure: "Contains chat usage statistics by editor"
          },
          copilot_dotcom_chat: {
            description: "Metrics for Copilot Chat on GitHub.com",
            structure: "Contains chat usage statistics"
          },
          copilot_dotcom_pull_requests: {
            description: "Metrics for Copilot PR features",
            structure: "Contains PR summary statistics by repository"
          }
        },
        documentation: "https://docs.github.com/en/rest/copilot/copilot-metrics"
      }
    };
    
    res.json(mockCopilotData);
  }
});

app.get('/api/stats', async (req, res) => {
  try {
    if (!USE_SYNTHETIC_DATA) {
      const username = 'timothywarner';
      
      // Get user profile
      const userResponse = await githubApi.get(`/users/${username}`);
      
      // Get repositories
      const reposResponse = await githubApi.get(`/users/${username}/repos?per_page=100`);
      
      // Calculate stats
      const stats = {
        publicRepos: userResponse.data.public_repos,
        followers: userResponse.data.followers,
        following: userResponse.data.following,
        totalStars: 0,
        totalForks: 0,
        totalWatchers: 0,
        languageDistribution: {},
        topRepos: []
      };
      
      // Process repositories
      reposResponse.data.forEach(repo => {
        // Count stars, forks, watchers
        stats.totalStars += repo.stargazers_count;
        stats.totalForks += repo.forks_count;
        stats.totalWatchers += repo.watchers_count;
        
        // Track languages
        if (repo.language) {
          if (!stats.languageDistribution[repo.language]) {
            stats.languageDistribution[repo.language] = 0;
          }
          stats.languageDistribution[repo.language]++;
        }
        
        // Track top repos (by stars)
        stats.topRepos.push({
          name: repo.name,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          url: repo.html_url
        });
      });
      
      // Sort top repos by stars
      stats.topRepos.sort((a, b) => b.stars - a.stars);
      stats.topRepos = stats.topRepos.slice(0, 5); // Keep only top 5
      
      res.json(stats);
    } else {
      // Generate synthetic stats data for a GitHub Copilot certification student
      const syntheticStats = {
        publicRepos: 42,
        followers: 350,
        following: 125,
        totalStars: 1405,
        totalForks: 520,
        totalWatchers: 780,
        languageDistribution: {
          "JavaScript": 10,
          "Python": 8,
          "TypeScript": 7,
          "Markdown": 5,
          "HTML": 3,
          "CSS": 3,
          "Java": 2,
          "C#": 2,
          "Go": 1,
          "Ruby": 1
        },
        topRepos: [
          {
            name: "copilot-demo-app",
            stars: 245,
            forks: 123,
            url: "https://github.com/copilot-student/copilot-demo-app"
          },
          {
            name: "ai-pair-programming",
            stars: 187,
            forks: 82,
            url: "https://github.com/copilot-student/ai-pair-programming"
          },
          {
            name: "copilot-prompts-collection",
            stars: 156,
            forks: 68,
            url: "https://github.com/copilot-student/copilot-prompts-collection"
          },
          {
            name: "copilot-chat-examples",
            stars: 142,
            forks: 53,
            url: "https://github.com/copilot-student/copilot-chat-examples"
          },
          {
            name: "copilot-certification-prep",
            stars: 138,
            forks: 47,
            url: "https://github.com/copilot-student/copilot-certification-prep"
          }
        ]
      };
      
      res.json(syntheticStats);
    }
  } catch (error) {
    console.error('Error fetching stats:', error.message);
    
    // Fallback to synthetic stats on error
    const syntheticStats = {
      publicRepos: 42,
      followers: 350,
      following: 125,
      totalStars: 1405,
      totalForks: 520,
      totalWatchers: 780,
      languageDistribution: {
        "JavaScript": 10,
        "Python": 8,
        "TypeScript": 7,
        "Markdown": 5,
        "HTML": 3
      },
      topRepos: [
        {
          name: "copilot-demo-app",
          stars: 245,
          forks: 123,
          url: "https://github.com/copilot-student/copilot-demo-app"
        },
        {
          name: "ai-pair-programming",
          stars: 187,
          forks: 82,
          url: "https://github.com/copilot-student/ai-pair-programming"
        }
      ]
    };
    
    res.json(syntheticStats);
  }
});

// Serve the main HTML file for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 