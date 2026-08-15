module.exports = {
  customSyntax: "postcss-scss",
  extends: ["stylelint-config-recommended"],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
          "custom-variant",
          "plugin",
          "theme",
        ],
      },
    ],
    "no-descending-specificity": null,
  },
};
