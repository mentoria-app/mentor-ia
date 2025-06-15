import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout, ProtectedRoute } from './components/layout';
import { AuthPage, Onboarding, MentorHub, MentorDashboard, Profile } from './pages';
import { selectIsAuthenticated, initializeAuth } from './state/authSlice';

function App() {
  const [activeTab, setActiveTab] = useState('resources');
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Initialize auth state on app startup
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  // Component to handle default route based on auth status
  const DefaultRoute = () => {
    return <Navigate to={isAuthenticated ? "/mentors" : "/auth"} replace />;
  };

  return (
    <Router>
      <Routes>
        {/* Authentication - No layout wrapper */}
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Onboarding - No layout wrapper */}
        <Route path="/onboarding" element={<Onboarding />} />
        
        {/* Main app routes - Wrapped in AppLayout */}
        <Route path="/" element={<DefaultRoute />} />
        
        <Route path="/mentors" element={
          <ProtectedRoute>
            <AppLayout 
              headerTitle="Mis Mentores" 
              activeTab={activeTab} 
              onTabChange={setActiveTab}
              showBottomNav={false}
            >
              <MentorHub />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/mentor/:mentorId" element={
          <ProtectedRoute>
            <AppLayout 
              activeTab={activeTab} 
              onTabChange={setActiveTab}
            >
              <MentorDashboard />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <AppLayout 
              headerTitle="Perfil" 
              activeTab={activeTab} 
              onTabChange={setActiveTab}
              showBottomNav={false}
            >
              <Profile />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        {/* Catch all - redirect to mentors */}
        <Route path="*" element={<Navigate to="/mentors" replace />} />
      </Routes>
    </Router>
  );
}

export default App; 