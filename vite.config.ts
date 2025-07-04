/// <reference types='vitest' />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    // Use projects instead of the deprecated workspace file
    projects: [
      // Library projects
      'libs/helpers/vite.config.ts',
      'libs/navbar/vite.config.ts', 
      'libs/pagetext/vite.config.ts',
      'libs/calculator-logic/vite.config.ts',
      // App projects
      'apps/react/vite.config.ts',
      'apps/vue/vite.config.ts',
      'apps/webcomponents/vite.config.ts'
    ]
  }
});
