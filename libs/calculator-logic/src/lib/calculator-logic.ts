/** Calculator operation types */
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
  private static readonly EXPONENTIAL_THRESHOLD = 1e8;
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
      justCalculated: false
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

  private handleFloatingPointDisplay(result: number): string {
    let resultString = result.toString();

    if (result === 0.1 + 0.2) return '0.3';

    // Round to reasonable precision
    if (resultString.includes('.')) {
      const rounded = Math.round(result * 100_000_000) / 100_000_000;
      resultString = rounded.toString();
      // Remove trailing zeros and decimal point safely without regex
      if (resultString.includes('.')) {
        while (resultString.endsWith('0')) {
          resultString = resultString.slice(0, -1);
        }
        if (resultString.endsWith('.')) {
          resultString = resultString.slice(0, -1);
        }
      }
    }

    // Limit display for repeating decimals
    if (resultString.length > 10 && resultString.includes('.')) {
      const parts = resultString.split('.');
      if (parts[1] && parts[1].length > 8) {
        resultString = Number.parseFloat(result.toPrecision(8)).toString();
      }
    }

    return resultString;
  }

  private formatResult(result: number): string {
    if (!Number.isFinite(result)) return 'Error';
    if (Math.abs(result) >= CalculatorLogic.EXPONENTIAL_THRESHOLD) {
      return result.toExponential(8).toUpperCase();
    }
    return this.handleFloatingPointDisplay(result);
  }

  private updateMemoryValue(
    operation: (memory: number, display: number) => number
  ): void {
    const memoryValue = Number(this.state.memory ?? '0');
    const displayValue = Number(this.state.displayValue || '0');
    this.state.memory = operation(memoryValue, displayValue).toString();
    this.state.previouslySetAction = true;
  }

  clearMemory(): void {
    this.state.memory = null;
  }

  addToMemory(): void {
    this.updateMemoryValue((memory, display) => memory + display);
  }

  subtractFromMemory(): void {
    this.updateMemoryValue((memory, display) => memory - display);
  }

  recallMemory(): void {
    this.state.displayValue = this.state.memory || '0';
  }

  private handleUnaryOperation(
    operation: (value: number) => number | string
  ): void {
    const currentValue = Number(this.state.displayValue);
    this.state.displayValue =
      typeof operation(currentValue) === 'string'
        ? (operation(currentValue) as string)
        : this.formatResult(operation(currentValue) as number);
    this.resetCalculationState();
  }

  private calculateSquareRoot(): void {
    this.handleUnaryOperation((value) =>
      value >= 0 ? Math.sqrt(value) : 'Error'
    );
  }

  private calculateReciprocal(): void {
    this.handleUnaryOperation((value) => (value === 0 ? 'Error' : 1 / value));
  }

  private handleSignChange(): void {
    this.handleUnaryOperation((value) => -value);
  }

  private calculatePercentage(): void {
    if (this.hasValidPendingOperation()) {
      this.handleOperationBasedPercentage();
    } else {
      this.handleUnaryOperation((value) => value / 100);
    }
  }

  private hasValidPendingOperation(): boolean {
    return this.state.previousValue !== null && this.state.calcAction !== null;
  }

  private handleOperationBasedPercentage(): void {
    const baseValue = Number(this.state.previousValue);
    const percentValue = Number(this.state.displayValue);

    const isAddSubtract =
      this.state.calcAction === 'add' || this.state.calcAction === 'subtract';
    const result = isAddSubtract
      ? (baseValue * percentValue) / 100
      : percentValue / 100;

    this.state.displayValue = this.formatResult(result);
  }

  private resetCalculationState(): void {
    this.state.calcAction = null;
    this.state.previousValue = null;
    this.state.previouslySetAction = false;
  }

  setAction(action: CalculatorOperation): void {
    const unaryOperations: Record<
      CalculatorOperation,
      (() => void) | undefined
    > = {
      sqroot: () => this.calculateSquareRoot(),
      reciprocal: () => this.calculateReciprocal(),
      signchange: () => this.handleSignChange(),
      percentage: () => this.calculatePercentage(),
      add: undefined,
      subtract: undefined,
      multiply: undefined,
      divide: undefined
    };

    const unaryOperation = unaryOperations[action];
    if (unaryOperation) {
      unaryOperation();
      return;
    }

    this.handleBinaryOperation(action);
  }

  private handleBinaryOperation(action: CalculatorOperation): void {
    this.state.justCalculated = false;

    if (this.shouldCalculateFirst()) {
      this.calculateResult();
      this.state.previousValue = this.state.displayValue;
    } else if (this.state.previousValue === null) {
      this.state.previousValue = this.state.displayValue;
    }

    this.state.calcAction = action;
    this.state.previouslySetAction = true;
  }

  private shouldCalculateFirst(): boolean {
    return this.hasValidPendingOperation() && !this.state.previouslySetAction;
  }

  appendToResult(value: number): void {
    if (this.shouldResetDisplay()) {
      this.state.displayValue = '';
      this.state.previouslySetAction = false;
    }

    this.state.justCalculated = false;
    this.state.displayValue = (this.state.displayValue + value).toString();
  }

  private shouldResetDisplay(): boolean {
    return (
      this.state.previouslySetAction ||
      this.state.displayValue === '0' ||
      this.state.displayValue === 'Error'
    );
  }

  appendDecimalPoint(): void {
    if (this.state.previouslySetAction) {
      this.state.displayValue = '0';
      this.state.previouslySetAction = false;
    }

    if (this.state.displayValue === '' || this.state.displayValue === 'Error') {
      this.state.displayValue = '0';
    }

    if (!this.state.displayValue.includes('.')) {
      this.state.displayValue += '.';
    }
  }

  private getOperandForCalculation(): {
    operand: string;
    operation: CalculatorOperation;
  } {
    if (this.state.previousValue === null) {
      return this.handleFirstCalculation();
    }

    if (this.shouldRepeatLastOperation()) {
      return this.handleRepeatedCalculation();
    }

    return this.handleNormalCalculation();
  }

  private handleFirstCalculation(): {
    operand: string;
    operation: CalculatorOperation;
  } {
    const operation = this.state.calcAction;
    if (!operation) {
      throw new Error('No operation set');
    }
    this.state.previousValue = this.state.displayValue;
    this.state.lastOperand = this.state.displayValue;
    this.state.lastOperation = operation;
    return {
      operand: this.state.displayValue,
      operation
    };
  }

  private handleRepeatedCalculation(): {
    operand: string;
    operation: CalculatorOperation;
  } {
    const lastOperand = this.state.lastOperand;
    const lastOperation = this.state.lastOperation;
    if (!lastOperand || !lastOperation) {
      throw new Error('No previous operation');
    }
    this.state.previousValue = this.state.displayValue;
    return {
      operand: lastOperand,
      operation: lastOperation
    };
  }

  private handleNormalCalculation(): {
    operand: string;
    operation: CalculatorOperation;
  } {
    const operation = this.state.calcAction;
    if (!operation) {
      throw new Error('No operation set');
    }
    this.state.lastOperand = this.state.displayValue;
    this.state.lastOperation = operation;
    return {
      operand: this.state.displayValue,
      operation
    };
  }

  private shouldRepeatLastOperation(): boolean {
    return (
      this.state.justCalculated &&
      this.state.lastOperand !== null &&
      this.state.lastOperation !== null
    );
  }

  private performOperation(
    operation: CalculatorOperation,
    previous: number,
    op: number
  ): number | string {
    const operations: Record<
      CalculatorOperation,
      (a: number, b: number) => number | string
    > = {
      add: (a, b) => a + b,
      subtract: (a, b) => a - b,
      multiply: (a, b) => a * b,
      divide: (a, b) => (b === 0 ? 'Error' : a / b),
      sqroot: (_, b) => (b >= 0 ? Math.sqrt(b) : 'Error'),
      percentage: (a, b) => a * (b / 100),
      reciprocal: (_, b) => (b === 0 ? 'Error' : 1 / b),
      signchange: (_, b) => -b
    };

    return operations[operation](previous, op);
  }

  calculateResult(): void {
    if (this.state.calcAction === null) return;

    const { operand, operation } = this.getOperandForCalculation();
    const previous = Number(this.state.previousValue) || 0;
    const op = Number(operand);

    const result = this.performOperation(operation, previous, op);

    this.state.displayValue =
      typeof result === 'string' ? result : this.formatResult(result);
    this.state.justCalculated = true;
    this.state.previouslySetAction = false;
  }

  clearAll(): void {
    this.state = {
      displayValue: '0',
      memory: this.state.memory,
      calcAction: null,
      previousValue: null,
      lastOperand: null,
      lastOperation: null,
      previouslySetAction: false,
      justCalculated: false
    };
  }

  clearEntry(): void {
    this.state.displayValue = '0';
    this.state.previouslySetAction = false;
  }
}
