import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'What is DS-160? | Online Nonimmigrant Visa Application | EEC Glossary',
    description: 'DS-160 is the online for form US nonimmigrant visas. It collects your personal, travel, education, and security information. Submission generates the confirmation page needed for the interview.',
    keywords: ['DS-160', 'DS 160 form', 'US visa application form', 'DS-160 confirmation', 'fill DS-160'],
    alternates: {
        canonical: 'https://ai.eecglobal.com/glossary/ds-160',
    },
};

const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "DefinedTerm",
            "@id": "https://ai.eecglobal.com/glossary/ds-160#term",
            "name": "DS-160 Form",
            "alternateName": "Online Nonimmigrant Visa Application",
            "description": "A fully online form used by the US Department of State to collect information from individuals seeking a nonimmigrant visa (like F1, B1/B2) to travel to the United States temporarily.",
            "inDefinedTermSet": {
                "@type": "DefinedTermSet",
                "name": "EEC Study Abroad Glossary"
            }
        }
    ]
};

export default function DS160Page() {
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
                        <li className="text-slate-800 dark:text-slate-200 font-medium">DS-160</li>
                    </ol>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 py-12">
                <header className="mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
                        🇺🇸 USA Visa
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
                        What is the DS-160 Form?
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                        The <strong>DS-160 (Online Nonimmigrant Visa Application)</strong> is the primary document the Consular Officer will review before you even say "Hello." Your interview is essentially a verification of what you wrote here.
                    </p>
                </header>

                <section className="prose prose-slate dark:prose-invert max-w-none">
                    <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-6 rounded-r-xl my-8">
                        <h3 className="text-blue-900 dark:text-blue-100 font-bold text-lg m-0 mb-2">Consistency is Key</h3>
                        <p className="text-blue-800 dark:text-blue-200 m-0">
                            Contradicting your DS-160 answers during the interview is the fastest way to get a visa refusal. Be truthful and memorize exactly what you submitted.
                        </p>
                    </div>

                    <h2>Key Sections of DS-160</h2>
                    <ul>
                        <li><strong>Personal Info:</strong> Name, Passport details, Social media handles (last 5 years).</li>
                        <li><strong>Travel Info:</strong> Intended date of arrival, length of stay, address in US.</li>
                        <li><strong>US Contact:</strong> School official details (from I-20).</li>
                        <li><strong>Security Questions:</strong> Background checks (criminal history, medical conditions).</li>
                    </ul>

                    <h2>DS-160 Confirmation Page</h2>
                    <p>
                        After signing and submitting electronically, you generate a <strong>Confirmation Page</strong> with a barcode. You <strong>MUST</strong> print this and bring it to your interview. You do not need to print the entire application form, just the confirmation page.
                    </p>

                </section>
            </main>
        </>
    );
}
