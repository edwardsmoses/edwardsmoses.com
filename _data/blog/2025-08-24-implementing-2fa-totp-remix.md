---
template: BlogPost
path: /implementing-2fa-totp-with-remix
date: 2025-08-24T14:35:36.203Z
title: Implementing Two-Factor Authentication (2FA) with TOTP in a Remix app
thumbnail: https://images.credly.com/images/cc8adc83-1dc6-4d57-8e20-22171247e052/blob
---

<!--StartFragment-->

## **Introduction**

I've always wondered how TOTP for 2FA actually worked.

You open Google Authenticator or Microsoft Authenticator, scan a QR code, and suddenly the app starts generating a 6-digit code that keeps changing every few seconds. From the user's side, the whole thing feels simple. From the app side, though, I wanted to understand the moving pieces properly.

So I built a small demo app called `totp-demo` to see the whole flow end-to-end: login with email and password, turn on 2FA from settings, scan a QR code, verify the first code, and then enforce that TOTP step on the next login.

That's what this article covers. We'll keep the auth system small, back it with SQLite, and wire the TOTP flow in a way that still feels close to a real project.

## Getting started

I'm using the current React Router / Remix tooling here, so the project starts with `create-react-router`:

```bash
npx create-react-router@latest totp-demo
cd totp-demo
```

If you've used Remix for a while, the route/action flow will still feel familiar, which made this a nice place to experiment.

I also used this as an excuse to finally try [Jujutsu](https://jj-vcs.github.io/jj/latest/). I've heard enough good things about it for a while now, so I figured I might as well let this demo be the project where I stop procrastinating.

I'm on a Mac, so I installed it with:

```bash
brew install jj
```

Then initialized the repo:

```bash
jj git init
```

That gave me the first clean snapshot of the project:

![Jujutsu repository initialized](/assets/totp/edwardsmoses.com_CleanShot 2025-08-24 at 15.30.21.png)

And `jj st` gives the status view of the working tree:

![Jujutsu status output](/assets/totp/edwardsmoses.com_CleanShot 2025-08-24 at 15.39.43.png)

Before the first describe, I configured identity:

```bash
jj config set --user user.name "Edwards Moses"
jj config set --user user.email "edwardsmoses3@gmail.com"
```

And then:

```bash
jj describe -m "chore: start of totp demo"
```

![Jujutsu first describe](/assets/totp/edwardsmoses.com_CleanShot 2025-08-24 at 15.49.53.png)

## Installing the packages

For this demo, I wanted the smallest set of dependencies that still made the app feel real.

- `speakeasy` handles the TOTP secret generation and token verification.
- `qrcode` turns the `otpauth://` URL into an image that an authenticator app can scan.
- `better-sqlite3` gives us a simple local database without introducing an ORM.
- `bcryptjs` lets us hash the demo password instead of storing it in plain text.

To install them:

```bash
npm install speakeasy qrcode better-sqlite3 bcryptjs
```

We also need a session secret for the cookie session storage. I added this to a `.env` file at the project root:

```bash
SESSION_SECRET=super-secret-but-not-for-production
```

## Setting up the demo database

Since I wanted this article rooted in an actual project, I didn't want to wave the data layer away with "assume auth already exists".

I'm keeping the demo database intentionally small. We only need a single `users` table with the normal login bits and the two fields that matter for 2FA:

- `two_factor_temp_secret` while the user is in setup
- `two_factor_secret` once setup is verified and permanent

Create `app/utils/db.server.ts`:

```ts
import Database from "better-sqlite3";
import { hashSync } from "bcryptjs";

const db = new Database("totp-demo.sqlite");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    two_factor_enabled INTEGER NOT NULL DEFAULT 0,
    two_factor_secret TEXT,
    two_factor_temp_secret TEXT
  )
`);

const existingUser = db
  .prepare("SELECT id FROM users WHERE email = ?")
  .get("demo@example.com");

