import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../components/common';
import { ProfileHeader, SubscriptionCard, SettingsGroup } from '../components/profile';
import { selectUser } from '../state/authSlice';
import { logoutUser } from '../state/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [pushNotifications, setPushNotifications] = useState(true);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/auth');
  };

  const handleDeleteAccount = () => {
    // TODO: Implement delete account functionality
    console.log('Delete account clicked');
  };

  const handleToggleNotifications = () => {
    setPushNotifications(!pushNotifications);
    // TODO: Save preference to backend
  };

  if (!user) {
    return (
      <div className="p-4 text-center">
        <p className="body-md text-gray-600 mb-4">No hay datos de usuario disponibles.</p>
        <Button onClick={() => navigate('/auth')}>Ir al Login</Button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 max-w-2xl mx-auto">
      {/* Profile Header */}
      <Card>
        <ProfileHeader user={user} />
      </Card>

      {/* Subscription Card */}
      <SubscriptionCard subscription={user.subscription} />

      {/* App Settings */}
      <SettingsGroup title="Configuración de la App">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="label text-gray-900">Notificaciones Push</h4>
              <p className="caption text-gray-600">Recibir alertas y recordatorios</p>
            </div>
            <button
              onClick={handleToggleNotifications}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                pushNotifications ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  pushNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </Card>
      </SettingsGroup>

      {/* Danger Zone */}
      <SettingsGroup title="Zona de Peligro">
        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="label text-gray-900">Cerrar Sesión</h4>
              <p className="caption text-gray-600">Salir de tu cuenta actual</p>
            </div>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </Button>
          </div>
          
          <hr className="border-gray-200" />
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="label text-red-700">Eliminar Cuenta</h4>
              <p className="caption text-gray-600">Eliminar permanentemente tu cuenta y todos los datos</p>
            </div>
            <Button 
              variant="danger" 
              size="sm"
              onClick={handleDeleteAccount}
            >
              Eliminar
            </Button>
          </div>
        </Card>
      </SettingsGroup>
    </div>
  );
};

export default Profile; 