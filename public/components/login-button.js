class LoginButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        sl-button {
          --sl-color-primary: #1a73e8;
          font-size: 16px;
          width: 100%;
        }
      </style>
      <sl-button variant="primary" class="google-login">
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style="height:20px;vertical-align:middle;margin-right:8px;"> Sign in with Google
      </sl-button>
    `;
    this.shadowRoot.querySelector('.google-login').onclick = () => {
      if (window.s2r.auth && typeof window.s2r.auth.login === 'function') {
        window.s2r.auth.login();
      }
    };
  }
}
customElements.define('login-button', LoginButton); 