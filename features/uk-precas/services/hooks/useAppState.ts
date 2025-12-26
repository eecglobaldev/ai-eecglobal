/**
 * 🎯 useAppState Hook
 * 
 * Complete state management hook with automatic Firestore persistence.
 * 
 * Features:
 * - Auto-loads state from Firestore on mount (if user authenticated)
 * - Auto-saves to localStorage (immediate) and Firestore (debounced 1s)
 * - Listens for auth-success event to reload data on sign-in
 * - Exposes loading state for UI feedback
 */

import { useState, useEffect, useCallback } from 'react';
import { saveUserState, loadUserState } from '../userStateService';
import type { PrepContent, HistoryItem, StudentProfile } from '../../types';

const APP_STATE_KEY = 'credibilityCanvasState';

interface AppState {
  profile: StudentProfile;
  prepContent: PrepContent | null;
  history: HistoryItem[];
  currentQuestionIndex: number;
  translationCache: Record<string, Record<string, string>>;
  currentPrepDataId: string | null;
}

const getInitialProfile = (): StudentProfile => ({
  university: '',
  courseLevel: '',
  course: '',
  previousQualification: '',
  fundingSource: 'Family Savings',
  sponsorOccupation: '',
  careerGoals: '',
  studyGap: '',
});

const getInitialState = (): AppState => {
  // SSR guard: localStorage is only available in the browser
  if (typeof window === 'undefined') {
    return {
      profile: getInitialProfile(),
      prepContent: null,
      history: [],
      currentQuestionIndex: 0,
      translationCache: {},
      currentPrepDataId: null,
    };
  }

  try {
    const saved = localStorage.getItem(APP_STATE_KEY);
    if (saved) {
      const savedState = JSON.parse(saved);
      return {
        profile: savedState.profile || getInitialProfile(),
        prepContent: savedState.prepContent || null,
        history: savedState.history || [],
        currentQuestionIndex: savedState.currentQuestionIndex || 0,
        translationCache: savedState.translationCache || {},
        currentPrepDataId: savedState.currentPrepDataId || null,
      };
    }
  } catch (e) {
    console.error("Could not load state from localStorage", e);
  }

  return {
    profile: getInitialProfile(),
    prepContent: null,
    history: [],
    currentQuestionIndex: 0,
    translationCache: {},
    currentPrepDataId: null,
  };
};

