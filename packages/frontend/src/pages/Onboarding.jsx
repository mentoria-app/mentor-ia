import React, { useState, useCallback, useMemo } from 'react';
import { ProgressIndicator } from '../components/common';
import WelcomeStep from '../components/onboarding/WelcomeStep';
import CreateMentorStep from '../components/onboarding/CreateMentorStep';
import CompletionStep from '../components/onboarding/CompletionStep';

// Constants
const TOTAL_STEPS = 3;
const TRANSITION_DURATION = 300;
const MAX_MENTOR_NAME_LENGTH = 50;

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [mentorName, setMentorName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextStep = useCallback(() => {
    if (currentStep < TOTAL_STEPS) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsTransitioning(false);
      }, TRANSITION_DURATION);
    }
  }, [currentStep]);

  const canContinue = useMemo(() => {
    if (currentStep === 2) {
      return mentorName.trim() !== '' && selectedAvatar !== null;
    }
    return true;
  }, [currentStep, mentorName, selectedAvatar]);

  const handleComplete = useCallback(() => {
    // Validate data before completion
    if (!mentorName.trim() || !selectedAvatar) {
      console.error('Invalid mentor data:', { mentorName, selectedAvatar });
      return;
    }

    // In a real app, this would create the mentor and navigate to the Mentor Hub
    // For now, we'll show an alert
    alert('¡Bienvenido a MentorIA! 🎉\n\nTu mentor ha sido creado exitosamente.');
    console.log('Mentor created:', { name: mentorName.trim(), avatar: selectedAvatar });
  }, [mentorName, selectedAvatar]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <WelcomeStep onNext={nextStep} />;
      case 2:
        return (
          <CreateMentorStep
            mentorName={mentorName}
            onMentorNameChange={setMentorName}
            selectedAvatar={selectedAvatar}
            onSelectAvatar={setSelectedAvatar}
            onNext={nextStep}
            canContinue={canContinue}
            maxLength={MAX_MENTOR_NAME_LENGTH}
          />
        );
      case 3:
        return (
          <CompletionStep
            mentorName={mentorName}
            selectedAvatar={selectedAvatar}
            onComplete={handleComplete}
          />
        );
      default:
        return <WelcomeStep onNext={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-2 font-sans">
      <div className="w-full max-w-md max-h-[90vh]">
        {/* Progress Indicator */}
        <ProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        {/* Step Content */}
        <div className="relative overflow-hidden rounded-2xl shadow-xl">
          <div
            className={`transition-all duration-500 ease-in-out ${
              isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            {renderStep()}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-3">
                        <p className="caption">Paso {currentStep} de {TOTAL_STEPS}</p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding; 