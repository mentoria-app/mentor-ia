/**
 * Avatar configuration constants
 * Centralized avatar options for consistent usage across the application
 */

export const AVATAR_OPTIONS = [
  { id: 'default', image: '/assets/avatars/default.png', label: 'Default' },
  { id: 'trainer', image: '/assets/avatars/trainer.png', label: 'Trainer' },
  { id: 'spiritual', image: '/assets/avatars/spiritual.png', label: 'Spiritual' },
  { id: 'artist', image: '/assets/avatars/artist.png', label: 'Artist' },
  { id: 'doctor', image: '/assets/avatars/doctor.png', label: 'Doctor' },
  { id: 'scientist', image: '/assets/avatars/scientist.png', label: 'Scientist' },
  { id: 'lawyer', image: '/assets/avatars/lawer.png', label: 'Lawyer' }, // Note: file is still 'lawer.png'
  { id: 'programmer', image: '/assets/avatars/programmer.png', label: 'Programmer' }
];

export const DEFAULT_AVATAR = '/assets/avatars/default.png';

/**
 * Get avatar URL by ID
 * @param {string} avatarId - The avatar ID
 * @returns {string} The avatar URL
 */
export const getAvatarUrl = (avatarId) => {
  const avatar = AVATAR_OPTIONS.find(option => option.id === avatarId);
  return avatar ? avatar.image : DEFAULT_AVATAR;
}; 