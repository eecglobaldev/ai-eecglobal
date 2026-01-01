import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { PrepContent, HistoryItem } from '../types';
import { ensureUserSignedIn } from '../services/userService';
import { uploadToStorage } from '../services/studentApplicationService';

interface InterviewFlowProps {
  prepContent: PrepContent;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  onAnalyze: (transcript: string, audioUrl?: string, audioDurationSeconds?: number) => void;
  isLoading: boolean;
  history: HistoryItem[];
  makeApiCall: (promptOrContents: string | { parts: any[] }, systemInstruction?: string) => Promise<string | null>;
  showModal: (message: string) => void;
}

const extractJson = (text: string | null): string | null => {
    if (!text) return null;
    const markdownMatch = text.match(/```(json)?\s*([\s\S]*?)\s*```/);
    if (markdownMatch && markdownMatch[2]) return markdownMatch[2];
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace > firstBrace) {
        return text.substring(firstBrace, lastBrace + 1);
    }
    return text;
};

const robustJsonParse = (jsonString: string) => {
    try {
        // First, try to parse as is
        return JSON.parse(jsonString);
    } catch (e) {
        if (!(e instanceof SyntaxError)) {
            throw e; // Not a parsing error, re-throw
        }
        console.warn("Initial JSON.parse failed. Attempting to sanitize.", e.message);
        
        // Sanitize for bad escaped characters. Replaces a backslash that is NOT 
        // followed by a valid escape char with a double backslash.
        let sanitized = jsonString.replace(/\\(?!["\\/bfnrt]|u[0-9a-fA-F]{4})/g, '\\\\');
        
        // Sanitize for invalid control characters
        sanitized = sanitized.replace(/[\x00-\x1F\x7F-\x9F]/g, "");

        try {
            // Retry parsing with the sanitized string
            return JSON.parse(sanitized);
        } catch (e2) {
            console.error("JSON parsing failed even after sanitization.", e2);
            // Throw original error to be handled by caller's catch block, which will show a modal to the user.
            throw e; 
        }
    }
};

const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            if (typeof reader.result !== 'string') {
                return reject(new Error("FileReader result is not a string"));
            }
            const base64data = reader.result.split(',')[1];
            resolve(base64data);
        };
        reader.onerror = (error) => reject(error);
    });
};

// Helper function to estimate audio duration from blob or timer (fallback for iOS)
const estimateDurationFromBlob = (blob: Blob, timerString?: string): number | null => {
  try {
    // First, try to parse duration from timer string if available (most accurate)
    if (timerString) {
      const [minutes, seconds] = timerString.split(':').map(Number);
      if (!isNaN(minutes) && !isNaN(seconds)) {
        const totalSeconds = minutes * 60 + seconds;
        if (totalSeconds > 0 && totalSeconds < 3600) {
          return totalSeconds;
        }
      }
    }
    
    // Fallback: rough estimation from blob size
    // WebM audio is typically ~1MB per minute at decent quality
    const sizeMB = blob.size / (1024 * 1024);
    const estimatedMinutes = sizeMB;
    const estimatedSeconds = Math.round(estimatedMinutes * 60);
    // Return null if estimate seems unreasonable
    if (estimatedSeconds > 0 && estimatedSeconds < 3600) {
      return estimatedSeconds;
    }
  } catch (err) {
    console.error('[Audio] Failed to estimate duration from blob:', err);
  }
  return null;
};

const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
};


