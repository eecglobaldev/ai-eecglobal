/**
 * 🔄 useAppState Hook (USA Visa Prep)
 * 
 * Complete app state management with automatic Firestore persistence.
 * Handles loading from Firestore on mount and auto-saving on state changes.
 */

import { useState, useEffect, useCallback } from 'react';
import { saveUserState, loadUserState, type UserAppState } from '../services/userStateService';
import type { PrepContent, HistoryItem, UserProfile } from '../types';

// ==================== Interfaces ====================

export interface AppState {
  profile: UserProfile;
  prepContent: PrepContent | null;
  history: HistoryItem[];
  currentQuestionIndex: number;
}

// ==================== Constants ====================

const APP_STATE_KEY = 'f1VisaAppState_v1';

// ==================== Helper Functions ====================

const getInitialState = (): AppState => {
  try {
    if (typeof window === 'undefined') {
      return {
        profile: getDefaultProfile(),
        prepContent: null,
        history: [],
        currentQuestionIndex: 0,
      };
    }
    const stored = localStorage.getItem(APP_STATE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        profile: parsed.profile || getDefaultProfile(),
        prepContent: parsed.prepContent || null,
        history: parsed.history || [],
        currentQuestionIndex: parsed.currentQuestionIndex || 0,
      };
    }
  } catch (error) {
    console.error('Error loading initial state from localStorage:', error);
  }

  return {
    profile: getDefaultProfile(),
    prepContent: null,
    history: [],
    currentQuestionIndex: 0,
  };
};

const getDefaultProfile = (): UserProfile => {
  return {
    university: '',
    courseLevel: '',
    course: '',
    lastQualification: '',
    grade: '',
    indianUniversity: '',
    workExperience: [],
    sponsors: [{
      id: Date.now().toString(),
      type: '',
      fatherOccupation: '',
      fatherAnnualIncomeUSD: '',
      fatherAnnualIncomeINR: '',
      motherOccupation: '',
      motherAnnualIncomeUSD: '',
      motherAnnualIncomeINR: '',
      otherRelationship: '',
      otherOccupation: '',
      otherAnnualIncomeUSD: '',
      otherAnnualIncomeINR: '',
      sponsorName: '',
      scholarshipType: 'Full',
      scholarshipAmountUSD: '',
      assistantshipDetails: '',
      assistantshipWaiver: 'None',
      assistantshipWaiverAmount: '',
      hasStipend: 'No',
      stipendAmount: '',
      waiverAmount: ''
    }],
    careerGoals: { goal: '', details: '' },
    testScores: {
      waiverIB: false,
      waiverIndianBoard: false,
      waiverUniversity: false,
      ielts: '',
      toefl: '',
      pte: '',
      duolingo: '',
      gre: '',
      sat: '',
      gmat: '',
      otherTestName: '',
      otherTestScore: ''
    },
    hasRefusal: 'no',
    refusalType: '',
    refusalReason: '',
    hasTraveled: 'no',
    travelDetails: '',
    hasPetition: 'no',
    petitionDetails: '',
    additionalDetails: '',
  };
};

// ==================== Main Hook ====================

export function useAppState() {
  const [appState, setAppState] = useState<AppState>(getInitialState);
  const [isLoadingFromFirestore, setIsLoadingFromFirestore] = useState(false);
  const [hasLoadedFromFirestore, setHasLoadedFromFirestore] = useState(false);

  // Load from Firestore on mount
  useEffect(() => {
    const loadFromFirestore = async () => {
      if (hasLoadedFromFirestore) return;

      if (typeof window === 'undefined') return;
      const userEmail = localStorage.getItem('USAUserEmail');
      if (!userEmail) {
        setHasLoadedFromFirestore(true);
        return;
      }

      setIsLoadingFromFirestore(true);
      // console.log('📥 Loading user state from Firestore...');

      try {
        const firestoreState = await loadUserState();

        if (firestoreState) {
          setAppState(prev => ({
            profile: firestoreState.profile || prev.profile,
            prepContent: firestoreState.prepContent || prev.prepContent,
            history: firestoreState.history.length > 0 ? firestoreState.history : prev.history,
            currentQuestionIndex: firestoreState.currentQuestionIndex ?? prev.currentQuestionIndex,
          }));
          // console.log('✅ User state loaded from Firestore');
        } else {
          console.log('ℹ️ No saved state found in Firestore');
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

  // Listen for auth success event (when user signs in)
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
            setAppState(prev => ({
              profile: firestoreState.profile || prev.profile,
              prepContent: firestoreState.prepContent || prev.prepContent,
              history: firestoreState.history || [],
              currentQuestionIndex: firestoreState.currentQuestionIndex ?? 0,
            }));

            // console.log('✅ User state loaded from Firestore after sign-in');
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
      if (typeof window !== 'undefined') {
        window.removeEventListener('auth-success', handleAuthSuccess);
      }
    };
  }, []);

  // Save to localStorage + Firestore (debounced)
  useEffect(() => {
    const handler = setTimeout(() => {
      if (typeof window === 'undefined') return;
      // Save to localStorage immediately
      localStorage.setItem(APP_STATE_KEY, JSON.stringify(appState));

      // Save to Firestore if user is authenticated and initial load is complete
      const userEmail = localStorage.getItem('USAUserEmail');
      if (userEmail && hasLoadedFromFirestore && !isLoadingFromFirestore) {
        saveUserState({
          prepContent: appState.prepContent,
          history: appState.history,
          currentQuestionIndex: appState.currentQuestionIndex,
          profile: appState.profile,
        }).catch((error) => {
          console.error('Error saving to Firestore:', error);
        });
      }
    }, 1000); // 1 second debounce

    return () => clearTimeout(handler);
  }, [appState, hasLoadedFromFirestore, isLoadingFromFirestore]);

  // Individual setters
  const setProfile = useCallback((profile: UserProfile | ((prev: UserProfile) => UserProfile)) => {
    setAppState(prev => ({
      ...prev,
      profile: typeof profile === 'function' ? profile(prev.profile) : profile,
    }));
  }, []);

  const setPrepContent = useCallback((prepContent: PrepContent | null | ((prev: PrepContent | null) => PrepContent | null)) => {
    setAppState(prev => ({
      ...prev,
      prepContent: typeof prepContent === 'function' ? prepContent(prev.prepContent) : prepContent,
    }));
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

  return {
    profile: appState.profile,
    prepContent: appState.prepContent,
    history: appState.history,
    currentQuestionIndex: appState.currentQuestionIndex,
    isLoadingFromFirestore,
    setProfile,
    setPrepContent,
    setHistory,
    setCurrentQuestionIndex,
  };
}

