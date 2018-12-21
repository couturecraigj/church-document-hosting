import React from 'react';
// import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import './Document.css';

const GET_DOCUMENTS = gql`
  query GetDocumentsByDate($id: ID!) {
    getDocument(id: $id) {
      id
      date
      content
      title
    }
  }
`;

class Documents extends React.Component {
  render() {
    const offset = new Date().getTimezoneOffset() * 60 * 1000;
    const { match } = this.props;
    return (
      <Query query={GET_DOCUMENTS} variables={match.params}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading</div>;
          if (error) return <div>Error</div>;
          const doc = data.getDocument;
          let date = new Date(doc.date);
          date = new Date(date.getTime() + offset);
          return (
            <div className="Documents">
              <h2>{doc.title}</h2>
              <h5>{date.toLocaleDateString()}</h5>
              <div dangerouslySetInnerHTML={{ __html: doc.content }} />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Documents;
