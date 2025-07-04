---
applyTo: "**"
---

# ESM Import Gotchas

**Primary Documentation:** See `docs/DEVELOPMENT_GUIDE.md#esm--import-patterns` for comprehensive ESM guidance.

## Critical Reminders

**The #1 import gotcha - relative imports need `.js`:**

```typescript
import { foo } from "./bar.js"; // ✅ Works
import { foo } from "./bar"; // ❌ Fails at runtime
```

**Workspace imports use package names:**

```typescript
import { helper } from "@study/helpers"; // ✅ Correct
```

**Jest vs Vitest difference:**

- **Jest with SWC**: Auto-resolves `.ts` files, no `.js` extension needed in test imports
- **Vitest**: Strict ESM, requires `.js` extensions for relative imports

_Update `docs/DEVELOPMENT_GUIDE.md` with other common import issues you encounter_
