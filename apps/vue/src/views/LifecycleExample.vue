<script setup lang="ts">
  import {
    onActivated,
    onBeforeMount,
    onBeforeUnmount,
    onBeforeUpdate,
    onDeactivated,
    onMounted,
    onUnmounted,
    onUpdated,
    ref
  } from "vue";

  const messages = ref<string[]>([]);
  const addMessage = (message: string) => {
    console.log(message);
    messages.value.push(message);
  };

  onBeforeMount(() => {
    addMessage(
      "onBeforeMount called - runs before the component is mounted to the DOM. Useful for last-minute setup before render."
    );
  });
  onMounted(() => {
    addMessage(
      "onMounted called - runs after the component is mounted. Useful for making HTTP requests, DOM measurements, or starting timers."
    );
  });
  onBeforeUpdate(() => {
    addMessage(
      "onBeforeUpdate called - runs before reactive data causes a re-render. Useful for saving state or cleaning up before changes."
    );
  });
  onUpdated(() => {
    addMessage(
      "onUpdated called - runs after the component updates due to reactive data changes. Useful for responding to DOM changes."
    );
  });
  onBeforeUnmount(() => {
    addMessage(
      "onBeforeUnmount called - runs right before the component is unmounted from the DOM. Useful for cleanup like removing event listeners."
    );
  });
  onUnmounted(() => {
    addMessage(
      "onUnmounted called - runs after the component is removed from the DOM. Useful for final cleanup or logging."
    );
  });
  onActivated(() => {
    addMessage(
      "onActivated called - runs when a kept-alive component is activated. Useful for refreshing data or resuming activity."
    );
  });
  onDeactivated(() => {
    addMessage(
      "onDeactivated called - runs when a kept-alive component is deactivated. Useful for pausing timers or saving state."
    );
  });
</script>

<template>
  Check yo console
  <!-- <pre>{{ messages }}</pre> -->
</template>
