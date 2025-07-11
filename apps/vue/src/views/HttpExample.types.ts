import { ref } from "vue";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface User {
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

export function useHttpExampleState() {
  const posts = ref<Post[] | null>(null);
  const users = ref<User[] | null>(null);
  const error = ref<string | null>(null);
  const showPopup = ref(false);
  const selectedUser = ref<User | null>(null);
  return { posts, users, error, showPopup, selectedUser };
}

export function useHttpExampleHelpers(
  users: ReturnType<typeof useHttpExampleState>["users"]
) {
  const findUserById = (userId: number) => {
    return users.value?.find((user) => user.id === userId) || null;
  };
  return { findUserById };
}
