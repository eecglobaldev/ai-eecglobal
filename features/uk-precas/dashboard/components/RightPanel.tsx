import React, { useState } from 'react';
import { StudentAnalyticsData, StudentProfile } from '../types';
import { db, storage } from '@/features/shared/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { CameraIcon } from './icons';

interface RightPanelProps {
  analytics: StudentAnalyticsData;
  profile: StudentProfile;
  collectionName: string;
  onProfilePhotoUpdated?: (url: string) => void;
}

const ProgressInsightCard: React.FC<{ title: string; value: string; progress: number }> = ({ title, value, progress }) => (
    <div className="bg-white/5 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
        <div className="flex justify-between items-center mb-2">
            <span className="text-xs sm:text-sm text-gray-300">{title}</span>
            <span className="font-bold text-white text-sm sm:text-base">{value}</span>
        </div>
        <div className="w-full bg-primary-dark-purple rounded-full h-2">
            <div className="bg-gradient-to-r from-secondary-pink to-primary-purple h-2 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
    </div>
);

const getNextStep = (analytics: StudentAnalyticsData): string => {
    if (analytics.totalAttempts === 0) return "Complete your first practice interview.";
    if (analytics.totalSopUploads === 0) return "Upload your Statement of Purpose for review.";
    if (analytics.streak === 0) return "Start a new practice streak today!";
    return "Review feedback from your last attempt.";
}

const RightPanel: React.FC<RightPanelProps> = ({
  analytics,
  profile,
  collectionName,
  onProfilePhotoUpdated,
}) => {
  const nextStep = getNextStep(analytics);
  const firstLetter = profile.name?.trim().charAt(0).toUpperCase() || 'U';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select an image to upload.');
      return;
    }

    setUploading(true);
    setError(null);
    try {
      const storageRef = ref(storage, `profile_photos/${profile.id}/${selectedFile.name}`);
      await uploadBytes(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(storageRef);
      await updateDoc(doc(db, collectionName, profile.id), { photoURL: downloadURL });
      onProfilePhotoUpdated?.(downloadURL);
      setIsModalOpen(false);
      setSelectedFile(null);
    } catch (err) {
      console.error('Failed to upload profile photo', err);
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <aside className="w-full lg:w-80 flex-shrink-0 bg-glass-bg p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col gap-4 sm:gap-6 overflow-y-auto border border-glass-border">
      <div>
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="relative w-12 h-12 sm:w-16 sm:h-16">
              <div className="w-full h-full rounded-full bg-primary-purple ring-2 sm:ring-4 ring-primary-purple/50 flex items-center justify-center text-white font-bold text-base sm:text-lg overflow-hidden">
                {profile.photoURL ? (
                    <img src={profile.photoURL} alt={profile.name} className="w-full h-full object-cover" />
                  ) : (
                    <span style={{ color: '#ffffff' }}>{firstLetter}</span>
                  )}
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-7 h-7 rounded-full bg-white text-primary-purple shadow-lg flex items-center justify-center hover:bg-primary-purple hover:text-white transition"
                aria-label="Edit profile photo"
              >
                <CameraIcon className="h-3 w-3" />
              </button>
            </div>
            <div className="min-w-0">
                <h3 className="font-bold text-base sm:text-lg truncate">{profile.name}</h3>
                <p className="text-xs sm:text-sm text-gray-400">Student Applicant</p>
            </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 sm:gap-3 text-center text-xs sm:text-sm">
            <div className="bg-white/5 p-2 sm:p-3 rounded-xl">
                <p className="font-bold text-base sm:text-lg">{analytics.totalAttempts}</p>
                <p className="text-xs text-gray-400">Attempts</p>
            </div>
            <div className="bg-white/5 p-2 sm:p-3 rounded-xl">
                <p className="font-bold text-base sm:text-lg">{profile.city || 'N/A'}</p>
                <p className="text-xs text-gray-400">Location</p>
            </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Progress Insights</h3>
        <div className="space-y-3 sm:space-y-4">
            <ProgressInsightCard 
                title="Profile Completeness"
                value={`${analytics.profileCompleteness.toFixed(0)}%`}
                progress={analytics.profileCompleteness}
            />
            <div className="bg-secondary-pink/20 text-secondary-pink p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-secondary-pink/50">
                <p className="font-bold text-xs sm:text-sm mb-1">Suggested Next Step:</p>
                <p className="text-xs">{nextStep}</p>
            </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Activity Dates</h3>
        <div className="text-xs sm:text-sm space-y-2 text-gray-300">
            <div className="flex justify-between">
                <span>First Practice:</span>
                <span className="font-semibold text-white text-right">{analytics.firstPracticeDate || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
                <span>Last Practice:</span>
                <span className="font-semibold text-white text-right">{analytics.lastPracticeDate || 'N/A'}</span>
            </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-primary-dark-purple border border-white/10 rounded-2xl p-6 w-11/12 max-w-md shadow-2xl">
            <h4 className="text-lg font-bold mb-4">Update Profile Photo</h4>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-purple file:text-white hover:file:bg-primary-purple/80"
            />
            {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedFile(null);
                  setError(null);
                }}
                className="px-4 py-2 rounded-xl border border-white/20 text-sm hover:bg-white/10 transition"
                disabled={uploading}
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="px-4 py-2 rounded-xl bg-primary-purple text-sm font-semibold hover:bg-primary-purple/80 transition disabled:opacity-50"
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default RightPanel;
