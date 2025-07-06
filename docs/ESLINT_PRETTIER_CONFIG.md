# ESLint & Prettier Configuration Guide

This guide documents the comprehensive ESLint and Prettier setup in the Nx workspace, including architecture decisions, configuration patterns, and best practices.

## Architecture Overview

```
workspace/
├── eslint.config.mjs       # Root ESLint configuration
├── .prettierrc             # Prettier formatting rules
├── .prettierignore         # Prettier ignore patterns
├── apps/
│   ├── react/
│   │   └── eslint.config.mjs    # React-specific ESLint rules
│   ├── vue/
│   │   └── eslint.config.mjs    # Vue-specific ESLint rules
│   └── webcomponents/
│       └── eslint.config.mjs    # Web Components ESLint rules
└── libs/
    ├── calculator-logic/
    │   └── eslint.config.mjs    # Library-specific ESLint rules
    └── helpers/
        └── eslint.config.mjs    # Library-specific ESLint rules
```

## ESLint Configuration Architecture

### Flat Config System

This workspace uses **ESLint Flat Config** (ESLint 9.x), the modern replacement for `.eslintrc`. Benefits include:

- **Simplified inheritance** - Clear, explicit configuration chains
- **Better performance** - Faster configuration resolution
- **Type safety** - Full TypeScript support for configuration files
- **Modern JavaScript** - ESM modules and dynamic imports

### Configuration Hierarchy

#### `eslint.config.mjs` - Root Configuration

The foundation configuration that all projects extend:

```javascript
import nx from '@nx/eslint-plugin';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import security from 'eslint-plugin-security';
import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  security.configs.recommended,
  sonarjs.configs.recommended,
  unicorn.configs['flat/recommended'],

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: [
      /* global ignore patterns */
    ]
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.vue'],
    rules: {
      '@nx/enforce-module-boundaries': [
        /* Nx module boundaries */
      ]
    }
  },
  prettier // Applied last to override conflicting rules
];
```

#### Key Root Configuration Features

**Nx Integration:**

- **`@nx/eslint-plugin`** - Nx-specific linting rules and module boundary enforcement
- **`flat/base`** - Essential Nx workspace rules
- **`flat/typescript`** - TypeScript-specific rules for `.ts`/`.tsx` files
- **`flat/javascript`** - JavaScript-specific rules for `.js`/`.jsx` files

**Module Boundary Enforcement:**

```javascript
'@nx/enforce-module-boundaries': [
  'error',
  {
    enforceBuildableLibDependency: true,
    allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
    depConstraints: [
      {
        sourceTag: '*',
        onlyDependOnLibsWithTags: ['*']
      }
    ]
  }
]
```

**Global Ignore Patterns:**

- `**/dist` - Build output directories
- `**/vite.config.*.timestamp*` - Vite temporary files
- `**/vitest.config.*.timestamp*` - Vitest temporary files
- `**/test-output` - Test result directories
- `**/out-tsc/**` - TypeScript compilation output

**Code Style Rules:**

- **`comma-dangle: ['error', 'never']`** - Enforces no trailing commas (aligned with Prettier)

### Project-Specific Configurations

#### React Apps - `apps/react/eslint.config.mjs`

React-specific linting with JSX support:

```javascript
import nx from "@nx/eslint-plugin";
import baseConfig from "../../eslint.config.mjs";

export default [
  ...baseConfig, // Inherit root configuration
  ...nx.configs["flat/react"], // React-specific rules
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    rules: {
      // React-specific customizations
    }
  }
];
```

**React ESLint Features:**

- **JSX linting** - Proper JSX syntax and best practices
- **React Hooks rules** - Hook dependency and usage validation
- **Accessibility rules** - Basic a11y checking for React components
- **React-specific TypeScript** - Integration with React prop types

#### Vue Apps - `apps/vue/eslint.config.mjs`

Vue 3 Composition API with TypeScript support:

