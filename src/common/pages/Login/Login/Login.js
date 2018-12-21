import React from 'react';
import { Formik } from 'formik';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router-dom';
import { queryMe } from '../../../components/Layout';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import './Login.css';

const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    logIn(input: $input) {
      id
      userName
      email {
        address
      }
    }
  }
`;

class Login extends React.Component {
  render() {
    const { switchScreen } = this.props;
    return (
      <div>
        <Mutation mutation={LOGIN}>
          {(
            login,
            {
              client,
              data,
              error: { graphQLErrors, networkError, ...error } = {},
              loading
            }
          ) => {
            const meQuery = client.readQuery({ query: queryMe });
            if ((meQuery && meQuery.me) || (data && data.logIn))
              return <Redirect to="/" />;
            return (
              <Formik
                initialValues={{ userName: '', password: '' }}
                onSubmit={values =>
                  login({ variables: { input: values } }).then(() =>
                    client.resetStore()
                  )
                }
              >
                {({
                  values,
                  // touched,
                  // errors,
                  handleChange,
                  handleBlur,
                  handleSubmit
                }) => (
                  <form onSubmit={handleSubmit}>
                    <TextInput
                      name="userName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.userName}
                      placeholder="User Name"
                      autoComplete="username"
                      label="User Name"
                      type="text"
                    />
                    <TextInput
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="Password"
                      autoComplete="current-password"
                      label="Password"
                      type="password"
                    />
                    {error.message && <div>{JSON.stringify(error)}</div>}
                    <Button type="button" label="Cancel" />
                    <Button type="submit" label="Submit" disabled={loading} />
                  </form>
                )}
              </Formik>
            );
          }}
        </Mutation>
        <div>
          Need an account?{' '}
          <Button label="Sign Up" onClick={() => switchScreen('SignUp')} />
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

export default Login;
