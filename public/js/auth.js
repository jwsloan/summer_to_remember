// auth.js
// Placeholder for Firebase Authentication and Google Sign-In logic

// TODO: Initialize Firebase and handle user authentication 

// Firebase Authentication and Google Sign-In logic
//
// Requirements:
// - Use Firebase via CDN (add to HTML if not present)
// - Use config from public/js/config.js (Firebase config and OAUTH_CLIENT_IDS)
// - Provide signInWithGoogle() and signOut() helpers
// - Listen for auth state changes
// - No frameworks, no build tools
//
// ---
//
// 1. Ensure the following Firebase CDN scripts are in your HTML <head>:
// <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>
//
// 2. In public/js/config.js, export your firebaseConfig object and OAUTH_CLIENT_IDS
//    Example:
//    const firebaseConfig = { ... };
//    const OAUTH_CLIENT_IDS = { ... };
//
// 3. This file handles auth logic only.

// --- Firebase Initialization ---
// (Assumes firebaseConfig is defined in config.js)
if (typeof firebaseConfig === 'undefined') {
  throw new Error('Missing firebaseConfig. Please define it in public/js/config.js');
}

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// --- Google Sign-In Provider ---
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

// --- Sign In/Out Helpers ---
function signInWithGoogle() {
  return auth.signInWithPopup(provider);
}

function signOut() {
  return auth.signOut();
}

// --- Auth State Listener ---
function onAuthStateChanged(callback) {
  return auth.onAuthStateChanged(callback);
}

// --- Expose helpers globally ---
window.authHelpers = {
  signInWithGoogle,
  signOut,
  onAuthStateChanged,
  getCurrentUser: () => auth.currentUser,
};

// Example usage (in your main JS or HTML):
// window.authHelpers.onAuthStateChanged(user => {
//   if (user) {
//     // User is signed in
//   } else {
//     // User is signed out
//   }
// }); 