import React from 'react';

const ProfileHeader = ({ user }) => {
  return (
    <div className="p-6">
      <h1 className="heading-lg text-gray-900">{user?.full_name || "Usuario"}</h1>
      <p className="body-md text-gray-600">{user?.email || ""}</p>
      <p className="caption text-gray-500">
        Miembro desde {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
      </p>
    </div>
  );
};

export default ProfileHeader; 