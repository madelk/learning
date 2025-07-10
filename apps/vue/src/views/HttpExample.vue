<script setup lang="ts">
  import axios from "axios";
  import { onMounted, ref } from "vue";
  import BaseButton from "../components/BaseButton.vue";
  import CreatePost from "../components/CreatePost.vue";
  import PopupComponent from "../components/PopupComponent.vue";
  interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }
  interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: {
        lat: string;
        lng: string;
      };
    };
    phone: string;
    website: string;
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    };
  }
  const posts = ref<Post[] | null>(null);
  const users = ref<User[] | null>(null);
  const error = ref<string | null>(null);
  const showPopup = ref(false);
  const togglePopup = () => {
    showPopup.value = !showPopup.value;
  };
  const basePath = "https://jsonplaceholder.typicode.com";
  onMounted(async () => {
    try {
      const postsPromise = axios.get(`${basePath}/posts`);
      const usersPromise = axios.get(`${basePath}/users`);
      const [postsResponse, usersResponse] = await Promise.all([
        postsPromise,
        usersPromise
      ]);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      posts.value = postsResponse.data;
      users.value = usersResponse.data;
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = String(err);
      }
    }
  });
  const findUserById = (userId: number) => {
    return users.value?.find((user) => user.id === userId) || null;
  };
  const selectedUser = ref<User | null>(null);
  const selectUser = (userId?: number) => {
    if (!userId) {
      return;
    }
    const user = findUserById(userId);
    if (!user) {
      return;
    }
    selectedUser.value = user;
    showPopup.value = true;
  };
</script>

<template>
  <CreatePost />
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
    <h1 class="text-3xl font-bold mb-4 text-blue-700 flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-7 w-7 text-blue-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m4 4h-1v-4h-1m-4 4h-1v-4h-1m4 4h-1v-4h-1"
        />
      </svg>
      HTTP Example
    </h1>
    <p class="mb-6 text-gray-600">
      This is an example of an HTTP request in
      <span class="font-semibold text-blue-600">Vue 3</span>
      .
    </p>
    <ul v-if="posts" class="space-y-6">
      <li
        v-for="item in posts"
        :key="item.id"
        class="bg-blue-50 rounded-lg p-4 shadow hover:shadow-lg transition"
      >
        <h2 class="text-xl font-semibold text-blue-800 mb-1">
          {{ item.title }}
        </h2>
        <p class="text-gray-700 mb-2">{{ item.body }}</p>
        <BaseButton variant="secondary" @click="selectUser(item.userId)">
          <span class="font-medium text-blue-700">Author:</span>
          <span class="ml-1">
            {{
              findUserById(item.userId)
                ? findUserById(item.userId)?.name
                : "Unknown User"
            }}
          </span>
        </BaseButton>
        <!-- End BaseButton -->
      </li>
    </ul>
    <div v-else-if="!error" class="flex items-center justify-center h-32">
      <svg
        class="animate-spin h-6 w-6 text-blue-400 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8z"
        ></path>
      </svg>
      <span class="text-blue-500 font-medium">Loading posts...</span>
    </div>
    <div
      v-else
      class="max-w-2xl mx-auto p-6 bg-red-50 rounded-lg shadow-md mt-8"
    >
      <h1 class="text-3xl font-bold mb-4 text-red-700">Error</h1>
      <p class="text-red-600">{{ error }}</p>
    </div>
  </div>
  <PopupComponent :show-popup="showPopup" @close-popup="togglePopup">
    <template #default>
      <div class="p-4">
        <h2 class="text-xl font-bold mb-4 text-blue-700">
          Selected User Details
        </h2>
        <div v-if="selectedUser" class="space-y-2 text-white">
          <p>
            <strong>Name:</strong>
            {{ selectedUser.name }}
          </p>
          <p>
            <strong>Email:</strong>
            {{ selectedUser.email }}
          </p>
          <p>
            <strong>Phone:</strong>
            {{ selectedUser.phone }}
          </p>
          <p>
            <strong>Website:</strong>
            {{ selectedUser.website }}
          </p>
        </div>
        <div v-else class="text-red-500">No user selected.</div>
      </div>
    </template>
  </PopupComponent>
</template>
