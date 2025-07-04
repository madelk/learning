import prettier from 'eslint-config-prettier';
import vue from 'eslint-plugin-vue';
import baseConfig from '../../eslint.config.mjs';

const config = [
  ...baseConfig,
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: await import('vue-eslint-parser'),
      parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    rules: {
      // Vue 3 Composition API strict rules
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/custom-event-name-casing': ['error', 'camelCase'],
      'vue/define-macros-order': [
        'error',
        {
          order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots']
        }
      ],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always'
          },
          svg: 'always',
          math: 'always'
        }
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: { max: 1 }
        }
      ],
      'vue/html-closing-bracket-newline': [
        'error',
        {
          singleline: 'never',
          multiline: 'always'
        }
      ],
      'vue/no-multiple-template-root': 'off', // Vue 3 allows multiple roots
      'vue/no-v-html': 'error', // Security
      'vue/prefer-true-attribute-shorthand': 'error',
      'vue/require-explicit-emits': 'error',
      'vue/block-order': [
        'error',
        {
          order: ['script', 'template', 'style']
        }
      ],
      'vue/component-options-name-casing': ['error', 'PascalCase'],
      'vue/match-component-file-name': [
        'error',
        {
          extensions: ['vue'],
          shouldMatchCase: true
        }
      ],
      'vue/no-boolean-default': 'error',
      'vue/no-duplicate-attr-inheritance': 'error',
      'vue/no-empty-component-block': 'error',
      'vue/no-multiple-objects-in-class': 'error',
      'vue/no-potential-component-option-typo': 'error',
      'vue/no-reserved-props': 'error',
      'vue/no-static-inline-styles': 'error',
      'vue/no-template-target-blank': 'error',
      'vue/no-this-in-before-route-enter': 'error',
      'vue/no-undef-components': [
        'error',
        {
          ignorePatterns: ['custom-*']
        }
      ],
      'vue/no-undef-properties': 'error',
      'vue/no-unsupported-features': 'error',
      'vue/no-unused-properties': 'error',
      'vue/no-unused-refs': 'error',
      'vue/no-useless-mustaches': 'error',
      'vue/no-useless-v-bind': 'error',
      'vue/padding-line-between-blocks': 'error',
      'vue/prefer-separate-static-class': 'error',
      'vue/require-direct-export': 'error',
      'vue/require-expose': 'error',
      'vue/require-macro-variable-name': 'error',
      'vue/require-name-property': 'error',
      'vue/script-setup-uses-vars': 'error',
      'vue/valid-define-emits': 'error',
      'vue/valid-define-props': 'error'
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'error', // Re-enable this for better practices
      'vue/no-reserved-component-names': 'error',
      'vue/no-unused-components': 'error',
      'vue/no-unused-vars': 'error'
    }
  },
  prettier
];

export default config;
