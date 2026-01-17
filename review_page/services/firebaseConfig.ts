// firebaseConfig.ts
import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCHr4OXY_EcKxApVH9nz3kbUQQhQCPGZfY",
  authDomain: "usa-visa-prep-c72f7.firebaseapp.com",
  databaseURL: "https://usa-visa-prep-c72f7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "usa-visa-prep-c72f7",
  storageBucket: "usa-visa-prep-c72f7.firebasestorage.app",
  messagingSenderId: "777839011356",
  appId: "1:777839011356:web:125ba58cd0a86da0e561d9"
};

export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

// Export Firestore DB instance
export const db = getFirestore(app);
export const auth = getAuth(app);

