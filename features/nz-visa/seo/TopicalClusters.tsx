/**
 * ============================================================================
 * EEC TOPICAL CLUSTERS - ELEGANT SILO ARCHITECTURE
 * ============================================================================
 * 
 * Premium content silo strategy with:
 * - Stunning pillar content cards
 * - Topic cluster internal linking
 * - Authority building through content hierarchy
 * - Beautiful gradient designs
 * 
 * ============================================================================
 */

import React from 'react';
import { 
  GraduationCap, 
  FileText, 
  DollarSign, 
  Briefcase, 
  BookOpen, 
  Users,
  Globe,
  Award,
  Target,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Sparkles,
  ChevronRight,
  Layers
} from 'lucide-react';

// =============================================================================
// PILLAR CLUSTER DATA
// =============================================================================

const PILLAR_CLUSTERS = [
  {
    id: 'nz-visa-guide',
    pillarTitle: 'Complete NZ Student Visa Guide 2026',
    pillarDescription: 'Everything you need to know about applying for a New Zealand student visa from India - requirements, documents, process, and timeline.',
    icon: FileText,
    gradient: 'from-indigo-600 via-violet-600 to-purple-600',
    lightBg: 'bg-indigo-50 dark:bg-indigo-950/30',
    clusters: [
      'Visa Requirements', 'Application Process', 'Processing Time', 
      'Visa Fees', 'Health Requirements', 'Character Requirements'
    ],
    primaryCTA: { text: 'Start Visa Prep', url: '#setup-form' },
    secondaryCTA: { text: 'Search Courses', url: 'https://nz.eecglobal.com' },
  },
  {
    id: 'inz-interview',
    pillarTitle: 'INZ Credibility Interview Masterclass',
    pillarDescription: 'Expert strategies to ace your Immigration New Zealand credibility interview. Learn what visa officers look for and how to present yourself.',
    icon: Users,
    gradient: 'from-purple-600 via-pink-600 to-rose-600',
    lightBg: 'bg-purple-50 dark:bg-purple-950/30',
    clusters: [
      'Common Questions', 'GTE Assessment', 'Financial Questions',
      'Career Goals', 'University Choice', 'Ties to India'
    ],
    primaryCTA: { text: 'Practice Interview', url: '#interview-flow' },
    secondaryCTA: { text: 'Book Consultation', url: 'https://wa.me/918758750036' },
  },
  {
    id: 'nz-universities',
    pillarTitle: 'All 8 New Zealand Universities Guide',
    pillarDescription: 'Comprehensive guide to all 8 QS-ranked New Zealand universities. Rankings, programs, fees, and admission requirements for Indian students.',
    icon: GraduationCap,
    gradient: 'from-blue-600 via-cyan-600 to-teal-600',
    lightBg: 'bg-blue-50 dark:bg-blue-950/30',
    clusters: [
      'University of Auckland', 'University of Otago', 'Victoria Wellington',
      'University of Canterbury', 'Massey University', 'AUT Auckland'
    ],
    primaryCTA: { text: 'Find Courses', url: 'https://nz.eecglobal.com' },
    secondaryCTA: { text: 'Compare All', url: 'https://courses.eecglobal.com' },
  },
  {
    id: 'financial-planning',
    pillarTitle: 'Financial Requirements & FTS Scheme',
    pillarDescription: 'Complete guide to meeting New Zealand student visa financial requirements. FTS scheme explained, document preparation, and sponsor guidelines.',
    icon: DollarSign,
    gradient: 'from-emerald-600 via-green-600 to-teal-600',
    lightBg: 'bg-emerald-50 dark:bg-emerald-950/30',
    clusters: [
      'FTS Scheme', 'Living Costs', 'Tuition Fees',
      'Education Loans', 'Sponsor Requirements', 'Bank Statements'
    ],
    primaryCTA: { text: 'Financial Prep', url: '#financial-dossier' },
    secondaryCTA: { text: 'Loan Guidance', url: 'https://eecglobal.com/education-loans' },
  },
  {
    id: 'post-study',
    pillarTitle: 'Post-Study Work Visa & PR Pathway',
    pillarDescription: 'Your guide to career opportunities after studying in New Zealand. PSWV, skilled migrant category, and permanent residency pathway explained.',
    icon: Briefcase,
    gradient: 'from-amber-600 via-orange-600 to-red-600',
    lightBg: 'bg-amber-50 dark:bg-amber-950/30',
    clusters: [
      'Post-Study Work Visa', 'Job Market', 'Skilled Migrant',
      'Occupation Lists', 'Partner Rights', 'Salary Expectations'
    ],
    primaryCTA: { text: 'Career Counselor', url: '/career-counselor' },
    secondaryCTA: { text: 'PR Calculator', url: 'https://australia.eecglobal.com/prpointscalculator' },
  },
  {
    id: 'test-prep',
    pillarTitle: 'IELTS & PTE Preparation for NZ',
    pillarDescription: 'Score requirements and preparation strategies for English tests required for New Zealand student visa and university admission.',
    icon: BookOpen,
    gradient: 'from-rose-600 via-red-600 to-orange-600',
    lightBg: 'bg-rose-50 dark:bg-rose-950/30',
    clusters: [
      'IELTS Academic', 'PTE Academic', 'Score Requirements',
      'Preparation Tips', 'Test Booking', 'Score Improvement'
    ],
    primaryCTA: { text: 'IELTS Coaching', url: 'https://eecglobal.com/ielts' },
    secondaryCTA: { text: 'PTE Coaching', url: 'https://eecglobal.com/pte' },
  },
];

