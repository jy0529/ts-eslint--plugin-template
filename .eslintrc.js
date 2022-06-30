"use strict";

module.exports = { 
  parser: require.resolve("@typescript-eslint/parser"),
  extends: [
    "plugin:eslint-plugin/recommended",
    "plugin:node/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
  ],
  plugins: ["eslint-plugin", "eslint-comments", "node", "@typescript-eslint"],
  env: {
    node: true,
    es6: true,
  },
  rules: {
    'node/no-missing-import': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
    'node/no-unsupported-features/es-builtins': 'error',
  }
};
