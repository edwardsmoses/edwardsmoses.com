import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import PostLink from "../components/post-link";
import { Hero_WorkWithMe } from "../components/heroWorkWithMe";
import { SEO } from "../components/seo";
import { MyServices } from "../components/myservices";
import { Testimonials } from "../components/testimonial";

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

      <Testimonials />

      <h2 className="font-display text-3xl mt-16 tracking-tight sm:text-4xl">
        My <i>Articles</i>
      </h2>
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
