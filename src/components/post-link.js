import React from "react";
import { Link } from "gatsby";

const PostLink = ({ post }) => (
  <>
    <article className="flex flex-col rounded-lg shadow-lg overflow-hidden">
      <Link to={post.frontmatter.path}>
        <div className="flex-shrink-0">
          <img
            className="h-48 w-full object-cover"
            src={post.frontmatter.thumbnail}
            alt={post.frontmatter.title + "- Featured Shot"}
          />
        </div>
      </Link>

      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <Link to={post.frontmatter.path} className="text-gray-900 hover:no-underline hover:text-app-brand-yellow">
            <p className="block mt-2">
              <p className="text-xl font-semibold">{post.frontmatter.title}</p>
            </p>
          </Link>
        </div>
        <div className="mt-3 flex items-center">
          <div>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime="{post.frontmatter.date}"> {post.frontmatter.date} </time>
            </div>
          </div>
        </div>
      </div>
    </article>
  </>
);
export default PostLink;
