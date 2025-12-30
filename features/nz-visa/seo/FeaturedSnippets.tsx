/**
 * ============================================================================
 * EEC FEATURED SNIPPET ENGINE - ULTRA NEO-MODERN EDITION
 * ============================================================================
 * 
 * An architectural masterpiece for SEO dominance featuring:
 * - Bento-grid data visualizations for zero-click answers
 * - Holographic glass cards for definitions
 * - Interactive timeline flows for "How-to" guides
 * - Intelligent Q&A accordion system
 * 
 * ============================================================================
 */

import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  DollarSign,
  Clock,
  FileText,
  GraduationCap,
  Briefcase,
  Globe,
  Shield,
  Target,
  Zap,
  BookOpen,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Info,
  TrendingUp,
  Calendar,
  Star,
  ChevronDown,
  Lightbulb
} from 'lucide-react';

// =============================================================================
// DATA STRUCTURES
// =============================================================================

const DEFINITIONS = [
  {
    term: 'INZ Credibility Interview',
    definition: 'An INZ Credibility Interview is a verification interview conducted by Immigration New Zealand to assess whether a visa applicant is a genuine temporary entrant. The interview evaluates your true intentions for studying, verifies your documentation, assesses your ties to India, and determines if you genuinely plan to return home after your studies.',
    icon: Shield,
    gradient: 'from-violet-500 to-fuchsia-600',
    shadow: 'shadow-fuchsia-500/20',
    id: 'inz-credibility-interview'
  },
  {
    term: 'FTS (Funds to Support) Scheme',
    definition: 'The FTS Scheme is a financial evidence requirement for New Zealand student visas. Applicants must demonstrate they have NZD $20,000 (approximately ₹10.5 lakhs) available per year for living expenses, in addition to tuition fees. This can be shown through bank statements, sponsor declarations with CA certificates, or education loan approvals.',
    icon: DollarSign,
    gradient: 'from-emerald-500 to-teal-600',
    shadow: 'shadow-emerald-500/20',
    id: 'fts-scheme'
  },
  {
    term: 'Genuine Temporary Entry (GTE)',
    definition: 'Genuine Temporary Entry (GTE) is a requirement for New Zealand student visas where applicants must prove they intend to stay temporarily for study purposes and return to their home country after completion. Immigration officers assess factors like ties to home country, logical course progression, financial capacity, and post-study plans.',
    icon: Target,
    gradient: 'from-blue-500 to-cyan-600',
    shadow: 'shadow-blue-500/20',
    id: 'genuine-temporary-entry'
  }
];

const HOW_TO_GUIDES = [
  {
    title: 'How to Apply for New Zealand Student Visa from India',
    icon: FileText,
    gradient: 'from-indigo-600 to-violet-600',
    steps: [
      { text: 'Get admission from a NZQA-approved institution', detail: 'Ensure the course is Level 5 or higher.' },
      { text: 'Receive your Offer of Place and pay semester fees', detail: 'Keep the receipt for visa filing.' },
      { text: 'Gather required documents', detail: 'Passport, transcripts, IELTS/PTE scores.' },
      { text: 'Prepare financial documents', detail: 'FTS account or education loan sanction.' },
      { text: 'Apply online through INZ portal', detail: 'Create a RealMe account.' },
      { text: 'Pay visa fee (NZD $375)', detail: 'Use an international credit card.' },
      { text: 'Complete biometrics', detail: 'Visit your nearest VFS Global center.' },
      { text: 'Receive visa decision', detail: 'Typically within 25-30 working days.' }
    ],
    id: 'how-to-apply-nz-visa'
  },
  {
    title: 'How to Prepare for INZ Credibility Interview',
    icon: BookOpen,
    gradient: 'from-amber-500 to-orange-600',
    steps: [
      { text: 'Review submitted documents', detail: 'Know your SOP and financials inside out.' },
      { text: 'Research your course', detail: 'Why this course? Why this university?' },
      { text: 'Understand post-study plans', detail: 'Link the course to career goals in India.' },
      { text: 'Practice common questions', detail: 'Focus on "Why NZ?" vs other countries.' },
      { text: 'Use AI preparation tools', detail: 'Mock interviews build confidence.' },
      { text: 'Be honest and concise', detail: 'Avoid memorized or scripted answers.' }
    ],
    id: 'how-to-prepare-interview'
  }
];

