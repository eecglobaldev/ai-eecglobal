/**
 * ============================================================================
 * EEC E-E-A-T TRUST & CREDIBILITY ENGINE - NEO-MODERN EDITION
 * ============================================================================
 * 
 * A powerhouse component for establishing authority featuring:
 * - Holographic trust badges
 * - Floating citation cards with glassmorphism
 * - Interactive validity indicators
 * - Premium gradient typography
 * - Dynamic "verified" animations
 * 
 * ============================================================================
 */

import React from 'react';
import ReactCountryFlag from "react-country-flag";
import {
  Award,
  Shield,
  BookOpen,
  ExternalLink,
  CheckCircle2,
  Star,
  GraduationCap,
  Building2,
  Globe,
  FileCheck,
  BadgeCheck,
  Clock,
  MapPin,
  Users,
  Verified,
  Trophy,
  Sparkles,
  ArrowRight,
  Landmark,
  Stamp
} from 'lucide-react';

// =============================================================================
// AUTHORITATIVE CITATIONS DATA
// =============================================================================

interface Citation {
  name: string;
  description: string;
  url: string;
  type: 'government' | 'education' | 'ranking' | 'certification';
  icon: string;
  color: string;
}

const AUTHORITATIVE_CITATIONS: Citation[] = [
  {
    name: 'Immigration New Zealand (INZ)',
    description: 'Official NZ government immigration authority',
    url: 'https://www.immigration.govt.nz',
    type: 'government',
    icon: '🏛️',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    name: 'Education New Zealand (ENZ)',
    description: 'Government agency promoting NZ education',
    url: 'https://www.studyinnewzealand.govt.nz',
    type: 'government',
    icon: '🎓',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    name: 'NZQA',
    description: 'NZ Qualifications Authority',
    url: 'https://www.nzqa.govt.nz',
    type: 'government',
    icon: '✅',
    color: 'from-violet-500 to-purple-600'
  },
  {
    name: 'QS World Rankings',
    description: 'All 8 NZ universities ranked',
    url: 'https://www.topuniversities.com',
    type: 'ranking',
    icon: '🏆',
    color: 'from-amber-500 to-orange-600'
  },
  {
    name: 'AIRC Certification',
    description: 'EEC certified until 2031',
    url: 'https://airceducation.app.neoncrm.com/membership-directory/details/5?memberId=9367',
    type: 'certification',
    icon: '🎖️',
    color: 'from-rose-500 to-pink-600'
  },
  {
    name: 'U.S. News Certified',
    description: 'Only Indian agency certified',
    url: 'https://www.credential.net/97326517-ea1a-4c00-8e76-dd3be34c91fe',
    type: 'certification',
    icon: '🌟',
    color: 'from-cyan-500 to-blue-600'
  }
];

// =============================================================================
// TRUST CERTIFICATIONS DATA
// =============================================================================

