'use client';

import { WhyEECComparison } from '@/features/uk-precas/components/WhyEECComparison';
import { ExpertInsights } from '@/features/uk-precas/components/ExpertInsights';
import { BranchLocator } from '@/features/uk-precas/components/BranchLocator';
import { Award, Quote, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function UkPrecasAboutEecPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-[#0a0d14] dark:via-[#0d1117] dark:to-[#0a0d14]">
            {/* Hero Section */}
            <section className="relative pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-teal-500/20 dark:bg-teal-500/10 rounded-full blur-[150px] animate-pulse-slow" />
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/15 dark:bg-amber-500/10 rounded-full blur-[120px] animate-pulse-slow animation-delay-2000" />
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumb */}
                    <nav className="mb-6 sm:mb-8 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Link href="/ukprecas/" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                            UK Pre-CAS Prep
                        </Link>
                        <ArrowRight className="w-4 h-4" />
                        <span className="text-slate-900 dark:text-white font-medium">About EEC</span>
                    </nav>

                    {/* Header */}
                    <div className="text-center mb-8 sm:mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 dark:bg-teal-900/40 border border-teal-200 dark:border-teal-700/60 mb-6 backdrop-blur-xl">
                            <Award className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                            <span className="text-xs font-bold tracking-widest uppercase text-teal-700 dark:text-teal-300">Why Choose EEC</span>
                        </div>
                        
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6">
                            <span className="text-slate-800 dark:text-white">Gujarat's #1 UK Study</span>
                            <br />
                            <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-amber-600 dark:from-teal-400 dark:via-cyan-400 dark:to-amber-400 bg-clip-text text-transparent">
                                Abroad Consultant Since 1997
                            </span>
                        </h1>
                        
                        <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            29 years of expertise, 50,000+ students guided, 26 branches across Gujarat. Discover why EEC is the trusted choice for UK Pre-CAS interview preparation and student visa success.
                        </p>
                    </div>

                    {/* Quick Navigation Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto mb-12">
                        <a 
                            href="#why-eec-comparison" 
                            className="group flex flex-col items-center gap-2 p-4 bg-white/80 dark:bg-[#161b22]/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-[#30363d] hover:border-teal-400 dark:hover:border-teal-500 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg group-hover:scale-110 transition-transform">
                                <Award className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 text-center">Why Choose EEC</span>
                        </a>
                        
                        <a 
                            href="#expert-insights" 
                            className="group flex flex-col items-center gap-2 p-4 bg-white/80 dark:bg-[#161b22]/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-[#30363d] hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg group-hover:scale-110 transition-transform">
                                <Quote className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 text-center">Expert Insights</span>
                        </a>
                        
                        <a 
                            href="#branch-locator" 
                            className="group flex flex-col items-center gap-2 p-4 bg-white/80 dark:bg-[#161b22]/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-[#30363d] hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                                <MapPin className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 text-center">Find a Branch</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Main Content - All Sections */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
                {/* Why Choose EEC Comparison */}
                <WhyEECComparison />

                {/* Expert Insights */}
                <ExpertInsights />

                {/* Branch Locator */}
                <div id="branch-locator">
                    <BranchLocator />
                </div>

                {/* Call to Action */}
                <section className="mt-16 sm:mt-20 text-center">
                    <div className="relative bg-gradient-to-r from-teal-600 via-cyan-600 to-amber-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden">
                        <div className="absolute inset-0 bg-grid-pattern-sm opacity-20" />
                        <div className="relative">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
                                Ready to Start Your UK Journey?
                            </h2>
                            <p className="text-teal-100 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
                                Visit any of our 26 branches across Gujarat for a free consultation, or start practicing with our free AI-powered UK Pre-CAS interview preparation tool.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link 
                                    href="/ukprecas/"
                                    className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-teal-600 font-bold rounded-xl hover:bg-teal-50 transition-all duration-300 hover:scale-105 shadow-xl"
                                >
                                    <span>Start Free Practice</span>
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <a 
                                    href="#branch-locator"
                                    className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
                                >
                                    <MapPin className="w-5 h-5" />
                                    <span>Find Nearest Branch</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
