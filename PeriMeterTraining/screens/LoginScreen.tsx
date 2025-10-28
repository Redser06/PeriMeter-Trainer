
import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { MOCK_USERS } from '../constants';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showMfa, setShowMfa] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const { login } = useContext(AppContext);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setShowMfa(true);
    } else {
      setError('Invalid email or password.');
    }
  };

  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (mfaCode.length === 6 && /^\d+$/.test(mfaCode)) {
      login(email);
    } else {
      setError('Invalid authenticator code. Please enter a 6-digit code.');
    }
  };

  const DEMO_ACCOUNTS = [
    { email: 'alex.chen@example.com', role: 'Trainee' },
    { email: 'brenda.smith@example.com', role: 'Hiring Manager' },
    { email: 'charles.doe@example.com', role: 'Trainer' },
    { email: 'diana.prince@example.com', role: 'Compliance' },
    { email: 'ethan.hunt@example.com', role: 'Exec / Leader' },
    { email: 'grace.hopper@example.com', role: 'Production Support' },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-4xl mx-auto p-8 flex flex-col md:flex-row gap-12">
        
        <div className="md:w-1/2 flex flex-col justify-center text-center md:text-left">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
            <span className="text-blue-600 dark:text-blue-400">P</span>eri<span className="text-blue-600 dark:text-blue-400">M</span>eter
            <span className="text-blue-600 dark:text-blue-400"> T</span>raining
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Your AI-powered onboarding and continuous learning platform.
          </p>
          <div className="mt-8 p-4 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200">Demo Accounts:</h3>
            <ul className="mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
              {DEMO_ACCOUNTS.map(u => (
                <li key={u.email}>
                  <button onClick={() => setEmail(u.email)} className="hover:underline text-left w-full">
                    <strong>{u.email}</strong> ({u.role})
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-gray-500">Password: any</p>
          </div>
        </div>

        <div className="md:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-md px-8 py-10 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
            {!showMfa ? (
              <form onSubmit={handleLogin}>
                <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">Welcome Back</h2>
                <div className="mt-8">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                    placeholder="********"
                    required
                  />
                </div>
                {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
                <div className="mt-6">
                  <button type="submit" className="w-full px-4 py-2.5 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-semibold">
                    Sign In
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleMfaSubmit}>
                <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">Two-Factor Authentication</h2>
                <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">Enter the code from your authenticator app.</p>
                <div className="mt-8">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Authenticator Code</label>
                  <input
                    type="text"
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value)}
                    className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                    placeholder="123456"
                    maxLength={6}
                    required
                  />
                </div>
                {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
                <div className="mt-6">
                  <button type="submit" className="w-full px-4 py-2.5 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-semibold">
                    Verify
                  </button>
                </div>
                 <button onClick={() => setShowMfa(false)} className="mt-4 w-full text-sm text-gray-500 hover:underline">Back to login</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
