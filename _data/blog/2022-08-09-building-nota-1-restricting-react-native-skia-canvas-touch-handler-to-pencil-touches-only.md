---
template: BlogPost
path: /building-nota-restricting-shopify-react-native-skia-canvas-touch-handler-to-pencil-only
date: 2022-08-09T20:50:57.918Z
title: "Building Nota #1 - Restricting React Native Skia Canvas Touch Handler to
  Pencil touches only"
metaDescription: Restricting React Native Skia Canvas Touch Handler to Pencil touches only
thumbnail: /assets/edwards_moses_avatar.png
---
This will be the first part of a series of articles where I write about my journey building Nota. 

What's Nota? Forgive the copy: nota allows you to use your Apple Pencil to take notes on your iPad and syncs to [Notion](https://notion.so/) - take a glimpse at the header image above, that's nota (at least at the point of this writing)

For building the note-taking aspect for this app, I went with [Shopify react-native-skia](https://github.com/Shopify/react-native-skia) - an astounding library from the Shopify team. Excited to see where this library takes the react native ecosystem. 

I plan on writing an article in the future on how I built the note-taking feature - but that would be a much longer post. For now, I'll be showing how I implemented Apple Pencil only. 

The react-native-skia library offers the `Canvas` component. We can use the `onTouch` prop and the `useTouchHandler` hook to track the users' touches on the `Canvas` component ([docs](https://shopify.github.io/react-native-skia/docs/animations/touch-events/)).

The touchHandler tracks all touches, but we want to restrict it to only track touches made by a Pencil. 

To get started, we'll edit the node-modules/@shopify/react-native-skia/ios/RNSkia-iOS/SkiaDrawView.mm file. \
We want to edit the `handleTouches` function, we'll be updating the bit that loops through all touches to only consider Pencil touches. 

```
  for (UITouch *touch in touches) {
        if(touch.type == UITouchTypePencil) {
            auto position = [touch preciseLocationInView:self];
            RNSkia::RNSkTouchPoint nextTouch;
            nextTouch.x = position.x;
            nextTouch.y = position.y;
            nextTouch.force = [touch force];
            nextTouch.id = [touch hash];
            auto phase = [touch phase];
            switch(phase) {
              case UITouchPhaseBegan:
                nextTouch.type = RNSkia::RNSkTouchType::Start;
                break;
              case UITouchPhaseMoved:
                nextTouch.type = RNSkia::RNSkTouchType::Active;
                break;
              case UITouchPhaseEnded:
                nextTouch.type = RNSkia::RNSkTouchType::End;
                break;
              case UITouchPhaseCancelled:
                nextTouch.type = RNSkia::RNSkTouchType::Cancelled;
                break;
              default:
                nextTouch.type = RNSkia::RNSkTouchType::Active;
                break;
            }
            
            nextTouches.push_back(nextTouch);
        }
    }
```

The integral part of the change we're making is updating the code to only handle the touch when the `touch.type` is [UITouchTypePencil](https://developer.apple.com/documentation/uikit/uitouchtype/uitouchtypepencil). 

Next, we'll want to make sure that the changes made to the package remains even after a fresh `yarn/npm install`. And we'll be using patch-package. 

There are a number of articles on doing that. Here's one I used: \
https://dev.to/roshangm1/make-changes-to-nodemodule-files-with-patch-package-30h4 

And when you have the `shopify/react-native-skia` package patched, you'll have a patch file similar to [this](https://github.com/edwardsmoses/nota/blob/8377ad054a7e0735db170e9b29452523836ca928/patches/%40shopify%2Breact-native-skia%2B0.1.134.patch). And re-building the app should allow only Pencil touches on the Canvas. 

The [roadmap](https://github.com/users/edwardsmoses/projects/3) for Nota is public, and I plan on sharing my journey as I build this app.