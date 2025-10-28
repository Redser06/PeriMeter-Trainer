
import React, { useContext, useMemo, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { TrainingContent, ContentType, Quiz, QuizQuestion } from '../types';
import SearchBar from '../components/search/SearchBar';
import { ICONS } from '../constants';
import { generateQuizForContent } from '../services/geminiService';
import Spinner from '../components/ui/Spinner';

const ContentDisplay: React.FC<{ content: TrainingContent, onBack: () => void }> = ({ content, onBack }) => {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);
    const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
    const [showResults, setShowResults] = useState(false);

    const handleGenerateQuiz = async () => {
        setIsLoadingQuiz(true);
        const result = await generateQuizForContent(content.content, content.title);
        if (result && result.quiz) {
            setQuiz({ id: `quiz-${content.id}`, contentId: content.id, questions: result.quiz });
        }
        setIsLoadingQuiz(false);
    };

    const handleAnswerSelect = (questionIndex: number, answer: string) => {
        setUserAnswers(prev => ({ ...prev, [questionIndex]: answer }));
    };

    const handleSubmitQuiz = () => {
        setShowResults(true);
    };

    const calculateScore = () => {
        if (!quiz) return 0;
        const correctAnswers = quiz.questions.reduce((count, q, i) => {
            return userAnswers[i] === q.correctAnswer ? count + 1 : count;
        }, 0);
        return Math.round((correctAnswers / quiz.questions.length) * 100);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <button onClick={onBack} className="mb-6 text-blue-600 dark:text-blue-400 hover:underline font-medium">{'< Back to Objectives'}</button>
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">{content.title}</h2>
            {content.type === ContentType.Document && <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">{content.content}</p>}
            {content.type === ContentType.Video && <iframe className="w-full aspect-video rounded-lg mt-4" src={content.content} title={content.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>}
            {content.type === ContentType.Link && <a href={content.content} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">View Resource <span aria-hidden="true">→</span></a>}
            
            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                {!quiz && !isLoadingQuiz && <button onClick={handleGenerateQuiz} className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold">Test My Knowledge</button>}
                {isLoadingQuiz && <div className="flex items-center space-x-2 text-gray-500"><Spinner size="sm" /><p>Generating quiz...</p></div>}
                {quiz && (
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Quiz: {content.title}</h3>
                        {quiz.questions.map((q, i) => (
                            <div key={i} className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                <p className="font-semibold text-lg">{i + 1}. {q.question}</p>
                                <div className="mt-3 space-y-2">
                                    {q.options.map((opt, j) => {
                                        const isSelected = userAnswers[i] === opt;
                                        let stateClasses = 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-blue-400 dark:hover:border-blue-500';
                                        if (showResults) {
                                            if (opt === q.correctAnswer) stateClasses = 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 font-semibold';
                                            else if (isSelected) stateClasses = 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300';
                                        } else if (isSelected) {
                                            stateClasses = 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 ring-2 ring-blue-500';
                                        }
                                        return (
                                            <button key={j} onClick={() => !showResults && handleAnswerSelect(i, opt)} disabled={showResults} className={`block w-full text-left p-3 rounded-md border-2 transition-all ${stateClasses}`}>
                                                {opt}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                        {!showResults ? (
                            <button onClick={handleSubmitQuiz} className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">Submit Quiz</button>
                        ) : (
                            <div className="p-4 bg-blue-100 dark:bg-blue-900/40 rounded-lg text-center">
                                <h4 className="text-xl font-bold text-blue-800 dark:text-blue-200">Your Score: {calculateScore()}%</h4>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};


const TraineeScreen: React.FC = () => {
  const { user, objectives, content, userObjectives } = useContext(AppContext);
  const [selectedContent, setSelectedContent] = useState<TrainingContent | null>(null);

  const myObjectives = useMemo(() => {
    if (!user) return [];
    return userObjectives
      .filter(uo => uo.userId === user.id)
      .map(uo => {
        const objective = objectives.find(o => o.id === uo.objectiveId);
        if (!objective) return null;
        const objectiveContent = objective.contentIds.map(cid => content.find(c => c.id === cid)).filter(Boolean) as TrainingContent[];
        const completedCount = Object.values(uo.progress).filter(p => p).length;
        const progressPercent = objectiveContent.length > 0 ? (completedCount / objectiveContent.length) * 100 : 0;
        return { ...objective, content: objectiveContent, progress: progressPercent };
      })
      .filter(Boolean);
  }, [user, userObjectives, objectives, content]);

  if (selectedContent) {
      return <ContentDisplay content={selectedContent} onBack={() => setSelectedContent(null)} />;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome, {user?.name}!</h1>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">My Learning Objectives</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {myObjectives.map(obj => obj && (
            <div key={obj.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">{obj.title}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{obj.description}</p>
              <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Progress</span>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{Math.round(obj.progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${obj.progress}%` }}></div>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Modules:</h4>
                <ul className="space-y-2">
                  {obj.content.map(c => (
                    <li key={c.id}>
                      <button onClick={() => setSelectedContent(c)} className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-3 transition-colors">
                        <span className="text-gray-500">{c.type === ContentType.Document ? ICONS.content : c.type === ContentType.Video ? ICONS.dashboard : ICONS.objectives}</span>
                        <span className="font-medium text-gray-700 dark:text-gray-200">{c.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Explore & Learn</h2>
        <SearchBar />
      </div>
    </div>
  );
};

export default TraineeScreen;
