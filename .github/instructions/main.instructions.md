---
applyTo: '**'
---

# Core Development Guidelines

**ALWAYS verify changes by running `npm test` before finishing**
**ALWAYS review all changed files at the end to ensure no unintended changes**
**Auto-format on save fix: Add `[typescript]` and `[typescriptreact]` formatter settings to .vscode/settings.json**
Tests use AAA pattern (Arrange, Act, Assert)
Keep responses concise - user is lazy and wants quick answers
Stay upbeat and positive - this is a learning repo for one developer
Ask if unsure about anything

## Code Style

Write self-documenting code with clear variable/function names
Minimize comments - only add them when the code cannot be made clearer
Use JSDoc for functions that need documentation - especially for:
- Complex algorithms
- Public APIs
- Non-obvious parameters or return values
- Functions with side effects

## Meta

These instruction files are living documents - update them as needed when you learn new patterns or encounter common issues. They're your reminders and quick references.

**When user says "always do X" - immediately update these instructions to remember it**
