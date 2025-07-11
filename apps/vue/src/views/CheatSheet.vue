<script setup lang="ts">
  const sections = [
    {
      title: "Reactivity",
      features: [
        {
          name: "ref",
          description:
            "Creates a reactive reference to a value. Use for primitive values or when you want to track a single value's changes.",
          links: [
            { file: "FormExample.vue", path: "views/FormExample.vue", line: 3 },
            {
              file: "ComponentsExample.vue",
              path: "views/ComponentsExample.vue",
              line: 5
            },
            { file: "TabA.vue", path: "components/TabA.vue", line: 3 },
            { file: "TabB.vue", path: "components/TabB.vue", line: 3 },
            { file: "TabC.vue", path: "components/TabC.vue", line: 3 },
            { file: "HttpExample.vue", path: "views/HttpExample.vue", line: 3 },
            {
              file: "VolumeExample.vue",
              path: "views/VolumeExample.vue",
              line: 3
            },
            {
              file: "CreatePost.vue",
              path: "components/CreatePost.vue",
              line: 4
            }
          ]
        },
        {
          name: "reactive",
          description:
            "Creates a reactive object. Use when you want to track changes to an object or array as a whole.",
          links: [
            { file: "FormExample.vue", path: "views/FormExample.vue", line: 3 },
            {
              file: "VolumeExample.vue",
              path: "views/VolumeExample.vue",
              line: 3
            }
          ]
        },
        {
          name: "toRefs",
          description:
            "Converts a reactive object’s properties into refs. Useful for destructuring a reactive object while keeping reactivity.",
          links: [
            {
              file: "VolumeExample.vue",
              path: "views/VolumeExample.vue",
              line: 4
            }
          ]
        },
        {
          name: "computed",
          description:
            "Creates a reactive computed value that updates automatically when its dependencies change. Use for derived state.",
          links: [
            {
              file: "ComputedExample.vue",
              path: "views/ComputedExample.vue",
              line: 3
            },
            {
              file: "BaseButton.vue",
              path: "components/BaseButton.vue",
              line: 7
            }
          ]
        },
        {
          name: "watch",
          description:
            "Watches one or more reactive sources and runs a callback when they change. Use for side effects or async logic.",
          links: [
            {
              file: "VolumeExample.vue",
              path: "views/VolumeExample.vue",
              line: 11
            },
            {
              file: "LifecycleExample.vue",
              path: "views/LifecycleExample.vue",
              line: 39
            }
          ]
        }
      ]
    },
    {
      title: "Component Options & Props",
      features: [
        {
          name: "defineProps / withDefaults",
          description:
            "Defines props for a component in `<script setup>`. Use `withDefaults` to set default prop values.",
          links: [
            {
              file: "InputComponent.vue",
              path: "components/InputComponent.vue",
              line: 2
            },
            {
              file: "ArticleComponent.vue",
              path: "components/ArticleComponent.vue",
              line: 6
            },
            {
              file: "GreetComponent.vue",
              path: "components/GreetComponent.vue",
              line: 2
            }
          ]
        },
        {
          name: "withDefaults",
          description:
            "Sets default values for props in `<script setup>`. Cleaner than setting defaults in the parent or with `default` in `defineProps`.",
          links: [
            {
              file: "ArticleComponent.vue",
              path: "components/ArticleComponent.vue",
              line: 6
            }
          ]
        },
        {
          name: "defineEmits",
          description:
            "Defines and types emitted events for a component in `<script setup>`. Use to type event emissions.",
          links: [
            {
              file: "InputComponent.vue",
              path: "components/InputComponent.vue",
              line: 7
            },
            {
              file: "PopupComponent.vue",
              path: "components/PopupComponent.vue",
              line: 8
            }
          ]
        },
        {
          name: "defineExpose",
          description:
            "Makes properties/methods available to the parent or for `<script setup>` introspection.",
          links: [
            {
              file: "FormExample.vue",
              path: "views/FormExample.vue",
              line: 15
            },
            {
              file: "ComputedExample.vue",
              path: "views/ComputedExample.vue",
              line: 67
            },
            {
              file: "CalculatorView.vue",
              path: "components/calculator/CalculatorView.vue",
              line: 7
            },
            { file: "test-eslint.vue", path: "test-eslint.vue", line: 12 }
          ]
        },
        {
          name: "defineOptions",
          description:
            "Sets component options (like `name`, `inheritAttrs`) in `<script setup>`.",
          links: [
            {
              file: "BaseButton.vue",
              path: "components/BaseButton.vue",
              line: 4
            },
            {
              file: "ArticleComponent.vue",
              path: "components/ArticleComponent.vue",
              line: 2
            },
            {
              file: "CalculatorView.vue",
              path: "components/calculator/CalculatorView.vue",
              line: 5
            }
          ]
        }
      ]
    },
    {
      title: "Component Communication & Slots",
      features: [
        {
          name: "inject / provide",
          description:
            "Dependency injection for passing values down the component tree without props.",
          links: [
            {
              file: "ComponentsExample.vue",
              path: "views/ComponentsExample.vue",
              line: 8
            },
            {
              file: "ComponentF.vue",
              path: "components/ComponentF.vue",
              line: 2
            }
          ]
        },
        {
          name: "slots",
          description:
            "Allow parent components to pass content into child components. Use for flexible layouts.",
          links: [
            {
              file: "CardComponent.vue",
              path: "components/CardComponent.vue",
              line: 13
            },
            {
              file: "SlotsExample.vue",
              path: "views/SlotsExample.vue",
              line: 1
            },
            { file: "NameList.vue", path: "components/NameList.vue", line: 19 }
          ]
        },
        {
          name: "slot props",
          description:
            "Passing data from child to parent via slots. Enables advanced slot usage.",
          links: [
            { file: "NameList.vue", path: "components/NameList.vue", line: 19 }
          ]
        },
        {
          name: "Component communication patterns",
          description:
            "Parent-child (props, emits), provide/inject, slots. For flexible, maintainable component design.",
          links: [
            {
              file: "ComponentsExample.vue",
              path: "views/ComponentsExample.vue",
              line: 1
            },
            {
              file: "ComponentF.vue",
              path: "components/ComponentF.vue",
              line: 1
            },
            { file: "NameList.vue", path: "components/NameList.vue", line: 1 }
          ]
        }
      ]
    },
    {
      title: "Lifecycle & Template Features",
      features: [
        {
          name: "lifecycle methods",
          description:
            "Hooks for responding to component lifecycle events (mount, update, unmount, etc).",
          links: [
            {
              file: "LifecycleExample.vue",
              path: "views/LifecycleExample.vue",
              line: 1
            },
            { file: "TabA.vue", path: "components/TabA.vue", line: 4 },
            { file: "TabB.vue", path: "components/TabB.vue", line: 4 },
            { file: "TabC.vue", path: "components/TabC.vue", line: 4 }
          ]
        },
        {
          name: "template refs",
          description:
            "References to DOM elements or components in the template. Use for direct DOM access or imperative actions.",
          links: [
            { file: "FormExample.vue", path: "views/FormExample.vue", line: 11 }
          ]
        },
        {
          name: "teleport",
          description:
            "Renders a component or element elsewhere in the DOM. Useful for modals, popups, tooltips.",
          links: [
            {
              file: "PopupComponent.vue",
              path: "components/PopupComponent.vue",
              line: 13
            }
          ]
        },
        {
          name: "KeepAlive",
          description:
            "Caches inactive components without destroying them. Preserves state/performance for tabbed interfaces.",
          links: [
            {
              file: "DynamicTabsComponent.vue",
              path: "components/DynamicTabsComponent.vue",
              line: 1
            }
          ]
        }
      ]
    },
    {
      title: "Directives & Advanced Patterns",
      features: [
        {
          name: "v-model",
          description:
            "Two-way binding for form inputs and custom components. Simplifies input handling.",
          links: [
            {
              file: "FormExample.vue",
              path: "views/FormExample.vue",
              line: 24
            },
            {
              file: "InputComponent.vue",
              path: "components/InputComponent.vue",
              line: 13
            },
            {
              file: "CreatePost.vue",
              path: "components/CreatePost.vue",
              line: 13
            }
          ]
        },
        {
          name: "v-bind / $attrs",
          description:
            "Passes all attributes to a child component or element. For flexible, reusable components.",
          links: [
            {
              file: "ArticleComponent.vue",
              path: "components/ArticleComponent.vue",
              line: 12
            },
            {
              file: "BaseButton.vue",
              path: "components/BaseButton.vue",
              line: 15
            }
          ]
        }
      ]
    },
    {
      title: "TypeScript Support",
      features: [
        {
          name: "TypeScript with Vue",
          description:
            "Using TypeScript for props, emits, and component logic. Provides type safety and better tooling.",
          links: [
            {
              file: "GreetComponent.vue",
              path: "components/GreetComponent.vue",
              line: 1
            },
            {
              file: "InputComponent.vue",
              path: "components/InputComponent.vue",
              line: 1
            },
            { file: "TabA.vue", path: "components/TabA.vue", line: 1 }
          ]
        }
      ]
    }
  ];
