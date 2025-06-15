import React, { useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  selectIsResourceUploadModalOpen, 
  closeResourceUploadModal,
  addNotification,
  uploadResource
} from '../../state';

const AddResourceModal = ({ mentorId }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsResourceUploadModalOpen);
  const fileInputRef = useRef(null);

  const handleClose = useCallback(() => {
    dispatch(closeResourceUploadModal());
  }, [dispatch]);

  const handleFileUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileSelect = useCallback(async (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Close modal first
      handleClose();
      
      try {
        await dispatch(uploadResource({ 
          mentorId, 
          file 
        })).unwrap();
        
        dispatch(addNotification({
          type: 'success',
          title: 'Archivo subido exitosamente',
          message: `${file.name} se ha subido correctamente y está siendo procesado.`
        }));
        
        console.log('File uploaded successfully:', file.name);
      } catch (error) {
        console.error('Error uploading file:', error);
        dispatch(addNotification({
          type: 'error',
          title: 'Error al subir archivo',
          message: error.message || 'No se pudo subir el archivo. Inténtalo de nuevo.'
        }));
      } finally {
        event.target.value = ''; // Reset file input
      }
    }
  }, [dispatch, mentorId, handleClose]);

  const handleAddLink = useCallback(() => {
    handleClose();
    // TODO: Implement link addition logic
    dispatch(addNotification({
      type: 'info',
      title: 'Funcionalidad próximamente',
      message: 'La función de añadir enlaces estará disponible pronto.'
    }));
  }, [dispatch, handleClose]);

  const handleTakePhoto = useCallback(() => {
    handleClose();
    // TODO: Implement camera functionality
    dispatch(addNotification({
      type: 'info',
      title: 'Funcionalidad próximamente',
      message: 'La función de tomar fotos estará disponible pronto.'
    }));
  }, [dispatch, handleClose]);

  // Early return for better performance
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal Content - Slides up from bottom */}
      <div className="relative bg-white rounded-t-3xl w-full max-w-md mx-4 mb-0 transform transition-transform duration-300 ease-out">
        {/* Handle bar */}
        <div className="flex justify-center py-3">
          <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
        </div>
        
        {/* Header */}
        <div className="px-6 pb-4">
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Añadir Recurso
          </h2>
          <p className="text-sm text-gray-600 text-center mt-1">
            Elige cómo quieres añadir tu recurso
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="px-6 pb-6">
          {/* Primary Action - Upload File */}
          <button
            onClick={handleFileUpload}
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-6 py-4 rounded-xl text-lg font-semibold flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl active:shadow-md transition-all duration-200 mb-4"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Subir Archivo</span>
          </button>

          {/* Secondary Actions */}
          <div className="space-y-3">
            {/* Add Link Button */}
            <button
              onClick={handleAddLink}
              className="w-full flex items-center justify-center py-4 px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100 border border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-200"
            >
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <span className="font-medium">Añadir Enlace</span>
            </button>

            {/* Take Photo Button */}
            <button
              onClick={handleTakePhoto}
              className="w-full flex items-center justify-center py-4 px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100 border border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-200"
            >
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-medium">Tomar Foto</span>
            </button>
          </div>
        </div>

        {/* Cancel Button */}
        <div className="px-6 pb-6">
          <button
            onClick={handleClose}
            className="w-full py-3 text-gray-600 font-medium bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png,.gif,.mp4,.mp3,.wav"
        multiple={false}
      />
    </div>
  );
};

export default React.memo(AddResourceModal); 