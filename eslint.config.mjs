import { FlatCompat } from '@eslint/eslintrc';
import { defineConfig } from 'eslint/config';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default defineConfig([
  {
    ignores: ['.idea', '.next', '.vite', '.yarn', 'coverage', 'node_modules'],
  },
  compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
    rules: {
      'jsx-quotes': ['error', 'prefer-double'],
      quotes: ['error', 'single'],
      semi: ['error', 'always']
    }
  })
]);