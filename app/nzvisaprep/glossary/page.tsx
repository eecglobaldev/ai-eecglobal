'use client';

import { Search, BookOpen, Shield, DollarSign, GraduationCap, Building2, Scale, Briefcase, Award, CheckCircle2, FileText, Users, Globe, ShieldCheck, Layers, Landmark } from 'lucide-react';
import { useState, useMemo } from 'react';

// Glossary data extracted from GlossaryOfTruth.tsx
const glossaryTerms = [
  {
    id: 'inz',
    term: 'Immigration New Zealand',
    abbreviation: 'INZ',
    shortDefinition: 'The government agency responsible for processing all visa applications.',
    definition: 'Immigration New Zealand (INZ) is a division of the Ministry of Business, Innovation and Employment (MBIE) that manages all immigration matters including student visas, work visas, and residence applications. INZ sets visa requirements, processes applications, and conducts credibility interviews for applicants from high-risk countries including India.',
    category: 'organization',
    icon: Landmark,
  },
  {
    id: 'gte',
    term: 'Genuine Temporary Entry',
    abbreviation: 'GTE',
    shortDefinition: 'Assessment of genuine intent to study and return home.',
    definition: 'Genuine Temporary Entry (GTE) is a core assessment criterion evaluating whether an applicant has genuine intentions to study temporarily and return to their home country. Officers assess ties to home country, financial circumstances, and credibility of future plans.',
    category: 'immigration',
    icon: Scale,
  },
  {
    id: 'fts',
    term: 'Funds to Support',
    abbreviation: 'FTS',
    shortDefinition: 'Requirement of NZD $20,000/year for living expenses.',
    definition: 'Funds to Support (FTS) is the financial evidence requirement mandating proof of NZD $20,000 per year for living expenses. Acceptable evidence includes 6-month bank statements, education loan sanctions, or FTS account deposits.',
    category: 'financial',
    icon: DollarSign,
  },
  {
    id: 'pswv',
    term: 'Post-Study Work Visa',
    abbreviation: 'PSWV',
    shortDefinition: 'Open work visa for up to 3 years after graduation.',
    definition: 'The Post-Study Work Visa (PSWV) allows international graduates to work in NZ for any employer. Level 7 Bachelor\'s degrees or higher grant 3 years; lower levels may grant 1 year depending on alignment with Green List.',
    category: 'immigration',
    icon: Briefcase,
  },
  {
    id: 'smc',
    term: 'Skilled Migrant Category',
    abbreviation: 'SMC',
    shortDefinition: 'Points-based residence pathway for skilled workers.',
    definition: 'Skilled Migrant Category (SMC) is the primary residence visa for skilled workers, using a points-based system (6 points required). Points are awarded for NZ registration, qualifications, and income thresholds.',
    category: 'immigration',
    icon: Award,
  },
  {
    id: 'credibility-interview',
    term: 'INZ Credibility Interview',
    abbreviation: 'Interview',
    shortDefinition: 'Verification interview to assess genuine student intent.',
    definition: 'A formal interview where INZ officers question applicants to assess GTE intent. Questions cover course knowledge, financial capability, and future career plans. Common for Indian applicants.',
    category: 'immigration',
    icon: Shield,
  },
  {
    id: 'nzqa',
    term: 'New Zealand Qualifications Authority',
    abbreviation: 'NZQA',
    shortDefinition: 'Agency ensuring quality of NZ qualifications.',
    definition: 'NZQA manages the New Zealand Qualifications Framework (NZQF) and ensures tertiary education quality. Only NZQA-approved courses are eligible for student visas.',
    category: 'organization',
    icon: Building2,
  },
  {
    id: 'enz',
    term: 'Education New Zealand',
    abbreviation: 'ENZ',
    shortDefinition: 'Crown agency promoting NZ education globally.',
    definition: 'Education New Zealand (ENZ) promotes NZ as a study destination and manages the ENZRA agent recognition program. It supports student welfare initiatives and market development.',
    category: 'organization',
    icon: Globe,
  },
  {
    id: 'enzra',
    term: 'ENZ Recognized Agency',
    abbreviation: 'ENZRA',
    shortDefinition: 'Official quality mark for education agents.',
    definition: 'ENZRA status is awarded to agencies demonstrating high ethical standards, strong conversion rates, and commitment to student care. It signifies official trust from the NZ government.',
    category: 'organization',
    icon: ShieldCheck,
  },
  {
    id: 'itp',
    term: 'Institutes of Technology & Polytechnics',
    abbreviation: 'ITP',
    shortDefinition: 'Government-owned vocational education providers.',
    definition: 'ITPs (now under Te Pūkenga) offer practical, applied learning qualifications from certificates to degrees. They focus on industry readiness and often have lower fees than universities.',
    category: 'academic',
    icon: GraduationCap,
  },
  {
    id: 'vfs',
    term: 'VFS Global',
    abbreviation: 'VFS',
    shortDefinition: 'Official visa application centre partner.',
    definition: 'VFS Global manages administrative tasks for INZ including passport submission and biometric data collection. They do not make visa decisions.',
    category: 'organization',
    icon: Building2,
  },
  {
    id: 'sop',
    term: 'Statement of Purpose',
    abbreviation: 'SOP',
    shortDefinition: 'Essay detailing study intent and career goals.',
    definition: 'A critical document explaining why a student chose NZ, their specific course, and how it aligns with their career history and future goals. It must be unique and specific.',
    category: 'immigration',
    icon: FileText,
  },
  {
    id: 'eoi',
    term: 'Expression of Interest',
    abbreviation: 'EOI',
    shortDefinition: 'First step in residence application process.',
    definition: 'A formal submission to INZ declaring interest in applying for residence. Points are claimed for age, skills, and experience. Only high-scoring EOIs are invited to apply.',
    category: 'immigration',
    icon: CheckCircle2,
  },
  {
    id: 'aip',
    term: 'Approval in Principle',
    abbreviation: 'AIP',
    shortDefinition: 'Provisional visa approval pending final conditions.',
    definition: 'A status indicating INZ is satisfied with the application but requires final steps, typically paying tuition fees. Once fees are paid, the final visa is issued.',
    category: 'immigration',
    icon: CheckCircle2,
  },
  {
    id: 'code-of-practice',
    term: 'Code of Practice',
    abbreviation: 'Pastoral Care',
    shortDefinition: 'Legal framework for international student welfare.',
    definition: 'A mandatory code ensuring education providers care for international students\' well-being, including accommodation, insurance, and grievance procedures.',
    category: 'academic',
    icon: Shield,
  },
  {
    id: 'nzqf',
    term: 'NZ Qualifications Framework',
    abbreviation: 'NZQF',
    shortDefinition: '10-level system for NZ qualifications.',
    definition: 'The official system for classifying qualifications. Level 7 is Bachelor\'s, Level 9 is Master\'s. Visa rights (work hours, partner support) depend on the NZQF level.',
    category: 'academic',
    icon: Layers,
  },
  {
    id: 'partner-visa',
    term: 'Partner Work Visa',
    abbreviation: 'Spouse Visa',
    shortDefinition: 'Open work visa for partners of eligible students.',
    definition: 'Partners of students studying Level 7/8 (Green List) or Level 9/10 qualifications can get an open work visa for the duration of the study. This allows them to work full-time.',
    category: 'immigration',
    icon: Users,
  },
  {
    id: 'medical-exam',
    term: 'Panel Physician Exam',
    abbreviation: 'Medical',
    shortDefinition: 'Health check by approved doctors.',
    definition: 'A mandatory medical exam including chest X-ray for TB screening. Must be conducted by INZ-approved panel physicians. Results are submitted digitally via eMedical.',
    category: 'immigration',
    icon: FileText,
  },
  {
    id: 'ca-certificate',
    term: 'CA Certificate',
    abbreviation: 'Finances',
    shortDefinition: 'Financial verification by Chartered Accountant.',
    definition: 'A document from a registered Chartered Accountant verifying a family\'s total income, assets, and financial health. Used to demonstrate ability to fund studies.',
    category: 'financial',
    icon: FileText,
  },
  {
    id: 'estero',
    term: 'ESTERO New Zealand',
    abbreviation: 'Partner',
    shortDefinition: 'Exclusive NZ-based partner of EEC.',
    definition: 'A premier ENZRA-certified education consultancy based in Auckland. ESTERO provides on-ground support and direct university liaisons for EEC students.',
    category: 'organization',
    icon: Globe,
  },
];

