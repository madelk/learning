import axios from "axios";
import { onMounted } from "vue";
import type { Post, User } from "./HttpExample.types";

export function useHttpExampleFetch(
  posts: { value: Post[] | null },
  users: { value: User[] | null },
  error: { value: string | null },
  basePath = "https://jsonplaceholder.typicode.com"
) {
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
    } catch (error_) {
      error.value = error_ instanceof Error ? error_.message : String(error_);
    }
  });
}
