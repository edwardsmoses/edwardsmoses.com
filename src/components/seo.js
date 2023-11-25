import React from "react";
import { Helmet } from "react-helmet";
import { StaticQuery, graphql } from "gatsby";
import moment from 'moment';

export const SEO = ({ article, articlesList }) => {
  return (
    <StaticQuery
      query={graphql`
        query HeadingQuery {
          site {
            siteMetadata {
              title
              description
              siteUrl
              author
            }
          }
        }
      `}
      render={({}) => {
        const { siteUrl, title, articleTitle, description, author } = {
          title: "Edwards Moses -  Web, Mobile - React & React Native Software Developer",
          articleTitle: article?.title,
          author: "Edwards Moses",
          siteUrl: "https://edwardsmoses.com",
          description:
            article?.metaDescription ||
            "I'm Edwards Moses from Lagos, Nigeria. I've 7+ years of professional experience as a Full-Stack Software Developer. I focus on developing Web & Mobile apps for companies using React & React Native.",
        };

        // schema.org in JSONLD format
        // https://developers.google.com/search/docs/guides/intro-structured-data
        // You can fill out the 'author', 'creator' with more data or another type (e.g. 'Organization')

        const schemaOrgWebPage = {
          "@context": "http://schema.org",
          "@type": "WebPage",
          url: siteUrl,
          headline: title,
          inLanguage: "en-us",
          mainEntityOfPage: siteUrl,
          description: description,
          name: title,
          author: {
            "@type": "Person",
            name: author,
          },
          copyrightHolder: {
            "@type": "Person",
            name: author,
          },
          copyrightYear: new Date().getFullYear(),
          creator: {
            "@type": "Person",
            name: author,
          },
          publisher: {
            "@type": "Person",
            name: author,
          },
          image: {
            "@type": "ImageObject",
            url: `${siteUrl}/assets/i.JPG`,
          },
        };

        // Initial breadcrumb list

        const itemListElement = [
          {
            "@type": "ListItem",
            item: {
              "@id": siteUrl,
              name: "Homepage",
            },
            position: 1,
          },
        ];

        let schemaArticle = null;
        let schemaArticleList = null;

        if (article) {
          schemaArticle = {
            "@context": "http://schema.org",
            "@type": "Article",
            author: {
              "@type": "Person",
              name: author,
              url: `${siteUrl}`,
            },
            copyrightHolder: {
              "@type": "Person",
              name: author,
            },
            copyrightYear: moment(article.date).year(),
            creator: {
              "@type": "Person",
              name: author,
            },
            publisher: {
              "@type": "Person",
              name: author,
              logo: {
                "@type": "ImageObject",
                url: `${siteUrl}/icons/edwards_moses_avatar.png`,
              },
            },
            datePublished:moment(article.date).format('YYYY-MM-DDTHH:mm:ssZ'),
            dateModified: moment(article.date).format('YYYY-MM-DDTHH:mm:ssZ'),
            description: article.description || article.metaDescription,
            headline: article.title,
            inLanguage: "en-us",
            url: `${siteUrl}/${article.path}`,
            name: article.title,
            image: {
              "@type": "ImageObject",
              url: `${siteUrl}/${article.thumbnail}`,
            },
            mainEntityOfPage: `${siteUrl}/${article.path}`,
          };

          // Push current blogpost into breadcrumb list
          itemListElement.push({
            "@type": "ListItem",
            item: {
              "@id": `${siteUrl}/${article.path}`,
              name: article.title,
            },
            position: 2,
          });
        }

        if (articlesList) {
          schemaArticleList = articlesList.map((artC) => {
            return {
              "@context": "http://schema.org",
              "@type": "Article",
              author: {
                "@type": "Person",
                name: author,
                url: `${siteUrl}`,
              },
              copyrightHolder: {
                "@type": "Person",
                name: author,
              },
              copyrightYear: moment(artC.date).year(),
              creator: {
                "@type": "Person",
                name: author,
              },
              publisher: {
                "@type": "Person",
                name: author,
                logo: {
                  "@type": "ImageObject",
                  url: `${siteUrl}/icons/edwards_moses_avatar.png`,
                },
              },
              datePublished: moment(artC.date).format('YYYY-MM-DDTHH:mm:ssZ'),
              dateModified: moment(artC.date).format('YYYY-MM-DDTHH:mm:ssZ'),
              description: artC.description || artC.metaDescription,
              headline: artC.title,
              inLanguage: "en-us",
              url: `${siteUrl}/${artC.path}`,
              name: artC.title,
              image: {
                "@type": "ImageObject",
                url: `${siteUrl}/${artC.thumbnail}`,
              },
              mainEntityOfPage: `${siteUrl}/${artC.path}`,
            };
          });

          // Push articles page into breadcrumb list
          itemListElement.push({
            "@type": "ListItem",
            item: {
              "@id": `${siteUrl}/articles`,
              name: "All Article",
            },
            position: 2,
          });
        }

        const breadcrumb = {
          "@context": "http://schema.org",
          "@type": "BreadcrumbList",
          description: "Breadcrumbs list",
          name: "Breadcrumbs",
          itemListElement,
        };

        const siteTitle = `${articleTitle ? `${articleTitle} • ` : ""} ${title}`;

        return (
          <>
            <Helmet>
              <title>{siteTitle}</title>
              <meta name="description" content={description} />
              <meta
                name="keywords"
                content="edwardsmoses,react developer,react native developer,build a mobile app, edwards moses, edwards, full stack developer, firebase developer,react native consultancy, app development, mobile app development, website development"
              />
              <meta property="og:title" content={siteTitle} />
              <meta property="og:description" content={description} />
              <meta property="og:type" content="website" />
              <meta name="twitter:title" content={siteTitle} />
              <meta name="twitter:description" content={description} />

              {!article && <script type="application/ld+json">{JSON.stringify(schemaOrgWebPage)}</script>}
              {article && <script type="application/ld+json">{JSON.stringify(schemaArticle)}</script>}
              {articlesList && <script type="application/ld+json">{JSON.stringify(schemaArticleList)}</script>}
              <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
            </Helmet>
          </>
        );
      }}
    />
  );
};
