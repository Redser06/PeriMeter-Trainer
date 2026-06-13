import React, { useState, useMemo } from 'react';

interface Stakeholder {
  name: string;
  role: string;
  team: string;
  department: 'Engineering' | 'Design' | 'Marketing';
  avatar: string;
  topics: string[];
  email: string;
}

const STAKEHOLDERS: Stakeholder[] = [
  {
    name: 'Sarah Jenkins',
    role: 'VP of Engineering',
    team: 'Core Platform',
    department: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    topics: ['Architecture', 'Tech Debt', 'Q3 Roadmap'],
    email: 'sarah.jenkins@example.com',
  },
  {
    name: 'David Chen',
    role: 'Head of Product Design',
    team: 'UX/UI',
    department: 'Design',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    topics: ['Design System', 'User Research', 'Figma Libraries'],
    email: 'david.chen@example.com',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Director of Marketing',
    team: 'Growth',
    department: 'Marketing',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    topics: ['GTM Strategy', 'Campaigns', 'Product Positioning'],
    email: 'elena.rodriguez@example.com',
  },
  {
    name: 'Sarah Chen',
    role: 'Lead Engineering Manager',
    team: 'Growth PM',
    department: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    topics: ['Agile Sprints', 'Release Cycles', 'API specs'],
    email: 'sarah.chen@example.com',
  },
];

interface ToolResource {
  name: string;
  desc: string;
  icon: string;
  colorBg: string;
  colorText: string;
  url: string;
}

const DIGITAL_TOOLS: ToolResource[] = [
  {
    name: 'Confluence',
    desc: 'PRDs, Specs & Documentation',
    icon: 'library_books',
    colorBg: 'bg-blue-100',
    colorText: 'text-blue-700',
    url: 'https://confluence.example.com',
  },
  {
    name: 'Jira',
    desc: 'Issue tracking & sprints',
    icon: 'assignment',
    colorBg: 'bg-blue-100',
    colorText: 'text-blue-700',
    url: 'https://jira.example.com',
  },
  {
    name: 'Figma',
    desc: 'UX/UI designs & mockups',
    icon: 'draw',
    colorBg: 'bg-orange-100',
    colorText: 'text-orange-700',
    url: 'https://figma.example.com',
  },
  {
    name: 'Slack',
    desc: 'Daily team chat & channels',
    icon: 'chat',
    colorBg: 'bg-purple-100',
    colorText: 'text-purple-700',
    url: 'https://slack.example.com',
  },
];

const WhoIsWhoScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDepartment, setActiveDepartment] = useState<'All' | 'Engineering' | 'Design' | 'Marketing'>('All');

  const filteredStakeholders = useMemo(() => {
    return STAKEHOLDERS.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDept = activeDepartment === 'All' || s.department === activeDepartment;

      return matchesSearch && matchesDept;
    });
  }, [searchQuery, activeDepartment]);

  return (
    <div className="space-y-xl animate-fadeIn">
      <header className="mb-xl">
        <h2 className="font-display-lg text-3xl font-extrabold text-on-surface mb-sm">Who's Who</h2>
        <p className="font-body-relaxed text-on-surface-variant max-w-3xl">
          Navigate the organization. Find the right stakeholders for your product initiatives and discover key internal resources.
        </p>
      </header>

      {/* Search and Filter Bar */}
      <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant flex flex-col md:flex-row gap-md items-center shadow-sm">
        <div className="relative flex-1 w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-low border-none rounded-lg pl-10 pr-4 py-2 font-body-base text-sm focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all"
            placeholder="Search people, roles, or topics..."
            type="text"
          />
        </div>
        <div className="flex gap-xs w-full md:w-auto overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
          {(['All', 'Engineering', 'Design', 'Marketing'] as const).map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveDepartment(dept)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full font-label-sm text-xs font-semibold border transition-colors cursor-pointer ${
                activeDepartment === dept
                  ? 'border-primary bg-primary text-on-primary'
                  : 'border-outline-variant text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Stakeholder Directory */}
      <section className="mb-xl">
        <h3 className="font-headline-md text-lg font-bold mb-lg border-b border-outline-variant/30 pb-xs text-on-surface">Stakeholder Directory</h3>
        {filteredStakeholders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
            {filteredStakeholders.map((s) => (
              <div 
                key={s.name} 
                className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md hover:bg-surface-container-low hover:border-outline transition-colors group cursor-pointer shadow-sm"
              >
                <div className="flex items-start gap-md mb-md">
                  <img
                    alt={`Profile of ${s.name}`}
                    className="w-16 h-16 rounded-full object-cover border-2 border-surface-container"
                    src={s.avatar}
                  />
                  <div>
                    <h4 className="font-headline-sm text-md font-bold text-on-background">{s.name}</h4>
                    <p className="font-label-sm text-xs font-semibold text-primary mt-0.5">{s.role}</p>
                    <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded bg-surface-container text-on-surface-variant uppercase tracking-wider">
                      {s.team}
                    </span>
                  </div>
                </div>
                <div className="mb-md">
                  <p className="font-label-sm text-xs font-bold text-on-surface-variant mb-1.5">Talk to me about:</p>
                  <div className="flex flex-wrap gap-xs">
                    {s.topics.map((t) => (
                      <span key={t} className="text-[11px] bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end pt-sm border-t border-outline-variant/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a href={`mailto:${s.email}`} className="text-primary hover:text-primary-container font-label-sm text-xs font-semibold flex items-center gap-xs">
                    <span className="material-symbols-outlined text-sm">mail</span> Email Contact
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm">
            <span className="material-symbols-outlined text-outline text-4xl mb-2">person_search</span>
            <p className="text-on-surface-variant font-medium">No team members match your query.</p>
          </div>
        )}
      </section>

      {/* Resource Map Section */}
      <section>
        <h3 className="font-headline-md text-lg font-bold mb-lg border-b border-outline-variant/30 pb-xs text-on-surface">Resource Map</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
          <div className="space-y-sm">
            <h4 className="font-headline-sm text-sm font-bold text-on-surface-variant mb-sm">Digital Workspaces</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
              {DIGITAL_TOOLS.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center p-md bg-surface-container-lowest border border-outline-variant rounded-xl hover:border-primary transition-colors group shadow-sm"
                >
                  <div className={`w-10 h-10 rounded-lg ${tool.colorBg} ${tool.colorText} flex items-center justify-center mr-md shrink-0`}>
                    <span className="material-symbols-outlined text-xl">{tool.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-label-sm text-sm font-semibold text-on-background group-hover:text-primary transition-colors">
                      {tool.name}
                    </h5>
                    <p className="text-[11px] text-on-surface-variant truncate mt-0.5">{tool.desc}</p>
                  </div>
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors ml-2">
                    arrow_forward
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhoIsWhoScreen;
