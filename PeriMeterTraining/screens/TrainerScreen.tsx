
import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { TrainingContent, ContentType } from '../types';
import { ICONS } from '../constants';

const TrainerScreen: React.FC = () => {
  const { user, content, addContent } = useContext(AppContext);
  const [newContent, setNewContent] = useState({
    title: '',
    type: ContentType.Document,
    content: '',
    tags: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const myContent = content.filter(c => c.creatorId === user?.id);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewContent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);
    
    const newTrainingContent: TrainingContent = {
      id: `content-${Date.now()}`,
      title: newContent.title,
      type: newContent.type,
      content: newContent.content,
      tags: newContent.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      creatorId: user.id,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setTimeout(() => {
      addContent(newTrainingContent);
      setNewContent({ title: '', type: ContentType.Document, content: '', tags: '' });
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Trainer Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Add New Content</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Title</label>
              <input type="text" name="title" id="title" value={newContent.title} onChange={handleInputChange} required className="mt-1 w-full input-style" />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Content Type</label>
              <select name="type" id="type" value={newContent.type} onChange={handleInputChange} className="mt-1 w-full input-style">
                {Object.values(ContentType).filter(t => t !== ContentType.Quiz).map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                {newContent.type === ContentType.Document ? 'Content (Markdown)' : 'URL'}
              </label>
              <textarea name="content" id="content" value={newContent.content} onChange={handleInputChange} required rows={5} className="mt-1 w-full input-style" />
            </div>
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Tags (comma-separated)</label>
              <input type="text" name="tags" id="tags" value={newContent.tags} onChange={handleInputChange} className="mt-1 w-full input-style" />
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full px-4 py-2.5 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {isSubmitting ? 'Adding...' : 'Add Content'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">My Content Library ({myContent.length})</h2>
          <div className="space-y-4 max-h-[32rem] overflow-y-auto pr-2">
            {myContent.length > 0 ? myContent.map(c => (
              <div key={c.id} className="p-4 border dark:border-gray-700 rounded-lg flex justify-between items-start bg-gray-50 dark:bg-gray-900/50">
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white">{c.title} <span className="text-xs font-normal bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded-full">{c.type}</span></h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {c.tags.map(tag => <span key={tag} className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full font-medium">{tag}</span>)}
                  </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0 ml-4">{c.createdAt}</span>
              </div>
            )) : <p className="text-gray-500 dark:text-gray-400 text-center py-8">You haven't created any content yet.</p>}
          </div>
        </div>
      </div>
      <style>{`.input-style { background-color: #f3f4f6; color: #1f293b; border-radius: 0.5rem; padding: 0.5rem 0.75rem; border: 1px solid #cbd5e1; } .dark .input-style { background-color: #374155; color: #f1f5f9; border-color: #475569; } .input-style:focus { outline: 2px solid transparent; outline-offset: 2px; border-color: #60a5fa; ring: 1; ring-color: #60a5fa }`}</style>
    </div>
  );
};

export default TrainerScreen;
