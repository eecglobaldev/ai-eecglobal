/**
 * 📝 AI Prep Data Service
 * 
 * This service handles saving AI-generated interview prep content
 * (key talking points, questions, guidance, practice history) to Firebase.
 */

import { db, storage } from "../../shared/lib/firebase";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  getDoc,
  writeBatch,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import type { PrepContent, HistoryItem } from '../types';

// ==================== Interfaces ====================

export interface SavePrepDataParams {
  userId: string;
  prepContent: PrepContent;
  history?: HistoryItem[];
  profileSummary?: string;
  sopFileName?: string; // Link to SOP file (e.g., "sop_1732100000000")
}

export interface PrepDataSaveResult {
  success: boolean;
  prepDataId?: string;
  error?: string;
}

// ==================== Helper Functions ====================

/**
 * Create a JSON blob for key talking points only
 */
const createKeyTalkingPointsBlob = (prepContent: PrepContent): Blob => {
  // Flatten questions from all sections
  const allQuestions = prepContent.sections.flatMap(s => s.questions);

  const data = {
    keyTalkingPoints: prepContent.keyTalkingPoints,
    sections: prepContent.sections.map(s => ({
      title: s.title,
      questionTexts: s.questions.map(q => q.question),
      questionCount: s.questions.length,
    })),
    questionTexts: allQuestions.map(q => q.question),
    questionCount: allQuestions.length,
    generatedAt: new Date().toISOString(),
  };

  return new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
};

/**
 * Create a JSON blob for a single practice attempt
 */
const createPracticeAttemptBlob = (historyItem: HistoryItem): Blob => {
  const data = {
    questionId: historyItem.questionId,
    question: historyItem.question,
    transcript: historyItem.transcript,
    feedback: historyItem.feedback,
    score: historyItem.score,
    timestamp: historyItem.timestamp,
    attemptId: historyItem.id,
    audioUrl: historyItem.audioUrl ?? null,
    audioDurationSeconds: historyItem.audioDurationSeconds ?? null,
    savedAt: new Date().toISOString(),
  };

  return new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
};

/**
 * Upload key talking points to Firebase Storage
 */
const uploadKeyTalkingPointsToStorage = async (
  userId: string,
  keyPointsBlob: Blob,
  timestamp: number
): Promise<string> => {
  const fileName = `key_talking_points_${timestamp}.json`;
  const storageRef = ref(storage, `student_prep_data/${userId}/${fileName}`);

  await uploadBytes(storageRef, keyPointsBlob);
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
};

/**
 * Upload a single practice attempt to Firebase Storage
 */
const uploadPracticeAttemptToStorage = async (
  userId: string,
  attemptBlob: Blob,
  attemptId: number
): Promise<string> => {
  const fileName = `practice_attempt_${attemptId}.json`;
  const storageRef = ref(storage, `student_prep_data/${userId}/${fileName}`);

  await uploadBytes(storageRef, attemptBlob);
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
};

/**
 * Remove undefined values recursively (Firestore doesn't accept undefined)
 */
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

// ==================== Main Save Function ====================

/**
 * Save AI-generated prep content to Firebase
 * 
 * Saves:
 * 1. Full prep data JSON to Storage
 * 2. Metadata to Firestore subcollection
 * 3. Individual practice history items
 * 
 * @param params - Save parameters
 * @returns Result with success status and prepDataId
 */
