/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
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
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-86119661-11",
        head: true,
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
    `gatsby-plugin-smoothscroll`,
    `gatsby-plugin-anchor-links`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-react-helmet-canonical-urls`,
      options: {
        siteUrl: `https://edwardsmoses.com`,
      },
    },
    {
      resolve: "gatsby-plugin-load-script",
      options: {
        src: "/gradient.js",
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: `https://edwardsmoses.com`,
        sitemap: `https://edwardsmoses.com/sitemap.xml`,
        policy: [{ userAgent: "*", allow: "/", disallow: ["/confirmation", "/admin"] }],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "UA-86119661-11", // Google Analytics / GA
          "AW-10977570295", // Google Ads / Adwords / AW
          "G-KPS455BYW5", //GA4 Measurement iD
          "5392885394", //GA4 Stream ID
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
        trackPageViewsAs: 'Page view',
      },
    },
    `gatsby-plugin-netlify-cms`,
    "gatsby-plugin-netlify",
    "gatsby-plugin-dark-mode",
    // siteURL is a must for sitemap generation
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-postcss`, //Plugin for integrating POSTCss and Tailwind....
  ],
};
