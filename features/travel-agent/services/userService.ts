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
  const usersRef = collection(db, "travel_agent");
  const q = query(usersRef, where("phone", "==", phone));
  const snap = await getDocs(q);
  return !snap.empty;
};

export const checkEmailExists = async (email: string) => {
  const usersRef = collection(db, "travel_agent");
  const q = query(usersRef, where("email", "==", email));
  const snap = await getDocs(q);
  return !snap.empty;
};

export const getUserByPhone = async (phone: string) => {
  const usersRef = collection(db, "travel_agent");
  const q = query(usersRef, where("phone", "==", phone));
  const snap = await getDocs(q);
  if (!snap.empty) {
    const userDoc = snap.docs[0];
    return { id: userDoc.id, ...userDoc.data() };
  }
  return null;
};

export const getUserByEmail = async (email: string) => {
  const usersRef = collection(db, "travel_agent");
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
    const usersRef = collection(db, "travel_agent");

    // 1️⃣ CHECK IF USER ALREADY EXISTS
    const q = query(usersRef, where("email", "==", userData.email));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return "EXISTS"; // user already has an account
    }

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
    const usersRef = collection(db, "travel_agent");
    
    // Find user by email
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, error: "User not found" };
    }

    // Get the first matching user document
    const userDoc = querySnapshot.docs[0];
    const userRef = doc(db, "travel_agent", userDoc.id);

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
    const usersRef = collection(db, "travel_agent");
    
    // Find user by email
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, error: "User not found" };
    }

    // Get the first matching user document
    const userDoc = querySnapshot.docs[0];
    const userRef = doc(db, "travel_agent", userDoc.id);

    // Update user document with course name and target country
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

// Save visa search query to Firebase
export const saveVisaSearchQuery = async (
  email: string,
  searchData: {
    origin: string;
    originState: string;
    destination: string;
    visaType: string;
    userCity?: string;
    userState?: string;
  }
) => {
  try {
    const searchesRef = collection(db, "visa_searches");
    
    // Create a new search document
    await addDoc(searchesRef, {
      userEmail: email,
      origin: searchData.origin,
      originState: searchData.originState,
      destination: searchData.destination,
      visaType: searchData.visaType,
      userCity: searchData.userCity || '',
      userState: searchData.userState || '',
      createdAt: serverTimestamp(),
    });

    return { success: true };

  } catch (error) {
    console.error('Error saving visa search query:', error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
};

// Update user document with latest search parameters
export const updateUserLastSearch = async (
  email: string,
  searchData: {
    origin: string;
    originState: string;
    destination: string;
    visaType: string;
  }
) => {
  try {
    const usersRef = collection(db, "travel_agent");
    
    // Find user by email
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, error: "User not found" };
    }

    // Get the first matching user document
    const userDoc = querySnapshot.docs[0];
    const userRef = doc(db, "travel_agent", userDoc.id);

    // Update user document with latest search parameters
    await updateDoc(userRef, {
      lastDestination: searchData.destination,
      lastOriginState: searchData.originState,
      lastVisaType: searchData.visaType,
      lastOrigin: searchData.origin,
      lastSearchAt: serverTimestamp(),
      lastUpdated: serverTimestamp(),
    });

    return { success: true };

  } catch (error) {
    console.error('Error updating user last search:', error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
};