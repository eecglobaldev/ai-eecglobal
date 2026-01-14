import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'What is an SOP? | Statement of Purpose Guide | EEC Glossary',
    description: 'SOP (Statement of Purpose) is a personal essay required for university admissions and visa applications. It explains your career goals, academic background, and reasons for choosing a specific course.',
    keywords: ['SOP', 'Statement of Purpose', 'SOP format', 'SOP for student visa', 'how to write SOP'],
    alternates: {
        canonical: 'https://ai.eecglobal.com/glossary/sop',
    },
};

const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "DefinedTerm",
            "@id": "https://ai.eecglobal.com/glossary/sop#term",
            "name": "Statement of Purpose (SOP)",
            "description": "A personal essay written by an applicant to a university or visa office, detailing their academic background, career objectives, and motivations for pursuing a specific program of study.",
            "inDefinedTermSet": {
                "@type": "DefinedTermSet",
                "name": "EEC Study Abroad Glossary"
            }
        }
    ]
};

export default function SOPPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <nav className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 py-3">
                <div className="max-w-4xl mx-auto px-4">
                    <ol className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <li><Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link></li>
                        <li><span className="mx-2">›</span></li>
                        <li><Link href="/glossary" className="hover:text-blue-600 dark:hover:text-blue-400">Glossary</Link></li>
                        <li><span className="mx-2">›</span></li>
                        <li className="text-slate-800 dark:text-slate-200 font-medium">SOP</li>
                    </ol>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 py-12">
                <header className="mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider mb-4">
                        📚 General Admissions
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
                        What is a Statement of Purpose (SOP)?
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                        A <strong>Statement of Purpose (SOP)</strong> is arguably the most critical subjective part of your application. It is your chance to speak directly to the admissions committee or visa officer and "connect the dots" between your past, present, and future.
                    </p>
                </header>

                <section className="prose prose-slate dark:prose-invert max-w-none">
                    <h2>Academic SOP vs. Visa SOP</h2>
                    <div className="grid md:grid-cols-2 gap-6 my-6">
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                            <h3 className="mt-0">Academic SOP</h3>
                            <p>Focuses on your <strong>intellectual curiosity</strong>, research interests, and ability to contribute to the university community. Used for getting admission.</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                            <h3 className="mt-0">Visa SOP</h3>
                            <p>Focuses on your <strong>intent to return</strong>, financial stability, and how the course justifies the high cost of international education (ROI). Assessing credibility is key here.</p>
                        </div>
                    </div>

                    <h2>The 5-Paragraph Structure</h2>
                    <ol>
                        <li><strong>Introduction:</strong> Hook the reader with a personal story or professional realization.</li>
                        <li><strong>Academic Background:</strong> What have you studied, and how has it prepared you?</li>
                        <li><strong>Professional Experience:</strong> Internships, jobs, and skills acquired.</li>
                        <li><strong>Why This Course & University:</strong> Specific modules, professors, or facilities.</li>
                        <li><strong>Career Goals:</strong> Short-term and long-term plans (and intent to return home).</li>
                    </ol>

                    <div className="not-prose mt-12">
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-white text-center">
                            <h3 className="text-2xl font-bold mb-4">Need help structuring your Visa SOP?</h3>
                            <p className="mb-8 opacity-90 max-w-xl mx-auto">
                                Our Australia GS Prep tool uses AI to help you draft the perfect "Genuine Student" statement structure.
                            </p>
                            <Link
                                href="/australiagsprep"
                                className="inline-block bg-white text-blue-700 font-bold px-8 py-4 rounded-xl hover:bg-slate-50 transition transform hover:-translate-y-1 shadow-lg"
                            >
                                Try SOP Structuring AI
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
