---
applyTo: '**'
---

# ESM Import Gotchas

**The #1 import gotcha - relative imports need `.js`:**
```typescript
import { foo } from './bar.js'  // ✅ Works
import { foo } from './bar'     // ❌ Fails at runtime
```

**Workspace imports use package names:**
```typescript
import { helper } from '@study/helpers'  // ✅ Correct
```

All package.json have `"type": "module"` + NodeNext resolution.

**Jest vs Vitest difference:**
- **Jest with SWC**: Auto-resolves `.ts` files, no `.js` extension needed in test imports
- **Vitest**: Strict ESM, requires `.js` extensions for relative imports

*Update with other common import issues you encounter*
