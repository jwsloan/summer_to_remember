const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5003',
    supportFile: 'cypress/support/index.js',
  },
});