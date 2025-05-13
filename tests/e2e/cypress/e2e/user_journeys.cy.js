describe('User journey: Login and Home', () => {
  before(() => {
    cy.logout();
  });

  it('shows login button for logged out users on home', () => {
    cy.visit('/');
    cy.get('login-button').should('exist');
  });

  it('navigates to dashboard page when login button is clicked', () => {
    cy.visit('/');
    cy.stubGoogleLogin();
    cy.get('login-button').as('loginBtn');
    cy.get('@loginBtn').should('be.visible');
    cy.get('@loginBtn').click();
    cy.url().should('include', '/dashboard.html');
  });
});

describe('User journey: Dashboard', () => {
  before(() => {
    cy.logout();
    cy.loginAsTestUser();
  });

  it('loads dashboard and shows user profile section', () => {
    cy.visit('/dashboard.html');
    cy.get('.user-profile').should('exist').and('contain', 'Test User');
  });

  it('redirects to login if not logged in', () => {
    cy.logout();
    cy.visit('/dashboard.html');
    cy.url().should('include', '/login.html');
  });
}); 