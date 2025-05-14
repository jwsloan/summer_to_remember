# Summer to Remember

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🚀 Quickstart

1. **Clone the repo:**
   ```sh
   git clone https://github.com/yourusername/summer_to_remember.git
   cd summer_to_remember
   ```

2. **Set up dependencies:**
   Follow your technology stack's dependency management approach.

3. **Set up Google APIs:**  
   Follow the [Setup instructions](#setup) below to configure Google APIs and OAuth credentials.

4. **Run the setup script:**
   Configure your Google Tasks list, Calendar, and Photos album, and store their IDs for the app.

5. **Deploy the app:**
   Deploy using the appropriate method for your chosen technology stack.

---

## 📚 Table of Contents

- [Purpose](#purpose)
- [Philosophy](#philosophy-built-on-familiar-tools-designed-with-story-first-engineering)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Security Considerations](#security-considerations)
- [UI Components](#ui-components)
- [Getting Started](#getting-started)
- [Google APIs Setup](#google-apis-setup)
- [Authentication Setup](#authentication-setup)
- [Development Practices](#development-practices)
- [Deployment](#deployment)
- [Data Security](#data-security)
- [Manual Test Checklist](#manual-test-checklist)
- [License](#license)
- [Google Resources Setup](#google-resources-setup)
- [Troubleshooting: Google Photos API 403 Errors](#troubleshooting-google-photos-api-403-errors)
- [Google API Scopes](#google-api-scopes)
- [Testing](#testing)
- [Running Tests](#running-tests)
- [Test Files](#test-files)

---

## Purpose
I am building a mobile-responsive application to help me and my spouse track, prioritize, and schedule activities throughout the summer. The app should connect Google Tasks, Google Calendar, and Google Photos, allowing us to manage activities, schedule events, and capture memories with photos. We want to integrate all three services, with a clean, simple UI that works well on mobile devices. The app should be lightweight and easy to use.

## Philosophy: Built on Familiar Tools, Designed with Story-First Engineering

This app is powered by the Google services you already use—Tasks, Calendar, and Photos. Rather than building a new ecosystem, it enhances the one you're already part of. You log in with Google, and everything else just works.

Development is guided by a story-first methodology. Every feature begins with a user-centered story, grounded in a clear information architecture (IA). Pages are defined by concise prompts that describe their structure, purpose, and behavior. Architecture Decisions (ADRs) document the "why" behind technical choices.

## Tech Stack
- **Platform:** Any platform that can integrate with Google APIs
- **Language:** Any programming language suitable for the chosen platform
- **UI Components:** Components with accessibility features
- **Build System:** Appropriate build system for your technology stack
- **Hosting:** Any suitable hosting platform
- **Data Storage:** Any suitable data storage system
- **Authentication:** Authentication system supporting Google Sign-In
- **Google APIs:**
  - Google Tasks API
  - Google Calendar API
  - Google Photos Library API
- **Security:** Implement appropriate security measures to protect user data
- **Testing:**
  - Unit Testing
  - Integration Testing
  - End-to-End Testing

## Features
- **Activity Management:** Users can create activities, assign priority, add descriptions, and schedule them.
- **Task Integration:** Activities are linked with Google Tasks to manage and prioritize what needs to be done.
- **Calendar Scheduling:** Activities can be scheduled in Google Calendar with event creation and viewing.
- **Memory Capture:** After activities, users can add photos from Google Photos to link memories to each activity.
- **Mobile-Responsive UI:** The app should work well on mobile browsers and be optimized for simplicity and usability.
- **Authentication:** Use OAuth to securely authenticate users for Google services.

## Security Considerations
- Use appropriate authentication mechanisms to authenticate users and manage secure tokens for accessing Google services.
- Implement appropriate security measures to control access to users' activity data.
- Ensure that all API calls are made securely.
- Use scoped OAuth tokens to limit the permissions granted to Google APIs (only calendar, tasks, and photos access).
- Store data securely and ensure minimal sensitive data storage on the client side.

## UI Components
- The application uses well-designed, accessible UI components.
- Customization is available via styling methods appropriate for your platform.

## Architecture & State Management
*(This section will be detailed as the architecture is implemented. Key aspects will include component architecture, routing, and state management appropriate for your chosen technology stack.)*

---

# Getting Started

## Google APIs Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. Go to **APIs & Services > Library** and enable:
   - Google Tasks API
   - Google Calendar API
   - Google Photos Library API
4. **Important: Add Google Photos Library API scopes to your OAuth consent screen**
   - In the left sidebar, click **Data Access**.
   - At the top of the Data Access page, click **Edit app** or **Add or Remove Scopes**.
   - In the dialog, search for and add:
     - `https://www.googleapis.com/auth/photoslibrary`
     - `https://www.googleapis.com/auth/photoslibrary.readonly`
     - `https://www.googleapis.com/auth/photoslibrary.appendonly`
   - Save your changes.
   - If your consent screen is in "testing" mode, make sure your Google account is listed as a test user (see the "Audience" section in the sidebar).
   - **Note:** This step is required for Google Photos API access. If you skip it, you will get 403 errors even if your code requests the correct scopes. Google Tasks and Calendar do not require this step, but Photos does.
5. In the OAuth consent screen, choose **External** (recommended for most users, including personal/family use) and fill out the required fields if you haven't already.
   
   **How to add test users:**
   - In the left sidebar, click **Audience**.
   - In the Audience section, find the "Test users" area.
   - Click "Add Users" and enter the email addresses of the Google accounts you want to allow access during testing (e.g., your own and your spouse's Gmail addresses).
   - Save your changes. Only these users will be able to authorize the app until it is published.

6. Go to **APIs & Services > Credentials** and create an **OAuth 2.0 Client ID**:
   - For local development:
     - Authorized origin: Your local development URL
     - Authorized redirect URI: Your local callback URL
   - For production:
     - Authorized origins: Your production URL(s)
     - Authorized redirect URI: Your production callback URL

## Authentication Setup
- Configure your app to authenticate users and set up Google Sign-In.
- Implement token storage and refresh mechanisms appropriate for your technology stack.

## Development Practices
To ensure code quality and maintainability:

1. Follow the linting and formatting rules defined for your technology stack.
2. Set up appropriate pre-commit hooks for your version control system.
3. Write tests for all features.
4. Follow the security best practices for your technology stack.

## Deployment
- Configure and deploy your app to your chosen hosting platform.
- Ensure your production environment is properly secured.

## Data Security
- Set up appropriate security measures to ensure only authenticated users can access their own data.
- Follow security best practices for your chosen data storage system.

---

## Manual Test Checklist
- [ ] Can sign in with Google
- [ ] Can add/view activities
- [ ] Can schedule/view events in calendar
- [ ] Can link/view photos as memories
- [ ] Data is only accessible when signed in
- [ ] App is mobile-friendly and responsive

---

## License
MIT (or your preferred license)

## Google Resources Setup

### Troubleshooting: Google Photos API 403 Errors
- If you receive a 403 error when accessing the Google Photos API, double-check that you have added the required Photos Library scope (`https://www.googleapis.com/auth/photoslibrary`) to your OAuth consent screen as described above. Tasks and Calendar will work without this, but Photos will not.
- After adding the scope, delete any stored tokens and re-authenticate to ensure your new token includes the approved scope.

## Google API Scopes

For Google Photos integration, use the top-level scope:

```
https://www.googleapis.com/auth/photoslibrary
```

This scope allows both creating and listing albums, and is required for full functionality.

## Testing

### Testing Strategy

- **Unit tests**: Cover logic, state transitions, and all actions (including async logic and error handling). Favor unit tests unless integration is required.
- **Integration tests**: Test interactions between components where needed.
- **End-to-end (E2E) tests**: Focus exclusively on real user journeys and visible outcomes. Only assert on visible UI elements and user-facing messages. Do not assert on implementation details or internal state. Use helpers to simulate authentication and other system states.
- **State setup**: Use helpers or fixtures to simulate authentication states for tests.
- **Error handling**: Only assert on errors or messages that are visible to the user.

This approach ensures tests are maintainable, fast, and focused on what matters most: the user experience.

### Running Tests
Instructions for running tests will depend on your chosen technology stack and test frameworks.

### Test Files
Tests will cover the key functionality of the application.

All acceptance criteria for [Story 001: Google OAuth Login & Dashboard Intro](stories/001-login-dashboard.md) are covered by these tests.

## Test Assets

- Test assets like placeholder content may be used for tests.

## Code Quality

To ensure a consistent, high-quality codebase, this project uses automated quality checks and pre-commit hooks that run before allowing a commit. This helps catch issues early and keeps the codebase clean and maintainable.

- **Code Quality Tools:**
  - Use appropriate linting and formatting tools for your technology stack
  - Ensure consistent code style
  - Run quality checks automatically before commits
- **Pre-commit Hooks:**
  - Use appropriate hooks for your version control system
  - Run quality checks and tests before allowing a commit
  - Ensure large files are not committed

### Setup Instructions

See the [rules/linting-and-precommit.md](rules/linting-and-precommit.md) rule for full details and configuration.

--- 