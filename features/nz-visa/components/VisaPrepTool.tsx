
import React, { useState } from 'react';
import { 
  Sparkles, 
  GraduationCap, 
  DollarSign, 
  Users, 
  Globe, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  Briefcase,
  Plane,
  Brain
} from 'lucide-react';
import { UserProfile } from '../types';

const INITIAL_PROFILE: UserProfile = {
  institutionType: 'University',
  institutionName: '',
  courseLevel: 'Postgraduate',
  courseName: '',
  previousEducation: '',
  workExperience: '',
  careerGoals: '',
  testScores: '',
  usesFTS: true,
  primarySponsor: 'Parents',
  sponsor1Name: '',
  sponsor1Profession: '',
  sponsor1Income: '',
  sponsor2Name: '',
  sponsor2Profession: '',
  sponsor2Income: '',
  fundingSources: {
    familySavings: null,
    educationLoan: null,
    personalSavings: null
  },
  maritalStatus: 'Single',
  dateOfMarriage: '',
  marriageDurationInMonths: null,
  spouseAccompanying: 'No',
  spouseQualification: '',
  spouseExperience: '',
  childrenAccompanying: 'No',
  numberOfChildren: '',
  childrenAges: '',
  hasVisaRefusal: 'no',
  refusalReason: ''
};

