
import React, { createContext, useState, useMemo } from 'react';
import { Persona, User, TrainingContent, TrainingObjective, UserObjective } from '../types';
import { MOCK_USERS, MOCK_CONTENT, MOCK_OBJECTIVES, MOCK_USER_OBJECTIVES } from '../constants';

interface AppContextType {
  user: User | null;
  login: (email: string) => User | null;
  logout: () => void;
  currentPersona: Persona | null;
  setCurrentPersona: (persona: Persona) => void;
  users: User[];
  content: TrainingContent[];
  objectives: TrainingObjective[];
  userObjectives: UserObjective[];
  addContent: (newContent: TrainingContent) => void;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPersona, setCurrentPersona] = useState<Persona | null>(null);
  
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [content, setContent] = useState<TrainingContent[]>(MOCK_CONTENT);
  const [objectives, setObjectives] = useState<TrainingObjective[]>(MOCK_OBJECTIVES);
  const [userObjectives, setUserObjectives] = useState<UserObjective[]>(MOCK_USER_OBJECTIVES);

  const login = (email: string): User | null => {
    const foundUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser) {
      setUser(foundUser);
      setCurrentPersona(foundUser.roles[0]);
      return foundUser;
    }
    return null;
  };

  const logout = () => {
    setUser(null);
    setCurrentPersona(null);
  };

  const addContent = (newContent: TrainingContent) => {
    setContent(prev => [...prev, newContent]);
  };

  const contextValue = useMemo(() => ({
    user,
    login,
    logout,
    currentPersona,
    setCurrentPersona,
    users,
    content,
    objectives,
    userObjectives,
    addContent
  }), [user, currentPersona, users, content, objectives, userObjectives]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
