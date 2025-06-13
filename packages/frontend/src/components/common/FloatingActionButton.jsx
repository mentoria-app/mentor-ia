import React from 'react';

const FloatingActionButton = ({ 
  onClick, 
  children, 
  className = '', 
  size = 'md',
  variant = 'primary',
  disabled = false,
  ...props 
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const variantClasses = {
    primary: `bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 
      shadow-glow hover:shadow-strong text-white`,
    accent: `bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 
      shadow-glow-accent hover:shadow-strong text-white`,
    secondary: `bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 
      shadow-medium hover:shadow-strong text-white`
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        fixed bottom-6 right-4 z-30
        rounded-2xl button-text font-semibold
        transition-all duration-300 ease-out
        hover:scale-110 hover:-translate-y-1
        active:scale-95 active:duration-75
        focus:outline-none focus:ring-4 focus:ring-primary-200
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0
        flex items-center justify-center
        backdrop-blur-sm
        group
        ${className}
      `}
      {...props}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent 
        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative flex items-center justify-center space-x-2">
        {children}
      </div>

      {/* Ripple effect on click */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-white/20 scale-0 rounded-2xl transition-transform duration-300 
          group-active:scale-100 group-active:duration-75" />
      </div>
    </button>
  );
};

export default FloatingActionButton; 