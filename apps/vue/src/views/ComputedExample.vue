<script setup lang="ts">
  import { onMounted, computed, ref } from "vue";
  import BaseButton from "../components/BaseButton.vue";

  const items = ref([
    {
      id: 1,
      name: "Item 1",
      price: 10
    }
  ]);

  const firstName = ref("John");
  const lastName = ref("Doe");

  let fullName = computed({
    get() {
      console.log(
        "fullName: This only gets run when firstName or lastName change"
      );
      return `${firstName.value} ${lastName.value}`;
    },
    set(value: string) {
      console.log("fullName setter: This gets run when fullName is set");
      const names = value.split(" ");
      firstName.value = names[0] || "";
      lastName.value = names[1] || "";
    }
  });
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
  const changeFullName = (value: string) => {
    fullName.value = value;
  };

  // Tailwind class constants for reuse in template
  const computedSubClass =
    "ml-2 px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs align-middle font-mono";
  const nonComputedSubClass =
    "ml-2 px-2 py-0.5 rounded bg-purple-100 text-purple-700 text-xs align-middle font-mono";
  const inputClass =
    "w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400";
  // Removed unused buttonCheapClass and buttonExpensiveClass (now using BaseButton)
  const cardClass = "max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8";
  const h2MainClass = "text-lg font-semibold mb-2 text-gray-700";
  const h2BaseClass = "text-base font-medium text-gray-600 mb-1";
  const h2BaseClassMb4 = "text-base font-medium text-gray-600 mb-4";
  const h2TotalComputedClass = "text-xl font-bold text-blue-700 mb-2";
  const h2TotalFunctionClass = "text-xl font-bold text-purple-700 mb-4";
  const itemRowClass =
    "text-gray-800 bg-gray-100 rounded px-3 py-1 flex justify-between items-center";
  const itemPriceClass = "font-semibold";

  defineExpose({
    firstName,
    lastName,
    fullName,
    items,
    getTotalComputed,
    getTotalWithoutComputed
  });
  onMounted(() => {
    document.title = "Computed Example | Vue App";
  });
</script>

<template>
  <div :class="cardClass">
    <h2 :class="h2MainClass">First Name</h2>
    <input
      v-model="firstName"
      placeholder="Enter first name"
      :class="inputClass"
    />
    <h2 :class="h2MainClass">Last Name</h2>
    <input
      v-model="lastName"
      placeholder="Enter last name"
      :class="inputClass"
    />
    <BaseButton @click="changeFullName(`Mark Dell`)">
      Change Full Name
    </BaseButton>
    <h2 :class="h2BaseClass">
      Fullname String Interp -
      <span class="font-mono">{{ firstName }} {{ lastName }}</span>
    </h2>
    <h2 :class="h2BaseClassMb4">
      Fullname Computed -
      <span class="font-mono">{{ fullName }}</span>
    </h2>
    <div class="flex gap-4 mb-6">
      <BaseButton
        @click="
          items.push({
            id: items.length + 1,
            name: `Cheap Item ${items.length + 1}`,
            price: 10
          })
        "
      >
        Add Cheap Item
      </BaseButton>
      <BaseButton
        variant="danger"
        @click="
          items.push({
            id: items.length + 1,
            name: `Expensive Item ${items.length + 1}`,
            price: 100
          })
        "
      >
        Add Expensive Item
      </BaseButton>
    </div>
    <h2 :class="h2TotalComputedClass">
      Items total Computed:
      <span class="font-mono">{{ getTotalComputed }}</span>
    </h2>
    <h2 :class="h2TotalFunctionClass">
      Items total Function:
      <span class="font-mono">{{ getTotalWithoutComputed() }}</span>
    </h2>
    <div v-if="expensiveItems.length > 0" class="space-y-2">
      <h2 :class="h2MainClass">
        Items List (only showing items with price &gt; 50):
      </h2>
      <sub :class="computedSubClass">
        (computed) this is cached until items change
      </sub>
      <template v-for="item in expensiveItems" :key="item.id">
        <p :class="itemRowClass">
          <span>{{ item.name }}</span>
          <span :class="itemPriceClass">${{ item.price }}</span>
        </p>
      </template>
    </div>
    <div v-if="items.length > 0" class="space-y-2">
      <h2 :class="h2MainClass">
        Items List (only showing items with price &gt; 50):
      </h2>
      <sub :class="nonComputedSubClass">
        (without computed) this runs every time the component re-renders
      </sub>
      <template v-for="item in items" :key="item.id">
        <p v-if="item.price > 50" :class="itemRowClass">
          <span>{{ item.name }}</span>
          <span :class="itemPriceClass">${{ item.price }}</span>
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
