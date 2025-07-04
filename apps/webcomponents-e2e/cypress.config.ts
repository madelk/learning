import { nxE2EPreset } from "@nx/cypress/plugins/cypress-preset";
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: "src",
      bundler: "vite",
      webServerCommands: {
        default: "npx nx run @study/webcomponents:dev",
        production: "npx nx run @study/webcomponents:preview"
      },
      ciWebServerCommand: "npx nx run @study/webcomponents:preview",
      ciBaseUrl: "http://localhost:4302/webcomponents/"
    }),
    baseUrl: "http://localhost:4202/webcomponents/",
    supportFile: "src/support/cypress-support.ts"
  }
});
