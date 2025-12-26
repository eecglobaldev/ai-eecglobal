import React, { useState } from 'react';
import type { HistoryItem } from '../types';
import { SUPPORTED_LANGUAGES } from '../services/constants';

// --- NEW ICONS from Lucide library ---
const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6"/></svg>;
const Trash2Icon: React.FC<{ className?: string }> = ({ className }) => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>;
const LoaderIcon: React.FC<{ className?: string }> = ({ className }) => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>;
const ClipboardIcon: React.FC<{ className?: string }> = ({ className }) => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>;
const CheckIcon: React.FC<{ className?: string }> = ({ className }) => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 6 9 17l-5-5"/></svg>;


interface HistoryProps {
    history: HistoryItem[];
    onClear: () => void;
    onTranslate: (html: string, lang: string) => Promise<string>;
}

const HistoryItemCard: React.FC<{ item: HistoryItem; onTranslate: HistoryProps['onTranslate'] }> = ({ item, onTranslate }) => {
    const scoreColor = item.score >= 8 
        ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' 
        : item.score >= 5 
            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' 
            : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
    
    const [translatedContent, setTranslatedContent] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedLang, setSelectedLang] = useState('en');
    const [copyButtonText, setCopyButtonText] = useState('Copy Feedback');

    const stripHtmlFence = (html: string): string => {
        if (!html) return html;
        return html.replace(/```html([\s\S]*?)```/gi, '$1').trim();
    };

    const handleTranslate = async (lang: string) => {
        setSelectedLang(lang);
        if (lang === 'en') {
            setTranslatedContent(null);
            return;
        }
        setIsLoading(true);
        try {
            const translation = await onTranslate(item.feedback, lang);
            setTranslatedContent(translation);
        } catch (e) {
            console.error(e);
            alert("Translation failed");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = () => {
        const contentToCopy = translatedContent || item.feedback;
        const strippedContent = stripHtmlFence(contentToCopy);
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = strippedContent;
        const textToCopy = tempDiv.textContent || tempDiv.innerText || '';

        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopyButtonText('Copied!');
            setTimeout(() => setCopyButtonText('Copy Feedback'), 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy feedback.');
        });
    };

    return (
        <details className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 details-arrow hover:border-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800/80">
            <summary className="flex justify-between items-center p-4 list-none cursor-pointer">
                <div className="flex-grow">
                    <p className="font-semibold text-slate-700 dark:text-slate-300">{item.question}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{new Date(item.timestamp).toLocaleString()}</p>
                </div>
                <div className="ml-4 flex items-center space-x-4">
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${scoreColor}`}>{item.score}/10</span>
                    <ChevronDownIcon className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                </div>
            </summary>
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/50">
                <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
                    <div className="translation-container">
                        <label htmlFor={`translate-select-hist-${item.id}`} className="translation-label">Translate</label>
                        <select
                            id={`translate-select-hist-${item.id}`}
                            value={selectedLang}
                            onChange={(e) => handleTranslate(e.target.value)}
                            disabled={isLoading}
                            className="translation-select"
                        >
                            {SUPPORTED_LANGUAGES.map(lang => (
                                <option key={lang.code} value={lang.code}>{lang.name}</option>
                            ))}
                        </select>
                        {isLoading && <LoaderIcon className="animate-spin" />}
                    </div>
                     <button 
                        onClick={handleCopy} 
                        className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand-light transition-colors flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-200 dark:bg-slate-700/50 hover:bg-slate-300 dark:hover:bg-slate-600"
                        aria-live="polite"
                     >
                        {copyButtonText === 'Copied!' ? <CheckIcon /> : <ClipboardIcon />}
                        {copyButtonText}
                    </button>
                </div>
                <div className="prose prose-sm prose-slate dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: stripHtmlFence(translatedContent || item.feedback) }} />
                <h5 className="font-semibold mt-4 mb-1 text-xs text-slate-600 dark:text-slate-400 uppercase">Your Answer:</h5>
                <p className="text-sm text-slate-600 dark:text-slate-300">{item.transcript}</p>
            </div>
        </details>
    );
};

const History: React.FC<HistoryProps> = ({ history, onClear, onTranslate }) => {
    return (
        <section id="history" className="mb-16 min-h-[20rem] fade-in">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center border-b-2 border-slate-200 dark:border-slate-700 pb-3 mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200">Practice History</h2>
                    <button onClick={onClear} className="group text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500 transition-colors flex items-center gap-1">
                        <Trash2Icon className="transition-transform duration-300 group-hover:animate-shake" />
                        Clear History
                    </button>
                </div>
                <div className="space-y-4">
                    {history.map(item => <HistoryItemCard key={item.id} item={item} onTranslate={onTranslate} />)}
                </div>
            </div>
        </section>
    );
};

export default History;