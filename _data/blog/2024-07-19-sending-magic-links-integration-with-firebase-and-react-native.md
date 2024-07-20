---
template: BlogPost
path: /integrating-magic-links-with-firebase-react-native
date: 2024-07-19T01:05:32.403Z
title: Integrating Magic Links with Firebase and React Native
metaDescription: How to setup dynamic links with Firebase and React Native
thumbnail: /assets/edwardsmoses-dynamic-links-firebase-react-native-greg-rosenke-4TpmzpI8Du0-unsplash.jpg
---

<!--StartFragment-->

## Introduction

In a mobile project I involed, we recently siwtched from email and password style to a magic link style. We use Firebase. In this article, we dive in how we implemented the magic link for Firebase and React Native.

## Getting started

First things first, we'll need to setup the Firebase console to enable the email link sign-in. How do we do that?

- Open the Firebase console
- Navigate to the **Authentication** section.

  - Under the **Sign-in method** tab, enable the **Email/Password** provider. Note that email/password sign-in must be enabled to use email link sign-in.
  - In the same section, enable the **Email link (passwordless sign-in)** method.

![screenshots](/assets/edwardsmoses-Screenshot 2024-07-20 at 11.09.01.png)
<sub><sup>_a little bit of trivia, this is the firebase project I used in the app that got me into toptal. that's what I now use for all my firebase testing_ </sup></sub>

- Under the **Settings** tab, and under the **Authorized domains** section:
- Add the domains that you want to use for the magic link, or you can leave as it is, and use the default domains, `project_name.web.app`
  ![screenshots](/assets/edwardsmoses-Screenshot 2024-07-20 at 11.17.47.png)

#### Configuring Firebase Dynamic Links

I assume you'd already have your React Native project completely setup already. With similar values as you have configured in your React Native project, you should have your iOS app configured.
![screenshots](/assets/edwardsmoses-Screenshot 2024-07-20 at 14.12.59.png)

- For IOS - you need to have an ios app configured - Add an app or specify the following throughout the firebase console

  - Bundle ID
  - App Store ID
  - Apple Developer Team ID
    ![screenshots](/assets/edwardsmoses-Screenshot 2024-07-20 at 14.17.55.png)

- For Android - you just need to have an Android app configured with a package name

- Next, we want to enable Firebase dynamic links
  screenshot

## Setting up our React Native project

We want to setup our Xcode project configuration for the firebase universal links.

- Open the Xcode project, and in the **Capabilities** tab, enable **Associated Domains**
  ![screenshots](/assets/edwardsmoses-Screenshot 2024-07-20 at 14.21.46.png)

  - Add the following to the associated domains list: your dynamic links domain,

  ![screenshots](/assets/edwardsmoses-Screenshot 2024-07-20 at 14.23.11.png)

### Packages

** Firebase setup:**

