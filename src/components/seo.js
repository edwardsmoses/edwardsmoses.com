import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Helmet } from "react-helmet";

const cleanDescription = (value) => value?.replace(/\s+/g, " ").trim();

const absoluteUrl = (siteUrl, value = "/") => {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return new URL(value, `${siteUrl.replace(/\/$/, "")}/`).toString();
};

const isoDate = (value) => {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
};

export const Seo = ({
  article,
  collectionItems,
  description,
  image,
  noIndex = false,
  pageType = "WebPage",
  pathname = "/",
  title,
}) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query SeoMetadataQuery {
      site {
        siteMetadata {
          author
          description
          image
          personImage
          jobTitle
          knowsAbout
          location
          sameAs
          shortTitle
          siteUrl
          title
          twitterUsername
        }
      }
    }
  `);

  const siteUrl = siteMetadata.siteUrl.replace(/\/$/, "");
  const withTrailingSlash = (url) => {
    const [base, hash] = url.split("#");
    if (base === siteUrl || base === `${siteUrl}/`)
      return `${siteUrl}/` + (hash ? `#${hash}` : "");
    const slashed = base.endsWith("/") ? base : `${base}/`;
    return hash ? `${slashed}#${hash}` : slashed;
  };
  const canonicalUrl = withTrailingSlash(
    absoluteUrl(siteUrl, article?.path || pathname)
  );
  const pageTitle = article?.title || title;
  const metaTitle = pageTitle
    ? `${pageTitle} | ${siteMetadata.shortTitle}`
    : siteMetadata.title;
  const metaDescription =
    cleanDescription(
      description || article?.description || article?.metaDescription
    ) || siteMetadata.description;
  const requestedImage = image || article?.thumbnail || siteMetadata.image;
  const socialImage = /\.svg(?:[?#]|$)/i.test(requestedImage)
    ? siteMetadata.image
    : requestedImage;
  const imageUrl = absoluteUrl(siteUrl, socialImage);
  const defaultImageUrl = absoluteUrl(siteUrl, siteMetadata.image);
  const usesDefaultOgCard = imageUrl === defaultImageUrl;
  const publishedAt = isoDate(article?.date);
  const modifiedAt = isoDate(article?.updated);
  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;
  const webpageId = `${canonicalUrl}#webpage`;
  const articleId = article ? `${canonicalUrl}#article` : undefined;
  const personImageUrl = absoluteUrl(
    siteUrl,
    siteMetadata.personImage || siteMetadata.image
  );

  const person = {
    "@type": "Person",
    "@id": personId,
    name: siteMetadata.author,
    url: `${siteUrl}/`,
    image: {
      "@type": "ImageObject",
      url: personImageUrl,
    },
    jobTitle: siteMetadata.jobTitle,
    homeLocation: {
      "@type": "Place",
      name: siteMetadata.location,
    },
    sameAs: siteMetadata.sameAs,
    knowsAbout: siteMetadata.knowsAbout,
  };

  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    url: `${siteUrl}/`,
    name: siteMetadata.shortTitle,
    description: siteMetadata.description,
    inLanguage: "en",
    publisher: { "@id": personId },
  };

  const webpage = {
    "@type": pageType,
    "@id": webpageId,
    url: canonicalUrl,
    name: pageTitle || siteMetadata.title,
    description: metaDescription,
    inLanguage: "en",
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: imageUrl,
    },
  };

  if (pageType === "ProfilePage" || pageType === "AboutPage") {
    webpage.mainEntity = { "@id": personId };
  }

  const graph = [person, website, webpage];

  if (article) {
    webpage.mainEntity = { "@id": articleId };
    graph.push({
      "@type": "BlogPosting",
      "@id": articleId,
      url: canonicalUrl,
      headline: article.title,
      name: article.title,
      description: metaDescription,
      image: [imageUrl],
      inLanguage: "en",
      mainEntityOfPage: { "@id": webpageId },
      isPartOf: { "@id": websiteId },
      author: { "@id": personId },
      publisher: { "@id": personId },
      ...(publishedAt ? { datePublished: publishedAt } : {}),
      ...(modifiedAt ? { dateModified: modifiedAt } : {}),
    });
  }

  if (collectionItems?.length) {
    const itemListId = `${canonicalUrl}#articles`;
    webpage.mainEntity = { "@id": itemListId };
    graph.push({
      "@type": "ItemList",
      "@id": itemListId,
      itemListElement: collectionItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        url: item.externalLink
          ? absoluteUrl(siteUrl, item.externalLink)
          : withTrailingSlash(absoluteUrl(siteUrl, item.path)),
      })),
    });
  }

  if (canonicalUrl !== `${siteUrl}/`) {
    const breadcrumbItems = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteUrl}/`,
      },
    ];

    if (article) {
      breadcrumbItems.push({
        "@type": "ListItem",
        position: 2,
        name: "Articles",
        item: `${siteUrl}/articles/`,
      });
    }

    breadcrumbItems.push({
      "@type": "ListItem",
      position: breadcrumbItems.length + 1,
      name: pageTitle || siteMetadata.shortTitle,
      item: canonicalUrl,
    });

    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumb`,
      itemListElement: breadcrumbItems,
    });
  }

  return (
    <Helmet htmlAttributes={{ lang: "en" }}>
      <title>{metaTitle}</title>
      <link rel="canonical" href={canonicalUrl} />
      <meta name="description" content={metaDescription} />
      <meta name="author" content={siteMetadata.author} />
      {noIndex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      {usesDefaultOgCard && <meta property="og:image:width" content="1200" />}
      {usesDefaultOgCard && <meta property="og:image:height" content="630" />}
      <meta
        property="og:image:alt"
        content={pageTitle || siteMetadata.shortTitle}
      />
      <meta property="og:site_name" content={siteMetadata.shortTitle} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteMetadata.twitterUsername} />
      <meta name="twitter:creator" content={siteMetadata.twitterUsername} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta
        name="twitter:image:alt"
        content={pageTitle || siteMetadata.shortTitle}
      />

      {publishedAt && (
        <meta property="article:published_time" content={publishedAt} />
      )}
      {modifiedAt && (
        <meta property="article:modified_time" content={modifiedAt} />
      )}

      {!noIndex && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": graph,
          })}
        </script>
      )}
    </Helmet>
  );
};
