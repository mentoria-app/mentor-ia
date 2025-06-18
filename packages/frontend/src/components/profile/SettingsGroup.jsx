import React from 'react';

const SettingsGroup = ({ title, children, className = "", isDanger = false }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Section Header */}
      <div className="px-1">
        <h2 className={`text-lg font-semibold ${
          isDanger ? 'text-red-700' : 'text-gray-900'
        }`}>
          {title}
        </h2>
      </div>
      
      {/* Section Content */}
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
};

export default SettingsGroup; 