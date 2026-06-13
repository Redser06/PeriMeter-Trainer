import React, { useState, useEffect } from 'react';
import TraineeDashboardScreen from './TraineeDashboardScreen';
import WaysOfWorkingScreen from './WaysOfWorkingScreen';
import GlossaryScreen from './GlossaryScreen';
import WhoIsWhoScreen from './WhoIsWhoScreen';
import TrainingCatalogScreen from './TrainingCatalogScreen';
import PrdOverviewScreen from './PrdOverviewScreen';
import PrdLessonScreen from './PrdLessonScreen';

interface TraineeScreenProps {
  activeTab?: string;
  setActiveTab: (tab: string) => void;
}

const TraineeScreen: React.FC<TraineeScreenProps> = ({ activeTab, setActiveTab }) => {
  // Local sub-screen navigation state (for course learning flow)
  const [activeSubScreen, setActiveSubScreen] = useState<string | null>(null);

  // Reset sub-screen when global sidebar tab changes
  useEffect(() => {
    setActiveSubScreen(null);
  }, [activeTab]);

  if (activeSubScreen === 'prd_overview') {
    return (
      <PrdOverviewScreen 
        onBack={() => setActiveSubScreen(null)} 
        onResumeLesson={() => setActiveSubScreen('prd_lesson')} 
      />
    );
  }

  if (activeSubScreen === 'prd_lesson') {
    return (
      <PrdLessonScreen 
        onBack={() => setActiveSubScreen('prd_overview')} 
      />
    );
  }

  // Route to the appropriate sub-screen component
  switch (activeTab) {
    case 'Dashboard':
      return <TraineeDashboardScreen onNavigate={setActiveTab} />;
    case 'Ways of Working':
      return <WaysOfWorkingScreen />;
    case 'Acronym Soup':
      return <GlossaryScreen />;
    case 'Who\'s Who':
      return <WhoIsWhoScreen />;
    case 'Training Catalog':
      return (
        <TrainingCatalogScreen 
          onSelectCourse={(courseId) => {
            if (courseId === 'prd') {
              setActiveSubScreen('prd_overview');
            }
          }} 
        />
      );
    default:
      return <TraineeDashboardScreen onNavigate={setActiveTab} />;
  }
};

export default TraineeScreen;
