import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '', 
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'button-text rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-600 focus:ring-primary-500 active:bg-primary-700',
    secondary: 'bg-secondary text-white hover:bg-secondary-600 focus:ring-secondary-500 active:bg-secondary-700',
    outline: 'border border-primary text-primary bg-transparent hover:bg-primary hover:text-white focus:ring-primary-500',
    ghost: 'text-primary bg-transparent hover:bg-primary-50 focus:ring-primary-500',
  };

  const sizeClasses = {
      sm: 'px-3 py-1.5 body-sm',
  md: 'px-4 py-2 button-text',
  lg: 'px-6 py-3 button-text',
  xl: 'px-8 py-4 body-md',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button 
      className={classes}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 