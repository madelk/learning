import vue from 'eslint-plugin-vue';
import vuePrettierConfig from '@vue/eslint-config-prettier';
import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  ...vue.configs['flat/recommended'],
  ...vuePrettierConfig,
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: await import('@typescript-eslint/parser')
      }
    },
    rules: {
      'vue/html-self-closing': 'off'
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  }
];
