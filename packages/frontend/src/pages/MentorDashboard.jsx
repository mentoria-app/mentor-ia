import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Avatar, Button } from '../components/common';
import { ResourceCard } from '../components/resources';
import { ChatInterface } from '../components/chat';
import { 
  selectMentorById, 
  selectActiveMentorId, 
  setActiveMentor,
  addResourceToMentor 
} from '../state/mentorsSlice';

const MentorDashboard = ({ activeTab = 'resources' }) => {
  const { mentorId } = useParams();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  
  const activeMentorId = useSelector(selectActiveMentorId);
  const mentor = useSelector(state => selectMentorById(state, mentorId));

  useEffect(() => {
    if (mentorId && parseInt(mentorId) !== activeMentorId) {
      dispatch(setActiveMentor(parseInt(mentorId)));
    }
  }, [mentorId, activeMentorId, dispatch]);

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

  const handleUploadResource = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      const newResource = {
        title: file.name,
        type: getFileType(file),
        size: formatFileSize(file.size),
        status: 'Pending'
      };

      dispatch(addResourceToMentor({
        mentorId: mentor.id,
        resource: newResource
      }));

      event.target.value = '';
      console.log('File selected for upload:', file.name);
    }
  };

  const getFileType = (file) => {
    const type = file.type;
    if (type.includes('pdf')) return 'pdf';
    if (type.includes('image')) return 'image';
    if (type.includes('video')) return 'video';
    if (type.includes('audio')) return 'audio';
    return 'file';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleResourceClick = (resource) => {
    console.log('Resource clicked:', resource);
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
              <Button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Comenzar Quiz
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
              <Button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                Ver Tarjetas
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
                    {mentor.resources.length} {mentor.resources.length === 1 ? 'recurso subido' : 'recursos subidos'}
                  </p>
                </div>
                
                <Button
                  onClick={handleUploadResource}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
                >
                  <span>+</span>
                  <span>Subir Recurso</span>
                </Button>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png,.gif,.mp4,.mp3,.wav"
                multiple={false}
              />

              {mentor.resources.length === 0 ? (
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
                  {mentor.resources.map((resource) => (
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
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            {mentor.avatarUrl ? (
              <Avatar 
                src={mentor.avatarUrl} 
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
            <p className="text-blue-100 mt-1">
              {mentor.subject}
            </p>
            <p className="text-blue-200 text-sm mt-2">
              {mentor.description}
            </p>
          </div>

          <div className="hidden sm:flex flex-col items-end space-y-1">
            <div className="text-right">
              <p className="text-2xl font-bold">{mentor.resources.length}</p>
              <p className="text-blue-200 text-sm">
                {mentor.resources.length === 1 ? 'Recurso' : 'Recursos'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default MentorDashboard; 