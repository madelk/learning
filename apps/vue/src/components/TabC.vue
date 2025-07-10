<script lang="ts" setup>
  import { onActivated, ref } from "vue";
  const timesLoaded = ref(0);
  onActivated(() => {
    timesLoaded.value++;
  });
</script>

<template>
  <div class="space-y-2">
    <h2 class="text-xl font-semibold text-purple-700">Tab C Content</h2>
    <p class="text-gray-700">This is the content for Tab C.</p>
    <p class="text-gray-700">Tab C has been loaded {{ timesLoaded }} times.</p>
  </div>
</template>
