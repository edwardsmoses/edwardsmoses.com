---
template: BlogPost
path: /implementing-2fa-totp-with-remix
date: 2025-08-24T14:35:36.203Z
title: Implementing Two-Factor Authentication (2FA) with TOTP on a Remix app
thumbnail: https://images.credly.com/images/cc8adc83-1dc6-4d57-8e20-22171247e052/blob
---

<!--StartFragment-->

## Trigger

I've always wondered how TOTP for 2FA worked, where you could scan a QR code on your Authenticator app, either Google or Microsoft, or one of the many others, and with that, you get a code, which then acts as your second factor verification. This flow does signifiticatinly reduce the risk of unauthorized access, so I decided to build a demo app, and use that as an excuse to learn how it works. This article would walk through us setting up an app that allows users to enforce 2FA at login. Hopefully, by the end, if we don't get lost, we'd have a working 2FA system that'd enhance your app security! Let's get started.


## Getting started

First easy steps, let's setup a basic Remix application. 

Did I mention ? We're also using this as an excuse to learn [Jujutsu](https://jj-vcs.github.io/jj/latest/), I've been hearing good ramblings about it, and wanted to give it a shot, so here goes. 

Simple basic setup, with the name, `totp-demo`:

```
npx create-react-router@latest
```

I'm on a Mac, so, I'll be installing Jujutsu with the command:

```
brew install jj
```

