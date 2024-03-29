module.exports = {
  content: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "app-black": "#242531",
        "app-purple": "#8847fb",
        "app-brand": "#22293a",
        "app-brand-white": "#fffff9",
        "app-brand-yellow": "#b69962",
      },
      scale: {
        "-1": "-1",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
