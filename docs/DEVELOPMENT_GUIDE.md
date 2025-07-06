# Development Guide

This guide covers all development practices, patterns, and workflows for this Nx workspace.

## Table of Contents

- [Core Guidelines](#core-guidelines)
- [TypeScript Configuration](#typescript-configuration)
- [ESLint & Prettier](#eslint--prettier)
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

### Known Issues

**VS Code TypeScript "rootDir" Errors:**

VS Code may show TypeScript errors like:

```
File '/Users/.../libs/helpers/src/index.ts' is not under 'rootDir' '/Users/.../libs/calculator-logic/src'
```

This is a VS Code TypeScript language service issue with workspace path mappings. The errors can be **safely ignored** because:

- ✅ Actual builds work fine (`npm test` passes)
- ✅ Command-line TypeScript compilation succeeds
- ❌ Only VS Code's TypeScript service shows these errors

**Workaround Options:**

1. **Ignore the errors** (recommended) - builds work fine
2. Restart VS Code TypeScript service: `Cmd+Shift+P` → "TypeScript: Restart TS Server"
3. Use workspace-level TypeScript (`"typescript.preferences.includePackageJsonAutoImports": "off"` in VS Code settings)

This issue occurs because VS Code includes all path-mapped source files as "root files" for each project, while the actual TypeScript compiler respects project boundaries correctly.

## Security & ESLint

### Resolved Security Issues

**Object Injection Prevention:**

- ✅ Replaced dynamic property access (`operations[operation]()`) with explicit switch statements
- ✅ Removed vulnerable patterns from `calculator-logic/src/lib/calculator-logic.ts`
- ✅ All ESLint security warnings resolved

**Regex Safety:**

- ✅ Replaced potentially unsafe regex patterns with explicit string parsing
- ✅ Updated `navbar/src/config/default-config.ts` to use safe path parsing

**Security Best Practices Applied:**

- Use explicit switch/case statements instead of dynamic object property access
- Validate all inputs before processing
- Avoid regex patterns that could cause ReDoS (Regular Expression Denial of Service)
- Use type-safe property access where possible

## ESLint & Prettier

**See:** [ESLint & Prettier Configuration Guide](ESLINT_PRETTIER_CONFIG.md) for comprehensive details.

### Quick Reference

**Linting Commands:**

```bash
pnpm run lint         # Lint affected projects with auto-fix
nx lint <project>     # Lint specific project
nx affected -t lint   # Lint all affected (CI mode)
```

**Configuration Patterns:**

- All projects extend root `eslint.config.mjs`
- React apps add `...nx.configs['flat/react']`
- Vue apps add `...vue.configs['flat/recommended']`
- Libraries include JSON dependency checking
- Prettier config applied last to override style conflicts

**Key Rules:**

- Single quotes, no trailing commas (Prettier)
- Module boundary enforcement (Nx)
- Framework-specific best practices
- TypeScript integration for all file types

**Validation:**

```bash
npm test                    # Verify all configs work
npx tsc --build --verbose   # Check project references
nx affected -t typecheck    # Type check affected projects
```

## ESM & Import Patterns

### The #1 ESM Gotcha

```typescript
import { foo } from "./bar.js"; // ✅ Works
import { foo } from "./bar"; // ❌ Fails at runtime
```

### Workspace Imports

```typescript
import { helper } from "@study/helpers"; // ✅ Correct - use package names
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

### CI Testing Considerations

**Known Issue - Vitest + Nx Distributed Execution:**

Tests using Vitest may hang in CI when using Nx distributed execution. Current workaround:

- Run tests with `NX_CLOUD_DISTRIBUTED_EXECUTION=false` in CI
- Other targets (typecheck, lint, build) work fine with distributed execution
- This is a temporary measure while investigating the root cause

**Test Configuration:**

- All test targets use `vitest run` (not `vitest`) to ensure proper exit in CI
- Test timeouts are configured to prevent indefinite hanging

## Code Style

**See:** [ESLint & Prettier Configuration Guide](ESLINT_PRETTIER_CONFIG.md) for linting and formatting details.

### Code Quality Guidelines

**Naming & Structure:**

- Write self-documenting code with clear variable/function names
- Keep functions small and focused
- Break large functions into smaller ones with descriptive names
- Prefer descriptive function names over comments

**Comments & Documentation:**

- Minimize comments - only add when code cannot be made clearer
- Use JSDoc for functions that need documentation:
  - Complex algorithms
  - Public APIs
  - Non-obvious parameters or return values
  - Functions with side effects

**Auto-formatting:**
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

### Project Configuration: Always Use package.json

**Rule:** Always configure Nx targets in `package.json` instead of `project.json` files.

**Rationale:**

- Standard for JavaScript projects - more familiar to developers
- Keeps package metadata and build configuration together
- One less file to manage
- Better integration with package managers and tooling

**Pattern:**

```json
{
  "name": "@study/my-project",
  "scripts": {
    "test": "vitest run",
    "build": "tsc"
  },
  "nx": {
    "targets": {
      "custom-target": {
        "executor": "nx:run-commands",
        "options": {
          "command": "echo 'Custom command'"
        }
      }
    }
  }
}
```

**Migration from project.json:**

- Move target configurations from `project.json` to `package.json` "nx" property
- Delete `project.json` files after migration
- Prefer npm scripts for simple commands, "nx.targets" for complex configurations

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
