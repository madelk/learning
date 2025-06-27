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

*Update with other common import issues you encounter*
