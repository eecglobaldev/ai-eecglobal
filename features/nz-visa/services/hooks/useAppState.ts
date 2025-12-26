/**
 * 📝 useAppState Hook (NZ Student Visa Prep)
 * 
 * Custom React hook that manages complete app state with:
 * - ✅ localStorage (fast, immediate)
 * - ✅ Firestore (persistent, cross-device)
 * - ✅ Automatic save/load
 * - ✅ Auth-success event integration
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import type { UserProfile, PrepContent, HistoryItem } from '../../types';
import { saveUserState, loadUserState } from '../userStateService';
import { INITIAL_USER_PROFILE } from '../../constants';

const APP_STATE_KEY = 'nzVisaCanvasState_v7_react';

/**
 * Merge profile with INITIAL_USER_PROFILE to ensure all fields exist
 */
const mergeProfile = (profile: Partial<UserProfile> | undefined): UserProfile => {
  if (!profile) return INITIAL_USER_PROFILE;
  
  return {
    ...INITIAL_USER_PROFILE,
    ...profile,
    fundingSources: {
      ...INITIAL_USER_PROFILE.fundingSources,
      ...(profile.fundingSources || {}),
    },
  };
};

export interface AppState {
  profile: UserProfile;
  prepContent: PrepContent | null;
  history: HistoryItem[];
  currentQuestionIndex: number;
  currentPrepDataId: string | null;
}

interface UseAppStateReturn {
  profile: UserProfile;
  setProfile: (profile: UserProfile | ((prev: UserProfile) => UserProfile)) => void;
  prepContent: PrepContent | null;
  setPrepContent: (content: PrepContent | null) => void;
  history: HistoryItem[];
  setHistory: (history: HistoryItem[] | ((prev: HistoryItem[]) => HistoryItem[])) => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number | ((prev: number) => number)) => void;
  currentPrepDataId: string | null;
  setCurrentPrepDataId: (id: string | null) => void;
  isLoadingFromFirestore: boolean;
  saveToFirestore: () => Promise<void>;
}

/**
 * Get initial state from localStorage
 */
const getInitialState = (): AppState => {
  // SSR guard: localStorage is only available in the browser
  if (typeof window === 'undefined') {
    return {
      profile: INITIAL_USER_PROFILE,
      prepContent: null,
      history: [],
      currentQuestionIndex: 0,
      currentPrepDataId: null,
    };
  }

  try {
    const saved = localStorage.getItem(APP_STATE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        profile: mergeProfile(parsed.profile),
        prepContent: parsed.prepContent || null,
        history: parsed.history || [],
        currentQuestionIndex: parsed.currentQuestionIndex || 0,
        currentPrepDataId: parsed.currentPrepDataId || (typeof window !== 'undefined' ? localStorage.getItem('currentPrepDataId') : null) || null,
      };
    }
  } catch (error) {
    console.error('Error loading initial state from localStorage:', error);
  }
  
  // Fallback to localStorage for backward compatibility
  const storedPrepId = typeof window !== 'undefined' 
    ? (localStorage.getItem('currentPrepDataId') || localStorage.getItem('latestPrepDataId'))
    : null;
  
  return {
    profile: INITIAL_USER_PROFILE,
    prepContent: null,
    history: [],
    currentQuestionIndex: 0,
    currentPrepDataId: storedPrepId || null,
  };
};

/**
 * useAppState - Complete app state management with Firestore persistence
 */
