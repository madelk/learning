import baseConfig from '../../eslint.config.mjs';

const config = [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // Libraries should have explicit return types
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      
      // Libraries should not have console statements
      'no-console': 'error',
      
      // Libraries should have proper exports
      '@typescript-eslint/consistent-type-imports': 'error'
    }
  },
  {
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs}'],
          ignoredDependencies: ['vite', 'vite-plugin-dts']
        }
      ]
    },
    languageOptions: {
      parser: await import('jsonc-eslint-parser')
    }
  }
];

export default config;
