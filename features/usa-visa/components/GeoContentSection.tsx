import React from 'react';

const GeoContentSection: React.FC = () => {
    return (
        <section className="bg-slate-50 dark:bg-slate-900/50 py-16 mt-16 border-y border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
                            For Students from Gujarat
                        </span>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                            Tailored for Your Region
                        </h2>
                        <div className="space-y-4 text-slate-600 dark:text-slate-400">
                            <p>
                                Applying from Gujarat presents unique opportunities and challenges. Visa officers are often familiar with local business backgrounds, family ties, and educational institutions.
                            </p>
                            <p>
                                Whether you're from <strong>Ahmedabad, Vadodara, Surat, Anand</strong>, or surrounding areas, our AI understands the local context. It helps you articulate your family business roles, explain gaps for competitive exam preparation (like JEE/NEET), and frame your financial sponsorship in a way that resonates with the U.S. Consulate in Mumbai.
                            </p>
                        </div>
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">Mumbai</div>
                                <div className="text-xs text-slate-500 uppercase font-semibold">Consulate Focus</div>
                            </div>
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">Regional</div>
                                <div className="text-xs text-slate-500 uppercase font-semibold">Context Aware</div>
                            </div>
                        </div>
                    </div>
                    {/* Decorative Map/graphic placeholder - CSS only */}
                    <div className="relative h-64 md:h-full min-h-[300px] w-full bg-blue-600 rounded-2xl overflow-hidden shadow-xl flex items-center justify-center p-8">
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white to-blue-900"></div>
                        <div className="relative z-10 text-center text-white">
                            <svg className="w-24 h-24 mx-auto mb-4 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <h3 className="text-xl font-bold">Gujarat to USA</h3>
                            <p className="text-blue-100 mt-2 text-sm max-w-xs mx-auto">Expert guidance for students from Ahmedabad, Vadodara, Surat, and beyond.</p>
                        </div>
                        {/* Abstract shapes */}
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/30 rounded-full blur-2xl"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GeoContentSection;