```javascript
import vue from "eslint-plugin-vue";
import prettier from "eslint-config-prettier";
import baseConfig from "../../eslint.config.mjs";

export default [
  ...baseConfig,
  ...vue.configs["flat/recommended"], // Vue 3 recommended rules
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: await import("@typescript-eslint/parser") // TypeScript in Vue
      }
    },
    rules: {
      "vue/html-self-closing": "off", // Allow non-self-closing tags
      "vue/multi-word-component-names": "off" // Allow single-word components
    }
  },
  prettier
];
```

**Vue ESLint Features:**

- **Vue 3 Composition API** - Proper script setup and composition syntax
- **Single File Components** - Template, script, and style block linting
- **TypeScript Integration** - Full TypeScript support in Vue components
- **Vue-specific accessibility** - Vue template accessibility rules

#### Library Configurations

Libraries have specialized configurations for dependency checking and JSON linting:

```javascript
import baseConfig from "../../eslint.config.mjs";

export default [
  ...baseConfig,
  {
    files: ["**/*.json"],
    rules: {
      "@nx/dependency-checks": [
        "error",
        {
          ignoredFiles: ["{projectRoot}/eslint.config.{js,cjs,mjs}"],
          ignoredDependencies: ["vite", "vite-plugin-dts"]
        }
      ]
    },
    languageOptions: {
      parser: await import("jsonc-eslint-parser") // JSON with comments support
    }
  }
];
```

## Prettier Configuration

### `.prettierrc` - Formatting Rules

Simple, consistent formatting across all file types:

```json
{
  "singleQuote": true, // Use single quotes for strings
  "trailingComma": "none" // No trailing commas
}
```

### Configuration Philosophy

**Minimal Configuration Strategy:**

- **Prettier defaults** - Rely on Prettier's opinionated defaults for most rules
- **Essential overrides only** - Only configure what's necessary for project consistency
- **ESLint integration** - Prettier rules override conflicting ESLint style rules

### `.prettierignore` - Exclusion Patterns

Prevents formatting of generated and build files:

```ignore
/dist                           # Build outputs
/coverage                       # Test coverage reports
/.nx/cache                      # Nx build cache
/.nx/workspace-data            # Nx metadata
node_modules/                   # Dependencies
out-tsc/                       # TypeScript compilation output
tmp/                           # Temporary files
**/vite.config.*.timestamp*    # Vite hot reload files
**/vitest.config.*.timestamp*  # Vitest hot reload files
**/test-output/                # Test result files
```

## Integration Architecture

### ESLint + Prettier Integration

**Conflict Resolution Strategy:**

1. **ESLint handles code quality** - Logic, bugs, best practices
2. **Prettier handles formatting** - Spacing, quotes, line breaks
3. **`eslint-config-prettier`** - Disables conflicting ESLint formatting rules
4. **Prettier applied last** - Final word on formatting conflicts

### Nx Integration Benefits

**Workspace-wide Consistency:**

- **Shared base configuration** - All projects inherit common rules
- **Framework-specific extensions** - React, Vue, library-specific rules
- **Module boundary enforcement** - Prevents inappropriate cross-dependencies
- **Build integration** - Linting integrated with Nx build pipeline

**Performance Optimizations:**

- **Affected linting** - Only lint changed projects
- **Parallel execution** - Lint multiple projects simultaneously
- **Caching** - Skip linting if files haven't changed

## File Type Support

### Supported Languages and Extensions

**TypeScript/JavaScript:**

- `.ts`, `.tsx` - TypeScript and TypeScript React
- `.js`, `.jsx` - JavaScript and JavaScript React
- `.mts`, `.cts` - TypeScript ES modules and CommonJS
- `.mjs`, `.cjs` - JavaScript ES modules and CommonJS

**Framework-Specific:**

- `.vue` - Vue Single File Components
- `.json`, `.jsonc` - JSON and JSON with comments

**Configuration Files:**

- ESLint config files are explicitly allowed in module boundaries
- Vite/Vitest config files are ignored during linting

