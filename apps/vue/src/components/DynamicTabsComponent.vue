<script lang="ts" setup>
  import { ref, type Component } from "vue";
  import TabA from "./TabA.vue";
  import TabB from "./TabB.vue";
  import TabC from "./TabC.vue";

  type TabKey = "TabA" | "TabB" | "TabC";
  const tabComponents: Record<TabKey, Component> = { TabA, TabB, TabC };
  const selectedTab = ref<TabKey>("TabA");
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4 text-purple-700">
      Dynamic Tabs Example
    </h1>
    <div class="flex gap-2 mb-6">
      <button
        class="px-4 py-2 rounded font-semibold bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 text-white shadow-md transition-all duration-200 border-none outline-none cursor-pointer opacity-85 hover:opacity-100 focus:opacity-100 focus:ring-2 focus:ring-purple-300"
        @click="selectedTab = 'TabA'"
      >
        Tab A
      </button>
      <button
        class="px-4 py-2 rounded font-semibold bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 text-white shadow-md transition-all duration-200 border-none outline-none cursor-pointer opacity-85 hover:opacity-100 focus:opacity-100 focus:ring-2 focus:ring-purple-300"
        @click="selectedTab = 'TabB'"
      >
        Tab B
      </button>
      <button
        class="px-4 py-2 rounded font-semibold bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 text-white shadow-md transition-all duration-200 border-none outline-none cursor-pointer opacity-85 hover:opacity-100 focus:opacity-100 focus:ring-2 focus:ring-purple-300"
        @click="selectedTab = 'TabC'"
      >
        Tab C
      </button>
    </div>
    <h2 class="text-xl font-semibold mt-6 text-purple-700">
      Dynamic Component Rendering
    </h2>
    <div
      class="p-6 rounded-lg bg-white/80 shadow-lg border border-purple-200 min-h-[120px] mt-2"
    >
      <component :is="tabComponents[selectedTab]" />
    </div>
    <h2 class="text-xl font-semibold mt-6 text-purple-700">
      KeepAlive Example
    </h2>
    <div
      class="p-6 rounded-lg bg-white/80 shadow-lg border border-purple-200 min-h-[120px] mt-2"
    >
      <KeepAlive>
        <component :is="tabComponents[selectedTab]" />
      </KeepAlive>
    </div>
  </div>
</template>
