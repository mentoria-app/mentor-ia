import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../common';
import { ResourceCard, AddResourceModal, EmptyState, SkeletonCard } from '../resources';
import { 
  openResourceUploadModal,
  addNotification,
  selectMentorsLoading,
  selectMentorsError,
  removeResourceFromMentor
} from '../../state';

const ResourcesTab = ({ mentor }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectMentorsLoading);
  const error = useSelector(selectMentorsError);
  
  // Ensure resources array exists (fallback for backend compatibility)
  const resources = mentor.resources || [];

  const handleAddResource = useCallback(() => {
    dispatch(openResourceUploadModal());
  }, [dispatch]);

  const handleResourceClick = useCallback((resource) => {
    console.log('Resource clicked:', resource);
  }, []);

  const handleResourceRename = useCallback((resource) => {
    console.log('Rename resource:', resource);
    // TODO: Implement rename functionality
    dispatch(addNotification({
      type: 'info',
      title: 'Funcionalidad próximamente',
      message: 'La función de renombrar recursos estará disponible pronto.'
    }));
  }, [dispatch]);

  const handleResourceDelete = useCallback((resource) => {
    console.log('Delete resource:', resource);
    // TODO: Implement proper delete with confirmation
    dispatch(removeResourceFromMentor({
      mentorId: mentor.id,
      resourceId: resource.id
    }));
    
    dispatch(addNotification({
      type: 'success',
      title: 'Recurso eliminado',
      message: `${resource.title || resource.name} ha sido eliminado correctamente.`
    }));
  }, [dispatch, mentor.id]);

  return (
    <>
      <div className="h-full overflow-y-auto">
        {/* Show header only when there are resources or loading */}
        {(loading || resources.length > 0) && (
          <div className="px-5 py-4 border-b border-gray-100 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Recursos
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {resources.length} {resources.length === 1 ? 'recurso subido' : 'recursos subidos'}
                </p>
              </div>
              
              {/* Subtle secondary button */}
              <button
                onClick={handleAddResource}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span>Añadir</span>
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        <div className={`${(loading || resources.length > 0) ? 'p-5' : ''}`}>
          {loading ? (
            <div className="space-y-4">
              {/* Use constants for skeleton count */}
              {Array.from({ length: 4 }, (_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : resources.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-4">
              {resources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  onClick={handleResourceClick}
                  onRename={handleResourceRename}
                  onDelete={handleResourceDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Resource Modal */}
      <AddResourceModal mentorId={mentor.id} />
    </>
  );
};

export default React.memo(ResourcesTab); 