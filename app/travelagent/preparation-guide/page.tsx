'use client';

import Link from 'next/link';
import { ArrowRight, Compass, FileCheck, Search, Plane, BookOpen } from 'lucide-react';

const STEPS = [
  {
    title: 'Choose your profile',
    description: 'Select your Indian state (for jurisdiction and local tips), destination country, and visa type: Student or Tourist.',
    icon: Search,
  },
  {
    title: 'Run a search',
    description: 'Click Search to get visa requirements, required documents, process steps, processing time, and cost. Use the chat assistant for follow-up questions.',
    icon: Compass,
  },
  {
    title: 'Gather documents',
    description: 'Use the document list and financial/photo/insurance requirements from the result. Prepare originals and copies as needed for your VAC or consulate.',
    icon: FileCheck,
  },
  {
    title: 'Apply and attend interview',
    description: 'Complete the official application (e.g. DS-160 for USA, online form for UK/Canada), pay fees, book biometrics at a VAC if required, and attend the visa interview when applicable.',
    icon: Plane,
  },
];

const VISA_TIPS = [
  'Student visas: Start 3–6 months before intake. You typically need admission, I-20/CAS/CoE/LOA, proof of funds, and English proficiency.',
  'Tourist visas: Apply at least 4–8 weeks before travel. Strong ties to India (job, property, family) and a clear travel plan help.',
  'Schengen: Apply to the country of main stay or first entry. Biometrics at VFS/BLS are mandatory for most applicants.',
  'EEC counselors can help with documentation and mock interviews at 26 branches across Gujarat.',
];

export default function TravelAgentPreparationGuidePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Link href="/travelagent/" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            Travel & Visa
          </Link>
          <ArrowRight className="w-4 h-4" />
          <span className="text-slate-900 dark:text-white font-medium">Preparation Guide</span>
        </nav>

        <header className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <Compass className="w-8 h-8 text-violet-600 dark:text-violet-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              How to Use the Tool & Visa Basics
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
            Steps to get visa requirements and a quick overview of student and tourist visa preparation.
          </p>
        </header>

        <section className="mb-14">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
            <Search className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            Using the EEC Travel & Visa tool
          </h2>
          <ol className="space-y-6">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <li
                  key={idx}
                  className="flex gap-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4 sm:p-5"
                >
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center text-violet-600 dark:text-violet-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                      {idx + 1}. {step.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="mb-14">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            Visa preparation tips
          </h2>
          <ul className="space-y-3">
            {VISA_TIPS.map((tip, idx) => (
              <li
                key={idx}
                className="flex gap-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-3"
              >
                <span className="text-violet-500 dark:text-violet-400 font-bold shrink-0">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </section>

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
