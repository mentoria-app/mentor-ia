import React from 'react';

const BottomNavBar = ({ activeTab, onTabChange, className = '', ...props }) => {
  const navItems = [
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
      className={`bg-white border-t border-gray-200 px-4 py-2 ${className}`}
      {...props}
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTabClick(item.id)}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
              activeTab === item.id
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavBar; 