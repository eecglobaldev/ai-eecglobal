'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, ChevronDown, ExternalLink } from 'lucide-react';
import Flag from 'react-flagkit';
import Link from 'next/link';
import Image from 'next/image';

interface NavLink {
    name: string;
    href: string;
    external?: boolean;
    country?: string;
}

const DESTINATIONS: NavLink[] = [
    { name: 'Study in USA', href: '/hub/study-in-usa', country: 'US' },
    { name: 'Study in UK', href: '/hub/study-in-uk', country: 'GB' },
    { name: 'Study in Canada', href: '/hub/study-in-canada', country: 'CA' },
    { name: 'Study in Australia', href: '/hub/study-in-australia', country: 'AU' },
    { name: 'Study in Germany', href: '/hub/study-in-germany', country: 'DE' },
    { name: 'Study in Ireland', href: '/hub/study-in-ireland', country: 'IE' },
    { name: 'Study in Finland', href: 'https://finland.eecglobal.com', external: true, country: 'FI' },
    { name: 'Study in New Zealand', href: 'https://courses.eecglobal.com', external: true, country: 'NZ' },
];

const AI_TOOLS: {
    interview: NavLink[];
    calculators: NavLink[];
    resources: NavLink[];
} = {
    interview: [
        { name: 'USA F-1 Visa Interview', href: '/usa-f1-visa', country: 'US' },
        { name: 'Australia GS Test Prep', href: '/australia-gs-prep', country: 'AU' },
        { name: 'UK CAS Interview Prep', href: '/uk-precas', country: 'GB' },
        { name: 'New Zealand Visa Prep', href: '/nz-visa', country: 'NZ' },
    ],
    calculators: [
        { name: 'German Grade Calculator', href: 'https://germany.eecglobal.com/public/', country: 'DE' },
        { name: 'Australia PR Calculator', href: 'https://ai.eecglobal.com/prpointscalculator', country: 'AU' },
        { name: 'Career Counselor AI', href: '/career-counselor' },
    ],
    resources: [
        { name: 'Course Search (85,000+)', href: 'https://courses.eecglobal.com', external: true },
        { name: 'Visa & Travel Agent', href: '/travel-agent' },
        { name: 'IELTS Bot (Telegram)', href: 'https://t.me/eecieltsbot', external: true },
    ],
};

const GUIDES_RESOURCES: {
    guides: NavLink[];
    glossary: NavLink[];
    news: NavLink[];
    trust: NavLink[];
} = {
    guides: [
        { name: 'Australia GS Test Guide 2026-2027', href: '/guides/australia-gs-guide', country: 'AU' },
        { name: 'German Grade Calculator Guide', href: '/guides/german-grade-guide', country: 'DE' },
        { name: 'Germany Blocked Account Guide', href: '/guides/germany-blocked-account-guide', country: 'DE' },
        { name: '214(b) Refusal Recovery', href: '/guides/214b-refusal-recovery', country: 'US' },
    ],
    glossary: [
        { name: 'F-1 Visa (USA)', href: '/glossary/f1-visa', country: 'US' },
        { name: 'Genuine Student Test', href: '/glossary/genuine-student-test', country: 'AU' },
        { name: 'Blocked Account (Germany)', href: '/glossary/blocked-account', country: 'DE' },
        { name: 'Full Glossary', href: '/glossary' },
    ],
    news: [
        { name: 'Ireland 2026 Employment Update', href: '/news/ireland-2026-employment-permit-update', country: 'IE' },
    ],
    trust: [
        { name: 'Meet CA Madhav Gupta', href: '/author/ca-madhav-gupta' },
        { name: 'Editorial Policy', href: '/editorial-policy' },
        { name: 'Sitemap', href: '/sitemap-page' },
    ],
};

const LOCATIONS_URL = 'https://eecglobal.com/locations';
const BRANCHES = {
    vadodara: [
        { name: 'EEC Alkapuri', href: LOCATIONS_URL },
        { name: 'EEC Nizampura', href: LOCATIONS_URL },
    ],
    surat: [
        { name: 'EEC Ghod Dod Road', href: LOCATIONS_URL },
        { name: 'EEC Vesu', href: LOCATIONS_URL },
    ],
    ahmedabad: [
        { name: 'EEC Memnagar', href: LOCATIONS_URL },
        { name: 'EEC Chandkheda', href: LOCATIONS_URL },
    ],
};

