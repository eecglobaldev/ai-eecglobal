'use client';

import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, PrepContent, HistoryItem, ModalState, TestScores, Sponsor, CareerGoalDetails, WorkExperienceItem } from '../types';
import { COURSE_LEVELS, AUTH_MODAL_EVENT } from '../constants';
// import { getAuth } from "firebase/auth"; // Unused locally in this component if using services

import { generatePrepPlan, analyzeAnswer, getPronunciation } from '../services/geminiService';
import { playAudio } from '../utils/audio';
import { UNIVERSITIES } from '../data/universities';

import Header from './Header';
import Modal from './Modal';
import PracticeSection from './PracticeSection';
import UniversityInput from './UniversityInput';
import IndianUniversityInput from './IndianUniversityInput';
import SponsorDetailsForm from './SponsorDetailsForm';
import CareerGoalsForm from './CareerGoalsForm';
import WorkExperienceForm from './WorkExperienceForm';
import AutoResizeTextarea from './AutoResizeTextarea';
import PillarContent from './PillarContent';
import MethodologySection from './MethodologySection';
import { BranchLocator } from './BranchLocator';
import KnowledgeHub from './KnowledgeHub';
import GeoContentSection from './GeoContentSection';
import GEOContent from './GEOContent';
import LoginSignupModal from './LoginSignupModal';
import AuthGateModal from './AuthGateModal';
import SEOFooter from './SEOFooter';
import Breadcrumbs from './Breadcrumbs';

import { incrementPrepPlanCount, getUserByEmail, getUserIdByEmail } from '../services/userService';
import { ensureUserSignedIn } from '../services/authService';
import { sendRegistrationNotificationEmails } from '../services/emailService';
import { saveAcademicPlan } from '../services/academicPlanService';
import { savePrepData, addPracticeHistoryItem } from '../services/prepDataService';
import { useAppState } from '../hooks/useAppState';
import { useLocalStorage } from '../hooks/useLocalStorage';

