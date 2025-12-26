import { useCallback, useEffect, useRef, useState } from "react";

interface UseRecorderOptions {
    onUpload?: (blob: Blob, mimeType: string) => Promise<void> | void;
}

export interface UseRecorderResult {
    isRecording: boolean;
    isProcessing: boolean;
    audioBlob: Blob | null;
    audioUrl: string | null;
    durationSeconds: number | null;
    error: string | null;
    timer: string | null;
    isBusy: boolean;
    startRecording: () => Promise<void>;
    stopRecording: () => void;
    reset: () => void;
}

const MIME_CANDIDATES = [
    "audio/webm;codecs=opus",
    "audio/mp4;codecs=mp4a",
    "audio/ogg;codecs=opus",
    "audio/webm"
];

const chooseMimeType = (): string | undefined => {
    if (typeof window === "undefined" || typeof MediaRecorder === "undefined") {
        return undefined;
    }
    for (const m of MIME_CANDIDATES) {
        if (MediaRecorder.isTypeSupported(m)) {
            // console.log("[MIC] Supported MIME selected:", m);
            return m;
        }
    }
    return undefined;
};

/* ----------------------------------------------
   NEW: Reliable & cross-browser duration extractor
   ---------------------------------------------- */
async function extractDuration(blob: Blob): Promise<number | null> {
    // console.log("[MIC] Extracting duration for blob… size:", blob.size);

    const AudioCtx =
        (window as any).AudioContext || (window as any).webkitAudioContext;

    if (!AudioCtx) {
        console.warn("[MIC] No AudioContext available.");
        return null;
    }

    const ctx = new AudioCtx();

    try {
        const arr = await blob.arrayBuffer();
        const buffer: AudioBuffer = await new Promise((resolve, reject) => {
            ctx.decodeAudioData(
                arr,
                resolve,
                (err: DOMException | null) => reject(err)
            );
        });

        // console.log("[MIC] decodeAudioData duration:", buffer.duration);
        return Math.round(buffer.duration);
    } catch (err) {
        console.warn("[MIC] decodeAudioData failed:", err);
    } finally {
        ctx.close();
    }

    /* ---------- Fallback using <audio> element ---------- */
    return await new Promise((resolve) => {
        try {
            const audio = document.createElement("audio");
            audio.preload = "metadata";
            audio.src = URL.createObjectURL(blob);

            audio.onloadedmetadata = () => {
                // console.log("[MIC] HTMLAudio duration:", audio.duration);
                resolve(Math.round(audio.duration));
                URL.revokeObjectURL(audio.src);
            };

            audio.onerror = () => {
                console.error("[MIC] Audio fallback failed");
                resolve(null);
            };
        } catch {
            resolve(null);
        }
    });
}

/* ---------------------------------------------- */

