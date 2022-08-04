---
template: BlogPost
path: /braintree-payment-integration-react-native-expo
date: 2022-08-04T07:52:56.482Z
title: Integrating the Braintree Payment solution in React Native/Expo and Node.js
metaDescription: A guide to getting you started with Braintree Payment Gateway
  integration in Typescript-based applications (React Native & Node.js)
thumbnail: /assets/braintreehomepage.jpg
---
# **Introduction**

Recently got on a project to integrate Braintree as a payment system on an Expo project, and couldn't find any resources on doing that, so this is my attempt at one. 

In this article, we will integrate the Braintree API Gateway SDK along with Node.js and Express, and then we will create a front-end application using React Native. 

At the end of this, you should have a functioning integration that accepts credit/debit card payments in sandbox using Braintree Direct's drop-in user interface. 

## Getting Started

So, to get started, the first step would be installing the braintree server npm module on your expressjs project. 

```
npm install braintree --save
```

When we have that installed, we want to setup a payment controller & route to resolve transactions through the Braintree payment gateway. 

```
const braintree = require("braintree");

// Set your secret key. Remember to switch to your live secret key in production.
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createPaymentTransaction = async (paymentData) => {
  try {
    const result = await gateway.transaction.sale({
      amount: paymentData.amount,
      paymentMethodNonce: paymentData.nonce,
      options: {
        submitForSettlement: true
      }
    });

    return {
      isPaymentSuccessful: result.success,
      errorText: result.transaction?.processorResponseText || "",
    }

  } catch (error) {
    console.log("Error in creating transaction ", error);
    return { isPaymentSuccessful: false, errorText: "Error in creating the payment transaction" + error };
  }
};
```

To test if the above is working properly, you can pass 'fake-valid-nonce' to the \`nonce\` key in the \`paymentData\` request param. 





<!--EndFragment-->