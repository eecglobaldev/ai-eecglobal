'use client';

import Link from 'next/link';
import Header from '@/features/usa-visa/components/Header';

// From PillarContent.tsx — exact text (existing only)
const nonImmigrantIntent = {
  heading: 'Understanding "Non-Immigrant Intent" & Section 214(b)',
  paragraph:
    'Section 214(b) of U.S. immigration law presumes that every visa applicant intends to immigrate. To get an F-1 visa, you must overcome this presumption by proving you are a bona fide non-immigrant. This means you have strong, compelling ties to your home country and a clear plan to return after your studies. Our AI is specifically trained to help you demonstrate this.',
  strongTies: {
    heading: '✓ Strong Ties Include:',
    items: [
      'Family & Social Bonds: Immediate family, responsibilities at home.',
      'Economic Ties: Job offers, family businesses, property, investments.',
      'Future Career Plans: A specific, ambitious career path in India.',
    ],
  },
  weakTies: {
    heading: '✗ Weak Ties or Red Flags:',
    items: [
      'Vague post-graduation plans ("I\'ll see what happens").',
      'Having many close relatives already in the U.S.',
      'Choosing a course with no clear career path in India.',
    ],
  },
};

// From GeoContentSection.tsx TOPIC_SILOS (existing only)
const topicSilos = [
  {
    id: 'visa-interview-prep',
    title: 'F-1 Visa Interview Preparation',
    description: 'Comprehensive preparation for your US student visa interview at the consulate',
    subtopics: [
      { name: 'Common Visa Interview Questions', keywords: ['why USA', 'why this university', 'future plans', 'ties to India'] },
      { name: 'Non-Immigrant Intent Strategy', keywords: ['strong ties to India', 'return plans', 'career goals', 'family business'] },
      { name: 'Financial Documentation', keywords: ['bank statements', 'CA certificate', 'ITR', 'loan sanction letter'] },
      { name: 'DS-160 Form Guidance', keywords: ['online form', 'travel history', 'background check', 'photo requirements'] },
    ],
  },
  {
    id: '214b-refusal',
    title: '214(b) Visa Refusal Recovery',
    description: 'Expert guidance for students who have faced visa denial under Section 214(b)',
    subtopics: [
      { name: 'Understanding 214(b)', keywords: ['visa denial', 'refusal reasons', 'non-immigrant intent', 'presumption of immigrant intent'] },
      { name: 'Financial Restructuring', keywords: ['CA Madhav Gupta', 'proof of funds', 'sponsor documentation', 'loan restructuring'] },
      { name: 'Interview Strategy Revision', keywords: ['stronger ties', 'career plan clarity', 'university justification', 'return intent'] },
      { name: 'Reapplication Timeline', keywords: ['waiting period', 'documentation updates', 'profile improvement', 'second interview'] },
    ],
  },
  {
    id: 'university-selection',
    title: 'US University Selection & Applications',
    description: 'Strategic university selection based on your profile, budget, and career goals',
    subtopics: [
      { name: 'University Shortlisting', keywords: ['rankings', 'program fit', 'location', 'cost of living'] },
      { name: 'Application Strategy', keywords: ['SOP writing', 'LOR guidance', 'transcript evaluation', 'application deadlines'] },
      { name: 'I-20 Processing', keywords: ['SEVIS fee', 'I-20 receipt', 'university communication', 'documentation'] },
      { name: 'Scholarship Opportunities', keywords: ['merit scholarships', 'assistantships', 'financial aid', 'funding options'] },
    ],
  },
  {
    id: 'financial-planning',
    title: 'F-1 Financial Planning & Documentation',
    description: 'Complete financial documentation support for F-1 visa approval',
    subtopics: [
      { name: 'Proof of Funds', keywords: ['bank statements', '6 months', 'sponsor letter', 'affidavit of support'] },
      { name: 'Income Tax Returns', keywords: ['ITR 3 years', 'CA certificate', 'income proof', 'business income'] },
      { name: 'Loan Documentation', keywords: ['education loan', 'sanction letter', 'disbursement schedule', 'co-signer'] },
      { name: 'Asset Documentation', keywords: ['property valuation', 'FD certificates', 'mutual funds', 'business assets'] },
    ],
  },
];

// From KnowledgeHub.tsx (existing only)
const interviewTrends =
  'Based on our latest data from November 2025, consular officers are intensely focusing on your specific reasons for choosing a particular university and course. Vague answers are a major red flag. They are also probing deeper into financial plans beyond the first year. Our AI is tuned to grill you on these exact points, ensuring you\'re prepared for the questions that matter most right now.';
