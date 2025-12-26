'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { UserProfile, PrepContent, HistoryItem, ModalInfo } from '../types';
import {
  INSTITUTION_TYPES, UNIVERSITIES, POLYTECHNICS,
  COURSE_LEVELS, SPONSOR_TYPES, INITIAL_USER_PROFILE,
  AUTH_MODAL_EVENT,
  DASHBOARD_URL
} from '../constants';
import { cardData } from './constants';
import Card from './Card';
import { KnowledgePortal } from './KnowledgePortal';

import { Header } from './Header';
import { SetupForm } from './SetupForm';
import { InterviewFlow } from './InterviewFlow';
import { HistorySection } from './History';
import { Modal } from './Modal';
import { BranchLocator } from './BranchLocator';
import { LoginSignupModal } from './LoginSignupModel';
import { AuthGateModal } from './AuthGateModal';
import { sendRegistrationNotificationEmailsUniversal } from '../services/emailService';
import {
  getUserByEmail,
  incrementPrepPlanCount,
  ensureUserSignedIn,
} from '../services/userService';
import {
  savePrepData,
  addPracticeHistoryItem,
  getUserPrepData,
} from '../services/prepDataService';
import { saveNzApplicationProfile } from '../services/studentApplicationService';
import Footer from './Footer';
import { useAppState } from '../services/hooks/useAppState';

// SEO Architecture Components - TOTAL GOOGLE DOMINATION
import { 
  SEOBooster, 
  TopicalClusters, 
  LSIContent, 
  LocalSEO,
  // Advanced SEO Components (25+ Critical Improvements)
  AdvancedSchemas,
  FeaturedSnippets,
  UniversityComparison,
  EEATEnhancement,
  // Phase 2: 45 Interventions Audit Implementation (December 2025)
  VisaChecklist,
  CountryComparison,
  CostCalculator,
  AuthorProfiles,
  NZStatistics,
  // Phase 3: GEO/AEO 50X Enterprise Protocol
  GEOEngine,
  GlossaryOfTruth
} from '../seo';

// Breadcrumbs Navigation Component
import { Breadcrumbs } from './Breadcrumbs';

// --- Helper Functions ---
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

