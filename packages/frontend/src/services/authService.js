import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (credentials) => {
  const formData = new URLSearchParams();
  formData.append('username', credentials.email);
  formData.append('password', credentials.password);

  const response = await api.post('/auth/login/token', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if (response.data.access_token) {
    localStorage.setItem('authToken', response.data.access_token);
    const user = await getProfile();
    return { token: response.data.access_token, user };
  }
  return response.data;
};

export const register = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        
        // After successful registration, automatically log the user in
        // Clear sensitive data from memory by creating new object
        const loginCredentials = {
            email: userData.email,
            password: userData.password
        };
        
        const loginData = await login(loginCredentials);
        
        // Clear credentials from memory
        loginCredentials.password = null;
        delete loginCredentials.password;
        
        return {
            user: response.data, // Registration response (user data)
            ...loginData // Login response (token + updated user data from /auth/me)
        };
    } catch (error) {
        // Enhanced error handling for registration flow
        if (error.response?.status === 400) {
            throw new Error('Registration failed. User may already exist.');
        }
        throw error;
    }
};

export const logout = () => {
  localStorage.removeItem('authToken');
};

export const getProfile = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};