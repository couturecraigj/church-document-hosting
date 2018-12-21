import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import './Documents.css';

const DateLinkWrapper = styled.div`
  padding: 5px;
`;
const DateLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const GET_DOCUMENTS = gql`
  query GetDocumentsByDate {
    getDocumentsByDate {
      date
      documents {
        id
        title
      }
    }
  }
`;

class Documents extends React.Component {
  render() {
    const offset = new Date().getTimezoneOffset() * 60 * 1000;
    return (
      <div className="Documents">
        <h2>Documents</h2>
        <Query query={GET_DOCUMENTS}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading</div>;
            if (error) return <div>Error</div>;
            return (
              <ul>
                {data.getDocumentsByDate.map(docMap => {
                  let date = new Date(docMap.date);
                  date = new Date(date.getTime() + offset);

                  return (
                    <li key={docMap.date}>
                      <div>
                        <strong>{date.toLocaleDateString()}</strong>
                      </div>
                      <DateLinkContainer>
                        {docMap.documents.map(doc => (
                          <DateLinkWrapper key={doc.id}>
                            <Link to={`/document/${doc.id}`}>{doc.title}</Link>
                          </DateLinkWrapper>
                        ))}
                      </DateLinkContainer>
                    </li>
                  );
                })}
              </ul>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Documents;
