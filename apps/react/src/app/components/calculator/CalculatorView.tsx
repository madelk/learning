import { useState, useCallback } from 'react';
import { 
  CalculatorLogic, 
  CALCULATOR_BUTTONS, 
  createButtonHandler, 
  DEFAULT_STYLE_CLASSES,
  type ButtonConfig 
} from '@study/calculator-logic';

interface CalculatorButton {
  label: string;
  action: () => void;
  style: string;
  fullWidth?: boolean;
}

export function CalculatorView() {
  const [calculator] = useState(() => new CalculatorLogic());
  const [displayValue, setDisplayValue] = useState(calculator.getDisplayValue());

  // Update display helper
  const updateDisplay = useCallback(() => {
    setDisplayValue(calculator.getDisplayValue());
  }, [calculator]);

  // Map shared button config to React-specific buttons
  const buttons: CalculatorButton[] = CALCULATOR_BUTTONS.map((config: ButtonConfig) => ({
    label: config.label,
    action: createButtonHandler(config, calculator, updateDisplay),
    style: DEFAULT_STYLE_CLASSES[config.styleType],
    fullWidth: config.fullWidth
  }));

  return (
    <div className="calculator p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">React Calculator</h1>
      <input
        value={displayValue}
        className="font-mono border border-gray-300 rounded p-2 mb-4 w-full bg-green-700 text-black"
        type="text"
        readOnly
        aria-label="Calculator display"
      />
      <div className="grid grid-cols-5 gap-2">
        {/* First 25 buttons (5 rows) - excluding equals button */}
        {buttons.filter(button => !button.fullWidth).map((button, index) => (
          <button
            key={`${button.label}-${index}`}
            className={button.style}
            onClick={button.action}
          >
            {button.label}
          </button>
        ))}
        {/* Equals button spanning full width */}
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
    </div>
  );
}

export default CalculatorView;
