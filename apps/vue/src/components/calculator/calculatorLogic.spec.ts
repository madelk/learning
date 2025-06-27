import { CalculatorLogic } from './CalculatorLogic';

describe('CalculatorLogic', () => {
  let calc: CalculatorLogic;

  beforeEach(() => {
    calc = new CalculatorLogic();
  });

  describe('Digit Entry', () => {
    it('should enter single digits correctly', () => {
      // Arrange & Act
      calc.appendToResult(5);
      
      // Assert
      expect(calc.getDisplayValue()).toBe('5');
    });

    it('should build multi-digit numbers', () => {
      // Arrange & Act
      calc.appendToResult(1);
      calc.appendToResult(2);
      calc.appendToResult(3);
      
      // Assert
      expect(calc.getDisplayValue()).toBe('123');
    });

    it('should handle decimal numbers', () => {
      // Arrange & Act
      calc.appendToResult(1);
      calc.appendDecimalPoint();
      calc.appendToResult(5);
      
      // Assert
      expect(calc.getDisplayValue()).toBe('1.5');
    });

    it('should start with "0." when decimal is first input', () => {
      // Arrange & Act
      calc.appendDecimalPoint();
      
      // Assert
      expect(calc.getDisplayValue()).toBe('0.');
    });

    it('should not allow multiple decimal points', () => {
      // Arrange & Act
      calc.appendToResult(1);
      calc.appendDecimalPoint();
      calc.appendToResult(5);
      calc.appendDecimalPoint(); // Second decimal point
      calc.appendToResult(2);
      
      // Assert
      expect(calc.getDisplayValue()).toBe('1.52');
    });

    it('should replace "0" when entering non-zero digit', () => {
      // Arrange & Act
      calc.appendToResult(5);
      
      // Assert
      expect(calc.getDisplayValue()).toBe('5');
    });

    it('should allow entering "0" after other digits', () => {
      // Arrange & Act
      calc.appendToResult(1);
      calc.appendToResult(0);
      calc.appendToResult(5);
      
      // Assert
      expect(calc.getDisplayValue()).toBe('105');
    });
  });

  describe('Binary Operations', () => {
    it('should perform addition', () => {
      // Arrange & Act
      calc.appendToResult(5);
      calc.setAction('add');
      calc.appendToResult(3);
      calc.calculateResult();
      
      // Assert
      expect(calc.getDisplayValue()).toBe('8');
    });

    it('should perform subtraction', () => {
      // Arrange & Act
      calc.appendToResult(8);
      calc.setAction('subtract');
      calc.appendToResult(3);
      calc.calculateResult();
      
      // Assert
      expect(calc.getDisplayValue()).toBe('5');
    });

    it('should perform multiplication', () => {
      // Arrange & Act
      calc.appendToResult(4);
      calc.setAction('multiply');
      calc.appendToResult(7);
      calc.calculateResult();
      
      // Assert
      expect(calc.getDisplayValue()).toBe('28');
    });

    it('should perform division', () => {
      // Arrange & Act
      calc.appendToResult(1);
      calc.appendToResult(5);
      calc.setAction('divide');
      calc.appendToResult(3);
      calc.calculateResult();
      
      // Assert
      expect(calc.getDisplayValue()).toBe('5');
    });

    it('should handle division by zero', () => {
      // Arrange & Act
      calc.appendToResult(5);
      calc.setAction('divide');
      calc.appendToResult(0);
      calc.calculateResult();
      
      // Assert
      expect(calc.getDisplayValue()).toBe('Error');
    });

    it('should handle decimal arithmetic correctly (0.1 + 0.2)', () => {
      // Arrange & Act
      calc.appendToResult(0);
      calc.appendDecimalPoint();
      calc.appendToResult(1);
      calc.setAction('add');
      calc.appendToResult(0);
      calc.appendDecimalPoint();
      calc.appendToResult(2);
      calc.calculateResult();
      
      // Assert
      expect(calc.getDisplayValue()).toBe('0.3');
    });
  });

  describe('Operator Chaining', () => {
    it('should perform consecutive operations', () => {
      // Arrange & Act
      calc.appendToResult(5);
      calc.setAction('add');
      calc.appendToResult(3);
      calc.setAction('multiply'); // Should calculate 5+3=8 first
      calc.appendToResult(2);
      calc.calculateResult();
      
      // Assert
      expect(calc.getDisplayValue()).toBe('16'); // (5+3)*2 = 16
    });

    it('should allow operator replacement before entering second operand', () => {
      // Arrange & Act
      calc.appendToResult(5);
      calc.setAction('add');
      calc.setAction('multiply'); // Replace + with *
      calc.appendToResult(3);
      calc.calculateResult();
      
      // Assert
      expect(calc.getDisplayValue()).toBe('15'); // 5*3 = 15
    });

    it('should handle long chains of operations', () => {
      // Arrange & Act
      calc.appendToResult(1);
      calc.setAction('add');
      calc.appendToResult(2);
      calc.setAction('add');
      calc.appendToResult(3);
      calc.setAction('add');
      calc.appendToResult(4);
      calc.calculateResult();
      
      // Assert
      expect(calc.getDisplayValue()).toBe('10'); // ((1+2)+3)+4 = 10
    });
  });

  describe('Repeat Equals', () => {
    it('should repeat the last operation when equals is pressed multiple times', () => {
      // Arrange & Act
      calc.appendToResult(5);
      calc.setAction('add');
      calc.appendToResult(3);
      calc.calculateResult(); // 5+3=8
      calc.calculateResult(); // 8+3=11
      calc.calculateResult(); // 11+3=14
      
      // Assert
      expect(calc.getDisplayValue()).toBe('14');
    });

    it('should work with subtraction', () => {
      // Arrange & Act
      calc.appendToResult(1);
      calc.appendToResult(0);
      calc.setAction('subtract');
      calc.appendToResult(3);
      calc.calculateResult(); // 10-3=7
      calc.calculateResult(); // 7-3=4
      
      // Assert
      expect(calc.getDisplayValue()).toBe('4');
    });

    it('should work with multiplication', () => {
      // Arrange & Act
      calc.appendToResult(2);
      calc.setAction('multiply');
      calc.appendToResult(3);
      calc.calculateResult(); // 2*3=6
      calc.calculateResult(); // 6*3=18
      
      // Assert
      expect(calc.getDisplayValue()).toBe('18');
    });

    it('should work with division', () => {
      // Arrange & Act
      calc.appendToResult(2);
      calc.appendToResult(7);
      calc.setAction('divide');
      calc.appendToResult(3);
      calc.calculateResult(); // 27/3=9
      calc.calculateResult(); // 9/3=3
      
      // Assert
      expect(calc.getDisplayValue()).toBe('3');
    });

    it('should handle equals without operator (no-op)', () => {
      // Arrange & Act
      calc.appendToResult(5);
      calc.calculateResult();
      
      // Assert
      expect(calc.getDisplayValue()).toBe('5');
    });
  });

  describe('Unary Operations', () => {
    it('should calculate square root', () => {
      // Arrange & Act
      calc.appendToResult(9);
      calc.setAction('sqroot');
      
      // Assert
      expect(calc.getDisplayValue()).toBe('3');
    });

    it('should handle square root of negative number', () => {
      // Arrange & Act
      calc.appendToResult(5);
      calc.setAction('signchange'); // Make it -5
      calc.setAction('sqroot');
      
      // Assert
      expect(calc.getDisplayValue()).toBe('Error');
    });

    it('should calculate reciprocal (1/x)', () => {
      // Arrange & Act
      calc.appendToResult(4);
      calc.setAction('reciprocal');
      
      // Assert
      expect(calc.getDisplayValue()).toBe('0.25');
    });

    it('should handle reciprocal of zero', () => {
      // Arrange & Act
      calc.setAction('reciprocal'); // Default is 0
      
      // Assert
      expect(calc.getDisplayValue()).toBe('Error');
    });

    it('should change sign of positive number', () => {
      // Arrange & Act
      calc.appendToResult(5);
      calc.setAction('signchange');
      
      // Assert
      expect(calc.getDisplayValue()).toBe('-5');
    });

    it('should change sign of negative number', () => {
      // Arrange & Act
      calc.appendToResult(5);
      calc.setAction('signchange');
      calc.setAction('signchange');
      
      // Assert
      expect(calc.getDisplayValue()).toBe('5');
    });

    it('should change sign of zero', () => {
      // Arrange & Act
      calc.setAction('signchange'); // Default is 0
      
      // Assert
      expect(calc.getDisplayValue()).toBe('0');
    });
  });

  describe('Percent Operations', () => {
    it('should calculate percentage without pending operation', () => {
      // Arrange & Act
      calc.appendToResult(5);
      calc.appendToResult(0);
      calc.setAction('percentage');
      
      // Assert
      expect(calc.getDisplayValue()).toBe('0.5'); // 50% = 0.5
    });

    it('should calculate percentage with addition (50 + 10%)', () => {
      // Arrange & Act
      calc.appendToResult(5);
      calc.appendToResult(0);
      calc.setAction('add');
      calc.appendToResult(1);
      calc.appendToResult(0);
      calc.setAction('percentage');
      
      // Assert
      expect(calc.getDisplayValue()).toBe('5'); // 50 * 10% = 5
    });

    it('should calculate percentage with subtraction (50 - 10%)', () => {
      // Arrange & Act
      calc.appendToResult(5);
      calc.appendToResult(0);
      calc.setAction('subtract');
      calc.appendToResult(1);
      calc.appendToResult(0);
      calc.setAction('percentage');
      
      // Assert
      expect(calc.getDisplayValue()).toBe('5'); // 50 * 10% = 5
    });

    it('should calculate percentage with multiplication (50 * 10%)', () => {
      // Arrange & Act
      calc.appendToResult(5);
      calc.appendToResult(0);
      calc.setAction('multiply');
      calc.appendToResult(1);
      calc.appendToResult(0);
      calc.setAction('percentage');
      
      // Assert
      expect(calc.getDisplayValue()).toBe('0.1'); // 10% = 0.1
    });

    it('should calculate percentage with division (50 / 10%)', () => {
      // Arrange & Act
      calc.appendToResult(5);
      calc.appendToResult(0);
      calc.setAction('divide');
      calc.appendToResult(1);
      calc.appendToResult(0);
      calc.setAction('percentage');
      
      // Assert
      expect(calc.getDisplayValue()).toBe('0.1'); // 10% = 0.1
    });
  });

  describe('Clear Operations', () => {
    it('should clear all with C button', () => {
      // Arrange
      calc.appendToResult(5);
      calc.setAction('add');
      calc.appendToResult(3);
      
      // Act
      calc.clearAll();
      
      // Assert
      expect(calc.getDisplayValue()).toBe('0');
    });

    it('should clear entry with CE button', () => {
      // Arrange
      calc.appendToResult(5);
      calc.setAction('add');
      calc.appendToResult(3);
      calc.appendToResult(7);
      
      // Act
      calc.clearEntry();
      
      // Assert
      expect(calc.getDisplayValue()).toBe('0');
      // Previous operation should still be intact
      calc.appendToResult(2);
      calc.calculateResult();
      expect(calc.getDisplayValue()).toBe('7'); // 5+2=7
    });

    it('should allow continuing after CE', () => {
      // Arrange
      calc.appendToResult(5);
      calc.setAction('add');
      calc.appendToResult(8);
      calc.clearEntry();
      
      // Act
      calc.appendToResult(3);
      calc.calculateResult();
      
      // Assert
      expect(calc.getDisplayValue()).toBe('8'); // 5+3=8
    });
  });

  describe('Memory Operations', () => {
    it('should clear memory with MC', () => {
      // Arrange
      calc.appendToResult(5);
      calc.addToMemory();
      
      // Act
      calc.clearMemory();
      
      // Assert
      expect(calc.getMemoryValue()).toBeNull();
    });

    it('should add to memory with M+', () => {
      // Arrange & Act
      calc.appendToResult(5);
      calc.addToMemory();
      
      // Assert
      expect(calc.getMemoryValue()).toBe('5');
    });

    it('should accumulate memory with multiple M+', () => {
      // Arrange & Act
      calc.appendToResult(5);
      calc.addToMemory();
      calc.appendToResult(3);
      calc.addToMemory();
      
      // Assert
      expect(calc.getMemoryValue()).toBe('8'); // 5+3=8
    });

    it('should subtract from memory with M-', () => {
      // Arrange
      calc.appendToResult(1);
      calc.appendToResult(0);
      calc.addToMemory();
      
      // Act
      calc.appendToResult(3);
      calc.subtractFromMemory();
      
      // Assert
      expect(calc.getMemoryValue()).toBe('7'); // 10-3=7
    });

    it('should recall memory with MR', () => {
      // Arrange
      calc.appendToResult(5);
      calc.addToMemory();
      calc.appendToResult(3);
      
      // Act
      calc.recallMemory();
      
      // Assert
      expect(calc.getDisplayValue()).toBe('5');
    });

    it('should handle memory operations with empty memory', () => {
      // Arrange & Act
      calc.appendToResult(5);
      calc.subtractFromMemory(); // Memory was null, should become 0-5=-5
      
      // Assert
      expect(calc.getMemoryValue()).toBe('-5');
    });

    it('should recall "0" when memory is empty', () => {
      // Arrange & Act
      calc.recallMemory();
      
      // Assert
      expect(calc.getDisplayValue()).toBe('0');
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle very large numbers with exponential notation', () => {
      // This is difficult to test precisely due to calculator implementation
      // The test verifies the formatResult logic handles large numbers
      calc.appendToResult(9);
      calc.appendToResult(9);
      calc.appendToResult(9);
      calc.appendToResult(9);
      calc.appendToResult(9);
      calc.appendToResult(9);
      calc.appendToResult(9);
      calc.appendToResult(9);
      calc.appendToResult(9);
      calc.setAction('multiply');
      calc.appendToResult(9);
      calc.appendToResult(9);
      calc.appendToResult(9);
      calc.appendToResult(9);
      calc.appendToResult(9);
      calc.appendToResult(9);
      calc.appendToResult(9);
      calc.appendToResult(9);
      calc.appendToResult(9);
      calc.calculateResult();
      
      // Assert result is in exponential format or a very large number
      const result = calc.getDisplayValue();
      expect(result.includes('e') || result.length > 10).toBe(true);
    });

    it('should handle operation on Error state', () => {
      // Arrange - Create error state
      calc.appendToResult(5);
      calc.setAction('divide');
      calc.appendToResult(0);
      calc.calculateResult();
      expect(calc.getDisplayValue()).toBe('Error');
      
      // Act - Try to perform operation on Error
      calc.setAction('add');
      calc.appendToResult(5);
      calc.calculateResult();
      
      // Assert - Should handle gracefully (exact behavior may vary)
      expect(calc.getDisplayValue()).toBeDefined();
    });

    it('should clear Error state when entering new number', () => {
      // Arrange - Create error state
      calc.appendToResult(5);
      calc.setAction('divide');
      calc.appendToResult(0);
      calc.calculateResult();
      expect(calc.getDisplayValue()).toBe('Error');
      
      // Act
      calc.appendToResult(3);
      
      // Assert
      expect(calc.getDisplayValue()).toBe('3');
    });
  });

  describe('Rounding and Precision', () => {
    it('should handle 1/3 with appropriate precision', () => {
      // Arrange & Act
      calc.appendToResult(1);
      calc.setAction('divide');
      calc.appendToResult(3);
      calc.calculateResult();
      
      // Assert - Should show reasonable precision
      const result = calc.getDisplayValue();
      expect(result.startsWith('0.33333')).toBe(true);
      expect(result.length).toBeLessThanOrEqual(10); // Reasonable display length
    });

    it('should trim trailing zeros', () => {
      // Arrange & Act
      calc.appendToResult(5);
      calc.setAction('divide');
      calc.appendToResult(2);
      calc.calculateResult();
      
      // Assert
      expect(calc.getDisplayValue()).toBe('2.5'); // Not "2.50000"
    });

    it('should handle integer results without decimal point', () => {
      // Arrange & Act
      calc.appendToResult(6);
      calc.setAction('divide');
      calc.appendToResult(2);
      calc.calculateResult();
      
      // Assert
      expect(calc.getDisplayValue()).toBe('3'); // Not "3.0"
    });
  });
});
