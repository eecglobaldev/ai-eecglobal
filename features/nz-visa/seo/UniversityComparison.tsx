/**
 * ============================================================================
 * EEC UNIVERSITY COMPARISON ENGINE - ULTRA NEO-MODERN EDITION
 * ============================================================================
 * 
 * A masterclass in data visualization featuring:
 * - Holographic university cards with dynamic rank badges
 * - Interactive sortable matrix table with smooth animations
 * - Premium glassmorphism throughout
 * - Micro-interaction details on every element
 * - Advanced gradient treatments and depth effects
 * 
 * ============================================================================
 */

import React, { useState } from 'react';
import {
  GraduationCap,
  MapPin,
  DollarSign,
  Users,
  Star,
  Globe,
  Award,
  TrendingUp,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Building2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Calendar,
  Flame,
  Zap,
  Target,
  Trophy,
  Layers,
  ArrowUpRight,
  BadgeCheck,
  CircleDot,
  MousePointer2,
  Eye
} from 'lucide-react';

// =============================================================================
// NZ UNIVERSITIES DATA
// =============================================================================

interface University {
  name: string;
  shortName: string;
  location: string;
  qsRanking: number;
  established: number;
  students: string;
  tuitionINR: string;
  popularPrograms: string[];
  scholarshipAvailable: boolean;
  highlights: string[];
  website: string;
  gradient: string;
  shadow: string;
  logo: string;
}

