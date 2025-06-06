import React from 'react';
import { Card } from '../components/common';

const MentorDashboard = ({ activeTab = 'chat' }) => {

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <div className="space-y-4">
            <Card className="p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">M</span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">
                    ¡Hola! Soy tu mentor de Matemáticas. ¿En qué puedo ayudarte hoy?
                  </p>
                  <span className="text-xs text-gray-500">Ahora</span>
                </div>
              </div>
            </Card>
            
            <div className="bg-white rounded-lg border p-4">
              <input 
                type="text" 
                placeholder="Escribe tu pregunta aquí..."
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );
        
      case 'quiz':
        return (
          <div className="space-y-4">
            <Card className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Quiz de Práctica</h3>
              <p className="text-gray-600 mb-4">
                Pon a prueba tus conocimientos con preguntas personalizadas
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Comenzar Quiz
              </button>
            </Card>
          </div>
        );
        
      case 'flashcards':
        return (
          <div className="space-y-4">
            <Card className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Tarjetas de Estudio</h3>
              <p className="text-gray-600 mb-4">
                Repasa conceptos clave con tarjetas interactivas
              </p>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                Ver Tarjetas
              </button>
            </Card>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-3 text-center">
          <div className="text-lg font-bold text-blue-600">15</div>
          <div className="text-xs text-gray-600">Recursos</div>
        </Card>
        <Card className="p-3 text-center">
          <div className="text-lg font-bold text-green-600">8</div>
          <div className="text-xs text-gray-600">Quizzes</div>
        </Card>
        <Card className="p-3 text-center">
          <div className="text-lg font-bold text-purple-600">23</div>
          <div className="text-xs text-gray-600">Tarjetas</div>
        </Card>
      </div>

      {/* Tab Content */}
      <div className="pt-4">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default MentorDashboard; 