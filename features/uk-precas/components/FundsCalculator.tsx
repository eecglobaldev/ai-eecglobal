import React, { useState } from 'react';
import { Calculator, Info } from 'lucide-react';

export const FundsCalculator: React.FC = () => {
    const [location, setLocation] = useState<'london' | 'outside'>('outside');
    const [months, setMonths] = useState(9);
    const [tuition, setTuition] = useState(15000);
    
    const monthlyRate = location === 'london' ? 1334 : 1023;
    const maintenance = monthlyRate * months;
    const ihsPerYear = 1035;
    const courseDuration = Math.ceil(months / 9);
    const totalIHS = ihsPerYear * courseDuration;
    const total = maintenance + tuition + totalIHS;
    
    return (
        <section className="mb-10 sm:mb-16 lg:mb-20 px-1 sm:px-2 lg:px-8" id="funds-calculator">
            
            <div className="relative bg-white dark:bg-[#161b22] rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-8 border border-slate-200 dark:border-[#30363d] overflow-hidden card-glow-always">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-cyan-500/5 dark:from-indigo-500/10 dark:via-purple-500/10 dark:to-cyan-500/10" />
                
                {/* Grid pattern */}
                <div className="absolute inset-0 bg-grid-pattern-sm opacity-30 dark:opacity-50" />
                
                <div className="relative">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8">
                        <div className="relative p-2 sm:p-2.5 lg:p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg shadow-indigo-500/30 icon-container">
                            <Calculator className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white">UK Visa Funds Calculator 2026</h4>
                            <p className="text-[10px] sm:text-xs lg:text-sm text-slate-500 dark:text-slate-400">UKVI-compliant calculator</p>
                        </div>
                        <div className="self-end sm:self-auto sm:ml-auto">
                            <span className="live-badge text-[10px] sm:text-xs">
                                <span className="live-badge-dot" />
                                Live
                            </span>
                        </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
                        <div>
                            <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 sm:mb-3">Study Location</label>
                            <div className="flex gap-2 sm:gap-3">
                                <button 
                                    onClick={() => setLocation('london')}
                                    className={`flex-1 py-2 sm:py-2.5 lg:py-3 px-2 sm:px-3 lg:px-4 rounded-lg sm:rounded-xl font-semibold text-[10px] sm:text-xs lg:text-sm transition-all duration-300 ${
                                        location === 'london' 
                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 scale-[1.02]' 
                                            : 'bg-slate-100 dark:bg-[#21262d] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#30363d] hover:border-indigo-400 dark:hover:border-indigo-500'
                                    }`}
                                >
                                    London (£1,334)
                                </button>
                                <button 
                                    onClick={() => setLocation('outside')}
                                    className={`flex-1 py-2 sm:py-2.5 lg:py-3 px-2 sm:px-3 lg:px-4 rounded-lg sm:rounded-xl font-semibold text-[10px] sm:text-xs lg:text-sm transition-all duration-300 ${
                                        location === 'outside' 
                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 scale-[1.02]' 
                                            : 'bg-slate-100 dark:bg-[#21262d] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#30363d] hover:border-indigo-400 dark:hover:border-indigo-500'
                                    }`}
                                >
                                    Outside (£1,023)
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 sm:mb-3">First Year Tuition (£)</label>
                            <input 
                                type="number" 
                                value={tuition}
                                onChange={(e) => setTuition(Number(e.target.value))}
                                className="w-full py-2 sm:py-2.5 lg:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl font-medium bg-slate-100 dark:bg-[#21262d] text-slate-800 dark:text-white border border-slate-200 dark:border-[#30363d] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-sm sm:text-base"
                                placeholder="e.g., 15000"
                            />
                        </div>
                    </div>
                    
                    {/* Results - Premium Gradient */}
                    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 text-white shadow-xl shadow-indigo-500/20">
                        <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 text-center">
                            <div className="p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl bg-white/10 backdrop-blur-sm">
                                <p className="text-indigo-200 text-[9px] sm:text-[10px] lg:text-xs font-medium mb-0.5 sm:mb-1 uppercase tracking-wide">Maintenance</p>
                                <p className="text-lg sm:text-xl lg:text-3xl font-extrabold">£{maintenance.toLocaleString()}</p>
                            </div>
                            <div className="p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl bg-white/10 backdrop-blur-sm">
                                <p className="text-indigo-200 text-[9px] sm:text-[10px] lg:text-xs font-medium mb-0.5 sm:mb-1 uppercase tracking-wide">IHS ({courseDuration}yr)</p>
                                <p className="text-lg sm:text-xl lg:text-3xl font-extrabold">£{totalIHS.toLocaleString()}</p>
                            </div>
                            <div className="p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-sm border border-white/20">
                                <p className="text-indigo-100 text-[9px] sm:text-[10px] lg:text-xs font-medium mb-0.5 sm:mb-1 uppercase tracking-wide">Total</p>
                                <p className="text-xl sm:text-2xl lg:text-4xl font-extrabold">£{total.toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="mt-3 sm:mt-4 lg:mt-6 flex items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs lg:text-sm text-indigo-200">
                            <Info className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Hold 28 days before visa application</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

