import { createSlice } from '@reduxjs/toolkit';

// Mock initial mentors data
const initialMentors = [
  {
    id: 1,
    name: 'Matemáticas',
    expertise: 'Álgebra y Cálculo',
    avatar_url: null,
    color: 'bg-primary',
    description: 'Tu mentor especializado en matemáticas avanzadas',
    resources: [
      {
        id: 1,
        title: 'Derivadas e Integrales.pdf',
        type: 'pdf',
        uploadDate: '2024-01-15',
        size: '2.1 MB',
        thumbnail: null,
        status: 'Analyzed'
      },
      {
        id: 2,
        title: 'Ejercicios de Límites',
        type: 'image',
        uploadDate: '2024-01-10',
        size: '850 KB',
        thumbnail: null,
        status: 'Analyzed'
      }
    ]
  },
  {
    id: 2,
    name: 'Historia',
    expertise: 'Historia Universal',
    avatar_url: null,
    color: 'bg-secondary',
    description: 'Tu mentor especializado en historia mundial',
    resources: [
      {
        id: 3,
        title: 'Primera Guerra Mundial.pdf',
        type: 'pdf',
        uploadDate: '2024-01-12',
        size: '3.2 MB',
        thumbnail: null,
        status: 'Analyzed'
      }
    ]
  },
  {
    id: 3,
    name: 'Biología',
    expertise: 'Biología Celular',
    avatar_url: null,
    color: 'bg-purple-500',
    description: 'Tu mentor especializado en biología y ciencias de la vida',
    resources: [
      {
        id: 4,
        title: 'Estructura Celular',
        type: 'image',
        uploadDate: '2024-01-08',
        size: '1.2 MB',
        thumbnail: null,
        status: 'Analyzed'
      },
      {
        id: 5,
        title: 'Mitosis y Meiosis - YouTube',
        type: 'url',
        uploadDate: '2024-01-14',
        size: null,
        thumbnail: null,
        status: 'Pending'
      }
    ]
  }
];

const initialState = {
  mentors: initialMentors,
  activeMentorId: null,
  loading: false,
  error: null
};

const mentorsSlice = createSlice({
  name: 'mentors',
  initialState,
  reducers: {
    setMentors: (state, action) => {
      state.mentors = action.payload;
      state.loading = false;
      state.error = null;
    },
    addMentor: (state, action) => {
      const newMentor = {
        ...action.payload,
        id: Date.now(), // Simple ID generation for mock data
        resources: []
      };
      state.mentors.push(newMentor);
    },
    updateMentor: (state, action) => {
      const { id, updates } = action.payload;
      const mentorIndex = state.mentors.findIndex(mentor => mentor.id === id);
      if (mentorIndex !== -1) {
        state.mentors[mentorIndex] = { ...state.mentors[mentorIndex], ...updates };
      }
    },
    deleteMentor: (state, action) => {
      const mentorId = action.payload;
      state.mentors = state.mentors.filter(mentor => mentor.id !== mentorId);
      // If the deleted mentor was active, clear the active mentor
      if (state.activeMentorId === mentorId) {
        state.activeMentorId = null;
      }
    },
    setActiveMentor: (state, action) => {
      state.activeMentorId = action.payload;
    },
    addResourceToMentor: (state, action) => {
      const { mentorId, resource } = action.payload;
      const mentor = state.mentors.find(m => m.id === mentorId);
      if (mentor) {
        const newResource = {
          ...resource,
          id: Date.now() + Math.random(), // Simple ID generation
          uploadDate: new Date().toISOString().split('T')[0]
        };
        mentor.resources.push(newResource);
      }
    },
    removeResourceFromMentor: (state, action) => {
      const { mentorId, resourceId } = action.payload;
      const mentor = state.mentors.find(m => m.id === mentorId);
      if (mentor) {
        mentor.resources = mentor.resources.filter(r => r.id !== resourceId);
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

// Action creators
export const {
  setMentors,
  addMentor,
  updateMentor,
  deleteMentor,
  setActiveMentor,
  addResourceToMentor,
  removeResourceFromMentor,
  setLoading,
  setError
} = mentorsSlice.actions;

// Selectors
export const selectAllMentors = (state) => state.mentors.mentors;
export const selectActiveMentorId = (state) => state.mentors.activeMentorId;
export const selectActiveMentor = (state) => {
  const activeMentorId = state.mentors.activeMentorId;
  return state.mentors.mentors.find(mentor => mentor.id === activeMentorId) || null;
};
export const selectMentorById = (state, mentorId) => {
  return state.mentors.mentors.find(mentor => mentor.id === parseInt(mentorId));
};
export const selectMentorsLoading = (state) => state.mentors.loading;
export const selectMentorsError = (state) => state.mentors.error;

export default mentorsSlice.reducer; 