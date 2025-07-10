<script lang="ts" setup>
  import { ref } from "vue";
  import BaseButton from "./BaseButton.vue";
  import TabA from "./TabA.vue";
  import TabB from "./TabB.vue";
  import TabC from "./TabC.vue";
  const selectedTab = ref("A");
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4 text-purple-700">Basic Tabs Example</h1>
    <div class="flex gap-2 mb-6">
      <BaseButton @click="selectedTab = 'A'">Tab A</BaseButton>
      <BaseButton @click="selectedTab = 'B'">Tab B</BaseButton>
      <BaseButton @click="selectedTab = 'C'">Tab C</BaseButton>
    </div>
    <div
      class="p-6 rounded-lg bg-white/80 shadow-lg border border-purple-200 min-h-[120px] mt-2"
    >
      <TabA v-if="selectedTab === 'A'" />
      <TabB v-if="selectedTab === 'B'" />
      <TabC v-if="selectedTab === 'C'" />
    </div>
  </div>
</template>
