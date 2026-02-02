'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';

const GLOSSARY_TERMS = [
  { term: 'AIRC', definition: 'American International Recruitment Council. AIRC certification is the gold standard for ethical recruitment of international students to US universities. EEC is AIRC certified until 2031.' },
  { term: 'CAS', definition: 'Confirmation of Acceptance for Studies. A 14-character reference issued by UK universities after you meet their conditions. Required for the UK Student Route visa application. Valid for 6 months.' },
  { term: 'CoE', definition: 'Confirmation of Enrolment. An Australian document issued by your education provider after you accept an offer and pay the required deposit. Required for the Student Visa (Subclass 500) application.' },
  { term: 'DLI', definition: 'Designated Learning Institution. In Canada, only schools on the DLI list can host international students. You must have an acceptance letter from a DLI to apply for a study permit.' },
  { term: 'F-1 Visa', definition: 'US non-immigrant student visa. Allows you to study at a US institution. Duration of Status (D/S). Permits limited on-campus work and OPT/CPT. STEM OPT can extend work authorization up to 36 months total.' },
  { term: 'GTE', definition: 'Genuine Temporary Entrant. Australia\'s requirement that you genuinely intend to stay temporarily for study. Assessed via your statement, academic history, and circumstances. Replaced by Genuine Student (GS) criteria from March 2024 for some streams.' },
  { term: 'I-20', definition: 'US Certificate of Eligibility for Non-immigrant Student Status. Issued by your US university after admission. Lists program, dates, and cost of attendance. Required for F-1 visa application and SEVIS payment.' },
  { term: 'PGWP', definition: 'Post-Graduation Work Permit (Canada). Allows you to work in Canada after completing studies at a DLI. Duration matches your program length (up to 3 years). No job offer required. Work experience can help qualify for Express Entry.' },
  { term: 'SEVIS', definition: 'Student and Exchange Visitor Information System. US government system that tracks F and M visa students. You must pay the SEVIS fee and have a valid I-20 before your F-1 visa interview.' },
  { term: 'SOP', definition: 'Statement of Purpose. A written essay explaining your academic background, why you chose the course and country, career goals, and ties to home. Required by most universities and often reviewed by visa officers.' },
  { term: 'Graduate Route (UK)', definition: 'UK post-study work visa. Allows you to stay and work (or look for work) for 2 years after completing a degree (3 years for PhD). No job offer or salary threshold required.' },
  { term: 'SDS', definition: 'Student Direct Stream (Canada). Expedited study permit processing for legal residents of India and some other countries. Requires specific language scores, GIC, and upfront medical.' },
  { term: 'Blocked Account', definition: 'Sperrkonto in Germany. A mandatory account for student visa showing €11,208/year (approx). You can withdraw a fixed amount per month. Providers include Expatrio, Fintiba, Deutsche Bank.' },
  { term: 'OPT / CPT', definition: 'Optional Practical Training (OPT) and Curricular Practical Training (CPT). US F-1 work authorizations. CPT is for internships during study; OPT is typically used after graduation (up to 12 months, or 36 months for STEM).' },
];

export default function CareerCounselorGlossaryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Link href="/careercounselor/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            AI Course Counselor
          </Link>
          <ArrowRight className="w-4 h-4" />
          <span className="text-slate-900 dark:text-white font-medium">Glossary</span>
        </nav>

        <header className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Study Abroad Glossary
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
            Key terms you&apos;ll see when planning study abroad, visas, and admissions.
          </p>
        </header>

        <dl className="space-y-6">
          {GLOSSARY_TERMS.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 p-4 sm:p-5"
            >
              <dt className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                {item.term}
              </dt>
              <dd className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.definition}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 text-center">
          <Link
            href="/careercounselor/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
          >
            Back to AI Course Counselor
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
