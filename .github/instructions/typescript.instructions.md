---
applyTo: '**'
---

# TypeScript Configuration Management

**Primary Documentation:** See `docs/TYPESCRIPT_CONFIG.md` for comprehensive TypeScript configuration guide.

**Quick Patterns:** See `docs/DEVELOPMENT_GUIDE.md#typescript-configuration` for quick reference patterns.

## Critical Reminders

**When creating new projects:**
- Follow patterns in development guide
- All configs must extend `../../tsconfig.base.json`
- Add project references to root `tsconfig.json`
- Update path mappings in `tsconfig.base.json`

**Validation commands:**
- `npm test` - Verify all configs work
- `npx tsc --build --verbose` - Check project references

**Never:**
- Duplicate settings already in base config
- Forget to add project references for dependencies
