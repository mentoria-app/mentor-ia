import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../state/authSlice';

const ProfileHeader = () => {
  const user = useSelector(selectUser);
  
  // Access user metadata for full name and email
  const fullName = user?.user_metadata?.full_name || user?.full_name || "Usuario";
  const email = user?.email || "";
  const createdAt = user?.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A";
  
  // Generate initials from full name for avatar placeholder
  const initials = fullName
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
  
  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30"></div>
      
      {/* Content */}
      <div className="relative p-6">
        {/* User Avatar and Basic Info */}
        <div className="flex items-center space-x-4 mb-6">
          {/* Enhanced Avatar with initials */}
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ring-4 ring-white">
              {initials}
            </div>
            {/* Online indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-green-400 border-2 border-white rounded-full shadow-sm"></div>
          </div>
          
          {/* User Info with enhanced typography */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h1 className="text-2xl font-bold text-gray-900 truncate">{fullName}</h1>
              {/* Verified badge */}
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <p className="text-base text-gray-600 truncate flex items-center space-x-1">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
              <span className="truncate">{email}</span>
            </p>
          </div>
        </div>
        
        {/* Enhanced membership info */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 4h6m-6 4h6M3 21h18a1 1 0 001-1V8a1 1 0 00-1-1H3a1 1 0 00-1 1v12a1 1 0 001 1z" />
            </svg>
            <span>Miembro desde {createdAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader; 