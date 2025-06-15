import React from 'react';
import { Card } from '../common';

const SkeletonCard = () => {
  return (
    <Card className="animate-pulse">
      <div className="flex items-center space-x-4 p-4">
        {/* Resource Icon/Thumbnail Skeleton - Updated to match new size */}
        <div className="flex-shrink-0">
          <div className="w-14 h-14 bg-gray-200 rounded-lg"></div>
        </div>

        {/* Resource Info Skeleton */}
        <div className="flex-1 min-w-0 mr-3">
          {/* Title - Made taller to match font-semibold */}
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-1"></div>
          
          {/* Metadata line with type, size, and status badge */}
          <div className="flex items-center space-x-2 mb-1">
            {/* Type */}
            <div className="h-4 bg-gray-200 rounded w-12"></div>
            {/* Separator */}
            <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
            {/* Size */}
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            {/* Separator */}
            <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
            {/* Status badge - Made taller */}
            <div className="flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded-full">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div className="h-4 bg-gray-300 rounded w-12"></div>
            </div>
          </div>
          
          {/* Date - Made slightly taller */}
          <div className="h-4 bg-gray-200 rounded w-28"></div>
        </div>

        {/* Swipe Hint Skeleton - Matches the new hint area */}
        <div className="flex items-center justify-center w-8 p-2">
          <div className="flex space-x-1">
            <div className="w-1 h-4 bg-gray-200 rounded-full"></div>
            <div className="w-1 h-4 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default React.memo(SkeletonCard); 