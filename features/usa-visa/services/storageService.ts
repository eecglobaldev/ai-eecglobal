
import { storage } from "./firebaseConfig";
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";

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