// =============================================================================
// INTERNAL LINKS DATA
// =============================================================================

const INTERNAL_LINKS = {
  visaPrep: [
    { text: 'USA F-1 Visa Prep', url: '/usa-f1-visa' },
    { text: 'UK Pre-CAS Prep', url: '/uk-precas' },
    { text: 'Australia GS Prep', url: '/australia-gs-prep' },
    { text: 'Germany Visa Prep', url: 'https://ai.eecglobal.com/germanyvisaprep' },
  ],
  courseSearch: [
    { text: 'NZ Courses', url: 'https://nz.eecglobal.com' },
    { text: 'All Countries', url: 'https://courses.eecglobal.com' },
    { text: 'Career Counselor', url: '/career-counselor' },
  ],
  mainSite: [
    { text: 'EEC Main Website', url: 'https://eecglobal.com' },
    { text: 'Contact Us', url: 'https://eecglobal.com/locations' },
    { text: 'About EEC', url: 'https://eecglobal.com/about' },
  ],
};

// =============================================================================
// ELEGANT PILLAR CARD COMPONENT
// =============================================================================

const PillarCard: React.FC<{ pillar: typeof PILLAR_CLUSTERS[0]; index: number }> = ({ pillar, index }) => {
  const Icon = pillar.icon;

  return (
    <article 
      className={`group relative h-full bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-${pillar.gradient.split('-')[1]}-500/20 hover:-translate-y-2`}
      itemScope
      itemType="https://schema.org/Article"
    >
      {/* Dynamic Glow Border */}
      <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} style={{ padding: '1px', borderRadius: '2.5rem', mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)' }} />

      {/* Decorative Gradient Orb */}
      <div className={`absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br ${pillar.gradient} opacity-[0.08] rounded-full blur-3xl group-hover:opacity-20 group-hover:scale-110 transition-all duration-1000`} />
      
      {/* Header */}
      <header className="relative p-8 pb-0">
        <div className="flex items-start justify-between mb-6">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center shadow-lg shadow-${pillar.gradient.split('-')[1]}-500/30 group-hover:scale-110 transition-transform duration-500`}>
            <Icon className="h-8 w-8 text-white" strokeWidth={1.5} />
          </div>
          <span className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100 text-[10px] font-black uppercase tracking-[0.2em] border border-slate-200 dark:border-slate-700">
            Pillar 0{index + 1}
          </span>
        </div>

        <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-600 dark:group-hover:from-white dark:group-hover:to-slate-300 transition-all" itemProp="headline">
          {pillar.pillarTitle}
        </h3>
      </header>

      {/* Content */}
      <div className="relative p-8 pt-4 flex flex-col h-full">
        <p className="text-slate-600 group-hover:text-slate-900 dark:text-slate-400 group-hover:dark:text-slate-100 text-sm leading-relaxed mb-8 font-medium" itemProp="description">
          {pillar.pillarDescription}
        </p>

        {/* Cluster Topics */}
        <div className="mb-8 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
          <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-100 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <Layers className="h-3.5 w-3.5" />
            Core Modules
          </h4>
          <div className="flex flex-wrap gap-2">
            {pillar.clusters.map((cluster, i) => (
              <span 
                key={i}
                className="text-[11px] font-bold px-3 py-1.5 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors shadow-sm"
              >
                {cluster}
              </span>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-auto grid grid-cols-2 gap-3">
          <a 
            href={pillar.primaryCTA.url}
            className={`group/btn relative overflow-hidden flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r ${pillar.gradient} text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-${pillar.gradient.split('-')[1]}-500/20 hover:shadow-xl transition-all`}
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              {pillar.primaryCTA.text}
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </a>
          <a 
            href={pillar.secondaryCTA.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all hover:scale-[1.02]"
          >
            {pillar.secondaryCTA.text}
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </article>
  );
};

// =============================================================================
// MAIN TOPICAL CLUSTERS COMPONENT
// =============================================================================

export const TopicalClusters: React.FC = () => {
  return (
    <section 
      className="mt-16 py-16 lg:py-24 relative overflow-hidden"
      aria-labelledby="topical-clusters-heading"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/30 via-white to-purple-50/30 dark:from-indigo-950/10 dark:via-slate-950 dark:to-purple-950/10" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <header className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 text-slate-900 dark:text-white mb-8 shadow-lg shadow-indigo-500/10">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span className="text-xs font-bold tracking-widest uppercase">Complete Knowledge Architecture</span>
          </div>
          
          <h2 
            id="topical-clusters-heading"
            className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-500"
            data-speakable="true"
          >
            Your Complete <br className="md:hidden" />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              NZ Study Blueprint
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Expert resources covering every aspect of your New Zealand study journey. 
            Developed by <strong className="text-indigo-600 dark:text-indigo-400">ENZRA certified counselors</strong> with 28+ years of experience.
          </p>
        </header>

        {/* Pillar Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {PILLAR_CLUSTERS.map((pillar, index) => (
            <PillarCard key={pillar.id} pillar={pillar} index={index} />
          ))}
        </div>

        {/* Internal Links Section */}
        <div className="relative pt-12 border-t border-slate-200 dark:border-slate-800">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Other Visa Prep Tools', icon: Globe, color: 'text-indigo-500', gradient: 'from-indigo-500/20 to-indigo-500/5', links: INTERNAL_LINKS.visaPrep },
              { title: 'Find Your Course', icon: Target, color: 'text-purple-500', gradient: 'from-purple-500/20 to-purple-500/5', links: INTERNAL_LINKS.courseSearch },
              { title: 'About EEC', icon: Award, color: 'text-emerald-500', gradient: 'from-emerald-500/20 to-emerald-500/5', links: INTERNAL_LINKS.mainSite },
            ].map((section, idx) => (
              <nav 
                key={idx}
                className="group bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all hover:shadow-xl"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <section.icon className={`h-6 w-6 ${section.color}`} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a 
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group/link"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover/link:bg-indigo-500 transition-colors" />
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-20">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 dark:bg-white p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.2),transparent),radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.2),transparent)] opacity-50" />
            
            <div className="relative grid grid-cols-2 md:grid-cols-5 gap-8">
              {[
                { value: '8', label: 'NZ Universities', icon: GraduationCap },
                { value: '1.3k+', label: 'Course Options', icon: BookOpen },
                { value: '3 Yr', label: 'Work Visa', icon: Briefcase },
                { value: '100%', label: 'Free AI Tool', icon: Sparkles },
                { value: '28+', label: 'Years Exp.', icon: Award },
              ].map((stat, idx) => (
                <div key={idx} className="text-center group">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-white/10 dark:bg-slate-900/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-white/10 dark:border-slate-900/10">
                    <stat.icon className="h-6 w-6 text-white dark:text-slate-900" strokeWidth={1.5} />
                  </div>
                  <p className="text-3xl lg:text-4xl font-black text-white dark:text-slate-900 mb-1 tracking-tight">{stat.value}</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopicalClusters;
