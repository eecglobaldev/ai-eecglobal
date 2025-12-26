# Firebase Duplicate App Error - Fixed ✅

## Issue
Build was failing with:
```
Error [FirebaseError]: Firebase: Firebase App named '[DEFAULT]' already exists with different options or config (app/duplicate-app).
```

## Root Cause
The `features/australia-gs/services/firebaseConfig.ts` file was using `initializeApp(firebaseConfig)` directly without checking if Firebase was already initialized. During Next.js SSR/build, this can be called multiple times, causing the duplicate app error.

## Solution
Updated the Firebase initialization to use the singleton pattern, matching the pattern used in other Firebase config files:

**Before:**
```typescript
export const app = initializeApp(firebaseConfig);
```

**After:**
```typescript
import { initializeApp, getApps, getApp } from "firebase/app";

// Initialize Firebase (Singleton pattern to prevent duplicate app errors)
// Check if app is already initialized to avoid errors in Next.js SSR/build
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
```

## How It Works
1. `getApps()` returns an array of all initialized Firebase apps
2. If no apps exist (`!getApps().length`), initialize a new app
3. If an app already exists, get the existing app with `getApp()`
4. This prevents duplicate initialization during SSR/build

## Files Updated
- ✅ `features/australia-gs/services/firebaseConfig.ts`

## Verification
- ✅ Build successful
- ✅ No TypeScript errors
- ✅ No linter errors

## Pattern Consistency
This fix makes the Australia GS Firebase config consistent with:
- `features/shared/lib/firebase.ts` (uses same pattern)
- `features/usa-visa/services/firebaseConfig.ts` (uses same pattern)

