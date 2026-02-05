import { db } from "../../shared/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  increment,
  doc,
  updateDoc,
} from "firebase/firestore";
import { BRANCHES } from '../data/branches';
import { STATES } from '../data/states';





export const checkUserExists = async (phone: string) => {
  const usersRef = collection(db, "career_counselor");
  const q = query(usersRef, where("phone", "==", phone));
  const snap = await getDocs(q);
  return !snap.empty;
};

export const checkEmailExists = async (email: string) => {
  const usersRef = collection(db, "career_counselor");
  const q = query(usersRef, where("email", "==", email));
  const snap = await getDocs(q);
  return !snap.empty;
};

export const getUserByPhone = async (phone: string) => {
  const usersRef = collection(db, "career_counselor");
  const q = query(usersRef, where("phone", "==", phone));
  const snap = await getDocs(q);
  if (!snap.empty) {
    const userDoc = snap.docs[0];
    return { id: userDoc.id, ...userDoc.data() };
  }
  return null;
};

export const getUserByEmail = async (email: string) => {
  const usersRef = collection(db, "career_counselor");
  const q = query(usersRef, where("email", "==", email));
  const snap = await getDocs(q);
  if (!snap.empty) {
    const userDoc = snap.docs[0];
    return { id: userDoc.id, ...userDoc.data() };
  }
  return null;
};


export const registerUser = async (userData: any) => {
  try {
    const usersRef = collection(db, "career_counselor");

    // 1️⃣ CHECK IF USER ALREADY EXISTS
    const q = query(usersRef, where("email", "==", userData.email));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return "EXISTS"; // user already has an account
    }

    // Extract new fields
    const { firstName, lastName, passportNumber } = userData;

    // Compute fullName for backward compatibility
    const fullName = `${firstName} ${lastName}`.trim();

    // 2️⃣ CONVERT BRANCH ID TO BRANCH NAME
    let branchName = '';
    if (userData.isEECAgent === 'Yes' && userData.branch) {
      const branch = BRANCHES.find(b => b.identifier === userData.branch);
      branchName = branch ? branch.name : '';
    }

    // 3️⃣ CONVERT STATE CODE TO STATE NAME
    let stateName = '';
    if (userData.state) {
      const state = STATES.find(s => s.code === userData.state);
      stateName = state ? state.name : userData.state;
    }

    // 4️⃣ CREATE NEW USER
    await addDoc(usersRef, {
      ...userData,
      firstName,
      lastName,
      fullName,
      passportNumber,
      state: stateName, // Save state name instead of code
      // targetCountry: userData.targetCountry || 'United Kingdom', // Ensure targetCountry is saved (default to USA if not provided)
      isEECAgent: userData.isEECAgent || '', // Save EEC agent status
      branch: branchName, // Save branch name instead of ID
      isVerified: true,
      count: 0, // Initialize count to 0 for new users
      createdAt: serverTimestamp(),
    });

    return "CREATED"; // new user created successfully

  } catch (error) {
    return "ERROR";
  }
};

export const incrementPrepPlanCount = async (email: string) => {
  try {
    const usersRef = collection(db, "career_counselor");

    // Find user by email
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, error: "User not found" };
    }

    // Get the first matching user document
    const userDoc = querySnapshot.docs[0];
    const userRef = doc(db, "career_counselor", userDoc.id);

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

export const saveCareerInsightQuery = async (email: string, courseName: string, targetCountry: string) => {
  try {
    const usersRef = collection(db, "career_counselor");

    // Find user by email
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, error: "User not found" };
    }

    // Get the first matching user document
    const userDoc = querySnapshot.docs[0];
    const userRef = doc(db, "career_counselor", userDoc.id);

    // Create a subcollection reference for career insight queries
    const queriesRef = collection(userRef, "career_insight_queries");

    // Get current date and time
    const now = new Date();
    const dateString = now.toISOString().split('T')[0]; // YYYY-MM-DD format
    const timeString = now.toTimeString().split(' ')[0]; // HH:MM:SS format

    // Add document to subcollection with course name, country, date, and time
    await addDoc(queriesRef, {
      courseName: courseName,
      country: targetCountry,
      date: dateString,
      time: timeString,
      timestamp: serverTimestamp(),
      createdAt: serverTimestamp(),
    });

    // Also update user document with last query info (for backward compatibility)
    await updateDoc(userRef, {
      lastCourseQuery: courseName,
      lastTargetCountry: targetCountry,
      lastInsightQueryAt: serverTimestamp(),
      lastUpdated: serverTimestamp(),
    });

    return { success: true };

  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
};