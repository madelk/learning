# TypeScript Configuration Guide

This document explains the TypeScript configuration structure in our Nx workspace and the purpose of each configuration file.

## Overview

Our workspace follows Nx recommendations for TypeScript configuration using **project references** for optimal build performance and type checking. We use a hierarchical structure with a base configuration that all other configs extend.

## Configuration Architecture

```
tsconfig.base.json         # Base configuration with shared compiler options
├── tsconfig.json          # Root workspace configuration with project references
├── apps/*/tsconfig.json   # App-level orchestration configs
│   ├── tsconfig.app.json  # App build configuration
│   └── tsconfig.spec.json # App test configuration
└── libs/*/tsconfig.json   # Library-level orchestration configs
    ├── tsconfig.lib.json  # Library build configuration
    └── tsconfig.spec.json # Library test configuration
```

## Configuration Files Explained

### `tsconfig.base.json` - Shared Base Configuration

This is the foundation configuration that all other TypeScript configs extend. It contains:

#### Key Compiler Options

- **`composite: true`** - Enables TypeScript project references for faster builds
- **`module: "NodeNext"`** - Modern Node.js module resolution supporting both ESM and CommonJS
- **`moduleResolution: "nodenext"`** - Companion to NodeNext module setting
- **`isolatedModules: true`** - Ensures each file can be transpiled independently (required for SWC/esbuild)
- **`strict: true`** - Enables all strict type checking options
- **`target: "ESNext"`** - Compile to latest ECMAScript features
- **`lib: ["ESNext"]`** - Include latest ECMAScript library definitions
- **`importHelpers: true`** - Import helper functions from tslib to reduce bundle size

> **Important:** Declaration generation settings (`declaration`, `declarationMap`, `emitDeclarationOnly`) are NOT in the base config. They are configured per project type to ensure correct build outputs.

- **`noEmitOnError: true`** - Don't emit output if there are any compilation errors
- **Additional strict options** - `noFallthroughCasesInSwitch`, `noImplicitOverride`, `noImplicitReturns`, etc.

#### Path Mapping

The `paths` section defines workspace library aliases:

```json
{
	"paths": {
		"@study/calculator-logic": ["libs/calculator-logic/src/index.ts"],
		"@study/helpers": ["libs/helpers/src/index.ts"],
		"@study/navbar": ["libs/navbar/src/index.ts"],
		"@study/pagetext": ["libs/pagetext/src/index.ts"]
	}
}
```

This allows importing with clean package names: `import { helper } from '@study/helpers'`

### `tsconfig.json` - Root Workspace Configuration

The root config orchestrates all projects using TypeScript project references:

- **`files: []`** and **`include: []`** - No files compiled directly at root level
- **`references`** - Lists all apps and libraries for coordinated builds
- **`compileOnSave: false`** - Disables automatic compilation on file save

### App Configurations

#### `apps/*/tsconfig.json` - App Orchestration

Each app has a main `tsconfig.json` that:

- Extends the base configuration
- References all dependent libraries
- References the app's build and test configurations
- Contains no files itself (orchestration only)

#### `apps/*/tsconfig.app.json` - App Build Configuration

Framework-specific build settings:

**All Apps:**

- **`emitDeclarationOnly: false`** - Apps emit JavaScript for execution (declarations generated for project references)
- **`outDir: "dist"`** - Build output location
- **`rootDir: "src"`** - Source files location

**React Apps:**

- **`jsx: "react-jsx"`** - Use React 17+ JSX transform
- **`module: "esnext"`** and **`moduleResolution: "bundler"`** - Optimized for Vite bundling
- **`lib: ["dom"]`** - Include DOM type definitions
- **`types`** - Include React, Vite, and CSS module typings

**Vue Apps:**

- **`jsx: "preserve"`** and **`jsxImportSource: "vue"`** - Vue-compatible JSX
- **`resolveJsonModule: true`** - Allow importing JSON files
- Additional Vue-specific type definitions

#### `apps/*/tsconfig.spec.json` - App Test Configuration

