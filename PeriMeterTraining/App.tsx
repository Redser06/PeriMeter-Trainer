
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppContext, AppProvider } from './context/AppContext';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import LoginScreen from './screens/LoginScreen';
import TraineeScreen from './screens/TraineeScreen';
import HiringManagerScreen from './screens/HiringManagerScreen';
import TrainerScreen from './screens/TrainerScreen';
import ComplianceScreen from './screens/ComplianceScreen';
import ExecScreen from './screens/ExecScreen';
import ProductionSupportScreen from './screens/ProductionSupportScreen';

const AppContent: React.FC = () => {
  const { user, currentPersona } = useContext(AppContext);

  if (!user) {
    return <LoginScreen />;
  }

  const renderScreen = () => {
    switch (currentPersona) {
      case 'Trainee':
        return <TraineeScreen />;
      case 'Hiring Manager':
        return <HiringManagerScreen />;
      case 'Trainer':
        return <TrainerScreen />;
      case 'Compliance':
        return <ComplianceScreen />;
      case 'Exec':
        return <ExecScreen />;
      case 'Production Support':
        return <ProductionSupportScreen />;
      default:
        return <TraineeScreen />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            {renderScreen()}
          </div>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route path="/*" element={<AppContent />} />
        </Routes>
      </AppProvider>
    </Router>
  );
}

export default App;
