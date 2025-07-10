<script lang="ts" setup>
  import { onActivated, ref } from "vue";
  const timesLoaded = ref(0);
  onActivated(() => {
    timesLoaded.value++;
  });
  const timeLoaded = new Date().toLocaleTimeString();
</script>

<template>
  <div class="space-y-2">
    <h2 class="text-xl font-semibold text-purple-700">Tab A Content</h2>
    <p class="text-gray-700">This is the content for Tab A.</p>
    <p class="text-gray-700">Tab A has been loaded {{ timesLoaded }} times.</p>
    <p class="text-gray-700">Tab A was last loaded at {{ timeLoaded }}.</p>
  </div>
</template>
