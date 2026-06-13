import React, { useState } from 'react';

interface Phase {
  title: string;
  desc: string;
  progressWidth: string;
  icon: string;
  artifacts: string[];
  ceremonies: { name: string; detail: string }[];
  collaborators: { init: string; name: string }[];
}

const PHASES: Record<number, Phase> = {
  1: {
    title: 'Discovery',
    desc: 'Identify user problems, assess market viability, and validate hypotheses before committing engineering resources.',
    progressWidth: '12%',
    icon: 'search',
    artifacts: ['One-Pager (PRFAQ)', 'User Research Report'],
    ceremonies: [
      { name: 'Problem Space Review', detail: 'Bi-weekly deep dive into customer pain points.' },
      { name: 'Design Sprint Kickoff', detail: 'Ad-hoc alignment with UX prior to prototyping.' },
    ],
    collaborators: [
      { init: 'UX', name: 'UX Researchers' },
      { init: 'DA', name: 'Data Analysts' },
    ],
  },
  2: {
    title: 'Definition',
    desc: 'Translate validated problems into clear, actionable requirements. Establish scope, success metrics, and technical feasibility.',
    progressWidth: '38%',
    icon: 'architecture',
    artifacts: ['Product Requirements Document (PRD)', 'Technical Design Spec (TDD)'],
    ceremonies: [
      { name: 'PRD Walkthrough', detail: 'Review of features and user flows with engineering team.' },
      { name: 'Backlog Refinement', detail: 'Sizing and sequencing stories for sprint planning.' },
    ],
    collaborators: [
      { init: 'TL', name: 'Tech Leads' },
      { init: 'PD', name: 'Product Designers' },
    ],
  },
  3: {
    title: 'Development',
    desc: 'Build the product increment in short agile sprints. Focus on engineering execution, test coverage, and security compliance.',
    progressWidth: '63%',
    icon: 'code',
    artifacts: ['API Contract Spec', 'QA Test Plan', 'Vulnerability Scan Report'],
    ceremonies: [
      { name: 'Daily Standup', detail: '15-minute alignment check on ticket blockers.' },
      { name: 'Sprint Demo & Review', detail: 'Demonstrate working software to key stakeholders.' },
    ],
    collaborators: [
      { init: 'SE', name: 'Software Engineers' },
      { init: 'QA', name: 'QA Engineers' },
    ],
  },
  4: {
    title: 'Launch',
    desc: 'Release the feature safely to our customers. Monitor performance, roll out using feature toggles, and gather post-launch feedback.',
    progressWidth: '100%',
    icon: 'rocket_launch',
    artifacts: ['Release Notes', 'Go-To-Market (GTM) Plan', 'Post-Launch Performance Dashboard'],
    ceremonies: [
      { name: 'Launch Go/No-Go Review', detail: 'Final verification of operational and security readiness.' },
      { name: 'Retrospective / Post-Mortem', detail: 'Reflect on execution and identify lessons learned.' },
    ],
    collaborators: [
      { init: 'PM', name: 'Product Marketing' },
      { init: 'CS', name: 'Customer Support Leads' },
    ],
  },
};

const WaysOfWorkingScreen: React.FC = () => {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(1);
  const activePhase = PHASES[activePhaseIndex];

  return (
    <div className="space-y-xl animate-fadeIn">
      <header className="mb-xl">
        <h2 className="font-display-lg text-3xl font-extrabold text-on-surface mb-sm">Ways of Working</h2>
        <p className="font-body-relaxed text-on-surface-variant max-w-3xl">
          The Product Lifecycle at PeriMeter is designed to ensure rigorous exploration, precise execution, and measured impact.
          Explore the phases below to understand required ceremonies, artifacts, and cross-functional partnerships.
        </p>
      </header>

      {/* Interactive Timeline Module */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
        {/* Timeline Navigation */}
        <div className="relative flex justify-between items-center mb-xl px-md py-lg">
          {/* Background gray line */}
          <div className="absolute left-6 right-6 h-1 bg-surface-container-high rounded z-0"></div>
          
          {/* Active progress blue line */}
          <div 
            className="absolute left-6 h-1 bg-primary rounded z-0 transition-all duration-500 ease-in-out" 
            style={{ width: `calc(${activePhase.progressWidth} - 24px)` }}
          ></div>

          {/* Phase Nodes */}
          {Object.entries(PHASES).map(([indexStr, phase]) => {
            const index = Number(indexStr);
            const isActive = index === activePhaseIndex;
            const isCompleted = index < activePhaseIndex;

            return (
              <button
                key={index}
                aria-label={`${phase.title} Phase`}
                onClick={() => setActivePhaseIndex(index)}
                className="relative z-10 flex flex-col items-center focus:outline-none group cursor-pointer"
              >
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-surface-container-lowest shadow-sm transition-all duration-300 ${
                    isActive 
                      ? 'bg-primary text-on-primary scale-110 ring-4 ring-primary-container/20' 
                      : isCompleted
                        ? 'bg-primary-container text-on-primary-container'
                        : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px] font-bold">{phase.icon}</span>
                </div>
                <span 
                  className={`mt-sm font-label-sm text-xs font-semibold ${
                    isActive ? 'text-primary font-bold' : 'text-secondary group-hover:text-on-surface-variant'
                  }`}
                >
                  {phase.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Area (Updates based on selection) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter border-t border-outline-variant/30 pt-lg">
          {/* Left Column: Overview & Required Docs */}
          <div className="lg:col-span-4 flex flex-col gap-gutter">
            <div className="bg-surface-container-low rounded-xl p-md">
              <h3 className="font-headline-sm text-xl font-bold text-on-surface mb-sm">{activePhase.title}</h3>
              <p className="font-body-base text-sm text-on-surface-variant mb-md leading-relaxed">
                {activePhase.desc}
              </p>
              <h4 className="font-label-sm text-xs font-bold text-secondary uppercase tracking-wider mb-xs">Required Artifacts</h4>
              <ul className="flex flex-col gap-2 mt-2">
                {activePhase.artifacts.map((doc, idx) => (
                  <li key={idx} className="flex items-center gap-2 font-body-base text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-lg">description</span>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Ceremonies & Collaborators */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* Ceremonies Card */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md hover:bg-surface-bright transition-colors">
              <div className="flex items-center gap-sm mb-sm border-b border-outline-variant/30 pb-xs">
                <span className="material-symbols-outlined text-primary text-xl">event</span>
                <h4 className="font-headline-sm text-md font-bold text-on-surface">Ceremonies</h4>
              </div>
              <ul className="space-y-sm mt-3">
                {activePhase.ceremonies.map((ceremony, idx) => (
                  <li key={idx} className="flex flex-col">
                    <span className="font-label-sm text-sm font-semibold text-on-surface">{ceremony.name}</span>
                    <span className="font-body-base text-xs text-on-surface-variant mt-0.5">{ceremony.detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Collaborators Card */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md hover:bg-surface-bright transition-colors">
              <div className="flex items-center gap-sm mb-sm border-b border-outline-variant/30 pb-xs">
                <span className="material-symbols-outlined text-primary text-xl">group</span>
                <h4 className="font-headline-sm text-md font-bold text-on-surface">Key Collaborators</h4>
              </div>
              <ul className="space-y-sm mt-3">
                {activePhase.collaborators.map((collab, idx) => (
                  <li key={idx} className="flex items-center gap-sm">
                    <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs">
                      {collab.init}
                    </div>
                    <span className="font-body-base text-sm text-on-surface-variant">{collab.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WaysOfWorkingScreen;
