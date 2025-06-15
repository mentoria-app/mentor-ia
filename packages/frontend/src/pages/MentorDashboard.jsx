import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, QuizGenerationModal, FlashcardGenerationModal } from '../components/common';
import { MentorDashboardHeader, ResourcesTab, ChatTab, QuizTab, FlashcardsTab, SettingsTab } from '../components/mentors';
import { DEFAULT_AVATAR } from '../constants/avatars';
import { 
  selectMentorById, 
  selectActiveMentorId, 
  selectMentorsLoading,
  selectMentorsError,
  setActiveMentor,
  fetchResourcesForMentor,
  selectIsQuizGenerationModalOpen,
  selectIsFlashcardGenerationModalOpen
} from '../state';

const MentorDashboard = ({ activeTab = 'resources', onTabChange }) => {
  const { mentorId } = useParams();
  const dispatch = useDispatch();
  
  const activeMentorId = useSelector(selectActiveMentorId);
  const mentor = useSelector(state => selectMentorById(state, mentorId));
  const loading = useSelector(selectMentorsLoading);
  const error = useSelector(selectMentorsError);
  const isQuizModalOpen = useSelector(selectIsQuizGenerationModalOpen);
  const isFlashcardModalOpen = useSelector(selectIsFlashcardGenerationModalOpen);

  useEffect(() => {
    if (mentorId && mentorId !== activeMentorId) {
      dispatch(setActiveMentor(mentorId));
    }
  }, [mentorId, activeMentorId, dispatch]);

  // Fetch resources when mentor changes
  useEffect(() => {
    if (mentor?.id) {
      dispatch(fetchResourcesForMentor(mentor.id));
    }
  }, [mentor?.id, dispatch]);

  if (!mentor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full p-6">
        <div className="text-center">
          <h2 className="heading-md text-gray-900 mb-2">
            Mentor no encontrado
          </h2>
          <p className="body-md text-gray-600">
            El mentor que estás buscando no existe o ha sido eliminado.
          </p>
        </div>
      </div>
    );
  }

  // Ensure resources array exists (fallback for backend compatibility)
  const resources = mentor.resources || [];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatTab mentor={mentor} />;
      case 'quiz':
        return <QuizTab mentor={mentor} />;
      case 'flashcards':
        return <FlashcardsTab mentor={mentor} />;
      case 'settings':
        return <SettingsTab mentor={mentor} />;
      case 'resources':
      default:
        return <ResourcesTab mentor={mentor} />;
    }
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <MentorDashboardHeader mentor={mentor} resourceCount={resources.length} />
        
        <div className="flex-1 overflow-hidden">
          {renderTabContent()}
        </div>
      </div>

      {/* Modals */}
      <QuizGenerationModal isOpen={isQuizModalOpen} />
      <FlashcardGenerationModal isOpen={isFlashcardModalOpen} />
    </>
  );
};

export default MentorDashboard; 