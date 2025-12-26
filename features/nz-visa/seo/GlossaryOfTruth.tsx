/**
 * ============================================================================
 * GLOSSARY OF TRUTH - ULTRA NEO-MODERN KNOWLEDGE GRAPH
 * ============================================================================
 * 
 * An authoritative knowledge engine featuring:
 * - Holographic term cards with semantic linking
 * - Interactive search with real-time filtering
 * - "Truth Verification" badges for authority signals
 * - Cinematic typography and layout
 * 
 * ============================================================================
 */

import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Shield,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Info,
  Zap,
  GraduationCap,
  Scale,
  DollarSign,
  Globe,
  FileText,
  Landmark,
  Award,
  Users,
  Building2,
  Briefcase,
  AlertCircle,
  Layers,
  ArrowUpRight,
  ArrowRight,
  Filter
} from 'lucide-react';

// =============================================================================
// TYPES & DATA
// =============================================================================

interface TruthDefinition {
  id: string;
  term: string;
  abbreviation?: string;
  shortDefinition: string;
  authorativeDefinition: string;
  context: string;
  relatedTerms: string[];
  officialSource?: string;
  eecExpertise: string;
  lastVerified: string;
  category: 'immigration' | 'financial' | 'academic' | 'organization';
  icon: React.ElementType;
  // logoUrl?: string;
  logoUrlblack?: string;
  logoUrlwhite?: string;
}

