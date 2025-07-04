/**
 * Calculator Button Configuration
 *
 * This module provides a framework-agnostic button configuration for calculator layouts.
 * Each button definition includes the label, action type, and styling category.
 * Framework-specific components can map these to their own button objects.
 */

import type { CalculatorLogic } from "./calculator-logic.js";

export type ButtonActionType =
  | "digit"
  | "decimal"
  | "operation"
  | "memory"
  | "clear"
  | "clearEntry"
  | "calculate"
  | "unary";

export type ButtonStyleType = "default" | "memory" | "clear" | "danger";

export interface ButtonConfig {
  /** The text displayed on the button */
  label: string;
  /** The type of action this button performs */
  actionType: ButtonActionType;
  /** The styling category for this button */
  styleType: ButtonStyleType;
  /** Additional data needed for the action (e.g., digit value, operation type) */
  actionData?: string | number;
  /** Whether this button spans multiple columns (for equals button) */
  fullWidth?: boolean;
}

/**
 * Standard calculator button layout (5x6 grid with equals spanning full width)
 * Layout matches both Vue and React implementations
 */
export const CALCULATOR_BUTTONS: ButtonConfig[] = [
  // Row 1: Memory & Clear
  {
    label: "MC",
    actionType: "memory",
    styleType: "memory",
    actionData: "clear"
  },
  {
    label: "MR",
    actionType: "memory",
    styleType: "memory",
    actionData: "recall"
  },
  {
    label: "M-",
    actionType: "memory",
    styleType: "memory",
    actionData: "subtract"
  },
  { label: "M+", actionType: "memory", styleType: "memory", actionData: "add" },
  { label: "C", actionType: "clear", styleType: "clear" },

  // Row 2: 7-9, / 1/x
  { label: "7", actionType: "digit", styleType: "default", actionData: 7 },
  { label: "8", actionType: "digit", styleType: "default", actionData: 8 },
  { label: "9", actionType: "digit", styleType: "default", actionData: 9 },
  {
    label: "/",
    actionType: "operation",
    styleType: "default",
    actionData: "divide"
  },
  {
    label: "1/x",
    actionType: "unary",
    styleType: "default",
    actionData: "reciprocal"
  },

  // Row 3: 4-6, * CE
  { label: "4", actionType: "digit", styleType: "default", actionData: 4 },
  { label: "5", actionType: "digit", styleType: "default", actionData: 5 },
  { label: "6", actionType: "digit", styleType: "default", actionData: 6 },
  {
    label: "*",
    actionType: "operation",
    styleType: "default",
    actionData: "multiply"
  },
  { label: "CE", actionType: "clearEntry", styleType: "default" },

  // Row 4: 1-3, - ±
  { label: "1", actionType: "digit", styleType: "default", actionData: 1 },
  { label: "2", actionType: "digit", styleType: "default", actionData: 2 },
  { label: "3", actionType: "digit", styleType: "default", actionData: 3 },
  {
    label: "-",
    actionType: "operation",
    styleType: "default",
    actionData: "subtract"
  },
  {
    label: "±",
    actionType: "unary",
    styleType: "default",
    actionData: "signchange"
  },

  // Row 5: sq, 0, . % +
  {
    label: "sq",
    actionType: "unary",
    styleType: "default",
    actionData: "sqroot"
  },
  { label: "0", actionType: "digit", styleType: "default", actionData: 0 },
  { label: ".", actionType: "decimal", styleType: "default" },
  {
    label: "%",
    actionType: "unary",
    styleType: "default",
    actionData: "percentage"
  },
  {
    label: "+",
    actionType: "operation",
    styleType: "default",
    actionData: "add"
  },

  // Row 6: = (full width)
  { label: "=", actionType: "calculate", styleType: "default", fullWidth: true }
];

/**
 * Helper function to create framework-specific button handlers
 *
 * @param buttonConfig The shared button configuration
 * @param calculator The calculator logic instance
 * @param updateDisplay Function to update the display after operations
 * @returns A function that handles the button action
 */
export function createButtonHandler(
  buttonConfig: ButtonConfig,
  calculator: CalculatorLogic,
  updateDisplay: () => void
): () => void {
  const { actionType, actionData } = buttonConfig;

  return () => {
    switch (actionType) {
      case "digit": {
        calculator.appendToResult(actionData as number);
        break;
      }
      case "decimal": {
        calculator.appendDecimalPoint();
        break;
      }
      case "operation": {
        calculator.setAction(
          actionData as "add" | "subtract" | "multiply" | "divide"
        );
        break;
      }
      case "unary": {
        calculator.setAction(
          actionData as "sqroot" | "percentage" | "reciprocal" | "signchange"
        );
        break;
      }
      case "memory": {
        switch (actionData) {
          case "clear": {
            calculator.clearMemory();
            break;
          }
          case "recall": {
            calculator.recallMemory();
            break;
          }
          case "add": {
            calculator.addToMemory();
            break;
          }
          case "subtract": {
            calculator.subtractFromMemory();
            break;
          }
        }
        break;
      }
      case "clear": {
        calculator.clearAll();
        break;
      }
      case "clearEntry": {
        calculator.clearEntry();
        break;
      }
      case "calculate": {
        calculator.calculateResult();
        break;
      }
    }
    updateDisplay();
  };
}

/**
 * Default style mappings for different button types
 * Framework components can override these or provide their own mappings
 */
export const DEFAULT_STYLE_CLASSES = {
  default: "bg-slate-500 text-white p-4 rounded",
  memory: "bg-blue-500 text-white p-4 rounded",
  clear: "bg-red-500 text-white p-4 rounded",
  danger: "bg-red-500 text-white p-4 rounded"
} as const;
