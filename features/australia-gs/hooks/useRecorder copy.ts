// import { useCallback, useEffect, useRef, useState } from "react";

// interface UseRecorderOptions {
//   /**
//    * Optional callback fired after the final audio Blob is created.
//    * This is typically used to upload the recording to Firebase Storage.
//    * It is called in a fire‑and‑forget manner and MUST NOT block the UI.
//    */
//   onUpload?: (blob: Blob, mimeType: string) => Promise<void> | void;
// }

// export interface UseRecorderResult {
//   isRecording: boolean;
//   isProcessing: boolean;
//   audioBlob: Blob | null;
//   audioUrl: string | null;
//   durationSeconds: number | null;
//   error: string | null;
//   timer: string | null;
//   isBusy: boolean;
//   startRecording: () => Promise<void>;
//   stopRecording: () => void;
//   reset: () => void;
// }

// const MIME_CANDIDATES = [
//   "audio/webm;codecs=opus",
//   "audio/ogg;codecs=opus",
//   "audio/mp4",
// ];

// const chooseMimeType = (): string | undefined => {
//   if (typeof window === "undefined" || typeof MediaRecorder === "undefined") {
//     return undefined;
//   }

//   for (const candidate of MIME_CANDIDATES) {
//     if (MediaRecorder.isTypeSupported(candidate)) {
//       return candidate;
//     }
//   }

//   return undefined; // Let the browser decide
// };

// export const useRecorder = (options: UseRecorderOptions = {}): UseRecorderResult => {
//   const { onUpload } = options;

//   const [isRecording, setIsRecording] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
//   const [audioUrl, setAudioUrl] = useState<string | null>(null);
//   const [durationSeconds, setDurationSeconds] = useState<number | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [timer, setTimer] = useState<string | null>(null);

//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//   const streamRef = useRef<MediaStream | null>(null);
//   const chunksRef = useRef<Blob[]>([]);
//   const userStopRequestedRef = useRef(false);
//   const timerIntervalRef = useRef<number | null>(null);
//   const audioUrlRef = useRef<string | null>(null);
//   const currentMimeTypeRef = useRef<string | undefined>(undefined);

//   const isBusy = isRecording || isProcessing;

//   const stopTimer = () => {
//     if (timerIntervalRef.current !== null) {
//       window.clearInterval(timerIntervalRef.current);
//       timerIntervalRef.current = null;
//     }
//     setTimer(null);
//   };

//   const startTimer = () => {
//     let seconds = 0;
//     setTimer("00:00");
//     timerIntervalRef.current = window.setInterval(() => {
//       seconds += 1;
//       const mins = Math.floor(seconds / 60)
//         .toString()
//         .padStart(2, "0");
//       const secs = (seconds % 60).toString().padStart(2, "0");
//       setTimer(`${mins}:${secs}`);
//     }, 1000);
//   };

//   const computeDurationWithAudioContext = useCallback(async (blob: Blob): Promise<number | null> => {
//     if (typeof window === "undefined") return null;

//     const AnyAudioContext =
//       (window as any).AudioContext || (window as any).webkitAudioContext;

//     if (!AnyAudioContext) {
//       return null;
//     }

//     const audioContext = new AnyAudioContext();
//     try {
//       const arrayBuffer = await blob.arrayBuffer();
//       const buffer: AudioBuffer = await new Promise((resolve, reject) => {
//         audioContext.decodeAudioData(arrayBuffer, resolve, reject);
//       });
//       return Math.round(buffer.duration);
//     } catch (e) {
//       console.error("Failed to decode audio for duration:", e);
//       return null;
//     } finally {
//       audioContext.close();
//     }
//   }, []);

//   const cleanupStream = useCallback(() => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => track.stop());
//       streamRef.current = null;
//     }
//   }, []);

//   const cleanupRecorder = useCallback(() => {
//     if (mediaRecorderRef.current) {
//       try {
//         if (mediaRecorderRef.current.state !== "inactive") {
//           mediaRecorderRef.current.stop();
//         }
//       } catch {
//         // ignore
//       }
//       mediaRecorderRef.current = null;
//     }
//   }, []);

//   const revokeAudioUrl = () => {
//     if (audioUrlRef.current) {
//       URL.revokeObjectURL(audioUrlRef.current);
//       audioUrlRef.current = null;
//     }
//   };

//   const finalizeRecording = useCallback(
//     async (mimeType: string | undefined) => {
//       try {
//         setIsRecording(false);
//         stopTimer();

//         const effectiveMime = mimeType || "audio/webm";
//         const finalBlob = new Blob(chunksRef.current, { type: effectiveMime });
//         setIsProcessing(true);
//         setAudioBlob(finalBlob);