export const useRecorder = (options: UseRecorderOptions = {}): UseRecorderResult => {
    const { onUpload } = options;

    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [durationSeconds, setDurationSeconds] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [timer, setTimer] = useState<string | null>(null);

    const chunksRef = useRef<Blob[]>([]);
    const streamRef = useRef<MediaStream | null>(null);
    const recorderRef = useRef<MediaRecorder | null>(null);
    const audioUrlRef = useRef<string | null>(null);
    const mimeRef = useRef<string | undefined>(undefined);
    const stopRequestedRef = useRef(false);
    const timerRef = useRef<number | null>(null);

    const isBusy = isRecording || isProcessing;

    /* --------------- TIMER LOGIC ---------------- */
    const startTimer = () => {
        let seconds = 0;
        setTimer("00:00");

        timerRef.current = window.setInterval(() => {
            seconds++;
            const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
            const ss = String(seconds % 60).padStart(2, "0");
            setTimer(`${mm}:${ss}`);
        }, 1000);
    };

    const stopTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null;
        setTimer(null);
    };

    /* --------------- CLEANUP ---------------- */
    const cleanupStream = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((t) => t.stop());
            streamRef.current = null;
        }
    };

    const cleanupRecorder = () => {
        if (recorderRef.current) {
            try {
                if (recorderRef.current.state !== "inactive") {
                    recorderRef.current.stop();
                }
            } catch { }
            recorderRef.current = null;
        }
    };

    const revokeUrl = () => {
        if (audioUrlRef.current) {
            URL.revokeObjectURL(audioUrlRef.current);
            audioUrlRef.current = null;
        }
    };

    /* --------------- FINALIZE BLOB ---------------- */
    const finalize = useCallback(
        async (finalMime: string | undefined) => {
            // console.log("[MIC] Finalizing recording…");

            setIsRecording(false);
            stopTimer();

            const mime = finalMime || "audio/webm";
            const blob = new Blob(chunksRef.current, { type: mime });

            // console.log("[MIC] Final blob created -> size:", blob.size, "mime:", mime);

            setIsProcessing(true);
            setAudioBlob(blob);

            revokeUrl();
            const url = URL.createObjectURL(blob);
            audioUrlRef.current = url;
            setAudioUrl(url);

            /* Extract duration reliably */
            const dur = await extractDuration(blob);
            setDurationSeconds(dur);
            // console.log("[MIC] Final durationSeconds =", dur);

            /* Upload (non-blocking) */
            if (onUpload) {
                Promise.resolve(onUpload(blob, mime)).catch((err) =>
                    console.error("[MIC] Upload failed:", err)
                );
            }

            setIsProcessing(false);
        },
        [onUpload]
    );

    /* --------------- START RECORDING ---------------- */
    const startRecording = useCallback(async () => {
        if (isRecording || isProcessing) return;

        // console.log("[MIC] Starting recording…");

        setError(null);
        setAudioBlob(null);
        setAudioUrl(null);
        setDurationSeconds(null);
        revokeUrl();
        chunksRef.current = [];
        stopRequestedRef.current = false;

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            mimeRef.current = chooseMimeType();
            const rec = new MediaRecorder(stream, mimeRef.current ? { mimeType: mimeRef.current } : undefined);

            recorderRef.current = rec;

            rec.ondataavailable = (e) => {
                if (e.data?.size > 0) {
                    chunksRef.current.push(e.data);
                    // console.log("[MIC] Chunk received:", e.data.size, "Total:", chunksRef.current.length);
                }
            };

            rec.onstop = () => {
                // console.log("[MIC] Recorder stopped. Stop requested =", stopRequestedRef.current);

                if (stopRequestedRef.current) {
                    finalize(mimeRef.current);
                }
            };

            rec.onerror = (err) => {
                console.error("[MIC] Recorder error:", err);
                setError("Recording error occurred.");
            };

            rec.start(); // no timeslice, prevents Safari corruption
            setIsRecording(true);
            startTimer();
        } catch (err) {
            console.error("[MIC] Microphone start error:", err);
            setError("Cannot access microphone.");
        }
    }, [finalize, isProcessing, isRecording]);

    /* --------------- STOP RECORDING ---------------- */
    const stopRecording = useCallback(() => {
        if (!isRecording) return;

        // console.log("[MIC] Stop requested by user.");
        stopRequestedRef.current = true;

        if (recorderRef.current && recorderRef.current.state === "recording") {
            recorderRef.current.stop();
        }
    }, [isRecording]);

    /* --------------- RESET ---------------- */
    const reset = useCallback(() => {
        // console.log("[MIC] Reset called.");

        stopRequestedRef.current = false;
        cleanupRecorder();
        cleanupStream();
        stopTimer();
        revokeUrl();

        chunksRef.current = [];
        setIsRecording(false);
        setIsProcessing(false);
        setAudioBlob(null);
        setAudioUrl(null);
        setDurationSeconds(null);
        setError(null);
    }, []);

    /* --------------- UNMOUNT CLEANUP ---------------- */
    useEffect(() => reset, [reset]);

    return {
        isRecording,
        isProcessing,
        audioBlob,
        audioUrl,
        durationSeconds,
        error,
        timer,
        isBusy,
        startRecording,
        stopRecording,
        reset,
    };
};
