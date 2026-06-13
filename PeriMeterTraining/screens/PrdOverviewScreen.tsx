import React from 'react';

interface Lesson {
  number: number;
  title: string;
  desc: string;
  status: 'completed' | 'current' | 'locked';
}

const LESSONS: Lesson[] = [
  { number: 1, title: 'Problem Identification', desc: 'Defining the root user pain points before ideation.', status: 'completed' },
  { number: 2, title: 'The PRD Structure', desc: 'Anatomy of a high-impact Product Requirements Document.', status: 'current' },
  { number: 3, title: 'Writing User Stories', desc: 'Translating requirements into agile execution units.', status: 'locked' },
  { number: 4, title: 'Success Metrics', desc: 'Defining KPIs to measure feature impact effectively.', status: 'locked' },
];

interface PrdOverviewScreenProps {
  onBack: () => void;
  onResumeLesson: () => void;
}

const PrdOverviewScreen: React.FC<PrdOverviewScreenProps> = ({ onBack, onResumeLesson }) => {
  return (
    <div className="space-y-xl animate-fadeIn">
      {/* Back button */}
      <button 
        onClick={onBack} 
        className="text-primary hover:text-primary-container font-label-sm text-sm font-semibold flex items-center gap-xs cursor-pointer"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Catalog
      </button>

      {/* Hero Banner Section */}
      <div className="w-full relative h-48 md:h-64 bg-surface-variant border border-outline-variant/50 rounded-xl overflow-hidden shadow-sm shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-container/20 to-tertiary-container/10 z-0"></div>
        <div className="relative h-full flex flex-col justify-end p-lg md:p-xl max-w-7xl mx-auto w-full z-20">
          <div className="flex items-center gap-sm mb-sm flex-wrap">
            <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-[11px] uppercase tracking-wider font-bold">Core Module</span>
            <span className="text-on-surface-variant font-label-sm text-xs font-semibold flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> 4 Hours</span>
            <span className="text-on-surface-variant font-label-sm text-xs font-semibold flex items-center gap-1"><span className="material-symbols-outlined text-sm">signal_cellular_alt</span> Intermediate</span>
          </div>
          <h1 className="font-display-lg text-2xl md:text-3xl font-extrabold text-on-surface mb-md tracking-tight leading-tight">Mastering the PRD</h1>
          {/* Overall Course Progress */}
          <div className="flex items-center gap-md max-w-md">
            <div className="flex-1 h-2.5 bg-surface-container-highest rounded-full overflow-hidden flex">
              <div className="w-[25%] bg-primary h-full rounded-full"></div>
            </div>
            <span className="font-label-sm text-xs text-on-surface-variant font-bold whitespace-nowrap">25% Complete</span>
          </div>
        </div>
      </div>

      {/* Content Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-start">
        {/* Left Column: Syllabus (4 cols on lg) */}
        <aside className="lg:col-span-4 flex flex-col gap-md">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-sm text-lg font-bold text-on-surface">Course Syllabus</h2>
            <span className="font-label-sm text-xs text-on-surface-variant bg-surface-container px-2 py-0.5 rounded font-semibold">4 Lessons</span>
          </div>
          <div className="flex flex-col gap-sm relative">
            {/* Vertical Connecting Line Background */}
            <div className="absolute left-6 top-8 bottom-8 w-[2px] bg-surface-container-highest z-0"></div>
            
            {LESSONS.map((lesson) => {
              const isCompleted = lesson.status === 'completed';
              const isCurrent = lesson.status === 'current';
              const isLocked = lesson.status === 'locked';

              return (
                <div
                  key={lesson.number}
                  onClick={() => !isLocked && onResumeLesson()}
                  className={`relative z-10 flex gap-md p-md border rounded-xl group transition-all duration-150 ${
                    isCurrent 
                      ? 'bg-primary/5 border-primary cursor-pointer ring-2 ring-primary/20 shadow-sm'
                      : isCompleted
                        ? 'bg-surface border-outline-variant hover:bg-surface-container-low cursor-pointer'
                        : 'bg-surface-container-lowest border-outline-variant border-dashed opacity-75'
                  }`}
                >
                  {isCompleted && <div className="w-1 absolute left-0 top-0 bottom-0 bg-tertiary rounded-l-xl"></div>}
                  {isCurrent && <div className="w-1 absolute left-0 top-0 bottom-0 bg-primary rounded-l-xl"></div>}
                  
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-[0_0_0_4px_var(--color-surface)] font-bold text-xs ${
                    isCurrent 
                      ? 'bg-primary text-on-primary' 
                      : isCompleted
                        ? 'bg-tertiary-container text-on-tertiary-container'
                        : 'bg-surface-container-highest text-on-surface-variant'
                  }`}>
                    {isCompleted ? (
                      <span className="material-symbols-outlined text-sm font-bold">check</span>
                    ) : isCurrent ? (
                      <span className="material-symbols-outlined text-sm font-bold">play_arrow</span>
                    ) : (
                      <span className="material-symbols-outlined text-sm">lock</span>
                    )}
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className={`font-label-sm text-[10px] font-bold uppercase tracking-wider mb-0.5 ${
                      isCurrent ? 'text-primary' : isCompleted ? 'text-tertiary' : 'text-on-surface-variant'
                    }`}>
                      Lesson {lesson.number} {isCurrent && '(Current)'}
                    </span>
                    <h3 className="font-body-base text-sm font-bold text-on-surface mb-0.5">{lesson.title}</h3>
                    <p className="font-label-sm text-xs text-on-surface-variant leading-relaxed">{lesson.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Right Column: Course Info (8 cols on lg) */}
        <div className="lg:col-span-8 flex flex-col gap-lg">
          {/* Top Action Area (CTA & Quick Summary) */}
          <div className="flex flex-col sm:flex-row gap-md items-start sm:items-center justify-between bg-surface-container-lowest p-md md:p-lg rounded-xl border border-outline-variant shadow-sm">
            <div className="flex-1">
              <h2 className="font-headline-sm text-md font-bold text-on-surface mb-1">Ready to continue?</h2>
              <p className="font-body-relaxed text-xs text-on-surface-variant">Pick up where you left off in <strong>Lesson 2: The PRD Structure</strong>.</p>
            </div>
            <button 
              onClick={onResumeLesson}
              className="w-full sm:w-auto px-xl py-2.5 bg-primary text-on-primary rounded-lg font-label-sm text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/95 transition-colors shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-md" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
              Resume Learning
            </button>
          </div>

          {/* Course Summary */}
          <section className="space-y-md">
            <h2 className="font-headline-sm text-lg font-bold text-on-surface">About this Module</h2>
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md md:p-lg space-y-4 leading-relaxed">
              <p className="font-body-relaxed text-sm text-on-surface-variant">
                The Product Requirements Document (PRD) is the central source of truth for your entire product team. In this intensive module, you will move beyond standard templates to learn how to craft documents that drive alignment, clarify complex logic, and inspire engineering teams to build the right solutions.
              </p>
              <p className="font-body-relaxed text-sm text-on-surface-variant">
                We will dissect real-world PRDs from top-tier tech companies, analyzing what makes them effective and where common pitfalls occur. By the end of this course, your documentation will shift from an administrative burden to a powerful strategic tool.
              </p>
            </div>
          </section>

          {/* What You Will Learn */}
          <section className="space-y-md">
            <h2 className="font-headline-sm text-lg font-bold text-on-surface">What you will learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {[
                'Articulate user problems with undeniable clarity and supporting data.',
                'Structure a comprehensive PRD that balances high-level vision with technical detail.',
                'Write precise User Stories and Acceptance Criteria that engineers love.',
                'Define robust success metrics (KPIs) to evaluate feature performance post-launch.'
              ].map((point, idx) => (
                <div key={idx} className="bg-surface-container-low p-md rounded-xl border border-surface-variant flex items-start gap-md">
                  <span className="material-symbols-outlined text-tertiary bg-tertiary-container/30 p-1 rounded-md shrink-0 text-sm font-bold">check</span>
                  <p className="font-body-base text-xs text-on-surface leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Instructor Profile */}
          <section className="space-y-md">
            <h2 className="font-headline-sm text-lg font-bold text-on-surface">Your Instructor</h2>
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md flex flex-col sm:flex-row items-center sm:items-start gap-lg shadow-sm">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-surface-variant shrink-0 bg-surface-container">
                <img 
                  alt="Instructor Portrait" 
                  className="w-full h-full object-cover" 
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80" 
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h4 className="font-headline-sm text-md font-bold text-on-surface mb-0.5">Marcus Aurelius</h4>
                <p className="font-label-sm text-xs font-semibold text-primary mb-2">Principal Product Director, Core Engines</p>
                <p className="font-body-base text-xs text-on-surface-variant leading-relaxed">
                  Marcus has over 15 years of product management experience at Google and Amazon. He currently oversees the infrastructure lifecycle at PeriMeter and is passionate about structured engineering design and product communication.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrdOverviewScreen;
