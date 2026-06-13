import React, { useState } from 'react';

interface PrdLessonScreenProps {
  onBack: () => void;
}

const PrdLessonScreen: React.FC<PrdLessonScreenProps> = ({ onBack }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizSuccess, setQuizSuccess] = useState<boolean | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const quizOptions = [
    { id: 1, text: 'As the system, I want to securely hash passwords so that the database is safe.' },
    { id: 2, text: 'As an Enterprise Admin, I want to bulk-export audit logs so that I can comply with our quarterly security review.' },
    { id: 3, text: 'As a user, I want a faster dashboard so that I don\'t have to wait.' },
  ];

  const handleQuizSubmit = () => {
    if (selectedOption === null) return;
    setQuizSubmitted(true);
    // Option 2 (id 2) is the correct answer
    setQuizSuccess(selectedOption === 2);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)] animate-fadeIn">
      {/* Top Bar with syllabus link */}
      <button 
        onClick={onBack} 
        className="text-primary hover:text-primary-container font-label-sm text-sm font-semibold flex items-center gap-xs cursor-pointer mb-lg"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span> Syllabus Overview
      </button>

      {/* Main Grid split */}
      <div className="flex-1 flex flex-col lg:flex-row gap-xl">
        {/* Left Pane (70%): Lesson Content */}
        <div className="lg:w-8/12 xl:w-9/12 flex flex-col gap-xl">
          {/* Video Section */}
          <section className="flex flex-col gap-sm">
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-2xl md:text-3xl font-extrabold text-on-surface">Lesson 3: Writing User Stories</h1>
            <div className="relative w-full aspect-video bg-surface-container-highest rounded-xl overflow-hidden border border-outline-variant group cursor-pointer shadow-sm">
              {!isVideoPlaying ? (
                <>
                  {/* Poster Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80')" }}
                  ></div>
                  {/* Overlay */}
                  <div 
                    onClick={() => setIsVideoPlaying(true)}
                    className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center z-10"
                  >
                    <div className="w-16 h-16 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-3xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                    </div>
                  </div>
                </>
              ) : (
                <iframe 
                  className="w-full h-full" 
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                  title="Lesson Video" 
                  allow="autoplay; encrypted-media" 
                  allowFullScreen
                ></iframe>
              )}
              {/* Progress Bar (Simulated) */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-surface-container z-20">
                <div className="h-full bg-primary w-1/3 transition-all duration-300"></div>
              </div>
            </div>
          </section>

          {/* Rich Text Content */}
          <section className="prose prose-slate max-w-none font-body-relaxed text-sm text-on-surface flex flex-col gap-md leading-relaxed">
            <p className="text-on-surface-variant">
              A User Story is a brief, informal explanation of a software feature written from the perspective of the end user. Its primary purpose is to articulate how a piece of work will deliver value to the customer. It shifts the focus from writing about requirements to talking about them.
            </p>
            
            <h3 className="font-headline-sm text-md font-bold text-on-surface mt-md">The Standard Format</h3>
            <p className="text-on-surface-variant mb-xs">
              To maintain disciplined precision across the product organization, we utilize the standard functional syntax:
            </p>
            <div className="bg-surface-container-low border-l-4 border-primary p-md rounded-r-lg font-code-mono text-xs text-on-surface mb-sm leading-relaxed">
              <span className="text-primary font-bold">As a</span> [type of user], <br/>
              <span className="text-primary font-bold">I want</span> [an action/goal], <br/>
              <span className="text-primary font-bold">So that</span> [a reason/value].
            </div>

            <h3 className="font-headline-sm text-md font-bold text-on-surface mt-md">Breakdown of Components</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
                <div className="flex items-center gap-2 mb-sm text-primary">
                  <span className="material-symbols-outlined text-lg">person</span>
                  <span className="font-label-sm text-xs font-bold uppercase tracking-wide">The "Who"</span>
                </div>
                <p className="font-body-base text-xs text-on-surface-variant leading-relaxed">Identifies the specific user persona. Avoid generic terms like "user." Be specific (e.g., "Premium Subscriber").</p>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
                <div className="flex items-center gap-2 mb-sm text-primary">
                  <span className="material-symbols-outlined text-lg">bolt</span>
                  <span className="font-label-sm text-xs font-bold uppercase tracking-wide">The "What"</span>
                </div>
                <p className="font-body-base text-xs text-on-surface-variant leading-relaxed">The intent or action. Focus on what needs to be achieved, not how the system should technically solve it.</p>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
                <div className="flex items-center gap-2 mb-sm text-primary">
                  <span className="material-symbols-outlined text-lg">flag</span>
                  <span className="font-label-sm text-xs font-bold uppercase tracking-wide">The "Why"</span>
                </div>
                <p className="font-body-base text-xs text-on-surface-variant leading-relaxed">The value proposition. This is critical for engineering to understand the context and prioritize correctly.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Pane: Interactive Quiz Widget (30%) */}
        <div className="lg:w-4/12 xl:w-3/12 flex flex-col gap-md">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md md:p-lg shadow-sm sticky top-24">
            <div className="flex items-center gap-sm mb-md border-b border-outline-variant/30 pb-sm">
              <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-sm">quiz</span>
              </div>
              <h3 className="font-headline-md text-md font-bold text-on-surface">Knowledge Check</h3>
            </div>
            
            {!quizSubmitted ? (
              <>
                <p className="font-label-sm text-xs text-on-surface-variant mb-md">
                  Which of the following represents the strongest, most actionable User Story?
                </p>
                {/* Quiz Options */}
                <div className="flex flex-col gap-sm">
                  {quizOptions.map((opt) => {
                    const isChecked = selectedOption === opt.id;
                    return (
                      <label key={opt.id} className="group cursor-pointer">
                        <input
                          type="radio"
                          name="quiz_q1"
                          checked={isChecked}
                          onChange={() => setSelectedOption(opt.id)}
                          className="peer sr-only"
                        />
                        <div className={`p-md rounded-lg border-2 text-xs transition-colors leading-relaxed ${
                          isChecked 
                            ? 'border-primary bg-primary-container/10 text-primary font-semibold' 
                            : 'border-surface-variant bg-surface hover:bg-surface-container-low'
                        }`}>
                          <div className="flex items-start gap-sm">
                            <div className={`mt-0.5 w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-all ${
                              isChecked ? 'border-primary border-4' : 'border-outline'
                            }`}></div>
                            <span className="font-body-base leading-snug">{opt.text}</span>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
                <button 
                  onClick={handleQuizSubmit}
                  disabled={selectedOption === null}
                  className="mt-md w-full py-2 bg-primary text-on-primary font-label-sm text-xs font-semibold rounded-lg hover:bg-primary/95 disabled:bg-surface-container-high disabled:text-on-surface-variant disabled:cursor-not-allowed transition-colors border border-outline-variant"
                >
                  Submit Answer
                </button>
              </>
            ) : (
              <div className="space-y-md text-center py-4">
                <span className={`material-symbols-outlined text-5xl ${quizSuccess ? 'text-green-500' : 'text-red-500'}`}>
                  {quizSuccess ? 'check_circle' : 'cancel'}
                </span>
                <h4 className="font-headline-sm text-md font-bold text-on-surface">
                  {quizSuccess ? 'Correct Answer!' : 'Incorrect Answer'}
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {quizSuccess 
                    ? 'Excellent job! This story identifies a specific stakeholder (Enterprise Admin), a clear goal (bulk-export audit logs), and a concrete value proposition (comply with quarterly security reviews).'
                    : 'Not quite. Remember that a strong user story requires a specific target persona (avoid generic "user" or "system"), a clear goal, and an explicit business value.'
                  }
                </p>
                <button 
                  onClick={() => {
                    setQuizSubmitted(false);
                    setSelectedOption(null);
                    setQuizSuccess(null);
                  }}
                  className="w-full py-2 bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-sm text-xs font-semibold rounded-lg transition-colors border border-outline-variant"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Pagination Controls */}
      <div className="border-t border-outline-variant bg-surface px-margin-desktop md:px-xl py-md mt-auto rounded-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-xs px-4 py-2 rounded-lg text-secondary hover:bg-surface-container-high transition-colors font-label-sm text-xs font-semibold border border-outline-variant bg-surface cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Syllabus Overview
          </button>
          
          <div className="hidden md:flex flex-col items-center gap-1">
            <div className="flex items-center gap-1">
              <div className="w-8 h-2 rounded-full bg-primary"></div>
              <div className="w-8 h-2 rounded-full bg-primary"></div>
              <div className="w-8 h-2 rounded-full bg-primary"></div>
              <div className="w-8 h-2 rounded-full bg-surface-variant"></div>
              <div className="w-8 h-2 rounded-full bg-surface-variant"></div>
            </div>
            <span className="font-code-mono text-[10px] text-outline uppercase tracking-wider">Module Progress 60%</span>
          </div>

          <button 
            onClick={onBack}
            className="flex items-center gap-xs px-4 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary/95 transition-colors font-label-sm text-xs font-semibold shadow-sm cursor-pointer"
          >
            Complete Lesson
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrdLessonScreen;
