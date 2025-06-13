import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Button } from '../common';
import { closeMentorCreationModal, createMentor } from '../../state';
import { AVATAR_OPTIONS, getAvatarUrl } from '../../constants/avatars';

const INITIAL_FORM_DATA = {
  name: '',
  subject: '',
  description: '',
  avatar: 'default'
};

/**
 * MentorCreationModal Component
 * 
 * A modal component for creating new mentors with form validation,
 * avatar selection, and Redux state management.
 * 
 * Features:
 * - Form validation for required fields
 * - Avatar selection with visual feedback
 * - Automatic description generation
 * - Error handling for creation failures
 * - Accessibility attributes for screen readers
 * 
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Controls modal visibility
 * @returns {JSX.Element} The mentor creation modal
 */
const MentorCreationModal = ({ isOpen }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  /**
   * Handles modal closure and form reset
   */
  const handleClose = () => {
    dispatch(closeMentorCreationModal());
    setFormData(INITIAL_FORM_DATA);
  };

  /**
   * Handles input field changes
   * @param {Event} e - Input change event
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Handles avatar selection
   * @param {string} avatarId - Selected avatar ID
   */
  const handleAvatarSelect = (avatarId) => {
    setFormData(prev => ({
      ...prev,
      avatar: avatarId
    }));
  };

  /**
   * Handles form submission and mentor creation
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.name.trim() && formData.subject.trim()) {
      try {
        await dispatch(createMentor({
          name: formData.name.trim(),
          expertise: formData.subject.trim(),
          description: formData.description.trim() || `Tu mentor especializado en ${formData.subject.toLowerCase()}`,
          avatar_url: getAvatarUrl(formData.avatar)
        })).unwrap();
        
        handleClose();
      } catch (error) {
        console.error('Error creating mentor:', error);
        // Error handling is managed by Redux state
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="heading-sm text-text-primary">
            Crear Nuevo Mentor
          </h2>
          <button
            onClick={handleClose}
            className="p-2 text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-gray-100"
            aria-label="Cerrar modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Mentor Name */}
          <div>
            <label htmlFor="name" className="block label text-text-primary mb-2">
              Nombre del Mentor *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="ej. Matemáticas, Historia, Biología..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block label text-text-primary mb-2">
              Materia o Especialidad *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="ej. Álgebra y Cálculo, Historia Universal..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block label text-text-primary mb-2">
              Descripción (Opcional)
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe brevemente qué ayuda puede ofrecer este mentor..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>

          {/* Avatar Selection */}
          <div>
            <label className="block label text-text-primary mb-3">
              Avatar (Opcional)
            </label>
            <div className="grid grid-cols-4 gap-3">
              {AVATAR_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleAvatarSelect(option.id)}
                  className={`p-2 rounded-lg border-2 transition-all ${
                    formData.avatar === option.id 
                      ? 'border-primary ring-2 ring-primary ring-opacity-20' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  aria-label={`Seleccionar avatar ${option.label}`}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <img 
                      src={option.image} 
                      alt={option.label}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                    <span className="caption text-text-secondary">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={!formData.name.trim() || !formData.subject.trim()}
            >
              Crear Mentor
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

MentorCreationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired
};

export default MentorCreationModal; 