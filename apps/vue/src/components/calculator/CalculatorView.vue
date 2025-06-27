<template>
  <div class="calculator p-4 max-w-md mx-auto">
    <h1>This is a calculator page</h1>
    <input
      id="result"
      v-model="displayValue"
      class="font-mono border border-gray-300 rounded p-2 mb-4 w-full bg-green-700 text-black"
      type="text"
      disabled
    />
    <div class="grid grid-cols-5 gap-2">
      <button
        v-for="button in buttons.slice(0, -1)"
        :key="button.label"
        :class="button.style"
        @click="button.action"
      >
        {{ button.label }}
      </button>
      <!-- Equals button spanning full width -->
      <button
        :class="buttons[buttons.length - 1].style + ' col-span-5'"
        @click="buttons[buttons.length - 1].action"
      >
        {{ buttons[buttons.length - 1].label }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { CalculatorLogic } from './CalculatorLogic';

interface CalculatorButton {
  label: string;
  action: () => void;
  style: string;
}

export default {
  setup() {
    const calculator = new CalculatorLogic();
    const displayValue = ref(calculator.getDisplayValue());
    const memory = ref(calculator.getMemoryValue());

    // Create computed property to keep display in sync
    const updateDisplay = () => {
      displayValue.value = calculator.getDisplayValue();
      memory.value = calculator.getMemoryValue();
    };

    // Wrapper functions that call calculator methods and update display
    const clearMemory = () => {
      calculator.clearMemory();
      updateDisplay();
    };

    const addToMemory = () => {
      calculator.addToMemory();
      updateDisplay();
    };

    const subtractFromMemory = () => {
      calculator.subtractFromMemory();
      updateDisplay();
    };

    const recallMemory = () => {
      calculator.recallMemory();
      updateDisplay();
    };

    const setAction = (action: 'add' | 'subtract' | 'multiply' | 'divide' | 'sqroot' | 'percentage' | 'reciprocal' | 'signchange') => {
      calculator.setAction(action);
      updateDisplay();
    };

    const appendToResult = (value: number) => {
      calculator.appendToResult(value);
      updateDisplay();
    };

    const appendDecimalPoint = () => {
      calculator.appendDecimalPoint();
      updateDisplay();
    };

    const calculateResult = () => {
      calculator.calculateResult();
      updateDisplay();
    };

    const clearAll = () => {
      calculator.clearAll();
      updateDisplay();
    };

    const clearEntry = () => {
      calculator.clearEntry();
      updateDisplay();
    };

    const clearStyle = 'bg-red-500 text-white p-4 rounded';
    const buttonStyle = 'bg-slate-500 text-white p-4 rounded';
    const memoryStyle = 'bg-blue-500 text-white p-4 rounded';
    const buttons: CalculatorButton[] = [
      // Row 1: Memory and Clear
      { label: 'MC', action: () => clearMemory(), style: memoryStyle },
      { label: 'MR', action: () => recallMemory(), style: memoryStyle },
      { label: 'M-', action: () => subtractFromMemory(), style: memoryStyle },
      { label: 'M+', action: () => addToMemory(), style: memoryStyle },
      { label: 'C', action: () => clearAll(), style: clearStyle },
      
      // Row 2: Digits 7-9, Division, Reciprocal
      { label: '7', action: () => appendToResult(7), style: buttonStyle },
      { label: '8', action: () => appendToResult(8), style: buttonStyle },
      { label: '9', action: () => appendToResult(9), style: buttonStyle },
      { label: '/', action: () => setAction('divide'), style: buttonStyle },
      { label: '1/x', action: () => setAction('reciprocal'), style: buttonStyle },
      
      // Row 3: Digits 4-6, Multiplication, Clear Entry
      { label: '4', action: () => appendToResult(4), style: buttonStyle },
      { label: '5', action: () => appendToResult(5), style: buttonStyle },
      { label: '6', action: () => appendToResult(6), style: buttonStyle },
      { label: '*', action: () => setAction('multiply'), style: buttonStyle },
      { label: 'CE', action: () => clearEntry(), style: buttonStyle },
      
      // Row 4: Digits 1-3, Subtraction, Sign Change
      { label: '1', action: () => appendToResult(1), style: buttonStyle },
      { label: '2', action: () => appendToResult(2), style: buttonStyle },
      { label: '3', action: () => appendToResult(3), style: buttonStyle },
      { label: '-', action: () => setAction('subtract'), style: buttonStyle },
      { label: '±', action: () => setAction('signchange'), style: buttonStyle },
      
      // Row 5: Square root, 0, Decimal, Percent, Addition
      { label: 'sq', action: () => setAction('sqroot'), style: buttonStyle },
      { label: '0', action: () => appendToResult(0), style: buttonStyle },
      { label: '.', action: () => appendDecimalPoint(), style: buttonStyle },
      { label: '%', action: () => setAction('percentage'), style: buttonStyle },
      { label: '+', action: () => setAction('add'), style: buttonStyle },
      
      // Row 6: Equals (spanning width)
      { label: '=', action: () => calculateResult(), style: buttonStyle },
    ];

    return {
      buttons,
      memory,
      displayValue,
    };
  },
};
</script>
