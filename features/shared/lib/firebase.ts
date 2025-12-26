import { initializeApp, getApps, getApp } from "firebase/app";
import {
    getAuth,
    initializeAuth,
    browserLocalPersistence,
    inMemoryPersistence,
    type Auth
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase (Singleton pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth with persistence
// We need to handle server-side vs client-side initialization
let auth: Auth;
if (typeof window !== "undefined") {
    // Client-side: use browserLocalPersistence
    try {
        // Check if auth is already initialized to avoid errors
        auth = getAuth(app);
    } catch {
        auth = initializeAuth(app, {
            persistence: browserLocalPersistence,
        });
    }
} else {
    // Server-side: use inMemoryPersistence or none
    try {
        auth = getAuth(app);
    } catch {
        auth = initializeAuth(app, {
            persistence: inMemoryPersistence,
        });
    }
}

const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);

export { app, auth, db, storage, functions };
