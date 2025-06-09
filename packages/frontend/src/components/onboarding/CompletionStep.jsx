import React from 'react';
import { Card, Button } from '../common';
import { CheckCircle2, ChevronRight, BookOpen, CalendarIcon, MessageCircleIcon } from '../common/Icons';

const CompletionStep = ({ mentorName, selectedAvatar, onComplete }) => {
  return (
    <Card className="border-0 overflow-hidden">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 text-white">
        <div className="mb-2 flex justify-center">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-inner">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center">¡Todo Listo!</h2>
        <p className="text-indigo-100 text-center text-xs mt-1">Tu mentor está preparado para ayudarte a aprender</p>
      </div>

      <div className="p-4 bg-white min-h-[340px]">
        <div className="space-y-4 mb-6">
          <p className="text-base text-gray-700 leading-relaxed">
            Tu Mentor está listo para ayudarte. Puedes agregar más Mentores más tarde desde tu Hub de Mentores.
          </p>

          {selectedAvatar && (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-lg border border-indigo-100 shadow-inner">
              <div className="flex items-center">
                <div
                  className={`w-12 h-12 ${selectedAvatar.bgColor} rounded-full flex items-center justify-center shadow-md`}
                >
                  <span className={selectedAvatar.iconColor}>{selectedAvatar.icon}</span>
                </div>
                <div className="ml-3 text-left">
                  <h3 className="text-base font-semibold text-gray-800">{mentorName}</h3>
                  <p className="text-xs text-gray-600">Tu Mentor {selectedAvatar.name}</p>
                </div>
              </div>
              <div className="mt-2 bg-white/70 backdrop-blur-sm rounded-lg p-2 text-xs text-gray-600">
                <p className="italic">"{mentorName} está listo para ayudarte a aprender!"</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="bg-indigo-50 p-3 rounded-lg text-center">
              <BookOpen className="w-5 h-5 mx-auto mb-1 text-indigo-500" />
              <span className="text-xs text-gray-700">Notas de Estudio</span>
            </div>
            <div className="bg-indigo-50 p-3 rounded-lg text-center">
              <CalendarIcon className="w-5 h-5 mx-auto mb-1 text-indigo-500" />
              <span className="text-xs text-gray-700">Cuestionarios</span>
            </div>
            <div className="bg-indigo-50 p-3 rounded-lg text-center">
              <MessageCircleIcon className="w-5 h-5 mx-auto mb-1 text-indigo-500" />
              <span className="text-xs text-gray-700">Chat</span>
            </div>
          </div>
        </div>

        <Button
          onClick={onComplete}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-200 flex items-center justify-center"
          size="lg"
        >
          <span className="flex items-center whitespace-nowrap">
            Hub de Mentores
            <ChevronRight className="w-5 h-5 ml-2" />
          </span>
        </Button>
      </div>
    </Card>
  );
};

export default CompletionStep; 