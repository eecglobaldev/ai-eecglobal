// studentApplicationService.ts
import { db, storage } from "@/features/shared/lib/firebase";
import {
  doc,
  setDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

// ==================== TypeScript Interfaces ====================

export interface PersonalInfo {
  fullName: string;
  dob: string;
  gender: "Male" | "Female" | "Other";
  nationality: string;
  passport: string;
  email: string;
  phone: string;
  address: string;
}

export interface DiplomaInfo {
  name?: string;
  institute?: string;
  duration?: string;
  year?: string;
  grade?: string;
}

export interface BachelorsInfo {
  name?: string;
  university?: string;
  year?: string;
  duration?: string;
  cgpa?: string;
  medium?: string;
}

export interface MastersInfo {
  name?: string;
  university?: string;
  year?: string;
  cgpa?: string;
}

export interface PhDInfo {
  name?: string;
  university?: string;
  year?: string;
}

export interface AustraliaStudyDetails {
  institution?: string;
  period?: string;
  reason?: string;
}

export interface AcademicsInfo {
  highest: "12th" | "Diploma" | "Bachelors" | "Masters" | "PhD";
  schoolName?: string;
  admissionEnglishWaiver?: boolean;
  class10Board: string;
  class10Year: string;
  class10Grade: string;
  class12Board: string;
  class12Year: string;
  class12Stream?: string;
  class12Grade: string;
  backlogs?: string;
  diploma: DiplomaInfo;
  bachelors: BachelorsInfo;
  masters: MastersInfo;
  phd: PhDInfo;
  studiedAU: "yes" | "no";
  auDetails: AustraliaStudyDetails;
}

export interface WorkExperience {
  title: string;
  employer: string;
  location?: string;
  from: string;
  to: string;
  duties?: string;
  salary?: string;
  selfEmployed?: boolean;
}

export interface ExperienceInfo {
  hasExperience: "yes" | "no";
  experiences: WorkExperience[];
  hasGap: "yes" | "no";
  gapExplain?: string;
}

export interface EnglishTest {
  test: "IELTS" | "TOEFL iBT" | "PTE Academic" | "CAE" | "OET" | "GMAT" | "Not yet";
  overall?: string;
  testDate?: string;
  planned?: string;
  // IELTS
  ieltsL?: string;
  ieltsR?: string;
  ieltsW?: string;
  ieltsS?: string;
  // TOEFL
  toeflR?: string;
  toeflL?: string;
  toeflS?: string;
  toeflW?: string;
  // PTE
  pteL?: string;
  pteR?: string;
  pteW?: string;
  pteS?: string;
  // CAE
  caeR?: string;
  caeW?: string;
  caeL?: string;
  caeS?: string;
  // OET
  oetL?: string;
  oetR?: string;
  oetW?: string;
  oetS?: string;
  // GMAT
  gmatQ?: string;
  gmatV?: string;
  gmatDI?: string;
}

export interface EnglishProficiency {
  tests: EnglishTest[];
  moiLetter?: boolean;
}

export interface CourseSelection {
  level: "Diploma" | "Bachelors" | "Masters" | "PhD";
  courseName: string;
  institution: string;
  cricos?: string;
  campus: string;
  startDate: string;
  duration: string;
  packaged: "yes" | "no";
  packageDetails?: string;
  hasCOE: "Yes" | "No" | "Pending";
  coeId?: string;
  tuitionFirstYearAUD?: string;
  livingCostYearAUD?: string;
  oshcType?: "Single" | "Couple" | "Family";
  oshcProvider?: "Bupa" | "Allianz" | "Medibank" | "nib" | "ahm" | "Other";
  oshcCostAUD?: string;
  travelCostAUD?: string;
  courseUnderstanding: string;
  livingUnderstanding: string;
}

export interface SOPInfo {
  whyAustralia: string;
  whyThisInstitution: string;
  whyNotIndia: string;
  careerBenefit: string;
  afterStudyPlan: string;
  expectedSalaryInIndia?: string;
  targetRoles?: string;
  extraMotivation?: string;
  previewText?: string;
}

export interface LoanDetails {
  amount?: string;
  status?: "Applied" | "Sanctioned" | "Disbursed" | "";
  bank?: string;
}

export interface ScholarshipDetails {
  name?: string;
  coverage?: string;
}

export interface OtherFundingDetails {
  details?: string;
  amount?: string;
}

export interface Sponsor {
  name: string;
  relation: string;
  occupation: string;
  annualIncomeINR: string;
  itrYears?: string;
}

export interface FinancialInfo {
  funding: Array<"Self" | "Family" | "Loan" | "Scholarship" | "Other">;
  sponsors: Sponsor[];
  loan: LoanDetails;
  scholarship: ScholarshipDetails;
  otherFunding: OtherFundingDetails;
  totalFunds: string;
  livingSponsor: string;
  awareCosts?: boolean;
  tuitionDepositPaid?: boolean;
  tuitionDepositAmount?: string;
  receiptNo?: string;
}

export interface Sibling {
  name: string;
  age: string;
  status: string;
}

export interface Dependent {
  name: string;
  relation?: "Spouse" | "Child" | "Other";
  dob: string;
  accompany: "yes" | "no";
  schoolingPlan?: string;
}

export interface RelativeDetail {
  name?: string;
  relation?: string;
  city?: string;
  status?: string;
}

export interface FamilyInfo {
  fatherName: string;
  fatherOcc: string;
  fatherIncome: string;
  motherName: string;
  motherOcc: string;
  motherIncome: string;
  siblings: Sibling[];
  dependents: Dependent[];
  relativesInAU: "yes" | "no";
  relativeDetail: RelativeDetail;
  ownAsset: "yes" | "no";
  assetDetail?: string;
  otherTies?: string;
  accommodationPlan?: "On-campus" | "Private rental" | "With relatives" | "Homestay" | "Not decided";
  intendedAddress?: string;
}

export interface ImmigrationInfo {
  maritalStatus: "Single" | "Married" | "Divorced" | "Widowed";
  dateOfMarriage?: string;
  spouseName?: string;
  spouseOccupation?: string;
  spouseHighestQualification?: string;
  spouseExperience?: string;
  spouseAccompany?: "yes" | "no";
  childrenAccompany?: "yes" | "no";
  numberOfChildren?: string;
  childrenAges?: string;
  traveledAbroad: "yes" | "no";
  travelHistory?: string;
  appliedAU: "yes" | "no";
  auTypeYear?: string;
  auOutcome?: "Approved" | "Refused" | "Withdrawn";
  auReason?: string;
  refusedAnywhere: "yes" | "no";
  refusedDetail?: string;
  breachedVisa: "yes" | "no";
  breachDetail?: string;
  hasMedicalIssues: "yes" | "no";
  hasCriminalRecord: "yes" | "no";
}

export interface DeclarationInfo {
  extraInfo?: string;
  agree: boolean;
  date: string;
  counsellorName?: string;
  counsellorNotes?: string;
}

export interface FullApplicationData {
  personal: PersonalInfo;
  academics: AcademicsInfo;
  experience: ExperienceInfo;
  englishProficiency: EnglishProficiency;
  courseSelection: CourseSelection;
  sop: SOPInfo;
  financial: FinancialInfo;
  family: FamilyInfo;
  immigration: ImmigrationInfo;
  declaration: DeclarationInfo;
}

export interface SaveApplicationResponse {
  success: boolean;
  message?: string;
  error?: string;
  sopFileName?: string; // e.g., "sop_1732100000000"
  timestamp?: number;
}

// ==================== Firebase Storage Helper ====================

/**
 * Upload a file to Firebase Storage and return its download URL
 * @param file - The file to upload (File or Blob)
 * @param path - The storage path (e.g., "student_sop/userId/sop_timestamp.json")
 * @returns Download URL of the uploaded file
 */
export const uploadToStorage = async (
  file: File | Blob,
  path: string
): Promise<string> => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file to storage:", error);
    throw new Error(
      `Failed to upload file: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};

// ==================== Main Save Function ====================

/**
 * Save complete student application data with file uploads
 * @param userId - The user's Firestore document ID
 * @param data - Complete application data
 * @param sopFile - Optional SOP file (PDF, DOCX, TXT, JSON)
 * @param audioFile - Optional audio recording file
 * @param transcriptFile - Optional transcript file
 * @returns Response object with success status and message
 */
export const saveStudentApplication = async (
  userId: string,
  data: FullApplicationData,
  sopFile?: File,
  audioFile?: File,
  transcriptFile?: File
): Promise<SaveApplicationResponse> => {
  try {
    const timestamp = Date.now();
    let sopFileUrl = "";
    let audioRecordingUrl = "";
    let transcriptUrl = "";

    // ========== STEP 1: Upload Files to Firebase Storage ==========

    if (sopFile) {
      const sopPath = `student_sop/${userId}/sop_${timestamp}.${sopFile.name.split('.').pop()}`;
      sopFileUrl = await uploadToStorage(sopFile, sopPath);
    }

    if (audioFile) {
      const audioPath = `student_audio/${userId}/audio_${timestamp}.${audioFile.name.split('.').pop()}`;
      audioRecordingUrl = await uploadToStorage(audioFile, audioPath);
    }

    if (transcriptFile) {
      const transcriptPath = `student_transcripts/${userId}/transcript_${timestamp}.json`;
      transcriptUrl = await uploadToStorage(transcriptFile, transcriptPath);
    }

    // ========== STEP 2: Save Application Data to Subcollection ==========

    const applicationRef = doc(
      db,
      "uk_users",
      userId,
      "application",
      "full_application_data"
    );

    // Helper function to remove undefined values recursively
    const removeUndefined = (obj: any): any => {
      if (obj === null || obj === undefined) {
        return null;
      }
      
      if (Array.isArray(obj)) {
        return obj.map(item => removeUndefined(item));
      }
      
      if (typeof obj === 'object') {
        const cleaned: any = {};
        for (const key in obj) {
          if (obj[key] !== undefined) {
            cleaned[key] = removeUndefined(obj[key]);
          }
        }
        return cleaned;
      }
      
      return obj;
    };

    // Clean the data before saving (remove undefined values)
    const cleanedData = removeUndefined({
      ...data,
      sopFileUrl,
      audioRecordingUrl,
      transcriptUrl,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    });

    await setDoc(applicationRef, cleanedData);

    // ========== STEP 3: Save SOP File Metadata to Subcollection ==========

    if (sopFileUrl) {
      const sopMetadataRef = doc(
        db,
        "uk_users",
        userId,
        "sop_files",
        `sop_${timestamp}`
      );

      await setDoc(sopMetadataRef, {
        url: sopFileUrl,
        fileName: sopFile?.name || "sop_file",
        fileSize: sopFile?.size || 0,
        fileType: sopFile?.type || "unknown",
        createdAt: serverTimestamp(),
      });
    }

    // ========== STEP 4: Save Audio File Metadata to Subcollection ==========

    if (audioRecordingUrl) {
      const audioMetadataRef = doc(
        db,
        "uk_users",
        userId,
        "audio",
        `audio_${timestamp}`
      );

      await setDoc(audioMetadataRef, {
        url: audioRecordingUrl,
        fileName: audioFile?.name || "audio_recording",
        fileSize: audioFile?.size || 0,
        fileType: audioFile?.type || "unknown",
        createdAt: serverTimestamp(),
      });
    }

    // ========== STEP 5: Save Transcript File Metadata to Subcollection ==========

    if (transcriptUrl) {
      const transcriptMetadataRef = doc(
        db,
        "uk_users",
        userId,
        "transcripts",
        `transcript_${timestamp}`
      );

      await setDoc(transcriptMetadataRef, {
        url: transcriptUrl,
        fileName: transcriptFile?.name || "transcript",
        fileSize: transcriptFile?.size || 0,
        fileType: transcriptFile?.type || "unknown",
        createdAt: serverTimestamp(),
      });
    }

    return {
      success: true,
      message: "Application data saved successfully",
      sopFileName: `sop_${timestamp}`, // Return SOP filename for linking
      timestamp: timestamp,
    };
  } catch (error) {
    console.error("Error saving student application:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

// ==================== Helper: Convert FormData to FullApplicationData ====================

/**
 * Transform SetupForm FormData to FullApplicationData structure
 * This helper ensures compatibility with the existing form structure
 */
export const transformFormDataToApplication = (
  formData: any
): FullApplicationData => {
  return {
    personal: {
      fullName: formData.fullName || "",
      dob: formData.dob || "",
      gender: formData.gender || "Other",
      nationality: formData.nationality || "India",
      passport: formData.passport || "",
      email: formData.email || "",
      phone: formData.phone || "",
      address: formData.address || "",
    },
    academics: {
      highest: formData.highest || "12th",
      schoolName: formData.schoolName,
      admissionEnglishWaiver: formData.admissionEnglishWaiver,
      class10Board: formData.class10Board || "",
      class10Year: formData.class10Year || "",
      class10Grade: formData.class10Grade || "",
      class12Board: formData.class12Board || "",
      class12Year: formData.class12Year || "",
      class12Stream: formData.class12Stream,
      class12Grade: formData.class12Grade || "",
      backlogs: formData.backlogs,
      diploma: formData.diploma || {},
      bachelors: formData.bachelors || {},
      masters: formData.masters || {},
      phd: formData.phd || {},
      studiedAU: formData.studiedAU || "no",
      auDetails: formData.auDetails || {},
    },
    experience: {
      hasExperience: formData.hasExperience || "no",
      experiences: formData.experiences || [],
      hasGap: formData.hasGap || "no",
      gapExplain: formData.gapExplain,
    },
    englishProficiency: {
      tests: formData.tests || [],
      moiLetter: formData.moiLetter,
    },
    courseSelection: {
      level: formData.level || "Bachelors",
      courseName: formData.courseName || "",
      institution: formData.institution || "",
      cricos: formData.cricos,
      campus: formData.campus || "",
      startDate: formData.startDate || "",
      duration: formData.duration || "",
      packaged: formData.packaged || "no",
      packageDetails: formData.packageDetails,
      hasCOE: formData.hasCOE || "Pending",
      coeId: formData.coeId,
      tuitionFirstYearAUD: formData.tuitionFirstYearAUD,
      livingCostYearAUD: formData.livingCostYearAUD,
      oshcType: formData.oshcType,
      oshcProvider: formData.oshcProvider,
      oshcCostAUD: formData.oshcCostAUD,
      travelCostAUD: formData.travelCostAUD,
      courseUnderstanding: formData.courseUnderstanding || "",
      livingUnderstanding: formData.livingUnderstanding || "",
    },
    sop: {
      whyAustralia: formData.whyAustralia || "",
      whyThisInstitution: formData.whyThisInstitution || "",
      whyNotIndia: formData.whyNotIndia || "",
      careerBenefit: formData.careerBenefit || "",
      afterStudyPlan: formData.afterStudyPlan || "",
      expectedSalaryInIndia: formData.expectedSalaryInIndia,
      targetRoles: formData.targetRoles,
      extraMotivation: formData.extraMotivation,
      previewText: `${formData.whyAustralia || ""}\n\n${formData.whyThisInstitution || ""}\n\n${formData.whyNotIndia || ""}`,
    },
    financial: {
      funding: formData.funding || [],
      sponsors: formData.sponsors || [],
      loan: formData.loan || {},
      scholarship: formData.scholarship || {},
      otherFunding: formData.otherFunding || {},
      totalFunds: formData.totalFunds || "",
      livingSponsor: formData.livingSponsor || "",
      awareCosts: formData.awareCosts,
      tuitionDepositPaid: formData.tuitionDepositPaid,
      tuitionDepositAmount: formData.tuitionDepositAmount,
      receiptNo: formData.receiptNo,
    },
    family: {
      fatherName: formData.fatherName || "",
      fatherOcc: formData.fatherOcc || "",
      fatherIncome: formData.fatherIncome || "",
      motherName: formData.motherName || "",
      motherOcc: formData.motherOcc || "",
      motherIncome: formData.motherIncome || "",
      siblings: formData.siblings || [],
      dependents: formData.dependents || [],
      relativesInAU: formData.relativesInAU || "no",
      relativeDetail: formData.relativeDetail || {},
      ownAsset: formData.ownAsset || "no",
      assetDetail: formData.assetDetail,
      otherTies: formData.otherTies,
      accommodationPlan: formData.accommodationPlan,
      intendedAddress: formData.intendedAddress,
    },
    immigration: {
      maritalStatus: formData.maritalStatus || "Single",
      dateOfMarriage: formData.dateOfMarriage,
      spouseName: formData.spouseName,
      spouseOccupation: formData.spouseOccupation,
      spouseHighestQualification: formData.spouseHighestQualification,
      spouseExperience: formData.spouseExperience,
      spouseAccompany: formData.spouseAccompany,
      childrenAccompany: formData.childrenAccompany,
      numberOfChildren: formData.numberOfChildren,
      childrenAges: formData.childrenAges,
      traveledAbroad: formData.traveledAbroad || "no",
      travelHistory: formData.travelHistory,
      appliedAU: formData.appliedAU || "no",
      auTypeYear: formData.auTypeYear,
      auOutcome: formData.auOutcome,
      auReason: formData.auReason,
      refusedAnywhere: formData.refusedAnywhere || "no",
      refusedDetail: formData.refusedDetail,
      breachedVisa: formData.breachedVisa || "no",
      breachDetail: formData.breachDetail,
      hasMedicalIssues: formData.hasMedicalIssues || "no",
      hasCriminalRecord: formData.hasCriminalRecord || "no",
    },
    declaration: {
      extraInfo: formData.extraInfo,
      agree: formData.agree || false,
      date: formData.date || new Date().toISOString().split('T')[0],
      counsellorName: formData.counsellorName,
      counsellorNotes: formData.counsellorNotes,
    },
  };
};

// ==================== Additional Helper Functions ====================

/**
 * Create a JSON Blob from application data for storage
 */
export const createApplicationJSONBlob = (
  data: FullApplicationData
): Blob => {
  const jsonString = JSON.stringify(data, null, 2);
  return new Blob([jsonString], { type: "application/json" });
};

/**
 * Create a transcript JSON Blob from text
 */
export const createTranscriptBlob = (transcriptText: string): Blob => {
  const transcriptData = {
    transcript: transcriptText,
    createdAt: new Date().toISOString(),
  };
  const jsonString = JSON.stringify(transcriptData, null, 2);
  return new Blob([jsonString], { type: "application/json" });
};

/**
 * Retrieve user's application data
 */
export const getUserApplication = async (userId: string) => {
  try {
    const applicationRef = doc(
      db,
      "uk_users",
      userId,
      "application",
      "full_application_data"
    );

    const applicationSnapshot = await import("firebase/firestore").then(
      (mod) => mod.getDoc(applicationRef)
    );

    if (applicationSnapshot.exists()) {
      return {
        success: true,
        data: applicationSnapshot.data() as FullApplicationData & {
          sopFileUrl?: string;
          audioRecordingUrl?: string;
          transcriptUrl?: string;
          createdAt?: Timestamp;
          updatedAt?: Timestamp;
        },
      };
    } else {
      return {
        success: false,
        error: "No application data found",
      };
    }
  } catch (error) {
    console.error("Error retrieving application data:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

