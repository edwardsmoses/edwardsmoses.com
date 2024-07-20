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

- Navigate to the **Authentication** section.

  - Under the **Sign-in method** tab, enable the **Email/Password** provider. Note that email/password sign-in must be enabled to use email link sign-in.
  - In the same section, enable the **Email link (passwordless sign-in)** method.

![screenshots](/assets/edwardsmoses-Screenshot 2024-07-20 at 11.09.01.png)
<sub><sup>_a little bit of trivia, this is the firebase project I used in the app that got me into toptal. that's what I now use for all my firebase testing_ </sup></sub>

- Under the **Settings** tab, and under the **Authorized domains** section:
- Add the domains that you want to use for the magic link, or you can leave as it is, and use the default domains, `project_name.web.app`
  ![screenshots](/assets/edwardsmoses-Screenshot 2024-07-20 at 11.17.47.png)

## Setting up our React Native project

I assume you'd already have your React Native project completely setup already.

### Firebase Project Configuration

#### Open the Firebase Console

1. **Prepare Firebase Instance (Email Link Sign-In):**
   - Navigate to the **Auth** section.
   - Under the **Sign-in method** tab, enable the **Email/Password** provider. Note that email/password sign-in must be enabled to use email link sign-in.
   - In the same section, enable the **Email link (passwordless sign-in)** method.
   - Under the **Authorized domains** tab:
     - Add any domains that will be used. For example, the domain for the URL from `ActionCodeSettings` needs to be included here.

#### Configuring Firebase Dynamic Links

2. **For iOS:**
   - You need to have an iOS app configured. Add an app or specify the following throughout the Firebase console:
     - **Bundle ID**
     - **App Store ID**
     - **Apple Developer Team ID**
3. **For Android:**

   - You just need to have an Android app configured with a package name.

4. **Enable Firebase Dynamic Links:**

   - Open the **Dynamic Links** section.

   > "Firebase Auth uses Firebase Dynamic Links when sending a link that is meant to be opened in a mobile application. To use this feature, Dynamic Links need to be configured in the Firebase Console."

   - For iOS only, you can verify that your Firebase project is properly configured to use Dynamic Links in your iOS app by opening the following URL: `https://your_dynamic_links_domain/apple-app-site-association`
   - It should show something like:
     ```json
     {
       "applinks": {
         "apps": [],
         "details": [
           {
             "appID": "AP_ID123.com.example.app",
             "paths": ["NOT /_/", "/"]
           }
         ]
       }
     }
     ```

#### iOS Xcode Project Configuration for Universal Links

5. **Open the Xcode Project:**

   - Go to the **Info** tab and create a new URL type to be used for Dynamic Links.
   - Enter a unique value in the **Identifier** field and set the **URL scheme** field to be your bundle identifier, which is the default URL scheme used by Dynamic Links.

6. **Enable Associated Domains:**
   - In the **Capabilities** tab, enable **Associated Domains** and add the following to the Associated Domains list: `applinks:your_dynamic_links_domain`
   - Note: This should be only the domain - no `https://` prefix.

#### Android Configuration

7. **No Additional Configuration Needed:**
   - Android doesn’t need additional configuration for default or custom domains.

### Packages

8. **React-Native Project Setup:**
   - A working React-Native project setup with `react-native-firebase` is required. This is thoroughly covered in the library's documentation. Here are the specific packages used:
     - Note: The `dynamicLinks` package can be replaced with React Native's own `Linking` module and the code would be almost identical.
     - Exact packages used:
       ```json
       {
         "@react-native-firebase/app": "^6.7.1",
         "@react-native-firebase/auth": "^6.7.1",
         "@react-native-firebase/dynamic-links": "^6.7.1"
       }
       ```

### Sending the Link to the User Email

9. **Using the `sendSignInLinkToEmail` Method:**

   - This method accepts an email and action code configuration. Firebase sends an email with a magic link to the provided email. Following the link has different behavior depending on the action code configuration.

   ```jsx
   import React, { useState } from "react";
   import { Alert, AsyncStorage, Button, TextInput, View } from "react-native";
   import auth from "@react-native-firebase/auth";

   const EmailLinkSignIn = () => {
     const [email, setEmail] = useState("");

     return (
       <View>
         <TextInput value={email} onChangeText={(text) => setEmail(text)} />
         <Button
           title="Send login link"
           onPress={() => sendSignInLink(email)}
         />
       </View>
     );
   };

   const BUNDLE_ID = "com.example.ios";

   const sendSignInLink = async (email) => {
     const actionCodeSettings = {
       handleCodeInApp: true,
       url: "https://www.example.com/magic-link",
       iOS: {
         bundleId: BUNDLE_ID,
       },
       android: {
         packageName: BUNDLE_ID,
         installApp: true,
         minimumVersion: "12",
       },
     };

     await AsyncStorage.setItem("emailForSignIn", email);
     await auth().sendSignInLinkToEmail(email, actionCodeSettings);

     Alert.alert(`Login link sent to ${email}`);
   };

   export default EmailLinkSignIn;
   ```

   - We're setting `handleCodeInApp` to true since we want the link from the email to open our app and be handled there. The `url` parameter is a fallback in case the link is opened from a desktop or another device that does not have the app installed. They will be redirected to the provided URL, which is a required parameter. It's also required to have that URL's domain whitelisted in the Firebase console under Authentication -> Sign-in method.
   - More details on supported options can be found [here](https://firebase.google.com/docs/auth/web/email-link-auth#actioncodesettings).

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
