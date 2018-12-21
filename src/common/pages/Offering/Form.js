import React from 'react';
import styled from 'styled-components';
import { withFormik } from 'formik';
import { CardElement } from 'react-stripe-elements';
import DatePicker from '../../components/DatePicker';
import TextInput from '../../components/TextInput';
import SingleChoice from '../../components/SingleChoice';
import Checkbox from '../../components/Checkbox';

const Label = styled.label`
  display: inline-block;
  width: 400px;
  text-align: center;
`;

const ErrorMessage = styled.div``;

const Button = styled.button.attrs({ type: 'submit' })`
  white-space: nowrap;
  border: 0;
  outline: 0;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  padding: 0 14px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  color: #fff;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  background-color: #6772e5;
  text-decoration: none;
  -webkit-transition: all 150ms ease;
  transition: all 150ms ease;
  margin-top: 10px;
  &:hover {
    color: #fff;
    cursor: pointer;
    background-color: #7795f8;
    transform: translateY(-1px);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  }
  &:disabled {
    color: #ddd;
    background-color: #727598;
  }
`;

const Form = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  response,
  ...props
}) => (
  <form onSubmit={handleSubmit}>
    <TextInput
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.email}
      name="email"
      placeholder="Email"
      label="Email"
    />
    {console.log(props)}
    <TextInput
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.amount}
      name="amount"
      placeholder="Amount"
      label="Amount"
      step=".01"
      type="number"
    />

    <div>
      <Label>
        Card details
        <CardElement style={{ base: { fontSize: '18px' } }} />
      </Label>
    </div>

    <Checkbox
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.recurring}
      name="recurring"
      label="Recurring"
    />
    {values.recurring && (
      <React.Fragment>
        <SingleChoice
          name="frequency"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.frequency}
          type="checkbox"
          choices={[
            { label: 'Once a month', value: '1month' },
            { label: 'Once a week', value: '1week' },
            { label: 'Every 2 weeks', value: '2week' }
          ]}
          label="Frequency"
        />
        <DatePicker
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.date}
          name="date"
          label="Starting On"
        />
      </React.Fragment>
    )}
    <Button disabled={isSubmitting}>Send Gift</Button>
    <ErrorMessage>{response}</ErrorMessage>
  </form>
);

export default withFormik({
  displayName: 'OfferingForm',
  handleSubmit: (values, { props, setSubmitting }) => {
    setSubmitting(true);
    return props
      .onSubmit(values)
      .then(() => {
        setSubmitting(false);
      })
      .catch(() => {
        setSubmitting(false);
      });
  }
})(Form);