And just like in Git, we want to initialize the repo, and in case you're wondering, I'm following this [tutorial](https://steveklabnik.github.io/jujutsu-tutorial/hello-world/creating-a-repository.html), as I'm setting up this project:

```
jj git init
```

and we've our repo init in jj, which seems like progress, let's explore some more. 
![alt text](<assets/totp/edwardsmoses.com_CleanShot 2025-08-24 at 15.30.21.png>)

Running `jj st` gives us the status of the working directory, 
![alt text](<assets/totp/edwardsmoses.com_CleanShot 2025-08-24 at 15.39.43.png>)

Reading further, seems like `jj describe` is `git commit`, but we first need to configure identity:

```
jj config set --user user.name "Edwards Moses"
jj config set --user user.email "edwardsmoses3@gmail.com"
```

Reading this [page](https://steveklabnik.github.io/jujutsu-tutorial/hello-world/describing-commits.html), and I'm still not sure I grab the difference betweens 'changes' and 'commits', but let's see if using it further changes anything.

```
jj describe -m "chore: start of project"
```

![alt text](<assets/totp/edwardsmoses.com_CleanShot 2025-08-24 at 15.49.53.png>)

### Installing packages

Now, let's install some packages that we'll need, [Speakeasy](https://www.npmjs.com/package/speakeasy), it's a well-tested OTP generator and works well with Google Authenticator and similar, which is perfect for our use-case, and qrcode, which has the meaning in it's name. 

Okay, so here goes:

```
npm install speakeasy qrcode
```




Two-factor authentication (2FA) adds an extra layer of security to user accounts by requiring a second verification factor in addition to the password[1]. Even if an attacker obtains a user's password, they cannot access the account without the second factor (usually a temporary code), significantly reducing the risk of unauthorized access[1]. One common 2FA method is Time-based One-Time Passwords (TOTP), an algorithm that generates short-lived numeric codes based on a secret key and the current time. These codes are typically 6 digits long and refresh every 30 seconds[2]. TOTP is a standard (defined in RFC 6238) supported by many authenticator apps like Google Authenticator, Authy, and others[3].
In this article, we'll implement 2FA in a Remix React application using TOTP. We will walk through setting up a Remix app, generating TOTP secrets, showing a QR code for users to scan with an authenticator app, verifying the one-time codes on the server, and enforcing 2FA at login. By the end, you'll have a working 2FA system that greatly enhances your app's security. Let's get started!
Getting Started
First, set up a basic Remix React application. If you don't have one already, you can create a new Remix project using the official CLI:
npx create-remix@latest
Follow the prompts to configure your Remix app (choose a stack or the default template as needed). Once your app is generated, navigate into the project directory and install the necessary dependencies for implementing TOTP 2FA:
npm install speakeasy qrcode
Here we added two packages: Speakeasy and qrcode. Speakeasy is a well-tested one-time passcode generator library (ideal for 2FA) that supports TOTP and works with Google Authenticator and similar apps[4]. It provides helper functions to generate secrets and verify tokens. The qrcode package allows us to generate QR code images (as data URLs) for users to easily scan the TOTP setup into their authenticator app.
Before proceeding, ensure your Remix dev server is running (npm run dev). We will assume you have a basic authentication system in place (for example, users can log in with a username/email and password), since 2FA will build on top of an existing login. Now let's move on to generating TOTP secrets for users.
Generating TOTP Secrets
To enable 2FA for a user, the first step is to generate a unique TOTP secret key for that user[5]. This secret will be shared between your server and the user's authenticator app to generate and validate one-time codes. Typically, this process is initiated when a logged-in user opts to enable 2FA in their account settings.
Using Speakeasy, generating a secret is straightforward. Speakeasy provides a generateSecret() method that returns an object containing the secret in various formats (ascii, hex, base32) and an otpauth URL for QR code use[6]. We usually use the Base32 format for TOTP secrets, as it's the format expected by most authenticator apps. Here's how you can generate a secret in a Remix action (server-side):
// app/routes/settings/two-factor.tsx (for enabling 2FA)import { ActionFunction, json } from "@remix-run/node";import speakeasy from "speakeasy";export const action: ActionFunction = async ({ request }) => {  // Generate a TOTP secret for the user  const secret = speakeasy.generateSecret({ name: "MyAppName" });  // The secret object includes:  // secret.base32 -> the base32 encoded secret (store this for the user)  // secret.otpauth_url -> URL for generating QR code  console.log("Generated TOTP secret:", secret.base32);  // TODO: Store secret.base32 in the database (temporarily, until verified)  // and return the otpauth URL for QR code generation.  return json({ otpauthUrl: secret.otpauth_url, secret: secret.base32 });};
In the above code, we call speakeasy.generateSecret(). We pass a name option to label the secret, which will embed our app's name into the otpauth URL (so that it shows up in the authenticator app). This returns an object with the secret in multiple encodings and an otpauth_url. The secret.base32 value is the one we'll store and use for verification, and secret.otpauth_url is a convenient pre-formatted string for generating a QR code. By default, Speakeasy generates a 32-character base32 secret and provides a Google Authenticator–compatible otpauth URL[6].
Storing the secret: You should save the generated secret (e.g., the Base32 string) in your database for that user. At this stage, however, we might not want to mark 2FA as fully enabled until the user verifies it with a code. A common practice is to store the secret in a temporary field (e.g., two_factor_temp_secret) for the user[7]. We will ask the user to verify a TOTP code first (to ensure they set up their app correctly) before marking 2FA as active. Once verified, we'll move the secret to a permanent field (e.g., two_factor_secret) and mark 2FA as enabled. This way we don't lock the user out with an unverified 2FA setup.
With a secret generated and saved (temporarily), the next step is to share this secret with the user in a secure way. Instead of showing the raw secret (which is hard to copy and prone to error), we will present a QR code that encodes the secret.
Integrating QR Code for Setup
To make it easy for the user to add the TOTP secret to their authenticator app, we provide a QR code. Authenticator apps can scan a QR code that contains the otpauth:// URL, automatically configuring the user's account in the app[8]. The qrcode package we installed can generate a QR code image as a data URL string, which we can embed in an <img> tag in our React component.
Let's continue our 2FA setup route example. In the action above, we returned the otpauthUrl. We can use a loader or the action's return value to generate the QR code. For simplicity, we'll generate the QR code in the action and send back a data URL:
import QRCode from "qrcode";export const action: ActionFunction = async ({ request }) => {  // ... after generating secret as above:  const secret = speakeasy.generateSecret({ name: "MyAppName" });  // Generate a data URL for a QR code representing the otpauth URL  const qrCodeDataUrl = await QRCode.toDataURL(secret.otpauth_url);  // Save secret.base32 to DB (temp), e.g., user.two_factor_temp_secret = secret.base32  // ...  // Return the data URL so the UI can display the QR code image  return json({ qrCodeDataUrl });};
The QRCode.toDataURL() function returns a Data URI (a base64-encoded PNG image by default) containing the QR code[9]. We can take this data URL and use it as the src of an image. In our Remix component (the UI for enabling 2FA), we would use useActionData or useLoaderData to get the qrCodeDataUrl returned by the action:
// Inside the component for the 2FA setup route (e.g., in the default export)import { Form, useActionData } from "@remix-run/react";export default function TwoFactorPage() {  const data = useActionData<typeof action>(); // data might contain qrCodeDataUrl  return (    <div>      <h2>Enable Two-Factor Authentication</h2>      {!data ? (        // If no data yet, show a button to initiate 2FA setup        <Form method="post">          <button type="submit">Generate QR Code</button>        </Form>      ) : (        // After action runs and returns data, display the QR code and input        <div>          <p>Scan the QR code below with your authenticator app (e.g., Google Authenticator or Authy):</p>          <img src={data.qrCodeDataUrl} alt="QR code for 2FA setup" />          <p>Then enter the 6-digit code from the app to verify:</p>          <Form method="post" action="?index">             {/* Using ?index or a separate action to handle verification */}            <input type="text" name="token" placeholder="123456" required />            <button type="submit">Verify Code</button>          </Form>        </div>      )}    </div>  );}
In this UI flow, the user clicks "Generate QR Code", which triggers the POST action to generate the secret and QR code. The page then displays the QR code image by setting the src to the returned data.qrCodeDataUrl. We instruct the user to scan this QR code with their authenticator app. Once scanned, the app (Google Authenticator, Authy, etc.) will add an entry for our application and immediately start showing a one-time code that changes every 30 seconds.
After scanning the QR code, the user must enter the current TOTP code from their app into the input field to verify the setup. This is an important step: it confirms that the user's app has the correct secret and that they can produce valid codes. In our form, we have an input for the 6-digit token. When the user submits this form, we'll handle the verification in another action (notice we set action="?index" to direct the form to the same route's action again, but you could separate the concerns using different action handlers or route segments as well).
Now, let's implement the server-side verification of the TOTP code.
Implementing 2FA Verification
Whether the user is verifying the code as part of setting up 2FA or during a future login, the process is the same: the server needs to check the provided 6-digit token against the user's secret. Speakeasy makes this easy with its TOTP verify function. We can use speakeasy.totp.verify({...}) to validate a token for a given secret and encoding[10].
Verifying during setup (enrollment): In the 2FA setup flow above, when the user submits the code from their app, we'll verify it against the temporary secret we generated. For example, continuing our route action:
export const action: ActionFunction = async ({ request }) => {  const formData = await request.formData();  const token = formData.get("token");  if (!token) {    // If no token, it means this is the initial request to generate QR    const secret = speakeasy.generateSecret({ name: "MyAppName" });    const qrCodeDataUrl = await QRCode.toDataURL(secret.otpauth_url);    // Store temp secret in DB or session for later verification...    // For simplicity, let's assume we store it in a server-side session.    const headers = await commitSessionWithSecret(secret.base32);    return json({ qrCodeDataUrl }, { headers });  } else {    // This is a verification attempt with a token    const session = await getSession(request.headers.get("Cookie"));    const tempSecret = session.get("temp_2fa_secret"); // retrieve stored secret    if (!tempSecret) {      throw new Response("No 2FA setup in progress", { status: 400 });    }    const verified = speakeasy.totp.verify({      secret: tempSecret,      encoding: "base32",      token: token.toString()    });    if (!verified) {      // Token is invalid – return an error message      return json({ error: "Invalid authentication code. Please try again." });    }    // Token is valid – enable 2FA for the user    // Save tempSecret as permanent secret in DB and mark 2FA enabled    await enableTwoFactorForUser(userId, tempSecret);    // Clear temp secret from session    session.unset("temp_2fa_secret");    const headers = await commitSession(session);    return json({ success: true }, { headers });  }};
In the above pseudo-code, we illustrate the two branches in the action: one for generating the QR code (no token in form), and one for verifying the token. The verification uses speakeasy.totp.verify() with the base32 secret and the user-provided token[10]. This function returns true if the token is correct (within the allowed time window) or false if not. By default, it checks the token against the current time step (30-second window) and typically allows a small drift window (usually ± one time step) for clock skew. If verification passes, we then persist the secret and mark 2FA as enabled for the user; if it fails, we return an error so the UI can prompt the user to retry.
Verifying during login: Once a user has enabled 2FA, each login should require a second factor verification. This means after the user enters their username and password (first factor), you should not log them in fully yet if they have 2FA enabled. Instead, you authenticate their password as usual, but then present a 2FA challenge (a form to input their TOTP code). Only after they provide a valid TOTP code do you finalize the login.
In a Remix app, one way to implement this is by using a flag in the session or a redirect to a protected route. For example:
	•	When the user submits the login form (username & password) and you verify those credentials, check if user.twoFactorEnabled is true.
	•	If no, log them in normally (set session cookie and redirect to the post-login page).
	•	If yes, do not yet create a full session cookie. Instead, perhaps create a temporary session state that stores the user's ID (or some identifier) and a flag like awaiting2FA = true. Then redirect the user to a /2fa-verification route (or reuse your login route in a "2FA required" state).
	•	The /2fa-verification route will show a form asking for the 6-digit code. When the user submits, in the action you retrieve the code and also identify the user (from that temp session or maybe hidden form field). Then load the user's secret from the database and call speakeasy.totp.verify to check the code. If valid, you know the user is fully authenticated; you can then establish the real session (log the user in) and redirect to the app's protected area. If invalid, return an error for retry.
To illustrate, here's a simplified example for the 2FA verification route:
// app/routes/verify-2fa.tsxexport const action: ActionFunction = async ({ request }) => {  const formData = await request.formData();  const token = formData.get("token")?.toString() || "";  const userId = formData.get("userId")?.toString(); // assume we passed userId  if (!userId) {    throw new Response("Missing user ID", { status: 400 });  }  // Fetch the user's secret from DB  const user = await db.getUserById(userId);  if (!user || !user.twoFactorSecret) {    return json({ error: "User 2FA not set up" }, { status: 400 });  }  const verified = speakeasy.totp.verify({    secret: user.twoFactorSecret,    encoding: "base32",    token  });  if (!verified) {    return json({ error: "Invalid code. Please try again." });  }  // If verified, create user session (set cookie, etc.)  const session = await createUserSession(user.id);  return redirect("/dashboard", { headers: { "Set-Cookie": await commitSession(session) } });};
And the corresponding UI (in verify-2fa.tsx component):
import { Form, useActionData } from "@remix-run/react";export default function Verify2FA() {  const actionData = useActionData<typeof action>();  return (    <div>      <h1>Two-Factor Authentication</h1>      <p>Please enter the 6-digit code from your authenticator app:</p>      <Form method="post">        <input type="hidden" name="userId" value={/* pass user ID from session or context */} />        <input type="text" name="token" placeholder="123456" maxLength={6} required />        <button type="submit">Verify</button>      </Form>      {actionData?.error && <p style={{ color: 'red' }}>{actionData.error}</p>}    </div>  );}
In a Remix application, forms trigger server actions which handle the logic[11]. We used a standard <Form> component to submit the code; Remix will call our action on the server with the form data, where we perform the verification. If the code is correct, we establish a session (for example, using Remix's session utilities or cookies) and redirect the user to a protected page (e.g., dashboard). If the code is wrong, we return an error message to the same page, and the user can try again.
Note: The exact mechanism of temporarily storing the userId and carrying it to the 2FA verification step can vary. Some approaches include: - Storing userId in a cookie or session (HttpOnly cookie) after password auth, so the 2FA page knows which user is logging in. - Including the userId as part of the redirect URL or as a hidden form input as shown (though be cautious about exposing user IDs). - Using Remix's Flash sessions or a short-lived session cookie for the interim state.
The main point is to ensure the 2FA verification step knows which user and secret to verify, and that until a correct code is provided, the user is not fully logged in.
Persisting 2FA Status
Once a user successfully verifies the TOTP code during setup, you should update their record in the database to mark 2FA as enabled. Typically this involves two things: storing the secret permanently, and a boolean flag (or some indicator) that 2FA is active for that account.
For example, you might have columns in your users table like twoFactorSecret (text) and twoFactorEnabled (boolean). Initially, twoFactorEnabled is false and twoFactorSecret is null. During the setup process, when you generate a secret, you could store it in a temporary field or separate table until verification. As suggested earlier, one approach is to use a field like two_factor_temp_secret[7] to hold the secret during the setup process. After the user enters a valid code for the first time, you copy that secret to twoFactorSecret, set twoFactorEnabled = true, and clear the temp field[12]. This ensures the secret is only saved permanently once we know it's correct and in use.
Security considerations: The TOTP secret should be handled carefully: - Do not expose it to the client after the initial QR code. The QR code itself contains the secret (in encoded form), but after setup, you should never show the secret or QR code to the user again (unless they re-enable or reset 2FA). - Store it securely in your database. It's essentially a "second password". You might choose to encrypt it at rest or at least treat it with the same care as a password (though hashing isn't applicable since it needs to produce OTPs). Ensure your database backups and access policies protect this sensitive info. - If the user disables 2FA later, you should remove or invalidate the secret.
When a user with 2FA enabled logs in, your login logic should check for twoFactorEnabled and enforce the second factor as we implemented in the previous section. This typically means you need to fetch the user's record (including the 2FA fields) after they enter their password, so you know whether to prompt for a code.
In summary, persisting 2FA status involves updating the user's record at setup verification and reading that status during each login attempt to decide if a TOTP verification step is required.
Handling 2FA in the UI
From the user's perspective, 2FA will slightly alter the login experience. It's important to implement the UI in a clear and user-friendly way so users understand what's happening. Let's break down the UI considerations for two scenarios: enabling 2FA and logging in with 2FA.
Enabling 2FA (Setup UI): In the account settings or profile section, offer an option like "Enable Two-Factor Authentication". When clicked, your app should generate the secret and display the QR code (as we did earlier). The UI should clearly instruct the user to scan the QR code with their authenticator app. For example, you might say: "Scan this QR code using Google Authenticator or a similar app." Additionally, you could display the secret key in text form as a backup (in case the user can't scan the QR code, they can enter the key manually into their app), but make sure to obscure it or only show on demand since it's sensitive.
After scanning, prompt the user to enter the 6-digit code from their app to verify. In our earlier code snippet, we showed a simple input and form for this. You might want to handle errors like an invalid code by showing an error message and maybe allowing a few attempts before suggesting to re-scan or regenerate the code. Once verified, you can show a success message like "Two-factor authentication is now enabled on your account."
Logging in with 2FA (Post-login UI): When a user with 2FA enabled logs in, you'll typically split the login into two steps. First, they enter their username/email and password as usual. After they submit, if those credentials are correct, instead of landing on the application, they see a second prompt: "Enter your authentication code". This can be on a separate page (e.g., /verify-2fa) or you can handle it in the same login page by rendering a different form state. Using a separate route/page can simplify the logic. The user then opens their authenticator app, reads the current 6-digit TOTP code, and enters it.
Make sure to have a form for this code input. In Remix, you can use the <Form> component which works just like a normal HTML form submission to the server[13]. The example UI we gave in the previous section (Verify2FA component) demonstrates this: it has an input for the token and a submit button, and it displays any error returned (e.g., "Invalid code, please try again.").
Some UX tips for this step: - Indicate which app to use (e.g., "Open your authenticator app to get the code"). - If possible, auto-focus the code input field for convenience. - You could also implement a short timeout or refresh mechanism if you want to handle codes expiring (though usually the user can just try the next code if one expired). - Provide a way to "resend" or recover if they lost access (this could be offering backup codes or a link to disable 2FA via email, but those are advanced features beyond this scope).
Remember that Remix supports progressive enhancement, so you could also add nice touches like disabling the submit button while the form is submitting or showing a loading state (using useNavigation). But even without JavaScript, the form submission works because Remix actions are built on standard HTML form behavior[11], ensuring that even if JS is disabled, the 2FA process still functions (the user can submit the code and get a server-validated response).
By handling the UI in a straightforward way (first factor, then second factor), users will get a clear flow for logging in with 2FA. Ensure to test the flow for both cases: users with 2FA enabled (who should see the extra step) and users without 2FA (who should log in as normal without any 2FA prompt).
Testing the Implementation
Once you've implemented 2FA, it's crucial to test it thoroughly to make sure everything works as intended:
	•	Test 2FA Setup: Start your Remix app and log in with a test user account. Navigate to the 2FA setup page (or wherever the "Enable 2FA" option is). Click the enable button to trigger secret generation. You should see a QR code appear. Use an authenticator app on your phone (for example, Google Authenticator or Authy):
	•	In the app, choose to add a new account (usually via scanning a QR code).
	•	Scan the QR code displayed by your app. The authenticator app should recognize it and add an entry for "MyAppName" (or whatever name you provided) with a one-time code that updates every 30 seconds.
	•	Verify that the app is generating codes (you'll see them change periodically). Now, enter the current code from the app into the verification field on your website and submit.
	•	If everything is correct, the server should accept the code and confirm that 2FA is enabled. (Check your database that the secret was stored and the flag enabled.)
	•	Test Login with 2FA: Log out, then attempt to log in with the same user. After entering the correct username/password, you should be redirected or prompted for the 2FA code. Open your authenticator app and enter the current code. Ensure that:
	•	If you enter the correct code, you successfully log in to the protected area of the app.
	•	If you enter an incorrect code (or an old code), the app shows an error and does not log you in.
	•	Try waiting for a new 30-second interval and use the next code to ensure codes expire as expected. Most verification functions have a small tolerance window, so even a code that just expired might be accepted if within the grace period, but generally it should require a current code.
	•	Also test the scenario of a user without 2FA enabled, to confirm they can still log in normally without the extra step.
	•	Test Backup/Recovery Scenarios (optional): Consider what happens if a user loses their device or cannot get codes. While implementing backup codes or alternative verification is beyond this article, it's good to have a plan. For now, ensure you have a way (perhaps via database update or admin intervention) to disable 2FA for a user if they get locked out, so you can test turning it off and on again.
	•	Cross-app Testing: You can also test scanning the provided QR code with different authenticator apps (Google Authenticator, Authy, Microsoft Authenticator, etc.) to confirm compatibility. All OATH TOTP-compatible apps should work with the same QR, since it's using the standard otpauth URL format[14].
Throughout testing, keep an eye on the server logs for any errors (for example, timing issues or misconfigured encoding). Speakeasy's verify function uses the secret and the current time by default; if you find codes that should match are not verifying, check that both server and device times are in sync (usually not an issue, but worth noting).
By completing these tests, you'll ensure that your 2FA implementation is robust and ready for real users. It’s a good idea to also document the 2FA process for your users, possibly in your app's help section, so they know how to set it up and use it.
Conclusion
Implementing Two-Factor Authentication using TOTP in a Remix React app provides a significant security boost for user accounts. We've gone through the steps of generating a secret key, allowing the user to scan a QR code to set up their authenticator app, verifying the one-time password on the server, and enforcing the 2FA check during login. With 2FA enabled, even if a user's password is compromised, an attacker cannot log in without the time-based one-time code, dramatically improving account security.
This step-by-step guide has shown how to integrate 2FA in a beginner-friendly yet thorough manner. We used Speakeasy for the TOTP logic and qrcode for generating QR codes, combined with Remix's flexible routing and form handling to create a smooth user experience. By following these steps, you can add an important security feature to your Remix application and protect your users.
For further reading and references to deepen your understanding or extend this implementation, check out the following resources:
	•	Speakeasy Documentation (GitHub Readme) – Official documentation for the Speakeasy library, including details on TOTP/HOTP algorithms and advanced usage[15][10].
	•	Google Authenticator Key URI Format – Explanation of the otpauth:// URI scheme used in QR codes, as defined by Google (useful if you want to customize issuer/account names)[14].
	•	Remix Auth TOTP Strategy – An open-source authentication strategy for Remix that provides a turnkey solution for TOTP 2FA, which you can study or use as an alternative to hand-rolling your own[16].
	•	Remix Documentation: Data Writes – Official Remix guide on handling form submissions and actions[11], which underpins how the 2FA form submissions work in our implementation.
	•	RFC 6238 - TOTP Standard – The technical specification for TOTP (Time-Based One-Time Password) algorithm[3], for those interested in the under-the-hood details of how one-time codes are generated.
By implementing 2FA, you're aligning your app with security best practices and giving your users extra peace of mind. Happy coding, and stay secure!

[1] What is Two-Factor Authentication (2FA)? | Definition from TechTarget
https://www.techtarget.com/searchsecurity/definition/two-factor-authentication
[2] [3] [4] [5] [6] [7] [8] [10] [12] [15] speakeasy/README.md at master · speakeasyjs/speakeasy · GitHub
https://github.com/speakeasyjs/speakeasy/blob/master/README.md
[9] qrcode - npm
https://www.npmjs.com/package/qrcode
[11] [13] Data Writes | Remix
https://remix.run/docs/en/main/guides/data-writes
[14] Key Uri Format · google/google-authenticator Wiki · GitHub
https://github.com/google/google-authenticator/wiki/Key-Uri-Format
[16] Remix Auth TOTP | Remix Resources
https://remix.run/resources/remix-auth-totp


<!--EndFragment-->