export function useAppState() {
  const [appState, setAppState] = useState<AppState>(getInitialState);
  const [isLoadingFromFirestore, setIsLoadingFromFirestore] = useState(false);
  const [hasLoadedFromFirestore, setHasLoadedFromFirestore] = useState(false);

  // ==================== Load from Firestore on mount ====================
  useEffect(() => {
    const loadFromFirestore = async () => {
      // Only load once
      if (hasLoadedFromFirestore) return;

      // SSR guard: localStorage is only available in the browser
      if (typeof window === 'undefined') {
        setHasLoadedFromFirestore(true);
        return;
      }

      // Check if user is authenticated
      const userEmail = localStorage.getItem('UkUserEmail');
      if (!userEmail) {
        console.log('📭 No user authenticated, skipping Firestore load');
        setHasLoadedFromFirestore(true);
        return;
      }

      setIsLoadingFromFirestore(true);
      console.log('📥 Loading user state from Firestore...');

      try {
        const firestoreState = await loadUserState();

        if (firestoreState) {
          console.log('✅ Firestore state loaded, merging with local state');
          
          setAppState(prev => ({
            ...prev,
            profile: firestoreState.profile || prev.profile,
            prepContent: firestoreState.prepContent || prev.prepContent,
            history: firestoreState.history.length > 0 ? firestoreState.history : prev.history,
            currentQuestionIndex: firestoreState.currentQuestionIndex,
          }));
        } else {
          console.log('📭 No Firestore state found');
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

  // ==================== Listen for auth success event ====================
  useEffect(() => {
    // SSR guard: window is only available in the browser
    if (typeof window === 'undefined') {
      return;
    }

    const handleAuthSuccess = async () => {
      console.log('🔐 Auth success event received in useAppState');
      
      // Reset the flag to allow reloading
      setHasLoadedFromFirestore(false);
      
      // Give Firebase Auth a moment to initialize
      setTimeout(async () => {
        setIsLoadingFromFirestore(true);
        console.log('📥 Loading user state from Firestore after sign-in...');

        try {
          const firestoreState = await loadUserState();
          
          if (firestoreState) {
            // Replace state with Firestore data
            setAppState(prev => ({
              ...prev,
              profile: firestoreState.profile || prev.profile,
              prepContent: firestoreState.prepContent,
              history: firestoreState.history,
              currentQuestionIndex: firestoreState.currentQuestionIndex,
            }));
            
            console.log('✅ User state loaded from Firestore after sign-in');
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
  }, []);

  // ==================== Save to localStorage + Firestore ====================
  useEffect(() => {
    // SSR guard: localStorage is only available in the browser
    if (typeof window === 'undefined') {
      return;
    }

    // Debounced save (1 second delay)
    const handler = setTimeout(() => {
      // Save to localStorage immediately (fast)
      try {
        localStorage.setItem(APP_STATE_KEY, JSON.stringify(appState));
      } catch (e) {
        console.error("Could not save to localStorage", e);
      }

      // Save to Firestore (persistent, debounced)
      const userEmail = localStorage.getItem('UkUserEmail');
      if (userEmail && hasLoadedFromFirestore && !isLoadingFromFirestore) {
        console.log('💾 Auto-saving to Firestore...');
        saveUserState({
          prepContent: appState.prepContent,
          history: appState.history,
          currentQuestionIndex: appState.currentQuestionIndex,
          profile: appState.profile,
        }).then(result => {
          if (result.success) {
            console.log('✅ Auto-saved to Firestore');
          } else {
            console.error('❌ Failed to auto-save to Firestore:', result.error);
          }
        });
      }
    }, 1000);

    return () => clearTimeout(handler);
  }, [appState, hasLoadedFromFirestore, isLoadingFromFirestore]);

  // ==================== Expose state and setters ====================
  const setProfile = useCallback((profile: StudentProfile | ((prev: StudentProfile) => StudentProfile)) => {
    setAppState(prev => ({
      ...prev,
      profile: typeof profile === 'function' ? profile(prev.profile) : profile
    }));
  }, []);

  const setPrepContent = useCallback((prepContent: PrepContent | null | ((prev: PrepContent | null) => PrepContent | null)) => {
    setAppState(prev => ({
      ...prev,
      prepContent: typeof prepContent === 'function' ? prepContent(prev.prepContent) : prepContent
    }));
  }, []);

  const setHistory = useCallback((history: HistoryItem[] | ((prev: HistoryItem[]) => HistoryItem[])) => {
    setAppState(prev => ({
      ...prev,
      history: typeof history === 'function' ? history(prev.history) : history
    }));
  }, []);

  const setCurrentQuestionIndex = useCallback((index: number | ((prev: number) => number)) => {
    setAppState(prev => ({
      ...prev,
      currentQuestionIndex: typeof index === 'function' ? index(prev.currentQuestionIndex) : index
    }));
  }, []);

  const setTranslationCache = useCallback((cache: Record<string, Record<string, string>> | ((prev: Record<string, Record<string, string>>) => Record<string, Record<string, string>>)) => {
    setAppState(prev => ({
      ...prev,
      translationCache: typeof cache === 'function' ? cache(prev.translationCache) : cache
    }));
  }, []);

  const setCurrentPrepDataId = useCallback((id: string | null | ((prev: string | null) => string | null)) => {
    setAppState(prev => ({
      ...prev,
      currentPrepDataId: typeof id === 'function' ? id(prev.currentPrepDataId) : id
    }));
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
    translationCache: appState.translationCache,
    setTranslationCache,
    currentPrepDataId: appState.currentPrepDataId,
    setCurrentPrepDataId,
    isLoadingFromFirestore,
  };
}

