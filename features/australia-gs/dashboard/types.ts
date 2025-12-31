// Raw data structure from Firestore
export interface RawPracticeAttempt {
  question: string;
  questionId?: string;
  transcript: string;
  feedback: string;
  score?: number; // Score can be optional in Firestore
  duration?: number; // in seconds
  timestamp: any; // Can be a string or Firestore Timestamp
  attemptId: number;
  attemptUrl: string;
  prepDataId: string;
  audioUrl?: string;
  audioDurationSeconds?: number;
}

// Processed data structure used in the app
export interface PracticeAttempt {
  id: string; // Document ID
  question: string;
  questionId: string;
  transcript: string;
  feedback: string;
  score: number; // Guaranteed to be a number after processing
  duration: number; // Guaranteed to be a number after processing
  timestamp: string; // Guaranteed to be an ISO string after processing
  attemptId: number;
  attemptUrl: string;
  prepDataId: string;
  audioUrl?: string;
  audioDurationSeconds?: number;
}

export interface PrepData {
    id: string;
    type?: 'sop' | 'kpoints' | 'transcript'; // Optional for backward compatibility
    url?: string; // Optional - can be keyTalkingPointsUrl
    keyTalkingPointsUrl?: string; // From old implementation
    questionCount?: number;
    profileSummary?: string;
    keyTalkingPointsPreview?: string;
    sopFileName?: string;
    createdAt: string; // Guaranteed to be an ISO string
}

// FIX: Add KeyTalkingPoints interface to resolve import error in data.ts.
export interface KeyTalkingPoints {
  keyTalkingPoints: string;
  questionTexts: string[];
  questionCount: number;
}


export interface ApplicationData {
  id?: string;
  branch?: string;
  city?: string;
  count?: number;
  app_state?: string;
  full_application_data?: {
    courseSelection?: {
      courseName?: string;
      institution?: string;
    };
    [key: string]: any;
  };
  [key: string]: any; // Allow additional fields
}

export interface StudentProfile {
  id: string;
  email: string;
  name: string;
  photoURL?: string;
  targetCountry: string;
  city?: string;
  branch?: string;
  application?: ApplicationData;
  applicationData?: ApplicationData; // From subcollection
  // FIX: Add missing properties to StudentProfile to match data structure and fix type errors.
  practice_history?: { [key: string]: Omit<PracticeAttempt, 'id'> };
  prep_data?: { [key: string]: Omit<PrepData, 'id'> };
}

export interface TimelineData {
    isoDate: string;
    label: string;
    attempts: number;
    uploads: number;
    aiGenerations: number;
}

export interface StudentAnalyticsData {
    totalAttempts: number;
    attemptsLast7Days: number;
    averageDuration: number;
    averageScore: number;
    totalPracticeDays: number;
    firstPracticeDate: string | null;
    lastPracticeDate: string | null;
    streak: number;
    totalAudioUploads: number;
    totalSopUploads: number;
    totalTranscripts: number;
    keyTalkingPointsGenerated: number;
    sopGenerated: number;
    profileCompleteness: number;
    timeline: TimelineData[];
    practiceHistory: PracticeAttempt[];
}
