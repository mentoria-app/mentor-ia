import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Avatar, Button } from '../components/common';
import { ResourceCard } from '../components/resources';

const MentorDashboard = ({ activeTab = 'chat' }) => {
  const { mentorId } = useParams();

  // Placeholder mentor data - would come from API/state in real app
  const mentor = {
    id: mentorId,
    name: 'Matemáticas',
    subject: 'Álgebra y Cálculo',
    avatar: null,
    color: 'bg-blue-500',
    description: 'Tu mentor especializado en matemáticas avanzadas'
  };

  // Placeholder resources data
  const resources = [
    {
      id: 1,
      title: 'Derivadas e Integrales.pdf',
      type: 'pdf',
      uploadDate: 'hace 2 días',
      size: '2.1 MB',
      thumbnail: null
    },
    {
      id: 2,
      title: 'Ejercicios de Límites',
      type: 'image',
      uploadDate: 'hace 1 semana',
      size: '850 KB',
      thumbnail: null
    },
    {
      id: 3,
      title: 'Clase de Cálculo - YouTube',
      type: 'url',
      uploadDate: 'hace 3 días',
      size: null,
      thumbnail: null
    },
    {
      id: 4,
      title: 'Fórmulas Trigonométricas.png',
      type: 'image',
      uploadDate: 'hace 5 días',
      size: '1.2 MB',
      thumbnail: null
    }
  ];

  const handleUploadResource = () => {
    // TODO: Implement upload functionality
    console.log('Upload resource');
  };

  const handleResourceClick = (resource) => {
    // TODO: Implement resource viewing/editing
    console.log('Resource clicked:', resource);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <div className="space-y-4">
            <Card className="p-4">
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 ${mentor.color} rounded-full flex items-center justify-center`}>
                  <span className="text-white text-sm font-medium">
                    {mentor.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">
                    ¡Hola! Soy tu mentor de {mentor.name}. ¿En qué puedo ayudarte hoy?
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
              <Button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Comenzar Quiz
              </Button>
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
              <Button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                Ver Tarjetas
              </Button>
            </Card>
          </div>
        );
        
      default:
        return (
          <>
            {/* Resource Vault Section */}
            <div className="space-y-4">
              {/* Section Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Tus Recursos
                  </h2>
                  <p className="text-sm text-gray-600">
                    {resources.length} {resources.length === 1 ? 'recurso subido' : 'recursos subidos'}
                  </p>
                </div>
                
                {/* Upload Button */}
                <Button
                  onClick={handleUploadResource}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
                >
                  <span>+</span>
                  <span>Subir Recurso</span>
                </Button>
              </div>

              {/* Resources List */}
              {resources.length === 0 ? (
                <Card className="p-8 text-center border-2 border-dashed border-gray-300">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📚</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No hay recursos aún
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Sube tu primer recurso para que tu mentor pueda ayudarte mejor
                  </p>
                  <Button
                    onClick={handleUploadResource}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                  >
                    Subir Primer Recurso
                  </Button>
                </Card>
              ) : (
                <div className="space-y-3">
                  {resources.map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                      onClick={handleResourceClick}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Mentor Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
        <div className="flex items-center space-x-4">
          {/* Mentor Avatar */}
          <div className="flex-shrink-0">
            {mentor.avatar ? (
              <Avatar 
                src={mentor.avatar} 
                size="xl" 
                alt={mentor.name}
                className="border-4 border-white"
              />
            ) : (
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center border-4 border-white">
                <span className="text-white font-bold text-2xl">
                  {mentor.name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Mentor Info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold truncate">
              {mentor.name}
            </h1>
            <p className="text-blue-100 text-sm">
              {mentor.subject}
            </p>
            <p className="text-blue-50 text-xs mt-1">
              {mentor.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 pb-20">
        {activeTab === 'chat' || activeTab === 'quiz' || activeTab === 'flashcards' 
          ? renderTabContent() 
          : renderTabContent()
        }
      </div>
    </div>
  );
};

export default MentorDashboard; 