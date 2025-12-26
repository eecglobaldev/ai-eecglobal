/**
 * ========================================================
 * USER STATE SERVICE: Complete App State Persistence
 * ========================================================
 * 
 * This service handles saving and loading the COMPLETE app state
 * to/from Firestore. This ensures user data persists across:
 * - Logout/Login
 * - Cookie clearing
 * - Browser/Device changes
 * 
 * FIRESTORE STRUCTURE:
 * 
 * australia_gs_users/{userId}/
 *   └── app_state/
 *       └── current_state
 *           ├── prepContent: PrepContent (AI-generated content)
 *           ├── history: HistoryItem[] (practice history)
 *           ├── currentQuestionIndex: number
 *           ├── profile: Profile (user profile data)
 *           ├── createdAt: Timestamp
 *           └── updatedAt: Timestamp
 * 
 * ========================================================
 */

import { db } from './firebaseConfig';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { getUserIdByEmail, ensureUserSignedIn } from './userService';
import type { PrepContent, HistoryItem, Profile } from '../types';

// ==================== Interfaces ====================

export interface UserAppState {
  prepContent: PrepContent | null;
  history: HistoryItem[];
  currentQuestionIndex: number;
  profile?: Profile;
}

export interface SaveStateResult {
  success: boolean;
  error?: string;
}

// ==================== Helper Functions ====================

/**
 * Remove undefined values recursively (Firestore doesn't accept undefined)
 * Preserves Firestore sentinel values like serverTimestamp()
 */
