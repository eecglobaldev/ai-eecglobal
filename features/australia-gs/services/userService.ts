import { db, auth } from "./firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
  increment,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { User } from "firebase/auth";
import { BRANCHES } from '../data/branches';
import { STATES } from '../data/states';
import {
  globalRegisterUser,
  signInWithHiddenAuth as authSignIn,
  ensureUserSignedIn as authEnsureSignedIn
} from './authService';

// ============================================================================
// 🔐 PASSWORDLESS BACKEND-MANAGED FIREBASE AUTH
// ============================================================================
// Users log in with Email OTP + Phone OTP only.
// Firebase creates real Email/Password Auth users behind the scenes.
// Users NEVER see or type passwords.
// ============================================================================

/**
 * Check if a user exists by phone number
 */
export const checkUserExists = async (phone: string): Promise<boolean> => {
  const usersRef = collection(db, "australia_gs_users");
  const q = query(usersRef, where("phone", "==", phone));
  const snap = await getDocs(q);
  return !snap.empty;
};

/**
 * Check if a user exists by email
 */
export const checkEmailExists = async (email: string): Promise<boolean> => {
  const usersRef = collection(db, "australia_gs_users");
  const q = query(usersRef, where("email", "==", email));
  const snap = await getDocs(q);
  return !snap.empty;
};

/**
 * Get user data by phone number
 */
export const getUserByPhone = async (phone: string) => {
  const usersRef = collection(db, "australia_gs_users");
  const q = query(usersRef, where("phone", "==", phone));
  const snap = await getDocs(q);
  if (!snap.empty) {
    const userDoc = snap.docs[0];
    return { id: userDoc.id, ...userDoc.data() };
  }
  return null;
};

/**
 * Get user data by email
 */
export const getUserByEmail = async (email: string) => {
  const usersRef = collection(db, "australia_gs_users");
  const q = query(usersRef, where("email", "==", email));
  const snap = await getDocs(q);
  if (!snap.empty) {
    const userDoc = snap.docs[0];
    return { id: userDoc.id, ...userDoc.data() };
  }
  return null;
};

// Removed: getHiddenAuthPassword
// This is now handled server-side in authService.ts
// Passwords are never exposed to the client

/**
 * 🔥 UPDATED: Register user with SERVER-SIDE Firebase Auth
 * 
 * This function now delegates to authService.ts which calls Cloud Functions.
 * All encryption, password generation, and Firebase Auth user creation happens SERVER-SIDE.
 * 
 * Flow:
 * 1. Check if user already exists in australia_gs_users
 * 2. Call globalRegisterUser (authService.ts)
 * 3. Cloud Function creates Firebase Auth user + users_auth entry
 * 4. Update australia_gs_users with additional profile data
 * 
 * @param userData - User registration data
 * @returns "OK", "EXISTS", or "ERROR"
 */
export const registerUser = async (userData: any) => {
  try {
    // 1️⃣ CHECK IF USER ALREADY EXISTS IN australia_gs_users
    const usersRef = collection(db, "australia_gs_users");
    const q = query(usersRef, where("email", "==", userData.email));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      // User exists in Firestore
      return "EXISTS";
    }

    // Extract new fields
    const { email, phone, firstName, lastName, passportNumber } = userData;

    // Compute fullName for backward compatibility
    const fullName = `${firstName} ${lastName}`.trim();

    // 2️⃣ CALL SERVER-SIDE REGISTRATION (authService.ts → Cloud Function)
    // This creates:
    //   - Firebase Auth user (with generated password)
    //   - users_auth/{uid} entry (with encrypted password)
    //   - Basic user profile in australia_gs_users/{uid}
    const registrationResult = await globalRegisterUser(
      email,
      phone,
      firstName,
      lastName,
      passportNumber,
      'australia_gs_users' // Collection name for Australia GS prep
    );

    if (!registrationResult || !registrationResult.success) {
      return "ERROR";
    }

    const uid = registrationResult.uid;

    // 3️⃣ CONVERT BRANCH ID TO BRANCH NAME
    let branchName = '';
    if (userData.isEECAgent === 'Yes' && userData.branch) {
      const branch = BRANCHES.find(b => b.identifier === userData.branch);
      branchName = branch ? branch.name : '';
    }

    // 4️⃣ CONVERT STATE CODE TO STATE NAME
    let stateName = '';
    if (userData.state) {
      const state = STATES.find(s => s.code === userData.state);
      stateName = state ? state.name : userData.state;
    }

    // 5️⃣ UPDATE FIRESTORE DOCUMENT WITH ADDITIONAL DATA
    // The Cloud Function already created the basic profile
    // Now we add the Australia-specific fields
    const userDocRef = doc(db, "australia_gs_users", uid);

    await updateDoc(userDocRef, {
      firstName,
      lastName,
      fullName,
      passportNumber,
      state: stateName,
      city: userData.city || '',
      targetCountry: userData.targetCountry || 'Australia',
      visaType: userData.visaType || '',
      educationLevel: userData.educationLevel || '',
      parentAnnualIncome: userData.parentAnnualIncome || '',
      isEECAgent: userData.isEECAgent || '',
      branch: branchName,
      isVerified: true,
      count: 0,
      updatedAt: serverTimestamp(),
    });

    return "OK";

  } catch (error) {
    console.error("❌ Registration error:", error);
    return "ERROR";
  }
};

