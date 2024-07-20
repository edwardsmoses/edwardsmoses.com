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

In a mobile project I am a part of, we recently transitioned from traditional email and password authentication to a magic link system using Firebase.

This article explores how I implemented email magic links in the project using Firebase with React Native.


## Getting started

To begin, we want to set up the Firebase console to enable email link sign-in:

- Open the Firebase console
- Navigate to the **Authentication** section.

  - Under the **Sign-in method** tab, enable the **Email/Password** provider. Note that email/password sign-in must be enabled to use email link sign-in.
  - In the same section, enable the **Email link (passwordless sign-in)** method.

![screenshots](/assets/edwardsmoses-Screenshot 2024-07-20 at 11.09.01.png)
<sub><sup>_a little bit of trivia, this is the firebase project I used in the app that got me into Toptal. that's what I now use for all my firebase testing_ </sup></sub>

- Under the **Settings** tab, and under the **Authorized domains** section:
- Add the domains for the `url` in the magic link setup, or use the default domains, `project_name.web.app`.

![screenshots](/assets/edwardsmoses-Screenshot 2024-07-20 at 11.17.47.png)

### Configuring Firebase Dynamic Links

I assume you'd already have your React Native project up and running already. 

We want to use the values from our app, and add to the Firebase console. 
![screenshots](/assets/edwardsmoses-Screenshot 2024-07-20 at 14.12.59.png)

- For iOS, add your app with the following details on the Firebase console:
  - Bundle ID
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

### Installing Packages

You can find more information on this in the library's documentation (<https://rnfirebase.io>).

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

If you haven't yet configured your Firebase project, follow the below steps in the documentation:
<https://rnfirebase.io/#generating-ios-credentials>

### Sending the Magic link

To send a magic link to the user’s email, we want to use the `sendSignInLinkToEmail` method. 

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

When the user successfully signs in, we want to use the `onAuthStateChanged` listener to monitor the
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
    <View style={styles.authContainer}>
      <Text style={styles.sectionTitle}>Welcome {user.email}</Text>
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

### Testing

We can test the integration by simulating link handling in our simulator:

- Copy the link address from your email, and paste the below into the terminal to open the app:

```bash

xcrun simctl openurl booted {paste_the_link_here}

```

And here we have it, the user is automatically signed into the app:
![screenshots](/assets/edwardsmoses-Simulator Screenshot - iPhone 15 Pro Max - 2024-07-20 at 15.37.18.png)
<sub><sup>_interesting coincidence: what's the similarity between both screenshots. hint: peep the minute_</sup></sub>

### Conclusion

This setup allows users to sign into your React Native app using Firebase magic links.

Here's the accompanying GitHub repo for this article:
<https://github.com/edwardsmoses/integrating-magic-links-with-firebase-react-native>


## Notes:

Firebase has announced the shutdown of their dynamic links service, but they will continue to support email link authentication; see Firebase [FAQ](https://firebase.google.com/support/dynamic-links-faq#im_currently_using_or_need_to_use_dynamic_links_for_email_link_authentication_in_firebase_authentication_will_this_feature_continue_to_work_after_the_sunset) on the topic.

<!--EndFragment-->
