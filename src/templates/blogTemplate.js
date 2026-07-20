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
  const { excerpt, frontmatter, html } = markdownRemark;
  const articleDescription = frontmatter.metaDescription || excerpt;

  const commentBox = React.createRef();
  const canvasBox = React.createRef();

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

  React.useEffect(() => {
    const scriptEl = document.createElement("script");
    scriptEl.async = true;
    scriptEl.src = "/canvas.js";
    if (canvasBox && canvasBox.current) {
      canvasBox.current.appendChild(scriptEl);
    }
  }, []);

  return (
    <Layout>
      <SEO article={{ ...frontmatter, description: articleDescription }} />
      <div className="blog-post-container">
        <article className="post">
          <div className="blog-post-content-article-date">
            Published{" "}
            <time dateTime={frontmatter.date}>{frontmatter.displayDate}</time>
            {frontmatter.updated && (
              <>
                {" · "}Updated{" "}
                <time dateTime={frontmatter.updated}>
                  {frontmatter.displayUpdated}
                </time>
              </>
            )}
          </div>
          <h1 className="blog-post-content-article-title">
            {frontmatter.title}
          </h1>

          {!!frontmatter.thumbnail && (
            <div
              className="post-thumbnail blog-post-content-image"
              style={{ backgroundImage: `url(${frontmatter.thumbnail})` }}
            />
          )}
          <div
            className="prose blog-post-content lg:prose-xl dark:prose-invert dark:text-gray-300! blog-post-content-article"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <div className="commentsWrapper">
            <h2 className="post-title">Comments</h2>
            <Comment commentBox={commentBox} />
          </div>

          <InfoBlurb />
          <div ref={canvasBox} />
        </article>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ($path: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      excerpt(pruneLength: 160)
      html
      frontmatter {
        date
        displayDate: date(formatString: "MMMM DD, YYYY")
        updated
        displayUpdated: updated(formatString: "MMMM DD, YYYY")
        path
        title
        thumbnail
        metaDescription
      }
    }
  }
`;
