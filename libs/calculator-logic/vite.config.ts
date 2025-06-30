/// <reference types='vitest' />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/calculator-logic',
  
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index'
    },
    outDir: 'dist',
    emptyOutDir: true
  },
  
  plugins: [
    dts({
      entryRoot: 'src',
      outDir: 'dist',
      exclude: ['**/*.spec.ts', '**/*.test.ts'],
      insertTypesEntry: true
    })
  ],
  
  test: {
    watch: false,
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const
    }
  }
});
