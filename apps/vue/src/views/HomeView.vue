<script setup lang="ts">
import {getHomepageText} from '@study/pagetext';
const text = getHomepageText()
</script>
<template>
  <main>
    <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
      {{ text.title }}
    </h1>
    <p
      v-for="(p, i) in text.paragraphs"
      :key="i"
    >
      {{ p }}
    </p>
  </main>
</template>
