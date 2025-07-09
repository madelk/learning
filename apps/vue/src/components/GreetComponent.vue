<script setup lang="ts">
  defineProps<{ firstName: string; lastName: string }>();
</script>

<template>
  <h2
    class="text-peach bg-gradient-to-r from-pink via-mauve to-lavender bg-clip-text text-transparent animate-gradient-x font-bold text-2xl mb-1 gradient-bg-size"
  >
    Hello {{ firstName }}
  </h2>
  <p class="text-flamingo animate-fade-in">Nice to meet you, {{ lastName }}</p>
  <p>Nice to meet you, {{ lastName }}</p>
</template>

<style scoped>
  @keyframes gradient-x {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
  .animate-gradient-x {
    animation: gradient-x 3s ease-in-out infinite;
  }
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .animate-fade-in {
    animation: fade-in 1.2s cubic-bezier(0.4, 0, 0.2, 1) both;
  }
  .gradient-bg-size {
    background-size: 200% 100%;
  }
</style>
