import React from 'react';
import { Card, Button, Input } from '../common';
import { Sparkles, ChevronRight, CheckCircle2 } from '../common/Icons';
import AvatarSelector from './AvatarSelector';
import { cn } from '../../utils/cn';

const CreateMentorStep = ({ 
  mentorName, 
  onMentorNameChange, 
  selectedAvatar, 
  onSelectAvatar, 
  onNext, 
  canContinue,
  maxLength = 50
}) => {
  const handleNameChange = (value) => {
    // Sanitize input - limit length and remove special characters that could cause issues
    const sanitizedValue = value.slice(0, maxLength).replace(/[<>]/g, '');
    if (typeof onMentorNameChange === 'function') {
      onMentorNameChange(sanitizedValue);
    }
  };

  const handleNext = () => {
    if (canContinue && typeof onNext === 'function') {
      onNext();
    }
  };
  return (
    <Card className="border-0 overflow-hidden">
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-4 text-white">
        <div className="mb-2 flex justify-center">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-inner">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>
        <h2 className="heading-sm text-center">Crea tu Primer Mentor</h2>
        <p className="caption text-emerald-100 text-center mt-1">Personaliza tu compañero de aprendizaje</p>
      </div>

      <div className="p-4 bg-white min-h-[340px]">
        <div className="space-y-6">
          <div>
            <Input
              label="Nombre del Mentor"
              placeholder="ej. Ayudante de Matemáticas, Amigo de Biología..."
              value={mentorName}
              onChange={(e) => handleNameChange(e.target.value)}
              className="heading-xs border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-200"
              maxLength={maxLength}
              required
            />
            {mentorName && (
              <p className="caption text-emerald-600 mt-2 flex items-center">
                <CheckCircle2 className="w-3 h-3 mr-1" /> ¡Excelente elección de nombre!
              </p>
            )}
          </div>

          <AvatarSelector 
            selectedAvatar={selectedAvatar}
            onSelectAvatar={onSelectAvatar}
          />
        </div>

        <Button
          onClick={handleNext}
          disabled={!canContinue}
          className={cn(
            'w-full mt-8 shadow-lg transition-all duration-300 flex items-center justify-center',
            canContinue
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-emerald-200'
              : 'bg-gray-300 cursor-not-allowed shadow-none'
          )}
          size="lg"
        >
          <span className="flex items-center">
            Continuar
            <ChevronRight className="w-5 h-5 ml-2" />
          </span>
        </Button>
      </div>
    </Card>
  );
};

export default CreateMentorStep; 