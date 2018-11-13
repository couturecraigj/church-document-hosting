import React from "react";
import styled from "styled-components";

const Input = styled.button`
  padding: 2px;
`;

const Button = ({ label, name, placeholder, type }) => (
  <Input name={name} placeholder={placeholder} type={type}>
    {label}
  </Input>
);

export default Button;