const sanitizeScore = (rawScore: any): number => {
    if (rawScore === null || rawScore === undefined) return 5;
    const score = parseInt(rawScore, 10);
    if (isNaN(score)) return 5;
    return Math.max(1, Math.min(10, score));
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


export default function NzVisaApp() {
  // ⭐ Use custom hook for app state (includes Firestore persistence)
  const {
    profile, setProfile,
    prepContent, setPrepContent,
    history, setHistory,
    currentQuestionIndex, setCurrentQuestionIndex,
    isLoadingFromFirestore,
    saveToFirestore
  } = useAppState();

  const [currentPrepDataId, setCurrentPrepDataId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>('Generating...');
  const [modalInfo, setModalInfo] = useState<ModalInfo>({ isOpen: false, message: '' });
  const [progress, setProgress] = useState(0);
  
  // Initialize theme from localStorage to prevent flash
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'light';
      // Apply theme immediately to HTML element
      const root = window.document.documentElement;
      if (savedTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      return savedTheme;
    }
    return 'light';
  });

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Apply and persist theme changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      const isDark = theme === 'dark';

      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    }
  }, [theme]);


  const progressIntervalRef = useRef<number | null>(null);
  
  const ai = useRef<GoogleGenAI | null>(null);

  useEffect(() => {
    // Use NEXT_PUBLIC_ prefix for client-side access in Next.js
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.API_KEY;
    if (apiKey) {
      ai.current = new GoogleGenAI({ apiKey });
    }
  }, []);
  
  // ⭐ Show loading indicator when fetching from Firestore
  useEffect(() => {
    if (isLoadingFromFirestore) {
      setIsLoading(true);
      setLoadingText('Loading your saved data from cloud...');
    } else {
      if (loadingText === 'Loading your saved data from cloud...') {
        setIsLoading(false);
        setLoadingText('');
      }
    }
  }, [isLoadingFromFirestore, loadingText]);

  // Load currentPrepDataId from localStorage and cleanup old incomplete data
  useEffect(() => {
    // SSR guard: localStorage is only available in the browser
    if (typeof window === 'undefined') return;

    try {
      const storedPrepId = localStorage.getItem('currentPrepDataId');
      if (storedPrepId) setCurrentPrepDataId(storedPrepId);
      
      // Cleanup old localStorage keys (v6 and earlier)
      const oldKeys = ['nzVisaCanvasState_v6_react', 'nzVisaCanvasState_v5_react', 'nzVisaCanvasState_v4_react'];
      oldKeys.forEach(key => {
        if (localStorage.getItem(key)) {
          console.log('🧹 Cleaning up old localStorage key:', key);
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error("Failed to load prepDataId from local storage:", error);
    }
  }, []);

  useEffect(() => {
    // SSR guard: window is only available in the browser
    if (typeof window === 'undefined') return;

    const handleAuthModalEvent = (event: Event) => {
      const detail = (event as CustomEvent<{ type?: 'login' | 'signup' }>).detail?.type ?? 'login';
      if (detail === 'signup') {
        setShowLoginModal(true);
        setShowAuthModal(false);
      } else {
        setShowAuthModal(true);
        setShowLoginModal(false);
      }
    };

    window.addEventListener(AUTH_MODAL_EVENT, handleAuthModalEvent as EventListener);
    return () => {
      window.removeEventListener(AUTH_MODAL_EVENT, handleAuthModalEvent as EventListener);
    };
  }, []);
  
  const showModal = useCallback((message: string, isConfirm = false, onConfirm?: () => void) => {
    setModalInfo({ isOpen: true, message, isConfirm, onConfirm });
  }, []);
  
  const hideModal = useCallback(() => {
    setModalInfo({ isOpen: false, message: '' });
  }, []);

  const makeApiCall = async (promptOrContents: string | { parts: any[] }, systemInstruction?: string): Promise<string | null> => {
    // Use NEXT_PUBLIC_ prefix for client-side access in Next.js
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
        showModal("API Key is not configured. Please ensure it is set up in your environment variables.");
        return null;
    }
    if (!ai.current) {
        ai.current = new GoogleGenAI({ apiKey });
    }

    try {
        const contents = typeof promptOrContents === 'string' 
            ? { parts: [{ text: promptOrContents }] } 
            : promptOrContents;

        const response = await ai.current.models.generateContent({
          model: 'gemini-2.5-flash',
          contents,
          ...(systemInstruction && { config: { systemInstruction } }),
        });
        return response.text || null;
    } catch (error) {
        console.error("API Call Error:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        if (errorMessage.includes('429') || errorMessage.includes('RESOURCE_EXHAUSTED')) {
            showModal("You've made too many requests in a short period, which has triggered the API rate limit. Please wait a moment before trying again.");
        } else {
            showModal(`An AI error occurred: ${errorMessage}. Please check your API key and try again.`);
        }
        return null;
    }
};

  const startProgressBar = () => {
    // SSR guard: window is only available in the browser
    if (typeof window === 'undefined') return;

    setProgress(1); // To make it visible immediately
    progressIntervalRef.current = window.setInterval(() => {
        setProgress(prev => {
            if (prev >= 95) {
                if(progressIntervalRef.current) clearInterval(progressIntervalRef.current);
                return prev;
            }
            return prev + 2;
        });
    }, 100);
  };
  
  const completeProgressBar = () => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    setProgress(100);
    setTimeout(() => {
        setProgress(0);
    }, 500);
  };

  const resetProgressBar = () => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    setProgress(0);
  };

  const sendRegistrationEmail = useCallback(async () => {
    // SSR guard: localStorage is only available in the browser
    if (typeof window === 'undefined') return;

    try {
      // console.log('📧 Starting email notification process...');
      
      const userEmail = localStorage.getItem('NZUserEmail');
      if (!userEmail) {
        // console.log('⚠️ No user email found in localStorage, skipping email notification');
        return;
      }
      // console.log('✅ User email found:', userEmail);

      const userData = await getUserByEmail(userEmail);
      if (!userData) {
        // console.log('⚠️ No user data found in Firebase for email:', userEmail);
        return;
      }
      // console.log('✅ User data retrieved from Firebase:', userData);

      const p = profile;
      const academicPlan = {
        institutionType: p.institutionType,
        institutionName: p.institutionName,
        courseLevel: p.courseLevel,
        courseName: p.courseName,
        previousEducation: p.previousEducation,
        workExperience: p.workExperience,
        careerGoals: p.careerGoals,
        testScores: p.testScores,
        usesFTS: p.usesFTS,
        primarySponsor: p.primarySponsor,
        sponsor1Name: p.sponsor1Name,
        sponsor1Profession: p.sponsor1Profession,
        sponsor1Income: p.sponsor1Income,
        sponsor2Name: p.sponsor2Name,
        sponsor2Profession: p.sponsor2Profession,
        sponsor2Income: p.sponsor2Income,
        fundingSources: p.fundingSources,
        maritalStatus: p.maritalStatus,
        dateOfMarriage: p.dateOfMarriage,
        marriageDurationInMonths: p.marriageDurationInMonths,
        spouseAccompanying: p.spouseAccompanying,
        spouseQualification: p.spouseQualification,
        spouseExperience: p.spouseExperience,
        childrenAccompanying: p.childrenAccompanying,
        numberOfChildren: p.numberOfChildren,
        childrenAges: p.childrenAges,
        hasVisaRefusal: p.hasVisaRefusal,
        refusalReason: p.refusalReason,
      };
      // console.log('✅ Academic plan prepared:', academicPlan);

      // console.log('📨 Sending email notification...');
      const emailResult = await sendRegistrationNotificationEmailsUniversal(userData, academicPlan);
      
      if (emailResult) {
        // console.log('✅ Email notification sent successfully!');
      } else {
        // console.log('⚠️ Email notification failed (returned false)');
      }
    } catch (emailErr) {
      // console.error('❌ Failed to send registration email:', emailErr);
    }
  }, [profile]);

  const handleGeneratePrep = async () => {
    const p = profile;
    if (
      !p.institutionType ||
      !p.institutionName ||
      !p.courseLevel ||
      !p.courseName ||
      !p.previousEducation ||
      !p.careerGoals ||
      !p.primarySponsor
    ) {
      showModal(
        'Please fill in all required fields in the Academic Plan, Profile, and Financial Dossier sections.'
      );
      return;
    }

    // SSR guard: localStorage is only available in the browser
    if (typeof window === 'undefined') return;

    const userEmail = localStorage.getItem('NZUserEmail');
    if (!userEmail) {
      setShowLoginModal(true);
      return;
    }

    const firebaseUser = await ensureUserSignedIn();
    const userId = firebaseUser.uid;
    const userRecord = await getUserByEmail(userEmail);
    if (!userRecord) {
      showModal('We could not locate your NZ profile. Please log in again.');
      return;
    }
    let sopFileName: string | undefined;

    setIsLoading(true);
    setLoadingText('Generating Plan...');
    startProgressBar();

    // Increment prep plan count every time user clicks "Generate Prep Plan"
    incrementPrepPlanCount(userEmail)
      .then((result) => {
        if (result.success) {
          // console.log('✅ Prep plan count incremented successfully');
        } else {
          // console.log('⚠️ Failed to increment prep plan count:', result.error);
        }
      })
      .catch((error) => {
        console.error('❌ Error incrementing prep plan count:', error);
      });

    // Fire-and-forget email notification so admins/counselors are notified even if AI call fails
    sendRegistrationEmail();

    try {
      const applicationResult = await saveNzApplicationProfile(userId, p);

      if (!applicationResult.success) {
        throw new Error(applicationResult.error || 'Unknown error');
      }

      sopFileName = applicationResult.storageFileName;
      if (sopFileName && typeof window !== 'undefined') {
        localStorage.setItem('lastSavedSopFileName', sopFileName);
      }
    } catch (applicationError) {
      console.error('Failed to persist application data:', applicationError);
      showModal(
        'Unable to save your application details. Please try again in a moment.'
      );
      resetProgressBar();
      setIsLoading(false);
      return;
    }

    let result;
    try {
        let prompt = `You are an expert New Zealand visa interview coach for a student from India. Your primary task is to generate model answers that are comprehensive, detailed, and 1-2 minutes in speaking length. You MUST act as an expert coach who synthesizes all the user's profile information into a cohesive, compelling, and consistent narrative for the visa officer. For each answer, you MUST intertwine specific details from the student's profile to make the answer rich, personalized, and irrefutably genuine. Maintain bullet point formatting (<ul>) for clarity, but ensure each point is detailed and contributes to the overall narrative.

**CRITICAL COACHING STRATEGY: The 'PSW then Return' Narrative.** For all questions related to post-study plans (e.g., 'What are your plans after graduation?', 'Will you return to India?'), you MUST generate answers that follow a balanced, two-step narrative: 1. The student's immediate plan is to apply for and utilize New Zealand's legal Post-Study Work (PSW) visa to gain 1-3 years of valuable international work experience. 2. Their long-term goal is to then return to India with these advanced skills to pursue their stated career goals. This approach is more credible and demonstrates a well-researched, realistic plan. You must frame the PSW visa as a legal and logical step in their career development, not as a means of permanent settlement.

**Formatting Style Guide (MANDATORY):**
- Standard Emphasis: Use the <strong> tag for all bold text.
- Highlighting Key Phrases: Use the <mark> tag for standard yellow highlighting.
- Critical Warnings & Ties to Home: Use <u class="underline-red"> for any statement that is a critical warning or strongly emphasizes ties to India.
- Ultimate Emphasis (The Core Message): For the single most important, must-remember point in an answer, use <strong class="highlight-blue">.

**Student Profile:**
- Institution: "${p.institutionName}" (${p.institutionType})
- Course: "${p.courseLevel} in ${p.courseName}"
- Background: "${p.previousEducation}"
- Experience: "${p.workExperience || 'None'}"
- English Score: "${p.testScores}"
- Goals in India: "${p.careerGoals}"
- Using FTS: ${p.usesFTS ? 'Yes' : 'No'}

**Financial Dossier:**
- Primary Sponsor: ${p.primarySponsor}
- Sponsor 1: ${p.sponsor1Name}, ${p.sponsor1Profession}, ${p.sponsor1Income}
${p.primarySponsor === 'Both Parents' ? `- Sponsor 2: ${p.sponsor2Name}, ${p.sponsor2Profession}, ${p.sponsor2Income}` : ''}
- Funding Mix: Family Savings (${p.fundingSources.familySavings || 'N/A'}), Education Loan (${p.fundingSources.educationLoan || 'N/A'}), Personal Savings (${p.fundingSources.personalSavings || 'N/A'})
`;
        if (p.maritalStatus === 'Married') {
          prompt += `\n**CRITICAL CONTEXT: The applicant is married.**
- Date of Marriage: ${p.dateOfMarriage}
- Spouse Accompanying: ${p.spouseAccompanying}
- Spouse Qualification: ${p.spouseQualification}
- Spouse Experience: ${p.spouseExperience}
- Children Accompanying: ${p.childrenAccompanying}
- Number of Children: ${p.numberOfChildren}
- Ages of Children: ${p.childrenAges}
You MUST now enter a 'Family Scrutiny' mode. Your questions and guidance must directly address the complexities of a family application.`;
        }
        if (p.hasVisaRefusal === 'yes') prompt += `\n- IMMIGRATION HISTORY (CRITICAL): Previous visa refusal noted (Reason: ${p.refusalReason}). Address this by including a tough question about what has changed since the refusal.`;

        prompt += `
**JSON Structure & Tasks (Your response MUST be ONLY a single, valid JSON object):**
1.  "keyTalkingPoints": A premium-formatted HTML string. Start with <h2>. Provide a conversational intro, then a <ul> of 3-5 deeply researched, factual reasons for choosing this course/university, ultra-personalized. Use Google Search for facts and apply all formatting rules.
2.  "questions": An array of 15 to 20 strategically selected question objects from the Visa Officer Curated Question Bank below. Each object must contain:
    a. "question": A string with the visa officer's question.
    b. "modelAnswer": A premium-formatted HTML string that MUST be an unordered list (<ul>). Each list item (<li>) must be a detailed, narrative point.
    c. "guidance": A premium-formatted HTML string providing **ultra-detailed, expert guidance** for the student. This should also be structured as a <ul> and explain the visa officer's psychology, what they are looking for, and specific do's and don'ts for the answer.

**Visa Officer Curated Question Bank (Your primary source for questions):**
- Please tell me about your educational and work background.
- Is this course relevant to your previous studies or work experience?
- Can you explain any gaps in your education or work history?
- How will this course help your long-term career goals in India?
- Why did you select this specific university over others?
- Can you tell me the location of your university campus?
- How many other universities did you apply to, in New Zealand or elsewhere?
- Can you explain the structure and key modules of your chosen course?
- Why can't you study a similar course in India?
- What is the commencement date and total duration of your course?
- Why did you choose New Zealand specifically over other countries like Australia, the USA, or Canada?
- How will you fund your entire education, including tuition and living expenses?
- Are you planning to return to India after your course ends?
- Do you have any family members or close relatives currently in New Zealand?
- Can you describe your previous international travel history?
- Have you ever had a visa refused for any country?
- Where have you arranged to stay in New Zealand upon arrival?

**Dynamic Questions (Add ONLY if applicable based on profile):**`;

        if ((p.marriageDurationInMonths ?? 12) < 12) {
            prompt += `\n- Your marriage is very recent. How will you prove this is a stable, long-term commitment?`;
        }
        if (p.spouseAccompanying === 'Yes') {
            prompt += `\n- Your spouse plans to accompany you. How does this fit with your family's long-term plan to return to India?`;
        }
        if (p.childrenAccompanying === 'Yes') {
            prompt += `\n- You are bringing children. Explain your financial and childcare arrangements.`;
        }

        prompt += `\nAll generated HTML content MUST follow all core instructions and formatting rules.`;
        
        result = await makeApiCall(prompt);
        if (result) {
            const jsonString = extractJson(result);
            if (!jsonString) throw new Error("No JSON content found in AI response.");
            
            const parsedContent = robustJsonParse(jsonString);

            setPrepContent(parsedContent);
            setCurrentQuestionIndex(0);
            completeProgressBar();
            setTimeout(() => document.getElementById('interview-flow')?.scrollIntoView({ behavior: 'smooth' }), 300);

            try {
              const prepSaveResult = await savePrepData({
                userId,
                prepContent: parsedContent,
                profileSummary: `${p.courseLevel} in ${p.courseName}`,
                sopFileName:
                  sopFileName ||
                  (typeof window !== 'undefined' ? localStorage.getItem('lastSavedSopFileName') : null) ||
                  undefined,
              });

              if (!prepSaveResult.success) {
                console.error(
                  'Failed to persist prep data:',
                  prepSaveResult.error
                );
                showModal(
                  'Plan generated, but saving to Firebase failed. Please retry from the dashboard.'
                );
              } else if (prepSaveResult.prepDataId) {
                setCurrentPrepDataId(prepSaveResult.prepDataId);
                if (typeof window !== 'undefined') {
                  localStorage.setItem('currentPrepDataId', prepSaveResult.prepDataId);
                  localStorage.setItem('latestPrepDataId', prepSaveResult.prepDataId);
                }
              }

              // ⭐ Save complete app state to Firestore after generating prep plan
              await saveToFirestore();
            } catch (prepSaveError) {
              console.error('Unexpected error while saving prep data:', prepSaveError);
            }
        } else {
            resetProgressBar();
        }
    } catch(e) {
        console.error("Failed to generate or parse AI response:", e, "Raw response:", result);
        showModal("The AI returned content in an unexpected format. Please try generating the plan again.");
        resetProgressBar();
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleAnalyzeAnswer = async (
    transcript: string,
    audioUrl?: string,
    audioDurationSeconds?: number
  ) => {
    setIsLoading(true);
    setLoadingText('Analyzing...');

    let result;
    try {
        const systemPrompt = `You are a senior New Zealand Consular Officer with years of experience interviewing Indian students. Your response MUST be a single JSON object with "score" and "feedback". 

**Your Task:**
Provide feedback on a student's spoken answer transcript. Your analysis MUST focus on the overall impact and credibility of the response as delivered in a live interview.

**CRITICAL RULE:** Do NOT focus on minor grammatical errors unless they severely impact clarity. This is an analysis of a spoken response, not a written essay.

**Assessment Rubric (Evaluate based on these points):**
1.  **Tone & Confidence:** Does the student sound confident and genuine, or hesitant and rehearsed?
2.  **Clarity & Directness:** Is the answer easy to understand and does it directly address the question?
3.  **Relevance & Consistency:** Does the answer align with the student's overall profile?
4.  **Persuasiveness:** How effectively does the answer address a visa officer's underlying concerns?

**Output Format:**
"feedback" must be a string of premium-formatted HTML. Provide balanced feedback using two divs: <div class="feedback-section feedback-positive"> and <div class="feedback-section feedback-improvement">. Inside, use all formatting tools: <mark>, <strong>, and <u class="underline-red">. IMPORTANT: Keep the total feedback text concise (around 100-150 words) to prevent the response from being cut short.`;
        
        const p = profile;
        const userQuery = `
            **Student's Profile for Context:**
            - University: "${p.institutionName}"
            - Course: "${p.courseLevel} in ${p.courseName}"
            - Background: "${p.previousEducation}"
            - Experience: "${p.workExperience || 'None'}"
            - Goals in India: "${p.careerGoals}"

            **Question Asked:** "${prepContent?.questions[currentQuestionIndex].question}"
            **Applicant's Answer Transcript:** "${transcript}"
        `;

        result = await makeApiCall(userQuery, systemPrompt);

        if (result) {
            const jsonString = extractJson(result);
            if (!jsonString) throw new Error("No JSON content found in AI feedback.");
            
            const feedbackData = robustJsonParse(jsonString);
            
            const sanitized = sanitizeScore(feedbackData.score);
            const questionData = prepContent!.questions[currentQuestionIndex];
            const questionId = `question_${currentQuestionIndex + 1}`;
            
            const newHistoryItem: HistoryItem = {
                id: Date.now(),
                timestamp: new Date().toISOString(),
                question: questionData.question,
                questionId,
                transcript: transcript,
                feedback: feedbackData.feedback,
                score: sanitized,
                audioUrl,
                audioDurationSeconds,
            };

            setHistory(prevHistory => {
                const existingIndex = prevHistory.findIndex(h => h.question === newHistoryItem.question);
                if (existingIndex > -1) {
                    const newHistory = [...prevHistory];
                    newHistory.splice(existingIndex, 1);
                    return [newHistoryItem, ...newHistory];
                }
                return [newHistoryItem, ...prevHistory];
            });

            let latestPrepId =
              currentPrepDataId ||
              (typeof window !== 'undefined' ? localStorage.getItem('currentPrepDataId') : null) ||
              (typeof window !== 'undefined' ? localStorage.getItem('latestPrepDataId') : null);


            // If prepDataId is still missing, try to recover from Firestore
            if (!latestPrepId) {
              try {
                console.log('🔍 prepDataId missing, attempting to recover from Firestore...');
                const firebaseUser = await ensureUserSignedIn();
                const prepDataList = await getUserPrepData(firebaseUser.uid);
                
                if (prepDataList && prepDataList.length > 0) {
                  // Get the most recent prep data (sorted by ID which contains timestamp)
                  const sortedPrepData = prepDataList.sort((a, b) => {
                    // Extract timestamp from ID (format: "prep_1733933333333")
                    const aTime = parseInt(a.id.replace('prep_', '')) || 0;
                    const bTime = parseInt(b.id.replace('prep_', '')) || 0;
                    return bTime - aTime; // Most recent first
                  });
                  
                  latestPrepId = sortedPrepData[0].id;
                  console.log('✅ Recovered prepDataId from Firestore:', latestPrepId);
                  
                  // Update state and localStorage for future use
                  setCurrentPrepDataId(latestPrepId);
                }
              } catch (recoveryError) {
                console.error('❌ Failed to recover prepDataId from Firestore:', recoveryError);
              }
            }

            if (latestPrepId) {
              try {
                const firebaseUser = await ensureUserSignedIn();
                await addPracticeHistoryItem(
                  firebaseUser.uid,
                  latestPrepId,
                  newHistoryItem
                );

                // ⭐ Save complete app state to Firestore after submitting answer
                await saveToFirestore();
              } catch (historySaveError) {
                console.error('Failed to persist practice history:', historySaveError);
              }
            } else {
              console.warn('No prepDataId available for practice history save.');
            }
        }
    } catch (e) {
         console.error("Failed to parse AI feedback:", e, "Raw response:", result);
         showModal("The AI returned feedback in an unexpected format. Please try again.");
    } finally {
        setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    showModal("Are you sure you want to clear your entire practice history?", true, () => {
        setHistory([]);
        hideModal();
    });
  };

  // Check if user is logged in by checking localStorage
  const isUserLoggedIn = () => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('NZUserEmail');
  };

  const handleGenerateClick = () => {
    if (!isUserLoggedIn()) {
      // Show login modal first (AuthGateModal for existing users, LoginSignupModal for new users)
      setShowLoginModal(true);
      return;
    }
    handleGeneratePrep();
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setShowLoginModal(false);
    handleGeneratePrep();
  };

  const handleSwitchToSignup = () => {
    setShowAuthModal(false);
    setShowLoginModal(true);
  };

  const handleSwitchToLogin = () => {
    setShowLoginModal(false);
    setShowAuthModal(true);
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <div className="text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
      <Header theme={theme} setTheme={setTheme}/>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10 overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 bg-slate-50 dark:bg-[#0B0F19] -z-20" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -z-10 mix-blend-multiply dark:mix-blend-screen animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[120px] -z-10 mix-blend-multiply dark:mix-blend-screen" />
        
        <div className="relative z-10">
        {/* Visible Breadcrumb Navigation (Matches BreadcrumbList Schema) */}
        <Breadcrumbs />
        
        <SetupForm
          profile={profile}
          setProfile={setProfile}
          onGenerate={handleGeneratePrep}
          onGenerateClick={handleGenerateClick}
          isLoading={isLoading && loadingText === 'Generating Plan...'}
          progress={progress}
          constants={{ INSTITUTION_TYPES, UNIVERSITIES, POLYTECHNICS, COURSE_LEVELS, SPONSOR_TYPES }}
        />
        {prepContent && (
          <InterviewFlow
            prepContent={prepContent}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            onAnalyze={handleAnalyzeAnswer}
            isLoading={isLoading && loadingText === 'Analyzing...'}
            history={history}
            makeApiCall={makeApiCall}
            showModal={showModal}
          />
        )}
        {history.length > 0 && (
          <HistorySection
            history={history}
            onClear={handleClearHistory}
            makeApiCall={makeApiCall}
            showModal={showModal}
          />
        )}
        </div>
      </main>
      <Modal modalInfo={modalInfo} onHide={hideModal} />
      
      {/* Authentication Modals */}
      {showLoginModal && (
        <LoginSignupModal
          onAuthSuccess={handleAuthSuccess}
          onSwitchToLogin={handleSwitchToLogin}
          onClose={handleCloseLoginModal}
        />
      )}


      {showAuthModal && (
        <AuthGateModal
          onAuthSuccess={handleAuthSuccess}
          onSwitchToSignup={handleSwitchToSignup}
          onClose={handleCloseAuthModal}
        />
      )}

      {/* ========================================================================== */}
      {/* SEO ARCHITECTURE LAYER - TOTAL GOOGLE DOMINATION                          */}
      {/* 25+ Critical Improvements for #1 Ranking Across All Relevant Keywords     */}
      {/* ========================================================================== */}
      

     

      {/* 1. Master Schema Injection (Core SEO Layer) */}
      <SEOBooster />
      
      {/* 2. Advanced Schemas: VideoObject, Event, DefinedTermSet, Navigation, Scholarship */}
      <AdvancedSchemas />
      
      {/* 3. Featured Snippet Optimized Content (Position 0 Targeting) */}
      <FeaturedSnippets />

      <div className=" w-full flex items-center justify-center">
        <KnowledgePortal />
      </div>
      

      <Footer />

    </div>
  );
}
