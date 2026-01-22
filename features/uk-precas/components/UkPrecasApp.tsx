'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { UNIVERSITIES, COURSE_LEVELS, AUTH_MODAL_EVENT, DASHBOARD_URL } from '../constants';
import { StudentProfile, PrepContent, HistoryItem, Question } from '../types';
import * as geminiService from '../services/geminiService';
import { BranchLocator } from './BranchLocator';
import { GeoAeoContentSections } from './GeoAeoContentSections';
import LoginSignupModal from './LoginSignupModel';
import AuthGateModal from './AuthGateModal';
import { getUserByEmail, incrementPrepPlanCount, getUserIdByEmail, ensureUserSignedIn } from '../services/userService';
import { saveAcademicPlan } from '../services/academicPlanService';
import { savePrepData, addPracticeHistoryItem, getUserPrepData } from '../services/prepDataService';
import { uploadToStorage } from '../services/studentApplicationService';
import { sendRegistrationNotificationEmailsUniversal } from '../services/emailService';
import { auth } from '@/features/shared/lib/firebase';
import { onAuthStateChanged, type Auth } from 'firebase/auth';
import { useAppState } from '../services/hooks/useAppState';
import Footer from './Footer';

// Premium Lucide Icons - 100 UI Expert Team Selection
import {
    Sun, Moon, GraduationCap, Sparkles, ChevronDown, ChevronLeft, ChevronRight,
    LayoutDashboard, LogIn, RefreshCcw, Trash2, Mic, MicOff, Play, Square,
    Languages, Check, X, Star, Clock, Award, Target, Zap, BookOpen, Users,
    TrendingUp, Shield, FileText, MessageSquare, Volume2, VolumeX, Loader2,
    ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Info, HelpCircle,
    Lightbulb, Brain, Rocket, Medal, Crown, Flame, Heart, ThumbsUp,
    Search, Briefcase, StopCircle, CircleDot, Send, BarChart3, Copy,
    PlayCircle, PauseCircle, RotateCcw, History, Wand2, Edit3, Eye, PenTool
} from 'lucide-react';
import CardsComponent from './CardsComponent';
import { FinalCTA } from './FinalCTA';
import Breadcrumbs from './Breadcrumbs';


const initialProfile: StudentProfile = {
    university: '',
    courseLevel: '',
    course: '',
    previousQualification: '',
    fundingSource: 'Family Savings',
    sponsorOccupation: '',
    careerGoals: '',
    studyGap: '',
};

// --- Helper Components defined outside App to prevent re-creation ---

interface ProgressBarProps {
    isLoading: boolean;
}
const IndeterminateProgressBar: React.FC<ProgressBarProps> = ({ isLoading }) => {
    if (!isLoading) return null;
    return (
        <div className="relative w-full h-1.5 bg-slate-200/50 dark:bg-slate-700/50 rounded-full overflow-hidden">
            <div className="absolute inset-0 w-1/3 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-full animate-progress-slide shadow-lg shadow-indigo-500/30" />
        </div>
    );
};

