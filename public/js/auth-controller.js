// Handles Firebase Authentication with Google Sign-In
// Requires firebaseConfig and OAUTH_CLIENT_IDS from config.js
// Updates authStore on login/logout

function initAuthController() {
  return new Promise((resolve, reject) => {
    // Load Firebase via CDN if not already loaded
    if (!window.firebase) {
      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js';
      script.onload = () => {
        const authScript = document.createElement('script');
        authScript.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js';
        authScript.onload = () => attemptFirebaseSetup(resolve, reject);
        authScript.onerror = reject;
        document.head.appendChild(authScript);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    } else {
      attemptFirebaseSetup(resolve, reject);
    }
  });
}

function attemptFirebaseSetup(resolve, reject) {
  function _waitForFirebase(cb) {
    if (window.firebase && window.firebase.auth) {
      cb();
    } else {
      setTimeout(() => _waitForFirebase(cb), 50);
    }
  }

  _waitForFirebase(() => {
    try {
      // Initialize Firebase app
      if (!window.firebase.apps?.length) {
        window.firebase.initializeApp(window.firebaseConfig || firebaseConfig);
      }

      const provider = new firebase.auth.GoogleAuthProvider();

      // Login with Google
      function login() {
        _waitForFirebase(() => {
          const provider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithPopup(provider)
            .then((result) => {
              result.user.getIdToken().then((idToken) => {
                const accessToken = result.credential && result.credential.accessToken;
                window.s2r.auth.setUser({
                  displayName: result.user.displayName,
                  email: result.user.email,
                  photoURL: result.user.photoURL,
                  uid: result.user.uid,
                }, accessToken, idToken);
                window.location.href = '/dashboard.html';
              });
            })
            .catch((error) => {
              alert('Login failed: ' + error.message);
            });
        });
      }

      // Logout
      function logout() {
        _waitForFirebase(() => {
          firebase.auth().signOut().then(() => {
            window.s2r.auth.setUser(null);
            window.location.href = '/login.html';
          });
        });
      }

      // Listen for auth state changes
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          user.getIdToken().then((idToken) => {
            window.s2r.auth.setUser({
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              uid: user.uid,
            }, null, idToken);
          });
        } else {
          window.s2r.auth.setUser(null);
        }
      });

      window.s2r.auth.login = login;
      window.s2r.auth.logout = logout;
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

window.s2r = window.s2r || {};
window.s2r.auth = window.s2r.auth || {};
window.s2r.initAuthController = initAuthController; 