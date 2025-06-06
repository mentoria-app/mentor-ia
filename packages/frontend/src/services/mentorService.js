// Mock mentor service
const API_DELAY = 800; // Simulate network delay

// Mock mentors data (matches Redux initial state)
let mockMentors = [
  {
    id: 1,
    name: 'Matemáticas',
    subject: 'Álgebra y Cálculo',
    avatarUrl: null,
    color: 'bg-primary',
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
    subject: 'Historia Universal',
    avatarUrl: null,
    color: 'bg-secondary',
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
    subject: 'Biología Celular',
    avatarUrl: null,
    color: 'bg-purple-500',
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

// Get all mentors
export const getMentors = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Simulate potential network error (5% chance)
        if (Math.random() < 0.05) {
          reject({
            error: 'NETWORK_ERROR',
            message: 'Error de conexión. Intenta nuevamente.'
          });
          return;
        }

        resolve({
          mentors: mockMentors,
          totalCount: mockMentors.length,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        reject({
          error: 'UNKNOWN_ERROR',
          message: 'Error inesperado al obtener mentores'
        });
      }
    }, API_DELAY);
  });
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

// Create a new mentor
export const createMentor = async (mentorData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Validation
        if (!mentorData.name || !mentorData.subject) {
          reject({
            error: 'VALIDATION_ERROR',
            message: 'Nombre y materia son requeridos'
          });
          return;
        }

        // Check if mentor with same name already exists
        const existingMentor = mockMentors.find(
          m => m.name.toLowerCase() === mentorData.name.toLowerCase()
        );

        if (existingMentor) {
          reject({
            error: 'MENTOR_EXISTS',
            message: 'Ya existe un mentor con ese nombre'
          });
          return;
        }

        // Create new mentor
        const newMentor = {
          id: Date.now(), // Simple ID generation for mock
          name: mentorData.name.trim(),
          subject: mentorData.subject.trim(),
          avatarUrl: mentorData.avatarUrl || null,
          color: mentorData.color || 'bg-primary',
          description: mentorData.description || `Tu mentor especializado en ${mentorData.subject.toLowerCase()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          resources: []
        };

        // Add to mock data
        mockMentors.push(newMentor);

        resolve(newMentor);
      } catch (error) {
        reject({
          error: 'CREATION_ERROR',
          message: 'Error al crear el mentor'
        });
      }
    }, API_DELAY);
  });
};

// Update an existing mentor
export const updateMentor = async (mentorId, updates) => {
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

      // Update mentor
      mockMentors[mentorIndex] = {
        ...mockMentors[mentorIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      resolve(mockMentors[mentorIndex]);
    }, API_DELAY);
  });
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