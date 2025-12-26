export interface UniversityInfo {
  institution_name: string;
  related_courses: string;
  tuition_fees_local_inr: string;
  academic_requirements: string;
  english_test_scores: string;
  other_test_scores: string;
  application_deadlines: string;
}

export interface GuidanceReport {
  course_explanation: string[];
  prospects: string[];
  job_profiles: string[];
  industries: string[];
  salaries: string[];
  top_companies: string[];
  job_search_websites: string[];
  immigration_relevance: string[];
  university_information: UniversityInfo[];
}

export type Theme = 'light' | 'dark';

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
  reviewerName: string;
  rating: number;
  text: string;
  date?: string;
}

export interface BranchReviews {
  rating: number;
  reviewCount: number;
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
  hasMap: string;
  identifier: string;
  reviews?: BranchReviews;
}

