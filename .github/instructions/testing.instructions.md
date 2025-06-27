---
applyTo: 'libs/**/*.spec.ts,libs/**/*.test.ts'
---

# Testing Guide

Use AAA pattern (Arrange, Act, Assert):

```typescript
describe('myFunction', () => {
  it('should return expected result', () => {
    // Arrange
    const input = 'test';
    
    // Act
    const result = myFunction(input);
    
    // Assert
    expect(result).toBe('expected');
  });
});
```

Globals available from Vitest config - no imports needed for describe/it/expect.
