'use client';

import { Search, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import UkPrecasStructuredData from '@/features/uk-precas/components/UkPrecasStructuredData';

const glossaryTerms = [
    {
        term: 'CAS',
        definition: 'Confirmation of Acceptance for Studies - A unique reference number issued by UK universities that allows you to apply for a student visa. Required for all Tier 4 visas.',
        category: 'Visa Process',
    },
    {
        term: 'Pre-CAS Interview',
        definition: 'A mandatory 15-30 minute video credibility assessment conducted by UK universities before CAS issuance. Evaluates genuine student intention, course knowledge, and financial capability.',
        category: 'Interview',
    },
    {
        term: 'Credibility Assessment',
        definition: 'The evaluation process during Pre-CAS interviews where universities assess whether you are a genuine student with clear study intentions and adequate financial means.',
        category: 'Interview',
    },
    {
        term: 'Tier 4 Visa',
        definition: 'The UK student visa category for international students. Requires a valid CAS and sufficient funds. Allows full-time study at licensed UK institutions.',
        category: 'Visa Types',
    },
    {
        term: 'Genuine Student',
        definition: 'A student who demonstrates clear academic intentions, adequate financial resources, and genuine interest in studying in the UK rather than using the visa for other purposes.',
        category: 'Requirements',
    },
    {
        term: 'Statement of Purpose',
        definition: 'A personal essay explaining your academic background, career goals, reasons for choosing the UK/university/course, and how the program fits your future plans.',
        category: 'Documents',
    },
    {
        term: 'IELTS/SELT',
        definition: 'Secure English Language Test - Required English proficiency tests for UK student visas. Must be taken at approved test centers. Minimum scores vary by course level.',
        category: 'Requirements',
    },
    {
        term: '28-Day Bank Statement',
        definition: 'Bank statements showing your financial history for the 28 days immediately before your visa application. Must show sufficient funds and regular income patterns.',
        category: 'Documents',
    },
    {
        term: 'Sponsor Letter',
        definition: 'A formal letter from your financial sponsor (usually a parent or guardian) explaining their relationship to you, their income, and commitment to support your studies.',
        category: 'Documents',
    },
    {
        term: 'Red Flags',
        definition: 'Warning signs during interviews that may indicate you are not a genuine student, such as inconsistent financial information, unclear study plans, or inability to discuss your course.',
        category: 'Interview',
    },
    {
        term: 'Graduate Route',
        definition: 'A 2-year post-study work visa available to international students who complete a UK degree. Allows you to work or look for work in the UK after graduation.',
        category: 'Post-Study',
    },
    {
        term: 'Maintenance Funds',
        definition: 'The minimum amount of money you must prove you have available for living expenses during your studies. Varies by location: £1,334/month for London, £1,023/month for outside London.',
        category: 'Financial',
    },
    {
        term: 'CAS Shield Interview',
        definition: 'An enhanced credibility assessment used by universities for higher-risk applicants. It digs deeper into academic progression, source-of-funds, and motivation. Useful to practice for if you have gaps, complex funding, or previous immigration issues.',
        category: 'Interview',
    },
    {
        term: 'UKVI (UK Visas and Immigration)',
        definition: 'The UK government department handling visa decisions, border control and immigration policy. UKVI sets rules for student visas, including financial, English and CAS-related requirements.',
        category: 'Government Terms',
    },
    {
        term: 'Genuine Student Requirement',
        definition: 'A principle UKVI applies to ensure applicants are coming to study, demonstrated via consistent documents, coherent course choice, traceable funds, and credible future plans.',
        category: 'Requirements',
    },
    {
        term: 'IHS (Immigration Health Surcharge) 2026',
        definition: 'A mandatory healthcare surcharge paid during the visa application: typically £1,035 per year for most adult applicants (students pay the appropriate rate as part of their visa fee). It grants access to NHS services from the visa start date.',
        category: 'Financial',
    },
    {
        term: 'Points-Based System (PBS) UK',
        definition: 'The framework used to score visa applications. For a student application, a total of 70 points is required (CAS and course requirements, funds, and English proficiency contribute to this total).',
        category: 'Government Terms',
    },
    {
        term: 'SELT (Secure English Language Test)',
        definition: 'UKVI-approved English tests (e.g., IELTS for UKVI, PTE Academic UKVI) used to prove your language ability for visa purposes. Results are typically valid for two years.',
        category: 'Requirements',
    },
    {
        term: 'UK Airport Interview',
        definition: 'A short credibility check by Border Force officers on arrival to confirm identity, study plans, and accommodation. Keep originals or clear digital copies of CAS and offer letter for arrival checks.',
        category: 'Interview',
    },
    {
        term: 'BRP (Biometric Residence Permit)',
        definition: 'A card issued to non-UK nationals staying longer than six months. Collect it at the designated Post Office within 10 days of arrival; it proves your legal status in the UK.',
        category: 'Documents',
    },
    {
        term: 'Academic Progression',
        definition: 'The expectation that your chosen course logically follows your previous education or employment. Good progression is a strong indicator of genuine intent.',
        category: 'Requirements',
    },
    {
        term: 'AIRC Certification',
        definition: 'An industry certification for education agents demonstrating ethical recruitment and counselor training standards. EEC is AIRC-certified through 2031 per internal records.',
        category: 'University Terms',
    },
    {
        term: 'Source of Funds (SoF)',
        definition: 'Documentation proving how your study funds were obtained — savings, salary, business income, loan letters — with evidence that funds were held for the required 28-day period.',
        category: 'Financial',
    },
    {
        term: 'UK Russell Group',
        definition: 'A group of 24 leading UK research-intensive universities. Member institutions are often more selective and research-focused.',
        category: 'University Terms',
    },
    {
        term: 'TB Test for UK Visa',
        definition: 'Tuberculosis screening required from applicants in certain countries, including India, for visas longer than six months. Tests must be taken at approved centres and are usually valid for six months.',
        category: 'Documents',
    },
    {
        term: 'UK September Intake',
        definition: 'The primary academic start date (late September) when most UK courses commence; it offers the widest choice of programs and is the most common intake for international students.',
        category: 'University Terms',
    },
    {
        term: 'UK January Intake',
        definition: 'A secondary intake (January/February) with limited course options; useful if you miss the September deadline or prefer a later start.',
        category: 'University Terms',
    },
    {
        term: 'EEC Pre-CAS AI Tool',
        definition: 'A free, profile-based AI interview practice system that records answers, offers transcriptions and scores, and helps identify weak points before real interviews.',
        category: 'University Terms',
    },
];

export default function UkPrecasGlossaryPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', ...new Set(glossaryTerms.map(term => term.category))];

    const filteredTerms = glossaryTerms.filter(term => {
        const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            term.definition.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <GoogleTagManager gtmId="GTM-TDBRW6C4" />
            <UkPrecasStructuredData />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                {/* Header */}
                <header className="bg-white/95 dark:bg-[#0d1117]/95 backdrop-blur-xl sticky top-0 z-40 border-b border-slate-200/80 dark:border-[#30363d]/80 shadow-sm">
                    <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center gap-3 group">
                                <div className="relative">
                                    <img src="/assets/logos/eeclogo-main.webp" alt="EEC" className="h-9 transition-transform duration-300 group-hover:scale-110" />
                                    <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <div className="font-bold text-slate-900 dark:text-gray-100">
                                    <span className="hidden md:inline text-xl tracking-tight">
                                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">UK Pre-CAS Prep</span>
                                        <span className="text-slate-400 font-normal"> by </span>
                                        <span className="text-slate-800 dark:text-white">EEC</span>
                                    </span>
                                    <span className="md:hidden text-lg tracking-tight">
                                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">UK Pre-CAS</span>
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <a
                                    href="/ukprecas/"
                                    className="group relative flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                    <HelpCircle className="w-4 h-4 relative transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                                    <span className="relative">Back to Tool</span>
                                </a>
                            </div>
                        </div>
                    </nav>
                </header>

                {/* Main Content */}
                <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border border-indigo-200/50 dark:border-indigo-700/50 mb-6 animate-fade-in">
                            <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-pulse" />
                            <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Glossary</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto animate-fade-in-up">
                            <span className="text-slate-900 dark:text-white">UK Pre-CAS Interview</span>
                            <br />
                            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">Glossary</span>
                        </h1>
                        <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            Understand key terms and definitions related to UK Pre-CAS interviews and student visas.
                        </p>
                    </div>

                    {/* Search and Filter */}
                    <div className="mb-8">
                        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search terms..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                                />
                            </div>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Glossary Terms */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                        {filteredTerms.map((term, index) => (
                            <div key={term.term} className="bg-white/90 dark:bg-[#161b22]/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-[#30363d] shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden" style={{ animationDelay: `${index * 50}ms` }}>
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{term.term}</h3>
                                        <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold rounded-full">
                                            {term.category}
                                        </span>
                                    </div>
                                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{term.definition}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredTerms.length === 0 && (
                        <div className="text-center py-16">
                            <HelpCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                            <p className="text-slate-600 dark:text-slate-400 text-lg">No terms found matching your search.</p>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedCategory('All');
                                }}
                                className="mt-4 text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}

                    {/* CTA Section */}
                    <div className="text-center mt-16">
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-3xl p-8 sm:p-12 border border-indigo-200/50 dark:border-indigo-700/50">
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                Still Have Questions?
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
                                Practice with our AI tool to get personalized answers and feedback for your specific situation.
                            </p>
                            <a
                                href="/ukprecas/"
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-1"
                            >
                                <HelpCircle className="w-5 h-5" />
                                Start Practicing Now
                            </a>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
