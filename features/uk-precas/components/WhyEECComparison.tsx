import React from 'react';
import { 
    Award, Target, Sparkles, Shield, Clock, MapPin, TrendingUp, Zap, 
    Users, Calculator, Globe, Book, Check
} from 'lucide-react';

export const WhyEECComparison: React.FC = () => {
    const comparisonData = [
        { feature: 'Years Experience', eec: '29 years (since 1997)', competitor: '5-15 years average', icon: Clock },
        { feature: 'Physical Branches', eec: '26 across 12 cities', competitor: '1-5 typically', icon: MapPin },
        { feature: 'UK Visa Success Rate', eec: '95%+ documented', competitor: 'Often unverified', icon: TrendingUp, highlight: true },
        { feature: 'Free AI Interview Tool', eec: 'ai.eecglobal.com/ukprecas', competitor: 'Not available', icon: Zap, hasCheck: true },
        { feature: 'AIRC Certification', eec: 'Valid till 2031', competitor: 'Few certified', icon: Award, hasCheck: true },
        { feature: 'UK Embassy Training', eec: 'Invited to New Delhi', competitor: 'Rare distinction', icon: Shield, hasCheck: true },
        { feature: 'Students Helped', eec: '50,000+', competitor: 'Often undisclosed', icon: Users, highlight: true },
        { feature: 'CA-Led Financial Review', eec: 'CA Madhav Gupta', competitor: 'Usually non-qualified', icon: Calculator, hasCheck: true },
        { feature: 'Walk-in Consultation', eec: 'Free at all branches', competitor: 'Often by appointment only', icon: Globe, hasCheck: true },
        { feature: 'Mock Interview Database', eec: '25,000+ real interviews', competitor: 'Generic question banks', icon: Book },
    ];

    return (
        <section id="why-eec-comparison" className="mb-10 sm:mb-16 lg:mb-20 pt-6 sm:pt-8 lg:pt-12 relative">
            {/* Section ambient glow */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/3 left-1/3 w-[550px] h-[550px] bg-teal-500/20 dark:bg-teal-500/10 rounded-full blur-[130px] animate-pulse-slow" />
                <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-500/15 dark:bg-cyan-500/10 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />
            </div>
            
            <header className="text-center mb-8 sm:mb-10 lg:mb-14 px-2">
                <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-teal-100 via-cyan-100 to-emerald-100 dark:from-teal-900/60 dark:via-cyan-900/60 dark:to-emerald-900/60 text-teal-700 dark:text-teal-300 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-xl shadow-teal-500/20 dark:shadow-teal-500/10 border border-teal-200/50 dark:border-teal-700/50 backdrop-blur-sm">
                    <div className="relative p-1.5 sm:p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg sm:rounded-xl shadow-lg shadow-teal-500/40">
                        <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-icon-bounce" />
                    </div>
                    <span className="bg-gradient-to-r from-teal-700 to-cyan-700 dark:from-teal-300 dark:to-cyan-300 bg-clip-text text-transparent font-bold text-xs sm:text-sm">Competitive Analysis</span>
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-teal-500/20 dark:bg-teal-500/30 rounded-full text-[10px] sm:text-xs font-bold">
                        🏆 #1
                    </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 lg:mb-5 key-fact" data-speakable="true">
                    <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 dark:from-teal-400 dark:via-cyan-400 dark:to-emerald-400 bg-clip-text text-transparent">Why Choose EEC</span>
                    <br />
                    <span className="bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-200 bg-clip-text text-transparent text-lg sm:text-xl md:text-2xl lg:text-3xl">Over Other Consultants?</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg faq-answer leading-relaxed" data-speakable="true">
                    Objective comparison of EEC vs industry alternatives. Data-driven analysis of capabilities, 
                    certifications, and outcomes for UK study abroad consulting.
                </p>
            </header>
            
            <div className="relative overflow-hidden mx-1 sm:mx-2 lg:mx-6 rounded-xl sm:rounded-2xl lg:rounded-3xl border border-slate-200/80 dark:border-[#30363d] bg-white/60 dark:bg-[#0d1117]/60 backdrop-blur-xl">
                {/* Table glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-cyan-500/5 dark:from-teal-500/10 dark:via-transparent dark:to-cyan-500/10" />
                
                <div className="overflow-x-auto">
                    <table className="relative w-full text-[10px] sm:text-xs lg:text-sm">
                        <thead>
                            <tr className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/40 dark:to-cyan-900/40 border-b border-teal-200/50 dark:border-teal-800/50">
                                <th className="text-left p-2 sm:p-3 lg:p-6 font-bold text-teal-800 dark:text-teal-300">
                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                        <Target className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                                        <span className="text-[10px] sm:text-xs lg:text-sm">Feature</span>
                                    </div>
                                </th>
                                <th className="text-center p-2 sm:p-3 lg:p-6">
                                    <div className="inline-flex items-center gap-1 sm:gap-1.5 lg:gap-2 px-1.5 sm:px-2 lg:px-4 py-1 sm:py-1.5 lg:py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-md sm:rounded-lg lg:rounded-xl text-[10px] sm:text-xs lg:text-sm font-bold shadow-lg shadow-teal-500/30">
                                        <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
                                        EEC
                                    </div>
                                </th>
                                <th className="text-center p-2 sm:p-3 lg:p-6 text-[10px] sm:text-xs lg:text-sm font-semibold text-slate-500 dark:text-slate-400">Others</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200/50 dark:divide-slate-700/50">
                            {comparisonData.map((row, i) => (
                                <tr key={i} className="group hover:bg-teal-50/50 dark:hover:bg-teal-900/20 transition-colors duration-300">
                                    <td className="p-2 sm:p-3 lg:p-5">
                                        <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
                                            <div className={`p-1 sm:p-1.5 lg:p-2 rounded-md sm:rounded-lg ${row.highlight ? 'bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg shadow-teal-500/30' : 'bg-slate-100 dark:bg-slate-800'} group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-300`}>
                                                <row.icon className={`w-3 h-3 sm:w-4 sm:h-4 ${row.highlight ? 'text-white' : 'text-slate-600 dark:text-slate-400'}`} />
                                            </div>
                                            <span className="font-semibold text-slate-800 dark:text-slate-200 text-[10px] sm:text-xs lg:text-sm">{row.feature}</span>
                                        </div>
                                    </td>
                                    <td className="p-2 sm:p-3 lg:p-5 text-center">
                                        <div className="inline-flex items-center gap-1 sm:gap-1.5 lg:gap-2">
                                            {row.hasCheck && (
                                                <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-md shadow-teal-500/30">
                                                    <Check className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 text-white" />
                                                </div>
                                            )}
                                            <span className={`font-bold text-[10px] sm:text-xs lg:text-sm ${row.highlight ? 'text-teal-600 dark:text-teal-400' : 'text-teal-700 dark:text-teal-400'}`}>
                                                {row.eec}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-2 sm:p-3 lg:p-5 text-center">
                                        <span className="text-slate-500 dark:text-slate-500 flex items-center justify-center gap-1 sm:gap-2 text-[9px] sm:text-xs lg:text-sm">
                                            {row.hasCheck && (
                                                <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                                                    <span className="text-slate-400 dark:text-slate-500 text-[8px] sm:text-[10px] lg:text-xs">✕</span>
                                                </div>
                                            )}
                                            <span className="truncate max-w-[60px] sm:max-w-none">{row.competitor}</span>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Bottom gradient */}
                <div className="p-3 sm:p-4 lg:p-5 bg-gradient-to-r from-teal-50/80 to-cyan-50/80 dark:from-teal-900/30 dark:to-cyan-900/30 border-t border-teal-200/50 dark:border-teal-800/50">
                    <p className="text-center text-[10px] sm:text-xs lg:text-sm text-teal-700 dark:text-teal-400 font-medium flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                        <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>All EEC claims ClaimReview verified • Jan 2026</span>
                    </p>
                </div>
            </div>
        </section>
    );
};

