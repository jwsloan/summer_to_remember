// authStore.js
// Reactive store for authentication state using Proxy (see ADR-001)

(function() {
const authState = {
  user: null,
  isLoggedIn: false,
  accessToken: null,
  idToken: null,
};

const subscribers = new Set();

const store = new Proxy(authState, {
  set(target, prop, value) {
    target[prop] = value;
    subscribers.forEach((cb) => cb(store));
    return true;
  },
});

function subscribe(cb) {
  subscribers.add(cb);
  return () => subscribers.delete(cb);
}

function setUser(user, accessToken, idToken) {
  store.user = user;
  store.isLoggedIn = !!user;
  store.accessToken = accessToken || null;
  store.idToken = idToken || null;
  // Persist to localStorage
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('idToken', idToken);
  } else {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
  }
}

// Redirect wrapper for navigation (for testability)
function redirect(url) {
  window.location.href = url;
}

// Restore from localStorage if available
try {
  const storedUser = localStorage.getItem('user');
  const storedAccessToken = localStorage.getItem('accessToken');
  const storedIdToken = localStorage.getItem('idToken');
  if (storedUser && storedIdToken) {
    authState.user = JSON.parse(storedUser);
    authState.isLoggedIn = true;
    authState.accessToken = storedAccessToken;
    authState.idToken = storedIdToken;
  }
} catch (e) {
  // Ignore parse errors, treat as logged out
}

function logout() {
  setUser(null);
}

// Namespace all globals under window.s2r
window.s2r = window.s2r || {};
window.s2r.auth = window.s2r.auth || {};
window.s2r.auth.store = store;
window.s2r.auth.setUser = setUser;
window.s2r.auth.subscribe = subscribe;
window.s2r.auth.redirect = redirect;
window.s2r.auth.logout = logout;
})(); 