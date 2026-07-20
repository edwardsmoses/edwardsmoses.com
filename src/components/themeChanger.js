import React from "react";
import { ThemeToggler } from "gatsby-plugin-dark-mode";

export default () => (
  <ThemeToggler>
    {({ theme, toggleTheme }) => (
      <label
        className="theme-toggle"
        title={theme === "dark" ? "Use light mode" : "Use dark mode"}
      >
        <input
          type="checkbox"
          className="theme-changer"
          aria-label={theme === "dark" ? "Use light mode" : "Use dark mode"}
          onChange={(e) => {
            const nextTheme = e.target.checked ? "dark" : "light";
            const toRemoveTheme = e.target.checked ? "light" : "dark";
            toggleTheme(nextTheme);

            document.documentElement.classList.add(nextTheme);
            document.documentElement.classList.remove(toRemoveTheme);
          }}
          checked={theme === "dark"}
        />
        <span className="mode-container" aria-hidden="true">
          <span className="theme-icon theme-icon--sun">
            <i className="gg-sun"></i>
          </span>
          <span className="theme-icon theme-icon--moon">
            <i className="gg-moon"></i>
          </span>
        </span>
      </label>
    )}
  </ThemeToggler>
);