</script>

<template>
  <div class="max-w-3xl mx-auto p-8">
    <h1 class="text-3xl font-bold mb-6 text-blue-700">Vue 3 Cheat Sheet</h1>
    <p class="mb-8 text-gray-700">
      Quick reference for Vue 3 Composition API features, grouped by category,
      with links to real usage in this codebase.
    </p>
    <div v-for="section in sections" :key="section.title" class="mb-12">
      <h2 class="text-2xl font-bold text-green-700 mb-4">
        {{ section.title }}
      </h2>
      <div v-for="feature in section.features" :key="feature.name" class="mb-8">
        <h3 class="text-xl font-semibold text-purple-700 mb-2">
          {{ feature.name }}
        </h3>
        <p class="mb-2 text-gray-800">{{ feature.description }}</p>
        <ul class="list-disc pl-6 text-blue-600">
          <li v-for="link in feature.links" :key="link.file">
            <a
              :href="`https://github.com/madelk/learning/blob/main/apps/vue/src/${link.path}#L${link.line}`"
              target="_blank"
              rel="noopener noreferrer"
              class="underline"
            >
              {{ link.file }} (line {{ link.line }})
            </a>
          </li>
          <li v-if="feature.links.length === 0" class="text-gray-400">
            No direct usage example yet
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
