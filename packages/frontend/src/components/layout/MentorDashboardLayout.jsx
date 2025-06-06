import React from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from './AppLayout';

const MentorDashboardLayout = ({ children, activeTab, onTabChange }) => {
  const { mentorId } = useParams();

  // Placeholder mentor data - in real app this would come from API/state
  const mentorsData = {
    1: { name: 'Matemáticas', subject: 'Álgebra y Cálculo' },
    2: { name: 'Historia', subject: 'Historia Universal' },
    3: { name: 'Biología', subject: 'Biología Celular' },
    4: { name: 'Química', subject: 'Química Orgánica' },
    5: { name: 'Física', subject: 'Mecánica Clásica' },
  };

  const mentor = mentorsData[mentorId] || { name: 'Mentor', subject: 'Tu mentor de estudio' };

  return (
    <AppLayout
      headerTitle={mentor.name}
      headerSubtitle={mentor.subject}
      activeTab={activeTab}
      onTabChange={onTabChange}
    >
      {children}
    </AppLayout>
  );
};

export default MentorDashboardLayout; 