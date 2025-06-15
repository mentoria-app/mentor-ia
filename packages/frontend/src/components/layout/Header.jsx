import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllMentors, selectActiveMentorId, selectMentorById } from '../../state/mentorsSlice';

// Constants for performance - avoid recreation
const NAVIGATION_DELAYS = {
  BACK: 150,
  MENTOR_SWITCH: 200,
  PROFILE: 150
};

const BUTTON_STYLES = {
  BASE: "relative overflow-hidden transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-1",
  ICON: "p-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg hover:scale-105 active:scale-95",
  RIPPLE: "absolute inset-0 rounded-lg bg-primary-100 opacity-0 hover:opacity-20 transition-opacity duration-200"
};

// Memoized SVG Icons for performance
const ChevronDownIcon = React.memo(({ className, isOpen }) => (
  <svg 
    className={`w-4 h-4 transition-all duration-300 ease-out ${isOpen ? 'rotate-180 scale-110' : ''} ${className}`}
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M19 9l-7 7-7-7" 
    />
  </svg>
));

const BackArrowIcon = React.memo(({ className }) => (
  <svg 
    className={`w-5 h-5 ${className}`}
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M15 19l-7-7 7-7" 
    />
  </svg>
));

const MentorIcon = React.memo(({ className }) => (
  <svg 
    className={`w-5 h-5 text-white ${className}`} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
    />
  </svg>
));

const CheckIcon = React.memo(({ className }) => (
  <svg 
    className={`w-4 h-4 ${className}`} 
    fill="currentColor" 
    viewBox="0 0 20 20"
    aria-hidden="true"
  >
    <path 
      fillRule="evenodd" 
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
      clipRule="evenodd" 
    />
  </svg>
));

const PlusIcon = React.memo(({ className }) => (
  <svg 
    className={`w-4 h-4 ${className}`} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
    />
  </svg>
));

const ProfileIcon = React.memo(({ isActive }) => (
  <svg 
    className={`w-5 h-5 transition-all duration-300 ease-out ${
      isActive 
        ? 'text-primary' 
        : 'text-gray-400'
    }`}
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    {isActive ? (
      // Filled version - exact conversion from profile-filled.svg (512x512 → 24x24)
      <>
        <circle cx="12" cy="6" r="6"/>
        <path d="M12,14.0156c-4.969,0.0056-9.0089,4.0351-9,9C3,23.5508,3.4492,24,4,24h16c0.5508,0,1-0.4492,1-1C20.9911,18.0351,16.9689,14.0212,12,14.0156z"/>
      </>
    ) : (
      // Outlined version - exact paths from profile.svg  
      <>
        <path d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z"/>
        <path d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z"/>
      </>
    )}
  </svg>
));

