import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout';
import { AuthPage, Onboarding, MentorHub, MentorDashboard, Profile } from './pages';

function App() {
  const [activeTab, setActiveTab] = useState('resources');

  return (
    <Router>
      <Routes>
        {/* Authentication - No layout wrapper */}
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Onboarding - No layout wrapper */}
        <Route path="/onboarding" element={<Onboarding />} />
        
        {/* Main app routes - Wrapped in AppLayout */}
        <Route path="/" element={<Navigate to="/auth" replace />} />
        
        <Route path="/mentors" element={
          <AppLayout 
            headerTitle="Mis Mentores" 
            activeTab={activeTab} 
            onTabChange={setActiveTab}
            showBottomNav={false}
          >
            <MentorHub />
          </AppLayout>
        } />
        
        <Route path="/mentor/:mentorId" element={
          <AppLayout 
            activeTab={activeTab} 
            onTabChange={setActiveTab}
          >
            <MentorDashboard />
          </AppLayout>
        } />
        
        <Route path="/profile" element={
          <AppLayout 
            headerTitle="Perfil" 
            activeTab={activeTab} 
            onTabChange={setActiveTab}
            showBottomNav={false}
          >
            <Profile />
          </AppLayout>
        } />
        
        {/* Catch all - redirect to mentors */}
        <Route path="*" element={<Navigate to="/mentors" replace />} />
      </Routes>
    </Router>
  );
}

export default App; 