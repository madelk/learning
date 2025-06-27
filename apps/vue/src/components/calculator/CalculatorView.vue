<template>
  <div class="calculator p-4 max-w-md mx-auto">
    <h1 className="text-2xl font-bold mb-4">Vue Calculator</h1>
    <input
      id="result"
      v-model="displayValue"
      class="font-mono border border-gray-300 rounded p-2 mb-4 w-full bg-green-700 text-black"
      type="text"
      disabled
    />
    <div class="grid grid-cols-5 gap-2">
      <button
        v-for="(button, index) in buttons.filter(b => !b.fullWidth)"
        :key="`${button.label}-${index}`"
        :class="button.style"
        @click="button.action"
      >
        {{ button.label }}
      </button>
      <!-- Equals button spanning full width -->
      <button
        v-for="(button, index) in buttons.filter(b => b.fullWidth)"
        :key="`${button.label}-fullwidth-${index}`"
        :class="button.style + ' col-span-5'"
        @click="button.action"
      >
        {{ button.label }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
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

    // Map shared button config to Vue-specific buttons
    const buttons: CalculatorButton[] = CALCULATOR_BUTTONS.map((config: ButtonConfig) => ({
      label: config.label,
      action: createButtonHandler(config, calculator, updateDisplay),
      style: DEFAULT_STYLE_CLASSES[config.styleType],
      fullWidth: config.fullWidth,
    }));

    return {
      buttons,
      memory,
      displayValue,
    };
  },
};
</script>
