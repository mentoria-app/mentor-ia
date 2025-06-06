// Export all API services
export * as authService from './authService';
export * as mentorService from './mentorService';
export * as resourceService from './resourceService';

// Re-export specific functions for convenience
export { login, logout, refreshToken, updateProfile } from './authService';
export { getMentors, createMentor, getMentorById, updateMentor, deleteMentor } from './mentorService';
export { getResources, uploadResource, uploadResourceFromUrl, deleteResource } from './resourceService'; 