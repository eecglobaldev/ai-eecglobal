import React from 'react';

// Icons
const CompassIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>;
const GraduationCapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
const WalletIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const FileTextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>;
const PlaneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 16l-3.5 3.5c-.4.4-.8 1-.8 1.5s.4 1 .8 1.5L7 23l8.8-8.8.5-.3Z"/></svg>;
const ChevronDownIcon = ({ className = '' }: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6"/></svg>;

const interviewQuestionsData = [
    { 
        icon: <CompassIcon />, 
        title: "Background and Motivation", 
        questions: [
            "Why did you choose Australia instead of other countries like the UK, Canada, or the USA?",
            "How did you learn about this university/college and your course?",
            "Why are you not studying this course in India?",
            "What motivated you to study this particular field?",
            "What do you know about the city and state where your campus is located?"
        ] 
    },
    { 
        icon: <GraduationCapIcon />, 
        title: "Course and Institution Knowledge", 
        questions: [
            "What is the name and duration of your course?",
            "What are the main subjects or units in your course?",
            "What are the entry requirements for your course?",
            "How does this course align with your previous studies or work experience?",
            "Why did you select this university/college instead of others in Australia?"
        ] 
    },
    { 
        icon: <BriefcaseIcon />, 
        title: "Career Plans", 
        questions: [
            "What are your career goals after completing this course?",
            "How will this course help you achieve your future career plans?",
            "Will you return to India after completing your studies? Why or why not?",
            "What type of job and salary do you expect after completing the course?",
            "Can you name a few companies in India that you’d like to work for?"
        ] 
    },
    { 
        icon: <WalletIcon />, 
        title: "Financial Capacity", 
        questions: [
            "Who is sponsoring your education?",
            "What is their occupation and annual income?",
            "How much is your tuition fee and living cost per year?",
            "Have you paid any tuition fees or OSHC (health insurance) yet?",
            "Can you explain how you will manage your funds during your studies?"
        ] 
    },
    { 
        icon: <UsersIcon />, 
        title: "Family and Personal Circumstances", 
        questions: [
            "Who are your family members, and what do they do?",
            "Do you have any relatives or friends in Australia?",
            "Have you or your family ever applied for an Australian visa before?",
            "How will you stay in touch with your family while studying in Australia?"
        ] 
    },
    { 
        icon: <FileTextIcon />, 
        title: "Understanding of Visa Conditions", 
        questions: [
            "Are you aware of the work rights on your student visa?",
            "What are your obligations as an international student in Australia?",
            "What will you do if your visa application is refused?",
            "What will you do if you face academic difficulty during your studies?"
        ] 
    },
    { 
        icon: <PlaneIcon />, 
        title: "Post-Graduation and Long-Term Intent", 
        questions: [
            "Do you plan to apply for post-study work (PSW) visa after graduation?",
            "How long is the PSW visa for your qualification?",
            "Would you like to apply for permanent residency in Australia?",
            "How does studying in Australia help you contribute back to India?"
        ] 
    },
];

const QuestionAccordion: React.FC<{ item: typeof interviewQuestionsData[0] }> = ({ item }) => {
    return (
        <details className="group bg-white dark:bg-slate-800/60 rounded-xl shadow-sm transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 open:shadow-lg open:border-slate-300 dark:open:border-slate-600">
            <summary className="flex justify-between items-center p-4 list-none cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 transition-transform duration-300 group-hover:scale-105">
                        {item.icon}
                    </div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">{item.title}</h4>
                </div>
                <ChevronDownIcon className="w-5 h-5 text-slate-500 dark:text-slate-400 transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <div className="px-4 pb-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-700">
                <ol className="mt-3 space-y-3 list-decimal list-inside text-sm text-slate-700 dark:text-slate-300 marker:font-semibold marker:text-slate-500 dark:marker:text-slate-400">
                    {item.questions.map((q, i) => <li key={i}>{q}</li>)}
                </ol>
            </div>
        </details>
    );
};


export const GSInterviewQuestionsGuide: React.FC = () => {
    return (
        <div className="py-8">
            <header className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">The GS Interview Arsenal</h2>
                 <p className="text-center text-lg text-slate-600 dark:text-slate-400 mt-2 max-w-2xl mx-auto">
                    Be prepared for these common questions, which are designed to test every aspect of your Genuine Student profile.
                </p>
            </header>

            <div className="max-w-3xl mx-auto space-y-3">
                {interviewQuestionsData.map((item, index) => (
                    <QuestionAccordion key={index} item={item} />
                ))}
            </div>
        </div>
    );
};