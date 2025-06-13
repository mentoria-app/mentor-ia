import React from 'react';
import { Card } from '../common';

const CreateMentorCard = ({ onClick, className = '', ...props }) => {
  return (
    <Card 
      className={`group relative overflow-hidden transition-all duration-300 ease-out cursor-pointer
        bg-white border-2 border-gray-200 h-60
        hover:shadow-medium hover:-translate-y-1 hover:border-primary-300
        active:scale-[0.98] active:duration-75
        ${className}`}
      onClick={onClick}
      {...props}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-transparent to-primary-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
        {/* Plus Icon */}
        <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-6 
          transition-all duration-300 group-hover:bg-primary-50 group-hover:scale-105">
          <svg 
            className="w-7 h-7 text-gray-400 group-hover:text-primary-500 transition-colors duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 4v16m8-8H4" 
            />
          </svg>
        </div>

        {/* Text */}
        <div>
          <h3 className="heading-xs text-gray-600 group-hover:text-primary-600 transition-colors duration-300">
            Crear Mentor
          </h3>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-5 right-5 w-1.5 h-1.5 bg-gray-300 rounded-full 
          group-hover:bg-primary-400 transition-colors duration-300" />
        <div className="absolute bottom-5 left-5 w-1 h-1 bg-gray-300 rounded-full 
          group-hover:bg-primary-400 transition-colors duration-300" />
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-lg transition-opacity duration-300 opacity-0 group-hover:opacity-100 
        bg-gradient-to-r from-primary-100/20 via-white/10 to-primary-100/20 pointer-events-none" />
    </Card>
  );
};

export default CreateMentorCard; 