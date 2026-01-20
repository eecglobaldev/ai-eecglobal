import React, { useState } from 'react';
import { ORGANIZATION, CERTIFICATIONS, TRUST_STATS } from '../data/seoData';
import Flag from 'react-flagkit';

const ThemeSwitcher: React.FC<{ theme: string; setTheme: (theme: 'light' | 'dark') => void }> = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const icons = {
    light: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
    dark: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="p-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 shadow-sm"
    >
      {icons[theme as keyof typeof icons]}
    </button>
  );
};

// Trust Badge Component
const TrustBadge: React.FC<{ cert: typeof CERTIFICATIONS[0] }> = ({ cert }) => (
  <a
    href={cert.url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-1.5 px-2 py-1 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-700/50 rounded-full text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:shadow-md transition-all duration-200 whitespace-nowrap"
    title={cert.fullName}
  >
    {cert.code ? (
      <Flag country={cert.code} size={14} className="rounded-sm shadow-sm" />
    ) : (
      <span className="text-sm">{cert.logo}</span>
    )}
    <span>{cert.name}</span>
    {cert.validTill && (
      <span className="text-emerald-500 dark:text-emerald-500 text-[10px]">✓</span>
    )}
  </a>
);

// Mobile Menu Component
const MobileMenu: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <nav
        className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-slate-900 shadow-xl overflow-y-auto"
        aria-label="Mobile navigation"
      >
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <span className="font-semibold text-slate-800 dark:text-slate-200">Menu</span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li>
                <a href={ORGANIZATION.urls.main} target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">
                  🏠 EEC Main Website
                </a>
              </li>
              <li>
                <a href={ORGANIZATION.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">
                  💬 WhatsApp Us
                </a>
              </li>
              <li>
                <a href={`mailto:${ORGANIZATION.contact.email}`} className="block px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">
                  📧 Email Us
                </a>
              </li>
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Our Certifications</h3>
            <div className="flex flex-wrap gap-2">
              {CERTIFICATIONS.slice(0, 6).map((cert, idx) => (
                <TrustBadge key={idx} cert={cert} />
              ))}
            </div>
          </div>

          {/* Trust Stats */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Why EEC?</h3>
            <div className="grid grid-cols-2 gap-2">
              {TRUST_STATS.slice(0, 4).map((stat, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{stat.value}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Follow Us</h3>
            <div className="flex gap-3">
              {Object.entries(ORGANIZATION.socialMedia).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
                  aria-label={`Follow us on ${platform}`}
                >
                  {platform === 'instagram' && '📸'}
                  {platform === 'facebook' && '👍'}
                  {platform === 'youtube' && '🎬'}
                  {platform === 'linkedin' && '💼'}
                  {platform === 'twitter' && '🐦'}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

const Header: React.FC<{ theme: string; setTheme: (theme: 'light' | 'dark') => void }> = ({ theme, setTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Banner - Certifications */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white py-1.5 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDBNIDAgMjAgTCA0MCAyMCBNIDIwIDAgTCAyMCA0MCBNIDAgMzAgTCA0MCAzMCBNIDMwIDAgTCAzMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50" />
        <div className="relative flex items-center justify-center gap-2 text-xs sm:text-sm font-medium">
          <span className="hidden sm:inline">🏆</span>
          <span className="truncate">
            <span className="hidden md:inline">Gujarat's Largest Study Abroad Company | </span>
            <strong>AIRC</strong> & <strong>ICEF</strong> Certified
            <span className="hidden lg:inline"> | Trusted Since 1997</span>
          </span>
          <a
            href={CERTIFICATIONS[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded-full text-xs transition-colors"
          >
            Verify
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      {/* Main Header */}
      <header
        className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg sticky top-0 z-40 shadow-sm border-b border-slate-200 dark:border-slate-800"
        role="banner"
      >
        <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex items-center justify-between flex-nowrap py-2 sm:py-0 sm:h-16">

            {/* Left section - Logo & Brand */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink min-w-0">
              <a
                href={ORGANIZATION.urls.main}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 sm:gap-3 hover:opacity-90 transition-opacity"
                aria-label="EEC Global - Visit main website"
              >
                <img
                  src="/assets/logos/eeclogo-main.webp"
                  alt="EEC Global Logo - Gujarat's Largest Study Abroad Company Since 1997"
                  className="h-7 sm:h-9 w-auto"
                  width="120"
                  height="36"
                  loading="eager"
                />
              </a>
              <div className="flex flex-col">
                <span className="text-sm sm:text-lg font-semibold text-slate-800 dark:text-slate-200 truncate leading-tight">
                  AI Course Counselor
                </span>
                <span className="hidden sm:block text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                  by EEC • Since 1997
                </span>
              </div>
            </div>

            {/* Center - Desktop Trust Badges */}
            <div className="hidden lg:flex items-center gap-2 flex-1 justify-center mx-4 overflow-x-auto scrollbar-hide">
              {CERTIFICATIONS.slice(0, 4).map((cert, idx) => (
                <TrustBadge key={idx} cert={cert} />
              ))}
            </div>

            {/* Right section - Actions */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Desktop Quick Links */}
              <div className="hidden md:flex items-center gap-2">
                <a
                  href={ORGANIZATION.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-sm font-medium hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"
                  aria-label="Contact us on WhatsApp"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>WhatsApp</span>
                </a>
                <a
                  href={ORGANIZATION.urls.main}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 rounded-full text-sm font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
                  aria-label="Visit EEC main website"
                >
                  <span>Visit EEC</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              {/* Theme Switcher */}
              <ThemeSwitcher theme={theme} setTheme={setTheme} />

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Open menu"
                aria-expanded={isMobileMenuOpen}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Secondary Nav - Mobile Trust Indicators */}
        <div className="lg:hidden border-t border-slate-100 dark:border-slate-800 py-1.5 px-3 overflow-x-auto">
          <div className="flex items-center gap-2 justify-center min-w-max">
            <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">Certifications:</span>
            {CERTIFICATIONS.slice(0, 3).map((cert, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap"
              >
                {cert.code ? (
                  <Flag country={cert.code} size={12} className="rounded-sm" />
                ) : (
                  <span>{cert.logo}</span>
                )}
                {cert.name}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};

export default Header;
