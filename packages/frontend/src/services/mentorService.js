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

// Mock delay for development
const API_DELAY = 800;

// Mock mentors data (for fallback/development)
let mockMentors = [
  {
    id: 1,
    name: 'Matemáticas',
    expertise: 'Álgebra y Cálculo',
    avatar_url: '/assets/avatars/scientist.webp',
    color: null,
    description: 'Tu mentor especializado en matemáticas avanzadas',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z',
    resources: [
      {
        id: 1,
        title: 'Derivadas e Integrales.pdf',
        type: 'pdf',
        uploadDate: '2024-01-15',
        size: '2.1 MB',
        thumbnail: null,
        url: '/mock/files/derivadas-integrales.pdf'
      },
      {
        id: 2,
        title: 'Ejercicios de Límites',
        type: 'image',
        uploadDate: '2024-01-10',
        size: '850 KB',
        thumbnail: null,
        url: '/mock/files/ejercicios-limites.jpg'
      }
    ]
  },
  {
    id: 2,
    name: 'Historia',
    expertise: 'Historia Universal',
    avatar_url: '/assets/avatars/trainer.webp',
    color: null,
    description: 'Tu mentor especializado en historia mundial',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-18T12:15:00Z',
    resources: [
      {
        id: 3,
        title: 'Primera Guerra Mundial.pdf',
        type: 'pdf',
        uploadDate: '2024-01-12',
        size: '3.2 MB',
        thumbnail: null,
        url: '/mock/files/primera-guerra-mundial.pdf'
      }
    ]
  },
  {
    id: 3,
    name: 'Biología',
    expertise: 'Biología Celular',
    avatar_url: '/assets/avatars/doctor.webp',
    color: null,
    description: 'Tu mentor especializado en biología y ciencias de la vida',
    createdAt: '2024-01-08T14:20:00Z',
    updatedAt: '2024-01-22T11:45:00Z',
    resources: [
      {
        id: 4,
        title: 'Estructura Celular',
        type: 'image',
        uploadDate: '2024-01-08',
        size: '1.2 MB',
        thumbnail: null,
        url: '/mock/files/estructura-celular.png'
      },
      {
        id: 5,
        title: 'Mitosis y Meiosis - YouTube',
        type: 'url',
        uploadDate: '2024-01-14',
        size: null,
        thumbnail: null,
        url: 'https://youtube.com/watch?v=example'
      }
    ]
  }
];

// Get all mentors - REAL API CALL
export const getMentors = async () => {
  try {
    const response = await api.get('/mentors/');
    return {
      mentors: response.data,
      totalCount: response.data.length,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching mentors:', error);
    
    // Enhanced error handling
    if (error.response) {
      // Server responded with an error status
      if (error.response.status === 401) {
        // Clear invalid token
        localStorage.removeItem('authToken');
        // Dispatch custom event for auth error handling
        window.dispatchEvent(new CustomEvent('auth:expired'));
        throw {
          error: 'AUTH_ERROR',
          message: 'Session expired. Please log in again.',
          status: 401
        };
      }
      throw {
        error: 'API_ERROR',
        message: error.response.data.detail || 'Error del servidor',
        status: error.response.status
      };
    } else if (error.request) {
      // Network error
      throw {
        error: 'NETWORK_ERROR',
        message: 'Error de conexión. Intenta nuevamente.'
      };
    } else if (error.error) {
      // Pre-thrown error (like AUTH_ERROR above)
      throw error;
    } else {
      // Other error
      throw {
        error: 'UNKNOWN_ERROR',
        message: 'Error inesperado al obtener mentores'
      };
    }
  }
};

// Get a specific mentor by ID
export const getMentorById = async (mentorId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const mentor = mockMentors.find(m => m.id === parseInt(mentorId));
      
      if (!mentor) {
        reject({
          error: 'MENTOR_NOT_FOUND',
          message: 'Mentor no encontrado'
        });
        return;
      }

      resolve(mentor);
    }, API_DELAY);
  });
};

