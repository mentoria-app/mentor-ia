import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../state/authSlice';

const ProfileHeader = () => {
  const user = useSelector(selectUser);
  
  // Access user metadata for full name and email
  const fullName = user?.user_metadata?.full_name || user?.full_name || "Usuario";
  const email = user?.email || "";
  const createdAt = user?.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A";
  
  return (
    <div className="p-6">
      <h1 className="heading-lg text-gray-900">{fullName}</h1>
      <p className="body-md text-gray-600">{email}</p>
      <p className="caption text-gray-500">
        Miembro desde {createdAt}
      </p>
    </div>
  );
};

export default ProfileHeader; 