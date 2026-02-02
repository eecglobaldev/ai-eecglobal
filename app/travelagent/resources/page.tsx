'use client';

import Link from 'next/link';
import { ArrowRight, MapPin, Phone, ExternalLink } from 'lucide-react';
import { BRANCHES } from '@/features/travel-agent/data/branches';
import { ORGANIZATION, SERVICES, COUNTRIES_SERVED } from '@/features/career-counselor/data/seoData';
import Flag from 'react-flagkit';

const cities = Array.from(new Set(BRANCHES.map((b) => b.address.addressLocality))).sort();

export default function TravelAgentResourcesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Link href="/travelagent/" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            Travel & Visa
          </Link>
          <ArrowRight className="w-4 h-4" />
          <span className="text-slate-900 dark:text-white font-medium">Resources</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Resources & Branch Locator
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
            EEC offers visa counseling, test prep, and admissions support across {ORGANIZATION.branchCount} branches in Gujarat.
          </p>
        </header>

        <section className="mb-14">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6">What we offer</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {SERVICES.map((svc, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4 sm:p-5"
              >
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">{svc.name}</h3>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                  {svc.items.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            Countries we serve
          </h2>
          <div className="flex flex-wrap gap-3">
            {COUNTRIES_SERVED.map((c, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm"
              >
                {c.code ? <Flag country={c.code} size={16} className="rounded-sm" /> : <span>{c.flag}</span>}
                {c.name}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6">Find a branch</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            EEC has {ORGANIZATION.branchCount} branches across {ORGANIZATION.cityCount} cities in Gujarat. Visit for visa counseling, test prep, and admissions.
          </p>
          <div className="space-y-8">
            {cities.map((city) => {
              const cityBranches = BRANCHES.filter((b) => b.address.addressLocality === city);
              return (
                <div key={city}>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">{city}</h3>
                  <div className="space-y-4">
                    {cityBranches.map((branch) => (
                      <div
                        key={branch.identifier}
                        className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4 sm:p-5"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-white">{branch.name}</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                              {branch.address.streetAddress}
                            </p>
                            {branch.contactPoint?.[0] && (
                              <a
                                href={`tel:${branch.contactPoint[0].telephone.replace(/\s/g, '')}`}
                                className="inline-flex items-center gap-1.5 text-sm text-violet-600 dark:text-violet-400 mt-2"
                              >
                                <Phone className="w-3.5 h-3.5" />
                                {branch.contactPoint[0].telephone}
                              </a>
                            )}
                          </div>
                          {branch.hasMap && (
                            <a
                              href={branch.hasMap}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium shrink-0"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Directions
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
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
