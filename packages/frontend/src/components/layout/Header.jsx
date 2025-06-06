import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllMentors, selectActiveMentorId, selectMentorById } from '../../state/mentorsSlice';

const Header = ({ title, subtitle, className = '', ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Get mentor data from Redux store
  const allMentors = useSelector(selectAllMentors);
  const activeMentorId = useSelector(selectActiveMentorId);

  // Check if we're on a mentor dashboard page
  const isMentorDashboard = location.pathname.startsWith('/mentor/');
  
  // Always call useSelector, but make it return null when not needed
  const currentMentor = useSelector(state => {
    if (isMentorDashboard && params.mentorId) {
      return selectMentorById(state, params.mentorId);
    }
    return null;
  });

  // Determine the actual title and subtitle to display
  const displayTitle = title || (currentMentor ? currentMentor.name : 'MentorIA');
  const displaySubtitle = subtitle || (currentMentor ? currentMentor.subject : undefined);

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
                {displayTitle}
              </h1>
              
              {/* Quick Mentor Switcher - Only show on MentorDashboard */}
              {isMentorDashboard && allMentors.length > 1 && (
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
                      <div className="absolute top-full left-0 mt-1 w-64 bg-surface border border-gray-200 rounded-lg shadow-lg z-20 animate-fade-in">
                        <div className="py-2">
                          <div className="px-3 py-2 text-xs font-medium text-text-secondary uppercase tracking-wide border-b border-gray-100">
                            Cambiar mentor
                          </div>
                          {allMentors.map((mentor) => (
                            <button
                              key={mentor.id}
                              onClick={() => handleMentorSwitch(mentor.id)}
                              className={`w-full flex items-center px-3 py-2 text-sm transition-colors duration-150 ${
                                activeMentorId === mentor.id 
                                  ? 'bg-primary-50 text-primary border-r-2 border-primary' 
                                  : 'text-text-primary hover:bg-primary-50 hover:text-primary'
                              }`}
                            >
                              <div className={`w-3 h-3 ${mentor.color} rounded-full mr-3 flex-shrink-0`} />
                              <div className="flex-1 text-left">
                                <div className="font-medium truncate">{mentor.name}</div>
                                <div className="text-xs text-text-secondary truncate">{mentor.subject}</div>
                              </div>
                              {activeMentorId === mentor.id && (
                                <svg className="w-4 h-4 text-primary ml-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
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
            
            {displaySubtitle && (
              <p className="text-sm text-text-secondary truncate">
                {displaySubtitle}
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