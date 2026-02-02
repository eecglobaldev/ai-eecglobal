'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';

const GLOSSARY_TERMS = [
  { term: 'SOP (Statement of Purpose)', definition: 'A critical essay stating your purpose of study, required for student visas in UK, Canada, and Australia. It explains your academic background, why you chose the course and country, and career goals.' },
  { term: 'CAS Letter', definition: 'Confirmation of Acceptance for Studies. A mandatory electronic document from UK universities for the UK Student Route visa. It is a 14-character reference valid for 6 months.' },
  { term: 'I-20 Form', definition: 'Certificate of Eligibility for Nonimmigrant Student Status, issued by US universities after admission. Required for F-1 visa application and SEVIS payment. Lists program, dates, and cost of attendance.' },
  { term: 'GIC (Guaranteed Investment Certificate)', definition: 'A mandatory investment of CAD 10,000+ for Indian students applying to Canada under the SDS (Student Direct Stream). It proves financial capacity for living expenses.' },
  { term: 'Schengen Area', definition: 'A zone of 27 European countries with no internal border controls. A single short-stay visa can allow travel across all member states (e.g. France, Germany, Italy) within the validity period.' },
  { term: 'Biometrics', definition: 'Fingerprinting and digital photograph taken at Visa Application Centres (VACs) such as VFS Global or BLS. Required for UK, Canada, Schengen, and many other visa applications from India.' },
  { term: 'VAC (Visa Application Centre)', definition: 'A centre where you submit documents and give biometrics. VFS Global and BLS are common VACs in India for UK, Canada, Schengen, and other countries.' },
  { term: 'CoE (Confirmation of Enrolment)', definition: 'Australian document issued by your education provider after you accept an offer and pay the deposit. Required for the Student Visa (Subclass 500) application.' },
  { term: 'GTE / Genuine Student', definition: 'Australia’s requirement that you genuinely intend to stay temporarily for study. Assessed via your statement, academic history, and circumstances. From March 2024, Genuine Student (GS) criteria apply for many streams.' },
  { term: 'SEVIS', definition: 'Student and Exchange Visitor Information System. US system that tracks F and M visa students. You must pay the SEVIS fee and have a valid I-20 before your F-1 visa interview.' },
  { term: 'DS-160', definition: 'Online non-immigrant visa application form for the USA. You must complete it before booking your B1/B2 or F-1 visa interview. You receive a confirmation number and barcode.' },
  { term: 'Blocked Account (Sperrkonto)', definition: 'Mandatory for German student visa. You deposit a fixed amount (e.g. €11,208 per year) and can withdraw a set amount per month. Providers include Expatrio, Fintiba, Deutsche Bank.' },
];

export default function TravelAgentGlossaryPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Link href="/travelagent/" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            Travel & Visa
          </Link>
          <ArrowRight className="w-4 h-4" />
          <span className="text-slate-900 dark:text-white font-medium">Glossary</span>
        </nav>

        <header className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-8 h-8 text-violet-600 dark:text-violet-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Visa & Travel Glossary
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
            Key terms you&apos;ll see for student visas, tourist visas, and travel documentation.
          </p>
        </header>

        <dl className="space-y-6">
          {GLOSSARY_TERMS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4 sm:p-5"
            >
              <dt className="text-lg font-semibold text-violet-600 dark:text-violet-400 mb-2">
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
            href="/travelagent/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors"
          >
            Back to Travel & Visa
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
