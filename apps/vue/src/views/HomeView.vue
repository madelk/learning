<script setup lang="ts">
import {getHomepageText} from '@study/pagetext';
const text = getHomepageText()
</script>
<template>
  <main>
    <h1 class="{{text.title.className}}">
      {{ text.title.text }}
    </h1>
    <p
      v-for="(p, i) in text.paragraphs"
      :key="i"
    >
      {{ p }}
    </p>
  </main>
</template>
