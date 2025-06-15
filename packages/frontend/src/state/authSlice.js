import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from '../services/authService';

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await authService.login(credentials);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: error.message || 'Login failed' });
    }
  }
);

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await authService.register(userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: error.message || 'Registration failed' });
    }
  }
);

// Async thunk for user logout
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async () => {
        authService.logout();
    }
);

// Async thunk for initializing auth state from stored token
export const initializeAuth = createAsyncThunk(
  'auth/initializeAuth',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        return null;
      }
      
      // Add timeout to prevent hanging initialization
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Auth initialization timeout')), 10000)
      );
      
      const profilePromise = authService.getProfile();
      const user = await Promise.race([profilePromise, timeoutPromise]);
      
      return { token, user };
    } catch (error) {
      // Token is invalid or request failed, remove it
      localStorage.removeItem('authToken');
      return rejectWithValue(error.response?.data || { detail: 'Authentication failed' });
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  token: null,
  registrationSuccess: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: (state) => {
        state.error = null;
    },
    resetRegistrationSuccess: (state) => {
      state.registrationSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registrationSuccess = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload;
      })
      // Registration
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registrationSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationSuccess = true;
        // After successful registration, user is automatically logged in
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.registrationSuccess = false;
      })
        // Logout
      .addCase(logoutUser.fulfilled, (state) => {
          state.user = null;
          state.isAuthenticated = false;
          state.token = null;
          state.error = null;
          state.loading = false;
      })
      // Initialize auth
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
        state.error = null;
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = null;
      });
  }
});

// Action creators
export const {
  clearAuthError,
  resetRegistrationSuccess,
} = authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthToken = (state) => state.auth.token;
export const selectRegistrationSuccess = (state) => state.auth.registrationSuccess;
export const selectUserPreferences = (state) => state.auth.user?.preferences || {};
export const selectUserStats = (state) => state.auth.user?.stats || {};

export default authSlice.reducer; 