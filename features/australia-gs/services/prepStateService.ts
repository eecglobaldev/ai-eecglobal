/**
 * ========================================================
 * PREP STATE SERVICE: Save and Load Entire Prep State
 * ========================================================
 * 
 * This service handles saving and loading the complete prep state
 * (prep content, practice history, current progress) to/from Firestore.
 * This ensures data persists across devices and even after logout.
 * 
 * FIRESTORE STRUCTURE:
 * 
 * australia_gs_users/{userId}/
 *   └── prep_state/
 *       └── current_state
 *           ├── prepContent: PrepContent | null
 *           ├── history: HistoryItem[]
 *           ├── currentQuestionIndex: number
 *           ├── createdAt: Timestamp
 *           └── updatedAt: Timestamp
 * 
 * ========================================================
 */

import { db } from './firebaseConfig';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { getUserIdByEmail } from './userService';
import type { PrepContent, HistoryItem } from '../types';

export interface PrepState {
  prepContent: PrepContent | null;
  history: HistoryItem[];
  currentQuestionIndex: number;
}

/**
 * Save complete prep state to Firestore
 * @param state - The complete prep state object
 * @returns Success boolean
 */
export const savePrepState = async (state: PrepState): Promise<boolean> => {
  try {
    // 1. Get user email from localStorage
    const userEmail = localStorage.getItem('AUgsUserEmail');
    if (!userEmail) {
      console.log('ℹ️ User not authenticated, skipping Firestore save');
      return false;
    }

    // 2. Get user ID
    const userId = await getUserIdByEmail(userEmail);
    if (!userId) {
      console.error('User ID not found');
      return false;
    }

    // 3. Reference to prep_state subcollection
    const prepStateRef = doc(
      db,
      'australia_gs_users',
      userId,
      'prep_state',
      'current_state'
    );

    // 4. Helper to remove undefined values (but preserve Firestore sentinels)
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

    // 5. Clean the state data
    const cleanedState = removeUndefined(state);

    // 6. Check if document exists
    const docSnap = await getDoc(prepStateRef);
    const documentExists = docSnap.exists();
    const existingData = docSnap.data();
    
    // Check if createdAt is broken
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

    // 8. Save with timestamps
    await setDoc(prepStateRef, dataToSave, { merge: true });

    console.log('✅ Prep state saved to Firestore');
    return true;
  } catch (error) {
    console.error('❌ Error saving prep state to Firestore:', error);
    return false;
  }
};

/**
 * Load prep state from Firestore
 * @returns The prep state object or null if not found
 */
export const loadPrepState = async (): Promise<PrepState | null> => {
  try {
    // 1. Get user email from localStorage
    const userEmail = localStorage.getItem('AUgsUserEmail');
    if (!userEmail) {
      console.log('ℹ️ User not authenticated, cannot load from Firestore');
      return null;
    }

    // 2. Get user ID
    const userId = await getUserIdByEmail(userEmail);
    if (!userId) {
      console.error('User ID not found');
      return null;
    }

    // 3. Reference to prep_state subcollection
    const prepStateRef = doc(
      db,
      'australia_gs_users',
      userId,
      'prep_state',
      'current_state'
    );

    // 4. Get the document
    const docSnap = await getDoc(prepStateRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log('✅ Prep state loaded from Firestore');
      
      return {
        prepContent: data.prepContent || null,
        history: data.history || [],
        currentQuestionIndex: data.currentQuestionIndex || 0,
      };
    } else {
      console.log('ℹ️ No saved prep state found in Firestore');
      return null;
    }
  } catch (error) {
    console.error('❌ Error loading prep state from Firestore:', error);
    return null;
  }
};

/**
 * Check if user has saved prep state in Firestore
 * @returns Boolean indicating if data exists
 */
export const hasPrepState = async (): Promise<boolean> => {
  try {
    // 1. Get user email
    const userEmail = localStorage.getItem('AUgsUserEmail');
    if (!userEmail) {
      return false;
    }

    // 2. Get user ID
    const userId = await getUserIdByEmail(userEmail);
    if (!userId) {
      return false;
    }

    // 3. Reference to prep_state subcollection
    const prepStateRef = doc(
      db,
      'australia_gs_users',
      userId,
      'prep_state',
      'current_state'
    );

    // 4. Check if document exists
    const docSnap = await getDoc(prepStateRef);
    return docSnap.exists();
  } catch (error) {
    console.error('Error checking prep state:', error);
    return false;
  }
};

/**
 * Delete prep state from Firestore
 * @returns Success boolean
 */
export const deletePrepState = async (): Promise<boolean> => {
  try {
    // 1. Get user email
    const userEmail = localStorage.getItem('AUgsUserEmail');
    if (!userEmail) {
      return false;
    }

    // 2. Get user ID
    const userId = await getUserIdByEmail(userEmail);
    if (!userId) {
      return false;
    }

    // 3. Reference to prep_state subcollection
    const prepStateRef = doc(
      db,
      'australia_gs_users',
      userId,
      'prep_state',
      'current_state'
    );

    // 4. Delete the document
    await setDoc(prepStateRef, {
      prepContent: null,
      history: [],
      currentQuestionIndex: 0,
      updatedAt: serverTimestamp(),
    });

    console.log('✅ Prep state deleted from Firestore');
    return true;
  } catch (error) {
    console.error('❌ Error deleting prep state:', error);
    return false;
  }
};

