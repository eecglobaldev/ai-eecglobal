import { ReactNode, ElementType } from 'react';

export interface CardData {
  id: number;
  badgeText: string;
  badgeIcon: ElementType; // Changed to Lucide Component type
  mainIcon: ElementType;  // New large icon
  title: ReactNode;
  description: ReactNode;
  glowColor: string;
  componentId?: string; // Component identifier for mapping
}


export interface UserProfile {
  institutionType: string;
  institutionName: string;
  courseLevel: string;
  courseName: string;
  previousEducation: string;
  workExperience: string;
  careerGoals: string;
  testScores: string;
  usesFTS: boolean;
  primarySponsor: string;
  sponsor1Name: string;
  sponsor1Profession: string;
  sponsor1Income: string;
  sponsor2Name: string;
  sponsor2Profession: string;
  sponsor2Income: string;
  fundingSources: {
    familySavings: string | null;
    educationLoan: string | null;
    personalSavings: string | null;
  };
  maritalStatus: 'Single' | 'Married';
  dateOfMarriage: string;
  marriageDurationInMonths: number | null;
  spouseAccompanying: 'No' | 'Yes';
  spouseQualification: string;
  spouseExperience: string;
  childrenAccompanying: 'No' | 'Yes';
  numberOfChildren: string;
  childrenAges: string;
  hasVisaRefusal: 'no' | 'yes';
  refusalReason: string;
}

export interface Question {
  question: string;
  modelAnswer: string;
  guidance: string;
}

export interface PrepContentSection {
  title: string;
  summary?: string;
  questions: Question[];
}

export interface PrepContent {
  keyTalkingPoints: string;
  sections: PrepContentSection[];
  /**
   * Flattened list of questions for convenience in UI flows.
   * Always mirrors the questions inside `sections`.
   */
  questions: Question[];
}

export interface HistoryItem {
  id: number;
  timestamp: string;
  questionId?: string;
  question: string;
  transcript: string;
  feedback: string;
  score: number;
  // Optional: URL to the user's recorded audio in Firebase Storage
  audioUrl?: string;
  // Optional: duration of the recorded audio in seconds
  audioDurationSeconds?: number;
}

export interface ModalInfo {
  isOpen: boolean;
  message: string;
  isConfirm?: boolean;
  onConfirm?: () => void;
}

export interface Counselor {
  name: string;
  phone: string;
  email: string;
}

export interface BranchTimings {
  coachingCounseling?: string;
  demoClass?: string;
  visaCounseling?: string;
  general?: string;
  workingDays: string;
  closedOn: string;
}

export interface BranchReview {
  author: string;
  rating: number;
  text: string;
  date: string;
  avatarInitial?: string;
}

export interface BranchRating {
  rating: number;
  totalReviews: number;
  lastFetched: string;
  reviews: BranchReview[];
}

export interface Branch {
  '@type': 'EducationalOrganization';
  name: string;
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  geo?: {
    '@type': 'GeoCoordinates';
    latitude: string | number;
    longitude: string | number;
  };
  timings?: BranchTimings;
  contactPoint: {
    '@type': 'ContactPoint';
    contactType: string;
    telephone: string;
    url: string;
  }[];
  counselors?: Counselor[];
  hasMap: string;
  identifier: string;
  googleRating?: BranchRating;
}

