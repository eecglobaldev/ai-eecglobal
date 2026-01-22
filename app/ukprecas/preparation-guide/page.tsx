import { Metadata } from 'next';
import { BookOpen, Target, MessageSquare, CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';
import GoogleTagManager from '@/components/GoogleTagManager';
import UkPrecasStructuredData from '@/features/uk-precas/components/UkPrecasStructuredData';

export const metadata: Metadata = {
    title: 'UK Pre-CAS Interview Preparation Guide | Complete Step-by-Step',
    description: 'Master your UK Pre-CAS credibility interview with our comprehensive preparation guide. Learn about the process, common questions, red flags, and expert tips for visa success.',
    keywords: [
        'UK Pre-CAS preparation guide',
        'UK credibility interview tips',
        'Pre-CAS interview questions',
        'UK student visa interview guide',
        'CAS credibility assessment',
        'UK visa interview preparation',
        'Pre-CAS red flags',
        'UK student visa tips',
        'credibility interview guide',
        'UK visa success tips'
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
        canonical: 'https://ai.eecglobal.com/ukprecas/preparation-guide/',
        languages: {
            'en-GB': 'https://ai.eecglobal.com/ukprecas/preparation-guide/',
            'en-IN': 'https://ai.eecglobal.com/ukprecas/preparation-guide/',
            'en-US': 'https://ai.eecglobal.com/ukprecas/preparation-guide/',
            'x-default': 'https://ai.eecglobal.com/ukprecas/preparation-guide/',
        },
    },
    openGraph: {
        type: 'website',
        url: 'https://ai.eecglobal.com/ukprecas/preparation-guide/',
        title: 'UK Pre-CAS Interview Preparation Guide | Complete Step-by-Step',
        description: 'Master your UK Pre-CAS credibility interview with our comprehensive preparation guide.',
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
                alt: 'EEC - UK Pre-CAS Preparation Guide',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@eecglobal',
        creator: '@eecglobal',
        title: 'UK Pre-CAS Interview Preparation Guide | Complete Step-by-Step',
        description: 'Master your UK Pre-CAS credibility interview with our comprehensive preparation guide.',
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
        'article:tag': 'UK Visa, Pre-CAS Interview, Preparation Guide, Study Abroad',
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

const preparationSteps = [
    {
        step: 1,
        title: 'Understand the Pre-CAS Interview Process',
        content: 'A UK Pre-CAS interview is a mandatory 15-30 minute video credibility assessment by UK universities before CAS (Confirmation of Acceptance for Studies) issuance. It evaluates genuine student intention, course knowledge, financial capability, and career plans. Introduced in 2024, it replaces the old CAS process and is required for all Tier 4 student visas.',
        icon: <BookOpen className="w-6 h-6" />,
    },
    {
        step: 2,
        title: 'Prepare Your Documents',
        content: 'Gather all required documents: university offer letter, IELTS/SELT scores, academic transcripts, 28-day bank statements, passport, Statement of Purpose (SOP), sponsor letter (if applicable), and TB test certificate. Additional documents may be required based on your specific circumstances.',
        icon: <CheckCircle className="w-6 h-6" />,
    },
    {
        step: 3,
        title: 'Know Common Questions',
        content: 'Common questions include: Why did you choose this university/course? How will you fund your studies? What are your career plans after graduation? Tell us about your academic background. Why do you want to study in the UK? Be prepared to discuss your Statement of Purpose in detail.',
        icon: <MessageSquare className="w-6 h-6" />,
    },
    {
        step: 4,
        title: 'Avoid Red Flags',
        content: 'Red flags include: Inconsistent financial information, unclear study plans, gaps in education/work without explanation, inability to discuss your course content, and lack of genuine intent to study. Always be honest and provide supporting documentation for any concerns.',
        icon: <AlertTriangle className="w-6 h-6" />,
    },
    {
        step: 5,
        title: 'Practice with AI Tool',
        content: 'Use our free AI-powered tool to practice unlimited mock interviews, get personalized feedback, and track your progress. The AI analyzes your answers and provides detailed scoring and improvement suggestions.',
        icon: <Target className="w-6 h-6" />,
    },
];

const tips = [
    'Practice with our AI tool regularly to build confidence.',
    'Review your Statement of Purpose thoroughly before the interview.',
    'Prepare financial documents in advance and be ready to explain funding sources.',
    'Research your university and course to demonstrate genuine interest.',
    'Practice speaking clearly and confidently in English.',
    'Be honest about any gaps in education or work experience.',
    'Have supporting documents ready to reference during the interview.',
];

export default function UkPrecasPreparationGuidePage() {
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
                                    <BookOpen className="w-4 h-4 relative transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
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
                            <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-pulse" />
                            <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Preparation Guide</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto animate-fade-in-up">
                            <span className="text-slate-900 dark:text-white">UK Pre-CAS Interview</span>
                            <br />
                            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">Preparation Guide</span>
                        </h1>
                        <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            Master your UK Pre-CAS credibility interview with our comprehensive step-by-step guide and expert tips.
                        </p>
                    </div>

                    {/* Preparation Steps */}
                    <div className="mb-16">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">5-Step Preparation Process</h2>
                        <div className="space-y-8">
                            {preparationSteps.map((step, index) => (
                                <div key={step.step} className="bg-white/90 dark:bg-[#161b22]/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-[#30363d] shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden" style={{ animationDelay: `${index * 100}ms` }}>
                                    <div className="p-6 sm:p-8">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/30">
                                                {step.step}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                                                        {step.icon}
                                                    </div>
                                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{step.title}</h3>
                                                </div>
                                                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{step.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Expert Tips */}
                    <div className="mb-16">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">Expert Tips for Success</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {tips.map((tip, index) => (
                                <div key={index} className="bg-white/90 dark:bg-[#161b22]/90 backdrop-blur-xl rounded-xl border border-slate-200/50 dark:border-[#30363d] shadow-lg hover:shadow-xl transition-all duration-300 p-6" style={{ animationDelay: `${index * 50}ms` }}>
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg flex-shrink-0">
                                            <Lightbulb className="w-5 h-5 text-green-600 dark:text-green-400" />
                                        </div>
                                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{tip}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center mt-16">
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-3xl p-8 sm:p-12 border border-indigo-200/50 dark:border-indigo-700/50">
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                Ready to Practice?
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
                                Put your preparation into practice with our free AI-powered tool and get personalized feedback.
                            </p>
                            <a
                                href="/ukprecas/"
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-1"
                            >
                                <Target className="w-5 h-5" />
                                Start Practicing Now
                            </a>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