const DIRECT_ANSWERS = [
  {
    question: 'How much money is required for New Zealand student visa?',
    answer: 'For a New Zealand student visa, you need to show NZD $20,000 (approximately ₹10-11 lakhs) per year for living expenses under the FTS scheme, plus tuition fees ranging from NZD $22,000-$50,000 per year. Additionally, you need NZD $375 for visa fees and approximately NZD $500 for medical examination.',
    source: 'Immigration New Zealand',
    id: 'money-required'
  },
  {
    question: 'What is the processing time for NZ student visa from India?',
    answer: 'The standard processing time for a New Zealand student visa from India is 25-30 working days from complete application submission. This can extend to 60+ days during peak seasons (Jan-March) or if additional documents are requested. Priority processing is available for approximately 15 working days.',
    source: 'Immigration New Zealand',
    id: 'processing-time'
  },
  {
    question: 'Can I work while studying in New Zealand?',
    answer: 'Yes, international students in New Zealand can work up to 20 hours per week during academic term and full-time during scheduled holidays. Students in research-based programs (Masters/PhD) can work unlimited hours. Your partner can get an open work visa allowing full-time work.',
    source: 'Immigration New Zealand',
    id: 'work-while-studying'
  },
  {
    question: 'What happens after completing studies in New Zealand?',
    answer: 'After completing studies in New Zealand, you can apply for a Post-Study Work Visa (PSWV) allowing 1-3 years of work depending on qualification level. Degree graduates (Level 7+) get a 3-year open work visa. This can help you qualify for the Skilled Migrant Category residence visa.',
    source: 'Immigration New Zealand',
    id: 'after-studies'
  },
];

