import { useState, useEffect, useMemo } from 'react';
import { collection, query, getDocs, orderBy, limit, Timestamp } from 'firebase/firestore';
import { listAll, ref } from 'firebase/storage';
import { db, storage } from '@/features/shared/lib/firebase';
import { StudentAnalyticsData, PracticeAttempt, PrepData, TimelineData, RawPracticeAttempt } from '../types';
import { format, differenceInDays, isValid, parseISO, startOfDay, subDays } from 'date-fns';

// --- Helper Functions ---

const calculateStreak = (dates: Date[]): number => {
    if (dates.length === 0) return 0;
    const uniqueDays = [...new Set(dates.map(d => startOfDay(d).getTime()))].sort((a, b) => b - a);
    if (differenceInDays(new Date(), new Date(uniqueDays[0] as number)) > 1) return 0;
    let streak = 1;
    for (let i = 0; i < uniqueDays.length - 1; i++) {
        if (differenceInDays(new Date(uniqueDays[i] as number), new Date(uniqueDays[i + 1] as number)) === 1) {
            streak++;
        } else {
            break;
        }
    }
    return streak;
};

const getSafeTimestampString = (timestamp: any): string | null => {
    if (!timestamp) return null;
    if (typeof timestamp.toDate === 'function') return timestamp.toDate().toISOString();
    if (typeof timestamp === 'string' || typeof timestamp === 'number') {
        const date = new Date(timestamp);
        if (isValid(date)) return date.toISOString();
    }
    return null;
};

// --- Main Data Processing Logic ---

const processAnalytics = (
    practiceHistory: PracticeAttempt[],
    prepData: PrepData[],
    audioUploadsCount: number,
    sopUploadsCount: number
): StudentAnalyticsData => {
    const practiceDates = practiceHistory.map(p => parseISO(p.timestamp));

    const totalAttempts = practiceHistory.length;
    const attemptsLast7Days = practiceHistory.filter(p => differenceInDays(new Date(), parseISO(p.timestamp)) < 7).length;
    const totalDuration = practiceHistory.reduce((sum, p) => sum + p.duration, 0);
    const averageDuration = totalAttempts > 0 ? totalDuration / totalAttempts : 0;
    const totalScore = practiceHistory.reduce((sum, p) => sum + p.score, 0);
    const averageScore = totalAttempts > 0 ? totalScore / totalAttempts : 0;
    const totalPracticeDays = practiceHistory.length > 0
        ? new Set(practiceHistory.map(p => format(startOfDay(parseISO(p.timestamp)), 'yyyy-MM-dd'))).size
        : 0;

    const firstPracticeDate = practiceDates.length > 0 ? format(new Date(Math.min(...practiceDates.map(d => d.getTime()))), 'MMM dd, yyyy') : null;
    const lastPracticeDate = practiceDates.length > 0 ? format(new Date(Math.max(...practiceDates.map(d => d.getTime()))), 'MMM dd, yyyy') : null;
    const streak = calculateStreak(practiceDates);

    const totalTranscripts = prepData.filter(p => p.type === 'transcript').length;
    const keyTalkingPointsGenerated = prepData.filter(p => p.type === 'kpoints').length;
    const sopGenerated = prepData.filter(p => p.type === 'sop').length;

    const profileCompleteness = ((totalAttempts > 0 ? 1 : 0) + (sopUploadsCount > 0 ? 1 : 0) + (keyTalkingPointsGenerated > 0 ? 1 : 0)) / 3 * 100;

    const timelineMap: { [key: string]: TimelineData } = {};
    const ensureEntry = (isoDate: string) => {
        if (!timelineMap[isoDate]) {
            timelineMap[isoDate] = {
                isoDate,
                label: format(parseISO(isoDate), 'MMM d'),
                attempts: 0,
                uploads: 0,
                aiGenerations: 0,
            };
        }
        return timelineMap[isoDate];
    };

    practiceHistory.forEach((p) => {
        const isoDate = format(parseISO(p.timestamp), 'yyyy-MM-dd');
        ensureEntry(isoDate).attempts += 1;
    });

    prepData.forEach((p) => {
        const isoDate = format(parseISO(p.createdAt), 'yyyy-MM-dd');
        ensureEntry(isoDate).aiGenerations += 1;
    });

    const timeline = Object.values(timelineMap).sort(
        (a, b) => new Date(a.isoDate).getTime() - new Date(b.isoDate).getTime()
    );

    return {
        totalAttempts, attemptsLast7Days, averageDuration, averageScore, totalPracticeDays,
        firstPracticeDate, lastPracticeDate, streak, totalAudioUploads: audioUploadsCount,
        totalSopUploads: sopUploadsCount, totalTranscripts, keyTalkingPointsGenerated,
        sopGenerated, profileCompleteness, timeline, practiceHistory,
    };
};

