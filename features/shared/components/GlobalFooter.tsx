import React from 'react';
import { MapPin, ExternalLink, Shield } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const LOCATIONS_URL = 'https://eecglobal.com/locations';
const BRANCH_LINKS = {
    vadodara: [
        { name: 'Visa Consultant Alkapuri', href: LOCATIONS_URL },
        { name: 'Study Abroad Nizampura', href: LOCATIONS_URL },
        { name: 'IELTS Classes Manjalpur', href: LOCATIONS_URL },
        { name: 'Overseas Education New VIP Road', href: LOCATIONS_URL },
    ],
    surat: [
        { name: 'Visa Consultant Ghod Dod Road', href: LOCATIONS_URL },
        { name: 'Study Abroad Vesu', href: LOCATIONS_URL },
        { name: 'IELTS Classes Mota Varachha', href: LOCATIONS_URL },
        { name: 'Overseas Education Katargam', href: LOCATIONS_URL },
        { name: 'Study Abroad Parvat Patia', href: LOCATIONS_URL },
    ],
    ahmedabad: [
        { name: 'Visa Consultant Memnagar', href: LOCATIONS_URL },
        { name: 'Study Abroad Ghatlodiya', href: LOCATIONS_URL },
        { name: 'IELTS Classes Chandkheda', href: LOCATIONS_URL },
        { name: 'Overseas Education Maninagar', href: LOCATIONS_URL },
        { name: 'Study Abroad Nikol', href: LOCATIONS_URL },
        { name: 'Visa Consultant Odhav', href: LOCATIONS_URL },
        { name: 'IELTS Classes Bapunagar', href: LOCATIONS_URL },
        { name: 'Study Abroad Naroda', href: LOCATIONS_URL },
    ],
    other: [
        { name: 'Visa Consultant Nadiad', href: LOCATIONS_URL },
        { name: 'Study Abroad Anand (V.V. Nagar)', href: LOCATIONS_URL },
        { name: 'Overseas Education Vapi', href: LOCATIONS_URL },
        { name: 'IELTS Classes Navsari', href: LOCATIONS_URL },
        { name: 'Study Abroad Bharuch', href: LOCATIONS_URL },
        { name: 'Visa Consultant Kalol', href: LOCATIONS_URL },
        { name: 'Overseas Education Himatnagar', href: LOCATIONS_URL },
        { name: 'Study Abroad Mehsana', href: LOCATIONS_URL },
        { name: 'IELTS Classes Visnagar', href: LOCATIONS_URL },
    ],
};

const AI_TOOLS_LINKS = [
    { name: 'USA Visa Prep', href: '/usa-f1-visa' },
    { name: 'Australia GS Prep', href: '/australia-gs-prep' },
    { name: 'German Grade Calculator', href: 'https://germany.eecglobal.com/public/' },
    { name: 'PR Points Calculator', href: 'https://ai.eecglobal.com/prpointscalculator' },
    { name: 'Career Counselor', href: '/career-counselor' },
    { name: 'Course Search', href: 'https://courses.eecglobal.com' },
];

const COUNTRY_HUB_LINKS = [
    { name: 'Study in USA', href: '/hub/study-in-usa' },
    { name: 'Study in Canada', href: '/hub/study-in-canada' },
    { name: 'Study in UK', href: '/hub/study-in-uk' },
    { name: 'Study in Australia', href: '/hub/study-in-australia' },
    { name: 'Study in Germany', href: '/hub/study-in-germany' },
    { name: 'Study in Ireland', href: '/hub/study-in-ireland' },
];

const GUIDES_LINKS = [
    { name: 'Australia GS Guide 2026-2027', href: '/guides/australia-gs-guide' },
    { name: 'German Grade Guide', href: '/guides/german-grade-guide' },
    { name: 'Germany Blocked Account Guide', href: '/guides/germany-blocked-account-guide' },
    { name: '214(b) Refusal Recovery', href: '/guides/214b-refusal-recovery' },
];

const GLOSSARY_LINKS = [
    { name: 'F-1 Visa (USA)', href: '/glossary/f1-visa' },
    { name: 'Genuine Student Test', href: '/glossary/genuine-student-test' },
    { name: 'Blocked Account', href: '/glossary/blocked-account' },
    { name: 'Full Glossary', href: '/glossary' },
];

const TRUST_LINKS = [
    { name: 'Editorial Policy', href: '/editorial-policy' },
    { name: 'Meet Our Experts', href: '/author/ca-madhav-gupta' },
    { name: 'Sitemap', href: '/sitemap-page' },
    { name: 'About EEC', href: '/about' },
];

const SOCIAL_LINKS = [
    {
        name: 'Facebook',
        href: 'https://www.facebook.com/eecglobal',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        )
    },
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/eecglobal',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
        )
    },
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/school/eecindia',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        )
    },
    {
        name: 'YouTube',
        href: 'https://www.youtube.com/@eecgujarat',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
        )
    },
];

