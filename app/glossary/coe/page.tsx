import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'What is COE? | Confirmation of Enrolment Australia | EEC Glossary',
    description: 'COE (Confirmation of Enrolment) is the official document issued by Australian universities to international students. Required for Subclass 500 Visa application.',
    keywords: ['COE Australia', 'Confirmation of Enrolment', 'Australian student visa', 'eCoE', 'PRISMS Australia'],
    alternates: {
        canonical: 'https://ai.eecglobal.com/glossary/coe',
    },
};

const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "DefinedTerm",
            "@id": "https://ai.eecglobal.com/glossary/coe#term",
            "name": "Confirmation of Enrolment (CoE)",
            "alternateName": "eCoE",
            "description": "An official document issued by an Australian education provider (university/college) to verify that an international student has accepted their offer and paid the required tuition deposit.",
            "inDefinedTermSet": {
                "@type": "DefinedTermSet",
                "name": "EEC Study Abroad Glossary"
            }
        }
    ]
};

export default function COEPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <nav className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 py-3">
                <div className="max-w-4xl mx-auto px-4">
                    <ol className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <li><Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400">Home</Link></li>
                        <li><span className="mx-2">›</span></li>
                        <li><Link href="/glossary" className="hover:text-emerald-600 dark:hover:text-emerald-400">Glossary</Link></li>
                        <li><span className="mx-2">›</span></li>
                        <li className="text-slate-800 dark:text-slate-200 font-medium">CoE</li>
                    </ol>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 py-12">
                <header className="mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
                        🇦🇺 Australia Visa
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
                        What is a CoE (Confirmation of Enrolment)?
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                        The <strong>Confirmation of Enrolment (CoE)</strong> is an official verification code generated through the PRISMS system by Australian universities. It proves to the Department of Home Affairs that you are a genuine student who has finalized admission.
                    </p>
                </header>

                <section className="prose prose-slate dark:prose-invert max-w-none">
                    <div className="bg-emerald-50 dark:bg-emerald-950/30 border-l-4 border-emerald-500 p-6 rounded-r-xl my-8">
                        <h3 className="text-emerald-900 dark:text-emerald-100 font-bold text-lg m-0 mb-2">No CoE = No Visa</h3>
                        <p className="text-emerald-800 dark:text-emerald-200 m-0">
                            You strictly cannot lodge a Subclass 500 Student Visa application without a valid CoE code. A "Letter of Offer" is not sufficient for the visa stage.
                        </p>
                    </div>

                    <h2>Key Details on a CoE</h2>
                    <ul>
                        <li><strong>Provider Details:</strong> Verify the CRICOS code of your university.</li>
                        <li><strong>Course Dates:</strong> The precise start and end dates determine your visa validity.</li>
                        <li><strong>Fees Paid:</strong> Shows the total tuition fee for the course and the amount you have prepaid.</li>
                        <li><strong>English Test:</strong> Mentions which exam (IELTS/PTE) was used for admission.</li>
                    </ul>

                    <h2>Conditional vs Unconditional CoE</h2>
                    <p>
                        Typically, CoEs are unconditional. However, in "Package Offers" (e.g., English Course + Degree), you may receive two CoEs covering the entire duration. This allows you to get a single visa covering both courses.
                    </p>

                    <div className="not-prose mt-12">
                        <div className="bg-slate-900 dark:bg-slate-800 rounded-2xl p-8 border border-emerald-500/30 text-center">
                            <h3 className="text-2xl font-bold text-white mb-4">Got your CoE? Check your "GS" Eligibility</h3>
                            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                                After receiving CoE, the next hurdle is the Genuine Student (GS) assessment in the visa interview.
                            </p>
                            <Link
                                href="/australiagsprep"
                                className="inline-block bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-emerald-600 transition shadow-lg shadow-emerald-500/20"
                            >
                                Take Free GS Assessment
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
