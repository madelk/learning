<script setup lang="ts">
  import CardComponent from "../components/CardComponent.vue";
  import NameList from "../components/NameList.vue";
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
  <CardComponent>
    <template #header>
      <h3 class="text-2xl font-bold">Header</h3>
    </template>
    <template #default>
      <p class="text-gray-700">This is custom content inside the card.</p>
    </template>
    <template #footer>
      <h4 class="text-lg font-semibold">View Detail</h4>
    </template>
  </CardComponent>
  <h2 class="text-2xl font-bold mb-2">Name List</h2>
  <NameList>
    <template #default="{ firstName, lastName }">
      <div>
        <h4 class="text-lg font-semibold">{{ firstName }} {{ lastName }}</h4>
      </div>
    </template>
  </NameList>
  <h2 class="text-2xl font-bold mb-2">First Names</h2>
  <NameList>
    <template #default="{ firstName }">
      <div>
        <h4 class="text-lg font-semibold">{{ firstName }}</h4>
      </div>
    </template>
  </NameList>
</template>
