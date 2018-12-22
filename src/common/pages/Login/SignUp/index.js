import React from 'react';
import { Formik } from 'formik';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router-dom';
import { queryMe } from '../../../components/Layout';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import Form from '../../../components/Form';
import './SignUp.css';

const SIGN_UP = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      id
    }
  }
`;

class SignUp extends React.Component {
  render() {
    const { switchScreen } = this.props;
    return (
      <div>
        <Mutation mutation={SIGN_UP}>
          {(signUp, { client, data }) => {
            const meQuery = client.readQuery({ query: queryMe });
            if ((meQuery && meQuery.me) || (data && data.signUp))
              return <Redirect to="/" />;
            return (
              <Formik
                onSubmit={input =>
                  signUp({ variables: { input } }).then(() =>
                    client.resetStore()
                  )
                }
                initialValues={{
                  userName: '',
                  firstName: '',
                  lastName: '',
                  email: '',
                  confirmEmail: '',
                  password: '',
                  confirmPassword: ''
                }}
              >
                {({
                  values,
                  // touched,
                  // errors,
                  handleChange,
                  handleBlur,
                  handleSubmit
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <TextInput
                      name="firstName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                      placeholder="First Name"
                      autoComplete="given-name"
                      label="First Name"
                      type="text"
                    />
                    <TextInput
                      name="lastName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                      placeholder="Last Name"
                      autoComplete="family-name"
                      label="Last Name"
                      type="text"
                    />
                    <TextInput
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="Email"
                      autoComplete="email"
                      label="Email"
                      type="text"
                    />
                    <TextInput
                      name="confirmEmail"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmEmail}
                      placeholder="Confirm Email"
                      autoComplete="email"
                      label="Confirm Email"
                      type="text"
                    />
                    <TextInput
                      name="userName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.userName}
                      placeholder="User Name"
                      autoComplete="email"
                      label="User Name"
                      type="text"
                    />
                    <TextInput
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="Password"
                      autoComplete="new-password"
                      label="Password"
                      type="password"
                    />

                    <TextInput
                      name="confirmPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      autoComplete="new-password"
                      placeholder="Confirm Password"
                      label="Confirm Password"
                      type="password"
                    />
                    <div>
                      <Button type="button" label="Cancel" />
                      <Button type="submit" label="Submit" />
                    </div>
                  </Form>
                )}
              </Formik>
            );
          }}
        </Mutation>

        <div>
          Have an account?
          <Button onClick={() => switchScreen('Login')}>Login</Button>
        </div>
        <div>
          Forgot your password?{' '}
          <Button
            label="Click Here!"
            onClick={() => switchScreen('ForgotPassword')}
          />
        </div>
      </div>
    );
  }
}

export default SignUp;
