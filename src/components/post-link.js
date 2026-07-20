import React from "react";
import { Link } from "gatsby";

import { useMixpanel } from "gatsby-plugin-mixpanel";

const PostLinkImage = ({ post }) => {
  if (!post.frontmatter.thumbnail) {
    return null;
  }

  return (
    <div className="flex-shrink-0">
      <img
        className="object-cover w-full h-48 image-outline article-card__image"
        src={post.frontmatter.thumbnail}
        alt={post.frontmatter.title}
      />
    </div>
  );
};

const PostLinkHeader = ({ headingLevel: Heading = "h2", post }) => {
  const description = post.frontmatter.metaDescription || post.excerpt;

  return (
    <div className="block space-y-2">
      <Heading className="m-0 text-xl font-semibold leading-7 text-balance">
        {post.frontmatter.title}
      </Heading>
      {description && (
        <p className="article-card__description">
          {description}
        </p>
      )}
    </div>
  );
};

const PostLink = ({ headingLevel, post }) => {
  const mixpanel = useMixpanel();
  const isExternal = Boolean(post.frontmatter.externalLink);
  const cardContent = (
    <>
      {post.frontmatter.thumbnail && <PostLinkImage post={post} />}

      <div className="article-card__body">
        <PostLinkHeader headingLevel={headingLevel} post={post} />
        <time className="article-card__date" dateTime={post.frontmatter.date}>
          {post.frontmatter.displayDate}
        </time>
      </div>
    </>
  );

  return (
    <article className="article-card">
      {isExternal ? (
        <a
          href={post.frontmatter.externalLink}
          target="_blank"
          rel="noreferrer"
          className="article-card__link group"
        >
          {cardContent}
        </a>
      ) : (
        <Link
          to={post.frontmatter.path}
          className="article-card__link group"
          onClick={() => {
            mixpanel.track("viewedArticle", {
              articleTitle: post.frontmatter.title,
            });
          }}
        >
          {cardContent}
        </Link>
      )}
    </article>
  );
};

export default PostLink;
