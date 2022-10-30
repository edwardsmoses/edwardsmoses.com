import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { Comment } from "../components/comment";
import { SEO } from "../components/seo";
import { InfoBlurb } from "../components/InfoBlurb";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;

  const commentBox = React.createRef();
  React.useEffect(() => {
    const scriptEl = document.createElement("script");
    scriptEl.async = true;
    scriptEl.src = "https://utteranc.es/client.js";
    scriptEl.setAttribute("repo", "edwardsmoses/edwardsmoses.com");
    scriptEl.setAttribute("issue-term", "title");
    scriptEl.setAttribute("id", "utterances");
    scriptEl.setAttribute("theme", "github-light");
    scriptEl.setAttribute("crossorigin", "anonymous");
    if (commentBox && commentBox.current) {
      commentBox.current.appendChild(scriptEl);
    } else {
      console.log(`Error adding utterances comments on: ${commentBox}`);
    }
  }, []);

  return (
    <Layout>
      <SEO article={frontmatter} />
      <div className="blog-post-container">
        <article className="post">
          {!frontmatter.thumbnail && (
            <div className="post-thumbnail">
              <h1 className="post-title">{frontmatter.title}</h1>
              <div className="post-meta">{frontmatter.date}</div>
            </div>
          )}
          {!!frontmatter.thumbnail && (
            <div className="post-thumbnail" style={{ backgroundImage: `url(${frontmatter.thumbnail})` }}>
              <h1 className="post-title">{frontmatter.title}</h1>
              <div className="post-meta">{frontmatter.date}</div>
            </div>
          )}
          <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: html }} />

          <div className="commentsWrapper">
            <h1 className="post-title">Comments</h1>
            <Comment commentBox={commentBox} />
          </div>

          <InfoBlurb />
        </article>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($path: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        thumbnail
        metaDescription
      }
    }
  }
`;