## Validation and Scripts

### Available Commands

```bash
# Lint all affected projects with auto-fix
pnpm run lint

# Lint specific project
nx lint <project-name>

# Lint without auto-fix (CI mode)
nx affected --target lint

# Format with Prettier
npx prettier --write .

# Check Prettier formatting
npx prettier --check .
```

### Validation Workflow

1. **Development** - `pnpm run lint` auto-fixes issues during development
2. **Pre-commit** - Linting integrated with git hooks (if configured)
3. **CI/CD** - `nx affected --target lint` validates all changes
4. **IDE Integration** - Real-time linting feedback in VS Code/WebStorm

## Best Practices Implementation

### ✅ Modern ESLint Practices

**Flat Config Migration:**

- ✅ **ESLint 9.x Flat Config** - Using modern configuration system
- ✅ **ESM Configuration** - All config files use ES modules
- ✅ **Dynamic Imports** - Async parser loading for better performance
- ✅ **Type Safety** - Full TypeScript support in configuration

**Rule Management:**

- ✅ **Nx Integration** - Workspace-aware linting rules
- ✅ **Framework-Specific** - Dedicated React and Vue rule sets
- ✅ **Minimal Overrides** - Only override rules when necessary
- ✅ **Conflict Resolution** - Prettier integration prevents style conflicts

### ✅ Prettier Best Practices

**Configuration Strategy:**

- ✅ **Minimal Config** - Only essential formatting overrides
- ✅ **Consistent Quotes** - Single quotes across all file types
- ✅ **No Trailing Commas** - Clean, simple syntax
- ✅ **Default Line Length** - Standard 80-character limit

**Integration Quality:**

- ✅ **ESLint Compatibility** - No conflicts with ESLint rules
- ✅ **Framework Support** - Works with TypeScript, React, Vue
- ✅ **Build Integration** - Ignored files don't interfere with builds

## Architecture Benefits

### 1. **Maintainability**

- **Single source of truth** - Root config defines workspace standards
- **Explicit inheritance** - Clear configuration chains
- **Framework isolation** - Project-specific rules don't pollute others

### 2. **Performance**

- **Affected linting** - Only process changed files
- **Parallel execution** - Multiple projects linted simultaneously
- **Build cache integration** - Skip unchanged projects

### 3. **Developer Experience**

- **IDE integration** - Real-time feedback during development
- **Auto-fix capability** - Automatic correction of fixable issues
- **Consistent formatting** - No debates about code style

### 4. **Code Quality**

- **Module boundaries** - Prevents architectural violations
- **Framework best practices** - React Hooks, Vue Composition API rules
- **TypeScript integration** - Type-aware linting rules

## Common Issues and Solutions

### 1. **ESLint Configuration Issues**

**Problem:** Rules conflict between projects
**Solution:** Check inheritance chain and ensure proper rule overrides

**Problem:** Module boundary violations
**Solution:** Review `@nx/enforce-module-boundaries` configuration and project tags

### 2. **Prettier Integration Issues**

**Problem:** ESLint and Prettier formatting conflicts
**Solution:** Ensure `eslint-config-prettier` is applied last in configuration

**Problem:** Files not being formatted
**Solution:** Check `.prettierignore` patterns and file extensions

### 3. **Performance Issues**

**Problem:** Linting takes too long
**Solution:** Use `nx affected --target lint` instead of linting all projects

**Problem:** IDE performance degradation
**Solution:** Configure IDE to only lint open files, not entire workspace

## Advanced Configuration

### Custom Rule Sets

For project-specific requirements, create custom rule configurations:

```javascript
// Custom rules for specific project needs
{
  files: ['src/components/**/*.tsx'],
  rules: {
    'react/prop-types': 'off',           // TypeScript provides type checking
    '@typescript-eslint/explicit-module-boundary-types': 'error'
  }
}
```

### Framework-Specific Optimizations

**React Projects:**

