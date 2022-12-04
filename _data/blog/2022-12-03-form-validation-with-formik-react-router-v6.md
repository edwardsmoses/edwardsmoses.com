---
template: BlogPost
path: /form-validation-with-react-router-v6
date: 2022-12-03T11:42:19.959Z
title: Form Validation with Formik, Yup & React Router v6
metaDescription: In this article, we will explore how to use Formik and Yup with the new React router version, and we will provide code examples to help you get started quickly
thumbnail: /assets/react_router_v6.png
---

## Introduction

I recently got on a project to build a web application using React, and I wanted to explore the new React Router v6 library. This latest version of React Router introduces several new features.

One key improvement in the new version is the introduction of the `action` and `loader` flow. With this new flow, React Router v6 provides better support for asynchronous actions and data loading, compared to previous versions.

It has a more declarative and explicit model; we can be able to clearly define and control the components, actions and data loaders that are used in our application in a more predictable way.

## Getting started

We'll start off with a minimal React project. When we have the project setup, we want to proceed by installing React Router v6, Yup and Formik. To do that, we'll run the familiar command:

```bash

npm install react-router-dom formik yup


```

And, then, afterwards, we want to import the components and hooks that we'll need. Some of the imports are:

```javascript
import { useFormik } from "formik";
import * as yup from "yup";
import {
  createBrowserRouter,
  RouterProvider,
  useSubmit,
  useActionData,
  useNavigation,
  ActionFunctionArgs,
} from "react-router-dom";
```

Next, we'll want to define the routes in our application. This involves specifying the path, component, and optionally, the actions, loaders for each route.

For example, if you want to define a route that renders a SignUp component at the `/signup` path, we can do it like this:

```typescript
const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignUpPage />,
    action: SignUpAction,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
```

When we'll have the Routes defined, we want to have the Signup component created; And also define the Yup and Formik schema for the component. Here's how we could do it:

```typescript
type SignUpFormData = {
  email: string;
  password: string;
  repeatPassword: string;
};

const validationSchema = yup.object({
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().required("Password is required").min(6, "Password must be 6 characters long or more"),
  repeatPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
});

const SignUpPage = () => {
  const submit = useSubmit();

  const formik = useFormik<SignUpFormData>({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      submit(values, { method: "post" });
    },
  });

  return (
    <form method="post" onSubmit={formik.handleSubmit}>
      <Input
        id="email"
        type="email"
        label="Email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        errorMessage={formik.touched.email ? formik.errors.email : ""}
      />
      ....
    </form>
  );
};
```

Above, we specifically make use of the `useSubmit` hook from the new Router API.

The `useSubmit` hook is a custom hook provided that allows us to handle form submissions. The hook allows for declarative definition of actions that submit form data and handle responses.

In the above example, we'll use the `useSubmit` hook to handle the SignUp form submission after the user values from the form passes the Yup validation.

Afterwards, we want to get the form data submitted by the hook in the Action. Here's a sample snippet:

```typescript
export const SignUpAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);

  console.log(values);

  try {
    //call an external API to create a new user account
  } catch (error) {
    return { error: "There was an error creating your account." };
  }
};
```

Above, we'll first get the values from the form data, and we can then pass those values to an external backend API.

Notice, in the `catch` block of the above, we return a sample `error` property, this is pretty convenient.

Because then, in our SignUp component, we can then display the `error` property:

```typescript
const actionData = useActionData();
const { error } = actionData || {};
```

Another pretty nice part of the new React Router API is the `navigation` component. 

We can use the `navigation.state` to determine if the form is submitting, which is nice because we don't have to create a `[processing]` state to manage that.

```typescript
const navigation = useNavigation();
```

And in our component, we can then use it to determine if the form is in the submitting state.

```typescript
<Button type="submit" disabled={navigation.state === "submitting"}>
  {navigation.state === "submitting" && <Spinner />}
  <span>Sign Up</span>
</Button>
```

## The End

And that's it!

In conclusion, the React Router v6 is a powerful and flexible routing library for React applications, and it offers many new features and improvements that make it easier and more convenient to manage the data flow for routes in our application.

With the combination of the `useSubmit` hook and `action` property, we can define when we want to handle form submissions and validation, and also benefit from the declarative and consistent handling of data-flow in the new API.

Whether you are building a simple single-page application or a complex enterprise application, React Router v6 is an essential tool for creating and maintaining efficient and user-friendly routing in your React applications.