const NZ_UNIVERSITIES: University[] = [
  {
    name: 'University of Auckland',
    shortName: 'UoA',
    location: 'Auckland',
    qsRanking: 68,
    established: 1883,
    students: '42,000+',
    tuitionINR: '₹16-28 lakhs/year',
    popularPrograms: ['MBA', 'Engineering', 'Medicine', 'Law', 'Computer Science'],
    scholarshipAvailable: true,
    highlights: ['#1 in New Zealand', 'Member of Universitas 21', 'Strong industry connections'],
    website: 'https://www.auckland.ac.nz',
    gradient: 'from-blue-500 via-indigo-500 to-violet-600',
    shadow: 'shadow-indigo-500/25',
    logo: 'https://upload.wikimedia.org/wikipedia/en/d/d9/University_of_Auckland_logo.svg',
  },
  {
    name: 'University of Otago',
    shortName: 'Otago',
    location: 'Dunedin',
    qsRanking: 206,
    established: 1869,
    students: '21,000+',
    tuitionINR: '₹14-23 lakhs/year',
    popularPrograms: ['Medicine', 'Dentistry', 'Health Sciences', 'Sciences'],
    scholarshipAvailable: true,
    highlights: ["NZ's oldest university", 'Top medical school', 'Vibrant student city'],
    website: 'https://www.otago.ac.nz',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
    shadow: 'shadow-cyan-500/25',
    logo: 'https://upload.wikimedia.org/wikipedia/en/6/63/University_of_Otago_logo_2024.svg',
  },
  {
    name: 'Victoria University of Wellington',
    shortName: 'VUW',
    location: 'Wellington',
    qsRanking: 241,
    established: 1897,
    students: '22,000+',
    tuitionINR: '₹14-21 lakhs/year',
    popularPrograms: ['Law', 'International Relations', 'Architecture', 'Creative Arts'],
    scholarshipAvailable: true,
    highlights: ['Located in NZ capital', 'Top law school', 'Close to Parliament'],
    website: 'https://www.wgtn.ac.nz',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
    shadow: 'shadow-emerald-500/25',
    logo: 'https://upload.wikimedia.org/wikipedia/en/4/45/Victoria_University_of_Wellington_logo.svg',
  },
  {
    name: 'University of Canterbury',
    shortName: 'UC',
    location: 'Christchurch',
    qsRanking: 256,
    established: 1873,
    students: '17,000+',
    tuitionINR: '₹13-20 lakhs/year',
    popularPrograms: ['Engineering', 'Forestry', 'Speech Therapy', 'Education'],
    scholarshipAvailable: true,
    highlights: ['Top engineering programs', 'Modern rebuilt campus', 'Strong placements'],
    website: 'https://www.canterbury.ac.nz',
    gradient: 'from-rose-500 via-pink-500 to-red-600',
    shadow: 'shadow-rose-500/25',
    logo: 'https://upload.wikimedia.org/wikipedia/en/9/9c/University_of_Canterbury%2C_secondary_logo.png',
  },
  {
    name: 'Massey University',
    shortName: 'Massey',
    location: 'Multiple',
    qsRanking: 239,
    established: 1927,
    students: '30,000+',
    tuitionINR: '₹13-19 lakhs/year',
    popularPrograms: ['Agriculture', 'Veterinary', 'Aviation', 'Design'],
    scholarshipAvailable: true,
    highlights: ['Largest university', 'Only vet school in NZ', 'Three campuses'],
    website: 'https://www.massey.ac.nz',
    gradient: 'from-purple-500 via-fuchsia-500 to-pink-600',
    shadow: 'shadow-purple-500/25',
    logo: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Massey_University_Logo.svg',
  },
  {
    name: 'University of Waikato',
    shortName: 'Waikato',
    location: 'Hamilton',
    qsRanking: 250,
    established: 1964,
    students: '12,500+',
    tuitionINR: '₹13-18 lakhs/year',
    popularPrograms: ['Management', 'Computer Science', 'Law', 'Education'],
    scholarshipAvailable: true,
    highlights: ['Triple Crown business school', 'Strong tech hub', 'Lakeside campus'],
    website: 'https://www.waikato.ac.nz',
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    shadow: 'shadow-amber-500/25',
    logo: 'https://upload.wikimedia.org/wikipedia/en/4/4a/University_of_Waikato_logo_2.svg',
  },
  {
    name: 'Lincoln University',
    shortName: 'Lincoln',
    location: 'Lincoln',
    qsRanking: 362,
    established: 1878,
    students: '3,500+',
    tuitionINR: '₹12-16 lakhs/year',
    popularPrograms: ['Agriculture', 'Viticulture', 'Environmental Science'],
    scholarshipAvailable: true,
    highlights: ['Land-based specialist', 'Small class sizes', 'High employment rate'],
    website: 'https://www.lincoln.ac.nz',
    gradient: 'from-green-500 via-emerald-500 to-teal-600',
    shadow: 'shadow-emerald-500/25',
    logo: 'https://upload.wikimedia.org/wikipedia/en/0/05/Lincoln_University_logo.svg',
  },
  {
    name: 'Auckland University of Technology',
    shortName: 'AUT',
    location: 'Auckland',
    qsRanking: 407,
    established: 2000,
    students: '29,000+',
    tuitionINR: '₹14-20 lakhs/year',
    popularPrograms: ['Health Sciences', 'Creative Tech', 'Business', 'Engineering'],
    scholarshipAvailable: true,
    highlights: ["NZ's youngest university", 'Industry-focused', 'Modern campus'],
    website: 'https://www.aut.ac.nz',
    gradient: 'from-slate-600 via-slate-500 to-gray-600',
    shadow: 'shadow-slate-500/25',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Logo_of_Auckland_University_of_Technology.svg',
  }
];

// =============================================================================
// COMPARISON TABLE COMPONENT
// =============================================================================