Test-specific compiler options:

**All Tests:**

- **`emitDeclarationOnly: false`** - Tests emit JavaScript for execution (declarations generated for project references)

**Vitest (React/Vue):**

- **`module: "esnext"`** and **`moduleResolution: "bundler"`** - Aligned with Vite
- **`types: ["vitest/globals", "vitest/importMeta"]`** - Vitest global types
- **`outDir: "./out-tsc/vitest"`** - Test build output

**Playwright (E2E):**

- **`types: ["node", "@playwright/test"]`** - Playwright and Node types
- **`outDir: "./out-tsc/playwright"`** - E2E test build output

### Library Configurations

#### `libs/*/tsconfig.json` - Library Orchestration

Similar to apps but simpler:

- Extends base configuration
- References library build and test configurations
- May reference dependent libraries

#### `libs/*/tsconfig.lib.json` - Library Build Configuration

Library-specific build settings:

**Declaration Generation:**

- **`declaration: true`** - Generate type declaration files (`.d.ts`) for library consumers
- **`declarationMap: true`** - Generate source maps for declaration files (`.d.ts.map`)
- **`emitDeclarationOnly: false`** - Emit both JavaScript and declaration files

**Standard Library Settings:**

- **`rootDir: "src"`** and **`outDir: "dist"`** - Standard library structure
- **`baseUrl: "."`** - Relative imports from library root
- **`include: ["src/**/\*.ts"]`\*\* - Only include source files
- **`exclude`** - Exclude test files and config files

**Framework-specific additions:**

- **React libraries:** `jsx: "react-jsx"`, `lib: ["dom"]`, `types: ["react"]`
- **Node libraries:** `types: ["node"]`

#### `libs/*/tsconfig.spec.json` - Library Test Configuration

Test framework-specific settings:

**All Library Tests:**

- **`emitDeclarationOnly: false`** - Tests emit JavaScript for execution (declarations generated for project references)

**Jest:**

- **`types: ["jest", "node"]`** - Jest and Node type definitions
- **`outDir: "./out-tsc/jest"`** - Jest test output

**Vitest:**

- **`types: ["vitest/globals", "node"]`** - Vitest global types
- **`outDir: "./out-tsc/vitest"`** - Vitest test output

## Declaration Generation Architecture

### Why Declaration Settings Are Project-Specific

The TypeScript configuration uses a **project-specific declaration generation strategy** to control what each project emits while respecting TypeScript's composite project constraints.

#### Understanding Composite Projects

All projects inherit `composite: true` from the base config, which enables TypeScript project references. **Composite projects cannot disable declaration generation entirely** - TypeScript enforces this because project references require declaration files for type checking.

#### Libraries Emphasize Type Declarations

- **Purpose:** Libraries export TypeScript types for consumers
- **Settings:** `declaration: true`, `declarationMap: true`, `emitDeclarationOnly: false`
- **Output:** Both JavaScript (`.js`) and declaration files (`.d.ts`) with source maps

#### Apps Need Executable JavaScript First

- **Purpose:** Apps need to run in browsers/environments; declarations are secondary
- **Settings:** `emitDeclarationOnly: false` (declarations are generated but not the focus)
- **Output:** JavaScript (`.js`) files for execution, plus declaration files (for project references)

#### Tests Need Executable JavaScript First

- **Purpose:** Tests need to execute in test runners; declarations are not used
- **Settings:** `emitDeclarationOnly: false` (declarations are generated but not used)
- **Output:** JavaScript (`.js`) files for test execution, plus declaration files (for project references)

### Benefits of This Approach

1. **Correct Build Outputs:** Each project type emits JavaScript for execution, with libraries also providing optimized type declarations
2. **Project Reference Compatibility:** All projects generate declarations needed for TypeScript's incremental builds
3. **Clear Intent:** Configuration explicitly shows what each project emphasizes
4. **Nx Optimization:** Follows Nx best practices for TypeScript project references and build caching

## Build Performance Features

### Project References

TypeScript project references enable:

