// @ts-check
import eslint from '@eslint/js';
import globals from 'globals';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import * as tseslint from 'typescript-eslint';

export default tseslint.config(
  // 1) Ignores
  {
    ignores: ['eslint.config.mjs', 'dist/**', 'node_modules/**'],
  },

  // 2) Base configs
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,

  // 3) Language options
  {
    languageOptions: {
      globals: { ...globals.node, ...globals.jest },
      sourceType: 'commonjs',
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
  },

  // 4) Project-wide rules
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/require-await': 'off',

      // Prettier via CLI/format script only
      'prettier/prettier': 'off',
    },
  },

  // 5) Silencing noisy Prisma/typed-client false positives
  //    - All service files
  //    - Prisma service dir
  //    - Root prisma/ (e.g., seed.ts)
  {
    files: ['src/**/*.service.ts', 'src/prisma/**/*.ts', 'prisma/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },
);
