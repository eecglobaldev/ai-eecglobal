'use client';

import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { WORKFLOW_STEPS } from '../lib/constants';

const Workflow: React.FC = () => {
    return (
        <section id="workflow" className="py-32 relative overflow-hidden bg-white dark:bg-[#020617] transition-colors duration-500">

            {/* Background Decor */}
            <div className="absolute inset-0 bg-noise opacity-[0.05] dark:opacity-20 pointer-events-none mix-blend-overlay"></div>

            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>

            <div className="container mx-auto px-6 relative z-10 max-w-7xl">

                {/* Header Section */}
                <div className="text-center mb-24 relative">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-slate-900 border border-blue-100 dark:border-slate-700 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                        Your Success Path
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 dark:text-white mb-8 tracking-tight">
                        Your Roadmap to <br className="md:hidden" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                            Global Success
                        </span>
                    </h2>

                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-medium">
                        Studying abroad is complex, but we've broken it down into 4 intelligent steps. Follow this exact path to save money and avoid rejection.
                    </p>
                </div>

                {/* Roadmap Grid */}
                <div className="relative">

                    {/* Desktop Connecting Line */}
                    <div className="hidden lg:block absolute top-[60px] left-0 w-full h-[3px] bg-slate-100 dark:bg-slate-800">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent w-full h-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {WORKFLOW_STEPS.map((step, index) => {
                            const Icon = step.icon;

                            // Color Theme Map
                            const themeClasses: Record<string, { bg: string, text: string, textDark: string, border: string, shadow: string, glow: string }> = {
                                blue: { bg: 'bg-blue-500', text: 'text-blue-600', textDark: 'dark:text-blue-400', border: 'hover:border-blue-500/50', shadow: 'hover:shadow-blue-500/20', glow: 'from-blue-500 to-cyan-500' },
                                purple: { bg: 'bg-purple-500', text: 'text-purple-600', textDark: 'dark:text-purple-400', border: 'hover:border-purple-500/50', shadow: 'hover:shadow-purple-500/20', glow: 'from-purple-500 to-fuchsia-500' },
                                pink: { bg: 'bg-pink-500', text: 'text-pink-600', textDark: 'dark:text-pink-400', border: 'hover:border-pink-500/50', shadow: 'hover:shadow-pink-500/20', glow: 'from-rose-500 to-pink-500' },
                                emerald: { bg: 'bg-emerald-500', text: 'text-emerald-600', textDark: 'dark:text-emerald-400', border: 'hover:border-emerald-500/50', shadow: 'hover:shadow-emerald-500/20', glow: 'from-emerald-500 to-teal-500' },
                            };

                            const theme = themeClasses[step.colorTheme] || themeClasses['blue'];

                            return (
                                <div key={step.id} className="relative group perspective z-10">

                                    {/* Step Connector Dot (Desktop) */}
                                    <div className="hidden lg:flex absolute top-[60px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-50 dark:bg-[#020617] border-4 border-slate-200 dark:border-slate-700 z-20 group-hover:border-white dark:group-hover:border-white group-hover:scale-125 transition-all duration-300 shadow-lg">
                                        <div className={`w-full h-full rounded-full ${theme.bg} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                                    </div>

                                    {/* Card Container */}
                                    <div className={`
                    h-full relative mt-8 lg:mt-24 p-8 rounded-[2rem] 
                    bg-white dark:bg-slate-900/60 backdrop-blur-xl 
                    border border-slate-200 dark:border-white/5 
                    transition-all duration-500 ease-out
                    ${theme.border} hover:-translate-y-3 shadow-xl shadow-slate-200/50 dark:shadow-none ${theme.shadow}
                  `}>

                                        {/* Inner Gradient Glow on Hover */}
                                        <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${theme.glow} opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.1] transition-opacity duration-500 pointer-events-none`}></div>

                                        {/* Step Number Badge */}
                                        <div className="absolute -top-6 left-8 px-4 py-1.5 bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 rounded-full shadow-lg z-20 group-hover:scale-110 transition-transform duration-300">
                                            <span className={`text-sm font-bold tracking-wider ${theme.text} ${theme.textDark} uppercase`}>Step 0{step.id}</span>
                                        </div>

                                        {/* Content */}
                                        <div className="relative z-10 flex flex-col h-full">

                                            {/* Icon */}
                                            <div className={`
                        w-16 h-16 rounded-2xl mb-6 flex items-center justify-center 
                        bg-gradient-to-br ${theme.glow} shadow-lg text-white
                        transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500
                      `}>
                                                <Icon className="w-8 h-8" />
                                            </div>

                                            {/* Text */}
                                            <div className="mb-2">
                                                <span className={`text-xs font-bold uppercase tracking-wider opacity-80 ${theme.text} ${theme.textDark} mb-2 block`}>
                                                    {step.tagline}
                                                </span>
                                                <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-3 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-800 group-hover:to-slate-600 dark:group-hover:from-white dark:group-hover:to-slate-300 transition-all">
                                                    {step.title}
                                                </h3>
                                                <p className="text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed mb-6">
                                                    {step.description}
                                                </p>
                                            </div>

                                            {/* Divider */}
                                            <div className="h-px w-full bg-slate-100 dark:bg-slate-800/50 mb-6 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors"></div>

                                            {/* Bullets */}
                                            <ul className="space-y-3 mt-auto">
                                                {step.bullets.map((bullet, idx) => (
                                                    <li key={idx} className="flex items-start gap-3">
                                                        <div className={`mt-1 w-4 h-4 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 ${theme.text} ${theme.textDark} shrink-0`}>
                                                            <Check className="w-2.5 h-2.5" strokeWidth={4} />
                                                        </div>
                                                        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                                                            {bullet}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Hover Arrow */}
                                            <div className={`absolute top-8 right-8 ${theme.text} ${theme.textDark} opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500`}>
                                                <ArrowRight className="w-6 h-6" />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Workflow;