const PracticeTab: React.FC<{
  onAnalyze: (transcript: string, audioUrl?: string, audioDurationSeconds?: number) => void;
  isLoading: boolean;
  latestAttempt: HistoryItem | undefined;
  showModal: (message: string) => void;
  makeApiCall: InterviewFlowProps['makeApiCall'];
}> = ({ onAnalyze, isLoading, latestAttempt, showModal, makeApiCall }) => {
  type RecordingState = 'idle' | 'recording' | 'recorded' | 'transcribing' | 'transcribed' | 'error';
  
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [transcript, setTranscript] = useState('');
  const [timer, setTimer] = useState('00:00');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [firebaseAudioUrl, setFirebaseAudioUrl] = useState<string | null>(null);
  const [audioDurationSeconds, setAudioDurationSeconds] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const AutoResizeTextarea: React.FC<
    React.TextareaHTMLAttributes<HTMLTextAreaElement> & { value: string }
  > = ({ value, onChange, ...props }) => {
    const ref = useRef<HTMLTextAreaElement | null>(null);
    useLayoutEffect(() => {
      if (!ref.current) return;
      const el = ref.current;
      // Store cursor position and focus state
      const cursorPosition = el.selectionStart;
      const isFocused = document.activeElement === el;
      // Reset height to auto to get accurate scrollHeight
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
      // Restore cursor position and focus if it was focused
      if (isFocused) {
        el.focus();
        el.setSelectionRange(cursorPosition, cursorPosition);
      }
    }, [value]);
    return <textarea ref={ref} value={value} onChange={onChange} {...props} />;
  };

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const userStopRequestedRef = useRef(false);

  // Cleanup stray streams on component unmount
  useEffect(() => {
    return () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
        }
        if (audioUrl) {
          URL.revokeObjectURL(audioUrl);
        }
    }
  }, [audioUrl]);

  const startTimer = () => {
    let seconds = 0;
    setTimer('00:00');
    timerIntervalRef.current = window.setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        setTimer(`${mins}:${secs}`);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
    }
  };

  const startMediaRecorder = (stream: MediaStream) => {
    try {
        const options: MediaRecorderOptions = { mimeType: 'audio/webm' };
        const mediaRecorder = new MediaRecorder(stream, options);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event: BlobEvent) => {
            if (event.data.size > 0) {
                audioChunksRef.current.push(event.data);
                console.log('[Audio] Chunk received, total chunks:', audioChunksRef.current.length);
            }
        };

        mediaRecorder.onstop = () => {
            // If the user explicitly requested stop, finalize the recording
            if (userStopRequestedRef.current) {
                const mimeType = mediaRecorder.mimeType || 'audio/webm';
                const blob = new Blob(audioChunksRef.current, { type: mimeType });
                setAudioBlob(blob);
                const localUrl = URL.createObjectURL(blob);
                setAudioUrl(prev => {
                  if (prev) {
                    URL.revokeObjectURL(prev);
                  }
                  return localUrl;
                });
                setRecordingState('recorded');

                // Upload to Firebase Storage in the background
                (async () => {
                  try {
                    const user = await ensureUserSignedIn();
                    const timestamp = Date.now();
                    const baseMimeType = mimeType.split(';')[0];
                    const fileExtension =
                      baseMimeType.includes('webm') ? 'webm' :
                      baseMimeType.includes('mp4') ? 'mp4' :
                      baseMimeType.includes('mpeg') ? 'mp3' :
                      'ogg';

                    const storagePath = `student_audio/${user.uid}/audio_${timestamp}.${fileExtension}`;
                    const downloadURL = await uploadToStorage(blob, storagePath);
                    setFirebaseAudioUrl(downloadURL);

                    console.log('[Audio] Upload complete', {
                      storagePath,
                      downloadURL,
                      mimeType: baseMimeType,
                      sizeBytes: blob.size,
                    });
                  } catch (err) {
                    console.error('Failed to upload audio to Firebase Storage:', err);
                  }
                })();

                if (streamRef.current) {
                    streamRef.current.getTracks().forEach(track => track.stop());
                    streamRef.current = null;
                }

                stopTimer();
                userStopRequestedRef.current = false;
                return;
            }

            // Auto-stop (e.g., iOS Safari segment limit) while we still expect to be recording.
            if (!userStopRequestedRef.current && streamRef.current) {
                try {
                    // iOS Safari auto-stops around 30 seconds. The chunks from this segment
                    // are already in audioChunksRef.current from ondataavailable.
                    // Restart the recorder to continue recording seamlessly.
                    startMediaRecorder(streamRef.current);
                    console.log('[Audio] MediaRecorder auto-stopped, restarted. Chunks so far:', audioChunksRef.current.length);
                } catch (err) {
                    console.error("Failed to restart MediaRecorder after auto-stop:", err);
                    // If restart fails, finalize with what we have so far
                    if (audioChunksRef.current.length > 0) {
                        const mimeType = mediaRecorder.mimeType || 'audio/webm';
                        const blob = new Blob(audioChunksRef.current, { type: mimeType });
                        setAudioBlob(blob);
                        const localUrl = URL.createObjectURL(blob);
                        setAudioUrl(prev => {
                          if (prev) {
                            URL.revokeObjectURL(prev);
                          }
                          return localUrl;
                        });
                        setRecordingState('recorded');
                        setError("Recording was interrupted, but partial recording saved. You can record again if needed.");
                        stopTimer();
                        if (streamRef.current) {
                            streamRef.current.getTracks().forEach(track => track.stop());
                            streamRef.current = null;
                        }
                    } else {
                    setError("Recording was interrupted by the browser. Please try again.");
                    setRecordingState('error');
                    stopTimer();
                    }
                }
            }
        };

        mediaRecorder.onerror = (event) => {
            console.error("MediaRecorder error:", event);
            setError("An error occurred during recording.");
            setRecordingState('error');
            stopTimer();
        };

        // Start recording; on some browsers this may auto-stop after ~30s,
        // in which case onstop will restart it unless the user requested stop.
        mediaRecorder.start();
    } catch (err) {
        console.error("Failed to start MediaRecorder:", err);
        setError("Audio recording is not supported or failed to start in this browser.");
        setRecordingState('error');
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        stopTimer();
    }
  };

  const handleToggleRecording = async () => {
    if (recordingState === 'recording') {
      // User explicitly requested to stop
      userStopRequestedRef.current = true;
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      } else if (streamRef.current) {
        // Fallback: ensure stream is stopped even if recorder isn't active
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
        setRecordingState('idle');
        stopTimer();
      }
    } else {
        setError(null);
        try {
            if (!navigator.mediaDevices?.getUserMedia) {
                setError("Your browser does not support audio recording.");
                setRecordingState('error');
                return;
            }

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            audioChunksRef.current = [];
            userStopRequestedRef.current = false;
            setRecordingState('recording');
            startTimer();
            startMediaRecorder(stream);

        } catch (err) {
            console.error("Error accessing microphone:", err);
            let message;
            if (err instanceof DOMException && err.name === 'NotAllowedError') {
                message = 'Microphone access was denied. Please enable it in your browser settings and refresh the page.';
                setError(message);
            } else {
                 message = 'Could not access the microphone. Please ensure it is connected and you have granted permission for this site to use it.';
                 setError(message);
                 showModal(message); // Only show modal for unexpected errors
            }
            setRecordingState('error');
            stopTimer();
        }
    }
  };

  const handleTranscribe = async () => {
    if (!audioBlob) {
        showModal("No audio has been recorded.");
        return;
    }
    setRecordingState('transcribing');
    setTranscript(''); // Clear previous transcript
    try {
        const base64Audio = await blobToBase64(audioBlob);
        const contents = {
            parts: [
                { text: "Transcribe the following audio recording of a person practicing an interview answer. Provide an exact, verbatim transcription." },
                { inlineData: { mimeType: audioBlob.type, data: base64Audio } }
            ]
        };

        const resultText = await makeApiCall(contents);
        
        if (resultText) {
            setTranscript(resultText.trim());
            setRecordingState('transcribed');
        } else {
            throw new Error("Transcription returned no content.");
        }
    } catch (err) {
        console.error("Transcription error:", err);
        const message = err instanceof Error ? err.message : String(err);
        showModal(`An error occurred during transcription: ${message}. You can try transcribing again.`);
        setRecordingState('recorded'); // Revert to let user retry
    }
  };
  
  const handleRecordAgain = () => {
    setRecordingState('idle');
    setAudioBlob(null);
    setAudioUrl(prev => {
      if (prev) {
        URL.revokeObjectURL(prev);
      }
      return null;
    });
    setFirebaseAudioUrl(null);
    setAudioDurationSeconds(null);
    setTranscript('');
    setError(null);
    setTimer('00:00');
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (mediaRecorderRef.current) mediaRecorderRef.current = null;
    audioChunksRef.current = [];
  };

  const handleSubmitFeedback = () => {
    const finalTranscript = transcript.trim();
    if (!finalTranscript) {
        showModal("Your transcript is empty. Please record and transcribe an answer first.");
        return;
    }
    onAnalyze(finalTranscript, firebaseAudioUrl || undefined, audioDurationSeconds ?? undefined);
  };
  
  // Derived UI helpers shared across sections
  const isRecording = recordingState === 'recording';
  const isTranscribing = recordingState === 'transcribing';
  const isAnalyzing = isLoading && !['transcribing', 'recording'].includes(recordingState);
  const handleStartRecording = () => {
    handleRecordAgain();
    setTimeout(() => handleToggleRecording(), 0);
  };
  const handleSubmitForFeedback = () => handleSubmitFeedback();
  
  const renderActionArea = () => {
    const transcribeBtnDisabled = recordingState !== 'recorded' || isAnalyzing;
    const recordAgainBtnDisabled = recordingState === 'transcribing' || isAnalyzing;
    const mainRecordBtnDisabled = !['idle', 'recording', 'error'].includes(recordingState) || isAnalyzing;

    const getStatusText = () => {
      switch(recordingState) {
          case 'recording': return timer;
          case 'recorded': return 'Recording complete. Ready to transcribe.';
          case 'transcribing': return 'Transcribing audio...';
          case 'transcribed': return 'Transcription complete. Edit below if needed.';
          default: return '';
      }
    };

    return (
        <div className="text-center py-4">
            <div className=" flex flex-col justify-center items-center ">
                {['idle', 'recording', 'error'].includes(recordingState) && (
                    <div className="flex flex-col items-center gap-3">
                        <button onClick={handleToggleRecording} disabled={mainRecordBtnDisabled} className={`relative bg-red-500 text-white font-semibold py-4 px-8 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all transform hover:scale-105 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center mx-auto gap-3 min-w-[12rem] ${recordingState === 'recording' ? 'recording-pulse' : ''}`}>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C15.3137 2 18 4.68629 18 8V12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12V8C6 4.68629 8.68629 2 12 2Z M12 4C9.79086 4 8 5.79086 8 8V12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12V8C16 5.79086 14.2091 4 12 4Z M20 12V13C20 17.4183 16.4183 21 12 21C7.58172 21 4 17.4183 4 13V12H2V13C2 17.968 5.84581 22 10.5 22V24H13.5V22C18.1542 22 22 17.968 22 13V12H20Z"></path></svg>
                            <span>{recordingState === 'recording' ? 'Stop Recording' : 'Start Recording'}</span>
                        </button>
                        {recordingState === 'recording' && (
                          <div className="text-center">
                            <p className="font-mono text-xl text-slate-800 dark:text-slate-200">{timer}</p>
                            {/* <p className="text-xs text-slate-500 dark:text-slate-400">Aim for at least 60–120 seconds</p> */}
                          </div>
                        )}
                    </div>
                )}
                 {!isRecording && audioUrl && !transcript && (
                    <div className="mt-4 w-full text-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border dark:border-slate-600">
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Recording complete. Ready to transcribe.</p>
                        <audio
                          key={audioUrl}
                          controls
                          src={audioUrl}
                          preload="metadata"
                          playsInline
                          onLoadedMetadata={(e) => {
                            const audio = e.currentTarget;
                            // iOS Safari sometimes returns NaN or Infinity for duration
                            if (audio.duration && isFinite(audio.duration) && audio.duration > 0) {
                              setAudioDurationSeconds(Math.round(audio.duration));
                              return;
                            }

                            // Retry mechanism for iOS Safari which may delay duration availability
                            let retryCount = 0;
                            const maxRetries = 10;
                            const retry = setInterval(() => {
                              retryCount++;
                              if (audio.duration && isFinite(audio.duration) && audio.duration > 0) {
                                setAudioDurationSeconds(Math.round(audio.duration));
                                clearInterval(retry);
                              } else if (retryCount >= maxRetries) {
                                // Fallback: try to get duration from timer or blob if available
                                if (audioBlob) {
                                  const fallbackDuration = estimateDurationFromBlob(audioBlob, timer);
                                  if (fallbackDuration) {
                                    setAudioDurationSeconds(fallbackDuration);
                                  }
                                }
                                clearInterval(retry);
                              }
                            }, 200);
                            
                            // Cleanup on unmount
                            return () => clearInterval(retry);
                          }}
                          onCanPlay={(e) => {
                            // iOS Safari may provide duration in onCanPlay instead of onLoadedMetadata
                            const audio = e.currentTarget;
                            if (!audioDurationSeconds && audio.duration && isFinite(audio.duration) && audio.duration > 0) {
                              setAudioDurationSeconds(Math.round(audio.duration));
                            }
                          }}
                          onError={(e) => {
                            console.error('[Audio] Playback error:', e);
                            // If audio fails to load, try to estimate duration from timer or blob
                            if (audioBlob && !audioDurationSeconds) {
                              const estimatedDuration = estimateDurationFromBlob(audioBlob, timer);
                              if (estimatedDuration) {
                                setAudioDurationSeconds(estimatedDuration);
                              }
                            }
                          }}
                          className="w-full"
                        ></audio>
                        {audioDurationSeconds !== null && (
                          <div className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                            0:00 / {formatTime(audioDurationSeconds)}
                          </div>
                        )}
                        <div className="flex flex-col sm:flex-row gap-4 mt-4">
                            <button onClick={handleRecordAgain} disabled={isAnalyzing} className="flex-1 bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-xl hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500 disabled:opacity-50">
                                Record Again
                            </button>
                            <button onClick={handleTranscribe} disabled={isTranscribing || isAnalyzing} className="flex-1 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-500 disabled:bg-slate-400 dark:disabled:bg-slate-600">
                                {isTranscribing ? 'Transcribing...' : 'Transcribe Audio'}
                            </button>
                        </div>
                    </div>
                 )}
            </div>
            {/* <p className="text-slate-500 dark:text-slate-400 mt-2 h-6 font-mono">{getStatusText()}</p> */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
  }

  return (
    <div>
        {renderActionArea()}
        
        {transcript && (
            <div className="mt-4">
                <label htmlFor="transcript-textarea" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Your Answer Transcript:</label>
                <AutoResizeTextarea
                  id="transcript-textarea"
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  disabled={isRecording || isTranscribing}
                  readOnly={false}
                  className="w-full overflow-hidden p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 transition-shadow disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:cursor-not-allowed"
                  rows={3}
                ></AutoResizeTextarea>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={handleRecordAgain}
                      disabled={isAnalyzing}
                      className="w-full bg-slate-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-slate-700 dark:hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all transform disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Record Again
                    </button>
                    <button
                      onClick={handleSubmitForFeedback}
                      disabled={!transcript || isAnalyzing || isTranscribing || isRecording}
                      className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
                    >
                      {isAnalyzing ? 'Analyzing...' : 'Submit for Feedback'}
                    </button>
                </div>
            </div>
        )}
        
        {latestAttempt && !isLoading && (
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 mt-6 fade-in">
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Your Feedback</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{new Date(latestAttempt.timestamp).toLocaleString()}</p>
                    </div>
                    <div className="text-center ml-4 flex-shrink-0">
                       <div className={`w-24 h-24 rounded-full flex items-center justify-center ${latestAttempt.score >= 8 ? 'bg-green-100 dark:bg-green-500/10' : latestAttempt.score >= 5 ? 'bg-yellow-100 dark:bg-yellow-500/10' : 'bg-red-100 dark:bg-red-500/10'}`}>
                           <p className={`text-4xl font-extrabold ${latestAttempt.score >= 8 ? 'text-green-600 dark:text-green-400' : latestAttempt.score >= 5 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
                                {latestAttempt.score}<span className="text-2xl font-semibold opacity-60">/10</span>
                           </p>
                       </div>
                    </div>
                </div>
                <div id={`fb-${latestAttempt.id}`} className="mt-4 prose prose-slate max-w-none prose-sm dark:text-slate-200" dangerouslySetInnerHTML={{ __html: latestAttempt.feedback }} />
                <h5 className="font-semibold mt-6 mb-2 text-slate-700 dark:text-slate-300 text-sm">Your Answer Transcript:</h5>
                <p className="text-sm p-3 bg-white dark:bg-slate-700 rounded-md border dark:border-slate-600 text-slate-600 dark:text-slate-300">{latestAttempt.transcript}</p>
            </div>
        )}
    </div>
  );
};


export const InterviewFlow: React.FC<InterviewFlowProps> = ({
  prepContent, currentQuestionIndex, setCurrentQuestionIndex, onAnalyze, isLoading, history, makeApiCall, showModal
}) => {
  const [activeTab, setActiveTab] = useState<'guidance' | 'practice'>('guidance');
  
  // State for Key Talking Points translation
  const [keyPointsLang, setKeyPointsLang] = useState<'en' | 'hi' | 'gu'>('en');
  const [isTranslatingKeyPoints, setIsTranslatingKeyPoints] = useState(false);
  const [translatedKeyPoints, setTranslatedKeyPoints] = useState<{ keyTalkingPoints: string } | null>(null);

  // State for Question content translation
  const [questionLang, setQuestionLang] = useState<'en' | 'hi' | 'gu'>('en');
  const [isTranslatingQuestion, setIsTranslatingQuestion] = useState(false);
  const [translatedQuestionContent, setTranslatedQuestionContent] = useState<{ question: string; modelAnswer: string; guidance: string; } | null>(null);

  const translationCache = useRef<{ [key: string]: any }>({});

  const currentQuestionData = prepContent.questions[currentQuestionIndex];
  const totalQuestions = prepContent.questions.length;
  const latestAttempt = history.find(h => h.question === currentQuestionData.question);
  
  // Reset question-specific state when question index changes
  useEffect(() => {
    setActiveTab('guidance');
    setQuestionLang('en');
    setTranslatedQuestionContent(null);
  }, [currentQuestionIndex]);

  // Reset all translation state when a new prep plan is generated
  useEffect(() => {
      setKeyPointsLang('en');
      setTranslatedKeyPoints(null);
      translationCache.current = {};
  }, [prepContent]);


  const changeQuestion = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
    if (direction === 'next' && currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const handleTabClick = (tab: 'guidance' | 'practice') => {
      setActiveTab(tab);
  };

  const handleKeyPointsLangClick = async (lang: 'en' | 'hi' | 'gu') => {
    setKeyPointsLang(lang);
    if (lang === 'en') {
        setTranslatedKeyPoints(null);
        return;
    }

    const cacheKey = `ktp-${lang}`;
    if (translationCache.current[cacheKey]) {
        setTranslatedKeyPoints(translationCache.current[cacheKey]);
        return;
    }

    setIsTranslatingKeyPoints(true);
    try {
        const jsonToTranslate = JSON.stringify({
            keyTalkingPoints: prepContent.keyTalkingPoints,
        });
        const targetLanguage = lang === 'hi' ? 'Hindi' : 'Gujarati';
        const prompt = `You are an expert translator. Translate the text values in the following JSON object to ${targetLanguage}. The 'keyTalkingPoints' field contains HTML; you MUST preserve all HTML tags and structure. Your response must be ONLY a single, valid JSON object.\n\n${jsonToTranslate}`;
        
        const result = await makeApiCall(prompt);

        if (result) {
            const jsonString = extractJson(result);
            if (!jsonString) throw new Error("No JSON content found in translation response.");
            
            const newContent = robustJsonParse(jsonString);

            if (typeof newContent.keyTalkingPoints === 'string') {
                translationCache.current[cacheKey] = newContent;
                setTranslatedKeyPoints(newContent);
            } else {
                 throw new Error("Translated JSON has incorrect structure.");
            }
        }
    } catch (error) {
        console.error("Translation error:", error);
        showModal(`Translation failed. Please try again.`);
        setKeyPointsLang('en');
    } finally {
        setIsTranslatingKeyPoints(false);
    }
  };

  const handleQuestionLangClick = async (lang: 'en' | 'hi' | 'gu') => {
    setQuestionLang(lang);
    if (lang === 'en') {
        setTranslatedQuestionContent(null);
        return;
    }

    const cacheKey = `q${currentQuestionIndex}-${lang}`;
    if (translationCache.current[cacheKey]) {
        setTranslatedQuestionContent(translationCache.current[cacheKey]);
        return;
    }

    setIsTranslatingQuestion(true);
    try {
        const jsonToTranslate = JSON.stringify({
            question: currentQuestionData.question,
            modelAnswer: currentQuestionData.modelAnswer,
            guidance: currentQuestionData.guidance,
        });
        const targetLanguage = lang === 'hi' ? 'Hindi' : 'Gujarati';
        const prompt = `You are an expert translator. Translate the text values in the following JSON object to ${targetLanguage}. The 'modelAnswer' and 'guidance' fields contain HTML; you MUST preserve all HTML tags and structure. Your response must be ONLY a single, valid JSON object.\n\n${jsonToTranslate}`;
        
        const result = await makeApiCall(prompt);

        if (result) {
            const jsonString = extractJson(result);
            if (!jsonString) throw new Error("No JSON content found in translation response.");
            
            const newContent = robustJsonParse(jsonString);

            if (typeof newContent.question === 'string' && typeof newContent.modelAnswer === 'string' && typeof newContent.guidance === 'string') {
                translationCache.current[cacheKey] = newContent;
                setTranslatedQuestionContent(newContent);
            } else {
                 throw new Error("Translated JSON has incorrect structure.");
            }
        }
    } catch (error) {
        console.error("Translation error:", error);
        showModal(`Translation failed. Please try again.`);
        setQuestionLang('en');
    } finally {
        setIsTranslatingQuestion(false);
    }
  };

  const practiceProps = {
    onAnalyze,
    isLoading,
    latestAttempt,
    showModal,
    makeApiCall,
  };

  return (
    <section id="interview-flow" className="mb-16 fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200 border-b-2 border-slate-200 dark:border-slate-700 pb-3 mb-8">Interview Practice</h2>
        
      <div id="key-talking-points-container" className="mb-12">
          <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Your Key Talking Points</h3>
              <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300 hidden sm:inline">Translate:</span>
                  <button 
                      onClick={() => handleKeyPointsLangClick('en')} 
                      className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 ${
                          keyPointsLang === 'en' 
                              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30' 
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                      }`} 
                      disabled={isTranslatingKeyPoints}
                  >
                      English
                  </button>
                  <button 
                      onClick={() => handleKeyPointsLangClick('hi')} 
                      className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 ${
                          keyPointsLang === 'hi' 
                              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30' 
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                      }`} 
                      disabled={isTranslatingKeyPoints}
                  >
                      हिन्दी
                  </button>
                  <button 
                      onClick={() => handleKeyPointsLangClick('gu')} 
                      className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 ${
                          keyPointsLang === 'gu' 
                              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30' 
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                      }`} 
                      disabled={isTranslatingKeyPoints}
                  >
                      ગુજરાતી
                  </button>
              </div>
          </div>
          <div id="key-talking-points" className="ai-content-card prose prose-slate max-w-none dark:text-slate-400" dangerouslySetInnerHTML={{ __html: translatedKeyPoints?.keyTalkingPoints ?? prepContent.keyTalkingPoints }} />
      </div>
      
      <div id="practice-container" className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400">Question {currentQuestionIndex + 1} of {totalQuestions}</h3>
              <div className="flex items-center gap-2">
                   <button onClick={() => changeQuestion('prev')} disabled={currentQuestionIndex === 0} className="p-2 rounded-md dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed">
                       <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                   </button>
                   <button onClick={() => changeQuestion('next')} disabled={currentQuestionIndex === totalQuestions - 1} className="p-2 rounded-md dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed">
                       <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                  </button>
              </div>
          </div>
          
          <div className="flex justify-between items-start flex-col sm:flex-row sm:items-center gap-4 mb-8">
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 flex-grow">{translatedQuestionContent?.question ?? currentQuestionData.question}</p>
              <div className="flex items-center gap-2 flex-shrink-0 self-start sm:self-center">
                  <button 
                      onClick={() => handleQuestionLangClick('en')} 
                      className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 ${
                          questionLang === 'en' 
                              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30' 
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                      }`} 
                      disabled={isTranslatingQuestion}
                  >
                      English
                  </button>
                  <button 
                      onClick={() => handleQuestionLangClick('hi')} 
                      className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 ${
                          questionLang === 'hi' 
                              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30' 
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                      }`} 
                      disabled={isTranslatingQuestion}
                  >
                      हिन्दी
                  </button>
                  <button 
                      onClick={() => handleQuestionLangClick('gu')} 
                      className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 ${
                          questionLang === 'gu' 
                              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30' 
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                      }`} 
                      disabled={isTranslatingQuestion}
                  >
                      ગુજરાતી
                  </button>
              </div>
          </div>

          <div className="border-b border-slate-200 mb-6">
    <nav className="flex items-center gap-3 -mb-px">
        
        {/* === Tab 1: Model Answer & Guidance === */}
        {/* This is styled as a classic, understated tab. */}
        <button 
            onClick={() => setActiveTab('guidance')} 
            data-tab="guidance" 
            className={`py-4 px-2 text-sm font-medium transition-all duration-150 ${
                activeTab === 'guidance'
                ? 'text-indigo-600 border-b-2 border-indigo-600 font-semibold' 
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
        >
            Model Answer & Guidance
        </button>

        {/* === Tab 2: Practice Your Answer (CTA Button) === */}
        {/* This is styled as a prominent, red Call-to-Action button with an icon. */}
        <button 
            onClick={() => setActiveTab('practice')} 
            data-tab="practice" 
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-sm transition-all duration-150 ${
                activeTab === 'practice'
                ? 'ring-2 ring-red-300 ring-offset-2' // This "active" state adds an outline
                : ''
            }`}
        >
            {/* --- Microphone Icon (Solid) --- */}
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 007-3.877V10a.75.75 0 00-1.5 0v4.123A6.5 6.5 0 0110 16.5a6.5 6.5 0 01-5.5-3.377V10a.75.75 0 00-1.5 0v4.123A8 8 0 0010 18z" clipRule="evenodd" />
            </svg>
            Practice Your Answer
        </button>

    </nav>
</div>

          <div className="mt-6">
              {activeTab === 'guidance' && (
                  <div className="space-y-8">
                      <div>
                          <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3 border-b dark:border-slate-700 pb-2">Model Answer</h4>
                          <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-headings:text-slate-800 prose-p:text-slate-700 prose-ul:list-disc prose-ul:pl-6"
                               dangerouslySetInnerHTML={{ __html: translatedQuestionContent?.modelAnswer ?? currentQuestionData.modelAnswer }} />
                      </div>
                      <div>
                          <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3 border-b dark:border-slate-700 pb-2">Expert Guidance</h4>
                          <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-headings:text-slate-800 prose-p:text-slate-700 prose-ul:list-disc prose-ul:pl-6"
                               dangerouslySetInnerHTML={{ __html: translatedQuestionContent?.guidance ?? currentQuestionData.guidance }} />
                      </div>
                  </div>
              )}
              {activeTab === 'practice' && (
                  <PracticeTab {...practiceProps} />
              )}
          </div>
      </div>
    </div>
  </section>
  );
};