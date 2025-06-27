---
applyTo: '**/eslint.config.mjs'
---

# ESLint Quick Fixes

## Vite Dependency Error Fix
When libraries use Vite build tools, add this to eslint.config.mjs:

```javascript
{
  rules: {
    '@nx/dependency-checks': [
      'error',
      {
        ignoredDependencies: ['vite', 'vite-plugin-dts'],
      },
    ],
  },
}
```

Prevents lint errors when build tools are in workspace root devDependencies.

*Note: Update this file when you find other common ESLint issues*
