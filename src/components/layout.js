import React from "react";
import { Link } from "gatsby";

import Footer from "../components/footer";

import Navigation from "../components/navigation";
import "prismjs/themes/prism-okaidia.css";

export default ({ children, header }) => {
 
  return (
    <>
      <div className="site-wrapper topSiteWrapper">
        <header className="site-header">
          <div className="site-title">
            <Link to="/">
              <img className="h-16" src="/icons/avatar.png" alt="Edwards Moses Avatar" />
              <span className="text-app-black font-bold text-2xl capitalize">
                Edwards Moses
              </span>
            </Link>
          </div>
          <Navigation />
        </header>
      </div>

      {header ? <div>{header}</div> : null}

      <div className="site-wrapper">
        {children}
        <Footer />
      </div>
    </>
  );
};
