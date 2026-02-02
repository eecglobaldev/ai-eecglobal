'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Award, Users, Building2, CheckCircle2, ExternalLink } from 'lucide-react';
import {
  ORGANIZATION,
  CERTIFICATIONS,
  TRUST_STATS,
  ACHIEVEMENTS,
  KEY_PERSONS,
} from '@/features/career-counselor/data/seoData';
import Flag from 'react-flagkit';

export default function CareerCounselorAboutEecPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Link href="/careercounselor/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            AI Course Counselor
          </Link>
          <ArrowRight className="w-4 h-4" />
          <span className="text-slate-900 dark:text-white font-medium">About EEC</span>
        </nav>

        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-800 mb-6">
            <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-indigo-700 dark:text-indigo-300">
              Since 1997
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Gujarat&apos;s Largest & Oldest Study Abroad Company
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            {ORGANIZATION.description}
          </p>
        </header>

        <section className="mb-14">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Why EEC
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TRUST_STATS.map((stat, idx) => (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 p-4 text-center"
              >
                <div className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6">Certifications</h2>
          <div className="flex flex-wrap gap-3">
            {CERTIFICATIONS.slice(0, 8).map((cert, idx) => (
              <a
                key={idx}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors text-slate-700 dark:text-slate-300 text-sm"
              >
                {cert.code ? (
                  <Flag country={cert.code} size={16} className="rounded-sm" />
                ) : (
                  <span className="text-lg">{cert.logo}</span>
                )}
                <span>{cert.name}</span>
                {cert.validTill && (
                  <span className="text-emerald-600 dark:text-emerald-400 text-xs">✓ {cert.validTill}</span>
                )}
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Achievements
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {ACHIEVEMENTS.map((a, idx) => (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex gap-3"
              >
                <span className="text-2xl flex-shrink-0">{a.icon}</span>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">{a.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{a.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Leadership
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {KEY_PERSONS.map((person, idx) => (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 p-5 flex gap-4"
              >
                <Image
                  src={person.image}
                  alt={`${person.name} - ${person.shortTitle}`}
                  width={80}
                  height={80}
                  className="rounded-full object-cover w-16 h-16 sm:w-20 sm:h-20"
                />
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200">{person.name}</h3>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-2">{person.title}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {person.description}
                  </p>
                  {person.linkedin && (
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      LinkedIn
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 p-6">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Contact EEC
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            {ORGANIZATION.address.street}, {ORGANIZATION.address.city}, {ORGANIZATION.address.state}{' '}
            {ORGANIZATION.address.postalCode}, {ORGANIZATION.address.country}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={`mailto:${ORGANIZATION.contact.email}`}
              className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {ORGANIZATION.contact.email}
            </a>
            <a
              href={ORGANIZATION.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              WhatsApp
            </a>
          </div>
        </section>

        <div className="text-center">
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
