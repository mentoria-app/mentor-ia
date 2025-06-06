import { createSlice } from '@reduxjs/toolkit';

// Mock user data for development
const mockUser = {
  id: 1,
  name: 'Juan Pérez',
  email: 'juan.perez@email.com',
  avatar: null,
  preferences: {
    language: 'es',
    theme: 'light',
    notifications: true
  },
  stats: {
    totalMentors: 3,
    totalQuizzes: 12,
    studyStreak: 7,
    joinDate: '2024-01-01'
  }
};

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  token: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
      state.loading = false;
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    updateUserPreferences: (state, action) => {
      if (state.user) {
        state.user.preferences = { ...state.user.preferences, ...action.payload };
      }
    },
    updateUserStats: (state, action) => {
      if (state.user) {
        state.user.stats = { ...state.user.stats, ...action.payload };
      }
    },
    setAuthLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    // Mock login for development
    mockLogin: (state) => {
      state.isAuthenticated = true;
      state.user = mockUser;
      state.token = 'mock-jwt-token';
      state.loading = false;
      state.error = null;
    }
  }
});

// Action creators
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUser,
  updateUserPreferences,
  updateUserStats,
  setAuthLoading,
  setAuthError,
  clearAuthError,
  mockLogin
} = authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthToken = (state) => state.auth.token;
export const selectUserPreferences = (state) => state.auth.user?.preferences || {};
export const selectUserStats = (state) => state.auth.user?.stats || {};

export default authSlice.reducer; 