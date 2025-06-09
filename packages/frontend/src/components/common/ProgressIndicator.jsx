import React from 'react';

const ProgressIndicator = ({ currentStep, totalSteps = 3 }) => {
  // Ensure valid props
  const validCurrentStep = Math.max(1, Math.min(currentStep, totalSteps));
  const validTotalSteps = Math.max(1, totalSteps);

  return (
    <div className="flex justify-center mb-4" role="progressbar" aria-valuenow={validCurrentStep} aria-valuemax={validTotalSteps}>
      <div className="flex space-x-3">
        {Array.from({ length: validTotalSteps }, (_, index) => {
          const step = index + 1;
          const isCompleted = step <= validCurrentStep;
          return (
            <div
              key={step}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                isCompleted ? "bg-primary" : "bg-gray-200"
              }`}
              aria-label={`Paso ${step}${isCompleted ? ' completado' : ''}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator; 