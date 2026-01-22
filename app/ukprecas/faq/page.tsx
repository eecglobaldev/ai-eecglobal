import { Metadata } from 'next';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, MessageSquare, Shield, Clock, Languages, FileText } from 'lucide-react';
import GoogleTagManager from '@/components/GoogleTagManager';
import UkPrecasStructuredData from '@/features/uk-precas/components/UkPrecasStructuredData';

export const metadata: Metadata = {
    title: 'UK Pre-CAS Interview FAQ | EEC',
    description: 'Frequently asked questions about UK Pre-CAS credibility interviews, preparation tips, and EEC\'s AI-powered prep tool. Get answers to common queries about Tier 4 visas, CAS issuance, and interview success.',
    keywords: [
        'UK Pre-CAS FAQ',
        'UK visa interview questions',
        'CAS credibility interview',
        'UK student visa FAQ',
        'Tier 4 visa preparation',
        'UK Pre-CAS interview tips',
        'EEC UK visa FAQ',
        'UK visa interview preparation',
        'CAS interview questions',
        'UK student visa requirements'
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
        canonical: 'https://ai.eecglobal.com/ukprecas/faq/',
        languages: {
            'en-GB': 'https://ai.eecglobal.com/ukprecas/faq/',
            'en-IN': 'https://ai.eecglobal.com/ukprecas/faq/',
            'en-US': 'https://ai.eecglobal.com/ukprecas/faq/',
            'x-default': 'https://ai.eecglobal.com/ukprecas/faq/',
        },
    },
    openGraph: {
        type: 'website',
        url: 'https://ai.eecglobal.com/ukprecas/faq/',
        title: 'UK Pre-CAS Interview FAQ | EEC',
        description: 'Get answers to your UK Pre-CAS credibility interview questions. Learn about preparation, requirements, and success tips with EEC\'s expert guidance.',
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
                alt: 'EEC - UK Pre-CAS Interview FAQ',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@eecglobal',
        creator: '@eecglobal',
        title: 'UK Pre-CAS Interview FAQ | EEC',
        description: 'Frequently asked questions about UK Pre-CAS credibility interviews and preparation tips.',
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
        'article:tag': 'UK Visa, Pre-CAS Interview, Student Visa, Study Abroad',
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

const faqData = [
    {
        id: 'what-is-pre-cas',
        question: 'What is a UK Pre-CAS interview?',
        answer: 'A UK Pre-CAS interview is a mandatory 15-30 minute video credibility assessment by UK universities before CAS (Confirmation of Acceptance for Studies) issuance. It evaluates genuine student intention, course knowledge, financial capability, and career plans. Introduced in 2024, it replaces the old CAS process and is required for all Tier 4 student visas.',
        icon: <HelpCircle className="w-5 h-5 text-indigo-500" />,
    },
    {
        id: 'is-tool-free',
        question: 'Is the UK Pre-CAS interview tool free?',
        answer: 'Yes, EEC\'s UK Pre-CAS interview prep tool is 100% free. You can practice unlimited mock interviews, get AI feedback, and track your progress at no cost. The tool is designed to help Indian students prepare for their UK visa interviews without any financial barriers.',
        icon: <Shield className="w-5 h-5 text-green-500" />,
    },
    {
        id: 'how-ai-feedback-works',
        question: 'How does the AI feedback work?',
        answer: 'The AI analyzes your recorded answers and provides detailed feedback including a score (1-10), strengths, areas for improvement, and actionable coaching tips. It focuses on content relevance, clarity, and persuasiveness. The feedback is based on patterns from successful visa applications and expert UKVI guidelines.',
        icon: <MessageSquare className="w-5 h-5 text-blue-500" />,
    },
    {
        id: 'practice-in-other-languages',
        question: 'Can I practice in Hindi or Gujarati?',
        answer: 'Yes, the tool supports translation of questions, guidance, and feedback into Hindi and Gujarati. However, the actual interview will be in English, so practicing in English is recommended. The translations help you understand the content better before practicing in the interview language.',
        icon: <Languages className="w-5 h-5 text-purple-500" />,
    },
    {
        id: 'required-documents',
        question: 'What documents do I need for UK Pre-CAS interview?',
        answer: 'You\'ll need your university offer letter, IELTS/SELT scores, academic transcripts, 28-day bank statements, passport, Statement of Purpose (SOP), sponsor letter (if applicable), and TB test certificate. Additional documents may be required based on your specific circumstances like work experience or family sponsorship.',
        icon: <FileText className="w-5 h-5 text-orange-500" />,
    },
    {
        id: 'interview-duration',
        question: 'How long does the Pre-CAS interview take?',
        answer: 'The interview typically lasts 15-30 minutes. You should be prepared to answer questions about your study plans, financial situation, and personal background. The interviewer may ask follow-up questions based on your initial responses.',
        icon: <Clock className="w-5 h-5 text-red-500" />,
    },
    {
        id: 'when-interview-happens',
        question: 'When does the Pre-CAS interview happen?',
        answer: 'The interview occurs after you receive your university offer letter but before CAS issuance. It\'s usually scheduled within 2-4 weeks of submitting your visa application. The timing depends on your university and the volume of applications.',
        icon: <Clock className="w-5 h-5 text-teal-500" />,
    },
    {
        id: 'common-questions',
        question: 'What are the most common Pre-CAS interview questions?',
        answer: 'Common questions include: Why did you choose this university/course? How will you fund your studies? What are your career plans after graduation? Tell us about your academic background. Why do you want to study in the UK? Be prepared to discuss your Statement of Purpose in detail.',
        icon: <MessageSquare className="w-5 h-5 text-indigo-500" />,
    },
    {
        id: 'red-flags',
        question: 'What are red flags in Pre-CAS interviews?',
        answer: 'Red flags include: Inconsistent financial information, unclear study plans, gaps in education/work without explanation, inability to discuss your course content, and lack of genuine intent to study. Always be honest and provide supporting documentation for any concerns.',
        icon: <Shield className="w-5 h-5 text-red-500" />,
    },
    {
        id: 'preparation-tips',
        question: 'What are the best preparation tips?',
        answer: 'Practice with our AI tool regularly, review your Statement of Purpose thoroughly, prepare financial documents in advance, research your university and course, and practice speaking clearly. Record yourself answering questions and get feedback from mentors or use our tool\'s AI analysis.',
        icon: <HelpCircle className="w-5 h-5 text-green-500" />,
    },
    {
        id: 'cas-shield-interview-2026',
        question: 'What is CAS Shield interview 2026?',
        answer: 'CAS Shield is a deeper form of the Pre-CAS credibility check used by some UK universities for applicants with unusual profiles—for example, large study gaps, complex business-funded finances, or prior visa refusals. Expect longer and more detailed questioning on academic progression, how funds were accumulated, and why the chosen course follows from prior study or work. A typical CAS Shield session focuses on facts, not persuasion: the interviewer wants consistent evidence that your plans are logical. Practical tip: map your academic timeline and money trail into short bullet points and practice them out loud. EEC\'s counselors and the ai.eecglobal.com/ukprecas tool simulate these tougher scenarios so you can answer calmly and consistently.',
        icon: <Shield className="w-5 h-5 text-indigo-500" />,
    },
    {
        id: 'uk-airport-interview-2026',
        question: 'What happens at a UK airport interview on arrival?',
        answer: 'If a Border Force officer stops you at the airport, the questions are short and factual — course name, where you\'ll stay, who\'s paying for you, and whether you\'ve arrived with documents such as CAS and the offer letter. The aim is to confirm your visa and travel claims match the paperwork. Keep originals (or clear digital copies) of CAS, offer letter and accommodation confirmations handy in your hand luggage. Practice quick, consistent answers — a calm two-sentence response is usually enough.',
        icon: <MessageSquare className="w-5 h-5 text-blue-500" />,
    },
    {
        id: 'bank-balance-requirement-uk-visa-2026',
        question: 'How much bank balance do I need for a UK student visa (2026)?',
        answer: 'For 2026, maintenance requirements are calculated per month for up to nine months: if your university is in London, it\'s £1,334/month (total £12,006 for 9 months). For outside London, it\'s £1,023/month (total £9,207 for 9 months). These funds must be held for 28 consecutive days immediately before the visa application date (the end of the 28-day period must be within 31 days of your application). Also budget for the IHS (Immigration Health Surcharge) charged per year. These rules are set out by UKVI and are commonly enforced at the visa stage — match your numbers exactly to what appears on your bank statement and the CAS.',
        icon: <FileText className="w-5 h-5 text-orange-500" />,
    },
    {
        id: 'pre-cas-vs-cas-interview-2026',
        question: 'What\'s the difference between a Pre-CAS interview and a CAS interview?',
        answer: 'A Pre-CAS interview is done by the university before they issue the CAS (Confirmation of Acceptance for Studies); it checks your course fit, finances and intent. A CAS interview or credibility check by UKVI may happen later at the visa stage — it\'s the Home Office verifying what you declared in the visa application. Both assess similar things, but timing and the exact focus can differ. Prepare consistent answers for both: your SOP, transcripts, and finances should tell the same story across every stage.',
        icon: <HelpCircle className="w-5 h-5 text-indigo-500" />,
    },
    {
        id: 'visa-rejection-after-cas-2026',
        question: 'Can a UK student visa be refused after the university issues CAS?',
        answer: 'Yes. CAS confirms university acceptance but doesn\'t guarantee a visa. UKVI may refuse a visa if your financial evidence is inconsistent, if there are credibility issues, or if documents don\'t match what you said earlier. That\'s why careful, consistent preparation for both the Pre-CAS interview and the visa application is essential. Keep records (bank statements, sponsor letters, loan sanction letters) that align with what you say in interviews and on forms.',
        icon: <Shield className="w-5 h-5 text-red-500" />,
    },
    {
        id: 'pre-cas-questions-2026',
        question: 'What kinds of questions are asked in UK Pre-CAS interviews 2026?',
        answer: 'Questions explore five areas: course knowledge (modules, delivery), why the UK and this university, funding and source of funds, academic/professional progression, and future plans. Expect follow-ups — e.g., if you say \'my father will fund me\', be ready to explain his income details and where the funds have been held. Real examples: \'Name two modules and how they fit your career plan\' or \'Explain your sponsor\'s income stream briefly.\' Practice concise, factual answers with evidence ready.',
        icon: <MessageSquare className="w-5 h-5 text-indigo-500" />,
    },
    {
        id: 'ielts-65-enough-uk-visa-2026',
        question: 'Is IELTS 6.5 enough for a UK student visa in 2026?',
        answer: 'IELTS 6.5 is acceptable for many postgraduate programs, but each course sets its own bands — some require 7.0 or higher in specific modules. The test must be UKVI-approved and within two years when you apply. Check your chosen course page and confirm the exact band requirements before booking tests.',
        icon: <Languages className="w-5 h-5 text-purple-500" />,
    },
    {
        id: 'genuine-student-requirement-2026',
        question: 'What does \'genuine student\' mean for the UK visa?',
        answer: 'Being a genuine student means showing your course choice is logical given your background, that you can afford to study, and that you intend to study (not migrate). Evidence includes consistent SOP, subject knowledge, coherent career plans, and traceable funds. Interviews probe for gaps and inconsistencies, so prepare honest, well-documented responses.',
        icon: <Shield className="w-5 h-5 text-indigo-500" />,
    },
    {
        id: 'graduate-route-visa-2026',
        question: 'What is the Graduate Route visa (2026) and how long does it last?',
        answer: 'The Graduate Route lets students stay to work or look for work after their degree. As per official guidance, if you apply on or before 31 December 2026 the route lasts 2 years (3 years for PhD graduates). From 1 January 2027 the standard Graduate Route length changes to 18 months for new applicants (PhD remains 3 years). Always check timing against your graduation date and when you plan to apply.',
        icon: <HelpCircle className="w-5 h-5 text-indigo-500" />,
    },
    {
        id: 'uk-intake-dates-2026-2027',
        question: 'What are the main UK intake dates for 2026–2027?',
        answer: 'Main intake: September 2026 (broadest course options). Secondary intake: January 2027 (more limited, common in business/computing). Plan preparation 6–9 months ahead for September entry — that gives time for applications, English tests, and Pre-CAS practice.',
        icon: <Clock className="w-5 h-5 text-teal-500" />,
    },
    {
        id: 'preparation-best-practices-2026',
        question: 'What is the best way to prepare for the Pre-CAS interview in 2026?',
        answer: 'Start with your SOP and course modules: be able to explain how specific modules help your career. Match financial documents to what you\'ll say: bank statements, sponsor letters, or loan sanctions. Do timed mock interviews (15–30 minutes) and review feedback — record yourself to spot filler words and inconsistencies. Use profile-based practice (ai.eecglobal.com/ukprecas) and review CA-led financial checks for complex funding.',
        icon: <HelpCircle className="w-5 h-5 text-green-500" />,
    },
    {
        id: 'best-consultant-gujarat-2026',
        question: 'Which is the best UK study-abroad consultant in Gujarat in 2026?',
        answer: 'Many agencies exist, but EEC positions itself as a specialist in UK Pre-CAS work with 29 years of UK education focus, 26 branches, and CA-led financial audits. If you value both document-level financial review and routine mock interviews, those are the services to check when comparing consultants. For impartial decisions, ask for specific case studies and timelines.',
        icon: <Shield className="w-5 h-5 text-indigo-500" />,
    },
    {
        id: 'how-long-for-cas-after-pre-cas',
        question: 'How long does CAS usually take to arrive after a successful Pre-CAS interview?',
        answer: 'Typically universities issue CAS within 2–4 weeks after a successful Pre-CAS interview, but processing times vary by institution and whether any documents need clarification. If documents are incomplete, universities may delay CAS until they are satisfied. Keep communications active and provide missing items promptly.',
        icon: <Clock className="w-5 h-5 text-red-500" />,
    },
    {
        id: 'what-if-fail-pre-cas-retake',
        question: 'What if I fail the Pre-CAS interview? Can I retake it?',
        answer: 'Policies vary by university — some permit a second attempt, others may not. If you fail, ask the university for specific reasons and whether a second interview or additional documentation is acceptable. Use feedback to address gaps (e.g., fund clarity or course rationale) before reapplying.',
        icon: <Shield className="w-5 h-5 text-red-500" />,
    },
    {
        id: 'documents-prove-source-of-funds',
        question: 'Which documents best prove the source of funds for a UK visa?',
        answer: 'Commonly accepted proofs include: 28-day bank statements showing required maintenance funds, sponsor\'s bank statements and signed sponsor letter, education loan sanction letter, tax returns or business proof (invoices/company bank statements). Explain any large deposits (dates, origin) with supporting paperwork. The goal is traceability — UKVI wants to see where money came from and that it\'s genuinely available.',
        icon: <FileText className="w-5 h-5 text-orange-500" />,
    },
    {
        id: 'can-i-work-part-time-on-student-visa',
        question: 'Can I work part-time on a UK student visa?',
        answer: 'Yes — most student visas allow up to 20 hours/week during term and full-time during holidays (check your specific visa conditions). If you plan to work, be ready to explain how you\'ll balance studies and work without harming your academic progress.',
        icon: <HelpCircle className="w-5 h-5 text-indigo-500" />,
    },
];

export default function UkPrecasFaqPage() {
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
                                    <MessageSquare className="w-4 h-4 relative transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
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
                            <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Frequently Asked Questions</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto animate-fade-in-up">
                            <span className="text-slate-900 dark:text-white">UK Pre-CAS Interview</span>
                            <br />
                            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">FAQ</span>
                        </h1>
                        <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            Get answers to the most common questions about UK Pre-CAS credibility interviews, preparation tips, and our AI-powered prep tool.
                        </p>
                    </div>

                    {/* FAQ Accordion */}
                    <div className="max-w-4xl mx-auto">
                        <Accordion className="space-y-4">
                            {faqData.map((faq, index) => (
                                <AccordionItem
                                    key={faq.id}
                                    className="bg-white/90 dark:bg-[#161b22]/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-[#30363d] shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors duration-200">
                                        <div className="flex items-center gap-4">
                                            <div className="flex-shrink-0 p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                                                {faq.icon}
                                            </div>
                                            <span className="text-lg font-semibold text-slate-900 dark:text-white">{faq.question}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-5">
                                        <div className="pl-16">
                                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{faq.answer}</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center mt-16">
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-3xl p-8 sm:p-12 border border-indigo-200/50 dark:border-indigo-700/50">
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                Ready to Practice?
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
                                Use our free AI-powered tool to practice UK Pre-CAS interviews with personalized feedback and expert guidance.
                            </p>
                            <a
                                href="/ukprecas/"
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-1"
                            >
                                <MessageSquare className="w-5 h-5" />
                                Start Practicing Now
                            </a>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
