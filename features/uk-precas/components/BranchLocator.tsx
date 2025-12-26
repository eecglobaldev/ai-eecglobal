import React, { useState, useMemo, useEffect, useRef } from 'react';
import { BRANCH_DATA, Branch, BRANCH_STATS } from '../data/branches';
import { 
    MapPin, MessageCircle, Phone, Clock, BadgeCheck, Search, 
    BookOpen, Globe, Calendar, Users, ChevronDown, ChevronRight,
    Building2, Navigation, ExternalLink, Star, Shield, Award,
    Sparkles, TrendingUp, CheckCircle, ArrowRight, Quote, Mail
} from 'lucide-react';

type GroupedBranches = Record<string, Branch[]>;

// ══════════════════════════════════════════════════════════════════════════════
// 🔥 GOOGLE DOMINATION SEO ARCHITECTURE - 2026 ENTERPRISE EDITION V3
// ══════════════════════════════════════════════════════════════════════════════
// 40+ CRITICAL SEO INTERVENTIONS FOR TOTAL DOMINATION
// SPEAKABLE | PAA | 2026 CONTENT | POTENTIALACTION | INTERACTION COUNTERS
// VideoObject | DefinedTermSet | Event | Course | MonetaryAmount
// ══════════════════════════════════════════════════════════════════════════════

// Last Modified: January 2026 - Updated for September 2026 & January 2027 UK Intakes

// Icons using Lucide components
const MapPinIcon = () => <MapPin className="w-4 h-4" />;
const WhatsAppIcon = () => <MessageCircle className="w-4 h-4" />;
const PhoneIcon = () => <Phone className="w-4 h-4" />;
const ClockIcon = () => <Clock className="w-3.5 h-3.5" />;
const BadgeCheckIcon = () => <BadgeCheck className="w-4 h-4" />;
const SearchIcon = () => <Search className="w-4 h-4" />;
const BookOpenIcon = () => <BookOpen className="w-4 h-4" />;
const GlobeIcon = () => <Globe className="w-4 h-4" />;
const CalendarIcon = () => <Calendar className="w-4 h-4" />;
const UsersIcon = () => <Users className="w-4 h-4" />;

const normalizeCityName = (branch: Branch): string => {
    const cityMap: Record<string, string> = { 'EEC Vallabh Vidyanagar Anand': 'Anand' };
    if (branch.address.addressLocality && branch.address.addressLocality !== 'Nan' && branch.address.addressLocality.trim() !== '') {
        return branch.address.addressLocality;
    }
    return cityMap[branch.name] || 'Other';
};

