import React, { useState, useMemo } from 'react';

interface Course {
  id: string;
  title: string;
  desc: string;
  duration: string;
  level: string;
  icon: string;
  category: 'Core Skills' | 'Company Process';
}

const COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Data-Driven Decision Making',
    desc: 'Learn how to formulate hypotheses, design A/B tests, and analyze product metrics to make robust decisions.',
    duration: '2h 30m',
    level: 'Intermediate',
    icon: 'data_exploration',
    category: 'Core Skills',
  },
  {
    id: 'course-2',
    title: 'User Interview Techniques',
    desc: 'Master the art of asking non-leading questions to uncover true user needs and pain points.',
    duration: '1h 45m',
    level: 'Beginner',
    icon: 'forum',
    category: 'Core Skills',
  },
  {
    id: 'course-3',
    title: 'Strategic Roadmapping',
    desc: 'Build outcome-driven roadmaps that balance quick wins with long-term strategic investments.',
    duration: '3h 15m',
    level: 'Advanced',
    icon: 'route',
    category: 'Core Skills',
  },
  {
    id: 'course-4',
    title: 'Agile Ceremonies Overview',
    desc: 'Standard practices for sprint planning, standups, grooming, and team retrospectives.',
    duration: '45m',
    level: 'Beginner',
    icon: 'sync',
    category: 'Company Process',
  },
  {
    id: 'course-5',
    title: 'Cross-Functional Collaboration',
    desc: 'Working effectively with Engineering, Design, Compliance, and Marketing teams.',
    duration: '1h 15m',
    level: 'Intermediate',
    icon: 'handshake',
    category: 'Company Process',
  },
];

interface TrainingCatalogScreenProps {
  onSelectCourse: (courseId: string) => void;
}

const TrainingCatalogScreen: React.FC<TrainingCatalogScreenProps> = ({ onSelectCourse }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = useMemo(() => {
    return COURSES.filter(
      (c) =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const coreSkills = filteredCourses.filter((c) => c.category === 'Core Skills');
  const companyProcess = filteredCourses.filter((c) => c.category === 'Company Process');

  return (
    <div className="space-y-xl animate-fadeIn">
      {/* Page Header */}
      <div>
        <h1 className="font-headline-lg text-3xl font-extrabold text-on-surface mb-xs">Training Catalog</h1>
        <p className="font-body-base text-on-surface-variant">Master the frameworks, processes, and tools required for elite Product Management.</p>
      </div>

      {/* Featured Course Hero */}
      <section className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden flex flex-col md:flex-row shadow-sm hover:border-outline transition-colors duration-300">
        <div className="w-full md:w-2/5 h-48 md:h-auto relative bg-surface-container-high shrink-0 min-h-[200px]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-container/20 to-tertiary-container/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-[64px] text-primary/50">description</span>
          </div>
        </div>
        <div className="p-lg md:p-xl flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-sm mb-sm flex-wrap">
            <span className="px-2 py-0.5 bg-primary-fixed text-primary border border-primary/30 rounded text-[10px] font-bold tracking-wider uppercase">Featured</span>
            <span className="font-label-sm text-xs font-semibold text-on-surface-variant flex items-center gap-xs"><span className="material-symbols-outlined text-sm">schedule</span> 4 Hours</span>
            <span className="font-label-sm text-xs font-semibold text-on-surface-variant flex items-center gap-xs"><span className="material-symbols-outlined text-sm">signal_cellular_alt</span> Advanced</span>
          </div>
          <h2 className="font-headline-md text-xl font-bold text-on-surface mb-sm">Mastering the PRD</h2>
          <p className="font-body-base text-sm text-on-surface-variant mb-lg max-w-2xl leading-relaxed">Learn how to craft Product Requirements Documents that align stakeholders, provide clear engineering direction, and ensure successful feature delivery.</p>
          {/* Progress indicator */}
          <div className="mb-md max-w-md">
            <div className="flex justify-between items-center mb-1">
              <span className="font-label-sm text-xs font-bold text-on-surface-variant">Course Progress</span>
              <span className="font-label-sm text-xs font-bold text-primary">35%</span>
            </div>
            <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: '35%' }}></div>
            </div>
          </div>
          <div className="flex gap-sm">
            <button 
              onClick={() => onSelectCourse('prd')} 
              className="bg-primary text-on-primary px-5 py-2 rounded-lg font-label-sm text-xs font-semibold hover:bg-primary/95 transition-colors cursor-pointer"
            >
              Continue Course
            </button>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-md items-center justify-between bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-sm">
        <div className="relative w-full sm:w-96">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container pl-10 pr-4 py-2 rounded-lg border-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest text-on-surface font-body-base text-sm transition-all"
            placeholder="Search courses, skills, or topics..."
            type="text"
          />
        </div>
      </div>

      {/* Core Skills Category */}
      <section className="space-y-md">
        <h3 className="font-headline-sm text-lg font-bold text-on-surface flex items-center gap-sm">
          <span className="material-symbols-outlined text-primary">psychology</span>
          Core Skills
        </h3>
        {coreSkills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
            {coreSkills.map((c) => (
              <div key={c.id} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md flex flex-col hover:bg-surface-container-low hover:border-outline transition-all duration-200 cursor-pointer shadow-sm group">
                <div className="flex justify-between items-start mb-sm">
                  <div className="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">{c.icon}</span>
                  </div>
                  <button className="text-outline hover:text-primary transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-xl">bookmark_border</span>
                  </button>
                </div>
                <h4 className="font-label-sm text-md font-semibold text-on-surface mb-xs group-hover:text-primary transition-colors">{c.title}</h4>
                <p className="font-body-base text-xs text-on-surface-variant mb-md flex-1 line-clamp-2 leading-relaxed">{c.desc}</p>
                <div className="flex items-center gap-md border-t border-outline-variant/30 pt-sm mt-auto">
                  <span className="font-label-sm text-[11px] font-semibold text-on-surface-variant flex items-center gap-xs"><span className="material-symbols-outlined text-sm">schedule</span> {c.duration}</span>
                  <span className="font-label-sm text-[11px] font-semibold text-on-surface-variant flex items-center gap-xs"><span className="material-symbols-outlined text-sm">signal_cellular_alt</span> {c.level}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">No core skills courses match your search.</p>
        )}
      </section>

      {/* Company Process Category */}
      <section className="space-y-md">
        <h3 className="font-headline-sm text-lg font-bold text-on-surface flex items-center gap-sm">
          <span className="material-symbols-outlined text-tertiary">account_tree</span>
          Company Process
        </h3>
        {companyProcess.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {companyProcess.map((c) => (
              <div key={c.id} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md flex items-center hover:bg-surface-container-low hover:border-outline transition-all duration-200 cursor-pointer shadow-sm group gap-md">
                <div className="w-16 h-16 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0 text-on-surface-variant group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[32px]">{c.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-label-sm text-md font-semibold text-on-surface mb-xs group-hover:text-primary transition-colors truncate">{c.title}</h4>
                  <p className="font-body-base text-xs text-on-surface-variant truncate leading-relaxed">{c.desc}</p>
                  <div className="flex items-center gap-md mt-2">
                    <span className="font-label-sm text-[11px] font-semibold text-on-surface-variant flex items-center gap-xs"><span className="material-symbols-outlined text-sm">schedule</span> {c.duration}</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors shrink-0">chevron_right</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">No process courses match your search.</p>
        )}
      </section>
    </div>
  );
};

export default TrainingCatalogScreen;
