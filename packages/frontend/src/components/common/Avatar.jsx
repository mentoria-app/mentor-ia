import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ src, size = 'md', alt = 'Avatar', rounded = 'full', className = '', style = {}, ...props }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const roundedClasses = {
    full: 'rounded-full',
    lg: 'rounded-lg',
    md: 'rounded-md',
    sm: 'rounded-sm',
    none: 'rounded-none'
  };

  // Fallback for invalid size or rounded values
  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const roundedClass = roundedClasses[rounded] || roundedClasses.full;

  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover ${sizeClass} ${roundedClass} ${className}`}
      style={style}
      {...props}
    />
  );
};

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  alt: PropTypes.string,
  rounded: PropTypes.oneOf(['full', 'lg', 'md', 'sm', 'none']),
  className: PropTypes.string,
  style: PropTypes.object
};

export default Avatar; 