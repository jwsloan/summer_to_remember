import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import { firebaseConfig } from './firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Firebase Auth UI
const ui = new firebaseui.auth.AuthUI(auth);

// Firebase Auth UI configuration
const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // Redirect to home page after successful login
      window.location.href = '/';
      return false;
    }
  },
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: 'google.com',
      customParameters: {
        prompt: 'select_account'
      }
    }
  ],
  tosUrl: '/',
  privacyPolicyUrl: '/'
};

// Start Auth UI when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  const authContainer = document.getElementById('firebaseui-auth-container');
  if (authContainer) {
    ui.start('#firebaseui-auth-container', uiConfig);
  }
});

// Auth state observer
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User signed in:', user.displayName);
    // User is signed in, redirect if on login page
    if (window.location.pathname === '/login/') {
      window.location.href = '/';
    }
  } else {
    console.log('User signed out');
    // User is signed out, redirect to login if not already there
    if (window.location.pathname !== '/login/' && window.location.pathname !== '/') {
      window.location.href = '/login/';
    }
  }
});

export { auth };