if (!existingUser) {
  db.prepare(
    `
      INSERT INTO users (
        email,
        password_hash,
        two_factor_enabled
      ) VALUES (?, ?, 0)
    `
  ).run("demo@example.com", hashSync("password123", 10));
}

export function findUserByEmail(email: string) {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email);
}

export function findUserById(id: number) {
  return db.prepare("SELECT * FROM users WHERE id = ?").get(id);
}

export function setTemporaryTwoFactorSecret(userId: number, secret: string) {
  db.prepare(
    `
      UPDATE users
      SET two_factor_temp_secret = ?
      WHERE id = ?
    `
  ).run(secret, userId);
}

export function enableTwoFactor(userId: number) {
  db.prepare(
    `
      UPDATE users
      SET
        two_factor_enabled = 1,
        two_factor_secret = two_factor_temp_secret,
        two_factor_temp_secret = NULL
      WHERE id = ?
    `
  ).run(userId);
}

export function clearTwoFactor(userId: number) {
  db.prepare(
    `
      UPDATE users
      SET
        two_factor_enabled = 0,
        two_factor_secret = NULL,
        two_factor_temp_secret = NULL
      WHERE id = ?
    `
  ).run(userId);
}
```

For the demo, I'm seeding a single user directly from the DB helper, so I don't have to build registration too. That gives us a stable account to test against:

- email: `demo@example.com`
- password: `password123`

At this point, the app shape I cared about looked like this:

```bash
app/
  routes/
    login.tsx
    settings.2fa.tsx
    verify-2fa.tsx
  utils/
    db.server.ts
    session.server.ts
```

## Session helpers

We need two session states in this app:

- a fully authenticated session with `userId`
- a temporary "halfway through auth" session with `pending2faUserId`

That second state is the important part. After the password is correct, we still don't want to treat the user as fully signed in until the TOTP code checks out.

Create `app/utils/session.server.ts`:

```ts
import { createCookieSessionStorage, redirect } from "react-router";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: false,
    secrets: [process.env.SESSION_SECRET || "not-secure"],
  },
});

export async function getSession(cookieHeader: string | null) {
  return sessionStorage.getSession(cookieHeader);
}

export async function commitSession(session: any) {
  return sessionStorage.commitSession(session);
}

export async function destroySession(session: any) {
  return sessionStorage.destroySession(session);
}