interface PercentageProgressBarProps {
    progress: number;
    text: string;
    isVisible: boolean;
}
const PercentageProgressBar: React.FC<PercentageProgressBarProps> = ({ progress, text, isVisible }) => {
    if (!isVisible) return null;
    return (
        <div className="mt-6 space-y-3">
            <div className="relative w-full h-3 bg-slate-200/50 dark:bg-slate-700/30 rounded-full overflow-hidden border border-slate-200/30 dark:border-slate-600/30">
                <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-full transition-all duration-300 ease-out shadow-lg shadow-indigo-500/40"
                    style={{ width: `${progress}%` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-shimmer" />
                </div>
            </div>
            <div className="flex items-center justify-center gap-3">
                <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
                    <span className="text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">{text}</span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">Generating prep...</span>
            </div>
        </div>
    );
}

interface ModalProps {
    message: string;
    isConfirm: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    isVisible: boolean;
}
const Modal: React.FC<ModalProps> = ({ message, isConfirm, onConfirm, onCancel, isVisible }) => {
    const [animationClass, setAnimationClass] = useState('modal-leave');

    useEffect(() => {
        if (isVisible) {
            setAnimationClass('modal-enter');
        } else {
            setAnimationClass('modal-leave');
        }
    }, [isVisible]);

    if (!isVisible && animationClass === 'modal-leave') return null;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${animationClass} ${isVisible ? '' : 'hidden'}`}>
            <div className="modal-overlay absolute inset-0 bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm" onClick={onCancel}></div>
            <div className="modal-dialog relative bg-white dark:bg-[#161b22] rounded-2xl shadow-2xl max-w-md w-full p-8 text-center transform transition-all border border-slate-200/50 dark:border-[#30363d] overflow-hidden">
                {/* Decorative top gradient */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

                {/* Icon */}
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center mb-5 shadow-lg shadow-indigo-500/20">
                    {isConfirm ? (
                        <AlertCircle className="w-8 h-8 text-amber-500" />
                    ) : (
                        <Info className="w-8 h-8 text-indigo-500" />
                    )}
                </div>

                <p className="text-slate-800 dark:text-slate-200 text-lg mb-8 leading-relaxed">{message}</p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onConfirm}
                        className="group relative flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        <CheckCircle2 className="w-4 h-4 relative" />
                        <span className="relative">{isConfirm ? 'Confirm' : 'OK'}</span>
                    </button>
                    {isConfirm && (
                        <button
                            onClick={onCancel}
                            className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold py-3 px-8 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-300 border border-slate-200 dark:border-slate-600"
                        >
                            <X className="w-4 h-4" />
                            Cancel
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

const ThemeSwitcher: React.FC<{ theme: string; setTheme: (theme: string) => void }> = ({ theme, setTheme }) => {
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="relative p-2.5 rounded-xl bg-white dark:bg-[#21262d] border border-slate-200 dark:border-[#30363d] text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-amber-400 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-indigo-500/20 dark:hover:shadow-amber-500/20 hover:scale-110 active:scale-95 group overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 dark:group-hover:from-amber-500/10 dark:group-hover:to-orange-500/10 transition-all duration-300" />
            {theme === 'light' ? (
                <Sun className="w-5 h-5 relative z-10 transition-all duration-500 group-hover:rotate-180 group-hover:text-amber-500" />
            ) : (
                <Moon className="w-5 h-5 relative z-10 transition-all duration-500 group-hover:-rotate-45 group-hover:text-amber-400" />
            )}
        </button>
    );
};


// --- Main App Component ---

function UkPrecasApp() {
    // Use the custom useAppState hook for automatic Firestore persistence
    const {
        profile, setProfile,
        prepContent, setPrepContent,
        history, setHistory,
        currentQuestionIndex, setCurrentQuestionIndex,
        translationCache, setTranslationCache,
        currentPrepDataId, setCurrentPrepDataId,
        isLoadingFromFirestore
    } = useAppState();
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isTranslating, setIsTranslating] = useState(false);
    const [isUniversityDropdownOpen, setIsUniversityDropdownOpen] = useState(false);
    const [universitySearch, setUniversitySearch] = useState('');

    const [modalState, setModalState] = useState({ isVisible: false, message: '', isConfirm: false });
    const modalConfirmCallback = useRef<(() => void) | null>(null);

    const [setupStep, setSetupStep] = useState(1);
    const [percentageProgress, setPercentageProgress] = useState({ progress: 0, text: '0%', isVisible: false });

    // Translation States
    const [translatedKeyTalkingPoints, setTranslatedKeyTalkingPoints] = useState<string | null>(null);
    const [translatedContent, setTranslatedContent] = useState<{ question: string; guidance: string } | null>(null);
    const [translatedFeedback, setTranslatedFeedback] = useState<string | null>(null);

    const apiAbortControllerRef = useRef<AbortController | null>(null);
    const percentageIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const universityDropdownRef = useRef<HTMLDivElement | null>(null);

    const [authModalMode, setAuthModalMode] = useState<'none' | 'signup' | 'login'>('none');
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        // SSR guard: localStorage is only available in the browser
        if (typeof window === 'undefined') return false;
        try {
            return localStorage.getItem('isAuthenticated') === 'true';
        } catch {
            return false;
        }
    });
    const filteredUniversities = useMemo(() => {
        if (!universitySearch.trim()) return UNIVERSITIES;
        const term = universitySearch.trim().toLowerCase();
        return UNIVERSITIES.filter((uni) => uni.toLowerCase().includes(term));
    }, [universitySearch]);

    // Initialize theme from localStorage or check document class to match HTML script
    const [theme, setTheme] = useState(() => {
        // SSR guard: localStorage and document are only available in the browser
        if (typeof window === 'undefined') return 'light';
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme;
        // Check if dark class is already applied (from HTML script)
        if (document.documentElement.classList.contains('dark')) {
            return 'dark';
        }
        return 'light';
    });
    // Apply and persist theme
    useEffect(() => {
        // SSR guard: window and localStorage are only available in the browser
        if (typeof window === 'undefined') return;
        const root = window.document.documentElement;
        const isDark = theme === 'dark';

        root.classList.toggle('dark', isDark);
        localStorage.setItem('theme', theme);
    }, [theme]);


    // Show loading indicator when fetching from Firestore
    useEffect(() => {
        if (isLoadingFromFirestore) {
            setIsLoading(true);
            setLoadingMessage('Loading your saved data from cloud...');
        } else {
            if (loadingMessage === 'Loading your saved data from cloud...') {
                setIsLoading(false);
                setLoadingMessage('');
            }
        }
    }, [isLoadingFromFirestore, loadingMessage]);

    useEffect(() => {
        // SSR guard: localStorage is only available in the browser
        if (typeof window === 'undefined') return;
        try {
            localStorage.setItem('isAuthenticated', isAuthenticated ? 'true' : 'false');
        } catch (e) {
            console.error('Could not persist auth state', e);
        }
    }, [isAuthenticated]);

    // Sync authentication state on mount and verify Firebase auth
    useEffect(() => {
        const syncAuthState = async () => {
            try {
                const localAuthStatus = localStorage.getItem('isAuthenticated') === 'true';
                const userEmail = localStorage.getItem('UkUserEmail');

                // If localStorage says authenticated, verify with Firebase
                if (localAuthStatus && userEmail) {
                    try {
                        const currentUser = auth.currentUser;
                        if (currentUser) {
                            // User is signed in with Firebase
                            setIsAuthenticated(true);
                            localStorage.setItem('isAuthenticated', 'true');
                        } else {
                            // Try to verify with ensureUserSignedIn
                            const authedUser = await ensureUserSignedIn().catch(() => null);
                            if (authedUser) {
                                setIsAuthenticated(true);
                                localStorage.setItem('isAuthenticated', 'true');
                            } else {
                                // Firebase auth failed, clear authentication
                                setIsAuthenticated(false);
                                localStorage.setItem('isAuthenticated', 'false');
                            }
                        }
                    } catch (error) {
                        console.error('Failed to verify Firebase auth on mount:', error);
                        setIsAuthenticated(false);
                        localStorage.setItem('isAuthenticated', 'false');
                    }
                } else {
                    // localStorage says not authenticated
                    setIsAuthenticated(false);
                    localStorage.setItem('isAuthenticated', 'false');
                }
            } catch (error) {
                console.error('Error syncing auth state:', error);
            }
        };

        syncAuthState();
    }, []); // Run once on mount

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (
                universityDropdownRef.current &&
                !universityDropdownRef.current.contains(event.target as Node)
            ) {
                setIsUniversityDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsUniversityDropdownOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    useEffect(() => {
        if (!isUniversityDropdownOpen) {
            setUniversitySearch('');
        }
    }, [isUniversityDropdownOpen]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const handler = (event: Event) => {
            const customEvent = event as CustomEvent<{ type?: 'login' | 'signup' }>;
            const desiredType = customEvent.detail?.type ?? 'login';
            setAuthModalMode(desiredType);
        };

        window.addEventListener(AUTH_MODAL_EVENT, handler as EventListener);
        return () => {
            window.removeEventListener(AUTH_MODAL_EVENT, handler as EventListener);
        };
    }, []);


    // --- Modal Logic ---

    const showModal = (message: string, isConfirm = false, onConfirm: (() => void) | null = null) => {
        modalConfirmCallback.current = onConfirm;
        setModalState({ isVisible: true, message, isConfirm });
    };

    const hideModal = () => {
        setModalState(prev => ({ ...prev, isVisible: false }));
        modalConfirmCallback.current = null;
    };

    const handleModalConfirm = () => {
        if (modalConfirmCallback.current) {
            modalConfirmCallback.current();
        }
        hideModal();
    };

    const handleModalCancel = () => hideModal();

    const triggerAuthModal = useCallback((type: 'login' | 'signup' = 'login') => {
        window.dispatchEvent(
            new CustomEvent(AUTH_MODAL_EVENT, {
                detail: { type },
            })
        );
    }, []);

    const handleDashboardRedirect = useCallback(async () => {
        // Step 1: Check localStorage authentication
        const localAuthStatus = localStorage.getItem('isAuthenticated') === 'true';
        const userEmail = localStorage.getItem('UkUserEmail');

        if (!localAuthStatus || !userEmail) {
            setIsAuthenticated(false);
            localStorage.setItem('isAuthenticated', 'false');
            triggerAuthModal('login');
            return;
        }

        // Step 2: Verify Firebase authentication
        try {
            const authedUser = await ensureUserSignedIn();
            if (!authedUser) {
                console.error('Firebase authentication failed for dashboard access');
                setIsAuthenticated(false);
                localStorage.setItem('isAuthenticated', 'false');
                triggerAuthModal('login');
                return;
            }

            // Sync authentication state
            setIsAuthenticated(true);
            localStorage.setItem('isAuthenticated', 'true');

            // Step 3: Redirect to dashboard
            window.location.href = DASHBOARD_URL;
        } catch (error) {
            console.error('Failed to verify auth session before dashboard redirect:', error);
            setIsAuthenticated(false);
            localStorage.setItem('isAuthenticated', 'false');
            showModal('Your session expired. Please sign in again to access the dashboard.');
            triggerAuthModal('login');
        }
    }, [triggerAuthModal, showModal]);

    const handleProfileFieldUpdate = useCallback((field: keyof StudentProfile, value: string) => {
        setProfile((prev) => ({ ...prev, [field]: value }));
    }, []);

    const handleUniversitySelect = (value: string) => {
        handleProfileFieldUpdate('university', value);
        setIsUniversityDropdownOpen(false);
    };

    const handleUniversityToggle = () => {
        setIsUniversityDropdownOpen((prev) => !prev);
    };

    // --- API and Progress Management ---
    const cancelOngoingOperations = () => {
        if (apiAbortControllerRef.current) {
            apiAbortControllerRef.current.abort();
            apiAbortControllerRef.current = null;
        }
        setIsLoading(false);
        setIsAnalyzing(false);
        setIsTranslating(false);
    }

    const startPercentageProgress = () => {
        setPercentageProgress({ progress: 0, text: '0%', isVisible: true });
        let progress = 0;
        percentageIntervalRef.current = setInterval(() => {
            if (progress < 90) progress += Math.random() * 5;
            else if (progress < 98) progress += 0.1;
            if (progress > 98) progress = 98;

            setPercentageProgress(prev => ({ ...prev, progress, text: `${Math.floor(progress)}%` }));
        }, 200);
    };

    const stopPercentageProgress = () => {
        if (percentageIntervalRef.current) {
            clearInterval(percentageIntervalRef.current);
            percentageIntervalRef.current = null;
        }
        setPercentageProgress({ progress: 100, text: '100%', isVisible: true });
        setTimeout(() => setPercentageProgress({ progress: 0, text: '0%', isVisible: false }), 500);
    };


    // --- Event Handlers ---

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        const key = id.replace(/-input|-select|-textarea/, '') as keyof StudentProfile;
        handleProfileFieldUpdate(key, value);
    };

    const handleContinueSetup = () => {
        if (!profile.university || !profile.courseLevel || !profile.course) {
            return showModal('Please complete all fields in Step 1 before continuing.');
        }
        setSetupStep(2);
    }

    const buildProfileSummary = () => {
        return [
            profile.university && `University: ${profile.university}`,
            profile.course && `Course: ${profile.course}`,
            profile.courseLevel && `Level: ${profile.courseLevel}`,
            profile.previousQualification && `Previous Qualification: ${profile.previousQualification}`,
            profile.careerGoals && `Career Goal: ${profile.careerGoals}`,
            profile.studyGap && `Study/Work Gap: ${profile.studyGap}`,
        ]
            .filter(Boolean)
            .join(' | ');
    };

    const handleGeneratePrep = async () => {
        // Step 1: Check localStorage authentication
        const localAuthStatus = localStorage.getItem('isAuthenticated') === 'true';
        const userEmail = localStorage.getItem('UkUserEmail');

        if (!localAuthStatus || !userEmail) {
            setIsAuthenticated(false);
            localStorage.setItem('isAuthenticated', 'false');
            triggerAuthModal('signup');
            return;
        }

        // Step 2: Verify Firebase authentication
        let authedUser = null;
        try {
            authedUser = await ensureUserSignedIn();
            if (!authedUser) {
                console.error('Firebase authentication failed');
                setIsAuthenticated(false);
                localStorage.setItem('isAuthenticated', 'false');
                triggerAuthModal('signup');
                return;
            }
            // Sync authentication state
            setIsAuthenticated(true);
            localStorage.setItem('isAuthenticated', 'true');
        } catch (authError) {
            console.error('Authentication verification failed:', authError);
            setIsAuthenticated(false);
            localStorage.setItem('isAuthenticated', 'false');
            showModal('Your session expired. Please sign in again.');
            triggerAuthModal('login');
            return;
        }

        // Step 3: Check profile completion
        if (!profile.previousQualification || !profile.sponsorOccupation || !profile.careerGoals) {
            return showModal('Please fill out all the fields in your personal profile to continue.');
        }

        setIsLoading(true);
        startPercentageProgress();
        apiAbortControllerRef.current = new AbortController();

        try {

            const userId = authedUser.uid;

            if (!userId) {
                throw new Error('We could not locate your Firestore profile. Please log in again.');
            }

            let userData = null;
            try {
                userData = await getUserByEmail(userEmail);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }

            try {
                await incrementPrepPlanCount(userEmail);
            } catch (countError) {
                console.error('Error incrementing prep plan count:', countError);
            }

            const academicPlan = {
                university: profile.university,
                courseLevel: profile.courseLevel,
                course: profile.course,
                lastQualification: profile.previousQualification,
                grade: '',
                indianUniversity: '',
                fundingSource: profile.fundingSource,
                sponsorOccupation: profile.sponsorOccupation,
                careerGoals: {
                    goal: profile.careerGoals,
                    details: ''
                },
                studyGap: profile.studyGap || '',
                workExperience: [],
                testScores: {},
                hasRefusal: 'no',
                hasTraveled: 'no',
                hasPetition: 'no',
                additionalDetails: '',
                userEmail,
                savedFrom: 'setup-form',
            };

            const planResult = await saveAcademicPlan({
                userId,
                academicPlan,
            });

            if (!planResult.success) {
                throw new Error(planResult.error || 'Failed to save your academic plan. Please try again.');
            }

            if (userData) {
                try {
                    await sendRegistrationNotificationEmailsUniversal(userData, academicPlan);
                } catch (emailError) {
                    console.error('Error sending email notification:', emailError);
                }
            }

            const content = await geminiService.generatePrepContent(profile, apiAbortControllerRef.current.signal);
            setPrepContent(content);
            setCurrentQuestionIndex(0);

            try {
                const sopFileName = localStorage.getItem('lastSavedSopFileName') || undefined;
                const prepSaveResult = await savePrepData({
                    userId,
                    prepContent: content,
                    profileSummary: buildProfileSummary(),
                    sopFileName,
                });

                if (prepSaveResult.success && prepSaveResult.prepDataId) {
                    setCurrentPrepDataId(prepSaveResult.prepDataId);
                } else {
                    console.warn('Prep data save succeeded without prepDataId reference.');
                }
            } catch (prepSaveError) {
                console.error('Failed to save prep data:', prepSaveError);
            }

            document.getElementById('interview-flow')?.scrollIntoView({ behavior: 'smooth' });
        } catch (error: any) {
            if (error.name !== 'AbortError') {
                console.error("Failed to generate prep content:", error);
                showModal(`An error occurred: ${error.message}. Please check your API key and network connection.`);
            }
        } finally {
            setIsLoading(false);
            stopPercentageProgress();
        }
    };

    const changeQuestion = (direction: 'next' | 'prev') => {
        cancelOngoingOperations();
        setTranslatedKeyTalkingPoints(null);
        setTranslatedContent(null);
        setTranslatedFeedback(null);

        if (direction === 'next' && prepContent && currentQuestionIndex < prepContent.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
        if (direction === 'prev' && currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const resetPrep = () => {
        showModal("Are you sure you want to start a new prep session? This will clear the current questions but not your practice history.", true, () => {
            cancelOngoingOperations();
            setPrepContent(null);
            setProfile(initialProfile);
            setCurrentPrepDataId(null);
            setSetupStep(1);
            document.getElementById('setup')?.scrollIntoView({ behavior: 'smooth' });
        });
    }

    const clearHistory = () => {
        showModal("Are you sure you want to clear your entire practice history? This action cannot be undone.", true, () => {
            setHistory([]);
        });
    }

    // --- Translation Handlers with Caching ---

    // Helper function to strip markdown code fences from translated content
    const stripMarkdownCodeFences = (html: string): string => {
        // Remove ```html or ``` at the start and ``` at the end
        return html
            .replace(/^```html\s*/i, '')  // Remove ```html at start (case insensitive)
            .replace(/^```\s*/, '')        // Remove ``` at start
            .replace(/\s*```$/m, '');      // Remove ``` at end
    };

    const handleTranslateKeyTalkingPoints = async (targetLang: 'hi' | 'gu', talkingPointsHtml: string) => {
        cancelOngoingOperations();
        setIsTranslating(true);
        apiAbortControllerRef.current = new AbortController();
        const langMap = { 'hi': 'Hindi', 'gu': 'Gujarati' };
        const languageName = langMap[targetLang];

        if (translationCache[talkingPointsHtml]?.[languageName]) {
            setTranslatedKeyTalkingPoints(translationCache[talkingPointsHtml][languageName]);
            setIsTranslating(false);
            return;
        }

        try {
            const result = await geminiService.translateHtmlFragment(talkingPointsHtml, languageName, apiAbortControllerRef.current.signal);
            // Strip markdown code fences from the translated content
            const cleanedResult = stripMarkdownCodeFences(result || '');
            setTranslatedKeyTalkingPoints(cleanedResult);
            setTranslationCache(prev => ({
                ...prev,
                [talkingPointsHtml]: {
                    ...(prev[talkingPointsHtml] || {}),
                    [languageName]: cleanedResult
                }
            }));
        } catch (error: any) {
            if (error.name !== 'AbortError') {
                showModal("An error occurred during translation.");
                setTranslatedKeyTalkingPoints(null);
            }
        } finally {
            setIsTranslating(false);
        }
    };

    const handleTranslate = async (targetLang: 'hi' | 'gu') => {
        if (!prepContent) return;

        cancelOngoingOperations();
        setTranslatedFeedback(null);
        setTranslatedContent(null);
        setIsTranslating(true);
        apiAbortControllerRef.current = new AbortController();

        const currentQ = prepContent.questions[currentQuestionIndex];
        const originalContent = { question: currentQ.question, guidance: `<h4>Guidance</h4>${currentQ.guidance}<h4>Model Answer</h4>${currentQ.modelAnswer}` };
        const langMap = { 'hi': 'Hindi', 'gu': 'Gujarati' };
        const languageName = langMap[targetLang];
        const textToTranslate = `${originalContent.question}|||${originalContent.guidance}`;

        if (translationCache[textToTranslate]?.[languageName]) {
            const cachedResult = translationCache[textToTranslate][languageName];
            const parts = cachedResult.split('|||');
            if (parts.length === 2) {
                setTranslatedContent({ question: parts[0].trim(), guidance: parts[1].trim() });
            }
            setIsTranslating(false);
            return;
        }

        try {
            const result = await geminiService.translateText(textToTranslate, languageName, apiAbortControllerRef.current.signal);
            const translatedText = result || '';
            setTranslationCache(prev => ({ ...prev, [textToTranslate]: { ...(prev[textToTranslate] || {}), [languageName]: translatedText } }));

            const parts = translatedText.split('|||');
            if (parts.length === 2) {
                setTranslatedContent({ question: parts[0].trim(), guidance: parts[1].trim() });
            } else {
                throw new Error("Translation format incorrect.");
            }
        } catch (error: any) {
            if (error.name !== 'AbortError') {
                showModal("An error occurred during translation.");
                setTranslatedContent(null);
            }
        } finally {
            setIsTranslating(false);
        }
    }

    const handleTranslateFeedback = async (targetLang: 'hi' | 'gu', feedbackHtml: string) => {
        cancelOngoingOperations();
        setTranslatedFeedback(null);
        setIsTranslating(true);
        apiAbortControllerRef.current = new AbortController();
        const langMap = { 'hi': 'Hindi', 'gu': 'Gujarati' };
        const languageName = langMap[targetLang];

        if (translationCache[feedbackHtml]?.[languageName]) {
            setTranslatedFeedback(translationCache[feedbackHtml][languageName]);
            setIsTranslating(false);
            return;
        }

        try {
            const result = await geminiService.translateHtmlFragment(feedbackHtml, languageName, apiAbortControllerRef.current.signal);
            // Strip markdown code fences from the translated content
            const cleanedResult = stripMarkdownCodeFences(result || '');
            setTranslatedFeedback(cleanedResult);
            setTranslationCache(prev => ({ ...prev, [feedbackHtml]: { ...(prev[feedbackHtml] || {}), [languageName]: cleanedResult } }));
        } catch (error: any) {
            if (error.name !== 'AbortError') {
                showModal("An error occurred during feedback translation.");
                setTranslatedFeedback(null);
            }
        } finally {
            setIsTranslating(false);
        }
    }


    const extractPrepTimestamp = (prepId: string | null | undefined) => {
        if (!prepId) return 0;
        const match = prepId.match(/prep_(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
    };

    const handleAnalyzeAnswer = async (
        finalTranscript: string,
        audioUrl?: string,
        audioDurationSeconds?: number
    ) => {
        if (!prepContent) return;
        if (!finalTranscript.trim()) {
            return showModal("Your answer transcript is empty. Please record an answer or type one in the text area.");
        }

        setIsAnalyzing(true);
        apiAbortControllerRef.current = new AbortController();

        try {
            const questionData = prepContent.questions[currentQuestionIndex];
            const questionId = `question_${currentQuestionIndex + 1}`;
            const feedback = await geminiService.analyzeAnswer(
                profile,
                questionData.question,
                finalTranscript,
                apiAbortControllerRef.current.signal
            );

            const scoreMatch = feedback?.match(/<strong>Score:<\/strong>\s*(\d{1,2})/);
            const newHistoryItem: HistoryItem = {
                id: Date.now(),
                timestamp: new Date().toISOString(),
                university: profile.university,
                courseLevel: profile.courseLevel,
                course: profile.course,
                question: questionData.question,
                questionId,
                transcript: finalTranscript,
                feedback: feedback || '',
                score: scoreMatch ? parseInt(scoreMatch[1], 10) : 0,
                audioUrl,
                audioDurationSeconds,
            };

            setHistory(prev => [newHistoryItem, ...prev]);
            setTranslatedFeedback(null);

            try {
                const userEmail = localStorage.getItem('UkUserEmail');
                const authedUser = await ensureUserSignedIn();
                const userId = authedUser?.uid || (userEmail ? await getUserIdByEmail(userEmail) : null);

                if (!userId) {
                    console.warn('Could not resolve user ID for practice history save.');
                } else {
                    let prepDataId = currentPrepDataId;

                    if (!prepDataId) {
                        const prepDataList = await getUserPrepData(userId);
                        if (prepDataList && prepDataList.length > 0) {
                            prepDataList.sort((a, b) => extractPrepTimestamp(b.id) - extractPrepTimestamp(a.id));
                            prepDataId = prepDataList[0].id;
                            setCurrentPrepDataId(prepDataId);
                        }
                    }

                    if (!prepDataId) {
                        console.warn('No prep session found; skipping practice history persistence.');
                    } else {
                        const saved = await addPracticeHistoryItem(userId, prepDataId, newHistoryItem);
                        if (!saved) {
                            console.warn('Practice history save returned false.');
                        }
                    }
                }
            } catch (persistError) {
                console.error('Failed to save practice history to Firebase:', persistError);
            }

        } catch (error: any) {
            if (error.name !== 'AbortError') {
                console.error("Analysis Error:", error);
                showModal(`An error occurred during analysis: ${error.message}`);
            }
        } finally {
            setIsAnalyzing(false);
        }
    };

    // --- Render Logic ---
    const currentQuestionData: Question | undefined = prepContent?.questions[currentQuestionIndex];
    const attemptsForCurrentQuestion = history.filter(h => h.question === currentQuestionData?.question);
    const latestFeedback = attemptsForCurrentQuestion.length > 0 ? attemptsForCurrentQuestion[0] : null;

    return (
        <>
            <header id="header" className="bg-white/95 dark:bg-[#0d1117]/95 backdrop-blur-xl sticky top-0 z-40 border-b border-slate-200/80 dark:border-[#30363d]/80 shadow-sm">
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3 group">
                            <div className="relative">
                                <img src="/assets/logos/eeclogo-main.webp" alt="EEC" className="h-9 transition-transform duration-300 group-hover:scale-110" />
                                <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="font-bold text-slate-900 dark:text-gray-100">
                                <span className="hidden md:inline text-xl tracking-tight">
                                    <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">UK Pre-CAS Prep</span>
                                    <span className="text-slate-400 font-normal"> by </span>
                                    <span className="text-slate-800 dark:text-white">EEC</span>
                                </span>
                                <span className="md:hidden text-lg tracking-tight">
                                    <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">UK Pre-CAS</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* Navigation Links - Desktop */}
                            <div className="hidden lg:flex items-center gap-2">
                                <a
                                    href="/ukprecas/resources/"
                                    className="group flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300"
                                >
                                    <FileText className="w-4 h-4" />
                                    <span>Resources</span>
                                </a>
                                <a
                                    href="/ukprecas/about-eec/"
                                    className="group flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300"
                                >
                                    <Award className="w-4 h-4" />
                                    <span>About EEC</span>
                                </a>
                                <a
                                    href="/ukprecas/faq/"
                                    className="group flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300"
                                >
                                    <HelpCircle className="w-4 h-4" />
                                    <span>FAQ</span>
                                </a>
                            </div>
                            <div className="hidden md:flex items-center gap-3">
                                {isAuthenticated ? (
                                    <button
                                        onClick={handleDashboardRedirect}
                                        className="group relative flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                        <LayoutDashboard className="w-4 h-4 relative transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                                        <span className="relative">Dashboard</span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => triggerAuthModal('login')}
                                        className="group flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white dark:bg-[#21262d] border-2 border-slate-200 dark:border-[#30363d] text-slate-700 dark:text-slate-200 hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20"
                                    >
                                        <LogIn className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                                        Sign In
                                    </button>
                                )}
                            </div>
                            {/* Mobile Navigation Menu */}
                            <div className="lg:hidden relative">
                                <div className="flex items-center gap-2">
                                    <a
                                        href="/ukprecas/resources/"
                                        className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300"
                                        title="Resources"
                                    >
                                        <FileText className="w-4 h-4" />
                                    </a>
                                    <a
                                        href="/ukprecas/about-eec/"
                                        className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300"
                                        title="About EEC"
                                    >
                                        <Award className="w-4 h-4" />
                                    </a>
                                    <a
                                        href="/ukprecas/faq/"
                                        className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300"
                                        title="FAQ"
                                    >
                                        <HelpCircle className="w-4 h-4" />
                                    </a>
                                    <button
                                        onClick={isAuthenticated ? handleDashboardRedirect : () => triggerAuthModal('login')}
                                        className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-300 ${isAuthenticated
                                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:shadow-lg'
                                                : 'border-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-indigo-500'
                                            }`}
                                    >
                                        {isAuthenticated ? <LayoutDashboard className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                                        <span className="hidden sm:inline">{isAuthenticated ? 'Dashboard' : 'Sign In'}</span>
                                    </button>
                                </div>
                            </div>
                            <ThemeSwitcher theme={theme} setTheme={setTheme} />
                        </div>
                    </div>
                </nav>
            </header>

            <Breadcrumbs />

            <main className="container mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6 md:py-12">
                {/* Decorative background elements - Premium Dark Theme */}
                <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-white dark:bg-[#0f172a] transition-colors duration-300" />
                    <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-100" />
                    <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[100px] animate-blob" />
                    <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-[100px] animate-blob animation-delay-2000" />
                    <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-[100px] animate-blob animation-delay-4000" />
                </div>

                {/* Section 1: Setup */}
                <section id="setup" className="mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border border-indigo-200/50 dark:border-indigo-700/50 mb-6 animate-fade-in">
                        <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-pulse" />
                        <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">AI-Powered Interview Preparation</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto animate-fade-in-up">
                        <span className="text-slate-900 dark:text-white">UK Pre-CAS Interview Prep</span>
                        <br />
                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">by EEC</span>
                    </h1>
                    <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        {setupStep === 1
                            ? "Select your university, course level, and course name to get hyper-personalized Pre-CAS complete interview preparation. Anytime, Anywhere."
                            : "Now, provide some personal details for an ultra-personalized coaching experience."
                        }
                    </p>
                    <div className="flex items-center justify-center gap-6 mt-6 text-sm text-slate-500 dark:text-slate-400 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <span>100% Free</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-indigo-500" />
                            <span>25,000+ Sessions</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-amber-500" />
                            <span>95% Success Rate</span>
                        </div>
                    </div>
                    <div className="mt-10 max-w-xl mx-auto bg-white/90 dark:bg-[#161b22]/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-200/50 dark:border-[#30363d] animate-fade-in-up relative overflow-hidden card-glow-always" style={{ animationDelay: '0.3s' }}>
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />
                        {setupStep === 1 && (
                            <div id="initial-setup-step" className="space-y-6 animate-fade-in">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30">
                                        <GraduationCap className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-xl font-bold text-left text-slate-900 dark:text-white">Step 1: Your Course Details</h3>
                                </div>
                                <div>
                                    <label htmlFor="university-select" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 text-left">Choose UK University</label>
                                    <div
                                        className="relative"
                                        ref={universityDropdownRef}
                                    >
                                        <button
                                            type="button"
                                            id="university-select"
                                            onClick={handleUniversityToggle}
                                            className="group w-full px-4 py-3.5 border-2 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white dark:bg-slate-800 flex items-center justify-between hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10"
                                            aria-haspopup="listbox"
                                            aria-expanded={isUniversityDropdownOpen}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                                                    <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                                </div>
                                                <span className={profile.university ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-500 dark:text-slate-400'}>
                                                    {profile.university || '-- Select a University --'}
                                                </span>
                                            </div>
                                            <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isUniversityDropdownOpen ? 'rotate-180 text-indigo-500' : 'group-hover:text-indigo-500'}`} />
                                        </button>
                                        {isUniversityDropdownOpen && (
                                            <div className="absolute left-0 top-full mt-2 w-full rounded-2xl border border-slate-200 dark:border-[#30363d] bg-white dark:bg-[#161b22] shadow-2xl z-40 overflow-hidden animate-fade-in">
                                                <div className="p-3 border-b border-slate-100 dark:border-slate-700/50 bg-slate-50/80 dark:bg-[#0d1117]/80 backdrop-blur">
                                                    <div className="relative">
                                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                        <input
                                                            type="text"
                                                            value={universitySearch}
                                                            onChange={(e) => setUniversitySearch(e.target.value)}
                                                            placeholder="Search universities..."
                                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="max-h-64 overflow-y-auto custom-scrollbar py-2">
                                                    {filteredUniversities.length === 0 ? (
                                                        <p className="px-4 py-6 text-center text-sm text-slate-500">
                                                            No universities found.
                                                        </p>
                                                    ) : (
                                                        filteredUniversities.map((u) => (
                                                            <button
                                                                key={u}
                                                                type="button"
                                                                onClick={() => handleUniversitySelect(u)}
                                                                className={`w-full text-left px-4 py-2 text-sm transition ${profile.university === u
                                                                        ? 'bg-indigo-50 text-indigo-700 dark:bg-slate-800 dark:text-indigo-300'
                                                                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                                                                    }`}
                                                            >
                                                                {u}
                                                            </button>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="courseLevel-select" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 text-left">Choose Course Level</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg pointer-events-none">
                                            <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <select id="courseLevel-select" value={profile.courseLevel} onChange={handleProfileChange} className="w-full pl-14 pr-4 py-3.5 border-2 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 appearance-none cursor-pointer">
                                            <option value="" disabled>-- Select a Course Level --</option>
                                            {COURSE_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="course-input" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 text-left">Write Exact Course Name</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-cyan-50 dark:bg-cyan-900/30 rounded-lg pointer-events-none">
                                            <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                                        </div>
                                        <input type="text" id="course-input" placeholder="e.g., MSc Data Science" value={profile.course} onChange={handleProfileChange} className="w-full pl-14 pr-4 py-3.5 border-2 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 placeholder:text-slate-400" />
                                    </div>
                                </div>
                                <button onClick={handleContinueSetup} className="group w-full relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/30 active:scale-[0.98] flex items-center justify-center gap-2">
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                    <span className="relative">Continue to Personalize</span>
                                    <ArrowRight className="w-5 h-5 relative transition-transform duration-300 group-hover:translate-x-1" />
                                </button>
                            </div>
                        )}

                        {setupStep === 2 && (
                            <div id="personal-details-step" className="space-y-6 animate-fade-in">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/30">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-xl font-bold text-left text-slate-900 dark:text-white">Step 2: Your Personal Profile</h3>
                                </div>
                                <div>
                                    <label htmlFor="previousQualification-input" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 text-left">Previous Qualification & Grade</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-3.5 p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg pointer-events-none">
                                            <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <input type="text" id="previousQualification-input" value={profile.previousQualification} onChange={handleProfileChange} placeholder="e.g., Bachelor of Computer Engineering, 7.2 CGPA, Gujarat University" className="w-full pl-14 pr-4 py-3.5 text-slate-800 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 placeholder:text-slate-400" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="fundingSource-select" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 text-left">Primary Funding Source</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-amber-50 dark:bg-amber-900/30 rounded-lg pointer-events-none">
                                            <Briefcase className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                                        </div>
                                        <select id="fundingSource-select" value={profile.fundingSource} onChange={handleProfileChange} className="w-full pl-14 pr-10 py-3.5 border-2 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 appearance-none cursor-pointer">
                                            <option>Family Savings</option>
                                            <option>Education Loan</option>
                                            <option>Family Savings & Education Loan</option>
                                            <option>Scholarship</option>
                                            <option>Sponsorship (Company)</option>
                                            <option>Other</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="sponsorOccupation-input" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 text-left">Sponsor's Occupation</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-3.5 p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg pointer-events-none">
                                            <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <input type="text" id="sponsorOccupation-input" value={profile.sponsorOccupation} onChange={handleProfileChange} placeholder="e.g., Farmer and grains wholesaler, Electrical Business Owner" className="w-full pl-14 pr-4 py-3.5 text-slate-800 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 placeholder:text-slate-400" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="careerGoals-textarea" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 text-left">Future Career Goals</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-3.5 p-2 bg-rose-50 dark:bg-rose-900/30 rounded-lg pointer-events-none">
                                            <Target className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                                        </div>
                                        <textarea id="careerGoals-textarea" rows={3} value={profile.careerGoals} onChange={handleProfileChange} placeholder="Briefly describe your career plans after finishing this course." className="w-full pl-14 pr-4 py-3.5 text-slate-800 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 placeholder:text-slate-400 resize-none"></textarea>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="studyGap-textarea" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 text-left">Gaps in Education/Work (if any)</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-3.5 p-2 bg-slate-100 dark:bg-slate-700 rounded-lg pointer-events-none">
                                            <Clock className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                                        </div>
                                        <textarea id="studyGap-textarea" rows={2} value={profile.studyGap} onChange={handleProfileChange} placeholder="Briefly explain any gaps. If none, leave blank." className="w-full pl-14 pr-4 py-3.5 text-slate-800 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 placeholder:text-slate-400 resize-none"></textarea>
                                    </div>
                                </div>

                                <button onClick={handleGeneratePrep} disabled={isLoading} className="group w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/30 active:scale-[0.98] disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none flex items-center justify-center gap-3">
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Generating Your Prep...
                                        </>
                                    ) : (
                                        <>
                                            <Rocket className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-12" />
                                            Start Ultra-Personalized Prep
                                            <Sparkles className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                                        </>
                                    )}
                                </button>
                                <PercentageProgressBar {...percentageProgress} />
                            </div>
                        )}
                    </div>
                </section>

                {/* Section 2 & 3 will be rendered here based on state */}
                {prepContent && (
                    <InterviewPracticeAndHistory
                        prepContent={prepContent}
                        history={history}
                        currentQuestionIndex={currentQuestionIndex}
                        changeQuestion={changeQuestion}
                        resetPrep={resetPrep}
                        clearHistory={clearHistory}
                        isAnalyzing={isAnalyzing}
                        handleAnalyzeAnswer={handleAnalyzeAnswer}
                        latestFeedback={latestFeedback}
                        isTranslating={isTranslating}
                        handleTranslate={handleTranslate}
                        handleTranslateFeedback={handleTranslateFeedback}
                        translatedContent={translatedContent}
                        translatedFeedback={translatedFeedback}
                        setTranslatedFeedback={setTranslatedFeedback}
                        setTranslatedContent={setTranslatedContent}
                        handleTranslateKeyTalkingPoints={handleTranslateKeyTalkingPoints}
                        translatedKeyTalkingPoints={translatedKeyTalkingPoints}
                        setTranslatedKeyTalkingPoints={setTranslatedKeyTalkingPoints}
                        showModal={showModal}
                    />
                )}
            </main>

            <Modal {...modalState} onConfirm={handleModalConfirm} onCancel={handleModalCancel} />


            <GeoAeoContentSections />
            {/* 50X GEO/AEO ENTERPRISE PROTOCOL - Interactive Knowledge Portal */}
            <div className="container mx-auto px-2 sm:px-4 lg:px-8 py-6 sm:py-8 lg:py-12">
                <CardsComponent />
            </div>

            {authModalMode === 'signup' && (
                <LoginSignupModal
                    onAuthSuccess={() => {
                        setIsAuthenticated(true);
                        setAuthModalMode('none');
                    }}
                    onSwitchToLogin={() => setAuthModalMode('login')}
                    onClose={() => setAuthModalMode('none')}
                />
            )}
            {authModalMode === 'login' && (
                <AuthGateModal
                    onAuthSuccess={() => {
                        setIsAuthenticated(true);
                        setAuthModalMode('none');
                    }}
                    onSwitchToSignup={() => setAuthModalMode('signup')}
                    onClose={() => setAuthModalMode('none')}
                />
            )}


            {/* Final CTA */}
            <div className="container mx-auto items-center justify-center px-2 sm:px-4 lg:px-8 py-6 sm:py-8 lg:py-12">
                <FinalCTA />
            </div>
            <Footer />
        </>
    );
}


// --- Sub-components for better organization ---

interface InterviewPracticeAndHistoryProps {
    prepContent: PrepContent;
    history: HistoryItem[];
    currentQuestionIndex: number;
    changeQuestion: (direction: 'next' | 'prev') => void;
    resetPrep: () => void;
    clearHistory: () => void;
    isAnalyzing: boolean;
    handleAnalyzeAnswer: (transcript: string, audioUrl?: string, audioDurationSeconds?: number) => void;
    latestFeedback: HistoryItem | null;
    isTranslating: boolean;
    handleTranslate: (lang: 'hi' | 'gu') => void;
    handleTranslateFeedback: (lang: 'hi' | 'gu', feedbackHtml: string) => void;
    translatedContent: { question: string; guidance: string } | null;
    translatedFeedback: string | null;
    setTranslatedFeedback: React.Dispatch<React.SetStateAction<string | null>>;
    setTranslatedContent: React.Dispatch<React.SetStateAction<{ question: string; guidance: string } | null>>;
    handleTranslateKeyTalkingPoints: (lang: 'hi' | 'gu', html: string) => void;
    translatedKeyTalkingPoints: string | null;
    setTranslatedKeyTalkingPoints: React.Dispatch<React.SetStateAction<string | null>>;
    showModal: (message: string, isConfirm?: boolean, onConfirm?: (() => void) | null) => void;
}

const InterviewPracticeAndHistory: React.FC<InterviewPracticeAndHistoryProps> = ({
    prepContent, history, currentQuestionIndex, changeQuestion, resetPrep, clearHistory,
    translatedKeyTalkingPoints, setTranslatedKeyTalkingPoints, handleTranslateKeyTalkingPoints,
    ...practiceProps
}) => {
    const [activeLang, setActiveLang] = useState('en');

    useEffect(() => {
        setActiveLang('en');
        setTranslatedKeyTalkingPoints(null);
    }, [prepContent.keyTalkingPoints, setTranslatedKeyTalkingPoints]);

    const handleLangClick = (lang: string) => {
        if (lang === activeLang) return;
        setActiveLang(lang);
        if (lang === 'en') {
            setTranslatedKeyTalkingPoints(null);
        } else {
            handleTranslateKeyTalkingPoints(lang as 'hi' | 'gu', prepContent.keyTalkingPoints);
        }
    };

    return (
        <>
            <section id="interview-flow" className="mb-16 fade-in relative">
                {/* Section ambient glow */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-[100px] animate-pulse-slow" />
                    <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-[80px] animate-pulse-slow animation-delay-2000" />
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Key Talking Points Card */}
                    <div className="mb-12 relative bg-white/80 dark:bg-[#161b22]/80 backdrop-blur-xl rounded-2xl border border-slate-200/80 dark:border-[#30363d] p-6 shadow-xl overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="p-2 sm:p-2.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg sm:rounded-xl shadow-lg shadow-emerald-500/30 flex-shrink-0">
                                    <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Key Talking Points</h3>
                                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate">Your personalized prep guide</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                                <button onClick={() => handleLangClick('en')} className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 ${activeLang === 'en' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30'}`} disabled={practiceProps.isTranslating}>English</button>
                                <button onClick={() => handleLangClick('hi')} className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 ${activeLang === 'hi' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30'}`} disabled={practiceProps.isTranslating}>हिन्दी</button>
                                <button onClick={() => handleLangClick('gu')} className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 ${activeLang === 'gu' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30'}`} disabled={practiceProps.isTranslating}>ગુજરાતી</button>
                            </div>
                        </div>

                        <IndeterminateProgressBar isLoading={practiceProps.isTranslating} />

                        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-li:text-slate-700 dark:prose-li:text-slate-300" dangerouslySetInnerHTML={{ __html: translatedKeyTalkingPoints ?? prepContent.keyTalkingPoints }} />
                    </div>

                    <div className="flex justify-end mb-6">
                        <button onClick={resetPrep} className="group text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 flex items-center gap-2 bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 shadow-sm hover:shadow-lg hover:shadow-indigo-500/10">
                            <RefreshCcw className="w-4 h-4 transition-transform duration-500 group-hover:-rotate-180" />
                            Start New Prep
                        </button>
                    </div>

                    <PracticeContainer
                        currentQuestion={prepContent.questions[currentQuestionIndex]}
                        questionNumber={currentQuestionIndex + 1}
                        totalQuestions={prepContent.questions.length}
                        changeQuestion={changeQuestion}
                        {...practiceProps}
                    />
                </div>
            </section>

            <section id="history" className="mb-16 min-h-[20rem] relative">
                {/* Section ambient glow */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[100px] animate-pulse-slow" />
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg shadow-purple-500/30">
                                <History className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Practice History</h2>
                        </div>
                        <button onClick={clearHistory} disabled={history.length === 0} className="group text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-700 shadow-sm hover:shadow-lg hover:shadow-red-500/10">
                            <Trash2 className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                            Clear History
                        </button>
                    </div>
                    <div className="space-y-5">
                        {history.length === 0 ? (
                            <div className="text-center py-16 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
                                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-full flex items-center justify-center">
                                    <History className="w-10 h-10 text-slate-400 dark:text-slate-500" />
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">No practice sessions yet</p>
                                <p className="text-slate-500 dark:text-slate-500 text-sm mt-2">Your answered questions will appear here</p>
                            </div>
                        ) : (
                            history.map((item, index) => <HistoryCard key={item.id ?? item.timestamp} item={item} index={index} />)
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};


interface PracticeContainerProps extends Omit<InterviewPracticeAndHistoryProps, 'prepContent' | 'history' | 'currentQuestionIndex' | 'resetPrep' | 'clearHistory' | 'handleTranslateKeyTalkingPoints' | 'translatedKeyTalkingPoints' | 'setTranslatedKeyTalkingPoints'> {
    currentQuestion: Question;
    questionNumber: number;
    totalQuestions: number;
}

const PracticeContainer: React.FC<PracticeContainerProps> = ({
    currentQuestion, questionNumber, totalQuestions, changeQuestion, ...practiceProps
}) => {
    const [activeTab, setActiveTab] = useState<'guidance' | 'practice'>('guidance');
    const [activeLang, setActiveLang] = useState('en');

    useEffect(() => {
        setActiveTab('guidance');
        setActiveLang('en');
    }, [currentQuestion]);

    const handleLangClick = (lang: string) => {
        if (lang === activeLang) return;
        setActiveLang(lang);
        if (lang === 'en') {
            practiceProps.setTranslatedContent(null);
        } else {
            practiceProps.handleTranslate(lang as 'hi' | 'gu');
        }
    };

    const originalGuidance = `
        <div class="flex flex-col gap-6">
            <div class="bg-gradient-to-br from-indigo-50 via-purple-50 to-white dark:from-indigo-900/40 dark:via-purple-900/30 dark:to-slate-900/30 border border-indigo-100 dark:border-indigo-900 rounded-2xl p-6 shadow transition duration-300 hover:shadow-indigo-200 dark:hover:shadow-indigo-700/20 hover:-translate-y-0.5 group">
                <div class="flex items-center gap-3 mb-4 pb-3 border-b-2 border-indigo-100 dark:border-indigo-800/50">
                    <div class="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-xl shadow-md">
                        💡
                        </div>
                        <h4 class="text-xl font-bold text-indigo-700 dark:text-indigo-200">Guidance</h4>
                </div>
                <div class="text-slate-700 dark:text-slate-200 leading-relaxed text-base guidance-content-text">
                    ${currentQuestion.guidance}
                </div>
            </div>
            <div class="bg-gradient-to-br from-indigo-50 via-purple-50 to-white dark:from-indigo-900/40 dark:via-purple-900/30 dark:to-slate-900/30 border border-indigo-100 dark:border-indigo-900 rounded-2xl p-6 shadow transition duration-300 hover:shadow-indigo-200 dark:hover:shadow-indigo-700/20 hover:-translate-y-0.5 group">
                <div class="flex items-center gap-3 mb-4 pb-3 border-b-2 border-indigo-100 dark:border-indigo-800/50">
                    <div class="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-xl shadow-md">
                        <span class="font-bold text-white">✓</span>
                    </div>
                    <h4 class="text-xl font-bold text-indigo-700 dark:text-indigo-200 m-0 p-0">Model Answer</h4>
                </div>
                <div class="text-slate-700 dark:text-slate-200 leading-relaxed text-base model-answer-content-text">
                    ${currentQuestion.modelAnswer}
                </div>
            </div>
        </div>
        <style>
        .guidance-content-text mark, .guidance-content-text .highlight,
        .model-answer-content-text mark, .model-answer-content-text .highlight {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            color: #92400e;
            padding: 0.125rem 0.5rem;
            border-radius: 0.375rem;
            font-weight: 600;
            box-shadow: 0 1px 3px rgba(146, 64, 14, 0.1);
            border: 1px solid #fde68a;
        }
        .dark .guidance-content-text mark, .dark .guidance-content-text .highlight,
        .dark .model-answer-content-text mark, .dark .model-answer-content-text .highlight {
            background: linear-gradient(135deg, #92400e 0%, #78350f 100%);
            color: #fef3c7;
            border-color: #92400e;
        }
        .guidance-content-text ul, .guidance-content-text ol,
        .model-answer-content-text ul, .model-answer-content-text ol {
            padding-left: 1.5rem;
            margin: 0.75rem 0;
        }
        .guidance-content-text li, .model-answer-content-text li {
            margin: 0.5rem 0;
            color: #475569;
        }
        .dark .guidance-content-text li, .dark .model-answer-content-text li {
            color: #cbd5e1;
        }
        </style>
    `;

    return (
        <div className="bg-white/90 dark:bg-[#161b22]/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-200/50 dark:border-[#30363d] relative overflow-hidden transition-all duration-300 hover:shadow-indigo-500/10">
            {/* Gradient top border */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

            {/* Question Progress Bar */}
            <div className="mb-6">
                <IndeterminateProgressBar isLoading={practiceProps.isTranslating} />
            </div>

            {/* Header with Navigation */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
                        <MessageSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300">Question {questionNumber}</span>
                        <span className="text-sm text-indigo-500 dark:text-indigo-400">of {totalQuestions}</span>
                    </div>

                    {/* Progress dots */}
                    <div className="hidden sm:flex items-center gap-1.5">
                        {Array.from({ length: totalQuestions }).map((_, i) => (
                            <div
                                key={i}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${i < questionNumber
                                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 shadow-sm shadow-indigo-500/50'
                                        : i === questionNumber - 1
                                            ? 'bg-indigo-500 ring-2 ring-indigo-300 ring-offset-1'
                                            : 'bg-slate-200 dark:bg-slate-700'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={() => changeQuestion('prev')} disabled={questionNumber === 1} className="group p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-sm hover:shadow-md">
                        <ChevronLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
                    </button>
                    <button onClick={() => changeQuestion('next')} disabled={questionNumber === totalQuestions} className="group p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-sm hover:shadow-md">
                        <ChevronRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                </div>
            </div>

            {/* Question Text */}
            <div className="relative mb-8 p-6 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900/50 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 text-white font-bold">
                    Q
                </div>
                <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-relaxed pl-6">{practiceProps.translatedContent?.question ?? currentQuestion.question}</p>
            </div>

            {/* Language Selection */}
            <div className="flex justify-end items-center gap-2 mb-6">
                <span className="text-xs text-slate-500 dark:text-slate-400 mr-2">Translate:</span>
                <button onClick={() => handleLangClick('en')} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${activeLang === 'en' ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'}`} disabled={practiceProps.isTranslating}>English</button>
                <button onClick={() => handleLangClick('hi')} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${activeLang === 'hi' ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'}`} disabled={practiceProps.isTranslating}>हिन्दी</button>
                <button onClick={() => handleLangClick('gu')} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${activeLang === 'gu' ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'}`} disabled={practiceProps.isTranslating}>ગુજરાતી</button>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-slate-200 dark:border-slate-700 mb-6">
                <nav className="flex items-center gap-2 -mb-px">
                    {/* Model Answer Tab */}
                    <button
                        onClick={() => setActiveTab('guidance')}
                        className={`group flex items-center gap-2 py-4 px-5 text-sm font-semibold transition-all duration-300 border-b-2 ${activeTab === 'guidance'
                                ? 'text-indigo-600 dark:text-indigo-400 border-indigo-500'
                                : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-indigo-500 dark:hover:text-indigo-400 hover:border-indigo-300'
                            }`}
                    >
                        <BookOpen className={`w-4 h-4 transition-transform duration-300 ${activeTab === 'guidance' ? 'scale-110' : 'group-hover:scale-110'}`} />
                        Model Answer & Guidance
                    </button>

                    {/* Practice Tab - Premium CTA */}
                    <button
                        onClick={() => setActiveTab('practice')}
                        className={`group relative flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-sm font-bold text-white transition-all duration-300 overflow-hidden ${activeTab === 'practice'
                                ? 'bg-gradient-to-r from-rose-500 to-red-600 shadow-xl shadow-red-500/40 scale-105'
                                : 'bg-gradient-to-r from-rose-500 to-red-600 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 hover:scale-105'
                            }`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        <Mic className={`w-5 h-5 relative transition-transform duration-300 ${activeTab === 'practice' ? 'animate-pulse' : ''}`} />
                        <span className="relative dark:text-white">Practice Your Answer</span>
                    </button>
                </nav>
            </div>

            <div>
                {activeTab === 'guidance' && (
                    <div
                        className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-ul:list-disc prose-ul:pl-6 prose-strong:text-slate-900 dark:prose-strong:text-white dark:prose-invert"
                        style={{
                            // Custom styles for mark/highlight elements
                            '--highlight-bg': '#fef3c7',
                            '--highlight-text': '#92400e'
                        } as React.CSSProperties}
                        dangerouslySetInnerHTML={{ __html: practiceProps.translatedContent?.guidance ?? originalGuidance }}
                    />
                )}
                {activeTab === 'practice' && (
                    <PracticeTab
                        key={currentQuestion.question}
                        isAnalyzing={practiceProps.isAnalyzing}
                        handleAnalyzeAnswer={practiceProps.handleAnalyzeAnswer}
                        latestFeedback={practiceProps.latestFeedback}
                        isTranslating={practiceProps.isTranslating}
                        handleTranslateFeedback={practiceProps.handleTranslateFeedback}
                        translatedFeedback={practiceProps.translatedFeedback}
                        setTranslatedFeedback={practiceProps.setTranslatedFeedback}
                        showModal={practiceProps.showModal}
                    />
                )}
            </div>
        </div>
    );
};

const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.error) {
                return reject(reader.error);
            }
            const base64String = (reader.result as string).split(',')[1];
            resolve(base64String);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(blob);
    });
};

const PracticeTab: React.FC<Omit<PracticeContainerProps, 'currentQuestion' | 'questionNumber' | 'totalQuestions' | 'changeQuestion' | 'translatedContent' | 'setTranslatedContent' | 'handleTranslate'>> = ({
    isAnalyzing, handleAnalyzeAnswer, latestFeedback, isTranslating, handleTranslateFeedback, translatedFeedback, setTranslatedFeedback, showModal
}) => {
    // Component-local state for recording and transcription
    const [isRecording, setIsRecording] = useState(false);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [firebaseAudioUrl, setFirebaseAudioUrl] = useState<string | null>(null);
    const [audioDurationSeconds, setAudioDurationSeconds] = useState<number | null>(null);
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [editedTranscript, setEditedTranscript] = useState('');
    const [micError, setMicError] = useState<string | null>(null);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const apiAbortControllerRef = useRef<AbortController | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const userStopRequestedRef = useRef(false);
    const transcriptTextareaRef = useRef<HTMLTextAreaElement | null>(null);

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Timer logic
    const startTimer = useCallback(() => {
        setElapsedSeconds(0);
        timerIntervalRef.current = setInterval(() => {
            setElapsedSeconds(prev => prev + 1);
        }, 1000);
    }, []);

    const stopTimer = useCallback(() => {
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
        }
    }, []);

    const handleStopRecording = useCallback(() => {
        userStopRequestedRef.current = true;
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
        } else if (streamRef.current) {
            // Fallback: ensure stream is stopped even if recorder isn't active
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
            setIsRecording(false);
            stopTimer();
        }
    }, [stopTimer]);

    // Stop recording if time limit is reached
    useEffect(() => {
        if (elapsedSeconds >= 300 && isRecording) {
            handleStopRecording();
        }
    }, [elapsedSeconds, isRecording, handleStopRecording]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopTimer();
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
                mediaRecorderRef.current.stop();
            }
            if (mediaRecorderRef.current?.stream) {
                mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
            }
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            }
            if (apiAbortControllerRef.current) {
                apiAbortControllerRef.current.abort();
            }
        };
    }, [stopTimer]);

    // Auto-resize transcript textarea with content
    useEffect(() => {
        const el = transcriptTextareaRef.current;
        if (!el) return;
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
    }, [editedTranscript]);

    // Helper to (re)start a MediaRecorder on an existing stream.
    // On some iOS Safari versions MediaRecorder will auto-stop after ~30 seconds.
    // When that happens, we detect it and immediately start a new segment so that
    // the final blob still contains the full recording.
    const startMediaRecorder = (stream: MediaStream, options: MediaRecorderOptions) => {
        try {
            const mediaRecorder = new MediaRecorder(stream, options);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                if (userStopRequestedRef.current) {
                    const mimeType = mediaRecorder.mimeType || options.mimeType || 'audio/webm';
                    const blob = new Blob(audioChunksRef.current, { type: mimeType });
                    setAudioBlob(blob);
                    setAudioUrl(URL.createObjectURL(blob));

                    // Upload to Firebase Storage in the background
                    (async () => {
                        try {
                            const user = await ensureUserSignedIn();
                            const timestamp = Date.now();
                            const baseMimeType = mimeType.split(';')[0];
                            const fileExtension =
                                baseMimeType.includes('webm') ? 'webm' :
                                    baseMimeType.includes('mp4') ? 'mp4' :
                                        baseMimeType.includes('mpeg') ? 'mp3' :
                                            'ogg';

                            const storagePath = `student_audio/${user.uid}/audio_${timestamp}.${fileExtension}`;
                            const downloadURL = await uploadToStorage(blob, storagePath);
                            setFirebaseAudioUrl(downloadURL);

                            console.log('[Audio] Upload complete', {
                                storagePath,
                                downloadURL,
                                mimeType: baseMimeType,
                                sizeBytes: blob.size,
                            });
                        } catch (error) {
                            console.error("Failed to upload audio to Firebase Storage:", error);
                        }
                    })();

                    if (streamRef.current) {
                        streamRef.current.getTracks().forEach(track => track.stop());
                        streamRef.current = null;
                    }

                    setIsRecording(false);
                    stopTimer();
                    userStopRequestedRef.current = false;
                    return;
                }

                // Auto-stop while UI still says "recording" – start a new segment.
                if (!userStopRequestedRef.current && streamRef.current) {
                    try {
                        startMediaRecorder(streamRef.current, options);
                    } catch (error) {
                        console.error("Failed to restart MediaRecorder after auto-stop:", error);
                        setMicError("Recording was interrupted by the browser. Please try again.");
                        setIsRecording(false);
                        stopTimer();
                    }
                }
            };

            mediaRecorder.onerror = (event) => {
                console.error("MediaRecorder error:", event);
                setMicError("An error occurred during recording.");
                setIsRecording(false);
                stopTimer();
            };

            mediaRecorder.start();
        } catch (error) {
            console.error("Failed to start MediaRecorder:", error);
            setMicError("Audio recording is not supported or failed to start in this browser.");
            setIsRecording(false);
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            }
        }
    };

    const handleStartRecording = async () => {
        setMicError(null);
        setAudioBlob(null);
        setAudioUrl(null);
        setEditedTranscript('');
        userStopRequestedRef.current = false;

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            setMicError("Your browser does not support audio recording.");
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            audioChunksRef.current = [];

            // Pick the most compatible audio mimeType (helps especially on iOS Safari)
            const options: MediaRecorderOptions = {};
            const preferredTypes = [
                'audio/webm;codecs=opus',
                'audio/webm',
                'audio/mp4',
                'audio/mpeg'
            ];
            for (const type of preferredTypes) {
                if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(type)) {
                    options.mimeType = type;
                    break;
                }
            }

            setIsRecording(true);
            startTimer();
            startMediaRecorder(stream, options);
        } catch (err: any) {
            console.error("Microphone access error:", err);
            if (err instanceof DOMException && (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError')) {
                setMicError("Microphone access denied. Please check your browser permissions and refresh after allowing access.");
            } else if (err instanceof DOMException && err.name === 'NotFoundError') {
                setMicError("No microphone found. Please ensure it is connected and selected as the default device.");
            } else {
                setMicError("Could not start recording. Please check your microphone and browser permissions, then try again.");
            }
            setIsRecording(false);
        }
    };

    const handleTranscribe = async () => {
        if (!audioBlob) return;

        setIsTranscribing(true);
        setMicError(null);
        apiAbortControllerRef.current = new AbortController();

        try {
            const mimeType = audioBlob.type.split(';')[0]; // e.g., 'audio/webm'
            const audioBase64 = await blobToBase64(audioBlob);
            const transcript = await geminiService.transcribeAudio(audioBase64, mimeType, apiAbortControllerRef.current.signal);
            setEditedTranscript(transcript || '');
        } catch (error: any) {
            if (error.name !== 'AbortError') {
                console.error("Transcription error:", error);
                setMicError("Failed to transcribe audio. Please try again.");
            }
        } finally {
            setIsTranscribing(false);
        }
    };

    const handleRecordAgain = () => {
        setAudioBlob(null);
        setAudioUrl(null);
        setFirebaseAudioUrl(null);
        setAudioDurationSeconds(null);
        setEditedTranscript('');
        setMicError(null);
        stopTimer();
        setElapsedSeconds(0);
    };

    const timerText = `${Math.floor(elapsedSeconds / 60).toString().padStart(2, '0')}:${(elapsedSeconds % 60).toString().padStart(2, '0')}`;
    let timerMessage = 'Speak for at least 60-120 seconds.';
    if (elapsedSeconds >= 60 && elapsedSeconds < 120) timerMessage = 'Excellent! You can stop when ready.';
    else if (elapsedSeconds >= 120) timerMessage = 'Maximum time reached. Finishing up...';

    const isBusy = isRecording || isTranscribing || isAnalyzing;

    const renderFeedback = () => {
        if (!latestFeedback) return null;

        const originalFeedbackHtml = `
            <div class="flex justify-between items-start gap-4">
                <div>
                    <h4 class="text-lg font-semibold text-slate-800 dark:text-slate-200">Your Feedback</h4>
                    <p class="text-sm text-slate-600 dark:text-slate-400">${new Date(latestFeedback.timestamp).toLocaleString()}</p>
                </div>
                <div class="text-center ml-4 flex-shrink-0">
                   <div class="w-24 h-24 rounded-full flex items-center justify-center ${latestFeedback.score >= 8 ? 'bg-green-900 dark:bg-green-500/30' : latestFeedback.score >= 5 ? 'bg-yellow-100 dark:bg-yellow-500/30' : 'bg-red-100 dark:bg-red-500/30'}">
                     <p class="text-4xl font-extrabold ${latestFeedback.score >= 8 ? 'text-green-200 dark:text-green-300' : latestFeedback.score >= 5 ? 'text-yellow-900 dark:text-yellow-200' : 'text-red-600 dark:text-red-300'}">${latestFeedback.score}<span class="text-2xl font-semibold opacity-60">/10</span></p>
                   </div>
                </div>
            </div>
            <div class="mt-4 prose prose-slate max-w-none prose-sm dark:prose-invert text-slate-800 dark:text-slate-200">${latestFeedback.feedback}</div>
            <h5 class="font-semibold mt-6 mb-2 text-slate-800 text-sm dark:text-slate-200">Your Answer Transcript:</h5>
            <p class="text-sm p-3 bg-white dark:bg-slate-900/70 rounded-md border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300 notranslate">${latestFeedback.transcript}</p>
        `;

        return (
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 mt-4 fade-in">
                <FeedbackTranslationControls
                    onTranslate={(lang) => handleTranslateFeedback(lang, originalFeedbackHtml)}
                    isTranslating={isTranslating}
                    onReset={() => setTranslatedFeedback(null)}
                />
                <div className="text-slate-800 dark:text-slate-200" dangerouslySetInnerHTML={{ __html: translatedFeedback ?? originalFeedbackHtml }} />
            </div>
        );
    }

    const showTranscriptionUI = !!editedTranscript;
    const showRecordingUI = !audioUrl && !showTranscriptionUI;
    const showTranscribeUI = audioUrl && !editedTranscript && !isTranscribing;

    return (
        <div>
            {micError && (
                <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-800 dark:text-red-200 p-4 rounded-md mb-4" role="alert">
                    <p className="font-bold">Error</p>
                    <p>{micError}</p>
                </div>
            )}

            {showRecordingUI && (
                <div className="text-center py-4">
                    <button onClick={isRecording ? () => {
                        if (elapsedSeconds < 60) {
                            showModal('Your recording is under 60 seconds. Do you want to continue anyway?', true, () => {
                                handleStopRecording();
                            });
                        } else {
                            handleStopRecording();
                        }
                    } : handleStartRecording} className={`relative bg-red-600 text-white font-semibold py-4 px-8 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all transform hover:scale-105 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center mx-auto gap-3 min-w-[12rem] max-w-[12rem] ${isRecording ? 'recording-pulse' : ''}`}>
                        <span className="flex items-center justify-center gap-3">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C15.3137 2 18 4.68629 18 8V12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12V8C6 4.68629 8.68629 2 12 2Z M12 4C9.79086 4 8 5.79086 8 8V12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12V8C16 5.79086 14.2091 4 12 4Z M20 12V13C20 17.4183 16.4183 21 12 21C7.58172 21 4 17.4183 4 13V12H2V13C2 17.968 5.84581 22 10.5 22V24H13.5V22C18.1542 22 22 17.968 22 13V12H20Z"></path></svg>
                            <span className="dark:text-white">{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
                        </span>
                    </button>
                    {isRecording && <p className={`mt-4 h-12 font-mono timer-prominent ${elapsedSeconds >= 60 ? 'timer-sufficient' : ''}`}>{timerText}</p>}
                    {isRecording && <p className="text-sm text-slate-600 h-5">{timerMessage}</p>}
                </div>
            )}

            {showTranscribeUI && (
                <div className="mt-4 text-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border dark:border-slate-600">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Recording complete. Ready to transcribe.</p>
                    {audioUrl && (
                        <>
                            <audio
                                key={audioUrl}
                                controls
                                src={audioUrl}
                                preload="metadata"
                                onLoadedMetadata={(e) => {
                                    const audio = e.currentTarget;

                                    if (audio.duration && isFinite(audio.duration)) {
                                        setAudioDurationSeconds(Math.round(audio.duration));
                                        return;
                                    }

                                    const retry = setInterval(() => {
                                        if (audio.duration && isFinite(audio.duration)) {
                                            setAudioDurationSeconds(Math.round(audio.duration));
                                            clearInterval(retry);
                                        }
                                    }, 120);
                                }}
                                className="w-full"
                            ></audio>
                            {audioDurationSeconds !== null && (
                                <div className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                                    0:00 / {formatTime(audioDurationSeconds)}
                                </div>
                            )}
                        </>
                    )}
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <button onClick={handleRecordAgain} disabled={isTranscribing} className="flex-1 bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-xl hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500 disabled:opacity-50">
                            Record Again
                        </button>
                        <button onClick={handleTranscribe} disabled={isTranscribing || isAnalyzing} className="flex-1 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-500 disabled:bg-slate-400 dark:disabled:bg-slate-600">
                            {isTranscribing ? 'Transcribing...' : 'Transcribe Audio'}
                        </button>
                    </div>
                </div>
            )}

            {isTranscribing && (
                <div className="text-center py-8">
                    <p className="font-semibold text-slate-700 dark:text-slate-300">Transcribing your audio, please wait...</p>
                    <IndeterminateProgressBar isLoading={true} />
                </div>
            )}

            {showTranscriptionUI && (
                <div className="fade-in">
                    <label htmlFor="transcript-edit-textarea" className="block text-sm font-medium text-slate-800 mb-2">Review and edit your transcribed answer:</label>
                    <textarea
                        id="transcript-edit-textarea"
                        ref={transcriptTextareaRef}
                        value={editedTranscript}
                        onChange={(e) => setEditedTranscript(e.target.value)}
                        className="w-full min-h-[150px] p-4 bg-slate-100 dark:bg-slate-700 border dark:text-slate-200 border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-brand dark:focus:ring-brand-light overflow-hidden"
                        rows={5}
                        disabled={isBusy}
                    />
                    <div className="mt-4 flex flex-col-reverse sm:flex-row gap-4">
                        <button onClick={handleRecordAgain} className="bg-slate-200 text-slate-900 font-semibold py-3 px-6 rounded-lg hover:bg-slate-300 transition-colors w-full sm:w-auto flex items-center justify-center gap-2">
                            <RefreshCcw className="w-4 h-4 transition-transform duration-500 group-hover:-rotate-180" />
                            <span>Record Again</span>
                        </button>
                        <button
                            onClick={() =>
                                handleAnalyzeAnswer(
                                    editedTranscript,
                                    firebaseAudioUrl || undefined,
                                    audioDurationSeconds ?? undefined
                                )
                            }
                            disabled={isAnalyzing || !editedTranscript.trim()}
                            className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-400 disabled:cursor-not-allowed"
                        >
                            {isAnalyzing ? 'Analyzing...' : 'Analyze My Answer'}
                        </button>
                    </div>
                </div>
            )}

            <div className="mt-6 progress-bar-container">
                <IndeterminateProgressBar isLoading={isAnalyzing} />
                {renderFeedback()}
            </div>
        </div>
    );
};

const FeedbackTranslationControls: React.FC<{ onTranslate: (lang: 'hi' | 'gu') => void, isTranslating: boolean, onReset?: () => void }> = ({ onTranslate, isTranslating, onReset }) => {
    const [activeLang, setActiveLang] = useState('en');

    const handleLangClick = (lang: string) => {
        if (lang === activeLang) return;
        setActiveLang(lang);
        if (lang === 'en') {
            if (onReset) onReset();
        } else {
            onTranslate(lang as 'hi' | 'gu');
        }
    };

    // As feedback re-renders, this component is re-created, so we don't need to reset to English.
    // The parent controls the translated content state. A null value means English.

    return (
        <div className="flex justify-end items-center gap-2 mb-4">
            <button
                onClick={() => handleLangClick('en')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 ${activeLang === 'en'
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                    }`}
                disabled={isTranslating}
            >
                English
            </button>
            <button
                onClick={() => handleLangClick('hi')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 ${activeLang === 'hi'
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                    }`}
                disabled={isTranslating}
            >
                हिन्दी
            </button>
            <button
                onClick={() => handleLangClick('gu')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 ${activeLang === 'gu'
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                    }`}
                disabled={isTranslating}
            >
                ગુજરાતી
            </button>
        </div>
    );
}

const HistoryCard: React.FC<{ item: HistoryItem; index?: number }> = ({ item, index = 0 }) => {
    const scoreColor = item.score >= 8
        ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/30'
        : item.score >= 5
            ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg shadow-amber-500/30'
            : 'bg-gradient-to-r from-rose-500 to-red-500 text-white shadow-lg shadow-rose-500/30';

    const scoreIcon = item.score >= 8 ? <Crown className="w-4 h-4" /> : item.score >= 5 ? <Star className="w-4 h-4" /> : <Target className="w-4 h-4" />;

    return (
        <details
            className="group bg-white/80 dark:bg-[#161b22]/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-slate-200/50 dark:border-[#30363d] transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-200 dark:hover:border-purple-700"
            style={{ animationDelay: `${index * 50}ms` }}
        >
            <summary className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-5 list-none cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors duration-300 gap-3">
                <div className="flex items-start gap-2 sm:gap-4 flex-grow min-w-0">
                    <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 text-purple-600 dark:text-purple-400 font-bold text-sm flex-shrink-0">
                        Q{item.questionId?.replace('question_', '') || '?'}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="font-semibold text-sm sm:text-base text-slate-800 dark:text-white line-clamp-2 mb-2">{item.question}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                                <span className="truncate">{new Date(item.timestamp).toLocaleString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}</span>
                            </div>
                            {item.university && (
                                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                                    <GraduationCap className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                                    <span className="truncate">{item.university}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 flex-shrink-0">
                    <span className={`flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl dark:text-white ${scoreColor}`}>
                        {scoreIcon}
                        {item.score}/10
                    </span>
                    <ChevronDown className="w-5 h-5 text-slate-400 dark:text-slate-500 transition-transform duration-300 group-open:rotate-180" />
                </div>
            </summary>
            <div className="p-4 sm:p-6 border-t border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-b from-slate-50/50 to-white/50 dark:from-slate-800/50 dark:to-slate-900/50">
                {/* Feedback Section */}
                <div className="mb-4 sm:mb-6">
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <BarChart3 className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                        <h5 className="font-semibold text-sm text-indigo-700 dark:text-indigo-400">AI Feedback</h5>
                    </div>
                    <div className="prose prose-sm prose-slate max-w-none dark:prose-invert text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-800/50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-slate-200/50 dark:border-slate-700/50" dangerouslySetInnerHTML={{ __html: item.feedback }} />
                </div>

                {/* Your Answer Section */}
                <div>
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <Edit3 className="w-4 h-4 text-purple-500 flex-shrink-0" />
                        <h5 className="font-semibold text-sm text-purple-700 dark:text-purple-400">Your Answer</h5>
                    </div>
                    <div className="bg-purple-50/50 dark:bg-purple-900/20 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-purple-200/50 dark:border-purple-700/30">
                        <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{item.transcript}</p>
                    </div>
                </div>
            </div>
        </details>
    );
};

export default UkPrecasApp;
