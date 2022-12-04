---
template: BlogPost
path: /form-validation-with-react-router-v6
date: 2022-12-03T11:42:19.959Z
title: Form Validation with Formik, Yup & React Router v6
metaDescription: Guide on implementing Form Validation with Formik, Yup and React router v6
thumbnail: /assets/react_router_v6.png
---

S﻿tart on article.

First import,

```javascript
import { useFormik } from "formik";
import * as yup from "yup";
import { useSubmit, useActionData, useNavigation, ActionFunctionArgs } from "react-router-dom";
```

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

const SignupRoute = () => {

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

  <form
                method="post"
                onSubmit={formik.handleSubmit}

              >

                  <input
                    id="email"
                    type="email"
                    label="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    errorMessage={formik.touched.email ? formik.errors.email : ""}
                  />



    )
}


```

what's happening , we use the useSubmit hook from react router, and then formik and yup validation combined, to submit the form to react router after validation.

additional details

Getting the Form data info from the submitted entries.

```typescript
export const SubmitAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);

  try {
    ///create the User with the values
  } catch (error) {
    return { error: "An account with this email already exists. Please log in to continue." };
  }
};
```

if there is an error in the action, return, and get it in the component

```typescript
const actionData = useActionData();
const { error } = actionData || {};
```

you can then display the error using the `error` variable.

you can also use the `navigation.state` to determine if the form is submitting. this is nice because you don't have to manage the processing state of the form manually.

```typescript
const navigation = useNavigation();
```

and in the component, you can use the component to determine if the form is in the submitting state.

```typescript
<Button type="submit" disabled={navigation.state === "submitting"}>
  {navigation.state === "submitting" && <Spinner />}
  <span>Sign Up</span>
</Button>
```
