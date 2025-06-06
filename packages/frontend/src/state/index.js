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
  setActiveTab,
  addNotification,
  removeNotification,
  clearAllNotifications,
  selectIsMentorCreationModalOpen,
  selectIsResourceUploadModalOpen,
  selectActiveTab,
  selectNotifications
} from './uiSlice';

// Auth slice
export {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUser,
  mockLogin,
  selectUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  selectUserPreferences,
  selectUserStats
} from './authSlice'; 