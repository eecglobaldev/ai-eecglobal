/**
 * 🔐 Global Authentication Service
 * 
 * This service handles authentication across all country collections.
 * Uses a single global `users_auth/{uid}` collection for storing hidden passwords.
 * 
 * One Firebase Auth user can access:
 * - australia_gs_users/{uid}
 * - australia_gs_users/{uid}
 * - uk_users/{uid}
 * - nz_users/{uid}
 */

import { db, auth } from "./firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";
import {
  signInWithCustomToken,
  User,
} from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";

// ==================== Interfaces ====================

export interface UserAuthData {
  email: string;
  hiddenAuthPassword: string; // encrypted
  createdAt: any;
  updatedAt?: any;
}

// ==================== Helper Functions ====================

// Removed: getOrCreateUsersAuth - All encryption now happens server-side

/**
 * Get users_auth by email
 * 
 * @param email - User email
 * @returns { uid: string, authData: UserAuthData } or null
 */
const getUsersAuthByEmail = async (
  email: string
): Promise<{ uid: string; authData: UserAuthData } | null> => {
  try {
    const authRef = collection(db, "users_auth");
    const q = query(authRef, where("email", "==", email));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return {
      uid: doc.id,
      authData: doc.data() as UserAuthData,
    };
  } catch (error) {
    console.error("Error getting users_auth by email:", error);
    return null;
  }
};

// ==================== Main Auth Functions ====================

/**
 * 🔐 Register or Sign In User (Universal)
 * 
 * NOTE: Registration now happens SERVER-SIDE via Cloud Functions.
 * This function is for compatibility only and delegates to server.
 * 
 * For new registrations, use the registration Cloud Function.
 * For sign-in, use signInWithHiddenAuth() which uses custom tokens.
 * 
 * @param email - User email
 * @returns Firebase User or null
 */
export const getOrCreateAuthUser = async (
  email: string
): Promise<User | null> => {
  try {
    // Check if users_auth entry exists
    const existingAuth = await getUsersAuthByEmail(email);

    if (existingAuth) {
      // User exists, sign them in using custom token
      const token = await issueCustomTokenForEmail(email);
      
      if (!token) {
        console.error("Failed to get custom token");
        return null;
      }

      try {
        const userCredential = await signInWithCustomToken(auth, token);
        return userCredential.user;
      } catch (signInError: any) {
        console.error("Failed to sign in with custom token:", signInError);
        return null;
      }
    }

    // No users_auth entry - user needs to register
    // Registration must be done server-side via Cloud Function
    console.error("User not found. Registration must be done via server.");
    return null;
  } catch (error) {
    console.error("Error in getOrCreateAuthUser:", error);
    return null;
  }
};

/**
 * 🎫 Issue Custom Token
 * 
 * Uses REST API to issue custom token (no CORS issues)
 * Server decrypts password and issues token (client never sees password)
 * 
 * @param email - User email
 * @returns Custom token string or null
 */
const issueCustomTokenForEmail = async (email: string): Promise<string | null> => {
  try {
    const functionUrl = 'https://us-central1-usa-visa-prep-c72f7.cloudfunctions.net/issueCustomToken';
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ Custom token request failed:", errorData);
      return null;
    }

    const data = await response.json();
    
    if (data.success && data.token) {
      // console.log("✅ Custom token issued successfully");
      return data.token;
    }
    
    console.error("❌ Custom token response missing token:", data);
    return null;
  } catch (error: any) {
    console.error("❌ Failed to issue custom token:", error);
    return null;
  }
};

/**
 * 🔄 Call Migration Cloud Function
 * 
 * Uses Firebase Callable Function (onCall) to migrate user
 * Firebase handles CORS automatically for callable functions
 * 
 * @param email - User email
 * @param collection - Collection name (australia_gs_users, australia_gs_users, etc.)
 * @returns true if migration successful
 */
