import React from 'react';

const SettingsGroup = ({ title, children, className = "" }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="heading-xs text-gray-900 font-semibold">{title}</h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
};

export default SettingsGroup; 