import React from "react";
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { Link } from "gatsby";

export default (props) => (
  <nav className="navigation">
    <Link to="/articles" className="font-medium" activeClassName="font-bold !text-app-black ">
      Articles
    </Link>

    <Link to="/about" className="font-medium" activeClassName="font-bold !text-app-black">
      About
    </Link>

    <OutboundLink href="https://portfolio.edwardsmoses.com/#projects" className="font-medium" target="_blank">
      Projects
    </OutboundLink>

    <OutboundLink href="https://calendly.com/edwardsmoses/30min" target="_blank" className="inline-flex justify-center rounded-sm text-sm font-semibold py-2 px-4 !text-white bg-app-brand -my-2.5 ml-5">
      Let's chat
    </OutboundLink>

  </nav>
);
