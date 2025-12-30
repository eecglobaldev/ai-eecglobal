import React from 'react';

// LSI Keywords integrated throughout for semantic SEO
const LSI_TERMS = {
    visa: ['student visa', 'F-1 visa', 'non-immigrant visa', 'visa interview', 'visa approval', 'visa officer', 'consular interview', 'DS-160', 'SEVIS', 'I-20', 'visa stamping'],
    study: ['study abroad', 'overseas education', 'foreign education', 'international student', 'US universities', 'American colleges', 'higher education USA'],
    refusal: ['214(b)', 'visa denial', 'visa rejection', 'refused visa', 'visa refusal recovery', 'reapplication', 'administrative processing'],
    financial: ['proof of funds', 'bank statement', 'financial documentation', 'sponsor letter', 'education loan', 'I-134', 'affidavit of support'],
    tests: ['IELTS', 'TOEFL', 'GRE', 'GMAT', 'SAT', 'Duolingo', 'English proficiency test', 'standardized tests'],
    locations: ['Gujarat', 'Vadodara', 'Ahmedabad', 'Surat', 'Rajkot', 'Bharuch', 'Anand', 'Nadiad', 'Vapi', 'Navsari', 'Mehsana', 'Kalol']
};

// Topical Cluster: City-specific F-1 Visa Content (Local Hyper-Relevance)
const CITY_CONTENT: Record<string, {
    name: string;
    branches: number;
    highlights: string[];
    longTail: string[];
}> = {
    vadodara: {
        name: 'Vadodara',
        branches: 4,
        highlights: [
            'Home to EEC headquarters since 1997',
            '4 branches: Alkapuri, Nizampura, Manjalpur, New VIP Road',
            'Closest to US Consulate Mumbai for visa appointments'
        ],
        longTail: [
            'F-1 visa consultant in Vadodara',
            'USA student visa help Baroda',
            'Best study abroad consultant Vadodara',
            '214(b) refusal recovery Vadodara'
        ]
    },
    ahmedabad: {
        name: 'Ahmedabad',
        branches: 8,
        highlights: [
            'Largest network with 8 branches across the city',
            'Serving students from Memnagar, Ghatlodiya, Chandkheda, Maninagar, Odhav, Nikol, Bapunagar, Naroda',
            'Direct connectivity to US Consulate Mumbai'
        ],
        longTail: [
            'F-1 visa preparation Ahmedabad',
            'USA visa consultant Ahmedabad',
            'Study in USA from Ahmedabad',
            'IELTS TOEFL coaching Ahmedabad'
        ]
    },
    surat: {
        name: 'Surat',
        branches: 5,
        highlights: [
            '5 strategic branches covering all major areas',
            'Serving Parvat Patia, Mota Varachha, Katargam, Ghod Dod Road, Vesu',
            'High success rate for diamond and textile family visa cases'
        ],
        longTail: [
            'USA visa consultant Surat',
            'F-1 visa interview prep Surat',
            'Study abroad counseling Surat',
            'GRE GMAT preparation Surat'
        ]
    },
    northGujarat: {
        name: 'North Gujarat',
        branches: 5,
        highlights: [
            'Covering Mehsana, Kalol, Himatnagar, Visnagar regions',
            'Specialized service for first-generation study abroad families',
            'Local language support in Gujarati and Hindi'
        ],
        longTail: [
            'USA visa help Mehsana',
            'Study abroad consultant North Gujarat',
            'F-1 visa preparation Kalol',
            'Student visa guidance Himatnagar'
        ]
    }
};

