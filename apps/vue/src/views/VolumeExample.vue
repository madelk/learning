<script lang="ts" setup>
  import { ref, watch } from "vue";
  // add watch property to track volume changes
  const volume = ref(0);
  const movie = ref("Batman");
  const movieInfo = ref({
    title: "",
    actor: ""
  });
  const movieList = ref(["Batman", "Superman"]);
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
    <h3 class="mb-6 text-lg text-slate-700">Current volume: {{ volume }}</h3>
    <div class="flex gap-4">
      <button
        class="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2 text-base font-medium transition-colors"
        @click="volume += 2"
      >
        Increase
      </button>
      <button
        class="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2 text-base font-medium transition-colors"
        @click="volume -= 2"
      >
        Decrease
      </button>
      <button
        class="bg-gray-400 hover:bg-gray-500 text-white rounded-lg px-5 py-2 text-base font-medium transition-colors"
        @click="volume = 0"
      >
        Reset
      </button>
    </div>
    <label class="mt-6 mb-2 text-lg text-slate-700" for="movie-input">
      Movie name:
    </label>
    <input id="movie-input" v-model="movie" placeholder="Enter movie name" />
    <label class="mt-6 mb-2 text-lg text-slate-700" for="movie-title-input">
      Movie title:
    </label>
    <input
      id="movie-title-input"
      v-model="movieInfo.title"
      placeholder="Enter movie title"
    />
    <label class="mt-6 mb-2 text-lg text-slate-700" for="movie-actor-input">
      Movie actor:
    </label>
    <input
      id="movie-actor-input"
      v-model="movieInfo.actor"
      placeholder="Enter movie actor"
    />
    <div>
      <button @click="movieList.push('Wonder Woman')">
        Add Movie same ref
      </button>
      <!-- This will create a new reference to the array and so doesn't require deep on the watch -->
      <button @click="movieList = movieList.concat(['Wonder Woman'])">
        Add Movie new ref
      </button>
    </div>
  </main>
</template>
