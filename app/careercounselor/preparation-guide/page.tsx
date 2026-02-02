'use client';

import Link from 'next/link';
import { ArrowRight, Search, FileText, GraduationCap, MapPin, CheckCircle2 } from 'lucide-react';

const TOOL_STEPS = [
  { icon: Search, title: 'Enter your course', text: 'Type the course or program you\'re interested in (e.g. MS in Data Science, MBA, B.Tech).' },
  { icon: MapPin, title: 'Choose country', text: 'Select your target study destination: USA, UK, Canada, Australia, Germany, or others.' },
  { icon: FileText, title: 'Get insights', text: 'Our AI generates career prospects, salary ranges, top companies, university options, and visa guidance.' },
  { icon: GraduationCap, title: 'Refine and act', text: 'Use the insights to shortlist universities and connect with EEC counselors for admissions and visa support.' },
];

const STUDY_ABROAD_STEPS = [
  'Research courses and universities that match your goals.',
  'Check entry requirements (academic, English tests like IELTS/TOEFL).',
  'Prepare documents: transcripts, SOP, LORs, and proof of funds.',
  'Apply to universities and secure an offer (I-20, CAS, CoE, or offer letter).',
  'Apply for student visa with financial and identity documents.',
  'Book flights, accommodation, and attend pre-departure briefings.',
];

export default function CareerCounselorPreparationGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Link href="/careercounselor/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            AI Course Counselor
          </Link>
          <ArrowRight className="w-4 h-4" />
          <span className="text-slate-900 dark:text-white font-medium">Preparation Guide</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            How to Use the AI Course Counselor
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
            Get personalized career and study-abroad insights in four simple steps. Then follow the general study-abroad checklist.
          </p>
        </header>

        <section className="mb-14">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
            <Search className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Using the tool
          </h2>
          <ul className="space-y-6">
            {TOOL_STEPS.map((step, idx) => (
              <li
                key={idx}
                className="flex gap-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 p-4 sm:p-5"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <step.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    Step {idx + 1}: {step.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            General study-abroad checklist
          </h2>
          <ul className="space-y-3">
            {STUDY_ABROAD_STEPS.map((step, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-slate-700 dark:text-slate-300"
              >
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </section>

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
