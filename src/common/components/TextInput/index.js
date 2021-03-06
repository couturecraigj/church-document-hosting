import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  padding: 2px;
  width: 100%;
  /* font-weight: bold; */
`;

const Input = styled.input`
  display: block;
  margin: 10px 0 20px 0;
  /* max-width: 500px; */
  padding: 10px 14px;
  font-size: 1em;
  /* font-family: 'Source Code Pro', monospace; */
  box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px,
    rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
  border: 0;
  outline: 0;
  width: 100% !important;
  border-radius: 4px;
  background: white;
`;

const Container = styled.div`
  padding: 2px;
  width: 100%;
`;

const TextInput = ({ label, name, placeholder, type, ...rest }) => (
  <Container>
    <Label>
      {label}
      <Input {...rest} name={name} placeholder={placeholder} type={type} />
    </Label>
  </Container>
);

export default TextInput;
