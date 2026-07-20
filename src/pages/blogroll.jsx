import React from "react";
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
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(rawDate));
};

const Blogroll = () => {
  const entries = [...BLOGROLL_FEED_ENTRIES].sort((entryA, entryB) => {
    return new Date(entryB.publishedAt) - new Date(entryA.publishedAt);
  });

  return (
    <Layout>
      <SEO
        collectionItems={entries.map((entry) => ({
          externalLink: entry.url,
          title: entry.url,
        }))}
        title="Stuff I Read — Engineering & Product Notes"
        description="A curated log of engineering, product and business writing Edwards Moses found useful, with short notes on why each piece was worth reading."
        pathname="/blogroll/"
        pageType="CollectionPage"
      />

      <section className="max-w-3xl mx-auto pb-14">
        <h1 className="mt-5 mb-2 text-3xl font-medium tracking-tight text-balance font-display sm:text-5xl">
          Stuff I read and found <i>interesting</i>
        </h1>
        <p className="mb-10 text-sm leading-6 text-gray-600 text-pretty dark:text-gray-300">
          the initial title on this was 'blogroll feed', but that felt too
          generic. <br />
          this section is really just a brain-dump of interesting stuff i found,
          even stuff i don't fully understand, and my thoughts on them.
        </p>

        <ul className="m-0 list-none p-0 space-y-4">
          {entries.map((entry) => (
            <li
              key={`${entry.url}-${entry.publishedAt}`}
              className="reading-card"
            >
              <a
                href={entry.url}
                target="_blank"
                rel="noreferrer"
                className="reading-card__link"
              >
                {entry.url}
              </a>

              <p className="mb-0 mt-3 text-base leading-6 text-app-black text-pretty dark:text-gray-200">
                {entry.thoughts}
              </p>

              <div className="mt-2 text-xs text-gray-600 tabular-nums dark:text-gray-400">
                i shared on{" "}
                <time dateTime={entry.publishedAt}>
                  {humanizeDate(entry.publishedAt)}
                </time>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-16 text-[11px] leading-5 text-gray-600 italic dark:text-gray-300">
          ps: coded and added early morning at 1:50AM on a Valentine morning.. i
          wonder how long this text will be here.
        </p>
      </section>
    </Layout>
  );
};

export default Blogroll;
