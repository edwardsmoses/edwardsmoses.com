import React from "react";
import { ThemeToggler } from "gatsby-plugin-dark-mode";

export default () => (
  <ThemeToggler>
    {({ theme, toggleTheme }) => (
      <label>
        <input
          type="checkbox"
          className="theme-changer"
          onChange={(e) => {
            const theme = e.target.checked ? "dark" : "light";
            const toRemoveTheme = e.target.checked ? "light" : "dark";
            toggleTheme(theme);

            document.documentElement.classList.add(theme);
            document.documentElement.classList.remove(toRemoveTheme);
          }}
          checked={theme === "dark"}
        />{" "}
        <div className="cursor-pointer mode-container">
          <i className="gg-sun  dark:text-white"></i>
          <i className="gg-moon  dark:text-white"></i>
        </div>
      </label>
    )}
  </ThemeToggler>
);
