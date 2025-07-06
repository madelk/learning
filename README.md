# Frontend Technology Study Workspace

[![Azure Static Web Apps CI/CD](https://github.com/madelk/learning/actions/workflows/azure-static-web-apps-ambitious-plant-067cbd51e.yml/badge.svg)](https://github.com/madelk/learning/actions/workflows/azure-static-web-apps-ambitious-plant-067cbd51e.yml)

This monorepo contains multiple frontend applications built with different frameworks, managed using Nx. It serves as a study and comparison environment for various frontend technologies.

## Live site

[madelk.co.uk](https://www.madelk.co.uk)

## Run locally

- Install [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)

```bash
git clone https://github.com/madelk/learning.git
cd learning
nvm install
pnpm install
pnpm start
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

To run any application:

```bash
npx nx serve <app-name>
```

For example:

```bash
npx nx serve react
```

## Testing

To run tests for any application:

```bash
npx nx test <app-name>
npx nx e2e <app-name>-e2e
```

## Useful Commands

- `npx nx graph`: Visualize the project dependency graph
- `npx nx affected`: Run tasks only for projects affected by changes
