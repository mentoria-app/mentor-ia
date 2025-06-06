import React from 'react';
import { Card } from '../components/common';

const MentorHub = () => {
  // Placeholder mentor data
  const mentors = [
    { id: 1, name: 'Matemáticas', subject: 'Álgebra y Cálculo', color: 'bg-blue-500' },
    { id: 2, name: 'Historia', subject: 'Historia Universal', color: 'bg-green-500' },
    { id: 3, name: 'Biología', subject: 'Biología Celular', color: 'bg-purple-500' }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Welcome Section */}
      <div className="text-center py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Tus Mentores
        </h1>
        <p className="text-gray-600">
          Selecciona un mentor para continuar estudiando
        </p>
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mentors.map((mentor) => (
          <Card key={mentor.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 ${mentor.color} rounded-lg flex items-center justify-center`}>
                <span className="text-white font-bold text-lg">
                  {mentor.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
                <p className="text-sm text-gray-600">{mentor.subject}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add New Mentor Button */}
      <div className="pt-4">
        <Card className="p-6 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer">
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">+</span>
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Crear Nuevo Mentor</h3>
            <p className="text-sm text-gray-600">Agrega una nueva materia de estudio</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MentorHub; 