const callMigrationCloudFunction = async (
  email: string,
  collection: string = 'australia_gs_users'
): Promise<boolean> => {
  try {
    const functions = getFunctions();
    const migrateUser = httpsCallable(functions, 'migrateSingleUserToGlobalAuth');
    
    // Call the onCall function with data
    const result = await migrateUser({ email, collection });
    
    if ((result.data as any).success) {
      // console.log("✅ User migrated successfully via Cloud Function");
      return true;
    }
    
    console.error("❌ Migration failed:", result.data);
    return false;
  } catch (error: any) {
    console.error("❌ Cloud Function migration failed:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    return false;
  }
};

/**
 * 🔐 Sign In with Hidden Auth (Universal) - Custom Token Based
 * 
 * NEW: Uses Firebase Custom Tokens instead of password authentication.
 * Server decrypts password and issues token. Client never sees password.
 * 
 * Automatically attempts migration if user doesn't have users_auth entry.
 * 
 * @param email - User email
 * @param collection - Optional collection name for migration (default: australia_gs_users)
 * @returns Firebase User or null
 */
export const signInWithHiddenAuth = async (
  email: string,
  collection: string = 'australia_gs_users'
): Promise<User | null> => {
  try {
    // If already signed in with this email, return current user
    if (auth.currentUser && auth.currentUser.email === email) {
      return auth.currentUser;
    }

    // Get users_auth entry
    let authEntry = await getUsersAuthByEmail(email);

    if (!authEntry) {
      console.warn("⚠️ No users_auth entry found for:", email);
      // console.log("🔄 Attempting automatic migration...");
      
      // Try to migrate the user automatically
      const migrationSuccess = await callMigrationCloudFunction(email, collection);
      
      if (!migrationSuccess) {
        console.error("❌ Automatic migration failed");
        return null;
      }
      
      // Wait a moment for Firestore to update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Retry fetching users_auth entry
      authEntry = await getUsersAuthByEmail(email);
      
      if (!authEntry) {
        console.error("❌ users_auth entry still not found after migration");
        return null;
      }
      
      // console.log("✅ Migration successful, proceeding with sign in");
    }

    // 🎫 Issue Custom Token (server decrypts password, we never see it)
    const customToken = await issueCustomTokenForEmail(email);
    
    if (!customToken) {
      console.error("❌ Failed to get custom token");
      return null;
    }

    // Sign in with custom token
    const userCredential = await signInWithCustomToken(auth, customToken);

    return userCredential.user;
  } catch (error: any) {
    console.error("Error signing in with hidden auth:", error);
    return null;
  }
};

/**
 * 🔐 Ensure User is Signed In (Universal)
 * 
 * Ensures user is authenticated before operations.
 * 
 * @returns Firebase User
 * @throws Error if sign in fails
 */
export const ensureUserSignedIn = async (): Promise<User> => {
  try {
    // If already signed in, return current user
    if (auth.currentUser) {
      return auth.currentUser;
    }

    // Get email from localStorage
    const userEmail = localStorage.getItem("AUgsUserEmail");
    if (!userEmail) {
      throw new Error("No user email found. Please log in.");
    }

    // Sign in with hidden auth
    const user = await signInWithHiddenAuth(userEmail);
    if (!user) {
      throw new Error("Failed to sign in with hidden auth");
    }

    return user;
  } catch (error) {
    console.error("Error ensuring user signed in:", error);
    throw new Error("Authentication failed. Please log in again.");
  }
};

/**
 * 🔐 Check if User Exists (by email)
 * 
 * @param email - User email
 * @returns true if user exists in users_auth
 */
export const checkUserAuthExists = async (email: string): Promise<boolean> => {
  try {
    const authEntry = await getUsersAuthByEmail(email);
    return authEntry !== null;
  } catch (error) {
    console.error("Error checking user auth exists:", error);
    return false;
  }
};

/**
 * 🔐 Register User (Global) - Server-Side Registration
 * 
 * Uses REST API for server-side registration (no CORS issues)
 * 
 * Server handles:
 * - Password generation (server-side)
 * - Encryption (server-side)
 * - Firebase Auth user creation
 * - users_auth entry creation
 * - Country-specific profile creation
 * 
 * @param email - User email
 * @param phone - User phone
 * @param name - User name (optional)
 * @param collection - Collection name (australia_gs_users, australia_gs_users, etc.)
 * @returns Registration result or null
 */
export const globalRegisterUser = async (
  email: string,
  phone: string,
  name?: string,
  collection: string = 'australia_gs_users'
): Promise<{ success: boolean; uid: string; message: string } | null> => {
  try {
    const functionUrl = 'https://us-central1-usa-visa-prep-c72f7.cloudfunctions.net/demoregisterUser';
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        phone,
        name,
        collection
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ Registration request failed:", errorData);
      
      if (response.status === 409) {
        console.error("User already exists");
      }
      
      return null;
    }

    const data = await response.json();

    if (data.success) {
      //  console.log("✅ User registered successfully:", data.uid);
      return data;
    }

    console.error("❌ Registration response indicates failure:", data);
    return null;
  } catch (error: any) {
    console.error("❌ Registration failed:", error);
    return null;
  }
};

/**
 * 🔐 Get Firebase Auth UID by Email
 * 
 * @param email - User email
 * @returns UID or null
 */
export const getAuthUidByEmail = async (email: string): Promise<string | null> => {
  try {
    // Check if currently signed in
    if (auth.currentUser && auth.currentUser.email === email) {
      return auth.currentUser.uid;
    }

    // Query users_auth
    const authEntry = await getUsersAuthByEmail(email);
    return authEntry ? authEntry.uid : null;
  } catch (error) {
    console.error("Error getting auth UID by email:", error);
    return null;
  }
};