const TRUST_CERTIFICATIONS = [
  { 
    name: 'AIRC', 
    fullName: 'American International Recruitment Council',
    validity: 'Until 2031', 
    verified: true,
    premium: true,
    color: 'from-amber-500 via-orange-500 to-red-500',
    shadow: 'shadow-orange-500/25',
    logo: 'https://ai.eecglobal.com/assets/unilogo/airclogo.png',
  },
  { 
    name: 'ICEF IAS', 
    fullName: 'ICEF Agency Status',
    validity: 'Current', 
    verified: true,
    premium: false,
    color: 'from-blue-500 via-indigo-500 to-violet-500',
    shadow: 'shadow-indigo-500/25',
    logo: 'https://ai.eecglobal.com/assets/unilogo/icef-logo.png'
  },
  { 
    name: 'U.S. News', 
    fullName: 'Global Education Certified',
    validity: 'Only in India', 
    verified: true,
    premium: true,
    color: 'from-rose-500 via-pink-500 to-fuchsia-500',
    shadow: 'shadow-pink-500/25',
    logo: 'https://ai.eecglobal.com/assets/unilogo/usnews-logo.png'
  },
  { 
    name: 'ENZRA', 
    fullName: 'Education NZ Recognized',
    validity: 'Current', 
    verified: true,
    premium: true,
    color: 'from-emerald-500 via-teal-500 to-cyan-500',
    shadow: 'shadow-emerald-500/25',
    logo: 'https://ai.eecglobal.com/assets/unilogo/enzra-logo.jpeg'
  },
  { 
    name: 'British Council', 
    fullName: 'QAEAT Certified',
    validity: 'Current', 
    verified: true,
    premium: false,
    color: 'from-violet-500 via-purple-500 to-fuchsia-500',
    shadow: 'shadow-purple-500/25',
    logo: 'https://ai.eecglobal.com/assets/unilogo/british-council-logo.jpeg'
  },
  { 
    name: 'Australia PIER', 
    fullName: 'Professional Int\'l Education Resources',
    validity: 'Current', 
    verified: true,
    premium: false,
    color: 'from-cyan-500 via-sky-500 to-blue-500',
    shadow: 'shadow-blue-500/25',
    logo: 'https://ai.eecglobal.com/assets/unilogo/australia-pier-logo.jpeg'
  },
];

// =============================================================================
// NEO-MODERN CERTIFICATION CARD
// =============================================================================

