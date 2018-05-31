import React from 'react';

export default function Dropdown({ children }) {
  return (
    <div style={{ padding: '10px', border: '1px solid black', borderTop: 'none' }}>
      {children}
    </div>
  );
}