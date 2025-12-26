// Fix: Add import for ReactNode
import type { ReactNode } from 'react';

export interface TestScores {
    waiverIB: boolean;
    waiverIndianBoard: boolean;
    waiverUniversity: boolean;
    ielts: string;
    toefl: string;
    pte: string;
    duolingo: string;
    gre: string;
    sat: string;
    gmat: string;
    otherTestName: string;
    otherTestScore: string;
}

export type SponsorType =
    | 'Parents'
    | 'Father'
    | 'Mother'
    | 'Other Family Member'
    | 'Corporate Sponsor'
    | 'Government Sponsor'
    | 'University Scholarship'
    | 'Graduate Assistantship (TA/RA)'
    | 'Out-of-state tuition waiver';

export interface Sponsor {
    id: string;
    type: SponsorType | '';

    // For Parents / Father / Mother
    fatherOccupation?: string;
    fatherAnnualIncomeUSD?: string;
    fatherAnnualIncomeINR?: string;
    motherOccupation?: string;
    motherAnnualIncomeUSD?: string;
    motherAnnualIncomeINR?: string;

    // For Other Family Member
    otherRelationship?: string;
    otherOccupation?: string;
    otherAnnualIncomeUSD?: string;
    otherAnnualIncomeINR?: string;

    // For Corporate or Government Sponsor
    sponsorName?: string;

    // For University Scholarship
    scholarshipType?: 'Full' | 'Partial';
    scholarshipAmountUSD?: string;

    // For Graduate Assistantship
    assistantshipDetails?: 'TA' | 'RA' | '';
    assistantshipWaiver?: 'Full' | 'Partial' | 'None';
    assistantshipWaiverAmount?: string;
    hasStipend?: 'Yes' | 'No';
    stipendAmount?: string;

    // For Out-of-state tuition waiver
    waiverAmount?: string;
}

export type CareerGoalOption =
    | 'Join Family Business'
    | 'Start My Own Company'
    | 'Join MNC in India'
    | 'Work Globally'
    | 'Government Job in India'
    | 'Other';

export interface CareerGoalDetails {
    goal: CareerGoalOption | '';
    details: string;
}

export interface WorkExperienceItem {
    id: string;
    type: 'Paid' | 'Volunteer' | 'Community Work' | '';
    company: string;
    position: string;
    startMonth: string;
    startYear: string;
    endMonth: string;
    endYear: string;
    isCurrent: boolean;
    salary: string;
    description: string;
}

export interface UserProfile {
    university: string;
    courseLevel: string;
    course: string;
    lastQualification: string;
    grade: string;
    indianUniversity: string;
    workExperience: WorkExperienceItem[];
    sponsors: Sponsor[];
    careerGoals: CareerGoalDetails;
    testScores: TestScores;
    hasRefusal: 'yes' | 'no';
    refusalType: string;
    refusalReason: string;
    hasTraveled: 'yes' | 'no';
    travelDetails: string;
    hasPetition: 'yes' | 'no';
    petitionDetails: string;
    additionalDetails: string;
}

export interface Question {
    question: string;
    modelAnswer: string;
    guidance: string;
    tips?: string | string[];
}

export interface PrepContent {
    keyTalkingPoints: string;
    sections: {
        title: string;
        questions: Question[];
    }[];
    // Flattened array for easy access (may not exist in stored data)
    interview_questions?: Question[];
}

export interface Feedback {
    score: number;
    feedback: string;
}

export interface HistoryItem extends Feedback {
    id: number;
    timestamp: string;
    question: string;
    questionId?: string;
    transcript: string;
    // Optional: URL to the user's recorded audio in Firebase Storage
    audioUrl?: string;
    // Optional: duration of the recorded audio in seconds
    audioDurationSeconds?: number;
}

export interface ModalState {
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

export interface GoogleReview {
    author: string;
    rating: number;
    text: string;
    date: string;
}

export interface BranchReviews {
    rating: number;
    totalReviews: number;
    fiveStarReviews: GoogleReview[];
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
    geo: {
        '@type': 'GeoCoordinates';
        latitude: string;
        longitude: string;
    };
    timings: BranchTimings;
    contactPoint: {
        '@type': 'ContactPoint';
        contactType: string;
        telephone: string;
        url: string;
    }[];
    counselors?: Counselor[];
    reviews?: BranchReviews;
    hasMap: string;
    identifier: string;
}

export interface Testimonial {
    quote: string;
    name: string;
    university: string;
    focus: string;
}

export interface Expert {
    name: string;
    title: string;
    bio: React.ReactNode;
    image: React.ReactNode;
}
