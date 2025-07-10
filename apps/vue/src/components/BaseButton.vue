<script setup lang="ts">
  import { computed, defineProps } from "vue";

  defineOptions({ inheritAttrs: false });

  const props = defineProps({
    variant: {
      type: String,
      default: "primary",
      validator: (v: string) => ["primary", "secondary", "danger"].includes(v)
    },
    disabled: Boolean
  });

  const variantClass = computed(() => {
    switch (props.variant) {
      case "secondary":
        return "bg-gray-200 text-gray-800 border border-gray-300";
      case "danger":
        return "bg-red-500 text-white";
      default:
        return "bg-blue-600 text-white";
    }
  });
</script>

<template>
  <button
    class="px-4 py-2 rounded font-semibold transition-colors duration-150"
    :class="[
      variantClass,
      disabled ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-90'
    ]"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>
