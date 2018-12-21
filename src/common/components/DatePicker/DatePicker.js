import 'react-dates/initialize';
import React from 'react';
import styled from 'styled-components';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import 'react-dates/lib/css/_datepicker.css';
import './DatePicker.css';

const Label = styled.label`
  /* padding: 2px; */
  /* font-weight: bold; */
`;

const Container = styled.div`
  padding: 2px;
`;

class DatePicker extends React.Component {
  state = {
    date: null,
    focused: false
  };
  static getDerivedStateFromProps = (props, state) => {
    if (props.value !== state.date) {
      console.log(props.value);
      const value =
        typeof props.value === 'number' ? props.value * 1000 : props.value;
      return {
        date: moment(value)
      };
    }
    return null;
  };
  onFocusChange = ({ focused, ...rest }) => {
    const { onBlur, name } = this.props;
    const { date } = this.state;
    this.setState(
      {
        focused
      },
      () => {
        if (!focused) onBlur({ target: { name, value: date.unix() } });
      }
    );
  };
  onDateChange = date => {
    const { onChange, name } = this.props;
    this.setState({ date }, () => {
      onChange({ target: { name, value: date.unix() } });
    });
  };
  render() {
    const { label, name, placeholder } = this.props;
    const { date, focused } = this.state;
    return (
      <Container>
        <Label>
          <div>{label}</div>
          <SingleDatePicker
            date={date}
            id={name}
            focused={focused}
            onDateChange={this.onDateChange}
            onFocusChange={this.onFocusChange}
            placeholder={placeholder}
          />
        </Label>
      </Container>
    );
  }
}

export default DatePicker;
