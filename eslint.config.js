// eslint.config.js
import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import astro from "eslint-plugin-astro";

export default [
  js.configs.recommended,
  {
    files: ["**/*.astro"],
    plugins: { astro },
    languageOptions: {
      parser: astro.parsers["astro"],
    },
    rules: {
      // 必要に応じて
    },
  },
  prettier,
];
