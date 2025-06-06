import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout';
import { Onboarding, MentorHub, MentorDashboard, Profile } from './pages';

function App() {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <Router>
      <Routes>
        {/* Onboarding - No layout wrapper */}
        <Route path="/onboarding" element={<Onboarding />} />
        
        {/* Main app routes - Wrapped in AppLayout */}
        <Route path="/" element={
          <AppLayout 
            headerTitle="MentorIA" 
            activeTab={activeTab} 
            onTabChange={setActiveTab}
          >
            <Navigate to="/mentors" replace />
          </AppLayout>
        } />
        
        <Route path="/mentors" element={
          <AppLayout 
            headerTitle="Tus Mentores" 
            activeTab={activeTab} 
            onTabChange={setActiveTab}
            showBottomNav={false}
          >
            <MentorHub />
          </AppLayout>
        } />
        
        <Route path="/mentor/:mentorId" element={
          <AppLayout 
            headerTitle="Matemáticas" 
            headerSubtitle="Tu mentor de estudio"
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