import React from 'react';

const Header = ({ title = 'MentorIA', subtitle, className = '', ...props }) => {
  return (
    <header 
      className={`bg-white shadow-sm border-b border-gray-200 px-4 py-3 ${className}`}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-gray-900 truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-gray-600 truncate">
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