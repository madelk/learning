<script setup lang="ts">
  import { provide, ref } from "vue";
  import ArticleComponent from "../components/ArticleComponent.vue";
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
</script>

<template>
  <div class="mocha min-h-screen bg-base text-text p-6">
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
      <button
        class="bg-mauve text-base px-4 py-2 rounded hover:bg-pink transition-colors duration-200 shadow"
        @click="showPopup = !showPopup"
      >
        Toggle Popup
      </button>
      <PopupComponent v-show="showPopup" @close-popup="closePopup" />
    </div>
  </div>
</template>

<style scoped>
  /* Additional custom styles can go here if needed */
</style>
