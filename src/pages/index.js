import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import PostLink from "../components/post-link";
import { Hero_WorkWithMe } from "../components/heroWorkWithMe";
import { SEO } from "../components/seo";
import { MyServices } from "../components/myservices";
import { Testimonials } from "../components/testimonial";

import { useMixpanel } from "gatsby-plugin-mixpanel";

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const mixpanel = useMixpanel();

  const Posts = edges
    .filter((edge) => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .sort((a, b) => new Date(b.node.frontmatter.date) - new Date(a.node.frontmatter.date)) // Sort posts by date, newest first
    .slice(0, 6) // Display only the recent six posts
    .map((edge) => <PostLink key={edge.node.id} post={edge.node} />);

  return (
    <Layout
      header={
        <div className="-mt-16">
          <Hero_WorkWithMe />
        </div>
      }
    >
      <SEO />

      <section id="articles" className="pb-10 -mt-24">
        <h2 className="mt-16 text-3xl tracking-tight font-display sm:text-4xl">
          Recent <i>Articles</i>
        </h2>
        <div className="grid gap-8 mx-auto mt-12 lg:grid-cols-3">{Posts}</div>

        <div className="flex justify-center mb-5 mt-14">
          <Link
            to="/articles"
            onClick={() => {
              mixpanel.track("viewedAllArticles");
            }}
            className="flex items-center justify-center px-8 py-3 mx-auto text-xl font-medium border border-transparent rounded-md bg-app-brand-yellow text-app-brand-white md:py-4 md:text-lg md:px-20 min-w-min hover:no-underline hover:opacity-80 "
          >
            View all articles {"->"}
          </Link>
        </div>
      </section>

      <MyServices />

      <Testimonials />
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
            metaDescription
            externalLink
          }
        }
      }
    }
  }
`;
