import React, { useState, useEffect, useRef, forwardRef, useCallback, useMemo } from "react";
import { PrepContent, HistoryItem, Question } from "../types";
import { translateText, transcribeAudio } from "../services/geminiService";
import AutoResizeTextarea from "./AutoResizeTextarea";
import { uploadToStorage } from "../services/storageService";
import { ensureUserSignedIn } from "../services/authService";
import { useRecorder } from "../hooks/useRecorder";

const Spinner: React.FC<{ className?: string }> = ({
  className = "h-4 w-4 text-indigo-600 dark:text-indigo-400",
}) => (
  <svg
    className={`animate-spin ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

/* ===========================================================
   TranslatableContent Component
   =========================================================== */
interface TranslatableContentProps {
  contentId: string;
  htmlContent: string;
}

const TranslatableContent: React.FC<TranslatableContentProps> = ({
  contentId,
  htmlContent,
}) => {
  const [translations, setTranslations] = useState<{ [key: string]: string }>({
    en: htmlContent,
  });
  const [currentLang, setCurrentLang] = useState<"en" | "hi" | "gu">("en");
  const [isTranslating, setIsTranslating] = useState<string | null>(null);

  useEffect(() => {
    setTranslations({ en: htmlContent });
    setCurrentLang("en");
  }, [htmlContent]);

  const handleTranslate = async (lang: "hi" | "gu" | "en") => {
    if (lang === "en" || translations[lang]) {
      setCurrentLang(lang);
      return;
    }

    setIsTranslating(lang);
    try {
      const translated = await translateText(htmlContent, lang);
      if (translated) {
        setTranslations((prev) => ({ ...prev, [lang]: translated }));
        setCurrentLang(lang);
      }
    } finally {
      setIsTranslating(null);
    }
  };

  const getButtonClass = (lang: "en" | "hi" | "gu") => {
    const base =
      "text-xs font-semibold py-1 px-3 rounded-full transition-colors flex items-center justify-center min-w-[60px] h-6";
    if (currentLang === lang) {
      return `${base} bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400`;
    }
    return `${base} bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-wait`;
  };

  if (!htmlContent) return null;

  return (
    <>
      <div
        className="translation-controls flex items-center justify-end gap-2 mb-2"
        data-content-id={contentId}
      >
        <button onClick={() => handleTranslate("en")} className={getButtonClass("en")}>
          English
        </button>
        <button
          onClick={() => handleTranslate("hi")}
          disabled={isTranslating === "hi"}
          className={getButtonClass("hi")}
        >
          {isTranslating === "hi" ? <Spinner /> : "हिन्दी"}
        </button>
        <button
          onClick={() => handleTranslate("gu")}
          disabled={isTranslating === "gu"}
          className={getButtonClass("gu")}
        >
          {isTranslating === "gu" ? <Spinner /> : "ગુજરાતી"}
        </button>
      </div>

      <div
        dangerouslySetInnerHTML={{
          __html: translations[currentLang] || htmlContent,
        }}
      />
    </>
  );
};

/* ===========================================================
   Main Practice Section Component
   =========================================================== */
interface QuestionWithSection extends Question {
  sectionTitle: string;
}

interface PracticeSectionProps {
  prepContent: PrepContent | null;
  history: HistoryItem[];
  onGetFeedback: (
    question: string,
    transcript: string,
    questionId: string,
    audioUrl?: string,
    audioDurationSeconds?: number
  ) => Promise<HistoryItem | null>;
  onClearHistory: () => void;
}

const PracticeSection = forwardRef<HTMLElement, PracticeSectionProps>(
  ({ prepContent, history, onGetFeedback, onClearHistory }, ref) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [activeTab, setActiveTab] = useState<"guidance" | "practice">("guidance");
    const [latestFeedback, setLatestFeedback] = useState<HistoryItem | null>(null);

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isTranscribing, setIsTranscribing] = useState(false);

    const [transcript, setTranscript] = useState("");
    const [firebaseAudioUrl, setFirebaseAudioUrl] = useState<string | null>(null);

    /* ====== USE NEW GLOBAL AUDIO RECORDER HOOK ====== */
    const {
      isRecording,
      isProcessing,
      audioBlob,
      audioUrl,
      durationSeconds,
      error: recorderError,
      timer,
      isBusy: isRecorderBusy,
      startRecording,
      stopRecording,
      reset,
    } = useRecorder({
      onUpload: async (blob, mimeType) => {
        try {
          const user = await ensureUserSignedIn();
          const timestamp = Date.now();

          const ext = mimeType.includes("webm")
            ? "webm"
            : mimeType.includes("ogg")
            ? "ogg"
            : mimeType.includes("mp4")
            ? "mp4"
            : "webm";

          const path = `student_audio/${user.uid}/audio_${timestamp}.${ext}`;
          const url = await uploadToStorage(blob, path);

          setFirebaseAudioUrl(url);
        } catch (err) {
          console.error("Audio upload failed", err);
        }
      },
    });

    /* ===========================================================
       Prepare question list
       =========================================================== */
    const allQuestions = useMemo(() => {
      if (!prepContent) return [];
      return prepContent.sections.flatMap((s) =>
        s.questions.map((q) => ({ ...q, sectionTitle: s.title }))
      );
    }, [prepContent]);

    useEffect(() => {
      setCurrentQuestionIndex(0);
      setLatestFeedback(null);
      setActiveTab("guidance");
    }, [prepContent]);

    useEffect(() => {
      if (!allQuestions.length) return;

      const id = `question_${currentQuestionIndex + 1}`;
      const questionText = allQuestions[currentQuestionIndex].question;

      const match =
        history.find((h) => h.questionId === id) ||
        history.find((h) => h.question === questionText) ||
        null;

      setLatestFeedback(match);
      setTranscript(match?.transcript || "");

      reset();
      setFirebaseAudioUrl(null);
      setIsTranscribing(false);
    }, [currentQuestionIndex, allQuestions, history, reset]);

    /* ===========================================================
       Recording helpers
       =========================================================== */
    const beginRecordingSession = () => {
      setLatestFeedback(null);
      setTranscript("");
      setFirebaseAudioUrl(null);

      reset();
      startRecording();
    };

    const handleRecordClick = () => {
      if (!isRecording) beginRecordingSession();
      else stopRecording();
    };

    const handleStartRecording = () => {
      if (!isRecording) beginRecordingSession();
    };

    /* ===========================================================
       Transcription
       =========================================================== */
    const handleTranscribe = async () => {
      if (!audioBlob) return;
      setIsTranscribing(true);

      try {
        const text = await transcribeAudio(audioBlob);
        setTranscript(text || "Could not transcribe audio.");
      } catch (err: any) {
        setTranscript("Transcription error: " + (err?.message || ""));
      }

      setIsTranscribing(false);
    };

    /* ===========================================================
       Feedback Submission
       =========================================================== */
    const handleSubmitForFeedback = async () => {
      setIsAnalyzing(true);

      const q = allQuestions[currentQuestionIndex]?.question;
      if (q && transcript.trim()) {
        const id = `question_${currentQuestionIndex + 1}`;
        const fb = await onGetFeedback(
          q,
          transcript.trim(),
          id,
          firebaseAudioUrl || undefined,
          durationSeconds ?? undefined
        );
        if (fb) setLatestFeedback(fb);
      }

      setIsAnalyzing(false);
    };

    const isSupported =
      typeof window !== "undefined" &&
      typeof navigator !== "undefined" &&
      typeof navigator.mediaDevices?.getUserMedia === "function" &&
      typeof MediaRecorder !== "undefined";

    if (!prepContent) return null;

    const currentQuestion = allQuestions[currentQuestionIndex];
    const prevQuestion = allQuestions[currentQuestionIndex - 1];
    const showSectionTitle =
      !prevQuestion || currentQuestion.sectionTitle !== prevQuestion.sectionTitle;

    const score = latestFeedback?.score;
    const scoreColor =
      score === undefined
        ? ""
        : score >= 8
        ? "text-green-600 bg-green-100 dark:bg-green-500/10 dark:text-green-400"
        : score >= 5
        ? "text-yellow-600 bg-yellow-100 dark:bg-yellow-500/10 dark:text-yellow-400"
        : "text-red-600 bg-red-100 dark:bg-red-500/10 dark:text-red-400";

    const isBusy = isRecorderBusy || isAnalyzing || isTranscribing;
    return (
      <>
        <section id="interview-flow" ref={ref} className="mb-16 fade-in">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <TranslatableContent
                contentId="key-talking-points"
                htmlContent={prepContent.keyTalkingPoints || ""}
              />
            </div>

            {showSectionTitle && (
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 border-b-2 border-indigo-500 inline-block pb-2 px-4">
                  {currentQuestion.sectionTitle}
                </h2>
              </div>
            )}

            {/* MAIN CARD */}
            <div className="bg-white dark:bg-slate-800/50 p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-indigo-600">
                  Question {currentQuestionIndex + 1} of {allQuestions.length}
                </h3>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentQuestionIndex((i) => i - 1)}
                    disabled={currentQuestionIndex === 0}
                    className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>

                  <button
                    onClick={() => setCurrentQuestionIndex((i) => i + 1)}
                    disabled={currentQuestionIndex === allQuestions.length - 1}
                    className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>
              </div>

              <p className="text-2xl sm:text-3xl font-bold mb-2">
                {currentQuestion.question}
              </p>

              {/* TABS */}
              <div className="border-b border-slate-200 mb-6">
                <nav className="flex items-center gap-3 -mb-px">
                  <button
                    onClick={() => setActiveTab("guidance")}
                    className={`py-4 px-2 text-sm font-medium ${
                      activeTab === "guidance"
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                    }`}
                  >
                    Model Answer & Guidance
                  </button>

                  <button
                    onClick={() => setActiveTab("practice")}
                    className={`flex items-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 ${
                      activeTab === "practice" ? "ring-2 ring-red-300 ring-offset-2" : ""
                    }`}
                  >
                    {/* Proper Mic SVG (Heroicons: outline/microphone) */}
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 18v3m0 0h3m-3 0H9m6-6a3 3 0 01-6 0V7a3 3 0 016 0v6zm5-3v1a8 8 0 11-16 0v-1"
                      />
                    </svg>
                    Practice Your Answer
                  </button>
                </nav>
              </div>

              {/* CONTENT */}
              {activeTab === "guidance" && (
                <div className="prose prose-slate max-w-none dark:prose-invert">
                  <TranslatableContent
                    contentId={`guidance-${currentQuestionIndex}`}
                    htmlContent={`<h4>Model Answer</h4>${currentQuestion.modelAnswer || ""}<h4>Guidance</h4>${currentQuestion.guidance || ""}`}
                  />
                </div>
              )}

              {activeTab === "practice" && (
                <div>
                  <div className="text-center py-4">
                    {/* RECORD BUTTON */}
                    <button
                      onClick={handleRecordClick}
                      disabled={!isSupported || isAnalyzing || isTranscribing || isProcessing}
                      className={`relative bg-red-600 text-white font-semibold py-4 px-8 rounded-full hover:bg-red-700 transition transform hover:scale-105 ${
                        isRecording ? "recording-pulse" : ""
                      } disabled:opacity-50`}
                    >
                      {isRecording ? "Stop Recording" : "Start New Recording"}
                    </button>

                    <div className="mt-4 h-6">
                      {recorderError ? (
                        <p className="text-red-500 text-sm">{recorderError}</p>
                      ) : (
                        <p className="font-mono text-slate-500">
                          {isRecording && timer ? timer : audioBlob ? "Recording complete." : "Ready to record."}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* AUDIO PLAYER + TRANSCRIBE */}
                  {!isRecording && audioUrl && !transcript && (
                    <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600 text-center">
                      <p className="text-sm mb-2 text-slate-700 dark:text-slate-200">Recording complete. Ready to transcribe.</p>

                      <audio key={audioUrl} controls src={audioUrl} className="w-full"></audio>

                      <div className="mt-4 flex gap-4">
                        <button
                          onClick={handleStartRecording}
                          disabled={isBusy}
                          className="flex-1 bg-slate-200 text-slate-700 dark:bg-slate-600 dark:text-slate-200 py-3 rounded-xl hover:bg-slate-300 dark:hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Record Again
                        </button>
                        <button
                          onClick={handleTranscribe}
                          disabled={isTranscribing}
                          className="flex-1 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-500 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
                        >
                          {isTranscribing ? "Transcribing…" : "Transcribe"}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TRANSCRIPT EDITOR */}
                  {transcript && (
                    <div className="mt-4">
                      <label className="text-sm mb-2 block">Your Answer Transcript:</label>
                      <AutoResizeTextarea
                        value={transcript}
                        onChange={(e) => setTranscript(e.target.value)}
                        disabled={isRecording || isTranscribing}
                        className="w-full p-4 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg"
                      />

                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <button onClick={handleStartRecording} disabled={isBusy} className="bg-slate-600 text-white py-3 rounded-lg">
                          Record Again
                        </button>

                        <button
                          onClick={handleSubmitForFeedback}
                          disabled={!transcript || isAnalyzing}
                          className="bg-indigo-600 text-white py-3 rounded-lg"
                        >
                          {isAnalyzing ? "Analyzing…" : "Submit for Feedback"}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* FEEDBACK */}
                  {latestFeedback && (
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 mt-6">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                            Your Feedback
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {new Date(latestFeedback.timestamp).toLocaleString()}
                          </p>
                        </div>

                        <div className={`w-24 h-24 rounded-full flex items-center justify-center ${scoreColor}`}>
                          <p className="text-4xl font-bold">
                            {latestFeedback.score}
                            <span className="text-2xl opacity-60">/10</span>
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 prose prose-sm max-w-none prose-slate dark:prose-invert">
                        <TranslatableContent
                          contentId={`feedback-${latestFeedback.id}`}
                          htmlContent={latestFeedback.feedback}
                        />
                      </div>

                      <h5 className="font-semibold mt-6 mb-2 text-sm text-slate-700 dark:text-slate-300">
                        Your Answer Transcript:
                      </h5>
                      <p className="text-sm p-3 bg-white dark:bg-slate-900/70 rounded-md border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                        {latestFeedback.transcript}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* HISTORY */}
        {history.length > 0 && (
          <section id="history" className="mb-16 fade-in">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-3 mb-8">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Practice History</h2>

                <button
                  onClick={onClearHistory}
                  className="text-sm text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500 flex items-center gap-1"
                >
                  Clear History
                </button>
              </div>

              <div className="space-y-4">
                {history.map((item) => {
                  const color =
                    item.score >= 8
                      ? "bg-green-100 dark:bg-green-500/10 text-green-800 dark:text-green-300"
                      : item.score >= 5
                      ? "bg-yellow-100 dark:bg-yellow-500/10 text-yellow-800 dark:text-yellow-300"
                      : "bg-red-100 dark:bg-red-500/10 text-red-800 dark:text-red-300";

                  return (
                    <details
                      key={item.id}
                      className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow"
                    >
                      <summary className="flex justify-between items-center p-4 cursor-pointer">
                        <div className="flex-grow pr-4">
                          <p className="font-semibold text-slate-700 dark:text-slate-200">{item.question}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {new Date(item.timestamp).toLocaleString()}
                          </p>
                        </div>

                        <span className={`text-sm font-bold px-3 py-1 rounded-full ${color}`}>
                          {item.score}/10
                        </span>
                      </summary>

                      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700">
                        <h5 className="font-semibold text-xs uppercase mb-1 text-slate-600 dark:text-slate-300">
                          Content Feedback
                        </h5>

                        <TranslatableContent
                          contentId={`history-feedback-${item.id}`}
                          htmlContent={item.feedback}
                        />

                        <h5 className="font-semibold text-xs uppercase mt-4 mb-1 text-slate-600 dark:text-slate-300">
                          Your Answer:
                        </h5>
                        <p className="text-sm text-slate-700 dark:text-slate-200">{item.transcript}</p>
                      </div>
                    </details>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </>
    );
  }
);

export default PracticeSection;