```javascript
{
  settings: {
    react: {
      version: "detect"; // Automatically detect React version
    }
  }
}
```

**Vue Projects:**

```javascript
{
  languageOptions: {
    globals: {
      defineProps: 'readonly',      // Vue 3 Composition API globals
      defineEmits: 'readonly',
      defineExpose: 'readonly'
    }
  }
}
```

## Strict Rules Configuration

### Core JavaScript Quality Rules

The configuration enforces strict JavaScript best practices:

- **`eqeqeq: 'always'`** - Always use strict equality (`===`, `!==`)
- **`no-eval: 'error'`** - Prevent code injection vulnerabilities
- **`no-console: 'warn'`** - Discourage console statements in production
- **`prefer-const: 'error'`** - Use `const` for immutable bindings
- **`no-var: 'error'`** - Eliminate `var` declarations
- **`curly: 'all'`** - Always use braces for control statements
- **`no-throw-literal: 'error'`** - Only throw Error objects

### TypeScript Strict Rules

Enhanced TypeScript enforcement beyond the standard strict config:

- **`@typescript-eslint/no-explicit-any: 'error'`** - Eliminate `any` types
- **`@typescript-eslint/explicit-function-return-type: 'error'`** - All functions must declare return types
- **`@typescript-eslint/explicit-module-boundary-types: 'error'`** - Public APIs must have explicit types
- **`@typescript-eslint/consistent-type-definitions: 'interface'`** - Use `interface` over `type` for objects
- **`@typescript-eslint/consistent-type-imports: 'error'`** - Separate type imports for tree-shaking
- **`@typescript-eslint/no-non-null-assertion: 'error'`** - Avoid unsafe non-null assertions

### Security Rules (eslint-plugin-security)

Comprehensive security vulnerability detection:

- **Buffer Security**: `detect-buffer-noassert`, `detect-pseudoRandomBytes`
- **Code Injection**: `detect-eval-with-expression`, `detect-non-literal-require`
- **File System**: `detect-non-literal-fs-filename`
- **Timing Attacks**: `detect-possible-timing-attacks`
- **Regex Security**: `detect-unsafe-regex`

### Code Quality Rules (SonarJS)

Prevents code smells and complexity issues:

- **`cognitive-complexity: 15`** - Limits function complexity
- **`no-duplicate-string: 3`** - Prevents string duplication
- **`no-identical-conditions`** - Catches copy-paste errors
- **`no-unused-collection`** - Detects dead code
- **`prefer-immediate-return`** - Simplifies control flow

### Modern JavaScript Rules (Unicorn)

Enforces modern JavaScript best practices:

- **`prefer-modern-dom-apis`** - Use modern DOM methods
- **`prefer-array-flat-map`** - Use optimized array methods
- **`prefer-string-starts-ends-with`** - Use string helper methods
- **`prefer-optional-catch-binding`** - Modern error handling
- **`no-for-loop`** - Prefer functional iteration

### Import Organization Rules

Strict import sorting and organization:

```javascript
'import/order': [
  'error',
  {
    groups: [
      'builtin',    // Node.js built-ins
      'external',   // npm packages
      'internal',   // Internal modules
      'parent',     // Parent directory imports
      'sibling',    // Same directory imports
      'index'       // Index file imports
    ],
    'newlines-between': 'always',
    alphabetize: {
      order: 'asc',
      caseInsensitive: true
    }
  }
]
```

### Test File Exceptions

Test files have relaxed rules for practical testing:

```javascript
files: ['**/*.spec.ts', '**/*.test.ts', '**/*.spec.tsx', '**/*.test.tsx'],
rules: {
  'no-console': 'off',                              // Allow debugging
  '@typescript-eslint/no-explicit-any': 'off',     // Mocking flexibility
  '@typescript-eslint/no-non-null-assertion': 'off', // Test assertions
  'sonarjs/no-duplicate-string': 'off',            // Test string repetition
  'security/detect-object-injection': 'off'        // Not applicable in tests
}
```
