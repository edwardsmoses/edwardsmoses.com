import React from "react";
import { Helmet } from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

export const SEO = ({ article }) => {

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
      render={({ site }) => {

        const { siteUrl, title, description, author } = {
          "title": "Edwards Moses -  Web, Mobile - React & React Native Software Developer",
          "author": "Edwards Moses",
          "siteUrl": "https://edwardsmoses.com",
          "description": "I'm Edwards Moses from Lagos, Nigeria. I've 7+ years of professional experience as a Full-Stack Software Developer. I focus on developing Web & Mobile apps for companies using React & React Native."
        };

        // schema.org in JSONLD format
        // https://developers.google.com/search/docs/guides/intro-structured-data
        // You can fill out the 'author', 'creator' with more data or another type (e.g. 'Organization')

        const schemaOrgWebPage = {
          '@context': 'http://schema.org',
          '@type': 'WebPage',
          url: siteUrl,
          headline: title,
          inLanguage: "en-us",
          mainEntityOfPage: siteUrl,
          description: description,
          name: title,
          author: {
            '@type': 'Person',
            name: author,
          },
          copyrightHolder: {
            '@type': 'Person',
            name: author,
          },
          copyrightYear: new Date().getFullYear(),
          creator: {
            '@type': 'Person',
            name: author,
          },
          publisher: {
            '@type': 'Person',
            name: author,
          },
          image: {
            '@type': 'ImageObject',
            url: `${siteUrl}/assets/i.JPG`,
          },
        }

        // Initial breadcrumb list

        const itemListElement = [
          {
            '@type': 'ListItem',
            item: {
              '@id': siteUrl,
              name: 'Homepage',
            },
            position: 1,
          },
        ]

        let schemaArticle = null

        if (article) {
          schemaArticle = {
            '@context': 'http://schema.org',
            '@type': 'Article',
            author: {
              '@type': 'Person',
              name: author,
            },
            copyrightHolder: {
              '@type': 'Person',
              name: author,
            },
            copyrightYear: new Date().getFullYear(),
            creator: {
              '@type': 'Person',
              name: author,
            },
            publisher: {
              '@type': 'Person',
              name: author,
              logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/icons/edwards_moses_avatar.png`,
              },
            },
            datePublished: article.date,
            dateModified: article.date,
            description: article.description,
            headline: article.title,
            inLanguage: 'en-us',
            url: `${siteUrl}/${article.path}`,
            name: article.title,
            image: {
              '@type': 'ImageObject',
              url: `${siteUrl}/${article.thumbnail}`,
            },
            mainEntityOfPage: `${siteUrl}/${article.path}`,
          }

          // Push current blogpost into breadcrumb list
          itemListElement.push({
            '@type': 'ListItem',
            item: {
              '@id': `${siteUrl}/${article.path}`,
              name: article.title,
            },
            position: 2,
          })
        }

        const breadcrumb = {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          description: 'Breadcrumbs list',
          name: 'Breadcrumbs',
          itemListElement,
        }


        return (
          <>
            <Helmet>
              <title>{site.siteMetadata.title}</title>
              <meta name="description" content={site.siteMetadata.description} />
              <meta name="keywords" content="edwardsmoses,react developer,react native developer,build a mobile app, edwards moses, edwards, full stack developer, firebase developer,react native consultancy, app development, mobile app development, website development" />
              <meta property="og:title" content={site.siteMetadata.title} />
              <meta property="og:description" content={site.siteMetadata.description} />
              <meta property="og:type" content="website" />
              <meta name="twitter:title" content={site.siteMetadata.title} />
              <meta name="twitter:description" content={site.siteMetadata.description} />

              {!article && <script type="application/ld+json">{JSON.stringify(schemaOrgWebPage)}</script>}
              {article && <script type="application/ld+json">{JSON.stringify(schemaArticle)}</script>}
              <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>

            </Helmet>
          </>)
      }}
    />);
};