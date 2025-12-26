import React, { useState, useRef, useEffect } from 'react';
import { PrepContent, HistoryItem, Question } from '../types';
import { MessageSquare, RefreshCw, Volume2, Mic, Save, ArrowRight, BookOpen, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { translateText, transcribeAudio } from '../services/geminiService';
import AutoResizeTextarea from './AutoResizeTextarea';
import { uploadToStorage } from '../services/storageService'; // Updated import
import { ensureUserSignedIn } from '../services/authService';
import { useRecorder } from '../hooks/useRecorder';

interface PracticeSectionProps {
    content: PrepContent | null;
    currentQuestionIndex: number;
    history: HistoryItem[];
    onNextQuestion: () => void;
    onPrevQuestion: () => void;
    onSelectHistoryItem: (item: HistoryItem) => void;
    onSaveFunc: (blob: Blob | null, text: string, question: string) => Promise<void>;
}

const PracticeSection: React.FC<PracticeSectionProps> = ({
    content,
    currentQuestionIndex,
    history,
    onNextQuestion,
    onPrevQuestion,
    onSelectHistoryItem,
    onSaveFunc
}) => {
    const [userAnswer, setUserAnswer] = useState('');
    const [translatedQuestion, setTranslatedQuestion] = useState<string | null>(null);
    const [isTranslating, setIsTranslating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [showTips, setShowTips] = useState(false);

    // Audio State
    const {
        isRecording,
        timer,
        audioBlob,
        startRecording,
        stopRecording,
        reset: resetRecording
    } = useRecorder();

    const [isTranscribing, setIsTranscribing] = useState(false);

    // Derived State - Ensure we always have interview_questions by flattening sections if needed
    const interviewQuestions = content?.interview_questions || content?.sections?.flatMap(s => s.questions || []) || [];
    const currentQuestionItem = interviewQuestions[currentQuestionIndex];
    const currentQuestionText = currentQuestionItem?.question || "";
    // Safe access for tips, handling undefined/null cases efficiently
    const currentTips = currentQuestionItem?.tips
        ? (Array.isArray(currentQuestionItem.tips) ? currentQuestionItem.tips : [currentQuestionItem.tips])
        : [];

    const hasAudio = !!audioBlob;

    // Reset local state when question changes
    useEffect(() => {
        setUserAnswer('');
        setTranslatedQuestion(null);
        resetRecording();
        setSaveStatus('idle');
        setShowTips(false);
    }, [currentQuestionIndex, content, resetRecording]);

    const handleTranslate = async () => {
        if (!currentQuestionText) return;
        setIsTranslating(true);
        try {
            const translation = await translateText(currentQuestionText, 'gu'); // Default to Gujarati
            setTranslatedQuestion(translation);
        } catch (error) {
            console.error("Translation failed", error);
        } finally {
            setIsTranslating(false);
        }
    };

    const handleTranscribe = async () => {
        if (!audioBlob) return;
        setIsTranscribing(true);
        try {
            const text = await transcribeAudio(audioBlob);
            setUserAnswer(prev => prev + (prev ? ' ' : '') + text);
        } catch (error) {
            console.error("Transcription failed", error);
            alert("Could not transcribe audio. Please try again.");
        } finally {
            setIsTranscribing(false);
        }
    };

    const handleSave = async () => {
        if ((!userAnswer.trim() && !audioBlob)) {
            alert("Please record an audio answer or type your response before saving.");
            return;
        }

        setIsSaving(true);
        setSaveStatus('idle');
        try {
            await onSaveFunc(audioBlob, userAnswer, currentQuestionText);
            setSaveStatus('success');
            // Optional: Auto-advance after short delay? 
            // setTimeout(onNextQuestion, 1500); 
        } catch (error) {
            console.error("Error in handleSave:", error);
            setSaveStatus('error');
        } finally {
            setIsSaving(false);
        }
    };

    if (!content) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 h-64">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mb-4">
                    <BookOpen size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">No Prep Content Yet</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-md">Generate your personalized interview plan to start practicing.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="practice-section">
            {/* Main Practice Area */}
            <div className="lg:col-span-8 space-y-6">

                {/* Question Card */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
                    <div className="p-6 md:p-8">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-6">
                            <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold tracking-wide uppercase">
                                Question {currentQuestionIndex + 1} of {interviewQuestions.length}
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleTranslate}
                                    disabled={isTranslating || !!translatedQuestion}
                                    className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors disabled:opacity-50"
                                    title="Translate to Gujarati/Hindi"
                                >
                                    <RefreshCw size={18} className={isTranslating ? "animate-spin" : ""} />
                                </button>
                            </div>
                        </div>

                        {/* Question Text */}
                        <div className="mb-8">
                            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                                {currentQuestionText}
                            </h3>
                            {translatedQuestion && (
                                <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-l-4 border-amber-400 text-lg text-slate-700 dark:text-slate-300 font-medium">
                                    {translatedQuestion}
                                </div>
                            )}
                        </div>

                        {/* Tips Accordion - Improved Visibility */}
                        {currentTips.length > 0 && (
                            <div className="mb-6">
                                <button
                                    onClick={() => setShowTips(!showTips)}
                                    className="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors mb-2 focus:outline-none"
                                >
                                    {showTips ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    {showTips ? "Hide Expert Tips" : "Show Expert Tips"}
                                </button>

                                {showTips && (
                                    <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-5 border border-indigo-100 dark:border-indigo-800 animate-fadeIn">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 min-w-[20px] text-indigo-600 dark:text-indigo-400">
                                                <AlertCircle size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-indigo-900 dark:text-indigo-200 mb-2 text-sm uppercase tracking-wide">
                                                    How to Answer
                                                </h4>
                                                <ul className="space-y-2">
                                                    {currentTips.map((tip, idx) => (
                                                        <li key={idx} className="text-indigo-800 dark:text-indigo-300 text-base leading-relaxed flex gap-2">
                                                            <span className="font-bold">•</span>
                                                            {tip}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Tips (Original context/talking points if available separately or combined) 
                            The current 'questions' structure has 'tips'. 
                            Sometimes 'context' or 'key_points' might be available in other data structures, 
                            but based on types, we rely on 'tips'.
                        */}

                        {/* Input Area */}
                        <div className="space-y-4">
                            <div className="relative">
                                <AutoResizeTextarea
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    placeholder="Type your answer here or transcribe from your recording..."
                                    className="w-full p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all md:text-lg resize-none"
                                    style={{ minHeight: '120px' }}
                                />
                                {hasAudio && !isRecording && (
                                    <button
                                        onClick={handleTranscribe}
                                        disabled={isTranscribing}
                                        className="absolute bottom-3 right-3 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 shadow-sm px-2 py-1 rounded hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-1 text-slate-600 dark:text-slate-300"
                                    >
                                        <MessageSquare size={12} />
                                        {isTranscribing ? 'Transcribing...' : 'Transcribe to Text'}
                                    </button>
                                )}
                            </div>

                            {/* Recorder Controls */}
                            <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800/80 p-3 rounded-xl">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={isRecording ? stopRecording : startRecording}
                                        className={`flex items-center justify-center w-12 h-12 rounded-full transition-all shadow-md ${isRecording
                                            ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                                            : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600'
                                            }`}
                                        title={isRecording ? "Stop Recording" : "Start Recording"}
                                    >
                                        <div className={`transition-transform duration-200 ${isRecording ? 'scale-110' : 'scale-100'}`}>
                                            {isRecording ? <div className="w-4 h-4 bg-white rounded-sm" /> : <Mic size={24} />}
                                        </div>
                                    </button>
                                    <div className="text-sm font-mono font-medium text-slate-600 dark:text-slate-400 min-w-[60px]">
                                        {timer ? (
                                            <span className="text-red-500">{timer}</span>
                                        ) : "00:00"}
                                    </div>
                                </div>
                                {hasAudio && (
                                    <div className="flex items-center gap-2">
                                        <audio src={window.URL.createObjectURL(audioBlob)} controls className="h-8 w-32 md:w-48" />
                                        <button
                                            onClick={resetRecording}
                                            className="text-slate-400 hover:text-red-500 p-1"
                                            title="Delete Recording"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="bg-slate-50 dark:bg-slate-800/80 px-6 md:px-8 py-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                        <button
                            onClick={onPrevQuestion}
                            disabled={currentQuestionIndex === 0}
                            className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-medium text-sm transition-colors disabled:opacity-30 flex items-center gap-1"
                        >
                            <ChevronDown size={16} className="rotate-90" /> Previous
                        </button>

                        <button
                            onClick={handleSave}
                            disabled={isSaving || isRecording || (!userAnswer.trim() && !hasAudio)}
                            className={`
                                flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold shadow-sm transition-all
                                ${saveStatus === 'success'
                                    ? 'bg-green-600 text-white'
                                    : 'bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-slate-300 disabled:dark:bg-slate-700 disabled:text-slate-500'
                                }
                            `}
                        >
                            {isSaving ? (
                                <>
                                    <RefreshCw size={18} className="animate-spin" /> Saving...
                                </>
                            ) : saveStatus === 'success' ? (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    Saved!
                                </>
                            ) : (
                                <>
                                    <Save size={18} /> Save Answer
                                </>
                            )}
                        </button>

                        <button
                            onClick={onNextQuestion}
                            disabled={currentQuestionIndex === interviewQuestions.length - 1}
                            className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-medium text-sm transition-colors disabled:opacity-30 flex items-center gap-1"
                        >
                            Next <ChevronDown size={16} className="-rotate-90" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Sidebar / Navigation & History */}
            <div className="lg:col-span-4 space-y-6">

                {/* Progress / Navigation */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow border border-slate-200 dark:border-slate-700 p-5">
                    <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center justify-between">
                        <span>Interview Progress</span>
                        <span className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-slate-600 dark:text-slate-400">
                            {Math.round(((currentQuestionIndex + 1) / interviewQuestions.length) * 100)}%
                        </span>
                    </h4>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-6">
                        <div
                            className="bg-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${((currentQuestionIndex + 1) / interviewQuestions.length) * 100}%` }}
                        ></div>
                    </div>

                    <div className="grid grid-cols-5 gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                        {interviewQuestions.map((_, idx) => {
                            const isCurrent = idx === currentQuestionIndex;
                            // Check if this question has been answered in history (this is a simplified check)
                            // Ideally, practice history needs to be correlated with question IDs or similar.
                            // For now, we'll just style current vs others clearly.
                            return (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        if (idx !== currentQuestionIndex) {
                                            // onNextQuestion/Prev logic is sequential in parent, 
                                            // we might need a jumpToQuestion handler ideally.
                                            // Assuming parent handles state if we just had a way to specific index. 
                                            // Since props only have next/prev, we can simulate or just use this for visual only 
                                            // if we can't jump. However, standard specific jump is better.
                                            // For this migration, I will preserve existing prop interface but user can 
                                            // use next/prev.
                                            // Actually, checking previous code, the App.tsx likely manages index.
                                            // But PracticeSection props don't have onIndexChange.
                                            // The user can just use next/prev for now.
                                        }
                                    }}
                                    className={`
                                        h-8 w-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-all
                                        ${isCurrent
                                            ? 'bg-indigo-600 text-white ring-2 ring-indigo-200 dark:ring-indigo-900'
                                            : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                                        }
                                    `}
                                    title={`Go to Question ${idx + 1}`}
                                >
                                    {idx + 1}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* History List */}
                {history.length > 0 && (
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow border border-slate-200 dark:border-slate-700 p-5 flex flex-col max-h-[500px]">
                        <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                            <RefreshCw size={16} /> Recent Practice
                        </h4>
                        <div className="overflow-y-auto space-y-3 custom-scrollbar flex-grow pr-1">
                            {history.slice().reverse().map((item, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => onSelectHistoryItem(item)}
                                    className="p-3 rounded-lg border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-indigo-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer transition-all group"
                                >
                                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 line-clamp-2 mb-2 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
                                        {item.question}
                                    </p>
                                    <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                                        <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                                        <div className="flex items-center gap-2">
                                            {item.audioUrl && <Volume2 size={12} className="text-indigo-500" />}
                                            {item.transcript && <MessageSquare size={12} className="text-emerald-500" />}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PracticeSection;
