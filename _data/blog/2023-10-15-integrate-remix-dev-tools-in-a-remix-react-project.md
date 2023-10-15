---
template: BlogPost
path: /integrating-remix-dev-tools-into-a-remix-react-app
date: 2023-10-15T08:33:01.203Z
title: Integrate Remix Dev Tools into a Remix React app
thumbnail: /assets/edwardsmoses-remix-react-dev-tools.png
---

<!--StartFragment-->

## Introduction

I recently came across [Remix Dev Tools](https://github.com/Code-Forge-Net/Remix-Dev-Tools), and it's improved my developer experience significantly with Remix.

In this article, I'll  delve into its setup, building upon a [previous article](https://edwardsmoses.com/guide-to-accepting-payments-with-stripe-in-remix-run), where I discussed integrating Stripe into a Remix project.

## Prerequisites

- Basic understanding of how a Remix application is structured.

## Why Remix Dev Tools?

According to the [repo](https://github.com/Code-Forge-Net/Remix-Dev-Tools), Remix Development Tools is an open-source package designed to enhance the Remix development experience.

In my experience, it gives me insight into the application behavior; whether I'm observing loader data for routes, scrutinizing server logs, or examining route information, it's been invaluable.

## Diving into Remix Dev Tools

To kickstart the integration, we'll first need to incorporate Remix Dev Tools into your project.

We start by installing the dev-tools package:

``` bash
npm install remix-development-tools -D
```

Next, we'd want to setup the styling for the Remix Dev Tools, we'd want to add the following to the `root.tsx` file:

```javascript

import rdtStylesheet from "remix-development-tools/index.css"; 

export const links: LinksFunction = () => {
  const linksWithoutDev = [...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : [])];
  return [
    ...linksWithoutDev,
    ...(process.env.NODE_ENV === "development" ? [{ rel: "stylesheet", href: rdtStylesheet }] : []),
  ]
}
```

Here, we're distinguishing the RDT Stylesheet from the main application stylesheet. Adjust as needed.

Then lastly, we want to include the Dev tools exclusively in 'development' mode. Let's do that by updating the default exported app:

```javascript

let AppExport = App;

// This imports the dev tools only if you're in development
if (process.env.NODE_ENV === "development") {
  const { withDevTools } = require("remix-development-tools"); 
  AppExport = withDevTools(AppExport);
}

export default AppExport;

```

And we're done! You should something similar to the below:

![screenshots](/assets/edwardsmoses-remix-Screenshot 2023-10-15 090329.png)

when expanded:

![screenshots](/assets/edwardsmoses-remix-Screenshot 2023-10-15 090406.png)

Here, the Active Page tab stands out. It offers a deep dive into the current page I'm on. A particularly handy feature is its ability to highlight route boundaries as I hover over them.

Plus, it provides a glimpse into the Loader data for each route.

![screenshots](/assets/edwardsmoses-remix-Screenshot 2023-10-15 091433.png)

### Server Logging

Another gem from this tool-set is the server logging feature, this provides the ability to see the timing and the individual `loaders` and `actions` triggered when rendering a route.

Let's set this up by modifying the `server.js` file:

```javascript

const path = require("path");


const BUILD_DIR = path.join(process.cwd(), "build");
const build = (require(BUILD_DIR));

let devBuild = build;
let devToolsConfig = null;

// Make sure you guard this with NODE_ENV check
if (process.env.NODE_ENV === 'development') {
  const { withServerDevTools, defineServerConfig } = require("remix-development-tools/server");

  // Allows you to define the configuration for the dev tools
  devToolsConfig = defineServerConfig({
    logs: {
      // allows you to not log cookie logs to the console
      cookies: true,
      // allows you to not log defer logs to the console
      defer: true,
      // allows you to not log action logs to the console
      actions: true,
      // allows you to not log loader logs to the console
      loaders: true,
      // allows you to not log cache logs to the console
      cache: true,
      // allows you to not log when cache is cleared to the console
      siteClear: true,
    },
  });

  // wrap the build with the dev tools
  devBuild = withServerDevTools(build, devToolsConfig);
}


```

And with the above, we should have the 'Server Logs' functional in your Terminal. Here's an example of how it'd look like:

![screenshots](/assets/edwardsmoses-remix-Screenshot 2023-10-15 100936.png)

You can check out this article `server.js` [file here.](https://github.com/edwardsmoses/remix-run-stripe-sample/blob/remix-dev-tools/server.js)

### Exploring Remix Dev Tools

Remix Dev Tools offers some awesome utilities designed to enhance the Remix development experience - I'll highly encourage you to check it out.

### Wrapping up

The Working version of this article is available on GitHub —
<https://github.com/edwardsmoses/remix-run-stripe-sample/tree/remix-dev-tools>