export const savePrepData = async (
  params: SavePrepDataParams
): Promise<PrepDataSaveResult> => {
  const { userId, prepContent, profileSummary, sopFileName } = params;

  try {
    const timestamp = Date.now();

    // ========== STEP 1: Upload ONLY Key Talking Points to Storage ==========
    const keyPointsBlob = createKeyTalkingPointsBlob(prepContent);
    const keyPointsUrl = await uploadKeyTalkingPointsToStorage(userId, keyPointsBlob, timestamp);

    // ========== STEP 2: Save metadata to Firestore ==========
    const prepDataRef = doc(
      db,
      "usa_users",
      userId,
      "prep_data",
      `prep_${timestamp}`
    );

    // Flatten questions from all sections to get total count
    const allQuestions = prepContent.sections.flatMap(s => s.questions);

    const prepDataMetadata = removeUndefined({
      keyTalkingPointsUrl: keyPointsUrl,
      questionCount: allQuestions.length,
      profileSummary: profileSummary || null,
      keyTalkingPointsPreview: prepContent.keyTalkingPoints.substring(0, 500),
      sopFileName: sopFileName || null, // Link to SOP file (e.g., "sop_1732100000000")
      createdAt: serverTimestamp(),
    });

    await setDoc(prepDataRef, prepDataMetadata);

    return {
      success: true,
      prepDataId: `prep_${timestamp}`,
    };

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

// ==================== Retrieve Functions ====================

/**
 * Get all prep data for a user
 */
export const getUserPrepData = async (userId: string) => {
  try {
    const prepDataRef = collection(db, "usa_users", userId, "prep_data");
    const snapshot = await getDocs(prepDataRef);

    if (snapshot.empty) {
      return null;
    }

    const prepDataList = snapshot.docs.map(doc => {
      const data = doc.data() as any;
      return {
        id: doc.id,
        keyTalkingPointsUrl: data.keyTalkingPointsUrl,
        questionCount: data.questionCount,
        profileSummary: data.profileSummary,
        keyTalkingPointsPreview: data.keyTalkingPointsPreview,
        sopFileName: data.sopFileName,
        createdAt: data.createdAt,
      };
    });

    return prepDataList;
  } catch (error) {
    console.error("Error fetching prep data:", error);
    return null;
  }
};

/**
 * Get specific prep data by ID
 */
export const getPrepDataById = async (userId: string, prepDataId: string) => {
  try {
    const prepDataRef = doc(db, "usa_users", userId, "prep_data", prepDataId);
    const snapshot = await getDoc(prepDataRef);

    if (!snapshot.exists()) {
      return null;
    }

    const data = snapshot.data() as any;
    return {
      id: snapshot.id,
      keyTalkingPointsUrl: data.keyTalkingPointsUrl,
      questionCount: data.questionCount,
      profileSummary: data.profileSummary,
      keyTalkingPointsPreview: data.keyTalkingPointsPreview,
      sopFileName: data.sopFileName,
      createdAt: data.createdAt,
    };
  } catch (error) {
    console.error("Error fetching prep data by ID:", error);
    return null;
  }
};

/**
 * Get practice history for a user
 */
export const getUserPracticeHistory = async (userId: string, prepDataId?: string) => {
  try {
    const historyRef = collection(db, "usa_users", userId, "practice_history");

    let q;
    if (prepDataId) {
      q = query(historyRef, where("prepDataId", "==", prepDataId));
    } else {
      q = historyRef;
    }

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return [];
    }

    const historyList = snapshot.docs.map(doc => {
      const data = doc.data() as any;
      return {
        id: doc.id,
        prepDataId: data.prepDataId,
        attemptId: data.attemptId,
        attemptUrl: data.attemptUrl,
        questionId: data.questionId,
        question: data.question,
        transcript: data.transcript,
        feedback: data.feedback,
        score: data.score,
        timestamp: data.timestamp,
        createdAt: data.createdAt,
      };
    });

    return historyList;
  } catch (error) {
    console.error("Error fetching practice history:", error);
    return [];
  }
};

// ==================== Update Functions ====================

/**
 * Add a single practice history item to Firebase Storage + Firestore
 * (Called after user clicks "Submit for Feedback")
 */
export const addPracticeHistoryItem = async (
  userId: string,
  prepDataId: string,
  historyItem: HistoryItem
): Promise<boolean> => {
  try {
    // ========== STEP 1: Upload practice attempt to Firebase Storage ==========
    const attemptBlob = createPracticeAttemptBlob(historyItem);
    const attemptUrl = await uploadPracticeAttemptToStorage(userId, attemptBlob, historyItem.id);

    // ========== STEP 2: Save metadata + URL to Firestore ==========
    const practiceHistoryRef = collection(
      db,
      "usa_users",
      userId,
      "practice_history"
    );

    const historyData = removeUndefined({
      prepDataId,
      attemptId: historyItem.id,
      attemptUrl: attemptUrl, // Storage URL
      audioUrl: historyItem.audioUrl,
      audioDurationSeconds: historyItem.audioDurationSeconds,
      questionId: historyItem.questionId,
      question: historyItem.question,
      transcript: historyItem.transcript,
      feedback: historyItem.feedback,
      score: historyItem.score,
      timestamp: historyItem.timestamp,
      createdAt: serverTimestamp(),
    });

    await addDoc(practiceHistoryRef, historyData);

    return true;

  } catch (error) {
    return false;
  }
};

/**
 * Clear all practice history items for a user
 */
export const clearPracticeHistory = async (userId: string): Promise<boolean> => {
  try {
    const historyRef = collection(db, "usa_users", userId, "practice_history");
    const snapshot = await getDocs(historyRef);

    if (snapshot.empty) {
      return true;
    }

    const batch = writeBatch(db);

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    return true;
  } catch (error) {
    console.error("Error clearing practice history:", error);
    return false;
  }
};

