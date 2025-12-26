'use client';

import React from 'react';
import Flag from 'react-flagkit';

const ResourceHub: React.FC = () => {
    return (
        <section className="py-16 lg:py-24 dark:bg-slate-900/50 bg-slate-100/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-100/80 dark:bg-blue-400/10 border border-blue-200 dark:border-blue-400/20 rounded-full mb-4">
                        📚 Free Resources
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        Study Abroad Guides & Resources
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Comprehensive guides, country information, and visa resources crafted by experts with 28 years of experience.
                    </p>
                </div>

                {/* Country Hubs Grid */}
                <div className="mb-12">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <span className="w-8 h-px bg-blue-500"></span>
                        Country Guides
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <a href="/pages/hub/study-in-usa.html" className="group p-4 bg-white/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl hover:border-blue-500/50 hover:bg-blue-100/60 dark:hover:bg-blue-500/10 transition-all text-center">
                            <span className="mb-2 flex items-center justify-center"><Flag country="US" size={32} /></span>
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">Study in USA</span>
                        </a>
                        <a href="/pages/hub/study-in-canada.html" className="group p-4 bg-white/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl hover:border-blue-500/50 hover:bg-blue-100/60 dark:hover:bg-blue-500/10 transition-all text-center">
                            <span className="mb-2 flex items-center justify-center"><Flag country="CA" size={32} /></span>
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">Study in Canada</span>
                        </a>
                        <a href="/pages/hub/study-in-uk.html" className="group p-4 bg-white/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl hover:border-blue-500/50 hover:bg-blue-100/60 dark:hover:bg-blue-500/10 transition-all text-center">
                            <span className="mb-2 flex items-center justify-center"><Flag country="GB" size={32} /></span>
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">Study in UK</span>
                        </a>
                        <a href="/pages/hub/study-in-australia.html" className="group p-4 bg-white/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl hover:border-blue-500/50 hover:bg-blue-100/60 dark:hover:bg-blue-500/10 transition-all text-center">
                            <span className="mb-2 flex items-center justify-center"><Flag country="AU" size={32} /></span>
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">Study in Australia</span>
                        </a>
                        <a href="/pages/hub/study-in-germany.html" className="group p-4 bg-white/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl hover:border-blue-500/50 hover:bg-blue-100/60 dark:hover:bg-blue-500/10 transition-all text-center">
                            <span className="mb-2 flex items-center justify-center"><Flag country="DE" size={32} /></span>
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">Study in Germany</span>
                        </a>
                        <a href="/pages/hub/study-in-ireland.html" className="group p-4 bg-white/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl hover:border-blue-500/50 hover:bg-blue-100/60 dark:hover:bg-blue-500/10 transition-all text-center">
                            <span className="mb-2 flex items-center justify-center"><Flag country="IE" size={32} /></span>
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">Study in Ireland</span>
                        </a>
                    </div>
                </div>

                {/* Guides Grid */}
                <div className="mb-12">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <span className="w-8 h-px bg-emerald-500"></span>
                        Expert Guides
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <a href="/guides/australia-gs-guide.html" className="group p-5 bg-white/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl hover:border-emerald-500/40 hover:bg-emerald-100/50 dark:hover:bg-emerald-500/5 transition-all">
                            <div className="mb-3"><Flag country="AU" size={28} /></div>
                            <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 mb-2">Australia GS Test Guide 2026-2027</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Complete guide to passing the Genuine Student requirement</p>
                        </a>
                        <a href="/guides/german-grade-guide.html" className="group p-5 bg-white/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl hover:border-emerald-500/40 hover:bg-emerald-100/50 dark:hover:bg-emerald-500/5 transition-all">
                            <div className="mb-3"><Flag country="DE" size={28} /></div>
                            <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 mb-2">German Grade Calculator Guide</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Modified Bavarian Formula explained for Indian students</p>
                        </a>
                        <a href="/guides/germany-blocked-account-guide.html" className="group p-5 bg-white/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl hover:border-emerald-500/40 hover:bg-emerald-100/50 dark:hover:bg-emerald-500/5 transition-all">
                            <div className="mb-3"><Flag country="DE" size={28} /></div>
                            <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 mb-2">Germany Blocked Account 2026</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">€11,904 requirement, APS, and step-by-step process</p>
                        </a>
                        <a href="/guides/214b-refusal-recovery.html" className="group p-5 bg-white/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl hover:border-emerald-500/40 hover:bg-emerald-100/50 dark:hover:bg-emerald-500/5 transition-all">
                            <div className="mb-3"><Flag country="US" size={28} /></div>
                            <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 mb-2">214(b) Refusal Recovery</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">How to overcome US visa rejection with expert help</p>
                        </a>
                    </div>
                </div>

                {/* Quick Links Row */}
                <div className="grid md:grid-cols-3 gap-6">

                    {/* Glossary */}
                    <div className="p-6 bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl">
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            📖 Visa Glossary
                        </h3>
                        <ul className="space-y-2">
                            <li><a href="/pages/glossary/f1-visa.html" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">F-1 Visa (USA Student Visa)</a></li>
                            <li><a href="/pages/glossary/genuine-student-test.html" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Genuine Student Test (Australia)</a></li>
                            <li><a href="/pages/glossary/blocked-account.html" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Blocked Account (Germany)</a></li>
                            <li><a href="/pages/glossary/index.html" className="text-sm text-blue-700 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium">View Full Glossary →</a></li>
                        </ul>
                    </div>

                    {/* Comparisons */}
                    <div className="p-6 bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl">
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            ⚖️ Country Comparisons
                        </h3>
                        <ul className="space-y-2">
                            <li><a href="/pages/compare/usa-vs-canada.html" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">USA vs Canada for Indian Students</a></li>
                        </ul>
                    </div>

                    {/* News & Trust */}
                    <div className="p-6 bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl">
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            📰 News & Trust
                        </h3>
                        <ul className="space-y-2">
                            <li><a href="/pages/news/ireland-2026-employment-permit-update.html" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Ireland 2026 Employment Permit Update</a></li>
                            <li><a href="/pages/author/ca-madhav-gupta.html" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Meet CA Madhav Gupta (Visa Forensics)</a></li>
                            <li><a href="/pages/editorial-policy.html" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Our Editorial Policy</a></li>
                            <li><a href="/pages/sitemap.html" className="text-sm text-blue-700 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium">Full Sitemap →</a></li>
                        </ul>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default ResourceHub;
