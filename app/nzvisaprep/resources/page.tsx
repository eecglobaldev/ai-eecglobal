'use client';

import { VisaChecklist } from '@/features/nz-visa/seo/VisaChecklist';
import { CostCalculator } from '@/features/nz-visa/seo/CostCalculator';
import { NZStatistics } from '@/features/nz-visa/seo/NZStatistics';
import { FileText, Calculator, BarChart3, BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function NZVisaResourcesPage() {
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://ai.eecglobal.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "NZ Visa Prep",
                "item": "https://ai.eecglobal.com/nzvisaprep/"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "Resources",
                "item": "https://ai.eecglobal.com/nzvisaprep/resources/"
            }
        ]
    };

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://eecglobal.com/#organization",
        "name": "EEC - Enbee Education Center",
        "alternateName": ["EEC Global", "Enbee Education"],
        "url": "https://eecglobal.com",
        "logo": "https://ai.eecglobal.com/assets/eeclogo.svg",
        "description": "India's leading New Zealand student visa preparation consultancy, established in 1997. Operating 26 branches across 12 cities in Gujarat. Guided over 100,000 students to international education destinations.",
        "foundingDate": "1997",
        "numberOfEmployees": {
            "@type": "QuantitativeValue",
            "value": "200+"
        },
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Gujarat",
            "addressRegion": "Gujarat",
            "addressCountry": "IN"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-8758750036",
            "contactType": "Customer Service",
            "areaServed": "IN",
            "availableLanguage": ["English", "Hindi", "Gujarati"]
        },
        "sameAs": [
            "https://www.facebook.com/eecglobal",
            "https://www.linkedin.com/company/eec-global",
            "https://www.instagram.com/eecglobal"
        ],
        "award": [
            "ENZRA Certified (Education New Zealand Recognized Agency)",
            "AIRC Certified (American International Recruitment Council)",
            "ICEF Accredited",
            "U.S. News Global Education Certified"
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "2847",
            "bestRating": "5",
            "worstRating": "1"
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-[#0a0d14] dark:via-[#0d1117] dark:to-[#0a0d14]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
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
                        <Link href="/nzvisaprep/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                            NZ Visa Prep
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
                            <span className="text-slate-800 dark:text-white">NZ Student Visa</span>
                            <br />
                            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                                Essential Resources 2026
                            </span>
                        </h1>
                        
                        <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            Everything you need to prepare for your New Zealand student visa: document checklist, cost calculator, verified statistics, and English test information.
                        </p>
                    </div>

                    {/* Quick Navigation Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto mb-12">
                        <a 
                            href="#visa-checklist" 
                            className="group flex flex-col items-center gap-2 p-4 bg-white/80 dark:bg-[#161b22]/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-[#30363d] hover:border-rose-400 dark:hover:border-rose-500 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="p-2 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg group-hover:scale-110 transition-transform">
                                <FileText className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 text-center">Documents</span>
                        </a>
                        
                        <a 
                            href="#cost-calculator" 
                            className="group flex flex-col items-center gap-2 p-4 bg-white/80 dark:bg-[#161b22]/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-[#30363d] hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                                <Calculator className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 text-center">Calculator</span>
                        </a>
                        
                        <a 
                            href="#nz-statistics" 
                            className="group flex flex-col items-center gap-2 p-4 bg-white/80 dark:bg-[#161b22]/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-[#30363d] hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg group-hover:scale-110 transition-transform">
                                <BarChart3 className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 text-center">Statistics</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Main Content - All Resources */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
                {/* Document Checklist */}
                <section id="visa-checklist" className="mb-12 sm:mb-16">
                    {/* Context Section */}
                    <div className="mb-8 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-2xl p-6 sm:p-8 border border-rose-200 dark:border-rose-800">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Why Each Document Matters</h2>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                            Every document in your New Zealand student visa application serves a specific purpose. Immigration New Zealand (INZ) uses these documents to verify your genuine temporary entry intent, assess your financial capacity, and ensure you meet all eligibility requirements. Missing or incomplete documents can delay processing or result in visa refusal.
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            Academic documents demonstrate your educational background and course progression. Financial documents prove you can support yourself during your studies. Medical and police clearances ensure you meet health and character requirements. Each document tells part of your story, and together they create a complete picture of your genuine intention to study in New Zealand.
                        </p>
                    </div>
                    <VisaChecklist />
                </section>

                {/* Cost Calculator */}
                <section id="cost-calculator" className="mb-12 sm:mb-16">
                    {/* Context Section */}
                    <div className="mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 sm:p-8 border border-indigo-200 dark:border-indigo-800">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Understanding New Zealand Financial Requirements 2026</h2>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                            New Zealand's student visa financial requirements are designed to ensure you can support yourself throughout your studies without financial hardship. The Funds to Support (FTS) scheme requires you to demonstrate NZD $20,000 per year for living expenses, which covers accommodation, food, transport, utilities, and personal expenses.
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                            In addition to living expenses, you must show proof of tuition fees payment. Tuition fees vary significantly based on your institution and program level, ranging from NZD $22,000 for diplomas to NZD $50,000+ for professional programs. The cost calculator above helps you estimate total expenses based on your specific course and city choice.
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            Financial evidence can be demonstrated through bank statements (minimum 6 months), education loan sanctions from recognized banks, or sponsor declarations with CA-certified financial documents. It's crucial that these funds are readily available and not tied up in fixed deposits or investments that cannot be liquidated quickly.
                        </p>
                    </div>
                    <CostCalculator />
                </section>

                {/* Statistics */}
                <section id="nz-statistics" className="mb-12 sm:mb-16">
                    {/* Context Section */}
                    <div className="mb-8 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 sm:p-8 border border-blue-200 dark:border-blue-800">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">How We Calculate These Statistics</h2>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                            The statistics presented here are compiled from multiple authoritative sources including Immigration New Zealand (INZ) official data, Education New Zealand (ENZ) reports, university statistics, and EEC's internal application data from our 26 branches across Gujarat.
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                            Visa approval rates are calculated based on INZ's published statistics for Indian applicants, combined with EEC's internal success rate of 94.7% (significantly above the national average). Processing times reflect actual averages from applications submitted through EEC, which typically process faster due to complete documentation and expert guidance.
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            Employment and salary statistics come from Education New Zealand's graduate outcomes surveys and Statistics New Zealand data. University rankings are from the latest QS World University Rankings. All statistics are updated regularly to reflect the most current information available.
                        </p>
                    </div>
                    <NZStatistics />
                </section>

                {/* Related Pages */}
                <section className="mt-16">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Related Resources</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <a
                            href="/nzvisaprep/faq/"
                            className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
                        >
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">FAQ</h3>
                            <p className="text-slate-600 dark:text-slate-400">Get answers to common questions about NZ student visas</p>
                        </a>
                        <a
                            href="/nzvisaprep/glossary/"
                            className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
                        >
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Glossary</h3>
                            <p className="text-slate-600 dark:text-slate-400">Learn key terms and definitions for NZ student visas</p>
                        </a>
                        <a
                            href="/nzvisaprep/preparation-guide/"
                            className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
                        >
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Preparation Guide</h3>
                            <p className="text-slate-600 dark:text-slate-400">Step-by-step guide for visa application and interview</p>
                        </a>
                        <a
                            href="/nzvisaprep/about-eec/"
                            className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
                        >
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">About EEC</h3>
                            <p className="text-slate-600 dark:text-slate-400">Meet our expert team and learn about our services</p>
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}
