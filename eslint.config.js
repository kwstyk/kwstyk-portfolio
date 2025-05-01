import js from "@eslint/js";
import * as astro from "eslint-plugin-astro";

export default [
  js.configs.recommended,
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astro.parser,
    },
    plugins: {
      astro,
    },
    rules: {
      "astro/no-set-html-directive": "error",
    },
  },
  {
    ignores: ["dist/", "**/node_modules/**"],
  },
];