const generateCitySlug = (city: string): string => {
    return city.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

const generateBranchSlug = (branchName: string): string => {
    return branchName.toLowerCase().replace('eec ', '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

// ══════════════════════════════════════════════════════════════════════════════
// 🎯 TOPICAL CLUSTER ARCHITECTURE WITH 2026/2027 TARGETING
// ══════════════════════════════════════════════════════════════════════════════

interface TopicalCluster {
    primaryKeyword: string;
    secondaryKeywords: string[];
    lsiKeywords: string[];
    longTailKeywords: string[];
    localKeywords: string[];
    description: string;
    services: string[];
    faqs: { q: string; a: string }[];
    paaQuestions: { q: string; a: string }[]; // NEW: People Also Ask targeting
}

// PEOPLE ALSO ASK QUESTIONS - For Featured Snippets (2026 TARGETING)
const globalPAAQuestions: { q: string; a: string }[] = [
    { q: 'What is CAS Shield interview 2026?', a: 'CAS Shield is a credibility interview conducted by UK universities before issuing your CAS (Confirmation of Acceptance for Studies) for 2026 intakes. It assesses your genuine intention to study, course knowledge, career plans, and financial capability. EEC provides expert CAS Shield preparation at all 26 Gujarat branches and free AI practice at ai.eecglobal.com/ukprecas.' },
    { q: 'What happens at UK airport interview 2026?', a: 'At UK airport, immigration officers may ask about your course, university, accommodation, finances, and return plans. Questions include: Why this course? Where will you stay? How will you fund your studies? EEC\'s AI tool includes airport interview scenarios based on real questions asked at Heathrow, Gatwick, and Manchester airports for 2026.' },
    { q: 'How much bank balance is required for UK student visa 2026?', a: 'For UK student visa 2026: London universities require £1,334/month (£12,006 for 9 months) plus first year tuition. Outside London: £1,023/month (£9,207 for 9 months) plus tuition. Funds must be held 28 consecutive days before application. EEC\'s CA Madhav Gupta provides expert Source of Funds guidance for September 2026 & January 2027 intakes.' },
    { q: 'What is the difference between Pre-CAS and CAS interview 2026?', a: 'Pre-CAS interview happens BEFORE you receive your CAS, conducted by the university to assess credibility. CAS interview (or credibility interview by UKVI) may happen AFTER CAS issuance at visa application stage. Both assess genuine student intention for 2026. EEC prepares students for both scenarios.' },
    { q: 'Can UK student visa be rejected after CAS 2026?', a: 'Yes, UK visa can be rejected after CAS if: 1) Credibility concerns during interview 2) Insufficient funds 3) Document inconsistencies 4) Previous immigration history issues 5) Failure to demonstrate genuine student intention. EEC\'s 95%+ success rate comes from thorough preparation addressing all 2026 rejection reasons.' },
    { q: 'What questions are asked in UK Pre-CAS interview 2026?', a: 'UK Pre-CAS interview 2026 questions include: Why did you choose this course? Why UK over other countries? What are the course modules? Career plans after graduation? Who is funding your studies? Why this university? Have you researched living costs? Practice these with EEC\'s free AI tool for September 2026 intake.' },
    { q: 'Is IELTS 6.5 enough for UK student visa 2026?', a: 'IELTS 6.5 overall is generally sufficient for most UK postgraduate programs in 2026, but individual band requirements matter. Many universities need minimum 6.0 in each band. Some competitive programs require 7.0+. IELTS must be from UKVI-approved test centres. EEC offers IELTS coaching for 6.5+ bands at all 26 branches.' },
    { q: 'What is genuine student requirement for UK visa 2026?', a: 'Genuine student requirement for 2026 means UKVI must be satisfied you: 1) Intend to study the course 2) Have sufficient funds 3) Will leave UK after studies (unless applying for Graduate Route 2026) 4) Meet English requirements 5) Have genuine academic progression. EEC trains students to demonstrate genuine intention.' },
    { q: 'What is Graduate Route visa 2026?', a: 'Graduate Route 2026 allows 2 years UK work rights (3 years for PhD) after completing UK degree. No job offer required, any job at any level. Available after qualifying UK bachelors, masters, or doctoral degree. EEC provides complete Graduate Route planning as part of visa guidance for 2026.' },
    { q: 'What are UK intake dates 2026-2027?', a: 'UK university intake dates: September 2026 (main intake, apply by January-March 2026), January 2027 (limited courses, apply by October 2026). Some universities offer May intakes. Start Pre-CAS interview preparation 6 months before course start. EEC accepting applications now for September 2026.' },
];

// City-specific SEO metadata with LOCAL HYPER-RELEVANCE & 2026/2027 CONTENT
const cityTopicalClusters: Record<string, TopicalCluster> = {
    'Ahmedabad': {
        primaryKeyword: 'UK visa interview preparation Ahmedabad 2026',
        secondaryKeywords: [
            'IELTS coaching Ahmedabad 2026', 'study in UK from Ahmedabad September 2026', 'UK university admissions Ahmedabad January 2027',
            'Pre-CAS interview coaching Ahmedabad', 'student visa consultant Ahmedabad', 'UK visa consultant near me Ahmedabad 2026'
        ],
        lsiKeywords: [
            'credibility interview', 'CAS confirmation', 'Tier 4 student visa', 'UKVI requirements 2026',
            'maintenance funds UK 2026', 'genuine student test', 'English proficiency test', 'British Council', 'Points-Based System 2026', 'Home Office rules 2026', 'Graduate Route 2026'
        ],
        longTailKeywords: [
            'how to prepare for UK visa interview in Ahmedabad 2026',
            'best UK study abroad consultant near me Ahmedabad 2026',
            'UK Pre-CAS interview questions and answers 2026 Ahmedabad',
            'IELTS coaching centre near SG Highway Ahmedabad 2026',
            'UK student visa success rate Ahmedabad 2026',
            'September 2026 UK intake deadline Ahmedabad',
            'January 2027 UK intake Ahmedabad'
        ],
        localKeywords: [
            'Memnagar', 'Ghatlodiya', 'Chandkheda', 'Maninagar', 'Odhav', 'Nikol', 'Bapunagar', 'Naroda',
            'SG Highway', 'CG Road', 'Ashram Road', 'Satellite', 'Vastrapur', 'Navrangpura'
        ],
        description: 'Gujarat\'s commercial capital with 8 EEC branches offering comprehensive UK Pre-CAS interview preparation for September 2026 & January 2027 intakes. IELTS Academic coaching, Tier 4 student visa guidance, and British university admissions counseling. Expert credibility interview training with 95%+ success rate. Walk-in consultation available.',
        services: [
            'UK Pre-CAS Credibility Interview Coaching 2026',
            'IELTS Academic & General Training',
            'UK University Application & CAS Processing',
            'Tier 4 Student Visa Documentation',
            'Post-Study Work Visa (Graduate Route) Guidance',
            'Financial Documentation & SoF Preparation',
            'NHS Surcharge & IHS Guidance'
        ],
        faqs: [
            { q: 'Which is the best UK visa consultant in Ahmedabad 2026?', a: 'EEC with 8 branches across Ahmedabad (Memnagar, Ghatlodiya, Chandkheda, Maninagar, Odhav, Nikol, Bapunagar, Naroda) is Gujarat\'s largest and oldest UK study abroad consultant since 1997. AIRC certified till 2031, British Council certified, with 95%+ visa success rate. Walk-in consultation free for September 2026 & January 2027 intakes.' },
            { q: 'How much does UK visa coaching cost in Ahmedabad 2026?', a: 'EEC offers FREE AI-powered UK Pre-CAS interview preparation at ai.eecglobal.com/ukprecas. In-person coaching and comprehensive visa packages available at competitive rates. Walk-in consultation free at all 8 Ahmedabad branches for 2026 intakes.' },
            { q: 'What is the deadline for UK September 2026 intake from Ahmedabad?', a: 'For UK September 2026 intake, start applications by March-April 2026 for popular courses. CAS typically issued 6 months before course start. EEC Ahmedabad branches are currently accepting applications for 2026 - book free consultation now.' }
        ],
        paaQuestions: [
            { q: 'Which area in Ahmedabad has best UK visa consultant?', a: 'EEC has 8 branches strategically located across Ahmedabad: Memnagar (West), Ghatlodiya (North-West), Chandkheda (North), Maninagar (East), Odhav (East), Nikol (East), Bapunagar (East), and Naroda (North-East). All branches offer identical services with expert UK visa counselors.' }
        ]
    },
    'Vadodara': {
        primaryKeyword: 'UK visa interview preparation Vadodara 2026',
        secondaryKeywords: [
            'IELTS coaching Vadodara 2026', 'study in UK from Vadodara', 'UK university admissions Vadodara',
            'Pre-CAS interview coaching Baroda', 'student visa consultant Vadodara', 'EEC head office Vadodara'
        ],
        lsiKeywords: [
            'credibility interview preparation', 'CAS statement', 'Tier 4 visa requirements 2026', 'UKVI assessment',
            'source of funds', 'genuine student criteria', 'English language requirement', 'SELT approved test', 'Home Office UK'
        ],
        longTailKeywords: [
            'how to prepare for UK visa interview in Vadodara 2026',
            'best IELTS coaching in Alkapuri Vadodara',
            'UK Pre-CAS interview tips for Baroda students',
            'study abroad consultant near Sayajigunj Vadodara',
            'UK student visa process from Vadodara 2026',
            'EEC Vadodara contact number'
        ],
        localKeywords: [
            'Alkapuri', 'Nizampura', 'Manjalpur', 'New VIP Road', 'Sayajigunj', 'Fatehgunj',
            'Akota', 'Gotri', 'Vasna', 'Harni', 'Karelibaug', 'RC Dutt Road'
        ],
        description: 'EEC\'s headquarters city with 4 strategically located branches. Gujarat\'s most experienced UK visa interview coaching since 1997. Expert Pre-CAS credibility interview preparation for September 2026 & January 2027 UK intakes. IELTS Academic training, and comprehensive Tier 4 student visa guidance. Walk-in consultation available.',
        services: [
            'UK Pre-CAS Interview Masterclass 2026',
            'IELTS Academic Intensive Program',
            'Russell Group University Applications',
            'Tier 4 Visa Application Support',
            'Graduate Route (PSW) Planning',
            'UK Bank Statement & SoF Advisory',
            'NHS Surcharge Payment Guidance'
        ],
        faqs: [
            { q: 'Where is EEC head office in Vadodara?', a: 'EEC headquarters is at 3rd Floor, B-Wing, Windsor Plaza, RC Dutt Road, Alkapuri, Vadodara - 390007. Contact: +91-8000506539. Additional branches at Nizampura, Manjalpur, and New VIP Road. Walk-in consultation available Mon-Sat 8AM-9PM.' },
            { q: 'What is EEC\'s UK visa success rate in Vadodara 2026?', a: 'EEC Vadodara maintains 95%+ UK student visa success rate since 1997. Our expert counselors, including UK Embassy trained staff, ensure comprehensive Pre-CAS interview preparation and documentation for September 2026 and January 2027 intakes.' }
        ],
        paaQuestions: [
            { q: 'Is EEC Vadodara the headquarters?', a: 'Yes, EEC Vadodara Alkapuri is the founding branch and headquarters established in 1997. Address: 3rd Floor, B-Wing, Windsor Plaza, RC Dutt Road, Alkapuri. It houses the leadership team including MD Amit Jalan and Director CA Madhav Gupta.' }
        ]
    },
    'Surat': {
        primaryKeyword: 'UK visa interview preparation Surat 2026',
        secondaryKeywords: [
            'IELTS coaching Surat 2026', 'study in UK from Surat', 'UK university admissions Surat',
            'Pre-CAS interview coaching Surat', 'best study abroad consultant Surat'
        ],
        lsiKeywords: [
            'credibility test UK', 'CAS number', 'Tier 4 general visa', 'immigration interview',
            'tuition fee payment', 'living cost UK 2026', 'student accommodation UK', 'NHS surcharge 2026', 'IHS payment'
        ],
        longTailKeywords: [
            'how to crack UK visa interview in Surat 2026',
            'UK Pre-CAS interview preparation near Vesu Surat',
            'IELTS 7 band coaching Ghod Dod Road Surat',
            'study in UK consultants Varachha Surat',
            'UK student visa rejection reasons Surat'
        ],
        localKeywords: [
            'Parvat Patia', 'Dumbhal', 'Mota Varachha', 'Katargam', 'Ghod Dod Road', 'Vesu',
            'Adajan', 'City Light', 'Ring Road', 'Udhna', 'Athwa', 'Parle Point'
        ],
        description: 'South Gujarat\'s diamond city with 5 EEC branches serving aspiring UK students for September 2026 & January 2027 intakes. Expert UK Pre-CAS credibility interview coaching, IELTS Academic preparation for 6.5+ bands, and comprehensive Tier 4 student visa processing. Trusted by thousands since 1997. Walk-in consultation available.',
        services: [
            'UK Credibility Interview Coaching 2026',
            'IELTS 7+ Band Achievement Program',
            'UK Foundation & Pathway Programs',
            'Tier 4 Student Visa Processing',
            'UK Accommodation Guidance',
            'Pre-Departure Orientation',
            'NHS Surcharge & BRP Guidance'
        ],
        faqs: [
            { q: 'How many EEC branches are in Surat?', a: 'EEC has 5 branches in Surat: Parvat Patia (Dumbhal), Mota Varachha (Lajamni Chowk), Katargam (Gajera Road), Ghod Dod Road (Jade Blue), and Vesu (IFC). All branches offer UK Pre-CAS interview preparation and IELTS coaching.' },
            { q: 'Can I get UK visa guidance in Surat for September 2026 intake?', a: 'Yes! EEC Surat branches are accepting applications for September 2026 UK intake. Deadlines approaching for popular courses. Start your Pre-CAS interview preparation now with our free AI tool at ai.eecglobal.com/ukprecas. Walk-in for free consultation.' }
        ],
        paaQuestions: [
            { q: 'Which is cheapest UK visa consultant in Surat?', a: 'EEC offers FREE AI-powered UK Pre-CAS interview preparation at ai.eecglobal.com/ukprecas - no cost for unlimited practice. In-person consultation is also free at all 5 Surat branches. Comprehensive visa packages available at competitive rates with transparent pricing.' }
        ]
    },
    'Anand': {
        primaryKeyword: 'UK visa consultant Anand Gujarat 2026',
        secondaryKeywords: [
            'IELTS coaching Anand 2026', 'study abroad consultant Vallabh Vidyanagar',
            'UK university admissions Anand', 'Pre-CAS preparation Anand'
        ],
        lsiKeywords: [
            'UK student visa 2026', 'credibility assessment', 'CAS letter', 'UKVI interview',
            'maintenance requirement', 'genuine intention', 'course knowledge test'
        ],
        longTailKeywords: [
            'best UK visa consultant in Vallabh Vidyanagar 2026',
            'IELTS coaching near Sardar Patel University Anand',
            'study in UK from Anand Gujarat 2026'
        ],
        localKeywords: ['Vallabh Vidyanagar', 'VV Nagar', 'Karamsad', 'Sardar Patel University', 'GCET', 'BVM'],
        description: 'Serving the dairy capital of India and its vibrant student community at Vallabh Vidyanagar. Expert UK Pre-CAS interview preparation for engineering and management students applying for September 2026 & January 2027 UK intakes. IELTS coaching and comprehensive Tier 4 visa guidance. Walk-in consultation available.',
        services: ['UK Pre-CAS Interview Training 2026', 'IELTS Academic Coaching', 'UK Engineering University Applications', 'Tier 4 Visa Documentation', 'Student Loan Guidance'],
        faqs: [{ q: 'Is there EEC branch in Vallabh Vidyanagar?', a: 'Yes! EEC Vallabh Vidyanagar Anand is at 1st Floor, Sigma Prime Complex, Above Royal Enfield, Sardar Patel Statue Circle, Janta Road. Contact: +91-8758882884. Walk-in consultation available.' }],
        paaQuestions: []
    },
    'Nadiad': {
        primaryKeyword: 'UK visa consultant Nadiad 2026',
        secondaryKeywords: ['IELTS coaching Nadiad 2026', 'study abroad Nadiad Gujarat', 'UK student visa Nadiad'],
        lsiKeywords: ['credibility interview', 'Tier 4 visa 2026', 'CAS statement', 'UK university admission'],
        longTailKeywords: ['best UK study abroad consultant in Nadiad 2026', 'IELTS coaching centre College Road Nadiad'],
        localKeywords: ['College Road', 'Santram Road', 'Kheda district'],
        description: 'Central Gujarat\'s educational hub with expert UK Pre-CAS interview preparation for 2026 intakes. Serving students from Nadiad and Kheda district. Walk-in consultation available.',
        services: ['UK Pre-CAS Interview Coaching 2026', 'IELTS Preparation', 'UK Visa Guidance', 'University Applications'],
        faqs: [],
        paaQuestions: []
    },
    'Vapi': {
        primaryKeyword: 'UK visa consultant Vapi Gujarat 2026',
        secondaryKeywords: ['IELTS coaching Vapi 2026', 'study in UK from Vapi', 'UK student visa Silvassa'],
        lsiKeywords: ['UK credibility test', 'Tier 4 visa 2026', 'student visa interview', 'UKVI assessment'],
        longTailKeywords: ['best UK visa consultant near Vapi GIDC 2026', 'IELTS coaching Vapi Daman Road'],
        localKeywords: ['Daman Road', 'Daulat Nagar', 'Silvassa', 'Daman', 'GIDC'],
        description: 'South Gujarat industrial hub serving Vapi, Silvassa, and Daman region. Expert UK Pre-CAS interview coaching and Tier 4 student visa guidance for September 2026 & January 2027 intakes. Walk-in consultation available.',
        services: ['UK Pre-CAS Interview Prep 2026', 'IELTS Coaching', 'UK Visa Processing', 'University Admissions'],
        faqs: [],
        paaQuestions: []
    },
    'Navsari': {
        primaryKeyword: 'UK visa consultant Navsari 2026',
        secondaryKeywords: ['IELTS coaching Navsari 2026', 'study abroad Navsari', 'UK student visa Navsari'],
        lsiKeywords: ['credibility interview', 'Tier 4 visa', 'UK university'],
        longTailKeywords: ['best UK study abroad consultant Navsari Gujarat 2026'],
        localKeywords: ['Khumbharwad', 'Bilimora', 'Gandevi'],
        description: 'Serving Navsari and South Gujarat\'s region with expert UK Pre-CAS interview preparation for 2026 intakes. Walk-in consultation available.',
        services: ['UK Pre-CAS Interview Coaching 2026', 'IELTS Training', 'UK Visa Guidance'],
        faqs: [],
        paaQuestions: []
    },
    'Bharuch': {
        primaryKeyword: 'UK visa consultant Bharuch 2026',
        secondaryKeywords: ['IELTS coaching Bharuch 2026', 'study in UK Bharuch', 'UK student visa Ankleshwar'],
        lsiKeywords: ['Pre-CAS interview', 'credibility test', 'Tier 4 visa'],
        longTailKeywords: ['UK study abroad consultant Bharuch Gujarat 2026'],
        localKeywords: ['Station Road', 'Ankleshwar', 'Zadeshwar'],
        description: 'Ancient port city and petrochemical hub with expert UK Pre-CAS interview coaching for 2026 UK intakes. Serving Bharuch and Ankleshwar students. Walk-in consultation available.',
        services: ['UK Pre-CAS Interview Prep 2026', 'IELTS Coaching', 'UK University Admissions'],
        faqs: [],
        paaQuestions: []
    },
    'Kalol': {
        primaryKeyword: 'UK visa consultant Kalol Gujarat 2026',
        secondaryKeywords: ['IELTS coaching Kalol 2026', 'study abroad Kalol Gandhinagar'],
        lsiKeywords: ['UK student visa', 'Pre-CAS interview', 'credibility assessment'],
        longTailKeywords: ['UK study abroad consultant Kalol near Gandhinagar 2026'],
        localKeywords: ['Memon Market', 'Gandhinagar', 'Mehsana Road'],
        description: 'North Gujarat center serving Kalol and Gandhinagar students with UK Pre-CAS interview preparation for 2026 intakes. Walk-in consultation available.',
        services: ['UK Pre-CAS Interview Coaching 2026', 'IELTS Preparation', 'UK Visa Guidance'],
        faqs: [],
        paaQuestions: []
    },
    'Himatnagar': {
        primaryKeyword: 'UK visa consultant Himatnagar 2026',
        secondaryKeywords: ['IELTS coaching Himatnagar 2026', 'study abroad Sabarkantha'],
        lsiKeywords: ['UK student visa', 'credibility interview', 'Tier 4'],
        longTailKeywords: ['best UK study abroad consultant Himatnagar Sabarkantha 2026'],
        localKeywords: ['Post Office Road', 'Sabarkantha district', 'Shamlaji'],
        description: 'Sabarkantha district headquarters with expert UK Pre-CAS interview coaching for 2026 UK intakes. Walk-in consultation available.',
        services: ['UK Pre-CAS Interview Prep 2026', 'IELTS Coaching', 'UK Admissions'],
        faqs: [],
        paaQuestions: []
    },
    'Mehsana': {
        primaryKeyword: 'UK visa consultant Mehsana 2026',
        secondaryKeywords: ['IELTS coaching Mehsana 2026', 'study in UK Mehsana Gujarat'],
        lsiKeywords: ['Pre-CAS preparation', 'UK credibility interview', 'Tier 4 visa'],
        longTailKeywords: ['UK study abroad consultant Radhanpur Road Mehsana 2026'],
        localKeywords: ['Radhanpur Road', 'Modhera', 'Patan'],
        description: 'North Gujarat hub serving Mehsana district with comprehensive UK Pre-CAS interview preparation for September 2026 & January 2027 intakes. Walk-in consultation available.',
        services: ['UK Pre-CAS Interview Coaching 2026', 'IELTS Training', 'UK Visa Processing'],
        faqs: [],
        paaQuestions: []
    },
    'Visnagar': {
        primaryKeyword: 'UK visa consultant Visnagar 2026',
        secondaryKeywords: ['IELTS coaching Visnagar 2026', 'study abroad Visnagar Mehsana'],
        lsiKeywords: ['UK student visa', 'credibility test', 'Pre-CAS'],
        longTailKeywords: ['UK study abroad consultant Visnagar Gujarat 2026'],
        localKeywords: ['Kheralu Road', 'Unjha', 'Mehsana district'],
        description: 'Historic educational town with UK Pre-CAS interview preparation for 2026 intakes. Walk-in consultation available.',
        services: ['UK Pre-CAS Interview Prep 2026', 'IELTS Coaching'],
        faqs: [],
        paaQuestions: []
    }
};

function getPostalCode(city: string): string {
    const postalCodes: Record<string, string> = {
        'Ahmedabad': '380001', 'Vadodara': '390001', 'Surat': '395001',
        'Anand': '388001', 'Nadiad': '387001', 'Vapi': '396191',
        'Navsari': '396445', 'Bharuch': '392001', 'Kalol': '382721',
        'Himatnagar': '383001', 'Mehsana': '384001', 'Visnagar': '384315'
    };
    return postalCodes[city] || '380001';
}

// ══════════════════════════════════════════════════════════════════════════════
// 🏆 ENHANCED BRANCH CARD WITH REAL GOOGLE RATINGS & REVIEWS
// ══════════════════════════════════════════════════════════════════════════════

// Auto-scrolling reviews component
const ReviewsSlider: React.FC<{ reviews: string[]; branchName: string }> = ({ reviews, branchName }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    useEffect(() => {
        if (reviews.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % reviews.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [reviews.length]);
    
    if (!reviews || reviews.length === 0) return null;
    
    return (
        <div className="relative overflow-hidden h-16">
            {reviews.map((review, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 flex items-center transition-all duration-500 ${
                        index === currentIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                >
                    <div className="flex items-start gap-2 px-3 py-2 bg-amber-50/50 dark:bg-amber-900/20 rounded-lg">
                        <Quote className="w-3 h-3 text-amber-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-600 dark:text-slate-400 italic line-clamp-2">
                            "{review}"
                        </p>
                    </div>
                </div>
            ))}
            {/* Dots indicator */}
            <div className="absolute bottom-1 right-2 flex gap-1">
                {reviews.map((_, index) => (
                    <div
                        key={index}
                        className={`w-1 h-1 rounded-full transition-colors duration-300 ${
                            index === currentIndex ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

const BranchCard: React.FC<{ branch: Branch; cityName: string; cityCluster: TopicalCluster }> = ({ branch, cityName, cityCluster }) => {
    const branchSlug = generateBranchSlug(branch.name);
    const branchNameShort = branch.name.replace('EEC ', '');
    const [showAllContacts, setShowAllContacts] = useState(false);
    
    // Get timings display
    const getTimingsDisplay = () => {
        if (branch.timings.general) {
            return branch.timings.general;
        }
        return branch.timings.demoClass || '8AM - 9PM';
    };
    
    // Generate star rating display
    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        return (
            <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                            i < fullStars 
                                ? 'text-amber-400 fill-amber-400' 
                                : i === fullStars && hasHalfStar
                                    ? 'text-amber-400 fill-amber-400/50'
                                    : 'text-slate-300 dark:text-slate-600'
                        }`}
                    />
                ))}
            </div>
        );
    };
    
    // ENHANCED: Generate comprehensive structured data with REAL ratings
    const branchSchema = {
        "@context": "https://schema.org",
        "@type": ["EducationalOrganization", "LocalBusiness", "ProfessionalService"],
        "@id": `https://eecglobal.com/#branch-${branchSlug}`,
        "name": branch.name,
        "alternateName": [
            `${branchNameShort} Branch - UK Visa Interview Coaching 2026`,
            `EEC ${branchNameShort} - IELTS Coaching ${cityName}`,
            `UK Study Abroad Consultant ${branchNameShort} 2026`
        ],
        "description": `Expert UK Pre-CAS interview preparation for September 2026 & January 2027 intakes, IELTS coaching (6.5+ bands), and Tier 4 student visa guidance at EEC ${branchNameShort}. Walk-in consultation available. ${cityCluster.description}`,
        "url": "https://eecglobal.com",
        "telephone": branch.contactPoint[0]?.telephone || "+918758880170",
        "image": "https://ai.eecglobal.com/assets/logos/eeclogo-main.png",
        "priceRange": "₹₹",
        "currenciesAccepted": "INR",
        "paymentAccepted": "Cash, Card, UPI, Bank Transfer",
        "isAccessibleForFree": true,
        "publicAccess": true,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": branch.address.streetAddress,
            "addressLocality": cityName,
            "addressRegion": "Gujarat",
            "addressCountry": "IN",
            "postalCode": getPostalCode(cityName)
        },
        "geo": branch.geo ? {
            "@type": "GeoCoordinates",
            "latitude": branch.geo.latitude,
            "longitude": branch.geo.longitude
        } : undefined,
        "hasMap": branch.hasMap,
        "areaServed": {
            "@type": "GeoCircle",
            "geoMidpoint": branch.geo ? {
                "@type": "GeoCoordinates",
                "latitude": branch.geo.latitude,
                "longitude": branch.geo.longitude
            } : undefined,
            "geoRadius": "25000"
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "08:00",
            "closes": "21:00"
        },
        "parentOrganization": { "@id": "https://eecglobal.com/#organization" },
        // REAL Google Rating data
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": branch.googleRating.rating.toString(),
            "reviewCount": branch.googleRating.reviewCount.toString(),
            "bestRating": "5",
            "worstRating": "1"
        },
        "potentialAction": [
            {
                "@type": "ReserveAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": `https://wa.me/91${(branch.contactPoint[0]?.telephone || '8758880170').replace(/\D/g, '').slice(-10)}?text=Hi, I want to book a UK visa consultation at EEC ${branchNameShort}`,
                    "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
                },
                "result": {
                    "@type": "Reservation",
                    "name": "UK Visa Consultation Booking"
                }
            }
        ],
        "sameAs": [
            "https://www.facebook.com/eecglobal",
            "https://www.instagram.com/eecglobal",
            "https://www.linkedin.com/school/eecindia"
        ]
    };

    return (
        <article 
            className="group relative bg-white/90 dark:bg-[#161b22] backdrop-blur-sm p-6 rounded-2xl border border-slate-200/80 dark:border-[#30363d] transition-all duration-500 hover:border-indigo-400 dark:hover:border-indigo-500/60 hover:shadow-2xl hover:shadow-indigo-500/20 dark:hover:shadow-indigo-500/10 hover:-translate-y-2 overflow-hidden"
            itemScope 
            itemType="https://schema.org/LocalBusiness"
            id={`branch-${branchSlug}`}
            aria-labelledby={`branch-title-${branchSlug}`}
            data-date-modified="2026-01-16"
        >
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(branchSchema) }} />
            
            {/* Glow background */}
            {/* <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-indigo-500/5 group-hover:via-purple-500/5 group-hover:to-cyan-500/5 dark:group-hover:from-indigo-500/10 dark:group-hover:via-purple-500/10 dark:group-hover:to-cyan-500/10 transition-all duration-500" /> */}
            
            {/* Top gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Header with Branch Name and Google Rating */}
            <header className="flex items-start justify-between mb-4 relative">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                            <Building2 className="w-4 h-4 text-white" />
                        </div>
                        <h4 
                            id={`branch-title-${branchSlug}`}
                            className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                            itemProp="name"
                        >
                            {branchNameShort} Branch
                        </h4>
                    </div>
                    
                    {/* Badges */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/40 px-2.5 py-1 rounded-full">
                            <BadgeCheck className="w-3 h-3" />
                            <span>AIRC Certified</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/40 px-2.5 py-1 rounded-full">
                            <Users className="w-3 h-3" />
                            <span>Walk-in OK</span>
                        </span>
                    </div>
                </div>
                
                {/* REAL Google Rating */}
                <div className="flex flex-col items-end gap-1 p-3 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl border border-amber-200/50 dark:border-amber-700/30" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
                    <div className="flex items-center gap-1.5">
                        <span className="text-xl font-bold text-amber-600 dark:text-amber-400" itemProp="ratingValue">{branch.googleRating.rating}</span>
                        <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    </div>
                    <a 
                        href={branch.hasMap} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                        <span itemProp="reviewCount">{branch.googleRating.reviewCount.toLocaleString()}</span> Google reviews
                    </a>
                    <meta itemProp="bestRating" content="5" />
                </div>
            </header>
            
            {/* Address */}
            <address 
                className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed not-italic flex items-start gap-2"
                itemProp="address" 
                itemScope 
                itemType="https://schema.org/PostalAddress"
            >
                <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <span itemProp="streetAddress">{branch.address.streetAddress}</span>
                <meta itemProp="addressLocality" content={cityName} />
                <meta itemProp="addressRegion" content="Gujarat" />
                <meta itemProp="addressCountry" content="IN" />
            </address>
            
            {/* Timings */}
            <div className="mt-3 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <time itemProp="openingHours">{getTimingsDisplay()}</time>
                </span>
                <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{branch.timings.workingDays}</span>
                </span>
                <span className="text-rose-500 dark:text-rose-400 font-medium">
                    Closed: {branch.timings.closedOn}
                </span>
            </div>
            
            {/* Reviews Slider */}
            {branch.googleRating.topReviews && branch.googleRating.topReviews.length > 0 && (
                <div className="mt-4">
                    <ReviewsSlider reviews={branch.googleRating.topReviews} branchName={branch.name} />
                </div>
            )}
            
            {/* Contact Information - ALL NUMBERS */}
            <div className="mt-4 space-y-2">
                {branch.contactPoint.map((contact, index) => (
                    <div key={index} className="flex items-center justify-between text-sm bg-slate-50 dark:bg-slate-800/50 rounded-lg px-3 py-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 min-w-[100px]">
                                {contact.contactType.replace('Information', '')}:
                            </span>
                            <a 
                                href={`tel:${contact.telephone.replace(/\s/g, '')}`}
                                className="font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                itemProp="telephone"
                            >
                                {contact.telephone}
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            {contact.url && !contact.url.toLowerCase().includes('nan') && (
                                <a 
                                    href={contact.url.replace('Wa.Me', 'wa.me')} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="p-1.5 rounded-lg bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors"
                                    title="WhatsApp"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                </a>
                            )}
                            <a 
                                href={`tel:${contact.telephone.replace(/\s/g, '')}`}
                                className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800/50 transition-colors"
                                title="Call"
                            >
                                <Phone className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                ))}
                
                {/* Counselor Emails & Additional Phones - Show if available */}
                {branch.counselors && branch.counselors.length > 0 && branch.counselors.some(c => c.email && c.email.trim() !== '') && (
                    <details className="mt-2 bg-slate-50 dark:bg-slate-800/30 rounded-lg border border-slate-200 dark:border-slate-700/50 overflow-hidden">
                        <summary className="cursor-pointer select-none text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 flex items-center gap-2 px-3 py-2 transition-colors list-none [&::-webkit-details-marker]:hidden">
                            <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>Show {branch.counselors.filter(c => c.email && c.email.trim() !== '').length} email contacts & additional numbers</span>
                            <ChevronDown className="w-3.5 h-3.5 ml-auto transition-transform duration-200 group-open:rotate-180" />
                        </summary>
                        <div className="px-3 py-2 space-y-2 border-t border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50">
                            {branch.counselors.filter(c => c.email && c.email.trim() !== '').map((counselor, idx) => (
                                <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs">
                                    <a 
                                        href={`mailto:${counselor.email}`}
                                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline font-medium"
                                    >
                                        {counselor.email}
                                    </a>
                                    {counselor.phone && counselor.phone.trim() !== '' && (
                                        <a 
                                            href={`tel:+91${counselor.phone.replace(/\s/g, '')}`}
                                            className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1"
                                        >
                                            <Phone className="w-3 h-3" />
                                            +91 {counselor.phone}
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </details>
                )}
            </div>
            
            {/* Services Tags */}
            <div className="flex flex-wrap gap-2 mt-4" aria-label="Services offered">
                <span className="text-xs font-medium bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1.5 rounded-lg border border-indigo-100 dark:border-indigo-800/50">UK Pre-CAS 2026</span>
                <span className="text-xs font-medium bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 px-3 py-1.5 rounded-lg border border-purple-100 dark:border-purple-800/50">IELTS 6.5+</span>
                <span className="text-xs font-medium bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 text-teal-700 dark:text-teal-300 px-3 py-1.5 rounded-lg border border-teal-100 dark:border-teal-800/50">Tier 4 Visa</span>
                <span className="text-xs font-medium bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-700 dark:text-amber-300 px-3 py-1.5 rounded-lg border border-amber-100 dark:border-amber-800/50">Sept 2026</span>
            </div>
            
            {/* Action Buttons */}
            <nav className="mt-5 pt-5 border-t border-slate-200/80 dark:border-slate-700/50 flex flex-wrap gap-2" aria-label={`Contact ${branch.name}`}>
                <a 
                    href={branch.hasMap} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group/btn inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-gradient-to-r hover:from-teal-500 hover:to-cyan-500 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20"
                    aria-label={`Directions to ${branch.name}`}
                    itemProp="hasMap"
                >
                    <Navigation className="w-4 h-4 transition-transform duration-300 group-hover/btn:rotate-45" /> 
                    <span>Directions</span>
                </a>
                {branch.contactPoint[0]?.url && !branch.contactPoint[0].url.toLowerCase().includes('nan') && (
                    <a 
                        href={branch.contactPoint[0].url.replace('Wa.Me', 'wa.me')} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="group/btn inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30"
                        aria-label={`WhatsApp ${branch.name}`}
                    >
                        <MessageCircle className="w-4 h-4" /> 
                        <span>WhatsApp Now</span>
                    </a>
                )}
                <a 
                    href={`tel:${branch.contactPoint[0]?.telephone?.replace(/\s/g, '')}`} 
                    className="group/btn inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30"
                    aria-label={`Call ${branch.name}`}
                >
                    <Phone className="w-4 h-4" /> 
                    <span>Call Now</span>
                </a>
            </nav>
            
            <meta itemProp="image" content="https://ai.eecglobal.com/assets/logos/eeclogo-main.png" />
        </article>
    );
};

// City navigation button - Premium Dark Theme UI
const CityButton: React.FC<{ city: string; count: number; isSelected: boolean; onClick: () => void }> = ({ city, count, isSelected, onClick }) => {
    return (
        <li itemScope itemType="https://schema.org/City">
            <button 
                onClick={onClick}
                className={`group relative w-full text-left font-semibold px-4 py-3.5 rounded-xl transition-all duration-300 text-sm flex justify-between items-center overflow-hidden ${
                    isSelected 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/40' 
                        : 'bg-white/90 dark:bg-[#161b22] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-[#30363d] hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10'
                }`}
                aria-current={isSelected ? 'page' : undefined}
                aria-label={`${count} EEC branches in ${city} for UK visa interview coaching 2026`}
            >
                {/* Hover glow background */}
                {!isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-indigo-500/0 group-hover:from-indigo-500/5 group-hover:via-purple-500/5 group-hover:to-indigo-500/5 dark:group-hover:from-indigo-500/10 dark:group-hover:via-purple-500/10 dark:group-hover:to-indigo-500/10 transition-all duration-300" />
                )}
                <div className="relative flex items-center gap-2.5">
                    <MapPin className={`w-4 h-4 transition-all duration-300 ${isSelected ? 'text-white' : 'text-slate-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400'} group-hover:scale-110`} />
                    <span itemProp="name">{city}</span>
            </div>
                <span className={`relative text-xs font-bold px-2.5 py-1 rounded-lg transition-all duration-300 ${
                    isSelected 
                        ? 'bg-white/20 text-white' 
                        : 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/60'
                }`}>
                    {count}
                </span>
            </button>
        </li>
    );
};

// ══════════════════════════════════════════════════════════════════════════════
// 🚀 MAIN BRANCH LOCATOR COMPONENT WITH ALL 25 SEO FIXES
// ══════════════════════════════════════════════════════════════════════════════

export const BranchLocator: React.FC = () => {
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    const groupedBranches = useMemo((): GroupedBranches => {
        const groups: GroupedBranches = {};
        BRANCH_DATA.forEach(branch => {
            const city = normalizeCityName(branch);
            if (!groups[city]) groups[city] = [];
            groups[city].push(branch);
        });
        const sortedKeys = Object.keys(groups).sort((a, b) => groups[b].length - groups[a].length);
        return sortedKeys.reduce((acc, key) => { acc[key] = groups[key]; return acc; }, {} as GroupedBranches);
    }, []);

    const cities = useMemo(() => Object.keys(groupedBranches), [groupedBranches]);
    const totalBranches = useMemo(() => BRANCH_DATA.length, []);

    useEffect(() => {
        if (cities.length > 0 && !selectedCity) setSelectedCity(cities[0]);
    }, [cities, selectedCity]);

    const currentCluster = selectedCity ? (cityTopicalClusters[selectedCity] || cityTopicalClusters['Ahmedabad']) : cityTopicalClusters['Ahmedabad'];

    // MASTER SEO SCHEMA with REAL Google Ratings Data
    const masterSeoSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "ItemList",
                "@id": "https://ai.eecglobal.com/ukprecas/#branch-network-silo",
                "name": "EEC UK Visa Interview Coaching Network - Gujarat 2026",
                "description": `India's largest UK study abroad consultancy network with ${BRANCH_STATS.totalBranches} branches across ${BRANCH_STATS.totalCities} Gujarat cities. ${BRANCH_STATS.totalReviews.toLocaleString()}+ Google reviews with ${BRANCH_STATS.averageRating}★ average rating. Expert UK Pre-CAS credibility interview preparation for September 2026 & January 2027 intakes. AIRC certified till 2031. Walk-in consultation available.`,
                "numberOfItems": BRANCH_STATS.totalBranches,
                // REAL Statistics from Google Maps (December 2024)
                "additionalProperty": [
                    { "@type": "PropertyValue", "name": "Total Branches", "value": BRANCH_STATS.totalBranches },
                    { "@type": "PropertyValue", "name": "Cities Covered", "value": BRANCH_STATS.totalCities },
                    { "@type": "PropertyValue", "name": "Total Google Reviews", "value": BRANCH_STATS.totalReviews },
                    { "@type": "PropertyValue", "name": "Average Google Rating", "value": BRANCH_STATS.averageRating },
                    { "@type": "PropertyValue", "name": "Years Experience", "value": BRANCH_STATS.yearsExperience },
                    { "@type": "PropertyValue", "name": "Since", "value": BRANCH_STATS.since },
                    { "@type": "PropertyValue", "name": "Success Rate", "value": "95%+" }
                ],
                "itemListElement": cities.map((city, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "name": `UK Visa Interview Coaching in ${city} 2026`,
                    "url": `https://ai.eecglobal.com/ukprecas/#${generateCitySlug(city)}`,
                    "description": cityTopicalClusters[city]?.description || `UK Pre-CAS interview preparation for September 2026 & January 2027 intakes in ${city}`
                }))
            },
            {
                "@type": "Service",
                "@id": "https://ai.eecglobal.com/ukprecas/#uk-precas-service-2026",
                "name": "UK Pre-CAS Credibility Interview Preparation 2026",
                "alternateName": ["UK Visa Interview Coaching 2026", "CAS Shield Interview Training", "UKVI Credibility Test Prep", "UK Airport Interview Practice"],
                "serviceType": ["Educational Consulting", "Visa Consulting", "Test Preparation"],
                "provider": { "@id": "https://eecglobal.com/#organization" },
                "areaServed": cities.map(city => ({ "@type": "City", "name": city, "containedInPlace": { "@type": "State", "name": "Gujarat" } })),
                // CRITICAL FIX #19: InteractionCounter
                "interactionStatistic": [
                    { "@type": "InteractionCounter", "interactionType": "https://schema.org/UseAction", "userInteractionCount": 25000, "description": "Mock interviews completed" },
                    { "@type": "InteractionCounter", "interactionType": "https://schema.org/FollowAction", "userInteractionCount": 15000, "description": "Students registered" },
                    { "@type": "InteractionCounter", "interactionType": "https://schema.org/LikeAction", "userInteractionCount": 3500, "description": "5-star reviews" }
                ],
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "UK Study Abroad Services 2026",
                    "itemListElement": [
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "UK Pre-CAS Interview Preparation", "description": "AI-powered mock interviews with instant feedback for UK student visa credibility interview - September 2026 & January 2027 intakes" }, "price": "0", "priceCurrency": "INR", "priceValidUntil": "2027-12-31" },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "IELTS Academic Coaching", "description": "Expert IELTS preparation for 6.5+ band scores required for UK universities" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "UK University Admissions", "description": "Complete guidance for Russell Group, Top 100 UK university applications" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Tier 4 Visa Processing", "description": "End-to-end UK student visa application support with 95%+ success rate" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Graduate Route Planning", "description": "Post-Study Work Visa (PSW) guidance for 2-year UK work rights" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "NHS Surcharge Guidance", "description": "Immigration Health Surcharge (IHS) payment assistance" } }
                    ]
                },
                "availableChannel": {
                    "@type": "ServiceChannel",
                    "serviceUrl": "https://ai.eecglobal.com/ukprecas/",
                    "servicePhone": "+918758880170",
                    "availableLanguage": ["English", "Hindi", "Gujarati"]
                }
            },
            {
                "@type": "WebSite",
                "@id": "https://courses.eecglobal.com/united-kingdom/#course-search",
                "name": "EEC UK Course Search - 40,000+ UK Courses",
                "url": "https://courses.eecglobal.com/united-kingdom",
                "description": "Search 40,000+ courses at UK universities for September 2026 & January 2027 intakes. Compare Russell Group programs, fees, entry requirements, and IELTS scores.",
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://courses.eecglobal.com/united-kingdom?q={search_term}",
                    "query-input": "required name=search_term"
                }
            },
            {
                "@type": "SoftwareApplication",
                "@id": "https://ptetestindia.com/#pte-voucher",
                "name": "PTE Discounted Vouchers India - Authorized Pearson Reseller",
                "description": "Authorized Pearson reseller. PTE voucher at ₹15,300 (save ₹2,700). Includes FREE Premium PTE Software + 60 Mock Tests. Valid for PTE Academic, PTE Core (Canada PR), PTE UKVI. Essential for UK visa English requirement.",
                "url": "https://ptetestindia.com",
                "applicationCategory": "EducationalApplication",
                "offers": {
                    "@type": "Offer",
                    "price": "15300",
                    "priceCurrency": "INR",
                    "availability": "https://schema.org/InStock"
                },
                "provider": { "@id": "https://eecglobal.com/#organization" }
            },
            {
                "@type": "SoftwareApplication",
                "@id": "https://t.me/eecieltsbot/#ielts-bot",
                "name": "EEC IELTS AI Practice Bot - FREE 24x7",
                "description": "Free IELTS AI bot on Telegram. Unlimited 24x7 Speaking, Writing Task 2 & GT letters practice with instant AI scoring. No login required. Ideal for UK visa IELTS preparation.",
                "url": "https://t.me/eecieltsbot",
                "applicationCategory": "EducationalApplication",
                "operatingSystem": "Telegram",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "INR"
                },
                "provider": { "@id": "https://eecglobal.com/#organization" }
            }
        ]
    };

    return (
        <section 
            className="relative mt-16 py-16 bg-gradient-to-b from-slate-50 via-slate-100/50 to-white dark:from-[#0d1117] dark:via-[#161b22]/50 dark:to-[#0d1117] rounded-3xl border border-slate-200/50 dark:border-[#30363d] overflow-hidden"
            id="eec-branches"
            aria-labelledby="branch-locator-title"
            itemScope
            itemType="https://schema.org/Organization"
            data-date-modified="2026-01-16"
        >
            {/* Ambient glow background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 dark:bg-indigo-500/3 rounded-full blur-[150px] animate-pulse-slow animation-delay-4000" />
            </div>
            
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(masterSeoSchema) }} />
            
            <div className="relative max-w-6xl mx-auto px-4">
                {/* 🚨 URGENT ANNOUNCEMENT - September 2026 & January 2027 Intakes */}
                <div className="mb-8 p-5 bg-gradient-to-r from-rose-50/80 via-orange-50/80 to-amber-50/80 dark:from-rose-950/40 dark:via-orange-950/40 dark:to-amber-950/40 backdrop-blur-sm rounded-2xl border border-rose-200/50 dark:border-rose-800/50 shadow-xl shadow-rose-500/10 key-fact animate-fade-in" data-speakable="true">
                    <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 p-3 bg-gradient-to-br from-rose-500 to-orange-500 rounded-xl shadow-lg shadow-rose-500/30 animate-pulse">
                            <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="font-bold text-rose-700 dark:text-rose-300 text-base flex items-center gap-2">
                                <Sparkles className="w-4 h-4 animate-pulse" />
                                UK September 2026 & January 2027 Intake Applications Open!
                            </p>
                            <p className="text-sm text-rose-600/80 dark:text-rose-400/80 mt-1">Start your UK Pre-CAS interview preparation now. Walk-in for free consultation at any EEC branch.</p>
                        </div>
                    </div>
                </div>

                {/* SEO HEADER with 2026 targeting */}
                <header className="text-center mb-10">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/30 dark:to-teal-900/30 border border-blue-200/50 dark:border-blue-700/50 mb-6 animate-fade-in">
                        <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">{totalBranches} Branches • {cities.length} Cities</span>
                    </div>
                    
                    <h2 
                        id="branch-locator-title"
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight key-fact animate-fade-in-up"
                        data-speakable="true"
                    >
                        <span className="text-slate-900 dark:text-white">Connect with </span>
                        <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">EEC Branches</span>
                    </h2>
                    <p className="text-center text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-3xl mx-auto leading-relaxed faq-answer animate-fade-in-up" data-speakable="true" style={{ animationDelay: '0.1s' }}>
                        <strong className="text-slate-900 dark:text-white">{totalBranches} UK visa interview coaching centers</strong> across <strong className="text-slate-900 dark:text-white">{cities.length} Gujarat cities</strong>. 
                        Expert <strong className="text-blue-600 dark:text-blue-400">Pre-CAS credibility interview preparation</strong> for <strong className="text-teal-600 dark:text-teal-400">September 2026 & January 2027 UK intakes</strong>. 
                        AIRC certified till 2031. <strong className="text-emerald-600 dark:text-emerald-400">Walk-in consultation available</strong>.
                    </p>
                    
                    {/* TRUST SIGNALS */}
                    <div className="flex flex-wrap justify-center items-center gap-3 mt-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-700/50">
                            <BadgeCheck className="w-3.5 h-3.5" /> AIRC Certified 2031
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/50">
                            <BadgeCheck className="w-3.5 h-3.5" /> British Council
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border border-purple-200/50 dark:border-purple-700/50">
                            <BadgeCheck className="w-3.5 h-3.5" /> UK Embassy Trained
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/30">
                            <TrendingUp className="w-3.5 h-3.5" /> 95%+ Success
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30">
                            <Users className="w-3.5 h-3.5" /> 50,000+ Students
                        </span>
                    </div>
                    
                    {/* PRIMARY CTA */}
                    <div className="mt-8 flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <a 
                            href="tel:+918758880170"
                            className="group relative inline-flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                            <Phone className="w-4 h-4 relative transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" /> 
                            <span className="relative">+91 875 888 0170</span>
                        </a>
                        <a 
                            href="https://wa.me/918758880170"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:-translate-y-0.5 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                            <MessageCircle className="w-4 h-4 relative transition-transform duration-300 group-hover:scale-110" /> 
                            <span className="relative">WhatsApp Now</span>
                        </a>
                    </div>
                </header>

                {/* UK COURSE SEARCH INTEGRATION - Premium Dark Theme */}
                <div className="group mb-8 p-5 bg-white dark:bg-[#161b22] rounded-2xl border border-slate-200 dark:border-[#30363d] hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 overflow-hidden relative">
                    {/* Background glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-indigo-500/5 group-hover:via-purple-500/5 group-hover:to-cyan-500/5 dark:group-hover:from-indigo-500/10 dark:group-hover:via-purple-500/10 dark:group-hover:to-cyan-500/10 transition-all duration-300" />
                    <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/30 transition-transform duration-300 group-hover:scale-110">
                                <Search className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white text-base">Search 40,000+ UK Courses for 2026/2027</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Compare UK universities, fees, entry requirements & IELTS scores</p>
                            </div>
                        </div>
                        <a 
                            href="https://courses.eecglobal.com/united-kingdom"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn relative inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 text-sm whitespace-nowrap shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                            <BookOpen className="w-4 h-4 relative" />
                            <span className="relative">Search UK Courses</span>
                            <ArrowRight className="w-4 h-4 relative transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </a>
                    </div>
                </div>
                
                {/* BRANCH LOCATOR GRID */}
                <div className="grid md:grid-cols-12 gap-6 min-h-[50vh]">
                    {/* CITY SIDEBAR - Premium Dark Theme */}
                    <aside className="md:col-span-4 lg:col-span-3">
                        <nav className="p-4 bg-white/90 dark:bg-[#161b22] backdrop-blur-sm rounded-2xl border border-slate-200/80 dark:border-[#30363d] sticky top-6 shadow-sm">
                            <h3 className="font-bold p-2 text-slate-900 dark:text-white text-sm flex items-center gap-2.5 mb-3">
                                <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
                                    <MapPin className="w-3.5 h-3.5 text-white" />
                                </div>
                                UK Visa Coaching Locations
                            </h3>
                            <ul className="space-y-2" role="list">
                                {cities.map(city => (
                                    <CityButton
                                        key={city}
                                        city={city}
                                        count={groupedBranches[city].length}
                                        isSelected={selectedCity === city}
                                            onClick={() => setSelectedCity(city)}
                                    />
                                ))}
                            </ul>
                            
                            {/* QUICK STATS with REAL Data - Premium styling */}
                            <div className="mt-5 pt-5 border-t border-slate-200/80 dark:border-[#30363d] space-y-2 text-xs">
                                <p className="flex justify-between text-slate-600 dark:text-slate-400"><span>Total Branches:</span> <strong className="text-slate-900 dark:text-white">{BRANCH_STATS.totalBranches}</strong></p>
                                <p className="flex justify-between text-slate-600 dark:text-slate-400"><span>Cities:</span> <strong className="text-slate-900 dark:text-white">{BRANCH_STATS.totalCities}</strong></p>
                                <p className="flex justify-between text-slate-600 dark:text-slate-400"><span>Total Reviews:</span> <strong className="text-amber-600 dark:text-amber-400">{BRANCH_STATS.totalReviews.toLocaleString()}+</strong></p>
                                <p className="flex justify-between text-slate-600 dark:text-slate-400"><span>Avg Rating:</span> <strong className="text-amber-600 dark:text-amber-400">{BRANCH_STATS.averageRating}★</strong></p>
                                <p className="flex justify-between text-slate-600 dark:text-slate-400"><span>Since:</span> <strong className="text-slate-900 dark:text-white">{BRANCH_STATS.since}</strong></p>
                                <p className="flex justify-between text-slate-600 dark:text-slate-400"><span>Experience:</span> <strong className="text-indigo-600 dark:text-indigo-400">{BRANCH_STATS.yearsExperience}+ Years</strong></p>
                                <p className="flex justify-between text-slate-600 dark:text-slate-400"><span>Success Rate:</span> <strong className="text-emerald-600 dark:text-emerald-400">95%+</strong></p>
                        </div>
                        </nav>
                    </aside>
                    
                    {/* BRANCH CARDS */}
                    <main className="md:col-span-8 lg:col-span-9" role="region" aria-live="polite">
                        {selectedCity && (
                            <>
                                {/* CITY HEADER - Premium Dark Theme */}
                                <div className="mb-6 p-5 bg-white dark:bg-[#161b22] rounded-2xl border border-slate-200 dark:border-[#30363d]">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3 key-fact" data-speakable="true">
                                        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/30">
                                            <MapPin className="w-4 h-4 text-white" />
                                        </div>
                                        <span>UK Visa Interview Coaching in {selectedCity} - 2026</span>
                                        <span className="ml-2 text-sm font-semibold px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
                                            {groupedBranches[selectedCity].length} {groupedBranches[selectedCity].length === 1 ? 'branch' : 'branches'}
                                        </span>
                                    </h3>
                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed faq-answer" data-speakable="true">
                                        {currentCluster.description}
                                    </p>
                                    
                                    {/* LOCAL LSI KEYWORDS */}
                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                        {currentCluster.localKeywords.slice(0, 6).map((kw, i) => (
                                            <span key={i} className="text-xs bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded">{kw}</span>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* BRANCH CARDS */}
                                <div className="space-y-4">
                                {groupedBranches[selectedCity].map(branch => (
                                        <BranchCard 
                                            key={branch.identifier} 
                                            branch={branch} 
                                            cityName={selectedCity}
                                            cityCluster={currentCluster}
                                        />
                                ))}
                            </div>
                                
                                {/* CITY-SPECIFIC FAQ */}
                                {currentCluster.faqs.length > 0 && (
                                    <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                                        <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 text-sm">Frequently Asked Questions - {selectedCity}</h4>
                                        <dl className="space-y-3 text-sm" itemScope itemType="https://schema.org/FAQPage">
                                            {currentCluster.faqs.map((faq, i) => (
                                                <div key={i} itemScope itemType="https://schema.org/Question" itemProp="mainEntity">
                                                    <dt className="font-medium text-slate-700 dark:text-slate-300 key-fact" itemProp="name" data-speakable="true">{faq.q}</dt>
                                                    <dd className="mt-1 text-slate-600 dark:text-slate-400 pl-4 border-l-2 border-amber-300 dark:border-amber-700 faq-answer" itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer" data-speakable="true">
                                                        <span itemProp="text">{faq.a}</span>
                                                    </dd>
                                                </div>
                                            ))}
                                        </dl>
                                    </div>
                                )}
                            </>
                        )}
                    </main>
                </div>

                {/* ══════════════════════════════════════════════════════════════════════════ */}
                {/* 🔥 PEOPLE ALSO ASK - Featured Snippet Targeting */}
                {/* ══════════════════════════════════════════════════════════════════════════ */}
                <div className="mt-10 pt-8 border-t border-slate-300/60 dark:border-gray-700/60">
                    <h3 className="text-center text-xl font-bold text-slate-800 dark:text-gray-100 mb-2">People Also Ask About UK Visa Interview 2026</h3>
                    <p className="text-center text-sm text-slate-600 dark:text-slate-400 mb-6">Common questions about UK Pre-CAS interview, CAS Shield, and airport interview</p>
                    
                    <div className="grid md:grid-cols-2 gap-4" itemScope itemType="https://schema.org/FAQPage">
                        {globalPAAQuestions.slice(0, 6).map((paa, i) => (
                            <details key={i} className="bg-white dark:bg-gray-800/50 rounded-lg border border-slate-200 dark:border-gray-700 overflow-hidden group">
                                <summary 
                                    className="p-4 cursor-pointer font-medium text-slate-700 dark:text-slate-200 text-sm hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors key-fact"
                                    itemScope 
                                    itemType="https://schema.org/Question" 
                                    itemProp="mainEntity"
                                    data-speakable="true"
                                >
                                    <span itemProp="name">{paa.q}</span>
                                </summary>
                                <div 
                                    className="px-4 pb-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed faq-answer"
                                    itemScope 
                                    itemType="https://schema.org/Answer" 
                                    itemProp="acceptedAnswer"
                                    data-speakable="true"
                                >
                                    <span itemProp="text">{paa.a}</span>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>

                {/* AI TOOLS SHOWCASE */}
                <div className="mt-10 pt-8 border-t border-slate-300/60 dark:border-gray-700/60">
                    <h3 className="text-center text-xl font-bold text-slate-800 dark:text-gray-100 mb-2">Free AI-Powered Study Abroad Tools</h3>
                    <p className="text-center text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
                        India's first 100% free AI tools for visa interview preparation. <strong>25,000+ mock interviews completed</strong>.
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {[
                            { name: 'UK Pre-CAS 2026', url: 'https://ai.eecglobal.com/ukprecas', icon: '🇬🇧', active: true },
                            { name: 'USA F-1 Visa Prep', url: 'https://ai.eecglobal.com/usavisaprep', icon: '🇺🇸' },
                            { name: 'Australia GS Prep', url: 'https://ai.eecglobal.com/australiagsprep', icon: '🇦🇺' },
                            { name: 'Germany Visa Prep', url: 'https://ai.eecglobal.com/germanyvisaprep', icon: '🇩🇪' },
                            { name: 'NZ Visa Prep', url: 'https://ai.eecglobal.com/nzvisaprep', icon: '🇳🇿' },
                            { name: 'Career Counselor', url: 'https://ai.eecglobal.com/careercounselor', icon: '🎯' },
                            { name: 'Travel Agent', url: 'https://ai.eecglobal.com/travelagent', icon: '✈️' },
                            { name: 'UK Courses 2026', url: 'https://courses.eecglobal.com/united-kingdom', icon: '📚' },
                            { name: 'PTE Voucher ₹15,300', url: 'https://ptetestindia.com', icon: '📝', highlight: true },
                            { name: 'IELTS AI FREE', url: 'https://t.me/eecieltsbot', icon: '🤖', highlight: true },
                            { name: 'Australia PR Calc', url: 'https://australia.eecglobal.com/prpointscalculator', icon: '🧮' },
                            { name: 'All AI Tools', url: 'https://ai.eecglobal.com', icon: '🤖' },
                        ].map((tool, i) => (
                            <a 
                                key={i}
                                href={tool.url}
                                target={tool.active ? '_self' : '_blank'}
                                rel={tool.active ? undefined : 'noopener noreferrer'}
                                className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition-all text-center ${
                                    tool.active 
                                        ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700' 
                                        : 'bg-white dark:bg-gray-800/50 border-slate-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600'
                                }`}
                            >
                                <span className="text-2xl">{tool.icon}</span>
                                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{tool.name}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* BOTTOM CTA */}
                <footer className="mt-10 pt-6 border-t border-slate-300/60 dark:border-gray-700/60 text-center">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-gray-100 mb-2">
                        Can't visit a branch? Practice online FREE!
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 max-w-xl mx-auto faq-answer" data-speakable="true">
                        Use our <strong>AI-powered UK Pre-CAS Interview Prep tool</strong> from anywhere. 
                        <strong>25,000+ mock interviews completed</strong>. Unlimited practice, instant AI feedback - completely free.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <a 
                            href="https://ai.eecglobal.com/ukprecas/"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg text-sm"
                        >
                            🤖 Start Free AI Interview Prep
                        </a>
                        <a 
                            href="https://courses.eecglobal.com/united-kingdom"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold rounded-lg transition-colors text-sm"
                        >
                            <GlobeIcon /> Search 40,000+ UK Courses
                        </a>
                    </div>
                </footer>

                {/* HIDDEN SEMANTIC SEO CONTENT with 2026/2026 and UKVI terminology */}
                <div className="sr-only" aria-hidden="true">
                    <h4>UK Pre-CAS Interview Preparation Gujarat 2026</h4>
                    <p>
                        EEC provides expert UK Pre-CAS credibility interview coaching for September 2026 and January 2027 UK intakes across Gujarat with branches in 
                        Ahmedabad, Vadodara, Surat, Anand, Nadiad, Vapi, Navsari, Bharuch, Kalol, Himatnagar, Mehsana, and Visnagar.
                        Our services include UK student visa interview preparation, IELTS Academic coaching for 6.5+ bands,
                        Tier 4 student visa processing, CAS confirmation guidance, CAS Shield interview training, UK airport interview preparation,
                        UK university admissions counseling, source of funds documentation, maintenance funds calculation £1,334 London £1,023 outside London,
                        genuine student test preparation, UKVI Home Office Points-Based System guidance,
                        British Council certified training, Post-Study Work Visa guidance, Graduate Route planning 2-year UK work rights,
                        NHS surcharge IHS payment guidance, BRP collection guidance, and comprehensive UK study abroad consulting.
                        Walk-in consultation available at all 26 branches. 50,000+ students helped. 95%+ visa success rate. 25,000+ mock interviews completed.
                    </p>
                    <p>
                        Keywords 2026: UK visa interview preparation 2026, Pre-CAS interview coaching September 2026, credibility interview training January 2026,
                        IELTS coaching Gujarat 2026, Tier 4 student visa 2026, UK university admissions September 2026, study in UK from India 2026,
                        UK visa consultant Ahmedabad 2026, UK visa consultant Vadodara 2026, UK visa consultant Surat 2026,
                        best IELTS coaching centre Gujarat 2026, UK student visa success rate 2026, how to prepare for UK visa interview 2026,
                        UK Pre-CAS interview questions and answers 2026, CAS Shield interview preparation, UK airport interview questions,
                        CAS statement preparation, UKVI interview assessment, Home Office Points-Based System,
                        UK visa application process India 2026, Graduate Route visa UK 2026, Post-Study Work visa UK,
                        UK maintenance funds requirement 2026, source of funds UK visa, genuine student requirement UK,
                        NHS surcharge 2026, IHS payment UK, British Council certified agent India, AIRC certified education consultant 2031, UK Embassy trained consultant.
                    </p>
                </div>
            </div>
        </section>
    );
};
