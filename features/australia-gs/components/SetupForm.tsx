import React, { useEffect, useMemo, useState, useRef } from "react";
// FIX: Added `Variants` to the import to correctly type animation variants.
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Profile, TestScore } from "../types";
import { CITIES_DATA, AU_INSTITUTIONS, BANK_DATA } from "../data/australiaData";
import { sampleProfiles } from "../data/sampleProfiles";
import { IMAGES } from '../constant';
import { AUTH_MODAL_EVENT } from '../services/constants';
import noosrCsv from '../data/noosr';
import LoginSignupModal from './LoginSignupModel';
import AuthGateModal from './AuthGateModal';
import { saveCompleteApplication } from '../services/integrationExample';
import { saveFormData, loadFormData, hasFormData } from '../services/formDataService';
import { getAuth } from 'firebase/auth';


// NOTE: The following imports assume a component library (like shadcn/ui) is available in the project.
// As per standard procedure, I am leaving these imports as-is, assuming the build environment resolves them.
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import {
  CheckIcon,
  CheckCircle2,

  Users,
  GraduationCap,
  Briefcase,
  Languages,
  NotebookPen,
  Wallet2,
  Home,
  PlaneTakeoff,
  FileText,
  Download,
  RotateCcw,
  AlertTriangle,
  Play,
  CalendarCheck,
  Lightbulb,
  Eye,
  Fingerprint,
  PenSquare,
  PlusCircle,
  Trash2,
  ChevronDown,
  Layers,
  HeartPulse,
  Palette,
  Bot,
  Sigma,
  FlaskConical,
} from "lucide-react";


/**
 * EEC • Australian Student Visa – GS Interview Intake (Stabilized v3)
 * ------------------------------------------------------------------
 * - Fix: removed stray characters that broke JSX/TS parsing
 * - Fix: no cross-scope references inside child components
 * - Fix: safe bullet usage via "\u2022" or HTML entities inside strings only
 * - Kept: self-tests, AU institutions list, NOOSR import + badge
 */

// ----------------- Constants & Helpers -----------------
const PASSPORT_REGEX = /^[A-Z][0-9]{7}$/; // Simplified Indian passport format like 'N1234567'
const PHONE_REGEX = /^\+?[0-9\s\-]{10,16}$/; // +country and digits

const RISK_ENGINE_CONFIG = {
  GAP_EXPLANATION_MIN_LENGTH: 40,
  ENGLISH_TEST_EXPIRY_DAYS: 730,
  INTAKE_WARNING_DAYS: 120,
  DEFAULT_TRAVEL_COST_AUD: 2000,
};

// Placeholders for English tests
const testPlaceholders = {
  'IELTS': { overall: "7.0", l: "7.5", r: "7.0", w: "6.5", s: "6.5" },
  'PTE Academic': { overall: "65", l: "68", r: "65", w: "66", s: "70" },
  'TOEFL iBT': { overall: "95", l: "24", r: "23", w: "25", s: "23" },
  'CAE': { overall: "185", l: "180", r: "190", w: "182", s: "188" },
  'OET': { overall: "B", l: "B", r: "B", w: "C+", s: "B" },
  'GMAT': { overall: "650", q: "47", v: "34", di: "78" },
};

function yearsBetween(d1: string, d2: string) {
  try {
    const a = new Date(d1);
    const b = new Date(d2);
    return (b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  } catch {
    return NaN;
  }
}

function isUnder18(dob: string) {
  if (!dob) return false;
  const years = yearsBetween(dob, new Date().toISOString().slice(0, 10));
  return years < 18;
}

function num(v?: string | null) {
  if (!v) return 0;
  const n = Number(String(v).replace(/[^0-9.]/g, ""));
  return isNaN(n) ? 0 : n;
}

function estimateOSHC(type?: string) {
  // Rough annual estimates used only for risk guidance; user can override by entering exact OSHC cost
  if (!type) return 0;
  const t = type.toLowerCase();
  if (t.includes("family")) return 6500;
  if (t.includes("couple")) return 3500;
  return 650; // Single
}

function isWhitelistedTransition(bach: string, course: string) {
  const b = bach.toLowerCase();
  const c = course.toLowerCase();

  // Commerce/BBA → analytics/IS/PM
  if (/(commerce|b\.com|bcom|bba|business)/.test(b) && /(business analytics|information systems|supply chain|marketing analytics|project management)/.test(c)) return true;
  // Physics/Math/Stats → DS/AI/ML/CS
  if (/(physics|math|statistics|stats)/.test(b) && /(data science|ai|machine learning|analytics|computer|cs)/.test(c)) return true;
  // Engineering core → Project/Engineering Mgmt
  if (/(mechanical|civil|electrical|electronics|ece)/.test(b) && /(project management|engineering management)/.test(c)) return true;
  // Health/Nursing/Pharmacy → Public Health/Health Admin
  if (/(nursing|pharmacy|biomed|health)/.test(b) && /(public health|health administration)/.test(c)) return true;

  return false;
}

// ----------------- Zod Schema (audited) -----------------
const personalSchema = z.object({
  fullName: z.string().min(3, "Enter full name as per passport").max(100),
  dob: z.string()
    .min(4, "Select your date of birth")
    .refine((value) => {
      if (!value) return false;
      const parsed = new Date(value);
      if (Number.isNaN(parsed.getTime())) {
        return false;
      }
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return parsed <= today;
    }, { message: "Date of birth cannot be in the future." }),
  // FIX: The `z.string()` constructor was passed an object with `required_error`, which caused a type error. The parameter object has been removed. The subsequent `.min(1, ...)` validation correctly handles cases where an empty string is submitted (e.g., from an unselected dropdown), and ensures a gender is selected.
  gender: z.string().min(1, "Please select a gender.").pipe(z.enum(["Male", "Female", "Other"])),
  nationality: z.string().min(2),
  passport: z
    .string()
    .regex(PASSPORT_REGEX, "Format e.g., N1234567"),
  email: z.string().email(),
  phone: z.string().regex(PHONE_REGEX, "Use +country code and digits"),
  address: z.string().min(10).max(200),
});

const educationSchema = z.object({
  highest: z.string().min(1, "Please select your highest level of education.").pipe(z.enum(["12th", "Diploma", "Bachelors", "Masters", "PhD"])),
  schoolName: z.string().optional(),
  admissionEnglishWaiver: z.boolean().optional(),
  class10Board: z.string().min(2),
  class10Year: z.string().min(4),
  class10Grade: z.string().min(1),
  class12Board: z.string().min(2),
  class12Year: z.string().min(4),
  class12Stream: z.string().optional(),
  class12Grade: z.string().min(1),
  backlogs: z.string().optional(), // Indian-specific (ATKT / arrears)
  diploma: z.object({
    name: z.string().optional(),
    institute: z.string().optional(),
    duration: z.string().optional(),
    year: z.string().optional(),
    grade: z.string().optional(),
  }),
  bachelors: z.object({
    name: z.string().optional(),
    university: z.string().optional(),
    year: z.string().optional(),
    duration: z.string().optional(),
    cgpa: z.string().optional(),
    medium: z.string().optional(),
  }),
  masters: z.object({
    name: z.string().optional(),
    university: z.string().optional(),
    year: z.string().optional(),
    cgpa: z.string().optional(),
  }),
  phd: z.object({
    name: z.string().optional(),
    university: z.string().optional(),
    year: z.string().optional(),
  }),
  studiedAU: z.enum(["yes", "no"]),
  auDetails: z.object({
    institution: z.string().optional(),
    period: z.string().optional(),
    reason: z.string().optional(),
  }),
});

const testScoreEntrySchema = z.object({
  test: z.enum(["IELTS", "TOEFL iBT", "PTE Academic", "CAE", "OET", "GMAT", "Not yet"]).default("Not yet"),
  overall: z.string().optional(),
  testDate: z.string().optional(),
  planned: z.string().optional(),

  ieltsL: z.string().optional(), ieltsR: z.string().optional(), ieltsW: z.string().optional(), ieltsS: z.string().optional(),
  toeflR: z.string().optional(), toeflL: z.string().optional(), toeflS: z.string().optional(), toeflW: z.string().optional(),
  pteL: z.string().optional(), pteR: z.string().optional(), pteW: z.string().optional(), pteS: z.string().optional(),
  caeR: z.string().optional(), caeW: z.string().optional(), caeL: z.string().optional(), caeS: z.string().optional(),
  oetL: z.string().optional(), oetR: z.string().optional(), oetW: z.string().optional(), oetS: z.string().optional(),
  gmatQ: z.string().optional(), gmatV: z.string().optional(), gmatDI: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.test === "Not yet") return;

  const validate = (field: keyof typeof data, min: number, max: number, options: { isInt?: boolean; step?: number } = {}) => {
    const value = data[field];
    if (!value) return;

    if (typeof value !== 'string') return;

    const score = parseFloat(value);
    if (isNaN(score)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Must be a number.', path: [field] });
      return;
    }
    if (score < min || score > max) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: `Score must be ${min}-${max}.`, path: [field] });
    }
    if (options.isInt && score % 1 !== 0) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Must be a whole number.', path: [field] });
    }
    if (options.step && (score * 2) % (options.step * 2) !== 0) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: `Use ${options.step} increments.`, path: [field] });
    }
  };

  switch (data.test) {
    case "IELTS":
      validate('overall', 0, 9, { step: 0.5 });
      validate('ieltsL', 0, 9, { step: 0.5 });
      validate('ieltsR', 0, 9, { step: 0.5 });
      validate('ieltsW', 0, 9, { step: 0.5 });
      validate('ieltsS', 0, 9, { step: 0.5 });
      break;
    case "TOEFL iBT":
      validate('overall', 0, 120, { isInt: true });
      validate('toeflR', 0, 30, { isInt: true });
      validate('toeflL', 0, 30, { isInt: true });
      validate('toeflS', 0, 30, { isInt: true });
      validate('toeflW', 0, 30, { isInt: true });
      break;
    case "PTE Academic":
      validate('overall', 10, 90, { isInt: true });
      validate('pteL', 10, 90, { isInt: true });
      validate('pteR', 10, 90, { isInt: true });
      validate('pteW', 10, 90, { isInt: true });
      validate('pteS', 10, 90, { isInt: true });
      break;
    case "CAE":
      validate('overall', 160, 210, { isInt: true });
      validate('caeR', 160, 210, { isInt: true });
      validate('caeW', 160, 210, { isInt: true });
      validate('caeL', 160, 210, { isInt: true });
      validate('caeS', 160, 210, { isInt: true });
      break;
    case "OET":
      // OET scores can be letters or numbers. We'll validate numbers.
      validate('oetL', 0, 500, { step: 10 });
      validate('oetR', 0, 500, { step: 10 });
      validate('oetW', 0, 500, { step: 10 });
      validate('oetS', 0, 500, { step: 10 });
      break;
    case "GMAT":
      validate('overall', 205, 805, { step: 10 });
      validate('gmatQ', 60, 90, { isInt: true });
      validate('gmatV', 60, 90, { isInt: true });
      validate('gmatDI', 60, 90, { isInt: true });
      break;
  }
});

const englishSchema = z.object({
  tests: z.array(testScoreEntrySchema).default([]),
  moiLetter: z.boolean().optional(),
});


const courseSchema = z.object({
  level: z.string().min(1, "Please select a course level.").pipe(z.enum(["Diploma", "Bachelors", "Masters", "PhD"])),
  courseName: z.string().min(5),
  institution: z.string().min(2),
  cricos: z.string().optional(),
  campus: z.string().min(2),
  startDate: z.string().min(4),
  duration: z.string().min(1),
  packaged: z.enum(["yes", "no"]).default("no"),
  packageDetails: z.string().optional(),
  hasCOE: z.enum(["Yes", "No", "Pending"]).default("Pending"),
  coeId: z.string().optional(),
  tuitionFirstYearAUD: z.string().optional(),
  livingCostYearAUD: z.string().optional(), // user-provided per latest Home Affairs guidance
  oshcType: z.enum(["Single", "Couple", "Family"]).optional(),
  oshcProvider: z.enum(["Bupa", "Allianz", "Medibank", "nib", "ahm", "Other"]).optional(),
  oshcCostAUD: z.string().optional(),
  travelCostAUD: z.string().optional(),
  courseUnderstanding: z.string().min(50),
  livingUnderstanding: z.string().min(50),
});

const workSchema = z.object({
  hasExperience: z.enum(["yes", "no"]).default("no"),
  experiences: z
    .array(
      z.object({
        title: z.string().min(2),
        employer: z.string().min(2),
        location: z.string().optional(),
        from: z.string().min(4),
        to: z.string().min(4),
        duties: z.string().optional(),
        salary: z.string().optional(),
        selfEmployed: z.boolean().optional(),
      })
    )
    .default([]),
  hasGap: z.enum(["yes", "no"]).default("no"),
  gapExplain: z.string().optional(),
});

const sopSchema = z.object({
  whyAustralia: z.string().min(50),
  whyThisInstitution: z.string().min(50),
  whyNotIndia: z.string().min(50),
  careerBenefit: z.string().min(50),
  afterStudyPlan: z.string().min(50),
  expectedSalaryInIndia: z.string().optional(),
  targetRoles: z.string().optional(),
  extraMotivation: z.string().optional(),
});

const financeSchema = z.object({
  funding: z.array(z.enum(["Self", "Family", "Loan", "Scholarship", "Other"]))
    .min(1, { message: "Select at least one funding source." }),
  sponsors: z
    .array(
      z.object({
        name: z.string().min(2),
        relation: z.string().min(2),
        occupation: z.string().min(2),
        annualIncomeINR: z.string().min(1),
        itrYears: z.string().optional(),
      })
    )
    .default([]),
  loan: z.object({
    amount: z.string().optional(),
    status: z.enum(["Applied", "Sanctioned", "Disbursed", ""]).optional(),
    bank: z.string().optional(),
  }),
  scholarship: z.object({
    name: z.string().optional(),
    coverage: z.string().optional(),
  }),
  otherFunding: z.object({
    details: z.string().optional(),
    amount: z.string().optional(),
  }),
  totalFunds: z.string().min(1),
  livingSponsor: z.string().min(1),
  awareCosts: z.boolean().optional(),
  tuitionDepositPaid: z.boolean().optional(),
  tuitionDepositAmount: z.string().optional(),
  receiptNo: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.funding?.includes("Loan")) {
    if (!data.loan?.amount?.trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Loan amount is required.', path: ['loan.amount'] });
    }
    if (!data.loan?.bank) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Bank name is required.', path: ['loan.bank'] });
    }
    if (!data.loan?.status) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Loan status is required.', path: ['loan.status'] });
    }
  }
  if (data.funding?.includes("Scholarship")) {
    if (!data.scholarship?.name?.trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Scholarship name is required.', path: ['scholarship.name'] });
    }
    if (!data.scholarship?.coverage?.trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Coverage amount is required.', path: ['scholarship.coverage'] });
    }
  }
  if (data.funding?.includes("Other")) {
    if (!data.otherFunding?.details || data.otherFunding.details.trim().length < 10) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Please provide a detailed explanation (min 10 characters).', path: ['otherFunding.details'] });
    }
    if (!data.otherFunding?.amount?.trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Amount for other funding is required.', path: ['otherFunding.amount'] });
    }
  }
});

const familySchema = z.object({
  fatherName: z.string().min(2),
  fatherOcc: z.string().min(2),
  fatherIncome: z.string().min(1),
  motherName: z.string().min(2),
  motherOcc: z.string().min(2),
  motherIncome: z.string().min(1),
  siblings: z
    .array(
      z.object({ name: z.string().min(1), age: z.string().min(1), status: z.string().min(1) })
    )
    .default([]),
  dependents: z
    .array(
      z.object({
        name: z.string().min(1),
        relation: z.enum(["Spouse", "Child"]).or(z.literal("Other")).optional(),
        dob: z.string().min(4),
        accompany: z.enum(["yes", "no"]).default("no"),
        schoolingPlan: z.string().optional(),
      })
    )
    .default([]),
  relativesInAU: z.enum(["yes", "no"]).default("no"),
  relativeDetail: z.object({ name: z.string().optional(), relation: z.string().optional(), city: z.string().optional(), status: z.string().optional() }),
  ownAsset: z.enum(["yes", "no"]).default("no"),
  assetDetail: z.string().optional(),
  otherTies: z.string().optional(),
  accommodationPlan: z.enum(["On-campus", "Private rental", "With relatives", "Homestay", "Not decided"]).optional(),
  intendedAddress: z.string().optional(),
});

