import React from "react";
import { Link } from "gatsby";

import { useMixpanel } from "gatsby-plugin-mixpanel";

const PostLinkImage = ({ post }) => {
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

const PostLinkHeader = ({ post }) => {
  return (
    <p className="block mt-2 space-y-2">
      <h2 className="text-xl font-semibold">{post.frontmatter.title}</h2>
      {post.frontmatter.metaDescription && (
        <p className="text-sm text-gray-700 truncate text-ellipsis">{post.frontmatter.metaDescription}</p>
      )}
    </p>
  );
};

const PostLink = ({ post }) => {
  const mixpanel = useMixpanel();

  return (
    <>
      <article className="flex flex-col overflow-hidden rounded-lg shadow-lg">
        {post.frontmatter.externalLink ? (
          <a href={post.frontmatter.externalLink} target="blank">
            <PostLinkImage post={post} />
          </a>
        ) : (
          <Link
            to={post.frontmatter.path}
            onClick={() => {
              mixpanel.track("viewedArticle", { "articleTitle": post.frontmatter.title });
            }}
          >
            <PostLinkImage post={post} />
          </Link>
        )}

        <div className="flex flex-col justify-between flex-1 p-6 bg-white">
          <div className="flex-1">
            {post.frontmatter.externalLink ? (
              <a
                href={post.frontmatter.externalLink}
                target="blank"
                className="text-gray-900 hover:no-underline hover:text-app-brand-yellow"
              >
                <PostLinkHeader post={post} />
              </a>
            ) : (
              <Link
                to={post.frontmatter.path}
                className="text-gray-900 hover:no-underline hover:text-app-brand-yellow"
                onClick={() => {
                  mixpanel.track("viewedArticle", { "articleTitle": post.frontmatter.title });
                }}
              >
                <PostLinkHeader post={post} />
              </Link>
            )}
          </div>
          <div className="flex items-center mt-3">
            <div>
              <div className="flex space-x-1 text-xs text-gray-400">
                <time dateTime="{post.frontmatter.date}"> {post.frontmatter.date} </time>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default PostLink;