/**
 * 🔥 UPDATED: Sign in user with SERVER-SIDE Firebase Auth
 * 
 * This function now delegates to authService.ts which uses Custom Tokens.
 * The password is NEVER exposed to the client.
 * 
 * Flow:
 * 1. Call authSignIn from authService.ts
 * 2. authService queries users_auth for email
 * 3. authService calls Cloud Function to issue custom token
 * 4. Cloud Function decrypts password SERVER-SIDE and issues token
 * 5. Client signs in with custom token (password never seen)
 * 
 * @param email - User's email
 * @returns Firebase Auth User or null
 */
export const signInWithHiddenAuth = async (email: string): Promise<User | null> => {
  try {
    // Delegate to authService.ts (which uses Custom Token authentication)
    // This ensures passwords are NEVER exposed to the client
    const user = await authSignIn(email, 'australia_gs_users');
    return user;
  } catch (error: any) {
    console.error("❌ Sign in error:", error);
    return null;
  }
};


/**
 * Increment user's prep plan count
 */
export const incrementPrepPlanCount = async (email: string) => {
  try {
    // Try to find user by email first
    const usersRef = collection(db, "australia_gs_users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, error: "User not found" };
    }

    const userDoc = querySnapshot.docs[0];
    const userRef = doc(db, "australia_gs_users", userDoc.id);

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
 * Get user's Firestore document ID (UID for new users, doc ID for old users)
 * @param email - User's email address
 * @returns User document ID or null if not found
 */
export const getUserIdByEmail = async (email: string): Promise<string | null> => {
  try {
    // First check if current auth user matches
    if (auth.currentUser && auth.currentUser.email === email) {
      // Check if document exists with UID
      const uidDocRef = doc(db, "australia_gs_users", auth.currentUser.uid);
      const uidDoc = await getDoc(uidDocRef);
      if (uidDoc.exists()) {
        return auth.currentUser.uid;
      }
    }

    // Fall back to email query (for old users or if not signed in)
    const usersRef = collection(db, "australia_gs_users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    return querySnapshot.docs[0].id;
  } catch (error) {
    console.error("Error getting user ID:", error);
    return null;
  }
};

/**
 * 🔥 UPDATED: Ensure user is signed in with SERVER-SIDE auth
 * 
 * Delegates to authService.ts which uses Custom Token authentication
 * 
 * @returns Firebase Auth user or throws error
 */
export const ensureUserSignedIn = async (): Promise<User> => {
  try {
    // Delegate to authService.ts
    const user = await authEnsureSignedIn();
    return user;
  } catch (error) {
    console.error("❌ Ensure sign in error:", error);
    throw new Error("Authentication failed. Please log in again.");
  }
};

/**
 * Get current Firebase Auth user
 * @returns Current Firebase Auth user or null
 */
export const getCurrentFirebaseUser = (): User | null => {
  return auth.currentUser;
};

/**
 * Sign out current user
 */
// export const signOutUser = async (): Promise<void> => {
//   try {
//     await auth.signOut();
//     localStorage.removeItem('AUgsUserEmail');
//     localStorage.removeItem('AUgsUserName');
//   } catch (error) {
//     throw error;
//   }
// };
