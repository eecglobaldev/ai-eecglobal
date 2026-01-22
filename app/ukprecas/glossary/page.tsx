import { Metadata } from 'next';
import { Search, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import UkPrecasStructuredData from '@/features/uk-precas/components/UkPrecasStructuredData';

export const metadata: Metadata = {
    title: 'UK Pre-CAS Interview Glossary | Key Terms & Definitions',
    description: 'Comprehensive glossary of UK Pre-CAS interview terms, visa definitions, and study abroad terminology. Understand CAS, credibility assessment, and visa requirements.',
    keywords: [
        'UK Pre-CAS glossary',
        'UK visa terms',
        'CAS definition',
        'credibility interview terms',
        'UK student visa glossary',
        'Pre-CAS terminology',
        'study abroad terms',
        'UK visa definitions',
        'Tier 4 visa glossary',
        'UK immigration terms'
    ],
    authors: [{ name: 'EEC - Enbee Education Center' }],
    publisher: 'EEC - Enbee Education Center',
    robots: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
        googleBot: 'index, follow',
    },
    alternates: {
        canonical: 'https://ai.eecglobal.com/ukprecas/glossary/',
        languages: {
            'en-GB': 'https://ai.eecglobal.com/ukprecas/glossary/',
            'en-IN': 'https://ai.eecglobal.com/ukprecas/glossary/',
            'en-US': 'https://ai.eecglobal.com/ukprecas/glossary/',
            'x-default': 'https://ai.eecglobal.com/ukprecas/glossary/',
        },
    },
    openGraph: {
        type: 'website',
        url: 'https://ai.eecglobal.com/ukprecas/glossary/',
        title: 'UK Pre-CAS Interview Glossary | Key Terms & Definitions',
        description: 'Comprehensive glossary of UK Pre-CAS interview terms and visa definitions.',
        siteName: 'EEC',
        locale: 'en_GB',
        alternateLocale: ['en_US', 'en_IN'],
        images: [
            {
                url: 'https://ai.eecglobal.com/assets/eeclogo.svg',
                secureUrl: 'https://ai.eecglobal.com/assets/eeclogo.svg',
                type: 'image/svg+xml',
                width: 1200,
                height: 630,
                alt: 'EEC - UK Pre-CAS Glossary',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@eecglobal',
        creator: '@eecglobal',
        title: 'UK Pre-CAS Interview Glossary | Key Terms & Definitions',
        description: 'Comprehensive glossary of UK Pre-CAS interview terms and visa definitions.',
        images: ['https://ai.eecglobal.com/assets/eeclogo.svg'],
    },
    other: {
        'google-site-verification': 'rqiI0_ZlREHbdPNC1E_HUY_RMmHcYEiO6yL9HdZ1VfE',
        'msvalidate.01': '9A9B2AD82F89ED85E7EA6D30FAD943EC',
        'yandex-verification': '4c16d6e2b3107e7f',
        'indexnow-key': 'a76a6a94e6924e4eb33d0cf3ad7de3bc',
        'p:domain_verify': 'f322a851a0ee625a14f30abb8d526f73',
        'facebook-domain-verification': 'dch3wf3uiyuczeywymetwiixttq0e8',
        'norton-safeweb-site-verification': 'ZORUDVR8LPMT3RSOVOQVIP2DV87E5MW8SMBN-RJ80HOQVBOZRDYNN3A83OE0BVBQFIQHZ6VQVJM2KKFSMBB7FON9R59MNWCPAV7VRN5-DJWONIVMA6XO5FK-VVUDT7LC',
        'geo.region': 'IN-GJ',
        'geo.placename': 'Gujarat, India',
        'geo.position': '22.3072;73.1812',
        'ICBM': '22.3072, 73.1812',
        'language': 'English',
        'pinterest-rich-pin': 'true',
        'article:author': 'EEC - Enbee Education Center',
        'article:publisher': 'https://www.facebook.com/eecglobal',
        'article:section': 'Education',
        'article:tag': 'UK Visa, Pre-CAS Interview, Glossary, Study Abroad',
        'og:article:author': 'Amit Jalan',
        'og:article:published_time': '2024-06-15T00:00:00+05:30',
        'og:article:modified_time': '2026-01-16T00:00:00+05:30',
        'theme-color': '#4f46e5',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'black-translucent',
        'apple-mobile-web-app-title': 'UK Pre-CAS Prep',
        'application-name': 'UK Pre-CAS Interview Prep',
        'msapplication-TileColor': '#4f46e5',
        'msapplication-config': '/browserconfig.xml',
        'format-detection': 'telephone=no',
    },
    icons: {
        icon: [
            { url: 'https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg', type: 'image/svg+xml' },
            { url: '/favicon.ico', sizes: 'any' },
        ],
        apple: [
            { url: '/apple-touch-icon.png', sizes: '180x180' },
        ],
    },
    manifest: '/manifest.json',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'black-translucent',
        title: 'UK Pre-CAS Prep',
    },
    verification: {
        google: 'rqiI0_ZlREHbdPNC1E_HUY_RMmHcYEiO6yL9HdZ1VfE',
    },
};

const glossaryTerms = [
    {
        term: 'CAS',
        definition: 'Confirmation of Acceptance for Studies - A unique reference number issued by UK universities that allows you to apply for a student visa. Required for all Tier 4 visas.',
        category: 'Visa Process',
    },
    {
        term: 'Pre-CAS Interview',
        definition: 'A mandatory 15-30 minute video credibility assessment conducted by UK universities before CAS issuance. Evaluates genuine student intention, course knowledge, and financial capability.',
        category: 'Interview',
    },
    {
        term: 'Credibility Assessment',
        definition: 'The evaluation process during Pre-CAS interviews where universities assess whether you are a genuine student with clear study intentions and adequate financial means.',
        category: 'Interview',
    },
    {
        term: 'Tier 4 Visa',
        definition: 'The UK student visa category for international students. Requires a valid CAS and sufficient funds. Allows full-time study at licensed UK institutions.',
        category: 'Visa Types',
    },
    {
        term: 'Genuine Student',
        definition: 'A student who demonstrates clear academic intentions, adequate financial resources, and genuine interest in studying in the UK rather than using the visa for other purposes.',
        category: 'Requirements',
    },
    {
        term: 'Statement of Purpose',
        definition: 'A personal essay explaining your academic background, career goals, reasons for choosing the UK/university/course, and how the program fits your future plans.',
        category: 'Documents',
    },
    {
        term: 'IELTS/SELT',
        definition: 'Secure English Language Test - Required English proficiency tests for UK student visas. Must be taken at approved test centers. Minimum scores vary by course level.',
        category: 'Requirements',
    },
    {
        term: '28-Day Bank Statement',
        definition: 'Bank statements showing your financial history for the 28 days immediately before your visa application. Must show sufficient funds and regular income patterns.',
        category: 'Documents',
    },
    {
        term: 'Sponsor Letter',
        definition: 'A formal letter from your financial sponsor (usually a parent or guardian) explaining their relationship to you, their income, and commitment to support your studies.',
        category: 'Documents',
    },
    {
        term: 'Red Flags',
        definition: 'Warning signs during interviews that may indicate you are not a genuine student, such as inconsistent financial information, unclear study plans, or inability to discuss your course.',
        category: 'Interview',
    },
    {
        term: 'Graduate Route',
        definition: 'A 2-year post-study work visa available to international students who complete a UK degree. Allows you to work or look for work in the UK after graduation.',
        category: 'Post-Study',
    },
    {
        term: 'Maintenance Funds',
        definition: 'The minimum amount of money you must prove you have available for living expenses during your studies. Varies by location: £1,334/month for London, £1,023/month for outside London.',
        category: 'Financial',
    },
];

export default function UkPrecasGlossaryPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', ...new Set(glossaryTerms.map(term => term.category))];

    const filteredTerms = glossaryTerms.filter(term => {
        const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            term.definition.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <GoogleTagManager gtmId="GTM-TDBRW6C4" />
            <UkPrecasStructuredData />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                {/* Header */}
                <header className="bg-white/95 dark:bg-[#0d1117]/95 backdrop-blur-xl sticky top-0 z-40 border-b border-slate-200/80 dark:border-[#30363d]/80 shadow-sm">
                    <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center gap-3 group">
                                <div className="relative">
                                    <img src="/assets/logos/eeclogo-main.webp" alt="EEC" className="h-9 transition-transform duration-300 group-hover:scale-110" />
                                    <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <div className="font-bold text-slate-900 dark:text-gray-100">
                                    <span className="hidden md:inline text-xl tracking-tight">
                                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">UK Pre-CAS Prep</span>
                                        <span className="text-slate-400 font-normal"> by </span>
                                        <span className="text-slate-800 dark:text-white">EEC</span>
                                    </span>
                                    <span className="md:hidden text-lg tracking-tight">
                                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">UK Pre-CAS</span>
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <a
                                    href="/ukprecas/"
                                    className="group relative flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                    <HelpCircle className="w-4 h-4 relative transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                                    <span className="relative">Back to Tool</span>
                                </a>
                            </div>
                        </div>
                    </nav>
                </header>

                {/* Main Content */}
                <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border border-indigo-200/50 dark:border-indigo-700/50 mb-6 animate-fade-in">
                            <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-pulse" />
                            <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Glossary</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto animate-fade-in-up">
                            <span className="text-slate-900 dark:text-white">UK Pre-CAS Interview</span>
                            <br />
                            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">Glossary</span>
                        </h1>
                        <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            Understand key terms and definitions related to UK Pre-CAS interviews and student visas.
                        </p>
                    </div>

                    {/* Search and Filter */}
                    <div className="mb-8">
                        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search terms..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                                />
                            </div>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Glossary Terms */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                        {filteredTerms.map((term, index) => (
                            <div key={term.term} className="bg-white/90 dark:bg-[#161b22]/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-[#30363d] shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden" style={{ animationDelay: `${index * 50}ms` }}>
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{term.term}</h3>
                                        <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold rounded-full">
                                            {term.category}
                                        </span>
                                    </div>
                                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{term.definition}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredTerms.length === 0 && (
                        <div className="text-center py-16">
                            <HelpCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                            <p className="text-slate-600 dark:text-slate-400 text-lg">No terms found matching your search.</p>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedCategory('All');
                                }}
                                className="mt-4 text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}

                    {/* CTA Section */}
                    <div className="text-center mt-16">
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-3xl p-8 sm:p-12 border border-indigo-200/50 dark:border-indigo-700/50">
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                Still Have Questions?
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
                                Practice with our AI tool to get personalized answers and feedback for your specific situation.
                            </p>
                            <a
                                href="/ukprecas/"
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-1"
                            >
                                <HelpCircle className="w-5 h-5" />
                                Start Practicing Now
                            </a>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
