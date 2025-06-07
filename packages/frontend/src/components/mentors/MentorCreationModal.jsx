import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button } from '../common';
import { closeMentorCreationModal, addMentor } from '../../state';

const MentorCreationModal = ({ isOpen }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    color: 'bg-primary',
    description: ''
  });

  const colorOptions = [
    { value: 'bg-primary', color: '#3b82f6' },
    { value: 'bg-secondary', color: '#10b981' },
    { value: 'bg-purple-500', color: '#8b5cf6' },
    { value: 'bg-red-500', color: '#ef4444' },
    { value: 'bg-yellow-500', color: '#eab308' },
    { value: 'bg-indigo-500', color: '#6366f1' },
    { value: 'bg-pink-500', color: '#ec4899' },
    { value: 'bg-orange-500', color: '#f97316' }
  ];

  const handleClose = () => {
    dispatch(closeMentorCreationModal());
    setFormData({ name: '', subject: '', color: 'bg-primary', description: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleColorSelect = (colorValue) => {
    setFormData(prev => ({
      ...prev,
      color: colorValue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.name.trim() && formData.subject.trim()) {
      // Dispatch action to add new mentor
      dispatch(addMentor({
        name: formData.name.trim(),
        expertise: formData.subject.trim(),
        color: formData.color,
        description: formData.description.trim() || `Tu mentor especializado en ${formData.subject.toLowerCase()}`,
        avatar_url: null
      }));
      
      // Close modal and reset form
      handleClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-text-primary">
            Crear Nuevo Mentor
          </h2>
          <button
            onClick={handleClose}
            className="p-2 text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-gray-100"
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
            <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
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
            <label htmlFor="subject" className="block text-sm font-medium text-text-primary mb-2">
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
            <label htmlFor="description" className="block text-sm font-medium text-text-primary mb-2">
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

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Color del Avatar
            </label>
            <div className="grid grid-cols-4 gap-3">
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleColorSelect(option.value)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.color === option.value 
                      ? 'border-primary ring-2 ring-primary ring-opacity-20' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <div 
                      className={`w-8 h-8 ${option.value} rounded-full`}
                    />
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

export default MentorCreationModal; 