const GlobalNav: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        // SSR guard: window is only available in the browser
        if (typeof window === 'undefined') return;
        
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/20'
                    : 'bg-slate-900/80 backdrop-blur-md'
                    }`}
            >
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="relative h-8 sm:h-10 w-32 sm:w-40">
                                <Image
                                    src="/assets/logos/eeclogo-main.png"
                                    alt="Logo"
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div
                            className="hidden lg:flex items-center gap-1"
                            onMouseLeave={() => setActiveDropdown(null)}
                        >

                            {/* Destinations Dropdown */}
                            <div
                                className="relative"
                                onMouseEnter={() => setActiveDropdown('destinations')}
                            >
                                <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                                    Study Destinations
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                                {activeDropdown === 'destinations' && (
                                    <div className="absolute top-full left-0 pt-2 w-64">
                                        <div className="bg-slate-800 border border-white/10 rounded-xl shadow-2xl shadow-black/30 py-2 animate-fade-up">
                                            {DESTINATIONS.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                                                    target={item.external ? "_blank" : undefined}
                                                    rel={item.external ? "noopener noreferrer" : undefined}
                                                >
                                                    <span className="flex items-center gap-2">
                                                        {item.country && <Flag country={item.country} size={20} />}
                                                        {item.name}
                                                    </span>
                                                    {item.external && <ExternalLink className="w-3 h-3 opacity-50" />}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* AI Tools Dropdown - HIGHLIGHTED */}
                            <div
                                className="relative"
                                onMouseEnter={() => setActiveDropdown('tools')}
                            >
                                <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 hover:border-blue-400/50">
                                    <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase bg-emerald-500 text-white rounded mr-1">Free</span>
                                    AI Tools
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                                {activeDropdown === 'tools' && (
                                    <div className="absolute top-full left-0 pt-2 w-80">
                                        <div className="bg-slate-800 border border-white/10 rounded-xl shadow-2xl shadow-black/30 py-2 animate-fade-up">
                                            <div className="px-4 py-2 text-xs font-bold uppercase text-slate-500 tracking-wider">Visa Interview Prep</div>
                                            {AI_TOOLS.interview.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href as any}
                                                    className="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-blue-500/10 transition-colors"
                                                >
                                                    <span className="flex items-center gap-2">
                                                        {item.country && <Flag country={item.country} size={20} />}
                                                        {item.name}
                                                    </span>
                                                </Link>
                                            ))}
                                            <div className="h-px bg-white/10 my-2" />
                                            <div className="px-4 py-2 text-xs font-bold uppercase text-slate-500 tracking-wider">Calculators & Guides</div>
                                            {AI_TOOLS.calculators.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-blue-500/10 transition-colors"
                                                >
                                                    <span className="flex items-center gap-2">
                                                        {item.country && <Flag country={item.country} size={20} />}
                                                        {item.name}
                                                    </span>
                                                </a>
                                            ))}
                                            <div className="h-px bg-white/10 my-2" />
                                            <div className="px-4 py-2 text-xs font-bold uppercase text-slate-500 tracking-wider">Resources</div>
                                            {AI_TOOLS.resources.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-blue-500/10 transition-colors"
                                                    target={item.external ? "_blank" : undefined}
                                                    rel={item.external ? "noopener noreferrer" : undefined}
                                                >
                                                    <span className="flex items-center gap-2">
                                                        {item.country && <Flag country={item.country} size={20} />}
                                                        {item.name}
                                                    </span>
                                                    {item.external && <ExternalLink className="w-3 h-3 opacity-50" />}
                                                </a>
                                            ))}
                                            <div className="p-2 mt-1 border-t border-white/10">
                                                <Link
                                                    href="/"
                                                    className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all"
                                                >
                                                    View All AI Tools →
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Resources Dropdown - NEW */}
                            <div
                                className="relative"
                                onMouseEnter={() => setActiveDropdown('resources')}
                            >
                                <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                                    Guides & Resources
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                                {activeDropdown === 'resources' && (
                                    <div className="absolute top-full left-0 pt-2 w-80">
                                        <div className="bg-slate-800 border border-white/10 rounded-xl shadow-2xl shadow-black/30 py-2 animate-fade-up">
                                            <div className="px-4 py-2 text-xs font-bold uppercase text-slate-500 tracking-wider">Expert Guides</div>
                                            {GUIDES_RESOURCES.guides.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-emerald-500/10 transition-colors"
                                                >
                                                    <span className="flex items-center gap-2">
                                                        {item.country && <Flag country={item.country} size={20} />}
                                                        {item.name}
                                                    </span>
                                                </a>
                                            ))}
                                            <div className="h-px bg-white/10 my-2" />
                                            <div className="px-4 py-2 text-xs font-bold uppercase text-slate-500 tracking-wider">Visa Glossary</div>
                                            {GUIDES_RESOURCES.glossary.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-blue-500/10 transition-colors"
                                                >
                                                    <span className="flex items-center gap-2">
                                                        {item.country && <Flag country={item.country} size={20} />}
                                                        {item.name}
                                                    </span>
                                                </a>
                                            ))}
                                            <div className="h-px bg-white/10 my-2" />
                                            <div className="px-4 py-2 text-xs font-bold uppercase text-slate-500 tracking-wider">News & Updates</div>
                                            {GUIDES_RESOURCES.news.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-orange-500/10 transition-colors"
                                                >
                                                    <span className="flex items-center gap-2">
                                                        {item.country && <Flag country={item.country} size={20} />}
                                                        {item.name}
                                                    </span>
                                                </a>
                                            ))}
                                            <div className="h-px bg-white/10 my-2" />
                                            <div className="px-4 py-2 text-xs font-bold uppercase text-slate-500 tracking-wider">Trust & Transparency</div>
                                            {GUIDES_RESOURCES.trust.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                                                >
                                                    <span className="flex items-center gap-2">
                                                        {item.country && <Flag country={item.country} size={20} />}
                                                        {item.name}
                                                    </span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Branches Dropdown */}
                            <div
                                className="relative"
                                onMouseEnter={() => setActiveDropdown('branches')}
                            >
                                <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                                    Branches
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                                {activeDropdown === 'branches' && (
                                    <div className="absolute top-full left-0 pt-2 w-64">
                                        <div className="bg-slate-800 border border-white/10 rounded-xl shadow-2xl shadow-black/30 py-2 animate-fade-up">
                                            <div className="px-4 py-2 text-xs font-bold uppercase text-slate-500 tracking-wider">Vadodara</div>
                                            {BRANCHES.vadodara.map((item, index) => (
                                                <a
                                                    key={index}
                                                    href={item.href}
                                                    className="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                            <div className="px-4 py-2 text-xs font-bold uppercase text-slate-500 tracking-wider">Surat</div>
                                            {BRANCHES.surat.map((item, index) => (
                                                <a
                                                    key={index}
                                                    href={item.href}
                                                    className="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                            <div className="px-4 py-2 text-xs font-bold uppercase text-slate-500 tracking-wider">Ahmedabad</div>
                                            {BRANCHES.ahmedabad.map((item, index) => (
                                                <a
                                                    key={index}
                                                    href={item.href}
                                                    className="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                            <div className="p-2 mt-1 border-t border-white/10">
                                                <a
                                                    href="https://eecglobal.com/locations"
                                                    className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-all"
                                                >
                                                    View All 26 Branches →
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* About Link */}
                            <a
                                href="/about"
                                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                            >
                                About
                            </a>

                        </div>

                        {/* CTA Button */}
                        <div className="hidden lg:flex items-center gap-4">
                            <a
                                href="https://eecglobal.com/locations"
                                className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-blue-500/25"
                            >
                                Book Free Counseling
                            </a>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(true)}
                            aria-label="Open menu"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                    </div>
                </nav>
            </header>

            {/* Mobile Menu (simplified for migration, can be enhanced) */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-[60] bg-slate-900 lg:hidden overflow-y-auto">
                    <div className="flex flex-col min-h-full">
                        <div className="flex items-center justify-between p-4 border-b border-white/10">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="bg-blue-600 p-1.5 rounded-lg">
                                    <Sparkles className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-xl font-bold text-white">
                                    EEC<span className="text-blue-500">Global</span>
                                </span>
                            </Link>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-2 bg-slate-800 rounded-full text-white hover:bg-slate-700 transition-colors"
                                aria-label="Close menu"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-4 space-y-6">
                            {/* Simplified Mobile Links */}
                            <Link href="/" className="block p-3 bg-slate-800 rounded-lg text-white font-bold" onClick={() => setMobileMenuOpen(false)}>
                                Home
                            </Link>
                            {/* ... Add other mobile links as needed ... */}
                            <div className="p-4 border-t border-white/10 mt-8">
                                <a
                                    href="https://eecglobal.com/locations"
                                    className="flex items-center justify-center w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg shadow-lg"
                                >
                                    Book Free Counseling
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GlobalNav;
