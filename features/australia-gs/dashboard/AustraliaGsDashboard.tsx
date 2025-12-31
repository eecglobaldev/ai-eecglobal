'use client';

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/features/shared/lib/firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { StudentProfile } from './types';

import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { useStudentAnalytics } from './hooks/useStudentAnalytics';
import SummaryCard from './components/SummaryCard';
import AttemptsChart from './components/AttemptsChart';
import RightPanel from './components/RightPanel';
import ScoreDistribution from './components/ScoreDistribution';
import ApplicationInfo from './components/ApplicationInfo';
import { ClockIcon, TrendingUpIcon, UploadIcon, FireIcon } from './components/icons';

// Lazy load heavy components for better initial load performance
const PracticeHistoryList = lazy(() => import('./components/PracticeHistoryList'));
const QuestionProgressChart = lazy(() => import('./components/QuestionProgressChart'));

const COLLECTION_NAME = 'australia_gs_users';

interface StudentDashboardProps {
    profile: StudentProfile;
    onMenuClick: () => void;
    onProfilePhotoUpdated: (url: string) => void;
    collectionName: string;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ profile, onMenuClick, onProfilePhotoUpdated, collectionName, theme, onToggleTheme }) => {
    const { data, loading, error } = useStudentAnalytics(profile.id, collectionName);

    // Show skeleton loader instead of blocking
    if (loading) {
        return (
            <div className="flex-1 flex flex-col ml-2 sm:ml-4 lg:ml-8 gap-4 sm:gap-6">
                <div className="h-16 bg-glass-bg rounded-2xl animate-pulse" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-32 bg-glass-bg rounded-2xl animate-pulse" />
                    ))}
                </div>
                <div className="h-64 bg-glass-bg rounded-2xl animate-pulse" />
            </div>
        );
    }

    if (error || !data) {
        return <div className="flex items-center justify-center w-full h-screen text-red-400"><p>Error: {error?.message || 'Could not load analytics data.'}</p></div>;
    }

    return (
      <div className="flex-1 flex flex-col ml-2 sm:ml-4 lg:ml-8 gap-4 sm:gap-6">
        <Header profile={profile} onMenuClick={onMenuClick} theme={theme} onToggleTheme={onToggleTheme} />
        <div className="flex-1 flex flex-col lg:flex-row gap-4 sm:gap-6 overflow-hidden">
          <div className="flex-1 flex flex-col gap-4 sm:gap-6 overflow-y-auto pr-2 pb-4">
            <AttemptsChart 
              timeline={data.timeline} 
              totalAttempts={data.totalAttempts}
              totalPracticeDays={data.totalPracticeDays}
              avgScore={data.averageScore}
              theme={theme}
            />
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                <SummaryCard 
                    icon={<TrendingUpIcon />}
                    title="Total Attempts"
                    value={data.totalAttempts.toString()}
                    subtitle={`${data.attemptsLast7Days} in last 7 days`}
                    theme={theme}
                />
                <SummaryCard 
                    icon={<UploadIcon />}
                    title="Total Uploads"
                    value={(data.totalAudioUploads + data.totalSopUploads).toString()}
                    subtitle="Audio & SOPs"
                    theme={theme}
                />
                <SummaryCard 
                    icon={<FireIcon />}
                    title="Practice Streak"
                    value={`${data.streak} Days`}
                    subtitle="Keep it going!"
                    theme={theme}
                />
            </div>

            <ScoreDistribution practiceHistory={data.practiceHistory} theme={theme} />

            <ApplicationInfo applicationData={profile.applicationData} theme={theme} />

            <Suspense fallback={<div className="h-64 bg-glass-bg rounded-2xl animate-pulse" />}>
                <QuestionProgressChart practiceHistory={data.practiceHistory} theme={theme} />
            </Suspense>

            <Suspense fallback={<div className="space-y-4"><div className="h-8 bg-glass-bg rounded animate-pulse w-48" /><div className="h-32 bg-glass-bg rounded-2xl animate-pulse" /></div>}>
                <PracticeHistoryList practiceHistory={data.practiceHistory} />
            </Suspense>
          </div>
          <RightPanel 
            analytics={data}
            profile={profile}
            collectionName={collectionName}
            onProfilePhotoUpdated={onProfilePhotoUpdated}
          />
        </div>
      </div>
    );
}

