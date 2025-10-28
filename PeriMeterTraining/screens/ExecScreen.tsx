
import React, { useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';

const ExecScreen: React.FC = () => {
  const { users, userObjectives, objectives } = useContext(AppContext);

  const teamData = useMemo(() => {
    const teams: { [key: string]: { name: string; members: number; progress: number[] } } = {};
    const trainees = users.filter(u => u.roles.includes('Trainee'));

    trainees.forEach(trainee => {
      const teamName = trainee.team || 'Unassigned';
      if (!teams[teamName]) {
        teams[teamName] = { name: teamName, members: 0, progress: [] };
      }
      teams[teamName].members++;

      const traineeObjectives = userObjectives.filter(uo => uo.userId === trainee.id);
      if (traineeObjectives.length > 0) {
        const totalProgress = traineeObjectives.reduce((sum, uo) => {
          const objective = objectives.find(o => o.id === uo.objectiveId);
          if (!objective) return sum;
          const completedCount = Object.values(uo.progress).filter(p => p).length;
          return sum + (objective.contentIds.length > 0 ? (completedCount / objective.contentIds.length) * 100 : 0);
        }, 0);
        teams[teamName].progress.push(totalProgress / traineeObjectives.length);
      }
    });

    return Object.values(teams).map(team => ({
      ...team,
      avgProgress: team.progress.length > 0 ? team.progress.reduce((a, b) => a + b, 0) / team.progress.length : 0,
    }));
  }, [users, userObjectives, objectives]);

  const totalTrainees = users.filter(u => u.roles.includes('Trainee')).length;
  const overallAvgProgress = teamData.reduce((sum, team) => sum + team.avgProgress * team.members, 0) / (totalTrainees || 1);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Executive Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Total PMs in Training</h3>
            <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{totalTrainees}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Overall Progress</h3>
            <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{Math.round(overallAvgProgress)}%</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Training ROI (Est.)</h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">+15%</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Productivity increase</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Time to Onboard (Avg.)</h3>
            <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">21 <span className="text-lg font-normal">days</span></p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Team Performance</h2>
        <div className="space-y-4">
          {teamData.map(team => (
            <div key={team.name}>
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-gray-700 dark:text-gray-200">{team.name} ({team.members} members)</span>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{Math.round(team.avgProgress)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div className="bg-blue-600 h-4 rounded-full text-xs text-white flex items-center justify-center" style={{ width: `${team.avgProgress}%` }}>
                  {Math.round(team.avgProgress)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExecScreen;
