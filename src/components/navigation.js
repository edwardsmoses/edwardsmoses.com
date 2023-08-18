import React from "react";
import { AnchorLink } from "gatsby-plugin-anchor-links";

export default (props) => (
  <nav className="navigation">

    <AnchorLink to="/#articles">
      <a href="#" className="font-medium border-b-2 dark:border-white border-black">
        Articles
      </a>
    </AnchorLink>

    <a href="/about" className="font-medium">
      About
    </a>

    <a href="/projects" className="font-medium">
      Projects
    </a>
    <a href="mailto:hi@edwardsmoses.com" className="font-medium">
      Contact
    </a>

    <button onClick={() => {
      window.open("https://calendly.com/edwardsmoses/30min", "_blank")
    }} className="inline-flex justify-center rounded-sm text-sm font-semibold py-2 px-4 text-white bg-app-brand -my-2.5 ml-5">
      Book a call
    </button>

  </nav>
);
