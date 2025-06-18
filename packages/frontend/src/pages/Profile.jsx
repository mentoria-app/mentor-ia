import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../components/common';
import { ProfileHeader, SubscriptionCard, SettingsGroup } from '../components/profile';
import { selectUser } from '../state/authSlice';
import { logoutUser } from '../state/authSlice';
import { getExtendedProfile, updateUserProfile } from '../services/authService';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [isUpdatingNotifications, setIsUpdatingNotifications] = useState(false);
  
  // Enhanced UX state management
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [actionFeedback, setActionFeedback] = useState(null);

  // Load user preferences on component mount
  useEffect(() => {
    const loadUserPreferences = async () => {
      try {
        const profileData = await getExtendedProfile();
        setPushNotifications(profileData.profile?.notifications_enabled ?? true);
      } catch (error) {
        console.error('Error loading user preferences:', error);
        showFeedback('error', 'Error cargando preferencias');
      }
    };

    if (user) {
      loadUserPreferences();
    }
  }, [user]);

  // Enhanced feedback system
  const showFeedback = (type, message) => {
    setActionFeedback({ type, message });
    setTimeout(() => setActionFeedback(null), 4000);
  };

  // Enhanced logout with confirmation
  const handleLogout = async () => {
    if (!showLogoutConfirm) {
      setShowLogoutConfirm(true);
      return;
    }

    setIsLoggingOut(true);
    try {
      await dispatch(logoutUser()).unwrap();
      showFeedback('success', 'Sesión cerrada exitosamente');
      // Small delay to show feedback before navigation
      setTimeout(() => navigate('/auth'), 1000);
    } catch (error) {
      console.error('Logout error:', error);
      showFeedback('error', 'Error al cerrar sesión');
      setIsLoggingOut(false);
      setShowLogoutConfirm(false);
    }
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  // Enhanced delete account with multi-step confirmation
  const handleDeleteAccount = () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }

    // Second confirmation for account deletion
    const finalConfirm = window.confirm(
      '⚠️ ÚLTIMA ADVERTENCIA\n\n' +
      'Esta acción eliminará PERMANENTEMENTE:\n' +
      '• Tu cuenta y perfil\n' +
      '• Todos tus mentores\n' +
      '• Todos tus recursos\n' +
      '• Todo tu historial\n\n' +
      'Esta acción NO se puede deshacer.\n\n' +
      '¿Estás COMPLETAMENTE seguro?'
    );

    if (finalConfirm) {
      setIsDeletingAccount(true);
      // TODO: Implement actual delete account functionality
      setTimeout(() => {
        showFeedback('success', 'Cuenta programada para eliminación');
        setIsDeletingAccount(false);
        setShowDeleteConfirm(false);
      }, 2000);
    } else {
      setShowDeleteConfirm(false);
    }
  };

  const cancelDeleteAccount = () => {
    setShowDeleteConfirm(false);
  };

  // Enhanced notification toggle with better feedback
  const handleToggleNotifications = async () => {
    setIsUpdatingNotifications(true);
    const newValue = !pushNotifications;
    
    try {
      await updateUserProfile({ notifications_enabled: newValue });
      setPushNotifications(newValue);
      showFeedback(
        'success', 
        newValue ? 'Notificaciones activadas' : 'Notificaciones desactivadas'
      );
    } catch (error) {
      console.error('Error updating notification preference:', error);
      showFeedback('error', 'Error al actualizar preferencias');
    } finally {
      setIsUpdatingNotifications(false);
    }
  };

  // Loading state for entire page
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      {/* Enhanced Feedback Toast */}
      {actionFeedback && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${
          actionFeedback.type === 'success' 
            ? 'bg-green-500 text-white' 
            : actionFeedback.type === 'error'
            ? 'bg-red-500 text-white'
            : 'bg-blue-500 text-white'
        }`}>
          <div className="flex items-center space-x-2">
            {actionFeedback.type === 'success' && (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
            {actionFeedback.type === 'error' && (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
            <span className="text-sm font-medium">{actionFeedback.message}</span>
          </div>
        </div>
      )}

      {/* Content Container */}
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl">
        {/* Main Content */}
        <div className="px-4 py-6 space-y-8">
          
          {/* Profile Header */}
          <Card className="shadow-md border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-200">
            <ProfileHeader />
          </Card>

          {/* Subscription Card */}
          <SubscriptionCard />

          {/* Enhanced Settings Section */}
          <SettingsGroup title="Configuración">
            <Card className="shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
              <div className="p-6">
                <div className="flex items-center justify-between min-h-[60px]">
                  {/* Setting Info with enhanced styling */}
                  <div className="flex-1 pr-4">
                    <div className="flex items-center space-x-3 mb-2">
                      {/* Notification Icon */}
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 17H4l5 5v-5zM12 8V3m0 5a3 3 0 100 6m0-6a3 3 0 110 6m0-6v6" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">
                          Notificaciones Push
                        </h3>
                        <p className="text-sm text-gray-600">
                          Recibir alertas y recordatorios
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Premium Enhanced Toggle Switch */}
                  <button
                    onClick={handleToggleNotifications}
                    disabled={isUpdatingNotifications}
                    className={`relative inline-flex h-8 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 ${
                      pushNotifications 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    role="switch"
                    aria-checked={pushNotifications}
                    aria-labelledby="push-notifications-label"
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition-all duration-300 ease-in-out flex items-center justify-center ${
                        pushNotifications ? 'translate-x-6' : 'translate-x-0'
                      } ${isUpdatingNotifications ? 'animate-pulse' : ''}`}
                    >
                      {/* Toggle icon */}
                      {isUpdatingNotifications ? (
                        <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      ) : pushNotifications ? (
                        <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </Card>
          </SettingsGroup>

                    {/* Account Management Section */}
          <SettingsGroup title="Cuenta">
            <Card className="shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
              <div className="p-6">
                {/* Logout Section */}
                <div className="flex items-center justify-between min-h-[60px]">
                  <div className="flex-1 pr-6">
                    <div className="flex items-center space-x-3">
                      {/* Logout Icon */}
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-gray-900 mb-1">
                          Cerrar Sesión
                        </h3>
                        <p className="text-sm text-gray-600">
                          Salir de tu cuenta actual
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Logout Button */}
                  <div className="flex-shrink-0">
                    {showLogoutConfirm ? (
                      <div className="flex flex-col space-y-2 min-w-[120px]">
                        <Button 
                          variant="secondary" 
                          className="h-9 px-4 text-xs font-medium border-gray-300 bg-white hover:bg-gray-50 w-full"
                          onClick={cancelLogout}
                          disabled={isLoggingOut}
                        >
                          Cancelar
                        </Button>
                        <Button 
                          variant="secondary" 
                          className="h-9 px-4 text-xs font-semibold w-full border-gray-400 bg-gray-100 hover:bg-gray-200 text-gray-800"
                          onClick={handleLogout}
                          disabled={isLoggingOut}
                        >
                          {isLoggingOut ? (
                            <div className="flex items-center justify-center space-x-1">
                              <div className="w-3 h-3 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                              <span>Cerrando...</span>
                            </div>
                          ) : (
                            'Confirmar'
                          )}
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        className="h-10 px-4 text-sm font-medium border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-800 min-w-[120px] rounded-md transition-colors duration-200"
                        onClick={handleLogout}
                      >
                        Cerrar Sesión
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </SettingsGroup>

          {/* Danger Zone - Only for truly destructive actions */}
          <SettingsGroup title="Zona de Peligro" isDanger={true}>
            <Card className="shadow-md border border-red-200 hover:shadow-lg transition-shadow duration-200 bg-gradient-to-br from-red-50/30 via-white to-red-50/20">
              <div className="p-6">
                {/* Delete Account Section */}
                <div className="space-y-4">
                  {/* Header Section */}
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-red-700 mb-1">
                        Eliminar Cuenta
                      </h3>
                      <p className="text-sm text-gray-600">
                        Eliminar permanentemente tu cuenta y todos los datos
                      </p>
                    </div>
                  </div>

                  {/* Warning Section */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <svg className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-sm text-red-800 font-medium mb-1">
                          Esta acción no se puede deshacer
                        </p>
                        <p className="text-xs text-red-700">
                          Se eliminarán todos tus mentores, recursos y datos permanentemente.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Section */}
                  <div className="flex justify-center pt-1">
                    {showDeleteConfirm ? (
                      <div className="flex space-x-3 w-full max-w-sm">
                        <Button 
                          variant="secondary" 
                          className="h-10 px-4 text-sm font-medium border-gray-300 bg-white hover:bg-gray-50 flex-1"
                          onClick={cancelDeleteAccount}
                          disabled={isDeletingAccount}
                        >
                          Cancelar
                        </Button>
                        <Button 
                          variant="danger" 
                          className="h-10 px-4 text-sm font-semibold bg-red-600 hover:bg-red-700 flex-1"
                          onClick={handleDeleteAccount}
                          disabled={isDeletingAccount}
                        >
                          {isDeletingAccount ? (
                            <div className="flex items-center justify-center space-x-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Eliminando...</span>
                            </div>
                          ) : (
                            'Confirmar'
                          )}
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        variant="danger" 
                        className="h-10 px-12 text-sm font-medium bg-red-500 hover:bg-red-600 text-white shadow-sm hover:shadow-md transition-all duration-200 min-w-[200px]"
                        onClick={handleDeleteAccount}
                      >
                        Eliminar Cuenta
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </SettingsGroup>
          
        </div>
      </div>
    </div>
  );
};

export default Profile; 