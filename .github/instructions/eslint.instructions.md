---
applyTo: '**/eslint.config.mjs'
---

# ESLint Quick Fixes

## Prettier Integration
To prevent ESLint and Prettier conflicts, use `eslint-config-prettier`:

```javascript
import prettier from 'eslint-config-prettier';

export default [
  // ...other configs
  prettier // Apply last to override conflicting rules
];
```

Ensure `.prettierrc` matches ESLint style rules:
```json
{
  "singleQuote": false,
  "trailingComma": "none"
}
```

## Vite Dependency Error Fix
When libraries use Vite build tools, add this to eslint.config.mjs:

```javascript
{
  rules: {
    '@nx/dependency-checks': [
      'error',
      {
        ignoredDependencies: ['vite', 'vite-plugin-dts']
      }
    ]
  }
}
```

Prevents lint errors when build tools are in workspace root devDependencies.

## Style Rules
Rules in the root eslint.config.mjs apply to all files in the workspace:

```javascript
{
  files: [
    '**/*.ts',
    '**/*.tsx',
    '**/*.js',
    '**/*.jsx',
    '**/*.cjs',
    '**/*.mjs'
  ],
  rules: {
    'comma-dangle': ['error', 'never'] // No trailing commas
  }
}
```

*Note: Update this file when you find other common ESLint issues*
