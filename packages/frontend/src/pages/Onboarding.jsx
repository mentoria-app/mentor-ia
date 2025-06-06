import React from 'react';

const Onboarding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Bienvenido a MentorIA!
          </h1>
          <p className="text-gray-600 mb-8">
            Tu compañero de estudio personalizado con IA
          </p>
          
          {/* Placeholder for onboarding content */}
          <div className="space-y-4">
            <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Onboarding Content</span>
            </div>
            
            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Comenzar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding; 