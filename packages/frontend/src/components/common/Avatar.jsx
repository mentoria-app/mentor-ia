import React from 'react';

const Avatar = ({ src, size = 'md', alt = 'Avatar', ...props }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  return (
    <img
      src={src}
      alt={alt}
      className={`rounded-full object-cover ${sizeClasses[size]}`}
      {...props}
    />
  );
};

export default Avatar; 