We'll need `react-native-firebase` setup. You can find more information on setting up that in the library's documentation (<https://rnfirebase.io>).

First, we want to install:

```bash
yarn add @react-native-firebase/app
```

Then install the authentication package (<https://rnfirebase.io/auth/usage>):

```bash
yarn add @react-native-firebase/auth

```

Then finally install the dynamic links package (<https://rnfirebase.io/dynamic-links/usage>)

```bash
yarn add @react-native-firebase/dynamic-links

```

Also install the below for async storage:

```bash
yarn add @react-native-async-storage/async-storage


```

After which, we'd run to install :

```bash
npx pod install
```

When running the above command, if you run in the below error: follow the steps in this section: <https://rnfirebase.io/#altering-cocoapods-to-use-frameworks>
![screenshots](/assets/edwardsmoses-Screenshot 2024-07-20 at 14.33.21.png)

If you haven't yet configured your Firebase project,follow the below steps in the documentation:
<https://rnfirebase.io/#generating-ios-credentials>

### Sending the Link to the User Email

We want to use the `sendSignInLinkToEmail` method to send the a magic link to the user email.

```jsx
import React, { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import auth from "@react-native-firebase/auth";

const MagicLinkSignIn = () => {
  const [email, setEmail] = useState("");

  return (
    <View>
      <TextInput value={email} onChangeText={(text) => setEmail(text)} />
      <Button title="Send login link" onPress={() => sendSignInLink(email)} />
    </View>
  );
};

const BUNDLE_ID =
  "org.reactjs.native.example.reactnative-firebase-magiclink-app";

const sendSignInLink = async (email) => {
  try {
    const actionCodeSettings = {
      handleCodeInApp: true,
      iOS: {
        bundleId: BUNDLE_ID,
      },
      android: {
        packageName: BUNDLE_ID,
      },
    };

    await AsyncStorage.setItem("emailForSignIn", email);
    await auth().sendSignInLinkToEmail(email, actionCodeSettings);

    Alert.alert(`Login link sent to ${email}`);
  } catch (error) {
    console.log("what is the error", error);
  }
};
```

- We're setting `handleCodeInApp` to true since we want the link from the email to open our app and be handled there.
- More details on supported options can be found [here](https://firebase.google.com/docs/auth/web/email-link-auth#actioncodesettings).

Here's our how our app looks:
![screenshots](/assets/edwardsmoses-Simulator Screenshot - iPhone 15 Pro Max - 2024-07-20 at 14.57.42.png)
<sub><sup>_definitely not winning any awards for the aesthetics on the app_</sup></sub>

### Handling the Link Inside the App

10. **Native Project Configuration:**

    - Native projects need to be configured so that the app can be launched by a universal link as described above.
    - Use the built-in Linking API from React Native or the `dynamicLinks` package from `@react-native-firebase/dynamic-links` to intercept and handle the link inside your app.

    ```jsx
    import React, { useState, useEffect } from "react";
    import {
      ActivityIndicator,
      AsyncStorage,
      StyleSheet,
      Text,
      View,
    } from "react-native";
    import auth from "@react-native-firebase/auth";
    import dynamicLinks from "@react-native-firebase/dynamic-links";

    const EmailLinkHandler = () => {
      const { loading, error } = useEmailLinkEffect();

      if (loading || error) {
        return (
          <View style={styles.container}>
            {Boolean(error) && <Text>{error.message}</Text>}
            {loading && <ActivityIndicator />}
          </View>
        );
      }

      return null;
    };

    const useEmailLinkEffect = () => {
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      useEffect(() => {
        const handleDynamicLink = async (link) => {
          if (auth().isSignInWithEmailLink(link.url)) {
            setLoading(true);

            try {
              const email = await AsyncStorage.getItem("emailForSignIn");
              await auth().signInWithEmailLink(email, link.url);
            } catch (e) {
              setError(e);
            } finally {
              setLoading(false);
            }
          }
        };

        const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
        dynamicLinks()
          .getInitialLink()
          .then((link) => link && handleDynamicLink(link));

        return () => unsubscribe();
      }, []);

      return { error, loading };
    };

    const styles = StyleSheet.create({
      container: {
        ...StyleSheet.absoluteFill,
        backgroundColor: "rgba(250,250,250,0.33)",
        justifyContent: "center",
        alignItems: "center",
      },
    });

    const App = () => (
      <View>
        <EmailLinkHandler />
        <AppScreens />
      </View>
    );

    export default App;
    ```

    - You can use the component in the root of your app or as a separate screen/route. In the latter case, the user should be redirected to it after the `sendSignInLinkToEmail` action.
    - Upon successful sign-in, any `onAuthStateChanged` listeners will trigger with the new authentication state of the user. The result from the `signInWithEmailLink` can also be used to retrieve information about the user that signed in.

### Testing the Email Login Link in the Simulator

11. **Testing Steps:**

    - Have the app installed on the running simulator.
    - Go through the flow that will send the magic link to the email.
    - Go to your inbox and copy the link address.
    - Open a terminal and paste the following code:
      ```bash
      xcrun simctl openurl booted {paste_the_link_here}
      ```
    - This will start the app if it’s not running and trigger the `onLink` hook (if you have a listener for it as shown above).

    ## Notes:

    Firebase mentions they're shutting down their dynamic links service. According to them though, they're keeping the magic link setup; see Firebase [FAQ](https://firebase.google.com/support/dynamic-links-faq#im_currently_using_or_need_to_use_dynamic_links_for_email_link_authentication_in_firebase_authentication_will_this_feature_continue_to_work_after_the_sunset) on the topic.

<!--EndFragment-->
