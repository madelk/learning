<script setup lang="ts">
  import { computed, ref } from "vue";
  const items = ref([
    {
      id: 1,
      name: "Item 1",
      price: 10
    }
  ]);

  const firstName = ref("John");
  const lastName = ref("Doe");

  const fullName = computed(() => `${firstName.value} ${lastName.value}`);
  const getTotalComputed = computed(() => {
    console.log("getTotalComputed: This only gets run when items change");
    return items.value.reduce((acc, item) => acc + item.price, 0);
  });
  const getTotalWithoutComputed = () => {
    console.log(
      "getTotalWithoutComputed: This gets run even when the name changes"
    );
    return items.value.reduce((acc, item) => acc + item.price, 0);
  };
  defineExpose({
    firstName,
    lastName,
    fullName,
    items,
    getTotalComputed,
    getTotalWithoutComputed
  });
</script>

<template>
  <h2>First Name</h2>
  <input v-model="firstName" placeholder="Enter first name" />
  <h2>Last Name</h2>
  <input v-model="lastName" placeholder="Enter last name" />
  <h2>Fullname String Interp - {{ firstName }} {{ lastName }}</h2>
  <h2>Fullname Computed - {{ fullName }}</h2>
  <button @click="items.push({ id: 2, name: 'Item 2', price: 10 })">
    Add Item
  </button>
  <h2>Items total Computed {{ getTotalComputed }}</h2>
  <h2>Items total Function {{ getTotalWithoutComputed() }}</h2>
</template>

<style>
  @media (min-width: 768px) {
    h2 {
      font-size: 2rem;
    }
  }
</style>
