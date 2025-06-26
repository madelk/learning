<template>
  <div class="calculator p-4 max-w-md mx-auto">
    <h1>This is an calculator page</h1>
    <input id="result" class="font-mono border border-gray-300 rounded p-2 mb-4 w-full bg-green-700 text-black"
      type="text" disabled></input>
    <div class="grid grid-cols-4 gap-2">
      <button class="bg-blue-500 text-white p-4 rounded" @click="appendToResult('7')">
        7
      </button>
      <button class="bg-blue-500 text-white p-4 rounded" @click="appendToResult('8')">
        8
      </button>
      <button class="bg-blue-500 text-white p-4 rounded" @click="appendToResult('9')">
        9
      </button>
      <button class="bg-red-500 text-white p-4 rounded" @click="clearResult">
        C
      </button>
      <button class="bg-blue-500 text-white p-4 rounded" @click="appendToResult('4')">
        4
      </button>
      <button class="bg-blue-500 text-white p-4 rounded" @click="appendToResult('5')">
        5
      </button>
      <button class="bg-blue-500 text-white p-4 rounded" @click="appendToResult('6')">
        6
      </button>
      <button class="bg-blue-500 text-white p-4 rounded" @click="appendToResult('/')">
        /
      </button>
      <button class="bg-blue-500 text-white p-4 rounded" @click="appendToResult('1')">
        1
      </button>
      <button class="bg-blue-500 text-white p-4 rounded" @click="appendToResult('2')">
        2
      </button>
      <button class="bg-blue-500 text-white p-4 rounded" @click="appendToResult('3')">
        3
      </button>
      <button class="bg-blue-500 text-white p-4 rounded" @click="appendToResult('*')">
        *
      </button>
      <button class="bg-blue-500 text-white p-4 rounded" @click="appendToResult('0')">
        0
      </button>
      <button class="bg-blue-500 text-white p-4 rounded" @click="appendToResult('.')">
        .
      </button>
      <button class="bg-blue-500 text-white p-4 rounded" @click="calculateResult">
        =
      </button>
      <button class="bg-blue-500 text-white p-4 rounded" @click="appendToResult('-')">
        -
      </button>
      <button class="bg-blue-500 text-white p-4 rounded" @click="appendToResult('+')">
        +
      </button>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const appendToResult = (value) => {
      const resultInput = document.getElementById('result');
      if (resultInput) {
        resultInput.value += value;
      }
    };

    const clearResult = () => {
      const resultInput = document.getElementById('result');
      if (resultInput) {
        resultInput.value = '';
      }
    };

    const calculateResult = () => {
      const resultInput = document.getElementById('result');
      if (resultInput && resultInput.value) {
        try {
          // sanitise input to prevent code injection
          const valueToCalulate = resultInput.value.replace(/[^0-9+\-*/.()\s]/g, '');
          // evaluate the expression
          resultInput.value = eval(valueToCalulate);
        } catch (e) {
          resultInput.value = 'Error';
        }
      }
    };

    return {
      appendToResult,
      clearResult,
      calculateResult,
    };
  },
};
</script>
