'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '/travelagent/', text: 'Start' },
  { href: '/travelagent/faq/', text: 'FAQ' },
  { href: '/travelagent/glossary/', text: 'Glossary' },
  { href: '/travelagent/preparation-guide/', text: 'Preparation Guide' },
  { href: '/travelagent/resources/', text: 'Resources' },
  { href: '/travelagent/about-eec/', text: 'About EEC' },
];

export default function TravelAgentHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Travel Agent navigation">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link href="/travelagent/" className="flex items-center gap-2 shrink-0">
            <img src="/assets/logos/eeclogo-main.png" alt="EEC" className="h-8 w-auto" />
            <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm sm:text-base">
              Travel & Visa by EEC
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {link.text}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-violet-900/20 hover:text-violet-600 dark:hover:text-violet-400"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
