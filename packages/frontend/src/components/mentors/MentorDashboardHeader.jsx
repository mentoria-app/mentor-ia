import React from 'react';
import { Avatar } from '../common';
import { DEFAULT_AVATAR } from '../../constants/avatars';

const MentorDashboardHeader = ({ mentor, resourceCount }) => {
  return (
    <div className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <Avatar 
            src={mentor.avatar_url || DEFAULT_AVATAR} 
            size="xl" 
            alt={mentor.name}
            rounded="lg"
            className="border-4 border-white"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h1 className="heading-lg truncate">
            {mentor.name}
          </h1>
          <p className="body-md text-blue-100 mt-1 truncate">
            {mentor.expertise}
          </p>
          <p className="body-sm text-blue-200 mt-2 truncate">
            {mentor.description}
          </p>
        </div>

        <div className="hidden sm:flex flex-col items-end space-y-1">
          <div className="text-right">
            <p className="heading-md">{resourceCount}</p>
            <p className="caption text-blue-200">
              {resourceCount === 1 ? 'Recurso' : 'Recursos'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboardHeader; 