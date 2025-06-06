import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMentorCreationModalOpen: false,
  isResourceUploadModalOpen: false,
  isSidebarOpen: false,
  activeTab: 'chat',
  notifications: [],
  loading: {
    global: false,
    mentorCreation: false,
    resourceUpload: false
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
  resetUI
} = uiSlice.actions;

// Selectors
export const selectIsMentorCreationModalOpen = (state) => state.ui.isMentorCreationModalOpen;
export const selectIsResourceUploadModalOpen = (state) => state.ui.isResourceUploadModalOpen;
export const selectIsSidebarOpen = (state) => state.ui.isSidebarOpen;
export const selectActiveTab = (state) => state.ui.activeTab;
export const selectNotifications = (state) => state.ui.notifications;
export const selectGlobalLoading = (state) => state.ui.loading.global;
export const selectMentorCreationLoading = (state) => state.ui.loading.mentorCreation;
export const selectResourceUploadLoading = (state) => state.ui.loading.resourceUpload;

export default uiSlice.reducer; 