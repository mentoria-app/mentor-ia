// Mock authentication service
const API_DELAY = 1000; // Simulate network delay

// Mock user data
const mockUsers = [
  {
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
  },
  {
    id: 2,
    name: 'María González',
    email: 'maria.gonzalez@email.com',
    avatar: null,
    preferences: {
      language: 'es',
      theme: 'light',
      notifications: false
    },
    stats: {
      totalMentors: 5,
      totalQuizzes: 24,
      studyStreak: 15,
      joinDate: '2023-12-15'
    }
  }
];

// Simulate login API call
export const login = async (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { email, password } = credentials;
      
      // Simple mock validation
      if (!email || !password) {
        reject({
          error: 'VALIDATION_ERROR',
          message: 'Email y contraseña son requeridos'
        });
        return;
      }

      // Find user by email
      const user = mockUsers.find(u => u.email === email);
      
      if (!user) {
        reject({
          error: 'USER_NOT_FOUND',
          message: 'Usuario no encontrado'
        });
        return;
      }

      // Mock password validation (in real app, this would be hashed)
      if (password !== 'password123') {
        reject({
          error: 'INVALID_CREDENTIALS',
          message: 'Credenciales inválidas'
        });
        return;
      }

      // Success response
      resolve({
        user,
        token: `mock-jwt-token-${user.id}-${Date.now()}`,
        refreshToken: `mock-refresh-token-${user.id}`,
        expiresIn: 3600 // 1 hour
      });
    }, API_DELAY);
  });
};

// Simulate logout API call
export const logout = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
};

// Simulate token refresh
export const refreshToken = async (refreshToken) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!refreshToken || !refreshToken.startsWith('mock-refresh-token')) {
        reject({
          error: 'INVALID_REFRESH_TOKEN',
          message: 'Token de actualización inválido'
        });
        return;
      }

      const userId = refreshToken.split('-')[3];
      const user = mockUsers.find(u => u.id === parseInt(userId));

      if (!user) {
        reject({
          error: 'USER_NOT_FOUND',
          message: 'Usuario no encontrado'
        });
        return;
      }

      resolve({
        token: `mock-jwt-token-${user.id}-${Date.now()}`,
        expiresIn: 3600
      });
    }, 500);
  });
};

// Simulate user profile update
export const updateProfile = async (userId, updates) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userIndex = mockUsers.findIndex(u => u.id === userId);
      
      if (userIndex === -1) {
        reject({
          error: 'USER_NOT_FOUND',
          message: 'Usuario no encontrado'
        });
        return;
      }

      // Update user data
      mockUsers[userIndex] = {
        ...mockUsers[userIndex],
        ...updates,
        preferences: {
          ...mockUsers[userIndex].preferences,
          ...updates.preferences
        }
      };

      resolve(mockUsers[userIndex]);
    }, API_DELAY);
  });
};

// Simulate password change
export const changePassword = async (userId, currentPassword, newPassword) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (currentPassword !== 'password123') {
        reject({
          error: 'INVALID_CURRENT_PASSWORD',
          message: 'Contraseña actual incorrecta'
        });
        return;
      }

      if (newPassword.length < 6) {
        reject({
          error: 'WEAK_PASSWORD',
          message: 'La nueva contraseña debe tener al menos 6 caracteres'
        });
        return;
      }

      resolve({ success: true });
    }, API_DELAY);
  });
}; 