import React from 'react';
import { Card, Avatar } from '../components/common';

const Profile = () => {
  const user = {
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    joinDate: 'Enero 2024',
    totalMentors: 3,
    totalQuizzes: 12,
    studyStreak: 7
  };

  const settingsOptions = [
    { id: 'notifications', title: 'Notificaciones', description: 'Gestionar alertas y recordatorios' },
    { id: 'language', title: 'Idioma', description: 'Español' },
    { id: 'privacy', title: 'Privacidad', description: 'Configuración de datos' },
    { id: 'help', title: 'Ayuda y Soporte', description: 'Centro de ayuda' },
    { id: 'about', title: 'Acerca de', description: 'Información de la app' }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <Avatar 
            src="https://via.placeholder.com/80" 
            size="xl" 
            alt={user.name}
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">Miembro desde {user.joinDate}</p>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{user.totalMentors}</div>
          <div className="text-sm text-gray-600">Mentores</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{user.totalQuizzes}</div>
          <div className="text-sm text-gray-600">Quizzes</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{user.studyStreak}</div>
          <div className="text-sm text-gray-600">Días seguidos</div>
        </Card>
      </div>

      {/* Settings */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Configuración</h3>
        
        {settingsOptions.map((option) => (
          <Card key={option.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{option.title}</h4>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
              <div className="text-gray-400">
                →
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Logout Button */}
      <div className="pt-4">
        <button className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors">
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Profile; 