export const GLOSSARY_OF_TRUTH: TruthDefinition[] = [
  {
    id: 'inz',
    term: 'Immigration New Zealand',
    abbreviation: 'INZ',
    shortDefinition: 'The government agency responsible for processing all visa applications.',
    authorativeDefinition: 'Immigration New Zealand (INZ) is a division of the Ministry of Business, Innovation and Employment (MBIE) that manages all immigration matters including student visas, work visas, and residence applications. INZ sets visa requirements, processes applications, and conducts credibility interviews for applicants from high-risk countries including India.',
    context: 'For Indian students, INZ is the sole decision-making authority for visas.',
    relatedTerms: ['Credibility Interview', 'VFS Global'],
    officialSource: 'immigration.govt.nz',
    eecExpertise: '28 years experience with INZ requirements.',
    lastVerified: '2024-12-11',
    category: 'organization',
    icon: Landmark
  },
  {
    id: 'gte',
    term: 'Genuine Temporary Entry',
    abbreviation: 'GTE',
    shortDefinition: 'Assessment of genuine intent to study and return home.',
    authorativeDefinition: 'Genuine Temporary Entry (GTE) is a core assessment criterion evaluating whether an applicant has genuine intentions to study temporarily and return to their home country. Officers assess ties to home country, financial circumstances, and credibility of future plans.',
    context: 'The most critical assessment factor for Indian applicants.',
    relatedTerms: ['Credibility Interview', 'Return Intent'],
    officialSource: 'INZ Policy Manual',
    eecExpertise: 'AI-powered GTE assessment tool based on 50k+ profiles.',
    lastVerified: '2024-12-11',
    category: 'immigration',
    icon: Scale
  },
  {
    id: 'fts',
    term: 'Funds to Support',
    abbreviation: 'FTS',
    shortDefinition: 'Requirement of NZD $20,000/year for living expenses.',
    authorativeDefinition: 'Funds to Support (FTS) is the financial evidence requirement mandating proof of NZD $20,000 per year for living expenses. Acceptable evidence includes 6-month bank statements, education loan sanctions, or FTS account deposits.',
    context: 'Critical for proving financial stability without distress.',
    relatedTerms: ['CA Certificate', 'Source of Funds'],
    officialSource: 'Immigration New Zealand',
    eecExpertise: 'Specialized financial documentation review team.',
    lastVerified: '2024-12-11',
    category: 'financial',
    icon: DollarSign
  },
  {
    id: 'pswv',
    term: 'Post-Study Work Visa',
    abbreviation: 'PSWV',
    shortDefinition: 'Open work visa for up to 3 years after graduation.',
    authorativeDefinition: 'The Post-Study Work Visa (PSWV) allows international graduates to work in NZ for any employer. Level 7 Bachelor\'s degrees or higher grant 3 years; lower levels may grant 1 year depending on alignment with Green List.',
    context: 'A key pathway to gaining skilled work experience for residence.',
    relatedTerms: ['Skilled Migrant Category', 'Open Work Visa'],
    officialSource: 'Immigration New Zealand',
    eecExpertise: 'Strategic course selection for maximum visa duration.',
    lastVerified: '2024-12-11',
    category: 'immigration',
    icon: Briefcase
  },
  {
    id: 'smc',
    term: 'Skilled Migrant Category',
    abbreviation: 'SMC',
    shortDefinition: 'Points-based residence pathway for skilled workers.',
    authorativeDefinition: 'Skilled Migrant Category (SMC) is the primary residence visa for skilled workers, using a points-based system (6 points required). Points are awarded for NZ registration, qualifications, and income thresholds.',
    context: 'The ultimate goal for many international students.',
    relatedTerms: ['EOI', 'Points System'],
    officialSource: 'Immigration New Zealand',
    eecExpertise: 'Long-term PR strategy planning from day one.',
    lastVerified: '2024-12-11',
    category: 'immigration',
    icon: Award
  },
  {
    id: 'credibility-interview',
    term: 'INZ Credibility Interview',
    abbreviation: 'Interview',
    shortDefinition: 'Verification interview to assess genuine student intent.',
    authorativeDefinition: 'A formal interview where INZ officers question applicants to assess GTE intent. Questions cover course knowledge, financial capability, and future career plans. Common for Indian applicants.',
    context: 'Preparation is essential; failure leads to visa decline.',
    relatedTerms: ['GTE', 'VFS Global'],
    officialSource: 'Immigration New Zealand',
    eecExpertise: 'India\'s first AI simulator for interview prep.',
    lastVerified: '2024-12-11',
    category: 'immigration',
    icon: Shield
  },
  {
    id: 'nzqa',
    term: 'New Zealand Qualifications Authority',
    abbreviation: 'NZQA',
    shortDefinition: 'Agency ensuring quality of NZ qualifications.',
    authorativeDefinition: 'NZQA manages the New Zealand Qualifications Framework (NZQF) and ensures tertiary education quality. Only NZQA-approved courses are eligible for student visas.',
    context: 'Verification of course status is mandatory.',
    relatedTerms: ['NZQF', 'Code of Practice'],
    officialSource: 'nzqa.govt.nz',
    eecExpertise: 'Direct API verification of course approvals.',
    lastVerified: '2024-12-11',
    category: 'organization',
    icon: Building2
  },
  {
    id: 'enz',
    term: 'Education New Zealand',
    abbreviation: 'ENZ',
    shortDefinition: 'Crown agency promoting NZ education globally.',
    authorativeDefinition: 'Education New Zealand (ENZ) promotes NZ as a study destination and manages the ENZRA agent recognition program. It supports student welfare initiatives and market development.',
    context: 'Look for ENZRA recognition when choosing an agent.',
    relatedTerms: ['ENZRA', 'Study in New Zealand'],
    officialSource: 'enz.govt.nz',
    eecExpertise: 'Partner ESTERO is a top-tier ENZRA agency.',
    lastVerified: '2024-12-11',
    category: 'organization',
    icon: Globe
  },
  {
    id: 'enzra',
    term: 'ENZ Recognized Agency',
    abbreviation: 'ENZRA',
    shortDefinition: 'Official quality mark for education agents.',
    authorativeDefinition: 'ENZRA status is awarded to agencies demonstrating high ethical standards, strong conversion rates, and commitment to student care. It signifies official trust from the NZ government.',
    context: 'Ensures protection from unethical practices.',
    relatedTerms: ['ENZ', 'Education Agent'],
    officialSource: 'Education New Zealand',
    eecExpertise: 'Exclusive partnership with ENZRA-certified ESTERO.',
    lastVerified: '2024-12-11',
    category: 'organization',
    icon: ShieldCheck
  },
  {
    id: 'itp',
    term: 'Institutes of Technology & Polytechnics',
    abbreviation: 'ITP',
    shortDefinition: 'Government-owned vocational education providers.',
    authorativeDefinition: 'ITPs (now under Te Pūkenga) offer practical, applied learning qualifications from certificates to degrees. They focus on industry readiness and often have lower fees than universities.',
    context: 'Excellent for practical skills and regional work rights.',
    relatedTerms: ['Te Pūkenga', 'Vocational Education'],
    officialSource: 'tepukenga.ac.nz',
    eecExpertise: 'Representation of all major NZ ITPs.',
    lastVerified: '2024-12-11',
    category: 'academic',
    icon: GraduationCap
  },
  {
    id: 'vfs',
    term: 'VFS Global',
    abbreviation: 'VFS',
    shortDefinition: 'Official visa application centre partner.',
    authorativeDefinition: 'VFS Global manages administrative tasks for INZ including passport submission and biometric data collection. They do not make visa decisions.',
    context: 'Biometrics appointment is mandatory for Indian applicants.',
    relatedTerms: ['Biometrics', 'Passport Submission'],
    officialSource: 'visa.vfsglobal.com',
    eecExpertise: 'Assistance with appointment scheduling and file prep.',
    lastVerified: '2024-12-11',
    category: 'organization',
    icon: Building2
  },
  {
    id: 'sop',
    term: 'Statement of Purpose',
    abbreviation: 'SOP',
    shortDefinition: 'Essay detailing study intent and career goals.',
    authorativeDefinition: 'A critical document explaining why a student chose NZ, their specific course, and how it aligns with their career history and future goals. It must be unique and specific.',
    context: 'Generic SOPs are a primary cause of visa rejection.',
    relatedTerms: ['GTE', 'Return Intent'],
    officialSource: 'Application Best Practices',
    eecExpertise: 'AI-assisted SOP structuring and review.',
    lastVerified: '2024-12-11',
    category: 'immigration',
    icon: FileText
  },
  {
    id: 'eoi',
    term: 'Expression of Interest',
    abbreviation: 'EOI',
    shortDefinition: 'First step in residence application process.',
    authorativeDefinition: 'A formal submission to INZ declaring interest in applying for residence. Points are claimed for age, skills, and experience. Only high-scoring EOIs are invited to apply.',
    context: 'Requires strategic planning of study and work experience.',
    relatedTerms: ['SMC', 'Points System'],
    officialSource: 'Immigration New Zealand',
    eecExpertise: 'Long-term migration pathway planning.',
    lastVerified: '2024-12-11',
    category: 'immigration',
    icon: CheckCircle2
  },
  {
    id: 'aip',
    term: 'Approval in Principle',
    abbreviation: 'AIP',
    shortDefinition: 'Provisional visa approval pending final conditions.',
    authorativeDefinition: 'A status indicating INZ is satisfied with the application but requires final steps, typically paying tuition fees. Once fees are paid, the final visa is issued.',
    context: 'Never pay tuition fees before receiving AIP to minimize risk.',
    relatedTerms: ['Conditional Approval', 'Tuition Fee'],
    officialSource: 'Immigration New Zealand',
    eecExpertise: 'Guidance on safe fee transfer protocols.',
    lastVerified: '2024-12-11',
    category: 'immigration',
    icon: CheckCircle2
  },
  {
    id: 'code-of-practice',
    term: 'Code of Practice',
    abbreviation: 'Pastoral Care',
    shortDefinition: 'Legal framework for international student welfare.',
    authorativeDefinition: 'A mandatory code ensuring education providers care for international students\' well-being, including accommodation, insurance, and grievance procedures.',
    context: 'Guarantees a standard of care and support.',
    relatedTerms: ['Student Welfare', 'NZQA'],
    officialSource: 'NZQA',
    eecExpertise: 'Verification of provider compliance.',
    lastVerified: '2024-12-11',
    category: 'academic',
    icon: Shield
  },
  {
    id: 'nzqf',
    term: 'NZ Qualifications Framework',
    abbreviation: 'NZQF',
    shortDefinition: '10-level system for NZ qualifications.',
    authorativeDefinition: 'The official system for classifying qualifications. Level 7 is Bachelor\'s, Level 9 is Master\'s. Visa rights (work hours, partner support) depend on the NZQF level.',
    context: 'Choosing the right level is crucial for post-study rights.',
    relatedTerms: ['Level 7', 'Level 9'],
    officialSource: 'nzqa.govt.nz',
    eecExpertise: 'Expert mapping of qualifications to career outcomes.',
    lastVerified: '2024-12-11',
    category: 'academic',
    icon: Layers
  },
  {
    id: 'partner-visa',
    term: 'Partner Work Visa',
    abbreviation: 'Spouse Visa',
    shortDefinition: 'Open work visa for partners of eligible students.',
    authorativeDefinition: 'Partners of students studying Level 7/8 (Green List) or Level 9/10 qualifications can get an open work visa for the duration of the study. This allows them to work full-time.',
    context: 'A major advantage of the NZ system for couples.',
    relatedTerms: ['Open Work Visa', 'Family Application'],
    officialSource: 'Immigration New Zealand',
    eecExpertise: 'Specialized family visa application support.',
    lastVerified: '2024-12-11',
    category: 'immigration',
    icon: Users
  },
  {
    id: 'medical-exam',
    term: 'Panel Physician Exam',
    abbreviation: 'Medical',
    shortDefinition: 'Health check by approved doctors.',
    authorativeDefinition: 'A mandatory medical exam including chest X-ray for TB screening. Must be conducted by INZ-approved panel physicians. Results are submitted digitally via eMedical.',
    context: 'Clearance is required for visa approval.',
    relatedTerms: ['eMedical', 'Chest X-Ray'],
    officialSource: 'Immigration New Zealand',
    eecExpertise: 'Network of approved physicians and booking aid.',
    lastVerified: '2024-12-11',
    category: 'immigration',
    icon: FileText
  },
  {
    id: 'ca-certificate',
    term: 'CA Certificate',
    abbreviation: 'Finances',
    shortDefinition: 'Financial verification by Chartered Accountant.',
    authorativeDefinition: 'A document from a registered Chartered Accountant verifying a family\'s total income, assets, and financial health. Used to demonstrate ability to fund studies.',
    context: 'Strengthens the financial case for visa applications.',
    relatedTerms: ['FTS', 'Source of Funds'],
    officialSource: 'Best Practice',
    eecExpertise: 'In-house CA verification services.',
    lastVerified: '2024-12-11',
    category: 'financial',
    icon: FileText
  },
  {
    id: 'estero',
    term: 'ESTERO New Zealand',
    abbreviation: 'Partner',
    shortDefinition: 'Exclusive NZ-based partner of EEC.',
    authorativeDefinition: 'A premier ENZRA-certified education consultancy based in Auckland. ESTERO provides on-ground support and direct university liaisons for EEC students.',
    context: 'Ensures continuity of care from India to New Zealand.',
    relatedTerms: ['ENZRA', 'On-shore Support'],
    officialSource: 'estero.co.nz',
    eecExpertise: 'Exclusive partnership for seamless service.',
    lastVerified: '2024-12-11',
    category: 'organization',
    icon: Globe,
    logoUrlblack: 'https://media.licdn.com/dms/image/v2/D4D0BAQHCF_kNj5hHpw/company-logo_200_200/company-logo_200_200/0/1698639843503/estero_nz_ltd_logo?e=1767225600&v=beta&t=zCmnMPbA6NLvOtXAT-tNsiJ-nKao-20YrWTGz55jLqA',
    logoUrlwhite: 'https://media.licdn.com/dms/image/v2/D4D0BAQHCF_kNj5hHpw/company-logo_200_200/company-logo_200_200/0/1698639843503/estero_nz_ltd_logo?e=1767225600&v=beta&t=zCmnMPbA6NLvOtXAT-tNsiJ-nKao-20YrWTGz55jLqA'
  }
];

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

