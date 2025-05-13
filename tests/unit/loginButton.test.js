describe('login-button', () => {
  let loginCalled;
  beforeEach(() => {
    loginCalled = false;
    window.s2r = window.s2r || {};
    window.s2r.auth = window.s2r.auth || {};
    window.s2r.auth.login = () => { loginCalled = true; };
  });
  afterEach(() => {
    // Remove all login-button elements from the DOM
    document.querySelectorAll('login-button').forEach(el => el.remove());
  });

  it('renders the Google sign-in button', async () => {
    const el = await window.fixture('<login-button></login-button>');
    const btn = el.shadowRoot.querySelector('.google-login');
    expect(btn).to.exist;
    expect(btn.textContent).to.include('Sign in with Google');
  });

  it('calls authStore.login on click', async () => {
    const el = await window.fixture('<login-button></login-button>');
    const btn = el.shadowRoot.querySelector('.google-login');
    btn.click();
    expect(loginCalled).to.equal(true);
  });

  it('does nothing if authStore.login is not a function', async () => {
    window.s2r.auth.login = null;
    const el = await window.fixture('<login-button></login-button>');
    const btn = el.shadowRoot.querySelector('.google-login');
    // Should not throw
    expect(() => btn.click()).to.not.throw();
  });
}); 