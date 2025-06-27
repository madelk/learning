# Calculator Logic Library

A shared TypeScript library providing calculator logic and button configuration for use across multiple frontend frameworks.

## Overview

This library contains:
1. **Calculator Logic** (`CalculatorLogic` class) - Core calculator functionality
2. **Button Configuration** (`CALCULATOR_BUTTONS`, `createButtonHandler`) - Shared UI configuration

## Core Calculator Logic

The `CalculatorLogic` class provides a complete calculator implementation with:

- **Digit Entry**: Multi-digit numbers, decimal support
- **Binary Operations**: Addition, subtraction, multiplication, division
- **Unary Operations**: Square root, reciprocal, sign change, percentage
- **Memory Operations**: Store, recall, add, subtract from memory
- **Clear Operations**: Clear all (C) and clear entry (CE)
- **Error Handling**: Division by zero, invalid operations
- **Precision**: Proper floating-point arithmetic handling

### Usage Example

```typescript
import { CalculatorLogic } from '@study/calculator-logic';

const calc = new CalculatorLogic();
calc.appendToResult(5);
calc.setAction('add');
calc.appendToResult(3);
calc.calculateResult();
console.log(calc.getDisplayValue()); // "8"
```

## Shared Button Configuration

The library provides a framework-agnostic button configuration system that eliminates code duplication between Vue, React, and other implementations.

### Key Features

- **Framework Agnostic**: Works with any JavaScript framework
- **Type Safe**: Full TypeScript support with proper type definitions
- **Consistent Layout**: Maintains the same 5×6 button grid across all implementations
- **Flexible Styling**: Supports different styling systems through style mappings
- **Comprehensive**: Includes all calculator operations (arithmetic, memory, unary operations)

### Button Configuration (`CALCULATOR_BUTTONS`)

An array of 26 button configurations defining the complete calculator layout:

```typescript
export const CALCULATOR_BUTTONS: ButtonConfig[] = [
  // Row 1: Memory and Clear operations (5 buttons)
  { label: 'MC', actionType: 'memory', styleType: 'memory', actionData: 'clear' },
  // ... (25 more buttons)
];
```

### Button Types

#### Action Types
- `digit`: Number input buttons (0-9)
- `decimal`: Decimal point button
- `operation`: Binary operations (+, -, *, /)
- `unary`: Single-operand operations (√, 1/x, ±, %)
- `memory`: Memory operations (MC, MR, M+, M-)
- `clear`: Clear all (C)
- `clearEntry`: Clear entry (CE)
- `calculate`: Equals button (=)

#### Style Types
- `default`: Standard buttons (numbers, operations)
- `memory`: Memory operation buttons
- `clear`: Clear all button
- `danger`: Clear entry button (alternative style)

### Button Handler (`createButtonHandler`)

Creates framework-specific event handlers that integrate with the calculator logic:

```typescript
export function createButtonHandler(
  buttonConfig: ButtonConfig,
  calculator: CalculatorLogic,
  updateDisplay: () => void
): () => void
```

### Default Styles (`DEFAULT_STYLE_CLASSES`)

Provides standard Tailwind CSS classes for different button types:

```typescript
export const DEFAULT_STYLE_CLASSES = {
  default: 'bg-slate-500 text-white p-4 rounded',
  memory: 'bg-blue-500 text-white p-4 rounded',
  clear: 'bg-red-500 text-white p-4 rounded',
  danger: 'bg-red-500 text-white p-4 rounded',
} as const;
```

## Framework Integration Examples

### Vue Implementation

```vue
<script lang="ts">
import { 
  CalculatorLogic, 
  CALCULATOR_BUTTONS, 
  createButtonHandler, 
  DEFAULT_STYLE_CLASSES 
} from '@study/calculator-logic';

export default {
  setup() {
    const calculator = new CalculatorLogic();
    const displayValue = ref(calculator.getDisplayValue());
    
    const updateDisplay = () => {
      displayValue.value = calculator.getDisplayValue();
    };

    // Map shared config to Vue buttons
    const buttons = CALCULATOR_BUTTONS.map(config => ({
      label: config.label,
      action: createButtonHandler(config, calculator, updateDisplay),
      style: DEFAULT_STYLE_CLASSES[config.styleType],
      fullWidth: config.fullWidth,
    }));

    return { buttons, displayValue };
  }
};
</script>

<template>
  <div class="grid grid-cols-5 gap-2">
    <!-- Regular buttons -->
    <button
      v-for="(button, index) in buttons.filter(b => !b.fullWidth)"
      :key="`${button.label}-${index}`"
      :class="button.style"
      @click="button.action"
    >
      {{ button.label }}
    </button>
    
    <!-- Equals button (full width) -->
    <button
      v-for="(button, index) in buttons.filter(b => b.fullWidth)"
      :key="`${button.label}-fullwidth-${index}`"
      :class="button.style + ' col-span-5'"
      @click="button.action"
    >
      {{ button.label }}
    </button>
  </div>
</template>
```

### React Implementation

```tsx
import { 
  CalculatorLogic, 
  CALCULATOR_BUTTONS, 
  createButtonHandler, 
  DEFAULT_STYLE_CLASSES 
} from '@study/calculator-logic';

export function CalculatorView() {
  const [calculator] = useState(() => new CalculatorLogic());
  const [displayValue, setDisplayValue] = useState(calculator.getDisplayValue());

  const updateDisplay = useCallback(() => {
    setDisplayValue(calculator.getDisplayValue());
  }, [calculator]);

  // Map shared config to React buttons
  const buttons = CALCULATOR_BUTTONS.map(config => ({
    label: config.label,
    action: createButtonHandler(config, calculator, updateDisplay),
    style: DEFAULT_STYLE_CLASSES[config.styleType],
    fullWidth: config.fullWidth,
  }));

  return (
    <div className="grid grid-cols-5 gap-2">
      {/* Regular buttons */}
      {buttons.filter(button => !button.fullWidth).map((button, index) => (
        <button
          key={`${button.label}-${index}`}
          className={button.style}
          onClick={button.action}
        >
          {button.label}
        </button>
      ))}
      
      {/* Equals button (full width) */}
      {buttons.filter(button => button.fullWidth).map((button, index) => (
        <button
          key={`${button.label}-fullwidth-${index}`}
          className={`${button.style} col-span-5`}
          onClick={button.action}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
}
```

## Layout Structure

The calculator follows a standard 5×6 grid layout:

```
[MC] [MR] [M-] [M+] [C ]
[7 ] [8 ] [9 ] [/ ] [1/x]
[4 ] [5 ] [6 ] [* ] [CE]
[1 ] [2 ] [3 ] [- ] [± ]
[sq] [0 ] [. ] [% ] [+ ]
[=           =           =           =           =] (full width)
```

## Benefits

1. **DRY Principle**: Eliminates duplicate button configuration code
2. **Consistency**: Ensures identical behavior across all framework implementations
3. **Maintainability**: Single source of truth for button layout and behavior
4. **Type Safety**: Full TypeScript support prevents configuration errors
5. **Flexibility**: Framework-specific styling while maintaining shared logic
6. **Testing**: Comprehensive test coverage for button configuration and handlers

## Building

Run `nx build calculator-logic` to build the library.

## Running unit tests

Run `nx test calculator-logic` to execute the unit tests via [Jest](https://jestjs.io).

The library includes extensive test coverage:

- **Calculator Logic**: 49 tests covering all mathematical operations, edge cases, and error handling
- **Button Configuration**: 18 tests validating layout, button types, handlers, and style mappings
- **Total**: 67 tests ensuring reliability and correctness

## Testing Coverage

- Layout validation (26 buttons, correct grid structure)
- Button type verification (digits, operations, memory, etc.)
- Handler functionality testing
- Style mapping validation
- Integration testing with calculator logic
- Mathematical operation accuracy
- Error handling and edge cases
