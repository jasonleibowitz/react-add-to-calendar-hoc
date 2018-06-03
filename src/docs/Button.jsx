import React from 'react';
import { css } from 'emotion';

const buttonClassName = css`
  border: 1px solid #E5E5E5;
  color: #E42D2D;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 3px;
  width: 300px;
  height: 50px;
  cursor: pointer;
  text-transform: uppercase;

  &:focus {
    outline: none;
  }
`;

export default function Button({ children, onClick }) {
  return (
    <button
      className={buttonClassName}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
