/**
 * 📝 Academic Plan Service
 * 
 * This service handles saving the Academic Plan form data to Firestore.
 * Called when user clicks "Generate Prep Plan" button.
 */

import { db } from "@/features/shared/lib/firebase";
import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import type { UserProfile } from '../types';

// ==================== Interfaces ====================

export interface SaveAcademicPlanParams {
  userId: string;
  academicPlan: UserProfile;
}

export interface SaveAcademicPlanResult {
  success: boolean;
  error?: string;
  timestamp?: number;
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

// ==================== Main Save Function ====================

/**
 * Save Academic Plan data to Firestore
 * 
 * Saves the complete academic plan form data to:
 * uk_users/{userId}/academic_plan/latest
 * 
 * Also saves with timestamp for history:
 * uk_users/{userId}/academic_plan_history/academic_plan_{timestamp}
 * 
 * @param params - Save parameters
 * @returns Result with success status
 */
export const saveAcademicPlan = async (
  params: SaveAcademicPlanParams
): Promise<SaveAcademicPlanResult> => {
  const { userId, academicPlan } = params;
  
  try {
    const timestamp = Date.now();
    
    // Clean the data before saving (remove undefined values)
    const cleanedData = removeUndefined({
      ...academicPlan,
      savedAt: serverTimestamp(),
      timestamp: timestamp,
    });
    
    // ========== STEP 1: Save to "latest" document ==========
    const latestRef = doc(
      db,
      "uk_users",
      userId,
      "academic_plan",
      "latest"
    );
    
    await setDoc(latestRef, cleanedData);
    
    // ========== STEP 2: Save to history with timestamp ==========
    const historyRef = doc(
      db,
      "uk_users",
      userId,
      "academic_plan_history",
      `academic_plan_${timestamp}`
    );
    
    await setDoc(historyRef, cleanedData);
    
    return {
      success: true,
      timestamp: timestamp,
    };
    
  } catch (error) {
    console.error("Error saving academic plan:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

// ==================== Retrieve Functions ====================

/**
 * Get latest academic plan for a user
 */
export const getUserAcademicPlan = async (userId: string) => {
  try {
    const { getDoc } = await import("firebase/firestore");
    const academicPlanRef = doc(
      db,
      "uk_users",
      userId,
      "academic_plan",
      "latest"
    );
    
    const snapshot = await getDoc(academicPlanRef);
    
    if (!snapshot.exists()) {
      return null;
    }
    
    const data = snapshot.data() as any;
    return {
      id: snapshot.id,
      ...data,
    } as UserProfile & { id: string; savedAt?: any; timestamp?: number };
  } catch (error) {
    console.error("Error fetching academic plan:", error);
    return null;
  }
};

/**
 * Get academic plan history for a user
 */
export const getUserAcademicPlanHistory = async (userId: string) => {
  try {
    const { collection, getDocs } = await import("firebase/firestore");
    const historyRef = collection(
      db,
      "uk_users",
      userId,
      "academic_plan_history"
    );
    
    const snapshot = await getDocs(historyRef);
    
    if (snapshot.empty) {
      return [];
    }
    
    const historyList = snapshot.docs.map(doc => {
      const data = doc.data() as any;
      return {
        id: doc.id,
        ...data,
      } as UserProfile & { id: string; savedAt?: any; timestamp?: number };
    });
    
    // Sort by timestamp descending (most recent first)
    return historyList.sort((a: any, b: any) => {
      const timestampA = a.timestamp || a.savedAt?.toMillis() || 0;
      const timestampB = b.timestamp || b.savedAt?.toMillis() || 0;
      return timestampB - timestampA;
    });
  } catch (error) {
    console.error("Error fetching academic plan history:", error);
    return [];
  }
};

