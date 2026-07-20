const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const publicPath = (...parts) => path.join(root, "public", ...parts);
const readPublic = (...parts) => fs.readFileSync(publicPath(...parts), "utf8");

const decodeHtml = (value = "") =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const tags = (html, tagName) =>
  html.match(new RegExp(`<${tagName}\\b[^>]*>`, "gi")) || [];

const attribute = (tag, name) => {
  const match = tag.match(new RegExp(`${name}="([^"]*)"`, "i"));
  return match ? decodeHtml(match[1]) : undefined;
};

const meta = (html, key) => {
  const tag = tags(html, "meta").find(
    (candidate) =>
      attribute(candidate, "name") === key ||
      attribute(candidate, "property") === key
  );
  return tag ? attribute(tag, "content") : undefined;
};

const canonical = (html) => {
  const links = tags(html, "link").filter(
    (candidate) => attribute(candidate, "rel") === "canonical"
  );
  assert.strictEqual(links.length, 1, "expected exactly one canonical link");
  return attribute(links[0], "href");
};

const title = (html) => {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? decodeHtml(match[1]) : undefined;
};

const jsonLd = (html) => {
  const documents = [];
  const pattern =
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  let match;

  while ((match = pattern.exec(html))) {
    documents.push(JSON.parse(decodeHtml(match[1])));
  }

  return documents;
};

const schemaTypes = (document) =>
  new Set((document["@graph"] || []).map((entry) => entry["@type"]));

const home = readPublic("index.html");
assert.strictEqual(
  title(home),
  "Edwards Moses | React & React Native Software Consultant"
);
assert.strictEqual(canonical(home), "https://edwardsmoses.com/");
assert.strictEqual(meta(home, "twitter:card"), "summary_large_image");
assert.strictEqual(meta(home, "og:url"), "https://edwardsmoses.com/");
assert.strictEqual(
  meta(home, "og:image"),
  "https://edwardsmoses.com/assets/i.JPG"
);
assert(home.includes("G-KPS455BYW5"), "GA4 measurement ID is missing");
assert(
  !home.includes("UA-86119661-11"),
  "legacy Universal Analytics ID remains"
);
assert(!home.includes("5392885394"), "duplicate numeric analytics ID remains");

const [homeSchema] = jsonLd(home);
assert(homeSchema, "homepage JSON-LD is missing");
assert(schemaTypes(homeSchema).has("Person"));
assert(schemaTypes(homeSchema).has("ProfilePage"));

const about = readPublic("about", "index.html");
assert.strictEqual(canonical(about), "https://edwardsmoses.com/about/");
assert.notStrictEqual(meta(about, "description"), meta(home, "description"));
assert(schemaTypes(jsonLd(about)[0]).has("AboutPage"));

const articles = readPublic("articles", "index.html");
assert.strictEqual(canonical(articles), "https://edwardsmoses.com/articles/");
const articleIndexTypes = schemaTypes(jsonLd(articles)[0]);
assert(articleIndexTypes.has("CollectionPage"));
assert(articleIndexTypes.has("ItemList"));
assert(!articles.includes("{post.frontmatter.date}"));
assert(/datetime="2026-04-12T23:59:59.203Z"/i.test(articles));

const publicRoutes = [
  ["blogroll", "https://edwardsmoses.com/blogroll/", "CollectionPage"],
  ["contact", "https://edwardsmoses.com/contact/", "ContactPage"],
  ["projects", "https://edwardsmoses.com/projects/", "CollectionPage"],
].map(([directory, url, pageType]) => {
  const html = readPublic(directory, "index.html");
  assert.strictEqual(canonical(html), url);
  assert(schemaTypes(jsonLd(html)[0]).has(pageType));
  if (directory === "blogroll") {
    assert(schemaTypes(jsonLd(html)[0]).has("ItemList"));
  }
  return html;
});

const routeDescriptions = [home, about, articles, ...publicRoutes].map((html) =>
  meta(html, "description")
);
assert.strictEqual(
  new Set(routeDescriptions).size,
  routeDescriptions.length,
  "public routes should have distinct meta descriptions"
);

const routeTitles = [home, about, articles, ...publicRoutes].map(title);
assert.strictEqual(
  new Set(routeTitles).size,
  routeTitles.length,
  "public routes should have distinct titles"
);