const categoryLabels: Record<string, string> = {
  all: 'All Terms',
  immigration: 'Visa & Immigration',
  academic: 'Academic',
  financial: 'Financial',
  organization: 'Organizations',
};

export default function NZVisaGlossaryPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter(t => {
      const matchesFilter = filter === 'all' || t.category === filter;
      const matchesSearch = t.term.toLowerCase().includes(search.toLowerCase()) || 
                           t.shortDefinition.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  const counts = useMemo(() => {
    const acc: Record<string, number> = {};
    glossaryTerms.forEach(t => {
      acc[t.category] = (acc[t.category] || 0) + 1;
    });
    return acc;
  }, []);

  const glossarySchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": "/nzvisaprep/glossary",
    "name": "Authoritative NZ Student Visa Glossary",
    "description": "The definitive 20-term glossary for NZ study visas by EEC.",
    "publisher": { "@type": "Organization", "@id": "https://eecglobal.com/#organization", "name": "EEC" },
    "hasDefinedTerm": glossaryTerms.map(def => ({
      "@type": "DefinedTerm",
      "@id": `/nzvisaprep/glossary/#term-${def.id}`,
      "name": def.term,
      "description": def.shortDefinition
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://ai.eecglobal.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "NZ Visa Prep",
        "item": "https://ai.eecglobal.com/nzvisaprep/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Glossary",
        "item": "https://ai.eecglobal.com/nzvisaprep/glossary/"
      }
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://eecglobal.com/#organization",
    "name": "EEC - Enbee Education Center",
    "alternateName": ["EEC Global", "Enbee Education"],
    "url": "https://eecglobal.com",
    "logo": "https://ai.eecglobal.com/assets/eeclogo.svg",
    "description": "India's leading New Zealand student visa preparation consultancy, established in 1997. Operating 26 branches across 12 cities in Gujarat. Guided over 100,000 students to international education destinations.",
    "foundingDate": "1997",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": "200+"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Gujarat",
      "addressRegion": "Gujarat",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-8758750036",
      "contactType": "Customer Service",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi", "Gujarati"]
    },
    "sameAs": [
      "https://www.facebook.com/eecglobal",
      "https://www.linkedin.com/company/eec-global",
      "https://www.instagram.com/eecglobal"
    ],
    "award": [
      "ENZRA Certified (Education New Zealand Recognized Agency)",
      "AIRC Certified (American International Recruitment Council)",
      "ICEF Accredited",
      "U.S. News Global Education Certified"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "2847",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glossarySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 mb-6">
            <BookOpen className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Industry Standard Definitions</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            The Glossary of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Truth</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            We define the terms that define your future. Authoritative, expert-verified definitions for the New Zealand education ecosystem.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              placeholder="Search definitions (e.g. 'GTE', 'FTS', 'Work Visa')..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-4 pl-12 pr-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {Object.entries(categoryLabels).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                filter === id
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg scale-105'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {label}
              <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                filter === id 
                  ? 'bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-900' 
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-500'
              }`}>
                {id === 'all' ? glossaryTerms.length : counts[id] || 0}
              </span>
            </button>
          ))}
        </div>

        {/* Terms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTerms.map((term) => {
            const Icon = term.icon;
            return (
              <div
                key={term.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight mb-1">
                      {term.term}
                    </h3>
                    {term.abbreviation && (
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {term.abbreviation}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm font-medium mb-4 leading-relaxed">
                  {term.shortDefinition}
                </p>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {term.definition}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 dark:text-slate-400">No definitions found. Try adjusting your search or filter.</p>
          </div>
        )}

        {/* Related Pages */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/nzvisaprep/faq/"
              className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">FAQ</h3>
              <p className="text-slate-600 dark:text-slate-400">Get answers to common questions about NZ student visas</p>
            </a>
            <a
              href="/nzvisaprep/preparation-guide/"
              className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Preparation Guide</h3>
              <p className="text-slate-600 dark:text-slate-400">Step-by-step guide for visa application and interview</p>
            </a>
            <a
              href="/nzvisaprep/resources/"
              className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Resources</h3>
              <p className="text-slate-600 dark:text-slate-400">Document checklist, cost calculator, and statistics</p>
            </a>
            <a
              href="/nzvisaprep/about-eec/"
              className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">About EEC</h3>
              <p className="text-slate-600 dark:text-slate-400">Meet our expert team and learn about our services</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
