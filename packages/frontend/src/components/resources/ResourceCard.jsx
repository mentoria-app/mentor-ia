import React from 'react';
import { Card } from '../common';

const ResourceCard = ({ resource, onClick, className = '', ...props }) => {
  const {
    id,
    title,
    name,
    type,
    uploadDate,
    created_at,
    size,
    thumbnail,
    status = 'analyzed'
  } = resource || {};

  const displayTitle = title || name || 'Recurso sin título';
  const displayDate = uploadDate || (created_at ? new Date(created_at).toISOString().split('T')[0] : null);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'image': return '🖼️';
      case 'video': return '🎥';
      case 'audio': return '🎵';
      case 'url':
      case 'youtube_link': return '🔗';
      case 'text': return '📝';
      default: return '📎';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'pdf': return 'bg-red-100 text-red-600';
      case 'image': return 'bg-blue-100 text-blue-600';
      case 'video': return 'bg-purple-100 text-purple-600';
      case 'audio': return 'bg-green-100 text-green-600';
      case 'url':
      case 'youtube_link': return 'bg-yellow-100 text-yellow-600';
      case 'text': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusColor = (status) => {
    const normalizedStatus = status?.toLowerCase();
    switch (normalizedStatus) {
      case 'analyzed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'error': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status) => {
    const normalizedStatus = status?.toLowerCase();
    switch (normalizedStatus) {
      case 'analyzed': return 'Analizado';
      case 'pending': return 'Pendiente';
      case 'processing': return 'Procesando';
      case 'error': return 'Error';
      default: return status || 'Desconocido';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    // If it's already a relative format (like 'hace 2 días'), return as is
    if (dateString.includes('hace')) {
      return `Subido ${dateString}`;
    }
    
    // Otherwise, format the date
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return 'Subido hoy';
    } else if (diffInDays === 1) {
      return 'Subido ayer';
    } else if (diffInDays < 7) {
      return `Subido hace ${diffInDays} días`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `Subido hace ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`;
    } else {
      return `Subido el ${date.toLocaleDateString('es-ES')}`;
    }
  };

  return (
    <Card 
      className={`p-4 hover:shadow-md transition-shadow cursor-pointer ${className}`}
      onClick={() => onClick && onClick(resource)}
      {...props}
    >
      <div className="flex items-center space-x-3">
        {/* Resource Icon/Thumbnail */}
        <div className="flex-shrink-0">
          {thumbnail ? (
            <img 
              src={thumbnail} 
              alt={displayTitle}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(type)}`}>
              <span className="heading-xs">{getTypeIcon(type)}</span>
            </div>
          )}
        </div>

        {/* Resource Info */}
        <div className="flex-1 min-w-0">
          <h4 className="label text-gray-900 truncate">
            {displayTitle}
          </h4>
          <div className="flex items-center space-x-2 mt-1">
            <span className="caption text-gray-500 uppercase">
              {type || 'archivo'}
            </span>
            {size && (
              <>
                <span className="text-gray-300">•</span>
                <span className="caption text-gray-500">{size}</span>
              </>
            )}
            <span className="text-gray-300">•</span>
            <span className={`caption px-2 py-1 rounded-full font-medium ${getStatusColor(status)}`}>
              {getStatusLabel(status)}
            </span>
          </div>
          {displayDate && (
            <p className="caption text-gray-400 mt-1">
              {formatDate(displayDate)}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ResourceCard; 