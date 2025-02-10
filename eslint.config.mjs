import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
    rules: {
      'jsx-quotes': ['error', 'prefer-double'],
      quotes: ['error', 'single'],
      semi: ['error', 'always']
    }
  }),
];

export default eslintConfig;