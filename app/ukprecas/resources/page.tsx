'use client';

import { DocumentChecklist } from '@/features/uk-precas/components/DocumentChecklist';
import { FundsCalculator } from '@/features/uk-precas/components/FundsCalculator';
import { VerifiedStatistics } from '@/features/uk-precas/components/VerifiedStatistics';
import { EnglishTestPrep } from '@/features/uk-precas/components/EnglishTestPrep';
import { FileText, Calculator, BarChart3, BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function UkPrecasResourcesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-[#0a0d14] dark:via-[#0d1117] dark:to-[#0a0d14]">
            {/* Hero Section */}
            <section className="relative pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full blur-[150px] animate-pulse-slow" />
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/15 dark:bg-purple-500/10 rounded-full blur-[120px] animate-pulse-slow animation-delay-2000" />
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumb */}
                    <nav className="mb-6 sm:mb-8 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Link href="/ukprecas/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                            UK Pre-CAS Prep
                        </Link>
                        <ArrowRight className="w-4 h-4" />
                        <span className="text-slate-900 dark:text-white font-medium">Resources</span>
                    </nav>

                    {/* Header */}
                    <div className="text-center mb-8 sm:mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-700/60 mb-6 backdrop-blur-xl">
                            <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            <span className="text-xs font-bold tracking-widest uppercase text-indigo-700 dark:text-indigo-300">Complete Resources</span>
                        </div>
                        
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6">
                            <span className="text-slate-800 dark:text-white">UK Pre-CAS Interview</span>
                            <br />
                            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                                Essential Resources 2026
                            </span>
                        </h1>
                        
                        <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            Everything you need to prepare for your UK Pre-CAS credibility interview: document checklist, funds calculator, verified statistics, and English test preparation tools.
                        </p>
                    </div>

                    {/* Quick Navigation Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-12">
                        <a 
                            href="#document-checklist-2026" 
                            className="group flex flex-col items-center gap-2 p-4 bg-white/80 dark:bg-[#161b22]/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-[#30363d] hover:border-rose-400 dark:hover:border-rose-500 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="p-2 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg group-hover:scale-110 transition-transform">
                                <FileText className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 text-center">Documents</span>
                        </a>
                        
                        <a 
                            href="#funds-calculator" 
                            className="group flex flex-col items-center gap-2 p-4 bg-white/80 dark:bg-[#161b22]/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-[#30363d] hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                                <Calculator className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 text-center">Calculator</span>
                        </a>
                        
                        <a 
                            href="#verified-statistics" 
                            className="group flex flex-col items-center gap-2 p-4 bg-white/80 dark:bg-[#161b22]/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-[#30363d] hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg group-hover:scale-110 transition-transform">
                                <BarChart3 className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 text-center">Statistics</span>
                        </a>
                        
                        <a 
                            href="#english-test-prep" 
                            className="group flex flex-col items-center gap-2 p-4 bg-white/80 dark:bg-[#161b22]/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-[#30363d] hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg group-hover:scale-110 transition-transform">
                                <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 text-center">English Tests</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Main Content - All Resources */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
                {/* Why Each Document Matters - Context Section */}
                <section id="document-checklist-2026" className="mb-12 sm:mb-16">
                    <div className="bg-white/90 dark:bg-[#161b22]/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-[#30363d] shadow-lg p-6 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">Why Each Document Matters</h2>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                            Every document you submit serves a specific purpose in assessing your credibility as a genuine student. UK universities and UKVI do not review documents in isolation—they cross-check them against each other and against what you say during interviews.
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                            Your <strong>offer letter</strong> confirms the course, intake, and institution you claim to be joining. <strong>Academic transcripts</strong> are used to verify academic progression and whether the chosen course logically follows your previous education. <strong>English test scores</strong> demonstrate your ability to cope with academic study in the UK, not just visa eligibility.
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                            <strong>Bank statements and sponsor documents</strong> are examined carefully to confirm you can support yourself without financial stress. Interviewers often ask questions directly from these statements to check consistency. Your <strong>Statement of Purpose (SOP)</strong> explains intent—why this course, why now, and how it fits your future. Even <strong>accommodation details</strong> matter, as they show practical planning and awareness of living arrangements.
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            Inconsistencies between documents and interview answers are one of the most common reasons for delays and refusals. Preparation means understanding not just <em>what</em> documents you have, but <em>why</em> each one exists and how it supports your study plan.
                        </p>
                    </div>
                </section>

                {/* Document Checklist */}
                <DocumentChecklist />

                {/* Understanding UK Visa Financial Requirements - Context Section */}
                <section id="funds-calculator" className="mb-12 sm:mb-16">
                    <div className="bg-white/90 dark:bg-[#161b22]/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-[#30363d] shadow-lg p-6 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">Understanding UK Visa Financial Requirements 2026</h2>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                            UK visa financial requirements exist to ensure international students can realistically support themselves during their studies without relying on public funds or facing hardship. For 2026, students must demonstrate sufficient <strong>maintenance funds</strong>, calculated monthly for up to nine months, in addition to first-year tuition fees.
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                            A critical requirement is the <strong>28-day rule</strong>: the required funds must be held continuously for 28 consecutive days, ending no more than 31 days before the visa application date. This rule is strictly enforced. Sudden large deposits without explanation often lead to credibility concerns.
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                            Equally important is <strong>Source of Funds</strong>. UKVI expects funds to be legitimate, traceable, and supported by documentation—whether from personal savings, parental sponsorship, or education loans. Interviewers may ask how the money was earned, saved, or transferred.
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            The <strong>Immigration Health Surcharge (IHS)</strong> must be paid upfront during the visa application and should be included in early budgeting. Understanding the full financial picture—tuition, living costs, IHS, and travel—helps prevent last-minute stress and errors that can jeopardise the visa outcome.
                        </p>
                    </div>
                </section>

                {/* Funds Calculator */}
                <FundsCalculator />

                {/* How We Calculate These Statistics - Context Section */}
                <section id="verified-statistics" className="mb-12 sm:mb-16">
                    <div className="bg-white/90 dark:bg-[#161b22]/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-[#30363d] shadow-lg p-6 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">How We Calculate These Statistics</h2>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                            EEC's statistics are calculated using verified internal records combined with official policy data. Student counts, interview outcomes, and visa results are drawn from documented cases handled between 2024 and 2026. Only completed cases with confirmed outcomes are included—applications still in progress are excluded.
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                            Policy-related figures, such as financial requirements and visa rules, are cross-checked against current UK government guidance to ensure accuracy. Where regulations change, data is updated rather than averaged across years.
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            This approach ensures transparency and reliability. The goal is not to present inflated numbers, but to give students and parents a realistic picture based on verified results, consistent methodology, and current UK immigration standards.
                        </p>
                    </div>
                </section>

                {/* Verified Statistics */}
                <VerifiedStatistics />

                {/* IELTS vs PTE for UK Visa - Context Section */}
                <section id="english-test-prep" className="mb-12 sm:mb-16">
                    <div className="bg-white/90 dark:bg-[#161b22]/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-[#30363d] shadow-lg p-6 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">IELTS vs PTE for UK Visa</h2>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                            Both IELTS and PTE are widely accepted for UK student visas when taken at <strong>UKVI-approved test centres</strong>, but the two exams differ in format and experience. IELTS includes face-to-face speaking and is familiar to most universities, while PTE is fully computer-based and often delivers faster results.
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                            Universities set <strong>course-specific score and band requirements</strong>, so an overall score alone is not enough—you must meet minimum scores in each section if specified. Some competitive programs may require higher writing or speaking scores regardless of the test chosen.
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            Choosing between IELTS and PTE should depend on your comfort with the test format, preparation time available, and application deadlines. From a visa perspective, both are equally valid if UKVI-approved; what matters most is that your score meets the university's academic requirement and remains valid at the time of visa application.
                        </p>
                    </div>
                </section>

                {/* English Test Preparation */}
                <EnglishTestPrep />

                {/* Call to Action */}
                <section className="mt-16 sm:mt-20 text-center">
                    <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden">
                        <div className="absolute inset-0 bg-grid-pattern-sm opacity-20" />
                        <div className="relative">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
                                Ready to Practice Your Interview?
                            </h2>
                            <p className="text-indigo-100 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
                                Use our free AI-powered tool to practice UK Pre-CAS interviews with personalized feedback and expert guidance.
                            </p>
                            <Link 
                                href="/ukprecas/"
                                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-all duration-300 hover:scale-105 shadow-xl"
                            >
                                <span>Start Free Practice</span>
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
