/**
 * ========================================================
 * INTEGRATION EXAMPLE: How to use saveStudentApplication
 * ========================================================
 * 
 * This file demonstrates how to integrate the student application
 * service with your existing SetupForm.tsx component.
 * 
 * USAGE INSTRUCTIONS:
 * -------------------
 * 
 * 1. Import the required functions in your component:
 * 
 *    import {
 *      saveStudentApplication,
 *      transformFormDataToApplication,
 *      createApplicationJSONBlob,
 *      createTranscriptBlob
 *    } from './services/studentApplicationService';
 *    import { getUserIdByEmail } from './services/userService';
 * 
 * 2. After the user completes the form (in handleStartPrep or similar):
 * 
 *    const handleSaveApplication = async () => {
 *      try {
 *        // Get the user's email from localStorage
 *        const userEmail = localStorage.getItem('f1VisaUserEmail');
 *        if (!userEmail) {
 *          showModal("Please log in to save your application");
 *          return;
 *        }
 * 
 *        // Get the user's Firestore document ID
 *        const userId = await getUserIdByEmail(userEmail);
 *        if (!userId) {
 *          showModal("User not found. Please log in again.");
 *          return;
 *        }
 * 
 *        // Get form data
 *        const formData = form.getValues();
 *        
 *        // Transform to application structure
 *        const applicationData = transformFormDataToApplication(formData);
 * 
 *        // Optional: Create SOP JSON file
 *        const sopBlob = createApplicationJSONBlob(applicationData);
 *        const sopFile = new File([sopBlob], `sop_${Date.now()}.json`, { 
 *          type: 'application/json' 
 *        });
 * 
 *        // Optional: If you have audio/transcript
 *        // const audioFile = ... (from your recording component)
 *        // const transcriptBlob = createTranscriptBlob(yourTranscriptText);
 *        // const transcriptFile = new File([transcriptBlob], `transcript_${Date.now()}.json`, { 
 *        //   type: 'application/json' 
 *        // });
 * 
 *        // Save to Firebase
 *        const result = await saveStudentApplication(
 *          userId,
 *          applicationData,
 *          sopFile,
 *          // audioFile,      // Optional
 *          // transcriptFile  // Optional
 *        );
 * 
 *        if (result.success) {
 *          showModal("Application saved successfully!");
 *          // Continue with prep generation
 *          const profile = mapFormDataToProfile(formData, noosrDataset);
 *          onFormComplete(profile);
 *        } else {
 *          showModal(`Failed to save application: ${result.error}`);
 *        }
 * 
 *      } catch (error) {
 *        console.error("Error saving application:", error);
 *        showModal("An error occurred while saving your application");
 *      }
 *    };
 * 
 * 3. Update your "Start AI Prep" button handler to call this function:
 * 
 *    const handleStartPrep = async () => {
 *      const userEmail = localStorage.getItem('f1VisaUserEmail');
 *      
 *      if (!userEmail) {
 *        setAuthModalType('signup');
 *        setShowAuthModal(true);
 *        return;
 *      }
 *      
 *      // Save application before proceeding
 *      await handleSaveApplication();
 *    };
 * 
 * ========================================================
 * FIRESTORE STRUCTURE CREATED:
 * ========================================================
 * 
 * uk_users/{userId}/
 *   ├── (main user document fields)
 *   │
 *   ├── application/
 *   │   └── full_application_data
 *   │       ├── personal: { fullName, dob, gender, ... }
 *   │       ├── academics: { highest, bachelors, ... }
 *   │       ├── experience: { hasExperience, experiences, ... }
 *   │       ├── englishProficiency: { tests, ... }
 *   │       ├── courseSelection: { level, courseName, ... }
 *   │       ├── sop: { whyAustralia, ... }
 *   │       ├── financial: { funding, sponsors, ... }
 *   │       ├── family: { fatherName, ... }
 *   │       ├── immigration: { maritalStatus, ... }
 *   │       ├── declaration: { agree, date, ... }
 *   │       ├── sopFileUrl: "https://..."
 *   │       ├── audioRecordingUrl: "https://..."
 *   │       ├── transcriptUrl: "https://..."
 *   │       ├── createdAt: Timestamp
 *   │       └── updatedAt: Timestamp
 *   │
 *   ├── sop_files/
 *   │   └── sop_{timestamp}
 *   │       ├── url: "https://..."
 *   │       ├── fileName: "sop_..."
 *   │       ├── fileSize: 12345
 *   │       ├── fileType: "application/json"
 *   │       └── createdAt: Timestamp
 *   │
 *   ├── audio/
 *   │   └── audio_{timestamp}
 *   │       ├── url: "https://..."
 *   │       ├── fileName: "audio_..."
 *   │       ├── fileSize: 98765
 *   │       ├── fileType: "audio/webm"
 *   │       └── createdAt: Timestamp
 *   │
 *   └── transcripts/
 *       └── transcript_{timestamp}
 *           ├── url: "https://..."
 *           ├── fileName: "transcript_..."
 *           ├── fileSize: 4567
 *           ├── fileType: "application/json"
 *           └── createdAt: Timestamp
 * 
 * ========================================================
 * FIREBASE STORAGE STRUCTURE:
 * ========================================================
 * 
 * Storage Bucket: usa-visa-prep-c72f7.firebasestorage.app
 * 
 * student_sop/
 *   └── {userId}/
 *       ├── sop_1234567890.json
 *       ├── sop_1234567891.pdf
 *       └── sop_1234567892.docx
 * 
 * student_audio/
 *   └── {userId}/
 *       ├── audio_1234567890.mp3
 *       ├── audio_1234567891.webm
 *       └── audio_1234567892.wav
 * 
 * student_transcripts/
 *   └── {userId}/
 *       ├── transcript_1234567890.json
 *       └── transcript_1234567891.json
 * 
 * ========================================================
 */

