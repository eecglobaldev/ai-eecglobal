
import React, { useState } from 'react';
import { generateTrilingualScript } from '../services/geminiService';
import type { ScriptResult, TestimonialData } from '../types';
import LoginSignupModal from './LoginSignupModel';
import AuthGateModal from './AuthGateModal';
import { sendTestimonialScriptNotificationEmails } from '../services/emailService';
import { incrementPrepPlanCount } from '../services/userService';

const testimonialTypes = [
    { value: 'IELTS_Academic_Paper_Based_Test', label: 'IELTS (Academic Paper Based Test)' },
    { value: 'IELTS_General_Training_Paper_Based_Test', label: 'IELTS (General Training Paper Based Test)' },
    { value: 'IELTS_Academic_Computer_Delivered_Test', label: 'IELTS (Academic Computer Delivered Test)' },
    { value: 'IELTS_General_Training_Computer_Delivered_Test', label: 'IELTS (General Training Computer Delivered Test)' },
    { value: 'IELTS_UKVI_Computer_Delivered_Test', label: 'IELTS (UKVI Computer Delivered Test)' },
    { value: 'IELTS_UKVI_Paper_Based_Test', label: 'IELTS (UKVI Paper Based Test)' },
    { value: 'IELTS_LifeSkills', label: 'IELTS LifeSkills' },
    { value: 'PTE_Academic', label: 'PTE Academic' },
    { value: 'PTE_Core_for_Canada_PR', label: 'PTE Core for Canada PR' },
    { value: 'GRE', label: 'GRE' },
    { value: 'Digital_SAT', label: 'Digital SAT' },
    { value: 'TOEFL', label: 'TOEFL' },
    { value: 'Duolingo_English_Test', label: 'Duolingo English Test' },
    { value: 'Cambridge_Interchange_5th_Edition_Level_1_Course', label: 'Cambridge Interchange 5th Edition Level 1 Course' },
    { value: 'Student_Visa', label: 'Student Visa Success' },
    { value: 'Tourist_Visa', label: 'Tourist Visa Success' },
    { value: 'Spouse_Visa', label: 'Spouse Visa Success' },
    { value: 'Parents_Visa', label: 'Parents Visa Success' },
];

export const AiCoach: React.FC = () => {
    const [formData, setFormData] = useState<TestimonialData>({
        type: 'IELTS_Academic_Paper_Based_Test',
        name: '',
        score: '',
        topic: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [scriptResult, setScriptResult] = useState<ScriptResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleGenerateScript = async () => {
        // Check if user is logged in
        const userEmail = localStorage.getItem('AiReview');
        if (!userEmail) {
            // User is not logged in, show signup modal
            setShowSignupModal(true);
            return;
        }

        if (!formData.name || !formData.score || !formData.topic) {
            setError('Please fill in all fields to generate a script.');
            setScriptResult(null);
            return;
        }
        
        // Set loading state immediately for instant UI feedback
        setIsLoading(true);
        setError(null);
        setScriptResult(null);

        // Increment count in background (non-blocking, fire and forget)
        incrementPrepPlanCount(userEmail)
            .then(() => console.log('User click count incremented'))
            .catch((countError) => console.error('Failed to increment count:', countError));

        try {
            const result = await generateTrilingualScript(formData);
            setScriptResult(result);
            
            // Send email notification to admins and branch counselors
            try {
                await sendTestimonialScriptNotificationEmails(userEmail, formData, result);
                console.log('Email notification sent successfully');
            } catch (emailError) {
                // Don't fail the script generation if email fails
                console.error('Failed to send email notification:', emailError);
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(`Sorry, something went wrong. Please try again. Error: ${errorMessage}`);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAuthSuccess = () => {
        setIsAuthenticated(true);
        setShowLoginModal(false);
        setShowSignupModal(false);
        // Automatically trigger script generation after successful auth
        setTimeout(() => {
            handleGenerateScript();
        }, 100);
    };

    const handleSwitchToLogin = () => {
        setShowSignupModal(false);
        setShowLoginModal(true);
    };

    const handleSwitchToSignup = () => {
        setShowLoginModal(false);
        setShowSignupModal(true);
    };

    const handleCloseModals = () => {
        setShowLoginModal(false);
        setShowSignupModal(false);
    };

    return (
        <section id="ai-coach" className="mb-16 bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 md:p-8 border-t-4 border-yellow-400">
            <h3 className="text-3xl font-bold text-center mb-2 dark:text-white">✨ AI Testimonial Coach</h3>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">Get a perfectly crafted, trilingual script in seconds. Just fill in the details below.</p>
            <div className="max-w-xl mx-auto">
                <div className="mb-4">
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Testimonial Type</label>
                    <select id="type" value={formData.type} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        {testimonialTypes.map(type => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                    </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Student's First Name</label>
                        <input type="text" id="name" value={formData.name} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Rohan" />
                    </div>
                    <div>
                        <label htmlFor="score" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Score / Visa Outcome / Completed</label>
                        <input type="text" id="score" value={formData.score} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 8.0 Band / Visa Approved" />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Key Topic / Experience</label>
                    <input type="text" id="topic" value={formData.topic} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., EEC's weekly mock tests" />
                </div>
                <button onClick={handleGenerateScript} disabled={isLoading} className="w-full bg-brand-blue text-white font-bold py-3 px-4 dark:bg-green-600 dark:text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-70 disabled:text-slate-200 disabled:cursor-not-allowed">
                    <span aria-hidden="true">✨</span>
                    <span>{isLoading ? 'Generating...' : 'Generate Trilingual Script'}</span>
                </button>

                <div className="mt-6">
                    {isLoading && <LoadingSpinner />}
                    {!isLoading && (
                        <div id="scriptResult" className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-gray-700 min-h-[100px]">
                            {error && <p className="text-red-600 dark:text-red-400 font-semibold">{error}</p>}
                            {!error && !scriptResult && <p className="text-gray-700 dark:text-gray-400 italic">Your generated scripts will appear here...</p>}
                            {scriptResult && (
                                <div className="space-y-4">
                                    <ScriptOutput title="English" content={scriptResult.english} />
                                    <ScriptOutput title="Hindi (हिन्दी)" content={scriptResult.hindi} />
                                    <ScriptOutput title="Gujarati (ગુજરાતી)" content={scriptResult.gujarati} />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Authentication Modals */}
            {showSignupModal && (
                <LoginSignupModal
                    onAuthSuccess={handleAuthSuccess}
                    onSwitchToLogin={handleSwitchToLogin}
                    onClose={handleCloseModals}
                />
            )}

            {showLoginModal && (
                <AuthGateModal
                    onAuthSuccess={handleAuthSuccess}
                    onSwitchToSignup={handleSwitchToSignup}
                    onClose={handleCloseModals}
                />
            )}
        </section>
    );
};

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center mt-6">
        <div className="w-9 h-9 border-4 border-gray-200 dark:border-gray-600 border-t-brand-green dark:border-t-brand-green rounded-full animate-spin"></div>
        <p className="ml-4 text-gray-600 dark:text-gray-300">Generating script...</p>
    </div>
);

const ScriptOutput: React.FC<{title: string; content: string}> = ({title, content}) => (
    <div>
        <h4 className="text-lg font-bold text-brand-dark dark:text-brand-yellow border-b-2 border-brand-yellow pb-2 mb-2">{title}</h4>
        <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{content}</p>
    </div>
);
