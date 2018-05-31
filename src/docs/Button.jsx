import React from 'react';

export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        border: '1px solid #E42D2D',
        color: '#E42D2D',
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: '700',
        borderRadius: '3px',
        width: '300px',
        height: '50px',
        cursor: 'pointer',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </button>
  );
}
