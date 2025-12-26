import React from 'react';
import { 
    FileText, Shield, GraduationCap, Award, Briefcase, Globe, Lightbulb, 
    Users, Calculator, Book, MapPin, Sparkles, AlertCircle
} from 'lucide-react';

export const DocumentChecklist: React.FC = () => {
    const documents = [
        { doc: 'University Offer Letter', status: 'Essential', desc: 'Unconditional/Conditional offer showing course details', icon: GraduationCap },
        { doc: 'IELTS/SELT Score Report', status: 'Essential', desc: 'Valid English test from UKVI-approved center', icon: Award },
        { doc: 'Academic Transcripts', status: 'Essential', desc: 'All degree/diploma marksheets and certificates', icon: FileText },
        { doc: 'Bank Statements (28 days)', status: 'Essential', desc: 'Showing maintenance funds held consecutively', icon: Briefcase },
        { doc: 'Passport Copy', status: 'Essential', desc: 'Bio page with at least 6 months validity', icon: Globe },
        { doc: 'Statement of Purpose', status: 'Essential', desc: 'Explaining course choice and career goals', icon: Lightbulb },
        { doc: 'Sponsor Letter', status: 'If applicable', desc: 'If funds from parent/sponsor account', icon: Users },
        { doc: 'Education Loan Sanction', status: 'If applicable', desc: 'If using loan for funding', icon: Calculator },
        { doc: 'CV/Resume', status: 'Recommended', desc: 'If you have work experience', icon: Briefcase },
        { doc: 'Previous Visa History', status: 'If applicable', desc: 'Previous UK/other country visa copies', icon: Globe },
        { doc: 'Course Information', status: 'Recommended', desc: 'Printed course modules and structure', icon: Book },
        { doc: 'Accommodation Booking', status: 'Recommended', desc: 'University or private accommodation confirmation', icon: MapPin },
    ];

    return (
        <section id="document-checklist-2026" className="mb-10 sm:mb-16 lg:mb-20 pt-6 sm:pt-8 lg:pt-12 relative" itemScope itemType="https://schema.org/HowTo">
            {/* Section ambient glow */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-rose-500/20 dark:bg-rose-500/10 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-pink-500/15 dark:bg-pink-500/10 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />
            </div>
            
            <header className="text-center mb-8 sm:mb-10 lg:mb-14 px-2">
                <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-rose-100 via-pink-100 to-red-100 dark:from-rose-900/60 dark:via-pink-900/60 dark:to-red-900/60 text-rose-700 dark:text-rose-300 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-xl shadow-rose-500/20 dark:shadow-rose-500/10 border border-rose-200/50 dark:border-rose-700/50 backdrop-blur-sm">
                    <div className="relative p-1.5 sm:p-2 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg sm:rounded-xl shadow-lg shadow-rose-500/40">
                        <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-icon-pulse" />
                    </div>
                    <span className="bg-gradient-to-r from-rose-700 to-pink-700 dark:from-rose-300 dark:to-pink-300 bg-clip-text text-transparent font-bold text-xs sm:text-sm">Complete Checklist</span>
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-rose-500/20 dark:bg-rose-500/30 rounded-full text-[10px] sm:text-xs font-bold">
                        📋 VERIFIED
                    </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 lg:mb-5 key-fact" data-speakable="true" itemProp="name">
                    <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 dark:from-rose-400 dark:via-pink-400 dark:to-red-400 bg-clip-text text-transparent">UK Pre-CAS Interview</span>
                    <br />
                    <span className="bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-200 bg-clip-text text-transparent text-lg sm:text-xl md:text-2xl lg:text-3xl">Document Checklist 2026</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg faq-answer leading-relaxed" data-speakable="true" itemProp="description">
                    Complete document checklist for UK Pre-CAS credibility interview. Verified by EEC's 29-year expert team. 
                    Keep these documents ready during your interview.
                </p>
            </header>
            
            <div className="relative mx-1 sm:mx-2 lg:mx-6 bg-white/60 dark:bg-[#0d1117]/60 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-8 border border-slate-200/80 dark:border-[#30363d] overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-pink-500/5 dark:from-rose-500/10 dark:via-transparent dark:to-pink-500/10" />
                
                {/* Progress indicator */}
                <div className="relative mb-4 sm:mb-6 lg:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/30 dark:to-pink-900/30 rounded-lg sm:rounded-xl border border-rose-200/50 dark:border-rose-800/50">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="p-1.5 sm:p-2 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg sm:rounded-xl shadow-lg shadow-rose-500/30">
                            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">Document Prep Progress</p>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 hidden sm:block">Keep all documents ready before your interview</p>
                        </div>
                    </div>
                    <div className="text-left sm:text-right flex sm:flex-col items-center sm:items-end gap-2 sm:gap-0">
                        <p className="text-xl sm:text-2xl font-black text-rose-600 dark:text-rose-400">12</p>
                        <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">Documents</p>
                    </div>
                </div>
                
                <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {documents.map((item, i) => (
                        <div 
                            key={i} 
                            className="group relative flex items-start gap-2 sm:gap-3 lg:gap-4 bg-white/80 dark:bg-[#161b22]/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5 border border-slate-200/80 dark:border-[#30363d] overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(244,63,94,0.4)] dark:hover:shadow-[0_0_40px_-10px_rgba(244,63,94,0.3)] hover:border-rose-300 dark:hover:border-rose-700 hover:-translate-y-0.5 sm:hover:-translate-y-1"
                            itemScope 
                            itemType="https://schema.org/HowToSupply"
                        >
                            {/* Card glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/0 via-transparent to-pink-500/0 group-hover:from-rose-500/5 group-hover:to-pink-500/5 dark:group-hover:from-rose-500/10 dark:group-hover:to-pink-500/10 transition-all duration-500" />
                            
                            {/* Icon */}
                            <div className="relative flex-shrink-0">
                                <div className={`p-2 sm:p-2.5 lg:p-3 rounded-lg sm:rounded-xl shadow-lg transition-all duration-300 group-hover:scale-110 ${
                                    item.status === 'Essential' 
                                        ? 'bg-gradient-to-br from-rose-500 to-pink-600 shadow-rose-500/30' 
                                        : item.status === 'Recommended'
                                        ? 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/30'
                                        : 'bg-gradient-to-br from-slate-500 to-slate-600 shadow-slate-500/30'
                                }`}>
                                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </div>
                                {item.status === 'Essential' && (
                                    <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-rose-500 rounded-full flex items-center justify-center shadow-lg shadow-rose-500/50">
                                        <Sparkles className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" />
                                    </div>
                                )}
                            </div>
                            
                            {/* Content */}
                            <div className="relative flex-1 min-w-0">
                                <p className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm mb-0.5 sm:mb-1 group-hover:text-rose-700 dark:group-hover:text-rose-400 transition-colors" itemProp="name">
                                    {item.doc}
                                </p>
                                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mb-1.5 sm:mb-2 leading-relaxed line-clamp-2">{item.desc}</p>
                                <span className={`inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg font-semibold ${
                                    item.status === 'Essential' 
                                        ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-500/30' 
                                        : item.status === 'Recommended' 
                                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/30' 
                                        : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                                }`}>
                                    {item.status === 'Essential' && <AlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
                                    {item.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

