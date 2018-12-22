import React from 'react';
// import { Formik, Form, Field } from 'formik';
import { Elements } from 'react-stripe-elements';
import CardElement from './CardElement';
import styled from 'styled-components';
// import TextInput from '../../components/TextInput';
// import Button from '../../components/Button';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

class Offering extends React.Component {
  render() {
    return (
      <Container>
        <Elements>
          <CardElement />
        </Elements>
      </Container>
    );
  }
}

export default Offering;
