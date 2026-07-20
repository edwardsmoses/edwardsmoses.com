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
            <Link to="/" aria-label="Edwards Moses — home">
              <img
                className="image-outline"
                src="/assets/edwards_moses_avatar.png"
                alt=""
              />
              <span className="text-2xl font-semibold tracking-tighter">
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
