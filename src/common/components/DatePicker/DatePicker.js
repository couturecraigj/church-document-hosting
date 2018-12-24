import 'react-dates/initialize';
import React from 'react';
import styled from 'styled-components';
import Button from '../Button';
import {
  SingleDatePicker,
  isInclusivelyAfterDay,
  isInclusivelyBeforeDay
} from 'react-dates';
// import { OPEN_DOWN } from 'react-dates/constants';
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
    oldDate: null,
    focused: false,
    fill: false
  };
  static getDerivedStateFromProps = (props, state) => {
    console.log(props.value);
    if (props.value !== state.date) {
      let value =
        typeof props.value === 'number' ? props.value * 1000 : props.value;
      if (!props.value) value = undefined;
      console.log(value);
      return {
        date: moment(value),
        oldDate: null
      };
    }
    if (!props.value)
      return {
        date: moment(),
        oldDate: null
      };

    return null;
  };

  // componentDidMount = () => {
  //   const {isOptional} = this.props;

  // }
  constructor(props) {
    super(props);
    const { isOptional } = props;
    this.state = {
      fill: !isOptional,
      date: moment(),
      focused: false
    };
  }

  onButtonPress = () => {
    this.setState(state => {
      this.onChange(!state.fill ? moment().unix() : null);
      return {
        fill: !state.fill,
        date: moment(),
        focused: state.fill
      };
    });
  };

  onChange = value => {
    const { name, onChange } = this.props;
    onChange({ target: { name, value } });
  };
  onBlur = value => {
    const { name, onBlur } = this.props;
    onBlur({ target: { name, value } });
  };
  onFocusChange = ({ focused, ...rest }) => {
    console.log('focus change');
    // if (oldDate === null && date !== null)
    this.setState(state => {
      if (!focused) this.onBlur(state.date !== null ? state.date.unix() : null);
      return {
        focused
      };
    });
  };
  onDateChange = date => {
    if (!date || !date.isValid()) return this.setState({ oldDate: null });
    console.log('date Change');
    console.log(date);
    this.setState({ focused: true });
    this.setState(state => {
      this.onChange(date && date.unix());
      this.onBlur(date && date.unix());
      return { date, oldDate: state.date };
    });
  };
  render() {
    const {
      label,
      name,
      placeholder,
      past,
      future,
      current,
      isOptional,
      calendarPlacement = 'up'
    } = this.props;
    const { date, focused, fill } = this.state;
    console.log(date);
    const isOutsideRange = day => {
      // if (current && !moment().diff(day, 'days')) return false;
      if (past && future) return false;
      if (past && current) return !isInclusivelyBeforeDay(day, moment());
      if (past) return isInclusivelyAfterDay(day, moment());
      if (future && current) return !isInclusivelyAfterDay(day, moment());
      if (future) return isInclusivelyAfterDay(day, moment());
      return !isInclusivelyAfterDay(day, moment());
    };
    return (
      <Container>
        <Label>
          <div>{label}</div>
          {isOptional && (
            <Button type="button" onClick={this.onButtonPress}>
              {fill ? 'No' : 'Yes'}
            </Button>
          )}
          {fill && (
            <SingleDatePicker
              date={date}
              openDirection={calendarPlacement}
              // withPortal
              isOutsideRange={isOutsideRange}
              id={name}
              focused={focused}
              onDateChange={this.onDateChange}
              onFocusChange={this.onFocusChange}
              placeholder={placeholder}
            />
          )}
        </Label>
      </Container>
    );
  }
}

export default DatePicker;
