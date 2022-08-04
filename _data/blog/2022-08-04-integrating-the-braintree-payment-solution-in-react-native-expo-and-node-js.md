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

In this article, we will integrate the Braintree API Gateway SDK along with Node.js and Express, and then we will create a front-end application using Expo/React Native. 

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

app.post('/createPaymentTransaction', async (req, res) => {
  const { body } = req;

  try {

    //create a transaction 
    const result = await gateway.transaction.sale({
      amount: body.amount,
      paymentMethodNonce: body.nonce,
      options: {
        submitForSettlement: true
      }
    });

    res.status(200).json({
      isPaymentSuccessful: result.success,
      errorText: result.transaction?.processorResponseText || "",
    });

  } catch (error) {
    console.log("Error in creating transaction ", error);
    res.status(400).json({
      isPaymentSuccessful: false, errorText: "Error in creating the payment transaction" + error
    });

  }
});
```

To test if the above is working properly, you can pass 'fake-valid-nonce' to the \`nonce\` key in the \`paymentData\` request param. 

## Next, Setup HTML client

We want to collect the customer payment information. The easiest way to get up and running is via the Drop-in UI. We'd be serving the HTML file via express. 

```
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <script src="https://js.braintreegateway.com/web/dropin/1.33.2/js/dropin.min.js"></script>
</head>

<body style="display:flex;flex-direction: column;">
  <div id="dropin-container"></div>
  <button id="submit-button" class="paymentButton">COMPLETE PAYMENT</button>
  <script>
    var button = document.querySelector('#submit-button');
    braintree.dropin.create({
      authorization: '', //the tokenization key from Braintree
      container: '#dropin-container'
    }, function (createErr, instance) {
      button.addEventListener('click', function () {
        button.textContent="PROCESSING PAYMENT";
        instance.requestPaymentMethod((requestPaymentMethodErr, payload) => {
          // Send payload to React Native to send to the server
          window.ReactNativeWebView.postMessage(payload.nonce);
        });
      });
    });
  </script>
</body>

</html>
```

Some key things from the html file above: 

* The authorization property when setting up the braintree dropin ui. We'd be using the Braintree tokenization key, here's [Braintree's guide](https://developer.paypal.com/braintree/docs/guides/authorization/tokenization-key/javascript/v3) on getting the key.  
* When the drop-in client SDK communicates the customer's card information to Braintree, Braintree returns a payment method nonce, and we want to send that to React Native. We do that by using the \`window.ReactNativeWebView.postMessage\` [method](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Guide.md#the-windowreactnativewebviewpostmessage-method-and-onmessage-prop) 

The express routing to serve the html file: 

```
const path = require('path');

app.get('/braintree', function (req, res) {
  res.sendFile(path.join(__dirname, 'braintree.html'));
});
```

## Lastly, Setup React Native Client

We want to embed the HTML served by express in a webview on react native. First, install the react-native-webview package. 

```
npm install --save react-native-webview
```

Or if you're using Expo, 

```
expo install react-native-webview
```

After installing the webview package, we'd be creating the component to embed the `/braintree` route in the Webview. 

```
export const BrainTreePaymentWebView = ({
  onNonceRetrieved
}) => {
 const host = "http://localhost:3000"; 

  return (
    <View style={{ height: 450' }}>
      <WebView
        source={{ uri: `${host}/braintree` }}
        onMessage={(event) => {
          onNonceRetrieved(event.nativeEvent.data);
        }}

      />
    </View>
  )
}
```

After creating the Braintree component, we'd want to get the payment nonce to the Braintree payment transaction resolver route, `createPaymentTransaction`. 

```
const onPaymentNonceRetrieved = async (nonce: string) => {
    const host = "http://localhost:3000"; 

const response = await axios.post(`${host}/payment/createBrainTreePaymentTransaction`, 
{
      amount: 10, //change to price gotten from your user
      nonce: nonce,
    }
, {
   headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });

  const { isPaymentSuccessful, errorText } = await response.data;




    Alert.alert(isPaymentSuccessful ? "Payment successful" : "Payment error");
 

  };
```

And, we are done... When you click on Complete Payment, the app should show an alert informing you that Payment is sucessful. 

### Finished! Done!

The Working version of this project is available on GitHub —
https://github.com/edwardsmoses/braintree-rn-integration-sample

Here are some resources that could be helpful during your integration:

https://developer.paypal.com/braintree/docs/start/overview
https://developer.paypal.com/braintree/docs/guides/authorization/tokenization-key/javascript/v3

<!--EndFragment-->