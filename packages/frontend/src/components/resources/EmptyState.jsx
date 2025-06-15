import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../common';
import { openResourceUploadModal } from '../../state';

const EmptyState = () => {
  const dispatch = useDispatch();

  const handleAddResource = useCallback(() => {
    dispatch(openResourceUploadModal());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center h-full px-8 py-16">
      {/* Supporting Mascot - Reduced prominence */}
      <div className="mb-8">
        <img 
          src="/assets/images/MascotEmptyState.svg" 
          alt="Mascota MentorIA"
          className="w-28 h-28 mx-auto opacity-90"
          loading="lazy"
        />
      </div>

      {/* Primary Content - Optimized hierarchy */}
      <div className="text-center max-w-xs">
        {/* Primary Headline - Mobile optimized */}
        <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-4">
          ¡Tu primer recurso!
        </h2>

        {/* Supporting Description - Better contrast */}
        <p className="text-gray-800 text-lg leading-relaxed mb-8 font-medium">
          Sube material y tu mentor creará una experiencia personalizada
        </p>

        {/* Primary CTA - Mobile-first design */}
        <Button
          onClick={handleAddResource}
          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-8 py-4 rounded-xl text-lg font-semibold flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl active:shadow-md transition-all duration-200 touch-manipulation"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>Subir Recurso</span>
        </Button>

        {/* Subtle Feature Hint - Minimal cognitive load */}
        <div className="mt-8">
          <p className="text-gray-500 text-sm font-medium">
            Archivos • Enlaces • Fotos
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EmptyState); 