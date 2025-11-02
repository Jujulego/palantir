import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['.idea', '.next', '.vite', '.yarn', 'coverage', 'next-env.d.ts', 'node_modules']),
  nextVitals,
  nextTs,
  {
    rules: {
      'jsx-quotes': ['error', 'prefer-double'],
      quotes: ['error', 'single'],
      semi: ['error', 'always']
    }
  },
]);