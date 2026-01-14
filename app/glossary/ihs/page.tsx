import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'What is IHS? | Immigration Health Surcharge UK | EEC Glossary',
    description: 'IHS (Immigration Health Surcharge) is a mandatory fee paid by visa applicants to access the UK National Health Service (NHS). Learn about IHS costs for students and how to pay.',
    keywords: ['IHS UK', 'Immigration Health Surcharge', 'UK student visa fees', 'NHS access UK', 'IHS refund'],
    alternates: {
        canonical: 'https://ai.eecglobal.com/glossary/ihs',
    },
};

const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "DefinedTerm",
            "@id": "https://ai.eecglobal.com/glossary/ihs#term",
            "name": "Immigration Health Surcharge (IHS)",
            "description": "A fee collected by the UK Home Office from visa applicants (staying >6 months) which grants them access to the National Health Service (NHS) on the same basis as permanent UK residents.",
            "inDefinedTermSet": {
                "@type": "DefinedTermSet",
                "name": "EEC Study Abroad Glossary"
            }
        }
    ]
};

export default function IHSPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <nav className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 py-3">
                <div className="max-w-4xl mx-auto px-4">
                    <ol className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <li><Link href="/" className="hover:text-violet-600 dark:hover:text-violet-400">Home</Link></li>
                        <li><span className="mx-2">›</span></li>
                        <li><Link href="/glossary" className="hover:text-violet-600 dark:hover:text-violet-400">Glossary</Link></li>
                        <li><span className="mx-2">›</span></li>
                        <li className="text-slate-800 dark:text-slate-200 font-medium">IHS</li>
                    </ol>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 py-12">
                <header className="mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-xs font-bold uppercase tracking-wider mb-4">
                        🇬🇧 UK Student Visa
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
                        What is the Immigration Health Surcharge (IHS)?
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                        The <strong>Immigration Health Surcharge (IHS)</strong> is a fee you pay as part of your UK visa application. It entitles you to use the <strong>National Health Service (NHS)</strong> for free (mostly) during your stay in the UK.
                    </p>
                </header>

                <section className="prose prose-slate dark:prose-invert max-w-none">

                    <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 my-8">
                        <h3 className="text-slate-900 dark:text-white font-bold text-lg m-0 mb-4">💰 IHS Costs (2024-2026)</h3>
                        <ul className="m-0 p-0 list-none space-y-2">
                            <li className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                                <span>Student Visa</span>
                                <span className="font-bold">£776 per year</span>
                            </li>
                            <li className="flex items-center justify-between pt-2">
                                <span>Graduate Route Visa</span>
                                <span className="font-bold">£1,035 per year</span>
                            </li>
                        </ul>
                        <p className="text-xs text-slate-500 mt-4">Note: Fees are subject to government change. Always verify on gov.uk.</p>
                    </div>

                    <h2>What Does IHS Cover?</h2>
                    <ul>
                        <li>GP (General Practitioner) appointments.</li>
                        <li>Hospital treatments and A&E (Emergency) services.</li>
                        <li>Maternity care.</li>
                    </ul>
                    <p>
                        <strong>Not Covered:</strong> Prescriptions (eye/dental care typically paid separately) and assisted conception.
                    </p>

                    <h2>IHS Refund</h2>
                    <p>
                        If your visa application is <strong>refused</strong> or withdrawn, you will automatically receive a full refund of the Immigration Health Surcharge. However, the visa application fee itself is non-refundable.
                    </p>

                </section>
            </main>
        </>
    );
}
