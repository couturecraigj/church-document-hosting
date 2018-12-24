import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import styled from 'styled-components';
import ErrorMessage from '../../../components/ErrorMessage';
import Loading from '../../../components/Loading';
import TextInput from '../../../components/TextInput';
import DatePicker from '../../../components/DatePicker';
import Button from '../../../components/Button';
import FormDebugger from '../../../components/FormDebugger';
import { Formik } from 'formik';

const dev = process.env.NODE_ENV !== 'production';

const Container = styled.div`
  padding: 0 10px;
`;
const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      name
      admin
    }
  }
`;
const CREATE_USER = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      id
      name
      admin
    }
  }
`;
class Me extends React.Component {
  render() {
    return (
      <Container>
        <Query query={ME_QUERY}>
          {({ data, loading, error }) => {
            if (loading) return <Loading />;
            if (error) return <ErrorMessage />;
            if (!dev && !data.me) return <Redirect to="/" />;
            if (!dev && !data.me.admin) return <Redirect to="/" />;
            return (
              <Mutation mutation={CREATE_USER}>
                {createUser => (
                  <Formik
                    onSubmit={input => createUser({ variables: { input } })}
                    initialValues={{
                      firstName: '',
                      lastName: '',
                      email: '',
                      birthday: null,
                      memberSince: null,
                      // firstVisit: null,
                      anniversary: null
                    }}
                  >
                    {({ handleSubmit, values, handleChange, handleBlur }) => (
                      <form onSubmit={handleSubmit}>
                        <TextInput
                          name="firstName"
                          label="First Name"
                          placeholder="First Name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.firstName}
                        />
                        <TextInput
                          name="lastName"
                          label="Last Name"
                          placeholder="Last Name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.lastName}
                        />
                        <TextInput
                          name="email"
                          label="Email"
                          placeholder="Email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        <TextInput
                          name="phone"
                          label="Phone"
                          placeholder="Phone"
                          type="phone"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phone}
                        />
                        <DatePicker
                          name="birthday"
                          label="Birthday"
                          isOptional
                          placeholder="Birthday"
                          current
                          past
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.birthday}
                        />
                        <DatePicker
                          name="memberSince"
                          label="Member Since"
                          placeholder="Member Since"
                          isOptional
                          current
                          past
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.memberSince}
                        />
                        <DatePicker
                          name="firstVisit"
                          label="First Visit"
                          placeholder="First Visit"
                          onChange={handleChange}
                          current
                          past
                          onBlur={handleBlur}
                          value={values.firstVisit}
                        />
                        <DatePicker
                          name="anniversary"
                          label="Anniversay"
                          placeholder="Anniversay"
                          isOptional
                          current
                          past
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.anniversary}
                        />
                        <FormDebugger values={values} />
                        <div>
                          <Button type="submit">Submit</Button>
                        </div>
                      </form>
                    )}
                  </Formik>
                )}
              </Mutation>
            );
          }}
        </Query>
      </Container>
    );
  }
}

export default Me;
