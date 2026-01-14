import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'What is LOA? | Letter of Acceptance Canada | EEC Glossary',
    description: 'LOA (Letter of Acceptance) is the official admission letter from a Canadian Designated Learning Institution (DLI). Mandatory for Study Permit and SDS applications.',
    keywords: ['LOA Canada', 'Letter of Acceptance', 'Canadian study permit', 'DLI number', 'SDS requirements'],
    alternates: {
        canonical: 'https://ai.eecglobal.com/glossary/loa',
    },
};

const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "DefinedTerm",
            "@id": "https://ai.eecglobal.com/glossary/loa#term",
            "name": "Letter of Acceptance (LOA)",
            "description": "An official letter issued by a Designated Learning Institution (DLI) in Canada confirming that a student has been accepted into a program of study.",
            "inDefinedTermSet": {
                "@type": "DefinedTermSet",
                "name": "EEC Study Abroad Glossary"
            }
        }
    ]
};

export default function LOAPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <nav className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 py-3">
                <div className="max-w-4xl mx-auto px-4">
                    <ol className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <li><Link href="/" className="hover:text-red-600 dark:hover:text-red-400">Home</Link></li>
                        <li><span className="mx-2">›</span></li>
                        <li><Link href="/glossary" className="hover:text-red-600 dark:hover:text-red-400">Glossary</Link></li>
                        <li><span className="mx-2">›</span></li>
                        <li className="text-slate-800 dark:text-slate-200 font-medium">LOA</li>
                    </ol>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 py-12">
                <header className="mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs font-bold uppercase tracking-wider mb-4">
                        🇨🇦 Canada Study Permit
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
                        What is an LOA (Letter of Acceptance)?
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                        The <strong>Letter of Acceptance (LOA)</strong> is the foundational document for any Canadian study visa application. It must be issued by a <strong>Designated Learning Institution (DLI)</strong>.
                    </p>
                </header>

                <section className="prose prose-slate dark:prose-invert max-w-none">
                    <div className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-6 rounded-r-xl my-8">
                        <h3 className="text-red-900 dark:text-red-100 font-bold text-lg m-0 mb-2">LOA Verification</h3>
                        <p className="text-red-800 dark:text-red-200 m-0">
                            As of 2024, IRCC implemented a strict LOA verification system. DLIs must now verify every LOA directly with IRCC to prevent fraud. ensure your LOA is genuine by applying through authorized partners like EEC.
                        </p>
                    </div>

                    <h2>LOA Requirements Checklist</h2>
                    <p>A valid LOA must clearly state:</p>
                    <ul>
                        <li><strong>Student Information:</strong> Full name, date of birth, mailing address.</li>
                        <li><strong>Institution Details:</strong> Official name and DLI Number (starts with 'O').</li>
                        <li><strong>Program Details:</strong> Level of study, start date, estimated duration, and last date of registration.</li>
                        <li><strong>Financials:</strong> Estimated tuition fees for the first year.</li>
                        <li><strong>Conditions:</strong> Any prerequisites (e.g., completion of previous degree) needed for final admission.</li>
                    </ul>

                    <h2>Attestation Letter (PAL)</h2>
                    <p>
                        For many undergraduate programs, you now also need a <strong>Provincial Attestation Letter (PAL)</strong> alongside your LOA. This is part of the new cap on international students. Master's and PhD students are typically exempt from PAL.
                    </p>

                </section>
            </main>
        </>
    );
}
