import React from "react";
import Helmet from "react-helmet";
import Layout from "../components/layout";
import { SEO } from "../components/seo";
import { BLOGROLL_FEED_ENTRIES } from "../data/blogroll-feed";

const humanizeDate = (rawDate) => {
  if (!rawDate) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(rawDate));
};

const Blogroll = () => {
  const entries = [...BLOGROLL_FEED_ENTRIES].sort((entryA, entryB) => {
    return new Date(entryB.publishedAt) - new Date(entryA.publishedAt);
  });

  return (
    <Layout>
      <SEO />
      <Helmet>
        <title>Blogroll Feed | Edwards Moses</title>
      </Helmet>

      <section className="max-w-3xl mx-auto pb-14">
        <h1 className="mt-5 mb-4 text-3xl tracking-tight font-display font-medium sm:text-5xl">
          Blogroll <i>Feed</i>
        </h1>

        <ul className="m-0 list-none p-0 space-y-4">
          {entries.map((entry) => (
            <li
              key={`${entry.url}-${entry.publishedAt}`}
              className="rounded-xl border border-gray-200 px-5 py-3 dark:border-gray-700"
            >
              <a
                href={entry.url}
                target="_blank"
                rel="noreferrer"
                className="text-xl font-semibold underline decoration-app-brand-yellow underline-offset-4 hover:text-app-brand-yellow dark:text-app-brand-white"
              >
                {entry.url}
              </a>

              <p className="mb-0 mt-2 leading-7 text-app-black dark:text-gray-200">
                {entry.thoughts}
              </p>

              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                i shared on{" "}
                <time dateTime={entry.publishedAt}>
                  {humanizeDate(entry.publishedAt)}
                </time>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default Blogroll;
