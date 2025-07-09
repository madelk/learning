<script setup lang="ts">
  import CardComponent from "../components/CardComponent.vue";
</script>

<template>
  <h1>Slots Example</h1>
  <CardComponent><template #default>Card Content 1</template></CardComponent>
  <CardComponent>Card Content 2</CardComponent>
  <CardComponent>
    <h2 class="text-lg font-semibold mb-2">Card content header</h2>
  </CardComponent>
  <CardComponent>
    <img src="https://picsum.photos/150" alt="Placeholder image" />
  </CardComponent>
  <CardComponent />
</template>
