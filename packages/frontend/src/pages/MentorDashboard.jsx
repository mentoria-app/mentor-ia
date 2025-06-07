import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Avatar, Button, QuizGenerationModal, FlashcardGenerationModal } from '../components/common';
import { ResourceCard } from '../components/resources';
import { ChatInterface } from '../components/chat';
import { 
  selectMentorById, 
  selectActiveMentorId, 
  selectMentorsLoading,
  selectMentorsError,
  setActiveMentor,
  addResourceToMentor,
  fetchResourcesForMentor,
  uploadResource,
  addNotification,
  openQuizGenerationModal,
  openFlashcardGenerationModal,
  selectIsQuizGenerationModalOpen,
  selectIsFlashcardGenerationModalOpen
} from '../state';

const MentorDashboard = ({ activeTab = 'resources' }) => {
  const { mentorId } = useParams();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const activeMentorId = useSelector(selectActiveMentorId);
  const mentor = useSelector(state => selectMentorById(state, mentorId));
  const loading = useSelector(selectMentorsLoading);
  const error = useSelector(selectMentorsError);
  const isQuizModalOpen = useSelector(selectIsQuizGenerationModalOpen);
  const isFlashcardModalOpen = useSelector(selectIsFlashcardGenerationModalOpen);

  useEffect(() => {
    if (mentorId && mentorId !== activeMentorId) {
      dispatch(setActiveMentor(mentorId));
    }
  }, [mentorId, activeMentorId, dispatch]);

  // Fetch resources when mentor changes
  useEffect(() => {
    if (mentor?.id) {
      dispatch(fetchResourcesForMentor(mentor.id));
    }
  }, [mentor?.id, dispatch]);

  if (!mentor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full p-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Mentor no encontrado
          </h2>
          <p className="text-gray-600">
            El mentor que estás buscando no existe o ha sido eliminado.
          </p>
        </div>
      </div>
    );
  }

  // Ensure resources array exists (fallback for backend compatibility)
  const resources = mentor.resources || [];

  const handleUploadResource = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      setIsUploading(true);
      
      try {
        await dispatch(uploadResource({ 
          mentorId: mentor.id, 
          file 
        })).unwrap();
        
        // Show success notification
        dispatch(addNotification({
          type: 'success',
          title: 'Archivo subido exitosamente',
          message: `${file.name} se ha subido correctamente y está siendo procesado.`
        }));
        
        console.log('File uploaded successfully:', file.name);
      } catch (error) {
        console.error('Error uploading file:', error);
        // Error is already handled by the Redux error state
      } finally {
        setIsUploading(false);
        event.target.value = ''; // Reset file input
      }
    }
  };

  const handleResourceClick = (resource) => {
    console.log('Resource clicked:', resource);
  };

  const handleOpenQuizModal = () => {
    dispatch(openQuizGenerationModal());
  };

  const handleOpenFlashcardModal = () => {
    dispatch(openFlashcardGenerationModal());
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <ChatInterface />
        );
        
      case 'quiz':
        return (
          <div className="h-full overflow-y-auto p-4">
            <Card className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Quiz de Práctica</h3>
              <p className="text-gray-600 mb-4">
                Pon a prueba tus conocimientos con preguntas personalizadas
              </p>
              <Button 
                onClick={handleOpenQuizModal}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Generar Quiz
              </Button>
            </Card>
          </div>
        );
        
      case 'flashcards':
        return (
          <div className="h-full overflow-y-auto p-4">
            <Card className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Tarjetas de Estudio</h3>
              <p className="text-gray-600 mb-4">
                Repasa conceptos clave con tarjetas interactivas
              </p>
              <Button 
                onClick={handleOpenFlashcardModal}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                Generar Tarjetas
              </Button>
            </Card>
          </div>
        );
        
      case 'resources':
      default:
        return (
          <div className="h-full overflow-y-auto p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Tus Recursos
                  </h2>
                  <p className="text-sm text-gray-600">
                    {resources.length} {resources.length === 1 ? 'recurso subido' : 'recursos subidos'}
                  </p>
                </div>
                
                <Button
                  onClick={handleUploadResource}
                  disabled={isUploading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
                >
                  {isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Subiendo...</span>
                    </>
                  ) : (
                    <>
                      <span>+</span>
                      <span>Subir Recurso</span>
                    </>
                  )}
                </Button>
              </div>

              {/* Show error message if upload failed */}
              {error && (
                <Card className="p-4 bg-red-50 border border-red-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 text-red-500">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-red-700">
                      {error.message || 'Error al procesar el archivo'}
                    </p>
                  </div>
                </Card>
              )}

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png,.gif,.mp4,.mp3,.wav"
                multiple={false}
              />

              {resources.length === 0 ? (
                loading ? (
                  <Card className="p-8 text-center">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-text-secondary">Cargando recursos...</p>
                  </Card>
                ) : (
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
                )
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
          </div>
        );
    }
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              {mentor.avatar_url ? (
                <Avatar 
                  src={mentor.avatar_url} 
                  size="xl" 
                  alt={mentor.name}
                  className="border-4 border-white"
                />
              ) : (
                <div className={`w-16 h-16 ${mentor.color} rounded-full flex items-center justify-center border-4 border-white`}>
                  <span className="text-white text-2xl font-bold">
                    {mentor.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold truncate">
                {mentor.name}
              </h1>
              <p className="text-blue-100 mt-1 truncate">
                {mentor.expertise}
              </p>
              <p className="text-blue-200 text-sm mt-2 truncate">
                {mentor.description}
              </p>
            </div>

            <div className="hidden sm:flex flex-col items-end space-y-1">
              <div className="text-right">
                <p className="text-2xl font-bold">{resources.length}</p>
                <p className="text-blue-200 text-sm">
                  {resources.length === 1 ? 'Recurso' : 'Recursos'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {renderTabContent()}
        </div>
      </div>

      {/* Modals */}
      <QuizGenerationModal isOpen={isQuizModalOpen} />
      <FlashcardGenerationModal isOpen={isFlashcardModalOpen} />
    </>
  );
};

export default MentorDashboard; 