const article = readPublic("implementing-2fa-totp-with-remix", "index.html");
assert.strictEqual(
  canonical(article),
  "https://edwardsmoses.com/implementing-2fa-totp-with-remix"
);
assert.strictEqual(meta(article, "og:type"), "article");
assert(
  meta(article, "description").length > 50,
  "article excerpt fallback is too short"
);
assert.notStrictEqual(meta(article, "description"), meta(home, "description"));
assert.strictEqual(
  meta(article, "og:image"),
  "https://edwardsmoses.com/assets/totp/edwardsmoses.com_pexels-zulfugarkarimov-33440144.jpg"
);
assert.strictEqual((article.match(/<h1\b/gi) || []).length, 1);

const [articleSchema] = jsonLd(article);
const articleGraph = articleSchema["@graph"];
const blogPosting = articleGraph.find(
  (entry) => entry["@type"] === "BlogPosting"
);
const breadcrumbs = articleGraph.find(
  (entry) => entry["@type"] === "BreadcrumbList"
);
assert(blogPosting, "BlogPosting schema is missing");
assert(blogPosting.datePublished, "BlogPosting datePublished is missing");
assert(
  !blogPosting.dateModified,
  "dateModified must require an explicit updated date"
);
assert.strictEqual(breadcrumbs.itemListElement.length, 3);

const remoteImageArticle = readPublic(
  "personal-git-alias-faster-git-workflow",
  "index.html"
);
assert.strictEqual(
  meta(remoteImageArticle, "og:image"),
  "https://miro.medium.com/max/1400/1*oMC83-7fB27k1tTMxDfRaQ.png"
);

const svgThumbnailArticle = readPublic(
  "behind-the-scenes-working-with-me-as-my-client",
  "index.html"
);
assert.strictEqual(
  meta(svgThumbnailArticle, "og:image"),
  "https://edwardsmoses.com/assets/i.JPG"
);

const notFound = readPublic("404.html");
assert.strictEqual(meta(notFound, "robots"), "noindex, follow");
assert.strictEqual(
  jsonLd(notFound).length,
  0,
  "noindex pages should not emit JSON-LD"
);

for (const html of [home, about, articles, article, remoteImageArticle]) {
  assert(
    !html.includes("https://edwardsmoses.com//"),
    "double-slash site URL found"
  );
  assert(
    !html.includes("https://edwardsmoses.com/https://"),
    "external URL was prefixed with the site URL"
  );
}

assert(
  !fs.existsSync(
    publicPath("achieving-the-ckad-kubernetes-cert", "index.html")
  ),
  "external CKAD placeholder was generated as an indexable page"
);
assert(
  !fs.existsSync(publicPath("interview-with-go-solo", "index.html")),
  "external GoSolo placeholder was generated as an indexable page"
);

const redirects = readPublic("_redirects");
assert(
  /\/achieving-the-ckad-kubernetes-cert\s+https:\/\/www\.credly\.com\/badges\/0c002800-de62-452f-8ca6-cf0e9cb260f1\s+301/.test(
    redirects
  )
);
assert(
  /\/interview-with-go-solo\s+https:\/\/gosolo\.subkit\.com\/edwards-moses\/\s+301/.test(
    redirects
  )
);

const sitemap = readPublic("sitemap.xml");
assert(!sitemap.includes("<changefreq>"));
assert(!sitemap.includes("<priority>"));
assert(!sitemap.includes("/achieving-the-ckad-kubernetes-cert"));
assert(!sitemap.includes("/interview-with-go-solo"));
assert(!sitemap.includes("/404"));
assert(sitemap.includes("<lastmod>2026-04-12T23:59:59.203Z</lastmod>"));

const articleDescriptions = fs
  .readdirSync(path.join(root, "_data", "blog"))
  .filter((fileName) => fileName.endsWith(".md"))
  .map((fileName) =>
    fs.readFileSync(path.join(root, "_data", "blog", fileName), "utf8")
  )
  .filter((source) => !/^externalLink:/m.test(source))
  .map((source) => source.match(/^path:\s*(\S+)/m)[1].replace(/^\/|\/$/g, ""))
  .map((articlePath) =>
    meta(readPublic(articlePath, "index.html"), "description")
  );
assert.strictEqual(
  new Set(articleDescriptions).size,
  articleDescriptions.length,
  "article meta descriptions should be distinct"
);

console.log("SEO output checks passed.");