const removeUndefined = (obj: any): any => {
  if (obj === null || obj === undefined) {
    return null;
  }
  
  // Preserve Firestore sentinel values (serverTimestamp, etc.)
  if (obj && typeof obj === 'object' && obj._methodName) {
    return obj;
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
 * 💾 Save complete user app state to Firestore
 * 
 * This saves everything the user has done:
 * - AI-generated prep content (talking points, questions, guidance)
 * - Practice history (all answers, feedback, scores, audio URLs)
 * - Current question index (where user left off)
 * - Profile data (optional)
 * 
 * @param state - Complete app state
 * @returns Success result
 */
export const saveUserState = async (
  state: UserAppState
): Promise<SaveStateResult> => {
  try {
    // 1. Ensure user is authenticated
    const firebaseUser = await ensureUserSignedIn();
    if (!firebaseUser) {
      console.error('User not authenticated');
      return { success: false, error: 'User not authenticated' };
    }

    // 2. Get user email
    const userEmail = localStorage.getItem('AUgsUserEmail');
    if (!userEmail) {
      console.error('User email not found');
      return { success: false, error: 'User email not found' };
    }

    // 3. Get user ID
    const userId = await getUserIdByEmail(userEmail);
    if (!userId) {
      console.error('User ID not found');
      return { success: false, error: 'User ID not found' };
    }

    // 4. Reference to app_state subcollection
    const stateRef = doc(
      db,
      'australia_gs_users',
      userId,
      'app_state',
      'current_state'
    );

    // 5. Clean the state data
    const cleanedState = removeUndefined(state);

    // 6. Check if document exists and if createdAt is broken
    const docSnap = await getDoc(stateRef);
    const documentExists = docSnap.exists();
    const existingData = docSnap.data();
    
    // Check if createdAt is broken (has _methodName instead of being a Timestamp)
    const hasBrokenCreatedAt = existingData?.createdAt && 
                                typeof existingData.createdAt === 'object' && 
                                existingData.createdAt._methodName === 'serverTimestamp';

    // 7. Prepare data to save
    const dataToSave: any = {
      ...cleanedState,
      updatedAt: serverTimestamp(),
    };

    // Only set createdAt if document doesn't exist OR if it's broken
    if (!documentExists || hasBrokenCreatedAt) {
      dataToSave.createdAt = serverTimestamp();
    }

    // 8. Save with timestamps (merge: true preserves existing valid createdAt)
    await setDoc(stateRef, dataToSave, { merge: true });

    console.log('✅ User state saved to Firestore successfully');
    return { success: true };
  } catch (error) {
    console.error('❌ Error saving user state to Firestore:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

/**
 * 📥 Load complete user app state from Firestore
 * 
 * This fetches everything the user had:
 * - AI-generated prep content
 * - Practice history with audio
 * - Current question index
 * - Profile data
 * 
 * Returns null if no saved state found (new user or first session)
 * 
 * @returns User app state or null
 */
export const loadUserState = async (): Promise<UserAppState | null> => {
  try {
    // 1. Ensure user is authenticated
    const firebaseUser = await ensureUserSignedIn();
    if (!firebaseUser) {
      console.error('User not authenticated');
      return null;
    }

    // 2. Get user email
    const userEmail = localStorage.getItem('AUgsUserEmail');
    if (!userEmail) {
      console.error('User email not found');
      return null;
    }

    // 3. Get user ID
    const userId = await getUserIdByEmail(userEmail);
    if (!userId) {
      console.error('User ID not found');
      return null;
    }

    // 4. Reference to app_state subcollection
    const stateRef = doc(
      db,
      'australia_gs_users',
      userId,
      'app_state',
      'current_state'
    );

    // 5. Get the document
    const docSnap = await getDoc(stateRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      
      const userState: UserAppState = {
        prepContent: data.prepContent || null,
        history: data.history || [],
        currentQuestionIndex: data.currentQuestionIndex || 0,
        profile: data.profile || undefined,
      };
      
      console.log('✅ User state loaded from Firestore successfully');
      console.log('📊 Loaded:', {
        hasPrepContent: !!userState.prepContent,
        historyCount: userState.history.length,
        currentQuestion: userState.currentQuestionIndex,
      });
      
      return userState;
    } else {
      console.log('ℹ️ No saved user state found in Firestore (new user or first session)');
      return null;
    }
  } catch (error) {
    console.error('❌ Error loading user state from Firestore:', error);
    return null;
  }
};

/**
 * 🔍 Check if user has saved state in Firestore
 * 
 * Quick check to see if user has any saved data
 * 
 * @returns Boolean indicating if state exists
 */
export const hasUserState = async (): Promise<boolean> => {
  try {
    // 1. Get user email (skip auth check for faster loading)
    const userEmail = localStorage.getItem('AUgsUserEmail');
    if (!userEmail) {
      return false;
    }

    // 2. Get user ID
    const userId = await getUserIdByEmail(userEmail);
    if (!userId) {
      return false;
    }

    // 3. Reference to app_state subcollection
    const stateRef = doc(
      db,
      'australia_gs_users',
      userId,
      'app_state',
      'current_state'
    );

    // 4. Check if document exists
    const docSnap = await getDoc(stateRef);
    return docSnap.exists();
  } catch (error) {
    console.error('Error checking user state:', error);
    return false;
  }
};

/**
 * 🗑️ Clear user state from Firestore
 * 
 * Useful for "Reset" or "Clear Data" functionality
 * 
 * @returns Success result
 */
export const clearUserState = async (): Promise<SaveStateResult> => {
  try {
    // 1. Ensure user is authenticated
    const firebaseUser = await ensureUserSignedIn();
    if (!firebaseUser) {
      return { success: false, error: 'User not authenticated' };
    }

    // 2. Get user email
    const userEmail = localStorage.getItem('AUgsUserEmail');
    if (!userEmail) {
      return { success: false, error: 'User email not found' };
    }

    // 3. Get user ID
    const userId = await getUserIdByEmail(userEmail);
    if (!userId) {
      return { success: false, error: 'User ID not found' };
    }

    // 4. Reference to app_state subcollection
    const stateRef = doc(
      db,
      'australia_gs_users',
      userId,
      'app_state',
      'current_state'
    );

    // 5. Clear the state (set to empty)
    await setDoc(stateRef, {
      prepContent: null,
      history: [],
      currentQuestionIndex: 0,
      updatedAt: serverTimestamp(),
    }, { merge: true });

    console.log('✅ User state cleared from Firestore');
    return { success: true };
  } catch (error) {
    console.error('❌ Error clearing user state from Firestore:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

