---
template: BlogPost
path: /integrating-daily-co-video-call-api-in-asp-net-mvc
date: 2020-10-19T01:09:05.469Z
title: Integrating Daily.Co Video Call API in ASP.NET MVC 5
metaDescription: "How to Integrate Daily.Co Video Call API in .NET MVC Application. "
thumbnail: /assets/kentaro-toma-jiuiiv0N5F0-unsplash.jpg
---

## Getting Started — Join a Video Call on Daily.co from your web application

## First Step : Sign Up on Daily.Co

To get started using the Daily.co video API. You’ll need to [sign up](https://dashboard.daily.co) for an account. You can find the [pricing here.](https://www.daily.co/pricing#api)

## Second step: Choose a Daily.co domain name

All your video call URLs start with your own, custom, domain name. A video call URL looks like this: <https://your-domain.daily.co/hello>

As part of the sign-up process, you choose a “domain name” for your Daily.co account. Throughout this article, we’ll use `your-domain.daily.co` as an example domain name.

## Third Step: Integrating the Video Call in your Web Solution

In your MVC Solution, in any view of your choice. Open the View, and add the **Video Call & Container controls**, to your Razor view.

```html
<div class="row" style="margin-bottom:20px;">
  <button class="btn btn-primary" style="float:left;margin-right:20px;" onclick="mtgJoin()">Join meeting</button>

  <button class="btn btn-danger" style="float:left;" onclick="mtgLeave()">Leave meeting</button>
</div>

<div class="row">
  <div id="mtg-frame" height="400" style="height:400px;border:0;background-color:lightgrey;" />
</div>
```

Add the `daily.co js` to the Scripts section in your view:

```html
<script crossorigin src=”https://unpkg.com/@daily-co/daily-js"></script>
```

And then, this error happens:

![Image for post](https://miro.medium.com/max/30/1*HAqg1kurtf8NDBhVbsQgJQ.png?q=20)

![Image for post](https://miro.medium.com/max/741/1*HAqg1kurtf8NDBhVbsQgJQ.png)

So, to fix the above error. A workaround that I would recommend would be to simply create a variable named `daily` at the top of the view.

```javascript
@{
var daily = "@daily";
}
```

And then, **Voila!** the error is gone.

So, the next step would be to implement the JavaScript functions for the buttons in the **Scripts** section: `mtgJoin()` and `mtgLeave()`

```javascript
const mtgJoin = () => {
  let callUrl = "https://your-domain.daily.co/hello";
  if (!window.frame) {
    window.inp = document.getElementById("mtg-link");
    window.frame = window.DailyIframe.createFrame(document.getElementById("mtg-frame"));
  }
  window.frame.join({ url: callUrl });
};

const mtgLeave = () => {
  window.frame.leave();
};
```

And, you are done... When you click on **Join Meeting**, your page should look something like this...

![Image for post](https://miro.medium.com/max/1366/1*ACRCBitE4KeU8dvweW5PNg.png)

## Finished! And we're done

Now we actually have a real-life video calling system in your web application.

> _The Working version of this project is available on GitHub —_<https://github.com/edwardsmoses/DailyCo-Api-Integration>
