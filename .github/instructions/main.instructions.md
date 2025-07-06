---
applyTo: "**"
---

# Core Development Guidelines

**ALWAYS verify changes by running `pnpm test` before finishing**
**ALWAYS review all changed files at the end to ensure no unintended changes**
**ALWAYS refer to `docs/DEVELOPMENT_GUIDE.md` for development patterns and practices**

## Collaborative Workflow Style

**Act like a co-worker, not just a code assistant:**

- Make practical decisions and take action without asking permission for obvious next steps
- Use tools directly instead of describing what should be done
- Group related changes logically and commit with descriptive messages
- Explain what you're doing while you do it, not before asking if you should
- Focus on getting things working, then optimizing
- When debugging, gather context systematically before making changes

**Git & Version Control:**

- Make meaningful commits with clear, descriptive messages
- Include context about WHY changes were made, not just WHAT
- Group related changes into logical commits
- Use present tense, imperative mood ("Add feature" not "Added feature")
- Include performance/test results in commit messages when relevant

**Problem-Solving Approach:**

- Gather context first with appropriate tools (read files, run commands, check status)
- Make incremental changes and verify each step
- Think out loud about trade-offs and decisions
- When something isn't working, investigate systematically rather than guessing
- Always verify the final result works as expected

## Quick Reference

- **TypeScript configs**: See `docs/TYPESCRIPT_CONFIG.md` and `docs/DEVELOPMENT_GUIDE.md#typescript-configuration`
- **ESM imports**: See `docs/DEVELOPMENT_GUIDE.md#esm--import-patterns`
- **App development**: See `docs/DEVELOPMENT_GUIDE.md#app-development`
- **Code style**: See `docs/DEVELOPMENT_GUIDE.md#code-style`
- **Nx project configuration**: See `docs/DEVELOPMENT_GUIDE.md#nx-workspace-patterns`

## Technical Patterns

**Package Management:**

- Use `pnpm` commands consistently (`pnpm test`, `pnpm run lint`, etc.)
- **ALWAYS use strict install locally**: `pnpm install --frozen-lockfile --strict-peer-dependencies`
- In CI, use `--frozen-lockfile --strict-peer-dependencies` for reproducible builds
- Keep `pnpm-workspace.yaml` and `pnpm-lock.yaml` in sync
- Use Corepack for pnpm version management (`corepack enable`)

**Nx Project Configuration:**

- **ALWAYS use `package.json`** instead of `project.json` for target configuration
- Use the `"nx"` property in package.json for Nx-specific settings
- Prefer npm scripts for simple commands, "nx.targets" for complex executors

**Documentation & Communication:**

- Update documentation as you make changes, not as a separate task
- When adding new patterns, update both instructions AND comprehensive docs
- Include practical examples and results (timings, outputs) in documentation
- Keep instruction files focused on patterns, detailed info goes in docs/

## Meta

These instruction files are living documents. When you learn new patterns:

- Update `docs/DEVELOPMENT_GUIDE.md` with comprehensive information
- Keep instruction files lightweight and pointing to docs
- **When user says "always do X" - update the development guide**
