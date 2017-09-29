"use strict";

module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true
  },
  extends: ["eslint:recommended"],
  plugins: ["prettier"],
  rules: {
    "no-else-return": "error",
    "no-inner-declarations": "error",
    "no-unneeded-ternary": "error",
    "no-useless-return": "error",
    "no-var": "error",
    "one-var": ["error", "never"],
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "prettier/prettier": "error",
    strict: "error"
  }
};
