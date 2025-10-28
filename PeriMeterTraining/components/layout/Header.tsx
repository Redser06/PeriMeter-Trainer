
import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { Persona } from '../../types';
import { ICONS } from '../../constants';

const Header: React.FC = () => {
  const { user, logout, currentPersona, setCurrentPersona } = useContext(AppContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          <span className="text-blue-600 dark:text-blue-400">P</span>eri<span className="text-blue-600 dark:text-blue-400">M</span>eter <span className="text-blue-600 dark:text-blue-400">T</span>raining
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        {/* Persona Switcher */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-blue-500"
          >
            <span>Viewing as: <span className="font-bold">{currentPersona}</span></span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-20 ring-1 ring-black ring-opacity-5">
              {user.roles.map(role => (
                <a
                  key={role}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPersona(role);
                    setDropdownOpen(false);
                  }}
                  className={`block px-4 py-2 text-sm ${currentPersona === role ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  {role}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* User Info and Logout */}
        <div className="flex items-center space-x-3">
            <span className="hidden md:inline text-gray-700 dark:text-gray-300">Welcome, {user.name}</span>
            <img className="h-10 w-10 rounded-full object-cover" src={user.avatar} alt="User avatar" />
            <button onClick={logout} title="Logout" className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none">
                {ICONS.logout}
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
