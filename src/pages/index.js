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
    .sort(
      (a, b) =>
        new Date(b.node.frontmatter.date) - new Date(a.node.frontmatter.date),
    ) // Sort posts by date, newest first
    .slice(0, 6) // Display only the recent six posts
    .map((edge) => (
      <PostLink key={edge.node.id} post={edge.node} headingLevel="h3" />
    ));

  return (
    <Layout header={<Hero_WorkWithMe />}>
      <SEO pageType="ProfilePage" />

      <section id="articles" className="pb-16">
        <h2 className="mt-0 text-3xl tracking-tight text-balance font-display sm:text-4xl">
          Recent <i>Articles</i>
        </h2>
        <div className="grid gap-7 mx-auto mt-10 md:grid-cols-2 lg:grid-cols-3">
          {Posts}
        </div>

        <div className="flex justify-center mb-5 mt-12">
          <Link
            to="/articles"
            onClick={() => {
              mixpanel.track("viewedAllArticles");
            }}
            className="action-link action-link--gold mx-auto md:px-14"
          >
            View all articles <span aria-hidden="true">→</span>
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
