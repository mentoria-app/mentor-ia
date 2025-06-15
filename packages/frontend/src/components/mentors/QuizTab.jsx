import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, Button } from '../common';
import { openQuizGenerationModal } from '../../state';

const QuizTab = ({ mentor }) => {
  const dispatch = useDispatch();

  const handleOpenQuizModal = () => {
    dispatch(openQuizGenerationModal());
  };

  return (
    <div className="h-full overflow-y-auto p-4">
      <Card className="p-6 text-center">
        <h3 className="heading-xs mb-2">Quiz de Práctica</h3>
        <p className="body-sm text-gray-600 mb-4">
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
};

export default QuizTab; 