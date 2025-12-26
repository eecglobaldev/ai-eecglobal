

import React, { useState, useEffect, useRef, useCallback } from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import { IMAGES } from '../constant';
import { AUTH_MODAL_EVENT } from '../services/constants';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';

// const EecLogo = '/services/EEC.svg';


// FIX: Corrected the malformed `viewBox` attribute. It was `viewBox="0 0 24" 24"` which is invalid SVG/JSX syntax.
const HamburgerIcon = () => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>;
const XIcon = () => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>;

interface HeaderProps {
    theme: string;
    setTheme: (theme: string) => void;
}

const DASHBOARD_URL = "https://ai.eecglobal.com/australiagsprep/dashboard/";

const Header: React.FC<HeaderProps> = ({ theme, setTheme }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const toggleButtonRef = useRef<HTMLButtonElement>(null);
    const [loggedIn, setLoggedIn] = useState(false);

    const navLinks = [
        { href: '#prep-tool-section', text: 'GS Prep Tool' },
        { href: '#knowledge-hub', text: 'Knowledge Hub' },
        { href: 'https://australia.eecglobal.com', text: 'Study in Australia' },
        { href: 'https://australia.eecglobal.com/prpointscalculator', text: 'PR Points' },
    ];

    // Check authentication status (both Firebase Auth and localStorage)
    useEffect(() => {
        const checkAuthStatus = () => {
            // SSR guard: localStorage is only available in the browser
            if (typeof window === 'undefined') {
                setLoggedIn(false);
                return;
            }

            const authInstance = auth; // Use the exported auth instance
            const firebaseUser = authInstance.currentUser;
            const userEmail = localStorage.getItem('AUgsUserEmail');

            // User must be authenticated in BOTH Firebase Auth AND localStorage
            setLoggedIn(!!(firebaseUser && userEmail));
        };

        // Check immediately
        checkAuthStatus();

        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, () => {
            checkAuthStatus();
        });

        // Also listen for localStorage changes (in case email is set/removed)
        const handleStorageChange = () => {
            checkAuthStatus();
        };
        window.addEventListener('storage', handleStorageChange);

        // Listen for custom auth success event (when user signs in)
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

    const triggerAuthModal = useCallback((type: 'login' | 'signup' = 'login') => {
        window.dispatchEvent(
            new CustomEvent(AUTH_MODAL_EVENT, {
                detail: { type },
            })
        );
    }, []);

    const handleDashboardRedirect = useCallback(() => {
        // SSR guard: localStorage is only available in the browser
        if (typeof window === 'undefined') {
            return;
        }

        // Check if user is authenticated (both Firebase Auth and localStorage)
        const authInstance = getAuth();
        const firebaseUser = authInstance.currentUser;
        const userEmail = localStorage.getItem('AUgsUserEmail');

        // User must be authenticated in BOTH Firebase Auth AND localStorage
        if (firebaseUser && userEmail) {
            window.location.href = DASHBOARD_URL;
        } else {
            triggerAuthModal('login');
        }
    }, [triggerAuthModal]);

    const handleLoginRedirect = useCallback(() => {
        triggerAuthModal('login');
    }, [triggerAuthModal]);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';

            const focusableElements = menuRef.current?.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled])'
            );
            const firstElement = focusableElements?.[0];
            const lastElement = focusableElements?.[focusableElements.length - 1];

            const handleTabKey = (e: KeyboardEvent) => {
                if (e.key !== 'Tab') return;

                if (e.shiftKey) { // Shift+Tab
                    if (document.activeElement === firstElement) {
                        lastElement?.focus();
                        e.preventDefault();
                    }
                } else { // Tab
                    if (document.activeElement === lastElement) {
                        firstElement?.focus();
                        e.preventDefault();
                    }
                }
            };

            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    setIsMenuOpen(false);
                }
            };

            document.addEventListener('keydown', handleTabKey);
            document.addEventListener('keydown', handleEscape);

            return () => {
                document.removeEventListener('keydown', handleTabKey);
                document.removeEventListener('keydown', handleEscape);
            };

        } else {
            document.body.style.overflow = '';
        }
    }, [isMenuOpen]);


    return (
        <header id="header" className="sticky top-0 z-40 w-full">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex flex-wrap items-center justify-between gap-y-3 mt-4 
     bg-white/50 dark:bg-slate-900/50 backdrop-blur-2xl rounded-2xl shadow-lg 
     border border-slate-200/80 dark:border-slate-700/50 px-3 py-3">

                    {/* Logo + Brand Text */}
                    <div className="flex items-center gap-3 min-w-0 flex-1 md:flex-none">

                        <img
                            src={IMAGES.eecLogo}
                            alt="Logo"
                            className="h-8 sm:h-10"
                        />

                        <div className="leading-tight min-w-0">
                            <span className="font-bold text-slate-800 dark:text-slate-200 block leading-tight truncate
                      text-[clamp(0.95rem,2vw,1.25rem)] md:text-[clamp(1rem,1.5vw,1.35rem)]">
                                Australia GS Prep
                            </span>

                            <p className="text-slate-500 dark:text-slate-400 truncate
                    text-[clamp(0.65rem,1.6vw,0.95rem)] md:text-[clamp(0.75rem,1.2vw,1rem)]">
                                AI-Powered Interview Practice
                            </p>
                        </div>

                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-3 md:order-3 flex-shrink-0">
                        <ThemeSwitcher theme={theme} setTheme={setTheme} />

                        <div className="hidden md:block">
                            {loggedIn ? (
                                <button
                                    onClick={handleDashboardRedirect}
                                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
                                >
                                    Dashboard
                                </button>
                            ) : (
                                <button
                                    onClick={handleLoginRedirect}
                                    className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                >
                                    Sign In
                                </button>
                            )}
                        </div>

                        <div className="md:hidden">
                            <button
                                ref={toggleButtonRef}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label="Toggle menu"
                                aria-expanded={isMenuOpen}
                                aria-controls="mobile-menu-container"
                                className="p-2 rounded-full text-slate-600 dark:text-slate-300 
                   hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            >
                                {isMenuOpen ? <XIcon /> : <HamburgerIcon />}
                            </button>
                        </div>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex md:order-2 md:flex-1 md:items-center md:justify-center">
                        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                            {navLinks.map((link, index) => (
                                <a
                                    key={`${link.text}-${index}`}
                                    href={link.href}
                                    className="text-sm font-medium text-slate-600 dark:text-slate-300 
                     hover:text-brand dark:hover:text-brand-light transition-colors"
                                    target={link.href.startsWith("http") ? "_blank" : undefined}
                                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                >
                                    {link.text}
                                </a>
                            ))}
                        </div>
                    </div>

                </nav>

                {isMenuOpen && (
                    <div className="fixed inset-0 z-50 md:hidden">
                        <div
                            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
                            onClick={() => setIsMenuOpen(false)}
                            aria-hidden="true"
                        />
                        <div
                            ref={menuRef}
                            id="mobile-menu-container"
                            className="relative ml-auto mr-4 mt-4 w-[90%] max-w-sm rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col gap-6"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img src={IMAGES.eecLogo} alt="Logo" className="h-8" />
                                    <span className="text-base font-semibold text-slate-800 dark:text-slate-200">Australia GS Prep</span>
                                </div>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    aria-label="Close menu"
                                    className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                                >
                                    <XIcon />
                                </button>
                            </div>

                            <div className="flex flex-col gap-4">
                                {navLinks.map((link, index) => (
                                    <a
                                        key={`mobile-${link.text}-${index}`}
                                        href={link.href}
                                        className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-3 text-base font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                        target={link.href.startsWith("http") ? "_blank" : undefined}
                                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    >
                                        {link.text}
                                    </a>
                                ))}

                                <button
                                    onClick={loggedIn ? handleDashboardRedirect : handleLoginRedirect}
                                    className={`rounded-xl px-4 py-3 text-base font-semibold transition-colors ${loggedIn
                                            ? "bg-blue-600 text-white hover:bg-blue-700"
                                            : "border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                                        }`}
                                >
                                    {loggedIn ? "Dashboard" : "Sign In"}
                                </button>
                            </div>

                            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Prefer desktop view?</p>
                                <button
                                    onClick={() => {
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full rounded-xl bg-brand text-white px-4 py-3 font-semibold hover:bg-brand/90 transition-colors"
                                >
                                    Go to top
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </header>
    );
};

export default Header;