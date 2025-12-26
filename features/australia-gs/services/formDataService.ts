/**
 * ========================================================
 * FORM DATA SERVICE: Save and Load Setup Form Data
 * ========================================================
 * 
 * This service handles saving and loading the raw setup form data
 * to/from a dedicated Firestore subcollection. This allows users
 * to reuse their previously filled form data without re-entering
 * all 11 steps.
 * 
 * FIRESTORE STRUCTURE:
 * 
 * australia_gs_users/{userId}/
 *   └── form_data/
 *       └── latest_form
 *           ├── formData: { all form fields }
 *           ├── createdAt: Timestamp
 *           └── updatedAt: Timestamp
 * 
 * ========================================================
 */

import { db } from './firebaseConfig';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { getUserIdByEmail, ensureUserSignedIn } from './userService';

/**
 * Save form data to Firestore subcollection
 * @param formData - The complete form data object
 * @returns Success boolean
 */
export const saveFormData = async (formData: any): Promise<boolean> => {
  try {
    // 1. Ensure user is authenticated
    const firebaseUser = await ensureUserSignedIn();
    if (!firebaseUser) {
      console.error('User not authenticated');
      return false;
    }

    // 2. Get user email
    const userEmail = localStorage.getItem('AUgsUserEmail');
    if (!userEmail) {
      console.error('User email not found');
      return false;
    }

    // 3. Get user ID
    const userId = await getUserIdByEmail(userEmail);
    if (!userId) {
      console.error('User ID not found');
      return false;
    }

    // 4. Reference to form_data subcollection
    const formDataRef = doc(
      db,
      'australia_gs_users',
      userId,
      'form_data',
      'latest_form'
    );

    // Helper to remove undefined values (but preserve Firestore sentinels)
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

    // 5. Clean the form data
    const cleanedFormData = removeUndefined(formData);

    // 6. Check if document exists and if createdAt is broken
    const docSnap = await getDoc(formDataRef);
    const documentExists = docSnap.exists();
    const existingData = docSnap.data();
    
    // Check if createdAt is broken (has _methodName instead of being a Timestamp)
    const hasBrokenCreatedAt = existingData?.createdAt && 
                                typeof existingData.createdAt === 'object' && 
                                existingData.createdAt._methodName === 'serverTimestamp';

    // 7. Prepare data to save
    const dataToSave: any = {
      formData: cleanedFormData,
      updatedAt: serverTimestamp(),
    };

    // Only set createdAt if document doesn't exist OR if it's broken
    if (!documentExists || hasBrokenCreatedAt) {
      dataToSave.createdAt = serverTimestamp();
    }

    // 8. Save with timestamps (merge: true preserves existing valid createdAt)
    await setDoc(formDataRef, dataToSave, { merge: true });

    console.log('✅ Form data saved successfully');
    return true;
  } catch (error) {
    console.error('❌ Error saving form data:', error);
    return false;
  }
};

/**
 * Load previously saved form data from Firestore
 * @returns The form data object or null if not found
 */
export const loadFormData = async (): Promise<any | null> => {
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

    // 4. Reference to form_data subcollection
    const formDataRef = doc(
      db,
      'australia_gs_users',
      userId,
      'form_data',
      'latest_form'
    );

    // 5. Get the document
    const docSnap = await getDoc(formDataRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log('✅ Form data loaded successfully');
      return data.formData || null;
    } else {
      console.log('ℹ️ No saved form data found');
      return null;
    }
  } catch (error) {
    console.error('❌ Error loading form data:', error);
    return null;
  }
};

/**
 * Check if user has previously saved form data
 * @returns Boolean indicating if data exists
 */
export const hasFormData = async (): Promise<boolean> => {
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

    // 3. Reference to form_data subcollection
    const formDataRef = doc(
      db,
      'australia_gs_users',
      userId,
      'form_data',
      'latest_form'
    );

    // 4. Check if document exists
    const docSnap = await getDoc(formDataRef);
    return docSnap.exists();
  } catch (error) {
    console.error('Error checking form data:', error);
    return false;
  }
};

