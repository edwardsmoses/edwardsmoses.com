import React from "react";
import { Link } from "gatsby";

const PostLink = ({ post }) => (
  <>
    <article class="flex flex-col rounded-lg shadow-lg overflow-hidden">
      <Link to={post.frontmatter.path}>
        <div class="flex-shrink-0">
          <img
            class="h-48 w-full object-cover"
            src={post.frontmatter.thumbnail}
            alt={post.frontmatter.title + "- Featured Shot"}
          />
        </div>
      </Link>

      <div class="flex-1 bg-white p-6 flex flex-col justify-between">
        <div class="flex-1">
          <Link to={post.frontmatter.path} className="text-gray-900 hover:no-underline hover:text-app-brand-yellow">
            <p class="block mt-2">
              <p class="text-xl font-semibold">{post.frontmatter.title}</p>
            </p>
          </Link>
        </div>
        <div class="mt-3 flex items-center">
          <div>
            <div class="flex space-x-1 text-sm text-gray-500">
              <time datetime="{post.frontmatter.date}"> {post.frontmatter.date} </time>
            </div>
          </div>
        </div>
      </div>
    </article>
  </>
);
export default PostLink;
