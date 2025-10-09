import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import {defineConfig, globalIgnores} from "eslint/config";

export default defineConfig([
  globalIgnores(['**/dist/**', '**/coverage/**/*', '**/node_modules/**/*'], ['src/app/api/**/*']),
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: {js},
    extends: ["js/recommended"],
    languageOptions: {globals: {...globals.browser, ...globals.node}}
  },
  tseslint.configs.recommended,
  {files: ["**/*.jsonc"], plugins: {json}, language: "json/jsonc", extends: ["json/recommended"]},
  {files: ["**/*.md"], plugins: {markdown}, language: "markdown/commonmark", extends: ["markdown/recommended"]},
]);
