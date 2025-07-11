<script setup lang="ts">
  import { onMounted } from "vue";
  import BasicTabsComponent from "../components/BasicTabsComponent.vue";
  import DynamicTabsComponent from "../components/DynamicTabsComponent.vue";
  onMounted(() => {
    document.title = "Dynamic Component Example | Vue App";
  });
</script>

<template>
  <div class="space-y-12">
    <section>
      <BasicTabsComponent />
    </section>
    <section>
      <DynamicTabsComponent />
    </section>
  </div>
</template>
