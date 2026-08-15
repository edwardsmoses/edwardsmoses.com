import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { Comment } from "../components/comment";
import { Seo } from "../components/seo";
import { InfoBlurb } from "../components/InfoBlurb";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { excerpt, frontmatter, html } = markdownRemark;
  const articleDescription = frontmatter.metaDescription || excerpt;

  const commentBox = React.useRef(null);
  const canvasBox = React.useRef(null);

  React.useEffect(() => {
    const scriptEl = document.createElement("script");
    scriptEl.async = true;
    scriptEl.src = "https://utteranc.es/client.js";
    scriptEl.setAttribute("repo", "edwardsmoses/edwardsmoses.com");
    scriptEl.setAttribute("issue-term", "title");
    scriptEl.setAttribute("id", "utterances");
    scriptEl.setAttribute("theme", "github-light");
    scriptEl.setAttribute("crossorigin", "anonymous");
    const commentContainer = commentBox.current;
    if (!commentContainer) {
      return undefined;
    }

    commentContainer.appendChild(scriptEl);

    return () => scriptEl.remove();
  }, []);

  React.useEffect(() => {
    const scriptEl = document.createElement("script");
    scriptEl.async = true;
    scriptEl.src = "/canvas.js";
    const canvasContainer = canvasBox.current;
    if (!canvasContainer) {
      return undefined;
    }

    canvasContainer.appendChild(scriptEl);

    return () => scriptEl.remove();
  }, []);

  return (
    <Layout>
      <Seo article={{ ...frontmatter, description: articleDescription }} />
      <div className="blog-post-container">
        <article className="post">
          <div className="blog-post-content-article-date tabular-nums">
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
          <h1 className="blog-post-content-article-title text-balance">
            {frontmatter.title}
          </h1>

          {!!frontmatter.thumbnail && (
            <div
              className="post-thumbnail blog-post-content-image image-outline"
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
  query ($frontmatterPath: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { path: { eq: $frontmatterPath } }) {
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
