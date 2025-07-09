<script setup lang="ts">
  const names = [
    {
      firstName: "John",
      lastName: "Doe"
    },
    {
      firstName: "Jane",
      lastName: "Smith"
    },
    {
      firstName: "Alice",
      lastName: "Johnson"
    },
    {
      firstName: "Bob",
      lastName: "Brown"
    }
  ];
</script>

<template>
  <ul class="list-disc pl-5">
    <li v-for="name in names" :key="name.firstName">
      <slot :first-name="name.firstName" :last-name="name.lastName"></slot>
    </li>
  </ul>
</template>
