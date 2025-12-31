import React, { useMemo, useState } from 'react';
import DOMPurify from 'dompurify';
import { PracticeAttempt as PracticeAttemptType } from '../types';

interface PracticeHistoryListProps {
  practiceHistory: PracticeAttemptType[];
}

const formatDuration = (seconds?: number) => {
  if (seconds == null || !Number.isFinite(seconds)) return null;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const PracticeAttempt: React.FC<{ attempt: PracticeAttemptType, index: number }> = React.memo(({ attempt, index }) => {
  const score = attempt.score;
  const scoreColor = score >= 8 ? 'text-green-400' : score >= 5 ? 'text-yellow-400' : 'text-red-400';
  const scoreRingColor = score >= 8 ? 'ring-green-400/50' : score >= 5 ? 'ring-yellow-400/50' : 'ring-red-400/50';
  
  // SECURITY: Sanitize HTML content from the database before rendering to prevent XSS attacks.
  const sanitizedFeedback = DOMPurify.sanitize(attempt.feedback);

  return (
    <div className="bg-glass-bg p-4 sm:p-6 rounded-2xl sm:rounded-3xl backdrop-blur-lg border border-glass-border">
      <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
        <div className="flex-1">
          <h4 className="font-bold text-base sm:text-lg">Attempt #{index}: {attempt.question}</h4>
          <p className="text-xs text-gray-400">{new Date(attempt.timestamp).toLocaleString()}</p>
        </div>
        <div className={`relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary-dark-purple ring-2 sm:ring-4 ${scoreRingColor} flex-shrink-0`}>
          <span className={`font-bold text-lg sm:text-2xl ${scoreColor}`}>{score.toFixed(1)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <h5 className="font-semibold mb-2 text-primary-purple text-sm sm:text-base">Your Answer (Transcript)</h5>
          <div className="bg-white/5 p-3 sm:p-4 rounded-xl max-h-48 overflow-y-auto">
            <p className="text-xs sm:text-sm text-gray-300 italic">"{attempt.transcript}"</p>
          </div>
          {attempt.audioUrl && (
            <div className="mt-3">
              <h6 className="font-semibold mb-1 text-primary-purple text-xs sm:text-sm">Audio Recording</h6>
              <audio
                controls
                src={attempt.audioUrl}
                className="w-full"
              >
                Your browser does not support the audio element.
              </audio>
              {formatDuration(attempt.audioDurationSeconds) && (
                <p className="text-[11px] sm:text-xs text-gray-400 mt-1">
                  Duration: {formatDuration(attempt.audioDurationSeconds)} min
                </p>
              )}
            </div>
          )}
        </div>
        <div>
          <h5 className="font-semibold mb-2 text-primary-purple text-sm sm:text-base">AI Feedback</h5>
          <div 
            className="bg-white/5 p-3 sm:p-4 rounded-xl text-xs sm:text-sm text-gray-300 max-h-48 overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: sanitizedFeedback }}
          />
        </div>
      </div>
    </div>
  );
});

const PracticeHistoryList: React.FC<PracticeHistoryListProps> = ({ practiceHistory }) => {
  const [displayLimit, setDisplayLimit] = useState(20);
  
  // Memoize sorted history to avoid re-sorting on every render
  const sortedHistory = useMemo(() => {
    return [...practiceHistory].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [practiceHistory]);
  
  // Only display limited items initially for better performance
  const displayedHistory = sortedHistory.slice(0, displayLimit);
  const hasMore = sortedHistory.length > displayLimit;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg sm:text-xl font-bold">Practice History</h3>
        {sortedHistory.length > 0 && (
          <span className="text-sm text-gray-400">
            Showing {displayedHistory.length} of {sortedHistory.length}
          </span>
        )}
      </div>
      {displayedHistory.map((attempt, index) => (
        <PracticeAttempt key={attempt.id} attempt={attempt} index={sortedHistory.length - index} />
      ))}
      {hasMore && (
        <button
          onClick={() => setDisplayLimit(prev => prev + 20)}
          className="w-full py-3 bg-primary-purple hover:bg-primary-purple/80 text-white font-semibold rounded-lg transition-colors duration-200"
        >
          Load More ({sortedHistory.length - displayLimit} remaining)
        </button>
      )}
    </div>
  );
};

export default PracticeHistoryList;