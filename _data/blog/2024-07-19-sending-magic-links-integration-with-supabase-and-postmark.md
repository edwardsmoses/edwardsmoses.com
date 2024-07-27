---
template: BlogPost
path: /integrating-magic-links-with-supabase-postmark-and-remix
date: 2024-07-27T09:41:32.403Z
title: Integrating Email Magic Link Authentication with Supabase, Postmark in a Remix React app
metaDescription: How to setup magic sign-in links with Supabase, Postmark and Remix
thumbnail: /assets/edwardsmoses-vaida-krau-lCCesILyHS4-unsplash.jpg
---

<!--StartFragment-->

## **Introduction**

In this article, we’ll explore how to integrate magic links with Supabase in a Remix application. 

Supabase’s built-in email service is rate-limited (at time of writing) at 3 emails per hour; so we want to reach for an external service provider, and we'll be using Postmark for this. 


Let’s get started!


## Getting started

First things first, let's create our remix project using the `create-remix` CLI:

```bash
npx create-remix@latest
```

## Setting up Supabase.

After setting up our project, we want to install the supabase dependencies.

```bash
npm install @supabase/supabase-js @supabase/ssr
```

If you don’t have a Supabase project yet, create one and head over to your Supabase dashboard. 

Get the URL and Anon Key from the project API settings, and add them to a `.env.local` file:

```bash

SUPABASE_PROJECT_URL=<your_supabase_project_url>
SUPABASE_ANON_API_KEY=<your_supabase_api_key>

```

## Supabase Client functions

Next, set up the Supabase client in your app by creating: `app/supabase/supabase.server.ts`

```js
import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";

export const createSupabaseServerClient = (request: Request) => {
  const headers = new Headers();
  const supabaseClient = createServerClient(
    process.env.SUPABASE_PROJECT_URL!,
    process.env.SUPABASE_ANON_API_KEY!,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get("Cookie") ?? "");
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            headers.append(
              "Set-Cookie",
              serializeCookieHeader(name, value, options)
            )
          );
        },
      },
    }
  );
  return { supabaseClient, headers };
};

```

## Setting up the sign-in page

Let's create our sign-in page at: `app/routes/auth.tsx`

```jsx

import { json } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import { createSupabaseServerClient } from "~/supabase/supabase.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { supabaseClient, headers } = createSupabaseServerClient(request);
  const formData = await request.formData();
  const { error } = await supabaseClient.auth.signInWithOtp({
    email: formData.get("email") as string,
    options: {
      emailRedirectTo: "http://localhost:5174/auth-callback",
    },
  });
  console.log('what is error', error);
  
  if (error) {
    return json({ success: false }, { headers });
  }
  return json({ success: true }, { headers });
};

const SignIn = () => {
  const actionData = useActionData<typeof action>();
  const { state } = useNavigation();

  return (
    <div className="bg-orange-50 h-screen flex justify-center items-center">
      {!actionData?.success ? (
        <Form method="post" className="min-w-96 h-auto">
          <div className="w-full">
            <h2 className="text-xl font-medium">Sign in</h2>
            <hr />
            <div className="mb-5 mt-2">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your email address"
                required
              />
            </div>

            <button
              type="submit"
              disabled={state === "submitting"}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {state === "submitting" ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </Form>
      ) : (
        <h3 className="text-lg font-medium">Please check your email.</h3>
      )}
    </div>
  );
};
export default SignIn;


```

Now, we want to create our callback route, the one we defined in the `emailRedirectTo` property, `auth-callback`. Let's create our route: `app/routes/auth-callback.ts`

```js
import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { createSupabaseServerClient } from "~/supabase/supabase.server";

export const loader = async ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (code) {
    const { supabaseClient, headers } = createSupabaseServerClient(request);
    const { error } = await supabaseClient.auth.exchangeCodeForSession(code);
    if (error) {
      return redirect("/auth");
    }
    return redirect("/", {
      headers,
    });
  }
  return new Response("Authentication failed. Please try again", {
    status: 400,
  });
};
```

## Handling Successful sign-in

In the above callback, when the user successfully signs-in, we redirect the user to the `/index` route, let's check if the user is authenticated on this route: `app/routes/_index.tsx`

```jsx



import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  json,
  Link,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { createSupabaseServerClient } from "~/supabase/supabase.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { supabaseClient } = createSupabaseServerClient(request);
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();
  return json({ user });
};

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  const { state } = useNavigation();

  return (
    <div className="bg-orange-50 h-screen flex justify-center items-center">
      {loaderData.user ? (
        <div>
          <h1 className="text-3xl">Welcome to Remix</h1>

          <h1 className="text-xl text-slate-600">
            You are signed in as {loaderData.user.email}
          </h1>

          <Form action="/auth-sign-out" method="POST" className="mt-2">
            <button
              type="submit"
              disabled={state === "submitting"}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {state === "submitting" ? "Signing out..." : "Sign out"}
            </button>
          </Form>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl">Welcome to Remix</h1>

          <h1 className="text-xl text-slate-600 mb-2">Please sign in</h1>
          <Link
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            to="/auth"
          >
            Sign in
          </Link>
        </div>
      )}
    </div>
  );
}


```

Let's also create a simple sign-out route, which we defined in the `Form` action above, `/app/routes/auth-sign-out`

```ts
import { redirect } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";

import { createSupabaseServerClient } from "~/supabase/supabase.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { supabaseClient, headers } = createSupabaseServerClient(request);

  // if the user is not signed in, redirect to the home page
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (!session?.user) {
    return redirect("/");
  }
  // sign out
  await supabaseClient.auth.signOut();
  return redirect("/", {
    headers,
  });
};
```

## Configuring Postmark as Custom SMTP for Supabase.

Now, that we have the magic link functional, we want to configure Postmark as the SMTP provider for supabase.

You want to head over to the Auth settings of your Supabase project, and enable Custom SMTP.
![screenshots](</assets/edwardsmoses.com-Screenshot 2024-07-27 at 11.42.19.png>)

Then, we want to configure the Sender details and the SMTP Provider settings.

- Enter your sender email and sender name.
- SMTP Host as: `smtp.postmarkapp.com`
- Port Number: `587`

Then, you'd want to use your Postmark Server API Token as the SMTP username and password.
![screenshots](</assets/edwardsmoses.com-Screenshot 2024-07-27 at 11.50.23.png>)

### Done 🥳

And that’s it! We’ve successfully integrated magic links using Supabase, Postmark, and Remix. 

The working version of this article is available on GitHub —
<https://github.com/edwardsmoses/magic-links-supabase-remix>

## Documentation

Here're some helpful documentation links:

- Supabase server-side client: <https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/server-side/creating-a-client.mdx>
- Supabase configuration on Custom SMTP: <https://supabase.com/docs/guides/auth/auth-smtp>
- Postmark configuration on sending email with SMTP: <https://postmarkapp.com/developer/user-guide/send-email-with-smtp>

<!--EndFragment-->
