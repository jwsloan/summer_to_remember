// Patch navigation to prevent leaving the test runner
before(() => {
  window._originalAssign = window.location.assign;
  window._originalReplace = window.location.replace;
  window.location.assign = () => {};
  window.location.replace = () => {};
});
after(() => {
  window.location.assign = window._originalAssign;
  window.location.replace = window._originalReplace;
});

describe('app-header', () => {
  beforeEach(() => {
    // Reset auth state
    window.s2r.auth.store.isLoggedIn = false;
    window.s2r.auth.store.user = null;
  });

  it('hides auth button on login page', async () => {
    window.history.pushState({}, '', '/login.html');
    const el = await window.fixture(window.html`<app-header title="Login"></app-header>`);
    const authBtn = el.shadowRoot.querySelector('.auth-btn');
    expect(authBtn.style.display).to.equal('none');
  });

  it('shows logout when logged in', async () => {
    window.history.pushState({}, '', '/dashboard.html');
    window.s2r.auth.store.isLoggedIn = true;
    window.s2r.auth.store.user = { displayName: 'Test' };
    const el = await window.fixture(window.html`<app-header title="Dashboard"></app-header>`);
    const authBtn = el.shadowRoot.querySelector('.auth-btn');
    expect(authBtn.textContent).to.include('Logout');
    expect(authBtn.style.display).to.not.equal('none');
  });

  it('shows login when logged out', async () => {
    window.history.pushState({}, '', '/');
    window.s2r.auth.store.isLoggedIn = false;
    window.s2r.auth.store.user = null;
    const el = await window.fixture(window.html`<app-header title="Home"></app-header>`);
    const authBtn = el.shadowRoot.querySelector('.auth-btn');
    expect(authBtn.textContent).to.include('Login');
    expect(authBtn.style.display).to.not.equal('none');
  });
}); 