const Header = ({ title, subtitle, className = '', ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  // Memoized selectors for performance
  const allMentors = useSelector(selectAllMentors);
  const activeMentorId = useSelector(selectActiveMentorId);

  // Memoized page type detection
  const pageType = useMemo(() => {
    if (location.pathname.startsWith('/mentor/')) return 'dashboard';
    if (location.pathname === '/mentors') return 'hub';
    if (location.pathname === '/profile') return 'profile';
    return 'other';
  }, [location.pathname]);

  // Memoized current mentor selection with error handling
  const currentMentor = useSelector(state => {
    if (pageType === 'dashboard' && params.mentorId) {
      return selectMentorById(state, params.mentorId);
    }
    return null;
  });

  // Memoized display content
  const displayContent = useMemo(() => ({
    title: title || (currentMentor?.name) || 'MentorIA',
    subtitle: subtitle || currentMentor?.subject
  }), [title, subtitle, currentMentor?.name, currentMentor?.subject]);

  // Memoized computed styles
  const computedStyles = useMemo(() => ({
    buttonBase: BUTTON_STYLES.BASE,
    iconButton: `${BUTTON_STYLES.BASE} ${BUTTON_STYLES.ICON}`,
    backButton: `${BUTTON_STYLES.BASE} ${BUTTON_STYLES.ICON} ${isNavigating ? 'scale-95 opacity-75' : ''}`,
    profileButton: `${BUTTON_STYLES.BASE} p-2 rounded-lg hover:scale-105 active:scale-95 transition-all duration-200 hover:bg-primary-50 ${
      isNavigating ? 'scale-95 opacity-75' : ''
    }`
  }), [isNavigating]);

  // Navigation handlers with micro-interactions
  const handleBackClick = useCallback(async () => {
    if (isNavigating) return; // Prevent double clicks
    
    setIsNavigating(true);
    
    // Add slight delay for visual feedback
    setTimeout(() => {
      try {
        if (pageType === 'profile') {
          navigate(-1);
        } else {
          navigate('/mentors');
        }
      } catch (error) {
        console.error('Navigation error:', error);
      } finally {
        setIsNavigating(false);
      }
    }, NAVIGATION_DELAYS.BACK);
  }, [navigate, pageType, isNavigating]);

  const handleMentorSwitch = useCallback(async (mentorId) => {
    if (mentorId === activeMentorId || isNavigating) {
      setIsDropdownOpen(false);
      return;
    }

    setIsNavigating(true);
    
    // Smooth close animation before navigation
    setIsDropdownOpen(false);
    
    setTimeout(() => {
      try {
        navigate(`/mentor/${mentorId}`);
      } catch (error) {
        console.error('Mentor switch error:', error);
      } finally {
        setIsNavigating(false);
      }
    }, NAVIGATION_DELAYS.MENTOR_SWITCH);
  }, [navigate, activeMentorId, isNavigating]);

  const handleProfileClick = useCallback(async () => {
    if (location.pathname === '/profile' || isNavigating) return;
    
    setIsNavigating(true);
    
    setTimeout(() => {
      try {
        navigate('/profile');
      } catch (error) {
        console.error('Profile navigation error:', error);
      } finally {
        setIsNavigating(false);
      }
    }, NAVIGATION_DELAYS.PROFILE);
  }, [navigate, location.pathname, isNavigating]);

  const toggleDropdown = useCallback((e) => {
    e.stopPropagation();
    setIsDropdownOpen(prev => !prev);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isDropdownOpen) {
        closeDropdown();
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isDropdownOpen, closeDropdown]);

  // Hub Header Component
  if (pageType === 'hub') {
    return (
      <header 
        className={`sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-4 transition-all duration-300 ${className}`} 
        {...props}
      >
        <div className="flex items-center justify-between">
          {/* Left section - Empty for spacing */}
          <div className="w-10"></div>

          {/* Center section - Title */}
          <div className="flex-1 flex justify-center">
            <h1 className="heading-xs text-text-primary transition-colors duration-200">
              Mis Mentores
            </h1>
          </div>

          {/* Right section - Profile */}
          <div className="flex items-center">
            <button 
              onClick={handleProfileClick}
              disabled={isNavigating}
              className={computedStyles.profileButton}
              aria-label="Ir al perfil"
            >
              <ProfileIcon 
                isActive={location.pathname === '/profile'}
              />
              {/* Ripple effect */}
              <span className={BUTTON_STYLES.RIPPLE} />
            </button>
          </div>
        </div>
      </header>
    );
  }

  // Standard Header for Dashboard and Profile
  return (
    <header 
      className={`bg-surface shadow-sm border-b border-gray-100 px-4 py-4 relative transition-all duration-300 ${className}`}
      {...props}
    >
      <div className="flex items-center justify-between">
        {/* Left section - Back button */}
        <div className="flex items-center">
          {(pageType === 'dashboard' || pageType === 'profile') && (
            <button
              onClick={handleBackClick}
              disabled={isNavigating}
              className={computedStyles.backButton}
              aria-label={pageType === 'profile' ? 'Volver' : 'Volver a Mis Mentores'}
            >
              <BackArrowIcon className="transition-transform duration-200 hover:-translate-x-0.5" />
              <span className={BUTTON_STYLES.RIPPLE} />
            </button>
          )}
        </div>

        {/* Center section - Title and Mentor Switcher */}
        <div className="flex-1 flex justify-center">
          <div className="flex flex-col items-center min-w-0 max-w-xs">
            <div className="flex items-center space-x-2">
              {/* Mentor Switcher or Static Title */}
              {pageType === 'dashboard' && allMentors.length > 1 ? (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    disabled={isNavigating}
                    className={`${computedStyles.buttonBase} flex items-center space-x-1 px-3 py-1.5 text-text-primary hover:text-primary hover:bg-primary-50 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 ${isDropdownOpen ? 'bg-primary-50 text-primary shadow-sm' : ''} ${isNavigating ? 'opacity-75' : ''}`}
                    aria-label="Cambiar mentor"
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                  >
                    <h1 className="heading-xs truncate max-w-32">
                      {displayContent.title}
                    </h1>
                    <ChevronDownIcon 
                      className="flex-shrink-0 text-text-secondary" 
                      isOpen={isDropdownOpen}
                    />
                    {/* Subtle glow effect when open */}
                    <span className={`absolute inset-0 rounded-lg bg-primary-200 transition-opacity duration-300 ${isDropdownOpen ? 'opacity-10' : 'opacity-0'}`} />
                  </button>

                  {/* Enhanced Dropdown Menu */}
                  {isDropdownOpen && (
                    <>
                      {/* Backdrop with smooth fade */}
                      <div 
                        className="fixed inset-0 z-10 bg-black/5 transition-opacity duration-200"
                        onClick={closeDropdown}
                        aria-hidden="true"
                      />
                      
                      {/* Dropdown Content with improved animations */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl z-20 animate-in slide-in-from-top-2 duration-200 overflow-hidden">
                        <div className="py-2">
                          {/* Header */}
                          <div className="px-4 py-3 caption text-text-secondary uppercase tracking-wide border-b border-gray-100 bg-gray-50">
                            Cambiar mentor
                          </div>
                          
                          {/* Mentor List */}
                          <div className="max-h-64 overflow-y-auto">
                            {allMentors.map((mentor, index) => (
                              <button
                                key={mentor.id}
                                onClick={() => handleMentorSwitch(mentor.id)}
                                disabled={isNavigating}
                                className={`w-full flex items-center px-4 py-3 body-sm transition-all duration-200 hover:bg-primary-50 focus:bg-primary-50 focus:outline-none group ${
                                  activeMentorId === mentor.id 
                                    ? 'bg-primary-50 text-primary border-r-4 border-primary' 
                                    : 'text-text-primary hover:text-primary'
                                } ${isNavigating ? 'opacity-50' : ''}`}
                                style={{ animationDelay: `${index * 50}ms` }}
                              >
                                <div className="flex-1 text-left">
                                  <div className="label truncate group-hover:translate-x-1 transition-transform duration-200">
                                    {mentor.name}
                                  </div>
                                  <div className="caption text-text-secondary truncate">
                                    {mentor.subject}
                                  </div>
                                </div>
                                {activeMentorId === mentor.id && (
                                  <CheckIcon className="text-primary ml-3 animate-in spin-in-90 duration-300" />
                                )}
                              </button>
                            ))}
                          </div>
                          
                          {/* Footer Action */}
                          <div className="border-t border-gray-100 mt-1">
                            <button
                              onClick={() => {
                                navigate('/mentors');
                                closeDropdown();
                              }}
                              disabled={isNavigating}
                              className="w-full flex items-center px-4 py-3 body-sm text-text-secondary hover:bg-gray-50 hover:text-primary transition-all duration-200 group"
                            >
                              <PlusIcon className="mr-3 group-hover:rotate-90 transition-transform duration-300" />
                              <span className="group-hover:translate-x-1 transition-transform duration-200">
                                Ver todos los mentores
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <h1 className="heading-xs text-text-primary truncate transition-colors duration-200">
                  {displayContent.title}
                </h1>
              )}
            </div>
            
            {/* Subtitle with fade animation */}
            {displayContent.subtitle && (
              <p className="body-sm text-text-secondary truncate text-center mt-0.5 animate-in fade-in duration-300">
                {displayContent.subtitle}
              </p>
            )}
          </div>
        </div>
        
        {/* Right section - Profile */}
        <div className="flex items-center">
          <button 
            onClick={handleProfileClick}
            disabled={isNavigating}
            className={computedStyles.profileButton}
            aria-label="Ir al perfil"
          >
            <ProfileIcon 
              isActive={location.pathname === '/profile'}
            />
            <span className={BUTTON_STYLES.RIPPLE} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header); 