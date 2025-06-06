import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from './';
import { closeQuizGenerationModal, selectMentorById } from '../../state';
import { useParams } from 'react-router-dom';

const QuizGenerationModal = ({ isOpen }) => {
  const dispatch = useDispatch();
  const { mentorId } = useParams();
  const currentMentor = useSelector(state => selectMentorById(state, mentorId));
  
  const [formData, setFormData] = useState({
    resourceId: '',
    quizLength: '5',
    difficulty: 'medium'
  });

  const quizLengthOptions = [
    { value: '5', label: '5 preguntas' },
    { value: '10', label: '10 preguntas' },
    { value: '15', label: '15 preguntas' },
    { value: '20', label: '20 preguntas' }
  ];

  const difficultyOptions = [
    { value: 'easy', label: 'Fácil', description: 'Preguntas básicas de comprensión' },
    { value: 'medium', label: 'Intermedio', description: 'Preguntas de análisis y aplicación' },
    { value: 'hard', label: 'Difícil', description: 'Preguntas de evaluación y síntesis' }
  ];

  const handleClose = () => {
    dispatch(closeQuizGenerationModal());
    setFormData({ resourceId: '', quizLength: '5', difficulty: 'medium' });
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
      // TODO: Dispatch action to generate quiz
      console.log('Generating quiz with:', formData);
      
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
            Generar Quiz
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
              <option value="">Selecciona el contenido para el quiz</option>
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

          {/* Quiz Length */}
          <div>
            <label htmlFor="quizLength" className="block text-sm font-medium text-text-primary mb-2">
              Número de Preguntas
            </label>
            <select
              id="quizLength"
              name="quizLength"
              value={formData.quizLength}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {quizLengthOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Selection */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Nivel de Dificultad
            </label>
            <div className="space-y-3">
              {difficultyOptions.map((option) => (
                <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="difficulty"
                    value={option.value}
                    checked={formData.difficulty === option.value}
                    onChange={handleInputChange}
                    className="mt-1 text-primary focus:ring-primary"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-text-primary">{option.label}</div>
                    <div className="text-sm text-text-secondary">{option.description}</div>
                  </div>
                </label>
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
              disabled={!formData.resourceId || availableResources.length === 0}
            >
              Generar Quiz
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default QuizGenerationModal; 