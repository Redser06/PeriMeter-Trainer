
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { ICONS } from '../constants';

const MOCK_API_CALLS = [
  { id: 1, timestamp: '10:15:01', endpoint: '/generateContent', model: 'gemini-2.5-flash', status: 200, duration: '450ms' },
  { id: 2, timestamp: '10:14:55', endpoint: '/generateContentStream', model: 'gemini-2.5-flash', status: 200, duration: '1200ms' },
  { id: 3, timestamp: '10:14:30', endpoint: '/generateContent', model: 'gemini-2.5-flash', status: 200, duration: '800ms' },
  { id: 4, timestamp: '10:13:05', endpoint: '/generateContent', model: 'gemini-2.5-flash', status: 500, duration: '250ms' },
];

const MOCK_DETAILED_LOGS = [
  { id: 1, level: 'INFO', timestamp: '10:15:01', service: 'GeminiService', message: 'Quiz generation successful for content-1' },
  { id: 2, level: 'INFO', timestamp: '10:14:30', service: 'SearchService', message: 'Web search completed for query: "latest AI trends"' },
  { id: 3, level: 'INFO', timestamp: '10:12:01', service: 'AuthService', message: 'User grace.hopper@example.com logged in' },
  { id: 4, level: 'WARN', timestamp: '10:10:45', service: 'ContentService', message: 'Content "Old Internal Memo" has not been updated in 365 days' },
  { id: 5, level: 'ERROR', timestamp: '10:13:05', service: 'GeminiService', message: 'API call failed: Quota exceeded.' },
];

const StatusIndicator: React.FC<{ status: 'Operational' | 'Degraded' | 'Outage' }> = ({ status }) => {
    const colorClasses = {
        Operational: 'bg-green-500',
        Degraded: 'bg-yellow-500',
        Outage: 'bg-red-500',
    };
    return (
        <div className="flex items-center space-x-2">
            <div className={`h-3 w-3 rounded-full ${colorClasses[status]}`}></div>
            <span className="text-gray-700 dark:text-gray-200 font-semibold">{status}</span>
        </div>
    );
};

const ProductionSupportScreen: React.FC<{ activeTab?: string }> = ({ activeTab }) => {
  const { content, users } = useContext(AppContext);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Production Support Console</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-3">Gemini API Status</h3>
            <StatusIndicator status="Operational" />
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-3">Database Connection</h3>
            <StatusIndicator status="Operational" />
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-3">PII Scanner Service</h3>
            <StatusIndicator status="Degraded" />
        </div>
      </div>

      {activeTab === 'System Logs' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">System Event Log</h2>
            <div className="overflow-auto h-96">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="py-2 px-3 font-semibold text-gray-500 uppercase">Time</th>
                    <th className="py-2 px-3 font-semibold text-gray-500 uppercase">Level</th>
                    <th className="py-2 px-3 font-semibold text-gray-500 uppercase">Service</th>
                    <th className="py-2 px-3 font-semibold text-gray-500 uppercase">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {MOCK_DETAILED_LOGS.map(log => (
                    <tr key={log.id} className="font-mono">
                      <td className="py-2 px-3 text-gray-500">{log.timestamp}</td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${log.level === 'ERROR' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' : log.level === 'WARN' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'}`}>{log.level}</span>
                      </td>
                      <td className="py-2 px-3 text-gray-600 dark:text-gray-300">{log.service}</td>
                      <td className="py-2 px-3 text-gray-600 dark:text-gray-300">{log.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Recent Content Uploads</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase">Title</th>
                    <th className="py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase">Type</th>
                    <th className="py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase">Uploaded By</th>
                    <th className="py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {[...content].reverse().slice(0, 5).map(c => {
                    const creator = users.find(u => u.id === c.creatorId);
                    return (
                      <tr key={c.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="py-3 px-4 font-semibold text-gray-700 dark:text-gray-200">{c.title}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{c.type}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{creator?.name || 'Unknown'}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{c.createdAt}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'API Monitor' && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 animate-fadeIn">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Recent API Calls</h2>
          <div className="overflow-auto h-96">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-2 px-3 font-semibold text-gray-500 uppercase">Time</th>
                  <th className="py-2 px-3 font-semibold text-gray-500 uppercase">Endpoint</th>
                  <th className="py-2 px-3 font-semibold text-gray-500 uppercase">Status</th>
                  <th className="py-2 px-3 font-semibold text-gray-500 uppercase">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {MOCK_API_CALLS.map(call => (
                  <tr key={call.id} className="font-mono">
                    <td className="py-2 px-3 text-gray-500">{call.timestamp}</td>
                    <td className="py-2 px-3 text-gray-600 dark:text-gray-300">{call.endpoint}</td>
                    <td className="py-2 px-3">
                      <span className={`font-bold ${call.status === 200 ? 'text-green-500' : 'text-red-500'}`}>{call.status}</span>
                    </td>
                    <td className="py-2 px-3 text-gray-600 dark:text-gray-300">{call.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductionSupportScreen;
