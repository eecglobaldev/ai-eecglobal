import { db, auth } from "@/features/shared/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  serverTimestamp,
  increment,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { User } from "firebase/auth";
import { BRANCH_DATA as BRANCHES } from '../data/branches';
import { STATES } from '../data/states';
import {
  globalRegisterUser,
  signInWithHiddenAuth as globalSignInWithHiddenAuth,
  ensureUserSignedIn as globalEnsureUserSignedIn,
  getAuthUidByEmail,
} from './authService';





export const checkUserExists = async (phone: string) => {
  const usersRef = collection(db, "nz_users");
  const q = query(usersRef, where("phone", "==", phone));
  const snap = await getDocs(q);
  return !snap.empty;
};

export const checkEmailExists = async (email: string) => {
  const usersRef = collection(db, "nz_users");
  const q = query(usersRef, where("email", "==", email));
  const snap = await getDocs(q);
  return !snap.empty;
};

export const getUserByPhone = async (phone: string) => {
  const usersRef = collection(db, "nz_users");
  const q = query(usersRef, where("phone", "==", phone));
  const snap = await getDocs(q);
  if (!snap.empty) {
    const userDoc = snap.docs[0];
    return { id: userDoc.id, ...userDoc.data() };
  }
  return null;
};

export const getUserByEmail = async (email: string) => {
  const usersRef = collection(db, "nz_users");
  const q = query(usersRef, where("email", "==", email));
  const snap = await getDocs(q);
  if (!snap.empty) {
    const userDoc = snap.docs[0];
    return { id: userDoc.id, ...userDoc.data() };
  }
  return null;
};


/**
 * 🔐 Register User (USA Visa) - Server-Side Registration
 * 
 * NEW: All registration happens server-side via Cloud Function.
 * Server handles password generation, encryption, and user creation.
 * 
 * Flow:
 * 1. Call server-side registration Cloud Function
 * 2. Server creates Firebase Auth user, users_auth, and nz_users entry
 * 3. Update nz_users with additional fields (state name, branch name, etc.)
 * 
 * @param userData - User registration data
 * @returns "OK" | "EXISTS" | "ERROR"
 */
export const registerUser = async (userData: any) => {
  try {
    const { email, phone, name } = userData;

    // Check if user already exists
    if (await checkEmailExists(email)) {
      return "EXISTS";
    }

    // 1️⃣ CALL SERVER-SIDE REGISTRATION (handles everything)
    const result = await globalRegisterUser(email, phone, name, 'nz_users');
    
    if (!result || !result.success) {
      return "ERROR";
    }

    const uid = result.uid;

    // 2️⃣ UPDATE nz_users WITH ADDITIONAL FIELDS
    // Server creates basic profile, we add country-specific fields
    
    // Convert branch ID to branch name
    let branchName = '';
    if (userData.isEECAgent === 'Yes' && userData.branch) {
      const branch = BRANCHES.find((b: { identifier: string; name: string }) => b.identifier === userData.branch);
      branchName = branch ? branch.name : '';
    }

    // Convert state code to state name
    let stateName = '';
    if (userData.state) {
      const state = STATES.find(s => s.code === userData.state);
      stateName = state ? state.name : userData.state;
    }

    // Update nz_users with additional fields
    const userDocRef = doc(db, "nz_users", uid);
    await updateDoc(userDocRef, {
      state: stateName,
      city: userData.city || '',
      targetCountry: userData.targetCountry || 'USA',
      isEECAgent: userData.isEECAgent || '',
      educationLevel: userData.educationLevel || '',
      parentAnnualIncome: userData.parentAnnualIncome || '',
      visaType: userData.visaType || '',
      branch: branchName,
      isVerified: true,
      count: 0,
      updatedAt: serverTimestamp(),
    });

    return "OK";

  } catch (error) {
    console.error("Error registering user:", error);
    return "ERROR";
  }
};

export const incrementPrepPlanCount = async (email: string) => {
  try {
    const usersRef = collection(db, "nz_users");
    
    // Find user by email
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, error: "User not found" };
    }

    // Get the first matching user document
    const userDoc = querySnapshot.docs[0];
    const userRef = doc(db, "nz_users", userDoc.id);

    // Increment the count field (initializes to 0 if it doesn't exist)
    await updateDoc(userRef, {
      count: increment(1),
      lastUpdated: serverTimestamp(),
    });

    return { success: true };

  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
};





/**
 * 🔐 Sign In with Hidden Auth (USA Visa - uses global auth)
 * 
 * Wrapper for global signInWithHiddenAuth from authService.
 * Passes 'nz_users' as the collection for migration.
 * 
 * @param email - User's email address
 * @returns Firebase User object or null
 */
export const signInWithHiddenAuth = async (
  email: string
): Promise<User | null> => {
  return await globalSignInWithHiddenAuth(email, 'nz_users');
};

// Removed: getHiddenAuthPassword() - now handled by global authService

// Removed: migrateUserToHiddenAuth() - now handled by Cloud Function

/**
 * 🔐 Ensure User is Signed In (USA Visa - uses global auth)
 * 
 * Wrapper for global ensureUserSignedIn from authService.
 * 
 * @returns Firebase User object
 * @throws Error if sign in fails
 */
export const ensureUserSignedIn = async (): Promise<User> => {
  return await globalEnsureUserSignedIn();
};

/**
 * Get user's Firebase Auth UID by email (USA Visa - uses global auth)
 * 
 * Wrapper for global getAuthUidByEmail from authService.
 * 
 * @param email - User's email address
 * @returns Firebase Auth UID or null if not found
 */
export const getUserIdByEmail = async (email: string): Promise<string | null> => {
  return await getAuthUidByEmail(email);
};
