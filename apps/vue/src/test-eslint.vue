<script setup lang="ts">
import { ref } from 'vue';

// Testing auto-fix functionality
const message = ref('Hello World');

function myFunction() {
  console.log(message.value);
}

// Required by ESLint rule for script setup
defineExpose({});
</script>

<template>
  <div class="test-component">
    <h1>{{ message }}</h1>
    <button 
      class="btn"
      @click="myFunction()"
    >
      Click me
    </button>
  </div>
</template>

<style scoped>
.test-component {
  padding: 1rem;
}
</style>
