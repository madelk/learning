<script setup lang="ts">
import { RouterView } from 'vue-router';
import '@study/navbar';
</script>

<template>
  <custom-navbar />
  <RouterView />
  <custom-footer />
</template>

<style scoped lang="scss">
header {
  line-height: 1.5;
  max-width: 100vw;
}

nav > a {
  padding-left: 1rem;
  padding-right: 1rem;
}

.footer {
  width: 100%;
  padding: 1rem;
  text-align: center;
  background: #f3f4f6;
  border-top: 1px solid #e5e7eb;
  position: fixed;
  bottom: 0;
  left: 0;
}

@media (min-width: 768px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    margin-left: auto;
    margin-right: auto;
    max-width: 768px;
  }

  nav {
    text-align: left;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
