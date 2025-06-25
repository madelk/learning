<script setup lang="ts">
import { RouterView } from 'vue-router';
import '@study/navbar';
</script>

<template>
  <custom-navbar />
  <RouterView />
  <custom-footer />
</template>
