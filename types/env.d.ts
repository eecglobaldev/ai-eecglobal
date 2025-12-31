declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_FIREBASE_API_KEY: string;
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
        NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
        NEXT_PUBLIC_FIREBASE_APP_ID: string;
        
        // Legacy - kept for backward compatibility (deprecated)
        GEMINI_API_KEY?: string;
        NEXT_PUBLIC_GEMINI_API_KEY?: string;
        
        // Tool-specific Gemini API Keys
        NEXT_PUBLIC_GEMINI_API_KEY_USA_VISA: string;
        NEXT_PUBLIC_GEMINI_API_KEY_AUSTRALIA_GS: string;
        NEXT_PUBLIC_GEMINI_API_KEY_NZ_VISA: string;
        NEXT_PUBLIC_GEMINI_API_KEY_UK_PRECAS: string;
        NEXT_PUBLIC_GEMINI_API_KEY_CAREER_COUNSELOR: string;
        NEXT_PUBLIC_GEMINI_API_KEY_TRAVEL_AGENT: string;
        
        // Server-side API keys (for Server Actions - optional)
        GEMINI_API_KEY_USA_VISA?: string;
    }
}
