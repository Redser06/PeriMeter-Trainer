import React, { useContext, useState, useEffect } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import LoginScreen from './screens/LoginScreen';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import TraineeScreen from './screens/TraineeScreen';
import TrainerScreen from './screens/TrainerScreen';
import HiringManagerScreen from './screens/HiringManagerScreen';
import ComplianceScreen from './screens/ComplianceScreen';
import ExecScreen from './screens/ExecScreen';
import ProductionSupportScreen from './screens/ProductionSupportScreen';
import { Persona } from './types';

const AppContent: React.FC = () => {
  const { user, currentPersona } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState<string>('');

  // Reset active tab when persona changes
  useEffect(() => {
    if (currentPersona) {
      switch (currentPersona) {
        case Persona.Trainee:
          setActiveTab('Dashboard');
          break;
        case Persona.HiringManager:
          setActiveTab('Dashboard');
          break;
        case Persona.Trainer:
          setActiveTab('Content Library');
          break;
        case Persona.Compliance:
          setActiveTab('Compliance Log');
          break;
        case Persona.Exec:
          setActiveTab('Team Performance');
          break;
        case Persona.ProductionSupport:
          setActiveTab('System Logs');
          break;
        default:
          setActiveTab('');
      }
    }
  }, [currentPersona]);

  if (!user) {
    return <LoginScreen />;
  }

  const renderActiveScreen = () => {
    switch (currentPersona) {
      case Persona.Trainee:
        return <TraineeScreen activeTab={activeTab} setActiveTab={setActiveTab} />;
      case Persona.Trainer:
        return <TrainerScreen activeTab={activeTab} />;
      case Persona.HiringManager:
        return <HiringManagerScreen activeTab={activeTab} />;
      case Persona.Compliance:
        return <ComplianceScreen activeTab={activeTab} />;
      case Persona.Exec:
        return <ExecScreen activeTab={activeTab} />;
      case Persona.ProductionSupport:
        return <ProductionSupportScreen activeTab={activeTab} />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a role in the header to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            {renderActiveScreen()}
          </div>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
