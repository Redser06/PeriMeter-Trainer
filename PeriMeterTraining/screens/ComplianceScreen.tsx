
import React from 'react';
import { ICONS } from '../constants';

const MOCK_LOGS = [
  { id: 1, timestamp: '2024-07-29 10:05:14', user: 'charles.doe@example.com', action: 'UPLOAD_CONTENT', details: 'Uploaded "Market Research Guide"', status: 'Success' },
  { id: 2, timestamp: '2024-07-29 10:04:30', user: 'alex.chen@example.com', action: 'SEARCH_WEB', details: 'Query: "latest AI trends"', status: 'Success' },
  { id: 3, timestamp: '2024-07-29 10:02:01', user: 'brenda.smith@example.com', action: 'LOGIN', details: 'User logged in successfully', status: 'Success' },
  { id: 4, timestamp: '2024-07-29 09:55:45', user: 'system', action: 'PII_SCAN', details: 'Scan completed. 0 issues found.', status: 'System' },
  { id: 5, timestamp: '2024-07-29 09:45:10', user: 'alex.chen@example.com', action: 'GENERATE_QUIZ', details: 'Quiz for "Intro to Product Management"', status: 'Success' },
];

const ComplianceScreen: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Compliance Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex items-center space-x-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-full text-green-600 dark:text-green-300">{ICONS.compliance}</div>
            <div>
                <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">System Status</h3>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">Compliant</p>
            </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">PII/PCI Scans</h3>
            <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">0 <span className="text-lg font-normal">Issues Found</span></p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Actions Logged (24h)</h3>
            <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{MOCK_LOGS.length}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Audit Log</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase">Timestamp</th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase">User</th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase">Action</th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase">Details</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_LOGS.map(log => (
                <tr key={log.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{log.timestamp}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{log.user}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${log.status === 'Success' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200' : 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200'}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComplianceScreen;