- **Incremental builds** - Only rebuild changed projects and their dependents
- **Parallel builds** - Build independent projects simultaneously
- **Type-only imports** - Faster compilation when importing only types

### Build Info Files

Each compiled project generates a `.tsbuildinfo` file:

- **`tsBuildInfoFile`** - Stores incremental build information
- Enables faster subsequent builds by tracking what changed

## ESM Configuration

All projects are configured for ES modules:

- **`package.json`** contains `"type": "module"`
- **`module: "NodeNext"`** supports both ESM and CommonJS
- **Relative imports require `.js` extensions** (see [ESM instructions](../.github/instructions/esm.instructions.md))

## Testing Configuration Differences

### Jest vs Vitest

- **Jest with SWC:** Auto-resolves `.ts` files, no `.js` extension needed in imports
- **Vitest:** Strict ESM, requires `.js` extensions for relative imports in tests

Different output directories prevent conflicts:

- Jest: `./out-tsc/jest`
- Vitest: `./out-tsc/vitest`
- Playwright: `./out-tsc/playwright`

## Best Practices Alignment

### ✅ Nx Best Practices Implementation

Your workspace now follows Nx best practices completely:

- **Project References Structure:** ✅ Correctly using TypeScript project references for optimal build performance
- **Base Configuration:** ✅ Includes required `composite`, `declaration`, and `declarationMap` settings
- **Module Resolution Optimization:** ✅ Vite apps use `"bundler"` resolution, Node.js libraries use `"nodenext"`
- **Framework-Specific Types:** ✅ Proper type definitions for React, Vue, Playwright, and Cypress
- **Clean Configuration:** ✅ No redundant settings, proper inheritance from base config
- **Hierarchical Configuration:** ✅ Proper separation between base, orchestration, build, and test configs
- **Strict Type Checking:** ✅ Comprehensive strict settings for better code quality
- **Path Aliases:** ✅ Clean import paths using `@study/` namespace

### Architecture Decision

**TypeScript Path Aliases:** This workspace uses TypeScript path aliases rather than package manager workspaces. This is a valid and well-supported approach that provides:

- Simpler configuration for mixed framework environments
- Excellent IDE support and autocomplete
- Fast builds with project references
- Easy refactoring and imports

## Validation

To verify your TypeScript configuration is working correctly:

```bash
# Check for type errors across the workspace
npm run type-check

# Build all projects to verify project references
npx tsc --build

# Run tests to verify test configurations
npm test
```

### Expected Build Outputs

After running `npx tsc --build`, you should see:

**Libraries generate both JavaScript and declarations:**

```bash
libs/*/dist/*.js          # JavaScript for execution
libs/*/dist/*.d.ts         # Type declarations for consumers
libs/*/dist/*.d.ts.map     # Source maps for declarations
```

**Apps generate JavaScript and declarations:**

```bash
apps/*/dist/*.js           # JavaScript for browser execution
apps/*/out-tsc/*/*.d.ts    # Declarations for project references (not consumed)
```

**Tests generate JavaScript and declarations:**

```bash
apps/*/out-tsc/vitest/*.js     # JavaScript for test execution
apps/*/out-tsc/vitest/*.d.ts   # Declarations for project references (not consumed)
libs/*/out-tsc/jest/*.js       # JavaScript for test execution
libs/*/out-tsc/jest/*.d.ts     # Declarations for project references (not consumed)
```

## Common Issues

1. **Missing project reference** - Add missing libraries to app's `tsconfig.json` references
2. **Wrong module resolution** - Ensure `bundler` for Vite projects, `nodenext` for Node.js
3. **Missing type definitions** - Add required types to the `types` array
4. **Incorrect paths** - Verify path mappings in `tsconfig.base.json`

## Best Practices

1. **Always extend `tsconfig.base.json`** for consistency
2. **Use project references** for better build performance
3. **Separate build and test configurations** to avoid conflicts
4. **Update path mappings** when adding new libraries
5. **Match module resolution** to your bundler (Vite = bundler, Node.js = nodenext)
