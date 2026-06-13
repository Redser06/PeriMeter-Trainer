
import React, { useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { ICONS } from '../constants';
import { Persona } from '../types';

const HiringManagerScreen: React.FC<{ activeTab?: string }> = ({ activeTab }) => {
  const { users, objectives, userObjectives } = useContext(AppContext);

  const trainees = useMemo(() => {
    return users.filter(u => u.roles.includes(Persona.Trainee)).map(trainee => {
      const assigned = userObjectives.filter(uo => uo.userId === trainee.id);
      const totalObjectives = assigned.length;
      const completedObjectives = assigned.filter(a => a.completed).length;
      
      let overallProgress = 0;
      if (totalObjectives > 0) {
        const totalProgressSum = assigned.reduce((sum, uo) => {
          const objective = objectives.find(o => o.id === uo.objectiveId);
          if (!objective) return sum;
          const completedCount = Object.values(uo.progress).filter(p => p).length;
          const progressPercent = objective.contentIds.length > 0 ? (completedCount / objective.contentIds.length) * 100 : 0;
          return sum + progressPercent;
        }, 0);
        overallProgress = totalProgressSum / totalObjectives;
      }

      return { ...trainee, totalObjectives, completedObjectives, overallProgress };
    });
  }, [users, userObjectives, objectives]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Hiring Manager Dashboard</h1>
      
      {activeTab === 'Dashboard' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Total Trainees</h3>
                <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{trainees.length}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Objectives Assigned</h3>
                <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{userObjectives.length}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Avg. Completion</h3>
                <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{Math.round(trainees.reduce((acc, t) => acc + t.overallProgress, 0) / (trainees.length || 1))}%</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">Quick Overview</h3>
            <p className="text-gray-600 dark:text-gray-400">Use the sidebar links to manage active trainees or view and edit learning objectives.</p>
          </div>
        </div>
      )}

      {activeTab === 'Manage Trainees' && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 animate-fadeIn">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Trainee Progress</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase">Trainee</th>
                  <th className="py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase">Team</th>
                  <th className="py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase">Objectives</th>
                  <th className="py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase">Overall Progress</th>
                  <th className="py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {trainees.map(trainee => (
                  <tr key={trainee.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-4 px-4 flex items-center space-x-3">
                      <img src={trainee.avatar} alt={trainee.name} className="h-10 w-10 rounded-full" />
                      <div>
                        <p className="font-bold text-gray-800 dark:text-white">{trainee.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{trainee.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-300">{trainee.team}</td>
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-300">{trainee.completedObjectives} / {trainee.totalObjectives}</td>
                    <td className="py-4 px-4">
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${trainee.overallProgress}%` }}></div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'Objectives' && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 animate-fadeIn space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Active Objectives</h2>
            <button className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">+ Create New Objective</button>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {objectives.map(obj => (
              <div key={obj.id} className="p-5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">{obj.title}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{obj.description}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                  <span>Modules linked: {obj.contentIds.length}</span>
                  <button className="text-blue-600 dark:text-blue-400 hover:underline">Edit Objective</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HiringManagerScreen;
