import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import PostLink from "../components/post-link";
import { Hero_WorkWithMe } from "../components/heroWorkWithMe";
import { SEO } from "../components/seo";
import { MyServices } from "../components/myservices";

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter((edge) => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map((edge) => <PostLink key={edge.node.id} post={edge.node} />);

  return (
    <Layout header={<Hero_WorkWithMe />}>
      <SEO />

      <MyServices />

      <span className="mt-8 text-sm font-semibold leading-4 tracking-widest text-gray-500 uppercase">Edwards Moses</span>
      <h2 className="text-4xl font-bold text-gray-700">Blog Posts &darr;</h2>
      <div className="grids">{Posts}</div>
    </Layout>
  );
};

export default IndexPage;
export const pageQuery = graphql`
  query indexPageQuery {
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
          }
        }
      }
    }
  }
`;
