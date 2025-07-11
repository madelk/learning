<script setup lang="ts">
  import { onMounted, provide, ref } from "vue";
  import ArticleComponent from "../components/ArticleComponent.vue";
  import BaseButton from "../components/BaseButton.vue";
  import ComponentC from "../components/ComponentC.vue";
  import GreetComponent from "../components/GreetComponent.vue";
  import PopupComponent from "../components/PopupComponent.vue";
  const myName = ref("Mark");
  const myOtherName = ref("Dell");
  const username = ref("Mark Dell");
  const showPopup = ref(false);
  provide("username", username);
  const closePopup = (payload: string) => {
    console.log("Popup closed with payload:", payload);
    showPopup.value = false;
  };
  // Theme detection for Latte vs Mocha, with manual override (lightswitch)
  const isLightTheme = ref(false);
  const themeOverride = ref<"auto" | "light" | "dark">("auto");
  const updateTheme = () => {
    if (themeOverride.value === "auto") {
      isLightTheme.value = window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches;
    } else {
      isLightTheme.value = themeOverride.value === "light";
    }
  };
  onMounted(() => {
    updateTheme();
    window
      .matchMedia("(prefers-color-scheme: light)")
      .addEventListener("change", updateTheme);
    document.title = "Components Example | Vue App";
  });
</script>

<template>
  <div
    class="min-h-screen bg-base text-text p-6"
    :class="isLightTheme ? 'latte' : 'mocha'"
  >
    <div class="flex items-center gap-2 mb-4">
      <label class="font-semibold">Theme:</label>
      <BaseButton
        :variant="themeOverride === 'auto' ? 'primary' : 'secondary'"
        @click="
          themeOverride = 'auto';
          updateTheme();
        "
      >
        Auto
      </BaseButton>
      <BaseButton
        :variant="themeOverride === 'light' ? 'primary' : 'secondary'"
        @click="
          themeOverride = 'light';
          updateTheme();
        "
      >
        Latte
      </BaseButton>
      <BaseButton
        :variant="themeOverride === 'dark' ? 'primary' : 'secondary'"
        @click="
          themeOverride = 'dark';
          updateTheme();
        "
      >
        Mocha
      </BaseButton>
    </div>
    <h1 class="text-3xl font-bold mb-4 text-mauve">Components Example</h1>
    <div class="mb-4">
      <GreetComponent first-name="Alice" last-name="George" />
      <GreetComponent first-name="Bob" last-name="Frank" />
      <GreetComponent first-name="Charlie" last-name="Charlie" />
      <GreetComponent :first-name="myName" :last-name="myOtherName" />
    </div>
    <div class="mb-4">
      <ArticleComponent
        id="my-article"
        title="Article Title"
        :likes="100"
        is-published
      />
    </div>
    <div class="mb-4">
      <h3 class="text-lg font-semibold text-blue">
        Component Example Username: {{ username }}
      </h3>
      <ComponentC />
    </div>
    <div>
      <BaseButton @click="showPopup = !showPopup">Toggle Popup</BaseButton>
      <PopupComponent
        v-show="showPopup"
        :show-popup="showPopup"
        @close-popup="closePopup"
      />
    </div>
  </div>
</template>

<style scoped>
  /* Additional custom styles can go here if needed */
</style>
