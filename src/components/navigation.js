import React from "react";
import { OutboundLink } from "gatsby-plugin-google-gtag";
import { Link } from "gatsby";

import { useMixpanel } from "gatsby-plugin-mixpanel";

export default (props) => {
  const mixpanel = useMixpanel();

  return (
    <nav className="navigation">
      <Link
        to="/articles"
        className="text-xs font-medium lg:text-base whitespace-nowrap"
        activeClassName="font-bold !text-app-black dark:!text-white"
      >
        Articles
      </Link>

      <Link
        to="/about"
        className="text-xs font-medium lg:text-base whitespace-nowrap"
        activeClassName="font-bold !text-app-black dark:!text-white"
      >
        About me
      </Link>

      <OutboundLink
        href="https://portfolio.edwardsmoses.com/#projects"
        className="text-xs font-medium lg:text-base whitespace-nowrap"
        target="_blank"
      >
        My Portfolio
      </OutboundLink>

      <OutboundLink
        href="https://calendly.com/edwardsmoses/30min"
        onClick={() => {
          mixpanel.track("clickedLetsChat");
        }}
        target="_blank"
        className="text-xs whitespace-nowrap lg:text-base inline-flex justify-center rounded-sm font-semibold py-2 px-4 !text-app-brand-white bg-app-brand dark:bg-app-brand-white dark:!text-black -my-2.5 ml-5"
      >
        Let's chat
      </OutboundLink>
    </nav>
  );
};
