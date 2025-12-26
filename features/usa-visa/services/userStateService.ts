/**
 * 📝 User State Service (USA Visa Prep)
 * 
 * Complete app state persistence to Firestore.
 * Handles saving and loading of prepContent, history, currentQuestionIndex, and profile.
 */

import { db } from "../../shared/lib/firebase";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ensureUserSignedIn } from "./authService";
import type { PrepContent, HistoryItem, UserProfile } from '../types';

// ==================== Interfaces ====================

export interface UserAppState {
  prepContent: PrepContent | null;
  history: HistoryItem[];
  currentQuestionIndex: number;
  profile?: UserProfile;
}

export interface SaveStateResult {
  success: boolean;
  error?: string;
}

// ==================== Helper Functions ====================

/**
 * Remove undefined values recursively (Firestore doesn't accept undefined)
 */
const removeUndefined = (obj: any): any => {
  if (obj === null || obj === undefined) {
    return null;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => removeUndefined(item));
  }
  
  if (typeof obj === 'object') {
    const cleaned: any = {};
    for (const key in obj) {
      if (obj[key] !== undefined) {
        cleaned[key] = removeUndefined(obj[key]);
      }
    }
    return cleaned;
  }
  
  return obj;
};

// ==================== Main Functions ====================

/**
 * Save complete user state to Firestore
 * 
 * @param state - Complete app state to save
 * @returns Result with success status
 */
export const saveUserState = async (
  state: UserAppState
): Promise<SaveStateResult> => {
  try {
    const user = await ensureUserSignedIn();
    const userId = user.uid;

    const stateRef = doc(
      db,
      "usa_users",
      userId,
      "app_state",
      "current_state"
    );

    const stateData = removeUndefined({
      prepContent: state.prepContent,
      history: state.history,
      currentQuestionIndex: state.currentQuestionIndex,
      profile: state.profile,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(), // Will be set on first save, updated on subsequent
    });

    await setDoc(stateRef, stateData, { merge: true });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error saving user state to Firestore:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

/**
 * Load complete user state from Firestore
 * 
 * @returns User app state or null if not found
 */
export const loadUserState = async (): Promise<UserAppState | null> => {
  try {
    const user = await ensureUserSignedIn();
    const userId = user.uid;

    const stateRef = doc(
      db,
      "usa_users",
      userId,
      "app_state",
      "current_state"
    );

    const snapshot = await getDoc(stateRef);

    if (!snapshot.exists()) {
      return null;
    }

    const data = snapshot.data();

    return {
      prepContent: data.prepContent || null,
      history: data.history || [],
      currentQuestionIndex: data.currentQuestionIndex || 0,
      profile: data.profile,
    };
  } catch (error) {
    console.error("Error loading user state from Firestore:", error);
    return null;
  }
};

/**
 * Check if user has saved state in Firestore
 * 
 * @returns true if state exists, false otherwise
 */
export const hasUserState = async (): Promise<boolean> => {
  try {
    const state = await loadUserState();
    return state !== null && (state.prepContent !== null || state.history.length > 0);
  } catch (error) {
    console.error("Error checking user state:", error);
    return false;
  }
};

/**
 * Clear user state from Firestore
 * 
 * @returns Result with success status
 */
export const clearUserState = async (): Promise<SaveStateResult> => {
  try {
    const user = await ensureUserSignedIn();
    const userId = user.uid;

    const stateRef = doc(
      db,
      "usa_users",
      userId,
      "app_state",
      "current_state"
    );

    await setDoc(stateRef, {
      prepContent: null,
      history: [],
      currentQuestionIndex: 0,
      updatedAt: serverTimestamp(),
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error clearing user state:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

