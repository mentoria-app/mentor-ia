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

// Mock resource service
const API_DELAY = 600; // Simulate network delay

// Mock file types and their properties
const mockFileTypes = {
  'application/pdf': { type: 'pdf', icon: '📄' },
  'image/jpeg': { type: 'image', icon: '🖼️' },
  'image/png': { type: 'image', icon: '🖼️' },
  'image/gif': { type: 'image', icon: '🖼️' },
  'video/mp4': { type: 'video', icon: '🎥' },
  'video/avi': { type: 'video', icon: '🎥' },
  'audio/mp3': { type: 'audio', icon: '🎵' },
  'audio/wav': { type: 'audio', icon: '🎵' },
  'text/plain': { type: 'text', icon: '📝' },
  'url': { type: 'url', icon: '🔗' }
};

// Helper function to simulate file processing
const processFile = (file) => {
  const fileType = mockFileTypes[file.type] || { type: 'file', icon: '📎' };
  return {
    id: Date.now() + Math.random(),
    title: file.name,
    type: fileType.type,
    size: formatFileSize(file.size),
    uploadDate: new Date().toISOString().split('T')[0],
    thumbnail: null,
    url: `/mock/files/${file.name.toLowerCase().replace(/\s+/g, '-')}`,
    originalName: file.name,
    mimeType: file.type
  };
};

// Helper function to format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Get resources for a specific mentor - REAL API CALL
export const getResources = async (mentorId) => {
  try {
    const response = await api.get(`/resources/mentor/${mentorId}`);
    return {
      resources: response.data,
      totalCount: response.data.length,
      mentorId: mentorId,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching resources:', error);
    
    // Enhanced error handling
    if (error.response) {
      // Server responded with an error status
      throw {
        error: 'API_ERROR',
        message: error.response.data.detail || 'Error del servidor al cargar recursos',
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
        error: 'UNKNOWN_ERROR',
        message: 'Error inesperado al obtener recursos'
      };
    }
  }
};

// Upload a new resource to a mentor - REAL API CALL
export const uploadResource = async (mentorId, file) => {
  try {
    // Validation
    if (!file) {
      throw {
        error: 'NO_FILE',
        message: 'No se ha seleccionado ningún archivo'
      };
    }

    if (!mentorId) {
      throw {
        error: 'NO_MENTOR_ID',
        message: 'ID de mentor requerido'
      };
    }

    // File size validation (max 50MB)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      throw {
        error: 'FILE_TOO_LARGE',
        message: 'El archivo es demasiado grande. Máximo 50MB.'
      };
    }

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('mentor_id', mentorId);

    // Make API call with FormData
    const response = await api.post('/resources/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return {
      resource: response.data,
      message: 'Archivo subido correctamente',
      uploadedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error uploading resource:', error);
    
    // Enhanced error handling
    if (error.response) {
      // Server responded with an error status
      throw {
        error: 'API_ERROR',
        message: error.response.data.detail || 'Error del servidor al subir archivo',
        status: error.response.status
      };
    } else if (error.request) {
      // Network error
      throw {
        error: 'NETWORK_ERROR',
        message: 'Error de conexión. Intenta nuevamente.'
      };
    } else if (error.error) {
      // Validation error from our function
      throw error;
    } else {
      // Other error
      throw {
        error: 'UNKNOWN_ERROR',
        message: 'Error inesperado al subir archivo'
      };
    }
  }
};

// Upload resource from URL
export const uploadResourceFromUrl = async (mentorId, url, title) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // URL validation
        const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        if (!urlPattern.test(url)) {
          reject({
            error: 'INVALID_URL',
            message: 'URL no válida'
          });
          return;
        }

        const newResource = {
          id: Date.now() + Math.random(),
          title: title || url,
          type: 'url',
          uploadDate: new Date().toISOString().split('T')[0],
          size: null,
          thumbnail: null,
          url: url,
          mentorId: parseInt(mentorId)
        };

        resolve({
          resource: newResource,
          message: 'Enlace agregado correctamente',
          uploadedAt: new Date().toISOString()
        });
      } catch (error) {
        reject({
          error: 'URL_UPLOAD_ERROR',
          message: 'Error al agregar el enlace'
        });
      }
    }, 500);
  });
};

// Delete a resource
export const deleteResource = async (mentorId, resourceId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve({
          success: true,
          resourceId,
          mentorId: parseInt(mentorId),
          message: 'Recurso eliminado correctamente',
          deletedAt: new Date().toISOString()
        });
      } catch (error) {
        reject({
          error: 'DELETE_ERROR',
          message: 'Error al eliminar el recurso'
        });
      }
    }, 400);
  });
};

// Get resource details
export const getResourceDetails = async (resourceId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Mock detailed resource info
      const mockResource = {
        id: resourceId,
        title: 'Documento de Ejemplo.pdf',
        type: 'pdf',
        size: '2.1 MB',
        uploadDate: '2024-01-15',
        lastAccessed: '2024-01-22',
        downloadCount: 5,
        thumbnail: null,
        url: '/mock/files/documento-ejemplo.pdf',
        metadata: {
          author: 'Juan Pérez',
          createdDate: '2024-01-15',
          modifiedDate: '2024-01-20',
          pages: 15
        }
      };

      resolve(mockResource);
    }, 300);
  });
};

// Search resources across all mentors
export const searchResources = async (query, filters = {}) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Mock search results
      const mockResults = [
        {
          id: 1,
          title: 'Derivadas e Integrales.pdf',
          type: 'pdf',
          mentorName: 'Matemáticas',
          mentorId: 1,
          uploadDate: '2024-01-15',
          relevanceScore: 0.95
        },
        {
          id: 4,
          title: 'Estructura Celular',
          type: 'image',
          mentorName: 'Biología',
          mentorId: 3,
          uploadDate: '2024-01-08',
          relevanceScore: 0.87
        }
      ];

      // Filter by query if provided
      const filteredResults = query 
        ? mockResults.filter(r => 
            r.title.toLowerCase().includes(query.toLowerCase())
          )
        : mockResults;

      resolve({
        results: filteredResults,
        totalCount: filteredResults.length,
        query,
        searchTime: Math.random() * 100 + 50 // Mock search time in ms
      });
    }, 400);
  });
}; 