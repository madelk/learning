<script setup lang="ts">
  defineOptions({
    inheritAttrs: false
  });

  withDefaults(
    defineProps<{ title?: string; likes: number; isPublished: boolean }>(),
    {
      title: "default title"
    }
  );
</script>

<template>
  <div>
    <h2>Article Component</h2>
    <h2 v-bind="$attrs">{{ title }}</h2>
    <h2>Likes - {{ likes }}</h2>
    <h2>Published - {{ isPublished ? "Yes" : "No" }}</h2>
  </div>
</template>
