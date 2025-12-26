/**
 * 📝 User State Service (NZ Student Visa Prep)
 * 
 * This service handles complete app state persistence to Firestore.
 * All user data (prepContent, history, currentQuestionIndex) persists across:
 * - ✅ Logout and re-login
 * - ✅ Cookie clearing
 * - ✅ Browser cache clearing
 * - ✅ Different devices
 */

import { db } from "@/features/shared/lib/firebase";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { ensureUserSignedIn } from "./userService";
import type { PrepContent, HistoryItem, UserProfile } from '../types';

// ==================== Interfaces ====================

export interface UserAppState {
  prepContent: PrepContent | null;
  history: HistoryItem[];
  currentQuestionIndex: number;
  profile?: UserProfile;
  currentPrepDataId?: string | null;
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

/**
 * Convert Firestore Timestamps to serializable format
 */
const serializeTimestamps = (obj: any): any => {
  if (obj === null || obj === undefined) {
    return obj;
  }
  
  if (obj instanceof Timestamp) {
    return obj.toDate().toISOString();
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => serializeTimestamps(item));
  }
  
  if (typeof obj === 'object') {
    const serialized: any = {};
    for (const key in obj) {
      serialized[key] = serializeTimestamps(obj[key]);
    }
    return serialized;
  }
  
  return obj;
};

// ==================== Main Functions ====================

/**
 * Save complete user state to Firestore
 * 
 * Saves to: nz_users/{userId}/app_state/current_state
 * 
 * @param state - Complete app state to save
 * @returns Result with success status
 */
export const saveUserState = async (
  state: UserAppState
): Promise<SaveStateResult> => {
  try {
    // Ensure user is signed in
    const user = await ensureUserSignedIn();
    
    // Clean the data before saving (remove undefined values)
    const cleanedData = removeUndefined({
      prepContent: state.prepContent,
      history: state.history,
      currentQuestionIndex: state.currentQuestionIndex,
      profile: state.profile,
      currentPrepDataId: state.currentPrepDataId || null,
      updatedAt: serverTimestamp(),
    });
    
    // Save to Firestore
    const stateRef = doc(
      db,
      "nz_users",
      user.uid,
      "app_state",
      "current_state"
    );
    
    await setDoc(stateRef, cleanedData, { merge: true });
    
    console.log('✅ User state saved to Firestore');
    
    return {
      success: true,
    };
    
  } catch (error) {
    console.error("Error saving user state:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

/**
 * Load complete user state from Firestore
 * 
 * Loads from: nz_users/{userId}/app_state/current_state
 * 
 * @returns User app state or null if not found
 */
export const loadUserState = async (): Promise<UserAppState | null> => {
  try {
    // Ensure user is signed in
    const user = await ensureUserSignedIn();
    
    // Load from Firestore
    const stateRef = doc(
      db,
      "nz_users",
      user.uid,
      "app_state",
      "current_state"
    );
    
    const snapshot = await getDoc(stateRef);
    
    if (!snapshot.exists()) {
      console.log('ℹ️ No saved state found in Firestore');
      return null;
    }
    
    const data = snapshot.data();
    
    // Serialize Firestore Timestamps to JSON-serializable format
    const serializedData = serializeTimestamps(data);
    
    // console.log('✅ User state loaded from Firestore', {
    //   hasPrepContent: !!serializedData.prepContent,
    //   historyCount: serializedData.history?.length || 0,
    //   prepDataId: serializedData.currentPrepDataId
    // });
    
    return {
      prepContent: serializedData.prepContent || null,
      history: serializedData.history || [],
      currentQuestionIndex: serializedData.currentQuestionIndex || 0,
      profile: serializedData.profile,
      currentPrepDataId: serializedData.currentPrepDataId || null,
    };
    
  } catch (error) {
    console.error("Error loading user state:", error);
    return null;
  }
};

/**
 * Check if user has saved state in Firestore
 * 
 * @returns True if user has saved state, false otherwise
 */
export const hasUserState = async (): Promise<boolean> => {
  try {
    // Ensure user is signed in
    const user = await ensureUserSignedIn();
    
    // Check Firestore
    const stateRef = doc(
      db,
      "nz_users",
      user.uid,
      "app_state",
      "current_state"
    );
    
    const snapshot = await getDoc(stateRef);
    
    return snapshot.exists();
    
  } catch (error) {
    console.error("Error checking user state:", error);
    return false;
  }
};

/**
 * Clear user state from Firestore
 * (For reset functionality)
 * 
 * @returns Result with success status
 */
export const clearUserState = async (): Promise<SaveStateResult> => {
  try {
    // Ensure user is signed in
    const user = await ensureUserSignedIn();
    
    // Clear from Firestore
    const stateRef = doc(
      db,
      "nz_users",
      user.uid,
      "app_state",
      "current_state"
    );
    
    await setDoc(stateRef, {
      prepContent: null,
      history: [],
      currentQuestionIndex: 0,
      profile: null,
      currentPrepDataId: null,
      updatedAt: serverTimestamp(),
    });
    
    console.log('✅ User state cleared from Firestore');
    
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

