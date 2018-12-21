import React from 'react';
import { Formik } from 'formik';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router-dom';
import { queryMe } from '../../../components/Layout';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import './ResetPassword.css';

const RESET_PASSWORD = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      id
    }
  }
`;

class ResetPassword extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <div>
        <Mutation mutation={RESET_PASSWORD}>
          {(resetPassword, { client, data }) => {
            const meQuery = client.readQuery({ query: queryMe });
            if ((meQuery && meQuery.me) || (data && data.resetPassword))
              return <Redirect to="/" />;
            return (
              <Formik
                onSubmit={input =>
                  resetPassword({ variables: { input } }).then(() =>
                    client.resetStore()
                  )
                }
                initialValues={{
                  ...match.params,
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
                  <form onSubmit={handleSubmit}>
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

                    <Button type="button" label="Cancel" />
                    <Button type="submit" label="Submit" />
                  </form>
                )}
              </Formik>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default ResetPassword;
