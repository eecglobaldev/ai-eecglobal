'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/features/review/components/Header';
import { ImpactChart } from '@/features/review/components/ImpactChart';
import { AiCoach } from '@/features/review/components/AiCoach';

const ReviewPageClient: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedMode = localStorage.getItem('darkMode');
            return savedMode ? savedMode === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <>
            <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            <div className="relative container mx-auto p-4 md:p-8 text-brand-dark dark:text-gray-200">
                <header className="text-center mb-12 pt-8">
                    <h1 className="text-4xl md:text-6xl font-black text-brand-dark dark:text-white mb-2">How to Film EEC Testimonials</h1>
                    <h2 className="text-4xl md:text-6xl font-black text-brand-blue">That Get Noticed</h2>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-400">A simple, repeatable process to create professional-looking videos every single time, using just a smartphone.</p>
                </header>

                <main>
                    <Pillar1PhoneSetup />
                    <Pillar2PlacementAndLighting />
                    <ImpactSection isDarkMode={isDarkMode} />
                    <Pillar3FramingAndAudio />
                    <Pillar4ContentFlow />
                    <AiCoach />
                    <FinalStep />
                </main>
            </div>
        </>
    );
};

const Pillar1PhoneSetup: React.FC = () => (
    <section id="pillar1" className="mb-16">
        <h3 className="text-3xl font-bold text-center mb-8"><span className="text-brand-blue">Pillar 1:</span> 📱 Phone Setup</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <KpiCard icon="4K" title="Resolution" description="Set to 4K at 30fps for the highest quality. Use 1080p if 4K is unavailable." iconColor="text-brand-green" />
            <KpiCard icon="✨" title="Magic Ingredient" description="Always use Cinematic Mode. This blurs the background for a professional look." iconColor="text-brand-yellow" />
            <KpiCard icon="📱" title="Vertical Video" description="Always shoot vertically. It's the standard for mobile social media feeds." iconColor="text-brand-red" />
            <KpiCard icon="✈️" title="Airplane Mode" description="Turn this ON to prevent calls or notifications from interrupting your recording." iconColor="text-brand-blue" />
        </div>
    </section>
);

interface KpiCardProps {
    icon: string;
    title: string;
    description: string;
    iconColor: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ icon, title, description, iconColor }) => (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center shadow-lg transition duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-2xl dark:hover:shadow-slate-700">
        <div className={`text-6xl font-black ${iconColor}`}>{icon}</div>
        <p className="text-xl font-semibold mt-2 dark:text-white">{title}</p>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{description}</p>
    </div>
);

const Pillar2PlacementAndLighting: React.FC = () => (
    <section id="pillar2" className="mb-16">
        <h3 className="text-3xl font-bold text-center mb-8"><span className="text-brand-blue">Pillar 2:</span> 💡 Placement & Lighting</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
                <h4 className="text-2xl font-bold mb-4 dark:text-white">Placement: The 3-Meter Rule</h4>
                <RuleCard type="mistake" title="The Mistake" description="Student is sitting right against a wall. This looks flat and creates harsh shadows." />
                <RuleCard type="fix" title="The Fix" description="The student MUST be 2-3 meters (6-9 feet) AWAY from the background to create depth." />
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
                <h4 className="text-2xl font-bold mb-4 dark:text-white">Lighting: The Golden Rule</h4>
                <RuleCard type="mistake" title="The Mistake" description="A bright window or light is BEHIND the student, making their face dark." />
                <RuleCard type="fix" title="The Fix" description="The main light source MUST be IN FRONT of the student, lighting their face." />
            </div>
        </div>
    </section>
);

interface RuleCardProps {
    type: 'mistake' | 'fix';
    title: string;
    description: string;
}

const RuleCard: React.FC<RuleCardProps> = ({ type, title, description }) => {
    const isMistake = type === 'mistake';
    const bgColor = isMistake ? 'bg-red-100 dark:bg-red-900/40' : 'bg-green-100 dark:bg-green-900/40';
    const borderColor = isMistake ? 'border-red-500' : 'border-green-500';
    const titleColor = isMistake ? 'text-brand-red' : 'text-brand-green';
    const icon = isMistake ? '❌' : '✅';

    return (
        <div className={`flex items-center p-4 rounded-lg ${bgColor} border-l-4 ${borderColor} mb-4`}>
            <span className="text-3xl mr-4">{icon}</span>
            <div>
                <h5 className={`font-bold ${titleColor}`}>{title}</h5>
                <p className="text-gray-700 dark:text-gray-300">{description}</p>
            </div>
        </div>
    );
};

const ImpactSection: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
    <section className="mb-16 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 md:p-8">
        <h3 className="text-3xl font-bold text-center mb-2 dark:text-white">The Impact of Best Practices</h3>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">Applying these techniques dramatically increases the perceived quality and trustworthiness of your testimonials. Small changes yield significant results.</p>
        <div className="relative w-full max-w-4xl mx-auto h-[350px] md:h-[400px]">
            <ImpactChart isDarkMode={isDarkMode} />
        </div>
    </section>
);

