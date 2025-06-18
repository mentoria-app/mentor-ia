import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, Button } from '../common';
import { selectUser } from '../../state/authSlice';
import { getExtendedProfile } from '../../services/authService';

const SubscriptionCard = () => {
  const user = useSelector(selectUser);
  const [subscriptionStatus, setSubscriptionStatus] = useState('free');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await getExtendedProfile();
        setSubscriptionStatus(profileData.profile?.subscription_status || 'free');
      } catch (error) {
        console.error('Error fetching subscription status:', error);
        setSubscriptionStatus('free');
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchUserProfile();
    }
  }, [user]);
  
  const isFreePlan = subscriptionStatus === 'free';
  
  if (loading) {
    return (
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 shadow-sm">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-32 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-48"></div>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="relative overflow-hidden border-0 shadow-lg">
      {/* Enhanced gradient background with pattern overlay */}
      <div className={`absolute inset-0 ${
        isFreePlan 
          ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700' 
          : 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700'
      }`}>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="subscription-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="white" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#subscription-pattern)" />
          </svg>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative">
        {/* Header Section */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                {/* Enhanced Plan Icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
                  isFreePlan ? 'bg-white/20 backdrop-blur-sm' : 'bg-white/20 backdrop-blur-sm'
                }`}>
                  {isFreePlan ? (
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                
                {/* Plan Title */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">
                    {isFreePlan ? 'Plan Gratuito' : 'Plan Premium'}
                  </h3>
                  
                  {/* Active Badge */}
                  {!isFreePlan && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
                      Activo
                    </span>
                  )}
                </div>
              </div>
              
              {/* Enhanced Description */}
              <p className="text-sm text-white/90 leading-relaxed">
                {isFreePlan 
                  ? 'Acceso limitado a funciones básicas. Actualiza para desbloquear todo el potencial.' 
                  : 'Acceso completo a todas las funciones premium y soporte prioritario.'
                }
              </p>
              
              {/* Features preview */}
              <div className="mt-3 flex items-center space-x-4 text-xs text-white/80">
                <div className="flex items-center space-x-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{isFreePlan ? '3 Mentores' : 'Mentores Ilimitados'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{isFreePlan ? '100MB' : '10GB'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Action Section */}
        <div className="px-6 pb-6">
          <Button 
            variant={isFreePlan ? "primary" : "secondary"}
            className={`w-full h-12 text-sm font-semibold shadow-lg transition-all duration-200 ${
              isFreePlan 
                ? 'bg-white text-blue-600 hover:bg-gray-50 hover:shadow-xl transform hover:-translate-y-0.5' 
                : 'bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 hover:shadow-xl transform hover:-translate-y-0.5'
            }`}
          >
            {isFreePlan ? (
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span>Actualizar a Premium</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
                <span>Gestionar Suscripción</span>
              </div>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SubscriptionCard; 