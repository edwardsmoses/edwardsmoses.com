import React from "react";
import ThemeChanger from "../components/themeChanger";
import scrollTo from "gatsby-plugin-smoothscroll";

export default (props) => (
  <nav className="navigation">
    <button
      className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 -my-2.5 ml-8"
      onClick={() => {
        scrollTo("#articles");
      }}
    >
      Articles
    </button>
    <a href="/about">About</a>
    <a href="mailto:hi@edwardsmoses.com">Contact</a>
    <ThemeChanger />
  </nav>
);
