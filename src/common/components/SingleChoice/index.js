import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  /* padding: 2px; */
  /* font-weight: bold; */
`;
const Button = styled.label`
  background: #6772e5;
  color: #fff;
  padding: 8px 18px;
  font-weight: 600;
  text-transform: uppercase;
  border-right: #9399d4 solid 1px;
  border-left: #9399d4 solid 1px;
  /* border-radius: 4px; */
  &.checked {
    background: #1f30e6;
  }
  &:first-of-type {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  &:last-of-type {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  /* padding: 2px; */
  /* font-weight: bold; */
`;

const Input = styled.input`
  display: block;
  margin: 10px 0 20px 0;
  /* max-width: 500px; */
  padding: 10px 14px;
  font-size: 1em;
  /* font-family: 'Source Code Pro', monospace; */
  -webkit-box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px,
    rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
  box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px,
    rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
  border: 0;
  outline: 0;
  width: 400px;
  border-radius: 4px;
  background: white;
`;

const Container = styled.div`
  padding: 2px;
`;

const TextInput = ({
  label,
  name,
  placeholder,
  type,
  choices = [],
  ...rest
}) => (
  <Container>
    <div>
      <Label>{label}</Label>
    </div>
    {choices.map(({ label, value }) => (
      <React.Fragment key={value}>
        <Button {...rest} className={rest.value === value && 'checked'}>
          {label}
          <Input
            hidden
            {...rest}
            type="radio"
            name={name}
            placeholder={placeholder}
            value={value}
            checked={rest.value === value}
          />
        </Button>
      </React.Fragment>
    ))}
  </Container>
);

export default TextInput;
