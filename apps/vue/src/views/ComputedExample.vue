<script setup lang="ts">
import { ref, computed } from 'vue';

const firstName = ref('John');
const lastName = ref('Doe');

const fullName = computed(() => `${firstName.value} ${lastName.value}`);

// No public properties to expose
defineExpose({});
</script>

<template>
  <h2>Fullname String Interp - {{ firstName }} {{ lastName }}</h2>
  <h2>Fullname Computed - {{ fullName }}</h2>
</template>

<style>
@media (min-width: 768px) {
  h2 {
    font-size: 2rem;
  }
}
</style>
