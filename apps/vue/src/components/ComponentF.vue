<script setup lang="ts">
  import { inject } from "vue";

  const username = inject("username", "Default User");
</script>

<template>
  <h2>Component F</h2>
  <h3>Component F Username: {{ username }}</h3>
</template>
