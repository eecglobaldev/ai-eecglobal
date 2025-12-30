// firebaseConfig.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  browserLocalPersistence,
  getAuth,
  initializeAuth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHr4OXY_EcKxApVH9nz3kbUQQhQCPGZfY",
  authDomain: "usa-visa-prep-c72f7.firebaseapp.com",
  databaseURL: "https://usa-visa-prep-c72f7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "usa-visa-prep-c72f7",
  storageBucket: "usa-visa-prep-c72f7.firebasestorage.app",
  messagingSenderId: "777839011356",
  appId: "1:777839011356:web:125ba58cd0a86da0e561d9"
};

// Initialize Firebase (Singleton pattern to prevent duplicate app errors)
// Check if app is already initialized to avoid errors in Next.js SSR/build
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Configure Auth with persistent sessions so dashboard reuses login state
// SSR guard: browserLocalPersistence is only available in the browser
let authInstance;
if (typeof window !== 'undefined') {
  try {
    authInstance = initializeAuth(app, {
      persistence: browserLocalPersistence,
    });
  } catch (_) {
    // Fallback if auth was already initialized elsewhere
    authInstance = getAuth(app);
  }
} else {
  // Server-side: use getAuth without persistence
  authInstance = getAuth(app);
}

export const db = getFirestore(app);
export const auth = authInstance;
export const storage = getStorage(app);

