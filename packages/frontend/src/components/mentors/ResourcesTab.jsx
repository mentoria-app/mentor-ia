import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button } from '../common';
import { ResourceCard } from '../resources';
import { 
  uploadResource,
  addNotification,
  selectMentorsLoading,
  selectMentorsError
} from '../../state';

const ResourcesTab = ({ mentor }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const loading = useSelector(selectMentorsLoading);
  const error = useSelector(selectMentorsError);
  
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

  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="heading-sm text-gray-900">
              Tus Recursos
            </h2>
            <p className="caption">
              {resources.length} {resources.length === 1 ? 'recurso subido' : 'recursos subidos'}
            </p>
          </div>
          
          <Button
            onClick={handleUploadResource}
            disabled={isUploading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg button-text flex items-center space-x-2"
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
                <span className="heading-sm">📚</span>
              </div>
              <h3 className="heading-xs text-gray-900 mb-2">
                No hay recursos aún
              </h3>
              <p className="body-sm text-gray-600 mb-4">
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
};

export default ResourcesTab; 