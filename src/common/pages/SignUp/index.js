import React from "react";
import { Formik, Form, Field } from "formik";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import "./SignUp.css";

class SignUp extends React.Component {
  render() {
    return (
      <Formik
        onSubmit={values =>
          fetch("/api/signup", {
            method: "POST",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json; charset=utf-8"
              // "Content-Type": "application/x-www-form-urlencoded",
            },
            body: JSON.stringify(values)
          })
        }
        initialValues={{ userName: "", password: "", confirmPassword: "" }}
      >
        <Form>
          <Field name="userName">
            {({ field }) => (
              <TextInput
                {...field}
                placeholder="User Name"
                autoComplete="username"
                label="User Name"
                type="text"
              />
            )}
          </Field>
          <Field name="password">
            {({ field }) => (
              <TextInput
                {...field}
                placeholder="Password"
                autoComplete="new-password"
                label="Password"
                type="password"
              />
            )}
          </Field>
          <Field name="confirmPassword">
            {({ field }) => (
              <TextInput
                {...field}
                autoComplete="new-password"
                placeholder="Confirm Password"
                label="Confirm Password"
                type="password"
              />
            )}
          </Field>
          <Button type="button" label="Cancel" />
          <Button type="submit" label="Submit" />
        </Form>
      </Formik>
    );
  }
}

export default SignUp;