const UsaVisaApp: React.FC = () => {
    // Clear cached state at most once per day (but preserve auth and persistence keys)
    useEffect(() => {
        try {
            if (typeof window === 'undefined') return;
            const STORAGE_CLEAR_KEY = 'f1Visa:lastStorageClearDate';
            const today = new Date().toISOString().split('T')[0];
            const lastClearDate = window.localStorage.getItem(STORAGE_CLEAR_KEY);

            if (lastClearDate !== today) {
                // Preserve authentication and persistence keys
                const usaUserEmail = window.localStorage.getItem('USAUserEmail');
                const usaUserName = window.localStorage.getItem('USAUserName');

                // Be careful clearing everything if this app is hosted on same domain as others
                // But for this feature, we follow original logic but maybe scoped if possible.
                // Original logic: window.localStorage.clear();
                // We should probably NOT clear everything in a monorepo/shared environment.
                // Commenting out global clear for safety in migration, or scoped clear.
                // window.localStorage.clear(); 
                // window.sessionStorage.clear();

                // instead just set the date
                window.localStorage.setItem(STORAGE_CLEAR_KEY, today);
            }
        } catch (err) {
            // Ignore storage errors
        }
    }, []);

    // Use useAppState hook for automatic Firestore persistence
    const {
        profile,
        prepContent,
        history,
        isLoadingFromFirestore,
        currentQuestionIndex,
        setProfile,
        setPrepContent,
        setHistory,
        setCurrentQuestionIndex,
    } = useAppState();

    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useLocalStorage<boolean>('f1VisaAuthenticated_v1', false);
    const [isLoggedIn, setIsLoggedIn] = useLocalStorage<boolean>('f1VisaLoggedIn_v1', false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authScreen, setAuthScreen] = useState<'signup' | 'login'>('signup');
    const [modalState, setModalState] = useState<ModalState>({ isOpen: false, message: '' });
    const [progress, setProgress] = useState(0);
    const [pronunciation, setPronunciation] = useState<{ phonetic: string; audio: string | null }>({ phonetic: '', audio: null });
    const [isFetchingPronunciation, setIsFetchingPronunciation] = useState(false);

    const interviewSectionRef = useRef<HTMLElement>(null);
    const pronunciationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
        const fetchPronunciation = async () => {
            if (profile.university && UNIVERSITIES.some(u => u.name === profile.university)) {
                setIsFetchingPronunciation(true);
                setPronunciation({ phonetic: '', audio: null });
                try {
                    const result = await getPronunciation(profile.university);
                    if (result) {
                        setPronunciation(result);
                    }
                } catch (e) {
                    // Failed to fetch pronunciation
                } finally {
                    setIsFetchingPronunciation(false);
                }
            } else {
                setPronunciation({ phonetic: '', audio: null });
            }
        };

        if (pronunciationTimeoutRef.current) {
            clearTimeout(pronunciationTimeoutRef.current);
        }

        pronunciationTimeoutRef.current = setTimeout(() => {
            if (profile.university) {
                fetchPronunciation();
            } else {
                setPronunciation({ phonetic: '', audio: null });
            }
        }, 500);

        return () => {
            if (pronunciationTimeoutRef.current) {
                clearTimeout(pronunciationTimeoutRef.current);
            }
        };
    }, [profile.university]);

    // Listen for auth modal events from Header
    useEffect(() => {
        const handleAuthModalEvent = (event: CustomEvent<{ type: 'login' | 'signup' }>) => {
            setAuthScreen(event.detail.type);
            setShowAuthModal(true);
        };

        if (typeof window !== 'undefined') {
            window.addEventListener(AUTH_MODAL_EVENT, handleAuthModalEvent as EventListener);
            return () => {
                window.removeEventListener(AUTH_MODAL_EVENT, handleAuthModalEvent as EventListener);
            };
        }
    }, []);

    const showModal = (message: string, isConfirm = false, onConfirm?: () => void) => {
        setModalState({ isOpen: true, message, isConfirm, onConfirm });
    };

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleTestScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setProfile(prev => ({
            ...prev,
            testScores: {
                ...prev.testScores,
                [name]: type === 'checkbox' ? checked : value
            }
        }));
    };

    const handleSponsorsChange = (newSponsors: Sponsor[]) => {
        setProfile(prev => ({ ...prev, sponsors: newSponsors }));
    }

    const handleWorkExperienceChange = (newWorkExperience: WorkExperienceItem[]) => {
        setProfile(prev => ({ ...prev, workExperience: newWorkExperience }));
    };

    const handleCareerGoalChange = (newCareerGoals: CareerGoalDetails) => {
        setProfile(prev => ({ ...prev, careerGoals: newCareerGoals }));
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value as 'yes' | 'no' }));
    };

    const handleGeneratePrep = async () => {
        if (!isLoggedIn) {
            setShowAuthModal(true);
            setAuthScreen('signup');
            return showModal('Please sign up or log in to generate your prep plan.');
        }

        const userEmail = typeof window !== 'undefined' ? window.localStorage.getItem('USAUserEmail') : null;
        if (!userEmail) {
            setShowAuthModal(true);
            setAuthScreen('login');
            return showModal('Please log in to generate your prep plan.');
        }

        setIsAuthenticated(false);
        setIsLoading(true);
        setProgress(0);
        let progressInterval: ReturnType<typeof setInterval>;

        progressInterval = setInterval(() => {
            setProgress(p => (p < 95 ? p + 2 : p));
        }, 100);

        try {
            let userId: string | null = null;
            try {
                const firebaseUser = await ensureUserSignedIn();
                userId = firebaseUser.uid;
            } catch (authError) {
                console.error("Failed to ensure user signed in:", authError);
                if (userEmail) {
                    try {
                        userId = await getUserIdByEmail(userEmail);
                    } catch (e) {
                        console.error("Failed to get user ID:", e);
                    }
                }
            }

            if (userId) {
                try {
                    await saveAcademicPlan({
                        userId,
                        academicPlan: profile,
                    });
                } catch (e) {
                    console.error("Failed to save academic plan:", e);
                }
            }

            if (userEmail) {
                try {
                    await incrementPrepPlanCount(userEmail);
                } catch (e) {
                    console.error("Failed to update prep plan count:", e);
                }
            }

            const requiredFields: (keyof UserProfile)[] = ['university', 'courseLevel', 'course', 'lastQualification', 'grade'];
            for (const field of requiredFields) {
                if (!profile[field]) {
                    clearInterval(progressInterval);
                    setIsLoading(false);
                    setProgress(0);
                    return showModal('Please fill in all academic and personalization details to generate your plan.');
                }
            }
            if (!profile.careerGoals.goal || !profile.careerGoals.details) {
                clearInterval(progressInterval);
                setIsLoading(false);
                setProgress(0);
                return showModal('Please provide your future career goals in India.');
            }
            if (!profile.indianUniversity) {
                clearInterval(progressInterval);
                setIsLoading(false);
                setProgress(0);
                return showModal('Please provide your Indian school or university name.');
            }
            if (profile.sponsors.length === 0 || profile.sponsors.some(s => !s.type)) {
                clearInterval(progressInterval);
                setIsLoading(false);
                setProgress(0);
                return showModal('Please select a sponsor type for all financial sponsors.');
            }

            try {
                if (userEmail) {
                    const userData = await getUserByEmail(userEmail);
                    if (userData) {
                        await sendRegistrationNotificationEmails(userData, profile);
                    }
                }
            } catch (emailError) {
                // Continue
            }

            const content = await generatePrepPlan(profile);

            if (content) {
                setPrepContent(content);
                setProgress(100);

                if (userId) {
                    try {
                        const profileSummary = `${profile.courseLevel} in ${profile.course} at ${profile.university}`;
                        const result = await savePrepData({
                            userId,
                            prepContent: content,
                            profileSummary,
                        });

                        if (result.success && result.prepDataId) {
                            if (typeof window !== 'undefined') window.localStorage.setItem('lastPrepDataId', result.prepDataId);
                        }
                    } catch (e) {
                        console.error("Failed to save prep data:", e);
                    }
                }

                setTimeout(() => {
                    interviewSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                    setProgress(0);
                }, 500);
            } else {
                throw new Error("Received empty content from the AI.");
            }
        } catch (error) {
            showModal(error instanceof Error ? error.message : "An unknown error occurred.");
            setProgress(0);
        } finally {
            clearInterval(progressInterval);
            setIsLoading(false);
        }
    };

    const handleGetFeedback = async (
        question: string,
        transcript: string,
        questionId?: string,
        audioUrl?: string,
        audioDurationSeconds?: number
    ): Promise<HistoryItem | null> => {
        if (!isLoggedIn) {
            setShowAuthModal(true);
            setAuthScreen('login');
            showModal('Please log in to get feedback on your practice.');
            return null;
        }
        try {
            const feedback = await analyzeAnswer(question, transcript);

            if (!feedback) {
                showModal("The AI returned content feedback in an unexpected format. Please try again.");
                return null;
            }

            const newHistoryItem: HistoryItem = {
                id: Date.now(),
                timestamp: new Date().toISOString(),
                question,
                questionId,
                transcript,
                audioUrl,
                audioDurationSeconds,
                ...feedback,
            };

            setHistory(prev => [newHistoryItem, ...prev]);

            // Save to Firestore
            try {
                const firebaseUser = await ensureUserSignedIn();
                const userId = firebaseUser.uid;
                const prepDataId = typeof window !== 'undefined' ? window.localStorage.getItem('lastPrepDataId') || `prep_${Date.now()}` : `prep_${Date.now()}`;
                await addPracticeHistoryItem(userId, prepDataId, newHistoryItem);
            } catch (e) {
                console.error("Failed to save history:", e);
            }

            return newHistoryItem;
        } catch (error) {
            console.error("Error getting feedback:", error);
            showModal(error instanceof Error ? error.message : "An error occurred while getting feedback.");
            return null;
        }
    };

    const handleClearHistory = () => {
        showModal("Are you sure you want to clear your entire practice history?", true, () => {
            setHistory([]);
            setModalState({ isOpen: false, message: '' });
        });
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setShowAuthModal(false);
        setModalState({ isOpen: false, message: '' });
    };

    const showIndianUniversitySearch = profile.courseLevel === 'Masters' || profile.courseLevel === 'PhD';
    
    const coursePlaceholder =
        profile.courseLevel === 'Bachelors' ? "e.g., Computer Science" :
        profile.courseLevel === 'PhD' ? "e.g., PhD in Artificial Intelligence" :
        "e.g., MS in Business Analytics";
    
    const lastQualificationPlaceholder = 
        profile.courseLevel === 'Bachelors' ? "e.g., 12th Grade / HSC (GSHSEB)" :
        profile.courseLevel === 'PhD' ? "e.g., M.S. in Data Science from University of Mumbai" :
        "e.g., B.E. in Information Technology from GTU";

    const gradePlaceholder = 
        profile.courseLevel === 'Bachelors' ? "e.g., 88% or 9.2 CGPA" :
        profile.courseLevel === 'PhD' ? "e.g., 3.8/4.0 GPA in Masters" :
        "e.g., 8.7 SPI or First Class with Distinction";

    return (
        <div id="usa-visa-app-root">
            {showAuthModal && (
                authScreen === 'signup' ? (
                    <LoginSignupModal
                        onAuthSuccess={handleLoginSuccess}
                        onSwitchToLogin={() => setAuthScreen('login')}
                        onClose={() => setShowAuthModal(false)}
                    />
                ) : (
                    <AuthGateModal
                        onAuthSuccess={handleLoginSuccess}
                        onSwitchToSignup={() => setAuthScreen('signup')}
                        onClose={() => setShowAuthModal(false)}
                    />
                )
            )}

            <div className={showAuthModal ? 'blur-sm pointer-events-none' : ''}>
                <Header />

                <Breadcrumbs />
                <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                    <section id="setup" className="mb-16 text-center">
                        <div className="flex flex-col">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight max-w-3xl mx-auto">AI-Powered USA F-1 Visa Interview Prep By EEC</h1>
                            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Enter your details for an ultra hyper-personalized US student visa preparation UNLIMITED experience. Anytime. Anywhere (Version 3.0)</p>
                            <div className="flex flex-col items-center justify-center mt-8">
                                <img
                                    src="/assets/visaQueue.jpeg"
                                    alt="Visa Interview Queue"
                                    className="rounded-2xl shadow-lg object-cover w-full max-w-md"
                                />
                                <p className="mt-4 text-base text-slate-700 dark:text-slate-300 text-center">
                                    Real Photo US Consulate, India on Visa Day
                                </p>
                            </div>
                        </div>

                        <div className="mt-10 max-w-xl mx-auto bg-white dark:bg-slate-800/50 p-6 sm:p-8 rounded-2xl shadow-lg dark:shadow-2xl border border-slate-200/80 dark:border-slate-700/80">
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 text-left border-b border-slate-200 dark:border-slate-700 pb-3">Your Academic Plan<span className="text-red-500 ml-1">*</span></h2>
                                <div>
                                    <label htmlFor="university" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 text-left">Your US University<span className="text-red-500 ml-1">*</span></label>
                                    <UniversityInput
                                        value={profile.university}
                                        onChange={(newValue) => setProfile(prev => ({ ...prev, university: newValue }))}
                                    />
                                    {(isFetchingPronunciation || pronunciation.phonetic) && (
                                        <div className="mt-2 text-left px-1">
                                            {isFetchingPronunciation ? (
                                                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 animate-pulse bg-slate-100 dark:bg-slate-700/50 rounded-md p-2">
                                                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                    Fetching pronunciation...
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-between gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 rounded-md p-2 fade-in">
                                                    <span className="font-mono break-words">{pronunciation.phonetic}</span>
                                                    {pronunciation.audio && (
                                                        <button 
                                                            onClick={() => playAudio(pronunciation.audio!)} 
                                                            disabled={isFetchingPronunciation}
                                                            className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex-shrink-0 disabled:opacity-50"
                                                            aria-label="Play pronunciation"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="courseLevel" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 text-left">Course Level<span className="text-red-500 ml-1">*</span></label>
                                    <select id="courseLevel" name="courseLevel" value={profile.courseLevel} onChange={handleProfileChange} className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 transition-shadow bg-white dark:bg-slate-900 dark:text-slate-100">
                                        <option value="">-- Select a Course Level --</option>
                                        {COURSE_LEVELS.map(level => <option key={level} value={level}>{level}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="course" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 text-left">Your Course of Study (Major)<span className="text-red-500 ml-1">*</span></label>
                                    <input type="text" id="course" name="course" value={profile.course} onChange={handleProfileChange} placeholder={coursePlaceholder} className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 transition-shadow bg-white dark:bg-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500" />
                                </div>

                                <hr className="!my-8 border-slate-200 dark:border-slate-700" />
                                
                                {/* Personalization Details */}
                                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 text-left border-b border-slate-200 dark:border-slate-700 pb-3">Personalization Details<span className="text-red-500 ml-1">*</span></h2>
                                <div>
                                    <label htmlFor="lastQualification" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 text-left">Last Qualification<span className="text-red-500 ml-1">*</span></label>
                                    <input type="text" id="lastQualification" name="lastQualification" value={profile.lastQualification} onChange={handleProfileChange} placeholder={lastQualificationPlaceholder} className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 transition-shadow bg-white dark:bg-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500" />
                                </div>
                                <div>
                                    <label htmlFor="grade" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 text-left">Grade<span className="text-red-500 ml-1">*</span></label>
                                    <input type="text" id="grade" name="grade" value={profile.grade} onChange={handleProfileChange} placeholder={gradePlaceholder} className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 transition-shadow bg-white dark:bg-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500" />
                                </div>
                                <div>
                                    <label htmlFor="indianUniversity" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 text-left">
                                        {showIndianUniversitySearch ? 'Indian University' : 'Indian High School Name'}
                                        <span className="text-red-500 ml-1">*</span>
                                    </label>
                                    {showIndianUniversitySearch ? (
                                        <IndianUniversityInput 
                                            value={profile.indianUniversity}
                                            onChange={(newValue) => setProfile(prev => ({ ...prev, indianUniversity: newValue }))}
                                        />
                                    ) : (
                                        <input 
                                            type="text" 
                                            id="indianUniversity" 
                                            name="indianUniversity" 
                                            value={profile.indianUniversity} 
                                            onChange={handleProfileChange} 
                                            placeholder="e.g., Delhi Public School, Bopal, Ahmedabad" 
                                            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 transition-shadow bg-white dark:bg-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                        />
                                    )}
                                </div>

                                <hr className="!my-8 border-slate-200 dark:border-slate-700" />
                                <WorkExperienceForm workExperience={profile.workExperience} onWorkExperienceChange={handleWorkExperienceChange} />
                                <hr className="!my-8 border-slate-200 dark:border-slate-700" />
                                <SponsorDetailsForm sponsors={profile.sponsors} onSponsorsChange={handleSponsorsChange} showModal={showModal} />
                                <hr className="!my-8 border-slate-200 dark:border-slate-700" />
                                <CareerGoalsForm careerGoals={profile.careerGoals} onCareerGoalChange={handleCareerGoalChange} showModal={showModal} />

                                <hr className="!my-8 border-slate-200 dark:border-slate-700" />

                                {/* Standardized Test Scores */}
                                <div className="text-left">
                                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 text-left border-b border-slate-200 dark:border-slate-700 pb-3 mb-4">Standardized Test Scores (if any)</h2>
                                    <fieldset className="space-y-4 border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
                                        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">English Proficiency</h3>
                                        <div className="space-y-2">
                                            <label className="flex items-center text-sm"><input type="checkbox" name="waiverIB" checked={profile.testScores.waiverIB} onChange={handleTestScoreChange} className="mr-2 h-4 w-4 accent-indigo-600 dark:accent-indigo-500"/>English Test Waiver (IB or Cambridge IGCSE)</label>
                                            <label className="flex items-center text-sm"><input type="checkbox" name="waiverIndianBoard" checked={profile.testScores.waiverIndianBoard} onChange={handleTestScoreChange} className="mr-2 h-4 w-4 accent-indigo-600 dark:accent-indigo-500"/>English Test Waiver (CBSE/ICSE/State Board)</label>
                                            <label className="flex items-center text-sm"><input type="checkbox" name="waiverUniversity" checked={profile.testScores.waiverUniversity} onChange={handleTestScoreChange} className="mr-2 h-4 w-4 accent-indigo-600 dark:accent-indigo-500"/>English Test Waiver by University</label>
                                        </div>
                                        <div className="pt-2 grid grid-cols-2 gap-x-6 gap-y-4">
                                            {[
                                                { name: 'ielts', label: 'IELTS', scale: '/ 9.0', max: 9, step: 0.5 },
                                                { name: 'toefl', label: 'TOEFL iBT', scale: '/ 120', max: 120, step: 1 },
                                                { name: 'pte', label: 'PTE Academic', scale: '/ 90', max: 90, step: 1 },
                                                { name: 'duolingo', label: 'Duolingo', scale: '/ 160', max: 160, step: 1 },
                                                { name: 'gre', label: 'GRE', scale: '/ 340', max: 340, step: 1 },
                                                { name: 'sat', label: 'Digital SAT', scale: '/ 1600', max: 1600, step: 1 },
                                                { name: 'gmat', label: 'GMAT', scale: '/ 800', max: 800, step: 1 },
                                            ].map(test => (
                                                <div key={test.name}>
                                                    <label htmlFor={test.name} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{test.label}</label>
                                                    <div className="relative">
                                                        <input type="number" id={test.name} name={test.name} value={(profile.testScores as any)[test.name]} onChange={handleTestScoreChange} min="0" max={test.max} step={test.step} className="w-full pl-3 pr-12 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-sm"/>
                                                        <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-500 dark:text-slate-400 pointer-events-none">{test.scale}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="pt-2 grid grid-cols-2 gap-x-4">
                                            <div>
                                                <label htmlFor="otherTestName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Other Test Name</label>
                                                <input type="text" id="otherTestName" name="otherTestName" value={profile.testScores.otherTestName} onChange={handleTestScoreChange} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-sm"/>
                                            </div>
                                            <div>
                                                <label htmlFor="otherTestScore" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Score</label>
                                                <input type="number" id="otherTestScore" name="otherTestScore" value={profile.testScores.otherTestScore} onChange={handleTestScoreChange} min="0" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-sm"/>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>

                                <hr className="!my-8 border-slate-200 dark:border-slate-700" />

                                {/* Immigration History */}
                                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 text-left border-b border-slate-200 dark:border-slate-700 pb-3">Your Immigration History</h2>
                                <div className="text-left space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Has your US Visa ever been refused?</label>
                                        <div className="flex items-center gap-x-6">
                                            <label className="flex items-center"><input type="radio" name="hasRefusal" value="no" checked={profile.hasRefusal === 'no'} onChange={handleRadioChange} className="mr-2 h-4 w-4 accent-indigo-600 dark:accent-indigo-500"/>No</label>
                                            <label className="flex items-center"><input type="radio" name="hasRefusal" value="yes" checked={profile.hasRefusal === 'yes'} onChange={handleRadioChange} className="mr-2 h-4 w-4 accent-indigo-600 dark:accent-indigo-500"/>Yes</label>
                                        </div>
                                        <div className={`space-y-3 transition-all duration-500 ease-in-out ${profile.hasRefusal === 'yes' ? 'max-h-[500px] mt-3' : 'max-h-0 overflow-hidden'}`}>
                                            <select name="refusalType" value={profile.refusalType} onChange={handleProfileChange} className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-100">
                                                <option value="">Select visa type...</option>
                                                <option value="F-1">Student (F-1)</option>
                                                <option value="B-2">Visitor (B-2)</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            <AutoResizeTextarea name="refusalReason" value={profile.refusalReason} onChange={handleProfileChange} placeholder="e.g., Under Section 214(b) due to insufficient ties to home country." className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-100" rows={2}></AutoResizeTextarea>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Have you traveled to the US before?</label>
                                        <div className="flex items-center gap-x-6">
                                            <label className="flex items-center"><input type="radio" name="hasTraveled" value="no" checked={profile.hasTraveled === 'no'} onChange={handleRadioChange} className="mr-2 h-4 w-4 accent-indigo-600 dark:accent-indigo-500"/>No</label>
                                            <label className="flex items-center"><input type="radio" name="hasTraveled" value="yes" checked={profile.hasTraveled === 'yes'} onChange={handleRadioChange} className="mr-2 h-4 w-4 accent-indigo-600 dark:accent-indigo-500"/>Yes</label>
                                        </div>
                                        <div className={`transition-all duration-500 ease-in-out ${profile.hasTraveled === 'yes' ? 'max-h-[500px] mt-3' : 'max-h-0 overflow-hidden'}`}>
                                            <AutoResizeTextarea name="travelDetails" value={profile.travelDetails} onChange={handleProfileChange} placeholder="e.g., 2019, B-2 visa, Tourism in New York & DC, 15 days." className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-100" rows={2}></AutoResizeTextarea>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Has an immigrant petition (e.g., for a Green Card) ever been filed on your behalf?</label>
                                        <div className="flex items-center gap-x-6">
                                            <label className="flex items-center"><input type="radio" name="hasPetition" value="no" checked={profile.hasPetition === 'no'} onChange={handleRadioChange} className="mr-2 h-4 w-4 accent-indigo-600 dark:accent-indigo-500"/>No</label>
                                            <label className="flex items-center"><input type="radio" name="hasPetition" value="yes" checked={profile.hasPetition === 'yes'} onChange={handleRadioChange} className="mr-2 h-4 w-4 accent-indigo-600 dark:accent-indigo-500"/>Yes</label>
                                        </div>
                                        <div className={`transition-all duration-500 ease-in-out ${profile.hasPetition === 'yes' ? 'max-h-[500px] mt-3' : 'max-h-0 overflow-hidden'}`}>
                                            <input type="text" name="petitionDetails" value={profile.petitionDetails} onChange={handleProfileChange} placeholder="e.g., My father filed an F4 petition (family-based) in 2015." className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"/>
                                        </div>
                                    </div>
                                </div>
                                
                                <hr className="!my-8 border-slate-200 dark:border-slate-700" />

                                {/* Additional Details */}
                                <div className="text-left">
                                    <label htmlFor="additionalDetails" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Optional Additional Details</label>
                                    <AutoResizeTextarea
                                        id="additionalDetails"
                                        name="additionalDetails"
                                        value={profile.additionalDetails}
                                        onChange={handleProfileChange}
                                        placeholder="e.g., Mention any accolades, awards, community involvement, key college projects, travel experiences, online courses (Coursera, edX), certifications (AWS, Google), contributions to GitHub, or personal projects like a YouTube channel. This helps build a stronger, more unique profile."
                                        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                        rows={4}
                                    ></AutoResizeTextarea>
                                </div>
                                
                                <button onClick={handleGeneratePrep} disabled={isLoading} className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-[1.02] disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed disabled:scale-100 !mt-8">
                                    {isLoading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                            {loadingMessage || 'Generating...'}
                                        </span>
                                    ) : (
                                        'Generate Prep Plan'
                                    )}
                                </button>
                                <div className={`h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-4 transition-opacity duration-300 ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
                                    <div className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {prepContent && (
                        <PracticeSection
                            ref={interviewSectionRef}
                            prepContent={prepContent}
                            history={history}
                            onGetFeedback={handleGetFeedback}
                            onClearHistory={handleClearHistory}
                        />
                    )}
                </main>

                <PillarContent />
                <MethodologySection />
                <KnowledgeHub />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <BranchLocator />
                </div>
                <GeoContentSection />
                <GEOContent />

                <SEOFooter />

                <Modal modalState={modalState} onClose={() => setModalState({ isOpen: false, message: '' })} />
            </div>
        </div>
    );
}

export default UsaVisaApp;
