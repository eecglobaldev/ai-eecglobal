/**
 * ============================================================================
 * EEC EXPERT AUTHOR PROFILES - ULTRA NEO-MODERN EDITION
 * ============================================================================
 * 
 * A world-class expert showcase featuring:
 * - Holographic profile cards with dynamic lighting
 * - Premium floating stat indicators
 * - Interactive credential verification system
 * - Cinematic typography and micro-interactions
 * - Full Person schema for E-E-A-T dominance
 * 
 * ============================================================================
 */

import React, { useState } from 'react';
import {
  Award,
  Linkedin,
  ExternalLink,
  GraduationCap,
  Star,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Trophy,
  TrendingUp,
  Users,
  BookOpen,
  Briefcase,
  Shield,
  Zap,
  ArrowRight,
  BadgeCheck,
  Clock,
  Target,
  Building2,
  Globe2,
  Flame,
  UserCircle2,
  Mail,
  FileCheck,
  Rocket,
  Crown,
  MessageCircle
} from 'lucide-react';

// =============================================================================
// EXPERT DATA
// =============================================================================

interface ExpertProfile {
  id: string;
  name: string;
  title: string;
  role: string;
  organization: string;
  initials: string;
  profileImage: string;
  description: string;
  expertise: string[];
  credentials: { name: string; issuer: string; verificationUrl?: string }[];
  education: { degree: string; institution: string; country: string }[];
  experience: string;
  linkedin?: string;
  specializations: string[];
  achievements: string[];
  articlesAuthored: number;
  studentsHelped: string;
  gradient: string;
  accentColor: string;
  glowColor: string;
  sameAs: string[];
}

