import React from "react";
import { Helmet } from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

export const SEO = () => {
    return (<StaticQuery
        query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            title
            description
            
          }
        }
      }
    `}
        render={({ site }) => (<>
            <Helmet>
                <title>{site.siteMetadata.title}</title>
                <meta name="description" content={site.siteMetadata.description} />
                <meta name="keywords" content="edwardsmoses,react developer,react native developer,build a mobile app, edwards moses, edwards, full stack developer, firebase developer" />
                <meta property="og:title" content={site.siteMetadata.title} />
                <meta property="og:description" content={site.siteMetadata.description} />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content={site.siteMetadata.title} />
                <meta name="twitter:description" content={site.siteMetadata.description} />
            </Helmet>
        </>)}
    />);
};