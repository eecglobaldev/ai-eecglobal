
import React from 'react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

export const SeoContent = () => {

    // FAQ Schema Data
    const faqData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is the GS requirement for Australian Student Visa?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The Genuine Student (GS) requirement assesses whether an applicant genuinely intends to remain in Australia as a student. It replaces the GTE requirement and focuses on the student's circumstances, course value, and immigration history."
                }
            },
            {
                "@type": "Question",
                "name": "How much fund is required for Australia Student Visa 2025-2026?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "As of May 2024, the financial requirement for the primary applicant is AUD 29,710 per year for living costs, plus the first year's tuition fee and travel expenses (approx AUD 2,000)."
                }
            },
            {
                "@type": "Question",
                "name": "Can I use AI to write my GS Statement?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "While you can use AI tools like EEC's AI Prep specifically designed for this to generate ideas and structure, your GS statement must be personal and authentic. Copy-pasting generic AI content can lead to refusal. Our tool helps you structure YOUR personal story."
                }
            },
            {
                "@type": "Question",
                "name": "Does EEC Global help with Australia Visa filing?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, EEC Global has 26 branches across Gujarat and specializes in Australian student visas. We assist with University applications, GTE/GS drafting, and Visa filing ensuring high success rates."
                }
            }
        ]
    };

    // Breadcrumb Schema
    const breadcrumbData = {
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
                "name": "AI Tools",
                "item": "https://ai.eecglobal.com/tools"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "Australia GS Prep",
                "item": "https://ai.eecglobal.com/australiagsprep"
            }
        ]
    };

    return (
        <section className="py-8 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">


            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Visual Breadcrumb Links */}
                <nav className="flex mb-8 text-sm text-slate-500 dark:text-slate-400" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link href="/" className="hover:text-violet-600 dark:hover:text-violet-400">
                                Home
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <span className="mx-2 text-slate-400">/</span>
                                <span className="text-slate-900 dark:text-white font-medium">Australia GS Prep</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                {/* Local SEO / Branch Connectivity */}
                <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                Need Physical Visa Assistance?
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300">
                                While this AI tool prepares you for the interview and GS statement,
                                our <strong>26 branches in Gujarat</strong> handle the official visa filing, notary, and apostille services.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {['Vadodara', 'Ahmedabad', 'Surat', 'Vallabh Vidyanagar', 'Anand'].map((city) => (
                                <span key={city} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-200">
                                    <MapPin className="w-3 h-3 text-violet-500" />
                                    {city}
                                </span>
                            ))}
                            <Link
                                href="/branch-locator"
                                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-violet-600 text-white text-xs font-bold hover:bg-violet-700 transition"
                            >
                                Find Nearest Branch
                            </Link>
                        </div>
                    </div>
                </div>


                {/* Visual FAQ Section for SEO Content */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                        Frequently Asked Questions about Australia Student Visa (GS)
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                GTE vs Genuine Student (GS) Requirement
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                                The <strong>Genuine Temporary Entrant (GTE)</strong> requirement has been replaced by the <strong>Genuine Student (GS)</strong> requirement as of March 2024.
                                Unlike GTE, the GS requirement focuses more on the student's ties to their home country and the value of the course to their future career
                                rather than proving they won't stay in Australia permanently.
                            </p>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                Student Visa Financial Requirements 2026
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                To obtain an Australian Student Visa (Subclass 500) in 2025-2026, you must show evidence of sufficient funds.
                                As of May 2024, this is <strong>AUD 29,710</strong> for living costs for a single applicant, plus course fees and travel costs.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                How EEC's AI Helper Works
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                                Our <strong>Australia Genuine Student Test Practice</strong> tool uses advanced AI to simulate the Department of Home Affairs interview.
                                It helps you articulate your study goals, explain your course choice, and demonstrate your genuine intent to study,
                                drastically improving your chances of success.
                            </p>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                Key Ranking Factors for GS
                            </h3>
                            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 text-sm space-y-1">
                                <li>Relevance of the course to previous studies/work</li>
                                <li>Knowledge about the education provider and Australia</li>
                                <li>Economic circumstances in home country</li>
                                <li>Potential return on investment (ROI) of the course</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};
