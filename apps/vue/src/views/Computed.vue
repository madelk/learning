<template>
  <h2>Fullname String Interp - {{ firstName }} {{ lastName }}</h2>
  <h2>Fullname Computed - {{ fullName }}</h2>
</template>
<script lang="ts">
export default {
  name: 'Computed',
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe'
    };
  },
  computed: {
    fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }
  },
  methods: {}
};
</script>
<style>
@media (min-width: 768px) {
  h2 {
    font-size: 2rem;
  }
}
</style>
