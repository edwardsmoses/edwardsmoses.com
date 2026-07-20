import React from "react";
import { OutboundLink } from "gatsby-plugin-google-gtag";
import { Link } from "gatsby";

import { useABTest } from "../hooks/useABTest";
import { WebsiteCopy } from "../copy/copy-constants";
import { useMixpanel } from "gatsby-plugin-mixpanel";

export default () => {
  const copy = WebsiteCopy.NavigationCallToAction.text_copies;
  const { copyVersion, handleTrackEvent } = useABTest(WebsiteCopy.NavigationCallToAction.tracked_events);

  const mixpanel = useMixpanel();

  return (
    <nav className="navigation">
      <Link
        to="/articles"
        className="navigation-link"
        activeClassName="navigation-link--active"
      >
        Articles
      </Link>

      <Link
        to="/blogroll"
        className="navigation-link"
        activeClassName="navigation-link--active"
      >
        Stuff I read
      </Link>

      <Link
        to="/about"
        className="navigation-link"
        activeClassName="navigation-link--active"
      >
        About me
      </Link>

      <OutboundLink
        onClick={() => {
          mixpanel.track("clickedMyPortfolio");
        }}
        href="https://portfolio.edwardsmoses.com/#projects"
        className="navigation-link"
        target="_blank"
        rel="noreferrer"
      >
        My Portfolio
      </OutboundLink>

      <OutboundLink
        href="https://calendly.com/edwardsmoses/30min"
        onClick={handleTrackEvent}
        target="_blank"
        rel="noreferrer"
        className="action-link action-link--primary navigation-cta"
      >
        {copy[copyVersion]}
      </OutboundLink>
    </nav>
  );
};
