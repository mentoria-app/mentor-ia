import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Button, Input, Avatar } from '../common';
import { updateMentorAsync, addNotification } from '../../state';
import { AVATAR_OPTIONS, getAvatarUrl, getAvatarIdFromUrl } from '../../constants/avatars';

const SettingsTab = ({ mentor }) => {
  const dispatch = useDispatch();
  
  // Form state
  const [formData, setFormData] = useState({
    name: mentor.name || '',
    expertise: mentor.expertise || '',
    description: mentor.description || '',
    avatar: getAvatarIdFromUrl(mentor.avatar_url) || 'default'
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

  // Handle avatar selection
  const handleAvatarSelect = (avatarId) => {
    setFormData(prev => ({
      ...prev,
      avatar: avatarId
    }));
    setHasChanges(true);
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
      await dispatch(updateMentorAsync({
        id: mentor.id,
        updates: {
          name: formData.name,
          expertise: formData.expertise,
          description: formData.description,
          avatar_url: getAvatarUrl(formData.avatar)
        }
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



  return (
    <div className="h-full overflow-y-auto p-4">
      <Card className="p-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="text-center">
            <h3 className="heading-sm text-gray-900 mb-1">
              Configuración del Mentor
            </h3>
            <p className="body-sm text-gray-600">
              Personaliza la información de tu mentor
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Form Fields */}
            <div className="space-y-3">
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

              {/* Avatar Selection */}
              <div>
                <label className="block label text-text-primary mb-2">
                  Avatar
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {AVATAR_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleAvatarSelect(option.id)}
                      className={`p-1.5 rounded-lg border-2 transition-all ${
                        formData.avatar === option.id 
                          ? 'border-blue-500 ring-1 ring-blue-500 ring-opacity-30 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      aria-label={`Seleccionar avatar ${option.label}`}
                    >
                      <img 
                        src={option.image} 
                        alt={option.label}
                        className="w-10 h-10 object-cover rounded-full mx-auto"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-3">
              <Button
                type="submit"
                disabled={!hasChanges || isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg flex items-center justify-center space-x-2"
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
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default SettingsTab; 