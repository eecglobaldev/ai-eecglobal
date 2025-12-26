
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import type { HistoryItem, ModalState, Profile } from '../types';
import { generatePrep, analyzeAnswer, translateHtmlContent } from '../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';

import Header from './Header';
import SetupForm from './SetupForm';
import InterviewFlow from './InterviewFlow';
import History from './History';
import Modal from './Modal';
import Footer from './Footer';
import { Separator } from './Separator';
import { KnowledgeHub } from './KnowledgeHub';
import { useAppState } from '../hooks/useAppState';
import { savePrepData, addPracticeHistoryItem } from '../services/prepDataService';
import { getUserIdByEmail, ensureUserSignedIn, incrementPrepPlanCount } from '../services/userService';
import Breadcrumbs from './Breadcrumbs';


const App: React.FC = () => {
    const {
        profile, setProfile,
        prepContent, setPrepContent,
        history, setHistory,
        currentQuestionIndex, setCurrentQuestionIndex,
        isLoadingFromFirestore
    } = useAppState();

    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [progress, setProgress] = useState(0);
    const [isPrepReady, setIsPrepReady] = useState(!!prepContent);

    // Update isPrepReady when prepContent changes (including from Firestore restore)
    useEffect(() => {
        setIsPrepReady(!!prepContent);
    }, [prepContent]);

    // Show loading indicator when fetching from Firestore
    useEffect(() => {
        if (isLoadingFromFirestore) {
            setIsLoading(true);
            setLoadingMessage('Loading your saved data from cloud...');
        } else {
            // Don't clear loading if we're already loading for AI generation
            if (loadingMessage === 'Loading your saved data from cloud...') {
                setIsLoading(false);
                setLoadingMessage('');
            }
        }
    }, [isLoadingFromFirestore]);
    const [timer, setTimer] = useState(0);

    // Initialize theme from localStorage or check document class to match HTML script
    const [theme, setTheme] = useState(() => {
        // SSR guard: localStorage and document are only available in the browser
        if (typeof window === 'undefined') {
            return 'light';
        }

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme;
        // Check if dark class is already applied (from HTML script)
        if (document.documentElement.classList.contains('dark')) {
            return 'dark';
        }
        return 'light';
    });

    const [modalState, setModalState] = useState<ModalState>({
        isOpen: false,
        message: '',
    });

    // Apply and persist theme
    useEffect(() => {
        // SSR guard: document and localStorage are only available in the browser
        if (typeof window === 'undefined') {
            return;
        }

        const root = window.document.documentElement;
        const isDark = theme === 'dark';

        root.classList.remove(isDark ? 'light' : 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Scroll to top on mount/refresh
    useEffect(() => {
        // SSR guard: window is only available in the browser
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }
    }, []);

    // Timer effect for loading screen
    useEffect(() => {
        // SSR guard: window is only available in the browser
        if (typeof window === 'undefined') {
            return;
        }

        let interval: number;
        if (isLoading) {
            setTimer(0); // Reset timer on start
            interval = window.setInterval(() => {
                setTimer(prevTimer => prevTimer + 1);
            }, 1000);
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isLoading]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${minutes}:${secs}`;
    };

    const showModal = useCallback((message: string, isConfirm = false, onConfirm?: () => void) => {
        setModalState({ isOpen: true, message, isConfirm, onConfirm });
    }, []);

    const hideModal = useCallback(() => {
        setModalState({ isOpen: false, message: '' });
    }, []);

    const handleGeneratePrep = async (profileToUse: Profile, options?: { fromSop: boolean }) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const fromSop = options?.fromSop ?? false;

        setIsLoading(true);
        setProgress(10);

        try {
            const content = await generatePrep(profileToUse, (message, p) => {
                setLoadingMessage(message);
                setProgress(p);
            }, { fromSop });

            setPrepContent(content);
            setCurrentQuestionIndex(0);
            setIsPrepReady(true);

            // 💾 Save prep data to localStorage immediately (persists even after logout)
            if (typeof window !== 'undefined') {
                try {
                    const currentState = localStorage.getItem('auVisaCanvasState_v2');
                    const state = currentState ? JSON.parse(currentState) : {};
                    state.prepContent = content;
                    state.currentQuestionIndex = 0;
                    localStorage.setItem('auVisaCanvasState_v2', JSON.stringify(state));
                    console.log('✅ Prep data saved to localStorage');
                } catch (error) {
                    console.error('Failed to save prep data to localStorage:', error);
                }
            }

            // 📊 Increment prep plan count in background
            const userEmail = typeof window !== 'undefined' ? localStorage.getItem('AUgsUserEmail') : null;
            if (userEmail) {
                incrementPrepPlanCount(userEmail).catch(() => {
                    // Silent fail - don't block user experience
                });
            }

            // 💾 Save prep data to Firebase (async, don't block UI)
            savePrepDataToFirebase(content, profileToUse);

            setTimeout(() => {
                const interviewSection = document.getElementById('interview-flow');
                interviewSection?.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        } catch (error) {
            console.error("Prep Generation Failed:", error);
            showModal(error instanceof Error ? error.message : "An unknown error occurred during generation.");
            setIsPrepReady(false); // Reset if generation fails
        } finally {
            setIsLoading(false);
            setLoadingMessage('');
            setProgress(0);
        }
    };

    // 💾 Save prep data to Firebase (runs in background)
    // NOTE: This ONLY saves Key Talking Points after "Start AI Prep"
    // History is saved individually when user clicks "Submit for Feedback"
    const savePrepDataToFirebase = async (content: any, profileToUse: Profile) => {
        // SSR guard: localStorage is only available in the browser
        if (typeof window === 'undefined') {
            return;
        }

        try {
            // Ensure user is signed in
            await ensureUserSignedIn();

            // Get user email from localStorage
            const userEmail = localStorage.getItem('AUgsUserEmail');
            if (!userEmail) {
                return;
            }

            // Get user ID
            const userId = await getUserIdByEmail(userEmail);
            if (!userId) {
                return;
            }

            // Create profile summary for metadata
            const profileSummary = `${profileToUse.courseName} - ${profileToUse.courseLevel} in Australia`;

            // Get SOP filename from localStorage (saved during application submission)
            const sopFileName = localStorage.getItem('lastSavedSopFileName');

            // Save prep data (ONLY Key Talking Points, NO history)
            await savePrepData({
                userId,
                prepContent: content,
                history: [], // Empty - history saved separately on "Submit for Feedback"
                profileSummary,
                sopFileName: sopFileName || undefined, // Link to SOP file
            });
        } catch (error) {
            // Silent fail - don't block user experience
        }
    };

    const handleFormComplete = async (newProfile: Profile) => {
        setProfile(newProfile); // Update global state
        await handleGeneratePrep(newProfile); // Use new profile immediately for generation
    };

    const handleAnalyzeAnswer = async (transcript: string, audioUrl?: string, audioDurationSeconds?: number): Promise<HistoryItem | null> => {
        if (!prepContent?.questions) {
            showModal("Please generate a prep plan first.");
            return null;
        }

        try {
            const questionData = prepContent.questions[currentQuestionIndex];
            const question = questionData.question;
            const questionId = `question_${currentQuestionIndex + 1}`;
            const feedbackData = await analyzeAnswer(profile, question, transcript);

            const newHistoryItem: HistoryItem = {
                ...feedbackData,
                id: Date.now(),
                timestamp: new Date().toISOString(),
                question,
                questionId,
                transcript,
                audioUrl,
                audioDurationSeconds,
            };

            setHistory(prevHistory => {
                const existingIndex = prevHistory.findIndex(h => h.question === newHistoryItem.question);
                const newHistory = [...prevHistory];
                if (existingIndex > -1) {
                    newHistory.splice(existingIndex, 1);
                }
                newHistory.unshift(newHistoryItem);
                return newHistory;
            });

            // Save practice attempt to Firestore (after "Submit for Feedback")
            const userEmail = typeof window !== 'undefined' ? localStorage.getItem('AUgsUserEmail') : null;
            if (userEmail) {
                try {
                    const userId = await getUserIdByEmail(userEmail);
                    if (userId) {
                        await addPracticeHistoryItem(userId, `prep_${Date.now()}`, newHistoryItem);
                    }
                } catch (error) {
                    // Silent fail - don't block user experience
                }
            }

            return newHistoryItem;
        } catch (error) {
            console.error("Failed to analyze answer:", error);
            showModal(error instanceof Error ? error.message : "The AI returned feedback in an unexpected format. Please try again.");
            return null;
        }
    };

    const handleClearHistory = () => {
        showModal("Are you sure you want to clear your entire practice history?", true, () => {
            setHistory([]);
            hideModal();
        });
    };

    return (
        <>
            <Header theme={theme} setTheme={setTheme} />

            <Breadcrumbs />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
                <div id="prep-tool-section">

                    <SetupForm
                        onFormComplete={handleFormComplete}
                        showModal={showModal}
                    />


                    {isPrepReady && prepContent && (
                        <InterviewFlow
                            prepContent={prepContent}
                            currentQuestionIndex={currentQuestionIndex}
                            setCurrentQuestionIndex={setCurrentQuestionIndex}
                            onAnalyzeAnswer={handleAnalyzeAnswer}
                            history={history}
                            onTranslate={translateHtmlContent}
                        />
                    )}
                </div>

                {isLoading && (
                    <div
                        className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
                        role="status"
                        aria-live="polite"
                    >
                        <div className="w-full max-w-2xl mx-auto p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 text-center">
                            <div className="flex justify-between items-center mb-4">
                                <h2 id="loading-heading" className="text-2xl font-bold text-slate-800 dark:text-slate-200 text-left">Building Your Prep Plan...</h2>
                                <div className="font-mono text-lg font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 px-3 py-1 rounded-md">
                                    {formatTime(timer)}
                                </div>
                            </div>

                            <div className="mt-4 h-12 text-slate-600 dark:text-slate-400 text-lg flex items-center justify-center" aria-live="assertive">
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={loadingMessage}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {loadingMessage}
                                    </motion.p>
                                </AnimatePresence>
                            </div>

                            <div
                                role="progressbar"
                                aria-labelledby="loading-heading"
                                aria-valuenow={progress}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mt-4"
                            >
                                <div
                                    className="bg-gradient-to-r from-blue-500 to-teal-500 h-2.5 rounded-full transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                )}

                {isPrepReady && history.length > 0 && (
                    <History
                        history={history}
                        onClear={handleClearHistory}
                        onTranslate={translateHtmlContent}
                    />
                )}

                <Separator glowColor="green-cyan" />
                <KnowledgeHub />
            </main>

            <Modal {...modalState} onCancel={hideModal} />
            <Footer />
        </>
    );
};

export default App;