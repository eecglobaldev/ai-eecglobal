// firebaseConfig.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
    browserLocalPersistence,
    getAuth,
    initializeAuth,
} from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCHr4OXY_EcKxApVH9nz3kbUQQhQCPGZfY",
    authDomain: "usa-visa-prep-c72f7.firebaseapp.com",
    databaseURL: "https://usa-visa-prep-c72f7-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "usa-visa-prep-c72f7",
    storageBucket: "usa-visa-prep-c72f7.firebasestorage.app",
    messagingSenderId: "777839011356",
    appId: "1:777839011356:web:125ba58cd0a86da0e561d9"
};

// Initialize Firebase
// Check if app is already initialized to avoid errors in Next.js hot reload
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth with browserLocalPersistence for cross-domain SSO
let authInstance;
try {
    // Try to get existing auth instance first
    authInstance = getAuth(app);
} catch (e) {
    // If not initialized, initialize it
    try {
        authInstance = initializeAuth(app, {
            persistence: browserLocalPersistence,
        });
    } catch (err) {
        // Fallback if initializeAuth fails (e.g. server-side) or race condition
        console.warn("Auth initialization fallback:", err);
        authInstance = getAuth(app);
    }
}

// Export Firebase services
export const db = getFirestore(app);
export const auth = authInstance;
export const storage = getStorage(app);
