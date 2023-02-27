import React from "react";
import { AnchorLink } from "gatsby-plugin-anchor-links";

export default (props) => (
  <nav className="navigation">
    <a href="/about" className="font-medium">
      About
    </a>
    <a href="/products" className="font-medium">
      Products
    </a>
    <a href="mailto:hi@edwardsmoses.com" className="font-medium">
      Contact
    </a>

    <AnchorLink to="/#articles" title="Read My Blog">
      <button className="inline-flex justify-center rounded-sm text-sm font-semibold py-2 px-4 text-white bg-app-brand -my-2.5 ml-5">
        Articles
      </button>
    </AnchorLink>
  </nav>
);
