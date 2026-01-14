import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'What is Form I-20? | SEVIS Eligibility USA | EEC Glossary',
    description: 'Form I-20 is the Certificate of Eligibility for Nonimmigrant Student Status. Issued by US universities, it is required to pay the SEVIS fee and schedule your F1 visa interview.',
    keywords: ['I-20 form', 'Form I-20 USA', 'SEVIS I-20', 'F1 visa document', 'I-20 amount'],
    alternates: {
        canonical: 'https://ai.eecglobal.com/glossary/i-20',
    },
};

const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "DefinedTerm",
            "@id": "https://ai.eecglobal.com/glossary/i-20#term",
            "name": "Form I-20",
            "alternateName": "Certificate of Eligibility for Nonimmigrant Student Status",
            "description": "A government document issued by SEVP-certified schools in the USA that certifies a student has been admitted to a full-time study program and has demonstrated sufficient financial resources.",
            "inDefinedTermSet": {
                "@type": "DefinedTermSet",
                "name": "EEC Study Abroad Glossary"
            }
        }
    ]
};

export default function I20Page() {
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
                        <li className="text-slate-800 dark:text-slate-200 font-medium">I-20</li>
                    </ol>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 py-12">
                <header className="mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
                        🇺🇸 USA Student Visa
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
                        What is Form I-20?
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                        The <strong>Form I-20 (Certificate of Eligibility)</strong> is the document that unlocks the US student visa process. You cannot pay your SEVIS fee or apply for a visa without it.
                    </p>
                </header>

                <section className="prose prose-slate dark:prose-invert max-w-none">
                    <h2>Why is the I-20 Important?</h2>
                    <ul>
                        <li><strong>SEVIS ID:</strong> Contains your unique SEVIS ID number (starts with N) at the top left.</li>
                        <li><strong>Financial Proof:</strong> It officially lists the "Total Estimated Cost for 1 Year" and funding sources. The Visa Officer will check if your bank statements match these figures.</li>
                        <li><strong>Program Dates:</strong> The "Program Start Date" on the I-20 is the earliest you can attend classes. You can enter the US up to 30 days before this date.</li>
                    </ul>

                    <h2>How to Get Your I-20</h2>
                    <ol>
                        <li>Get admitted to a US University.</li>
                        <li>Submit your financial documents (Bank Solvency Certificate) to the university.</li>
                        <li>The university verifies funds and issues the I-20 (usually digitally).</li>
                        <li>Print and sign the I-20 (in blue ink recommended) before your interview.</li>
                    </ol>

                    <div className="not-prose mt-12 bg-amber-50 dark:bg-amber-950/30 p-6 rounded-xl border border-amber-200 dark:border-amber-800">
                        <h3 className="text-amber-900 dark:text-amber-100 font-bold mb-2">⚠️ Matching Amounts is Critical</h3>
                        <p className="text-amber-800 dark:text-amber-200 text-sm">
                            If your I-20 states the cost is <strong>$45,000</strong>, your bank statements during the visa interview must show liquid funds <strong>at least</strong> equal to, but ideally 1.5x, this amount ensuring you aren't emptying your family's savings.
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
}
