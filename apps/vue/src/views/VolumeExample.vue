<script lang="ts" setup>
  import { reactive, toRefs, watch } from "vue";
  import BaseButton from "../components/BaseButton.vue";
  // add watch property to track volume changes
  const state = reactive({
    volume: 0,
    movie: "Batman",
    movieInfo: {
      title: "",
      actor: ""
    },
    movieList: ["Batman", "Superman"]
  });
  const { volume, movie, movieInfo, movieList } = toRefs(state);
  watch(volume, (newVolume, oldVolume) => {
    if (newVolume === 16 && newVolume > oldVolume) {
      // only show alert when volume increases to 16 and not when it decreases
      alert(
        "Listening to a high volume for a long time can damage your hearing"
      );
    }
  });
  watch(
    movie,
    (newMovie) => {
      // will run on page load because of immediate: true
      console.log("calling API with movie name = ", newMovie);
    },
    {
      immediate: true
    }
  );
  watch(
    movieInfo,
    (newMovieInfo) => {
      // only works because deep = true
      console.log(
        `calling API with movie title = ${newMovieInfo.title} and actor = ${newMovieInfo.actor}`
      );
    },
    {
      deep: true
    }
  );
  watch(
    movieList,
    (newMovieList) => {
      // also only works because deep = true
      console.log("Updated movie list with deep:", newMovieList);
    },
    {
      deep: true
    }
  );
  watch(movieList, (newMovieList) => {
    console.log("Updated movie list without deep:", newMovieList);
  });
</script>

<template>
  <main
    class="flex flex-col items-center justify-center min-h-[60vh] bg-slate-50 rounded-xl shadow-md p-8"
  >
    <h2 class="mb-2 text-2xl font-semibold text-blue-600">
      Volume tracker (0 -200)
    </h2>
    <h3 class="mb-6 text-lg text-slate-700">
      Current volume: {{ volume.value }}
    </h3>
    <div class="flex gap-4">
      <BaseButton @click="volume.value += 2">Increase</BaseButton>
      <BaseButton @click="volume.value -= 2">Decrease</BaseButton>
      <BaseButton variant="secondary" @click="volume.value = 0">
        Reset
      </BaseButton>
    </div>
    <label class="mt-6 mb-2 text-lg text-slate-700" for="movie-input">
      Movie name:
    </label>
    <input
      id="movie-input"
      v-model="movie.value"
      placeholder="Enter movie name"
    />
    <label class="mt-6 mb-2 text-lg text-slate-700" for="movie-title-input">
      Movie title:
    </label>
    <input
      id="movie-title-input"
      v-model="movieInfo.value.title"
      placeholder="Enter movie title"
    />
    <label class="mt-6 mb-2 text-lg text-slate-700" for="movie-actor-input">
      Movie actor:
    </label>
    <input
      id="movie-actor-input"
      v-model="movieInfo.value.actor"
      placeholder="Enter movie actor"
    />
    <div>
      <BaseButton @click="movieList.value.push('Wonder Woman')">
        Add Movie same ref
      </BaseButton>
      <!-- This will create a new reference to the array and so doesn't require deep on the watch -->
      <BaseButton
        @click="movieList.value = movieList.value.concat(['Wonder Woman'])"
      >
        Add Movie new ref
      </BaseButton>
    </div>
  </main>
</template>
