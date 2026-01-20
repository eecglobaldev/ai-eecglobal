// firebaseConfig.ts
import { initializeApp, getApps, getApp as getFirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
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

// Initialize Firebase only on client-side to prevent build-time errors
// During SSR/build, these will be undefined and should only be used in client components
let appInstance: ReturnType<typeof initializeApp> | null = null;
let dbInstance: ReturnType<typeof getFirestore> | null = null;
let authInstance: ReturnType<typeof getAuth> | null = null;

if (typeof window !== 'undefined') {
  // Client-side only: Initialize Firebase
  try {
    const apps = getApps();
    appInstance = apps.length > 0 ? getFirebaseApp() : initializeApp(firebaseConfig);
    
    // Initialize Auth with browserLocalPersistence
    try {
      authInstance = getAuth(appInstance);
    } catch (e) {
      try {
        authInstance = initializeAuth(appInstance, {
          persistence: browserLocalPersistence,
        });
      } catch (err) {
        console.warn("Auth initialization fallback:", err);
        authInstance = getAuth(appInstance);
      }
    }
    
    dbInstance = getFirestore(appInstance);
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
}

// Export Firebase services (will be null during SSR/build, only available client-side)
// These should only be used in client components with proper guards
export const app = appInstance!;
export const db = dbInstance!;
export const auth = authInstance!;