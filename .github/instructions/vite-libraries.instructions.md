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

## HMR with Buildable Libraries
For live reload of library changes in consuming apps:
1. Point path mappings in tsconfig.base.json directly to lib source files
2. Configure Vite to watch library source files with `server.watch.ignored` 
   ```typescript
   watch: {
     usePolling: true,
     // Make sure Vite watches library source files, not just the built output
     ignored: ['!**/node_modules/**', '!**/dist/**'],
   }
   ```

*Add new patterns here as you discover them*
