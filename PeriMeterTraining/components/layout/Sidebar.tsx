
import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Persona } from '../../types';
import { ICONS } from '../../constants';

interface NavLink {
  label: string;
  icon: React.ReactNode;
  persona: Persona;
}

const ALL_LINKS: NavLink[] = [
  { label: 'Dashboard', icon: ICONS.dashboard, persona: Persona.Trainee },
  { label: 'Ways of Working', icon: ICONS.learn, persona: Persona.Trainee },
  { label: 'Acronym Soup', icon: ICONS.search, persona: Persona.Trainee },
  { label: 'Who\'s Who', icon: ICONS.users, persona: Persona.Trainee },
  { label: 'Training Catalog', icon: ICONS.objectives, persona: Persona.Trainee },
  { label: 'Dashboard', icon: ICONS.dashboard, persona: Persona.HiringManager },
  { label: 'Manage Trainees', icon: ICONS.users, persona: Persona.HiringManager },
  { label: 'Objectives', icon: ICONS.objectives, persona: Persona.HiringManager },
  { label: 'Content Library', icon: ICONS.content, persona: Persona.Trainer },
  { label: 'Upload Content', icon: ICONS.upload, persona: Persona.Trainer },
  { label: 'Compliance Log', icon: ICONS.compliance, persona: Persona.Compliance },
  { label: 'System Audit', icon: ICONS.search, persona: Persona.Compliance },
  { label: 'Team Performance', icon: ICONS.reports, persona: Persona.Exec },
  { label: 'ROI Dashboard', icon: ICONS.dashboard, persona: Persona.Exec },
  { label: 'System Logs', icon: ICONS.support, persona: Persona.ProductionSupport },
  { label: 'API Monitor', icon: ICONS.reports, persona: Persona.ProductionSupport },
];

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { currentPersona } = useContext(AppContext);

  const filteredLinks = ALL_LINKS.filter(link => link.persona === currentPersona);

  return (
    <div className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
        <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">P</span>eri<span className="text-2xl font-bold text-blue-600 dark:text-blue-400">M</span>eter
        </span>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4">
          {filteredLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => setActiveTab(link.label)}
              className={`w-full flex items-center px-4 py-2.5 mt-2 rounded-lg transition-colors duration-200 text-left ${
                activeTab === link.label 
                ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {link.icon}
              <span className="ml-3 font-medium">{link.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};


export default Sidebar;
