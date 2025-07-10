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
  const show = ref(true);
  const count = ref(0);

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
    // Only log to console to avoid infinite update loop
    console.log(
      `onUpdated called - runs after the component updates due to reactive data changes. Useful for responding to DOM changes. (count: ${count.value})`
    );
  });
  // Watch count for demonstration, and push a message when it changes
  import { watch } from "vue";
  watch(count, (newVal, oldVal) => {
    addMessage(`count changed from ${oldVal} to ${newVal}`);
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
  <div class="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
    <h1 class="text-2xl font-bold mb-4 text-blue-700">Vue 3 Lifecycle Demo</h1>
    <p class="mb-4 text-gray-700">
      This page demonstrates all major Vue 3 Composition API lifecycle hooks.
      Use the controls below to trigger updates and unmounts, and see the order
      of lifecycle events in real time.
    </p>
    <div class="mb-4">
      <button
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
        @click="show = !show"
      >
        {{ show ? "Unmount" : "Mount" }} Demo Component
      </button>
      <button
        :disabled="!show"
        class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        @click="count++"
      >
        Trigger Update
      </button>
    </div>
    <div v-if="show">
      <div class="mb-2 text-gray-600">Count: {{ count }}</div>
      <pre class="bg-gray-100 rounded p-3 text-sm overflow-x-auto h-64">{{
        messages.join("\n")
      }}</pre>
    </div>
    <div v-else class="text-gray-500 italic">
      Component is unmounted. Mount to see lifecycle events.
    </div>
    <hr class="my-6" />
    <h2 class="text-lg font-semibold mb-2">Lifecycle Hook Reference</h2>
    <table class="w-full text-left text-sm border">
      <thead>
        <tr class="bg-gray-200">
          <th class="p-2 border">Hook</th>
          <th class="p-2 border">When</th>
          <th class="p-2 border">Typical Use</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="p-2 border">onBeforeMount</td>
          <td class="p-2 border">Before mount</td>
          <td class="p-2 border">Last-minute setup before render</td>
        </tr>
        <tr>
          <td class="p-2 border">onMounted</td>
          <td class="p-2 border">After mount</td>
          <td class="p-2 border">HTTP requests, DOM access, timers</td>
        </tr>
        <tr>
          <td class="p-2 border">onBeforeUpdate</td>
          <td class="p-2 border">Before update</td>
          <td class="p-2 border">Save state, cleanup before changes</td>
        </tr>
        <tr>
          <td class="p-2 border">onUpdated</td>
          <td class="p-2 border">After update</td>
          <td class="p-2 border">Respond to DOM changes</td>
        </tr>
        <tr>
          <td class="p-2 border">onBeforeUnmount</td>
          <td class="p-2 border">Before unmount</td>
          <td class="p-2 border">Remove listeners, cleanup</td>
        </tr>
        <tr>
          <td class="p-2 border">onUnmounted</td>
          <td class="p-2 border">After unmount</td>
          <td class="p-2 border">Final cleanup, logging</td>
        </tr>
        <tr>
          <td class="p-2 border">onActivated</td>
          <td class="p-2 border">Kept-alive activated</td>
          <td class="p-2 border">Resume activity, refresh data</td>
        </tr>
        <tr>
          <td class="p-2 border">onDeactivated</td>
          <td class="p-2 border">Kept-alive deactivated</td>
          <td class="p-2 border">Pause timers, save state</td>
        </tr>
      </tbody>
    </table>
    <div class="mt-4 text-blue-700">
      <a
        href="https://vuejs.org/guide/essentials/lifecycle.html"
        target="_blank"
        class="underline"
        rel="noopener noreferrer"
      >
        Official Vue 3 Lifecycle Docs
      </a>
    </div>
  </div>
</template>
