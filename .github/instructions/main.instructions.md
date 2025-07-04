---
applyTo: "**"
---

# Core Development Guidelines

**ALWAYS verify changes by running `npm test` before finishing**
**ALWAYS review all changed files at the end to ensure no unintended changes**
**ALWAYS refer to `docs/DEVELOPMENT_GUIDE.md` for development patterns and practices**

## Quick Reference

- **TypeScript configs**: See `docs/TYPESCRIPT_CONFIG.md` and `docs/DEVELOPMENT_GUIDE.md#typescript-configuration`
- **ESM imports**: See `docs/DEVELOPMENT_GUIDE.md#esm--import-patterns`
- **App development**: See `docs/DEVELOPMENT_GUIDE.md#app-development`
- **Code style**: See `docs/DEVELOPMENT_GUIDE.md#code-style`
- **Nx project configuration**: See `docs/DEVELOPMENT_GUIDE.md#nx-workspace-patterns`

## Critical Patterns

**Nx Project Configuration:**

- **ALWAYS use `package.json`** instead of `project.json` for target configuration
- Use the `"nx"` property in package.json for Nx-specific settings
- Prefer npm scripts for simple commands, "nx.targets" for complex executors

## Meta

These instruction files are living documents. When you learn new patterns:

- Update `docs/DEVELOPMENT_GUIDE.md` with comprehensive information
- Keep instruction files lightweight and pointing to docs
- **When user says "always do X" - update the development guide**
