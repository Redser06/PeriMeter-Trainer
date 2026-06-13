import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

interface TraineeDashboardScreenProps {
  onNavigate: (tabName: string) => void;
}

const TraineeDashboardScreen: React.FC<TraineeDashboardScreenProps> = ({ onNavigate }) => {
  const { user, userObjectives } = useContext(AppContext);

  // Calculate actual user onboarding completion metrics
  const myObjectives = userObjectives.filter(uo => uo.userId === user?.id);
  const totalTasks = myObjectives.reduce((acc, curr) => acc + Object.keys(curr.progress).length, 0);
  const completedTasks = myObjectives.reduce((acc, curr) => acc + Object.values(curr.progress).filter(Boolean).length, 0);
  const percent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 45;
  const tasksDoneText = totalTasks > 0 ? `${completedTasks} of ${totalTasks} tasks done` : "9 of 20 tasks done";

  return (
    <div className="space-y-xl animate-fadeIn">
      {/* Hero / Welcome Section */}
      <section className="flex flex-col md:flex-row gap-lg items-start md:items-center justify-between">
        <div>
          <h2 className="font-display-lg text-3xl font-extrabold text-on-surface mb-2">Welcome back, {user?.name || 'Alex'}.</h2>
          <p className="font-body-relaxed text-on-surface-variant max-w-2xl">
            You're making solid progress on your onboarding journey. Let's tackle the next critical path items.
          </p>
        </div>
        {/* Progress Tracker Widget */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md w-full md:w-80 shadow-sm">
          <div className="flex justify-between items-end mb-2">
            <div>
              <span className="font-label-sm text-xs font-bold text-secondary uppercase tracking-wider">Onboarding Completion</span>
              <div className="font-headline-md text-2xl font-bold text-primary mt-1">{percent}%</div>
            </div>
            <span className="material-symbols-outlined text-tertiary text-2xl">military_tech</span>
          </div>
          <div className="w-full bg-surface-variant rounded-full h-2.5 overflow-hidden">
            <div className="bg-primary h-2.5 rounded-full transition-all duration-500" style={{ width: `${percent}%` }}></div>
          </div>
          <p className="font-label-sm text-xs text-on-surface-variant mt-2 text-right">{tasksDoneText}</p>
        </div>
      </section>

      {/* Bento Grid Layout for Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
        {/* Next Steps (Action Oriented) - Takes up 8 columns on desktop */}
        <section className="md:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
          <div className="flex items-center justify-between mb-md border-b border-outline-variant/30 pb-sm">
            <h3 className="font-headline-sm text-lg font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">checklist</span>
              Next Steps
            </h3>
            <button onClick={() => onNavigate('Training Catalog')} className="font-label-sm text-xs font-semibold text-primary hover:underline">
              View Catalog
            </button>
          </div>
          <ul className="space-y-sm">
            {/* Task 1 */}
            <li 
              onClick={() => onNavigate('Ways of Working')} 
              className="flex items-start gap-md p-md rounded-lg bg-surface hover:bg-surface-container-low border border-transparent hover:border-outline-variant transition-all cursor-pointer group"
            >
              <div className="mt-0.5 shrink-0">
                <div className="w-5 h-5 rounded border-2 border-outline-variant flex items-center justify-center group-hover:border-primary transition-colors">
                  <span className="material-symbols-outlined text-[14px] opacity-0 group-hover:opacity-100 text-primary transition-opacity">check</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-headline-md text-body-base font-semibold text-on-surface">Review Ways of Working Phases</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-error-container text-on-error-container uppercase tracking-wide">High Priority</span>
                </div>
                <p className="font-body-base text-sm text-on-surface-variant">Familiarize yourself with the core ceremonies, artifacts, and engineering cycles.</p>
              </div>
              <button className="opacity-0 group-hover:opacity-100 p-1 text-primary hover:bg-primary-container/20 rounded transition-all shrink-0">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </li>

            {/* Task 2 */}
            <li className="flex items-start gap-md p-md rounded-lg bg-surface hover:bg-surface-container-low border border-transparent hover:border-outline-variant transition-all cursor-pointer group">
              <div className="mt-0.5 shrink-0">
                <div className="w-5 h-5 rounded border-2 border-outline-variant flex items-center justify-center group-hover:border-primary transition-colors"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-headline-md text-body-base font-semibold text-on-surface">Meet the Engineering Lead</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-secondary-container text-on-secondary-container uppercase tracking-wide">Scheduled</span>
                </div>
                <p className="font-body-base text-sm text-on-surface-variant">1:1 introduction with Sarah Jenkins to discuss platform architecture and team velocity.</p>
                <div className="flex items-center gap-1 text-xs text-secondary mt-2">
                  <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                  Today, 2:00 PM
                </div>
              </div>
            </li>

            {/* Task 3 */}
            <li 
              onClick={() => onNavigate('Training Catalog')} 
              className="flex items-start gap-md p-md rounded-lg bg-surface hover:bg-surface-container-low border border-transparent hover:border-outline-variant transition-all cursor-pointer group"
            >
              <div className="mt-0.5 shrink-0">
                <div className="w-5 h-5 rounded border-2 border-outline-variant flex items-center justify-center group-hover:border-primary transition-colors"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-headline-md text-body-base font-semibold text-on-surface">Complete PRD Template Training</h4>
                </div>
                <p className="font-body-base text-sm text-on-surface-variant">Watch the 15-minute module on how we structure Product Requirements Documents.</p>
              </div>
              <button className="opacity-0 group-hover:opacity-100 p-1 text-primary hover:bg-primary-container/20 rounded transition-all shrink-0">
                <span className="material-symbols-outlined">play_circle</span>
              </button>
            </li>
          </ul>
        </section>

        {/* Quick Resources - Takes up 4 columns on desktop */}
        <section className="md:col-span-4 space-y-lg">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm h-full flex flex-col justify-between">
            <div>
              <h3 className="font-headline-sm text-lg font-bold text-on-surface mb-md flex items-center gap-2 border-b border-outline-variant/30 pb-sm">
                <span className="material-symbols-outlined text-tertiary">bolt</span>
                Quick Resources
              </h3>
              <div className="grid grid-cols-2 gap-sm">
                {/* Resource Tile 1 */}
                <a 
                  className="flex flex-col items-center justify-center p-md bg-surface border border-outline-variant rounded-lg hover:bg-secondary-container/30 hover:border-primary/50 transition-all text-center group" 
                  href="https://jira.example.com" 
                  target="_blank" 
                  rel="noreferrer"
                >
                  <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-xl">hub</span>
                  </div>
                  <span className="font-label-sm text-xs text-on-surface group-hover:text-primary transition-colors font-medium">Jira Board</span>
                </a>
                {/* Resource Tile 2 */}
                <button 
                  onClick={() => onNavigate('Acronym Soup')} 
                  className="flex flex-col items-center justify-center p-md bg-surface border border-outline-variant rounded-lg hover:bg-secondary-container/30 hover:border-primary/50 transition-all text-center group"
                >
                  <div className="w-10 h-10 rounded-full bg-tertiary-container/20 text-tertiary flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-xl">description</span>
                  </div>
                  <span className="font-label-sm text-xs text-on-surface group-hover:text-primary transition-colors font-medium">Wiki Docs</span>
                </button>
                {/* Resource Tile 3 */}
                <a 
                  className="flex flex-col items-center justify-center p-md bg-surface border border-outline-variant rounded-lg hover:bg-secondary-container/30 hover:border-primary/50 transition-all text-center group" 
                  href="https://sentry.example.com" 
                  target="_blank" 
                  rel="noreferrer"
                >
                  <div className="w-10 h-10 rounded-full bg-error-container/20 text-error flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-xl">bug_report</span>
                  </div>
                  <span className="font-label-sm text-xs text-on-surface group-hover:text-primary transition-colors font-medium">Bug Tracker</span>
                </a>
                {/* Resource Tile 4 */}
                <button 
                  onClick={() => onNavigate("Who's Who")} 
                  className="flex flex-col items-center justify-center p-md bg-surface border border-outline-variant rounded-lg hover:bg-secondary-container/30 hover:border-primary/50 transition-all text-center group"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-container/20 text-primary flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-xl">groups</span>
                  </div>
                  <span className="font-label-sm text-xs text-on-surface group-hover:text-primary transition-colors font-medium">Org Chart</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Contextual Knowledge Snippet */}
      <section className="bg-primary/5 border border-primary/20 rounded-xl p-lg flex items-start gap-md relative overflow-hidden">
        <div className="absolute -right-10 -top-10 opacity-5">
          <span className="material-symbols-outlined text-[150px]">lightbulb</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex shrink-0 items-center justify-center">
          <span className="material-symbols-outlined text-primary text-xl">tips_and_updates</span>
        </div>
        <div className="relative z-10">
          <h4 className="font-headline-md text-md font-bold text-on-surface mb-1">Acronym of the Day: <span className="text-primary font-bold">MVP</span></h4>
          <p className="font-body-base text-sm text-on-surface-variant">
            <strong>Minimum Viable Product.</strong> A version of a product with just enough features to be usable by early customers who can then provide feedback for future product development. We focus heavily on MVPs to validate assumptions quickly and iterate based on real usage.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TraineeDashboardScreen;
