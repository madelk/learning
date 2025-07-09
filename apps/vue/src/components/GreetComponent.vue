<script setup lang="ts">
  defineProps<{ firstName: string; lastName: string }>();
</script>

<template>
  <h2>Hello {{ firstName }}</h2>
  <p>Nice to meet you, {{ lastName }}</p>
</template>

<style scoped>
  h1,
  h2 {
    color: red;
  }
</style>
