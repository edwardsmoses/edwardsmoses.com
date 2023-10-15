import React from "react";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { OutboundLink } from "gatsby-plugin-google-gtag"


export default (props) => (
  <nav className="navigation">
    <AnchorLink to="/#articles" className="font-medium border-b-2 border-black dark:border-white">
      Articles
    </AnchorLink>

    <a href="/about" className="font-medium">
      About
    </a>

    <OutboundLink href="https://portfolio.edwardsmoses.com/#projects" className="font-medium" target="_blank">
      Projects
    </OutboundLink>

    <OutboundLink href="https://calendly.com/edwardsmoses/30min" target="_blank" className="inline-flex justify-center rounded-sm text-sm font-semibold py-2 px-4 !text-white bg-app-brand -my-2.5 ml-5">
      Let's chat
    </OutboundLink>

  </nav>
);