// --- Custom Hook ---

export const useStudentAnalytics = (uid: string | null, collectionName: string) => {
    const [data, setData] = useState<StudentAnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!uid) {
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);
            
            try {
                // Optimize: Limit queries to reduce initial load time
                // Fetch only last 500 practice attempts (ordered by timestamp desc)
                // For analytics, we only need recent data for charts and stats
                // 
                // NOTE: For optimal performance, create Firestore composite indexes:
                // - Collection: practice_history, Fields: timestamp (Descending)
                // - Collection: prep_data, Fields: createdAt (Descending)
                // If indexes are missing, the code will fallback to fetching all and sorting in memory
                const practiceHistoryCollectionRef = collection(db, collectionName, uid, 'practice_history');
                
                // Try optimized query first, fallback to full fetch if index missing
                let practiceHistorySnapshot;
                try {
                    const practiceHistoryQuery = query(
                        practiceHistoryCollectionRef,
                        orderBy('timestamp', 'desc'),
                        limit(500)
                    );
                    practiceHistorySnapshot = await getDocs(practiceHistoryQuery);
                } catch (queryError: any) {
                    // If query fails (likely missing index), fetch all and limit in memory
                    console.warn('Query with orderBy failed, fetching all documents:', queryError.message);
                    const allDocs = await getDocs(practiceHistoryCollectionRef);
                    // Sort and limit in memory
                    const sortedDocs = allDocs.docs
                        .sort((a, b) => {
                            const aTime = a.data().timestamp?.toMillis?.() || new Date(a.data().timestamp || 0).getTime();
                            const bTime = b.data().timestamp?.toMillis?.() || new Date(b.data().timestamp || 0).getTime();
                            return bTime - aTime;
                        })
                        .slice(0, 500);
                    practiceHistorySnapshot = { docs: sortedDocs };
                }
                
                const prepDataCollectionRef = collection(db, collectionName, uid, 'prep_data');
                let prepDataSnapshot;
                try {
                    const prepDataQuery = query(
                        prepDataCollectionRef,
                        orderBy('createdAt', 'desc'),
                        limit(200)
                    );
                    prepDataSnapshot = await getDocs(prepDataQuery);
                } catch (queryError: any) {
                    // Fallback to full fetch if index missing
                    console.warn('Prep data query failed, fetching all:', queryError.message);
                    const allDocs = await getDocs(prepDataCollectionRef);
                    const sortedDocs = allDocs.docs
                        .sort((a, b) => {
                            const aTime = a.data().createdAt?.toMillis?.() || a.data().timestamp?.toMillis?.() || new Date(a.data().createdAt || a.data().timestamp || 0).getTime();
                            const bTime = b.data().createdAt?.toMillis?.() || b.data().timestamp?.toMillis?.() || new Date(b.data().createdAt || b.data().timestamp || 0).getTime();
                            return bTime - aTime;
                        })
                        .slice(0, 200);
                    prepDataSnapshot = { docs: sortedDocs };
                }
                
                // Storage listing can be slow with many files - fetch in background
                const audioRef = ref(storage, `student_audio/${uid}`);
                const sopRef = ref(storage, `student_sop/${uid}`);
                
                // Fetch storage counts in parallel (non-blocking, can be slow)
                const [audioList, sopList] = await Promise.all([
                    listAll(audioRef).catch(() => ({ items: [] })),
                    listAll(sopRef).catch(() => ({ items: [] }))
                ]);

                const practiceHistory: PracticeAttempt[] = practiceHistorySnapshot.docs.map(doc => {
                    const data = doc.data() as RawPracticeAttempt;
                    return {
                        ...data,
                        id: doc.id,
                        score: typeof data.score === 'number' ? data.score : 0,
                        duration: typeof data.duration === 'number' ? data.duration : 0,
                        timestamp: getSafeTimestampString(data.timestamp)!,
                        questionId: data.questionId || `question_${data.attemptId || 'unknown'}`,
                        audioUrl: data.audioUrl,
                        audioDurationSeconds: data.audioDurationSeconds,
                    };
                }).filter(attempt => attempt.timestamp);

                const prepData: PrepData[] = prepDataSnapshot.docs.map(doc => {
                    const data = doc.data();
                    return { ...data, id: doc.id, createdAt: getSafeTimestampString(data.createdAt || data.timestamp)! } as PrepData;
                }).filter(item => item.createdAt);
                
                const analytics = processAnalytics(practiceHistory, prepData, audioList.items.length, sopList.items.length);
                setData(analytics);

            } catch (err) {
                setError(err as Error);
                console.error("Failed to fetch student analytics:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [uid, collectionName]);

    return { data, loading, error };
};