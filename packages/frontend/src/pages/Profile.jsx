import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Avatar, Button } from '../components/common';
import { selectUser } from '../state/authSlice';
import { logoutUser } from '../state/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/auth');
  };

  const settingsOptions = [
    { id: 'notifications', title: 'Notificaciones', description: 'Gestionar alertas y recordatorios' },
    { id: 'language', title: 'Idioma', description: 'Español' },
    { id: 'privacy', title: 'Privacidad', description: 'Configuración de datos' },
    { id: 'help', title: 'Ayuda y Soporte', description: 'Centro de ayuda' },
    { id: 'about', title: 'Acerca de', description: 'Información de la app' }
  ];

  if (!user) {
    return (
        <div className="p-4 text-center">
            <p>No user data available. Please log in.</p>
            <Button onClick={() => navigate('/auth')}>Go to Login</Button>
        </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <Avatar 
            src={user.avatar || "https://via.placeholder.com/80"} 
            size="xl" 
            alt={user.full_name}
          />
          <div className="flex-1">
            <h2 className="heading-sm text-gray-900">{user.full_name}</h2>
            <p className="body-md text-gray-600">{user.email}</p>
            <p className="caption">Miembro desde {new Date(user.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4 text-center">
          <div className="heading-md text-blue-600">{user.stats?.totalMentors || 0}</div>
          <div className="caption">Mentores</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="heading-md text-green-600">{user.stats?.totalQuizzes || 0}</div>
          <div className="caption">Quizzes</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="heading-md text-purple-600">{user.stats?.studyStreak || 0}</div>
          <div className="caption">Días seguidos</div>
        </Card>
      </div>

      <div className="space-y-3">
        <h3 className="heading-xs text-gray-900">Configuración</h3>
        
        {settingsOptions.map((option) => (
          <Card key={option.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="label text-gray-900">{option.title}</h4>
                <p className="caption">{option.description}</p>
              </div>
              <div className="text-gray-400">
                →
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="pt-4">
        <button 
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-3 px-4 rounded-lg button-text hover:bg-red-700 transition-colors"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Profile; 