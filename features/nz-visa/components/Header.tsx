import React, { useCallback, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/features/shared/lib/firebase';
import { AUTH_MODAL_EVENT, DASHBOARD_URL } from '../constants';
import { FileText, HelpCircle, BookOpen, Award, Target } from 'lucide-react';

interface HeaderProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeSwitcher: React.FC<{ theme: string; setTheme: (theme: string) => void }> = ({
  theme,
  setTheme,
}) => {
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const icons: Record<string, React.ReactElement> = {
    light: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="p-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 shadow-sm"
    >
      {icons[theme] || icons.light}
    </button>
  );
};

export const Header: React.FC<HeaderProps> = ({ theme, setTheme }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(!!auth.currentUser);

  // Check authentication status (both Firebase Auth and localStorage)
  useEffect(() => {
    const checkAuthStatus = () => {
      const firebaseUser = auth.currentUser;
      const userEmail = localStorage.getItem('NZUserEmail');
      
      // User must be authenticated in BOTH Firebase Auth AND localStorage
      setLoggedIn(!!(firebaseUser && userEmail));
    };

    // Check immediately on mount
    checkAuthStatus();

    // Listen for Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, () => {
      checkAuthStatus();
    });

    // Listen for localStorage changes
    const handleStorageChange = () => {
      checkAuthStatus();
    };
    window.addEventListener('storage', handleStorageChange);

    // ⭐ Listen for custom auth success event
    const handleAuthSuccess = () => {
      console.log('🔐 Auth success event received in Header');
      checkAuthStatus();
    };
    window.addEventListener('auth-success', handleAuthSuccess);

    return () => {
      unsubscribe();
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-success', handleAuthSuccess);
    };
  }, []);

  const triggerAuthModal = useCallback((type: 'login' | 'signup' = 'login') => {
    window.dispatchEvent(
      new CustomEvent(AUTH_MODAL_EVENT, {
        detail: { type },
      })
    );
  }, []);

  const handleDashboardRedirect = useCallback(() => {
    if (auth.currentUser) {
      window.location.href = DASHBOARD_URL;
    } else {
      triggerAuthModal('login');
    }
  }, [triggerAuthModal]);

  const actionButton = (className: string) =>
    loggedIn ? (
      <button onClick={handleDashboardRedirect} className={className}>
        Dashboard
      </button>
    ) : (
      <button onClick={() => triggerAuthModal('login')} className={className}>
        Sign In
      </button>
    );

  return (
    <header className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-lg sticky top-0 z-40 shadow-sm border-b border-slate-200 dark:border-slate-800">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img src="/assets/logos/eeclogo-main.png" alt="EEC Logo" className="h-8" />
              <span className="text-lg font-bold text-slate-800 dark:text-slate-200 sm:text-xl">
                NZ Student Visa Prep
              </span>
            </div>
            <div className="flex items-center gap-2 sm:hidden">
              {/* Mobile Navigation Menu */}
              <div className="flex items-center gap-1">
                <a
                  href="/nzvisaprep/resources/"
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300"
                  title="Resources"
                >
                  <FileText className="w-4 h-4" />
                </a>
                <a
                  href="/nzvisaprep/about-eec/"
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300"
                  title="About EEC"
                >
                  <Award className="w-4 h-4" />
                </a>
                <a
                  href="/nzvisaprep/faq/"
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300"
                  title="FAQ"
                >
                  <HelpCircle className="w-4 h-4" />
                </a>
                <a
                  href="/nzvisaprep/glossary/"
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300"
                  title="Glossary"
                >
                  <BookOpen className="w-4 h-4" />
                </a>
                <a
                  href="/nzvisaprep/preparation-guide/"
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300"
                  title="Guide"
                >
                  <Target className="w-4 h-4" />
                </a>
              </div>
              {actionButton(
                'rounded-full bg-blue-600 text-white px-3 py-1.5 text-xs font-semibold shadow-sm'
              )}
              <ThemeSwitcher theme={theme} setTheme={setTheme} />
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            {/* Navigation Links - Desktop */}
            <div className="hidden lg:flex items-center gap-2">
              <a
                href="/nzvisaprep/resources/"
                className="group flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300"
              >
                <FileText className="w-4 h-4" />
                <span>Resources</span>
              </a>
              <a
                href="/nzvisaprep/about-eec/"
                className="group flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300"
              >
                <Award className="w-4 h-4" />
                <span>About EEC</span>
              </a>
              <a
                href="/nzvisaprep/faq/"
                className="group flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300"
              >
                <HelpCircle className="w-4 h-4" />
                <span>FAQ</span>
              </a>
              <a
                href="/nzvisaprep/glossary/"
                className="group flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300"
              >
                <BookOpen className="w-4 h-4" />
                <span>Glossary</span>
              </a>
              <a
                href="/nzvisaprep/preparation-guide/"
                className="group flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300"
              >
                <Target className="w-4 h-4" />
                <span>Guide</span>
              </a>
            </div>
            {actionButton('px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition')}
            <ThemeSwitcher theme={theme} setTheme={setTheme} />
          </div>
        </div>
      </nav>
    </header>
  );
};

