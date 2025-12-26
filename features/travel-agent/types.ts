
export interface VisaRequirements {
  visaName: string; // e.g. "Schengen Visa Type C", "F-1 Student Visa"
  status: string; // e.g., "Visa Required", "Visa Free"
  duration: string; // e.g., "90 Days"
  validity: string; // e.g., "5 Years", "6 Months"
  cost: string; // e.g., "Approx. $160 USD"
  processingTime: string; // e.g., "15-30 Business Days"
  summary: string;
  documents: string[]; // Hyper detailed list
  processSteps: string[]; // Detailed step-by-step guide
  difficulty: 'Easy' | 'Medium' | 'Hard';
  
  // New Hyper-Detailed Fields
  financialReqs: string; // Minimum balance, statement duration, payslips
  photoReqs: string; // Dimensions, background, % face coverage
  insuranceReqs: string; // Min coverage (e.g., 30k EUR), inclusions
  accommodationReqs: string; // Booking proofs, invitation letter requirements
  
  notes: string;
  embassyContact?: string;
  officialSources?: { title: string; url: string; authorityLevel?: 'Gold' | 'Silver' | 'Bronze' }[];
  lastUpdate?: string; // Date of the policy/source
  
  // GEO & LLM Optimization Fields
  confidenceScore: number; // 0-100 score indicating data reliability
  aiAnalysis: string; // Brief reasoning from the AI about why this data is accurate
  
  // 10x Forensic E-E-A-T Fields
  legalCitations?: string[]; // e.g. "INA Section 214(b)", "Schengen Borders Code Art. 6"
  rejectionRisk?: {
    probability: string; // "Low", "Moderate", "High"
    primaryReason: string; // "Lack of Economic Ties"
    mitigationTip: string; // "Include property deeds"
  };
}

export interface ChecklistItem {
  item: string;
  description: string; // The "Forensic" detail
  isCritical: boolean; // Highlights items that cause immediate rejection
}

export interface ChecklistCategory {
  categoryName: string; // e.g. "Financial Proofs", "Identity Documents"
  items: ChecklistItem[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface SearchParams {
  origin: string; // Always 'India'
  originState: string; // e.g. 'Gujarat', 'Maharashtra'
  destination: string;
  visaType: 'Tourist' | 'Student';
}

export const SUPPORTED_LANGUAGES = [
  'Hindi', 
  'Gujarati', 
  'Marathi', 
  'Punjabi', 
  'Bengali', 
  'Telugu', 
  'Tamil', 
  'Kannada', 
  'Malayalam', 
  'Oriya'
] as const;

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number] | 'English';

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", 
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", 
  "Lakshadweep", "Puducherry"
] as const;

export const DESTINATION_COUNTRIES = [
  "Australia", "Austria", "Azerbaijan", "Bahrain", "Belgium", "Bulgaria", "Canada", "China", "Croatia", "Cyprus", "Czech Republic",
  "Denmark", "Estonia", "Finland", "France", "Georgia", "Germany", "Greece", "Hong Kong", "Hungary", "Iceland", "Indonesia", "Ireland", "Israel", "Italy",
  "Japan", "Kazakhstan", "Kuwait", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Malaysia", "Maldives", "Malta", "Mexico", "Monaco",
  "Netherlands", "New Zealand", "Norway", "Oman", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Saudi Arabia",
  "Schengen Area", "Singapore", "Slovakia", "Slovenia", "South Korea", "Spain", "Sweden", "Switzerland", "Taiwan", "Thailand", "Turkey",
  "United Arab Emirates", "United Kingdom", "United States", "Uzbekistan", "Vatican City", "Vietnam"
] as const;

export interface Branch {
  "@type": string;
  name: string;
  address: {
    "@type": string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  geo?: {
    "@type": string;
    latitude: string;
    longitude: string;
  };
  timings?: {
    coachingCounseling?: string;
    demoClass?: string;
    visaCounseling?: string;
    general?: string;
    workingDays: string;
    closedOn: string;
  };
  contactPoint: Array<{
    "@type": string;
    contactType: string;
    telephone: string;
    url: string;
  }>;
  counselors?: Array<{
    name: string;
    phone: string;
    email: string;
  }>;
  googleReviews?: {
    rating: number;
    reviewCount: number;
    reviews: Array<{
      text: string;
      author?: string;
      rating: number;
    }>;
    lastUpdated: string;
  };
  hasMap?: string;
  identifier: string;
}
