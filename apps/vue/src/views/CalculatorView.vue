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
        v-for="button in buttons"
        :key="button.label"
        :class="button.style"
        @click="button.action"
      >
        {{ button.label }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { watchEffect, ref } from 'vue';
type actions =
  | 'add'
  | 'subtract'
  | 'multiply'
  | 'divide'
  | 'sqroot'
  | 'percentage';
interface CalculatorButton {
  label: string;
  action: () => void;
  style: string;
}
export default {
  setup() {
    const memory = ref<string | null>(null);
    const calcAction = ref<actions | null>(null);
    const displayValue = ref<string>('0');
    const previousValue = ref<string | null>(null);
    const previouslySetAction = ref(false);

    watchEffect(() => {
      console.log('debug:', {
        memory: memory.value,
        calcAction: calcAction.value,
        displayValue: displayValue.value,
        previousValue: previousValue.value,
      });
    });

    const clearMemory = () => {
      memory.value = null;
    };
    const addToMemory = () => {
      if (memory.value === null) {
        memory.value = '0';
      }
      memory.value = (
        Number(memory.value) + Number(displayValue.value || '0')
      ).toString();
    };
    const subtractFromMemory = () => {
      if (memory.value === null) {
        memory.value = '0';
      }
      memory.value = (
        Number(memory.value) - Number(displayValue.value || '0')
      ).toString();
    };
    const recallMemory = () => {
      displayValue.value = memory.value || '';
    };
    const setAction = (action: actions) => {
      // If we already have a previousValue and operation, calculate the result first
      if (previousValue.value !== null && calcAction.value !== null) {
        calculateResult();
        // After calculation, displayValue has the result, so move it to previousValue
        previousValue.value = displayValue.value;
      } else if (previousValue.value === null) {
        // First operation, just store current display value
        previousValue.value = displayValue.value;
      }

      // Set the new operation
      calcAction.value = action;
      previouslySetAction.value = true;
    };

    const appendToResult = (value: number) => {
      if (previouslySetAction.value) {
        displayValue.value = '';
        previouslySetAction.value = false;
      }
      if (displayValue.value === '0' || displayValue.value === 'Error') {
        displayValue.value = '';
      }
      displayValue.value += value;
      displayValue.value = displayValue.value.toString();
    };

    const calculateResult = () => {
      if (previousValue.value === null || calcAction.value === null) {
        return; // Nothing to calculate
      }

      switch (calcAction.value) {
        case 'add':
          displayValue.value = (
            (Number(previousValue.value) || 0) + Number(displayValue.value)
          ).toString();
          break;
        case 'subtract':
          displayValue.value = (
            (Number(previousValue.value) || 0) - Number(displayValue.value)
          ).toString();
          break;
        case 'multiply':
          displayValue.value = (
            (Number(previousValue.value) || 0) * Number(displayValue.value)
          ).toString();
          break;
        case 'divide':
          if (Number(displayValue.value) !== 0) {
            displayValue.value = (
              (Number(previousValue.value) || 0) / Number(displayValue.value)
            ).toString();
          } else {
            displayValue.value = 'Error'; // Handle division by zero
          }
          break;
        case 'sqroot':
          if (Number(displayValue.value) >= 0) {
            displayValue.value = Math.sqrt(
              Number(displayValue.value),
            ).toString();
          } else {
            displayValue.value = 'Error'; // Handle negative square root
          }
          break;
        case 'percentage':
          displayValue.value = (
            Number(previousValue.value || 0) *
            (Number(displayValue.value) / 100)
          ).toString();
          break;
      }

      // Reset for next operation
      previousValue.value = null;
      calcAction.value = null;
    };
    const clearResult = () => {
      displayValue.value = '';
      calcAction.value = null;
      displayValue.value = '0';
      previousValue.value = null;
    };
    const clearStyle = 'bg-red-500 text-white p-4 rounded';
    const buttonStyle = 'bg-slate-500 text-white p-4 rounded';
    const memoryStyle = 'bg-blue-500 text-white p-4 rounded';
    const buttons: CalculatorButton[] = [
      { label: 'CM', action: () => clearMemory(), style: memoryStyle },
      { label: 'RM', action: () => recallMemory(), style: memoryStyle },
      { label: 'M-', action: () => subtractFromMemory(), style: memoryStyle },
      { label: 'M+', action: () => addToMemory(), style: memoryStyle },
      { label: 'C', action: () => clearResult(), style: clearStyle },
      { label: '7', action: () => appendToResult(7), style: buttonStyle },
      { label: '8', action: () => appendToResult(8), style: buttonStyle },
      { label: '9', action: () => appendToResult(9), style: buttonStyle },
      { label: '/', action: () => setAction('divide'), style: buttonStyle },
      { label: 'OFF', action: () => {}, style: buttonStyle },
      { label: '4', action: () => appendToResult(4), style: buttonStyle },
      { label: '5', action: () => appendToResult(5), style: buttonStyle },
      { label: '6', action: () => appendToResult(6), style: buttonStyle },
      { label: '*', action: () => setAction('multiply'), style: buttonStyle },
      { label: 'CE', action: () => clearResult(), style: buttonStyle },
      { label: '1', action: () => appendToResult(1), style: buttonStyle },
      { label: '2', action: () => appendToResult(2), style: buttonStyle },
      { label: '3', action: () => appendToResult(3), style: buttonStyle },
      { label: '-', action: () => setAction('subtract'), style: buttonStyle },
      { label: 'sq', action: () => setAction('sqroot'), style: buttonStyle },
      { label: '0', action: () => appendToResult(0), style: buttonStyle },
      {
        // todo add decimal point functionality
        label: '.',
        action: () => appendToResult(0),
        style: buttonStyle,
      },
      {
        label: 'pe',
        action: () => setAction('percentage'),
        style: buttonStyle,
      },
      { label: '+', action: () => setAction('add'), style: buttonStyle },
      { label: '=', action: () => calculateResult(), style: buttonStyle },
    ];
    return {
      buttons,
      memory,
      displayValue,
      calcAction,
    };
  },
};
</script>
