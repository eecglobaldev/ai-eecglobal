'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, GraduationCap, Plane, Wallet, MapPin } from 'lucide-react';
import { SERVICES, COUNTRIES_SERVED, ORGANIZATION } from '@/features/career-counselor/data/seoData';
import { BranchLocator } from '@/features/career-counselor/components/BranchLocator';
import Flag from 'react-flagkit';

export default function CareerCounselorResourcesPage() {
  const iconMap: Record<string, React.ElementType> = {
    'Test Preparation': BookOpen,
    'Admissions Guidance': GraduationCap,
    'Visa Services': Plane,
    'Financial Guidance': Wallet,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Link href="/careercounselor/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            AI Course Counselor
          </Link>
          <ArrowRight className="w-4 h-4" />
          <span className="text-slate-900 dark:text-white font-medium">Resources</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Resources & Services
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
            EEC offers test preparation, admissions, visa, and financial guidance across 26 branches in Gujarat.
          </p>
        </header>

        <section className="mb-14">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6">What we offer</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {SERVICES.map((svc, idx) => {
              const Icon = iconMap[svc.name] || BookOpen;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 p-4 sm:p-5"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200">{svc.name}</h3>
                  </div>
                  <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    {svc.items.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Countries we serve
          </h2>
          <div className="flex flex-wrap gap-3">
            {COUNTRIES_SERVED.map((c, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 text-sm"
              >
                {c.code ? <Flag country={c.code} size={16} className="rounded-sm" /> : <span>{c.flag}</span>}
                {c.name}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6">Find a branch</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            EEC has {ORGANIZATION.branchCount} branches across {ORGANIZATION.cityCount} cities in Gujarat. Visit us for test prep, admissions, and visa guidance.
          </p>
          <BranchLocator />
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