const visaSchema = z.object({
  maritalStatus: z.enum(["Single", "Married", "Divorced", "Widowed"]),
  dateOfMarriage: z.string().optional(),
  spouseName: z.string().optional(),
  spouseOccupation: z.string().optional(),
  spouseHighestQualification: z.string().optional(),
  spouseExperience: z.string().optional(),
  spouseAccompany: z.enum(["yes", "no"]).optional(),
  childrenAccompany: z.enum(["yes", "no"]).optional(),
  numberOfChildren: z.string().optional(),
  childrenAges: z.string().optional(),
  traveledAbroad: z.enum(["yes", "no"]).default("no"),
  travelHistory: z.string().optional(),
  appliedAU: z.enum(["yes", "no"]).default("no"),
  auTypeYear: z.string().optional(),
  auOutcome: z.enum(["Approved", "Refused", "Withdrawn"]).optional(),
  auReason: z.string().optional(),
  refusedAnywhere: z.enum(["yes", "no"]).default("no"),
  refusedDetail: z.string().optional(),
  breachedVisa: z.enum(["yes", "no"]).default("no"),
  breachDetail: z.string().optional(),
  hasMedicalIssues: z.enum(["yes", "no"]).default("no"),
  hasCriminalRecord: z.enum(["yes", "no"]).default("no"),
});

const declarationSchema = z.object({
  extraInfo: z.string().optional(),
  agree: z.boolean().refine((v) => v, "You must declare the information is true"),
  date: z.string().min(4),
  counsellorName: z.string().optional(),
  counsellorNotes: z.string().optional(),
});

const formSchema = personalSchema
  .and(educationSchema)
  .and(englishSchema)
  .and(courseSchema)
  .and(workSchema)
  .and(sopSchema)
  .and(financeSchema)
  .and(familySchema)
  .and(visaSchema)
  .and(declarationSchema);

type FormData = z.infer<typeof formSchema>;

// ----------------- Data Mapping for App Integration -----------------
function mapFormDataToProfile(data: FormData, noosrDataset: TAItem[]): Profile {
  const sponsors = data.sponsors || [];

  const getPrimarySponsor = () => {
    if (!sponsors || sponsors.length === 0) {
      return data.funding.includes('Self') ? 'Self' : 'Other';
    }

    const relations = sponsors.map(s => s.relation.toLowerCase());
    const hasFather = relations.some(r => r.includes('father'));
    const hasMother = relations.some(r => r.includes('mother'));

    if (hasFather && hasMother) return 'Both Parents';
    if (hasFather) return 'Father';
    if (hasMother) return 'Mother';
    if (data.funding.includes('Self')) return 'Self';

    return sponsors[0]?.relation || 'Other';
  }

  let gsAnswersText = [
    `Why Australia: ${data.whyAustralia}`,
    `Why this Provider & Course: ${data.whyThisInstitution}`,
    `Why not India or other countries: ${data.whyNotIndia}`,
    `Career Benefit & Progression: ${data.careerBenefit}`,
    `Post-Study Plans (Return to India): ${data.afterStudyPlan}`,
    data.targetRoles ? `Target Roles in India: ${data.targetRoles}` : '',
    data.extraMotivation ? `Additional Motivations/Information: ${data.extraMotivation}` : ''
  ].filter(Boolean).join('\n\n');

  if (data.admissionEnglishWaiver) {
    gsAnswersText += '\n\nAdditional Information: An English test waiver for admissions was provided by the Australian institution.';
  }

  let previousQualification: string = data.highest;
  if (data.highest === '12th' && data.class12Board) {
    previousQualification = `12th (${data.class12Board})`;
  }

  const getHighestQualification = () => {
    if (data.phd?.name) return {
      name: data.phd.name || '',
      institution: data.phd.university || '',
      grade: '' // PhD doesn't usually have a grade in this context
    };
    if (data.masters?.name) return {
      name: data.masters.name || '',
      institution: data.masters.university || '',
      grade: data.masters.cgpa || ''
    };
    if (data.bachelors?.name) return {
      name: data.bachelors.name || '',
      institution: data.bachelors.university || '',
      grade: data.bachelors.cgpa || ''
    };
    if (data.diploma?.name) return {
      name: data.diploma.name || '',
      institution: data.diploma.institute || '',
      grade: data.diploma.grade || ''
    };
    if (data.highest === '12th') return {
      name: data.class12Stream || '',
      institution: data.schoolName || '',
      grade: data.class12Grade || ''
    };
    return { name: '', institution: '', grade: data.class12Grade || '' };
  }
  const highestQual = getHighestQualification();

  const noosrEntry = noosrDataset.find(
    (entry) => entry.label.toLowerCase() === (highestQual.institution || "").toLowerCase()
  );
  const noosrSection = noosrEntry?.meta?.replace('NOOSR ', '') || '';

  const getTestScores = (): TestScore[] => {
    return (data.tests || []).map((test, id) => {
      if (test.test === 'Not yet') return null;
      const score: TestScore = {
        id,
        testType: test.test as TestScore['testType'],
        testDate: test.testDate || '',
        overall: test.overall || '',
        listening: '', reading: '', writing: '', speaking: '',
      };
      switch (test.test) {
        case 'IELTS':
          score.listening = test.ieltsL || ''; score.reading = test.ieltsR || ''; score.writing = test.ieltsW || ''; score.speaking = test.ieltsS || '';
          break;
        case 'TOEFL iBT':
          score.listening = test.toeflL || ''; score.reading = test.toeflR || ''; score.writing = test.toeflW || ''; score.speaking = test.toeflS || '';
          break;
        case 'PTE Academic':
          score.listening = test.pteL || ''; score.reading = test.pteR || ''; score.writing = test.pteW || ''; score.speaking = test.pteS || '';
          break;
        case 'CAE':
          score.listening = test.caeL || ''; score.reading = test.caeR || ''; score.writing = test.caeW || ''; score.speaking = test.caeS || '';
          break;
        case 'OET':
          score.listening = test.oetL || ''; score.reading = test.oetR || ''; score.writing = test.oetW || ''; score.speaking = test.oetS || '';
          break;
        case 'GMAT':
          score.quant = test.gmatQ || ''; score.verbal = test.gmatV || ''; score.dataInsights = test.gmatDI || '';
          break;
      }
      return score;
    }).filter((s): s is TestScore => s !== null);
  }

  const institutionLabel = (data.institution || '').toLowerCase();
  const institutionMeta = AU_INSTITUTIONS.find(i => i.label.toLowerCase() === institutionLabel);

  const marriageDuration = () => {
    if (data.maritalStatus === 'Married' && data.dateOfMarriage) {
      try {
        const marriageDate = new Date(data.dateOfMarriage);
        const today = new Date();

        if (isNaN(marriageDate.getTime())) return null;

        let months = (today.getFullYear() - marriageDate.getFullYear()) * 12;
        months -= marriageDate.getMonth();
        months += today.getMonth();
        return months <= 0 ? 0 : months;
      } catch {
        return null;
      }
    }
    return null;
  }

  const sponsor1 = sponsors[0];
  const sponsor2 = sponsors[1];

  return {
    institutionType: institutionMeta?.meta || '',
    institutionName: data.institution,
    courseLevel: data.level,
    courseName: data.courseName,
    previousQualification: previousQualification,
    previousCourseName: highestQual.name,
    previousInstitution: highestQual.institution,
    previousInstitutionNOOSR: noosrSection,
    previousGrade: highestQual.grade,
    previousGradeScale: '', // Not available
    languageOfInstruction: data.bachelors?.medium === 'English' ? 'English' : 'Other',

    workExperience: (data.experiences || []).map((exp, id) => ({
      id,
      employerName: exp.employer,
      jobTitle: exp.title,
      startDate: exp.from,
      endDate: exp.to,
      responsibilities: exp.duties || '',
      type: exp.selfEmployed ? 'Self-employed' : 'Paid', // Assumption
      isCurrent: !exp.to || new Date(exp.to) > new Date(),
      salary: exp.salary || '',
    })),

    studyGaps: data.hasGap === 'yes' ? [{ id: 1, startDate: '', endDate: '', reason: data.gapExplain || '', type: 'Personal' }] : [],

    careerGoals: data.afterStudyPlan,
    expectedSalaryInIndia: data.expectedSalaryInIndia || '',

    testScores: getTestScores(),

    totalFunds: data.totalFunds,
    gsAnswersText,

    primarySponsor: getPrimarySponsor(),
    sponsorRelationship: (getPrimarySponsor() === 'Other' && sponsor1) ? sponsor1.relation : '',

    sponsor1Name: sponsor1?.name || '',
    sponsor1Profession: sponsor1?.occupation || '',
    sponsor1Income: sponsor1?.annualIncomeINR || '',
    sponsor1ItrIncome: sponsor1?.annualIncomeINR || '', // Assuming same for now

    sponsor2Name: sponsor2?.name || '',
    sponsor2Profession: sponsor2?.occupation || '',
    sponsor2Income: sponsor2?.annualIncomeINR || '',
    sponsor2ItrIncome: sponsor2?.annualIncomeINR || '',

    fundingSources: {
      familySavings: data.funding.includes('Family'),
      educationLoan: data.funding.includes('Loan'),
      personalSavings: data.funding.includes('Self'),
    },
    educationLoanBank: data.loan?.bank || '',
    educationLoanAmount: data.loan?.amount || '',
    educationLoanStatus: data.loan?.status || '',

    hasRelativesInAustralia: data.relativesInAU,
    relativeName: data.relativeDetail?.name || '',
    relativeVisaStatus: data.relativeDetail?.status || '',
    relativeLocation: data.relativeDetail?.city || '',
    relativeAccommodation: '', // Not in new form

    hasTraveledToAustralia: data.appliedAU,
    auTravelHistory: data.appliedAU === 'yes' ? [{ id: 1, country: 'Australia', year: data.auTypeYear?.split(' in ')[1] || '', duration: '', purpose: `Applied for ${data.auTypeYear?.split(' in ')[0] || 'visa'}. Outcome: ${data.auOutcome || 'N/A'}. Reason: ${data.auReason || 'N/A'}` }] : [],
    hasOtherTravel: data.traveledAbroad,
    otherTravelHistory: data.traveledAbroad === 'yes' ? [{ id: 1, country: data.travelHistory || '', year: '', duration: '', purpose: '' }] : [],

    maritalStatus: data.maritalStatus,
    dateOfMarriage: data.dateOfMarriage || '',
    marriageDurationInMonths: marriageDuration(),
    spouseName: data.spouseName || '',
    spouseOccupation: data.spouseOccupation || '',
    spouseHighestQualification: data.spouseHighestQualification || '',
    // FIX: Corrected case sensitivity mismatch. The form uses 'yes'/'no' but the Profile type expects 'Yes'/'No'.
    spouseAccompanying: data.spouseAccompany === 'yes' ? 'Yes' : 'No',
    spouseExperience: data.spouseExperience || '',

    // FIX: Corrected case sensitivity mismatch. The form uses 'yes'/'no' but the Profile type expects 'Yes'/'No'.
    childrenAccompanying: data.childrenAccompany === 'yes' ? 'Yes' : 'No',
    numberOfChildren: data.numberOfChildren || '',
    childrenAges: data.childrenAges || '',

    hasVisaRefusal: data.refusedAnywhere,
    visaRefusals: data.refusedAnywhere === 'yes' ? [{ id: 1, country: '', visaType: '', year: '', reason: data.refusedDetail || '' }] : [],

    hasMedicalIssues: data.hasMedicalIssues,
    hasCriminalRecord: data.hasCriminalRecord,
    refusalReason: data.auReason || data.refusedDetail || '', // Legacy support
  };
}


// ----------------- Autosave -----------------
const LS_KEY = "eec-gs-intake";

// FIX: Changed the `form` parameter type to `any` to work around a TypeScript error likely caused by a dependency version mismatch (e.g., multiple versions of Zod in `node_modules`).
function useAutosave(form: any) {
  const { watch, reset } = form;
  useEffect(() => {
    const sub = watch((val: FormData) => {
      try {
        localStorage.setItem(LS_KEY, JSON.stringify(val));
      } catch { }
    });
    return () => sub.unsubscribe();
  }, [watch]);

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      try { reset(JSON.parse(raw)); } catch { }
    }
  }, [reset]);
}

// ----------------- UI helpers -----------------
const steps = [
  { id: 0, key: "personal", title: "Your Identity & Contact", subtitle: "Let's start with the basics. Please ensure these details match your passport exactly.", icon: Users },
  { id: 1, key: "education", title: "Academic History", subtitle: "Detail your educational journey. This shows the foundation for your future studies in Australia.", icon: GraduationCap },
  { id: 2, key: "work", title: "Professional Experience & Study Gaps", subtitle: "Showcase your work experience and explain any gaps. Every part of your journey matters.", icon: Briefcase },
  { id: 3, key: "english", title: "English Language Proficiency", subtitle: "Demonstrate your English skills. A strong score is a key indicator of your readiness to succeed in Australia.", icon: Languages },
  { id: 4, key: "course", title: "Your Chosen Australian Course", subtitle: "Tell us about your future course. This is the heart of your Genuine Student application.", icon: NotebookPen },
  { id: 5, key: "sop", title: "Your Genuine Student Narrative", subtitle: "This is your chance to tell your story. Explain your motivations, research, and long-term plans to return to India.", icon: FileText },
  { id: 6, key: "finance", title: "Financial Capacity & Sponsorship", subtitle: "Detail how your studies will be funded. Transparency and clear evidence are crucial here.", icon: Wallet2 },
  { id: 7, key: "family", title: "Family Background & Ties to India", subtitle: "Your family and assets are strong proof of your incentive to return home after your studies.", icon: Home },
  { id: 8, key: "visa", title: "Personal Circumstances & Immigration History", subtitle: "Transparency about your family, marriage, and visa history is critical for building trust.", icon: PlaneTakeoff },
  { id: 9, key: "declaration", title: "Final Declaration", subtitle: "Please confirm that all the information you have provided is true and accurate.", icon: PenSquare },
  { id: 10, key: "review", title: "Review & Export", subtitle: "Review your complete profile, make any final edits, and then export your data or start your AI prep session.", icon: Download },
] as const;

