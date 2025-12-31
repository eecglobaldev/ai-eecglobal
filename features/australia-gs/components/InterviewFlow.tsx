import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import type { PrepContent, HistoryItem } from '../types';
import { transcribeAudio } from '../services/geminiService';
import { SUPPORTED_LANGUAGES } from '../services/constants';
import { uploadToStorage } from '../services/studentApplicationService';
import { ensureUserSignedIn } from '../services/authService';
import { useRecorder } from '../hooks/useRecorder';

// --- NEW ICONS from Lucide library ---
const MicIcon: React.FC<{ className?: string }> = ({ className }) => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>;
const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6"/></svg>;
const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>;
const LoaderCircleIcon: React.FC<{ className?: string }> = ({ className }) => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>;
const BookOpenIcon: React.FC<{ className?: string }> = ({ className }) => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;


interface InterviewFlowProps {
    prepContent: PrepContent;
    currentQuestionIndex: number;
    setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
    // Optional second/third args carry audio metadata (URL + duration)
    onAnalyzeAnswer: (transcript: string, audioUrl?: string, audioDurationSeconds?: number) => Promise<HistoryItem | null>;
    history: HistoryItem[];
    onTranslate: (html: string, lang: string) => Promise<string>;
}

// Sub-component for translation controls and content
const TranslatableContent: React.FC<{ contentId: string; htmlContent: string; onTranslate: InterviewFlowProps['onTranslate'] }> = ({ contentId, htmlContent, onTranslate }) => {
    const [translatedContent, setTranslatedContent] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedLang, setSelectedLang] = useState('en');
    const originalContentRef = useRef(htmlContent);

    const stripHtmlFence = (html: string): string => {
        if (!html) return html;
        return html.replace(/```html([\s\S]*?)```/gi, '$1').trim();
    };

    useEffect(() => {
        originalContentRef.current = htmlContent;
        setTranslatedContent(null);
        setSelectedLang('en');
    }, [htmlContent]);

    const handleTranslate = async (lang: string) => {
        setSelectedLang(lang);
        if (lang === 'en') {
            setTranslatedContent(null);
            return;
        }
        setIsLoading(true);
        try {
            const translation = await onTranslate(originalContentRef.current, lang);
            setTranslatedContent(translation);
        } catch (e) {
            console.error(e);
            alert("Translation failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="flex justify-end items-center gap-2 mb-4">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300 hidden sm:inline">Translate:</span>
                <button 
                    onClick={() => handleTranslate('en')} 
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 ${
                        selectedLang === 'en' 
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30' 
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                    }`} 
                    disabled={isLoading}
                >
                    English
                </button>
                <button 
                    onClick={() => handleTranslate('hi')} 
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 ${
                        selectedLang === 'hi' 
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30' 
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                    }`} 
                    disabled={isLoading}
                >
                    हिन्दी
                </button>
                <button 
                    onClick={() => handleTranslate('gu')} 
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 ${
                        selectedLang === 'gu' 
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30' 
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                    }`} 
                    disabled={isLoading}
                >
                    ગુજરાતી
                </button>
                {isLoading && <LoaderCircleIcon className="animate-spin h-4 w-4 text-indigo-600 dark:text-indigo-400"/>}
            </div>
            <div dangerouslySetInnerHTML={{ __html: stripHtmlFence(translatedContent || htmlContent) }} />
        </>
    );
};

// --- NEW: Sub-component for score display ---
const ScoreDisplay: React.FC<{ score: number }> = ({ score }) => {
    const [animatedScore, setAnimatedScore] = useState(0);

    const scoreData = useMemo(() => {
        if (score >= 8) {
            return {
                label: 'Excellent',
                range: '8-10',
                colorClass: 'text-green-500 dark:text-green-400',
                bgClass: 'bg-green-100 dark:bg-green-900/40',
                strokeColor: '#22c55e', // green-500
            };
        }
        if (score >= 5) {
            return {
                label: 'Borderline',
                range: '5-7',
                colorClass: 'text-yellow-500 dark:text-yellow-400',
                bgClass: 'bg-yellow-100 dark:bg-yellow-900/40',
                strokeColor: '#eab308', // yellow-500
            };
        }
        return {
            label: 'Fail',
            range: '1-4',
            colorClass: 'text-red-600 dark:text-red-500',
            bgClass: 'bg-red-100 dark:bg-red-900/40',
            strokeColor: '#ef4444', // red-500
        };
    }, [score]);

    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const [offset, setOffset] = useState(circumference);
    
    useEffect(() => {
        const finalOffset = circumference - (score / 10) * circumference;
        const timer = setTimeout(() => setOffset(finalOffset), 100);

        let startTimestamp: number | null = null;
        const duration = 1500;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setAnimatedScore(Math.floor(progress * score));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                 setAnimatedScore(score);
            }
        };
        const animFrame = window.requestAnimationFrame(step);

        return () => {
            clearTimeout(timer);
            window.cancelAnimationFrame(animFrame);
        };
    }, [score, circumference]);

    return (
        <div 
            className="flex items-center gap-3" 
            role="img" 
            aria-label={`Score: ${score} out of 10. Rating: ${scoreData.label}.`}
        >
            <div className="relative h-24 w-24 flex-shrink-0">
                <svg className="absolute inset-0" width="96" height="96" viewBox="0 0 120 120">
                    <circle
                        className="text-slate-200 dark:text-slate-700"
                        strokeWidth="10"
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="60"
                        cy="60"
                    />
                    <circle
                        strokeWidth="10"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        stroke={scoreData.strokeColor}
                        fill="transparent"
                        r={radius}
                        cx="60"
                        cy="60"
                        style={{
                            transform: 'rotate(-90deg)',
                            transformOrigin: '50% 50%',
                            transition: 'stroke-dashoffset 1.5s cubic-bezier(0.65, 0, 0.35, 1)',
                        }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-slate-800 dark:text-slate-100">{animatedScore}</span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">/ 10</span>
                </div>
            </div>
            <div className={`px-3 py-2 rounded-lg ${scoreData.bgClass}`}>
                <p className={`font-bold text-base ${scoreData.colorClass}`}>{scoreData.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Score: {scoreData.range}</p>
            </div>
        </div>
    );
};


// Sub-component for Practice Area
const PracticeArea: React.FC<Pick<InterviewFlowProps, 'onAnalyzeAnswer' | 'history' | 'currentQuestionIndex' | 'prepContent' | 'onTranslate'>> = ({ onAnalyzeAnswer, history, currentQuestionIndex, prepContent, onTranslate }) => {
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [firebaseAudioUrl, setFirebaseAudioUrl] = useState<string | null>(null);
    const [micError, setMicError] = useState<string | null>(null);
    const [transcript, setTranscript] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [latestFeedback, setLatestFeedback] = useState<HistoryItem | null>(null);
    // Duration captured from <audio> element metadata (as per guide)
    const [audioDurationSeconds, setAudioDurationSeconds] = useState<number | null>(null);
    
    const transcriptTextareaRef = useRef<HTMLTextAreaElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // --- NEW: Dynamic loading messages for analysis ---
    const [analyzingMessage, setAnalyzingMessage] = useState('');
    const analysisMessages = [
        'Analyzing tone and confidence...',
        'Cross-referencing with your profile...',
        'Evaluating against GS criteria...',
        'Assessing clarity and directness...',
        'Compiling feedback and score...'
    ];
    
    useEffect(() => {
        let interval: number;
        if (isAnalyzing) {
            setAnalyzingMessage(analysisMessages[0]);
            let i = 1;
            interval = window.setInterval(() => {
                setAnalyzingMessage(analysisMessages[i % analysisMessages.length]);
                i++;
            }, 1800); // Change message every 1.8 seconds
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isAnalyzing]);


    const handleUploadToFirebase = useCallback(async (blob: Blob, mimeType: string) => {
        try {
            const user = await ensureUserSignedIn();
            const timestamp = Date.now();
            const fileExtension = mimeType.includes('webm') ? 'webm' : mimeType.includes('mp4') ? 'mp4' : 'ogg';
            const storagePath = `student_audio/${user.uid}/audio_${timestamp}.${fileExtension}`;
            const downloadURL = await uploadToStorage(blob, storagePath);
            setFirebaseAudioUrl(downloadURL);
            // console.log('Audio uploaded to Firebase Storage:', downloadURL);
        } catch (error) {
            console.error('Failed to upload audio to Firebase Storage:', error);
            // Non-blocking: preview + transcription will still work even if upload fails.
        }
    }, []);

    const {
        isRecording,
        isProcessing,
        audioBlob,
        audioUrl,
        error,
        timer,
        isBusy: recorderBusy,
        startRecording,
        stopRecording,
        reset: resetRecorder,
    } = useRecorder({ onUpload: handleUploadToFirebase });

    // Surface recorder errors in the existing micError UI slot
    useEffect(() => {
        if (error) {
            setMicError(error);
        }
    }, [error]);

    useEffect(() => {
        const questionText = prepContent.questions[currentQuestionIndex].question;
        const historyItem = history.find(h => h.question === questionText);
        setLatestFeedback(historyItem || null);

        // Reset state for new question
        resetRecorder();
        setTranscript('');
        setFirebaseAudioUrl(null);
        setMicError(null);
        setAudioDurationSeconds(null);

    }, [currentQuestionIndex, prepContent, history, resetRecorder]);


    // Helper to format seconds as mm:ss (e.g., 0:05, 1:34)
    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Keep transcript textarea height in sync with its content
    useEffect(() => {
        const el = transcriptTextareaRef.current;
        if (!el) return;
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
    }, [transcript]);

    // Enhanced duration capture with multiple event listeners and retry (per AUDIO_DURATION_FIX_GUIDE.md)
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !audioUrl) return;

        const updateDuration = () => {
            if (audio.duration && isFinite(audio.duration)) {
                setAudioDurationSeconds(Math.round(audio.duration));
            }
        };

        // Try multiple events to catch duration
        audio.addEventListener("loadedmetadata", updateDuration);
        audio.addEventListener("durationchange", updateDuration);
        audio.addEventListener("canplay", updateDuration);
        audio.addEventListener("loadeddata", updateDuration);

        // Retry mechanism with max attempts
        let retryCount = 0;
        const maxRetries = 100;
        const retryInterval = setInterval(() => {
            if (audio.duration && isFinite(audio.duration)) {
                setAudioDurationSeconds(Math.round(audio.duration));
                clearInterval(retryInterval);
            } else if (retryCount++ >= maxRetries) {
                clearInterval(retryInterval);
            }
        }, 100);

        return () => {
            audio.removeEventListener("loadedmetadata", updateDuration);
            audio.removeEventListener("durationchange", updateDuration);
            audio.removeEventListener("canplay", updateDuration);
            audio.removeEventListener("loadeddata", updateDuration);
            clearInterval(retryInterval);
        };
    }, [audioUrl]);

    const blobToBase64 = (blob: Blob): Promise<string> => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });

    const handleTranscribe = async () => {
        if (!audioBlob) return;
        setIsTranscribing(true);
        setMicError(null);
        try {
            const base64Audio = await blobToBase64(audioBlob);
            const transcribedText = await transcribeAudio(base64Audio, audioBlob.type);
            
            if (transcribedText.startsWith("Could not transcribe audio")) {
                setMicError(transcribedText);
                setTranscript('');
            } else {
                setTranscript(transcribedText);
                // Keep audioUrl so the player remains visible after transcription
            }
        } catch (error) {
            console.error("Transcription failed:", error);
            setMicError(error instanceof Error ? error.message : "Transcription failed. Please try again.");
            setTranscript('');
        } finally {
            setIsTranscribing(false);
        }
    };
    
    const handleSubmitForFeedback = async () => {
        if (!transcript.trim()) return;
        setIsAnalyzing(true);
        // Pass the Firebase audio URL (if available) so it can be saved in practice history
        const feedback = await onAnalyzeAnswer(
            transcript.trim(),
            firebaseAudioUrl || undefined,
            audioDurationSeconds ?? undefined
        );
        if (feedback) {
            setLatestFeedback(feedback);
        }
        setIsAnalyzing(false);
    };

    const isBusy = recorderBusy || isTranscribing || isAnalyzing || isProcessing;

    return (
         <>
            <div className="text-center py-4">
                    <button
                    id="record-btn"
                    onClick={isRecording ? stopRecording : startRecording}
                    disabled={isTranscribing || isAnalyzing}
                    className={`relative bg-red-500 text-white font-semibold py-4 px-8 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-slate-800 transition-all transform hover:scale-105 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center mx-auto gap-3 min-w-[12rem] ${isRecording ? 'recording-pulse' : ''}`}
                >
                    <MicIcon className="h-6 w-6" />
                    <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
                </button>
                {timer && <p className="text-slate-500 dark:text-slate-400 mt-4 h-6 font-mono">{timer}</p>}
                {micError && <p className="mt-4 text-sm text-red-600 dark:text-red-400">{micError}</p>}
            </div>

            {!isRecording && audioUrl && !transcript && (
                 <div className="mt-4 text-center p-4 bg-slate-100 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Recording complete. Ready to transcribe.</p>
                    {/* {firebaseAudioUrl && (
                        <p className="text-xs text-green-600 dark:text-green-400 mb-2">✓ Audio saved to cloud storage</p>
                    )} */}
                    <audio
                        ref={audioRef}
                        key={audioUrl}
                        controls
                        src={audioUrl}
                        preload="metadata"
                        crossOrigin="anonymous"
                        className="w-full"
                    />
                    {audioDurationSeconds !== null && (
                        <div className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                            0:00 / {formatTime(audioDurationSeconds)}
                        </div>
                    )}
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <button onClick={startRecording} disabled={isBusy} className="flex-1 bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-xl hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500 disabled:opacity-50">
                            Record Again
                        </button>
                        <button onClick={handleTranscribe} disabled={isTranscribing || isAnalyzing} className="flex-1 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-500 disabled:bg-slate-400 dark:disabled:bg-slate-600">
                             {isTranscribing ? 'Transcribing...' : 'Transcribe Audio'}
                        </button>
                    </div>
                </div>
            )}
            
            {transcript && (
                <div className="mt-4">
                    <label htmlFor="transcript-textarea" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Your Answer Transcript (edit if needed):</label>
                    <textarea
                        id="transcript-textarea"
                        ref={transcriptTextareaRef}
                        value={transcript}
                        onChange={(e) => setTranscript(e.target.value)}
                        className="w-full min-h-[150px] p-4 bg-slate-100 dark:bg-slate-700 border dark:text-slate-200 border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-brand dark:focus:ring-brand-light overflow-hidden"
                        rows={5}
                        disabled={isBusy}
                    />
                    {isAnalyzing ? (
                        <div className="analysis-indicator flex flex-col items-center justify-center py-6" role="status">
                            <LoaderCircleIcon className="animate-spin w-10 h-10 text-brand mb-3" />
                            <p className="text-base font-semibold text-slate-700 dark:text-slate-200">{analyzingMessage}</p>
                        </div>
                    ) : (
                        <button onClick={handleSubmitForFeedback} disabled={isBusy || !transcript.trim()} className="mt-4 w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-500 disabled:bg-slate-400 dark:disabled:bg-slate-600">
                            Submit for Feedback
                        </button>
                    )}
                </div>
            )}

            {latestFeedback && (
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-700 mt-6 fade-in transition-all duration-300">
                    {/* Header with title and score */}
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200">
                            Detailed Feedback Analysis
                        </h4>
                        <div className="flex-shrink-0 ml-3">
                            <ScoreDisplay score={latestFeedback.score} />
                        </div>
                    </div>
                    
                    {/* Feedback content */}
                    <div className="prose prose-slate dark:prose-invert max-w-none prose-sm mb-6">
                        <TranslatableContent 
                            contentId={`fb-${latestFeedback.id}`} 
                            htmlContent={latestFeedback.feedback} 
                            onTranslate={onTranslate} 
                        />
                    </div>
                    
                    {/* Transcript section */}
                    <div>
                        <h5 className="font-semibold mb-2 text-slate-700 dark:text-slate-300 text-sm">
                            Your Answer Transcript:
                        </h5>
                        <p className="text-sm p-3 bg-white dark:bg-slate-700 rounded-md border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300">
                            {latestFeedback.transcript}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-3 text-right">
                            Analyzed on: {new Date(latestFeedback.timestamp).toLocaleString()}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};


const InterviewFlow: React.FC<InterviewFlowProps> = ({ prepContent, currentQuestionIndex, setCurrentQuestionIndex, onAnalyzeAnswer, history, onTranslate }) => {
    const [activeTab, setActiveTab] = useState<'guidance' | 'practice'>('guidance');
    const { questions, keyTalkingPoints } = prepContent;
    const currentQuestionData = questions[currentQuestionIndex];

    const [translatedContent, setTranslatedContent] = useState<{ question: string; modelAnswer: string; guidance: string; } | null>(null);
    const [isTranslating, setIsTranslating] = useState(false);
    const [selectedBulkLang, setSelectedBulkLang] = useState('en');

    useEffect(() => {
        setTranslatedContent(null);
        setSelectedBulkLang('en');
        setIsTranslating(false);
    }, [currentQuestionIndex]);

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setActiveTab('guidance');
        }
    };
    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
            setActiveTab('guidance');
        }
    };
    
    const handleTranslateAll = async (lang: string) => {
        setSelectedBulkLang(lang);
        if (isTranslating) return;
        if (lang === 'en') {
            setTranslatedContent(null);
            return;
        }

        setIsTranslating(true);
        
        const delimiter = "<!--[--DELIMITER--]-->";
        const combinedContent = [
            currentQuestionData.question,
            currentQuestionData.modelAnswer,
            currentQuestionData.guidance
        ].join(delimiter);

        try {
            const translation = await onTranslate(combinedContent, lang);
            const parts = translation.split(delimiter);
            if (parts.length === 3) {
                setTranslatedContent({
                    question: parts[0],
                    modelAnswer: parts[1],
                    guidance: parts[2],
                });
            } else {
                throw new Error("Translation parsing failed.");
            }
        } catch (e) {
            console.error(e);
            alert("Translation failed. Please try again.");
            setTranslatedContent(null);
        } finally {
            setIsTranslating(false);
        }
    };


    return (
        <section id="interview-flow" className="my-16 fade-in">
            <div className="max-w-4xl mx-auto">
                <div className="mb-12 p-6 sm:p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700">
                     <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-3 -mt-2">Your Key Talking Points</h2>
                     <div className="prose prose-slate dark:prose-invert max-w-none">
                        <TranslatableContent contentId="key-talking-points" htmlContent={keyTalkingPoints} onTranslate={onTranslate} />
                     </div>
                </div>
                
                <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200/80 dark:border-slate-700 transition-shadow duration-300 hover:shadow-xl dark:hover:shadow-cyan-500/10">
                    <div className="flex justify-between items-center mb-6">
                         <h3 className="text-lg font-bold text-brand dark:text-brand-light">Question {currentQuestionIndex + 1} of {questions.length}</h3>
                        <div className="flex items-center gap-2">
                             <button onClick={handlePrev} disabled={currentQuestionIndex === 0} className="group p-2 rounded-md hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700 disabled:opacity-50" aria-label="Previous Question">
                                 <ChevronLeftIcon className="transition-transform duration-300 group-hover:-translate-x-1" />
                             </button>
                             <button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1} className="group p-2 rounded-md dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50" aria-label="Next Question">
                                 <ChevronRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </div>
                    </div>
                    
                    <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2" dangerouslySetInnerHTML={{ __html: translatedContent?.question || currentQuestionData.question }}></p>

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6" role="tablist" aria-label="Interview Preparation Section">
                        {/* Model Answer Button */}
                        <button 
                            id="tab-guidance"
                            role="tab"
                            aria-selected={activeTab === 'guidance'}
                            aria-controls="panel-guidance"
                            onClick={() => setActiveTab('guidance')}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-4 text-left ${
                                activeTab === 'guidance' 
                                ? 'bg-blue-50 dark:bg-blue-900/40 border-blue-500 shadow-lg' 
                                : 'bg-slate-50 dark:bg-slate-800/50 border-transparent hover:border-blue-300 dark:hover:border-blue-700'
                            }`}
                        >
                            <div className={`flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-lg ${
                                activeTab === 'guidance' ? 'bg-blue-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-blue-600 dark:text-blue-400'
                            }`}>
                                <BookOpenIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-slate-200">Model Answer & Guidance</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Study the expert-written answer.</p>
                            </div>
                        </button>

                        {/* Practice Button */}
                        <button 
                            id="tab-practice"
                            role="tab"
                            aria-selected={activeTab === 'practice'}
                            aria-controls="panel-practice"
                            onClick={() => setActiveTab('practice')}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-4 text-left ${
                                activeTab === 'practice' 
                                ? 'bg-red-50 dark:bg-red-900/40 border-red-500 shadow-lg' 
                                : 'bg-slate-50 dark:bg-slate-800/50 border-transparent hover:border-red-300 dark:hover:border-red-700'
                            }`}
                        >
                            <div className={`flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-lg ${
                                activeTab === 'practice' ? 'bg-red-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-red-600 dark:text-red-400'
                            }`}>
                                <MicIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-slate-200">Practice Your Answer</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Record your voice & get AI feedback.</p>
                            </div>
                        </button>
                    </div>

                    <div className="min-h-[300px]">
                        {activeTab === 'guidance' && (
                            <div id="panel-guidance" role="tabpanel" tabIndex={0} aria-labelledby="tab-guidance">
                                <div className="flex justify-end items-center gap-2 mb-4">
                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300 hidden sm:inline">Translate:</span>
                                    <button 
                                        onClick={() => handleTranslateAll('en')} 
                                        className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 ${
                                            selectedBulkLang === 'en' 
                                                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30' 
                                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                                        }`} 
                                        disabled={isTranslating}
                                    >
                                        English
                                    </button>
                                    <button 
                                        onClick={() => handleTranslateAll('hi')} 
                                        className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 ${
                                            selectedBulkLang === 'hi' 
                                                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30' 
                                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                                        }`} 
                                        disabled={isTranslating}
                                    >
                                        हिन्दी
                                    </button>
                                    <button 
                                        onClick={() => handleTranslateAll('gu')} 
                                        className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 ${
                                            selectedBulkLang === 'gu' 
                                                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30' 
                                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                                        }`} 
                                        disabled={isTranslating}
                                    >
                                        ગુજરાતી
                                    </button>
                                    {isTranslating && <LoaderCircleIcon className="animate-spin h-4 w-4 text-indigo-600 dark:text-indigo-400" />}
                                </div>
                                
                                <div className="prose prose-slate dark:prose-invert max-w-none">
                                    <div>
                                        <h4 className='font-bold mb-2'>Model Answer</h4>
                                        <div dangerouslySetInnerHTML={{ __html: translatedContent?.modelAnswer || currentQuestionData.modelAnswer }} />
                                    </div>
                                    <div className="mt-2">
                                        <h4 className='font-bold'>Guidance</h4>
                                        <div dangerouslySetInnerHTML={{ __html: translatedContent?.guidance || currentQuestionData.guidance }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'practice' && (
                             <div id="panel-practice" role="tabpanel" tabIndex={0} aria-labelledby="tab-practice">
                                <PracticeArea 
                                    onAnalyzeAnswer={onAnalyzeAnswer}
                                    history={history}
                                    currentQuestionIndex={currentQuestionIndex}
                                    prepContent={prepContent}
                                    onTranslate={onTranslate}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InterviewFlow;