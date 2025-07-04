import cypress from 'eslint-plugin-cypress/flat';
import baseConfig from '../../eslint.config.mjs';

const config = [
  cypress.configs['recommended'],
  ...baseConfig,
  {
    // Override or add rules here
    rules: {}
  }
];

export default config;
