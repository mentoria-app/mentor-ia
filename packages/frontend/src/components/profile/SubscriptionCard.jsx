import React from 'react';
import { Card, Button } from '../common';

const SubscriptionCard = ({ subscription = null }) => {
  const isFreePlan = !subscription || subscription.plan === 'free';
  
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
          {!isFreePlan && subscription?.expires_at && (
            <p className="caption text-gray-500 mt-1">
              Renovación: {new Date(subscription.expires_at).toLocaleDateString()}
            </p>
          )}
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