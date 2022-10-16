---
template: BlogPost
path: /creating-browser-extension-with-react-and-typescript
date: 2022-10-16T11:12:18.502Z
title: Creating Browser Extensions with React and Typescript
thumbnail: /assets/edwards_browser_extensions.png
---

I started another side project yet again! This time, I wanted to explore browser extensions - and how to create them using React.
And after some research, I found [Plasmo](https://github.com/PlasmoHQ/plasmo) - a React framework for browser extensions.

With it, we get the power of developing, testing and publishing browser extensions. And we also get some nifty features like Hot-Reload while developing, which is pretty handy.

They have a pretty nice tagline - It's like Next.js for browser extensions. And I got to say, that expectation was fulfilled.

With no experience creating browser extensions, I was able to onboard pretty quickly, and have an extension working on my Chrome browser.

They also have a lot of nice pre-built [examples](https://github.com/PlasmoHQ/examples) showcasing how Plasmo can be used.

So, let's get started creating a browser extension with React and Typescript.

## Getting Started

To get started, we'd want to create the project by running:

```bash
yarn create plasmo

# or

npm create plasmo
```

One thing to keep in mind, while creating the project is having `16.14.x >` as the Node.JS version - I didn't realize that earlier - and that threw me off for a while.

And once we've have the project setup, we can get started running. To run the extension, we run the command:

```bash
yarn dev

# or
npm run dev

```

The above command will build a bundle of our extension into the directory: `build/chrome-mv3-dev`

And to get our extension running on Chrome, head over to `chrome://extensions` and turn on **Developer mode**.

![turn-on-developer-mode](/assets/chrome_extensions_developer_mode.jpg "Chrome Extension Developer mode")

And then, we want to load the extension into Chrome, by clicking on the **Load unpacked** button, and then navigating to our extension `build/chrome-mv3-dev` directory, and voila, we get our extension running on Chrome.

![browser-extension-running](/assets/chrome_extension_running.jpg "Extension running")

## Next Steps

Plasmo has an extensive guide on the available features of the Browser extension SDK. For example, I used the [Content Script guide](https://docs.plasmo.com/browser-extension/content-scripts) for logging to the console.

## The End

Using Plasmo as my framework of choice when creating a browser extension was a delight - with great developer experience packaged in every step of the way.

I haven't gotten to that step yet, but they also have a [guide](https://docs.plasmo.com/workflows/submit) on publishing the browser extension - which is pretty nice.

If you want to checkout my side-project (which I hope to have completed one-day 😂), here's the Github repository:

<https://github.com/edwardsmoses/firestore-extension>
