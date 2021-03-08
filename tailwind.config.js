module.exports = {
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'app-black': '#242531',
        'app-purple': '#8847fb',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
