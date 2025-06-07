import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMentors, createMentor as createMentorAPI } from '../services/mentorService';
import { getResources, uploadResource as uploadResourceAPI } from '../services/resourceService';

// Helper function for consistent ID comparison
const compareIds = (id1, id2) => {
  if (id1 == null || id2 == null) return false;
  return id1.toString() === id2.toString();
};

// Async Thunk for fetching mentors from the API
export const fetchMentors = createAsyncThunk(
  'mentors/fetchMentors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getMentors();
      return response.mentors;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async Thunk for creating a new mentor
export const createMentor = createAsyncThunk(
  'mentors/createMentor',
  async (mentorData, { rejectWithValue }) => {
    try {
      const newMentor = await createMentorAPI(mentorData);
      return newMentor;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async Thunk for fetching resources for a specific mentor
export const fetchResourcesForMentor = createAsyncThunk(
  'mentors/fetchResourcesForMentor',
  async (mentorId, { rejectWithValue }) => {
    try {
      const response = await getResources(mentorId);
      return {
        mentorId,
        resources: response.resources
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async Thunk for uploading a resource to a mentor
export const uploadResource = createAsyncThunk(
  'mentors/uploadResource',
  async ({ mentorId, file }, { rejectWithValue }) => {
    try {
      const response = await uploadResourceAPI(mentorId, file);
      return {
        mentorId,
        resource: response.resource
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

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
  mentors: [], // Start with empty array, will be populated by fetchMentors
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
      const mentorIndex = state.mentors.findIndex(mentor => compareIds(mentor.id, id));
      if (mentorIndex !== -1) {
        state.mentors[mentorIndex] = { ...state.mentors[mentorIndex], ...updates };
      }
    },
    deleteMentor: (state, action) => {
      const mentorId = action.payload;
      state.mentors = state.mentors.filter(mentor => !compareIds(mentor.id, mentorId));
      // If the deleted mentor was active, clear the active mentor
      if (state.activeMentorId && compareIds(state.activeMentorId, mentorId)) {
        state.activeMentorId = null;
      }
    },
    setActiveMentor: (state, action) => {
      state.activeMentorId = action.payload;
    },
    addResourceToMentor: (state, action) => {
      const { mentorId, resource } = action.payload;
      const mentor = state.mentors.find(m => compareIds(m.id, mentorId));
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
      const mentor = state.mentors.find(m => compareIds(m.id, mentorId));
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
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchMentors async thunk
      .addCase(fetchMentors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMentors.fulfilled, (state, action) => {
        state.loading = false;
        state.mentors = action.payload;
        state.error = null;
      })
      .addCase(fetchMentors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || {
          error: 'FETCH_ERROR',
          message: 'Error al cargar los mentores'
        };
      })
      // Handle createMentor async thunk
      .addCase(createMentor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMentor.fulfilled, (state, action) => {
        state.loading = false;
        state.mentors.push(action.payload);
        state.error = null;
      })
      .addCase(createMentor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || {
          error: 'CREATE_ERROR',
          message: 'Error al crear el mentor'
        };
      })
      // Handle fetchResourcesForMentor async thunk
      .addCase(fetchResourcesForMentor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResourcesForMentor.fulfilled, (state, action) => {
        state.loading = false;
        const { mentorId, resources } = action.payload;
        const mentorIndex = state.mentors.findIndex(mentor => compareIds(mentor.id, mentorId));
        if (mentorIndex !== -1) {
          state.mentors[mentorIndex].resources = resources;
        }
        state.error = null;
      })
      .addCase(fetchResourcesForMentor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || {
          error: 'FETCH_RESOURCES_ERROR',
          message: 'Error al cargar los recursos del mentor'
        };
      })
      // Handle uploadResource async thunk
      .addCase(uploadResource.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadResource.fulfilled, (state, action) => {
        state.loading = false;
        const { mentorId, resource } = action.payload;
        const mentorIndex = state.mentors.findIndex(mentor => compareIds(mentor.id, mentorId));
        if (mentorIndex !== -1) {
          state.mentors[mentorIndex].resources.push(resource);
        }
        state.error = null;
      })
      .addCase(uploadResource.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || {
          error: 'UPLOAD_RESOURCE_ERROR',
          message: 'Error al subir el recurso'
        };
      });
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
  return state.mentors.mentors.find(mentor => compareIds(mentor.id, activeMentorId)) || null;
};
export const selectMentorById = (state, mentorId) => {
  return state.mentors.mentors.find(mentor => compareIds(mentor.id, mentorId));
};
export const selectMentorsLoading = (state) => state.mentors.loading;
export const selectMentorsError = (state) => state.mentors.error;

export default mentorsSlice.reducer; 