const Pillar3FramingAndAudio: React.FC = () => (
    <section id="pillar3" className="mb-16">
        <h3 className="text-3xl font-bold text-center mb-8"><span className="text-brand-blue">Pillar 3:</span> 🖼️ Framing & Audio</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
                <h4 className="text-2xl font-bold mb-4 dark:text-white">Framing the Perfect Shot</h4>
                <p className="mb-4 text-gray-600 dark:text-gray-400">The camera angle determines how the viewer perceives the student. Keep it neutral and professional.</p>
                <ul className="space-y-3">
                    <li className="flex items-start p-3 rounded-lg bg-green-100 dark:bg-green-900/40 border-l-4 border-green-500"><span className="text-xl mr-3">✅</span><span className="dark:text-gray-200"><strong>EYE LEVEL:</strong> Always place the camera at the student's eye level for a natural, direct connection.</span></li>
                    <li className="flex items-start p-3 rounded-lg bg-red-100 dark:bg-red-900/40 border-l-4 border-red-500"><span className="text-xl mr-3">❌</span><span className="dark:text-gray-200"><strong>NEVER from below:</strong> Shooting up at a person is unflattering.</span></li>
                    <li className="flex items-start p-3 rounded-lg bg-red-100 dark:bg-red-900/40 border-l-4 border-red-500"><span className="text-xl mr-3">❌</span><span className="dark:text-gray-200"><strong>NEVER from above:</strong> Shooting down on a person can feel diminishing.</span></li>
                </ul>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
                <h4 className="text-2xl font-bold mb-4 dark:text-white">Crisp, Clear Audio</h4>
                <p className="mb-4 text-gray-600 dark:text-gray-400">If they can't hear you, the message is lost. Bad audio is worse than bad video.</p>
                <ul className="space-y-3">
                    <li className="flex items-start"><span className="text-2xl text-brand-blue mr-3">🔇</span><div className="dark:text-gray-200"><strong className="block">Silence the Room:</strong> Turn off ALL fans, ACs, and background music.</div></li>
                    <li className="flex items-start"><span className="text-2xl text-brand-blue mr-3">📏</span><div className="dark:text-gray-200"><strong className="block">Get Closer:</strong> Place the phone 2-3 feet from the student for optimal voice capture.</div></li>
                    <li className="flex items-start"><span className="text-2xl text-brand-blue mr-3">🗣️</span><div className="dark:text-gray-200"><strong className="block">Coach Them:</strong> Politely ask the student to speak clearly and at a consistent volume.</div></li>
                </ul>
            </div>
        </div>
    </section>
);

const Pillar4ContentFlow: React.FC = () => (
    <section id="pillar4" className="mb-16 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 md:p-8">
        <h3 className="text-3xl font-bold text-center mb-8 dark:text-white"><span className="text-brand-blue">Pillar 4:</span> 🎤 The Perfect Content Flow</h3>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">Guide the student through a simple, effective structure. This ensures the testimonial is concise and powerful.</p>
        <div className="grid grid-cols-1 text-slate-400 md:grid-cols-5 items-center gap-4 md:gap-0">
            <FlowchartStep color="bg-yellow-300 dark:bg-yellow-600 text-black" number="1" text="First Name Only" />
            <FlowchartArrow />
            <FlowchartStep color="bg-green-400 dark:bg-green-500 text-black" number="2" text="The Result / Score" />
            <FlowchartArrow />
            <FlowchartStep color="bg-blue-500 dark:bg-blue-400 text-black dark:text-white" number="3" text="The Golden Tip" />
        </div>
        <div className="mt-8 text-center grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <div className="p-4 bg-red-100 dark:bg-red-900/40 rounded-lg text-red-800 dark:text-red-300 font-semibold">❌ NO Greetings (Hi/Hello)</div>
            <div className="p-4 bg-red-100 dark:bg-red-900/40 rounded-lg text-red-800 dark:text-red-300 font-semibold">❌ NO "Thank You" at the end</div>
        </div>
    </section>
);

const FlowchartStep: React.FC<{color: string, number: string, text: string}> = ({color, number, text}) => (
    <div className={`relative flex items-center justify-center text-center p-4 rounded-lg min-h-[80px] text-white font-bold ${color}`}>
        <div>
            <span className="text-2xl block">{number}</span>
            {text}
        </div>
    </div>
);

const FlowchartArrow: React.FC = () => (
    <div className="text-4xl text-center hidden md:block text-brand-blue">➡️</div>
);

const FinalStep: React.FC = () => (
    <section id="final-step" className="mb-16 text-center bg-blue-700  dark:bg-gray-500 text-white rounded-lg shadow-2xl p-8 md:p-12">
        <h3 className="text-3xl md:text-4xl font-bold mb-4">The Final, Unmissable Step</h3>
        <p className="text-2xl md:text-3xl font-black text-brand-yellow mb-4">Always Record a 10-Second Test Clip!</p>
        <p className="max-w-3xl mx-auto text-gray-200 dark:text-gray-400">Before the real take, do a quick test to check your lighting, audio, and framing. Show it to the student it helps them relax and ensures you get the perfect shot without wasting time.</p>
    </section>
);

export default ReviewPageClient;
