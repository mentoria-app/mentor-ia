import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MentorCard, MentorCreationModal } from '../components/mentors';
import { Button } from '../components/common';
import { selectAllMentors, openMentorCreationModal, selectIsMentorCreationModalOpen } from '../state';

const MentorHub = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get mentors from Redux store
  const mentors = useSelector(selectAllMentors);
  const isMentorCreationModalOpen = useSelector(selectIsMentorCreationModalOpen);

  const handleMentorClick = (mentor) => {
    navigate(`/mentor/${mentor.id}`);
  };

  const handleCreateMentor = () => {
    dispatch(openMentorCreationModal());
  };

  return (
    <>
      <div className="flex flex-col min-h-full">
        {/* Main Content */}
        <div className="flex-1 p-4 pb-24">
          {/* Welcome Section */}
          {mentors.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🤖</span>
              </div>
              <h2 className="text-xl font-semibold text-text-primary mb-2">
                ¡Bienvenido a MentorIA!
              </h2>
              <p className="text-text-secondary mb-6">
                Crea tu primer mentor para comenzar a estudiar
              </p>
            </div>
          ) : (
            <div className="mb-6">
              <h2 className="text-lg font-medium text-text-primary mb-2">
                Tus mentores ({mentors.length})
              </h2>
              <p className="text-sm text-text-secondary">
                Selecciona un mentor para continuar estudiando
              </p>
            </div>
          )}

          {/* Mentors Grid */}
          {mentors.length > 0 && (
            <div className="space-y-3">
              {mentors.map((mentor) => (
                <MentorCard
                  key={mentor.id}
                  mentor={{
                    ...mentor,
                    resourceCount: mentor.resources?.length || 0
                  }}
                  onClick={handleMentorClick}
                />
              ))}
            </div>
          )}
        </div>

        {/* Fixed Create Button */}
        <div className="fixed bottom-6 left-4 right-4 z-10">
          <Button
            onClick={handleCreateMentor}
            size="lg"
            className="w-full font-semibold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center space-x-2"
          >
            <span className="text-xl">+</span>
            <span>Crear nuevo Mentor</span>
          </Button>
        </div>
      </div>

      {/* Mentor Creation Modal */}
      <MentorCreationModal isOpen={isMentorCreationModalOpen} />
    </>
  );
};

export default MentorHub; 