import {
  saveStudentApplication,
  transformFormDataToApplication,
  createApplicationJSONBlob,
  createTranscriptBlob,
} from './studentApplicationService';
import { getUserIdByEmail } from './userService';

/**
 * Complete integration function - ready to use in SetupForm.tsx
 */
export const saveCompleteApplication = async (
  formData: any,
  showModal: (message: string) => void,
  setSaveProgress?: (progress: number) => void,
  audioBlob?: Blob,
  transcriptText?: string
): Promise<boolean> => {
  try {
    // Progress tracking
    if (setSaveProgress) setSaveProgress(10);

    // 1. Get authenticated user email
    const userEmail = localStorage.getItem('UkUserEmail');
    if (!userEmail) {
      showModal("Please log in to save your application");
      return false;
    }

    if (setSaveProgress) setSaveProgress(20);

    // 2. Get user ID by email
    const userId = await getUserIdByEmail(userEmail);
    if (!userId) {
      showModal("User not found. Please log in again.");
      return false;
    }

    if (setSaveProgress) setSaveProgress(30);

    // 4. Transform form data
    const applicationData = transformFormDataToApplication(formData);

    if (setSaveProgress) setSaveProgress(40);

    // 5. Prepare SOP file
    const sopBlob = createApplicationJSONBlob(applicationData);
    const sopFile = new File([sopBlob], `sop_${Date.now()}.json`, {
      type: 'application/json',
    });

    if (setSaveProgress) setSaveProgress(50);

    // 6. Prepare optional audio file
    let audioFile: File | undefined;
    if (audioBlob) {
      audioFile = new File([audioBlob], `audio_${Date.now()}.webm`, {
        type: audioBlob.type || 'audio/webm',
      });
    }

    if (setSaveProgress) setSaveProgress(60);

    // 7. Prepare optional transcript file
    let transcriptFile: File | undefined;
    if (transcriptText) {
      const transcriptBlob = createTranscriptBlob(transcriptText);
      transcriptFile = new File(
        [transcriptBlob],
        `transcript_${Date.now()}.json`,
        { type: 'application/json' }
      );
    }

    if (setSaveProgress) setSaveProgress(70);

    // 8. Save everything to Firebase (Storage + Firestore)
    const result = await saveStudentApplication(
      userId,
      applicationData,
      sopFile,
      audioFile,
      transcriptFile
    );

    if (setSaveProgress) setSaveProgress(90);

    if (result.success) {
      // Store SOP filename in localStorage for linking with prep_data
      if (result.sopFileName) {
        localStorage.setItem('lastSavedSopFileName', result.sopFileName);
      }
      
      // Silent success - don't show modal, just proceed with AI prep
      if (setSaveProgress) setSaveProgress(100);
      return true;
    } else {
      showModal(`❌ Failed to save: ${result.error}`);
      return false;
    }
  } catch (error) {
    showModal(
      `❌ Error: ${error instanceof Error ? error.message : "Unknown error"}`
    );
    return false;
  } finally {
    if (setSaveProgress) setSaveProgress(0);
  }
};

/**
 * Quick save function - saves only core data without files
 */
export const quickSaveApplication = async (
  formData: any,
  showModal: (message: string) => void
): Promise<boolean> => {
  return saveCompleteApplication(formData, showModal);
};

/**
 * Save with audio and transcript (for interview practice)
 */
export const saveWithInterviewData = async (
  formData: any,
  audioBlob: Blob,
  transcriptText: string,
  showModal: (message: string) => void,
  setSaveProgress?: (progress: number) => void
): Promise<boolean> => {
  return saveCompleteApplication(formData, showModal, setSaveProgress, audioBlob, transcriptText);
};

// Export for use in components
export { getUserIdByEmail } from './userService';
export {
  saveStudentApplication,
  transformFormDataToApplication,
  createApplicationJSONBlob,
  createTranscriptBlob,
  getUserApplication,
} from './studentApplicationService';

/**
 * ========================================================
 * QUICK START GUIDE:
 * ========================================================
 * 
 * In SetupForm.tsx, replace handleStartPrep with:
 * 
 * ```typescript
 * import { saveCompleteApplication } from '../services/integrationExample';
 * 
 * const handleStartPrep = async () => {
 *   const userEmail = localStorage.getItem('f1VisaUserEmail');
 *   
 *   if (!userEmail) {
 *     setAuthModalType('signup');
 *     setShowAuthModal(true);
 *     return;
 *   }
 *   
 *   // Get form data
 *   const formData = form.getValues();
 *   
 *   // Save application
 *   const saved = await saveCompleteApplication(formData, showModal);
 *   
 *   if (saved) {
 *     // Continue with AI prep
 *     const profile = mapFormDataToProfile(formData, noosrDataset);
 *     onFormComplete(profile);
 *   }
 * };
 * ```
 * 
 * That's it! Your application data will be automatically saved
 * to Firestore with proper structure and file uploads.
 * 
 * ========================================================
 */

