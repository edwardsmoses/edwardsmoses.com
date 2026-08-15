/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const normalizePagePath = (pagePath) => {
  if (pagePath === "/") {
    return pagePath;
  }

  return `/${pagePath.replace(/^\/+|\/+$/g, "")}`;
};

const resolveSitemapPages = ({ allSitePage, allMarkdownRemark }) => {
  const postsByPath = new Map(
    allMarkdownRemark.nodes
      .filter(({ frontmatter }) => frontmatter && frontmatter.path)
      .map(({ frontmatter }) => [
        normalizePagePath(frontmatter.path),
        frontmatter,
      ]),
  );

  return allSitePage.nodes
    .filter(({ path }) => {
      const post = postsByPath.get(normalizePagePath(path));
      return !post || !post.externalLink;
    })
    .map(({ path }) => {
      const post = postsByPath.get(normalizePagePath(path));
      const lastmodISO = post && (post.updated || post.date);

      return {
        path,
        ...(lastmodISO ? { lastmodISO } : {}),
      };
    });
};

const serializeSitemap = ({ path, lastmodISO }) => ({
  url: path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}/`,
  ...(lastmodISO ? { lastmodISO } : {}),
});

module.exports = {
  /* Your site config here */
  trailingSlash: "always",
  siteMetadata: require("./site-meta-data.json"),
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/_data`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-prismjs-copy-button",
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
          {
            resolve: "gatsby-remark-emojis",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Edwards Moses`,
        short_name: `EdwardsMoses`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#381696`,
        display: `standalone`,
        icon: "src/images/edwards_moses_avatar.png",
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: `https://edwardsmoses.com`,
        sitemap: `https://edwardsmoses.com/sitemap-index.xml`,
        policy: [
          { userAgent: "*", allow: "/", disallow: ["/confirmation", "/admin"] },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-KPS455BYW5", // Google Analytics 4
          "AW-10977570295", // Google Ads
        ],
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
        },
      },
    },
    {
      resolve: "gatsby-plugin-mixpanel",
      options: {
        apiToken: "4486b11e469d4b4420462814dbdcadc6",
        enableOnDevMode: true,
        pageViews: "all",
        trackPageViewsAs: "Page view",
      },
    },
    "gatsby-plugin-netlify",
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: [`/admin`, `/admin/**`],
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
            allMarkdownRemark {
              nodes {
                frontmatter {
                  date
                  externalLink
                  path
                  updated
                }
              }
            }
          }
        `,
        resolvePages: resolveSitemapPages,
        serialize: serializeSitemap,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-postcss`, //Plugin for integrating POSTCss and Tailwind....
  ],
};
