import React from 'react';

const BottomNavBar = ({ activeTab, onTabChange, className = '', ...props }) => {
  const navItems = [
    { id: 'resources', label: 'Recursos', icon: '📚' },
    { id: 'chat', label: 'Chat', icon: '💬' },
    { id: 'quiz', label: 'Quiz', icon: '📝' },
    { id: 'flashcards', label: 'Flashcards', icon: '🗃️' }
  ];

  const handleTabClick = (tabId) => {
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <nav 
      className={`bg-surface border-t border-gray-100 px-4 py-2 ${className}`}
      {...props}
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTabClick(item.id)}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ${
              activeTab === item.id
                ? 'text-primary bg-primary-50 scale-105'
                : 'text-text-secondary hover:text-primary hover:bg-primary-50 hover:scale-105'
            }`}
          >
            <span className="text-xl mb-1 transition-transform duration-200">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavBar; 