import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { AUTH_MODAL_EVENT, AUTH_SUCCESS_EVENT, DASHBOARD_URL } from '../constants';

type Theme = 'light' | 'dark';

const SunIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>;
const MoonIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>;

const ThemeSwitcher: React.FC = () => {
    // Start with light theme for both SSR and initial client render to prevent hydration mismatch
    const [theme, setTheme] = useState<Theme>('light');
    const [mounted, setMounted] = useState(false);

    // Detect and apply the actual theme after mount (client-side only)
    useEffect(() => {
        setMounted(true);

        // Check localStorage first, then system preference
        const storedTheme = localStorage.getItem('f1-visa-theme');
        if (storedTheme === 'light' || storedTheme === 'dark') {
            setTheme(storedTheme);
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(prefersDark ? 'dark' : 'light');
        }
    }, []);

    // Apply theme to document
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
            localStorage.setItem('f1-visa-theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('f1-visa-theme', 'light');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    // Prevent flash by not showing icon until mounted
    if (!mounted) {
        return (
            <button
                className="p-2 rounded-full transition-colors text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200"
                aria-label="Theme toggle"
            >
                <div className="w-5 h-5" />
            </button>
        );
    }

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? MoonIcon : SunIcon}
        </button>
    );
};


const Header: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    // Check authentication status (both Firebase Auth and localStorage)
    useEffect(() => {
        const checkAuthStatus = () => {
            const authInstance = getAuth();
            const firebaseUser = authInstance.currentUser;
            const userEmail = localStorage.getItem('USAUserEmail');

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

        // Listen for custom auth success event
        const handleAuthSuccess = () => {
            // console.log('🔐 Auth success event received in Header');
            checkAuthStatus();
        };
        window.addEventListener('auth-success', handleAuthSuccess);

        return () => {
            unsubscribe();
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('auth-success', handleAuthSuccess);
        };
    }, []);

    // Trigger login modal
    const triggerAuthModal = useCallback((type: 'login' | 'signup' = 'login') => {
        window.dispatchEvent(new CustomEvent(AUTH_MODAL_EVENT, {
            detail: { type },
        }));
    }, []);

    // Redirect to dashboard
    const handleDashboardRedirect = useCallback(() => {
        const authInstance = getAuth();
        const user = authInstance.currentUser;
        if (user) {
            window.location.href = DASHBOARD_URL;
        } else {
            triggerAuthModal('login');
        }
    }, [triggerAuthModal]);

    return (
        <header id="header" className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-lg sticky top-0 z-40 shadow-sm border-b border-slate-200 dark:border-slate-800">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-3">
                        <img src="/assets/logos/eeclogo-main.png" alt="EEC" className="h-8" />
                        <span className="text-xl font-bold text-slate-800 dark:text-slate-200">USA F-1 Visa Prep</span>
                    </div>
                    <div className="flex items-center space-x-3 md:space-x-8">
                        {/* Mobile View Button */}
                        <div className="md:hidden">
                            {loggedIn ? (
                                <button
                                    onClick={handleDashboardRedirect}
                                    className="px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold shadow-sm hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-200"
                                >
                                    Dashboard
                                </button>
                            ) : (
                                <button
                                    onClick={() => triggerAuthModal('login')}
                                    className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
                                >
                                    Sign In
                                </button>
                            )}
                        </div>
                        <ThemeSwitcher />

                        {/* Desktop View - Dashboard/Sign In Button */}
                        <div className="hidden md:block">
                            {loggedIn ? (
                                <button
                                    onClick={handleDashboardRedirect}
                                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                                >
                                    Dashboard
                                </button>
                            ) : (
                                <button
                                    onClick={() => triggerAuthModal('login')}
                                    className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium transition-colors duration-200"
                                >
                                    Sign In
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
