import React from 'react';

const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-surface rounded-lg shadow-sm border border-gray-100 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card; 