// Use global variables for classic script setup
// Mock redirect to prevent navigation during tests
let originalRedirect;
before(() => {
  originalRedirect = window.s2r.redirect;
  // Override redirect to do nothing
  window.s2r.redirect = () => {};
});
after(() => {
  // Restore original redirect
  window.s2r.redirect = originalRedirect;
});

describe('authStore', () => {
  beforeEach(() => {
    localStorage.clear();
    window.s2r.auth.store.user = null;
    window.s2r.auth.store.isLoggedIn = false;
    window.s2r.auth.store.accessToken = null;
    window.s2r.auth.store.idToken = null;
    originalRedirect = window.s2r.auth.redirect;
    window.s2r.auth.redirect = () => {};
  });

  afterEach(() => {
    window.s2r.auth.redirect = originalRedirect;
  });

  it('should start logged out', () => {
    expect(window.s2r.auth.store.isLoggedIn).to.equal(false);
    expect(window.s2r.auth.store.user).to.equal(null);
  });

  it('should log in and persist user', () => {
    const user = { email: 'test@example.com' };
    window.s2r.auth.setUser(user, 'access', 'id');
    expect(window.s2r.auth.store.isLoggedIn).to.equal(true);
    expect(window.s2r.auth.store.user.email).to.equal('test@example.com');
  });

  it('should log out and clear user', () => {
    window.s2r.auth.logout();
    expect(window.s2r.auth.store.isLoggedIn).to.equal(false);
    expect(window.s2r.auth.store.user).to.equal(null);
  });

  it('should notify subscribers on change', () => {
    let called = false;
    const unsub = window.s2r.auth.subscribe(() => { called = true; });
    window.s2r.auth.setUser({ displayName: 'A' }, 'a', 'b');
    expect(called).to.equal(true);
    unsub();
  });
}); 