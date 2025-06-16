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
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-48"></div>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="heading-sm text-gray-900">
              {isFreePlan ? 'Plan Gratuito' : 'Plan Premium'}
            </h3>
            {!isFreePlan && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Activo
              </span>
            )}
          </div>
          <p className="caption text-gray-600">
            {isFreePlan 
              ? 'Acceso limitado a funciones básicas' 
              : 'Acceso completo a todas las funciones premium'
            }
          </p>
        </div>
        <div className="ml-4">
          <Button 
            variant={isFreePlan ? "primary" : "secondary"}
            size="sm"
          >
            {isFreePlan ? 'Actualizar' : 'Gestionar'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SubscriptionCard; 