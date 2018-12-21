import React from 'react';
import { injectStripe } from 'react-stripe-elements';
import Form from './Form';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const SEND_GIFT = gql`
  mutation SendGift(
    $token: TokenInput!
    $email: String
    $amount: Float!
    $recurring: Boolean!
    $frequency: String
    $date: Date
  ) {
    sendGift(
      token: $token
      email: $email
      amount: $amount
      recurring: $recurring
      frequency: $frequency
      date: $date
    )
  }
`;

class CardSection extends React.Component {
  state = { render: true };
  componentDidMount() {
    this.makeRender();
  }
  makeRender = () => {
    setTimeout(() => this.setState({ render: true }));
  };
  render() {
    const { render } = this.state;
    if (!render) return null;
    return (
      <Mutation mutation={SEND_GIFT}>
        {(sendGift, { data }) => {
          const handleSubmit = values => {
            if (this.props.stripe)
              return this.props.stripe.createToken().then(payload =>
                sendGift({
                  variables: {
                    ...payload,
                    ...values
                  }
                })
              );
            else return Promise.resolve();
          };
          return (
            <Form
              onSubmit={handleSubmit}
              response={data ? data.sendGift : ''}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default injectStripe(CardSection);
