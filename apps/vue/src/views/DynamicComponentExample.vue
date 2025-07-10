<script setup lang="ts">
  import BasicTabsComponent from "../components/BasicTabsComponent.vue";
  import DynamicTabsComponent from "../components/DynamicTabsComponent.vue";
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
