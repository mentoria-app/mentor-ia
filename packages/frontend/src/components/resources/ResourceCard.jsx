import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Card } from '../common';

// Constants moved outside component to prevent recreation
const SWIPE_THRESHOLD = 60;
const MAX_SWIPE_DISTANCE = 140;
const ACTION_BUTTON_WIDTH = 16; // w-16 in rem

const TYPE_ICONS = {
  pdf: '📄',
  image: '🖼️',
  video: '🎥',
  audio: '🎵',
  url: '🔗',
  youtube_link: '🔗',
  text: '📝',
  default: '📎'
};

const TYPE_COLORS = {
  pdf: 'bg-red-50 text-red-600',
  image: 'bg-blue-50 text-blue-600',
  video: 'bg-purple-50 text-purple-600',
  audio: 'bg-green-50 text-green-600',
  url: 'bg-orange-50 text-orange-600',
  youtube_link: 'bg-orange-50 text-orange-600',
  text: 'bg-gray-50 text-gray-600',
  default: 'bg-gray-50 text-gray-600'
};

const STATUS_CONFIGS = {
  analyzed: {
    color: 'text-green-700',
    bg: 'bg-green-100',
    icon: (
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    ),
    label: 'Listo'
  },
  pending: {
    color: 'text-amber-700',
    bg: 'bg-amber-100',
    icon: <div className="w-3 h-3 bg-amber-500 rounded-full"></div>,
    label: 'Pendiente'
  },
  processing: {
    color: 'text-blue-700',
    bg: 'bg-blue-100',
    icon: <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>,
    label: 'Procesando'
  },
  error: {
    color: 'text-red-700',
    bg: 'bg-red-100',
    icon: (
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    label: 'Error'
  },
  default: {
    color: 'text-gray-600',
    bg: 'bg-gray-100',
    icon: <div className="w-3 h-3 bg-gray-400 rounded-full"></div>,
    label: 'Desconocido'
  }
};

const ResourceCard = ({ resource, onClick, onRename, onDelete, className = '', ...props }) => {
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

  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isActionsVisible, setIsActionsVisible] = useState(false);
  const cardRef = useRef(null);
  const startX = useRef(0);
  const currentX = useRef(0);

  // Memoize expensive computations
  const displayTitle = useMemo(() => title || name || 'Recurso sin título', [title, name]);
  const displayDate = useMemo(() => 
    uploadDate || (created_at ? new Date(created_at).toISOString().split('T')[0] : null),
    [uploadDate, created_at]
  );

  const typeIcon = useMemo(() => TYPE_ICONS[type] || TYPE_ICONS.default, [type]);
  const typeColor = useMemo(() => TYPE_COLORS[type] || TYPE_COLORS.default, [type]);
  const statusConfig = useMemo(() => {
    const normalizedStatus = status?.toLowerCase();
    return STATUS_CONFIGS[normalizedStatus] || STATUS_CONFIGS.default;
  }, [status]);

  // Memoize date formatting to prevent recalculation
  const formattedDate = useMemo(() => {
    if (!displayDate) return '';
    
    // If it's already a relative format (like 'hace 2 días'), return as is
    if (displayDate.includes('hace')) {
      return `Subido ${displayDate}`;
    }
    
    // Otherwise, format the date
    const date = new Date(displayDate);
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
  }, [displayDate]);

  // Optimize event handlers with useCallback
  const closeSwipe = useCallback(() => {
    setSwipeOffset(0);
    setIsActionsVisible(false);
  }, []);

  const handleClickOutside = useCallback((event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      closeSwipe();
    }
  }, [closeSwipe]);

  // Close swipe when clicking outside
  useEffect(() => {
    if (isActionsVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isActionsVisible, handleClickOutside]);

  // Touch Events
  const handleTouchStart = useCallback((e) => {
    startX.current = e.touches[0].clientX;
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    
    currentX.current = e.touches[0].clientX;
    const diffX = startX.current - currentX.current;
    
    // Only allow left swipe (positive diffX)
    if (diffX > 0) {
      setSwipeOffset(Math.min(diffX, MAX_SWIPE_DISTANCE));
    } else if (isActionsVisible && diffX < 0) {
      // Allow right swipe to close if actions are visible
      setSwipeOffset(Math.max(MAX_SWIPE_DISTANCE + diffX, 0));
    }
  }, [isDragging, isActionsVisible]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    
    // Threshold for showing actions
    if (swipeOffset > SWIPE_THRESHOLD) {
      setSwipeOffset(MAX_SWIPE_DISTANCE);
      setIsActionsVisible(true);
    } else {
      closeSwipe();
    }
  }, [swipeOffset, closeSwipe]);

  // Mouse Events (for desktop testing)
  const handleMouseDown = useCallback((e) => {
    startX.current = e.clientX;
    setIsDragging(true);
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    currentX.current = e.clientX;
    const diffX = startX.current - currentX.current;
    
    if (diffX > 0) {
      setSwipeOffset(Math.min(diffX, MAX_SWIPE_DISTANCE));
    } else if (isActionsVisible && diffX < 0) {
      setSwipeOffset(Math.max(MAX_SWIPE_DISTANCE + diffX, 0));
    }
  }, [isDragging, isActionsVisible]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    
    if (swipeOffset > SWIPE_THRESHOLD) {
      setSwipeOffset(MAX_SWIPE_DISTANCE);
      setIsActionsVisible(true);
    } else {
      closeSwipe();
    }
  }, [swipeOffset, closeSwipe]);

  // Mouse events cleanup
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleCardClick = useCallback((e) => {
    if (isActionsVisible) {
      closeSwipe();
      return;
    }
    if (swipeOffset === 0 && onClick) {
      onClick(resource);
    }
  }, [isActionsVisible, swipeOffset, onClick, resource, closeSwipe]);

  const handleRename = useCallback((e) => {
    e.stopPropagation();
    closeSwipe();
    onRename && onRename(resource);
  }, [onRename, resource, closeSwipe]);

  const handleDelete = useCallback((e) => {
    e.stopPropagation();
    closeSwipe();
    onDelete && onDelete(resource);
  }, [onDelete, resource, closeSwipe]);

  const handleHintClick = useCallback((e) => {
    e.stopPropagation();
    setSwipeOffset(MAX_SWIPE_DISTANCE);
    setIsActionsVisible(true);
  }, []);

  return (
    <div 
      ref={cardRef}
      className="relative overflow-hidden"
      {...props}
    >
      {/* Integrated Action Buttons */}
      <div 
        className="absolute inset-y-0 right-0 flex items-stretch bg-white border border-gray-200 rounded-lg overflow-hidden"
        style={{
          transform: `translateX(${MAX_SWIPE_DISTANCE - swipeOffset}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          boxShadow: swipeOffset > 0 ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
          marginTop: '4px',
          marginBottom: '4px',
          marginRight: '4px'
        }}
      >
        {/* Edit Button */}
        <button
          onClick={handleRename}
          className="w-16 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white flex items-center justify-center transition-colors duration-200 touch-manipulation border-r border-blue-400"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="w-16 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white flex items-center justify-center transition-colors duration-200 touch-manipulation"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* Main Card */}
      <Card 
        className={`cursor-pointer transition-shadow select-none ${className}`}
        onClick={handleCardClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        style={{
          transform: `translateX(${-swipeOffset}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          boxShadow: swipeOffset > 0 ? '0 4px 12px rgba(0,0,0,0.15)' : undefined
        }}
      >
        <div className="flex items-center space-x-4 p-4">
          {/* Resource Icon/Thumbnail */}
          <div className="flex-shrink-0">
            {thumbnail ? (
              <img 
                src={thumbnail} 
                alt={displayTitle}
                className="w-14 h-14 rounded-lg object-cover"
                loading="lazy"
              />
            ) : (
              <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${typeColor}`}>
                <span className="text-xl">{typeIcon}</span>
              </div>
            )}
          </div>

          {/* Resource Info */}
          <div className="flex-1 min-w-0 mr-3">
            <h4 className="font-semibold text-gray-900 truncate mb-1">
              {displayTitle}
            </h4>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-1">
              <span className="uppercase font-medium tracking-wide">
                {type || 'archivo'}
              </span>
              {size && (
                <>
                  <span className="text-gray-300">•</span>
                  <span>{size}</span>
                </>
              )}
              <span className="text-gray-300">•</span>
              <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.color}`}>
                {statusConfig.icon}
                <span>{statusConfig.label}</span>
              </div>
            </div>
            
            {formattedDate && (
              <p className="text-xs text-gray-400">
                {formattedDate}
              </p>
            )}
          </div>

          {/* Modern Swipe Hint - Only show when actions not visible */}
          {!isActionsVisible && (
            <button 
              onClick={handleHintClick}
              className="flex items-center justify-center w-8 p-2 hover:bg-gray-50 rounded-lg transition-colors touch-manipulation"
            >
              <div className="flex space-x-1">
                <div className="w-1 h-4 bg-gray-400 rounded-full opacity-50"></div>
                <div className="w-1 h-4 bg-gray-400 rounded-full opacity-30"></div>
              </div>
            </button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default React.memo(ResourceCard); 