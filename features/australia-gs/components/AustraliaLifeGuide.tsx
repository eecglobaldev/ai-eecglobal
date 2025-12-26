



import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PSWCalculator } from './PSWCalculator';

// --- ICONS ---
const BriefcaseIcon = ({className = ''}: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
const MapIcon = ({className = ''}: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>;
const HeartPulseIcon = ({className = ''}: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.7-1 2.1 4.4 3.2-7.4-1.2 2.4H22"/></svg>;
const CpuIcon = ({className = ''}: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M9 2v2"/><path d="M9 20v2"/><path d="M2 9h2"/><path d="M20 9h2"/><path d="M2 15h2"/><path d="M20 15h2"/></svg>;
const CogIcon = ({className = ''}: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M12 2v2"/><path d="M12 22v-2"/><path d="m17 20.66-1-1.73"/><path d="m7 3.34 1 1.73"/><path d="m17 3.34-1 1.73"/><path d="m7 20.66 1-1.73"/><path d="M2 12h2"/><path d="M22 12h-2"/><path d="m20.66 17-1.73-1"/><path d="m3.34 7 1.73 1"/><path d="m20.66 7-1.73 1"/><path d="m3.34 17 1.73-1"/></svg>;
const BookOpenIcon = ({className = ''}: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
const WrenchIcon = ({className = ''}: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>;
const CalendarCheckIcon = ({className = ''}: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>;

// --- DEEPLY RESEARCHED CONTENT ---

const TOP_JOBS_DATA = [
    { field: 'Healthcare', role: 'Registered Nurse', insight: 'Chronic shortages nationwide, particularly in aged care and regional areas, offer high job security.', salaryAUD: 'A$70k - A$90k', salaryINR: '₹38L - ₹50L' },
    { field: 'IT & Tech', role: 'Software Developer', insight: 'Australia\'s booming tech sector requires developers across all stacks, from startups to enterprise.', salaryAUD: 'A$75k - A$110k', salaryINR: '₹41L - ₹60L' },
    { field: 'IT & Tech', role: 'Cybersecurity Analyst', insight: 'Soaring demand due to increased digital threats, with roles available in finance, government, and consulting.', salaryAUD: 'A$80k - A$120k', salaryINR: '₹44L - ₹66L' },
    { field: 'IT & Tech', role: 'Data Analyst / Scientist', insight: 'Businesses across all sectors are desperate for data-driven insights, creating huge demand.', salaryAUD: 'A$85k - A$125k', salaryINR: '₹47L - ₹69L' },
    { field: 'Engineering', role: 'Civil Engineer', insight: 'Major government investment in infrastructure projects ensures consistent, long-term demand.', salaryAUD: 'A$75k - A$100k', salaryINR: '₹41L - ₹55L' },
    { field: 'Education', role: 'Early Childhood Teacher', insight: 'Critical shortages in childcare and early learning centres, offering strong employment pathways.', salaryAUD: 'A$65k - A$85k', salaryINR: '₹36L - ₹47L' },
    { field: 'Education', role: 'Secondary School Teacher', insight: 'High demand for teachers in STEM subjects (Maths, Science) and in regional schools.', salaryAUD: 'A$70k - A$90k', salaryINR: '₹38L - ₹50L' },
    { field: 'Healthcare', role: 'Aged & Disability Carer', insight: 'Australia\'s aging population creates thousands of roles in a resilient and growing sector.', salaryAUD: 'A$60k - A$75k', salaryINR: '₹33L - ₹41L' },
    { field: 'Skilled Trades', role: 'Chef / Cook', insight: 'The vibrant hospitality industry constantly seeks skilled culinary professionals.', salaryAUD: 'A$65k - A$80k', salaryINR: '₹36L - ₹44L' },
    { field: 'Business', role: 'Accountant', insight: 'Essential role for all businesses, providing stable employment opportunities across the country.', salaryAUD: 'A$70k - A$95k', salaryINR: '₹38L - ₹52L' },
];

const PR_PATHWAYS_DATA = [
    {
        category: 'Engineering',
        occupations: [
            { name: 'Civil Engineer', course: 'Bachelor/Master of Engineering (Civil)' },
            { name: 'Electrical Engineer', course: 'Bachelor/Master of Engineering (Electrical)' },
            { name: 'Mechanical Engineer', course: 'Bachelor/Master of Engineering (Mechanical)' },
            { name: 'Mining Engineer', course: 'Bachelor/Master of Engineering (Mining)' },
        ],
    },
    {
        category: 'ICT (Information & Communications Technology)',
        occupations: [
            { name: 'Software Engineer / Developer Programmer', course: 'Bachelor/Master of IT or Software Engineering' },
            { name: 'ICT Business Analyst / Systems Analyst', course: 'Bachelor/Master of Business Information Systems' },
            { name: 'Computer Network and Systems Engineer', course: 'Bachelor/Master of Networking or IT' },
            { name: 'Cybersecurity Professional', course: 'Master of Cybersecurity' },
        ],
    },
    {
        category: 'Health & Medical Sciences',
        occupations: [
            { name: 'Registered Nurse (in various specialisations)', course: 'Bachelor/Master of Nursing' },
            { name: 'General Practitioner / Resident Medical Officer', course: 'Doctor of Medicine' },
            { name: 'Social Worker', course: 'Master of Social Work (Qualifying)' },
            { name: 'Physiotherapist', course: 'Bachelor/Master of Physiotherapy' },
        ],
    },
    {
        category: 'Skilled Trades',
        occupations: [
            { name: 'Chef', course: 'Diploma of Hospitality Management (Commercial Cookery)' },
            { name: 'Automotive Electrician / Motor Mechanic', course: 'Certificate III/IV in Automotive Electrical Technology' },
            { name: 'Carpenter / Joiner', course: 'Certificate III in Carpentry and Joinery' },
        ],
    },
    {
        category: 'Business & Finance',
        occupations: [
            { name: 'Accountant (General)', course: 'Bachelor/Master of Professional Accounting' },
            { name: 'External / Internal Auditor', course: 'Bachelor/Master of Commerce (Accounting)' },
            { name: 'Actuary', course: 'Bachelor/Master of Actuarial Studies' },
        ],
    },
    {
        category: 'Sciences',
        occupations: [
            { name: 'Agricultural Scientist / Consultant', course: 'Bachelor/Master of Agricultural Science' },
            { name: 'Medical Laboratory Scientist', course: 'Bachelor/Master of Laboratory Medicine' },
            { name: 'Environmental Scientist', course: 'Bachelor/Master of Environmental Science' },
        ],
    },
    {
        category: 'Arts & Design (Limited Pathways)',
        occupations: [
            { name: 'Graphic Designer', course: 'Bachelor of Design (Visual Communication)' },
            { name: 'Architect', course: 'Master of Architecture' },
        ],
    },
];

const JobCard: React.FC<{ job: typeof TOP_JOBS_DATA[0]; icon: React.ReactNode }> = ({ job, icon }) => {
    const [isAudPrimary, setIsAudPrimary] = useState(true);
    
    return (
        <div className="group bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-teal-500/50 dark:hover:border-teal-400/50">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors duration-300 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/50 group-hover:text-teal-600 dark:group-hover:text-teal-300">
                    {icon}
                </div>
                <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">{job.role}</h4>
                    <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 mb-1">{job.field}</p>
                </div>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 my-2 flex-grow">{job.insight}</p>
            <div 
                className="mt-auto pt-2 border-t border-slate-200 dark:border-slate-700 text-right cursor-pointer"
                onClick={() => setIsAudPrimary(!isAudPrimary)}
                title="Click to switch currency focus"
            >
                <div className="flex justify-end items-baseline gap-2">
                    <motion.span
                        className={`font-bold transition-colors ${isAudPrimary ? 'text-slate-800 dark:text-slate-200' : 'text-slate-500 dark:text-slate-400'}`}
                        animate={{ scale: isAudPrimary ? 1 : 0.85, opacity: isAudPrimary ? 1 : 0.7 }}
                        transition={{ duration: 0.3 }}
                    >
                        {job.salaryAUD}
                    </motion.span>
                    <span className="text-slate-400 dark:text-slate-500 text-xs">|</span>
                    <motion.span
                        className={`font-bold transition-colors ${!isAudPrimary ? 'text-slate-800 dark:text-slate-200' : 'text-slate-500 dark:text-slate-400'}`}
                        animate={{ scale: !isAudPrimary ? 1 : 0.85, opacity: !isAudPrimary ? 1 : 0.7 }}
                        transition={{ duration: 0.3 }}
                    >
                        ~{job.salaryINR}
                    </motion.span>
                </div>
            </div>
        </div>
    );
};


const TopJobsContent: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('All Fields');
    const fields = ['All Fields', ...Array.from(new Set(TOP_JOBS_DATA.map(job => job.field)))];

    const filteredJobs = activeFilter === 'All Fields' 
        ? TOP_JOBS_DATA 
        : TOP_JOBS_DATA.filter(job => job.field === activeFilter);
        
    const fieldIcons: { [key: string]: React.ReactNode } = {
        'Healthcare': <HeartPulseIcon className="w-6 h-6"/>,
        'IT & Tech': <CpuIcon className="w-6 h-6"/>,
        'Engineering': <CogIcon className="w-6 h-6"/>,
        'Education': <BookOpenIcon className="w-6 h-6"/>,
        'Skilled Trades': <WrenchIcon className="w-6 h-6"/>,
        'Business': <BriefcaseIcon className="w-6 h-6"/>,
    };

    return (
        <div>
            <p className="text-base text-center text-slate-600 dark:text-slate-400 mb-8">
                Focus on these high-demand fields where international graduates are actively sought by Australian employers. Salary figures are approximate for graduate/early-career roles.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {fields.map(field => (
                    <button
                        key={field}
                        onClick={() => setActiveFilter(field)}
                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                            activeFilter === field
                                ? 'bg-teal-600 text-white shadow-md'
                                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                        }`}
                    >
                        {field}
                    </button>
                ))}
            </div>
            <div key={activeFilter} className="fade-in grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredJobs.map(job => (
                    <JobCard key={job.role} job={job} icon={fieldIcons[job.field]} />
                ))}
            </div>
            <p className="text-xs text-center text-slate-400 dark:text-slate-500 mt-6">Salary conversion based on 1 AUD ≈ 55 INR. For guidance only.</p>
        </div>
    );
};

const PRPathwaysContent: React.FC = () => (
    <div>
        <p className="text-base text-slate-600 dark:text-slate-400 mb-6">
            Choosing a course linked to an occupation on Australia's skilled migration lists can provide a potential pathway to long-term residency. Below are key occupations from the Medium and Long-term Strategic Skills List (MLTSSL).
        </p>
        <div className="space-y-6">
            {PR_PATHWAYS_DATA.map(category => (
                <div key={category.category}>
                    <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2 mb-3">{category.category}</h4>
                    <ul className="space-y-2">
                        {category.occupations.map(occ => (
                            <li key={occ.name} className="flex flex-col sm:flex-row justify-between sm:items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
                                <span className="font-semibold text-sm text-slate-700 dark:text-slate-300">{occ.name}</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400 text-left sm:text-right mt-1 sm:mt-0">{occ.course}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
        <p className="text-xs text-center text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/40 p-3 rounded-md mt-6 border border-amber-200 dark:border-amber-800/50">
            <strong>Disclaimer:</strong> Skilled occupation lists are subject to change by the Australian Government. This information is for strategic planning and does not constitute immigration advice.
        </p>
    </div>
);


// --- MAIN COMPONENT ---
export const AustraliaLifeGuide: React.FC = () => {
    const [activeView, setActiveView] = useState<'jobs' | 'pathways' | 'psw'>('jobs');
    
    return (
        <div id="australia-study-hub" className="scroll-mt-24">
            <header className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 dark:from-yellow-300 dark:via-orange-400 dark:to-red-500">Career & Pathways Hub</h2>
                <p className="text-center text-lg text-slate-600 dark:text-slate-400 mt-2 max-w-3xl mx-auto">
                    Explore immediate job prospects and long-term residency pathways to make a strategic choice for your future.
                </p>
            </header>

            {/* --- MOBILE/TABLET VIEW --- */}
            <div className="md:hidden">
                <div className="grid grid-cols-3 gap-1 p-1 rounded-lg">
                    <button onClick={() => setActiveView('jobs')} className={`py-3 text-sm font-bold rounded-md transition-all text-white bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 hover:shadow-[0_0_15px_2px_rgba(255,255,255,0.7)] dark:hover:shadow-[0_0_15px_2px_rgba(255,255,255,0.3)] ${activeView === 'jobs' ? 'shadow-[0_0_15px_2px_rgba(255,255,255,0.7)] dark:shadow-[0_0_15px_2px_rgba(255,255,255,0.3)]' : 'opacity-80'}`}>Top Jobs</button>
                    <button onClick={() => setActiveView('pathways')} className={`py-3 text-sm font-bold rounded-md transition-all text-white bg-gradient-to-br from-sky-400 via-cyan-400 to-emerald-400 hover:shadow-[0_0_15px_2px_rgba(255,255,255,0.7)] dark:hover:shadow-[0_0_15px_2px_rgba(255,255,255,0.3)] ${activeView === 'pathways' ? 'shadow-[0_0_15px_2px_rgba(255,255,255,0.7)] dark:shadow-[0_0_15px_2px_rgba(255,255,255,0.3)]' : 'opacity-80'}`}>PR Pathways</button>
                    <button onClick={() => setActiveView('psw')} className={`py-3 text-sm font-bold rounded-md transition-all text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-600 hover:shadow-[0_0_15px_2px_rgba(255,255,255,0.7)] dark:hover:shadow-[0_0_15px_2px_rgba(255,255,255,0.3)] ${activeView === 'psw' ? 'shadow-[0_0_15px_2px_rgba(255,255,255,0.7)] dark:shadow-[0_0_15px_2px_rgba(255,255,255,0.3)]' : 'opacity-80'}`}>PSW Calculator</button>
                </div>
                <div className="mt-4">
                    <div key={activeView} className="animate-spotlight-in">
                        {activeView === 'jobs' ? <TopJobsContent /> : 
                         activeView === 'pathways' ? <PRPathwaysContent /> :
                         <PSWCalculator />}
                    </div>
                </div>
            </div>

            {/* --- DESKTOP VIEW --- */}
            <div className="hidden md:grid grid-cols-12 gap-8">
                <aside className="col-span-4 lg:col-span-3">
                    <div className="opportunity-matrix-controls">
                        <button onClick={() => setActiveView('jobs')} className={`control-btn bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 ${activeView === 'jobs' ? 'active' : ''}`}>
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg bg-white/20 text-white ${activeView !== 'jobs' && 'opacity-60'}`}><BriefcaseIcon className="w-6 h-6"/></div>
                                <div>
                                    <h3 className="font-bold text-white">Top Jobs for Graduates</h3>
                                    <p className="text-xs text-white/80">See in-demand roles and salaries.</p>
                                </div>
                            </div>
                        </button>
                        <button onClick={() => setActiveView('pathways')} className={`control-btn bg-gradient-to-br from-sky-400 via-cyan-400 to-emerald-400 ${activeView === 'pathways' ? 'active' : ''}`}>
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg bg-white/20 text-white ${activeView !== 'pathways' && 'opacity-60'}`}><MapIcon className="w-6 h-6"/></div>
                                <div>
                                    <h3 className="font-bold text-white">Courses with PR Pathways</h3>
                                    <p className="text-xs text-white/80">Align study with migration lists.</p>
                                </div>
                            </div>
                        </button>
                         <button onClick={() => setActiveView('psw')} className={`control-btn bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-600 ${activeView === 'psw' ? 'active' : ''}`}>
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg bg-white/20 text-white ${activeView !== 'psw' && 'opacity-60'}`}><CalendarCheckIcon className="w-6 h-6"/></div>
                                <div>
                                    <h3 className="font-bold text-white">PSW Rights Calculator</h3>
                                    <p className="text-xs text-white/80">Estimate your visa duration.</p>
                                </div>
                            </div>
                        </button>
                    </div>
                </aside>
                <main className="col-span-8 lg:col-span-9">
                <div key={activeView} className="animate-spotlight-in">
                    {activeView === 'jobs' ? <TopJobsContent /> : 
                     activeView === 'pathways' ? <PRPathwaysContent /> :
                     <PSWCalculator />}
                </div>
                </main>
            </div>
        </div>
    );
};
