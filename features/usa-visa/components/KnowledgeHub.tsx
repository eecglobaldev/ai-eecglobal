import React from 'react';

const KnowledgeHub: React.FC = () => {
    return (
        <section id="knowledge-hub" className="mb-24 scroll-mt-20">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
                Knowledge Hub
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Video Card */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Featured Video</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">How to Approve F1 Visa? | F1 Visa Interview Questions and Answers</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-2">
                            Watch our experts break down the key strategies for answering common F-1 visa interview questions with confidence and clarity.
                        </p>
                        <a
                            href="https://www.youtube.com/watch?v=F_SkhYCCqkw"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block relative group rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700"
                        >
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10 pointer-events-none"></div>
                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                <div className="w-12 h-12 bg-red-600/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                    <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                </div>
                            </div>
                            <img
                                src="/assets/youtube-img.jpeg"
                                alt="F-1 Visa Interview Guide Video Thumbnail"
                                className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                        </a>
                    </div>
                </div>

                {/* Article Card */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6 h-full flex flex-col">
                        <div className="flex items-center gap-2 mb-4">
                            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Must Read</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">214(b) Refusal Reasons</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow">
                            Understanding Section 214(b) is critical. It's not about your documents; it's about your intent. Learn why officers use this "catch-all" refusal and how to build a profile that proves your non-immigrant intent before you even step up to the window.
                        </p>
                        <a
                            href="https://eecglobal.com/student-visa-f1/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-auto inline-flex items-center justify-center w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold rounded-lg transition-colors gap-2"
                        >
                            Read Full Article <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default KnowledgeHub;
