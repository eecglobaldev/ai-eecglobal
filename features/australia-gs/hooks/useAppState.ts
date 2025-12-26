import { useState, useEffect } from 'react';
import type { Profile, PrepContent, HistoryItem } from '../types';
import { INITIAL_PROFILE } from '../services/constants';
import { loadUserState, saveUserState } from '../services/userStateService';

interface AppState {
    profile: Profile;
    prepContent: PrepContent | null;
    history: HistoryItem[];
    currentQuestionIndex: number;
}

const APP_STATE_KEY = 'auVisaCanvasState_v2';

const getInitialState = (): AppState => {
    // SSR guard: localStorage is only available in the browser
    if (typeof window === 'undefined') {
        return {
            profile: INITIAL_PROFILE,
            prepContent: null,
            history: [],
            currentQuestionIndex: 0,
        };
    }

    try {
        const savedState = localStorage.getItem(APP_STATE_KEY);
        if (savedState) {
            const loadedState = JSON.parse(savedState);
            return {
                profile: loadedState.profile || INITIAL_PROFILE,
                prepContent: loadedState.prepContent || null,
                history: loadedState.history || [],
                currentQuestionIndex: loadedState.currentQuestionIndex || 0,
            };
        }
    } catch (error) {
        console.error("Failed to load state from localStorage", error);
    }

    return {
        profile: INITIAL_PROFILE,
        prepContent: null,
        history: [],
        currentQuestionIndex: 0,
    };
};

export function useAppState() {
    const [appState, setAppState] = useState<AppState>(getInitialState);
    const [isLoadingFromFirestore, setIsLoadingFromFirestore] = useState(false);
    const [hasLoadedFromFirestore, setHasLoadedFromFirestore] = useState(false);

    // 📥 Load data from Firestore on mount (if user is authenticated)
    useEffect(() => {
        const loadFromFirestore = async () => {
            // Only try to load once
            if (hasLoadedFromFirestore) {
                return;
            }

            // Check if user is authenticated (SSR guard)
            if (typeof window === 'undefined') {
                setHasLoadedFromFirestore(true);
                return;
            }

            const userEmail = localStorage.getItem('AUgsUserEmail');
            if (!userEmail) {
                // console.log('ℹ️ No authenticated user, skipping Firestore load');
                setHasLoadedFromFirestore(true);
                return;
            }

            setIsLoadingFromFirestore(true);
            // console.log('📥 Loading user state from Firestore...');

            try {
                const firestoreState = await loadUserState();
                
                if (firestoreState) {
                    // Merge Firestore data with current state (Firestore takes priority)
                    setAppState(prev => ({
                        profile: firestoreState.profile || prev.profile,
                        prepContent: firestoreState.prepContent || prev.prepContent,
                        history: firestoreState.history.length > 0 ? firestoreState.history : prev.history,
                        currentQuestionIndex: firestoreState.currentQuestionIndex,
                    }));
                    
                    // console.log('✅ User state loaded from Firestore and applied');
                } else {
                    console.log('ℹ️ No saved state in Firestore, using localStorage/default');
                }
            } catch (error) {
                console.error('❌ Error loading from Firestore:', error);
            } finally {
                setIsLoadingFromFirestore(false);
                setHasLoadedFromFirestore(true);
            }
        };

        loadFromFirestore();
    }, [hasLoadedFromFirestore]);

    // 🔐 Listen for auth success event (when user signs in)
    useEffect(() => {
        // SSR guard: window is only available in the browser
        if (typeof window === 'undefined') {
            return;
        }

        const handleAuthSuccess = async () => {
            // console.log('🔐 Auth success event received in useAppState');
            
            // Reset the flag to allow reloading
            setHasLoadedFromFirestore(false);
            
            // Give Firebase Auth a moment to initialize
            setTimeout(async () => {
                setIsLoadingFromFirestore(true);
                // console.log('📥 Loading user state from Firestore after sign-in...');

                try {
                    const firestoreState = await loadUserState();
                    
                    if (firestoreState) {
                        // Replace state with Firestore data
                        setAppState({
                            profile: firestoreState.profile || appState.profile,
                            prepContent: firestoreState.prepContent,
                            history: firestoreState.history,
                            currentQuestionIndex: firestoreState.currentQuestionIndex,
                        });
                        
                        // console.log('✅ User state loaded from Firestore after sign-in');
                    } else {
                        console.log('ℹ️ No saved state in Firestore for new user');
                    }
                } catch (error) {
                    console.error('❌ Error loading from Firestore after sign-in:', error);
                } finally {
                    setIsLoadingFromFirestore(false);
                    setHasLoadedFromFirestore(true);
                }
            }, 1000); // 1 second delay to ensure Firebase Auth is ready
        };

        window.addEventListener('auth-success', handleAuthSuccess);

        return () => {
            window.removeEventListener('auth-success', handleAuthSuccess);
        };
    }, [appState.profile]);

    // 💾 Save to localStorage (debounced) + Firestore
    useEffect(() => {
        // SSR guard: localStorage is only available in the browser
        if (typeof window === 'undefined') {
            return;
        }

        const handler = setTimeout(() => {
            try {
                // Save to localStorage (fast, immediate access)
                localStorage.setItem(APP_STATE_KEY, JSON.stringify(appState));
                
                // Also save to Firestore (persistent across devices/logout)
                // Only if user is authenticated and has loaded from Firestore at least once
                const userEmail = localStorage.getItem('AUgsUserEmail');
                if (userEmail && hasLoadedFromFirestore && !isLoadingFromFirestore) {
                    saveUserState({
                        prepContent: appState.prepContent,
                        history: appState.history,
                        currentQuestionIndex: appState.currentQuestionIndex,
                        profile: appState.profile,
                    }).catch(error => {
                        console.error('❌ Background save to Firestore failed:', error);
                    });
                }
            } catch (error) {
                console.error("Failed to save state:", error);
            }
        }, 1000); // Debounce saves by 1s (increased from 500ms to reduce Firestore writes)

        return () => {
            clearTimeout(handler);
        };
    }, [appState, hasLoadedFromFirestore, isLoadingFromFirestore]);

    return {
        profile: appState.profile,
        prepContent: appState.prepContent,
        history: appState.history,
        currentQuestionIndex: appState.currentQuestionIndex,
        isLoadingFromFirestore, // Expose loading state for UI
        
        setProfile: (profile: React.SetStateAction<Profile>) => {
            setAppState(prev => ({
                ...prev,
                profile: typeof profile === 'function' ? (profile as (prevState: Profile) => Profile)(prev.profile) : profile,
            }));
        },
        setPrepContent: (prepContent: React.SetStateAction<PrepContent | null>) => {
            setAppState(prev => ({
                ...prev,
                prepContent: typeof prepContent === 'function' ? (prepContent as (prevState: PrepContent | null) => PrepContent | null)(prev.prepContent) : prepContent,
            }));
        },
        setHistory: (history: React.SetStateAction<HistoryItem[]>) => {
            setAppState(prev => ({
                ...prev,
                history: typeof history === 'function' ? (history as (prevState: HistoryItem[]) => HistoryItem[])(prev.history) : history,
            }));
        },
        setCurrentQuestionIndex: (index: React.SetStateAction<number>) => {
            setAppState(prev => ({
                ...prev,
                currentQuestionIndex: typeof index === 'function' ? (index as (prevState: number) => number)(prev.currentQuestionIndex) : index,
            }));
        },
    };
}