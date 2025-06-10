import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MentorCard, CreateMentorCard, MentorCreationModal } from '../components/mentors';
import { FloatingActionButton } from '../components/common';
import { 
  selectAllMentors, 
  selectMentorsLoading, 
  selectMentorsError,
  fetchMentors,
  openMentorCreationModal, 
  selectIsMentorCreationModalOpen 
} from '../state';
import { selectIsAuthenticated } from '../state';

const MentorHub = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Local search state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get mentors and auth state from Redux store
  const mentors = useSelector(selectAllMentors);
  const loading = useSelector(selectMentorsLoading);
  const error = useSelector(selectMentorsError);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isMentorCreationModalOpen = useSelector(selectIsMentorCreationModalOpen);

  // Filter mentors based on search query
  const filteredMentors = useMemo(() => {
    if (!searchQuery.trim()) return mentors;
    
    const query = searchQuery.toLowerCase().trim();
    return mentors.filter(mentor => 
      mentor.name?.toLowerCase().includes(query) ||
      mentor.expertise?.toLowerCase().includes(query)
    );
  }, [mentors, searchQuery]);

  // Fetch mentors on component mount if user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchMentors());
    }
  }, [dispatch, isAuthenticated]);

  const handleMentorClick = (mentor) => {
    navigate(`/mentor/${mentor.id}`);
  };

  const handleCreateMentor = () => {
    dispatch(openMentorCreationModal());
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  // Handle loading state with modern skeleton
  if (loading) {
    return (
      <div className="min-h-full bg-background">
        <div className="px-4 pt-6">
          {/* Loading skeleton */}
          <div className="grid grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-soft animate-pulse">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-14 h-14 bg-gray-200 rounded-xl" />
                  <div className="w-6 h-6 bg-gray-200 rounded-lg" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
                <div className="flex items-center justify-between mt-4 pt-3">
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-full bg-background">
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 max-w-md text-center">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-red-900 mb-2">
              Error al cargar mentores
            </h2>
            <p className="text-red-700 text-sm mb-6">
              {error.message || 'Hubo un problema al cargar tus mentores. Intenta nuevamente.'}
            </p>
            <button 
              onClick={() => dispatch(fetchMentors())}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-xl font-medium
                transition-colors duration-200 shadow-medium hover:shadow-strong"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-background">
      {/* Main Content */}
      <main className="px-4 pt-6 pb-24">
        {/* Empty State */}
        {mentors.length === 0 ? (
          <div className="text-center py-16 px-6">
            <div className="max-w-sm mx-auto">
              {/* Animated illustration */}
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl 
                  flex items-center justify-center mx-auto animate-bounce-subtle">
                  <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-400 rounded-full animate-pulse" />
                <div className="absolute -bottom-1 -left-3 w-4 h-4 bg-secondary-400 rounded-full animate-pulse delay-300" />
              </div>

              <h2 className="text-2xl font-bold text-text-primary mb-3">
                ¡Crea tu primer Mentor!
              </h2>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Los mentores IA te ayudan a organizar y estudiar cualquier materia. 
                Cada uno tiene su propia biblioteca de conocimiento.
              </p>

              {/* Getting started cards */}
              <div className="grid grid-cols-1 gap-3 text-left">
                <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-primary-900 text-sm">Crea un Mentor</p>
                    <p className="text-primary-700 text-xs">Dale un nombre y personalidad</p>
                  </div>
                </div>

                <div className="bg-secondary-50 border border-secondary-200 rounded-xl p-4 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900 text-sm">Sube contenido</p>
                    <p className="text-secondary-700 text-xs">PDFs, fotos, enlaces de YouTube</p>
                  </div>
                </div>

                <div className="bg-accent-50 border border-accent-200 rounded-xl p-4 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-accent-900 text-sm">¡Comienza a estudiar!</p>
                    <p className="text-accent-700 text-xs">Chat, quizzes y tarjetas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Mentors Grid */
          <div className="space-y-6">
            {/* Integrated Header with Search - Production Ready */}
            <div className="group relative bg-white border border-gray-200/80 rounded-2xl shadow-soft 
              hover:shadow-medium focus-within:border-primary-300 focus-within:shadow-glow 
              transition-all duration-300 ease-out overflow-hidden">
              
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 via-transparent to-transparent 
                pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Header Section */}
              <div className="relative px-6 pt-6 pb-4">
                <div className="flex items-start justify-between">
                                     <div className="flex-1 min-w-0">
                     <div className="mb-2">
                       <h2 className="text-xl font-bold text-text-primary tracking-tight">
                         Tus Mentores
                       </h2>
                     </div>
                    
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {searchQuery ? (
                          <span className="flex items-center space-x-1">
                            <span className="font-medium text-primary-600">
                              {filteredMentors.length}
                            </span>
                            <span>de {mentors.length} mentores</span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-gray-100 
                              text-xs font-medium text-gray-600 max-w-[120px] truncate">
                              "{searchQuery}"
                            </span>
                          </span>
                        ) : (
                          `${mentors.length} ${mentors.length === 1 ? 'mentor disponible' : 'mentores disponibles'}`
                        )}
                      </p>
                    </div>
                  </div>
                  
                  {/* Enhanced Search Status Indicator */}
                  {searchQuery && (
                    <div className="flex items-center space-x-2 px-3 py-2 bg-primary-50/80 
                      border border-primary-200/60 rounded-xl">
                      <div className="relative">
                        <div className="w-2 h-2 bg-primary-500 rounded-full" />
                        <div className="absolute inset-0 w-2 h-2 bg-primary-400 rounded-full animate-ping" />
                      </div>
                      <span className="text-xs font-semibold text-primary-700 tracking-wide">
                        Filtrado activo
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Enhanced Divider with gradient */}
              <div className="relative mx-6">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent h-px" />
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
              </div>

                             {/* Enhanced Search Section with Improved Prominence */}
               <div className="relative p-6">
                 <div className="relative bg-gray-50/60 border-2 border-gray-200/90 rounded-xl 
                   shadow-sm hover:shadow-soft hover:border-gray-300/90
                   focus-within:bg-white focus-within:border-primary-400 focus-within:shadow-medium 
                   focus-within:ring-4 focus-within:ring-primary-50
                   transition-all duration-300 ease-out group">
                   
                   <div className="flex items-center space-x-4 p-4">
                     {/* Enhanced Search Icon with Animation */}
                     <div className="flex-shrink-0 transition-all duration-300 text-gray-400 
                       group-focus-within:text-primary-500 group-focus-within:scale-110">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                           d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                       </svg>
                     </div>
                     
                     {/* Enhanced Search Input with Better Typography */}
                     <input
                       type="text"
                       placeholder="Buscar por nombre o especialidad..."
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                       className="flex-1 bg-transparent border-none outline-none text-text-primary 
                         placeholder-gray-400 text-sm font-medium leading-relaxed
                         focus:placeholder-gray-300 transition-all duration-300
                         selection:bg-primary-100 selection:text-primary-900"
                       autoComplete="off"
                       spellCheck="false"
                     />
                     
                     {/* Enhanced Clear Button with Better Visual States */}
                     {searchQuery && (
                       <button
                         onClick={clearSearch}
                         className="flex-shrink-0 p-2 rounded-lg text-gray-400 hover:text-gray-600 
                           hover:bg-white hover:shadow-soft border border-transparent hover:border-gray-200
                           focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300
                           transition-all duration-200 active:scale-95 group/clear"
                         aria-label="Limpiar búsqueda"
                       >
                         <svg className="w-4 h-4 transition-transform duration-200 group-hover/clear:rotate-90" 
                           fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                             d="M6 18L18 6M6 6l12 12" />
                         </svg>
                       </button>
                     )}
                   </div>
                   
                   {/* Enhanced Focus Indicator with Gradient Animation */}
                   <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r 
                     from-transparent via-primary-400 to-transparent opacity-0 
                     group-focus-within:opacity-100 transition-all duration-300 
                     group-focus-within:animate-pulse" />
                   
                   {/* Subtle Inner Glow on Focus */}
                   <div className="absolute inset-0 rounded-xl bg-gradient-to-br 
                     from-primary-50/20 via-transparent to-transparent opacity-0
                     group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                 </div>
               </div>
            </div>

            {/* 2-Column Grid or No Results */}
            {filteredMentors.length === 0 && searchQuery ? (
              /* No Search Results */
              <div className="text-center py-12 px-6">
                <div className="max-w-sm mx-auto">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">
                    No encontramos mentores
                  </h3>
                  <p className="text-text-secondary text-sm mb-6">
                    No hay mentores que coincidan con "<span className="font-medium text-primary-600">{searchQuery}</span>".
                    Intenta con otros términos de búsqueda.
                  </p>
                  <button
                    onClick={clearSearch}
                    className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2.5 rounded-xl 
                      font-medium transition-colors duration-200 shadow-medium hover:shadow-strong"
                  >
                    Limpiar búsqueda
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {filteredMentors.map((mentor, index) => (
                  <div
                    key={mentor.id}
                    className="animate-scale-in"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    <MentorCard
                      mentor={{
                        ...mentor,
                        resourceCount: mentor.resources?.length || 0
                      }}
                      onClick={handleMentorClick}
                    />
                  </div>
                ))}
                
                {/* Create Mentor Card - Only show when not searching or when showing all results */}
                {(!searchQuery || filteredMentors.length === mentors.length) && (
                  <div
                    className="animate-scale-in"
                    style={{
                      animationDelay: `${filteredMentors.length * 100}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    <CreateMentorCard onClick={handleCreateMentor} />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modern Floating Action Button */}
      <FloatingActionButton 
        onClick={handleCreateMentor}
        size="lg"
        variant="primary"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
      </FloatingActionButton>

      {/* Mentor Creation Modal */}
      <MentorCreationModal isOpen={isMentorCreationModalOpen} />
    </div>
  );
};

export default MentorHub; 