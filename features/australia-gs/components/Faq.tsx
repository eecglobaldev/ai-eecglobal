



import React from 'react';

const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6"/></svg>;

export const Faq: React.FC = () => {
    return (
        <section id="faq" className="mb-16 py-12 bg-slate-100 dark:bg-gray-900/50 rounded-lg border border-slate-200 dark:border-gray-700/50">
            <div className="max-w-4xl mx-auto px-4">
                <header className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400">Frequently Asked Questions</h2>
                     <p className="text-center text-lg text-slate-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">Answers to common questions about the GS interview and our tool.</p>
                </header>
                <div className="space-y-6">
                    <details className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 details-arrow hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                        <summary className="font-semibold text-slate-700 dark:text-slate-300 cursor-pointer list-none flex justify-between items-center">
                            What is the Genuine Student (GS) requirement for an Australian student visa?
                            <ChevronLeftIcon className="w-5 h-5 text-slate-500 dark:text-slate-400 transform -rotate-90" />
                        </summary>
                        <div className="mt-3 text-slate-600 dark:text-gray-400">
                            The Genuine Student (GS) requirement is a key integrity measure for the Australian student visa program. It assesses whether an applicant is a genuine student intending to obtain a quality education in Australia. Applicants must demonstrate their understanding of the course, their future plans in their home country, and provide evidence of their circumstances.
                        </div>
                    </details>
                     <details className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 details-arrow hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                        <summary className="font-semibold text-slate-700 dark:text-slate-300 cursor-pointer list-none flex justify-between items-center">
                            What is the main difference between the old GTE and the new GS requirement?
                            <ChevronLeftIcon className="w-5 h-5 text-slate-500 dark:text-slate-400 transform -rotate-90" />
                        </summary>
                        <div className="mt-3 text-slate-600 dark:text-gray-400">
                            The Genuine Temporary Entrant (GTE) requirement focused primarily on ensuring students had a temporary intention to stay in Australia. The new Genuine Student (GS) requirement is more targeted, focusing on whether the applicant is a genuine student whose primary purpose is to study. It places more emphasis on the student's academic and career progression, their understanding of the course, and why they chose Australia, while still considering their ties to their home country.
                        </div>
                    </details>
                    <details className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 details-arrow hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                        <summary className="font-semibold text-slate-700 dark:text-slate-300 cursor-pointer list-none flex justify-between items-center">
                            How does this AI tool help me prepare for the GS interview?
                            <ChevronLeftIcon className="w-5 h-5 text-slate-500 dark:text-slate-400 transform -rotate-90" />
                        </summary>
                        <div className="mt-3 text-slate-600 dark:text-gray-400">
                            This tool provides hyper-personalized preparation. By analyzing your specific academic, financial, and personal profile, it generates unique interview questions that a real visa officer might ask you. It provides model answers, allows you to practice answering with your voice, and gives you instant AI-powered feedback on your performance.
                        </div>
                    </details>
                     <details className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 details-arrow hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                        <summary className="font-semibold text-slate-700 dark:text-slate-300 cursor-pointer list-none flex justify-between items-center">
                           Can I use this tool for the subclass 500 visa interview?
                            <ChevronLeftIcon className="w-5 h-5 text-slate-500 dark:text-slate-400 transform -rotate-90" />
                        </summary>
                        <div className="mt-3 text-slate-600 dark:text-gray-400">
                           Yes, absolutely. This tool is specifically designed to prepare students for the interview component related to the Australian Student Visa (subclass 500), with a strong focus on satisfying the new Genuine Student (GS) criteria.
                        </div>
                    </details>
                    <details className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 details-arrow hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                        <summary className="font-semibold text-slate-700 dark:text-slate-300 cursor-pointer list-none flex justify-between items-center">
                            Who is EEC and why are they providing this tool for free?
                            <ChevronLeftIcon className="w-5 h-5 text-slate-500 dark:text-slate-400 transform -rotate-90" />
                        </summary>
                        <div className="mt-3 text-slate-600 dark:text-gray-400">
                            EEC (Enbee Education Center) is Gujarat's largest and oldest study abroad company, founded in 1997. This tool is provided 100% free as part of our mission to make high-quality visa preparation accessible to every deserving student, leveraging AI to improve their chances of success.
                        </div>
                    </details>
                    <details className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 details-arrow hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                        <summary className="font-semibold text-slate-700 dark:text-slate-300 cursor-pointer list-none flex justify-between items-center">
                            How does the AI handle different Indian accents during transcription?
                            <ChevronLeftIcon className="w-5 h-5 text-slate-500 dark:text-slate-400 transform -rotate-90" />
                        </summary>
                        <div className="mt-3 text-slate-600 dark:text-gray-400">
                            The tool uses Google's latest speech-to-text models, which are trained on a vast and diverse dataset of global audio, including a wide range of Indian accents. While accuracy can vary based on microphone quality and background noise, the model is highly effective at understanding different speech patterns. You can always edit the transcript for accuracy before submitting it for feedback.
                        </div>
                    </details>
                </div>
            </div>
        </section>
    );
}