// Custom Cypress commands for authentication state
Cypress.Commands.add('logout', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('user');
    win.localStorage.removeItem('idToken');
    win.localStorage.removeItem('accessToken');
  });
});

Cypress.Commands.add('loginAsTestUser', () => {
  cy.window().then((win) => {
    win.localStorage.setItem('user', JSON.stringify({ displayName: 'Test User', photoURL: 'https://via.placeholder.com/40' }));
    win.localStorage.setItem('idToken', 'fake-token');
    win.localStorage.setItem('accessToken', 'fake-access');
  });
});

Cypress.Commands.add('ensureFirebaseInitialized', () => {
  return cy.window({ log: false }).then(win => {
    if (win.s2r && typeof win.s2r.initAuthController === 'function') {
      return win.s2r.initAuthController();
    }
    return Cypress.Promise.resolve();
  });
});

Cypress.Commands.add('stubGoogleLogin', (user = { uid: 'test-uid', email: 'test@example.com', displayName: 'Test User', photoURL: 'https://via.placeholder.com/40' }) => {
  return cy.ensureFirebaseInitialized().then(() => {
    return cy.window({ log: false }).then(win => {
      if (!win.firebase || typeof win.firebase.auth !== 'function') {
        throw new Error('Firebase auth not available or not a function after initialization attempt.');
      }
      if (!win.firebase.apps || win.firebase.apps.length === 0) {
        throw new Error('Firebase app not initialized after initialization attempt.');
      }
      const authInstance = win.firebase.auth();
      let onAuthStateChangedCallback = null;
      cy.stub(authInstance, 'onAuthStateChanged').callsFake((callback) => {
        onAuthStateChangedCallback = callback;
        return () => { onAuthStateChangedCallback = null; };
      }).as('onAuthStateChangedStub');
      cy.stub(authInstance, 'signInWithPopup').callsFake(() => {
        const simulatedUser = {
          ...user,
          getIdToken: () => Promise.resolve('fake-id-token'),
        };
        const simulatedResult = {
          user: simulatedUser,
          credential: { accessToken: 'fake-access-token' },
        };
        Cypress.Promise.resolve(simulatedResult).then(() => {
          if (onAuthStateChangedCallback) {
            win.requestAnimationFrame(() => {
              onAuthStateChangedCallback(simulatedUser);
            });
          }
        });
        return Promise.resolve(simulatedResult);
      }).as('signInWithPopupStub');
    });
  });
}); 