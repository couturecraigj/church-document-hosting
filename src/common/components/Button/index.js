import React from "react";
import styled from "styled-components";

const Input = styled.button`
  padding: 2px 9px;
  border-radius: 0.25em;
  margin: 0.125em;
`;

const Button = ({ label, name, placeholder, type }) => (
  <Input name={name} placeholder={placeholder} type={type}>
    {label}
  </Input>
);

export default Button;
