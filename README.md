# Summer to Remember

## Purpose
I am building a static mobile-responsive web app to help me and my spouse track, prioritize, and schedule activities throughout the summer. The app should connect Google Tasks, Google Calendar, and Google Photos, allowing us to manage activities, schedule events, and capture memories with photos. We want to integrate all three services, with a clean, simple UI that works well on mobile devices. The app should be lightweight and easy to use.

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
4. Go to **APIs & Services > OAuth consent screen**. Choose **External** (recommended for most users, including personal/family use). Fill out the required fields.
   
   **How to add test users:**
   - In the OAuth consent screen setup, go to the **Audience** tab.
   - In the Audience section, find the "Test users" area.
   - Click "Add Users" and enter the email addresses of the Google accounts you want to allow access during testing (e.g., your own and your spouse's Gmail addresses).
   - Save your changes. Only these users will be able to authorize the app until it is published.

5. Go to **APIs & Services > Credentials** and create an **OAuth 2.0 Client ID** for a Web application:
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

---

## License
MIT (or your preferred license) 