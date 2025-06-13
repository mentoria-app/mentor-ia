import React from 'react';
import { Card, Button } from '../common';
import { Brain, BookOpen, ChevronRight, UsersIcon, CheckIcon, LightbulbIcon } from '../common/Icons';

const WelcomeStep = ({ onNext }) => {
  return (
    <Card className="border-0 overflow-hidden">
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 text-white">
        <div className="mb-2 flex justify-center">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-inner">
            <Brain className="w-7 h-7 text-white" />
          </div>
        </div>
        <h1 className="heading-lg text-center mb-1">¡Bienvenido a MentorIA!</h1>
        <p className="body-sm text-blue-100 text-center">Tu compañero de estudio personalizado con IA</p>
      </div>

      <div className="p-4 bg-white min-h-[340px]">
        <div className="space-y-3 mb-4">
          <p className="body-lg text-gray-700">
            MentorIA te ayuda a organizar tus estudios con Mentores IA personalizados.
          </p>

          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <div className="flex items-start space-x-3">
              <BookOpen className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="body-sm text-gray-700 leading-relaxed">
                Cada Mentor tiene su propia bóveda de conocimiento. Organiza tus materias, exámenes o proyectos 
                con Mentores especializados.
              </p>
            </div>
          </div>

          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50 mt-4">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <UsersIcon className="w-5 h-5 text-blue-500" />
                </div>
                <span className="caption text-gray-600">Personalizado</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <CheckIcon className="w-5 h-5 text-blue-500" />
                </div>
                <span className="caption text-gray-600">Eficiente</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <LightbulbIcon className="w-5 h-5 text-blue-500" />
                </div>
                <span className="caption text-gray-600">Inteligente</span>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={onNext}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-0 shadow-lg shadow-blue-200 flex items-center justify-center"
          size="lg"
        >
          <span className="flex items-center">
            Comenzar
            <ChevronRight className="w-5 h-5 ml-2" />
          </span>
        </Button>
      </div>
    </Card>
  );
};

export default WelcomeStep; 