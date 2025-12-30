/**
 * ============================================================================
 * NZ vs OTHER COUNTRIES COMPARISON COMPONENT
 * ============================================================================
 * 
 * Critical for capturing comparison keywords:
 * - "NZ vs Australia student visa"
 * - "New Zealand vs Canada for study"
 * - "Which country is best for study abroad"
 * - Table rich snippets in Google
 * 
 * ============================================================================
 */

import React, { useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import {
  Globe,
  DollarSign,
  Clock,
  Briefcase,
  GraduationCap,
  Shield,
  CheckCircle2,
  XCircle,
  Trophy,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

// Flag component using react-country-flag library
const Flag: React.FC<{ country: string; size?: number; className?: string }> = ({ country, size = 24, className = '' }) => {
  return (
    <span 
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: `${size}px`, height: `${size}px`, minWidth: `${size}px`, minHeight: `${size}px` }}
      role="img"
      aria-label={`${country} flag`}
      title={country}
    >
      <ReactCountryFlag
        countryCode={country}
        svg
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
    </span>
  );
};

// =============================================================================
// COMPARISON DATA
// =============================================================================

interface CountryData {
  name: string;
  flag: string;
  countryCode: string;
  tuitionRange: string;
  livingCost: string;
  visaProcessing: string;
  workHours: string;
  postStudyVisa: string;
  prPathway: string;
  ieltsMin: string;
  safetyRanking: string;
  highlights: string[];
  cons: string[];
  bestFor: string;
}

const COUNTRIES: CountryData[] = [
  {
    name: 'New Zealand',
    flag: '🇳🇿',
    countryCode: 'NZ',
    tuitionRange: '₹14-28 lakhs/year',
    livingCost: '₹8-12 lakhs/year',
    visaProcessing: '25-30 days',
    workHours: '25 hrs/week (unlimited in breaks)',
    postStudyVisa: 'Up to 3 years',
    prPathway: 'Strong (Skilled Migrant Category)',
    ieltsMin: '6.0-6.5',
    safetyRanking: '#2 Safest Country',
    highlights: [
      'All 8 universities QS ranked',
      'Partner can work full-time',
      '3-year post-study work visa',
      'Clear PR pathway',
      'Safe, friendly environment'
    ],
    cons: [
      'Smaller job market than larger countries',
      'Limited metro cities',
      'Higher living costs in Auckland'
    ],
    bestFor: 'Students seeking quality education with strong PR pathway'
  },
  {
    name: 'Australia',
    flag: '🇦🇺',
    countryCode: 'AU',
    tuitionRange: '₹15-35 lakhs/year',
    livingCost: '₹10-15 lakhs/year',
    visaProcessing: '30-90 days',
    workHours: '48 hrs/fortnight',
    postStudyVisa: '2-4 years',
    prPathway: 'Moderate (Points-based)',
    ieltsMin: '6.0-7.0',
    safetyRanking: '#12 Safest Country',
    highlights: [
      '7 universities in top 100',
      'Large job market',
      'Multiple cities to choose',
      'Strong economy'
    ],
    cons: [
      'Higher tuition fees',
      'Stricter GTE requirements',
      'PR rules changing frequently',
      'Higher visa rejection rate'
    ],
    bestFor: 'Students seeking larger job market and diverse options'
  },
  {
    name: 'Canada',
    flag: '🇨🇦',
    countryCode: 'CA',
    tuitionRange: '₹12-30 lakhs/year',
    livingCost: '₹8-14 lakhs/year',
    visaProcessing: '60-120 days',
    workHours: '24 hrs/week',
    postStudyVisa: 'Up to 3 years (PGWP)',
    prPathway: 'Strong (Express Entry)',
    ieltsMin: '6.0-6.5',
    safetyRanking: '#6 Safest Country',
    highlights: [
      'Multiple PR pathways',
      'Strong job market',
      'Multicultural society',
      'Quality education'
    ],
    cons: [
      'Long visa processing times',
      'Harsh winters',
      'High competition for PR',
      'Housing crisis in major cities'
    ],
    bestFor: 'Students wanting to settle abroad long-term'
  },
  {
    name: 'UK',
    flag: '🇬🇧',
    countryCode: 'GB',
    tuitionRange: '₹18-40 lakhs/year',
    livingCost: '₹12-18 lakhs/year',
    visaProcessing: '15-20 days',
    workHours: '20 hrs/week',
    postStudyVisa: '2 years',
    prPathway: 'Difficult',
    ieltsMin: '6.0-7.0',
    safetyRanking: '#35 Safest Country',
    highlights: [
      '4 universities in top 10',
      'Fast visa processing',
      'Global recognition',
      '1-year Masters programs'
    ],
    cons: [
      'Very high living costs',
      'Limited PR pathway',
      'Only 2-year post-study visa',
      'Brexit impact on job market'
    ],
    bestFor: 'Students seeking prestigious degrees and quick completion'
  },
  {
    name: 'USA',
    flag: '🇺🇸',
    countryCode: 'US',
    tuitionRange: '₹25-60 lakhs/year',
    livingCost: '₹12-20 lakhs/year',
    visaProcessing: '30-60 days',
    workHours: '20 hrs/week (on-campus only)',
    postStudyVisa: '1-3 years (OPT/STEM)',
    prPathway: 'Very Difficult (H1B lottery)',
    ieltsMin: '6.5-7.5',
    safetyRanking: '#128 Safest Country',
    highlights: [
      'Best universities globally',
      'Extensive research opportunities',
      'Large alumni networks',
      'STEM OPT extension'
    ],
    cons: [
      'Highest tuition fees',
      'H1B visa uncertainty',
      'Gun safety concerns',
      'No direct PR pathway'
    ],
    bestFor: 'Students seeking top-tier education and career boost'
  },
  {
    name: 'Germany',
    flag: '🇩🇪',
    countryCode: 'DE',
    tuitionRange: '₹0-5 lakhs/year (Public)',
    livingCost: '₹7-10 lakhs/year',
    visaProcessing: '30-60 days',
    workHours: '20 hrs/week',
    postStudyVisa: '18 months',
    prPathway: 'Moderate',
    ieltsMin: '6.0-6.5 (or German B2)',
    safetyRanking: '#17 Safest Country',
    highlights: [
      'Free/low tuition at public universities',
      'Strong engineering programs',
      'Part of Schengen area',
      'Strong economy'
    ],
    cons: [
      'German language essential for jobs',
      'Limited English programs',
      'Complex bureaucracy',
      'Blocked account requirement'
    ],
    bestFor: 'Budget-conscious students open to learning German'
  }
];

