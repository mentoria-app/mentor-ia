import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMentorCreationModalOpen: false,
  isResourceUploadModalOpen: false,
  isQuizGenerationModalOpen: false,
  isFlashcardGenerationModalOpen: false,
  isSidebarOpen: false,
  activeTab: 'chat',
  notifications: [],
  loading: {
    global: false,
    mentorCreation: false,
    resourceUpload: false,
    quizGeneration: false,
    flashcardGeneration: false
  }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMentorCreationModal: (state) => {
      state.isMentorCreationModalOpen = !state.isMentorCreationModalOpen;
    },
    openMentorCreationModal: (state) => {
      state.isMentorCreationModalOpen = true;
    },
    closeMentorCreationModal: (state) => {
      state.isMentorCreationModalOpen = false;
    },
    toggleResourceUploadModal: (state) => {
      state.isResourceUploadModalOpen = !state.isResourceUploadModalOpen;
    },
    openResourceUploadModal: (state) => {
      state.isResourceUploadModalOpen = true;
    },
    closeResourceUploadModal: (state) => {
      state.isResourceUploadModalOpen = false;
    },
    toggleQuizGenerationModal: (state) => {
      state.isQuizGenerationModalOpen = !state.isQuizGenerationModalOpen;
    },
    openQuizGenerationModal: (state) => {
      state.isQuizGenerationModalOpen = true;
    },
    closeQuizGenerationModal: (state) => {
      state.isQuizGenerationModalOpen = false;
    },
    toggleFlashcardGenerationModal: (state) => {
      state.isFlashcardGenerationModalOpen = !state.isFlashcardGenerationModalOpen;
    },
    openFlashcardGenerationModal: (state) => {
      state.isFlashcardGenerationModalOpen = true;
    },
    closeFlashcardGenerationModal: (state) => {
      state.isFlashcardGenerationModalOpen = false;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...action.payload
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action) => {
      const notificationId = action.payload;
      state.notifications = state.notifications.filter(
        notification => notification.id !== notificationId
      );
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
    setGlobalLoading: (state, action) => {
      state.loading.global = action.payload;
    },
    setMentorCreationLoading: (state, action) => {
      state.loading.mentorCreation = action.payload;
    },
    setResourceUploadLoading: (state, action) => {
      state.loading.resourceUpload = action.payload;
    },
    setQuizGenerationLoading: (state, action) => {
      state.loading.quizGeneration = action.payload;
    },
    setFlashcardGenerationLoading: (state, action) => {
      state.loading.flashcardGeneration = action.payload;
    },
    resetUI: (state) => {
      return initialState;
    }
  }
});

// Action creators
export const {
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
  toggleSidebar,
  openSidebar,
  closeSidebar,
  setActiveTab,
  addNotification,
  removeNotification,
  clearAllNotifications,
  setGlobalLoading,
  setMentorCreationLoading,
  setResourceUploadLoading,
  setQuizGenerationLoading,
  setFlashcardGenerationLoading,
  resetUI
} = uiSlice.actions;

// Selectors
export const selectIsMentorCreationModalOpen = (state) => state.ui.isMentorCreationModalOpen;
export const selectIsResourceUploadModalOpen = (state) => state.ui.isResourceUploadModalOpen;
export const selectIsQuizGenerationModalOpen = (state) => state.ui.isQuizGenerationModalOpen;
export const selectIsFlashcardGenerationModalOpen = (state) => state.ui.isFlashcardGenerationModalOpen;
export const selectIsSidebarOpen = (state) => state.ui.isSidebarOpen;
export const selectActiveTab = (state) => state.ui.activeTab;
export const selectNotifications = (state) => state.ui.notifications;
export const selectGlobalLoading = (state) => state.ui.loading.global;
export const selectMentorCreationLoading = (state) => state.ui.loading.mentorCreation;
export const selectResourceUploadLoading = (state) => state.ui.loading.resourceUpload;
export const selectQuizGenerationLoading = (state) => state.ui.loading.quizGeneration;
export const selectFlashcardGenerationLoading = (state) => state.ui.loading.flashcardGeneration;

export default uiSlice.reducer; 