const NeoCertificationCard: React.FC<{ cert: typeof TRUST_CERTIFICATIONS[0]; index: number }> = ({ cert, index }) => (
  <div 
    className="group relative"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    {/* Dynamic Glow */}
    <div className={`absolute -inset-0.5 bg-gradient-to-r ${cert.color} rounded-[2.5rem] blur opacity-20 group-hover:opacity-60 transition-all duration-500`} />
    
    <div className="relative h-full bg-white dark:bg-slate-900 rounded-[2.5rem] p-1 overflow-hidden">
      <div className="relative h-full bg-slate-50 dark:bg-[#0B0F19] rounded-[2.3rem] p-8 overflow-hidden transition-all duration-300 group-hover:scale-[1.02]">
        
        {/* Decorative Corner */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cert.color} opacity-10 rounded-bl-[100px] transition-transform duration-700 group-hover:scale-110`} />

        {/* Premium Badge */}
        {cert.premium && (
          <div className="absolute top-0 right-0 z-10">
            <div className={`bg-gradient-to-bl ${cert.color} text-white text-[10px] font-black px-4 py-2 rounded-bl-3xl shadow-lg`}>
              PREMIUM
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-start gap-5 mb-6 relative z-10">
          {/* <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg  group-hover:scale-110 transition-transform duration-300 overflow-hidden`}> */}
            <div>
            {cert.logo ? (
              <img 
                src={cert.logo} 
                alt={`${cert.name} logo`} 
                className="object-contain  h-10 h-16" 
                // style={{ maxWidth: '3rem', maxHeight: '3rem' }}
              />
            ) : (
              <BadgeCheck className="h-8 w-8 text-white" strokeWidth={2} />
            )}
          </div>
          <div className="flex-1 pt-1">
            <h4 className="font-black text-2xl text-slate-900 dark:text-white leading-tight tracking-tight">
              {cert.name}
            </h4>
            {cert.verified && (
              <div className="flex items-center gap-1.5 mt-1.5 text-emerald-600 dark:text-emerald-400">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 rounded-full p-0.5">
                  <Verified className="h-3.5 w-3.5 fill-current" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">Verified</span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <p className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-6 line-clamp-2 relative z-10 leading-relaxed">
          {cert.fullName}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800 relative z-10">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <Clock className="h-3 w-3" /> Validity
          </span>
          <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${cert.premium ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900' : 'bg-white text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'}`}>
            {cert.validity}
          </span>
        </div>
      </div>
    </div>
  </div>
);

// =============================================================================
// CITATION LINK COMPONENT
// =============================================================================

const CitationLink: React.FC<{ citation: Citation }> = ({ citation }) => (
  <a
    href={citation.url}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative flex items-center gap-3 sm:gap-4 lg:gap-5 p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl lg:rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-transparent transition-all duration-300 overflow-hidden hover:shadow-lg min-w-0"
  >
    {/* Hover Gradient Border */}
    <div className={`absolute inset-0 bg-gradient-to-r ${citation.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
    <div className={`absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r ${citation.color} group-hover:w-full transition-all duration-500`} />
    
    {/* Icon */}
    <div className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-xl sm:text-2xl lg:text-3xl group-hover:scale-110 transition-transform duration-300 shadow-sm flex-shrink-0">
      {citation.icon}
    </div>
    
    {/* Content */}
    <div className="relative z-10 flex-1 min-w-0">
      <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
        <h4 className="font-black text-slate-900 dark:text-white text-sm sm:text-base group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-600 dark:group-hover:from-white dark:group-hover:to-slate-300 transition-colors tracking-tight break-words">
          {citation.name}
        </h4>
        <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-slate-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0" />
      </div>
      <p className="text-[10px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 break-words line-clamp-2">
        {citation.description}
      </p>
    </div>
  </a>
);

// =============================================================================
// MAIN E-E-A-T COMPONENT
// =============================================================================

export const EEATEnhancement: React.FC = () => {
  return (
    <section 
      className="mt-16 py-24 relative overflow-hidden"
      aria-labelledby="eeat-heading"
    >
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-[#0B0F19]">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 dark:opacity-20">
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-emerald-500 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-teal-500 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse delay-700" />
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 text-slate-900 dark:text-white mb-8 shadow-lg shadow-emerald-500/10">
            <Trophy className="h-4 w-4 text-amber-500" />
            <span className="text-xs font-bold tracking-widest uppercase">Trust & Authority Engine</span>
            <Shield className="h-4 w-4 text-emerald-500" />
          </div>
          
          <h2 
            id="eeat-heading"
            className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-500"
          >
            Unrivaled <br className="md:hidden" />
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Credibility</span>
          </h2>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Built on <span className="text-emerald-600 dark:text-emerald-400 font-bold">28 years</span> of excellence, 
            verified by global authorities, and trusted by over <span className="text-teal-600 dark:text-teal-400 font-bold">100,000 students</span>.
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-24">
          {[
            { icon: Clock, value: '28+', label: 'Years Experience', color: 'from-blue-500 to-indigo-600' },
            { icon: Users, value: '100K+', label: 'Students Guided', color: 'from-emerald-500 to-teal-600' },
            { icon: MapPin, value: '26', label: 'Global Branches', color: 'from-violet-500 to-purple-600' },
            { icon: Award, value: '8+', label: 'Global Awards', color: 'from-amber-500 to-orange-600' },
            { icon: Star, value: '4.9', label: 'Trust Rating', color: 'from-rose-500 to-pink-600' },
          ].map((stat, idx) => (
            <div 
              key={idx}
              className="group relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 hover:border-transparent transition-all duration-500 overflow-hidden hover:shadow-xl hover:-translate-y-1"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl mb-4 group-hover:bg-white/20 transition-colors">
                  <stat.icon className="h-8 w-8 text-slate-400 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <p className="text-4xl font-black text-slate-900 dark:text-white group-hover:text-white transition-colors duration-300 tracking-tight">
                  {stat.value}
                </p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 group-hover:text-white/90 transition-colors duration-300 mt-2">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Grid */}
        <div className="mb-24">
          <div className="flex items-center gap-6 mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
            <div className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 shadow-inner">
              <Stamp className="h-5 w-5 text-emerald-500" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">Official Verifications</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TRUST_CERTIFICATIONS.map((cert, idx) => (
              <NeoCertificationCard key={cert.name} cert={cert} index={idx} />
            ))}
          </div>
        </div>

        {/* Authority Links & Embassy Banner Split */}
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-10 overflow-x-hidden">
          {/* Authority Sources */}
          <div className="relative group h-full min-w-0">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl sm:rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative h-full bg-white dark:bg-[#0B0F19] rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-6 lg:p-10 border border-slate-100 dark:border-slate-800 overflow-hidden">
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-5 mb-4 sm:mb-6 lg:mb-10">
                <div className="p-2 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                  <Landmark className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-slate-900 dark:text-white tracking-tight break-words">Official Sources</h3>
                  <p className="text-[10px] sm:text-xs lg:text-sm font-bold text-slate-500 uppercase tracking-wider mt-1">Verified government data</p>
                </div>
              </div>
              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                {AUTHORITATIVE_CITATIONS.map((citation) => (
                  <CitationLink key={citation.name} citation={citation} />
                ))}
              </div>
            </div>
          </div>

          {/* Embassy Recognition */}
          <div className="relative group h-full min-w-0">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl sm:rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative h-full bg-slate-900 rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-6 lg:p-10 overflow-hidden flex flex-col">
              {/* Background Effects */}
              <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-80 lg:h-80 bg-indigo-500/20 rounded-full blur-[40px] sm:blur-[60px] lg:blur-[100px] -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-28 h-28 sm:w-40 sm:h-40 lg:w-64 lg:h-64 bg-purple-500/10 rounded-full blur-[35px] sm:blur-[50px] lg:blur-[80px] translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10 flex flex-col h-full min-w-0">
                <div className="inline-flex self-start items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 lg:px-4 py-0.5 sm:py-1 lg:py-1.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/20 mb-4 sm:mb-6 lg:mb-8 backdrop-blur-sm">
                  <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 lg:h-3.5 lg:w-3.5" />
                  <span className="text-[8px] sm:text-[9px] lg:text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Elite Recognition</span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-black text-white mb-3 sm:mb-4 lg:mb-6 leading-[1.1] tracking-tight break-words">
                  Invited by <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 break-words">
                    UK & US Embassies
                  </span>
                </h3>

                <p className="text-slate-400 mb-6 sm:mb-8 lg:mb-12 leading-relaxed text-sm sm:text-base lg:text-lg font-medium break-words">
                  EEC holds the rare distinction of being invited by the High Commissions for official counselor training, setting the gold standard in visa guidance.
                </p>

                <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3 lg:gap-4">
                  {[
                    { label: 'US Embassy', sub: 'Training Partner', countryCode: 'US' },
                    { label: 'UK High Comm', sub: 'Official Invitee', countryCode: 'GB' },
                    { label: 'NAFSA', sub: 'Global Member', icon: 'https://www.nafsa.org/themes/custom/nafsa/images/nafsa_logo_main.svg' },
                    { label: 'AIRC', sub: 'Certified', icon: 'https://ai.eecglobal.com/assets/unilogo/airclogo.png' },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-xl lg:rounded-2xl p-4 sm:p-4 lg:p-5 border border-white/10 hover:bg-white/10 transition-colors group/item min-w-0 flex flex-col items-center text-center">
                      <div className="mb-3 sm:mb-3 lg:mb-4 transform group-hover/item:scale-110 transition-transform flex items-center justify-center">
                        {item.countryCode ? (
                          <div className="w-12 h-9 sm:w-14 sm:h-10 lg:w-16 lg:h-12 flex items-center justify-center flex-shrink-0">
                            <ReactCountryFlag
                              countryCode={item.countryCode}
                              svg
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                              }}
                              aria-label={`${item.countryCode} flag`}
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center">
                            <img src={item.icon} alt={item.label} className="h-full w-full object-contain max-w-full" />
                          </div>
                        )}
                      </div>
                      <div className="font-bold text-white text-sm sm:text-sm lg:text-base mb-1 sm:mb-1.5 break-words leading-tight">{item.label}</div>
                      <div className="text-[10px] sm:text-[10px] lg:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider break-words leading-tight">{item.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-20 text-center">
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 max-w-2xl mx-auto flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Data verified against Immigration New Zealand policy manuals. Last audit: December 2025.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EEATEnhancement;