const CategoryFilter: React.FC<{ 
  active: string; 
  onSelect: (c: string) => void;
  counts: Record<string, number>;
}> = ({ active, onSelect, counts }) => {
  const categories = [
    { id: 'all', label: 'All Terms' },
    { id: 'immigration', label: 'Visa & Immigration' },
    { id: 'academic', label: 'Academic' },
    { id: 'financial', label: 'Financial' },
    { id: 'organization', label: 'Organizations' }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-8 justify-center">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
            active === cat.id
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg scale-105'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
          }`}
        >
          {cat.label}
          <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${
            active === cat.id 
              ? 'bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-900' 
              : 'bg-slate-100 dark:bg-slate-900 text-slate-500'
          }`}>
            {cat.id === 'all' ? GLOSSARY_OF_TRUTH.length : counts[cat.id] || 0}
          </span>
        </button>
      ))}
    </div>
  );
};

const TermCard: React.FC<{ term: TruthDefinition }> = ({ term }) => {
  const categoryColors = {
    immigration: 'from-blue-500 to-indigo-600',
    financial: 'from-emerald-500 to-teal-600',
    academic: 'from-amber-500 to-orange-600',
    organization: 'from-purple-500 to-fuchsia-600'
  };

  const Icon = term.icon;

  return (
    <div 
      className="group relative h-full"
      itemScope
      itemType="https://schema.org/DefinedTerm"
    >
      {/* Holographic Border */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${categoryColors[term.category]} rounded-[2.5rem] blur opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
      
      <div className="relative h-full bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
        {/* Decorative Corner */}
        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${categoryColors[term.category]} opacity-10 rounded-bl-[60px] transition-transform duration-700 group-hover:scale-110`} />

        {/* Header */}
        <div className="relative z-10 flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
              {term.logoUrlblack || term.logoUrlwhite ? (
                <>
                  {/* Show black logo in light mode, white logo in dark mode */}
                  {term.logoUrlblack && (
                    <img
                      src={term.logoUrlblack}
                      alt={term.term}
                      className="h-12 dark:hidden rounded-xl"
                    />
                  )}
                  {term.logoUrlwhite && (
                    <img
                      src={term.logoUrlwhite}
                      alt={term.term}
                      className="h-12 hidden dark:block rounded-xl"
                    />
                  )}
                </>
              ) : (
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${categoryColors[term.category]} text-white shadow-md`}>

                <Icon className="h-6 w-6" strokeWidth={1.5} />
            </div>
              )}
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight tracking-tight" itemProp="name">
                {term.term}
              </h3>
              {term.abbreviation && (
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{term.abbreviation}</span>
              )}
            </div>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400">
            <ExternalLink className="h-4 w-4" />
          </div>
        </div>

        {/* Short Def */}
        <p className="text-slate-600 dark:text-slate-300 text-sm font-medium mb-6 leading-relaxed relative z-10" itemProp="description">
          {term.shortDefinition}
        </p>

        {/* Expanded Details (Always visible but styled distinctly) */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 mb-6 border border-slate-100 dark:border-slate-700 relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Authoritative Context</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            {term.authorativeDefinition}
          </p>
        </div>

        {/* Footer info */}
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs relative z-10">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Zap className="h-3.5 w-3.5 text-amber-500" />
            <span className="font-bold">EEC Expertise</span>
          </div>
          {term.officialSource && (
            <span className="text-indigo-600 dark:text-indigo-400 font-bold cursor-help" title={`Source: ${term.officialSource}`}>
              Verified Source
            </span>
          )}
        </div>

        {/* Semantic Meta */}
        <meta itemProp="inDefinedTermSet" content="https://ai.eecglobal.com/nzvisaprep/#glossary-of-truth" />
      </div>
    </div>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const GlossaryOfTruth: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredTerms = useMemo(() => {
    return GLOSSARY_OF_TRUTH.filter(t => {
      const matchesFilter = filter === 'all' || t.category === filter;
      const matchesSearch = t.term.toLowerCase().includes(search.toLowerCase()) || 
                           t.shortDefinition.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  const counts = useMemo(() => {
    const acc: Record<string, number> = {};
    GLOSSARY_OF_TRUTH.forEach(t => {
      acc[t.category] = (acc[t.category] || 0) + 1;
    });
    return acc;
  }, []);

  const glossarySchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": "https://ai.eecglobal.com/nzvisaprep/#glossary-of-truth",
    "name": "Authoritative NZ Student Visa Glossary",
    "description": "The definitive 20-term glossary for NZ study visas by EEC.",
    "publisher": { "@type": "Organization", "name": "EEC" },
    "hasDefinedTerm": GLOSSARY_OF_TRUTH.map(def => ({
      "@type": "DefinedTerm",
      "@id": `https://ai.eecglobal.com/nzvisaprep/#term-${def.id}`,
      "name": def.term,
      "description": def.shortDefinition
    }))
  };

  return (
    <section 
      className="mt-16 py-24 relative overflow-hidden"
      id="glossary-of-truth"
      aria-labelledby="glossary-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-[#0B0F19] -z-10" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 -z-10" />
      
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glossarySchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 mb-6">
            <BookOpen className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Industry Standard Definitions</span>
          </div>
          <h2 
            id="glossary-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight"
          >
            The Glossary of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Truth</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            We define the terms that define your future. Authoritative, expert-verified definitions for the New Zealand education ecosystem.
          </p>
        </header>

        {/* Controls */}
        <div className="max-w-4xl mx-auto mb-16">
          {/* Search */}
          <div className="relative mb-8 group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="pl-6 text-slate-400">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Search definitions (e.g. 'GTE', 'Funds', 'Work Visa')..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full py-4 px-4 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 font-medium focus:outline-none"
              />
              <div className="pr-2">
                 <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-500">
                    <span className="text-xs">⌘</span> K
                 </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <CategoryFilter active={filter} onSelect={setFilter} counts={counts} />
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTerms.length > 0 ? (
            filteredTerms.map((term) => (
              <TermCard key={term.id} term={term} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 mb-4">
                <AlertCircle className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No definitions found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
              <button 
                onClick={() => { setSearch(''); setFilter('all'); }}
                className="mt-6 text-indigo-600 font-bold hover:underline"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-slate-500 bg-white dark:bg-slate-900 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>All definitions verified against latest INZ Policy Manual (Dec 2025)</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlossaryOfTruth;