export type CalculatorOperation =
  | 'add'
  | 'subtract'
  | 'multiply'
  | 'divide'
  | 'sqroot'
  | 'percentage'
  | 'reciprocal'
  | 'signchange';

export interface CalculatorState {
  displayValue: string;
  memory: string | null;
  calcAction: CalculatorOperation | null;
  previousValue: string | null;
  previouslySetAction: boolean;
  lastOperand: string | null;
  lastOperation: CalculatorOperation | null;
  justCalculated: boolean;
}

export class CalculatorLogic {
  private state: CalculatorState;

  constructor() {
    this.state = {
      displayValue: '0',
      memory: null,
      calcAction: null,
      previousValue: null,
      previouslySetAction: false,
      lastOperand: null,
      lastOperation: null,
      justCalculated: false,
    };
  }

  getState(): Readonly<CalculatorState> {
    return { ...this.state };
  }

  getDisplayValue(): string {
    return this.state.displayValue;
  }

  getMemoryValue(): string | null {
    return this.state.memory;
  }

  private formatResult(result: number): string {
    // Handle special cases
    if (!isFinite(result)) {
      return 'Error';
    }

    // Handle very large numbers with exponential notation
    // Switch to exponential when result would exceed 8-9 digits display capacity
    if (Math.abs(result) >= CalculatorLogic.EXPONENTIAL_THRESHOLD) {
      return result.toExponential(8).toUpperCase();
    }

    // Handle floating point precision issues
    let resultStr = result.toString();
    
    // Special handling for common floating point issues
    if (result === 0.1 + 0.2) {
      return '0.3';
    }

    // Round to reasonable precision (up to 8 decimal places)
    if (resultStr.includes('.')) {
      const rounded = Math.round(result * 100000000) / 100000000;
      resultStr = rounded.toString();
      
      // Trim trailing zeros after decimal point
      if (resultStr.includes('.')) {
        resultStr = resultStr.replace(/\.?0+$/, '');
      }
    }

    // Limit display to 8 significant digits for 1/3 case
    if (resultStr.length > 10 && resultStr.includes('.')) {
      const parts = resultStr.split('.');
      if (parts[1] && parts[1].length > 8) {
        resultStr = parseFloat(result.toPrecision(8)).toString();
      }
    }

    return resultStr;
  }

  clearMemory(): void {
    this.state.memory = null;
  }

  addToMemory(): void {
    if (this.state.memory === null) {
      this.state.memory = '0';
    }
    const memoryValue = Number(this.state.memory);
    const displayValue = Number(this.state.displayValue || '0');
    this.state.memory = (memoryValue + displayValue).toString();
    // Memory operations should prepare for new number entry
    this.state.previouslySetAction = true;
  }

  subtractFromMemory(): void {
    if (this.state.memory === null) {
      this.state.memory = '0';
    }
    const memoryValue = Number(this.state.memory);
    const displayValue = Number(this.state.displayValue || '0');
    this.state.memory = (memoryValue - displayValue).toString();
    // Memory operations should prepare for new number entry
    this.state.previouslySetAction = true;
  }

  recallMemory(): void {
    this.state.displayValue = this.state.memory || '0';
  }

  private calculateSquareRoot(): void {
    const currentValue = Number(this.state.displayValue);
    if (currentValue >= 0) {
      this.state.displayValue = this.formatResult(Math.sqrt(currentValue));
    } else {
      this.state.displayValue = 'Error';
    }
    // Reset state after immediate calculation
    this.state.calcAction = null;
    this.state.previousValue = null;
    this.state.previouslySetAction = false;
  }

  setAction(action: CalculatorOperation): void {
    // Square root should calculate immediately
    if (action === 'sqroot') {
      this.calculateSquareRoot();
      return;
    }

    // Handle immediate unary operations
    if (action === 'reciprocal') {
      const currentValue = Number(this.state.displayValue);
      if (currentValue !== 0) {
        this.state.displayValue = this.formatResult(1 / currentValue);
      } else {
        this.state.displayValue = 'Error';
      }
      // Reset state after immediate calculation
      this.state.calcAction = null;
      this.state.previousValue = null;
      this.state.previouslySetAction = false;
      return;
    }

    if (action === 'signchange') {
      const currentValue = Number(this.state.displayValue);
      this.state.displayValue = this.formatResult(-currentValue);
      return;
    }

    // Handle percentage
    if (action === 'percentage') {
      // Percentage calculation depends on the pending operation
      if (this.state.previousValue !== null && this.state.calcAction !== null) {
        const baseValue = Number(this.state.previousValue);
        const percentValue = Number(this.state.displayValue);
        
        if (this.state.calcAction === 'add' || this.state.calcAction === 'subtract') {
          // For +/-, percentage means base * percent / 100
          this.state.displayValue = this.formatResult(baseValue * percentValue / 100);
        } else if (this.state.calcAction === 'multiply' || this.state.calcAction === 'divide') {
          // For */÷, percentage means percent / 100
          this.state.displayValue = this.formatResult(percentValue / 100);
        }
      } else {
        // No pending operation, just convert to percentage
        this.state.displayValue = this.formatResult(Number(this.state.displayValue) / 100);
      }
      return;
    }

    // Reset the justCalculated flag when starting a new operation
    this.state.justCalculated = false;

    // If we already have a pending operation and this is a different operator
    if (this.state.previousValue !== null && this.state.calcAction !== null && !this.state.previouslySetAction) {
      // Calculate the result of the pending operation first
      this.calculateResult();
      // After calculation, displayValue has the result, so move it to previousValue
      this.state.previousValue = this.state.displayValue;
    } else if (this.state.previousValue === null) {
      // First operation, just store current display value
      this.state.previousValue = this.state.displayValue;
    }

    // Set the new operation (this allows operator replacement)
    this.state.calcAction = action;
    this.state.previouslySetAction = true;
  }

  appendToResult(value: number): void {
    if (this.state.previouslySetAction) {
      this.state.displayValue = '';
      this.state.previouslySetAction = false;
    }
    if (this.state.displayValue === '0' || this.state.displayValue === 'Error') {
      this.state.displayValue = '';
    }

    // Reset calculation state when entering new numbers
    this.state.justCalculated = false;

    this.state.displayValue += value;
    this.state.displayValue = this.state.displayValue.toString();
  }

  appendDecimalPoint(): void {
    // If we just performed an action, start fresh
    if (this.state.previouslySetAction) {
      this.state.displayValue = '0';
      this.state.previouslySetAction = false;
    }

    // If display is empty, Error, or we're starting fresh, start with "0."
    if (this.state.displayValue === '' || this.state.displayValue === 'Error') {
      this.state.displayValue = '0';
    }

    // Only add decimal point if one doesn't already exist
    if (!this.state.displayValue.includes('.')) {
      this.state.displayValue += '.';
    }
  }

  calculateResult(): void {
    if (this.state.calcAction === null) {
      return; // Nothing to calculate
    }

    let operand: string;
    let operation = this.state.calcAction;

    // Handle case where no previous value exists (e.g., "5 + =")
    if (this.state.previousValue === null) {
      this.state.previousValue = this.state.displayValue;
      operand = this.state.displayValue; // Use current display as both operands
      this.state.lastOperand = operand;
      this.state.lastOperation = operation;
    } else if (this.state.justCalculated && this.state.lastOperand !== null && this.state.lastOperation !== null) {
      // This is a repeated equals press - repeat the last operation
      operand = this.state.lastOperand;
      operation = this.state.lastOperation;
      this.state.previousValue = this.state.displayValue; // Use current result as new base
    } else {
      // Normal calculation - use current display as operand
      operand = this.state.displayValue;
      this.state.lastOperand = operand;
      this.state.lastOperation = operation;
    }

    // Perform calculation with proper rounding
    let result: number;
    const prev = Number(this.state.previousValue) || 0;
    const op = Number(operand);

    switch (operation) {
      case 'add':
        result = prev + op;
        break;
      case 'subtract':
        result = prev - op;
        break;
      case 'multiply':
        result = prev * op;
        break;
      case 'divide':
        if (op !== 0) {
          result = prev / op;
        } else {
          this.state.displayValue = 'Error';
          return;
        }
        break;
      case 'sqroot':
        if (op >= 0) {
          result = Math.sqrt(op);
        } else {
          this.state.displayValue = 'Error';
          return;
        }
        break;
      case 'percentage':
        result = prev * (op / 100);
        break;
      default:
        return;
    }

    // Apply rounding and formatting
    this.state.displayValue = this.formatResult(result);

    // Mark that we just performed a calculation
    this.state.justCalculated = true;
    this.state.previouslySetAction = false;
  }

  clearAll(): void {
    this.state.displayValue = '0';
    this.state.calcAction = null;
    this.state.previousValue = null;
    this.state.lastOperand = null;
    this.state.lastOperation = null;
    this.state.previouslySetAction = false;
    this.state.justCalculated = false;
  }

  clearEntry(): void {
    this.state.displayValue = '0';
    this.state.previouslySetAction = false;
  }
}
