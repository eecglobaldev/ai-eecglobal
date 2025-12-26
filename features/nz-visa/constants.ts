
import { UserProfile } from './types';

export const INSTITUTION_TYPES = ["University", "Polytechnic / Te Pūkenga"];
export const UNIVERSITIES = ["University of Auckland", "Auckland University of Technology (AUT)", "University of Waikato", "Massey University", "Victoria University of Wellington", "University of Canterbury", "Lincoln University", "University of Otago"];
export const POLYTECHNICS = ["Ara Institute of Canterbury", "Eastern Institute of Technology (EIT)", "Manukau Institute of Technology (MIT)", "Nelson Marlborough Institute of Technology (NMIT)", "NorthTec", "Otago Polytechnic", "Southern Institute of Technology (SIT)", "Toi Ohomai Institute of Technology", "Unitec Institute of Technology", "Universal College of Learning (UCOL)", "Waikato Institute of Technology (Wintec)", "Wellington Institute of Technology (WelTec)", "Western Institute of Technology at Taranaki (WITT)", "Whitireia New Zealand"];
export const COURSE_LEVELS = ["Bachelors", "Masters", "PhD"];
export const SPONSOR_TYPES = ["Father", "Mother", "Both Parents", "Self", "Other"];

export const AUTH_MODAL_EVENT = 'nzprep:open-auth-modal';
export const AUTH_SUCCESS_EVENT = 'auth-success';
export const DASHBOARD_URL = 'https://ai.eecglobal.com/nzvisaprep/dashboard/';

export const INITIAL_USER_PROFILE: UserProfile = {
  institutionType: '',
  institutionName: '',
  courseLevel: '',
  courseName: '',
  previousEducation: '',
  workExperience: '',
  careerGoals: '',
  testScores: '',
  usesFTS: false,
  primarySponsor: '',
  sponsor1Name: '',
  sponsor1Profession: '',
  sponsor1Income: '',
  sponsor2Name: '',
  sponsor2Profession: '',
  sponsor2Income: '',
  fundingSources: {
    familySavings: null,
    educationLoan: null,
    personalSavings: null,
  },
  maritalStatus: 'Single',
  dateOfMarriage: '',
  marriageDurationInMonths: null,
  spouseAccompanying: 'No',
  spouseQualification: '',
  spouseExperience: '',
  childrenAccompanying: 'No',
  numberOfChildren: '',
  childrenAges: '',
  hasVisaRefusal: 'no',
  refusalReason: '',
};

