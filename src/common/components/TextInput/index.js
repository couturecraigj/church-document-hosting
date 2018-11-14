import React from "react";
import styled from "styled-components";

const Label = styled.label`
  padding: 2px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 2px;
  border-radius: 0.25em;
  border: 1px #999 solid;
`;

const Container = styled.div`
  padding: 2px;
`;

const TextInput = ({ label, name, placeholder, type, ...rest }) => (
  <Container>
    <Label>{label}</Label>
    <Input {...rest} name={name} placeholder={placeholder} type={type} />
  </Container>
);

export default TextInput;
