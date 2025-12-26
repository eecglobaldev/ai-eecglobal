import React from 'react';
import { GraduationCap, ChevronRight, Zap } from 'lucide-react';
import { semanticTriples } from './geoAeoData';

export const KnowledgeGraph: React.FC = () => {
    return (
        <section id="knowledge-relationships" className="mb-10 sm:mb-16 lg:mb-20 pt-6 sm:pt-8 lg:pt-12 relative">
            {/* Section ambient glow */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] bg-indigo-500/15 dark:bg-indigo-500/10 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />
            </div>
            
            <header className="text-center mb-8 sm:mb-10 lg:mb-14 px-2">
                <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-purple-100 via-violet-100 to-indigo-100 dark:from-purple-900/60 dark:via-violet-900/60 dark:to-indigo-900/60 text-purple-700 dark:text-purple-300 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-xl shadow-purple-500/20 dark:shadow-purple-500/10 border border-purple-200/50 dark:border-purple-700/50 backdrop-blur-sm">
                    <div className="relative p-1.5 sm:p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg sm:rounded-xl shadow-lg shadow-purple-500/40">
                        <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-icon-float" />
                    </div>
                    <span className="bg-gradient-to-r from-purple-700 to-indigo-700 dark:from-purple-300 dark:to-indigo-300 bg-clip-text text-transparent font-bold text-xs sm:text-sm">Knowledge Graph</span>
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-purple-500/20 dark:bg-purple-500/30 rounded-full text-[10px] sm:text-xs font-bold">
                        🧠 AI
                    </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 lg:mb-5">
                    <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 dark:from-purple-400 dark:via-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">UK Visa Knowledge</span>
                    <br />
                    <span className="bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-200 bg-clip-text text-transparent text-lg sm:text-xl md:text-2xl lg:text-3xl">Relationships</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed">
                    Semantic relationships between UK visa concepts. Structured for Knowledge Graph construction and LLM reasoning.
                </p>
            </header>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-5 px-1 sm:px-2 lg:px-8">
                {semanticTriples.map((triple, i) => (
                    <div 
                        key={i} 
                        className="group relative bg-white/80 dark:bg-[#0d1117]/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 border border-slate-200/80 dark:border-[#30363d] overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_-12px_rgba(168,85,247,0.5)] dark:hover:shadow-[0_0_50px_-12px_rgba(168,85,247,0.4)] hover:border-purple-400/50 dark:hover:border-purple-500/50 hover:-translate-y-1 sm:hover:-translate-y-2"
                        data-semantic-triple="true"
                    >
                        {/* Card glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-transparent to-indigo-500/0 group-hover:from-purple-500/10 group-hover:to-indigo-500/10 dark:group-hover:from-purple-500/15 dark:group-hover:to-indigo-500/15 transition-all duration-500" />
                        
                        {/* Connection line animation */}
                        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/40">
                                <Zap className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 text-white" />
                            </div>
                        </div>
                        
                        <div className="relative space-y-2 sm:space-y-3">
                            {/* Subject */}
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50" />
                                <span className="font-bold text-purple-700 dark:text-purple-400 text-xs sm:text-sm">{triple.subject}</span>
                            </div>
                            
                            {/* Arrow with predicate */}
                            <div className="flex items-center gap-1.5 sm:gap-2 pl-2 sm:pl-4">
                                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500 animate-bounce-x" />
                                <span className="text-indigo-600 dark:text-indigo-400 italic text-[10px] sm:text-xs font-medium bg-indigo-50 dark:bg-indigo-900/30 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">{triple.predicate}</span>
                            </div>
                            
                            {/* Object */}
                            <div className="flex items-center gap-1.5 sm:gap-2 pl-4 sm:pl-8">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-400 dark:bg-slate-500" />
                                <span className="font-medium text-slate-700 dark:text-slate-300 text-xs sm:text-sm">{triple.object}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

