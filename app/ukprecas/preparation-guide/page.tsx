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

                    {/* Interview Timeline */}
                    <div className="mb-16">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">UK Pre-CAS Interview Process Timeline</h2>
                        <div className="space-y-6">
                            {[
                                {
                                    phase: 'Pre-Application Phase',
                                    timeline: '6–12 months before course start',
                                    description: 'This phase lays the foundation for your entire UK application and interview credibility.',
                                    actions: [
                                        'Research UK universities and courses in detail, focusing on curriculum, ranking, and employability',
                                        'Shortlist courses that logically align with your academic background and work experience',
                                        'Begin IELTS or PTE preparation, factoring in possible retakes',
                                        'Start early financial planning with family (savings, sponsor, or education loan)'
                                    ],
                                    milestones: [
                                        'Final shortlist of universities and courses',
                                        'Clear English test strategy (test type + target score)'
                                    ],
                                    tip: 'Interviewers often question why this course makes sense for you. A strong academic progression story built at this stage makes later interviews far easier.'
                                },
                                {
                                    phase: 'Application Phase',
                                    timeline: '3–6 months before intake',
                                    description: 'This is where your written application and interview narrative must align.',
                                    actions: [
                                        'Submit university applications with accurate academic and personal details',
                                        'Take IELTS/PTE at UKVI-approved test centres',
                                        'Prepare a focused Statement of Purpose that explains course choice, progression, and career outcome',
                                        'Research accommodation types and realistic monthly living costs'
                                    ],
                                    milestones: [
                                        'Conditional or unconditional offer letters received',
                                        'English language requirement satisfied'
                                    ],
                                    tip: 'Your SOP often becomes the base document for interview questions. Anything written here should be something you can confidently explain on camera.'
                                },
                                {
                                    phase: 'Offer to Interview Phase',
                                    timeline: '2–4 weeks after accepting the offer',
                                    description: 'This phase officially triggers Pre-CAS preparation.',
                                    actions: [
                                        'Accept the university offer formally',
                                        'Compile academic, financial, and identity documents',
                                        'Begin structured Pre-CAS interview preparation',
                                        'Monitor email regularly for Pre-CAS interview scheduling'
                                    ],
                                    milestones: [
                                        'Pre-CAS interview invitation received',
                                        'Interview date and format confirmed'
                                    ],
                                    tip: 'At this stage, universities assess credibility, not English fluency. Start practicing answers aloud so your explanations sound natural, not memorised.'
                                },
                                {
                                    phase: 'Interview Preparation Phase',
                                    timeline: '1–2 weeks before interview',
                                    description: 'This is the most critical phase for success.',
                                    actions: [
                                        'Practice full-length mock interviews under timed conditions',
                                        'Prepare clear explanations for: course modules, funding source and 28-day fund rule, career plans after graduation',
                                        'Test technical setup (camera, microphone, internet stability)',
                                        'Choose a quiet, professional interview environment'
                                    ],
                                    milestones: [
                                        'Weak answers identified and corrected',
                                        'Financial explanations fully clear and consistent'
                                    ],
                                    tip: 'Most failures happen due to financial confusion or vague career plans, not lack of English. Focus on clarity and consistency.'
                                },
                                {
                                    phase: 'Interview Day',
                                    timeline: 'Interview day (15–30 minutes)',
                                    description: 'The interview is short, but every answer matters.',
                                    actions: [
                                        'Log in 10–15 minutes early',
                                        'Keep key documents open or printed nearby',
                                        'Answer questions calmly, honestly, and directly',
                                        'Ask for clarification if you don\'t understand a question'
                                    ],
                                    milestones: [
                                        'Interview completed successfully'
                                    ],
                                    tip: 'Interviewers value logical answers over fancy language. A short, confident answer is better than a long, confusing one.'
                                },
                                {
                                    phase: 'Post-Interview Phase',
                                    timeline: '2–4 weeks after interview',
                                    description: 'Universities internally review credibility and documentation during this period.',
                                    actions: [
                                        'Respond promptly to any clarification or document requests',
                                        'Finalise visa documents in parallel (don\'t wait for CAS)',
                                        'Ensure bank funds remain untouched and compliant',
                                        'Complete TB test if required'
                                    ],
                                    milestones: [
                                        'CAS (Confirmation of Acceptance for Studies) issued'
                                    ],
                                    tip: 'Do not move or withdraw funds until CAS is issued — this is a common reason for delays or refusals.'
                                },
                                {
                                    phase: 'CAS to Visa Phase',
                                    timeline: 'After CAS issuance',
                                    description: 'This phase shifts from university assessment to UKVI assessment.',
                                    actions: [
                                        'Submit UK student visa application online',
                                        'Pay visa fee and Immigration Health Surcharge (IHS)',
                                        'Book and attend biometric appointment'
                                    ],
                                    milestones: [
                                        'Visa decision received'
                                    ],
                                    tip: 'CAS is valid for a limited period. Apply for the visa promptly to avoid last-minute pressure or errors.'
                                },
                                {
                                    phase: 'Post-Visa Phase',
                                    timeline: 'After visa approval',
                                    description: 'Final preparation for travel and settlement.',
                                    actions: [
                                        'Book flight tickets',
                                        'Confirm accommodation arrangements',
                                        'Organise travel and arrival documents',
                                        'Plan BRP (Biometric Residence Permit) collection within 10 days of arrival'
                                    ],
                                    milestones: [
                                        'Arrival in the UK',
                                        'BRP collected'
                                    ],
                                    tip: 'Carry all academic, financial, and visa documents in your hand luggage — airport checks can still happen.'
                                }
                            ].map((phase, index) => (
                                <div key={index} className="bg-white/90 dark:bg-[#161b22]/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-[#30363d] shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden p-6 sm:p-8">
                                    <div className="mb-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold rounded-full">
                                                {phase.timeline}
                                            </span>
                                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{phase.phase}</h3>
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-400 mb-4">{phase.description}</p>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Key Actions:</h4>
                                            <ul className="space-y-2">
                                                {phase.actions.map((action, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                                                        <span className="text-indigo-600 dark:text-indigo-400 mt-1">•</span>
                                                        <span>{action}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Important Milestones:</h4>
                                            <ul className="space-y-2">
                                                {phase.milestones.map((milestone, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                                                        <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                                                        <span>{milestone}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border-l-4 border-indigo-500">
                                        <p className="text-sm text-slate-700 dark:text-slate-300"><strong>Tip:</strong> {phase.tip}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Day-of-Interview Checklist */}
                    <div className="mb-16">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">Day-of-Interview Checklist</h2>
                        <div className="bg-white/90 dark:bg-[#161b22]/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-[#30363d] shadow-lg p-6 sm:p-8">
                            {[
                                {
                                    title: 'Technical Setup (Non-Negotiable)',
                                    items: [
                                        { text: 'Stable internet connection: Minimum 2–3 Mbps upload; avoid mobile hotspots if possible.', why: 'Disconnections disrupt flow and create a poor first impression.' },
                                        { text: 'Camera positioned at eye level: Clear, steady video with your face centered.', why: 'Interviewers rely on facial cues to assess confidence.' },
                                        { text: 'Microphone tested: No echo, background noise, or distortion.', why: 'Repeating answers due to audio issues breaks momentum.' },
                                        { text: 'Laptop fully charged + charger plugged in: Don\'t rely on battery alone.', why: 'Sudden shutdowns are viewed as lack of preparation.' },
                                        { text: 'Correct browser and interview link opened: Log in 10–15 minutes early.', why: 'Late entry creates unnecessary stress and negative perception.' }
                                    ]
                                },
                                {
                                    title: 'Documents Preparation (Keep Open or Printed)',
                                    items: [
                                        { text: 'University offer letter: Course name, intake, and university details visible.' },
                                        { text: 'CAS details (if already issued): CAS number and course information ready.' },
                                        { text: '28-day bank statements: Correct amounts clearly visible.' },
                                        { text: 'Sponsor or loan documents (if applicable): Sponsor letter, income proof, or loan sanction.' },
                                        { text: 'Statement of Purpose (SOP): Use only for reference, not reading answers.' },
                                        { text: 'Passport bio page: Identity and validity easily accessible.' }
                                    ],
                                    note: 'Interviewers often ask questions directly based on documents to test consistency.'
                                },
                                {
                                    title: 'Environment Setup (Control What You Can)',
                                    items: [
                                        { text: 'Quiet, private room: Inform family/roommates in advance.' },
                                        { text: 'Neutral background: Plain wall; avoid clutter or distracting visuals.' },
                                        { text: 'Front lighting: Light source facing you, not behind.' },
                                        { text: 'Phone on silent (not off): Keep it nearby in case of technical fallback.' },
                                        { text: 'Chair and posture checked: Sit upright and comfortable.' }
                                    ],
                                    note: 'A controlled environment signals seriousness and professionalism.'
                                },
                                {
                                    title: 'Mental Preparation (What Interviewers Actually Notice)',
                                    items: [
                                        { text: 'Calm mindset: Take 2–3 deep breaths before joining.' },
                                        { text: 'Answer honestly, not perfectly: Logical clarity matters more than fancy English.' },
                                        { text: 'Pause before answering: 1–2 seconds to structure thoughts is acceptable.' },
                                        { text: 'Stick to facts: Avoid guessing figures or exaggerating plans.' }
                                    ],
                                    note: 'Interviewers assess confidence, clarity, and consistency—not memorisation.'
                                },
                                {
                                    title: 'Last-Minute Content Review (5-Minute Scan)',
                                    items: [
                                        { text: 'Course modules: Be ready to explain 2–3 key subjects and why they matter.' },
                                        { text: 'Funding explanation: Who is paying, how funds were earned, and how long held.' },
                                        { text: 'Career plan: Short-term goal after graduation linked to your degree.' },
                                        { text: 'Why UK & why this university: One clear, logical reason for each.' }
                                    ],
                                    note: 'Most follow-up questions come from these four areas.'
                                }
                            ].map((section, sectionIndex) => (
                                <div key={sectionIndex} className="mb-8 last:mb-0">
                                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4">{section.title}</h3>
                                    <ul className="space-y-3 mb-4">
                                        {section.items.map((item, itemIndex) => (
                                            <li key={itemIndex} className="flex items-start gap-3">
                                                <input type="checkbox" className="mt-1 w-5 h-5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" />
                                                <div className="flex-1">
                                                    <span className="text-slate-700 dark:text-slate-300">{item.text}</span>
                                                    {'why' in item && item.why && (
                                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">Why it matters: {item.why}</p>
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    {section.note && (
                                        <p className="text-sm text-slate-600 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                                            {section.note}
                                        </p>
                                    )}
                                </div>
                            ))}
                            <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border-l-4 border-indigo-500">
                                <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Final Reminder</p>
                                <p className="text-sm text-slate-700 dark:text-slate-300">
                                    The Pre-CAS interview is not a language test. It is a <strong>credibility check</strong>. Clear, consistent, and honest answers matter more than speed or accent.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Mistakes to Avoid */}
                    <div className="mb-16">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">Top 10 Mistakes to Avoid</h2>
                        <div className="space-y-6">
                            {[
                                {
                                    number: 1,
                                    title: 'Not researching course modules in detail',
                                    what: 'Being unable to clearly explain what you will study beyond the course title.',
                                    why: ['Signals weak academic motivation', 'Makes interviewers doubt whether the course choice is genuine or informed'],
                                    how: ['Study the official course page and note 2–3 core modules', 'Explain how specific modules support your academic or career goals'],
                                    example: 'A student named the course correctly but couldn\'t describe even one subject taught in the first semester.'
                                },
                                {
                                    number: 2,
                                    title: 'Inconsistent financial information',
                                    what: 'Quoting figures that don\'t match bank statements, sponsor income, or documents.',
                                    why: ['Immediately raises credibility concerns', 'Often leads to follow-up checks or outright rejection'],
                                    how: ['Memorise key figures: total funds, sponsor income, and holding period', 'Practice explaining where the money came from and how long it\'s been held'],
                                    example: 'Parent\'s stated monthly income did not logically support the account balance shown.'
                                },
                                {
                                    number: 3,
                                    title: 'Unclear or unrealistic career plans',
                                    what: 'Giving vague answers about post-study plans or saying "I\'ll decide later."',
                                    why: ['Suggests lack of planning', 'Can be interpreted as hidden migration intent'],
                                    how: ['Define a realistic short-term career goal after graduation', 'Clearly link the UK degree to that role or industry'],
                                    example: '"I\'ll see what opportunities come after studying" without any role or sector mentioned.'
                                },
                                {
                                    number: 4,
                                    title: 'Unexplained study or work gaps',
                                    what: 'Avoiding or glossing over gaps in education or employment.',
                                    why: ['Interviewers suspect inconsistency or missing information', 'Reduces trust in the overall profile'],
                                    how: ['Prepare a brief, honest explanation for each gap', 'Highlight productive use of time (work, learning, family responsibility)'],
                                    example: 'A one-year gap only acknowledged after repeated questioning.'
                                },
                                {
                                    number: 5,
                                    title: 'Inability to explain why the course is relevant',
                                    what: 'Knowing the course name but not why it makes sense for you.',
                                    why: ['Makes the course choice appear random', 'Triggers academic progression concerns'],
                                    how: ['Clearly explain how your past education or work led to this course', 'Practice the explanation aloud so it sounds natural'],
                                    example: 'MBA chosen "because it has good scope," with no link to prior studies.'
                                },
                                {
                                    number: 6,
                                    title: 'Poor technical setup',
                                    what: 'Bad audio, unstable internet, or unclear video during the interview.',
                                    why: ['Disrupts the interview flow', 'Creates a negative first impression even before content is assessed'],
                                    how: ['Test camera, microphone, and internet in advance', 'Use a quiet room with good lighting and minimal background noise'],
                                    example: 'Interview paused multiple times due to microphone distortion.'
                                },
                                {
                                    number: 7,
                                    title: 'Documents not readily available',
                                    what: 'Searching for documents during the interview.',
                                    why: ['Signals poor preparation', 'Wastes limited interview time'],
                                    how: ['Organise all documents in one folder before the interview', 'Keep key PDFs open on your screen'],
                                    example: 'Student took several minutes to locate the bank statement.'
                                },
                                {
                                    number: 8,
                                    title: 'Failing to demonstrate genuine student intent',
                                    what: 'Sounding unsure about studying or focusing mainly on staying in the UK.',
                                    why: ['Directly conflicts with the genuine student requirement', 'Increases risk of refusal'],
                                    how: ['Emphasise academic motivation and learning outcomes', 'Avoid framing answers primarily around settlement or long-term stay'],
                                    example: 'Most answers revolved around UK jobs, not education.'
                                },
                                {
                                    number: 9,
                                    title: 'Choosing a poorly aligned course',
                                    what: 'Selecting a course with weak or no academic progression.',
                                    why: ['UKVI and universities question the logic of the study plan', 'Leads to tougher credibility questioning'],
                                    how: ['Choose courses aligned with your previous education', 'If switching fields, prepare a strong, logical justification'],
                                    example: 'Arts graduate applying for an IT foundation course without explanation.'
                                },
                                {
                                    number: 10,
                                    title: 'Not practicing enough before the interview',
                                    what: 'Treating the Pre-CAS interview as casual or informal.',
                                    why: ['Leads to nervous, inconsistent, or poorly structured answers', 'Important details are forgotten under pressure'],
                                    how: ['Do multiple mock interviews under timed conditions', 'Review feedback and refine weak answers'],
                                    example: 'Student knew answers conceptually but couldn\'t articulate them clearly on camera.'
                                }
                            ].map((mistake, index) => (
                                <div key={index} className="bg-white/90 dark:bg-[#161b22]/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-[#30363d] shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden p-6 sm:p-8">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-700 dark:text-red-400 font-bold">
                                            {mistake.number}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
                                                Mistake {mistake.number}: {mistake.title}
                                            </h3>
                                            <p className="text-slate-700 dark:text-slate-300 mb-4"><strong>What it is:</strong> {mistake.what}</p>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Why it's a problem:</h4>
                                            <ul className="space-y-1">
                                                {mistake.why.map((reason, i) => (
                                                    <li key={i} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                                                        <span className="text-red-600 dark:text-red-400 mt-1">•</span>
                                                        <span>{reason}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">How to avoid:</h4>
                                            <ul className="space-y-1">
                                                {mistake.how.map((solution, i) => (
                                                    <li key={i} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                                                        <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                                                        <span>{solution}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                        <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Real example:</strong> {mistake.example}</p>
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
