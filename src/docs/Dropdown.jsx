import React from 'react';
import { css } from 'emotion';

const dropdownStyles = css`
  padding: 10px;
  border: 1px solid #E5E5E5;
  border-top: none;
  width: 300px;
  background-color: #FFF;
  margin: 0 auto;
`;

export default function Dropdown({ children }) {
  return (
    <div className={dropdownStyles}>
      {children}
    </div>
  );
}