const GlobalFooter: React.FC = () => {
    return (
        <footer className="bg-[#0a0f1a] text-slate-400">

            {/* Main Footer Grid */}
            <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">

                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-flex items-center gap-2 mb-6">
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
                        <p className="text-sm font-semibold text-slate-300 mb-2">
                            28 Years of Consular Expertise, Digitized Into AI
                        </p>
                        <p className="text-sm leading-relaxed mb-6">
                            Gujarat's most trusted overseas education consultancy since 1997.
                            AIRC certified till 2031 • 26 branches • 100,000+ students guided.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold rounded">
                                <Shield className="w-3 h-3" />
                                AIRC Certified
                            </span>
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold rounded">
                                U.S. News Verified
                            </span>
                        </div>
                    </div>

                    {/* Vadodara Branches */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-blue-400" />
                            Vadodara
                        </h4>
                        <ul className="space-y-2.5">
                            {BRANCH_LINKS.vadodara.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Surat Branches */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-blue-400" />
                            Surat
                        </h4>
                        <ul className="space-y-2.5">
                            {BRANCH_LINKS.surat.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Ahmedabad Branches */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-blue-400" />
                            Ahmedabad
                        </h4>
                        <ul className="space-y-2.5">
                            {BRANCH_LINKS.ahmedabad.slice(0, 6).map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a
                                    href="https://eecglobal.com/locations"
                                    className="inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 font-medium"
                                >
                                    +2 more branches
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Other Cities */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-blue-400" />
                            Other Gujarat Cities
                        </h4>
                        <ul className="space-y-2.5">
                            {BRANCH_LINKS.other.slice(0, 6).map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a
                                    href="https://eecglobal.com/locations"
                                    className="inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 font-medium"
                                >
                                    View all 26 branches
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* Country Hubs & Guides Section */}
            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">

                        {/* Country Hubs */}
                        <div className="col-span-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
                                🌍 Study Abroad Guides
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                                {COUNTRY_HUB_LINKS.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Expert Guides */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
                                📚 Expert Guides
                            </h4>
                            <ul className="space-y-2">
                                {GUIDES_LINKS.map((link) => (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Glossary */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
                                📖 Visa Glossary
                            </h4>
                            <ul className="space-y-2">
                                {GLOSSARY_LINKS.map((link) => (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Trust & About */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
                                🛡️ Trust & About
                            </h4>
                            <ul className="space-y-2">
                                {TRUST_LINKS.map((link) => (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            className="text-sm text-slate-400 hover:text-white transition-colors"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* News */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
                                📰 Latest News
                            </h4>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="/news/ireland-2026-employment-permit-update"
                                        className="text-sm text-slate-400 hover:text-orange-400 transition-colors"
                                    >
                                        Ireland 2026 Employment Permit Update
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/compare/usa-vs-canada"
                                        className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                                    >
                                        USA vs Canada Comparison
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>

            {/* AI Tools Quick Links Bar */}
            <div className="border-t border-b border-slate-800 bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        <span className="text-sm font-semibold text-slate-300">Free AI Tools:</span>
                        {AI_TOOLS_LINKS.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()} Enbee Education Center Private Limited. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <a href="/llm.txt" className="text-sm text-slate-400 hover:text-white transition-colors">
                            LLM
                        </a>
                        <a href="https://eecglobal.com/privacy-policy" className="text-sm text-slate-400 hover:text-white transition-colors">
                            Privacy Policy
                        </a>
                        <a href="https://eecglobal.com/terms" className="text-sm text-slate-400 hover:text-white transition-colors">
                            Terms of Service
                        </a>
                        <a href="https://eecglobal.com/locations" className="text-sm text-slate-400 hover:text-white transition-colors">
                            Contact Us
                        </a>
                    </div>

                    <div className="flex items-center gap-3">
                        {SOCIAL_LINKS.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-9 h-9 bg-slate-800 rounded-full text-slate-400 hover:bg-blue-600 hover:text-white transition-all"
                                aria-label={social.name}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>

                </div>
            </div>

            {/* Semantic Keywords (Hidden but indexable) */}
            <div className="max-w-7xl mx-auto px-6 pb-8">
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-600">
                    <span>Overseas Education Consultants Vadodara</span>
                    <span>•</span>
                    <span>Study Abroad Agents Gujarat</span>
                    <span>•</span>
                    <span>AIRC Certified Agency India</span>
                    <span>•</span>
                    <span>Student Visa Compliance Experts</span>
                    <span>•</span>
                    <span>Best IELTS Coaching Gujarat</span>
                </div>
            </div>

        </footer>
    );
};

export default GlobalFooter;
