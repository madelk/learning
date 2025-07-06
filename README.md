# Frontend Technology Study Workspace

[![Azure Static Web Apps CI/CD](https://github.com/madelk/learning/actions/workflows/azure-static-web-apps-ambitious-plant-067cbd51e.yml/badge.svg)](https://github.com/madelk/learning/actions/workflows/azure-static-web-apps-ambitious-plant-067cbd51e.yml)

This monorepo contains multiple frontend applications built with different frameworks, managed using Nx. It serves as a study and comparison environment for various frontend technologies.

## Live site

[madelk.co.uk](https://www.madelk.co.uk)

## Run locally

### Prerequisites

1. **Node.js 22.16.0+** - Install [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) for version management
2. **pnpm** - Modern package manager for better performance and reliability

### Install pnpm (Recommended: Corepack)

**Option 1: Using Corepack (Recommended)**

```bash
# Enable corepack (comes with Node.js 16.13+)
corepack enable

# Corepack will automatically use the correct pnpm version from package.json
```

**Option 2: Direct Install**

```bash
# Install pnpm globally
npm install -g pnpm
```

### Setup

```bash
git clone https://github.com/madelk/learning.git
cd learning
nvm install  # Install Node.js version from .nvmrc
pnpm install --frozen-lockfile --strict-peer-dependencies  # Install dependencies with strict validation
pnpm start   # Start development servers
```

## Project Structure

The workspace includes the following applications:

- `apps/react`: React application with Vite and Tailwind CSS
- `apps/vue`: Vue.js application
- `apps/webcomponents`: Web Components application

Each application has its corresponding e2e testing project (e.g., `react-e2e`)

## Documentation

- **[Development Guide](docs/DEVELOPMENT_GUIDE.md)** - Complete development practices, patterns, and workflows
- **[TypeScript Configuration Guide](docs/TYPESCRIPT_CONFIG.md)** - Comprehensive TypeScript setup and configuration patterns
- **[ESLint & Prettier Configuration Guide](docs/ESLINT_PRETTIER_CONFIG.md)** - Code quality and formatting configuration

## Development

### Package Management

**Always use strict dependency checking:**

```bash
pnpm install --frozen-lockfile --strict-peer-dependencies
```

This ensures:

- Reproducible installs across environments
- Early detection of peer dependency conflicts
- Consistent builds in CI/CD

### Running Applications

To run any application:

```bash
pnpm nx serve <app-name>
```

For example:

```bash
pnpm nx serve react
```

## Testing

To run tests for any application:

```bash
pnpm nx test <app-name>
pnpm nx e2e <app-name>-e2e
```

## Useful Commands

- `pnpm nx graph`: Visualize the project dependency graph
- `pnpm nx affected`: Run tasks only for projects affected by changes
- `pnpm test`: Run all quality checks (lint, typecheck, test, build)
- `pnpm run lint`: Format code and run linting with auto-fix
