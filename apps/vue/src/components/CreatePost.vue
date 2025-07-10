<script setup lang="ts">
  import axios from "axios";
  import { ref } from "vue";
  import Input from "./InputComponent.vue";
  import BaseButton from "./BaseButton.vue";
  const userId = ref<string>("");
  const title = ref<string>("");
  const body = ref<string>("");
  const createPost = async () => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          userId: parseInt(userId.value, 10),
          title: title.value,
          body: body.value
        }
      );
      console.log("Post created:", response.data);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
</script>

<template>
  <form @submit.prevent="createPost">
    <Input id="userId" v-model="userId" placeholder="User ID" label="User ID" />
    <Input id="title" v-model="title" placeholder="Title" label="Title" />
    <Input id="body" v-model="body" placeholder="Body" label="Body" />
    <BaseButton type="submit">Create Post</BaseButton>
  </form>
</template>
