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
const expensiveItems = computed(() => {
  console.log("expensiveItems: This only gets run when items change");
  return items.value.filter((item) => item.price > 50);
});

// Tailwind class constants for <sub> elements
const computedSubClass =
  "ml-2 px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs align-middle font-mono";
const nonComputedSubClass =
  "ml-2 px-2 py-0.5 rounded bg-purple-100 text-purple-700 text-xs align-middle font-mono";

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
  <div class="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
    <h2 class="text-lg font-semibold mb-2 text-gray-700">First Name</h2>
    <input
      v-model="firstName"
      placeholder="Enter first name"
      class="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <h2 class="text-lg font-semibold mb-2 text-gray-700">Last Name</h2>
    <input
      v-model="lastName"
      placeholder="Enter last name"
      class="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <h2 class="text-base font-medium text-gray-600 mb-1">
      Fullname String Interp -
      <span class="font-mono">{{ firstName }} {{ lastName }}</span>
    </h2>
    <h2 class="text-base font-medium text-gray-600 mb-4">
      Fullname Computed -
      <span class="font-mono">{{ fullName }}</span>
    </h2>
    <div class="flex gap-4 mb-6">
      <button
        class="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded shadow"
        @click="
          items.push({
            id: items.length + 1,
            name: `Cheap Item ${items.length + 1}`,
            price: 10
          })
        "
      >
        Add Cheap Item
      </button>
      <button
        class="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded shadow"
        @click="
          items.push({
            id: items.length + 1,
            name: `Expensive Item ${items.length + 1}`,
            price: 100
          })
        "
      >
        Add Expensive Item
      </button>
    </div>
    <h2 class="text-xl font-bold text-blue-700 mb-2">
      Items total Computed:
      <span class="font-mono">{{ getTotalComputed }}</span>
    </h2>
    <h2 class="text-xl font-bold text-purple-700 mb-4">
      Items total Function:
      <span class="font-mono">{{ getTotalWithoutComputed() }}</span>
    </h2>
    <div class="space-y-2">
      <h2 class="text-lg font-semibold mb-2 text-gray-700">
        Items List (only showing items with price &gt; 50):
      </h2>
      <sub :class="computedSubClass">
        (computed) this is cached until items change
      </sub>
      <template v-for="item in expensiveItems" :key="item.id">
        <p
          class="text-gray-800 bg-gray-100 rounded px-3 py-1 flex justify-between items-center"
        >
          <span>{{ item.name }}</span>
          <span class="font-semibold">${{ item.price }}</span>
        </p>
      </template>
    </div>
    <div class="space-y-2">
      <h2 class="text-lg font-semibold mb-2 text-gray-700">
        Items List (only showing items with price &gt; 50):
      </h2>
      <sub :class="nonComputedSubClass">
        (without computed) this runs every time the component re-renders
      </sub>
      <template v-for="item in items" :key="item.id">
        <p
          v-if="item.price > 50"
          class="text-gray-800 bg-gray-100 rounded px-3 py-1 flex justify-between items-center"
        >
          <span>{{ item.name }}</span>
          <span class="font-semibold">${{ item.price }}</span>
        </p>
      </template>
    </div>
  </div>
</template>

<style>
  @media (min-width: 768px) {
    h2 {
      font-size: 2rem;
    }
  }
</style>
