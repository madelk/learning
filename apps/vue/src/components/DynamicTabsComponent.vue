<script lang="ts" setup>
  import { ref, type Component } from "vue";
  import BaseButton from "./BaseButton.vue";
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
      <BaseButton @click="selectedTab = 'TabA'">Tab A</BaseButton>
      <BaseButton @click="selectedTab = 'TabB'">Tab B</BaseButton>
      <BaseButton @click="selectedTab = 'TabC'">Tab C</BaseButton>
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
