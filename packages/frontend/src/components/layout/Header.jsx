import React from 'react';

const Header = ({ title = 'MentorIA', subtitle, className = '', ...props }) => {
  return (
    <header 
      className={`bg-surface shadow-sm border-b border-gray-100 px-4 py-3 ${className}`}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-text-primary truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-text-secondary truncate">
              {subtitle}
            </p>
          )}
        </div>
        
        {/* Placeholder for future action buttons (e.g., menu, settings) */}
        <div className="flex items-center space-x-2">
          {/* Future: Menu button, settings, etc. */}
        </div>
      </div>
    </header>
  );
};

export default Header; 