// Topical Cluster: F-1 Visa Process Silos
const TOPIC_SILOS = [
    {
        id: 'visa-interview-prep',
        title: 'F-1 Visa Interview Preparation',
        icon: '🎯',
        description: 'Comprehensive preparation for your US student visa interview at the consulate',
        subtopics: [
            { name: 'Common Visa Interview Questions', keywords: ['why USA', 'why this university', 'future plans', 'ties to India'] },
            { name: 'Non-Immigrant Intent Strategy', keywords: ['strong ties to India', 'return plans', 'career goals', 'family business'] },
            { name: 'Financial Documentation', keywords: ['bank statements', 'CA certificate', 'ITR', 'loan sanction letter'] },
            { name: 'DS-160 Form Guidance', keywords: ['online form', 'travel history', 'background check', 'photo requirements'] }
        ]
    },
    {
        id: '214b-refusal',
        title: '214(b) Visa Refusal Recovery',
        icon: '🔄',
        description: 'Expert guidance for students who have faced visa denial under Section 214(b)',
        subtopics: [
            { name: 'Understanding 214(b)', keywords: ['visa denial', 'refusal reasons', 'non-immigrant intent', 'presumption of immigrant intent'] },
            { name: 'Financial Restructuring', keywords: ['CA Madhav Gupta', 'proof of funds', 'sponsor documentation', 'loan restructuring'] },
            { name: 'Interview Strategy Revision', keywords: ['stronger ties', 'career plan clarity', 'university justification', 'return intent'] },
            { name: 'Reapplication Timeline', keywords: ['waiting period', 'documentation updates', 'profile improvement', 'second interview'] }
        ]
    },
    {
        id: 'university-selection',
        title: 'US University Selection & Applications',
        icon: '🎓',
        description: 'Strategic university selection based on your profile, budget, and career goals',
        subtopics: [
            { name: 'University Shortlisting', keywords: ['rankings', 'program fit', 'location', 'cost of living'] },
            { name: 'Application Strategy', keywords: ['SOP writing', 'LOR guidance', 'transcript evaluation', 'application deadlines'] },
            { name: 'I-20 Processing', keywords: ['SEVIS fee', 'I-20 receipt', 'university communication', 'documentation'] },
            { name: 'Scholarship Opportunities', keywords: ['merit scholarships', 'assistantships', 'financial aid', 'funding options'] }
        ]
    },
    {
        id: 'financial-planning',
        title: 'F-1 Financial Planning & Documentation',
        icon: '💰',
        description: 'Complete financial documentation support for F-1 visa approval',
        subtopics: [
            { name: 'Proof of Funds', keywords: ['bank statements', '6 months', 'sponsor letter', 'affidavit of support'] },
            { name: 'Income Tax Returns', keywords: ['ITR 3 years', 'CA certificate', 'income proof', 'business income'] },
            { name: 'Loan Documentation', keywords: ['education loan', 'sanction letter', 'disbursement schedule', 'co-signer'] },
            { name: 'Asset Documentation', keywords: ['property valuation', 'FD certificates', 'mutual funds', 'business assets'] }
        ]
    }
];

// Long-tail FAQ Section
const LONG_TAIL_FAQS = [
    {
        question: 'What is the F-1 visa interview process at US Consulate Mumbai?',
        answer: 'The F-1 visa interview at US Consulate Mumbai typically lasts 2-3 minutes. The consular officer asks questions about your university choice, financial plans, career goals, and ties to India. Common questions include "Why this university?", "How will you fund your education?", and "What are your plans after graduation?". Preparation is crucial as one wrong answer can lead to refusal under Section 214(b).'
    },
    {
        question: 'How much bank balance is required for F-1 visa from Gujarat?',
        answer: 'The bank balance requirement varies by university and location. Generally, you need to show funds covering: (1) First year tuition fees, (2) Living expenses ($15,000-$25,000 per year depending on city), (3) Travel costs. For a typical US university, this ranges from ₹30-50 Lakhs. The funds should be in liquid form (savings accounts, FDs) and shown through 6 months of bank statements.'
    },
    {
        question: 'Can I get F-1 visa if I have 214(b) refusal from previous application?',
        answer: 'Yes, many students successfully obtain F-1 visas after 214(b) refusal. The key is addressing the specific concerns that led to refusal. EEC specializes in 214(b) recovery through: (1) Financial documentation restructuring by CA Madhav Gupta, (2) Interview strategy revision focusing on stronger ties to India, (3) Profile improvement including better university justification and career plan clarity. There is no mandatory waiting period, but it is recommended to reapply after 3-6 months with improved documentation.'
    },
    {
        question: 'What documents do I need for F-1 visa interview at Mumbai Consulate?',
        answer: 'Essential documents include: (1) Valid passport, (2) DS-160 confirmation page, (3) I-20 form from university, (4) SEVIS fee receipt, (5) Visa appointment confirmation, (6) 6 months bank statements, (7) Sponsor\'s ITR (3 years), (8) CA certificate, (9) Affidavit of Support (I-134), (10) Academic transcripts and certificates, (11) English proficiency test scores (IELTS/TOEFL), (12) University admission letter. Carry originals and one set of photocopies.'
    },
    {
        question: 'How long does F-1 visa processing take at US Consulate Mumbai?',
        answer: 'Standard F-1 visa processing at US Consulate Mumbai takes 2-5 business days after the interview. However, if the officer requests additional documentation (221g), processing can take 2-8 weeks. During peak seasons (May-August), there may be slight delays. It is recommended to apply 3-4 months before your intended program start date to account for any delays.'
    },
    {
        question: 'What is the F-1 visa success rate for students from Gujarat?',
        answer: 'F-1 visa success rates vary based on profile strength, documentation quality, and interview performance. Students with strong financial documentation, clear career goals, and proper interview preparation typically have higher success rates. EEC has helped thousands of students from Gujarat secure F-1 visas, with many achieving success even after initial 214(b) refusals through our specialized recovery program.'
    },
    {
        question: 'Do I need to show property documents for F-1 visa?',
        answer: 'Property documents are not mandatory but can strengthen your financial profile, especially if liquid funds are limited. Property valuation certificates, sale deeds, or mortgage-free property documents can be used as supplementary proof of assets. However, primary emphasis should be on liquid funds (bank statements, FDs) that can be easily accessed for tuition and living expenses.'
    },
    {
        question: 'Can family business income be used for F-1 visa sponsorship?',
        answer: 'Yes, family business income is acceptable for F-1 visa sponsorship. You need to provide: (1) Business registration documents, (2) Business ITR (3 years), (3) CA certificate showing business income, (4) Bank statements of business account, (5) Affidavit explaining your role in the business and future plans. CA Madhav Gupta specializes in structuring family business documentation for visa approval.'
    }
];