const VerticalTimeline = ({ current, completed, onStepClick }: { current: number; completed: Set<number>; onStepClick: (step: number) => void }) => {
  const progressPercentage = current > 0 ? (current / (steps.length - 2)) * 100 : 0;

  return (
    <div className="hidden xl:block w-72 pr-8">
      <div className="sticky top-28">
        <h3 className="font-bold text-lg mb-2 text-slate-800 dark:text-slate-200">Your GS Profile</h3>
        <p className="text-sm text-slate-500 dark:text-slate-300 mb-6">Complete all steps to generate your personalized prep plan.</p>
        <div className="relative">
          <div className="absolute left-[11px] top-3 h-[calc(100%-1.5rem)] w-0.5 bg-slate-200 dark:bg-slate-700" aria-hidden="true" />
          <motion.div
            className="absolute left-[11px] top-3 w-0.5 bg-indigo-500"
            initial={{ height: 0 }}
            animate={{ height: `calc(${progressPercentage}% - ${current === (steps.length - 1) ? '0px' : '1rem'})` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <ul className="space-y-4">
            {steps.slice(0, -1).map((s, idx) => {
              const isCompleted = completed.has(idx) || current > idx;
              const isActive = current === idx;
              const isClickable = (completed.has(idx) || idx < current) && !isActive;

              return (
                <li key={s.key} className="relative">
                  <button
                    onClick={() => isClickable && onStepClick(idx)}
                    className={`flex items-center gap-3 w-full text-left p-2 rounded-lg transition-colors ${isClickable ? 'cursor-pointer group hover:bg-slate-100 dark:hover:bg-slate-800' : 'cursor-default'}`}
                    disabled={!isClickable}
                  >
                    <div className="relative z-10 flex items-center justify-center h-6 w-6">
                      {isActive ? (
                        <>
                          <div className="absolute h-5 w-5 rounded-full bg-indigo-500 animate-ping opacity-75"></div>
                          <div className="relative h-3 w-3 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-slate-950"></div>
                        </>
                      ) : isCompleted ? (
                        <CheckCircle2 className="h-6 w-6 text-indigo-500 bg-white dark:bg-transparent" />
                      ) : (
                        <div className="h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-600 ring-4 ring-white dark:ring-slate-950"></div>
                      )}
                    </div>
                    <p className={`font-semibold text-sm ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'} ${isClickable && 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400'}`}>
                      {s.title}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

const HorizontalStepper = ({ current, completed, onStepClick }: { current: number; completed: Set<number>; onStepClick: (step: number) => void }) => {
  return (
    <div className="xl:hidden mb-8 px-2 sm:px-4">
      <div className="flex items-center overflow-x-auto no-scrollbar py-2 gap-1">
        {steps.slice(0, -1).map((s, idx) => {
          const isCompleted = completed.has(idx) || current > idx;
          const isActive = current === idx;
          const isClickable = isCompleted && !isActive;

          return (
            <React.Fragment key={s.key}>
              <div className="flex flex-col items-center flex-shrink-0 min-w-[2.25rem] sm:min-w-[2.5rem]">
                <button
                  onClick={() => isClickable && onStepClick(idx)}
                  disabled={!isClickable}
                  className={`h-6 w-6 sm:h-8 sm:w-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isActive ? 'bg-indigo-500 border-indigo-500 scale-110 shadow-lg' : isCompleted ? 'bg-indigo-500 border-indigo-500' : 'bg-slate-300 dark:bg-slate-700 border-slate-300 dark:border-slate-700'}`}
                >
                  {isCompleted && !isActive ? <CheckIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" /> : <s.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />}
                </button>
              </div>
              {idx < steps.length - 2 && (
                <div className={`flex-auto h-0.5 transition-colors duration-300 mx-0.5 sm:mx-2 min-w-[1.25rem] ${isCompleted ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-700'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div className="mt-4 text-center">
        <p className="text-[0.7rem] sm:text-xs text-slate-500 dark:text-slate-300">Step {current + 1} of {steps.length - 1}</p>
        <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 truncate">{steps[current].title}</p>
      </div>
    </div>
  );
};


function RHFError({ name, errors }: { name: keyof FormData | string; errors: any }) {
  const err = name.split(".").reduce((acc: any, key: string) => (acc ? acc[key] : undefined), errors);
  if (!err) return null;
  return <p className="text-xs text-red-600 dark:text-red-400 mt-1">{err.message || "This field is required"}</p>;
}

function Row({ children, cols = 2, className }: { children: React.ReactNode; cols?: 1 | 2 | 3 | 4; className?: string }) {
  const map: Record<number, string> = { 1: "md:grid-cols-1", 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-4" };
  const cls = map[Number(cols)] || "md:grid-cols-2";
  return <div className={`grid gap-4 md:gap-6 grid-cols-1 ${cls} ${className || ''}`}>{children}</div>;
}

// ----------------- Typeahead & NOOSR helpers -----------------

type TAItem = { label: string; meta?: string };

type TypeaheadProps = {
  value?: string;
  onChange: (v: string) => void;
  placeholder?: string;
  data: TAItem[];
  badgeMeta?: boolean;
};

function Typeahead({ value = "", onChange, placeholder, data, badgeMeta, maxListHeightClass = "max-h-64" }: TypeaheadProps & { maxListHeightClass?: string }) {
  const [q, setQ] = useState(value);
  const [open, setOpen] = useState(false);
  const list = useMemo(() => {
    const s = (q || "").toLowerCase();
    if (!s) return data.slice(0, 12);
    return data.filter((d) => d.label.toLowerCase().includes(s)).slice(0, 12);
  }, [q, data]);
  useEffect(() => setQ(value || ""), [value]);
  return (
    <div className="relative">
      <Input
        value={q}
        placeholder={placeholder}
        onChange={(e) => { setQ(e.target.value); setOpen(true); onChange(e.target.value); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 100)}
      />
      {open && list.length > 0 && (
        <div className={`absolute z-20 mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-lg overflow-auto ${maxListHeightClass}`}>
          {list.map((item, i) => (
            <div
              key={i}
              onMouseDown={() => { onChange(item.label); setQ(item.label); setOpen(false); }}
              className="px-3 py-2 text-sm hover:bg-accent cursor-pointer flex items-center justify-between"
            >
              <span>{item.label}</span>
              {badgeMeta && item.meta && <Badge variant="outline">{item.meta}</Badge>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


// NOOSR dataset state
function useNoosrDataset() {
  const dataset = useMemo(() => {
    const parseCSV = (text: string): { name: string; section: string }[] => {
      const records: { name: string; section: string }[] = [];
      const lines = text.trim().replace(/\r/g, "").split("\n").slice(1);

      for (const line of lines) {
        if (!line.trim()) continue;

        const lastCommaIndex = line.lastIndexOf(",");
        if (lastCommaIndex === -1 || lastCommaIndex === line.length - 1) {
          console.warn("Skipping malformed CSV line (no section found):", line);
          continue;
        }

        let name = line.substring(0, lastCommaIndex).trim();
        const section = line.substring(lastCommaIndex + 1).trim();

        if (name.startsWith('"') && name.endsWith('"')) {
          name = name.slice(1, -1).trim();
        }

        name = name.replace(/""/g, '"');

        if (name && section) {
          records.push({ name, section });
        } else {
          console.warn("Skipping malformed CSV line (empty name or section):", line);
        }
      }

      return records;
    };

    try {
      const cleanCsvText =
        noosrCsv.charCodeAt(0) === 0xfeff ? noosrCsv.substring(1) : noosrCsv;
      const parsedData = parseCSV(cleanCsvText);
      return parsedData.map((r) => ({ label: r.name, meta: `NOOSR ${r.section}` }));
    } catch (error) {
      console.error("Failed to parse NOOSR data:", error);
      return [];
    }
  }, []);

  return { dataset };
}

function NOOSRBadge({ uni, data }: { uni?: string; data: TAItem[] }) {
  if (!uni) return null;
  const m = data.find((d) => d.label.toLowerCase() === (uni || "").toLowerCase());
  if (!m) return null; // Show nothing if unknown (can be changed to show "NOOSR: Unknown")
  return <p className="text-xs mt-1 text-slate-500 dark:text-slate-400">NOOSR: <span className="font-medium text-slate-700 dark:text-slate-200">{m.meta}</span></p>;
}

// ----------------- Risk Engine -----------------
function computeRiskFlags(d: Partial<FormData>): string[] {
  const flags: string[] = [];

  // Age & guardianship
  if (d.dob && isUnder18(d.dob)) {
    flags.push("Applicant under 18 – welfare/guardian arrangements required");
  }

  // Start date sanity
  if (d.startDate) {
    const dt = new Date(d.startDate).getTime();
    if (!isNaN(dt) && dt < Date.now() - 24 * 60 * 60 * 1000) {
      flags.push("Intake start date appears to be in the past – verify COE/intake month");
    }
  }

  // Gaps
  if (d.hasGap === "yes") {
    if (!d.gapExplain || d.gapExplain.replace(/\s+/g, "").length < RISK_ENGINE_CONFIG.GAP_EXPLANATION_MIN_LENGTH) {
      flags.push("Gap &gt; 6 months – explanation is too short");
    }
  }

  // English test checks
  (d.tests || []).forEach(test => {
    // English timing
    if (test.test === "Not yet") {
      if (d.startDate) {
        const days = (new Date(d.startDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
        if (!isNaN(days) && days < RISK_ENGINE_CONFIG.INTAKE_WARNING_DAYS) {
          flags.push(`English test not booked but intake &lt; ${RISK_ENGINE_CONFIG.INTAKE_WARNING_DAYS} days`);
        }
      }
    }

    // English test expiry (2 years)
    if (test.test && test.test !== "Not yet" && test.testDate) {
      const td = new Date(test.testDate).getTime();
      const ref = d.startDate ? new Date(d.startDate).getTime() : Date.now();
      if (!isNaN(td) && !isNaN(ref)) {
        const days = (ref - td) / (1000 * 60 * 60 * 24);
        if (days > RISK_ENGINE_CONFIG.ENGLISH_TEST_EXPIRY_DAYS) flags.push(`English test (${test.test}) older than 2 years at intended intake – consider retaking`);
      }
    }
  });

  // Loan approval
  if ((d.funding || []).includes("Loan" as any)) {
    if (!d.loan?.status || !/Approved/i.test(d.loan.status) && !/Sanctioned/i.test(d.loan.status)) {
      flags.push("Education loan not approved/sanctioned – attach in-principle/approval letter");
    }
  }

  // Funds sufficiency: Tuition + Living + OSHC + Travel
  const tuition = num(d.tuitionFirstYearAUD as any);
  const living = num(d.livingCostYearAUD as any);
  const oshcCostProvided = num(d.oshcCostAUD as any);
  const travelCostProvided = num(d.travelCostAUD as any);
  const oshc = oshcCostProvided || estimateOSHC(d.oshcType as any);
  const travel = travelCostProvided || RISK_ENGINE_CONFIG.DEFAULT_TRAVEL_COST_AUD;
  const totalFundsNum = num(d.totalFunds as any);

  if (!oshcCostProvided && d.oshcType) {
    flags.push("OSHC cost not provided – estimated value applied for guidance");
  }
  if (!travelCostProvided) {
    flags.push(`Travel cost not provided – default AUD ${RISK_ENGINE_CONFIG.DEFAULT_TRAVEL_COST_AUD} applied for guidance`);
  }
  if (!d.tuitionFirstYearAUD || !d.livingCostYearAUD) {
    flags.push("Tuition/Living costs missing – required for funds assessment");
  }
  if (tuition + living + oshc + travel > 0 && totalFundsNum > 0) {
    if (totalFundsNum < tuition + living + oshc + travel) {
      flags.push("Available funds appear below (Tuition + Living + OSHC + Travel) for year 1");
    }
  }

  // Prior AU application data completeness
  if (d.appliedAU === "yes" && !d.auOutcome) {
    flags.push("Prior AU application – select outcome");
  }
  if (d.appliedAU === "yes" && d.auOutcome === "Refused" && !d.auReason) {
    flags.push("Prior AU refusal – reason not provided");
  }
  if (d.refusedAnywhere === "yes" && !d.refusedDetail) {
    flags.push("Visa refusal elsewhere – details not provided");
  }

  // Relatives in AU & return intent
  if (d.relativesInAU === "yes" && d.afterStudyPlan && !/India|return/i.test(d.afterStudyPlan)) {
    flags.push("Relatives in Australia – reinforce India return intent in plan");
  }

  // Course alignment heuristic with whitelist
  const course = (d.courseName || '').toLowerCase();
  const bach = (d.bachelors?.name || '').toLowerCase();
  if (course && bach) {
    const cross = (
      (/nurs|health|biomed/.test(course) && /commerce|arts|it|cs|mechanical/.test(bach)) ||
      (/it|cs|data|cyber/.test(course) && /commerce|arts|nursing|civil/.test(bach))
    );
    if (cross && !isWhitelistedTransition(bach, course)) {
      flags.push("Course appears cross-disciplinary – add bridging rationale & syllabus alignment");
    }
  }

  // PG with no prior degree marked
  if ((d.level === "Masters" || d.level === "PhD") && !(d.bachelors?.name || d.masters?.name)) {
    flags.push("Applying for PG but no prior degree marked – verify education history");
  }

  // Work experience validations
  if (d.hasExperience === "yes") {
    const exps = (d.experiences || []) as any[];
    if (!exps.length) flags.push("Work experience selected but no entries added");
    let overlaps = false;
    let badRange = false;
    for (let i = 0; i < exps.length; i++) {
      const aFrom = exps[i]?.from ? new Date(exps[i].from).getTime() : NaN;
      const aTo = exps[i]?.to ? new Date(exps[i].to).getTime() : NaN;
      if (!isNaN(aFrom) && !isNaN(aTo) && aTo < aFrom) badRange = true;
      for (let j = i + 1; j < exps.length; j++) {
        const bFrom = exps[j]?.from ? new Date(exps[j].from).getTime() : NaN;
        const bTo = exps[j]?.to ? new Date(exps[j].to).getTime() : NaN;
        if (![aFrom, aTo, bFrom, bTo].some(isNaN)) {
          if (aFrom <= bTo && bFrom <= aTo) overlaps = true;
        }
      }
    }
    if (badRange) flags.push("Work experience dates invalid (To before From)");
    if (overlaps) flags.push("Work experience periods overlap – clarify employment timeline");
  }

  return flags;
}

// ----------------- SOP Preview -----------------
function SOPPreview({ data }: { data: Partial<FormData> }) {
  const text = useMemo(() => {
    const p: string[] = [];
    if (data.fullName && data.courseName && data.institution) {
      p.push(
        `I am ${data.fullName}. I am applying for the ${data.courseName} at ${data.institution}.`
      );
    }
    if (data.whyAustralia) p.push(`Why Australia: ${data.whyAustralia}`);
    if (data.whyThisInstitution) p.push(`Why this provider & course: ${data.whyThisInstitution}`);
    if (data.whyNotIndia) p.push(`Why not India/other countries: ${data.whyNotIndia}`);
    if (data.careerBenefit) p.push(`Career alignment: ${data.careerBenefit}`);
    if (data.afterStudyPlan) p.push(`Plan after studies: ${data.afterStudyPlan}`);
    if (data.targetRoles) p.push(`Target roles/companies: ${data.targetRoles}`);
    if (data.extraMotivation) p.push(`Additional motivations: ${data.extraMotivation}`);
    return p.join("\n\n");
  }, [data]);

  return (
    <Card className="border-2 border-indigo-100 dark:border-indigo-900/40">
      <CardHeader>
        <CardTitle className="text-lg">Live SOP Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="text-sm whitespace-pre-wrap leading-6 text-slate-600 dark:text-slate-400">{text || "Start filling Study Plan to generate a draft..."}</pre>
      </CardContent>
    </Card>
  );
}


// --- NEW: Smart Suggestions Component ---

const suggestionsData: Record<number, {
  icon: React.ElementType,
  title: string,
  points: { type: 'pro-tip' | 'deep-dive' | 'red-flag', title: string, content: string }[]
}> = {
  0: {
    icon: Fingerprint,
    title: "Expert Analysis: Personal Details",
    points: [
      { type: 'pro-tip', title: "Name Consistency is Key", content: "Ensure your name matches your passport <strong>exactly</strong> across all documents (academic, financial). Mismatches are a common cause for delays." },
      { type: 'red-flag', title: "Passport Validity", content: "Your passport must be valid for at least 6 months beyond your intended stay. Renew it now if it's close to expiring." },
      { type: 'deep-dive', title: "Professional Email", content: "Use a professional email address (e.g., <code>firstname.lastname@email.com</code>). An unprofessional address like <code>coolboy99@...</code> can create a poor first impression." },
    ]
  },
  1: {
    icon: GraduationCap,
    title: "Expert Analysis: Education",
    points: [
      { type: 'pro-tip', title: "Justify Your Grades", content: "If you have low scores or backlogs, don't hide them. Address them head-on in your SOP. Explain the circumstances (e.g., health issues, family emergency) and how you overcame them." },
      { type: 'deep-dive', title: "The NOOSR Factor", content: "The NOOSR section of your Indian university is critical. A Section 1 or 2 university adds significant weight to your profile. Mention this in your SOP as a mark of quality education." },
      { type: 'red-flag', title: "Course Hopping", content: "Studying in Australia previously and failing to complete a course is a major red flag. You must provide a compelling reason for the change and demonstrate a clear, genuine commitment to your new course." },
    ]
  },
  2: {
    icon: Briefcase,
    title: "Expert Analysis: Work & Gaps",
    points: [
      { type: 'pro-tip', title: "Document Everything", content: "For each job, gather offer letters, salary slips (last 6 months), experience letters, and bank statements showing salary credit. This proves genuine employment." },
      { type: 'deep-dive', title: "Justifying Gaps", content: "Structure your gap explanation: <strong>1. Duration:</strong> (e.g., Jul 2023 – Jan 2024). <strong>2. Activity:</strong> (e.g., Prepared for CAT/UPSC). <strong>3. Evidence:</strong> (e.g., Coaching receipts, admit cards). <strong>4. Outcome:</strong> (e.g., Gained skills in X, Y, Z)." },
      { type: 'red-flag', title: "Irrelevant Experience", content: "If your work experience is unrelated to your chosen course, you MUST build a narrative bridge. Explain what transferable skills (e.g., project management, client handling) you gained and how they apply to your future studies." },
    ]
  },
  3: {
    icon: Languages,
    title: "Expert Analysis: English Proficiency",
    points: [
      { type: 'pro-tip', title: "Aim High for Credibility", content: "Even with an admissions waiver, a strong score (e.g., IELTS 6.5+, no band &lt; 6.0) is a powerful signal to the visa officer that you are a serious, capable student." },
      { type: 'deep-dive', title: "Test Validity is Crucial", content: "English test scores are only valid for 2 years. Ensure your test will still be valid when your visa is decided, not just when you apply. If it's close, retaking it is a safe bet." },
      { type: 'red-flag', title: "'Not Yet' & Close Intake", content: "If your intake is less than 4 months away and you haven't taken a test, it suggests poor planning. Book your test immediately and mention the date in your application." },
    ]
  },
  4: {
    icon: NotebookPen,
    title: "Expert Analysis: Course Selection",
    points: [
      { type: 'pro-tip', title: "Course Research is King", content: "Go beyond the course name. Name 3-4 specific subjects/modules and explain how they will give you the skills needed for your target job in India. This is the #1 way to prove you are a genuine student." },
      { type: 'deep-dive', title: "Justify Your Campus Choice", content: "Why this city? Mention specific industry hubs, lower living costs (if regional), or networking opportunities relevant to your field. 'It's a beautiful city' is not a valid reason." },
      { type: 'red-flag', title: "Vague Understanding", content: "Statements like 'I will gain good knowledge' are weak. Be specific: 'The `Cloud Computing` unit will prepare me for a Data Engineer role at TCS or Infosys in India.'" },
    ]
  },
  5: {
    icon: FileText,
    title: "Expert Analysis: Study Plan (SOP)",
    points: [
      { type: 'pro-tip', title: "The 'India-Return' Narrative", content: "Every paragraph should reinforce your intention to return to India. Connect your Australian education to a specific, high-value career path back home." },
      { type: 'deep-dive', title: "Use the STAR Method", content: "When describing past experiences, use STAR: <strong>S</strong>ituation (the context), <strong>T</strong>ask (your goal), <strong>A</strong>ction (what you did), <strong>R</strong>esult (the positive outcome). This adds credibility." },
      { type: 'red-flag', title: "Focusing on Migration", content: "Do NOT mention post-study work rights as a primary reason for choosing Australia. Frame it as valuable 'global experience' that will make you more competitive in the Indian job market upon your return." },
    ]
  },
  6: {
    icon: Wallet2,
    title: "Expert Analysis: Financials",
    points: [
      { type: 'pro-tip', title: "Show 'Old Money'", content: "Funds should ideally be in your or your sponsor's account for at least 3-6 months. Large, recent deposits are a major red flag and suggest borrowed funds." },
      { type: 'deep-dive', title: "The ITR Story", content: "The annual income declared in your sponsor's Income Tax Returns (ITR) for the last 3 years must logically support the savings you are showing. Inconsistency is a common reason for refusal." },
      { type: 'red-flag', title: "Cash is Not King", content: "Large amounts of cash or funds from non-financial institutions are generally not accepted. Stick to savings accounts, fixed deposits (older than 1 year), and sanctioned education loans from approved banks." },
    ]
  },
  7: {
    icon: Home,
    title: "Expert Analysis: Family & Ties",
    points: [
      { type: 'pro-tip', title: "Quantify Your Ties", content: "Don't just say 'I have property.' State it clearly: 'My family owns residential and agricultural property in [City] valued at approx. [Value], which I will help manage.' Provide valuation reports." },
      { type: 'deep-dive', title: "The 'Only Child' Argument", content: "If you are an only child, emphasize your responsibility to care for your aging parents as a strong reason for your return. This is a powerful cultural tie." },
      { type: 'red-flag', title: "Relatives in Australia", content: "Be honest about relatives in Australia. Downplaying or hiding this harms your credibility. Frame it positively: 'My cousin in Sydney can provide initial support, but my long-term family and career commitments are in India.'" },
    ]
  },
  8: {
    icon: PlaneTakeoff,
    title: "Expert Analysis: Immigration & Personal",
    points: [
      { type: 'pro-tip', title: "Honesty is the Best Policy", content: "ALWAYS declare any visa refusal from any country. Attempting to hide it is a serious character issue and can lead to a ban. Explain the reason for the refusal calmly and factually." },
      { type: 'deep-dive', title: "Recently Married?", content: "If married for less than 1-2 years, this can be a red flag. Provide strong evidence of your relationship: marriage certificate, photos over time, joint bank accounts if any. Your spouse's career and ties to India are also important." },
      { type: 'red-flag', title: "Vague Refusal Details", content: "Don't just say 'it was refused.' Explain why: 'My US B1/B2 visa was refused in 2022 due to insufficient proof of funds at that time. I have since secured a sanctioned education loan and my family's financial position has strengthened.'" },
    ]
  },
  9: {
    icon: PenSquare,
    title: "Expert Analysis: Declaration",
    points: [
      { type: 'pro-tip', title: "Double-Check Everything", content: "Before submitting, print your form (or download the JSON) and review every single field with a family member. A simple typo in a date or name can cause major issues." },
      { type: 'deep-dive', title: "The Legal Declaration", content: "Ticking this box is a legal statement to the Australian Government. The information you've provided can be verified. Any misinformation, even if unintentional, can lead to visa refusal and a potential ban." },
      { type: 'red-flag', title: "Incomplete Forms", content: "Leaving fields blank is not an option. If something doesn't apply, write 'Not Applicable' or 'N/A'. An incomplete form suggests a careless applicant." },
    ]
  },
  10: {
    icon: Download,
    title: "Expert Analysis: Final Review",
    points: [
      { type: 'pro-tip', title: "Action the Risk Flags", content: "The risk flags are your personal 'to-do' list. Go back and strengthen each flagged area in your SOP and documentation before lodging your visa." },
      { type: 'deep-dive', title: "The DOCX Advantage", content: "The downloaded Word document is your profile's 'master key'. You can share it with your EEC counsellor for a quick and precise review, ensuring everyone is on the same page." },
    ]
  }
};

const SuggestionPoint: React.FC<{ point: { type: string, title: string, content: string } }> = ({ point }) => {
  const icons = {
    'pro-tip': { icon: Lightbulb, color: 'text-sky-500 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-950' },
    'deep-dive': { icon: Eye, color: 'text-indigo-500 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-950' },
    'red-flag': { icon: AlertTriangle, color: 'text-red-500 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950' },
  };
  const current = icons[point.type as keyof typeof icons] || icons['pro-tip'];

  return (
    <div className={`flex items-start gap-3 sm:gap-4 p-4 rounded-lg ${current.bg}`}>
      <div className={`flex-shrink-0 h-6 w-6 ${current.color} mt-1`}>
        {React.createElement(current.icon)}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-slate-800 dark:text-slate-200 text-base sm:text-lg leading-snug truncate">{point.title}</h4>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: point.content }} />
      </div>
    </div>
  );
};

const SmartSuggestions: React.FC<{ step: number }> = ({ step }) => {
  const currentSuggestion = suggestionsData[step as keyof typeof suggestionsData] || suggestionsData[0];

  return (
    <Card className="mt-8 border-2 border-slate-200 dark:border-slate-800 shadow-lg w-full">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center gap-3 space-y-0">
        {React.createElement(currentSuggestion.icon, { className: "h-8 w-8 text-indigo-500 flex-shrink-0" })}
        <CardTitle className="text-lg sm:text-xl tracking-tight leading-tight">{currentSuggestion.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 px-3 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {currentSuggestion.points.map(point => <SuggestionPoint key={point.title} point={point} />)}
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

const SampleProfileSelector: React.FC<{ onSelect: (profile: FormData) => void }> = ({ onSelect }) => {
  const profiles = [
    { id: 'tafePathway', icon: Layers, title: "The TAFE Pathway", description: "Average 12th Commerce grad pursuing a Diploma-to-Degree in IT. Loan-dependent profile.", data: sampleProfiles.tafePathway, glowClass: "hover:shadow-cyan-500/30 dark:hover:shadow-cyan-400/20" },
    { id: 'healthSciences', icon: HeartPulse, title: "The Aspiring Physio", description: "Top 12th Science student aiming for a competitive Bachelor of Physiotherapy at a Go8 uni.", data: sampleProfiles.bachelorHealth, glowClass: "hover:shadow-rose-500/30 dark:hover:shadow-rose-400/20" },
    { id: 'digitalArtist', icon: Palette, title: "The Digital Artist", description: "Humanities grad with a creative portfolio seeking a Bachelor of Design at a top design university.", data: sampleProfiles.bachelorArts, glowClass: "hover:shadow-amber-500/30 dark:hover:shadow-amber-400/20" },
    { id: 'mechatronicsEng', icon: Bot, title: "The Mechatronics Engineer", description: "Experienced female engineer, married, with a prior US visa refusal, upskilling into robotics.", data: sampleProfiles.masterEngineering, glowClass: "hover:shadow-indigo-500/30 dark:hover:shadow-indigo-400/20" },
    { id: 'businessHeir', icon: Sigma, title: "The Family Business Heir", description: "BBA grad aiming to modernize his family enterprise with a Master of International Business.", data: sampleProfiles.masterBusiness, glowClass: "hover:shadow-emerald-500/30 dark:hover:shadow-emerald-400/20" },
    { id: 'phdScholar', icon: FlaskConical, title: "The Research Scholar", description: "Gold-medalist with a full scholarship for a PhD in Cancer Biology at a leading research uni.", data: sampleProfiles.phdScience, glowClass: "hover:shadow-violet-500/30 dark:hover:shadow-violet-400/20" }
  ];

  // FIX: Explicitly typed as `Variants` to ensure `transition.type` is correctly inferred as a literal type ('spring') instead of a generic `string`.
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  // FIX: Explicitly typed as `Variants` to ensure `transition.type` is correctly inferred as a literal type ('spring') instead of a generic `string`.
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-slate-200">Quick Start</h2>
      <p className="text-center text-slate-600 dark:text-slate-300 mt-2 mb-8">Don't want to fill the form? Try a sample profile to get started instantly.</p>
      <motion.div
        className="flex gap-8 pb-8 -mx-4 px-4  overflow-x-auto hide-scrollbar"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {profiles.map(p => (
          <motion.div
            key={p.id}
            variants={itemVariants}
            className="flex-shrink-0 w-80 mt-4"
          >
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="h-full"
            >
              <Card className={`text-center flex flex-col h-full  shadow-lg hover:shadow-2xl transition-shadow duration-300 ${p.glowClass}`}>
                <CardHeader>
                  <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                    <p.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4">{p.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-slate-500 dark:text-slate-400">{p.description}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => onSelect(p.data as FormData)}>Use this Profile</Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// ----------------- Main -----------------
interface SetupFormProps {
  onFormComplete: (profile: Profile) => void;
  showModal: (message: string) => void;
}

export const SetupForm: React.FC<SetupFormProps> = ({ onFormComplete, showModal }) => {
  void showModal;
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [availableCampuses, setAvailableCampuses] = useState<typeof CITIES_DATA>([]);
  const formCardRef = useRef<HTMLDivElement>(null);
  const maxDob = useMemo(() => new Date().toISOString().slice(0, 10), []);

  // Track if data came from sample profile (should not be saved to database)
  const [isSampleProfile, setIsSampleProfile] = useState(false);

  // Track if user has saved form data in database
  const [hasSavedData, setHasSavedData] = useState(false);
  const [isLoadingFormData, setIsLoadingFormData] = useState(false);

  // Authentication modal state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalType, setAuthModalType] = useState<'login' | 'signup'>('signup');

  useEffect(() => {
    const handleAuthModalEvent = (event: Event) => {
      const detail = (event as CustomEvent<{ type?: 'login' | 'signup' }>).detail;
      setAuthModalType(detail?.type ?? 'login');
      setShowAuthModal(true);
    };

    window.addEventListener(AUTH_MODAL_EVENT, handleAuthModalEvent as EventListener);
    return () => {
      window.removeEventListener(AUTH_MODAL_EVENT, handleAuthModalEvent as EventListener);
    };
  }, []);

  // Saving state for UI feedback
  const [isSaving, setIsSaving] = useState(false);

  // Check if user has saved form data on mount
  // Check for saved data on mount
  useEffect(() => {
    const checkSavedData = async () => {
      const userEmail = localStorage.getItem('AUgsUserEmail');
      if (userEmail) {
        try {
          const hasData = await hasFormData();
          setHasSavedData(hasData);
        } catch (error) {
          console.error('Error checking for saved data:', error);
          setHasSavedData(false);
        }
      } else {
        setHasSavedData(false);
      }
    };
    checkSavedData();
  }, []);

  // Listen for auth success event to re-check for saved data
  useEffect(() => {
    const handleAuthSuccess = async () => {
      // console.log('🔐 Auth success event received in SetupForm - checking for saved data');

      // Give a moment for localStorage to be set
      setTimeout(async () => {
        const userEmail = localStorage.getItem('AUgsUserEmail');
        if (userEmail) {
          try {
            const hasData = await hasFormData();
            setHasSavedData(hasData);
            // console.log('✅ Saved data check complete:', hasData ? 'Data found' : 'No data');
          } catch (error) {
            console.error('Error checking for saved data after sign-in:', error);
            setHasSavedData(false);
          }
        }
      }, 500); // Small delay to ensure localStorage is set
    };

    window.addEventListener('auth-success', handleAuthSuccess);

    return () => {
      window.removeEventListener('auth-success', handleAuthSuccess);
    };
  }, []);

  // Scrolls to the top of the form card whenever the step changes.
  useEffect(() => {
    if (formCardRef.current) {
      formCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [step]);


  // Global shortcuts: Alt+N, Alt+P
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === "n") { e.preventDefault(); next(); }
      if (e.altKey && e.key.toLowerCase() === "p") { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const form = useForm<FormData>({
    // FIX: Cast resolver to `any` to work around a TypeScript error likely caused by a dependency version mismatch (e.g., multiple versions of Zod in `node_modules`).
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      nationality: "India",
      maritalStatus: "Single",
      studiedAU: "no",
      hasExperience: "no",
      hasGap: "no",
      tests: [],
      moiLetter: false,
      packaged: "no",
      hasCOE: "Pending",
      funding: [],
      admissionEnglishWaiver: false,
      relativesInAU: "no",
      ownAsset: "no",
      traveledAbroad: "no",
      appliedAU: "no",
      refusedAnywhere: "no",
      breachedVisa: "no",
      awareCosts: false,
      tuitionDepositPaid: false,
      accommodationPlan: "Not decided",
      agree: false,
      spouseAccompany: "no",
      childrenAccompany: "no",
      hasMedicalIssues: "no",
      hasCriminalRecord: "no",
      diploma: {},
      bachelors: {},
      masters: {},
      phd: {},
      sponsors: [],
    },
    mode: "onBlur",
  });

  useAutosave(form);

  const {
    register,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = form;

  const { fields: workFields, append: addWork, remove: removeWork } = useFieldArray({ control, name: "experiences" });
  const { fields: sponsorFields, append: addSponsor, remove: removeSponsor } = useFieldArray({ control, name: "sponsors" });
  const { fields: testFields, append: addTest, remove: removeTest } = useFieldArray({ control, name: "tests" });

  useEffect(() => {
    if (testFields.length === 0) {
      addTest({ test: "Not yet" });
    }
  }, [testFields, addTest]);

  useEffect(() => {
    if (sponsorFields.length === 0) {
      addSponsor({ name: "", relation: "", occupation: "", annualIncomeINR: "" });
    }
  }, [sponsorFields.length, addSponsor]);


  const w = watch();

  // Reset sample profile flag when user manually edits the form
  useEffect(() => {
    if (isSampleProfile) {
      const subscription = watch(() => {
        // User manually edited the form, so it's no longer a sample profile
        setIsSampleProfile(false);
      });
      return () => subscription.unsubscribe();
    }
  }, [isSampleProfile, watch]);

  const selectTriggerClass = "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-brand dark:focus:ring-brand-light";
  const selectContentClass = "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700";

  const marriageLessThanOneYear = useMemo(() => {
    if (w.maritalStatus === 'Married' && w.dateOfMarriage) {
      try {
        const marriageDate = new Date(w.dateOfMarriage);
        if (isNaN(marriageDate.getTime())) return false; // Invalid date string

        const today = new Date();
        // Create a date for exactly one year after the marriage
        const oneYearAfterMarriage = new Date(marriageDate.getFullYear() + 1, marriageDate.getMonth(), marriageDate.getDate());

        // If today is before the one-year anniversary date, return true
        return today < oneYearAfterMarriage;
      } catch (e) {
        return false;
      }
    }
    return false;
  }, [w.maritalStatus, w.dateOfMarriage]);


  useEffect(() => {
    if (w.institution) {
      const campuses = CITIES_DATA.filter(city =>
        city.unis.some(uni => uni.name.toLowerCase() === w.institution.toLowerCase())
      );
      setAvailableCampuses(campuses);
      // Reset campus selection if university changes
      if (campuses.length === 1 && w.campus !== `${campuses[0].city}, ${campuses[0].state}`) {
        setValue("campus", `${campuses[0].city}, ${campuses[0].state}`);
      } else if (campuses.length > 1) {
        const currentCampusIsValid = campuses.some(c => `${c.city}, ${c.state}` === w.campus);
        if (!currentCampusIsValid) {
          setValue("campus", "");
        }
      }
    } else {
      setAvailableCampuses([]);
      setValue("campus", "");
    }
  }, [w.institution, setValue, w.campus]);


  const pswData = useMemo(() => {
    if (!w.level || !w.campus) return null;

    const baseMap: Record<string, number> = { "Diploma": 1.5, "Bachelors": 2, "Masters": 3, "PhD": 4 };
    const baseYears = baseMap[w.level] || 0;

    const selectedCampusName = w.campus.split(',')[0].trim();
    const campusInfo = CITIES_DATA.find(c => c.city === selectedCampusName);

    if (!campusInfo) return null;

    const bonusYears = campusInfo.bonus;
    const total = baseYears + bonusYears;
    const locationReason = {
      1: `based on studying in a Major City.`,
      2: `based on studying in a Regional Centre.`,
      3: `based on studying in a Designated Regional Area.`
    }[campusInfo.category];

    return {
      base: baseYears,
      bonus: bonusYears,
      total,
      reason: locationReason,
      levelText: w.level
    };
  }, [w.level, w.campus]);


  // NOOSR dataset
  const { dataset: noosrDataset } = useNoosrDataset();

  // Step navigation helpers
  function markComplete(idx: number) {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.add(idx);
      return next;
    });
  }
  function next() { markComplete(step); setStep((s) => Math.min(s + 1, steps.length - 1)); }
  function prev() { setStep((s) => Math.max(s - 1, 0)); }

  function handleStepClick(stepIndex: number) {
    if ((completed.has(stepIndex) || stepIndex < step) && stepIndex !== step) {
      setStep(stepIndex);
    }
  }

  function resetAll() { localStorage.removeItem(LS_KEY); window.location.reload(); }

  const handleStartPrep = async () => {
    // Check if user is authenticated (both Firebase Auth and localStorage)
    const authInstance = getAuth();
    const firebaseUser = authInstance.currentUser;
    const userEmail = localStorage.getItem('AUgsUserEmail');

    // User must be authenticated in BOTH Firebase Auth AND localStorage
    if (!firebaseUser || !userEmail) {
      // User is not authenticated, show registration modal
      setAuthModalType('signup');
      setShowAuthModal(true);
      return;
    }

    try {
      setIsSaving(true);

      // User is authenticated, get form data
      const data = form.getValues();

      // Only save to database if data was manually entered (not from sample profile)
      if (isSampleProfile) {
        // Skip database save for sample profiles, proceed directly to prep generation
        const profile = mapFormDataToProfile(data, noosrDataset);
        onFormComplete(profile);
      } else {
        // Save application data to Firebase before proceeding
        const saved = await saveCompleteApplication(data, showModal);

        if (saved) {
          // Also save the raw form data for future reuse
          await saveFormData(data);

          // Continue with AI prep generation
          const profile = mapFormDataToProfile(data, noosrDataset);
          onFormComplete(profile);
        }
        // If save failed, error modal is already shown by saveCompleteApplication
      }
    } catch (error) {
      console.error("Error in handleStartPrep:", error);
      showModal("An unexpected error occurred. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLoadPreviousData = async () => {
    try {
      setIsLoadingFormData(true);
      const savedData = await loadFormData();

      if (savedData) {
        reset(savedData);
        // Mark all steps as complete
        const allSteps = new Set<number>();
        for (let i = 0; i < 10; i++) {
          allSteps.add(i);
        }
        setCompleted(allSteps);
        setStep(10); // Go to review step
        showModal("✅ Your previous data has been loaded successfully!");
      } else {
        showModal("❌ No saved data found. Please fill the form.");
      }
    } catch (error) {
      console.error("Error loading previous data:", error);
      showModal("❌ Failed to load previous data. Please try again.");
    } finally {
      setIsLoadingFormData(false);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    // User is now signed in; they can continue filling the form and click "Start AI Prep"
    // showModal("You're signed in! Please complete the form and click 'Start AI Prep' to continue.");
  };

  const handleSwitchToLogin = () => {
    setAuthModalType('login');
  };

  const handleSwitchToSignup = () => {
    setAuthModalType('signup');
  };

  const handleSelectProfile = (profileData: FormData) => {
    reset(profileData);
    // Mark as sample profile (will not be saved to database)
    setIsSampleProfile(true);
    // Mark all steps before review as complete
    const allSteps = new Set<number>();
    for (let i = 0; i < 10; i++) {
      allSteps.add(i);
    }
    setCompleted(allSteps);
    setStep(10); // Go directly to review step
  }

  const headerIcon = steps[step].icon;
  const riskFlags = useMemo(() => computeRiskFlags(w), [w]);

  // Computed funds guidance
  const tuition = num(w.tuitionFirstYearAUD);
  const living = num(w.livingCostYearAUD);
  const oshc = num(w.oshcCostAUD) || estimateOSHC(w.oshcType);
  const travel = num(w.travelCostAUD) || RISK_ENGINE_CONFIG.DEFAULT_TRAVEL_COST_AUD;
  const requiredTotal = tuition + living + oshc + travel;
  const funds = num(w.totalFunds);

  // --- NEW REVIEW UI COMPONENTS ---
  const ReviewSection: React.FC<{ title: string; onEdit: () => void; children: React.ReactNode }> = ({ title, onEdit, children }) => (
    <Card className="mb-6">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Button variant="ghost" size="sm" onClick={onEdit}><PenSquare className="h-4 w-4 mr-2" /> Edit</Button>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );

  const DataPair: React.FC<{ label: string; value?: string | boolean | null | string[] }> = ({ label, value }) => {
    let displayValue: React.ReactNode = value || <span className="text-slate-500 dark:text-slate-500">Not provided</span>;
    if (typeof value === 'boolean') {
      displayValue = value ? 'Yes' : 'No';
    } else if (Array.isArray(value)) {
      displayValue = value.join(', ');
    } else if (value === 'yes') {
      displayValue = 'Yes';
    } else if (value === 'no') {
      displayValue = 'No';
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-2 border-b border-slate-100 dark:border-slate-800">
        <dt className="text-sm font-medium text-slate-500 dark:text-slate-400 sm:col-span-1">{label}</dt>
        <dd className="text-sm text-slate-900 dark:text-slate-100 sm:col-span-2">{displayValue}</dd>
      </div>
    );
  };


  return (
    <div className="min-h-screen bg-gradient-to-b ">
      <div className="max-w-7xl mx-auto px-4 pt-0">

        <div className="text-center mb-4">
          <a href="https://eecglobal.com" target="_blank" rel="noopener noreferrer" aria-label="EEC Global Home">
            <img src={IMAGES.eecLogo} alt="EEC Global Logo" className="mx-auto h-16 w-auto" />
          </a>
        </div>


        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            AI-Powered Australia <span className="text-blue-600 dark:text-blue-400">Genuine Student (GS)</span> Interview Visa Preparation. <span className="text-teal-500 dark:text-teal-400">FREE</span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            Stop guessing. Start practicing. Get hyper-personalized questions based on your unique profile, practice with your voice, and receive instant AI feedback trained by visa experts. Go beyond the interview with our all-in-one knowledge hub for your entire Australia journey.
          </p>
        </div>

        <SampleProfileSelector onSelect={handleSelectProfile} />

        <HorizontalStepper current={step} completed={completed} onStepClick={handleStepClick} />

        <div className="flex items-start gap-6">
          <VerticalTimeline current={step} completed={completed} onStepClick={handleStepClick} />

          <div className="flex-1 min-w-0">
            <Card ref={formCardRef} className="shadow-xl dark:bg-slate-600 w-full overflow-hidden">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-10 h-10 flex-shrink-0">
                    {headerIcon && React.createElement(headerIcon, { className: "h-6 w-6 text-indigo-500" })}
                  </div>
                  <div className="min-w-0">
                    <CardTitle className="text-xl sm:text-2xl tracking-tight truncate">{steps[step].title}</CardTitle>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{steps[step].subtitle}</p>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-3 flex-shrink-0">
                  <Badge variant="secondary" className="text-base px-3 py-1">Step {step + 1} / {steps.length}</Badge>


                  <Button variant="ghost" size="lg" onClick={resetAll} title="Reset form" className="bg-slate-300 dark:bg-slate-600 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-500 px-5 py-2 text-sm">
                    <RotateCcw className="h-4 w-4 mr-2" /> Reset
                  </Button>

                  {hasSavedData && (
                    <Button
                      size="lg"
                      onClick={handleLoadPreviousData}
                      disabled={isLoadingFormData}
                      title="Load your previously saved data"
                      className="!bg-green-500 dark:!bg-green-600 !text-white hover:!bg-green-600 dark:hover:!bg-green-700 !px-5 !py-2 text-sm disabled:opacity-50 transition-colors !border-0"
                    >
                      {isLoadingFormData ? (
                        <>
                          <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Loading...
                        </>
                      ) : (
                        <>
                          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                          Load My Data
                        </>
                      )}
                    </Button>
                  )}

                </div>
                <div className="flex md:hidden items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <Badge variant="secondary" className="text-sm px-2.5 py-0.5">Step {step + 1}/{steps.length}</Badge>

                  <Button variant="ghost" size="sm" onClick={resetAll} title="Reset form" className="bg-slate-300 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700 px-4 py-1.5 text-xs">
                    <RotateCcw className="h-3.5 w-3.5 mr-1.5" /> Reset
                  </Button>

                  {hasSavedData && (
                    <Button

                      size="sm"
                      onClick={handleLoadPreviousData}
                      disabled={isLoadingFormData}
                      title="Load saved data"
                      className="!bg-green-500 dark:!bg-green-600 !text-white hover:!bg-green-600 dark:hover:!bg-green-700 !px-5 !py-2 text-sm disabled:opacity-50 transition-colors !border-0"
                    >
                      {isLoadingFormData ? (
                        <>
                          <svg className="animate-spin h-3.5 w-3.5 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Loading...
                        </>
                      ) : (
                        <>
                          <svg className="h-3.5 w-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                          Load My Data
                        </>
                      )}
                    </Button>
                  )}

                </div>
              </CardHeader>

              <CardContent className="px-3 sm:px-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    {step === 0 && (
                      <div>

                        <Row>
                          <div>
                            <Label>Full Name (as per passport)</Label>
                            <Input placeholder="e.g., Rohan Kumar Sharma" {...register("fullName")} />
                            <RHFError name="fullName" errors={errors} />
                          </div>
                          <div className="min-w-0 max-w-full sm:max-w-none">
                            <Label>Date of Birth</Label>
                            <div className="inline-flex max-w-full">
                              <Input
                                type="date"
                                max={maxDob}
                                className="w-auto text-sm sm:text-base px-3 text-center"
                                style={{ width: 'fit-content', minWidth: '11ch' }}
                                {...register("dob")}
                              />
                            </div>
                            <RHFError name="dob" errors={errors} />
                          </div>
                          <div>
                            <Label>Gender</Label>
                            <Controller
                              control={control}
                              name="gender"
                              render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <SelectTrigger className={selectTriggerClass}><SelectValue placeholder="Select Gender" /></SelectTrigger>
                                  <SelectContent className={selectContentClass}>
                                    <SelectItem value="" disabled>Select Gender</SelectItem>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                            <RHFError name="gender" errors={errors} />
                          </div>
                          <div>
                            <Label>Nationality</Label>
                            <Input defaultValue="India" {...register("nationality")} />
                          </div>
                          <div>
                            <Label>Passport Number</Label>
                            <Input placeholder="e.g., N1234567" {...register("passport")} />
                            <RHFError name="passport" errors={errors} />
                          </div>
                          <div>
                            <Label>Phone (with country code)</Label>
                            <Input placeholder="e.g., +91 98765 43210" {...register("phone")} />
                            <RHFError name="phone" errors={errors} />
                          </div>
                          <div className="md:col-span-2">
                            <Label>Email Address</Label>
                            <Input type="email" placeholder="e.g., rohan.sharma2025@gmail.com" {...register("email")} />
                            <RHFError name="email" errors={errors} />
                          </div>
                          <div className="md:col-span-2">
                            <Label>Current Address</Label>
                            <Textarea placeholder="e.g., 15/B, Sunshine Apartments, Navrangpura, Ahmedabad, Gujarat, 380009" {...register("address")} />
                            <RHFError name="address" errors={errors} />
                          </div>
                        </Row>
                      </div>
                    )}

                    {step === 1 && (
                      <div>

                        <div className="space-y-6">
                          <Row cols={1}>
                            <div>
                              <Label>Highest Level Completed</Label>
                              <Controller
                                control={control}
                                name="highest"
                                render={({ field }) => (
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className={selectTriggerClass}><SelectValue placeholder="Select Highest Level" /></SelectTrigger>
                                    <SelectContent className={selectContentClass}>
                                      <SelectItem value="" disabled>Select Highest Level</SelectItem>
                                      <SelectItem value="12th">12th</SelectItem>
                                      <SelectItem value="Diploma">Diploma</SelectItem>
                                      <SelectItem value="Bachelors">Bachelors</SelectItem>
                                      <SelectItem value="Masters">Masters</SelectItem>
                                      <SelectItem value="PhD">PhD</SelectItem>
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                              <RHFError name="highest" errors={errors} />
                            </div>
                          </Row>
                          <div className="flex items-center space-x-2">
                            <Controller
                              control={control}
                              name="admissionEnglishWaiver"
                              render={({ field }) => (
                                <Switch
                                  id="admissionEnglishWaiver"
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              )}
                            />
                            <Label htmlFor="admissionEnglishWaiver" className="mb-0">Did your institution provide an English test waiver for admission?</Label>
                          </div>


                          <Separator />

                          <h3 className="text-base font-medium text-foreground pt-4">Schooling Details (10th & 12th)</h3>
                          <Row cols={3}>
                            <div><Label>Class 10 Board</Label><Input placeholder="e.g., CBSE" {...register("class10Board")} /><RHFError name="class10Board" errors={errors} /></div>
                            <div><Label>Class 10 Year</Label><Input placeholder="e.g., 2018" {...register("class10Year")} /><RHFError name="class10Year" errors={errors} /></div>
                            <div><Label>Class 10 Grade</Label><Input placeholder="e.g., 85%" {...register("class10Grade")} /><RHFError name="class10Grade" errors={errors} /></div>
                          </Row>
                          <div className="mt-4">
                            <Label>12th Grade School Name</Label>
                            <Input placeholder="e.g., Delhi Public School, Ahmedabad" {...register("schoolName")} />
                            <RHFError name="schoolName" errors={errors} />
                          </div>
                          <Row cols={4} className="mt-4">
                            <div><Label>Class 12 Board</Label><Input placeholder="e.g., GSEB" {...register("class12Board")} /><RHFError name="class12Board" errors={errors} /></div>
                            <div><Label>Class 12 Year</Label><Input placeholder="e.g., 2020" {...register("class12Year")} /><RHFError name="class12Year" errors={errors} /></div>
                            <div><Label>Class 12 Stream</Label><Input placeholder="e.g., Science (PCM)" {...register("class12Stream")} /></div>
                            <div><Label>Class 12 Grade</Label><Input placeholder="e.g., 88%" {...register("class12Grade")} /><RHFError name="class12Grade" errors={errors} /></div>
                          </Row>

                          <Separator />

                          <h3 className="text-base font-medium text-foreground pt-4">Higher Education (Fill where applicable)</h3>

                          <div className="space-y-3">
                            <details className="group bg-white dark:bg-slate-800/60 rounded-xl shadow-sm transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 open:shadow-lg open:border-slate-300 dark:open:border-slate-600">
                              <summary className="flex justify-between items-center p-4 list-none cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                                <h4 className="font-bold text-slate-800 dark:text-slate-200">Diploma Details</h4>
                                <ChevronDown className="w-5 h-5 text-slate-500 dark:text-slate-400 transition-transform duration-300 group-open:rotate-180" />
                              </summary>
                              <div className="px-4 pb-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-700">
                                <div className="mt-3">
                                  <Row cols={2}>
                                    <div className="md:col-span-3"><Label>What did you study? (Qualification Name)</Label><Input placeholder="e.g., Diploma in Information Technology" {...register("diploma.name")} /></div>
                                    <div>
                                      <Label>Institute</Label>
                                      <Controller
                                        name="diploma.institute"
                                        control={control}
                                        render={({ field }) => (
                                          <Typeahead
                                            value={field.value || ""}
                                            onChange={field.onChange}
                                            data={noosrDataset}
                                            placeholder="Start typing institute name..."
                                            badgeMeta
                                            maxListHeightClass="max-h-64"
                                          />
                                        )}
                                      />
                                      <NOOSRBadge uni={w.diploma?.institute} data={noosrDataset} />
                                      <RHFError name="diploma.institute" errors={errors} />
                                    </div>
                                    <div><Label>Duration (Years)</Label><Input placeholder="e.g., 3" {...register("diploma.duration")} /></div>
                                    <div><Label>Year of Passing</Label><Input type="number" placeholder="e.g., 2023" {...register("diploma.year")} /></div>
                                    <div className="md:col-span-3"><Label>Final Grade/Percentage</Label><Input placeholder="e.g., 78%" {...register("diploma.grade")} /></div>
                                  </Row>
                                </div>
                              </div>
                            </details>
                            <details className="group bg-white dark:bg-slate-800/60 rounded-xl shadow-sm transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 open:shadow-lg open:border-slate-300 dark:open:border-slate-600">
                              <summary className="flex justify-between items-center p-4 list-none cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                                <h4 className="font-bold text-slate-800 dark:text-slate-200">Bachelor's Degree Details</h4>
                                <ChevronDown className="w-5 h-5 text-slate-500 dark:text-slate-400 transition-transform duration-300 group-open:rotate-180" />
                              </summary>
                              <div className="px-4 pb-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-700">
                                <div className="mt-3">
                                  <Row cols={2}>
                                    <div className="md:col-span-2"><Label>What did you study? (Degree Name)</Label><Input className="" placeholder="e.g., Bachelor of Technology in Computer Science" {...register("bachelors.name")} /></div>
                                    <div>
                                      <Label>University</Label>
                                      <Controller
                                        name="bachelors.university"
                                        control={control}
                                        render={({ field }) => (
                                          <Typeahead
                                            value={field.value || ""}
                                            onChange={field.onChange}
                                            data={noosrDataset}
                                            placeholder="Start typing university name..."
                                            badgeMeta
                                            maxListHeightClass="max-h-64"
                                          />
                                        )}
                                      />
                                      <NOOSRBadge uni={w.bachelors?.university} data={noosrDataset} />
                                      <RHFError name="bachelors.university" errors={errors} />
                                    </div>
                                    <div><Label>Duration (Years)</Label><Input placeholder="e.g., 4" {...register("bachelors.duration")} /></div>
                                    <div><Label>Year of Passing</Label><Input type="number" placeholder="e.g., 2024" {...register("bachelors.year")} /></div>
                                    <div><Label>Final CGPA/Percentage</Label><Input placeholder="e.g., 8.2 CGPA" {...register("bachelors.cgpa")} /></div>
                                    <div><Label>Medium of Instruction</Label><Input placeholder="e.g., English" {...register("bachelors.medium")} /></div>
                                  </Row>
                                </div>
                              </div>
                            </details>
                            <details className="group bg-white dark:bg-slate-800/60 rounded-xl shadow-sm transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 open:shadow-lg open:border-slate-300 dark:open:border-slate-600">
                              <summary className="flex justify-between items-center p-4 list-none cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                                <h4 className="font-bold text-slate-800 dark:text-slate-200">Master's Degree Details</h4>
                                <ChevronDown className="w-5 h-5 text-slate-500 dark:text-slate-400 transition-transform duration-300 group-open:rotate-180" />
                              </summary>
                              <div className="px-4 pb-4 bg-slate-50 dark:bg-slate-800/40 border-t mb-10 border-slate-200 dark:border-slate-700">
                                <div className="mt-3">
                                  <Row cols={2}>
                                    <div className="md:col-span-2"><Label>What did you study? (Degree Name)</Label><Input placeholder="e.g., Master of Business Administration" {...register("masters.name")} /></div>
                                    <div>
                                      <Label>University</Label>
                                      <Controller
                                        name="masters.university"
                                        control={control}
                                        render={({ field }) => (
                                          <Typeahead
                                            value={field.value || ""}
                                            onChange={field.onChange}
                                            data={noosrDataset}
                                            placeholder="Start typing university name..."
                                            badgeMeta
                                            maxListHeightClass="max-h-64"
                                          />
                                        )}
                                      />
                                      <NOOSRBadge uni={w.masters?.university} data={noosrDataset} />
                                      <RHFError name="masters.university" errors={errors} />
                                    </div>
                                    <div><Label>Year of Passing</Label><Input type="number" placeholder="e.g., 2026" {...register("masters.year")} /></div>
                                    <div><Label>Final CGPA/Percentage</Label><Input placeholder="e.g., 7.5 CGPA" {...register("masters.cgpa")} /></div>
                                  </Row>
                                </div>
                              </div>
                            </details>
                            <details className="group bg-white dark:bg-slate-800/60 rounded-xl shadow-sm transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 open:shadow-lg open:border-slate-300 dark:open:border-slate-600">
                              <summary className="flex justify-between items-center p-4 list-none cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                                <h4 className="font-bold text-slate-800 dark:text-slate-200">PhD Details</h4>
                                <ChevronDown className="w-5 h-5 text-slate-500 dark:text-slate-400 transition-transform duration-300 group-open:rotate-180" />
                              </summary>
                              <div className="px-4 pb-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-700">
                                <div className="mt-3">
                                  <Row cols={2}>
                                    <div className="md:col-span-1 "><Label>What did you study? (Field of Research)</Label><Input placeholder="e.g., PhD in Physics" {...register("phd.name")} /></div>
                                    <div>
                                      <Label>University</Label>
                                      <Controller
                                        name="phd.university"
                                        control={control}
                                        render={({ field }) => (
                                          <Typeahead
                                            value={field.value || ""}
                                            onChange={field.onChange}
                                            data={noosrDataset}
                                            placeholder="Start typing university name..."
                                            badgeMeta
                                            maxListHeightClass="max-h-64"
                                          />
                                        )}
                                      />
                                      <NOOSRBadge uni={w.phd?.university} data={noosrDataset} />
                                      <RHFError name="phd.university" errors={errors} />
                                    </div>
                                    <div><Label>Year of Completion</Label><Input type="number" placeholder="e.g., 2029" {...register("phd.year")} /></div>
                                  </Row>
                                </div>
                              </div>
                            </details>
                          </div>

                          <Separator />

                          <Row cols={1} className="mt-4">
                            <div>
                              <Label>Do you have any backlogs (ATKT)?</Label>
                              <Input placeholder="e.g., 2 backlogs in Semester 3, cleared in next attempt." {...register("backlogs")} />
                              <RHFError name="backlogs" errors={errors} />
                            </div>
                            <div>
                              <Label>Have you studied in Australia before?</Label>
                              <Controller
                                control={control}
                                name="studiedAU"
                                render={({ field }) => (
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className={selectTriggerClass}><SelectValue /></SelectTrigger>
                                    <SelectContent className={selectContentClass}>
                                      <SelectItem value="no">No</SelectItem>
                                      <SelectItem value="yes">Yes</SelectItem>
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                            </div>
                            {w.studiedAU === 'yes' && (
                              <div className="space-y-2 rounded-lg border p-4">
                                <Label>Previous Australian Study Details</Label>
                                <Input placeholder="e.g., TAFE NSW" {...register("auDetails.institution")} />
                                <Input placeholder="Time period (e.g., Feb 2022 - Nov 2022)" {...register("auDetails.period")} />
                                <Textarea placeholder="e.g., Course did not align with my long-term career goals in India." {...register("auDetails.reason")} />
                              </div>
                            )}
                          </Row>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div>

                        <Row cols={1}>
                          <div>
                            <Label>Have work experience?</Label>
                            <Controller
                              control={control}
                              name="hasExperience"
                              render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <SelectTrigger className={selectTriggerClass}><SelectValue placeholder="Select" /></SelectTrigger>
                                  <SelectContent className={selectContentClass}>
                                    <SelectItem value="no">No</SelectItem>
                                    <SelectItem value="yes">Yes</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </div>
                          {w.hasExperience === 'yes' && (
                            <div className="space-y-3">
                              {workFields.map((f, i) => (
                                <div key={f.id} className="rounded-xl border p-3">
                                  <Row>
                                    <div>
                                      <Label>Job Title</Label>
                                      <Input placeholder="e.g., Software Engineer Intern" {...register(`experiences.${i}.title`)} />
                                    </div>
                                    <div>
                                      <Label>Employer</Label>
                                      <Input placeholder="e.g., Tata Consultancy Services" {...register(`experiences.${i}.employer`)} />
                                    </div>
                                    <div>
                                      <Label>From</Label>
                                      <Input type="date" {...register(`experiences.${i}.from`)} />
                                    </div>
                                    <div>
                                      <Label>To</Label>
                                      <Input type="date" {...register(`experiences.${i}.to`)} />
                                    </div>
                                    <div className="md:col-span-2">
                                      <Label>Key Duties</Label>
                                      <Textarea placeholder="e.g., Developed features for a client's web app using React and Node.js." {...register(`experiences.${i}.duties`)} />
                                    </div>
                                  </Row>
                                  <div className="mt-3 flex justify-end">
                                    <Button size="sm" variant="ghost" onClick={() => removeWork(i)}>Remove</Button>
                                  </div>
                                </div>
                              ))}
                              <Button size="sm" variant="secondary" onClick={() => addWork({ title: "", employer: "", from: "", to: "" })}>+ Add experience</Button>
                            </div>
                          )}
                          <div>
                            <Label>Any gap &gt; 6 months?</Label>
                            <Controller
                              control={control}
                              name="hasGap"
                              render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <SelectTrigger className={selectTriggerClass}><SelectValue placeholder="Select" /></SelectTrigger>
                                  <SelectContent className={selectContentClass}>
                                    <SelectItem value="no">No</SelectItem>
                                    <SelectItem value="yes">Yes</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </div>
                          {w.hasGap === 'yes' && (
                            <div>
                              <Label>Gap Explanation</Label>
                              <Textarea placeholder="e.g., July 2024 - Jan 2025 • Prepared for CAT entrance exam while also managing family business responsibilities." {...register("gapExplain")} />
                            </div>
                          )}
                        </Row>
                      </div>
                    )}

                    {step === 3 && (
                      <div>

                        <div className="space-y-4">
                          {testFields.map((field, index) => {
                            const testType = w.tests?.[index]?.test;
                            const ph = testType ? (testPlaceholders as any)[testType] || {} : {};
                            return (
                              <div key={field.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg relative">
                                {testFields.length > 1 && (
                                  <Button variant="ghost" size="sm" onClick={() => removeTest(index)} className="absolute top-2 right-2">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                                <Row>
                                  <div>
                                    <Label>Test</Label>
                                    <Controller
                                      control={control}
                                      name={`tests.${index}.test`}
                                      render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                          <SelectTrigger className={selectTriggerClass}><SelectValue placeholder="Select Test" /></SelectTrigger>
                                          <SelectContent className={selectContentClass}>
                                            <SelectItem value="Not yet">Not yet taken</SelectItem>
                                            <SelectItem value="IELTS">IELTS</SelectItem>
                                            <SelectItem value="PTE Academic">PTE Academic</SelectItem>
                                            <SelectItem value="TOEFL iBT">TOEFL iBT</SelectItem>
                                            <SelectItem value="CAE">Cambridge (CAE)</SelectItem>
                                            <SelectItem value="OET">OET</SelectItem>
                                            <SelectItem value="GMAT">GMAT</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      )}
                                    />
                                  </div>
                                </Row>

                                {testType && testType !== 'Not yet' ? (
                                  <div className="mt-4 space-y-4 pt-4 border-t">
                                    {(testType !== 'OET' && testType !== 'GMAT') ? (
                                      <Row cols={2}>
                                        <div><Label>Overall Score</Label><Input placeholder={`e.g., ${ph.overall || 'score'}`} {...register(`tests.${index}.overall`)} /><RHFError name={`tests.${index}.overall`} errors={errors} /></div>
                                        <div className="w-full sm:w-auto">
                                          <Label>Test Date</Label>
                                          <div className="inline-flex max-w-full">
                                            <Input type="date" className="w-auto text-sm sm:text-base px-3 text-center" style={{ width: 'fit-content', minWidth: '11ch' }} {...register(`tests.${index}.testDate`)} />
                                          </div>
                                          <RHFError name={`tests.${index}.testDate`} errors={errors} />
                                        </div>
                                      </Row>
                                    ) : (
                                      <Row cols={1}>
                                        <div className="w-full sm:w-auto">
                                          <Label>Test Date</Label>
                                          <div className="inline-flex max-w-full">
                                            <Input type="date" className="w-auto text-sm sm:text-base px-3 text-center" style={{ width: 'fit-content', minWidth: '11ch' }} {...register(`tests.${index}.testDate`)} />
                                          </div>
                                          <RHFError name={`tests.${index}.testDate`} errors={errors} />
                                        </div>
                                      </Row>
                                    )}
                                    {['IELTS', 'TOEFL iBT', 'PTE Academic', 'CAE', 'OET'].includes(testType) && (
                                      <Row cols={4}>
                                        <div><Label>Listening</Label><Input placeholder={`e.g., ${ph.l || 'score'}`} {...register(`tests.${index}.${testType.split(' ')[0].toLowerCase()}L` as any)} /><RHFError name={`tests.${index}.${testType.split(' ')[0].toLowerCase()}L` as any} errors={errors} /></div>
                                        <div><Label>Reading</Label><Input placeholder={`e.g., ${ph.r || 'score'}`} {...register(`tests.${index}.${testType.split(' ')[0].toLowerCase()}R` as any)} /><RHFError name={`tests.${index}.${testType.split(' ')[0].toLowerCase()}R` as any} errors={errors} /></div>
                                        <div><Label>Writing</Label><Input placeholder={`e.g., ${ph.w || 'score'}`} {...register(`tests.${index}.${testType.split(' ')[0].toLowerCase()}W` as any)} /><RHFError name={`tests.${index}.${testType.split(' ')[0].toLowerCase()}W` as any} errors={errors} /></div>
                                        <div><Label>Speaking</Label><Input placeholder={`e.g., ${ph.s || 'score'}`} {...register(`tests.${index}.${testType.split(' ')[0].toLowerCase()}S` as any)} /><RHFError name={`tests.${index}.${testType.split(' ')[0].toLowerCase()}S` as any} errors={errors} /></div>
                                      </Row>
                                    )}
                                    {testType === 'GMAT' && (
                                      <Row cols={4}>
                                        <div><Label>Overall</Label><Input placeholder={`e.g., ${ph.overall || 'score'}`} {...register(`tests.${index}.overall`)} /><RHFError name={`tests.${index}.overall`} errors={errors} /></div>
                                        <div><Label>Quantitative</Label><Input placeholder={`e.g., ${ph.q || 'score'}`} {...register(`tests.${index}.gmatQ`)} /><RHFError name={`tests.${index}.gmatQ`} errors={errors} /></div>
                                        <div><Label>Verbal</Label><Input placeholder={`e.g., ${ph.v || 'score'}`} {...register(`tests.${index}.gmatV`)} /><RHFError name={`tests.${index}.gmatV`} errors={errors} /></div>
                                        <div><Label>Data Insights</Label><Input placeholder={`e.g., ${ph.di || 'score'}`} {...register(`tests.${index}.gmatDI`)} /><RHFError name={`tests.${index}.gmatDI`} errors={errors} /></div>
                                      </Row>
                                    )}
                                  </div>
                                ) : (
                                  <div className="mt-4 pt-4 border-t"><Label>Planned Test Details</Label><Input placeholder="e.g., Booked for IELTS on 15th August 2025. Targeting an overall score of 7.0." {...register(`tests.${index}.planned`)} /></div>
                                )}
                              </div>
                            )
                          })}
                          <Button variant="secondary" size="sm" onClick={() => addTest({ test: "Not yet" })}>
                            <PlusCircle className="h-4 w-4 mr-2" /> Add another test
                          </Button>
                        </div>
                      </div>
                    )}


                    {step === 4 && (
                      <div>

                        <Row>
                          <div>
                            <Label>Level</Label>
                            <Controller
                              control={control}
                              name="level"
                              render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <SelectTrigger className={selectTriggerClass}><SelectValue placeholder="Select Level" /></SelectTrigger>
                                  <SelectContent className={selectContentClass}>
                                    <SelectItem value="" disabled>Select Level</SelectItem>
                                    <SelectItem value="Diploma">Diploma</SelectItem>
                                    <SelectItem value="Bachelors">Bachelors</SelectItem>
                                    <SelectItem value="Masters">Masters</SelectItem>
                                    <SelectItem value="PhD">PhD</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                            <RHFError name="level" errors={errors} />
                          </div>
                          <div className="md:col-span-2">
                            <Label>Institution (AU University / Public TAFE)</Label>
                            <Typeahead
                              value={w.institution || ""}
                              onChange={(v) => setValue("institution", v)}
                              data={AU_INSTITUTIONS}
                              placeholder="Start typing provider name..."
                              badgeMeta
                            />
                          </div>

                          {availableCampuses.length > 0 && (
                            <div>
                              <Label>Campus</Label>
                              <Select onValueChange={(v) => setValue("campus", v)} value={w.campus}>
                                <SelectTrigger className={selectTriggerClass}><SelectValue placeholder="Select campus..." /></SelectTrigger>
                                <SelectContent className={selectContentClass}>
                                  {availableCampuses.map(campus => (
                                    <SelectItem key={campus.city} value={`${campus.city}, ${campus.state}`}>
                                      {campus.city}, {campus.state}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          )}

                          <AnimatePresence>
                            {pswData && (
                              <motion.div
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                className="md:col-span-2"
                              >
                                <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-lg border-2 border-dashed border-orange-200 dark:border-orange-800/70">
                                  <div className="flex items-center gap-4">
                                    <CalendarCheck className="h-10 w-10 text-orange-500 dark:text-orange-400 flex-shrink-0" />
                                    <div>
                                      <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200">
                                        Estimated Post-Study Work Rights (AI-ECTA): <span className="text-orange-600 dark:text-orange-400">{pswData.total} Years</span>
                                      </h4>
                                      <p className="text-sm text-slate-600 dark:text-slate-400">
                                        ({pswData.base > 0 ? `${pswData.base} Base Years` : 'Not Eligible'} + {pswData.bonus} Bonus Year{pswData.bonus !== 1 ? 's' : ''})
                                      </p>
                                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{pswData.reason}</p>
                                    </div>
                                  </div>
                                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-2 text-center">
                                    Note for Indian students: A Bachelor's with First-Class Honours in STEM/ICT may be eligible for a 3-year base period.
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <div className="md:col-span-2">
                            <Label>Course Name</Label>
                            <Input placeholder="e.g., Master of Data Science" {...register("courseName")} />
                            <RHFError name="courseName" errors={errors} />
                          </div>

                          <div className="w-full sm:w-auto">
                            <Label>Start Date</Label>
                            <div className="inline-flex max-w-full">
                              <Input type="date" className="w-auto text-sm sm:text-base px-3 text-center" style={{ width: 'fit-content', minWidth: '11ch' }} {...register("startDate")} />
                            </div>
                          </div>
                          <div>
                            <Label>Duration</Label>
                            <Input placeholder="e.g., 2 years" {...register("duration")} />
                          </div>
                          <div>
                            <Label>Packaged Offer</Label>
                            <Controller
                              control={control}
                              name="packaged"
                              render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <SelectTrigger className={selectTriggerClass}><SelectValue placeholder="Select" /></SelectTrigger>
                                  <SelectContent className={selectContentClass}>
                                    <SelectItem value="no">No</SelectItem>
                                    <SelectItem value="yes">Yes</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </div>
                          {w.packaged === 'yes' && (
                            <div className="md:col-span-2">
                              <Label>Package Details</Label>
                              <Input placeholder="e.g., 10 weeks of General English (ELICOS) followed by Master of Professional Accounting" {...register("packageDetails")} />
                            </div>
                          )}
                          <div>
                            <Label>COE Status</Label>
                            <Controller
                              control={control}
                              name="hasCOE"
                              render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <SelectTrigger className={selectTriggerClass}><SelectValue placeholder="Select" /></SelectTrigger>
                                  <SelectContent className={selectContentClass}>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Yes">Yes</SelectItem>
                                    <SelectItem value="No">No</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </div>
                          <div>
                            <Label>Tuition (Year 1, AUD)</Label>
                            <Input placeholder="e.g., 38500" {...register("tuitionFirstYearAUD")} />
                          </div>
                          <div>
                            <Label>Living (Year 1, AUD)</Label>
                            <Input placeholder="e.g., 29710" {...register("livingCostYearAUD")} />
                          </div>
                          <div>
                            <Label>OSHC Type</Label>
                            <Controller
                              control={control}
                              name="oshcType"
                              render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <SelectTrigger className={selectTriggerClass}><SelectValue placeholder="Select OSHC Type" /></SelectTrigger>
                                  <SelectContent className={selectContentClass}>
                                    <SelectItem value="" disabled>Select OSHC Type</SelectItem>
                                    <SelectItem value="Single">Single</SelectItem>
                                    <SelectItem value="Couple">Couple</SelectItem>
                                    <SelectItem value="Family">Family</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </div>
                          <div>
                            <Label>OSHC Cost (AUD)</Label>
                            <Input placeholder="e.g., 650" {...register("oshcCostAUD")} />
                          </div>
                          <div>
                            <Label>Travel Budget (AUD)</Label>
                            <Input placeholder="e.g., 2500" {...register("travelCostAUD")} />
                          </div>
                          <div className="md:col-span-2">
                            <Label>Understanding of Course Requirements</Label>
                            <Textarea placeholder="e.g., I have researched the course structure and am particularly interested in subjects like 'Machine Learning Foundations' and 'Big Data Processing'. I understand this course involves a significant capstone project, and I must maintain a full-time study load." {...register("courseUnderstanding")} />
                          </div>
                          <div className="md:col-span-2">
                            <Label>Understanding of Living in Australia</Label>
                            <Textarea placeholder="e.g., I'm aware of the current 48 hours/fortnight work limit. I have budgeted for shared accommodation in Melbourne, which I found on platforms like Flatmates.com.au. I also understand my OSHC policy and the public transport system (Myki)." {...register("livingUnderstanding")} />
                          </div>
                        </Row>

                        <div className="rounded-xl border p-3 bg-amber-50/60 dark:bg-amber-950/20 mt-4">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 mt-0.5 text-amber-600" />
                            <div className="text-sm">
                              <div><span className="font-medium">Funds Guidance:</span> Required ≈ Tuition + Living + OSHC + Travel.</div>
                              <div className="mt-1">Required (AUD): <span className="font-semibold">{Number.isFinite(requiredTotal) ? requiredTotal : 0}</span> &nbsp;|&nbsp; Available (AUD): <span className="font-semibold">{Number.isFinite(funds) ? funds : 0}</span></div>
                              {funds > 0 && requiredTotal > 0 && funds < requiredTotal && (
                                <div className="text-amber-700 mt-1">Warning: Available funds appear below Year-1 requirement.</div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 5 && (
                      <div>

                        <Row cols={1}>
                          <div>
                            <Label>Why Australia?</Label>
                            <Textarea placeholder="e.g., Australia's world-class education, practical learning approach, and multicultural environment make it my top choice. The post-study work opportunities will provide invaluable global experience before I return to India." {...register("whyAustralia")} />
                          </div>
                          <div>
                            <Label>Why this institution & course?</Label>
                            <Textarea placeholder="e.g., The University of Melbourne is ranked #1 in Australia for Data Science. I am particularly impressed by its research facilities, strong industry connections with companies like Atlassian, and the expertise of professors like Dr. Jane Smith in Natural Language Processing." {...register("whyThisInstitution")} />
                          </div>
                          <div>
                            <Label>Why not India/other countries?</Label>
                            <Textarea placeholder="e.g., While India has good institutions, the curriculum in Australia is more practical and globally aligned. The opportunity to work on real-world projects with international teams is a key advantage that Australian universities offer." {...register("whyNotIndia")} />
                          </div>
                          <div>
                            <Label>How does the course benefit your career?</Label>
                            <Textarea placeholder="e.g., This course will equip me with advanced skills in data analysis and machine learning, which are in high demand in India's tech sector. It will allow me to transition from a software developer to a senior data scientist role." {...register("careerBenefit")} />
                          </div>
                          <div>
                            <Label>Career Goals in Home Country</Label>
                            <Textarea
                              {...register("afterStudyPlan")}
                              placeholder="e.g., Upon returning to India, I plan to work as a Data Scientist at a top tech company like Infosys or Wipro in Bangalore. My goal is to achieve a salary of ₹15-20 Lakhs per annum and grow into a lead data science role within 5 years."
                            />
                          </div>
                          <div>
                            <Label>Expected Annual Salary in India After Course (INR)</Label>
                            <Input placeholder="e.g., ₹15-20 Lakhs per annum" {...register("expectedSalaryInIndia")} />
                          </div>
                          <div>
                            <Label>Target roles/companies (optional)</Label>
                            <Input placeholder="e.g., Data Scientist, Machine Learning Engineer, Business Intelligence Analyst" {...register("targetRoles")} />
                          </div>
                        </Row>
                        <div className="mt-4">
                          <SOPPreview data={w} />
                        </div>
                      </div>
                    )}

                    {step === 6 && (
                      <div>

                        <div className="space-y-6">
                          <div>
                            <Label>Funding Sources</Label>
                            <Controller
                              name="funding"
                              control={control}
                              render={({ field }) => (
                                <div className="flex flex-wrap gap-x-6 gap-y-3 p-3 rounded-lg border bg-slate-50 dark:bg-slate-800/50">
                                  {(["Self", "Family", "Loan", "Scholarship", "Other"] as const).map((source) => (
                                    <div key={source} className="flex items-center gap-2">
                                      <Checkbox
                                        id={`funding-${source}`}
                                        checked={field.value?.includes(source)}
                                        onCheckedChange={(checked: boolean) => {
                                          const newValue = checked
                                            ? [...(field.value || []), source]
                                            : (field.value || []).filter((v) => v !== source);
                                          field.onChange(newValue);
                                        }}
                                      />
                                      <Label htmlFor={`funding-${source}`} className="mb-0 font-normal">{source}</Label>
                                    </div>
                                  ))}
                                </div>
                              )}
                            />
                            <RHFError name="funding" errors={errors} />
                          </div>

                          {w.funding?.includes("Loan") && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border p-4 mt-4 space-y-4 bg-slate-50 dark:bg-slate-900/40">
                              <h3 className="font-semibold text-foreground">Education Loan Details</h3>
                              <Row>
                                <div>
                                  <Label>Loan Amount (INR Lakhs)</Label>
                                  <Input placeholder="e.g., 25" {...register("loan.amount")} />
                                  <RHFError name="loan.amount" errors={errors} />
                                </div>
                                <div>
                                  <Label>Loan Status</Label>
                                  <Controller
                                    control={control}
                                    name="loan.status"
                                    render={({ field }) => (
                                      <Select onValueChange={field.onChange} value={field.value || ''}>
                                        <SelectTrigger className={selectTriggerClass}><SelectValue placeholder="Select Status" /></SelectTrigger>
                                        <SelectContent className={selectContentClass}>
                                          <SelectItem value="" disabled>Select Status</SelectItem>
                                          <SelectItem value="Applied">Applied</SelectItem>
                                          <SelectItem value="Sanctioned">Sanctioned / Approved-in-principle</SelectItem>
                                          <SelectItem value="Disbursed">Disbursed</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    )}
                                  />
                                  <RHFError name="loan.status" errors={errors} />
                                </div>
                                <div className="md:col-span-2">
                                  <Label>Bank Name</Label>
                                  <Controller
                                    control={control}
                                    name="loan.bank"
                                    render={({ field }) => (
                                      <Select onValueChange={field.onChange} value={field.value || ''}>
                                        <SelectTrigger className={selectTriggerClass}><SelectValue placeholder="Select Bank from Approved List" /></SelectTrigger>
                                        <SelectContent className={selectContentClass}>
                                          <SelectItem value="" disabled>Select Bank</SelectItem>
                                          {BANK_DATA.map(bank => (
                                            <SelectItem key={bank.name} value={bank.name}>{bank.name}</SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    )}
                                  />
                                  <RHFError name="loan.bank" errors={errors} />
                                </div>
                              </Row>
                            </motion.div>
                          )}

                          {w.funding?.includes("Scholarship") && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border p-4 mt-4 space-y-4 bg-slate-50 dark:bg-slate-900/40">
                              <h3 className="font-semibold text-foreground">Scholarship Details</h3>
                              <Row>
                                <div>
                                  <Label>Scholarship Name</Label>
                                  <Input placeholder="e.g., Vice-Chancellor's International Scholarship" {...register("scholarship.name")} />
                                  <RHFError name="scholarship.name" errors={errors} />
                                </div>
                                <div>
                                  <Label>Coverage Amount (AUD)</Label>
                                  <Input type="number" placeholder="e.g., 10000" {...register("scholarship.coverage")} />
                                  <RHFError name="scholarship.coverage" errors={errors} />
                                </div>
                              </Row>
                            </motion.div>
                          )}

                          {w.funding?.includes("Other") && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border p-4 mt-4 space-y-4 bg-slate-50 dark:bg-slate-900/40">
                              <h3 className="font-semibold text-foreground">Other Funding Source Details</h3>
                              <Row cols={1}>
                                <div>
                                  <Label>Please explain the funding source in detail</Label>
                                  <Textarea placeholder="e.g., Funds from sale of ancestral property, with documented proof of transaction." {...register("otherFunding.details")} />
                                  <RHFError name="otherFunding.details" errors={errors} />
                                </div>
                              </Row>
                              <Row>
                                <div>
                                  <Label>Coverage Amount (AUD)</Label>
                                  <Input type="number" placeholder="e.g., 15000" {...register("otherFunding.amount")} />
                                  <RHFError name="otherFunding.amount" errors={errors} />
                                </div>
                              </Row>
                            </motion.div>
                          )}

                          <div>
                            <Label>Sponsor(s)</Label>
                            <div className="space-y-3">
                              {sponsorFields.map((f, i) => (
                                <div key={f.id} className="rounded-xl border p-4">
                                  <Row>
                                    <div>
                                      <Label>Sponsor {i + 1} Name</Label>
                                      <Input placeholder="e.g., Suresh Kumar Sharma" {...register(`sponsors.${i}.name`)} />
                                    </div>
                                    <div>
                                      <Label>Relation</Label>
                                      <Input placeholder="e.g., Father" {...register(`sponsors.${i}.relation`)} />
                                    </div>
                                    <div>
                                      <Label>Occupation</Label>
                                      <Input placeholder="e.g., Senior Manager at State Bank of India" {...register(`sponsors.${i}.occupation`)} />
                                    </div>
                                    <div>
                                      <Label>Annual Income (INR)</Label>
                                      <Input placeholder="e.g., 18,00,000" {...register(`sponsors.${i}.annualIncomeINR`)} />
                                    </div>
                                  </Row>
                                  <div className="mt-3 flex justify-end">
                                    <Button size="sm" variant="ghost" onClick={() => removeSponsor(i)} disabled={sponsorFields.length <= 1}>
                                      <Trash2 className="h-4 w-4 mr-1" /> Remove Sponsor
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <Button size="sm" variant="secondary" className="mt-3" onClick={() => addSponsor({ name: "", relation: "", occupation: "", annualIncomeINR: "" })}>
                              <PlusCircle className="h-4 w-4 mr-2" /> Add another sponsor
                            </Button>
                          </div>
                          <Row>
                            <div>
                              <Label>Total Funds Available (AUD)</Label>
                              <Input placeholder="e.g., 75000" {...register("totalFunds")} />
                              <RHFError name="totalFunds" errors={errors} />
                            </div>
                            <div>
                              <Label>Living Expenses Covered By</Label>
                              <Input placeholder="e.g., My parents will cover my living expenses from their savings." {...register("livingSponsor")} />
                              <RHFError name="livingSponsor" errors={errors} />
                            </div>
                          </Row>
                        </div>
                      </div>
                    )}

                    {step === 7 && (
                      <div>

                        <Row>
                          <div>
                            <Label>Father's Name</Label>
                            <Input placeholder="e.g., Suresh Kumar Sharma" {...register("fatherName")} />
                          </div>
                          <div>
                            <Label>Father's Occupation</Label>
                            <Input placeholder="e.g., Senior Manager at State Bank of India" {...register("fatherOcc")} />
                          </div>
                          <div>
                            <Label>Father's Annual Income (INR)</Label>
                            <Input placeholder="e.g., 18,00,000" {...register("fatherIncome")} />
                          </div>
                          <div>
                            <Label>Mother's Name</Label>
                            <Input placeholder="e.g., Priya Sharma" {...register("motherName")} />
                          </div>
                          <div>
                            <Label>Mother's Occupation</Label>
                            <Input placeholder="e.g., School Teacher" {...register("motherOcc")} />
                          </div>
                          <div>
                            <Label>Mother's Annual Income (INR)</Label>
                            <Input placeholder="e.g., 7,00,000" {...register("motherIncome")} />
                          </div>
                          <div>
                            <Label>Relatives in Australia?</Label>
                            <Controller
                              control={control}
                              name="relativesInAU"
                              render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <SelectTrigger className={selectTriggerClass}><SelectValue placeholder="Select" /></SelectTrigger>
                                  <SelectContent className={selectContentClass}>
                                    <SelectItem value="no">No</SelectItem>
                                    <SelectItem value="yes">Yes</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </div>
                          {w.relativesInAU === 'yes' && (
                            <div className="md:col-span-2">
                              <Label>Relative Details (name, relation, city, status)</Label>
                              <Input {...register("relativeDetail.name")} placeholder="e.g., Vikram Singh" className="mb-2" />
                              <Input {...register("relativeDetail.relation")} placeholder="e.g., Cousin" className="mb-2" />
                              <Input {...register("relativeDetail.city")} placeholder="e.g., Sydney, NSW" className="mb-2" />
                              <Input {...register("relativeDetail.status")} placeholder="e.g., Permanent Resident" />
                            </div>
                          )}
                        </Row>
                      </div>
                    )}

                    {step === 8 && (
                      <div>


                        <Row>
                          <div className="md:col-span-2">
                            <Label>Marital Status</Label>
                            <Controller
                              control={control}
                              name="maritalStatus"
                              render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <SelectTrigger className={selectTriggerClass}><SelectValue placeholder="Select status" /></SelectTrigger>
                                  <SelectContent className={selectContentClass}>
                                    <SelectItem value="Single">Single</SelectItem>
                                    <SelectItem value="Married">Married</SelectItem>
                                    <SelectItem value="Divorced">Divorced</SelectItem>
                                    <SelectItem value="Widowed">Widowed</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </div>

                          {w.maritalStatus === 'Married' && (
                            <>
                              <div>
                                <Label>Date of Marriage</Label>
                                <Input type="date" {...register("dateOfMarriage")} />
                                <RHFError name="dateOfMarriage" errors={errors} />
                              </div>
                              <div className="md:col-span-1"> {/* Placeholder for layout */} </div>
                              {marriageLessThanOneYear && (
                                <div className="md:col-span-2 p-3 bg-red-50 dark:bg-red-900/30 rounded-lg border border-red-300 dark:border-red-700 text-red-800 dark:text-red-300 text-sm flex items-center gap-2">
                                  <AlertTriangle className="h-4 w-4" />
                                  <div><strong>Advisory Caution Note:</strong> Marriage less than 12 months can face high scrutiny.</div>
                                </div>
                              )}
                              <div>
                                <Label>Spouse's Full Name</Label>
                                <Input placeholder="e.g., Anjali Sharma" {...register("spouseName")} />
                              </div>
                              <div>
                                <Label>Will spouse accompany you?</Label>
                                <Controller
                                  control={control}
                                  name="spouseAccompany"
                                  render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                      <SelectTrigger className={selectTriggerClass}><SelectValue placeholder="Select" /></SelectTrigger>
                                      <SelectContent className={selectContentClass}>
                                        <SelectItem value="no">No</SelectItem>
                                        <SelectItem value="yes">Yes</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  )}
                                />
                              </div>
                              <div><Label>Spouse's Occupation</Label><Input placeholder="e.g., Accountant" {...register("spouseOccupation")} /></div>
                              <div><Label>Spouse's Highest Qualification</Label><Input placeholder="e.g., B.Com" {...register("spouseHighestQualification")} /></div>
                              <div className="md:col-span-2"><Label>Spouse's Work Experience (Years)</Label><Input placeholder="e.g., 3 years" {...register("spouseExperience")} /></div>
                            </>
                          )}
                        </Row>

                        <div className="mt-6">
                          <Row cols={1}>
                            <div>
                              <Label>Will any children accompany you?</Label>
                              <Controller
                                control={control}
                                name="childrenAccompany"
                                render={({ field }) => (
                                  <Select onValueChange={field.onChange} value={field.value || 'no'}>
                                    <SelectTrigger className={selectTriggerClass}><SelectValue placeholder="Select" /></SelectTrigger>
                                    <SelectContent className={selectContentClass}>
                                      <SelectItem value="no">No</SelectItem>
                                      <SelectItem value="yes">Yes</SelectItem>
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                            </div>
                          </Row>

                          {w.childrenAccompany === 'yes' && (
                            <Row cols={2} className="mt-4">
                              <div>
                                <Label>How many children?</Label>
                                <Input type="number" placeholder="e.g., 2" {...register("numberOfChildren")} />
                              </div>
                              <div>
                                <Label>Ages of each child (comma-separated)</Label>
                                <Input placeholder="e.g., 5, 8" {...register("childrenAges")} />
                              </div>
                            </Row>
                          )}
                        </div>

                        <Separator className="my-6" />

                        <Row>
                          <div>
                            <Label>Applied for Australia before?</Label>
                            <Controller
                              control={control}
                              name="appliedAU"
                              render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <SelectTrigger className={selectTriggerClass}><SelectValue placeholder="Select" /></SelectTrigger>
                                  <SelectContent className={selectContentClass}>
                                    <SelectItem value="no">No</SelectItem>
                                    <SelectItem value="yes">Yes</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </div>
                          {w.appliedAU === 'yes' && (
                            <>
                              <div>
                                <Label>Visa Type & Year</Label>
                                <Input placeholder="e.g., Visitor Visa (Subclass 600) in 2022" {...register("auTypeYear")} />
                              </div>
                              <div>
                                <Label>Outcome</Label>
                                <Controller
                                  control={control}
                                  name="auOutcome"
                                  render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value || ''}>
                                      <SelectTrigger className={selectTriggerClass}><SelectValue placeholder="Select Outcome" /></SelectTrigger>
                                      <SelectContent className={selectContentClass}>
                                        <SelectItem value="" disabled>Select Outcome</SelectItem>
                                        <SelectItem value="Approved">Approved</SelectItem>
                                        <SelectItem value="Refused">Refused</SelectItem>
                                        <SelectItem value="Withdrawn">Withdrawn</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  )}
                                />
                              </div>
                              {w.auOutcome === 'Refused' && (
                                <div className="md:col-span-2">
                                  <Label>Refusal Reason (summary)</Label>
                                  <Textarea placeholder="e.g., Insufficient funds shown at the time of application." {...register("auReason")} />
                                </div>
                              )}
                            </>
                          )}
                        </Row>

                        <Separator className="my-6" />

                        <Row>
                          <div className="md:col-span-2">
                            <Label>Have you ever had a visa refused for ANY country (including Australia)?</Label>
                            <Controller
                              control={control}
                              name="refusedAnywhere"
                              render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <SelectTrigger className={selectTriggerClass}><SelectValue placeholder="Select" /></SelectTrigger>
                                  <SelectContent className={selectContentClass}>
                                    <SelectItem value="no">No</SelectItem>
                                    <SelectItem value="yes">Yes</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </div>
                          {w.refusedAnywhere === 'yes' && (
                            <div className="md:col-span-2">
                              <Label>Refusal Details</Label>
                              <Textarea placeholder="e.g., USA, B1/B2 Visitor Visa, June 2023, due to not demonstrating strong ties to home country." {...register("refusedDetail")} />
                            </div>
                          )}
                        </Row>
                        <Separator className="my-6" />
                        <Row cols={1}>
                          <div><Label>Any medical issues requiring treatment?</Label><Controller control={control} name="hasMedicalIssues" render={({ field }) => (<Select onValueChange={field.onChange} value={field.value}><SelectTrigger className={selectTriggerClass}><SelectValue /></SelectTrigger><SelectContent className={selectContentClass}><SelectItem value="no">No</SelectItem><SelectItem value="yes">Yes</SelectItem></SelectContent></Select>)} /></div>
                          <div><Label>Any criminal record or convictions?</Label><Controller control={control} name="hasCriminalRecord" render={({ field }) => (<Select onValueChange={field.onChange} value={field.value}><SelectTrigger className={selectTriggerClass}><SelectValue /></SelectTrigger><SelectContent className={selectContentClass}><SelectItem value="no">No</SelectItem><SelectItem value="yes">Yes</SelectItem></SelectContent></Select>)} /></div>
                        </Row>

                      </div>
                    )}

                    {step === 9 && (
                      <div>

                        <Row cols={1}>
                          <div className="flex items-center gap-2">
                            <Checkbox id="agree" {...register("agree")} />
                            <Label htmlFor="agree">I declare that the information provided is true and correct.</Label>
                          </div>
                          <div>
                            <Label>Date</Label>
                            <Input type="date" {...register("date")} />
                          </div>
                        </Row>
                      </div>
                    )}

                    {step === 10 && (
                      <div className="space-y-6">
                        <ReviewSection title={steps[0].title} onEdit={() => setStep(0)}>
                          <dl><DataPair label="Full Name" value={w.fullName} /><DataPair label="Date of Birth" value={w.dob} /><DataPair label="Gender" value={w.gender} /><DataPair label="Nationality" value={w.nationality} /><DataPair label="Passport" value={w.passport} /><DataPair label="Email" value={w.email} /><DataPair label="Phone" value={w.phone} /><DataPair label="Address" value={w.address} /></dl>
                        </ReviewSection>
                        <ReviewSection title={steps[1].title} onEdit={() => setStep(1)}>
                          <dl><DataPair label="Highest Education" value={w.highest} /><DataPair label="English Waiver for Admission" value={w.admissionEnglishWaiver} /><DataPair label="Backlogs" value={w.backlogs} /><DataPair label="Previously Studied in AU" value={w.studiedAU} /></dl>
                        </ReviewSection>
                        <ReviewSection title={steps[2].title} onEdit={() => setStep(2)}>
                          <dl><DataPair label="Has Work Experience" value={w.hasExperience} /><DataPair label="Has Study Gaps" value={w.hasGap} /><DataPair label="Gap Explanation" value={w.gapExplain} /></dl>
                          {w.experiences?.map((exp, i) => (<div key={i} className="mt-4 p-3 border rounded-lg bg-slate-50 dark:bg-slate-900"><h4 className="font-semibold text-sm mb-2">Experience #{i + 1}</h4><dl><DataPair label="Job Title" value={exp.title} /><DataPair label="Employer" value={exp.employer} /><DataPair label="From" value={exp.from} /><DataPair label="To" value={exp.to} /></dl></div>))}
                        </ReviewSection>
                        <ReviewSection title={steps[3].title} onEdit={() => setStep(3)}>
                          {w.tests?.map((t, i) => (<div key={i} className="mt-4 p-3 border rounded-lg bg-slate-50 dark:bg-slate-900"><h4 className="font-semibold text-sm mb-2">Test #{i + 1}</h4><dl><DataPair label="Test" value={t.test} /><DataPair label="Overall" value={t.overall} /><DataPair label="Date" value={t.testDate} /></dl></div>))}
                        </ReviewSection>
                        <ReviewSection title={steps[4].title} onEdit={() => setStep(4)}>
                          <dl><DataPair label="Course Level" value={w.level} /><DataPair label="Course Name" value={w.courseName} /><DataPair label="Institution" value={w.institution} /><DataPair label="Campus" value={w.campus} /><DataPair label="Start Date" value={w.startDate} /></dl>
                        </ReviewSection>
                        <ReviewSection title={steps[5].title} onEdit={() => setStep(5)}>
                          <SOPPreview data={w} />
                        </ReviewSection>
                        <ReviewSection title={steps[6].title} onEdit={() => setStep(6)}>
                          <dl><DataPair label="Funding Sources" value={w.funding} /><DataPair label="Total Funds (AUD)" value={w.totalFunds} /></dl>
                          {w.sponsors?.map((s, i) => (<div key={i} className="mt-4 p-3 border rounded-lg bg-slate-50 dark:bg-slate-900"><h4 className="font-semibold text-sm mb-2">Sponsor #{i + 1}</h4><dl><DataPair label="Name" value={s.name} /><DataPair label="Relation" value={s.relation} /><DataPair label="Occupation" value={s.occupation} /><DataPair label="Income (INR)" value={s.annualIncomeINR} /></dl></div>))}
                        </ReviewSection>
                        <ReviewSection title={steps[7].title} onEdit={() => setStep(7)}>
                          <dl><DataPair label="Relatives in Australia" value={w.relativesInAU} /></dl>
                        </ReviewSection>
                        <ReviewSection title={steps[8].title} onEdit={() => setStep(8)}>
                          <dl><DataPair label="Marital Status" value={w.maritalStatus} /><DataPair label="Applied for AU Visa Before" value={w.appliedAU} /><DataPair label="Visa Refused Anywhere" value={w.refusedAnywhere} /></dl>
                        </ReviewSection>

                        <div className="rounded-xl border p-3 bg-slate-50 dark:bg-slate-900/40">
                          <div className="text-sm">
                            <div className="font-medium mb-2 text-slate-700 dark:text-slate-200">Risk Flags</div>
                            {riskFlags.length ? (
                              <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                                {riskFlags.map((f, i) => <li key={i} dangerouslySetInnerHTML={{ __html: f }} />)}
                              </ul>
                            ) : (
                              <p className="text-slate-600 dark:text-slate-300">No risk flags detected based on current inputs.</p>
                            )}
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-center gap-2">
                          <Button
                            onClick={handleStartPrep}
                            disabled={isSaving}
                            className="px-8 py-4 h-10 bg-indigo-500 text-xl "
                          >
                            {isSaving ? (
                              <>
                                <svg className="animate-spin h-6 w-6 mr-2" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Saving Application...
                              </>
                            ) : (
                              <>
                                <Play className="h-6 w-6 mr-2" />
                                Start AI Prep
                              </>
                            )}
                          </Button>
                          {/* <Button variant="secondary" onClick={downloadDocx}><Download className="h-4 w-4 mr-2" /> Download as DOCX</Button> */}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </CardContent>

              <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-4">
                <Button variant="ghost" onClick={prev} disabled={step === 0} className="w-full sm:w-auto">Previous</Button>
                <div className="flex items-center gap-2 justify-between sm:justify-end w-full sm:w-auto">
                  <Badge variant="outline">{Math.round((completed.size / (steps.length - 1)) * 100)}% Complete</Badge>
                  {step < steps.length - 1 && <Button onClick={next} className="flex-1 sm:flex-none">Save & Continue</Button>}
                </div>
              </CardFooter>
            </Card>

            <SmartSuggestions step={step} />

          </div>
        </div>
      </div>

      {/* Authentication Modals */}
      {showAuthModal && authModalType === 'signup' && (
        <LoginSignupModal
          onAuthSuccess={handleAuthSuccess}
          onSwitchToLogin={handleSwitchToLogin}
          onClose={() => setShowAuthModal(false)}
        />
      )}
      {showAuthModal && authModalType === 'login' && (
        <AuthGateModal
          onAuthSuccess={handleAuthSuccess}
          onSwitchToSignup={handleSwitchToSignup}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </div>
  );
}

export default SetupForm;