const stateSpotlight = [
  'California: Be prepared to discuss high living costs and your specific budget.',
  'Texas: Emphasize how your degree connects to the booming tech and energy sectors in India.',
  'New York: Justify choosing a university in a competitive, high-density environment.',
];
const financialChecklist = [
  "Sponsor's Bank Statements (6 months)",
  'Loan Approval Letter (if applicable)',
  "Sponsor's Income Tax Returns (3 years)",
  'Affidavit of Support (Form I-134)',
  'Proof of Assets (Property, FDs, etc.)',
  'Scholarship/Assistantship Letter',
];

// From MethodologySection.tsx (existing only)
const methodologyText =
  'Our platform is powered by a proprietary system trained on a massive dataset of over 10,000 anonymized mock interviews and quarterly consular trend reports. This allows us to predict questions with high accuracy.';
const niisText =
  'At its core is our Non-Immigrant Intent Scoring (NIIS v3.0), an algorithm that analyzes your answers for key markers of "strong ties" to your home country.';
const stats = { confidence: '92%', weakPoints: '5+' };

// From PillarContent.tsx comparison table (existing only)
const comparisonRows = [
  ['Personalized Questions', '✓ Hyper-Personalized', 'General Advice', 'Generic Only'],
  ['Instant Feedback', '✓ 24/7', '✗ Delayed', '✗ None'],
  ['Practice Sessions', 'Unlimited', '1-2 Mock Interviews', 'Self-directed'],
  ['Handles Complex Cases', '✓ Specialized Logic', 'Varies by Agent', '✗ No Guidance'],
  ['Cost-Effectiveness', 'High', 'Low', 'High (but ineffective)'],
];

export default function PreparationGuidePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Your Authoritative Guide to F-1 Visa Success
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Master the interview with expert knowledge, AI-driven insights, and proven strategies.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            {nonImmigrantIntent.heading}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">{nonImmigrantIntent.paragraph}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-500/30">
              <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                {nonImmigrantIntent.strongTies.heading}
              </h3>
              <ul className="list-disc list-inside text-green-700 dark:text-green-400 space-y-1">
                {nonImmigrantIntent.strongTies.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-500/30">
              <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">
                {nonImmigrantIntent.weakTies.heading}
              </h3>
              <ul className="list-disc list-inside text-red-700 dark:text-red-400 space-y-1">
                {nonImmigrantIntent.weakTies.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Decoding 2025-26 Interview Trends
          </h2>
          <p className="text-slate-600 dark:text-slate-400">{interviewTrends}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Spotlight: Top US States
          </h2>
          <ul className="text-slate-600 dark:text-slate-400 space-y-2">
            {stateSpotlight.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Financial Documentation Checklist
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 dark:text-slate-400">
            {financialChecklist.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-indigo-500 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            F-1 Visa Process Silos
          </h2>
          <div className="space-y-6">
            {topicSilos.map((silo) => (
              <div
                key={silo.id}
                id={silo.id}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
              >
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {silo.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">{silo.description}</p>
                <ul className="space-y-2 text-sm">
                  {silo.subtopics.map((st, i) => (
                    <li key={i} className="text-slate-600 dark:text-slate-400">
                      <strong className="text-slate-800 dark:text-slate-200">{st.name}</strong> —{' '}
                      {st.keywords.join(', ')}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Our AI&apos;s &apos;Secret Sauce&apos;
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">{methodologyText}</p>
          <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">{niisText}</p>
          <div className="flex flex-wrap gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">{stats.confidence}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">User Confidence Boost</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">{stats.weakPoints}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Profile-Specific Weak Points Identified on Average
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            Preparation Methods Compared
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th className="p-4 font-semibold">Feature</th>
                  <th className="p-4 font-semibold text-center text-white bg-indigo-600 dark:bg-indigo-500">
                    AI Prep Tool (This App)
                  </th>
                  <th className="p-4 font-semibold text-center">Traditional Agent</th>
                  <th className="p-4 font-semibold text-center">Self-Study (Online Lists)</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800/50">
                {comparisonRows.map((row, i) => (
                  <tr
                    key={i}
                    className={
                      i < comparisonRows.length - 1
                        ? 'border-b border-slate-200 dark:border-slate-700'
                        : ''
                    }
                  >
                    <td className="p-3 font-medium">{row[0]}</td>
                    <td className="p-3 text-center text-green-600 dark:text-green-400 font-bold">
                      {row[1]}
                    </td>
                    <td className="p-3 text-center">{row[2]}</td>
                    <td className="p-3 text-center">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

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
              href="/usavisaprep/glossary/"
              className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Glossary</h3>
              <p className="text-slate-600 dark:text-slate-400">F-1 visa terms and definitions.</p>
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
