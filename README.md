# Frontend Technology Study Workspace

This monorepo contains multiple frontend applications built with different frameworks, managed using Nx. It serves as a study and comparison environment for various frontend technologies.

## Project Structure

The workspace includes the following applications:

- `apps/nextjs`: Next.js application
- `apps/react`: React application with Vite and Tailwind CSS
- `apps/reactnative`: React Native application
- `apps/vue`: Vue.js application
- `apps/webcomponents`: Web Components application

Each application has its corresponding e2e testing project (e.g., `nextjs-e2e`, `react-e2e`).

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
