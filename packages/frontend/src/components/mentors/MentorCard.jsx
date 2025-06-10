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

  // Softer, neutral color palette to avoid alert-level implications
  const getColorMapping = (oldColor) => {
    const colorMap = {
      'bg-primary': 'bg-gradient-to-br from-primary-400 to-primary-500',
      'bg-secondary': 'bg-gradient-to-br from-secondary-400 to-secondary-500',
      'bg-purple-500': 'bg-gradient-to-br from-slate-400 to-slate-500',
      'bg-red-500': 'bg-gradient-to-br from-rose-400 to-rose-500',
      'bg-yellow-500': 'bg-gradient-to-br from-accent-400 to-accent-500',
      'bg-indigo-500': 'bg-gradient-to-br from-blue-400 to-blue-500',
      'bg-pink-500': 'bg-gradient-to-br from-pink-400 to-pink-500',
      'bg-orange-500': 'bg-gradient-to-br from-amber-400 to-amber-500'
    };
    return colorMap[oldColor] || 'bg-gradient-to-br from-primary-400 to-primary-500';
  };

  const getBorderColor = (oldColor) => {
    const borderMap = {
      'bg-primary': 'border-primary-200',
      'bg-secondary': 'border-secondary-200',
      'bg-purple-500': 'border-slate-200',
      'bg-red-500': 'border-rose-200',
      'bg-yellow-500': 'border-accent-200',
      'bg-indigo-500': 'border-blue-200',
      'bg-pink-500': 'border-pink-200',
      'bg-orange-500': 'border-amber-200'
    };
    return borderMap[oldColor] || 'border-primary-200';
  };

  const getAccentColor = (oldColor) => {
    const accentMap = {
      'bg-primary': 'text-primary-600',
      'bg-secondary': 'text-secondary-600',
      'bg-purple-500': 'text-slate-600',
      'bg-red-500': 'text-rose-600',
      'bg-yellow-500': 'text-accent-600',
      'bg-indigo-500': 'text-blue-600',
      'bg-pink-500': 'text-pink-600',
      'bg-orange-500': 'text-amber-600'
    };
    return accentMap[oldColor] || 'text-primary-600';
  };

  const gradientColor = getColorMapping(color);
  const borderColor = getBorderColor(color);
  const accentColor = getAccentColor(color);

  return (
    <Card 
      className={`group relative overflow-hidden transition-all duration-300 ease-out cursor-pointer
        bg-white border-2 ${borderColor} h-52
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
            {avatar_url ? (
              <Avatar 
                src={avatar_url} 
                size="lg" 
                alt={name}
                className="transition-transform duration-300 group-hover:scale-105 shadow-soft ring-2 ring-white"
              />
            ) : (
              <div className={`w-14 h-14 ${gradientColor} rounded-xl flex items-center justify-center 
                transition-all duration-300 group-hover:scale-105 group-hover:shadow-medium
                shadow-soft ring-2 ring-white/50`}>
                <span className="text-white font-bold text-lg">
                  {name ? name.charAt(0).toUpperCase() : 'M'}
                </span>
              </div>
            )}
          </div>

          {/* Chevron indicator */}
          <div className={`p-2 rounded-lg transition-all duration-200 flex-shrink-0
            ${accentColor} opacity-60 group-hover:opacity-100 
            group-hover:bg-gray-50 group-hover:translate-x-0.5`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Content Section - Takes available space */}
        <div className="flex-1 mb-3 min-h-0">
          {/* Name */}
          <h3 className="font-bold text-text-primary text-base leading-tight line-clamp-2 group-hover:text-text-primary/90 transition-colors mb-2">
            {name || 'Mentor'}
          </h3>
          
          {/* Expertise */}
          {expertise && (
            <p className="text-sm text-text-secondary leading-normal line-clamp-2 group-hover:text-text-secondary/80 transition-colors">
              {expertise}
            </p>
          )}
        </div>

        {/* Footer Section - Always visible at bottom */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 flex-shrink-0">
          {/* Resource count */}
          <div className="flex items-center space-x-2">
            <div className={`p-1.5 rounded-lg bg-gray-50 ${accentColor} group-hover:bg-gray-100 transition-colors`}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-xs font-medium text-text-secondary">
              {resourceCount} recursos
            </span>
          </div>

          {/* Action indicator */}
          <div className={`p-1.5 rounded-lg ${accentColor} opacity-50 transition-opacity group-hover:opacity-100`}>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className={`absolute inset-0 rounded-lg transition-opacity duration-300 opacity-0 group-hover:opacity-100 
        bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none`} />
    </Card>
  );
};

export default MentorCard; 