export const VisaPrepTool: React.FC = () => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulation of AI Generation start
    setTimeout(() => {
      setIsGenerating(false);
      alert("This is the UI Demo. In the full version, this triggers the Gemini API streaming response based on the profile data.");
    }, 2000);
  };

  return (
    <section id="setup-form" className="py-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-indigo-50/30 to-white dark:from-[#0B0F19] dark:via-[#111827] dark:to-[#0B0F19]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 mb-6">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">AI Interview Simulator</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Visa Profile</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Our AI needs to know you to train you. Enter your details to generate a 
            <span className="text-indigo-600 dark:text-indigo-400 font-bold"> hyper-personalized</span> interview strategy.
          </p>
        </div>

        {/* Main Interface Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative">
          
          {/* Progress Bar */}
          <div className="h-2 bg-slate-100 dark:bg-slate-800 w-full">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>

          <div className="grid lg:grid-cols-12 min-h-[600px]">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-3 bg-slate-50 dark:bg-slate-800/50 p-8 border-r border-slate-100 dark:border-slate-800 flex flex-col justify-between">
              <nav className="space-y-2">
                {[
                  { id: 1, label: 'Academic Profile', icon: GraduationCap },
                  { id: 2, label: 'Financial Plan', icon: DollarSign },
                  { id: 3, label: 'Family & History', icon: Users },
                  { id: 4, label: 'Review & Launch', icon: Brain },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setStep(item.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${
                      step === item.id 
                        ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-lg ring-1 ring-indigo-100 dark:ring-indigo-900' 
                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <item.icon className={`h-5 w-5 ${step === item.id ? 'fill-current' : ''}`} />
                    <span className="font-bold text-sm">{item.label}</span>
                    {step > item.id && <CheckCircle2 className="h-4 w-4 ml-auto text-emerald-500" />}
                  </button>
                ))}
              </nav>
              
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800/50 mt-8">
                <div className="flex items-center gap-2 mb-2 text-indigo-700 dark:text-indigo-300 font-bold text-xs uppercase tracking-wider">
                  <Globe className="h-3 w-3" />
                  Live Context
                </div>
                <p className="text-xs text-indigo-600/80 dark:text-indigo-400/80 leading-relaxed">
                  Your profile is analyzed against <strong className="text-indigo-700 dark:text-indigo-300">50,000+</strong> successful visa cases to detect risks.
                </p>
              </div>
            </div>

            {/* Form Area */}
            <div className="lg:col-span-9 p-8 lg:p-12">
              <div className="max-w-2xl mx-auto h-full flex flex-col">
                
                {/* Step 1: Academic */}
                {step === 1 && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Academic Objectives</h3>
                      <p className="text-slate-500 text-sm">Define your study plans in New Zealand.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Target Institution</label>
                        <input 
                          type="text" 
                          name="institutionName"
                          placeholder="e.g. University of Auckland"
                          value={profile.institutionName}
                          onChange={handleInputChange}
                          className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Course Name</label>
                        <input 
                          type="text" 
                          name="courseName"
                          placeholder="e.g. Master of Business Analytics"
                          value={profile.courseName}
                          onChange={handleInputChange}
                          className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">English Proficiency</label>
                      <input 
                        type="text" 
                        name="testScores"
                        placeholder="e.g. IELTS 7.0 Overall (L:7, R:7, W:6.5, S:7)"
                        value={profile.testScores}
                        onChange={handleInputChange}
                        className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Career Goals (Brief)</label>
                      <textarea 
                        name="careerGoals"
                        rows={3}
                        placeholder="What do you plan to do after completing this course?"
                        value={profile.careerGoals}
                        onChange={handleInputChange}
                        className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Financial */}
                {step === 2 && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Financial Stability</h3>
                      <p className="text-slate-500 text-sm">How you will fund your studies (FTS Scheme).</p>
                    </div>

                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800 flex items-start gap-3">
                      <DollarSign className="h-5 w-5 text-emerald-600 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">FTS Requirement</h4>
                        <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80 mt-1">
                          You must demonstrate NZD $20,000 per year for living expenses plus tuition fees.
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Primary Sponsor</label>
                        <select 
                          name="primarySponsor"
                          value={profile.primarySponsor}
                          onChange={handleInputChange}
                          className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                        >
                          <option>Parents</option>
                          <option>Self</option>
                          <option>Spouse</option>
                          <option>Education Loan</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sponsor Income (Annual)</label>
                        <input 
                          type="text" 
                          name="sponsor1Income"
                          placeholder="e.g. ₹18 Lakhs"
                          value={profile.sponsor1Income}
                          onChange={handleInputChange}
                          className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Family */}
                {step === 3 && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Background & Family</h3>
                      <p className="text-slate-500 text-sm">Visa history and family status significantly impact questions.</p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Marital Status</label>
                        <div className="flex gap-4">
                          {['Single', 'Married'].map(status => (
                            <button
                              key={status}
                              onClick={() => setProfile(p => ({ ...p, maritalStatus: status as any }))}
                              className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all ${
                                profile.maritalStatus === status 
                                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' 
                                  : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-500'
                              }`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>

                      {profile.maritalStatus === 'Married' && (
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                          <h4 className="font-bold text-blue-700 dark:text-blue-400 text-sm mb-3">Spouse Details</h4>
                          <div className="space-y-3">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input 
                                type="checkbox"
                                checked={profile.spouseAccompanying === 'Yes'}
                                onChange={(e) => setProfile(p => ({ ...p, spouseAccompanying: e.target.checked ? 'Yes' : 'No' }))}
                                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                              />
                              <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">Spouse will accompany me</span>
                            </label>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Previous Visa Refusals</label>
                        <div className="flex gap-4">
                          {['No', 'Yes'].map(opt => (
                            <button
                              key={opt}
                              onClick={() => setProfile(p => ({ ...p, hasVisaRefusal: opt.toLowerCase() as any }))}
                              className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all ${
                                (profile.hasVisaRefusal === opt.toLowerCase())
                                  ? 'border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' 
                                  : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-500'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                        {profile.hasVisaRefusal === 'yes' && (
                          <textarea 
                            placeholder="Briefly explain the refusal reason..."
                            className="w-full mt-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-rose-500 outline-none transition-all font-medium text-sm"
                            rows={2}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Launch */}
                {step === 4 && (
                  <div className="flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in duration-500 h-full">
                    <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-500/40 mb-4">
                      <Brain className="h-10 w-10 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Ready to Generate</h3>
                      <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                        Our AI will now create a custom interview simulation based on your profile for <strong className="text-indigo-600 dark:text-indigo-400">{profile.institutionName || 'your university'}</strong>.
                      </p>
                    </div>

                    <button
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="group relative inline-flex items-center gap-3 px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-lg tracking-wide hover:scale-105 transition-all shadow-2xl disabled:opacity-70 disabled:hover:scale-100"
                    >
                      {isGenerating ? (
                        <>
                          <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></span>
                          Analyzing Profile...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-5 w-5 fill-amber-400 text-amber-400 group-hover:rotate-12 transition-transform" />
                          Generate Prep Plan
                          <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                    
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      100% Free • No Login Required Today
                    </p>
                  </div>
                )}

                {/* Footer Navigation */}
                {step < 4 && (
                  <div className="mt-auto pt-8 flex justify-between">
                    <button
                      onClick={prevStep}
                      disabled={step === 1}
                      className={`px-6 py-3 rounded-xl font-bold text-sm transition-colors ${
                        step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      Back
                    </button>
                    <button
                      onClick={nextStep}
                      className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/30 transition-all hover:translate-x-1 flex items-center gap-2"
                    >
                      Next Step
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
