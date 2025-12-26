import React, { useState, useEffect, useRef } from 'react';

interface CustomAudioPlayerProps {
  src: string;
  className?: string;
}

const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
};

export const CustomAudioPlayer: React.FC<CustomAudioPlayerProps> = ({ src, className = '' }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Update current time as audio plays
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      if (audio.duration && isFinite(audio.duration)) {
        setDuration(audio.duration);
        setIsLoading(false);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    // Try to get duration immediately
    if (audio.duration && isFinite(audio.duration)) {
      setDuration(audio.duration);
      setIsLoading(false);
    }

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('durationchange', updateDuration);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    // Retry getting duration if not available immediately
    let retryCount = 0;
    const retryInterval = setInterval(() => {
      if (audio.duration && isFinite(audio.duration)) {
        setDuration(audio.duration);
        setIsLoading(false);
        clearInterval(retryInterval);
      } else if (retryCount++ > 50) {
        // Stop retrying after 5 seconds (50 * 100ms)
        clearInterval(retryInterval);
        console.warn('Could not load audio duration');
      }
    }, 100);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('durationchange', updateDuration);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      clearInterval(retryInterval);
    };
  }, [src]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(err => {
        console.error('Error playing audio:', err);
      });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border dark:border-slate-600 ${className}`}>
      {/* Play/Pause Button */}
      <button
        onClick={togglePlayPause}
        className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 rounded-full transition-colors"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <svg className="w-5 h-5 text-slate-700 dark:text-slate-200" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-slate-700 dark:text-slate-200 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* Time Display */}
      <div className="flex-shrink-0 text-sm font-mono text-slate-700 dark:text-slate-200 min-w-[80px]">
        {isLoading ? (
          <span className="text-slate-400">Loading...</span>
        ) : (
          <span>{formatTime(Math.floor(currentTime))} / {formatTime(Math.floor(duration))}</span>
        )}
      </div>

      {/* Progress Bar */}
      <div className="flex-1 relative">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #475569 0%, #475569 ${progress}%, #cbd5e1 ${progress}%, #cbd5e1 100%)`
          }}
        />
      </div>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onLoadedMetadata={(e) => {
          const audio = e.currentTarget;
          if (audio.duration && isFinite(audio.duration)) {
            setDuration(audio.duration);
            setIsLoading(false);
          }
        }}
        onCanPlay={() => {
          const audio = audioRef.current;
          if (audio && audio.duration && isFinite(audio.duration)) {
            setDuration(audio.duration);
            setIsLoading(false);
          }
        }}
      />
    </div>
  );
};





