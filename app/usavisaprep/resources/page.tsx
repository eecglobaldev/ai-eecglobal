'use client';

import Link from 'next/link';
import Header from '@/features/usa-visa/components/Header';

// From KnowledgeHub.tsx — Financial Documentation Checklist (existing only)
const financialChecklist = [
  "Sponsor's Bank Statements (6 months)",
  'Loan Approval Letter (if applicable)',
  "Sponsor's Income Tax Returns (3 years)",
  'Affidavit of Support (Form I-134)',
  'Proof of Assets (Property, FDs, etc.)',
  'Scholarship/Assistantship Letter',
];

// From GEOContent.tsx — Verified Certifications (existing only)
const certifications = [
  {
    name: 'AIRC (American International Recruitment Council)',
    status: 'Certified',
    validUntil: '2031',
    verifyUrl: 'https://airceducation.app.neoncrm.com/membership-directory/details/5?memberId=9367',
  },
  {
    name: 'U.S. News Global Education',
    status: 'Only in India',
    validUntil: 'Active',
    verifyUrl: 'https://www.credential.net/97326517-ea1a-4c00-8e76-dd3be34c91fe',
  },
  {
    name: 'ICEF IAS Accreditation',
    status: 'Accredited',
    validUntil: 'Active',
    verifyUrl: 'https://www.icef.com/agency/00120000014SG0aAAG',
  },
  {
    name: 'U.S. Consulate Mumbai Training',
    status: 'Invitee',
    validUntil: 'Completed',
    verifyUrl: null,
  },
];

// From GeoContentSection.tsx — Trust signals (existing only)
const trustSignals = [
  'Established 1997',
  '26 Branches in Gujarat',
  'AIRC Certified till 2031',
  'U.S. News Certified',
  '50,000+ Students Helped',
  '4.9/5 Rating',
];

// From SEOFooter.tsx — F-1 Visa Resources links (existing only). Use /usavisaprep for anchors.
const prepLinks = [
  { href: '/usavisaprep/#setup', label: 'Start Prep Plan' },
  { href: '/usavisaprep/#interview-flow', label: 'Practice Interview' },
  { href: '/usavisaprep/#visa-interview-prep', label: 'Interview Guide' },
  { href: '/usavisaprep/#214b-refusal', label: '214(b) Help' },
  { href: '/usavisaprep/#knowledge-hub', label: 'Knowledge Hub' },
  { href: '/usavisaprep/#branches', label: '26 Branches' },
];

const aboutLinks = [
  { href: '/usavisaprep/faq/', label: 'FAQs' },
  { href: '/usavisaprep/about-eec/', label: 'Our Experts' },
  { href: 'https://eecglobal.com/about-us/', label: 'About Us ↗', external: true },
  { href: '/usavisaprep/llms.txt', label: 'For AI/LLMs', external: true },
];

// From SEOFooter.tsx — Services and Locations (existing only)
const servicesCopy =
  'F-1 Visa Interview Preparation • 214(b) Refusal Recovery • IELTS Coaching • TOEFL Training • GRE Preparation • GMAT Classes • SAT Prep • USA University Admission • Study Abroad Counseling • Financial Documentation • Mock Interviews • DS-160 Help • I-20 Guidance';
const locationsCopy =
  'Vadodara • Ahmedabad • Surat • Anand • Nadiad • Bharuch • Vapi • Navsari • Mehsana • Kalol • Himatnagar • Visnagar';

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Resources</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Document checklist, certifications, and useful links for your F-1 visa preparation.
          </p>
        </header>

        <section id="visa-checklist" className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Financial Documentation Checklist
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            From the F-1 Visa Knowledge Hub. Ensure you have these before your interview.
          </p>
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
            Useful Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
                F-1 Visa Resources
              </h3>
              <ul className="space-y-2">
                {prepLinks.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">About EEC</h3>
              <ul className="space-y-2">
                {aboutLinks.map((link, i) => (
                  <li key={i}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Verified Certifications
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <thead className="bg-green-50 dark:bg-green-900/20">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-green-900 dark:text-green-300">
                    Certification
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-green-900 dark:text-green-300">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-green-900 dark:text-green-300">
                    Valid Until
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-green-900 dark:text-green-300">
                    Verification
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {certifications.map((c, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      {c.name}
                    </td>
                    <td className="px-6 py-4">{c.status}</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      {c.validUntil}
                    </td>
                    <td className="px-6 py-4">
                      {c.verifyUrl ? (
                        <a
                          href={c.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          Verify ↗
                        </a>
                      ) : (
                        <span className="text-slate-500 dark:text-slate-400">Official Records</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Trust & Impact
          </h2>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600 dark:text-slate-400">
            {trustSignals.map((s, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-12 text-sm text-slate-500 dark:text-slate-400">
          <p className="mb-2"><strong className="text-slate-700 dark:text-slate-300">Services:</strong> {servicesCopy}</p>
          <p><strong className="text-slate-700 dark:text-slate-300">Locations:</strong> {locationsCopy}</p>
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
              href="/usavisaprep/preparation-guide/"
              className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Preparation Guide</h3>
              <p className="text-slate-600 dark:text-slate-400">Steps and tips for your F-1 interview.</p>
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
