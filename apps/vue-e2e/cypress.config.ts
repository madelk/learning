import { nxE2EPreset } from "@nx/cypress/plugins/cypress-preset";
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: "src",
      bundler: "vite",
      webServerCommands: {
        default: "npx nx run @study/vue:dev",
        production: "npx nx run @study/vue:preview"
      },
      ciWebServerCommand: "npx nx run @study/vue:preview",
      ciBaseUrl: "http://localhost:4303/vue/"
    }),
    baseUrl: "http://localhost:4203/vue/",
    supportFile: "src/support/cypress-support.ts"
  }
});
