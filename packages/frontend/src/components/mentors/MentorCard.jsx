import React from 'react';
import PropTypes from 'prop-types';
import { Card, Avatar } from '../common';
import { DEFAULT_AVATAR } from '../../constants/avatars';

const MentorCard = ({ 
  mentor, 
  onClick, 
  className = '',
  ...props 
}) => {
  const { 
    id, 
    name, 
    expertise, 
    avatar_url, 
    resourceCount = 0
  } = mentor || {};

  return (
    <Card 
      className={`group relative overflow-hidden transition-all duration-300 ease-out cursor-pointer
        bg-white border-2 border-gray-200 h-52
        hover:shadow-medium hover:-translate-y-1
        active:scale-[0.98] active:duration-75
        ${className}`}
      onClick={() => onClick && onClick(mentor)}
      {...props}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Optimized Layout with Proper Space Allocation */}
      <div className="relative p-4 h-full flex flex-col">
        {/* Header Section - Avatar and chevron */}
        <div className="flex items-start justify-between mb-3 flex-shrink-0">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <Avatar 
              src={avatar_url || DEFAULT_AVATAR} 
              size="md" 
              alt={name || 'Mentor'}
              rounded="lg"
              className="transition-transform duration-300 group-hover:scale-105 shadow-soft ring-2 ring-white"
            />
          </div>

          {/* Chevron indicator */}
          <div className="p-2 rounded-lg transition-all duration-200 flex-shrink-0
            text-primary-600 opacity-60 group-hover:opacity-100 
            group-hover:bg-gray-50 group-hover:translate-x-0.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Content Section - Takes available space */}
        <div className="flex-1 mb-3 min-h-0">
          {/* Name */}
          <h3 className="heading-xs line-clamp-2 group-hover:text-text-primary/90 transition-colors mb-2">
            {name || 'Mentor'}
          </h3>
          
          {/* Expertise */}
          {expertise && (
            <p className="body-sm text-text-secondary line-clamp-2 group-hover:text-text-secondary/80 transition-colors">
              {expertise}
            </p>
          )}
        </div>

        {/* Footer Section - Always visible at bottom */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 flex-shrink-0">
          {/* Resource count */}
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-gray-50 text-primary-600 group-hover:bg-gray-100 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="caption">
              {resourceCount} recursos
            </span>
          </div>

          {/* Action indicator */}
          <div className="p-1.5 rounded-lg text-primary-600 opacity-50 transition-opacity group-hover:opacity-100">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-lg transition-opacity duration-300 opacity-0 group-hover:opacity-100 
        bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
    </Card>
  );
};

MentorCard.propTypes = {
  mentor: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    expertise: PropTypes.string,
    avatar_url: PropTypes.string,
    resourceCount: PropTypes.number
  }),
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default MentorCard; 