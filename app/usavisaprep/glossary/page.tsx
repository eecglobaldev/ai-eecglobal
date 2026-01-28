'use client';

import Link from 'next/link';
import Header from '@/features/usa-visa/components/Header';

// From MethodologySection.tsx id="glossary" — F-1 Visa Glossary (existing only)
const glossaryTerms = [
  {
    id: '214b',
    term: '214(b)',
    definition: 'A section of U.S. immigration law stating that all visa applicants are considered intending immigrants until they prove otherwise. This is the most common reason for F-1 visa refusal.',
  },
  {
    id: 'i20',
    term: 'I-20 Form',
    definition: 'The "Certificate of Eligibility for Nonimmigrant Student Status" issued by your university. It\'s a mandatory document for your interview.',
  },
  {
    id: 'sevis',
    term: 'SEVIS Fee',
    definition: 'A mandatory fee for the Student and Exchange Visitor Information System, a database that tracks international students in the U.S. Must be paid before the interview.',
  },
  {
    id: 'non-immigrant-intent',
    term: 'Non-Immigrant Intent',
    definition: 'The crucial requirement to prove you have strong ties (financial, family, professional) to your home country and intend to return after completing your studies.',
  },
];

export default function GlossaryPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'F-1 Visa Glossary',
    description: 'F-1 visa terms and definitions',
    hasDefinedTerm: glossaryTerms.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.term,
      description: t.definition,
      inDefinedTermSet: 'https://ai.eecglobal.com/usavisaprep/glossary',
    })),
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">F-1 Visa Glossary</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Key terms and definitions from the USA visa prep tool.
          </p>
        </header>
        <dl className="space-y-6">
          {glossaryTerms.map((t) => (
            <div
              key={t.id}
              id={t.id}
              className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6"
            >
              <dt className="font-semibold text-slate-800 dark:text-slate-200 text-lg mb-2">{t.term}</dt>
              <dd className="text-slate-600 dark:text-slate-400 leading-relaxed">{t.definition}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Related</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/usavisaprep/faq/"
              className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">FAQ</h3>
              <p className="text-slate-600 dark:text-slate-400">Common questions about the F-1 visa and EEC tool.</p>
            </Link>
            <Link
              href="/usavisaprep/preparation-guide/"
              className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Preparation Guide</h3>
              <p className="text-slate-600 dark:text-slate-400">Steps and tips for your F-1 interview.</p>
            </Link>
            <Link
              href="/usavisaprep/resources/"
              className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Resources</h3>
              <p className="text-slate-600 dark:text-slate-400">Document checklist and useful links.</p>
            </Link>
            <Link
              href="/usavisaprep/about-eec/"
              className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">About EEC</h3>
              <p className="text-slate-600 dark:text-slate-400">Experts, testimonials, and branches.</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
