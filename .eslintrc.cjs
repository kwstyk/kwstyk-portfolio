// .eslintrc.cjs
module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:astro/recommended",
    "prettier"
  ],
  plugins: ["astro"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"]
      }
    }
  ]
};
