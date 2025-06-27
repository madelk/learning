---
applyTo: 'libs/**'
---

# Library Development Checklist

## New Library Setup
1. Copy `vite.config.ts` from existing library
2. Update entry points for your exports  
3. Libraries get build/test/typecheck targets only (no dev/preview)

## Required Vite Patterns
- Use `vite-plugin-dts` for TypeScript declarations
- Set `formats: ['es']` for ESM-only output
- Test environment: 'node' for utils, 'jsdom' for React components

*Add new patterns here as you discover them*