//         revokeAudioUrl();
//         const url = URL.createObjectURL(finalBlob);
//         audioUrlRef.current = url;
//         setAudioUrl(url);

//         const duration = await computeDurationWithAudioContext(finalBlob);
//         if (duration !== null) {
//           setDurationSeconds(duration);
//         }

//         if (onUpload) {
//           // Fire-and-forget, never block UI
//           Promise.resolve(onUpload(finalBlob, effectiveMime)).catch((e) => {
//             console.error("Audio upload callback failed:", e);
//           });
//         }
//       } catch (e) {
//         console.error("Failed to finalize recording:", e);
//         setError(
//           e instanceof Error
//             ? e.message
//             : "Failed to process recorded audio. Please try again."
//         );
//       } finally {
//         setIsProcessing(false);
//       }
//     },
//     [computeDurationWithAudioContext, onUpload]
//   );

//   const startMediaRecorder = useCallback(
//     (stream: MediaStream) => {
//       const mimeType = chooseMimeType();
//       currentMimeTypeRef.current = mimeType;

//       const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
//       mediaRecorderRef.current = recorder;

//       recorder.ondataavailable = (event: BlobEvent) => {
//         if (event.data && event.data.size > 0) {
//           chunksRef.current.push(event.data);
//         }
//       };

//       recorder.onstop = () => {
//         // If user requested stop → finalize; else restart segment (iOS auto-stop bug)
//         if (userStopRequestedRef.current) {
//           finalizeRecording(currentMimeTypeRef.current);
//           userStopRequestedRef.current = false;
//         } else if (streamRef.current) {
//           // Auto-stop (e.g. iOS Safari) while user still expects recording
//           try {
//             startMediaRecorder(streamRef.current);
//           } catch (error) {
//             console.error("Failed to restart MediaRecorder after auto-stop:", error);
//             setError(
//               "Recording was interrupted by the browser. Please try again."
//             );
//             setIsRecording(false);
//             stopTimer();
//           }
//         }
//       };

//       recorder.onerror = (event: MediaRecorderErrorEvent) => {
//         console.error("MediaRecorder error:", event);
//         setError("An error occurred during recording.");
//         setIsRecording(false);
//         stopTimer();
//       };

//       // Request small timeslice so chunks flush regularly (iOS auto-stop mitigation)
//       recorder.start(1000);
//     },
//     [finalizeRecording]
//   );

//   const startRecording = useCallback(async () => {
//     if (isRecording || isProcessing) return;

//     setError(null);
//     setAudioBlob(null);
//     setAudioUrl(null);
//     revokeAudioUrl();
//     setDurationSeconds(null);

//     if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
//       setError("Your browser does not support audio recording.");
//       return;
//     }

//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       streamRef.current = stream;
//       chunksRef.current = [];
//       userStopRequestedRef.current = false;

//       setIsRecording(true);
//       startTimer();
//       startMediaRecorder(stream);
//     } catch (err: any) {
//       console.error("Microphone access error:", err);
//       if (err?.name === "NotAllowedError" || err?.name === "PermissionDeniedError") {
//         setError(
//           "Microphone access denied. Please check your browser permissions and try again."
//         );
//       } else if (err?.name === "NotFoundError") {
//         setError(
//           "No microphone found. Please ensure your microphone is connected and selected as the default device."
//         );
//       } else {
//         setError(
//           "Could not start recording. Please check your microphone and browser permissions, then try again."
//         );
//       }
//       setIsRecording(false);
//       stopTimer();
//     }
//   }, [isProcessing, isRecording, startMediaRecorder]);

//   const stopRecording = useCallback(() => {
//     if (!isRecording) return;

//     userStopRequestedRef.current = true;
//     if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
//       mediaRecorderRef.current.stop();
//     }

//     // Do NOT stop stream tracks here; they are stopped only on reset/unmount
//   }, [isRecording]);

//   const reset = useCallback(() => {
//     userStopRequestedRef.current = false;
//     cleanupRecorder();
//     cleanupStream();
//     stopTimer();
//     revokeAudioUrl();

//     chunksRef.current = [];
//     setIsRecording(false);
//     setIsProcessing(false);
//     setAudioBlob(null);
//     setAudioUrl(null);
//     setDurationSeconds(null);
//     setError(null);
//   }, [cleanupRecorder, cleanupStream]);

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       reset();
//     };
//   }, [reset]);

//   return {
//     isRecording,
//     isProcessing,
//     audioBlob,
//     audioUrl,
//     durationSeconds,
//     error,
//     timer,
//     isBusy,
//     startRecording,
//     stopRecording,
//     reset,
//   };
// };


