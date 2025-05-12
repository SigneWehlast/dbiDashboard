import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}']
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**']
  },

  {
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  },

  {
    rules: {
      'comma-dangle': ['error', 'never'],
      'indent': ['error', 2],
      'no-eval': ['error'],
      'no-trailing-spaces': ['error'],
      'no-unused-vars': ['error'],
      'no-var': ['error'],
      'prefer-const': ['error'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always']
    }
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential']
];


