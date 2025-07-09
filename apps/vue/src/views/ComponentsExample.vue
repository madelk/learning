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
  <h1>Components Example</h1>
  <div>
    <GreetComponent first-name="Alice" last-name="George" />
    <GreetComponent first-name="Bob" last-name="Frank" />
    <GreetComponent first-name="Charlie" last-name="Charlie" />
    <GreetComponent :first-name="myName" :last-name="myOtherName" />
  </div>
  <div>
    <ArticleComponent
      id="my-article"
      title="Article Title"
      :likes="100"
      is-published
    />
  </div>
  <div>
    <h3>Component Example Username: {{ username }}</h3>
    <ComponentC />
  </div>
  <div>
    <button
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
      @click="showPopup = !showPopup"
    >
      Toggle Popup
    </button>
    <PopupComponent v-show="showPopup" @close-popup="closePopup" />
  </div>
</template>

<style scoped>
  h1,
  h2 {
    color: blue;
  }
</style>
