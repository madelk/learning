<script setup lang="ts">
  defineProps<{
    id: string;
    label?: string;
    placeholder?: string;
    modelValue: string;
  }>();

  defineEmits<(e: "update:modelValue", value: string) => void>();
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-24 w-full">
    <label
      v-if="label"
      :for="id"
      class="mb-3 text-base font-bold text-gradient bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 bg-clip-text text-transparent w-full max-w-md text-left tracking-wide drop-shadow-lg animate-gradient-x"
    >
      {{ label }}
    </label>
    <div class="relative w-full max-w-md">
      <input
        :id="id"
        :value="modelValue"
        type="text"
        :placeholder="placeholder ?? 'Type something...'"
        class="peer px-6 py-3 border-2 border-transparent rounded-xl shadow-lg bg-gradient-to-r from-white/80 to-blue-50/80 focus:bg-white focus:border-none focus:ring-4 focus:ring-pink-200 focus:outline-none w-full text-lg text-gray-900 placeholder:italic placeholder:text-pink-300 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
      />
      <svg
        class="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-pink-400 opacity-70 pointer-events-none"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16 12A4 4 0 1 1 8 12a4 4 0 0 1 8 0Zm2 6a8 8 0 1 1-12 0"
        />
      </svg>
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
</style>