export async function requireUserId(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");

  if (!userId) {
    throw redirect("/login");
  }

  return userId;
}
```

I'm using the same cookie for both states; the only thing that changes is which key is present in the session.

## Building the login route

Now for the actual auth flow.

The `login` route checks the email and password. If the user doesn't have 2FA turned on, we set `userId` in session and redirect home. If they do have 2FA enabled, we set `pending2faUserId` instead and redirect to `/verify-2fa`.

Create `app/routes/login.tsx`:

```tsx
import { compareSync } from "bcryptjs";
import { Form, redirect, useActionData, useNavigation } from "react-router";
import { findUserByEmail } from "~/utils/db.server";
import { getSession, commitSession } from "~/utils/session.server";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email")?.toString().trim() || "";
  const password = formData.get("password")?.toString() || "";

  const user = findUserByEmail(email);

  if (!user || !compareSync(password, user.password_hash)) {
    return { error: "Invalid email or password." };
  }

  const session = await getSession(request.headers.get("Cookie"));

  if (user.two_factor_enabled) {
    session.set("pending2faUserId", user.id);

    return redirect("/verify-2fa", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  session.set("userId", user.id);

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Login() {
  const actionData = useActionData();
  const navigation = useNavigation();

  return (
    <div>
      <h1>Login</h1>

      <Form method="post">
        <input type="email" name="email" placeholder="demo@example.com" required />
        <input
          type="password"
          name="password"
          placeholder="password123"
          required
        />
        <button type="submit">
          {navigation.state === "submitting" ? "Signing in..." : "Sign in"}
        </button>
      </Form>

      {actionData?.error ? <p>{actionData.error}</p> : null}
    </div>
  );
}
```

I like this split because the password step stays boring. The only extra branch is whether we stop there or send the user to the second factor page.

## Generating the QR code and turning on 2FA

Once the user is logged in, we can give them a page to enable 2FA.

The first job on `/settings/2fa` is to generate a new secret and store it in `two_factor_temp_secret`. I only move it into `two_factor_secret` after the user proves the setup worked by entering a valid code from their authenticator app.

Create `app/routes/settings.2fa.tsx`:

```tsx
import QRCode from "qrcode";
import speakeasy from "speakeasy";
import { Form, useActionData, useLoaderData } from "react-router";
import {
  findUserById,
  setTemporaryTwoFactorSecret,
  enableTwoFactor,
} from "~/utils/db.server";
import { requireUserId } from "~/utils/session.server";

async function qrCodeForSecret(userEmail: string, secret: string) {
  const otpAuthUrl = speakeasy.otpauthURL({
    secret,
    label: `totp-demo:${userEmail}`,
    issuer: "totp-demo",
    encoding: "base32",
  });

  return QRCode.toDataURL(otpAuthUrl);
}

export async function loader({ request }) {
  const userId = await requireUserId(request);
  const user = findUserById(userId);

  return {
    twoFactorEnabled: Boolean(user.two_factor_enabled),
  };
}

export async function action({ request }) {
  const userId = await requireUserId(request);
  const user = findUserById(userId);
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "generate") {
    const secret = speakeasy.generateSecret({
      name: user.email,
      issuer: "totp-demo",
    });

    setTemporaryTwoFactorSecret(userId, secret.base32);

    return {
      qrCodeDataUrl: await QRCode.toDataURL(secret.otpauth_url),
      success: false,
    };
  }

  if (intent === "verify") {
    const token = formData.get("token")?.toString() || "";

    if (!user.two_factor_temp_secret) {
      return { error: "Start setup again so we can generate a new secret." };
    }

    const verified = speakeasy.totp.verify({
      secret: user.two_factor_temp_secret,
      encoding: "base32",
      token,
      window: 1,
    });

    if (!verified) {
      return {
        error:
          "That code didn't match. Try the current code from your authenticator app.",
        qrCodeDataUrl: await qrCodeForSecret(
          user.email,
          user.two_factor_temp_secret
        ),
      };
    }

    enableTwoFactor(userId);

    return {
      success: true,
    };
  }

  return { error: "Unknown action." };
}

export default function TwoFactorSettings() {
  const actionData = useActionData();
  const loaderData = useLoaderData();

  return (
    <div>
      <h1>Two-Factor Authentication</h1>

      {loaderData.twoFactorEnabled ? (
        <p>2FA is already enabled on this account.</p>
      ) : null}

      {!actionData?.qrCodeDataUrl && !actionData?.success ? (
        <Form method="post">
          <input type="hidden" name="intent" value="generate" />
          <button type="submit">Generate QR code</button>
        </Form>
      ) : null}

      {actionData?.qrCodeDataUrl ? (
        <div>
          <p>
            Scan this with Google Authenticator, Microsoft Authenticator, or
            Authy.
          </p>
          <img src={actionData.qrCodeDataUrl} alt="TOTP QR code" />

          <Form method="post">
            <input type="hidden" name="intent" value="verify" />
            <input
              type="text"
              name="token"
              placeholder="123456"
              maxLength={6}
              required
            />
            <button type="submit">Verify and enable 2FA</button>
          </Form>
        </div>
      ) : null}

      {actionData?.error ? <p>{actionData.error}</p> : null}
      {actionData?.success ? <p>2FA is now enabled for this account.</p> : null}
    </div>
  );
}
```

A couple of useful things are happening here:

- `speakeasy.generateSecret()` creates the shared secret
- `QRCode.toDataURL()` turns the `otpauth://` URL into an image
- the first valid token is what graduates the secret from temporary to permanent
- `window: 1` gives a small amount of time drift tolerance, which makes testing less annoying

That temporary secret field is doing a real job for us. If the user abandons setup halfway through, we haven't fully enabled 2FA yet, and we haven't accidentally made the account harder to access.

## Verifying the TOTP code during login

Now for the part we actually care about enforcing.

When a user with 2FA enabled logs in, we redirect them to `/verify-2fa`. On this route, we read `pending2faUserId` from session, look up the stored secret, and verify the submitted token.

If the token is correct, we promote the session from "pending 2FA" to "fully logged in".

Create `app/routes/verify-2fa.tsx`:

```tsx
import speakeasy from "speakeasy";
import { Form, redirect, useActionData, useNavigation } from "react-router";
import { findUserById } from "~/utils/db.server";
import { getSession, commitSession } from "~/utils/session.server";

export async function loader({ request }) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.get("pending2faUserId")) {
    throw redirect("/login");
  }

  return null;
}

export async function action({ request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const pendingUserId = session.get("pending2faUserId");
  const token = (await request.formData()).get("token")?.toString() || "";

  if (!pendingUserId) {
    throw redirect("/login");
  }

  const user = findUserById(pendingUserId);

  if (!user || !user.two_factor_secret) {
    return { error: "This account doesn't have 2FA enabled." };
  }

  const verified = speakeasy.totp.verify({
    secret: user.two_factor_secret,
    encoding: "base32",
    token,
    window: 1,
  });

  if (!verified) {
    return { error: "Invalid code. Try the latest code from your authenticator app." };
  }

  session.unset("pending2faUserId");
  session.set("userId", user.id);

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function VerifyTwoFactor() {
  const actionData = useActionData();
  const navigation = useNavigation();

  return (
    <div>
      <h1>Verify 2FA</h1>
      <p>Enter the 6-digit code from your authenticator app.</p>

      <Form method="post">
        <input
          type="text"
          name="token"
          placeholder="123456"
          maxLength={6}
          required
        />
        <button type="submit">
          {navigation.state === "submitting" ? "Checking..." : "Verify code"}
        </button>
      </Form>

      {actionData?.error ? <p>{actionData.error}</p> : null}
    </div>
  );
}
```

That completes the loop.

At this point, the app behaves the way I wanted from the start:

- password-only login for accounts without 2FA
- password + TOTP for accounts with 2FA enabled
- setup only becomes permanent after the first successful verification

## A quick production note

For this demo, I'm storing the TOTP secret directly in SQLite so the flow is easy to follow.

In a real application, I'd treat that secret much more carefully:

- encrypt it at rest
- make sure disable / reset flows are deliberate
- add backup codes so users don't get stranded when they lose a device

I'm intentionally leaving recovery codes out of this walkthrough so the core TOTP flow stays easy to follow.

## Testing the flow

Once everything was wired up, I ran through the whole thing with the seeded user.

The test path is pretty simple:

1. Sign in with `demo@example.com` and `password123`.
2. Visit `/settings/2fa` and generate a QR code.
3. Scan the QR code with an authenticator app.
4. Enter the current 6-digit token to finish setup.
5. Sign out and log back in.
6. Confirm the app now pauses at `/verify-2fa` before finishing login.

A few useful failure cases to test too:

- enter the wrong code during setup and make sure 2FA does not turn on
- enter the wrong code on `/verify-2fa` and make sure the session stays pending
- wait for the code to rotate and verify the next one still works
- clear the 2FA columns in SQLite and confirm the account falls back to password-only login

If you can get through those cases cleanly, the implementation is in a pretty solid place.

## Wrapping up

This was a fun one.

TOTP feels a lot less magical once you build it yourself. At the end of the day, the flow is just:

- generate a shared secret
- let the user scan it
- verify one code to confirm setup
- ask for the code again on future logins

The nice part is how well this fits the Remix model. Route actions are a good home for the verification logic, sessions make the "pending 2FA" state easy to model, and a tiny SQLite demo is enough to make the whole thing feel real.

If you're adding this to an existing app, the main pieces to lift from the demo are the same ones that made this one work: temporary secret during setup, permanent secret after verification, and a separate login state for users who are halfway through authentication.

<!--EndFragment-->
