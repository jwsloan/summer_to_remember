# Summer to Remember

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🚀 Quickstart

1. **Clone the repo:**
   ```sh
   git clone https://github.com/yourusername/summer_to_remember.git
   cd summer_to_remember
   ```

2. **Install CLI dependencies:**
   ```sh
   cd cli
   npm install
   ```

3. **Set up Firebase and Google APIs:**  
   Follow the [Setup instructions](#setup) below to configure Firebase, Google APIs, and OAuth credentials.

4. **Run the CLI setup script:**
   ```sh
   node cli/manual_try.js
   ```
   This will create your Google Tasks list, Calendar, and Photos album, and store their IDs for the app.

5. **Deploy the app:**
   ```sh
   firebase deploy
   ```

---

## 📚 Table of Contents

- [Purpose](#purpose)
- [Philosophy](#philosophy-built-on-familiar-tools-designed-with-story-first-engineering)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Security Considerations](#security-considerations)
- [Shoelace Integration](#shoelace-integration)
- [Getting Started](#getting-started)
- [Set Up Firebase Project](#1-set-up-firebase-project)
- [Enable Google Authentication in Firebase](#1a-enable-google-authentication-in-firebase)
- [Enable Google APIs and Set Up OAuth](#2-enable-google-apis-and-set-up-oauth)
- [Configure Firebase Authentication](#3-configure-firebase-authentication)
- [Set Up Pre-commit Hooks (Recommended)](#3-set-up-pre-commit-hooks-recommended)
- [Deploying the App](#4-deploying-the-app)
- [Firestore Security Rules](#5-firestore-security-rules)
- [Manual Test Checklist](#manual-test-checklist)
- [License](#license)
- [CLI: Setup Google Resources](#cli-setup-google-resources)
- [Troubleshooting: Google Photos API 403 Errors](#troubleshooting-google-photos-api-403-errors)
- [Google API Scopes](#google-api-scopes)
- [Testing](#testing)
- [Running Tests](#running-tests)
- [Test Files](#test-files)

---

## Purpose
I am building a static mobile-responsive web app to help me and my spouse track, prioritize, and schedule activities throughout the summer. The app should connect Google Tasks, Google Calendar, and Google Photos, allowing us to manage activities, schedule events, and capture memories with photos. We want to integrate all three services, with a clean, simple UI that works well on mobile devices. The app should be lightweight and easy to use.

## Philosophy: Built on Familiar Tools, Designed with Story-First Engineering

This app is powered by the Google services you already use—Tasks, Calendar, and Photos. Rather than building a new ecosystem, it enhances the one you're already part of. You log in with Google, and everything else just works.

Development is guided by a story-first methodology. Every feature begins with a user-centered story, grounded in a clear information architecture (IA). Pages are defined by concise prompts that describe their structure, purpose, and behavior. Architecture Decisions (ADRs) document the "why" behind technical choices. This structure enables high collaboration between humans and LLMs, ensuring thoughtful, testable, and consistent design as the app grows.

## Tech Stack
- **Frontend:** Plain HTML, CSS, and JavaScript (no frameworks like React; just a simple static website)
- **UI Components:** Shoelace for prebuilt, accessible web components
- **Hosting:** Firebase Hosting for deployment (or a similar option for static sites)
- **Database:** Firebase Firestore for storing activity data, user preferences, and photos metadata
- **Authentication:** Firebase Authentication with Google Sign-In to manage user sessions
- **Google APIs:**
  - Google Tasks API for managing tasks
  - Google Calendar API for scheduling events
  - Google Photos API for selecting and associating photos with activities
- **Security:** Implement Firebase Firestore security rules to ensure only authenticated users can access their data

## Features
- **Activity Management:** Users can create activities, assign priority, add descriptions, and schedule them.
- **Task Integration:** Activities are linked with Google Tasks to manage and prioritize what needs to be done.
- **Calendar Scheduling:** Activities can be scheduled in Google Calendar with event creation and viewing.
- **Memory Capture:** After activities, users can add photos from Google Photos to link memories to each activity.
- **Mobile-Responsive UI:** The app should work well on mobile browsers and be optimized for simplicity and usability.
- **OAuth 2.0:** Use Google Sign-In (client-side OAuth) to securely authenticate users without exposing credentials.

## Security Considerations
- Use Firebase Authentication to authenticate users and manage secure tokens for accessing Google services.
- Implement Firebase Firestore Security Rules to control access to users' activity data.
- Ensure that all API calls are made using HTTPS.
- Use scoped OAuth tokens to limit the permissions granted to Google APIs (only calendar, tasks, and photos access).
- Store data securely in Firestore, and ensure minimal sensitive data storage on the frontend.

## Shoelace Integration
- **Design & Aesthetics:** Shoelace provides a collection of professionally designed, accessible UI components that look polished and modern without additional styling.
- **Customization:** It utilizes CSS custom properties (design tokens) and the ::part pseudo-element, allowing you to easily tweak themes, colors, and layouts to match your branding.
- **Ease of Use:** Shoelace is framework-agnostic and can be integrated into any project with minimal setup, making it ideal for static sites or projects without a build system.
- **Integration:** Components can be included via CDN, enabling quick and easy incorporation into the project without the need for complex build tools.

## Architecture & State Management
- The app uses a lightweight, modular architecture:
  - **Reactive Store:** State is managed using a Proxy-based store (see ADR-003), enabling reactive updates and easy test coverage.
  - **Web Components:** UI elements like `<app-header>` and `<login-button>` are implemented as custom elements for reusability and separation of concerns.
  - **No frameworks or build tools:** All code runs natively in the browser, with Shoelace components included via CDN.

---

# Getting Started

## 1. Set Up Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. In the Firebase project, add a new web app and register it.
3. Copy the Firebase config object for use in your app (you'll add this to your JS later).
   - **How to get your Firebase config:**
     - In the Firebase Console, go to your project.
     - Click the gear icon next to "Project Overview" and select **Project settings**.
     - Scroll down to the **Your apps** section and select your web app (or add one if you haven't yet).
     - Under **Firebase SDK snippet**, select **Config**.
     - Copy the config object (it looks like a JavaScript object with keys like `apiKey`, `authDomain`, etc.).
     - Paste this object into `public/js/config.js` as the value for `const firebaseConfig = { ... }`.
4. In the Firebase Console, enable **Authentication** > **Sign-in method** > **Google**.
5. In **Firestore Database**, create a database in "production mode" (or test mode, but set up security rules before going live).

## 1a. Enable Google Authentication in Firebase

After setting up your Firebase project and web app:

1. Go to the [Firebase Console](https://console.firebase.google.com/) and select your project.
2. In the left sidebar, click **Build** > **Authentication**.
3. Click the **Sign-in method** tab at the top.
4. Find **Google** in the list of providers and click on it.
5. Toggle **Enable** to ON.
6. (Optional) Enter your app's public-facing name and support email if prompted.
7. Click **Save**.

Google Sign-In is now enabled for your project. You can now use Google authentication in your app.

## 2. Enable Google APIs and Set Up OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. In the project picker, select your Firebase project. (If you don't see it, click 'All' or search by Project ID from Firebase Console > Project Settings.)
3. Go to **APIs & Services > Library** and enable:
   - Google Tasks API
   - Google Calendar API
   - Google Photos Library API
   - Google Picker API
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

6. Go to **APIs & Services > Credentials** and create an **OAuth 2.0 Client ID** for a Web application:
   - For local development:
     - Authorized JavaScript origin: `http://localhost:5000` (default for Firebase Hosting emulators)
     - Authorized redirect URI: `http://localhost:5000`
     - Copy the client ID and set it as `local` in `public/js/config.js`:
       ```js
       const OAUTH_CLIENT_IDS = {
         local: "YOUR_LOCAL_CLIENT_ID.apps.googleusercontent.com",
         production: ""
       };
       ```
   - For production (deployed app):
     - Authorized JavaScript origins: `https://your-app.web.app`, `https://your-app.firebaseapp.com` (and any custom domain)
     - Authorized redirect URI: your deployed callback URL
     
     **How to find your deployed callback URL:**
     - After deploying your app with Firebase Hosting, your app will be live at a URL like `https://your-app.web.app` or your custom domain.
     - The callback URL is typically the root of your deployed site (e.g., `https://your-app.web.app`), unless you use a specific path for authentication callbacks.
     - To confirm, visit your Firebase Hosting dashboard and look for the "Hosting URL" of your deployed site. Use this as your Authorized JavaScript origin and redirect URI in the Google Cloud Console.
     - Example:
       - Authorized JavaScript origin: `https://your-app.web.app`
       - Authorized redirect URI: `https://your-app.web.app`
     - If you use a custom domain, add that as well (e.g., `https://summer.yourdomain.com`).
     - Copy the client ID and set it as `production` in `public/js/config.js`:
       ```js
       const OAUTH_CLIENT_IDS = {
         local: "YOUR_LOCAL_CLIENT_ID.apps.googleusercontent.com",
         production: "YOUR_PRODUCTION_CLIENT_ID.apps.googleusercontent.com"
       };
       ```

## 3. Configure Firebase Authentication
- In your JS (e.g., `js/auth.js`), initialize Firebase with your config and set up Google Sign-In using Firebase Auth.
- Make sure to use the OAuth Client ID you created above.

## 3. Set Up Pre-commit Hooks (Recommended)
To ensure code style and prevent large files from being committed, set up pre-commit hooks:

1. Install pre-commit (requires Python):
   ```sh
   pip install pre-commit
   ```
2. Install the git hook scripts:
   ```sh
   pre-commit install
   ```
3. (Optional) Run on all files now:
   ```sh
   pre-commit run --all-files
   ```

This will automatically format your HTML, CSS, and JS files with Prettier and block files over 2MB on every commit.

## 4. Deploying the App
- Use [Firebase Hosting](https://firebase.google.com/docs/hosting) or any static hosting provider.
- For Firebase Hosting:
  1. Install Firebase CLI: `npm install -g firebase-tools`
  2. Run `firebase login` and `firebase init hosting` in your project directory.
  3. Deploy with `firebase deploy`.

## 5. Firestore Security Rules
- Set up Firestore security rules to ensure only authenticated users can access their own data. Example:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## Manual Test Checklist
- [ ] Can sign in with Google
- [ ] Can add/view activities
- [ ] Can schedule/view events in calendar
- [ ] Can link/view photos as memories
- [ ] Data is only accessible when signed in
- [ ] App is mobile-friendly and responsive
- All store logic and state transitions are covered by unit tests, ensuring reliability and supporting future refactoring.

---

## License
MIT (or your preferred license)

## CLI: Setup Google Resources

To quickly create your Google Tasks list, Calendar, and Photos album for this app, use the CLI tool in the `cli/` directory. See [cli/README.md](cli/README.md) for instructions. 

### Troubleshooting: Google Photos API 403 Errors
- If you receive a 403 error when accessing the Google Photos API, double-check that you have added the required Photos Library scope (`https://www.googleapis.com/auth/photoslibrary`) to your OAuth consent screen as described above. Tasks and Calendar will work without this, but Photos will not.
- After adding the scope, delete your `token.json` (or equivalent) and re-authenticate to ensure your new token includes the approved scope.

## Google API Scopes

For Google Photos integration, use the top-level scope:

```
https://www.googleapis.com/auth/photoslibrary
```

This scope allows both creating and listing albums, and is required for full functionality.

## ⚠️ About Global Variables and Module Constraints

**Why are we using global variables instead of ES modules?**

To maximize browser compatibility and avoid the need for build tools or module loaders, all JavaScript in this project is written as classic scripts and attached to the global `window` object. This approach:
- Ensures everything runs natively in the browser (no build step required)
- Allows both the app and browser-based tests to access shared state and functions
- Avoids issues with mixing ES modules and classic scripts, which can cause syntax errors in browsers

**Is this a code smell?**
- In modern JavaScript, yes—using globals is discouraged for large or complex projects.
- For this project, given the constraints (no build tools, no frameworks, static site), it is the most pragmatic and robust solution.

**If you ever migrate to a build system or module loader, refactor to use ES modules and imports/exports.**

## Testing

This project uses Mocha and Chai for browser-based unit testing. All store logic, authentication, and UI components related to login and dashboard are covered by unit tests, including:

### Testing Strategy

- **Unit tests**: Cover store logic, state transitions, and all actions (including async logic and error handling). Favor unit tests unless integration is required.
- **Integration tests**: Test interactions between components where needed.
- **End-to-end (E2E) tests**: Focus exclusively on real user journeys and visible outcomes. Only assert on navigation, visible UI elements, and user-facing messages. Do not assert on implementation details, internal state, localStorage, or console output. Do not attempt to test third-party flows (e.g., Google OAuth); instead, use helpers to simulate logged-in or logged-out states.
- **State setup**: Use Cypress helpers (e.g., `cy.loginAsTestUser()`, `cy.logout()`, `cy.stubGoogleLogin()`) to simulate authentication states for E2E tests.
- **Error handling**: Only assert on errors or messages that are visible to the user.

This approach ensures tests are maintainable, fast, and focused on what matters most: the user experience.

### Running Tests

1. Run `bin/run-tests.sh` to start a local server and open the test runner in your browser.
2. All tests in `tests/unit/` will be executed automatically.

### Test Files
- `authStore.test.js`: Authentication state, login/logout, persistence, and error handling
- `appHeader.test.js`: Header UI, login/logout button, navigation
- `loginButton.test.js`: Google sign-in button rendering and click behavior
- `activityStore.test.js`: Activities store logic and reactivity
- `calendarStore.test.js`: Calendar events store logic and reactivity
- `memoryStore.test.js`: Photo memories store logic and reactivity

All acceptance criteria for [Story 001: Google OAuth Login & Dashboard Intro](stories/001-login-dashboard.md) are covered by these tests.

## Test Assets

- A placeholder image `test.png` is used for Cypress end-to-end tests as the test user's profile photo. It is located in `public/img/test.png`. Replace it with any image if you want a different test avatar.

--- 