/**
 * Avatar configuration constants
 * Centralized avatar options for consistent usage across the application
 */

export const AVATAR_OPTIONS = [
  { id: 'default', image: '/assets/avatars/default.webp', label: 'Default' },
  { id: 'trainer', image: '/assets/avatars/trainer.webp', label: 'Trainer' },
  { id: 'spiritual', image: '/assets/avatars/spiritual.webp', label: 'Spiritual' },
  { id: 'artist', image: '/assets/avatars/artist.webp', label: 'Artist' },
  { id: 'doctor', image: '/assets/avatars/doctor.webp', label: 'Doctor' },
  { id: 'scientist', image: '/assets/avatars/scientist.webp', label: 'Scientist' },
  { id: 'lawyer', image: '/assets/avatars/lawyer.webp', label: 'Lawyer' }, 
  { id: 'programmer', image: '/assets/avatars/programmer.webp', label: 'Programmer' }
];

export const DEFAULT_AVATAR = '/assets/avatars/default.webp';

/**
 * Get avatar URL by ID
 * @param {string} avatarId - The avatar ID
 * @returns {string} The avatar URL
 */
export const getAvatarUrl = (avatarId) => {
  const avatar = AVATAR_OPTIONS.find(option => option.id === avatarId);
  return avatar ? avatar.image : DEFAULT_AVATAR;
}; 