import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from './';
import { closeFlashcardGenerationModal, selectMentorById } from '../../state';
import { useParams } from 'react-router-dom';

const FlashcardGenerationModal = ({ isOpen }) => {
  const dispatch = useDispatch();
  const { mentorId } = useParams();
  const currentMentor = useSelector(state => selectMentorById(state, mentorId));
  
  const [formData, setFormData] = useState({
    resourceId: '',
    cardCount: '10'
  });

  const cardCountOptions = [
    { value: '5', label: '5 tarjetas' },
    { value: '10', label: '10 tarjetas' },
    { value: '15', label: '15 tarjetas' },
    { value: '20', label: '20 tarjetas' }
  ];

  const handleClose = () => {
    dispatch(closeFlashcardGenerationModal());
    setFormData({ resourceId: '', cardCount: '10' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.resourceId || formData.resourceId === 'all') {
      // TODO: Dispatch action to generate flashcards
      console.log('Generating flashcards with:', formData);
      
      // Close modal and reset form
      handleClose();
    }
  };

  const availableResources = currentMentor?.resources || [];

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-text-primary">
            Generar Tarjetas de Estudio
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
          {/* Resource Selection */}
          <div>
            <label htmlFor="resourceId" className="block text-sm font-medium text-text-primary mb-2">
              Seleccionar Contenido *
            </label>
            <select
              id="resourceId"
              name="resourceId"
              value={formData.resourceId}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            >
              <option value="">Selecciona el contenido para las tarjetas</option>
              <option value="all">Todos los recursos disponibles</option>
              {availableResources.map((resource) => (
                <option key={resource.id} value={resource.id}>
                  {resource.title}
                </option>
              ))}
            </select>
            {availableResources.length === 0 && (
              <p className="text-sm text-gray-500 mt-1">
                No hay recursos disponibles. Sube contenido primero.
              </p>
            )}
          </div>

          {/* Number of Cards */}
          <div>
            <label htmlFor="cardCount" className="block text-sm font-medium text-text-primary mb-2">
              Número de Tarjetas
            </label>
            <select
              id="cardCount"
              name="cardCount"
              value={formData.cardCount}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {cardCountOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="text-blue-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-blue-800">Sobre las tarjetas de estudio</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Las tarjetas incluirán conceptos clave, definiciones y preguntas basadas en tu contenido. 
                  Perfectas para repasar antes de exámenes.
                </p>
              </div>
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
              disabled={!formData.resourceId || availableResources.length === 0}
            >
              Generar Tarjetas
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default FlashcardGenerationModal; 