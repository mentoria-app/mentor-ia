import React from 'react';

const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`rounded-lg shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card; 