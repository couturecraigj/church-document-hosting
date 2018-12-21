import React from 'react';
import styled from 'styled-components';

const ClickableButton = styled.button`
  padding: 2px 9px;
  border-radius: 0.25em;
  margin: 0.125em;
`;

const Button = ({ label, children, ...rest }) => (
  <ClickableButton {...rest}>{children || label}</ClickableButton>
);

export default Button;
