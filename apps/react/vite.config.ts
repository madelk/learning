/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { workspaceRoot } from '@nx/devkit';

export default defineConfig(() => ({
  root: __dirname,
  base: '/react/',
  cacheDir: '../../node_modules/.vite/apps/react',
  server: {
    port: 4200,
    host: 'localhost',
    open: true,
    fs: {
      // Allow serving files from one level up to the project root
      allow: [workspaceRoot],
    },
    watch: {
      usePolling: true,
      // Make sure Vite watches library source files, not just the built output
      ignored: ['!**/node_modules/**', '!**/dist/**'],
    },
  },
  preview: {
    port: 4200,
    host: 'localhost',
  },
  plugins: [react(), nxViteTsPaths()],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    outDir: '../../dist/react',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
    },
  },
}));
