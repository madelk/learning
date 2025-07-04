 
import {
  CALCULATOR_BUTTONS,
  createButtonHandler,
  DEFAULT_STYLE_CLASSES
} from './button-config.js';
import { CalculatorLogic } from './calculator-logic.js';

describe('Calculator Button Configuration', () => {
  let calculator: CalculatorLogic;
  let updateDisplayCalled: boolean;
  let updateDisplay: () => void;

  beforeEach(() => {
    calculator = new CalculatorLogic();
    updateDisplayCalled = false;
    updateDisplay = (): void => {
      updateDisplayCalled = true;
    };
  });

  describe('CALCULATOR_BUTTONS configuration', () => {
    it('should have 26 buttons (5x5 grid + equals)', () => {
      expect(CALCULATOR_BUTTONS).toHaveLength(26);
    });

    it('should have exactly one equals button with fullWidth property', () => {
      const equalsButtons = CALCULATOR_BUTTONS.filter(
        (button) => button.fullWidth
      );
      expect(equalsButtons).toHaveLength(1);
      expect(equalsButtons[0]?.label).toBe('=');
    });

    it('should have all required memory buttons', () => {
      const memoryLabels = new Set(['MC', 'MR', 'M-', 'M+']);
      const memoryButtons = CALCULATOR_BUTTONS.filter((button) =>
        memoryLabels.has(button.label)
      );
      expect(memoryButtons).toHaveLength(4);
      for (const button of memoryButtons) {
        expect(button.actionType).toBe('memory');
        expect(button.styleType).toBe('memory');
      }
    });

    it('should have all digit buttons 0-9', () => {
      const digitButtons = CALCULATOR_BUTTONS.filter(
        (button) => button.actionType === 'digit'
      );
      expect(digitButtons).toHaveLength(10);

      for (let i = 0; i <= 9; i++) {
        const digitButton = digitButtons.find(
          (button) => button.actionData === i
        );
        expect(digitButton).toBeDefined();
        expect(digitButton?.label).toBe(i.toString());
      }
    });

    it('should have all required operation buttons', () => {
      const operationLabels = new Set(['+', '-', '*', '/']);
      const operationButtons = CALCULATOR_BUTTONS.filter((button) =>
        operationLabels.has(button.label)
      );
      expect(operationButtons).toHaveLength(4);
      for (const button of operationButtons) {
        expect(button.actionType).toBe('operation');
      }
    });

    it('should have all required unary operation buttons', () => {
      const unaryLabels = new Set(['sq', '1/x', '±', '%']);
      const unaryButtons = CALCULATOR_BUTTONS.filter((button) =>
        unaryLabels.has(button.label)
      );
      expect(unaryButtons).toHaveLength(4);
      for (const button of unaryButtons) {
        expect(button.actionType).toBe('unary');
      }
    });

    it('should have decimal point button', () => {
      const decimalButton = CALCULATOR_BUTTONS.find(
        (button) => button.label === '.'
      );
      expect(decimalButton).toBeDefined();
      expect(decimalButton?.actionType).toBe('decimal');
    });

    it('should have clear buttons', () => {
      const clearButton = CALCULATOR_BUTTONS.find(
        (button) => button.label === 'C'
      );
      const clearEntryButton = CALCULATOR_BUTTONS.find(
        (button) => button.label === 'CE'
      );

      expect(clearButton).toBeDefined();
      expect(clearButton?.actionType).toBe('clear');
      expect(clearButton?.styleType).toBe('clear');

      expect(clearEntryButton).toBeDefined();
      expect(clearEntryButton?.actionType).toBe('clearEntry');
    });
  });

  describe('createButtonHandler', () => {
    it('should handle digit buttons correctly', () => {
      const digitButton = CALCULATOR_BUTTONS.find(
        (button) => button.label === '7'
      )!;
      const handler = createButtonHandler(
        digitButton,
        calculator,
        updateDisplay
      );

      handler();

      expect(calculator.getDisplayValue()).toBe('7');
      expect(updateDisplayCalled).toBe(true);
    });

    it('should handle decimal button correctly', () => {
      const decimalButton = CALCULATOR_BUTTONS.find(
        (button) => button.label === '.'
      )!;
      const handler = createButtonHandler(
        decimalButton,
        calculator,
        updateDisplay
      );

      handler();

      expect(calculator.getDisplayValue()).toBe('0.');
      expect(updateDisplayCalled).toBe(true);
    });

    it('should handle operation buttons correctly', () => {
      calculator.appendToResult(5);
      const addButton = CALCULATOR_BUTTONS.find(
        (button) => button.label === '+'
      )!;
      const handler = createButtonHandler(addButton, calculator, updateDisplay);

      handler();
      calculator.appendToResult(3);
      calculator.calculateResult();

      expect(calculator.getDisplayValue()).toBe('8');
    });

    it('should handle unary operation buttons correctly', () => {
      calculator.appendToResult(25);
      const sqrtButton = CALCULATOR_BUTTONS.find(
        (button) => button.label === 'sq'
      )!;
      const handler = createButtonHandler(
        sqrtButton,
        calculator,
        updateDisplay
      );

      handler();

      expect(calculator.getDisplayValue()).toBe('5');
      expect(updateDisplayCalled).toBe(true);
    });

    it('should handle memory buttons correctly', () => {
      calculator.appendToResult(42);
      const memoryAddButton = CALCULATOR_BUTTONS.find(
        (button) => button.label === 'M+'
      )!;
      const memoryRecallButton = CALCULATOR_BUTTONS.find(
        (button) => button.label === 'MR'
      )!;

      const addHandler = createButtonHandler(
        memoryAddButton,
        calculator,
        updateDisplay
      );
      const recallHandler = createButtonHandler(
        memoryRecallButton,
        calculator,
        updateDisplay
      );

      addHandler();
      calculator.clearAll();
      recallHandler();

      expect(calculator.getDisplayValue()).toBe('42');
      expect(updateDisplayCalled).toBe(true);
    });

    it('should handle clear buttons correctly', () => {
      calculator.appendToResult(123);
      const clearButton = CALCULATOR_BUTTONS.find(
        (button) => button.label === 'C'
      )!;
      const handler = createButtonHandler(
        clearButton,
        calculator,
        updateDisplay
      );

      handler();

      expect(calculator.getDisplayValue()).toBe('0');
      expect(updateDisplayCalled).toBe(true);
    });

    it('should handle calculate button correctly', () => {
      calculator.appendToResult(10);
      calculator.setAction('multiply');
      calculator.appendToResult(5);

      const equalsButton = CALCULATOR_BUTTONS.find(
        (button) => button.label === '='
      )!;
      const handler = createButtonHandler(
        equalsButton,
        calculator,
        updateDisplay
      );

      handler();

      expect(calculator.getDisplayValue()).toBe('50');
      expect(updateDisplayCalled).toBe(true);
    });
  });

  describe('DEFAULT_STYLE_CLASSES', () => {
    it('should have all required style mappings', () => {
      expect(DEFAULT_STYLE_CLASSES.default).toBeDefined();
      expect(DEFAULT_STYLE_CLASSES.memory).toBeDefined();
      expect(DEFAULT_STYLE_CLASSES.clear).toBeDefined();
      expect(DEFAULT_STYLE_CLASSES.danger).toBeDefined();
    });

    it('should provide different styles for different button types', () => {
      const styles = Object.values(DEFAULT_STYLE_CLASSES);
      const uniqueStyles = new Set(styles);
      expect(uniqueStyles.size).toBeGreaterThan(1);
    });
  });

  describe('Button layout consistency', () => {
    it('should maintain the exact same layout as the original Vue/React implementations', () => {
      const expectedLayout = [
        // Row 1: Memory and Clear
        'MC',
        'MR',
        'M-',
        'M+',
        'C',
        // Row 2: Digits 7-9, Division, Reciprocal
        '7',
        '8',
        '9',
        '/',
        '1/x',
        // Row 3: Digits 4-6, Multiplication, Clear Entry
        '4',
        '5',
        '6',
        '*',
        'CE',
        // Row 4: Digits 1-3, Subtraction, Sign Change
        '1',
        '2',
        '3',
        '-',
        '±',
        // Row 5: Square root, 0, Decimal, Percent, Addition
        'sq',
        '0',
        '.',
        '%',
        '+',
        // Row 6: Equals
        '='
      ];

      const actualLayout = CALCULATOR_BUTTONS.map((button) => button.label);
      expect(actualLayout).toEqual(expectedLayout);
    });
  });
});
