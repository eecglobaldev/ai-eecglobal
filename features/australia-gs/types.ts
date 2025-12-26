export interface StudyGap {
  id: number;
  startDate: string;
  endDate: string;
  reason: string;
  type?: 'Work' | 'Exam Preparation' | 'Travel' | 'Personal' | 'Medical';
}

export interface VisaRefusal {
  id: number;
  country: string;
  visaType: string;
  year: string;
  reason: string;
}

export interface TravelHistory {
    id: number;
    country: string;
    year: string;
    duration: string;
    purpose: string;
}

export interface WorkExperience {
  id: number;
  employerName: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
  type: 'Paid' | 'Unpaid' | 'Internship' | 'Volunteer' | 'Community Work' | 'Self-employed' | '';
  isCurrent: boolean;
  salary: string; // Annual salary in INR
}

export interface TestScore {
  id: number;
  // FIX: Added 'CAE' and 'GMAT' to the list of possible test types to align with the form schema.
  testType: 'IELTS' | 'TOEFL iBT' | 'PTE Academic' | 'LanguageCert' | 'OET' | 'CAE' | 'GMAT' | '';
  testDate: string;
  overall: string;
  listening: string;
  reading: string;
  writing: string;
  speaking: string;
  // GMAT specific fields
  quant?: string;
  verbal?: string;
  dataInsights?: string;
}

export interface Profile {
  // --- Step 1: Academic ---
  institutionType: string;
  institutionName: string;
  courseLevel: string;
  courseName: string;
  
  // --- Step 2: Background ---
  previousQualification: string;
  previousCourseName: string;
  previousInstitution: string;
  previousInstitutionNOOSR: string | number;
  previousGrade: string;
  previousGradeScale: string;
  languageOfInstruction: 'English' | 'Other' | '';
  
  workExperience: WorkExperience[];
  studyGaps: StudyGap[];
  careerGoals: string;
  expectedSalaryInIndia: string; // In INR Lakhs
  
  testScores: TestScore[];
  
  // --- Step 3: Financials ---
  totalFunds: string;
  primarySponsor: string;
  sponsorRelationship: string; // if primarySponsor is 'Other'
  
  sponsor1Name: string;
  sponsor1Profession: string;
  sponsor1Income: string;
  sponsor1ItrIncome: string;
  
  sponsor2Name: string;
  sponsor2Profession: string;
  sponsor2Income: string;
  sponsor2ItrIncome: string;
  
  fundingSources: {
    familySavings: boolean;
    educationLoan: boolean;
    personalSavings: boolean;
  };
  educationLoanBank: string;
  educationLoanAmount: string;
  educationLoanStatus: 'Applied' | 'Sanctioned' | 'Disbursed' | '';

  // --- Step 4: History ---
  // FIX: Expanded maritalStatus to include all options from the form, preventing a type mismatch.
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed';
  dateOfMarriage: string;
  marriageDurationInMonths: number | null;
  
  spouseName: string;
  spouseOccupation: string;
  spouseHighestQualification: string;
  spouseAccompanying: 'Yes' | 'No';
  spouseExperience: string;
  
  childrenAccompanying: 'Yes' | 'No';
  numberOfChildren: string;
  childrenAges: string;
  
  hasVisaRefusal: 'yes' | 'no';
  visaRefusals: VisaRefusal[];
  
  hasTraveledToAustralia: 'yes' | 'no';
  auTravelHistory: TravelHistory[];

  hasOtherTravel: 'yes' | 'no';
  otherTravelHistory: TravelHistory[];

  // --- Other Critical Fields (can be added in a future step or are for completeness) ---
  hasRelativesInAustralia: 'yes' | 'no';
  relativeName: string;
  relativeVisaStatus: string;
  relativeLocation: string;
  relativeAccommodation: string;
  
  hasMedicalIssues: 'yes' | 'no';
  hasCriminalRecord: 'yes' | 'no';

  // --- SOP/GS Text ---
  gsAnswersText: string;

  // Deprecated field, logic moved to visaRefusals array
  refusalReason: string;
}

export interface Question {
  question: string;
  modelAnswer: string;
  guidance: string;
}

export interface PrepContent {
  keyTalkingPoints: string;
  questions: Question[];
}

export interface HistoryItem {
  id: number;
  timestamp: string;
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
  coachingCounseling: string;
  demoClass: string;
  visaCounseling: string;
  workingDays: string;
  closedOn: string;
}

export interface GoogleReview {
  author: string;
  rating: number;
  text: string;
  date: string;
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
  contactPoint: Array<{
    '@type': 'ContactPoint';
    contactType: string;
    telephone: string;
    url: string;
  }>;
  counselors?: Counselor[];
  hasMap: string;
  geo?: {
    '@type': 'GeoCoordinates';
    latitude: number | string;
    longitude: number | string;
  };
  timings?: BranchTimings;
  googleRating?: number;
  googleReviewCount?: number;
  googleReviews?: GoogleReview[];
  identifier: string;
  region?: string;
  isHeadOffice?: boolean;
}