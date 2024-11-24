import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  cacheDir: '.vite',
  plugins: [tsconfigPaths(), react()],
  test: {
    coverage: {
      reporter: ['lcovonly']
    },
    environment: 'jsdom',
    reporters: ['default', 'junit'],
    outputFile: {
      junit: 'junit-report.xml'
    }
  },
});