// =============================================================================
// COMPARISON TABLE COMPONENT
// =============================================================================

const ComparisonTable: React.FC = () => {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl sm:rounded-2xl md:rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 text-white">
                <th className="px-2 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6 text-left font-black uppercase tracking-widest text-[10px] sm:text-xs sticky left-0 z-10 bg-indigo-600">Country</th>
                <th className="px-2 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6 text-left font-black uppercase tracking-widest text-[10px] sm:text-xs">Tuition/Year</th>
                <th className="px-2 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6 text-left font-black uppercase tracking-widest text-[10px] sm:text-xs">Living Cost</th>
                <th className="px-2 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6 text-left font-black uppercase tracking-widest text-[10px] sm:text-xs">Visa Time</th>
                <th className="px-2 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6 text-left font-black uppercase tracking-widest text-[10px] sm:text-xs">Work Rights</th>
                <th className="px-2 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6 text-left font-black uppercase tracking-widest text-[10px] sm:text-xs">Post-Study Visa</th>
                <th className="px-2 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6 text-left font-black uppercase tracking-widest text-[10px] sm:text-xs">PR Pathway</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {COUNTRIES.map((country, index) => (
                <tr 
                  key={country.name}
                  className={`group/row transition-all duration-300 ${
                    country.name === 'New Zealand' 
                      ? 'bg-emerald-50/50 dark:bg-emerald-900/10 hover:bg-emerald-100/50 dark:hover:bg-emerald-900/20' 
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <td className={`px-2 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 sticky left-0 z-10 font-bold ${
                    country.name === 'New Zealand' 
                      ? 'bg-emerald-50 dark:bg-[#0B1510] group-hover/row:bg-emerald-100 dark:group-hover/row:bg-[#0F1C15]' 
                      : 'bg-white dark:bg-slate-900 group-hover/row:bg-slate-50 dark:group-hover/row:bg-slate-800'
                  }`}>
                    <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                      <div className="w-[18px] h-[18px] sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0 flex items-center justify-center">
                        <ReactCountryFlag
                          countryCode={country.countryCode}
                          svg
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                          }}
                          aria-label={`${country.name} flag`}
                        />
                      </div>
                      <span className={`text-xs sm:text-sm md:text-base ${country.name === 'New Zealand' ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>
                        {country.name}
                        {country.name === 'New Zealand' && (
                          <Trophy className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-amber-500 inline ml-1 sm:ml-2 mb-0.5 sm:mb-1" />
                        )}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 font-medium text-[11px] sm:text-xs md:text-sm text-slate-600 dark:text-slate-400">{country.tuitionRange}</td>
                  <td className="px-2 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 font-medium text-[11px] sm:text-xs md:text-sm text-slate-600 dark:text-slate-400">{country.livingCost}</td>
                  <td className="px-2 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 font-medium text-[11px] sm:text-xs md:text-sm text-slate-600 dark:text-slate-400">{country.visaProcessing}</td>
                  <td className="px-2 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 font-medium text-[11px] sm:text-xs md:text-sm text-slate-600 dark:text-slate-400">{country.workHours}</td>
                  <td className="px-2 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5">
                    <span className={`font-bold px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs ${
                      country.postStudyVisa.includes('3 years') 
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      {country.postStudyVisa}
                    </span>
                  </td>
                  <td className="px-2 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5">
                    <span className={`px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wide ${
                      country.prPathway.includes('Strong') 
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                        : country.prPathway.includes('Moderate')
                          ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                          : 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400'
                    }`}>
                      {country.prPathway}
                    </span>
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
// COUNTRY DETAIL CARDS
// =============================================================================

const CountryDetailCard: React.FC<{ country: CountryData; featured?: boolean }> = ({ country, featured }) => {
  return (
    <div className={`group relative h-full bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
      featured 
        ? 'border-2 border-emerald-500/50 dark:border-emerald-500/50 shadow-emerald-500/10' 
        : 'border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
    }`}>
      {/* Background Effect */}
      {featured && <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />}
      
      {/* Header */}
      <div className={`relative p-8 ${
        featured 
          ? 'bg-gradient-to-r from-emerald-600 to-teal-600' 
          : 'bg-slate-900'
      } overflow-hidden`}>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Flag country={country.countryCode} size={40} className="filter drop-shadow-lg" />
            <div>
              <h3 className="font-black text-white text-2xl tracking-tight">{country.name}</h3>
              <p className="text-white/90 text-xs font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md inline-block mt-1 backdrop-blur-sm">
                {country.safetyRanking}
              </p>
            </div>
          </div>
          {featured && (
            <div className="w-10 h-10 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-lg animate-pulse">
              <Trophy className="h-5 w-5 fill-current" />
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 divide-x divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="p-4 text-center group-hover:bg-slate-50 dark:group-hover:bg-slate-800/50 transition-colors">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Tuition</p>
          <p className="font-black text-slate-900 dark:text-white text-sm">{country.tuitionRange}</p>
        </div>
        <div className="p-4 text-center group-hover:bg-slate-50 dark:group-hover:bg-slate-800/50 transition-colors">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Living Cost</p>
          <p className="font-black text-slate-900 dark:text-white text-sm">{country.livingCost}</p>
        </div>
        <div className="p-4 text-center group-hover:bg-slate-50 dark:group-hover:bg-slate-800/50 transition-colors">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Work Rights</p>
          <p className="font-black text-slate-900 dark:text-white text-sm">{country.workHours}</p>
        </div>
        <div className="p-4 text-center group-hover:bg-slate-50 dark:group-hover:bg-slate-800/50 transition-colors">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Post-Study</p>
          <p className={`font-black text-sm ${featured ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
            {country.postStudyVisa}
          </p>
        </div>
      </div>

      {/* Highlights */}
      <div className="p-6">
        <div className="mb-6">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Key Highlights
          </p>
          <ul className="space-y-2">
            {country.highlights.slice(0, 3).map((highlight, idx) => (
              <li key={idx} className="text-sm font-medium text-slate-600 dark:text-slate-300 flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="mb-6 pt-6 border-t border-slate-100 dark:border-slate-800">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <XCircle className="h-3 w-3 text-rose-500" /> Considerations
          </p>
          <ul className="space-y-2">
            {country.cons.slice(0, 2).map((con, idx) => (
              <li key={idx} className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                {con}
              </li>
            ))}
          </ul>
        </div>

        {/* Best For */}
        <div className={`p-4 rounded-xl text-center ${featured ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-slate-50 dark:bg-slate-800'}`}>
          <p className={`text-xs font-bold ${featured ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-600 dark:text-slate-400'}`}>
            Best for: {country.bestFor}
          </p>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// MAIN COMPARISON COMPONENT
// =============================================================================

export const CountryComparison: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('New Zealand');

  // Generate comparison schema
  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "/nzvisaprep/#country-comparison",
    "name": "Study Abroad Country Comparison - NZ vs Australia vs Canada vs UK vs USA vs Germany",
    "description": "Comprehensive comparison of study abroad destinations for Indian students including tuition fees, living costs, work rights, and PR pathways",
    "numberOfItems": COUNTRIES.length,
    "itemListElement": COUNTRIES.map((country, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Country",
        "name": country.name,
        "description": country.bestFor
      }
    }))
  };

  return (
    <section 
      className="mt-16 py-24 relative overflow-hidden"
      aria-labelledby="comparison-heading"
      id="country-comparison"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-[#0B0F19] -z-10" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10" />
      
      {/* Inject Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 text-blue-600 dark:text-blue-400 text-xs font-bold px-4 py-2 rounded-full mb-6 shadow-lg shadow-blue-500/10">
            <Globe className="h-4 w-4" />
            <span className="tracking-widest uppercase">Global Comparison Matrix</span>
          </div>
          <h2 
            id="comparison-heading"
            className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-500"
            data-speakable="true"
          >
            New Zealand vs <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">The World</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Data-driven comparison with Australia, Canada, UK, USA, and Germany. 
            See why <strong className="text-emerald-600 dark:text-emerald-400">NZ offers the best ROI</strong> for Indian students.
          </p>
        </header>

        {/* TL;DR Summary */}
        <div className="max-w-4xl mx-auto mb-16 relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition-opacity" />
          <div className="relative p-8 bg-white dark:bg-slate-900 rounded-[1.9rem] border border-emerald-100 dark:border-emerald-900/30 shadow-xl flex items-start gap-6">
            <div className="hidden md:flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex-shrink-0">
              <Trophy className="h-8 w-8" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <span className="md:hidden"><Trophy className="h-5 w-5 text-emerald-500" /></span>
                The Verdict
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                New Zealand offers the <strong className="text-emerald-600 dark:text-emerald-400">#1 Balance</strong> of affordable education (₹14-28L/year), 
                longest post-study work visa (3 years), clearest PR pathway, and highest safety (#2 globally). 
                Unlike other countries, <strong>partners can work full-time</strong> on open work visas.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <Briefcase className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Side-by-Side Analysis</h3>
          </div>
          <ComparisonTable />
        </div>

        {/* Why NZ Wins Section */}
        <div className="mb-24 relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-10 md:p-12 text-white shadow-2xl shadow-emerald-500/30 group">
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12 border-b border-white/20 pb-8">
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-md shadow-lg border border-white/30">
                <Trophy className="h-10 w-10 text-amber-300 drop-shadow-md" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Why New Zealand Wins</h3>
                <p className="text-emerald-100 font-medium text-lg">Key advantages for Indian students in 2026</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { val: '3 Years', title: 'Post-Study Work', sub: 'Longest among major destinations' },
                { val: '#2', title: 'Safest Country', sub: 'Global Peace Index 2024' },
                { val: '100%', title: 'Partner Rights', sub: 'Full-time open work visa' },
                { val: 'Clear', title: 'PR Pathway', sub: 'Skilled Migrant Category' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md p-6 rounded-[1.8rem] border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 group/card">
                  <p className="text-5xl font-black text-white mb-3 tracking-tighter drop-shadow-sm">{item.val}</p>
                  <p className="text-white font-bold text-lg leading-tight mb-2">{item.title}</p>
                  <p className="text-emerald-100 text-sm font-medium leading-snug">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Country Detail Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {COUNTRIES.map((country, index) => (
            <CountryDetailCard 
              key={country.name} 
              country={country} 
              featured={country.name === 'New Zealand'}
            />
          ))}
        </div>

        {/* Ultra Premium CTA */}
        <div className="relative group cursor-pointer text-center max-w-3xl mx-auto">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-emerald-500/20 blur-[80px] rounded-full group-hover:bg-emerald-500/30 transition-colors duration-500" />
          <div className="relative z-10">
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
              Ready to Choose <span className="text-emerald-600 dark:text-emerald-400">New Zealand?</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg font-medium">
              Start your journey with the agency that knows NZ best.
            </p>
            <a 
              href="#setup-form"
              className="inline-flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black px-10 py-5 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <GraduationCap className="h-6 w-6" />
              <span>Start Free Profile Assessment</span>
              <ArrowRight className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountryComparison;

