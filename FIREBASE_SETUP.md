# Firebase Setup Instructions

## 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name (e.g., "summer-to-remember")
4. Enable Google Analytics (optional)

## 2. Enable Authentication
1. In Firebase Console, go to Authentication → Sign-in method
2. Enable "Google" provider
3. Add your domain to authorized domains

## 3. Create Web App
1. In Project Overview, click "Add app" → Web
2. Enter app nickname
3. Copy the Firebase config object

## 4. Update Configuration
Edit `src/js/firebase-config.js` and replace the placeholder values with your Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-actual-app-id"
};
```

## 5. Test Authentication
1. Run `npm run serve`
2. Visit `/login/` 
3. Click "Sign in with Google"
4. Should redirect to home page after successful login