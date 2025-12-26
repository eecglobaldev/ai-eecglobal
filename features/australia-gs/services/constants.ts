import type { Profile } from '../types';

export const AUTH_MODAL_EVENT = 'show-auth-modal';

// Event name for when user successfully signs in
export const AUTH_SUCCESS_EVENT = 'auth-success';

export const INSTITUTION_TYPES = ["University", "TAFE / Public VET"];
export const UNIVERSITIES = ["Australian National University", "University of Melbourne", "University of Sydney", "UNSW Sydney", "Monash University", "University of Queensland", "University of Western Australia", "University of Adelaide", "University of Technology Sydney", "Macquarie University", "RMIT University", "University of Wollongong", "Curtin University", "University of Newcastle", "Deakin University", "Queensland University of Technology", "Griffith University", "Swinburne University of Technology", "La Trobe University", "University of South Australia", "Flinders University", "University of Tasmania", "Western Sydney University", "Charles Darwin University", "James Cook University", "Murdoch University", "University of Canberra", "Bond University", "Carnegie Mellon University", "CQUniversity", "Charles Sturt University", "Edith Cowan University", "Federation University Australia", "Southern Cross University", "Torrens University Australia", "University of Divinity", "University of New England", "University of Southern Queensland", "University of the Sunshine Coast", "Victoria University", "Australian Catholic University", "University of Notre Dame Australia"];
export const TAFE_INSTITUTIONS = ["TAFE NSW", "TAFE Queensland", "TAFE SA", "TAFE WA (North Metropolitan TAFE, South Metropolitan TAFE)", "TAFE Tasmania (TasTAFE)", "Canberra Institute of Technology (CIT)", "Box Hill Institute", "Chisholm Institute", "Holmesglen Institute", "Kangan Institute", "Melbourne Polytechnic", "Swinburne University of Technology (TAFE division)", "Victoria University Polytechnic", "William Angliss Institute"];
export const COURSE_LEVELS = ["Diploma", "Advanced Diploma", "Bachelors Degree", "Graduate Diploma", "Masters Degree", "Doctoral Degree"];
export const SPONSOR_TYPES = ["Father", "Mother", "Both Parents", "Self", "Other"];
// FIX: Added 'CAE', 'GMAT', and 'LanguageCert' to the list of test types to match the form options and the core Profile type, preventing type errors and resolving inconsistencies.
export const TEST_TYPES = ['IELTS', 'TOEFL iBT', 'PTE Academic', 'OET', 'CAE', 'GMAT', 'LanguageCert'];
export const WORK_EXP_TYPES = ['Paid', 'Unpaid', 'Internship', 'Volunteer', 'Community Work', 'Self-employed'];

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'mr', name: 'मराठी' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'or', name: 'ଓଡ଼ିଆ' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'മലയാളം' },
];

export const PREVIOUS_QUALIFICATIONS = [
    "Higher Secondary (12th Grade)",
    "Diploma",
    "Bachelors Degree",
    "Masters Degree",
    "Doctoral Degree"
];

export const FUNDING_SOURCES = [
    { key: 'familySavings', label: 'Family Savings' },
    { key: 'educationLoan', label: 'Education Loan' },
    { key: 'personalSavings', label: 'Personal Savings' },
];


// FIX: The INITIAL_PROFILE object was not in sync with the `Profile` type definition.
// This change aligns the object with the type by removing invalid properties (like auVisaType),
// adding missing ones (like auTravelHistory), and renaming drifted properties (like spouseQualification).
export const INITIAL_PROFILE: Profile = {
    institutionType: '',
    institutionName: '',
    courseLevel: '',
    courseName: '',
    previousQualification: '',
    previousCourseName: '',
    previousInstitution: '',
    previousInstitutionNOOSR: '',
    previousGrade: '',
    previousGradeScale: '',
    languageOfInstruction: '',
    workExperience: [],
    studyGaps: [],
    careerGoals: '',
    expectedSalaryInIndia: '',
    testScores: [],
    totalFunds: '',
    gsAnswersText: '',
    primarySponsor: '',
    sponsorRelationship: '',
    sponsor1Name: '',
    sponsor1Profession: '',
    sponsor1Income: '',
    sponsor1ItrIncome: '',
    sponsor2Name: '',
    sponsor2Profession: '',
    sponsor2Income: '',
    sponsor2ItrIncome: '',
    fundingSources: { familySavings: false, educationLoan: false, personalSavings: false },
    educationLoanBank: '',
    educationLoanAmount: '',
    educationLoanStatus: '',
    hasRelativesInAustralia: 'no',
    relativeName: '',
    relativeVisaStatus: '',
    relativeLocation: '',
    relativeAccommodation: 'No involvement',
    hasTraveledToAustralia: 'no',
    auTravelHistory: [],
    hasOtherTravel: 'no',
    otherTravelHistory: [],
    maritalStatus: 'Single',
    dateOfMarriage: '',
    marriageDurationInMonths: null,
    spouseName: '',
    spouseOccupation: '',
    spouseHighestQualification: '',
    spouseAccompanying: 'No',
    spouseExperience: '',
    childrenAccompanying: 'No',
    numberOfChildren: '',
    childrenAges: '',
    hasVisaRefusal: 'no',
    visaRefusals: [],
    hasMedicalIssues: 'no',
    hasCriminalRecord: 'no',
    refusalReason: '', // This can be deprecated in favor of the array
};