const ComparisonTable: React.FC = () => {
  const [sortBy, setSortBy] = useState<'ranking' | 'tuition' | 'name'>('ranking');
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const sortedUniversities = [...NZ_UNIVERSITIES].sort((a, b) => {
    if (sortBy === 'ranking') return a.qsRanking - b.qsRanking;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="relative group">
      {/* Holographic Border Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl sm:rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
      
      {/* Mobile Card View */}
      <div className="block md:hidden">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] shadow-2xl">
          <div className="space-y-4 px-2 py-4 sm:p-4">
            {sortedUniversities.map((uni, index) => (
              <div
                key={uni.shortName}
                className={`p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-800 ${
                  index === 0 ? 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-pink-950/30' : 'bg-white dark:bg-slate-900/50'
                }`}
                itemScope
                itemType="https://schema.org/CollegeOrUniversity"
              >
                {/* Header with University Name and Rank */}
                <div className="flex flex-col xs:flex-row xs:items-start xs:justify-between mb-3 gap-3 sm:gap-0">
                  <div className="flex items-center gap-2 xs:gap-3 flex-1 min-w-0">
                    <div className={`relative min-w-[2.5rem] w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${uni.gradient} flex items-center justify-center text-white font-black text-base sm:text-lg shadow-lg ${uni.shadow}`}>
                      <span className="drop-shadow-md">{uni.shortName.slice(0, 2)}</span>
                      {index === 0 && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center">
                          <Flame className="h-2.5 w-2.5 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <a 
                        href={uni.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-black text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-base block truncate"
                        itemProp="name"
                        style={{ wordBreak: "break-word" }}
                      >
                        {uni.name}
                      </a>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Calendar className="h-3 w-3 text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Est. {uni.established}</span>
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-700 dark:text-amber-300 font-black px-2.5 py-1.5 rounded-lg border border-amber-200 dark:border-amber-800 text-xs self-start mt-2 xs:mt-0">
                    <Trophy className="h-3 w-3 fill-current" />
                    <span>#{uni.qsRanking}</span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="flex flex-col gap-2.5 sm:gap-3 w-full">
                  {/* Location */}
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm font-bold">
                    <div className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800">
                      <MapPin className="h-3.5 w-3.5 text-blue-500" />
                    </div>
                    <span>{uni.location}</span>
                  </div>

                  {/* Tuition */}
                  <div className="flex items-center gap-2 text-sm">
                    <div className="p-1 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                      <DollarSign className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="font-black text-emerald-600 dark:text-emerald-400">{uni.tuitionINR}</span>
                  </div>

                  {/* Programs */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <GraduationCap className="h-3.5 w-3.5 text-slate-400" />
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Programs</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {uni.popularPrograms.slice(0, 3).map((prog) => (
                        <span 
                          key={prog}
                          className="text-[9px] uppercase tracking-wider px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md font-bold border border-slate-200 dark:border-slate-700"
                        >
                          {prog}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Scholarship */}
                  {uni.scholarshipAvailable && (
                    <div className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg font-bold text-[10px] uppercase tracking-wider mt-0.5">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Scholarship Available</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block relative overflow-hidden rounded-2xl sm:rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 text-white relative overflow-hidden">
                {/* Animated Background Pattern */}
                <th colSpan={6} className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                </th>
                
                <th className="relative px-4 sm:px-6 py-6 sm:py-8 text-left first:pl-6 sm:first:pl-10">
                  <button 
                    onClick={() => setSortBy('name')}
                    className="group/btn flex items-center gap-2 hover:scale-105 transition-transform"
                  >
                    <Building2 className="h-4 w-4" />
                    <span className="font-black tracking-widest uppercase text-xs">University</span>
                    {sortBy === 'name' && <ChevronDown className="h-4 w-4 animate-bounce" />}
                  </button>
                </th>
                <th className="relative px-4 sm:px-6 py-6 sm:py-8 text-left">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="font-black tracking-widest uppercase text-xs">Location</span>
                  </div>
                </th>
                <th className="relative px-4 sm:px-6 py-6 sm:py-8 text-center">
                  <button 
                    onClick={() => setSortBy('ranking')}
                    className="group/btn flex items-center gap-2 hover:scale-105 transition-transform mx-auto"
                  >
                    <Trophy className="h-4 w-4" />
                    <span className="font-black tracking-widest uppercase text-xs">QS Rank</span>
                    {sortBy === 'ranking' && <ChevronDown className="h-4 w-4 animate-bounce" />}
                  </button>
                </th>
                <th className="relative px-4 sm:px-6 py-6 sm:py-8 text-left">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span className="font-black tracking-widest uppercase text-xs">Tuition</span>
                  </div>
                </th>
                <th className="relative px-4 sm:px-6 py-6 sm:py-8 text-left">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    <span className="font-black tracking-widest uppercase text-xs">Programs</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedUniversities.map((uni, index) => (
                <tr 
                  key={uni.shortName}
                  className={`group/row transition-all duration-300 ${
                    hoveredRow === uni.shortName 
                      ? 'bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-pink-950/30 scale-[1.01]' 
                      : index % 2 === 0 
                        ? 'bg-white dark:bg-slate-900/50' 
                        : 'bg-slate-50/50 dark:bg-slate-800/30'
                  } border-b border-slate-100 dark:border-slate-800 last:border-0`}
                  onMouseEnter={() => setHoveredRow(uni.shortName)}
                  onMouseLeave={() => setHoveredRow(null)}
                  itemScope
                  itemType="https://schema.org/CollegeOrUniversity"
                >
                  <td className="px-4 sm:px-6 py-4 sm:py-6 first:pl-6 sm:first:pl-10">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={`relative w-12 h-12 min-w-12 min-h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${uni.gradient} flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-lg ${uni.shadow} group-hover/row:scale-110 transition-transform duration-300`}>
                        <span className="drop-shadow-md">{uni.shortName.slice(0, 2)}</span>
                        {index === 0 && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-amber-400 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center shadow-sm">
                            <Flame className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <a 
                          href={uni.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-black text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-base sm:text-lg group-hover/row:underline flex items-center gap-2 tracking-tight"
                          itemProp="name"
                        >
                          {uni.name}
                          <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5 opacity-0 group-hover/row:opacity-100 transition-opacity" />
                        </a>
                        <div className="flex items-center gap-2 mt-1.5">
                          <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-slate-400" />
                          <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Est. {uni.established}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 sm:py-6">
                    <div className="flex items-center gap-2 sm:gap-3 text-slate-600 dark:text-slate-400 font-bold text-sm sm:text-base">
                      <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-slate-100 dark:bg-slate-800 group-hover/row:bg-white dark:group-hover/row:bg-slate-700 transition-colors">
                        <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500" />
                      </div>
                      {uni.location}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 sm:py-6 text-center">
                    <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-700 dark:text-amber-300 font-black px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl border border-amber-200 dark:border-amber-800 shadow-sm group-hover/row:scale-105 transition-transform text-xs sm:text-sm">
                      <Trophy className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-current" />
                      <span>#{uni.qsRanking}</span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 sm:py-6">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-emerald-100 dark:bg-emerald-900/30 group-hover/row:bg-emerald-200 dark:group-hover/row:bg-emerald-900/50 transition-colors">
                        <DollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span className="font-black text-emerald-600 dark:text-emerald-400 tracking-tight text-sm sm:text-base">{uni.tuitionINR}</span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 sm:py-6">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {uni.popularPrograms.slice(0, 3).map((prog, idx) => (
                        <span 
                          key={prog}
                          className="text-[9px] sm:text-[10px] uppercase tracking-wider px-2 sm:px-2.5 py-1 sm:py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md sm:rounded-lg font-bold border border-slate-200 dark:border-slate-700"
                        >
                          {prog}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 sm:py-6 text-center last:pr-6 sm:last:pr-10">
                    {uni.scholarshipAvailable ? (
                      <div className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-xs uppercase tracking-wider shadow-sm">
                        <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">Available</span>
                        <span className="sm:hidden">Yes</span>
                      </div>
                    ) : (
                      <span className="text-slate-400 text-xs sm:text-sm font-medium">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// UNIVERSITY CARD COMPONENT
// =============================================================================

const UniversityCard: React.FC<{ university: University; rank: number }> = ({ university, rank }) => {
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article 
      className="group relative h-full"
      itemScope
      itemType="https://schema.org/CollegeOrUniversity"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${rank * 100}ms` }}
    >
      {/* Dynamic Glow */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${university.gradient} rounded-[2.5rem] blur opacity-0 group-hover:opacity-40 transition-all duration-500`} />
      
      <div className="relative h-full bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
        
        {/* Rank Badge */}
        <div className="absolute top-5 right-5 z-20">
          <div className={`bg-gradient-to-r ${university.gradient} text-white px-4 py-2 rounded-2xl shadow-xl ${university.shadow} backdrop-blur-sm flex items-center gap-2 border border-white/20`}>
            <Trophy className="h-3.5 w-3.5" />
            <span className="text-xs font-black uppercase tracking-wider">#{rank}</span>
          </div>
        </div>
        
        {/* Header */}
        <header className={`relative bg-gradient-to-br ${university.gradient} p-8 pb-16  overflow-hidden`}>
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-10 ">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </div>
          
          {/* Floating Orbs */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          
          <div className="relative z-10 min-h-48">
              <img 
                src={university.logo}
                alt={`${university.name} logo`}
                className={
                  university.shortName === "Lincoln"
                    ? "w-24 h-24 object-contain"
                    : "w-32 h-24 object-contain"
                }
                loading="lazy"
              />
            <h3 className="text-3xl font-black text-white pr-16 leading-none tracking-tight mb-3" itemProp="name">
              {university.name}
            </h3>
            <div className="flex items-center gap-2 text-white/90">
              <div className="p-1 bg-white/20 rounded-lg backdrop-blur-sm">
                <MapPin className="h-3.5 w-3.5" />
              </div>
              <span className="font-bold text-sm" itemProp="address">{university.location}</span>
            </div>
          </div>
        </header>

        {/* Floating Stats Bar */}
        <div className="relative -mt-10 mx-6 mb-8">
          <div className={`absolute inset-0 bg-gradient-to-r ${university.gradient} rounded-2xl blur-md opacity-20`} />
          <div className="relative grid grid-cols-3 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden divide-x divide-slate-100 dark:divide-slate-700">
            {[
              { icon: Trophy, label: 'QS', value: `#${university.qsRanking}`, color: 'text-amber-500' },
              { icon: Users, label: 'Students', value: university.students, color: 'text-blue-500' },
              { icon: Calendar, label: 'Est.', value: university.established, color: 'text-emerald-500' },
            ].map((stat, idx) => (
              <div key={idx} className="py-4 px-2 text-center group/stat hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <stat.icon className={`h-4 w-4 mx-auto mb-1.5 ${stat.color}`} strokeWidth={2.5} />
                <p className="text-lg font-black text-slate-900 dark:text-white tracking-tight leading-none">{stat.value}</p>
                <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8">
          {/* Tuition */}
          <div className="mb-4 sm:mb-5 md:mb-6 relative group/tuition">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl sm:rounded-2xl blur opacity-0 group-hover/tuition:opacity-20 transition-opacity" />
            <div className="relative p-3 sm:p-4 md:p-5 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-xl sm:rounded-2xl border border-emerald-200 dark:border-emerald-900/50">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                <div className="p-1 sm:p-1.5 bg-emerald-500/20 rounded-lg flex-shrink-0">
                  <DollarSign className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-[9px] sm:text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Annual Tuition</span>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-black text-emerald-700 dark:text-emerald-300 tracking-tight break-words">{university.tuitionINR}</p>
            </div>
          </div>

          {/* Programs */}
          <div className="mb-4 sm:mb-5 md:mb-6">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              <div className="p-0.5 sm:p-1 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex-shrink-0">
                <Target className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="text-[9px] sm:text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Popular Programs</span>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {university.popularPrograms.slice(0, expanded ? undefined : 3).map((prog, idx) => (
                <span 
                  key={prog}
                  className="text-[9px] sm:text-[10px] px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md sm:rounded-lg font-bold border border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors cursor-default break-words"
                >
                  {prog}
                </span>
              ))}
            </div>
          </div>

          {/* Expanded Content */}
          {expanded && (
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 sm:pt-5 md:pt-6 mt-4 sm:mt-5 md:mt-6 space-y-3 sm:space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                <div className="p-0.5 sm:p-1 bg-violet-100 dark:bg-violet-900/30 rounded-lg flex-shrink-0">
                  <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-violet-600 dark:text-violet-400" />
                </div>
                <span className="text-[9px] sm:text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Key Highlights</span>
              </div>
              {university.highlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-2 sm:gap-2.5 md:gap-3 group/item">
                  <div className="flex-shrink-0 w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mt-0.5 group-hover/item:bg-emerald-100 dark:group-hover/item:bg-emerald-900/40 transition-colors">
                    <BadgeCheck className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 text-emerald-500" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-bold break-words">{highlight}</span>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 md:gap-3 mt-5 sm:mt-6 md:mt-8 pt-4 sm:pt-5 md:pt-6 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setExpanded(!expanded)}
              className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 md:px-4 py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-[11px] md:text-xs uppercase tracking-wider transition-all min-h-[44px] ${
                expanded 
                  ? 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400' 
                  : 'bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <span className="whitespace-nowrap">{expanded ? 'Show Less' : 'Full Details'}</span>
              {expanded ? <ChevronUp className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" /> : <ChevronDown className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />}
            </button>
            <a
              href={university.website}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-r ${university.gradient} text-white px-3 sm:px-3.5 md:px-4 py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-[11px] md:text-xs uppercase tracking-wider transition-all hover:scale-105 shadow-lg ${university.shadow} min-h-[44px]`}
              itemProp="url"
            >
              <Globe className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
              <span className="whitespace-nowrap">Visit Site</span>
              <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

// =============================================================================
// MAIN UNIVERSITY COMPARISON COMPONENT
// =============================================================================

export const UniversityComparison: React.FC = () => {
  const universityListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://ai.eecglobal.com/nzvisaprep/#nz-universities",
    "name": "All 8 New Zealand Universities - Complete Guide for Indian Students",
    "description": "Comprehensive comparison of all 8 QS-ranked New Zealand universities",
    "numberOfItems": 8,
    "itemListElement": NZ_UNIVERSITIES.sort((a, b) => a.qsRanking - b.qsRanking).map((uni, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "CollegeOrUniversity",
        "name": uni.name,
        "url": uni.website
      }
    }))
  };

  return (
    <section 
      className="mt-16 py-24 relative overflow-hidden"
      aria-labelledby="university-comparison-heading"
      id="nz-universities"
    >
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-[#0B0F19]">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 dark:opacity-20">
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-500 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse delay-1000" />
        </div>
      </div>
      
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(universityListSchema) }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 text-slate-900 dark:text-white mb-8 shadow-lg shadow-indigo-500/10">
            <Trophy className="h-4 w-4 text-amber-500" />
            <span className="text-xs font-bold tracking-widest uppercase">All 8 Universities • QS Ranked</span>
          </div>
          
          <h2 
            id="university-comparison-heading"
            className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-500"
          >
            Compare <br className="md:hidden" />
            <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
              NZ Universities
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            All 8 universities globally recognized. Compare fees, programs, rankings.
            <span className="text-indigo-600 dark:text-indigo-400 font-bold"> Estero Education Services represents all.</span>
          </p>
        </header>

        {/* Table */}
        <div className="mb-24">
          <ComparisonTable />
        </div>

        {/* University Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-24">
          {NZ_UNIVERSITIES.sort((a, b) => a.qsRanking - b.qsRanking).map((uni, index) => (
            <UniversityCard key={uni.shortName} university={uni} rank={index + 1} />
          ))}
        </div>

        {/* Ultra Premium CTA */}
        <div className="relative group cursor-pointer">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-[2.5rem] blur opacity-30 group-hover:opacity-60 transition-all duration-500 animate-pulse" />
          <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-[2.3rem] p-12 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold mb-6 border border-white/30 backdrop-blur-sm">
                <Zap className="h-3 w-3 fill-current" />
                <span>EXPERT GUIDANCE</span>
              </div>
              
              <h3 className="text-4xl font-black text-white mb-4 tracking-tight">
                Need Help Choosing?
              </h3>
              <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
                Our ENZRA certified counselors help you select the best university based on your profile, budget, and career goals.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="https://nz.eecglobal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-3 bg-white text-indigo-600 font-bold px-8 py-4 rounded-2xl hover:scale-105 transition-all shadow-2xl"
                >
                  <BookOpen className="h-5 w-5" />
                  Search NZ Courses
                  <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="https://wa.me/918758750036"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-emerald-500 text-white font-bold px-8 py-4 rounded-2xl hover:scale-105 transition-all shadow-2xl hover:bg-emerald-600"
                >
                  <Building2 className="h-5 w-5" />
                  Talk to Expert
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniversityComparison;
