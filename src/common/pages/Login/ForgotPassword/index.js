import React from 'react';
import { Formik } from 'formik';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import './ForgotPassword.css';

const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

class ForgotPassword extends React.Component {
  render() {
    const { switchScreen } = this.props;
    return (
      <div>
        <Mutation mutation={FORGOT_PASSWORD}>
          {forgotPassword => (
            <Formik
              onSubmit={variables => forgotPassword({ variables })}
              initialValues={{ email: '' }}
            >
              {({ values, handleChange, handleBlur, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
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
                  <Button type="button" label="Cancel" />
                  <Button type="submit" label="Submit" />
                </form>
              )}
            </Formik>
          )}
        </Mutation>
        <div>
          Have an account?
          <Button onClick={() => switchScreen('Login')}>Login</Button>
        </div>
        <div>
          Need an account?{' '}
          <Button label="Sign Up" onClick={() => switchScreen('SignUp')} />
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
