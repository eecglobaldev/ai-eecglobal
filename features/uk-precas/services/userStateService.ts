/**
 * 📝 User State Service
 * 
 * This service handles complete app state persistence to Firestore.
 * All user prep data (prepContent, history, currentQuestionIndex) persists across:
 * - Logout and re-login
 * - Cookie clearing
 * - Browser cache clearing
 * - Different devices
 */

import { db } from "@/features/shared/lib/firebase";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { ensureUserSignedIn } from './authService';
import type { PrepContent, HistoryItem, StudentProfile } from '../types';

// ==================== Interfaces ====================

export interface UserAppState {
  prepContent: PrepContent | null;
  history: HistoryItem[];
  currentQuestionIndex: number;
  profile?: StudentProfile;
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
 * Saves:
 * - prepContent (AI-generated questions & guidance)
 * - history (all practice attempts with audio)
 * - currentQuestionIndex (where user left off)
 * - profile (optional user profile data)
 * 
 * @param state - Complete user app state
 * @returns Result with success status
 */
export const saveUserState = async (
  state: UserAppState
): Promise<SaveStateResult> => {
  try {
    // Get authenticated user
    const user = await ensureUserSignedIn();
    const userId = user.uid;
    
    // Clean data (remove undefined values)
    const cleanedState = removeUndefined({
      prepContent: state.prepContent,
      history: state.history,
      currentQuestionIndex: state.currentQuestionIndex,
      profile: state.profile || null,
      updatedAt: serverTimestamp(),
    });
    
    // Reference to user state document
    const stateRef = doc(
      db,
      "uk_users",
      userId,
      "app_state",
      "current_state"
    );
    
    // Check if document exists
    const stateDoc = await getDoc(stateRef);
    
    // If document doesn't exist, add createdAt
    if (!stateDoc.exists()) {
      (cleanedState as any).createdAt = serverTimestamp();
    }
    
    // Save to Firestore
    await setDoc(stateRef, cleanedState, { merge: true });
    
    return { success: true };
    
  } catch (error) {
    console.error("❌ Error saving user state:", error);
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
    // Get authenticated user
    const user = await ensureUserSignedIn();
    const userId = user.uid;
    
    // Reference to user state document
    const stateRef = doc(
      db,
      "uk_users",
      userId,
      "app_state",
      "current_state"
    );
    
    // Fetch from Firestore
    const stateDoc = await getDoc(stateRef);
    
    if (!stateDoc.exists()) {
      console.log("📭 No saved user state found in Firestore");
      return null;
    }
    
    const data = stateDoc.data();
    
    // Convert Firestore timestamps to ISO strings for history items
    const history = (data.history || []).map((item: any) => ({
      ...item,
      timestamp: item.timestamp instanceof Timestamp 
        ? item.timestamp.toDate().toISOString()
        : item.timestamp
    }));
    
    console.log("✅ User state loaded from Firestore");
    
    return {
      prepContent: data.prepContent || null,
      history: history,
      currentQuestionIndex: data.currentQuestionIndex || 0,
      profile: data.profile || undefined,
    };
    
  } catch (error) {
    console.error("❌ Error loading user state:", error);
    return null;
  }
};

/**
 * Check if user has saved state in Firestore
 * 
 * @returns true if user has saved state
 */
export const hasUserState = async (): Promise<boolean> => {
  try {
    // Get authenticated user
    const user = await ensureUserSignedIn();
    const userId = user.uid;
    
    // Reference to user state document
    const stateRef = doc(
      db,
      "uk_users",
      userId,
      "app_state",
      "current_state"
    );
    
    // Check if document exists
    const stateDoc = await getDoc(stateRef);
    
    return stateDoc.exists();
    
  } catch (error) {
    console.error("❌ Error checking user state:", error);
    return false;
  }
};

/**
 * Clear user state from Firestore
 * Useful for "Reset" functionality
 * 
 * @returns Result with success status
 */
export const clearUserState = async (): Promise<SaveStateResult> => {
  try {
    // Get authenticated user
    const user = await ensureUserSignedIn();
    const userId = user.uid;
    
    // Reference to user state document
    const stateRef = doc(
      db,
      "uk_users",
      userId,
      "app_state",
      "current_state"
    );
    
    // Clear state (set to empty)
    await setDoc(stateRef, {
      prepContent: null,
      history: [],
      currentQuestionIndex: 0,
      profile: null,
      updatedAt: serverTimestamp(),
    });
    
    console.log("✅ User state cleared from Firestore");
    
    return { success: true };
    
  } catch (error) {
    console.error("❌ Error clearing user state:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

