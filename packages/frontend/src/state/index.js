// Store
export { store } from './store';

// Mentors slice
export { 
  setMentors,
  addMentor,
  updateMentor,
  deleteMentor,
  setActiveMentor,
  addResourceToMentor,
  removeResourceFromMentor,
  setLoading as setMentorsLoading,
  setError as setMentorsError,
  fetchMentors,
  createMentor,
  fetchResourcesForMentor,
  uploadResource,
  selectAllMentors,
  selectActiveMentorId,
  selectActiveMentor,
  selectMentorById,
  selectMentorsLoading,
  selectMentorsError
} from './mentorsSlice';

// UI slice
export {
  toggleMentorCreationModal,
  openMentorCreationModal,
  closeMentorCreationModal,
  toggleResourceUploadModal,
  openResourceUploadModal,
  closeResourceUploadModal,
  toggleQuizGenerationModal,
  openQuizGenerationModal,
  closeQuizGenerationModal,
  toggleFlashcardGenerationModal,
  openFlashcardGenerationModal,
  closeFlashcardGenerationModal,
  setActiveTab,
  addNotification,
  removeNotification,
  clearAllNotifications,
  selectIsMentorCreationModalOpen,
  selectIsResourceUploadModalOpen,
  selectIsQuizGenerationModalOpen,
  selectIsFlashcardGenerationModalOpen,
  selectActiveTab,
  selectNotifications
} from './uiSlice';

// Auth slice
export {
  loginUser,
  registerUser,
  logoutUser,
  initializeAuth,
  clearAuthError,
  resetRegistrationSuccess,
  selectUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  selectAuthToken,
  selectRegistrationSuccess,
  selectUserPreferences,
  selectUserStats
} from './authSlice'; 