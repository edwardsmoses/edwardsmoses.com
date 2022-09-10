---
template: BlogPost
path: /unit-testing-firestore-rules
date: 2022-09-10T12:11:25.330Z
title: Testing Firestore Rules
thumbnail: /assets/cloudfirestore.png
---

## Introduction

I recently got on a project to build a mobile application using Cloud Firestore as the NoSQL database for the application.

Using Cloud Firestore allows you to secure access to the data using Rules.
While I've worked with Rules in the past, it was easier to check that the rules were working by testing the application.

But this time, the friction to check if the rules were working was high - I would have to login as different users multiple times).

And so, I looked into if it was possible to unit test the Firestore rules to make sure that access to the collections was secure. And voila, it was possible to do that using the Firebase emulator.

So, in this article, I'll be going through how to setup a testing environment for the Firestore rules. Let's begin

## Getting Started

To get started, we'd want to install the Firebase CLI on our local machine. Firebase has an awesome [guide](https://firebase.google.com/docs/cli) on that.

After installing the Firebase CLI on your machine, we'd want to copy the existing rules from the Firebase project to our local machine.

```bash

mkdir firebase_rules && cd firebase_rules

firebase init firestore

```

Then, we'll want to setup the testing environment by installing the packages we'll need for testing and also install the Firestore Emulators (Java must be installed on your machine for the emulator to work).

```bash
npm init -y

npm i @firebase/testing --dev
npm i jest --dev


firebase setup:emulators:firestore

```

To confirm that everything is configured appropriately, let's run the emulator,

```bash
firebase emulators:start --only firestore
```

## Testing the Firestore Rules

So far, we have achieved two things:

- Copying the firestore rules from our project to our local machine
- Installing and Running the Firebase emulator suite.

### Setup Mock Data

To run the tests, we'll need to initialize the Firestore database, and seed it with mock data. We'll create a setup method to do that.

```javascript
const firebase = require("@firebase/testing");
const { assertFails, assertSucceeds } = require("@firebase/testing");
const fs = require("fs");

const PROJECT_ID = "project-id"; //Your Project ID
const FIRESTORE_RULES = fs.readFileSync("firestore.rules", "utf8");

const mockData = {
  "users/edwards": {
    name: "edwards",
  },
  "users/michael": {
    name: "michael",
  },
  "posts/unitTesting": {
    name: "Unit Testing Firestore Rules",
    content: "How to unit testing Firestore Rules",
    written_by: "edwards",
  },
};

const setup = async (auth) => {
  const app = await firebase.initializeTestApp({
    projectId: PROJECT_ID,
    auth,
  });

  const db = app.firestore();

  // Initialize admin app
  const adminApp = firebase.initializeAdminApp({
    projectId: PROJECT_ID,
  });

  const adminDB = adminApp.firestore();

  // Write mock documents before rules using adminApp
  if (mockData) {
    for (const key in mockData) {
      const ref = adminDB.doc(key);
      await ref.set(mockData[key]);
    }
  }

  // Apply rules
  await firebase.loadFirestoreRules({
    projectId: PROJECT_ID,
    rules: FIRESTORE_RULES,
  });

  return db;
};

expect.extend({
  async toAllow(x) {
    let pass = false;
    try {
      await firebase.assertSucceeds(x);
      pass = true;
    } catch (err) {}

    return {
      pass,
      message: () => "Expected Firebase operation to be allowed, but it was denied",
    };
  },
});

expect.extend({
  async toDeny(x) {
    let pass = false;
    try {
      await firebase.assertFails(x);
      pass = true;
    } catch (err) {}
    return {
      pass,
      message: () => "Expected Firebase operation to be denied, but it was allowed",
    };
  },
});
```

What is happening above?

First, we have the firestore rules read into the `FIRESTORE_RULES` variable

Then, we initialize the Firebase project and the Admin SDK. We're using the ADMIN sdk to bypass the rules so we can create the mock documents.

We apply the rules using `loadFirestoreRules`

We also make sure that before every test suite runs, we're clearing the Firestore data to clean-up.