const EXPERTS: ExpertProfile[] = [
  {
    id: 'kshitij-garg',
    name: 'Kshitij Garg',
    title: 'Managing Director',
    role: 'NZ University Admissions Expert',
    organization: 'ESTERO New Zealand',
    initials: 'KG',
    profileImage: '/assets/Kshitij-Garg.jpg',
    description: 'University of Auckland alumnus and NZ Permanent Resident with over 15 years in international education. Has personally guided 5,000+ students to New Zealand universities.',
    expertise: ['NZ University Admissions', 'Scholarship Negotiations', 'Post-Study Work Strategy', 'Auckland Settlement'],
    credentials: [
      { name: 'ENZRA Certified Agent', issuer: 'Education New Zealand' },
      { name: 'NZ Permanent Resident', issuer: 'Immigration NZ' },
      { name: 'Certified Education Agent', issuer: 'NZQA' }
    ],
    education: [{ degree: 'MBA', institution: 'University of Auckland', country: '🇳🇿' }],
    experience: '15+ years',
    linkedin: 'https://linkedin.com/in/kshitij-garg-4b67a1b',
    specializations: ['University of Auckland applications', 'AUT admissions', 'IT & Business programs'],
    achievements: [ 'Featured at ENZ conferences', 'Established ESTERO-EEC partnership'],
    articlesAuthored: 45,
    studentsHelped: '5,000+',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
    accentColor: 'cyan',
    glowColor: 'cyan-500/30',
    sameAs: ['https://linkedin.com/in/kshitij-garg-4b67a1b', 'https://www.estero.co.nz']
  },
  {
    id: 'amit-jalan',
    name: 'Amit Jalan',
    title: 'Managing Director',
    role: 'Immigration Strategy Expert',
    organization: 'EEC',
    initials: 'AJ',
    profileImage: '/assets/Amit-Jalan.jpeg',
    description: 'Purdue University alumnus with 28+ years in international education consulting. Founded EEC in 1997, growing it to 26 branches. US and UK embassy training invitee.',
    expertise: ['Immigration Strategy', 'Complex Visa Cases', 'AI Tool Strategy', 'Education Policy'],
    credentials: [
      { name: 'AIRC Certified', issuer: 'American International Recruitment Council', verificationUrl: 'https://airceducation.app.neoncrm.com/membership-directory/details/5?memberId=9367' },
      { name: 'ICEF Accredited', issuer: 'ICEF', verificationUrl: 'https://www.icef.com/agency/00120000014SG0aAAG' },
      { name: 'U.S. News Certified', issuer: 'U.S. News & World Report', verificationUrl: 'https://www.credential.net/97326517-ea1a-4c00-8e76-dd3be34c91fe' }
    ],
    education: [
      { degree: '', institution: 'Purdue University', country: '🇺🇸' },
     ],
    experience: '28+ years',
    linkedin: 'https://in.linkedin.com/in/amitjalan',
    specializations: ['INZ policy interpretation', 'Visa refusal appeals', 'High-risk profiles'],
    achievements: ['Founded EEC (1997)', '26-branch network', 'US Embassy training invitee', 'Only AIRC + U.S. News certified in India'],
    articlesAuthored: 120,
    studentsHelped: '10000+',
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-600',
    accentColor: 'violet',
    glowColor: 'violet-500/30',
    sameAs: ['https://in.linkedin.com/in/amitjalan', 'https://eecglobal.com']
  },
  {
    id: 'madhav-gupta',
    name: 'CA Madhav Gupta',
    title: 'Director',
    role: 'Financial Documentation Specialist',
    organization: 'EEC',
    initials: 'MG',
    profileImage: '/assets/Madhav-Gupta.jpeg',
    description: 'Chartered Accountant (ICAI Member: 421209) specializing in financial documentation for student visas. Reviewed 5000+ CA certificates with deep FTS expertise.',
    expertise: ['FTS Documentation', 'Source of Funds Verification', 'CA Certificate Preparation', 'Financial Case Building'],
    credentials: [
      { name: 'Chartered Accountant', issuer: 'ICAI (Member: 421209)', verificationUrl: 'https://www.icai.org' },
      { name: 'Financial Documentation Specialist', issuer: 'EEC' }
    ],
    education: [
      { degree: 'CA', institution: 'ICAI', country: '🇮🇳' },
      { degree: 'B.Com', institution: 'Mumbai University', country: '🇮🇳' }
    ],
    experience: '12+ years',
    linkedin: 'https://in.linkedin.com/in/madhav-gupta-9027781a7',
    specializations: ['NZD 20,000 FTS compliance', 'Bank statement analysis', 'Income verification'],
    achievements: ['Reviewed 5000+ CA certificates', 'Zero financial doc rejections in 2024', 'EEC financial verification framework'],
    articlesAuthored: 35,
    studentsHelped: '5000+',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
    accentColor: 'emerald',
    glowColor: 'emerald-500/30',
    sameAs: ['https://in.linkedin.com/in/madhav-gupta-9027781a7']
  },
  {
    id: 'anirudh-gupta',
    name: 'Anirudh Gupta',
    title: 'Vice President',
    role: 'GTE Assessment Expert',
    organization: 'EEC',
    initials: 'AG',
    profileImage: '/assets/Anirudh-Gupta.jpeg',
    description: 'Bond University alumnus and lead intentions auditor. Specializes in GTE assessment and SOP review with expertise in identifying red flags before submission.',
    expertise: ['GTE Assessment', 'SOP Review', 'Return Intent Strategy', 'Profile Risk Analysis'],
    credentials: [
      
      { name: 'GTE Assessment Specialist', issuer: 'EEC' }
    ],
    education: [{ degree: 'Bachelor of Business Administration', institution: 'Bond University', country: '🇦🇺' }],
    experience: '20+ years',
    linkedin: 'https://in.linkedin.com/in/anirudhkrgupta',
    specializations: ['GTE compliance', 'Career gap explanation', 'Study gap justification'],
    achievements: ['Developed EEC GTE framework', 'Trained 50+ counselors', '98% GTE approval rate'],
    articlesAuthored: 28,
    studentsHelped: '1000+',
    gradient: 'from-amber-500 via-orange-500 to-red-600',
    accentColor: 'amber',
    glowColor: 'amber-500/30',
    sameAs: ['https://in.linkedin.com/in/anirudhkrgupta']
  },
  {
    id: 'mohita-gupta',
    name: 'Mohita Gupta',
    title: 'VP Counselling',
    role: 'Credibility Interview Specialist',
    organization: 'EEC',
    initials: 'MoG',
    profileImage: '/assets/mohita-gupta.jpeg',
    description: 'Former Citibank investment banker turned education counselor. Brings corporate rigor to visa interview prep, specializing in high-risk profiles.',
    expertise: ['Credibility Interview Coaching', 'High-Risk Profiles', 'Mock Interviews', 'Communication Training'],
    credentials: [
      { name: 'Certified Career Counselor', issuer: '' },
      { name: 'Interview Skills Trainer', issuer: 'EEC' }
    ],
    education: [
      { degree: 'MBA Finance', institution: 'ICFAI Business School', country: '🇮🇳' },
    ],
    experience: '15+ years',
    linkedin: 'https://in.linkedin.com/in/mohita-gupta-233383339',
    specializations: ['INZ credibility interviews', 'VFS center preparation', 'Body language coaching'],
    achievements: ['Former Citibank VP', 'EEC mock interview framework', '100+ students trained monthly'],
    articlesAuthored: 42,
    studentsHelped: '1500+',
    gradient: 'from-rose-500 via-pink-500 to-fuchsia-600',
    accentColor: 'rose',
    glowColor: 'rose-500/30',
    sameAs: ['https://in.linkedin.com/in/mohita-gupta-233383339']
  }
];

