
import React, { useState, useContext } from 'react';
import { searchWeb, searchInternalDocs } from '../../services/geminiService';
import { AppContext } from '../../context/AppContext';
import { ICONS } from '../../constants';
import Spinner from '../ui/Spinner';
import { GroundingChunk } from '../../types';

interface SearchResult {
    text: string;
    citations: GroundingChunk[];
}

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchMode, setSearchMode] = useState<'internal' | 'web'>('internal');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState('');
  const { content } = useContext(AppContext);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      if (searchMode === 'internal') {
        const internalContext = content.map(c => `Title: ${c.title}\nContent: ${c.content}`).join('\n\n---\n\n');
        const text = await searchInternalDocs(query, internalContext);
        setResult({ text, citations: [] });
      } else {
        const { text, citations } = await searchWeb(query);
        setResult({ text, citations });
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            {ICONS.search}
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything..."
            className="w-full py-3 pl-10 pr-4 text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Search in:</span>
            <div className="flex items-center p-1 space-x-1 bg-gray-200 dark:bg-gray-700 rounded-lg">
              <button
                type="button"
                onClick={() => setSearchMode('internal')}
                className={`px-3 py-1 text-sm rounded-md transition-colors font-medium ${searchMode === 'internal' ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-300 shadow' : 'text-gray-600 dark:text-gray-300'}`}
              >
                In-App Content
              </button>
              <button
                type="button"
                onClick={() => setSearchMode('web')}
                className={`px-3 py-1 text-sm rounded-md transition-colors font-medium ${searchMode === 'web' ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-300 shadow' : 'text-gray-600 dark:text-gray-300'}`}
              >
                Web Resources
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2.5 font-semibold tracking-wide text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 dark:disabled:bg-blue-800 disabled:cursor-not-allowed"
          >
            {isLoading ? <Spinner size="sm" /> : 'Search'}
          </button>
        </div>
      </form>

      {isLoading && (
        <div className="mt-6 text-center">
          <Spinner />
          <p className="mt-2 text-gray-500 dark:text-gray-400">Searching...</p>
        </div>
      )}

      {error && <p className="mt-6 text-red-500">{error}</p>}

      {result && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Answer:</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{result.text}</p>
          
          {result.citations && result.citations.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold text-gray-700 dark:text-gray-200">Sources:</h4>
              <ul className="mt-2 list-disc list-inside space-y-1">
                {result.citations.map((citation, index) => (
                  <li key={index} className="text-sm">
                    <a href={citation.web.uri} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {citation.web.title || citation.web.uri}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
