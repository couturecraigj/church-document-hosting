import React from 'react';
import { Query } from 'react-apollo';
// import { Link, Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import styled from 'styled-components';
import ErrorMessage from '../../../components/ErrorMessage';
import Loading from '../../../components/Loading';

const Container = styled.div``;
const ME_QUERY = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      img {
        uri
      }
      email {
        address
      }
      phone {
        number
      }
      memberSince
    }
  }
`;
class Me extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <Container>
        <Query query={ME_QUERY} variables={match.params}>
          {({ data, loading, error }) => {
            if (loading) return <Loading />;
            if (error) return <ErrorMessage />;
            return (
              <div>
                {data.getUser.img && (
                  <img
                    src={`/api/image/${data.getUser.id}/${300}`}
                    alt={data.getUser.img.alt}
                  />
                )}
                <h4>{data.getUser.name}</h4>
                <h4>{data.getUser.email.address}</h4>
                <h4>{data.getUser.phone}</h4>
              </div>
            );
          }}
        </Query>
      </Container>
    );
  }
}

export default Me;
