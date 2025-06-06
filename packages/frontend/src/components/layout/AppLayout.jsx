import React from 'react';
import Header from './Header';
import BottomNavBar from './BottomNavBar';

const AppLayout = ({ 
  children, 
  headerTitle, 
  headerSubtitle, 
  activeTab, 
  onTabChange, 
  showBottomNav = true,
  className = '',
  ...props 
}) => {
  return (
    <div 
      className={`min-h-screen bg-gray-50 flex flex-col ${className}`}
      {...props}
    >
      {/* Header */}
      <Header 
        title={headerTitle} 
        subtitle={headerSubtitle}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      {showBottomNav && (
        <BottomNavBar 
          activeTab={activeTab} 
          onTabChange={onTabChange}
        />
      )}
    </div>
  );
};

export default AppLayout; 