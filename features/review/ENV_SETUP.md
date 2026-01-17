# Review Page Environment Variables Setup

## Required Environment Variables

### Gemini API Key (Required for AI Testimonial Coach)

The review page uses Google Gemini API to generate trilingual testimonial scripts. You need to add one of the following environment variables:

**Option 1 (Recommended):** Add a dedicated key for the review page:
```bash
NEXT_PUBLIC_GEMINI_API_KEY_REVIEW=your_gemini_api_key_here
```

**Option 2:** Use the generic Gemini API key (if already set):
```bash
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

**Option 3:** Fallback to legacy key (not recommended):
```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

The service will try these in order: `NEXT_PUBLIC_GEMINI_API_KEY_REVIEW` → `NEXT_PUBLIC_GEMINI_API_KEY` → `GEMINI_API_KEY`

### Firebase Configuration

The Firebase configuration is currently hardcoded in `features/review/services/firebaseConfig.ts` (same as other features in the project). If you want to use environment variables instead, you can update the config to use:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

However, this is **optional** as the hardcoded config matches the existing Firebase project used by other features.

## Assets Verification

All required assets are present:
- ✅ `/public/assets/logos/eeclogo-main.png` - EEC Logo (used in Header and modals)

## Files Structure

All necessary files have been migrated:
- ✅ Components: `features/review/components/`
- ✅ Services: `features/review/services/`
- ✅ Data: `features/review/data/` (branches, cities, states, etc.)
- ✅ Types: `features/review/types/`

## Next Steps

1. Add `NEXT_PUBLIC_GEMINI_API_KEY_REVIEW` to your `.env.local` file
2. Restart your Next.js development server
3. Test the AI Testimonial Coach feature at `/review`

## Notes

- The Firebase config uses the same project as other features (`usa-visa-prep-c72f7`)
- The review page uses the `review` collection in Firestore
- All OTP services use existing Firebase Cloud Functions
