import React from "react";
import { Seo } from "../components/seo";
import Layout from "../components/layout";
import { Link, graphql } from "gatsby";

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
        <Seo
          collectionItems={edges.map((edge) => edge.node.frontmatter)}
          title="React, React Native & Full-Stack Articles"
          description="Practical guides on React, React Native, Remix, Firebase, Stripe, and shipping production software — written by Edwards Moses."
          pathname="/articles/"
          pageType="CollectionPage"
        />

        <h1 className="page-heading">
          All <i>Articles</i>
        </h1>

        <div className="collection-note">
          Looking for stuff I’m reading from around the web?{"  "}
          <Link
            to="/blogroll"
            className="font-semibold underline decoration-current/30 underline-offset-4 transition-colors"
          >
            check this out.
          </Link>{" "}
        </div>

        <div className="relative">
          <div className="grid gap-7 mx-auto mt-10 md:grid-cols-2 lg:grid-cols-3">
            {Posts}
          </div>
        </div>
      </Layout>
    </>
  );
};

export const pageQuery = graphql`
  query ArticlesPageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date
            displayDate: date(formatString: "MMMM DD, YYYY")
            path
            title
            thumbnail
            metaDescription
            externalLink
          }
        }
      }
    }
  }
`;

export default Articles;