export function useAppState(): UseAppStateReturn {
  const [appState, setAppState] = useState<AppState>(getInitialState);
  const [isLoadingFromFirestore, setIsLoadingFromFirestore] = useState(false);
  const [hasLoadedFromFirestore, setHasLoadedFromFirestore] = useState(false);

  // ========== Load from Firestore on mount ==========
  useEffect(() => {
    const loadFromFirestore = async () => {
      if (hasLoadedFromFirestore) return;
      
      // SSR guard: localStorage is only available in the browser
      if (typeof window === 'undefined') {
        setHasLoadedFromFirestore(true);
        return;
      }
      
      const userEmail = localStorage.getItem('NZUserEmail');
      if (!userEmail) {
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
            profile: mergeProfile(firestoreState.profile || prev.profile),
            prepContent: firestoreState.prepContent || prev.prepContent,
            history: firestoreState.history.length > 0 ? firestoreState.history : prev.history,
            currentQuestionIndex: firestoreState.currentQuestionIndex >= 0 
              ? firestoreState.currentQuestionIndex 
              : prev.currentQuestionIndex,
            currentPrepDataId: (firestoreState as any).currentPrepDataId || prev.currentPrepDataId,
          }));
          
          // console.log('✅ User state loaded from Firestore', {
          //   hasPrepContent: !!firestoreState.prepContent,
          //   historyCount: firestoreState.history.length,
          //   prepDataId: (firestoreState as any).currentPrepDataId
          // });
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

  // ========== Listen for auth success event ==========
  useEffect(() => {
    // SSR guard: window is only available in the browser
    if (typeof window === 'undefined') return;

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
              profile: mergeProfile(firestoreState.profile || appState.profile),
              prepContent: firestoreState.prepContent,
              history: firestoreState.history,
              currentQuestionIndex: firestoreState.currentQuestionIndex,
              currentPrepDataId: (firestoreState as any).currentPrepDataId || null,
            });
            
            // console.log('✅ User state loaded from Firestore after sign-in', {
            //   hasPrepContent: !!firestoreState.prepContent,
            //   historyCount: firestoreState.history.length,
            //   prepDataId: (firestoreState as any).currentPrepDataId
            // });
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

  // ========== Save to localStorage + debounced Firestore save ==========
  useEffect(() => {
    // SSR guard: localStorage is only available in the browser
    if (typeof window === 'undefined') return;

    // Save to localStorage immediately (fast)
    try {
      localStorage.setItem(APP_STATE_KEY, JSON.stringify(appState));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }

    // Debounced save to Firestore (1 second delay)
    const handler = setTimeout(() => {
      const userEmail = localStorage.getItem('NZUserEmail');
      if (userEmail && hasLoadedFromFirestore && !isLoadingFromFirestore) {
        saveUserState({
          prepContent: appState.prepContent,
          history: appState.history,
          currentQuestionIndex: appState.currentQuestionIndex,
          profile: appState.profile,
          currentPrepDataId: appState.currentPrepDataId,
        }).catch(error => {
          console.error('❌ Auto-save to Firestore failed:', error);
        });
      }
    }, 1000);

    return () => clearTimeout(handler);
  }, [appState, hasLoadedFromFirestore, isLoadingFromFirestore]);

  // ========== Manual Firestore save function ==========
  const saveToFirestore = useCallback(async () => {
    // SSR guard: localStorage is only available in the browser
    if (typeof window === 'undefined') return;

    const userEmail = localStorage.getItem('NZUserEmail');
    if (!userEmail) {
      // console.log('⚠️ No user authenticated, skipping Firestore save');
      return;
    }

    try {
      // console.log('💾 Saving user state to Firestore...', {
      //   hasPrepContent: !!appState.prepContent,
      //   historyCount: appState.history.length,
      //   prepDataId: appState.currentPrepDataId
      // });
      await saveUserState({
        prepContent: appState.prepContent,
        history: appState.history,
        currentQuestionIndex: appState.currentQuestionIndex,
        profile: appState.profile,
        currentPrepDataId: appState.currentPrepDataId,
      } as any);
      // console.log('✅ User state saved to Firestore');
    } catch (error) {
      console.error('❌ Error saving to Firestore:', error);
    }
  }, [appState]);

  // ========== Expose setter functions ==========
  const setProfile = useCallback((profile: UserProfile | ((prev: UserProfile) => UserProfile)) => {
    setAppState(prev => {
      // Handle both direct value and updater function
      const newProfile = typeof profile === 'function' ? profile(prev.profile) : profile;
      // Always merge with INITIAL_USER_PROFILE to prevent undefined values
      const mergedProfile = mergeProfile(newProfile);
      return { ...prev, profile: mergedProfile };
    });
  }, []);

  const setPrepContent = useCallback((content: PrepContent | null) => {
    setAppState(prev => ({ ...prev, prepContent: content }));
  }, []);

  const setHistory = useCallback((history: HistoryItem[] | ((prev: HistoryItem[]) => HistoryItem[])) => {
    setAppState(prev => ({
      ...prev,
      history: typeof history === 'function' ? history(prev.history) : history,
    }));
  }, []);

  const setCurrentQuestionIndex = useCallback((index: number | ((prev: number) => number)) => {
    setAppState(prev => ({
      ...prev,
      currentQuestionIndex: typeof index === 'function' ? index(prev.currentQuestionIndex) : index,
    }));
  }, []);

  const setCurrentPrepDataId = useCallback((id: string | null) => {
    setAppState(prev => ({ ...prev, currentPrepDataId: id }));
    // Also update localStorage for backward compatibility
    if (id && typeof window !== 'undefined') {
      localStorage.setItem('currentPrepDataId', id);
      localStorage.setItem('latestPrepDataId', id);
    }
  }, []);

  return {
    profile: appState.profile,
    setProfile,
    prepContent: appState.prepContent,
    setPrepContent,
    history: appState.history,
    setHistory,
    currentQuestionIndex: appState.currentQuestionIndex,
    setCurrentQuestionIndex,
    currentPrepDataId: appState.currentPrepDataId,
    setCurrentPrepDataId,
    isLoadingFromFirestore,
    saveToFirestore,
  };
}