const GeoContentSection: React.FC = () => {
    return (
        <section id="seo-content" className="py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                        F-1 Visa Preparation Across Gujarat
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                        EEC provides comprehensive USA student visa interview preparation with 26 branches 
                        across 12 cities in Gujarat. Whether you're in Vadodara, Ahmedabad, Surat, or 
                        North Gujarat, expert guidance is just around the corner.
                    </p>
                </div>

                {/* Topical Silos - Main Content Clusters */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {TOPIC_SILOS.map((silo) => (
                        <article 
                            key={silo.id}
                            id={silo.id}
                            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow"
                            itemScope 
                            itemType="https://schema.org/Article"
                        >
                            <header className="flex items-start gap-4 mb-4">
                                <span className="text-4xl">{silo.icon}</span>
                                <div>
                                    <h3 
                                        className="text-xl font-bold text-slate-900 dark:text-white"
                                        itemProp="headline"
                                    >
                                        {silo.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 mt-1" itemProp="description">
                                        {silo.description}
                                    </p>
                                </div>
                            </header>
                            <ul className="space-y-3">
                                {silo.subtopics.map((subtopic, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <span className="font-medium text-slate-800 dark:text-slate-200">
                                                {subtopic.name}
                                            </span>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                {subtopic.keywords.join(' • ')}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <meta itemProp="author" content="EEC - Enbee Education Center" />
                            <meta itemProp="publisher" content="EEC" />
                        </article>
                    ))}
                </div>

                {/* Local Hyper-Relevance - City-wise Content */}
                <div className="mb-16">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-8">
                        USA Visa Preparation in Your City
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Object.entries(CITY_CONTENT).map(([key, city]) => (
                            <div 
                                key={key}
                                className="bg-gradient-to-br from-indigo-50 to-white dark:from-slate-800 dark:to-slate-700 rounded-xl p-5 border border-indigo-100 dark:border-slate-600"
                                itemScope
                                itemType="https://schema.org/Place"
                            >
                                <h4 className="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-2" itemProp="name">
                                    {city.name}
                                </h4>
                                <p className="text-sm text-indigo-700 dark:text-indigo-400 mb-3">
                                    <strong>{city.branches} branches</strong> serving students
                                </p>
                                <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                                    {city.highlights.map((highlight, idx) => (
                                        <li key={idx} className="flex items-start gap-1">
                                            <span className="text-indigo-500">•</span>
                                            {highlight}
                                        </li>
                                    ))}
                                </ul>
                                {/* LSI Long-tail keywords (hidden but crawlable) */}
                                <div className="sr-only" aria-hidden="true">
                                    {city.longTail.join(', ')}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Long-tail FAQ Section */}
                <div className="bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-8">
                        Frequently Asked Questions About USA Student Visa
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {LONG_TAIL_FAQS.map((faq, idx) => (
                            <div 
                                key={idx}
                                className="bg-white dark:bg-slate-800 rounded-lg p-5 shadow-sm"
                            >
                                <h4 
                                    className="font-semibold text-slate-900 dark:text-white mb-2 text-sm"
                                >
                                    {faq.question}
                                </h4>
                                <div>
                                    <p 
                                        className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed"
                                    >
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SEO Booster - Trust Signals */}
                <div className="mt-16 text-center">
                    <div className="inline-flex flex-wrap justify-center gap-4 items-center text-sm text-slate-500 dark:text-slate-400">
                        <span className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
                            🏆 Established 1997
                        </span>
                        <span className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
                            📍 26 Branches in Gujarat
                        </span>
                        <span className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
                            ✅ AIRC Certified till 2031
                        </span>
                        <span className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
                            🇺🇸 U.S. News Certified
                        </span>
                        <span className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
                            🎓 50,000+ Students Helped
                        </span>
                        <span className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
                            ⭐ 4.9/5 Rating
                        </span>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default GeoContentSection;