And, lastly, we implement custom Jest matchers to improve the readability of our test suites. Thanks to [Fireship](https://fireship.io/lessons/testing-firestore-security-rules-with-the-emulator/) for this

### Testing Firestore Rules

Now that we have all the configuration we need setup, we'll want to move on to actually testing the Firestore rules.

#### Writing the tests

We want to write all of our tests under:

```javascript
describe("Database Rules", () => {
  afterAll(async () => {
    Promise.all(firebase.apps().map((app) => app.delete())); //teardown the testing environment
  });

  beforeEach(async () => {
    await firebase.clearFirestoreData({ projectId: PROJECT_ID });
  });

  test("should allow a user to update their document", async () => {});
});
```

Let's get started on the test-cases.

#### 1. Users should only be able to update their own document and not others

The related rule:

```javascript

match /users/{userId} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && request.auth.uid == userId
}

function isAuthenticated() {
      return request.auth != null;
}

```

And testing the above rule:

```javascript
test("should allow a user to update their document", async () => {
  const db = await setup({ uid: "edwards" }); //using the setup method above
  userRef = db.doc("users/edwards");
  await expect(userRef.update({})).toAllow();
});

test("should deny a user from updating another user document", async () => {
  const db = await setup({ uid: "michael" }); //using the setup method above
  userRef = db.doc("users/edwards");
  await expect(userRef.update({})).toDeny();
});
```

Each test in the test suite initializes a fresh database instance with a different authenticated user, and uses the same mock data.

In the above, _edwards_ would be able to update his document, but _michael_ would fail to update _edwards_ document.

#### 2. Users can read all posts but can't update posts not created by them

The related rule:

```javascript

match /posts/{postId} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && request.auth.uid == request.resource.data.written_by
    }

 function isAuthenticated() {
      return request.auth != null;
}

```

And testing the above test case:

```javascript
test("should allow a user to read posts", async () => {
  const db = await setup({ uid: "michael" });
  postRef = db.doc("posts/unitTesting");
  await expect(postRef.get()).toAllow();
});

test("should deny a user from updating posts written by another user", async () => {
  const db = await setup({ uid: "michael" });
  postRef = db.doc("posts/unitTesting");
  await expect(postRef.update({})).toDeny();
});
```

Notice how every test above uses the Mock data we have in the setup method. In the above, _michael_ can read a post created by _edwards_, but can't update it.

### Running the Tests

To run the tests,

Update the `test` scripts in your `package.json` to:

```json

 "scripts": {
    "test": "jest"
  },

```

Then run:

```bash
firebase emulators:exec --only firestore "npm run test"
```

### Additional Tests

#### Debugging in Firestore Rules

While working with the Firestore rules, especially when working with complex Firestore rules, it would be helpful to have insight into what each rule statement returns, and Firestore gives us the `debug` function.

The `debug` function only works in the local Firebase Emulator suite, and plays pretty nicely with the testing environment.

If we wanted to identify what the `request.auth.uid` was returning in the `post` rules, here's how we do it.

```javascript

match /posts/{postId} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && debug(request.auth.uid) == request.resource.data.written_by
}


```

And when we run our test suite, in the `firestore-debug.log` file, we should have the following output.

```text
---
string_value: "michael" // for debug(request.auth.uid)

---

```

Here's Firestore comprehensive [documentation](https://firebase.google.com/docs/reference/rules/rules.debug) on the debug function.

#### Testing Access with Custom Claims

Another useful feature that the Firestore Testing suite provides is the ability to test access to documents using custom user claims.

Let's assume that in our database structure, we wanted `admins` to be able to update Posts document for every user — Admins in this scenario would be users with `admin` set to true
in their token claim.

How would we do that?

The related rule:

```javascript

match /posts/{postId} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && request.auth.uid == request.resource.data.written_by
      allow write: if isAuthenticated() && isAdmin()
    }

 function isAdmin() {
      return request.auth.token.admin == true;
}

```

And testing the above rule:

```javascript
test("should allow users with the admin ROLE to update posts written by other users", async () => {
  const db = await setup({ uid: "admin", admin: true });

  postRef = db.doc("posts/unitTesting");
  await expect(postRef.update({})).toAllow();
});
```

And what we're doing above is initializing the Firebase instance with an authenticated user, but with a custom user claim named `admin`

## The End

Using the Firestore emulator for testing the security logic of the Firestore rules boosts the confidence we have in the rules we have created.
We can be sure that there are no data breaches, and it's a delight to work with.

Here's the source code available on GitHub —
<https://github.com/edwardsmoses/testing-firestore-rules>
