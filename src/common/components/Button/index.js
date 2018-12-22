import React from 'react';
import styled from 'styled-components';

const ClickableButton = styled.button`
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
  transition: all 150ms ease;
  margin: 10px 10px 0 10px;
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

const Button = ({ label, children, ...rest }) => (
  <ClickableButton {...rest}>{children || label}</ClickableButton>
);

export default Button;
