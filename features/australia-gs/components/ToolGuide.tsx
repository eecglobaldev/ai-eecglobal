

import React from 'react';
import { SubtleSeparator } from './Separator';

const MicIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>;
const BotMessageSquareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 6V2H8"/><path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z"/><path d="M2 12h2"/><path d="M9 12h2"/><path d="M15 12h2"/></svg>;
const PencilRulerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 5 4 4"/><path d="M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13"/><path d="m8 6 2-2"/><path d="M17.8 17.8 19 19 21 17s-2-1.7-2-2c0-1.7 2-2 2-2l-1.2-1.2Z"/><path d="M16 16h-2a3 3 0 0 1 0-6h2"/><path d="M22 12h-2a3 3 0 0 0 0 6h2"/></svg>;
const RepeatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>;
const ArrowRightIcon = ({ className }: { className?: string; }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
const Step: React.FC<{ number: number; title: string; children: React.ReactNode }> = ({ number, title, children }) => (
    <div className="flex">
        <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 dark:bg-blue-500 text-white">
                <span className="text-xl font-bold">{number}</span>
            </div>
        </div>
        <div className="ml-4">
            <h4 className="text-lg leading-6 font-bold text-slate-800 dark:text-slate-200">{title}</h4>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-400">{children}</p>
        </div>
    </div>
);

const LifecycleIcon: React.FC<{ icon: 'practice' | 'analyze' | 'improve' | 'repeat', label: string, color: 'blue' | 'purple' | 'teal' | 'amber' }> = ({ icon, label, color }) => {
    const icons = {
        practice: <MicIcon />,
        analyze: <BotMessageSquareIcon />,
        improve: <PencilRulerIcon />,
        repeat: <RepeatIcon />,
    };

    const colorClasses = {
        blue: 'text-blue-600 dark:text-blue-400',
        purple: 'text-purple-600 dark:text-purple-400',
        teal: 'text-teal-600 dark:text-teal-400',
        amber: 'text-amber-600 dark:text-amber-400',
    }[color];

    return (
         <div className="text-center p-4 flex-1 group">
            <div className={`relative bg-white dark:bg-slate-800 p-6 rounded-full shadow-md border border-slate-200 dark:border-slate-700 h-28 w-28 mx-auto flex flex-col items-center justify-center ${colorClasses}`}>
                <div className="transition-transform duration-300 transform group-hover:scale-110">
                    {icons[icon]}
                </div>
            </div>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{label === 'Practice' ? 'Record your answer' : label === 'Analyze' ? 'Get AI Feedback' : label === 'Improve' ? 'Refine your points' : 'Track your history'}</p>
        </div>
    );
}

export const ToolGuide: React.FC = () => {
    return (
        <section id="tool-guide" className="py-12">
            <div id="how-to-use" className="max-w-4xl mx-auto px-4">
                <header className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 dark:from-cyan-400 dark:to-blue-500">Mastering the AI Tool</h2>
                    <p className="text-center text-lg text-slate-600 dark:text-slate-400 mt-2 max-w-2xl mx-auto">Follow this guide to get the most out of our AI-powered preparation tool.</p>
                </header>
                <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                    <Step number={1} title="Input Your Detailed Profile">
                        Provide comprehensive details in the 'Academic Plan', 'Profile', and 'Financial' sections. For maximum accuracy, paste your written GS answers/SOP to allow the AI to target potential weak points.
                    </Step>
                    <Step number={2} title="Generate Your AI Prep Plan">
                       Click 'Generate Prep Plan'. The AI processes your profile to create a bespoke study guide, including key talking points and 20-25+ questions tailored to your specific risk factors.
                    </Step>
                    <Step number={3} title="Practice with Voice Recording">
                        Select the 'Practice Your Answer' tab. Click 'Start Recording', speak your answer clearly, and then 'Stop Recording'. The app will then transcribe your audio into text.
                    </Step>
                    <Step number={4} title="Receive & Analyze AI Feedback">
                        Review the transcript, then click 'Submit for Feedback'. The AI provides a score (1-10) and detailed analysis, highlighting strengths and areas for improvement based on GS criteria.
                    </Step>
                </div>
                 <div className="mt-10 text-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800/50">
                    <h4 className="font-semibold text-lg text-blue-800 dark:text-blue-200">Pro Tip: Iterate and Improve</h4>
                    <p className="mt-2 text-sm text-blue-700 dark:text-blue-300">Use the feedback to refine your answers and re-record them. Your practice history is saved below, allowing you to track your progress and see how your scores improve over time.</p>
                </div>
            </div>

            <SubtleSeparator />

            <div id="lifecycle" className="max-w-5xl mx-auto px-4">
                <header className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 dark:from-sky-400 dark:to-cyan-400">The Preparation Lifecycle</h2>
                </header>
                <div className="flex flex-col md:flex-row items-center justify-center -space-y-4 md:-space-y-0 md:space-x-0 rtl:space-x-reverse">
                    <LifecycleIcon icon="practice" label="Practice" color="blue" />
                    <ArrowRightIcon className="text-slate-300 dark:text-slate-600 h-8 w-8 rotate-90 md:rotate-0" />
                    <LifecycleIcon icon="analyze" label="Analyze" color="purple" />
                    <ArrowRightIcon className="text-slate-300 dark:text-slate-600 h-8 w-8 rotate-90 md:rotate-0" />
                    <LifecycleIcon icon="improve" label="Improve" color="teal" />
                    <ArrowRightIcon className="text-slate-300 dark:text-slate-600 h-8 w-8 rotate-90 md:rotate-0" />
                    <LifecycleIcon icon="repeat" label="Repeat" color="amber" />
                </div>
            </div>
        </section>
    );
};
