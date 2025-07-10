<script setup lang="ts">
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
  import axios from "axios";
  import { onMounted, ref } from "vue";
  import PopupComponent from "../components/PopupComponent.vue";
  const posts = ref<Post[] | null>(null);
  const users = ref<User[] | null>(null);
  const showPopup = ref(false);
  const togglePopup = () => {
    showPopup.value = !showPopup.value;
  };
  onMounted(async () => {
    const postsPromise = axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const usersPromise = axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const [postsResponse, usersResponse] = await Promise.all([
      postsPromise,
      usersPromise
    ]);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    posts.value = postsResponse.data;
    users.value = usersResponse.data;
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
        <button
          class="text-blue-500 hover:text-blue-700 font-medium"
          @click="selectUser(item.userId)"
        >
          <span class="font-medium text-blue-700">Author:</span>
          <span class="ml-1">
            {{
              findUserById(item.userId)
                ? findUserById(item.userId)?.name
                : "Unknown User"
            }}
          </span>
        </button>
      </li>
    </ul>
    <div v-else class="flex items-center justify-center h-32">
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
