# Development Guide

This guide covers all development practices, patterns, and workflows for this Nx workspace.

## Table of Contents

- [Core Guidelines](#core-guidelines)
- [TypeScript Configuration](#typescript-configuration)
- [ESM & Import Patterns](#esm--import-patterns)
- [App Development](#app-development)
- [Testing](#testing)
- [Code Style](#code-style)

## Core Guidelines

### Always Do Before Finishing
- **Verify changes** by running `npm test`
- **Review all changed files** to ensure no unintended changes
- **Check relevant documentation** sections when working with specific areas

### Workspace Philosophy
- Keep responses concise - quick answers for rapid development
- Stay positive - this is a learning environment
- Ask if unsure about anything
- Update documentation when discovering new patterns

## TypeScript Configuration

**See:** [TypeScript Configuration Guide](TYPESCRIPT_CONFIG.md) for comprehensive details.

### Quick Reference for New Projects

**New Apps Need:**
- `tsconfig.json` (orchestration)
- `tsconfig.app.json` (build config)
- `tsconfig.spec.json` (test config)

**New Libraries Need:**
- `tsconfig.json` (orchestration)
- `tsconfig.lib.json` (build config)
- `tsconfig.spec.json` (test config)

**Key Patterns:**
- All configs extend `../../tsconfig.base.json`
- Vite apps use `"moduleResolution": "bundler"`
- React: `"jsx": "react-jsx"`
- Vue: `"jsx": "preserve"` + `"jsxImportSource": "vue"`
- Add new library paths to `tsconfig.base.json`
- Add project references to consuming projects

**Validation:**
```bash
npm test                    # Verify all configs work
npx tsc --build --verbose   # Check project references
nx affected -t typecheck    # Type check affected projects
```

## ESM & Import Patterns

### The #1 ESM Gotcha
```typescript
import { foo } from './bar.js'  // ✅ Works
import { foo } from './bar'     // ❌ Fails at runtime
```

### Workspace Imports
```typescript
import { helper } from '@study/helpers'  // ✅ Correct - use package names
```

### Testing Framework Differences
- **Jest with SWC**: Auto-resolves `.ts` files, no `.js` extension needed
- **Vitest**: Strict ESM, requires `.js` extensions for relative imports

All `package.json` files have `"type": "module"` + NodeNext resolution.

## App Development

### Available Apps
- `@study/react` - React + Vite + Tailwind
- `@study/vue` - Vue + Vite + Tailwind  
- `@study/webcomponents` - Lit + Vite + Tailwind

### Shared Libraries
- `@study/helpers` - Utility functions
- `@study/navbar` - Shared navigation components
- `@study/pagetext` - Text content helpers
- `@study/calculator-logic` - Calculator functionality

### Development Commands
```bash
nx dev <app>    # Start development server
npm start       # Start all apps at once
```

## Testing

### Test Patterns
- Use **AAA pattern**: Arrange, Act, Assert
- Keep tests focused and descriptive

### Framework-Specific Testing
- **Jest**: Used for Node.js libraries
- **Vitest**: Used for Vite-based apps and libraries
- **Playwright**: Used for E2E testing
- **Cypress**: Used for component testing

## Code Style

### Naming & Structure
- Write self-documenting code with clear variable/function names
- Keep functions small and focused
- Break large functions into smaller ones with descriptive names
- Prefer descriptive function names over comments

### Comments & Documentation
- Minimize comments - only add when code cannot be made clearer
- Use JSDoc for functions that need documentation:
  - Complex algorithms
  - Public APIs
  - Non-obvious parameters or return values
  - Functions with side effects

### Auto-formatting
Add these settings to `.vscode/settings.json` for consistent formatting:
```json
{
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Nx Workspace Patterns

### Project Generation
When generating new projects:
1. Use `nx generate` commands
2. Follow TypeScript configuration patterns above
3. Update workspace documentation
4. Add to appropriate instruction files

### Task Running
- Use `nx run <project>:<task>` for specific projects
- Use `nx affected` for changed projects only
- Use `npm test` for full workspace validation

### Dependency Management
- Use workspace libraries via `@study/*` imports
- Update `tsconfig.base.json` paths when adding libraries
- Maintain project references for optimal builds
