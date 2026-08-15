const path = require(`path`);

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type MarkdownRemarkFrontmatter {
      updated: Date @dateformat
    }
  `);
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage, createRedirect } = actions;

  const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`);

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 1000) {
        edges {
          node {
            id
            frontmatter {
              externalLink
              path
            }
          }
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const { externalLink, path: pagePath } = node.frontmatter;

    if (externalLink) {
      createRedirect({
        fromPath: pagePath,
        toPath: externalLink,
        isPermanent: true,
        redirectInBrowser: true,
      });
      return;
    }

    createPage({
      path: pagePath,
      component: blogPostTemplate,
      context: {
        frontmatterPath: pagePath,
      },
    });
  });
};