// Create a new mentor - REAL API CALL
export const createMentor = async (mentorData) => {
  try {
    const response = await api.post('/mentors/', {
      name: mentorData.name,
      expertise: mentorData.expertise,
      description: mentorData.description,
      avatar_url: mentorData.avatar_url || '/assets/avatars/default.webp'
    });
    
    return response.data;
  } catch (error) {
    console.error('Error creating mentor:', error);
    
    // Enhanced error handling
    if (error.response) {
      // Server responded with an error status
      if (error.response.status === 400) {
        throw {
          error: 'VALIDATION_ERROR',
          message: error.response.data.detail || 'Datos de mentor inválidos'
        };
      }
      throw {
        error: 'API_ERROR',
        message: error.response.data.detail || 'Error del servidor',
        status: error.response.status
      };
    } else if (error.request) {
      // Network error
      throw {
        error: 'NETWORK_ERROR',
        message: 'Error de conexión. Intenta nuevamente.'
      };
    } else {
      // Other error
      throw {
        error: 'CREATION_ERROR',
        message: 'Error al crear el mentor'
      };
    }
  }
};

// Update an existing mentor - REAL API CALL
export const updateMentor = async (mentorId, updates) => {
  try {
    const response = await api.put(`/mentors/${mentorId}`, {
      name: updates.name,
      expertise: updates.expertise,
      description: updates.description,
      avatar_url: updates.avatar_url
    });
    
    return response.data;
  } catch (error) {
    console.error('Error updating mentor:', error);
    
    // Enhanced error handling
    if (error.response) {
      // Server responded with an error status
      if (error.response.status === 404) {
        throw {
          error: 'MENTOR_NOT_FOUND',
          message: 'Mentor no encontrado'
        };
      }
      if (error.response.status === 400) {
        throw {
          error: 'VALIDATION_ERROR',
          message: error.response.data.detail || 'Datos de mentor inválidos'
        };
      }
      throw {
        error: 'API_ERROR',
        message: error.response.data.detail || 'Error del servidor',
        status: error.response.status
      };
    } else if (error.request) {
      // Network error
      throw {
        error: 'NETWORK_ERROR',
        message: 'Error de conexión. Intenta nuevamente.'
      };
    } else {
      // Other error
      throw {
        error: 'UPDATE_ERROR',
        message: 'Error al actualizar el mentor'
      };
    }
  }
};

// Delete a mentor
export const deleteMentor = async (mentorId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const mentorIndex = mockMentors.findIndex(m => m.id === parseInt(mentorId));
      
      if (mentorIndex === -1) {
        reject({
          error: 'MENTOR_NOT_FOUND',
          message: 'Mentor no encontrado'
        });
        return;
      }

      // Remove mentor
      const deletedMentor = mockMentors.splice(mentorIndex, 1)[0];

      resolve({
        success: true,
        deletedMentor,
        message: 'Mentor eliminado correctamente'
      });
    }, API_DELAY);
  });
};

// Get mentor statistics
export const getMentorStats = async (mentorId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const mentor = mockMentors.find(m => m.id === parseInt(mentorId));
      
      if (!mentor) {
        reject({
          error: 'MENTOR_NOT_FOUND',
          message: 'Mentor no encontrado'
        });
        return;
      }

      const stats = {
        totalResources: mentor.resources.length,
        resourceTypes: {
          pdf: mentor.resources.filter(r => r.type === 'pdf').length,
          image: mentor.resources.filter(r => r.type === 'image').length,
          url: mentor.resources.filter(r => r.type === 'url').length,
          video: mentor.resources.filter(r => r.type === 'video').length,
          audio: mentor.resources.filter(r => r.type === 'audio').length
        },
        lastResourceUpload: mentor.resources.length > 0 
          ? Math.max(...mentor.resources.map(r => new Date(r.uploadDate).getTime()))
          : null,
        createdAt: mentor.createdAt,
        lastActivity: mentor.updatedAt
      };

      resolve(stats);
    }, 500);
  });
}; 