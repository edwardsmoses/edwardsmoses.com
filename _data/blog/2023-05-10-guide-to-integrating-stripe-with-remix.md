---
template: BlogPost
path: /guide-to-integrating-stripe-with-remix
date: 2023-05-10T10:07:46.203Z
title: Accepting Payments with Stripe in Remix Run [In Progress]
thumbnail: /assets/edwardsmoses_stripe_remix.png
---

<!--StartFragment-->

## **Introduction**

Working with the Remix's architecture makes integrating Stripe feel like bliss.
In the past, when React and the backend lived in separate realms, dealing with them individually felt relatively complex.

However, with Remix's unified file structure and consolidated `actions` and `loaders`, the process now flows smooth and effortless.

So, when I got the opportunity to start on a new project building a web application that involved accepting payments, I reached for Remix in a heartbeat.

In this article, we will explore how Remix and Stripe allows us to easily accept payments - let's dive in.

## Getting started

First things first, we want to install the necessary dependencies.

We have a couple of key players here:

- `stripe` is our go-to for server-side API calls to Stripe.
- `@stripe/stripe-js` - helps load Stripe.js on the client-side to help us work with the payment dtails.
- and lastly, we have `@stripe/react-stripe-js`, the React-specific library with all the components and hooks to make integrating with Stripe a breeze.

To install them:

```bash
npm add stripe @stripe/stripe-js @stripe/react-stripe-js
```

## Adding Environment Variables

We want to add our secret API key, we'll have it in the `.env` file in the root of the project. You can find the API keys in the [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)

Here's how we want the key to look in the file:

```env

STRIPE_SECRET_KEY=sk_test...

```

## Creating the Payment Routes

Now that we've the environment all setup. We want to create new routes called "pay/" and "pay/success" - one for the payment form and the last for the payment confirmation page.

```bash

app/
 - routes/
  - pay.tsx
  - pay.index.tsx
  - pay.success.tsx
```

We're using the new route file naming system by Remix here - you can learn more about it [here](https://remix.run/docs/en/main/file-conventions/route-files-v2).

To have the Stripe Payment form rendered in our application, we need to add the `Elements` provider. It's wraps all sub-components from Stripe; we pass it a "stripe" prop and, since we're using the PaymentElement, we also need to pass an "options" prop.

Here's a peek of what it looks like:

```tsx

"pay.tsx"

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


const stripePromise = loadStripe('pk_test...')


<Elements stripe={stripePromise} options={{  }}>
  <Outlet />
</Elements>

```

Above, we use the Stripe Public key to initialize the Stripe client - to get your keys, check out the link highlighted earlier.

## Rendering the Payment Form

Now that we have the elements wrapping our routes, we want to render the `PaymentForm` into our page.

<!-- To do that, we want to create a `PaymentIntent` from an api route - check out [Remix docs](https://remix.run/docs/en/main/guides/api-routes) on the topic. -->

```ts
"pay.tsx";

import Stripe from "stripe";
import { json } from "@remix-run/node";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function loader() {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2000,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  return json(paymentIntent);
}
```

Above, we're creating the payment intent with an `amount` of $20, the `currency` and returning the `paymentIntent` object back from the loader function.

Now, that we have the paymentIntent, we want to pass the `client_secret` from the payment intent into our options in the `Elements` component. Our `pay.tsx` layout file would look something like this:

```tsx
"pay.tsx";

import Stripe from "stripe";
import { json } from "@remix-run/node";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { useLoaderData } from "@remix-run/react";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const stripePromise = loadStripe("pk_test...");

export async function loader() {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2000,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  return json(paymentIntent);
}

const Payment = () => {
  const paymentIntent = useLoaderData<typeof loader>();

  return (
    <Elements stripe={stripePromise} options={{ clientSecret: paymentIntent.client_secret }}>
      <Outlet />
    </Elements>
  );
};

export default Payment;
```

We're getting close to the finish line, we have the paymentIntent created and passing the client secret to the Elements component.

Next we want to drop in our `PaymentElement` component:

```tsx
"pay.index.tsx";

import { PaymentElement } from "@stripe/react-stripe-js";

const Index = () => {
  return (
    <form>
      <PaymentElement />
      <button>Complete Payment</button>
    </form>
  );
};

export default Index;
```

And voila, we have the Payment form rendered on the page, and the user can input their Card details.

And as the final step of this process, we want to handle the form submission, and then pass the payment details to Stripe to confirm the payment.

```tsx

"pay.index.tsx"

import {PaymentElement} from '@stripe/react-stripe-js'
import {useStripe, useElements} from '@stripe/react-stripe-js'

const Index = () => {

const stripe = useStripe();
const elements = useElements();

const handleSubmit = = async (e: any) => {
  e.preventDefault();

  await stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: 'http://localhost:3000/pay/success'
    }
  })
}

  return (
    <form onSubmit={handleSubmit}>
     <PaymentElement / >
     <button>Complete Payment</button>
    </form>
  )

}

export default Index;

```

Notice above, we're passing in a `return_url` to Stripe. Let's handle that, and update the `pay/success` route:

```tsx

"pay.success.tsx"


import {useStripe} from '@stripe/react-stripe-js'
import { useEffect. useState } from "react";


const Index = () => {

const stripe = useStripe();
const elements = useElements();


const [paymentStatus, setPaymentStatus] = useState("");

   useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret as string).then(({ paymentIntent }) => {
            setPaymentStatus(paymentIntent?.status);
        });
    }, [stripe]);


  return (
    <h3>{paymentStatus}</h3>
  )

}

export default Index;


```

### Done

And yes!! yes!! We are done!!!!

To test the payment integration, we can use the [following test cards provided by Stripe](https://stripe.com/docs/testing#cards)

When you click on 'Complete Payment', the app should redirect to the `pay/success` route confirming that the Payment was successful.

The Working version of this article is available on GitHub —
