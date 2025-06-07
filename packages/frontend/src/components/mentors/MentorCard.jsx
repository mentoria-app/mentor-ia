import React from 'react';
import { Card, Avatar } from '../common';

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
    resourceCount = 0, 
    color = 'bg-primary' 
  } = mentor || {};

  return (
    <Card 
      className={`p-4 transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer border-2 border-transparent hover:border-primary-100 ${className}`}
      onClick={() => onClick && onClick(mentor)}
      {...props}
    >
      <div className="flex items-center space-x-4">
        {/* Mentor Avatar */}
        <div className="relative">
          {avatar_url ? (
            <Avatar 
              src={avatar_url} 
              size="lg" 
              alt={name}
              className="transition-transform duration-200"
            />
          ) : (
            <div className={`w-16 h-16 ${color} rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-105 shadow-sm`}>
              <span className="text-white font-bold text-xl">
                {name ? name.charAt(0).toUpperCase() : 'M'}
              </span>
            </div>
          )}
        </div>

        {/* Mentor Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-text-primary text-lg truncate">
            {name || 'Mentor'}
          </h3>
          {expertise && (
            <p className="text-sm text-text-secondary truncate">
              {expertise}
            </p>
          )}
          <div className="flex items-center mt-2 space-x-4">
            <div className="flex items-center text-xs text-text-secondary">
              <span className="mr-1">📚</span>
              <span>{resourceCount} recursos</span>
            </div>
          </div>
        </div>

        {/* Arrow indicator */}
        <div className="text-text-secondary transition-colors duration-200 group-hover:text-primary">
          <svg 
            className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </div>
      </div>
    </Card>
  );
};

export default MentorCard; 