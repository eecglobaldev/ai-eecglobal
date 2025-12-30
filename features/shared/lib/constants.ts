import {
    Globe,
    Mic,
    Briefcase,
    BookOpen,
    Calculator,
    Plane,
    Search,
    GraduationCap,
    MapPin,
    Ticket,
    Bot
} from 'lucide-react';
import { Tool, WorkflowStep } from '../types';

export const TOOLS: Tool[] = [
    {
        id: 'australia-gs',
        title: 'Australia Genuine Student Visa Interview Prep',
        description: 'Australia now rejects students who sound "memorized." Our AI listens to your voice and trains you to speak naturally. Pass the "Genuine Student" test on your first try.',
        icon: Mic,
        url: '/australiagsprep',
        color: 'text-blue-600 dark:text-blue-400',
        badge: 'Stop Rejection',
        flagCode: 'au',
        popular: true,
        features: ['Check Your "Genuine" Score', 'Fix Robot-like Answers', 'Unlimited Mock Practice']
    },
    {
        id: 'usa-f1',
        title: 'USA F-1 Student Visa Interview Prep',
        description: 'The Visa Officer gives you only 2 minutes. One wrong answer means rejection. Practice with our strict AI officer until you are brave, clear, and ready to win your visa.',
        icon: Globe,
        url: '/usavisaprep',
        color: 'text-red-600 dark:text-red-400',
        flagCode: 'us',
        features: ['Know Your Rejection Risk', 'Perfect Your "Why USA?"', 'Review DS-160 Answers']
    },
    {
        id: 'uk-pre-cas',
        title: 'UK CAS & Airport Interview Prep',
        description: 'UK Universities conduct tough interviews before giving admission. If you fail, you lose your seat. Use our AI to practice university-specific questions and get your CAS letter faster.',
        icon: GraduationCap,
        url: '/ukprecas',
        color: 'text-indigo-600 dark:text-indigo-400',
        flagCode: 'gb',
        features: ['University Compliance Check', 'Improve Speaking Fluency', 'Instant Feedback Report']
    },
    {
        id: 'ireland-guide',
        title: 'Study in Ireland Comprehensive Guide 2026',
        description: 'Ireland is the Silicon Valley of Europe and the only English-speaking country in the Eurozone. Unlock a 2-year stay-back visa and land roles at Google, Meta, or Intel HQ.',
        icon: BookOpen,
        url: 'https://ireland.eecglobal.com', // External
        color: 'text-emerald-600 dark:text-emerald-400',
        customIconUrl: '/assets/ireland.png',
        features: ['2-Year Post-Study Work Visa', 'No Application Fee Options', 'Europe\'s Tech Capital (Jobs)']
    },
    {
        id: 'finland-guide',
        title: 'Study in Finland No Exam Admission 2026',
        description: 'Skip the stress of entrance exams. Get admission into world-class Finnish universities based purely on your academic marks. Experience the "Happiest Country in the World" with a clear path to PR.',
        icon: BookOpen,
        url: 'https://finland.eecglobal.com/', // External
        color: 'text-sky-600 dark:text-sky-400',
        flagCode: 'fi',
        badge: 'No Entrance Exam',
        features: ['Admission via Academic Marks', 'Fast Track to PR (4 Years)', 'Schengen Visa Travel']
    },
    {
        id: 'nz-visa',
        title: 'New Zealand Visa Interview Prep & NZ 2026 Comprehensive Guide',
        description: 'NZ immigration is very strict about your funds and career plans. Learn exactly how to explain your "Study Gaps" and family finances to the officer clearly and honestly.',
        icon: MapPin,
        url: '/nzvisaprep',
        color: 'text-teal-600 dark:text-teal-400',
        flagCode: 'nz',
        features: ['Justify Study Gaps', 'Explain Family Funds', 'Prove Strong Ties to India']
    },
    {
        id: 'career-counselor',
        title: 'Study Abroad Career Counsellor',
        description: 'Don\'t waste ₹30 Lakhs on a useless degree. Our AI analyzes global job markets to tell you which courses will actually get you a high-paying job in 2026.',
        icon: Briefcase,
        url: '/careercounselor',
        color: 'text-purple-600 dark:text-purple-400',
        badge: 'Save Money',
        features: ['Predict Future Salary', 'Find High-Demand Jobs', 'Course ROI Calculator']
    },
    {
        id: 'germany-guide',
        title: 'Study in Germany Comprehensive Guide 2026',
        description: 'German Universities are free but the paperwork is confusing. Convert your Indian CGPA to the German Grade (Bavarian Formula) instantly and check if you qualify for Public Universities.',
        icon: BookOpen,
        url: 'https://germany.eecglobal.com/public/', // External
        color: 'text-yellow-600 dark:text-yellow-400',
        flagCode: 'de',
        features: ['Indian CGPA to German Grade', 'Check Free University Eligibility', 'APS Certificate Guide']
    },
    {
        id: 'australia-guide',
        title: 'Study in Australia 2026 Guide',
        description: 'Is Sydney too expensive? How much can you save doing part-time jobs? Get honest, verified facts about rent, groceries, and savings for Indian students in Australia.',
        icon: BookOpen,
        url: 'https://australia.eecglobal.com', // External
        color: 'text-green-600 dark:text-green-400',
        flagCode: 'au',
        features: ['Calculate Monthly Rent', 'Part-Time Earnings Check', 'Best Cities for Students']
    },
    {
        id: 'pr-calculator',
        title: 'Australia PR Points Calculator',
        description: 'Want to settle abroad? Calculate your official PR points for Visa 189 & 190. See exactly what score you have now and how to increase it to get Permanent Residency.',
        icon: Calculator,
        url: 'https://australia.eecglobal.com/prpointscalculator', // External
        color: 'text-blue-600 dark:text-blue-400',
        flagCode: 'au',
        features: ['Check PR Eligibility', 'Calculate Visa 189/190 Score', 'Tips to Boost Points']
    },
    {
        id: 'travel-agent',
        title: 'EEC Visa & Travel Agent',
        description: 'Avoid last-minute airport panic. Find the cheapest student flights and get a personalized checklist of every document you must carry for immigration.',
        icon: Plane,
        url: '/travelagent',
        color: 'text-sky-500 dark:text-sky-400',
        features: ['Student Flight Discounts', 'Immigration Doc Checklist', 'Smart Packing Guide']
    },
    {
        id: 'course-search',
        title: 'Global Course Search & Scholarship Search',
        description: 'Access the world\'s largest database of 85,000+ programs. Filter by tuition budget, "No IELTS" options, and scholarship availability to find your perfect university match instantly.',
        icon: Search,
        url: 'https://courses.eecglobal.com', // External
        color: 'text-pink-600 dark:text-pink-400',
        features: ['Compare 85,000+ Courses', 'Filter by Budget & Intake', 'Check Scholarship Eligibility']
    },
    {
        id: 'pte-vouchers',
        title: 'PTE Exam Discount Vouchers',
        description: 'Why pay full price? Get official, instant discount codes for your PTE Academic exam. Save flat cash on booking fees valid for all test centers across India.',
        icon: Ticket,
        url: 'https://ptetestindia.com', // External
        color: 'text-orange-600 dark:text-orange-400',
        badge: 'Save Money',
        features: ['Flat ₹ Discount on Fees', 'Instant Voucher Delivery', '100% Official & Valid']
    },
    {
        id: 'ielts-bot',
        title: 'IELTS AI Practice Bot (Telegram)',
        description: 'EEC\'s intelligent Telegram bot offers unlimited 24/7 practice. Record speaking answers or submit essays to get instant AI scoring, grammar fixes, and band predictions.',
        icon: Bot,
        url: 'https://t.me/eecieltsbot', // External
        color: 'text-sky-500 dark:text-sky-400',
        badge: 'Free AI Tutor',
        features: ['Instant AI Band Scoring', 'Unlimited Speaking Mocks', 'Writing Task 2 Feedback']
    }
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
    {
        id: 1,
        title: 'Strategic Planning',
        tagline: 'Don\'t Follow The Herd',
        description: 'Most students waste ₹30 Lakhs on courses with no job future. We use AI to find degrees with high "ROI" (Return on Investment) so you land a high-salary job in 2026.',
        icon: Search,
        bullets: ['Compare Tuition vs. Future Salary', 'Spot "Saturated" Job Markets', 'Find Courses with PR Pathways'],
        colorTheme: 'blue'
    },
    {
        id: 2,
        title: 'Eligibility Check',
        tagline: 'Avoid Application Rejection',
        description: 'Universities keep application fees (₹10k+) even if they reject you. Use our calculators to check your German GPA or Australia PR points instantly before you pay.',
        icon: Calculator,
        bullets: ['Convert Indian CGPA to German Grade', 'Calculate Australia PR Score (189/190)', 'Check "Backlog" Acceptance Rules'],
        colorTheme: 'purple'
    },
    {
        id: 3,
        title: 'Visa Interview Mastery',
        tagline: 'The "Boss Level" Challenge',
        description: 'The Visa Officer has the power to reject you in 2 minutes. Our AI acts like a strict officer, drilling you until you stop memorizing and start sounding confident.',
        icon: Mic,
        bullets: ['Practice with "Strict" Mode AI', 'Get Instant Grammar & Tone Fixes', 'Learn to Answer "Why This University?"'],
        colorTheme: 'pink'
    },
    {
        id: 4,
        title: 'Smooth Departure',
        tagline: 'No Airport Surprises',
        description: 'The struggle doesn\'t end with the Visa. We ensure you carry the right documents, get the best forex rates, and book student-discounted flights.',
        icon: Plane,
        bullets: ['Immigration Document Checklist', 'Find Cheapest Student Flights', 'Pre-Departure Shopping Guide'],
        colorTheme: 'emerald'
    }
];

export const TRUST_POINTS = [
    "Expertise from 20+ years of counseling",
    "26 Offices across India",
    "Based on real Visa Officer questions",
    "100% Free for all students"
];
