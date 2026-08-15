const React = require("react");

const themeScript = `
(function () {
  window.__onThemeChange = function () {};

  var preferredTheme;
  try {
    preferredTheme = localStorage.getItem("theme");
  } catch (error) {}

  function setTheme(theme) {
    var previousTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.remove(previousTheme);
    document.documentElement.classList.add(theme);
    document.body.classList.remove(previousTheme);
    document.body.classList.add(theme);
    window.__theme = theme;
    window.__onThemeChange(theme);
  }

  window.__setPreferredTheme = function (theme) {
    preferredTheme = theme;
    setTheme(theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (error) {}
  };

  var darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  var handleSystemThemeChange = function (event) {
    if (!preferredTheme) {
      setTheme(event.matches ? "dark" : "light");
    }
  };

  if (darkQuery.addEventListener) {
    darkQuery.addEventListener("change", handleSystemThemeChange);
  } else {
    darkQuery.addListener(handleSystemThemeChange);
  }

  setTheme(preferredTheme || (darkQuery.matches ? "dark" : "light"));
})();
`;

exports.onRenderBody = ({ setPreBodyComponents, setPostBodyComponents }) => {
  setPreBodyComponents([
    React.createElement("script", {
      key: "theme-initializer",
      dangerouslySetInnerHTML: { __html: themeScript },
    }),
  ]);

  setPostBodyComponents([
    React.createElement("script", {
      key: "gradient-script",
      async: true,
      src: "/gradient.js",
    }),
    React.createElement("script", {
      key: "mobilemonkey-script",
      async: true,
      src: "https://static.mobilemonkey.com/js/mm_2859918c-e24c-4d90-8833-817ff193496e-58488972.js",
    }),
  ]);
};
