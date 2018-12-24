import React from 'react';
import { Query } from 'react-apollo';
import { Link, Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import styled from 'styled-components';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';

const Container = styled.div``;
const ME_QUERY = gql`
  query MeQuery {
    me {
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
            if (!data.me) return <Redirect to="/" />;
            return (
              <div>
                <h2>{data.me.name}</h2>
                {data.me.admin && <Link to="/user/new">New User</Link>}
              </div>
            );
          }}
        </Query>
      </Container>
    );
  }
}

export default Me;
