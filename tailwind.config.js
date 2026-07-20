module.exports = {
  content: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "app-black": "#242531",
        "app-purple": "#8847fb",
        "app-brand": "#22293a",
        "app-brand-white": "#fffcf5",
        "app-brand-yellow": "#8a672e",
      },
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
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
    require("@tailwindcss/typography"),
  ],
};