// =============================================================================
// ULTRA NEO-MODERN EXPERT CARD
// =============================================================================

const UltraExpertCard: React.FC<{ expert: ExpertProfile; index: number; featured?: boolean }> = ({ expert, index, featured }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <article 
      className="group relative"
      id={`expert-${expert.id}`}
      itemScope
      itemType="https://schema.org/Person"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Dynamic Holographic Glow */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${expert.gradient} rounded-[2rem] blur-xl opacity-0 group-hover:opacity-50 transition-all duration-700`} />
      
      {/* Card Container - Horizontal Layout */}
      <div className={`relative h-full bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-${expert.accentColor}-500/10 hover:-translate-y-1 ${
        featured ? 'ring-2 ring-amber-400 dark:ring-amber-500' : ''
      }`}>
        
        {/* Decorative Corner */}
        <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${expert.gradient} opacity-10 rounded-bl-[100px] transition-transform duration-700 group-hover:scale-110`} />
        
        {/* Background Effects */}
        <div className={`absolute inset-0 bg-gradient-to-br ${expert.gradient} opacity-[0.02] dark:opacity-[0.05]`} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
        
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 right-4 z-30">
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg">
              <Crown className="h-3 w-3" />
              <span className="uppercase tracking-widest">Lead Expert</span>
            </div>
          </div>
        )}

        {/* Horizontal Content Layout */}
        <div className="relative flex flex-col md:flex-row gap-6 p-6">
          {/* Left Column - Avatar & Stats */}
          <div className="flex flex-col items-center md:items-start gap-4 md:w-48 flex-shrink-0">
            {/* Avatar with Dynamic Ring - Showing Initials Only */}
            <div className="relative group/avatar">
              <div className={`absolute -inset-2 bg-gradient-to-br ${expert.gradient} rounded-2xl blur-md opacity-50 group-hover/avatar:opacity-80 transition-opacity duration-500`} />
              <div className={`relative w-28 h-28 rounded-xl bg-gradient-to-br ${expert.gradient} flex items-center justify-center shadow-xl`}>
                <span className="text-3xl font-black text-white">
                  {expert.initials}
                </span>
              </div>
            </div>

            {/* Compact Stats */}
            <div className="w-full space-y-2">
              {[
                { icon: Clock, label: 'Experience', value: expert.experience },
                { icon: Users, label: 'Guided', value: expert.studentsHelped },
                { icon: BookOpen, label: 'Articles', value: expert.articlesAuthored },
              ].map((stat, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                  <div className={`p-1.5 rounded-md bg-gradient-to-br ${expert.gradient} flex items-center justify-center`}>
                    <stat.icon className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">{stat.value}</p>
                    <p className="text-[9px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-0.5">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="flex-1 min-w-0">
            {/* Name & Title */}
            <div className="mb-4">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-1 leading-tight" itemProp="name">
                {expert.name}
              </h3>
              <p className={`text-transparent bg-clip-text bg-gradient-to-r ${expert.gradient} font-bold text-base mb-2`} itemProp="jobTitle">
                {expert.title}
              </p>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                <Building2 className="h-4 w-4" />
                <span itemProp="worksFor">{expert.organization}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4 font-medium text-sm" itemProp="description">
              {expert.description}
            </p>

            {/* Expertise Tags */}
            <div className="mb-4">
              <h4 className="text-[10px] font-black text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5 uppercase tracking-[0.15em]">
                <Zap className="h-3 w-3 text-amber-500" />
                Core Expertise
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {expert.expertise.map((area) => (
                  <span 
                    key={area}
                    className="text-[11px] px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-bold border border-slate-200 dark:border-slate-700"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Credentials */}
            <div className="mb-4">
              <h4 className="text-[10px] font-black text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5 uppercase tracking-[0.15em]">
                <BadgeCheck className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                Official Credentials
              </h4>
              <div className="space-y-2">
                {expert.credentials.slice(0, expanded ? undefined : 2).map((cred, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <FileCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900 dark:text-white text-xs leading-tight">{cred.name}</p>
                      <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">{cred.issuer}</p>
                      {cred.verificationUrl && (
                        <a 
                          href={cred.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline mt-1"
                        >
                          Verify <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expanded Content */}
            {expanded && (
              <div className="space-y-4 pt-4 border-t-2 border-slate-200 dark:border-slate-700">
                {/* Education */}
                <div>
                  <h4 className="text-[10px] font-black text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5 uppercase tracking-[0.15em]">
                    <GraduationCap className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                    Education
                  </h4>
                  <div className="space-y-1.5">
                    {expert.education.map((edu, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 pl-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/30">
                        {/* <span className="text-lg">{edu.country}</span> */}
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">{edu.degree}</p>
                          <p className="text-[10px] text-slate-600 dark:text-slate-400">{edu.institution}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Specializations */}
                <div>
                  <h4 className="text-[10px] font-black text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5 uppercase tracking-[0.15em]">
                    <Target className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                    Specializations
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {expert.specializations.map((spec, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-md font-semibold border border-purple-200 dark:border-purple-900/30">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Achievements */}
                <div>
                  <h4 className="text-[10px] font-black text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5 uppercase tracking-[0.15em]">
                    <Trophy className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-1.5">
                    {expert.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2 p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-900/30">
                        <TrendingUp className="h-3 w-3 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug font-medium">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setExpanded(!expanded)}
                className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg font-bold text-xs transition-all ${
                  expanded 
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <UserCircle2 className="h-3.5 w-3.5" />
                {expanded ? 'Show Less' : 'Full Profile'}
                {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </button>
              
              {expert.linkedin && (
                <a
                  href={expert.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#0077B5] text-white text-xs font-bold rounded-lg hover:bg-[#005885] transition-all shadow-md"
                  itemProp="sameAs"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                  Connect
                  <ArrowRight className="h-3 w-3 opacity-0 -ml-2 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

// =============================================================================
// MAIN AUTHOR PROFILES COMPONENT
// =============================================================================

export const AuthorProfiles: React.FC = () => {
  const personSchemas = EXPERTS.map(expert => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `/nzvisaprep/#expert-${expert.id}`,
    "name": expert.name,
    "jobTitle": expert.title,
    "description": expert.description,
    "worksFor": { "@type": "Organization", "name": expert.organization },
    "alumniOf": expert.education.map(edu => ({ "@type": "EducationalOrganization", "name": edu.institution })),
    "knowsAbout": expert.expertise,
    "sameAs": expert.sameAs
  }));

  return (
    <section 
      className="mt-16 py-24 lg:py-32 relative overflow-hidden"
      aria-labelledby="experts-heading"
      id="expert-team"
    >
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-[#0B0F19]">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        
        {/* Animated Mesh Gradients */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-amber-400 to-orange-400 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-violet-400 to-purple-400 rounded-full blur-[120px] animate-pulse delay-700" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-rose-400 to-pink-400 rounded-full blur-[150px] opacity-40" />
        </div>
      </div>

      {/* Schemas */}
      {personSchemas.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 text-slate-900 dark:text-white text-sm font-bold px-5 py-2.5 rounded-full mb-8 shadow-lg shadow-amber-500/10">
            <Rocket className="h-4 w-4 text-amber-500" />
            <span>Meet Your Expert Team</span>
            <Sparkles className="h-4 w-4 text-amber-500" />
          </div>
          
          {/* Title */}
          <h2 
            id="experts-heading"
            className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-8"
            data-speakable="true"
          >
            <span className="text-slate-900 dark:text-white">NZ Visa</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-red-500">
              Expert Team
            </span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
            Guided by{' '}
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">ENZRA certified professionals</span>{' '}
            with 75+ combined years and 10,000+ success stories
          </p>
        </header>

        {/* Expert Cards Grid - Full Width Horizontal Cards */}
        <div className="space-y-6 mb-24">
          {EXPERTS.map((expert, idx) => (
            <UltraExpertCard key={expert.id} expert={expert} index={idx} featured={idx === 0} />
          ))}
        </div>

        {/* Ultra Premium Team Stats */}
        <div className="relative group">
          {/* Glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/30 via-orange-500/30 to-red-500/30 rounded-[2.5rem] blur-3xl group-hover:blur-2xl transition-all duration-500" />
          
          {/* Card */}
          <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 rounded-[2.3rem] p-6 lg:p-16 overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-orange-500/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
            
            <div className="relative z-10">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-2xl shadow-amber-500/30">
                    <Shield className="h-8 w-8 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white tracking-tight">Combined Team Power</h3>
                    <p className="text-slate-400 font-medium">Your success backed by collective excellence</p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">
                  <Flame className="h-4 w-4 text-amber-400" />
                  <span className="text-white text-xs font-bold uppercase tracking-widest">Elite Squad</span>
                </div>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { icon: Clock, value: '75+', label: 'Years Experience', gradient: 'from-cyan-400 to-blue-500', shadow: 'shadow-cyan-500/30' },
                  { icon: Users, value: '100K+', label: 'Students Guided', gradient: 'from-violet-400 to-purple-500', shadow: 'shadow-violet-500/30' },
                  { icon: BookOpen, value: '270+', label: 'Articles Published', gradient: 'from-emerald-400 to-teal-500', shadow: 'shadow-emerald-500/30' },
                  { icon: BadgeCheck, value: '15+', label: 'Certifications', gradient: 'from-amber-400 to-orange-500', shadow: 'shadow-amber-500/30' },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="group/stat flex flex-col items-center text-center p-6 sm:p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105"
                  >
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4 sm:mb-5 shadow-xl ${stat.shadow} group-hover/stat:scale-110 group-hover/stat:rotate-3 transition-transform`}
                    >
                      <stat.icon className="h-7 w-7 text-white" strokeWidth={2.5} />
                    </div>
                    <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 mb-1 sm:mb-2">
                      {stat.value}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-400 font-bold tracking-wide">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* CTA */}
              <div className="mt-12 text-center">
                <a
                  href="https://wa.me/918758750036"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/cta inline-flex items-center gap-3 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 hover:from-amber-500 hover:via-orange-600 hover:to-red-600 text-white font-black px-10 py-5 rounded-2xl shadow-2xl shadow-amber-500/40 hover:shadow-amber-500/60 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                >
                  <MessageCircle className="h-6 w-6 fill-current" />
                  <span className="text-lg">Connect With Our Experts</span>
                  <ArrowRight className="h-6 w-6 group-hover/cta:translate-x-2 transition-transform" />
                </a>
                <p className="text-slate-400 text-sm mt-4 font-medium">
                  Free consultation • Response within 2 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorProfiles;
