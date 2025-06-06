import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = ({ title = 'MentorIA', subtitle, className = '', ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Check if we're on a mentor dashboard page
  const isMentorDashboard = location.pathname.startsWith('/mentor/');

  // Placeholder mentor data for quick switcher
  const availableMentors = [
    { id: 1, name: 'Matemáticas', color: 'bg-primary' },
    { id: 2, name: 'Historia', color: 'bg-secondary' },
    { id: 3, name: 'Biología', color: 'bg-purple-500' },
    { id: 4, name: 'Química', color: 'bg-red-500' },
    { id: 5, name: 'Física', color: 'bg-indigo-500' },
  ];

  const handleBackClick = () => {
    navigate('/mentors');
  };

  const handleMentorSwitch = (mentorId) => {
    navigate(`/mentor/${mentorId}`);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header 
      className={`bg-surface shadow-sm border-b border-gray-100 px-4 py-3 relative ${className}`}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          {/* Back Button - Only show on MentorDashboard */}
          {isMentorDashboard && (
            <button
              onClick={handleBackClick}
              className="p-2 text-text-secondary hover:text-primary transition-colors duration-200 hover:bg-primary-50 rounded-lg"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 19l-7-7 7-7" 
                />
              </svg>
            </button>
          )}

          {/* Title and Subtitle */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-semibold text-text-primary truncate">
                {title}
              </h1>
              
              {/* Quick Mentor Switcher - Only show on MentorDashboard */}
              {isMentorDashboard && (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="p-1 text-text-secondary hover:text-primary transition-colors duration-200 hover:bg-primary-50 rounded"
                  >
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 9l-7 7-7-7" 
                      />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <>
                      {/* Backdrop */}
                      <div 
                        className="fixed inset-0 z-10"
                        onClick={() => setIsDropdownOpen(false)}
                      />
                      
                      {/* Dropdown Content */}
                      <div className="absolute top-full left-0 mt-1 w-48 bg-surface border border-gray-200 rounded-lg shadow-lg z-20 animate-fade-in">
                        <div className="py-2">
                          <div className="px-3 py-2 text-xs font-medium text-text-secondary uppercase tracking-wide border-b border-gray-100">
                            Cambiar mentor
                          </div>
                          {availableMentors.map((mentor) => (
                            <button
                              key={mentor.id}
                              onClick={() => handleMentorSwitch(mentor.id)}
                              className="w-full flex items-center px-3 py-2 text-sm text-text-primary hover:bg-primary-50 hover:text-primary transition-colors duration-150"
                            >
                              <div className={`w-3 h-3 ${mentor.color} rounded-full mr-3 flex-shrink-0`} />
                              <span className="truncate">{mentor.name}</span>
                            </button>
                          ))}
                          <div className="border-t border-gray-100 mt-1 pt-1">
                            <button
                              onClick={() => {
                                navigate('/mentors');
                                setIsDropdownOpen(false);
                              }}
                              className="w-full flex items-center px-3 py-2 text-sm text-text-secondary hover:bg-gray-50 transition-colors duration-150"
                            >
                              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                              <span>Ver todos los mentores</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
            
            {subtitle && (
              <p className="text-sm text-text-secondary truncate">
                {subtitle}
              </p>
            )}
          </div>
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