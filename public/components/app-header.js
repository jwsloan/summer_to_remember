class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['title'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'title') {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute('title') || '';
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 56px;
          background: #fff;
          border-bottom: 1px solid #dadce0;
          z-index: 100;
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          padding: 0 16px;
          font-family: Roboto, Arial, sans-serif;
        }
        .title {
          font-size: 16px;
          font-weight: bold;
          color: #202124;
        }
        .actions {
          display: flex;
          gap: 8px;
        }
        @media (max-width: 600px) {
          .actions {
            gap: 0;
          }
        }
      </style>
      <div class="header">
        <span class="title">${title}</span>
        <div class="actions">
          <sl-button variant="text" class="photos-btn" onclick="window.location.href='/photos.html'">Photos</sl-button>
          <sl-button variant="text" class="auth-btn"></sl-button>
        </div>
      </div>
    `;
    // Set up auth button text and handler
    const authBtn = this.shadowRoot.querySelector('.auth-btn');
    const isLoginPage = window.location.pathname.endsWith('/login.html');
    if (isLoginPage) {
      authBtn.style.display = 'none';
    } else if (window.s2r.auth && window.s2r.auth.store && window.s2r.auth.store.isLoggedIn) {
      authBtn.textContent = 'Logout';
      authBtn.onclick = () => window.s2r.auth.logout();
      authBtn.style.display = '';
    } else {
      authBtn.textContent = 'Login';
      authBtn.onclick = () => window.location.href = '/login.html';
      authBtn.style.display = '';
    }
  }
}
customElements.define('app-header', AppHeader); 