const AustraliaGsDashboard: React.FC = () => {
    const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window === 'undefined') return 'dark';
        return (localStorage.getItem('dashboard-theme') as 'light' | 'dark') || 'dark';
    });

    const handleProfilePhotoUpdated = (url: string) => {
        setStudentProfile(prev => (prev ? { ...prev, photoURL: url } : prev));
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // User is authenticated, fetch their profile
                const docRef = doc(db, COLLECTION_NAME, currentUser.uid);
                try {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const profileData = { id: docSnap.id, ...docSnap.data() } as StudentProfile;
                    
                    // Fetch application subcollection data
                    try {
                        // First, try to get from 'application' subcollection
                        const applicationCollectionRef = collection(db, COLLECTION_NAME, currentUser.uid, 'application');
                        const applicationSnapshot = await getDocs(applicationCollectionRef);
                        
                        if (!applicationSnapshot.empty) {
                            // Get the first document from the application subcollection
                            const firstDoc = applicationSnapshot.docs[0];
                            profileData.applicationData = { id: firstDoc.id, ...firstDoc.data() };
                        } else {
                            // If subcollection is empty, try getting specific document
                            const applicationDocRef = doc(db, COLLECTION_NAME, currentUser.uid, 'application', 'full_application_data');
                            const applicationSnap = await getDoc(applicationDocRef);
                            if (applicationSnap.exists()) {
                                profileData.applicationData = applicationSnap.data();
                            }
                        }
                    } catch (appError) {
                        console.warn('Could not fetch application subcollection:', appError);
                    }
                    
                    setStudentProfile(profileData);
                } else {
                        console.error(`No profile document found for UID: ${currentUser.uid}`);
                        console.error(`Please ensure a document exists at: ${COLLECTION_NAME}/${currentUser.uid}`);
                }
                } catch (error) {
                    console.error('Error fetching student profile:', error);
                }
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.body.dataset.theme = theme;
            localStorage.setItem('dashboard-theme', theme);
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    };

    // Close sidebar when clicking outside on mobile and prevent body scroll
    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(false);
            }
        };
        
        // Prevent body scroll when sidebar is open on mobile
        if (sidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            document.body.style.overflow = '';
        };
    }, [sidebarOpen]);
    
    if (loading) {
        return <div className="flex items-center justify-center min-h-screen w-full bg-primary-dark-purple text-white"><p>Initializing Dashboard...</p></div>;
    }
    
    return (
        <ProtectedRoute>
            <div className="min-h-screen flex p-2 sm:p-4">
            {studentProfile ? (
                <>
                        <Sidebar 
                            isOpen={sidebarOpen} 
                            onClose={() => setSidebarOpen(false)} 
                            profileName={studentProfile.name}
                            photoURL={studentProfile.photoURL}
                            theme={theme}
                        />
                        <main className="flex-1 flex w-full lg:ml-0">
                            <StudentDashboard 
                                profile={studentProfile} 
                                onMenuClick={() => setSidebarOpen(true)}
                                onProfilePhotoUpdated={handleProfilePhotoUpdated}
                                collectionName={COLLECTION_NAME}
                                theme={theme}
                                onToggleTheme={toggleTheme}
                            />
                    </main>
                </>
            ) : (
                    <div className="flex items-center justify-center min-h-screen w-full px-4">
                        <p className="text-center">No student profile could be loaded.</p>
                    </div>
            )}
        </div>
        </ProtectedRoute>
    );
};

export default AustraliaGsDashboard;


