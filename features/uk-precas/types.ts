import { LucideIcon } from 'lucide-react';

export interface CardData {
    id: number;
    componentId: string;
    badgeText: string;
    badgeIcon: LucideIcon;
    mainIcon: LucideIcon;
    glowColor: string;
    title: React.ReactNode;
    description: React.ReactNode;
}

export interface StudentProfile {
    university: string;
    courseLevel: string;
    course: string;
    previousQualification: string;
    fundingSource: string;
    sponsorOccupation: string;
    careerGoals: string;
    studyGap: string;
}

export interface Question {
    question: string;
    guidance: string;
    modelAnswer: string;
}

export interface QuestionSection {
    title: string;
    questions: Question[];
}

export interface PrepContent {
    keyTalkingPoints: string;
    questions: Question[];
    sections?: QuestionSection[];
}

export interface HistoryItem {
    id: number;
    timestamp: string;
    university: string;
    courseLevel: string;
    course: string;
    question: string;
    questionId?: string;
    transcript: string;
    feedback: string;
    score: number;
    // Optional: URL to the user's recorded audio in Firebase Storage
    audioUrl?: string;
    // Optional: duration of the recorded audio in seconds
    audioDurationSeconds?: number;
}

export type UserProfile = Record<string, any>;
export interface Counselor {
    name: string;
    phone: string;
    email: string;
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
    contactPoint: {
      '@type': 'ContactPoint';
      contactType: string;
      telephone: string;
      url: string;
    }[];
    counselors?: Counselor[];
    hasMap: string;
    identifier: string;
  }

