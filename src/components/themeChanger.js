import React, { useEffect, useState } from "react";

export default function ThemeChanger() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const handleThemeChange = (nextTheme) => setTheme(nextTheme);

    setTheme(window.__theme);
    window.__onThemeChange = handleThemeChange;

    return () => {
      window.__onThemeChange = () => {};
    };
  }, []);

  const isDark = theme === "dark";
  const label = isDark ? "Use light mode" : "Use dark mode";

  return (
    <label className="theme-toggle" title={label}>
      <input
        type="checkbox"
        className="theme-changer"
        aria-label={label}
        onChange={(event) => {
          window.__setPreferredTheme(event.target.checked ? "dark" : "light");
        }}
        checked={isDark}
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
  );
}
