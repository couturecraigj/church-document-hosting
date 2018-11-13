import React from "react";
import { Formik, Form, Field } from "formik";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import "./Login.css";

class Login extends React.Component {
  render() {
    return (
      <div className="Login">
        <Formik onSubmit={console.log} initialValues={{ userName: "", password: "" }}>
          <Form>
            <ul className="Login-resources">
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
                    autoComplete="current-password"
                    label="Password"
                    type="password"
                  />
                )}
              </Field>
              <Button type="submit" label="Submit" />
            </ul>
          </Form>
        </Formik>
      </div>
    );
  }
}

export default Login;