const KEY_STATS = [
  { label: 'Visa Processing', value: '25-30 Days', sub: 'Working days', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Application Fee', value: 'NZD $375', sub: '≈ ₹19,000', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { label: 'FTS Requirement', value: '$20,000/yr', sub: 'Living expenses', icon: Shield, color: 'text-violet-500', bg: 'bg-violet-500/10' },
  { label: 'Work Rights', value: '25 Hrs/Wk', sub: 'Part-time', icon: Briefcase, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { label: 'Post-Study Visa', value: 'Up to 3 Yrs', sub: 'Open work rights', icon: GraduationCap, color: 'text-rose-500', bg: 'bg-rose-500/10' },
  { label: 'Universities', value: '8 Ranked', sub: 'QS World Ranking', icon: Globe, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
];

// =============================================================================
// COMPONENTS
// =============================================================================

const NeoStatCard: React.FC<{ stat: typeof KEY_STATS[0]; index: number }> = ({ stat, index }) => {
  // Extract color from bg class and convert to RGB values for inline styles
  const colorMap: Record<string, { r: number; g: number; b: number }> = {
    'blue-500': { r: 59, g: 130, b: 246 },
    'emerald-500': { r: 16, g: 185, b: 129 },
    'violet-500': { r: 139, g: 92, b: 246 },
    'amber-500': { r: 245, g: 158, b: 11 },
    'rose-500': { r: 244, g: 63, b: 94 },
    'cyan-500': { r: 6, g: 182, b: 212 },
  };
  
  const colorMatch = stat.bg.match(/bg-([^/]+)/);
  const colorKey = colorMatch ? colorMatch[1] : 'cyan-500';
  const color = colorMap[colorKey] || colorMap['cyan-500'];
  
  return (
  <div 
    className="
      group relative bg-white dark:bg-slate-900 rounded-[2rem] 
      p-4 sm:p-6 border border-slate-200 dark:border-slate-800 overflow-hidden 
      hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-1
      flex flex-col h-full min-w-0
    "
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div 
      className="
        absolute top-0 right-0 
        w-16 h-16 sm:w-24 sm:h-24 
        rounded-bl-[36px] sm:rounded-bl-[60px] 
        transition-transform group-hover:scale-110
        semi-circle-bg
      "
      style={{
        '--light-opacity': '0.05',
        '--dark-opacity': '0.2',
        '--color-r': color.r.toString(),
        '--color-g': color.g.toString(),
        '--color-b': color.b.toString(),
      } as React.CSSProperties & {
        '--light-opacity': string;
        '--dark-opacity': string;
        '--color-r': string;
        '--color-g': string;
        '--color-b': string;
      }}
    />
    
    <div className="relative z-10">
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className={`p-2 sm:p-3 rounded-2xl ${stat.bg}`}>
          <stat.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`} strokeWidth={2} />
        </div>
        {index === 0 && (
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        )}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 break-words">{stat.label}</p>
        <h4 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-1 break-words">{stat.value}</h4>
        <p className={`text-xs font-bold ${stat.color}`}>{stat.sub}</p>
      </div>
    </div>
  </div>
  );
};

const HolographicDefinition: React.FC<{ def: typeof DEFINITIONS[0] }> = ({ def }) => {
  const Icon = def.icon;
  return (
    <div 
      id={`passage-${def.id}`}
      className="group relative h-full bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-1"
      itemScope 
      itemType="https://schema.org/DefinedTerm"
    >
      {/* Decorative Corner */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${def.gradient} opacity-10 rounded-bl-[100px] transition-transform duration-700 group-hover:scale-110`} />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${def.gradient} flex items-center justify-center shadow-lg ${def.shadow}`}>
            <Icon className="h-7 w-7 text-white" strokeWidth={2} />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight tracking-tight" itemProp="name">
            {def.term}
          </h3>
        </div>
        
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm font-medium mb-6" itemProp="description">
          {def.definition}
        </p>
        
        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-black text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors uppercase tracking-widest">
          <span>Read Definition</span>
          <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

const TimelineGuide: React.FC<{ guide: typeof HOW_TO_GUIDES[0] }> = ({ guide }) => {
  const Icon = guide.icon;
  const [activeStep, setActiveStep] = useState(0);

  return (
    <article 
      id={`passage-${guide.id}`}
      className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-none relative"
      itemScope 
      itemType="https://schema.org/HowTo"
    >
      <header className={`bg-gradient-to-r ${guide.gradient} p-6 sm:p-10 text-white relative overflow-hidden`}>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute top-0 right-0 w-40 h-40 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 max-h-none sm:max-h-[84px]">
          <div className="p-3 sm:p-4 bg-white/20 backdrop-blur-md rounded-2xl shadow-inner border border-white/20 flex-shrink-0">
            <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
          </div>
          <div>
            <div className="text-[10px] font-black text-white/80 uppercase tracking-widest mb-2">Step-by-Step Guide</div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight" itemProp="name">{guide.title}</h3>
          </div>
        </div>
      </header>

      <div className="p-10">
        <div className="space-y-8 relative">
          {/* Connecting Line */}
          <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-slate-100 dark:bg-slate-800" />
          
          {guide.steps.map((step, idx) => (
            <div 
              key={idx}
              className="relative flex gap-8 group cursor-pointer"
              onMouseEnter={() => setActiveStep(idx)}
              itemProp="step" 
              itemScope 
              itemType="https://schema.org/HowToStep"
            >
              {/* Step Number Bubble */}
              <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm transition-all duration-300 ${
                activeStep === idx 
                  ? `bg-gradient-to-r ${guide.gradient} text-white shadow-lg scale-110` 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
              }`}>
                {idx + 1}
              </div>
              
              <div className={`flex-1 pt-1 transition-opacity duration-300 ${activeStep === idx ? 'opacity-100' : 'opacity-60'}`}>
                <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2" itemProp="text">{step.text}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

const FAQAccordion: React.FC<{ qa: typeof DIRECT_ANSWERS[0]; isOpen: boolean; toggle: () => void }> = ({ qa, isOpen, toggle }) => (
  <div 
    id={`passage-${qa.id}`}
    className={`group border border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden transition-all duration-300 ${
      isOpen ? 'bg-slate-50/50 dark:bg-slate-800/30 shadow-lg' : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50'
    }`}
    itemScope 
    itemType="https://schema.org/Question"
  >
    <button 
      onClick={toggle}
      className="w-full flex items-center justify-between p-6 text-left"
    >
      <div className="flex items-center gap-5">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
          isOpen ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
        }`}>
          <HelpCircle className="h-5 w-5" strokeWidth={2} />
        </div>
        <h4 className="font-bold text-slate-900 dark:text-white text-lg pr-4" itemProp="name">{qa.question}</h4>
      </div>
      <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-indigo-500' : ''}`} />
    </button>
    
    <div 
      className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      itemProp="acceptedAnswer" 
      itemScope 
      itemType="https://schema.org/Answer"
    >
      <div className="overflow-hidden">
        <div className="px-6 pb-8 pt-0 ml-[4.5rem]">
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base font-medium" itemProp="text">
            {qa.answer}
          </p>
          <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-indigo-500 uppercase tracking-widest">
            <Info className="h-3 w-3" />
            Source: {qa.source}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const FeaturedSnippets: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<string | null>('money-required');

  return (
    <section 
      className="mt-16 py-24 relative overflow-hidden"
      aria-labelledby="featured-snippets-heading"
    >
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-[#0B0F19]">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 dark:opacity-20">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-indigo-500 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse" />
          <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[40%] bg-violet-500 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse delay-1000" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <header className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 text-slate-900 dark:text-white mb-8 shadow-lg shadow-indigo-500/10">
            <Zap className="h-4 w-4 text-amber-500" />
            <span className="text-xs font-bold tracking-widest uppercase">Zero-Click Intelligence</span>
          </div>
          
          <h2 
            id="featured-snippets-heading"
            className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-500"
          >
            NZ Visa <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">Knowledge Engine</span>
          </h2>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Instant, expert-verified answers optimized for <span className="text-indigo-600 dark:text-indigo-400 font-bold">Position Zero</span> and Voice Search.
          </p>
        </header>

        {/* Key Stats Bento Grid */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Quick Facts</span>
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {KEY_STATS.map((stat, idx) => (
              <NeoStatCard key={stat.label} stat={stat} index={idx} />
            ))}
          </div>
        </div>

        {/* Definitions Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-24 items-stretch">
          {DEFINITIONS.map((def) => (
            <HolographicDefinition key={def.id} def={def} />
          ))}
        </div>

        {/* How-To Guides */}
        <div className="grid lg:grid-cols-2 gap-8 mb-24">
          {HOW_TO_GUIDES.map((guide) => (
            <TimelineGuide key={guide.id} guide={guide} />
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 mb-4">
              <HelpCircle className="h-6 w-6" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white">Common Questions</h3>
          </div>
          
          <div className="space-y-4">
            {DIRECT_ANSWERS.map((qa) => (
              <FAQAccordion 
                key={qa.id} 
                qa={qa} 
                isOpen={openFAQ === qa.id} 
                toggle={() => setOpenFAQ(openFAQ === qa.id ? null : qa.id)} 
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 relative group cursor-pointer text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-amber-500/20 blur-[100px] rounded-full group-hover:bg-amber-500/30 transition-colors duration-500" />
          <div className="relative z-10">
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg font-medium">
              Still have questions? Our AI preparation tool covers 500+ scenarios.
            </p>
            <a 
              href="#setup-form"
              className="inline-flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold px-8 py-4 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
            >
              <Zap className="h-5 w-5 fill-current" />
              <span>Start Free AI Training</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturedSnippets;
