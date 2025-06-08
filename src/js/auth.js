// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoQBTMnVZDFfPryRUJ3mF0tToK-Rwt29s",
  authDomain: "summer-to-remember.firebaseapp.com",
  projectId: "summer-to-remember",
  storageBucket: "summer-to-remember.firebasestorage.app",
  messagingSenderId: "823152942170",
  appId: "1:823152942170:web:4b72efc5a839e38aec0c63"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

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
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
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

// Update UI based on auth state
function updateAuthUI(user) {
  const authLinks = document.querySelectorAll('#auth-link, .mobile-auth-link');
  if (authLinks.length === 0) return;
  
  authLinks.forEach(authLink => {
    if (user) {
      // User is signed in - show user info
      authLink.textContent = user.displayName || user.email || 'Account';
      authLink.href = '#';
      authLink.onclick = (e) => {
        e.preventDefault();
        if (confirm('Sign out?')) {
          auth.signOut();
        }
      };
      authLink.classList.remove('nav-link-accent');
    } else {
      // User is signed out - show login link
      authLink.textContent = 'Login';
      authLink.href = '/login/';
      authLink.onclick = null;
      authLink.classList.add('nav-link-accent');
    }
  });
}

// Set up auth state observer when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Auth state observer
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log('User signed in:', user.displayName);
      updateAuthUI(user);
      // User is signed in, redirect if on login page
      if (window.location.pathname === '/login/') {
        window.location.href = '/';
      }
    } else {
      console.log('User signed out');
      updateAuthUI(null);
      // User is signed out, redirect to login if not already there
      if (window.location.pathname !== '/login/' && window.location.pathname !== '/') {
        window.location.href = '/login/';
      }
    }
  });
});