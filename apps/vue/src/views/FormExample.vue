<script setup lang="ts">
  import { onMounted, reactive, ref } from "vue";
  import BaseButton from "../components/BaseButton.vue";

  const formValues = reactive({
    name: "",
    profileSummary: "",
    country: "",
    jobLocation: [],
    remoteWork: "no",
    skillSet: [],
    yearsOfExperience: ""
  });

  function submitForm() {
    console.log("Form submitted with values:", formValues);
  }
  const nameInput = ref<HTMLInputElement | null>(null);
  onMounted(() => {
    nameInput.value?.focus();
    document.title = "Form Example | Vue App";
  });
  // No public properties to expose
  defineExpose({});
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-3xl font-bold text-gray-900 mb-8 text-center">
      Developer Profile Form
    </h1>

    <!-- Form Values Preview -->
    <div class="mb-8 bg-gray-50 rounded-lg p-4">
      <h2 class="text-lg font-semibold text-gray-700 mb-3">
        Form Data Preview
      </h2>
      <pre class="text-sm text-gray-600 overflow-auto">{{
        JSON.stringify(formValues, null, 2)
      }}</pre>
    </div>
    <form
      class="bg-white shadow-lg rounded-lg p-8 space-y-6"
      @submit.prevent="submitForm"
    >
      <!-- Personal Information Section -->
      <div class="border-b border-gray-200 pb-6">
        <h3 class="text-xl font-semibold text-gray-900 mb-4">
          Personal Information
        </h3>

        <div class="space-y-4">
          <div>
            <label
              for="name"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              id="name"
              ref="nameInput"
              v-model="formValues.name"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label
              for="profile-summary"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Profile Summary
            </label>
            <textarea
              id="profile-summary"
              v-model="formValues.profileSummary"
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tell us about yourself and your experience..."
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Location Section -->
      <div class="border-b border-gray-200 pb-6">
        <h3 class="text-xl font-semibold text-gray-900 mb-4">
          Location Preferences
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              for="country"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Country
            </label>
            <select
              id="country"
              v-model="formValues.country"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a country</option>
              <option value="usa">USA</option>
              <option value="canada">Canada</option>
              <option value="mexico">Mexico</option>
            </select>
          </div>

          <div>
            <label
              for="job-location"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Preferred Job Locations
            </label>
            <select
              id="job-location"
              v-model="formValues.jobLocation"
              multiple
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
            >
              <option value="usa">USA</option>
              <option value="canada">Canada</option>
              <option value="mexico">Mexico</option>
            </select>
            <p class="text-xs text-gray-500 mt-1">
              Hold Ctrl/Cmd to select multiple locations
            </p>
          </div>
        </div>

        <div class="mt-4">
          <div class="flex items-center">
            <input
              id="remote-work"
              v-model="formValues.remoteWork"
              type="checkbox"
              true-value="yes"
              false-value="no"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              for="remote-work"
              class="ml-2 text-sm font-medium text-gray-700"
            >
              Open to remote work opportunities
            </label>
          </div>
        </div>
      </div>

      <!-- Skills Section -->
      <div class="border-b border-gray-200 pb-6">
        <h3 class="text-xl font-semibold text-gray-900 mb-4">
          Technical Skills
        </h3>

        <div class="space-y-3">
          <p class="text-sm font-medium text-gray-700">Select your skills:</p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="flex items-center">
              <input
                id="html"
                v-model="formValues.skillSet"
                type="checkbox"
                value="html"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="html" class="ml-2 text-sm text-gray-700">HTML</label>
            </div>

            <div class="flex items-center">
              <input
                id="css"
                v-model="formValues.skillSet"
                type="checkbox"
                value="css"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="css" class="ml-2 text-sm text-gray-700">CSS</label>
            </div>

            <div class="flex items-center">
              <input
                id="javascript"
                v-model="formValues.skillSet"
                type="checkbox"
                value="javascript"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="javascript" class="ml-2 text-sm text-gray-700">
                JavaScript
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Experience Section -->
      <div class="pb-6">
        <h3 class="text-xl font-semibold text-gray-900 mb-4">
          Experience Level
        </h3>

        <div class="space-y-3">
          <p class="text-sm font-medium text-gray-700">Years of Experience:</p>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="flex items-center">
              <input
                id="0-2"
                v-model="formValues.yearsOfExperience"
                type="radio"
                value="0-2"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label for="0-2" class="ml-2 text-sm text-gray-700">
                0-2 years
              </label>
            </div>

            <div class="flex items-center">
              <input
                id="3-5"
                v-model="formValues.yearsOfExperience"
                type="radio"
                value="3-5"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label for="3-5" class="ml-2 text-sm text-gray-700">
                3-5 years
              </label>
            </div>

            <div class="flex items-center">
              <input
                id="6-10"
                v-model="formValues.yearsOfExperience"
                type="radio"
                value="6-10"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label for="6-10" class="ml-2 text-sm text-gray-700">
                6-10 years
              </label>
            </div>

            <div class="flex items-center">
              <input
                id="10+"
                v-model="formValues.yearsOfExperience"
                type="radio"
                value="10+"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label for="10+" class="ml-2 text-sm text-gray-700">
                10+ years
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="pt-6">
        <BaseButton type="submit" class="w-full text-lg py-3">
          Submit Profile
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<style>
  /* All styling now handled by Tailwind classes */
</style>
