import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Button, Input, Avatar } from '../common';
import { updateMentor, addNotification } from '../../state';
import { DEFAULT_AVATAR } from '../../constants/avatars';

const SettingsTab = ({ mentor }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: mentor.name || '',
    expertise: mentor.expertise || '',
    description: mentor.description || '',
    avatar_url: mentor.avatar_url || ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  // Handle input changes
  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Mark as changed
    setHasChanges(true);
    
    // Clear field error if exists
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Handle avatar change
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // For now, we'll just show a placeholder - you can implement actual upload later
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData(prev => ({
        ...prev,
        avatar_url: e.target.result
      }));
      setHasChanges(true);
    };
    reader.readAsDataURL(file);
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (!formData.expertise.trim()) {
      newErrors.expertise = 'La especialidad es requerida';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      await dispatch(updateMentor({
        id: mentor.id,
        updates: formData
      })).unwrap();
      
      setHasChanges(false);
      
      dispatch(addNotification({
        type: 'success',
        title: 'Mentor actualizado',
        message: 'Los cambios se han guardado correctamente.'
      }));
      
    } catch (error) {
      console.error('Error updating mentor:', error);
      dispatch(addNotification({
        type: 'error',
        title: 'Error al actualizar',
        message: 'No se pudieron guardar los cambios. Intenta de nuevo.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle reset form
  const handleReset = () => {
    setFormData({
      name: mentor.name || '',
      expertise: mentor.expertise || '',
      description: mentor.description || '',
      avatar_url: mentor.avatar_url || ''
    });
    setHasChanges(false);
    setErrors({});
  };

  return (
    <div className="h-full overflow-y-auto p-4">
      <Card className="p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <h3 className="heading-sm text-gray-900 mb-2">
              Configuración del Mentor
            </h3>
            <p className="body-sm text-gray-600">
              Personaliza la información de tu mentor
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-3">
              <div className="relative">
                <Avatar 
                  src={formData.avatar_url || DEFAULT_AVATAR} 
                  size="xl" 
                  alt={formData.name}
                  rounded="lg"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={handleAvatarClick}
                />
                <button
                  type="button"
                  onClick={handleAvatarClick}
                  className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
              <p className="caption text-gray-500">
                Haz clic en la imagen para cambiar el avatar
              </p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                className="hidden"
                accept="image/*"
              />
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <Input
                label="Nombre del Mentor"
                placeholder="Ej: Profesor Martinez"
                value={formData.name}
                onChange={handleInputChange('name')}
                error={errors.name}
                required
              />

              <Input
                label="Especialidad"
                placeholder="Ej: Matemáticas, Historia, Biología"
                value={formData.expertise}
                onChange={handleInputChange('expertise')}
                error={errors.expertise}
                required
              />

              <div className="w-full">
                <label className="block label text-text-primary mb-1">
                  Descripción
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  placeholder="Describe a tu mentor y su estilo de enseñanza..."
                  value={formData.description}
                  onChange={handleInputChange('description')}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 resize-none ${
                    errors.description 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 hover:border-gray-400'
                  }`}
                  required
                />
                {errors.description && (
                  <p className="mt-1 body-sm text-red-600">{errors.description}</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="submit"
                disabled={!hasChanges || isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg flex-1 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Guardando...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Guardar Cambios</span>
                  </>
                )}
              </Button>
              
              <Button
                type="button"
                onClick={handleReset}
                disabled={!hasChanges || isLoading}
                className="bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-700 px-6 py-2 rounded-lg flex-1 flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Restablecer</span>
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default SettingsTab; 