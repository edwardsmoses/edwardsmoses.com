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
        className="object-cover w-full h-48"
        src={post.frontmatter.thumbnail}
        alt={post.frontmatter.title + "- Featured Shot"}
      />
    </div>
  );
};

const PostLinkHeader = ({ headingLevel: Heading = "h2", post }) => {
  const description = post.frontmatter.metaDescription || post.excerpt;

  return (
    <div className="block mt-2 space-y-2">
      <Heading className="text-xl font-semibold">
        {post.frontmatter.title}
      </Heading>
      {description && (
        <p className="text-sm text-gray-700 truncate text-ellipsis">
          {description}
        </p>
      )}
    </div>
  );
};

const PostLink = ({ headingLevel, post }) => {
  const mixpanel = useMixpanel();

  return (
    <article className="flex flex-col overflow-hidden rounded-lg shadow-lg">
      {post.frontmatter.thumbnail &&
        (post.frontmatter.externalLink ? (
          <a
            href={post.frontmatter.externalLink}
            target="_blank"
            rel="noreferrer"
          >
            <PostLinkImage post={post} />
          </a>
        ) : (
          <Link
            to={post.frontmatter.path}
            onClick={() => {
              mixpanel.track("viewedArticle", {
                articleTitle: post.frontmatter.title,
              });
            }}
          >
            <PostLinkImage post={post} />
          </Link>
        ))}

      <div className="flex flex-col justify-between flex-1 p-6 bg-white">
        <div className="flex-1">
          {post.frontmatter.externalLink ? (
            <a
              href={post.frontmatter.externalLink}
              target="_blank"
              rel="noreferrer"
              className="text-gray-900 hover:no-underline hover:text-app-brand-yellow"
            >
              <PostLinkHeader headingLevel={headingLevel} post={post} />
            </a>
          ) : (
            <Link
              to={post.frontmatter.path}
              className="text-gray-900 hover:no-underline hover:text-app-brand-yellow"
              onClick={() => {
                mixpanel.track("viewedArticle", {
                  articleTitle: post.frontmatter.title,
                });
              }}
            >
              <PostLinkHeader headingLevel={headingLevel} post={post} />
            </Link>
          )}
        </div>
        <div className="flex items-center mt-3">
          <div>
            <div className="flex space-x-1 text-xs text-gray-400">
              <time dateTime={post.frontmatter.date}>
                {" "}
                {post.frontmatter.displayDate}{" "}
              </time>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostLink;
