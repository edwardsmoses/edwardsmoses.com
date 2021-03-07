import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

import Navigation from "../components/navigation";
import "prismjs/themes/prism-okaidia.css";

export default ({ children, header }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );
  return (
    <>
      <div className="site-wrapper topSiteWrapper">
        <header className="site-header">
          <div className="site-title">
            <Link to="/">{data.site.siteMetadata.title}</Link>
          </div>
          <Navigation />
        </header>
      </div>

      {header ? <div>{header}</div> : null}

      <div className="site-wrapper">
        {children}
        <footer className="site-footer">
          <p>
            &copy; {new Date().getFullYear()} &bull; Edwards Moses &bull;
            Crafted with{" "}
            <span role="img" aria-label="love">
              ❤️
            </span>
          </p>
        </footer>
      </div>
    </>
  );
};
