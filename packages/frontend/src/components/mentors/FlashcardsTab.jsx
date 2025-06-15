import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, Button } from '../common';
import { openFlashcardGenerationModal } from '../../state';

const FlashcardsTab = ({ mentor }) => {
  const dispatch = useDispatch();

  const handleOpenFlashcardModal = () => {
    dispatch(openFlashcardGenerationModal());
  };

  return (
    <div className="h-full overflow-y-auto p-4">
      <Card className="p-6 text-center">
        <h3 className="heading-xs mb-2">Tarjetas de Estudio</h3>
        <p className="body-sm text-gray-600 mb-4">
          Repasa conceptos clave con tarjetas interactivas
        </p>
        <Button 
          onClick={handleOpenFlashcardModal}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Generar Tarjetas
        </Button>
      </Card>
    </div>
  );
};

export default FlashcardsTab; 