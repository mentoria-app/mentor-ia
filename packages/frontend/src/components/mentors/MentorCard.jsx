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
    subject, 
    avatar, 
    resourceCount = 0, 
    color = 'bg-blue-500' 
  } = mentor || {};

  return (
    <Card 
      className={`p-4 hover:shadow-md transition-shadow cursor-pointer ${className}`}
      onClick={() => onClick && onClick(mentor)}
      {...props}
    >
      <div className="flex items-center space-x-4">
        {/* Mentor Avatar */}
        <div className="relative">
          {avatar ? (
            <Avatar 
              src={avatar} 
              size="lg" 
              alt={name}
            />
          ) : (
            <div className={`w-16 h-16 ${color} rounded-full flex items-center justify-center`}>
              <span className="text-white font-bold text-xl">
                {name ? name.charAt(0).toUpperCase() : 'M'}
              </span>
            </div>
          )}
        </div>

        {/* Mentor Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-lg truncate">
            {name || 'Mentor'}
          </h3>
          {subject && (
            <p className="text-sm text-gray-600 truncate">
              {subject}
            </p>
          )}
          <div className="flex items-center mt-2 space-x-4">
            <div className="flex items-center text-xs text-gray-500">
              <span className="mr-1">📚</span>
              <span>{resourceCount} recursos</span>
            </div>
          </div>
        </div>

        {/* Arrow indicator */}
        <div className="text-gray-400">
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
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </div>
      </div>
    </Card>
  );
};

export default MentorCard; 