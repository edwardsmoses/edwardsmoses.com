import React from "react";
import Helmet from "react-helmet";
import { SEO } from "../components/seo";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import moment from "moment";

import Stories from "react-insta-stories";
import { STORIES_DATA } from "../utils/stories";

const AboutPage = ({ data }) => {
  const stories = STORIES_DATA.map((story) => {
    return {
      url: story.url,
      duration: 5000,
      header: {
        heading: story.heading,
        subheading: moment(new Date(story.dateAdded * 1000)).fromNow(),
      },
    };
  });

  return (
    <Layout>
      <SEO />
      <Helmet>
        <title>About — Edwards Moses</title>
      </Helmet>
      <div className="relative px-4 sm:px-8 lg:px-12">
        <div className="max-w-2xl mx-auto lg:max-w-5xl">
          <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
            <div className="lg:pl-20">
              <div className="max-w-xs px-2.5 lg:max-w-none">
                <img
                  src="/assets/i.JPG"
                  alt="Edwards Moses - Web & Mobile — React & React Native Consultant"
                  className="object-cover aspect-square rounded-2xl bg-zinc-100"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="lg:order-first lg:row-span-2">
              <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                I’m Edwards Moses. <br />I live in the beating heart of Lagos, Nigeria — where I build the future.
              </h1>
              <div className="mt-6 space-y-7 text-base text-zinc-600 dark:!text-zinc-100">
                <p>
                  My name is Edwards Moses. I’ve spent the last decade as a software developer building great products
                  for diverse industries (eCommerce, Sporting, eLearning, Legal, Logistics, Retail, and many others).
                </p>
                <p>
                  I spend my days as a freelancer Software Developer, working with teams to produce amazing products to
                  customer-centric problems. From conception through to completion, I love seeing how an idea evolves
                  into an app in the hands of the users.
                </p>
              </div>
              <div className="mt-6 space-y-3 text-base text-zinc-600 dark:!text-zinc-100">
                <hr />
                <h3>Credentials Collection 🎖️</h3>
                <ul className="text-sm list-disc list-inside text-slate-900 dark:text-app-brand-white">
                  <li>
                    Google Cloud Certified Professional Cloud Developer -{" "}
                    <a
                      className="text-blue-500"
                      href="https://google.accredible.com/cfd9602d-5a55-4631-bcad-d2600224d38b"
                      target="_blank"
                    >
                      Credential
                    </a>
                  </li>
                  <li>
                    Stripe Certified Professional Developer -{" "}
                    <a
                      className="text-blue-500"
                      href="https://stripecertifications.credential.net/a6e25aca-1787-47c6-95ff-ac12b4ff3cb4#gs.6h3r5a"
                      target="_blank"
                    >
                      Credential
                    </a>
                  </li>
                  <li>
                    McKinsey Forward Program -{" "}
                    <a
                      className="text-blue-500"
                      href="https://www.credly.com/badges/1b2ef4b5-29f3-4d8f-b5b4-f70691d51cdd/linked_in_profile"
                      target="_blank"
                    >
                      Credential
                    </a>
                  </li>
                </ul>
              </div>

              <div className="mt-6 space-y-3 text-base text-zinc-600  dark:!text-zinc-100">
                <hr />
                <h3>Stories</h3>
                <Stories stories={stories} loop keyboardNavigation />
              </div>
            </div>
            <div className="lg:pl-20">
              <ul role="list">
                <li className="flex">
                  <a
                    className="flex text-sm font-medium transition group text-zinc-800 dark:text-white hover:text-gray-500"
                    href="https://twitter.com/atedwardsmoses"
                    target="_blank"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      fill="currentColor"
                      className="flex-none w-6 h-6 transition"
                    >
                      <path d="M20.055 7.983c.011.174.011.347.011.523 0 5.338-3.92 11.494-11.09 11.494v-.003A10.755 10.755 0 0 1 3 18.186c.308.038.618.057.928.058a7.655 7.655 0 0 0 4.841-1.733c-1.668-.032-3.13-1.16-3.642-2.805a3.753 3.753 0 0 0 1.76-.07C5.07 13.256 3.76 11.6 3.76 9.676v-.05a3.77 3.77 0 0 0 1.77.505C3.816 8.945 3.288 6.583 4.322 4.737c1.98 2.524 4.9 4.058 8.034 4.22a4.137 4.137 0 0 1 1.128-3.86A3.807 3.807 0 0 1 19 5.274a7.657 7.657 0 0 0 2.475-.98c-.29.934-.9 1.729-1.713 2.233A7.54 7.54 0 0 0 22 5.89a8.084 8.084 0 0 1-1.945 2.093Z"></path>
                    </svg>
                    <span className="ml-4">Twitter</span>
                  </a>
                </li>

                <li className="flex mt-4">
                  <a
                    className="flex text-sm font-medium transition group text-zinc-800 dark:text-white hover:text-gray-500"
                    href="https://github.com/edwardsmoses"
                    target="_blank"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      fill="currentColor"
                      className="flex-none w-6 h-6 transition"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.475 2 2 6.588 2 12.253c0 4.537 2.862 8.369 6.838 9.727.5.09.687-.218.687-.487 0-.243-.013-1.05-.013-1.91C7 20.059 6.35 18.957 6.15 18.38c-.113-.295-.6-1.205-1.025-1.448-.35-.192-.85-.667-.013-.68.788-.012 1.35.744 1.538 1.051.9 1.551 2.338 1.116 2.912.846.088-.666.35-1.115.638-1.371-2.225-.256-4.55-1.14-4.55-5.062 0-1.115.387-2.038 1.025-2.756-.1-.256-.45-1.307.1-2.717 0 0 .837-.269 2.75 1.051.8-.23 1.65-.346 2.5-.346.85 0 1.7.115 2.5.346 1.912-1.333 2.75-1.05 2.75-1.05.55 1.409.2 2.46.1 2.716.637.718 1.025 1.628 1.025 2.756 0 3.934-2.337 4.806-4.562 5.062.362.32.675.936.675 1.897 0 1.371-.013 2.473-.013 2.82 0 .268.188.589.688.486a10.039 10.039 0 0 0 4.932-3.74A10.447 10.447 0 0 0 22 12.253C22 6.588 17.525 2 12 2Z"
                      ></path>
                    </svg>
                    <span className="ml-4">GitHub</span>
                  </a>
                </li>
                <li className="flex mt-4">
                  <a
                    className="flex text-sm font-medium transition group text-zinc-800 dark:text-white hover:text-gray-500"
                    href="https://www.linkedin.com/in/edwards-moses/"
                    target="_blank"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="flex-none w-6 h-6 transition">
                      <path d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z"></path>
                    </svg>
                    <span className="ml-4">LinkedIn</span>
                  </a>
                </li>

                <li className="flex pt-8 mt-8 border-t border-zinc-100 dark:border-zinc-700/40">
                  <a
                    className="flex text-sm font-medium transition group text-zinc-800 dark:text-white hover:text-gray-500"
                    href="mailto:hi@edwardsmoses.com"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      fill="currentColor"
                      className="flex-none w-6 h-6 transition"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
                      ></path>
                    </svg>
                    <span className="ml-4">hi@edwardsmoses.com</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;

export const pageQuery = graphql`
  query AboutPageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
