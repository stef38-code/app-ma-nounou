import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import {defineConfig, globalIgnores} from "eslint/config";
import angular from 'angular-eslint';
import eslintConfigPrettier from'eslint-config-prettier';

export default defineConfig([
  globalIgnores(['**/dist/**', '**/coverage/**/*', '**/node_modules/**/*','src/app/api/**/*']),
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: {js: eslint},
    extends: ["js/recommended"],
    languageOptions: {
      globals: {...globals.browser, ...globals.node},
      parserOptions: {
        ecmaVersion: 'latest',
        project: ['./tsconfig.json', './tsconfig.spec.json']
      }
    }
  },
  {
    ignores: ['.angular/**', '.nx/**', 'coverage/**', 'dist/**'], // add these ignores
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      eslintConfigPrettier, // add the glue plugin
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      // Angular best practices
      '@angular-eslint/no-empty-lifecycle-method': 'warn',
      '@angular-eslint/prefer-on-push-component-change-detection': 'warn',
      '@angular-eslint/prefer-output-readonly': 'warn',
      '@angular-eslint/prefer-signals': 'warn',
      '@angular-eslint/prefer-standalone': 'warn',

      // TypeScript best practices
      '@typescript-eslint/array-type': ['warn'],
      '@typescript-eslint/consistent-indexed-object-style': 'off',
      '@typescript-eslint/consistent-type-assertions': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'no-public',
        },
      ],
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        },
      ],
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/no-shadow': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      eqeqeq: 'error',
      complexity: ['error', 20],
      curly: 'error',
      'guard-for-in': 'error',
      'max-classes-per-file': ['error', 1],
      'max-len': [
        'warn',
        {
          code: 120,
          comments: 160,
        },
      ],
      'max-lines': ['error', 400], // my favorite rule to keep files small
      'no-bitwise': 'error',
      'no-console': 'off',
      'no-new-wrappers': 'error',
      'no-useless-concat': 'error',
      'no-var': 'error',
      'no-restricted-syntax': 'off',
      'no-shadow': 'error',
      'one-var': ['error', 'never'],
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          allowSeparatedGroups: true,
        },
      ],

      // Security
      'no-eval': 'error',
      'no-implied-eval': 'error',
    },
  },
  {
    files: ['**/*.html'],
    processor: angular.processInlineTemplates,
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility
    ]
  },
  tseslint.configs.recommended,
  {files: ["**/*.jsonc"], plugins: {json}, language: "json/jsonc", extends: ["json/recommended"]},
  {files: ["**/*.md"], plugins: {markdown}, language: "markdown/commonmark", extends: ["markdown/recommended"]},
]);
