<script lang="ts" setup>
  import { ref } from "vue";
  import TabA from "./TabA.vue";
  import TabB from "./TabB.vue";
  import TabC from "./TabC.vue";
  const selectedTab = ref("A");
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4 text-purple-700">Basic Tabs Example</h1>
    <div class="flex gap-2 mb-6">
      <button
        class="px-4 py-2 rounded font-semibold bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 text-white shadow-md transition-all duration-200 border-none outline-none cursor-pointer opacity-85 hover:opacity-100 focus:opacity-100 focus:ring-2 focus:ring-purple-300"
        @click="selectedTab = 'A'"
      >
        Tab A
      </button>
      <button
        class="px-4 py-2 rounded font-semibold bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 text-white shadow-md transition-all duration-200 border-none outline-none cursor-pointer opacity-85 hover:opacity-100 focus:opacity-100 focus:ring-2 focus:ring-purple-300"
        @click="selectedTab = 'B'"
      >
        Tab B
      </button>
      <button
        class="px-4 py-2 rounded font-semibold bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 text-white shadow-md transition-all duration-200 border-none outline-none cursor-pointer opacity-85 hover:opacity-100 focus:opacity-100 focus:ring-2 focus:ring-purple-300"
        @click="selectedTab = 'C'"
      >
        Tab C
      </button>
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
