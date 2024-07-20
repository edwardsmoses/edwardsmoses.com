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

In a mobile project I invoked, we recently switched from email and password style to a magic link style. We use Firebase. In this article, we dive in how we implemented the magic link for Firebase and React Native.

## Getting started

First things first, we'll need to setup the Firebase console to enable the email link sign-in. How do we do that?

- Open the Firebase console
- Navigate to the **Authentication** section.

  - Under the **Sign-in method** tab, enable the **Email/Password** provider. Note that email/password sign-in must be enabled to use email link sign-in.
  - In the same section, enable the **Email link (passwordless sign-in)** method.

![screenshots](/assets/edwardsmoses-Screenshot 2024-07-20 at 11.09.01.png)
<sub><sup>_a little bit of trivia, this is the firebase project I used in the app that got me into Toptal. that's what I now use for all my firebase testing_ </sup></sub>

- Under the **Settings** tab, and under the **Authorized domains** section:
- Add the domains that you want to use for the `url` in the magic link, or you can leave as it is, and use the default domains, `project_name.web.app`
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

- Next, we want to enable Firebase dynamic links, enter the domain you want to use. In this case, I'm using: `edwardsmosesapp.page.link`
  ![screenshots](/assets/edwardsmoses-Screenshot 2024-07-20 at 15.03.18.png)

## Setting up our React Native project

We want to setup our Xcode project configuration for the firebase universal links.

- Open the Xcode project, and in the **Capabilities** tab, enable **Associated Domains**
  ![screenshots](/assets/edwardsmoses-Screenshot 2024-07-20 at 14.21.46.png)

  - Add the following to the associated domains list: your dynamic links domain, mine is `edwardsmosesapp.page.link`

  ![screenshots](/assets/edwardsmoses-Screenshot 2024-07-20 at 15.05.25.png)

### Packages

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

When running the above command, if you run into the below error: you can follow the steps in this section: <https://rnfirebase.io/#altering-cocoapods-to-use-frameworks>
![screenshots](/assets/edwardsmoses-Screenshot 2024-07-20 at 14.33.21.png)
<sub><sup>_guess who ran into the above error_</sup></sub>

If you haven't yet configured your Firebase project,follow the below steps in the documentation:
<https://rnfirebase.io/#generating-ios-credentials>

### Sending the Link to the User Email

We want to use the `sendSignInLinkToEmail` method to send the a magic link to the user email.

```jsx
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import dynamicLinks from "@react-native-firebase/dynamic-links";

const MagicLinkLogin = () => {
  const [email, setEmail] = useState("");

  const BUNDLE_ID =
    "org.reactjs.native.example.reactnative-firebase-magiclink-app";

  const sendSignInLink = async (email: string) => {
    try {
      await AsyncStorage.setItem("emailForSignIn", email);
      await auth().sendSignInLinkToEmail(email, {
        handleCodeInApp: true,
        url: "https://bike-rentals-5f360.web.app",
        iOS: {
          bundleId: BUNDLE_ID,
        },
        android: {
          packageName: BUNDLE_ID,
        },
      });

      Alert.alert(`Login link sent to ${email}`);
    } catch (error) {
      console.error(error);
      Alert.alert("Error sending login link");
    }
  };

  return (
    <View style={styles.authContainer}>
      <Text style={styles.sectionTitle}>Magic Link Sign In</Text>
      <TextInput
        style={styles.textInput}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Button
        color={"007AFF"}
        title="Send login link"
        onPress={() => sendSignInLink(email)}
      />
    </View>
  );
};
```

- We're setting `handleCodeInApp` to true since we want the link from the email to open our app and be handled there.
- More details on supported options can be found [here](https://firebase.google.com/docs/auth/web/email-link-auth#actioncodesettings).

Then, use it in our `App.js`:

```jsx
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: "lightgray",
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.sectionContainer}>
        <MagicLinkLogin />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: 24,
    height: "100%",
  },
  authContainer: {
    flex: 1,
    justifyContent: "center",
  },
  loadingContainer: {
    backgroundColor: "rgba(250,250,250,0.33)",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    borderColor: "blue",
    borderWidth: 1,
    marginTop: 16,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});
```

Here's our how our app looks:
![screenshots](/assets/edwardsmoses-Simulator Screenshot - iPhone 15 Pro Max - 2024-07-20 at 14.57.42.png)
<sub><sup>_definitely not winning any awards for the aesthetics on this app_</sup></sub>

If you have everything configured sucessfully, you should get a link in your email.
![screenshots](/assets/edwardsmoses-Screenshot 2024-07-20 at 15.09.34.png)
<sub><sup>_guess how I'm spending my weekend._</sup></sub>

### Handling the Link Inside the App

We want to use the `@react-native-firebase/dynamic-links` package to handle the link inside our app.

```jsx
const useEmailLinkEffect = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleDynamicLink = async (link: any) => {
      console.log('what is link', link);
      if (auth().isSignInWithEmailLink(link.url)) {
        setLoading(true);

        try {
          const email = await AsyncStorage.getItem('emailForSignIn');
          await auth().signInWithEmailLink(email as string, link.url);
        } catch (e: any) {
          setError(e);
        } finally {
          setLoading(false);
        }
      }
    };

    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    dynamicLinks()
      .getInitialLink()
      .then(link => link && handleDynamicLink(link));

    return () => unsubscribe();
  }, []);

  return {error, loading};
};


const EmailLinkHandler = () => {
  const {loading, error} = useEmailLinkEffect();

  if (loading || error) {
    return (
      <View style={[StyleSheet.absoluteFillObject, styles.loadingContainer]}>
        {loading && <ActivityIndicator />}
      </View>
    );
  }

  return null;
};
```

### Handling the successful sign-in

When the user successfully signs in, we want to use the `onAuthStateChanged` listener to trigger the new
authentication state of the user.

```jsx
const MagicLinkSignIn = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = (useState < FirebaseAuthTypes.User) | (null > null);

  // Handle user state changes
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((authUser) => {
      setUser(authUser);
      if (initializing) {
        setInitializing(false);
      }
    });
    return () => subscriber(); // unsubscribe on unmount
  }, [initializing]);

  if (initializing) {
    return null;
  }

  if (!user) {
    return <MagicLinkLogin />;
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
};
```

Then, let's update our `App.js`:

```jsx
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: "lightgray",
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.sectionContainer}>
        <EmailLinkHandler />
        <MagicLinkSignIn />
      </View>
    </SafeAreaView>
  );
}
```

### How to test

- Copy the link address from your email, and paste the below into your terminal:

```bash

xcrun simctl openurl booted {paste_the_link_here}

```

## Notes:

Firebase mentions they're shutting down their dynamic links service. According to them though, they're keeping the magic link setup; see Firebase [FAQ](https://firebase.google.com/support/dynamic-links-faq#im_currently_using_or_need_to_use_dynamic_links_for_email_link_authentication_in_firebase_authentication_will_this_feature_continue_to_work_after_the_sunset) on the topic.

<!--EndFragment-->
