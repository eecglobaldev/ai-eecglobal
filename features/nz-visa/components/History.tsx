import React, { useState } from 'react';
import { HistoryItem } from '../types';

interface HistorySectionProps {
  history: HistoryItem[];
  onClear: () => void;
  makeApiCall: (promptOrContents: string | { parts: any[] }, systemInstruction?: string) => Promise<string | null>;
  showModal: (message: string) => void;
}

const HistoryItemCard: React.FC<{ item: HistoryItem, makeApiCall: HistorySectionProps['makeApiCall'], showModal: HistorySectionProps['showModal'] }> = ({ item, makeApiCall, showModal }) => {
  const scoreColor = item.score >= 8 ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400' : item.score >= 5 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400';
  const feedbackId = `hist-fb-${item.id}`;

    const [translatedFeedback, setTranslatedFeedback] = useState<string | null>(null);
    const [isTranslating, setIsTranslating] = useState(false);
    const [activeLang, setActiveLang] = useState('en');

    const handleTranslate = async (lang: 'en' | 'hi' | 'gu') => {
        setActiveLang(lang);
        if (lang === 'en') {
            setTranslatedFeedback(null);
            return;
        }
        
        setIsTranslating(true);
        try {
            const targetLanguage = lang === 'hi' ? 'Hindi' : 'Gujarati';
            const prompt = `Translate the following HTML content to ${targetLanguage}. Maintain ALL original HTML tags, classes, and structure. Only translate the text content.\n\n${item.feedback}`;
            const result = await makeApiCall(prompt);
            if (result) {
                const match = result.match(/```(?:html)?\s*([\s\S]+?)\s*```/);
                const finalHTML = match ? match[1].trim() : result.trim();
                setTranslatedFeedback(finalHTML);
            } else {
                showModal('Translation failed. The AI returned no content.');
            }
        } catch (error) {
             console.error("Translation error:", error);
             showModal(`An error occurred during translation: ${error instanceof Error ? error.message : String(error)}`);
             setActiveLang('en');
        } finally {
            setIsTranslating(false);
        }
    };

    return (
        <details className='bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden border border-slate-200 dark:border-slate-700 details-arrow'>
           <summary className="flex justify-between items-center p-4 list-none cursor-pointer">
                <div className="flex-grow">
                    <p className="font-semibold text-slate-700 dark:text-slate-300">{item.question}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{new Date(item.timestamp).toLocaleString()}</p>
                </div>
                <div className="ml-4 flex items-center space-x-4">
                   <span className={`text-sm font-bold px-3 py-1 rounded-full ${scoreColor}`}>{item.score}/10</span>
                   <svg className="w-5 h-5 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
            </summary>
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/50">
                <div className="flex justify-end items-center gap-2 mb-2 dark:text-slate-100">
                    <button onClick={() => handleTranslate('en')} className={`lang-btn ${activeLang === 'en' ? 'active' : ''} dark:text-slate-200`} disabled={isTranslating}>English</button>
                    <button onClick={() => handleTranslate('hi')} className={`lang-btn ${activeLang === 'hi' ? 'active' : ''} dark:text-slate-200`} disabled={isTranslating}>हिन्दी</button>
                    <button onClick={() => handleTranslate('gu')} className={`lang-btn ${activeLang === 'gu' ? 'active' : ''} dark:text-slate-200`} disabled={isTranslating}>ગુજરાતી</button>
                </div>
                <div id={feedbackId} className="prose prose-sm prose-slate max-w-none dark:text-slate-300" dangerouslySetInnerHTML={{ __html: translatedFeedback ?? item.feedback }} />
                <h5 className="font-semibold mt-4 mb-1 text-xs text-slate-600 dark:text-slate-400 uppercase">Your Answer:</h5>
                <p className="text-sm text-slate-600 dark:text-slate-300">{item.transcript}</p>
            </div>
        </details>
    );
};


export const HistorySection: React.FC<HistorySectionProps> = ({ history, onClear, makeApiCall, showModal }) => {
  return (
    <section id="history" className="mb-16 min-h-[20rem] fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
      <div className="flex justify-between items-center border-b-2 border-slate-200 dark:border-slate-700 pb-3 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200">Practice History</h2>
          <button onClick={onClear} className="text-sm font-medium text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-500 transition-colors flex items-center gap-1">
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.067-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
            Clear History
          </button>
        </div>
        <div id="history-list" className="space-y-4">
            {history.map(item => <HistoryItemCard key={item.id} item={item} makeApiCall={makeApiCall} showModal={showModal} />)}
        </div>
      </div>
    </section>
  );
};
