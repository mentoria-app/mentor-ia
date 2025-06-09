import React from 'react';
import { BookOpen, FlaskIcon, PaletteIcon, CompassIcon, BeakerIcon, GlobeIcon } from '../common/Icons';
import { cn } from '../../utils/cn';

// Constants for better maintainability
const AVATAR_OPTIONS = [
  {
    id: '1',
    name: 'Académico',
    bgColor: 'bg-gradient-to-br from-blue-400 to-blue-600',
    iconColor: 'text-white',
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    id: '2',
    name: 'Científico',
    bgColor: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
    iconColor: 'text-white',
    icon: <FlaskIcon className="w-6 h-6" />,
  },
  {
    id: '3',
    name: 'Artista',
    bgColor: 'bg-gradient-to-br from-purple-400 to-purple-600',
    iconColor: 'text-white',
    icon: <PaletteIcon className="w-6 h-6" />,
  },
  {
    id: '4',
    name: 'Explorador',
    bgColor: 'bg-gradient-to-br from-amber-400 to-amber-600',
    iconColor: 'text-white',
    icon: <CompassIcon className="w-6 h-6" />,
  },
  {
    id: '5',
    name: 'Investigador',
    bgColor: 'bg-gradient-to-br from-rose-400 to-rose-600',
    iconColor: 'text-white',
    icon: <BeakerIcon className="w-6 h-6" />,
  },
  {
    id: '6',
    name: 'Global',
    bgColor: 'bg-gradient-to-br from-indigo-400 to-indigo-600',
    iconColor: 'text-white',
    icon: <GlobeIcon className="w-6 h-6" />,
  },
];

const AvatarSelector = ({ selectedAvatar, onSelectAvatar }) => {
  const handleSelectAvatar = (avatar) => {
    if (typeof onSelectAvatar === 'function') {
      onSelectAvatar(avatar);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Elige un Avatar
      </label>
      <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Selección de avatar">
        {AVATAR_OPTIONS.map((avatar) => (
          <button
            key={avatar.id}
            type="button"
            onClick={() => handleSelectAvatar(avatar)}
            aria-pressed={selectedAvatar?.id === avatar.id}
            aria-label={`Avatar ${avatar.name}`}
            className={cn(
              'p-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
              selectedAvatar?.id === avatar.id
                ? 'border-primary bg-primary-50 shadow-sm'
                : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
            )}
          >
            <div
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-1 shadow-md transition-transform duration-300',
                avatar.bgColor,
                selectedAvatar?.id === avatar.id ? 'scale-110' : ''
              )}
            >
              <span className={avatar.iconColor}>{avatar.icon}</span>
            </div>
            <p className="text-xs text-gray-700 font-medium truncate">
              {avatar.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AvatarSelector; 