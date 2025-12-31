/**
 * Utility function to create a missing profile document for authenticated users
 * 
 * This is a temporary fix for users who are authenticated but don't have
 * a profile document in Firestore (e.g., manually created Firebase Auth users)
 */

import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/features/shared/lib/firebase';
import { auth } from '@/features/shared/lib/firebase';
import type { StudentProfile } from '../types';

const COLLECTION_NAME = 'australia_gs_users';

/**
 * Create a minimal profile document for the current authenticated user
 * 
 * @returns Promise<boolean> - true if created successfully, false otherwise
 */
export const createMissingProfile = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      return { success: false, error: 'No authenticated user found' };
    }

    // Check if document already exists
    const userDocRef = doc(db, COLLECTION_NAME, currentUser.uid);
    const docSnap = await getDoc(userDocRef);
    
    if (docSnap.exists()) {
      return { success: false, error: 'Profile document already exists' };
    }

    // Create minimal profile document
    const minimalProfile: Partial<StudentProfile> = {
      id: currentUser.uid,
      email: currentUser.email || '',
      name: currentUser.displayName || currentUser.email?.split('@')[0] || 'User',
      targetCountry: 'Australia',
      isVerified: false,
      count: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(userDocRef, minimalProfile);

    console.log(`[Australia GS Dashboard] ✅ Created missing profile document for UID: ${currentUser.uid}`);
    
    return { success: true };
  } catch (error) {
    console.error('[Australia GS Dashboard] ❌ Error creating missing profile:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};

/**
 * Check if user needs a profile document created
 * 
 * @returns Promise<boolean> - true if profile is missing, false if exists
 */
export const isProfileMissing = async (): Promise<boolean> => {
  try {
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      return false;
    }

    const userDocRef = doc(db, COLLECTION_NAME, currentUser.uid);
    const docSnap = await getDoc(userDocRef);
    
    return !docSnap.exists();
  } catch (error) {
    console.error('[Australia GS Dashboard] Error checking profile:', error);
    return false;
  }
};

