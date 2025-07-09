import path from "node:path";

const { createGlobPatternsForDependencies } = require("@nx/vue/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    path.join(
      __dirname,
      "{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html,vue}"
    ),
    ...createGlobPatternsForDependencies(__dirname)
  ],
  theme: {
    extend: {}
  },
  plugins: [
    require("@catppuccin/tailwindcss")({
      defaultFlavour: "mocha"
    })
  ]
};
