import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MentorCard } from '../components/mentors';
import { Button } from '../components/common';

const MentorHub = () => {
  const navigate = useNavigate();

  // Placeholder mentor data
  const mentors = [
    { 
      id: 1, 
      name: 'Matemáticas', 
      subject: 'Álgebra y Cálculo', 
      color: 'bg-blue-500',
      resourceCount: 15,
      avatar: null
    },
    { 
      id: 2, 
      name: 'Historia', 
      subject: 'Historia Universal', 
      color: 'bg-green-500',
      resourceCount: 8,
      avatar: null
    },
    { 
      id: 3, 
      name: 'Biología', 
      subject: 'Biología Celular', 
      color: 'bg-purple-500',
      resourceCount: 12,
      avatar: null
    },
    { 
      id: 4, 
      name: 'Química', 
      subject: 'Química Orgánica', 
      color: 'bg-red-500',
      resourceCount: 6,
      avatar: null
    },
    { 
      id: 5, 
      name: 'Física', 
      subject: 'Mecánica Clásica', 
      color: 'bg-indigo-500',
      resourceCount: 9,
      avatar: null
    }
  ];

  const handleMentorClick = (mentor) => {
    navigate(`/mentor/${mentor.id}`);
  };

  const handleCreateMentor = () => {
    // TODO: Navigate to mentor creation page or open modal
    console.log('Create new mentor');
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Main Content */}
      <div className="flex-1 p-4 pb-24">
        {/* Welcome Section */}
        {mentors.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🤖</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              ¡Bienvenido a MentorIA!
            </h2>
            <p className="text-gray-600 mb-6">
              Crea tu primer mentor para comenzar a estudiar
            </p>
          </div>
        ) : (
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              Tus mentores ({mentors.length})
            </h2>
            <p className="text-sm text-gray-600">
              Selecciona un mentor para continuar estudiando
            </p>
          </div>
        )}

        {/* Mentors Grid */}
        {mentors.length > 0 && (
          <div className="space-y-3">
            {mentors.map((mentor) => (
              <MentorCard
                key={mentor.id}
                mentor={mentor}
                onClick={handleMentorClick}
              />
            ))}
          </div>
        )}
      </div>

      {/* Fixed Create Button */}
      <div className="fixed bottom-6 left-4 right-4 z-10">
        <Button
          onClick={handleCreateMentor}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-colors flex items-center justify-center space-x-2"
        >
          <span className="text-xl">+</span>
          <span>Crear nuevo Mentor</span>
        </Button>
      </div>
    </div>
  );
};

export default MentorHub; 