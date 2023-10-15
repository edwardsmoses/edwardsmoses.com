import React from "react";
import Helmet from "react-helmet";
import { SEO } from "../components/seo";
import Layout from "../components/layout";
import { graphql } from "gatsby";

import PostLink from "../components/post-link";

const Articles = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter((edge) => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map((edge) => <PostLink key={edge.node.id} post={edge.node} />);

  return (
    <>
      <Layout>
        <SEO />
        <Helmet>
          <title>All Articles | Edwards Moses</title>
        </Helmet>

        <h2 className="mt-5 mb-3 text-3xl tracking-tight font-display font-medium ml-5 sm:text-4xl border-b border-gray-300 pb-1 pl-1">
          All <i>Articles</i>
        </h2>


        <div className="relative">
          <div className="grid gap-8 mx-auto mt-12 lg:grid-cols-3">{Posts}</div>
        </div>
      </Layout>
    </>
  );
}

export const pageQuery = graphql`
  query ArticlesPageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            thumbnail
            externalLink
          }
        }
      }
    }
  }
`;


export default Articles;