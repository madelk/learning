<script lang="ts" setup>
  import { ref } from "vue";
  import InputComponent from "./inputComponent.vue";
  //   defineEmits<(e: "closePopup", payload: string) => void>();
  defineEmits({
    closePopup: (payload: string) => {
      if (!payload) {
        return false;
      }
      return true;
    }
  });
  const userInput = ref("");
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
  >
    <div
      class="bg-white rounded-lg shadow-2xl p-8 w-full max-w-sm border border-gray-200 relative"
    >
      <h2 class="text-xl font-semibold mb-4 text-gray-800">This is a popup</h2>
      <InputComponent
        id="user-input"
        v-model="userInput"
        placeholder="Popup input placeholder"
        label="Popup Input"
        class="mb-4"
      />

      <button
        class="w-full font-bold py-2 px-4 rounded transition-all duration-300 text-xl drop-shadow-lg border-2 border-blue-100 hover:border-pink-400 focus:outline-none animate-bg-gradient-x text-white bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 bg-[length:200%_200%] bg-[position:0%_50%]"
        @click="$emit('closePopup', userInput)"
      >
        Close Popup
      </button>
      <button
        class="absolute top-2 right-2 bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 bg-clip-text text-transparent text-xl font-bold focus:outline-none animate-gradient-x drop-shadow-lg"
        aria-label="Close"
        @click="$emit('closePopup', userInput)"
      >
        &times;
      </button>
    </div>
  </div>
</template>

<style scoped>
  @keyframes gradient-x {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
  .animate-gradient-x {
    background-size: 200% 200%;
    animation: gradient-x 3s ease-in-out infinite;
  }
  @keyframes bg-gradient-x {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
  .animate-bg-gradient-x {
    background-size: 200% 200%;
    animation: bg-gradient-x 3s ease-in-out infinite;
  }
</style>
