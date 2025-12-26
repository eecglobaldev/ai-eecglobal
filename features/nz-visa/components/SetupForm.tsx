
import React, { useMemo } from 'react';
import { UserProfile } from '../types';
import { 
  GraduationCap, 
  Briefcase, 
  DollarSign, 
  User, 
  Users,
  Globe, 
  Plane, 
  Sparkles, 
  ChevronRight, 
  Calendar,
  CreditCard,
  Building2,
  BookOpen,
  Award,
  AlertCircle,
  Plus
} from 'lucide-react';

interface SetupFormProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onGenerate: () => void;
  onGenerateClick?: () => void;
  isLoading: boolean;
  progress: number;
  constants: {
    INSTITUTION_TYPES: string[];
    UNIVERSITIES: string[];
    POLYTECHNICS: string[];
    COURSE_LEVELS: string[];
    SPONSOR_TYPES: string[];
  };
}

export const SetupForm: React.FC<SetupFormProps> = ({ profile, setProfile, onGenerate, onGenerateClick, isLoading, progress, constants }) => {
  const { INSTITUTION_TYPES, UNIVERSITIES, POLYTECHNICS, COURSE_LEVELS, SPONSOR_TYPES } = constants;

  // Safety check: Ensure fundingSources exists
  if (!profile.fundingSources) {
    profile.fundingSources = {
      familySavings: null,
      educationLoan: null,
      personalSavings: null,
    };
  }

  const handleGenerateClick = () => {
    if (onGenerateClick) {
      onGenerateClick();
    } else {
      onGenerate();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target;
    
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        if (id === 'fts-checkbox') {
             setProfile(p => ({ ...p, usesFTS: checked }));
        } else if (id.startsWith('funding-')) {
            const key = id.replace('funding-', '').replace(/-([a-z])/g, g => g[1].toUpperCase()) as keyof UserProfile['fundingSources'];
            setProfile(p => ({ ...p, fundingSources: { ...p.fundingSources, [key]: checked ? '' : null } }));
        }
    } else if (id.startsWith('funding-')) {
        const key = id.replace('funding-', '').replace('-details', '').replace(/-([a-z])/g, g => g[1].toUpperCase()) as keyof UserProfile['fundingSources'];
        setProfile(p => ({ ...p, fundingSources: { ...p.fundingSources, [key]: value } }));
    } else {
        const key = id.replace(/-([a-z])/g, g => g[1].toUpperCase()) as keyof UserProfile;
        setProfile(p => ({ ...p, [key]: value }));
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'marital-status') {
      setProfile(p => ({ ...p, maritalStatus: value as 'Single' | 'Married' }));
    } else if (name === 'visa-refusal') {
      setProfile(p => ({ ...p, hasVisaRefusal: value as 'no' | 'yes' }));
    }
  };
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setProfile(p => {
        const newProfile = {...p, dateOfMarriage: value };
        if (value) {
            const selectedDate = new Date(value);
            const now = new Date();
            let months = (now.getFullYear() - selectedDate.getFullYear()) * 12;
            months -= selectedDate.getMonth();
            months += now.getMonth();
            newProfile.marriageDurationInMonths = months <= 0 ? 0 : months;
        } else {
            newProfile.marriageDurationInMonths = null;
        }
        return newProfile;
    });
  };

  const institutions = useMemo(() => {
    if (profile.institutionType === 'University') return UNIVERSITIES;
    if (profile.institutionType === 'Polytechnic / Te Pūkenga') return POLYTECHNICS;
    return [];
  }, [profile.institutionType, UNIVERSITIES, POLYTECHNICS]);

  return (
    <section id="setup-form" className="relative py-6 lg:py-20 overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 bg-slate-50 dark:bg-[#0B0F19] -z-20" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -z-10 mix-blend-multiply dark:mix-blend-screen animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[120px] -z-10 mix-blend-multiply dark:mix-blend-screen" />

        <style>{`
            /* Normalize select elements for iOS and ensure consistent appearance */
            #setup-form select {
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
            }
            #setup-form select::-ms-expand {
                display: none;
            }
            /* Custom dropdown arrow for light mode */
            #setup-form select:not(.dark *) {
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
                background-repeat: no-repeat;
                background-position: right 1rem center;
                background-size: 12px;
            }
            /* Custom dropdown arrow for dark mode */
            .dark #setup-form select {
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23cbd5e1' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
                background-repeat: no-repeat;
                background-position: right 1rem center;
                background-size: 12px;
            }
        `}</style>

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
            {/* Header */}
            <header className="text-center mb-16">
                {/* Logo Section with Plus Sign */}
                <div className="flex flex-row xs:flex-row sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 w-full max-w-3xl mx-auto">
                    <img
                        src="/assets/logos/eeclogo-main.png"
                        alt="EEC"
                        className="h-20 xs:h-28 sm:h-32 md:h-40 w-auto object-contain max-w-[130px] xs:max-w-[150px] sm:max-w-[180px] md:max-w-[230px] flex-shrink-0"
                    />
                    <Plus className="h-8 w-8 sm:h-10 sm:w-10 md:h-14 md:w-14 text-slate-400 dark:text-slate-500 flex-shrink-0" strokeWidth={2.5} />
                    <img
                        src="/assets/Estero_logo.png"
                        alt="Estero"
                        className="h-20 xs:h-28 sm:h-32 md:h-40 w-auto object-contain max-w-[130px] xs:max-w-[150px] sm:max-w-[180px] md:max-w-[230px] flex-shrink-0 dark:hidden"
                    />
                    <img
                        src="https://estero.co.nz/wp-content/uploads/2024/05/EES_White-300x150.png"
                        alt="Estero"
                        className="h-20 xs:h-28 sm:h-32 md:h-40 w-auto object-contain max-w-[130px] xs:max-w-[150px] sm:max-w-[180px] md:max-w-[230px] flex-shrink-0 hidden dark:block"
                    />
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-md border border-indigo-100 dark:border-white/10 text-indigo-700 dark:text-indigo-300 mb-8 shadow-lg shadow-indigo-500/10">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <span className="text-xs font-bold tracking-widest uppercase">AI-Powered Simulation</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-6 text-slate-900 dark:text-white">
                AI-Powered New Zealand  <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600">
                    Student Visa Interview Prep
                    </span>
                </h1>
                
                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                Stop guessing. Start practicing. Get hyper-personalized questions based on your unique profile, practice with your voice, and receive instant AI feedback trained by visa experts. <br /> <br />  <strong className="text-indigo-600 dark:text-indigo-400">Go beyond the interview with our all-in-one knowledge hub for your entire New Zealand journey.</strong>
                </p>
            </header>

            <div className="grid gap-8">
                
                {/* 1. Academic Plan Card */}
                <div className="relative group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 lg:p-10 shadow-2xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-bl-[150px] transition-transform group-hover:scale-110" />
                    <div className="absolute -left-1 top-10 bottom-10 w-1 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-r-full" />
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                <GraduationCap className="h-6 w-6" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Academic Blueprint</h2>
                                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Education Strategy</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="institution-type" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Institution Type</label>
                                <div className="relative">
                                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                    <select id="institution-type" value={profile.institutionType || ''} onChange={handleInputChange} className="w-full pl-12 pr-10 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-xl font-bold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/80 appearance-none">
                                        <option value="" disabled>Select Type</option>
                                        {INSTITUTION_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                                    </select>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="institution-name" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Institution Name</label>
                                <div className="relative">
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                    <select id="institution-name" value={profile.institutionName || ''} onChange={handleInputChange} className="w-full pl-12 pr-10 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-xl font-bold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/80 appearance-none">
                                        <option value="" disabled>Select Institution</option>
                                        {institutions.map(inst => <option key={inst} value={inst}>{inst}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="course-level" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Course Level</label>
                                <div className="relative">
                                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                    <select id="course-level" value={profile.courseLevel || ''} onChange={handleInputChange} className="w-full pl-12 pr-10 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-xl font-bold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/80 appearance-none">
                                        <option value="" disabled>Select Level</option>
                                        {COURSE_LEVELS.map(level => <option key={level} value={level}>{level}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="course-name" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Course of Study (Major)</label>
                                <div className="relative">
                                    <Award className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                    <input type="text" id="course-name" value={profile.courseName || ''} onChange={handleInputChange} placeholder="e.g. Master of Data Science" className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-xl font-bold text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 transition-all" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Profile Card */}
                <div className="relative group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 lg:p-10 shadow-2xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 rounded-bl-[150px] transition-transform group-hover:scale-110" />
                    <div className="absolute -left-1 top-10 bottom-10 w-1 bg-gradient-to-b from-violet-500 to-purple-500 rounded-r-full" />
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-violet-50 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400">
                                <User className="h-6 w-6" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Applicant Profile</h2>
                                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Background & Experience</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="previous-education" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Previous Education</label>
                                <input type="text" id="previous-education" value={profile.previousEducation || ''} onChange={handleInputChange} placeholder="e.g. B.Tech IT, Mumbai Univ (2023)" className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-xl font-bold text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-violet-500 transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="work-experience" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Work Experience (if any)</label>
                                <input type="text" id="work-experience" value={profile.workExperience || ''} onChange={handleInputChange} placeholder="e.g. 3 years as Software Engineer at TCS" className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-xl font-bold text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-violet-500 transition-all" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label htmlFor="career-goals" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Future Career Goals (in India)</label>
                                <input type="text" id="career-goals" value={profile.careerGoals || ''} onChange={handleInputChange} placeholder="e.g. Senior Data Analyst at top MNCs like Accenture India" className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-xl font-bold text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-violet-500 transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="test-scores" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">English Test Scores</label>
                                <input type="text" id="test-scores" value={profile.testScores || ''} onChange={handleInputChange} placeholder="e.g. IELTS 7.0 (L:7, R:7, W:6.5, S:7)" className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-xl font-bold text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-violet-500 transition-all" />
                            </div>
                            
                            <div className="flex items-center p-4 bg-violet-50 dark:bg-violet-900/20 rounded-xl border border-violet-100 dark:border-violet-800/30">
                                <input type="checkbox" id="fts-checkbox" checked={profile.usesFTS} onChange={handleInputChange} className="h-5 w-5 text-violet-600 focus:ring-violet-600 border-slate-300 rounded cursor-pointer" />
                                <label htmlFor="fts-checkbox" className="ml-3 block text-sm font-bold text-slate-700 dark:text-slate-200 cursor-pointer">I am using the Using Funds Transfer Scheme (FTS).</label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Financial Dossier Card */}
                <div className="relative group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 lg:p-10 shadow-2xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-bl-[150px] transition-transform group-hover:scale-110" />
                    <div className="absolute -left-1 top-10 bottom-10 w-1 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-r-full" />
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                <DollarSign className="h-6 w-6" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Financial Dossier</h2>
                                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Funding & Sponsorship</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="primary-sponsor" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Primary Sponsor</label>
                                <div className="relative">
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                    <select id="primary-sponsor" value={profile.primarySponsor || ''} onChange={handleInputChange} className="w-full pl-12 pr-10 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-xl font-bold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/80 appearance-none">
                                        <option value="" disabled>Select Sponsor</option>
                                        {SPONSOR_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-500 ${['Father', 'Mother', 'Both Parents', 'Other'].includes(profile.primarySponsor) ? 'opacity-100' : 'opacity-50 grayscale'}`}>
                                <div id="sponsor1-details" className="space-y-4 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                        {profile.primarySponsor === 'Both Parents' ? 'Sponsor 1 (e.g. Father)' : 'Sponsor Details'}
                                    </h3>
                                    <input type="text" id="sponsor1Name" value={profile.sponsor1Name || ''} onChange={handleInputChange} placeholder="Full Name" className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 transition-all" />
                                    <input type="text" id="sponsor1Profession" value={profile.sponsor1Profession || ''} onChange={handleInputChange} placeholder="Profession / Business" className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 transition-all" />
                                    <input type="text" id="sponsor1Income" value={profile.sponsor1Income || ''} onChange={handleInputChange} placeholder="Annual Income (e.g. INR ₹25 Lakhs)" className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 transition-all" />
                                </div>
                                
                                {profile.primarySponsor === 'Both Parents' && (
                                    <div id="sponsor2-details" className="space-y-4 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                        <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-teal-500" />
                                            Sponsor 2 (e.g. Mother)
                                        </h3>
                                        <input type="text" id="sponsor2Name" value={profile.sponsor2Name || ''} onChange={handleInputChange} placeholder="Full Name" className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 transition-all" />
                                        <input type="text" id="sponsor2Profession" value={profile.sponsor2Profession || ''} onChange={handleInputChange} placeholder="Profession / Business" className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 transition-all" />
                                        <input type="text" id="sponsor2Income" value={profile.sponsor2Income || ''} onChange={handleInputChange} placeholder="Annual Income (e.g. ₹8 Lakhs)" className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 transition-all" />
                                    </div>
                                )}
                            </div>

                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                <legend className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">How will your education be funded? (Select all that apply)</legend>
                                <div className="space-y-3">
                                    {[
                                        { id: 'funding-family-savings', label: 'Family Savings', placeholder: 'e.g. INR 30 Lakhs in Fixed Deposits' },
                                        { id: 'funding-education-loan', label: 'Education Loan', placeholder: 'e.g. INR 20 Lakhs from SBI' },
                                        { id: 'funding-personal-savings', label: 'Personal Savings', placeholder: 'e.g. INR 5 Lakhs from my salary' }
                                    ].map((source) => {
                                        const key = source.id.replace('funding-', '').replace(/-([a-z])/g, g => g[1].toUpperCase()) as keyof UserProfile['fundingSources'];
                                        const isChecked = profile.fundingSources?.[key] !== null;
                                        
                                        return (
                                            <div key={source.id} className={`flex items-start p-3 rounded-xl border transition-all ${isChecked ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800' : 'bg-transparent border-transparent'}`}>
                                                <div className="flex items-center h-12">
                                                    <input id={source.id} type="checkbox" checked={isChecked} onChange={handleInputChange} className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded cursor-pointer" />
                                                </div>
                                                <div className="ml-3 flex-grow">
                                                    <label htmlFor={source.id} className="font-bold text-slate-700 dark:text-slate-200 text-sm cursor-pointer">{source.label}</label>
                                                    <input 
                                                        type="text" 
                                                        id={`${source.id}-details`} 
                                                        value={profile.fundingSources?.[key] ?? ''} 
                                                        onChange={handleInputChange} 
                                                        disabled={!isChecked} 
                                                        className="mt-1 w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed focus:ring-1 focus:ring-emerald-500" 
                                                        placeholder={source.placeholder} 
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. History Card */}
                <div className="relative group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 lg:p-10 shadow-2xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-bl-[150px] transition-transform group-hover:scale-110" />
                    <div className="absolute -left-1 top-10 bottom-10 w-1 bg-gradient-to-b from-amber-500 to-orange-500 rounded-r-full" />
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                                <Plane className="h-6 w-6" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Personal & Immigration History</h2>
                                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Family & Visa Background</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {/* Marital Status */}
                            <div>
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1 mb-3 block">What is your marital status?</label>
                                <div className="flex gap-4">
                                    {['Single', 'Married'].map(status => (
                                        <label key={status} className={`flex-1 relative cursor-pointer group/radio`}>
                                            <input type="radio" name="marital-status" value={status} checked={profile.maritalStatus === status} onChange={handleRadioChange} className="peer sr-only" />
                                            <div className="p-4 rounded-xl border-2 text-center font-bold transition-all peer-checked:border-amber-500 peer-checked:bg-amber-50 dark:peer-checked:bg-slate-800 peer-checked:text-amber-700 dark:peer-checked:text-amber-400 border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:peer-checked:hover:border-amber-400 dark:hover:border-amber-400 dark:hover:text-amber-400 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                                {status}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                
                                {profile.maritalStatus === 'Married' && (
                                    <div className="mt-4 p-5 bg-amber-50/50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-800/30 animate-in slide-in-from-top-2">
                                        <div className="space-y-4">
                                            <div>
                                                <label htmlFor="date-of-marriage" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Date of Marriage</label>
                                                <br />
                                                <input type="date" id="date-of-marriage" value={profile.dateOfMarriage || ''} onChange={handleDateChange} className="mt-1 px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl" />
                                                {profile.marriageDurationInMonths !== null && profile.marriageDurationInMonths < 12 && (
                                                    <div className="mt-2 flex items-start gap-2 p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-800 dark:text-amber-300 text-xs font-medium">
                                                        <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                                                        <p>Recent marriage (less than 1 year) requires extra evidence of genuine relationship. The AI will generate specific questions for this.</p>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Will your spouse accompany you?</label>
                                                    <select id="spouseAccompanying" value={profile.spouseAccompanying || 'No'} onChange={handleInputChange} className="mt-1 w-full px-4 pr-10 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-700 dark:text-slate-200 appearance-none">
                                                        <option value="No">No</option>
                                                        <option value="Yes">Yes</option>
                                                    </select>
                                                </div>
                                                {profile.spouseAccompanying === 'Yes' && (
                                                    <div className="space-y-3">
                                                        <input type="text" id="spouseQualification" value={profile.spouseQualification || ''} onChange={handleInputChange} placeholder="Spouse's Highest Qualification" className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm" />
                                                        <input type="text" id="spouseExperience" value={profile.spouseExperience || ''} onChange={handleInputChange} placeholder="Spouse's Work Experience" className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Any dependent children accompanying you?</label>
                                                    <select id="childrenAccompanying" value={profile.childrenAccompanying || 'No'} onChange={handleInputChange} className="mt-1 w-full px-4 pr-10 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-700 dark:text-slate-200 appearance-none">
                                                        <option value="No">No</option>
                                                        <option value="Yes">Yes</option>
                                                    </select>
                                                </div>
                                                {profile.childrenAccompanying === 'Yes' && (
                                                    <div className="space-y-3">
                                                        <input type="number" id="numberOfChildren" value={profile.numberOfChildren || ''} onChange={handleInputChange} placeholder="Number of Children" className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm" />
                                                        <input type="text" id="childrenAges" value={profile.childrenAges || ''} onChange={handleInputChange} placeholder="Ages of Children (e.g. 6, 3)" className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Visa Refusal */}
                            <div>
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Have you ever had a visa refused for any country?</label>
                                <div className="flex gap-4">
                                    {['No', 'Yes'].map(opt => (
                                        <label key={opt} className={`flex-1 relative cursor-pointer group/radio`}>
                                            <input type="radio" name="visa-refusal" value={opt.toLowerCase()} checked={profile.hasVisaRefusal === opt.toLowerCase()} onChange={handleRadioChange} className="peer sr-only" />
                                            <div className={`p-4 rounded-xl border-2 text-center font-bold transition-all peer-checked:border-amber-500 dark:peer-checked:bg-slate-800 ${opt === 'Yes' ? 'peer-checked:border-amber-500 peer-checked:text-amber-700 dark:peer-checked:text-amber-400' : 'peer-checked:border-amber-500 peer-checked:text-amber-700  dark:peer-checked:text-amber-400'} border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-amber-400 dark:hover:text-amber-400 dark:peer-checked:hover:border-amber-400 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400`}>
                                                {opt}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                {profile.hasVisaRefusal === 'yes' && (
                                    <div className="mt-4 animate-in slide-in-from-top-2">
                                        <textarea id="refusalReason" value={profile.refusalReason || ''} onChange={handleInputChange} placeholder="Provide details: Country, Year, and Reason for refusal. This is crucial for accurate interview prep." className="w-full p-4 bg-slate-50 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-500 rounded-xl text-sm focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all placeholder-slate-400 dark:placeholder-slate-400 text-slate-800 dark:text-slate-200" rows={3}></textarea>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Generate Button */}
                <div className="relative pt-8">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <button 
                            id="generate-prep-btn" 
                            onClick={handleGenerateClick} 
                            disabled={isLoading} 
                            className="group relative inline-flex items-center gap-4 px-12 py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-black text-xl tracking-wide shadow-2xl hover:scale-105 transition-all duration-300 hover:shadow-indigo-500/25 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
                        >
                            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                            {isLoading ? (
                                <>
                                    <div className="h-6 w-6 rounded-full border-3 border-current border-t-transparent animate-spin" />
                                    <span>Analyzing Profile...</span>
                                </>
                            ) : (
                                <>
                                    <Sparkles className="h-6 w-6 fill-amber-400 text-amber-400 group-hover:rotate-12 transition-transform" />
                                    Generate Strategy
                                    <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>
                    {/* Progress Bar */}
                    <div className={`mt-8 max-w-md mx-auto transition-opacity duration-500 ${progress > 0 ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out relative" style={{ width: `${progress}%` }}>
                                <div className="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite]" />
                            </div>
                        </div>
                        <p className="text-center text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">Processing Data Points</p>
                    </div>
                </div>

            </div>
        </div>
    </section>
  );
};
