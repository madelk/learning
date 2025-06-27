import { describe, it, expect } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import CalculatorView from './CalculatorView.vue';

describe('CalculatorView', () => {
  const findButtonByText = (wrapper: VueWrapper, text: string) => {
    const buttons = wrapper.findAll('button');
    return buttons.find((button) => button.text() === text);
  };

  const getDisplay = (wrapper: VueWrapper): string => {
    const display = wrapper.find('#result');
    return (display.element as HTMLInputElement).value;
  };

  describe('Component Rendering', () => {
    it('renders calculator component properly', () => {
      // Arrange
      const wrapper = mount(CalculatorView);

      // Act & Assert
      expect(wrapper.text()).toContain('This is a calculator page');
      expect(wrapper.find('#result').exists()).toBe(true);
    });
  });

  describe('1. Basic Digit & Decimal Entry', () => {
    it('D1: Simple multi-digit entry (1 2 3 → 123)', async () => {
      // Arrange
      const wrapper = mount(CalculatorView);

      // Act
      await findButtonByText(wrapper, '1')?.trigger('click');
      await findButtonByText(wrapper, '2')?.trigger('click');
      await findButtonByText(wrapper, '3')?.trigger('click');

      // Assert
      expect(getDisplay(wrapper)).toBe('123');
    });

    it('D2: Leading zeros (0 0 5 → 5)', async () => {
      // Arrange
      const wrapper = mount(CalculatorView);

      // Act
      await findButtonByText(wrapper, '0')?.trigger('click');
      await findButtonByText(wrapper, '0')?.trigger('click');
      await findButtonByText(wrapper, '5')?.trigger('click');

      // Assert
      expect(getDisplay(wrapper)).toBe('5');
    });

    it('D3: Single decimal point first (. → 0.)', async () => {
      // Arrange
      const wrapper = mount(CalculatorView);

      // Act
      await findButtonByText(wrapper, '.')?.trigger('click');

      // Assert
      expect(getDisplay(wrapper)).toBe('0.');
    });

    it('D4: Block extra-decimal (1 . 2 . 3 → 1.23)', async () => {
      // Arrange
      const wrapper = mount(CalculatorView);

      // Act
      await findButtonByText(wrapper, '1')?.trigger('click');
      await findButtonByText(wrapper, '.')?.trigger('click');
      await findButtonByText(wrapper, '2')?.trigger('click');
      await findButtonByText(wrapper, '.')?.trigger('click');
      await findButtonByText(wrapper, '3')?.trigger('click');

      // Assert
      expect(getDisplay(wrapper)).toBe('1.23');
    });

    it('D5: Decimal with leading digit (. 3 → 0.3)', async () => {
      // Arrange
      const wrapper = mount(CalculatorView);

      // Act
      await findButtonByText(wrapper, '.')?.trigger('click');
      await findButtonByText(wrapper, '3')?.trigger('click');

      // Assert
      expect(getDisplay(wrapper)).toBe('0.3');
    });
  });

  describe('2. Basic Binary Operations', () => {
    it('B1: Addition (2 + 3 = → 5)', async () => {
      // Arrange
      const wrapper = mount(CalculatorView);

      // Act
      await findButtonByText(wrapper, '2')?.trigger('click');
      await findButtonByText(wrapper, '+')?.trigger('click');
      await findButtonByText(wrapper, '3')?.trigger('click');
      await findButtonByText(wrapper, '=')?.trigger('click');

      // Assert
      expect(getDisplay(wrapper)).toBe('5');
    });

    it('B2: Subtraction (7 − 1 0 = → −3)', async () => {
      // Arrange
      const wrapper = mount(CalculatorView);

      // Act
      await findButtonByText(wrapper, '7')?.trigger('click');
      await findButtonByText(wrapper, '-')?.trigger('click');
      await findButtonByText(wrapper, '1')?.trigger('click');
      await findButtonByText(wrapper, '0')?.trigger('click');
      await findButtonByText(wrapper, '=')?.trigger('click');

      // Assert
      expect(getDisplay(wrapper)).toBe('-3');
    });

    it('B3: Multiplication (4 × 5 = → 20)', async () => {
      // Arrange
      const wrapper = mount(CalculatorView);

      // Act
      await findButtonByText(wrapper, '4')?.trigger('click');
      await findButtonByText(wrapper, '*')?.trigger('click');
      await findButtonByText(wrapper, '5')?.trigger('click');
      await findButtonByText(wrapper, '=')?.trigger('click');

      // Assert
      expect(getDisplay(wrapper)).toBe('20');
    });

    it('B4: Division (2 0 ÷ 4 = → 5)', async () => {
      // Arrange
      const wrapper = mount(CalculatorView);

      // Act
      await findButtonByText(wrapper, '2')?.trigger('click');
      await findButtonByText(wrapper, '0')?.trigger('click');
      await findButtonByText(wrapper, '/')?.trigger('click');
      await findButtonByText(wrapper, '4')?.trigger('click');
      await findButtonByText(wrapper, '=')?.trigger('click');

      // Assert
      expect(getDisplay(wrapper)).toBe('5');
    });
  });

  describe('3. Operator Chaining (Immediate Execution)', () => {
    it('C1: 5 + 3 × 2 = (no algebraic priority) → 16', async () => {
      // Arrange
      const wrapper = mount(CalculatorView);

      // Act
      await findButtonByText(wrapper, '5')?.trigger('click');
      await findButtonByText(wrapper, '+')?.trigger('click');
      await findButtonByText(wrapper, '3')?.trigger('click');
      await findButtonByText(wrapper, '*')?.trigger('click');
      await findButtonByText(wrapper, '2')?.trigger('click');
      await findButtonByText(wrapper, '=')?.trigger('click');

      // Assert
      expect(getDisplay(wrapper)).toBe('16');
    });

    it('C2: Replace pending operator (5 + − 2 = → 3)', async () => {
      // Arrange
      const wrapper = mount(CalculatorView);

      // Act
      await findButtonByText(wrapper, '5')?.trigger('click');
      await findButtonByText(wrapper, '+')?.trigger('click');
      await findButtonByText(wrapper, '-')?.trigger('click');
      await findButtonByText(wrapper, '2')?.trigger('click');
      await findButtonByText(wrapper, '=')?.trigger('click');

      // Assert
      expect(getDisplay(wrapper)).toBe('3');
    });
  });

  describe('4. Repeat "=" Behavior', () => {
    it('E1: Repeat last add (5 + 3 = = = → 8 → 11 → 14)', async () => {
      // Arrange
      const wrapper = mount(CalculatorView);

      // Act
      await findButtonByText(wrapper, '5')?.trigger('click');
      await findButtonByText(wrapper, '+')?.trigger('click');
      await findButtonByText(wrapper, '3')?.trigger('click');
      await findButtonByText(wrapper, '=')?.trigger('click');

      // Assert
      expect(getDisplay(wrapper)).toBe('8');

      // Act - Repeat equals
      await findButtonByText(wrapper, '=')?.trigger('click');

      // Assert
      expect(getDisplay(wrapper)).toBe('11');

      // Act - Repeat equals again
      await findButtonByText(wrapper, '=')?.trigger('click');

      // Assert
      expect(getDisplay(wrapper)).toBe('14');
    });

    it('E2: "5+ =" uses accumulator as operand (5 + = → 10)', async () => {
      // Arrange
      const wrapper = mount(CalculatorView);

      // Act
      await findButtonByText(wrapper, '5')?.trigger('click');
      await findButtonByText(wrapper, '+')?.trigger('click');
      await findButtonByText(wrapper, '=')?.trigger('click');

      // Assert
      expect(getDisplay(wrapper)).toBe('10');
    });
  });

  describe('5. Unary Operations (Immediate)', () => {
    it('U1: Square-root (9 √ → 3)', async () => {
      // Arrange
      const wrapper = mount(CalculatorView);

      // Act
      await findButtonByText(wrapper, '9')?.trigger('click');
      await findButtonByText(wrapper, 'sq')?.trigger('click');

      // Assert
      expect(getDisplay(wrapper)).toBe('3');
    });

    it('U2: Reciprocal (4 1/x → 0.25)', async () => {
      // Arrange
      const wrapper = mount(CalculatorView);

      // Act
      await findButtonByText(wrapper, '4')?.trigger('click');
      await findButtonByText(wrapper, '1/x')?.trigger('click');

      // Assert
      expect(getDisplay(wrapper)).toBe('0.25');
    });

    it('U3: Sign-change (5 ± → −5)', async () => {
      // Arrange
      const wrapper = mount(CalculatorView);

      // Act
      await findButtonByText(wrapper, '5')?.trigger('click');
      await findButtonByText(wrapper, '±')?.trigger('click');

      // Assert
      expect(getDisplay(wrapper)).toBe('-5');
    });
  });

  describe('6. Percent (%) Rules', () => {
    it('P1: 200 + 10% = → 200 + (200×0.10) → 220', async () => {
      // Arrange
      const wrapper = mount(CalculatorView);

      // Act
      await findButtonByText(wrapper, '2')?.trigger('click');
      await findButtonByText(wrapper, '0')?.trigger('click');
      await findButtonByText(wrapper, '0')?.trigger('click');
      await findButtonByText(wrapper, '+')?.trigger('click');
      await findButtonByText(wrapper, '1')?.trigger('click');
      await findButtonByText(wrapper, '0')?.trigger('click');
      await findButtonByText(wrapper, '%')?.trigger('click');
      await findButtonByText(wrapper, '=')?.trigger('click');

      // Assert
      expect(getDisplay(wrapper)).toBe('220');
    });

    it('P2: 100 × 10% = → 100×0.10 → 10', async () => {
      // Arrange
      const wrapper = mount(CalculatorView);

      // Act
      await findButtonByText(wrapper, '1')?.trigger('click');
      await findButtonByText(wrapper, '0')?.trigger('click');
      await findButtonByText(wrapper, '0')?.trigger('click');
      await findButtonByText(wrapper, '*')?.trigger('click');
      await findButtonByText(wrapper, '1')?.trigger('click');
      await findButtonByText(wrapper, '0')?.trigger('click');
      await findButtonByText(wrapper, '%')?.trigger('click');
      await findButtonByText(wrapper, '=')?.trigger('click');

      // Assert
      expect(getDisplay(wrapper)).toBe('10');
    });
  });

  describe('7. Clear vs Clear-Entry', () => {
    it('C-1: CE wipes current entry only (5 + 3 CE = → 5)', async () => {
      // Arrange
      const wrapper = mount(CalculatorView);

      // Act
      await findButtonByText(wrapper, '5')?.trigger('click');
      await findButtonByText(wrapper, '+')?.trigger('click');
      await findButtonByText(wrapper, '3')?.trigger('click');
      await findButtonByText(wrapper, 'CE')?.trigger('click');
      await findButtonByText(wrapper, '=')?.trigger('click');

      // Assert
      expect(getDisplay(wrapper)).toBe('5');
    });

    it('C-2: C wipes all (5 + 3 C 2 + 2 = → 4)', async () => {
      // Arrange
      const wrapper = mount(CalculatorView);

      // Act
      await findButtonByText(wrapper, '5')?.trigger('click');
      await findButtonByText(wrapper, '+')?.trigger('click');
      await findButtonByText(wrapper, '3')?.trigger('click');
      await findButtonByText(wrapper, 'C')?.trigger('click');
      await findButtonByText(wrapper, '2')?.trigger('click');
      await findButtonByText(wrapper, '+')?.trigger('click');
      await findButtonByText(wrapper, '2')?.trigger('click');
      await findButtonByText(wrapper, '=')?.trigger('click');

      // Assert
      expect(getDisplay(wrapper)).toBe('4');
    });
  });

  describe('8. Memory Functions', () => {
    it('M1: M+ then MR (5 M+ MR → 5)', async () => {
      // Arrange
      const wrapper = mount(CalculatorView);

      // Act
      await findButtonByText(wrapper, '5')?.trigger('click');
      await findButtonByText(wrapper, 'M+')?.trigger('click');
      await findButtonByText(wrapper, 'MR')?.trigger('click');

      // Assert
      expect(getDisplay(wrapper)).toBe('5');
    });

    it('M2: Multiple M+ accumulates (5 M+ 3 M+ MR → 8)', async () => {
      // Arrange
      const wrapper = mount(CalculatorView);

      // Act
      await findButtonByText(wrapper, '5')?.trigger('click');
      await findButtonByText(wrapper, 'M+')?.trigger('click');
      await findButtonByText(wrapper, '3')?.trigger('click');
      await findButtonByText(wrapper, 'M+')?.trigger('click');
      await findButtonByText(wrapper, 'MR')?.trigger('click');

      // Assert
      expect(getDisplay(wrapper)).toBe('8');
    });

    it('M3: M– subtracts from memory (M=8, 4 M– MR → 4)', async () => {
      // Arrange
      const wrapper = mount(CalculatorView);

      // Act - First set memory to 8
      await findButtonByText(wrapper, '8')?.trigger('click');
      await findButtonByText(wrapper, 'M+')?.trigger('click');

      // Act - Subtract 4 from memory
      await findButtonByText(wrapper, '4')?.trigger('click');
      await findButtonByText(wrapper, 'M-')?.trigger('click');
      await findButtonByText(wrapper, 'MR')?.trigger('click');

      // Assert
      expect(getDisplay(wrapper)).toBe('4');
    });

    it('M4: MC clears memory (MC MR → 0)', async () => {
      // Arrange
      const wrapper = mount(CalculatorView);

      // Act - First add something to memory
      await findButtonByText(wrapper, '5')?.trigger('click');
      await findButtonByText(wrapper, 'M+')?.trigger('click');

      // Act - Clear memory and recall
      await findButtonByText(wrapper, 'MC')?.trigger('click');
      await findButtonByText(wrapper, 'MR')?.trigger('click');

      // Assert
      expect(getDisplay(wrapper)).toBe('0');
    });
  });

  describe('9. Error & Overflow', () => {
    it('X1: Divide-by-zero (5 ÷ 0 = → Error)', async () => {
      // Arrange
      const wrapper = mount(CalculatorView);

      // Act
      await findButtonByText(wrapper, '5')?.trigger('click');
      await findButtonByText(wrapper, '/')?.trigger('click');
      await findButtonByText(wrapper, '0')?.trigger('click');
      await findButtonByText(wrapper, '=')?.trigger('click');

      // Assert
      expect(getDisplay(wrapper)).toBe('Error');
    });

    it('X2: Overflow → switch to "E" (99999999 × 9 = → 8.99999991E8)', async () => {
      // Arrange
      const wrapper = mount(CalculatorView);

      // Act
      await findButtonByText(wrapper, '9')?.trigger('click');
      await findButtonByText(wrapper, '9')?.trigger('click');
      await findButtonByText(wrapper, '9')?.trigger('click');
      await findButtonByText(wrapper, '9')?.trigger('click');
      await findButtonByText(wrapper, '9')?.trigger('click');
      await findButtonByText(wrapper, '9')?.trigger('click');
      await findButtonByText(wrapper, '9')?.trigger('click');
      await findButtonByText(wrapper, '9')?.trigger('click');
      await findButtonByText(wrapper, '*')?.trigger('click');
      await findButtonByText(wrapper, '9')?.trigger('click');
      await findButtonByText(wrapper, '=')?.trigger('click');

      // Assert - Should display in exponential notation
      const result = getDisplay(wrapper);
      expect(result).toMatch(/8\.99999991?E\+?8/);
    });
  });

  describe('10. Rounding & Floating-Point Quirks', () => {
    it('R1: 0.1 + 0.2 → 0.3 exactly (. 1 + . 2 = → 0.3)', async () => {
      // Arrange
      const wrapper = mount(CalculatorView);

      // Act
      await findButtonByText(wrapper, '.')?.trigger('click');
      await findButtonByText(wrapper, '1')?.trigger('click');
      await findButtonByText(wrapper, '+')?.trigger('click');
      await findButtonByText(wrapper, '.')?.trigger('click');
      await findButtonByText(wrapper, '2')?.trigger('click');
      await findButtonByText(wrapper, '=')?.trigger('click');

      // Assert
      expect(getDisplay(wrapper)).toBe('0.3');
    });

    it('R2: 1/3 rounded to 8 digits (1 ÷ 3 = → 0.33333333)', async () => {
      // Arrange
      const wrapper = mount(CalculatorView);

      // Act
      await findButtonByText(wrapper, '1')?.trigger('click');
      await findButtonByText(wrapper, '/')?.trigger('click');
      await findButtonByText(wrapper, '3')?.trigger('click');
      await findButtonByText(wrapper, '=')?.trigger('click');

      // Assert
      expect(getDisplay(wrapper)).toBe('0.33333333');
    });
  });
});
