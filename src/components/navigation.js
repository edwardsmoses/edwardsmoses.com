import React from "react";
import ThemeChanger from "../components/themeChanger";

export default (props) => (
  <nav className="navigation">
    <a href="/about">About me</a>
    <a href="mailto:hi@edwardsmoses.com">Contact</a>
    <ThemeChanger />
  </nav>
);
