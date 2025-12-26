/**
 * ============================================================================
 * EEC LOCAL SEO HYPER-RELEVANCE ENGINE
 * ============================================================================
 * 
 * This component maximizes local search visibility through:
 * - City-specific content and keywords
 * - LocalBusiness schema for each branch
 * - NAP (Name, Address, Phone) consistency
 * - Geo-targeted content signals
 * - Local citation building
 * 
 * ============================================================================
 */

import React from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Navigation, 
  Star,
  Building2,
  Users,
  Award,
  CheckCircle2,
  MessageCircle,
  ExternalLink,
  Sparkles,
  Shield,
  Globe2,
  LocateFixed
} from 'lucide-react';
import { BRANCH_DATA, getAverageRating, getTotalReviews } from '../data/branches';
import { LOCAL_SEO_CONFIG } from './SEOConfig';

// =============================================================================
// CITY DATA WITH LOCAL KEYWORDS
// =============================================================================

interface CityLocalData {
  name: string;
  slug: string;
  population: string;
  description: string;
  localKeywords: string[];
  landmarks: string[];
  branchCount: number;
}

const CITY_LOCAL_DATA: CityLocalData[] = [
  {
    name: 'Ahmedabad',
    slug: 'ahmedabad',
    population: '8 million',
    description: 'Gujarat\'s largest city and commercial capital. EEC has 8 branches across Ahmedabad covering Memnagar, Ghatlodiya, Chandkheda, Maninagar, Odhav, Nikol, Bapunagar, and Naroda.',
    localKeywords: [
      'new zealand visa consultant ahmedabad',
      'study abroad ahmedabad',
      'ielts coaching ahmedabad',
      'best overseas education consultant ahmedabad',
      'nz student visa agent ahmedabad',
      'study in new zealand from ahmedabad',
    ],
    landmarks: ['SG Highway', 'Helmet Circle', 'Shivranjani', 'Satellite'],
    branchCount: 8,
  },
  {
    name: 'Surat',
    slug: 'surat',
    population: '7.5 million',
    description: 'Gujarat\'s diamond city and industrial hub. EEC serves Surat with 5 strategically located branches in Parvat Patia, Mota Varachha, Katargam, Ghod Dod Road, and Vesu.',
    localKeywords: [
      'new zealand visa consultant surat',
      'study abroad surat',
      'ielts coaching surat',
      'overseas education surat',
      'nz student visa surat',
      'pte coaching surat',
    ],
    landmarks: ['Ghod Dod Road', 'Varachha', 'Vesu', 'Ring Road'],
    branchCount: 5,
  },
  {
    name: 'Vadodara',
    slug: 'vadodara',
    population: '2.2 million',
    description: 'The cultural capital of Gujarat and EEC\'s headquarters since 1997. Our flagship branches are located in Alkapuri, Nizampura, Manjalpur, and New VIP Road.',
    localKeywords: [
      'new zealand visa consultant vadodara',
      'study abroad vadodara',
      'ielts coaching vadodara',
      'overseas education baroda',
      'nz student visa vadodara',
      'best education consultant vadodara',
    ],
    landmarks: ['Alkapuri', 'Fatehgunj', 'Sayajigunj', 'Manjalpur'],
    branchCount: 4,
  },
  {
    name: 'Anand',
    slug: 'anand',
    population: '250,000',
    description: 'Home to Vallabh Vidyanagar, one of India\'s largest educational hubs. EEC serves Anand district students with personalized study abroad guidance.',
    localKeywords: [
      'new zealand visa consultant anand',
      'study abroad vallabh vidyanagar',
      'ielts coaching vvnagar',
      'overseas education anand',
      'education consultant vidyanagar',
    ],
    landmarks: ['Vallabh Vidyanagar', 'GCET', 'Sardar Patel Statue'],
    branchCount: 1,
  },
  {
    name: 'Nadiad',
    slug: 'nadiad',
    population: '225,000',
    description: 'Historic city in Kheda district. EEC\'s Nadiad branch serves students from Nadiad, Kheda, Kapadvanj, and surrounding areas.',
    localKeywords: [
      'new zealand visa consultant nadiad',
      'study abroad nadiad',
      'ielts coaching nadiad',
      'overseas education kheda',
    ],
    landmarks: ['College Road', 'Station Road', 'Santram Mandir'],
    branchCount: 1,
  },
  {
    name: 'Bharuch',
    slug: 'bharuch',
    population: '200,000',
    description: 'Industrial city on the Narmada River. EEC Bharuch provides comprehensive study abroad services to South Gujarat students.',
    localKeywords: [
      'new zealand visa consultant bharuch',
      'study abroad bharuch',
      'ielts coaching bharuch',
      'overseas education bharuch',
    ],
    landmarks: ['Station Road', 'Zadeshwar', 'Golden Bridge'],
    branchCount: 1,
  },
  {
    name: 'Navsari',
    slug: 'navsari',
    population: '180,000',
    description: 'Parsi heritage city in South Gujarat. EEC Navsari serves students aspiring to study in New Zealand and other countries.',
    localKeywords: [
      'new zealand visa consultant navsari',
      'study abroad navsari',
      'ielts coaching navsari',
    ],
    landmarks: ['Dudhia Talav', 'Tower Road', 'Lunsikui'],
    branchCount: 1,
  },
  {
    name: 'Vapi',
    slug: 'vapi',
    population: '165,000',
    description: 'Gateway to South Gujarat industrial belt. EEC Vapi serves students from Vapi, Valsad, Daman, and Silvassa.',
    localKeywords: [
      'new zealand visa consultant vapi',
      'study abroad vapi',
      'ielts coaching vapi',
      'overseas education valsad',
    ],
    landmarks: ['Daman Road', 'GIDC', 'Chala'],
    branchCount: 1,
  },
  {
    name: 'Mehsana',
    slug: 'mehsana',
    population: '185,000',
    description: 'Major city in North Gujarat. EEC Mehsana serves students from Mehsana, Patan, and Banaskantha districts.',
    localKeywords: [
      'new zealand visa consultant mehsana',
      'study abroad mehsana',
      'ielts coaching mehsana',
      'overseas education north gujarat',
    ],
    landmarks: ['Radhanpur Road', 'Highway Road', 'Dudhsagar Dairy'],
    branchCount: 1,
  },
  {
    name: 'Himatnagar',
    slug: 'himatnagar',
    population: '90,000',
    description: 'District headquarters of Sabarkantha. EEC Himatnagar serves students from Sabarkantha and Aravalli districts.',
    localKeywords: [
      'new zealand visa consultant himatnagar',
      'study abroad sabarkantha',
      'ielts coaching himatnagar',
    ],
    landmarks: ['Post Office Road', 'Bus Station', 'Polo Ground'],
    branchCount: 1,
  },
  {
    name: 'Kalol',
    slug: 'kalol',
    population: '125,000',
    description: 'Growing city near Gandhinagar. EEC Kalol serves students from Kalol, Gandhinagar, and surrounding areas.',
    localKeywords: [
      'new zealand visa consultant kalol',
      'study abroad gandhinagar',
      'ielts coaching kalol',
    ],
    landmarks: ['HDFC Bank', 'Memon Market', 'Navjivan Mill'],
    branchCount: 1,
  },
  {
    name: 'Visnagar',
    slug: 'visnagar',
    population: '60,000',
    description: 'Historic town in Mehsana district. EEC Visnagar provides accessible study abroad guidance to North Gujarat students.',
    localKeywords: [
      'new zealand visa consultant visnagar',
      'study abroad visnagar',
      'overseas education north gujarat',
    ],
    landmarks: ['Kheralu Road', 'Bus Stand', 'Modhera'],
    branchCount: 1,
  },
];

// =============================================================================
// LOCAL BUSINESS CARD COMPONENT
// =============================================================================

const CityCard: React.FC<{ city: CityLocalData }> = ({ city }) => {
  // Get branches for this city
  const cityBranches = BRANCH_DATA.filter(
    (branch: { address: { addressLocality: string } }) => branch.address.addressLocality.toLowerCase() === city.name.toLowerCase()
  );

  // Calculate average rating for the city
  const cityRatings = cityBranches
    .filter(b => b.googleRating)
    .map(b => b.googleRating!.rating);
  const avgCityRating = cityRatings.length > 0 
    ? cityRatings.reduce((a, b) => a + b, 0) / cityRatings.length 
    : 4.7;
  const totalCityReviews = cityBranches
    .filter(b => b.googleRating)
    .reduce((sum, b) => sum + (b.googleRating?.totalReviews || 0), 0);

  return (
    <article 
      className="group relative bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl md:rounded-2xl lg:rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-3 sm:p-5 md:p-5 lg:p-6 overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-1"
      itemScope
      itemType="https://schema.org/LocalBusiness"
    >
      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-indigo-500/10 rounded-bl-[50px] sm:rounded-bl-[60px] md:rounded-bl-[60px] lg:rounded-bl-[80px] transition-transform duration-700 group-hover:scale-110" />

      {/* Header */}
      <header className="relative z-10 flex items-start justify-between mb-3 sm:mb-5 md:mb-5 lg:mb-6 gap-2 sm:gap-3">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-3 lg:gap-4 min-w-0 flex-1">
          <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl md:rounded-xl lg:rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 md:h-4 md:w-4 lg:h-5 lg:w-5" strokeWidth={1.5} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-black text-base sm:text-lg md:text-lg lg:text-xl text-slate-900 dark:text-white tracking-tight leading-tight mb-0.5 sm:mb-1 break-words" itemProp="addressLocality">
              {city.name}
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                <span className="text-[10px] sm:text-xs font-bold text-amber-600 dark:text-amber-400">{avgCityRating.toFixed(1)}</span>
              </div>
              <span className="text-[9px] text-slate-400">({totalCityReviews} reviews)</span>
            </div>
          </div>
        </div>
        <div className="px-2 sm:px-2.5 md:px-2.5 lg:px-3 py-0.5 sm:py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 flex-shrink-0 whitespace-nowrap">
          {city.branchCount} {city.branchCount === 1 ? 'Branch' : 'Branches'}
        </div>
      </header>

      {/* Content */}
      <div className="relative z-10">
        <p className="text-xs sm:text-sm md:text-xs lg:text-sm text-slate-600 dark:text-slate-300 mb-3 sm:mb-5 md:mb-4 lg:mb-5 leading-relaxed font-medium break-words" itemProp="description">
          {city.description}
        </p>

        {/* Local Keywords as Tags */}
        <div className="mb-3 sm:mb-5 md:mb-4 lg:mb-6">
          <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
            <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-amber-500 flex-shrink-0" />
            Popular Searches
          </p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {city.localKeywords.slice(0, 4).map((keyword, i) => (
              <span 
                key={i}
                className="text-[9px] sm:text-[10px] font-bold px-2 sm:px-2.5 md:px-2.5 lg:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-700 break-words"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Branch Contact Info */}
        {cityBranches.length > 0 && (
          <div className="pt-3 sm:pt-4 md:pt-4 lg:pt-5 border-t border-slate-100 dark:border-slate-800">
            <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 sm:mb-3 md:mb-3 lg:mb-4">Quick Actions</p>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {cityBranches[0].contactPoint[0]?.telephone && (
                <a 
                  href={`tel:${cityBranches[0].contactPoint[0].telephone}`}
                  className="flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 md:px-3 lg:px-4 py-2 sm:py-2.5 md:py-2 lg:py-2.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
                  itemProp="telephone"
                >
                  <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                  <span className="truncate">Call</span>
                </a>
              )}
              {cityBranches[0].contactPoint[0]?.url && !cityBranches[0].contactPoint[0].url.includes('nan') && (
                <a 
                  href={cityBranches[0].contactPoint[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 md:px-3 lg:px-4 py-2 sm:py-2.5 md:py-2 lg:py-2.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
                >
                  <MessageCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                  <span className="truncate">WhatsApp</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Hidden SEO Metadata */}
      <meta itemProp="name" content={`EEC ${city.name} - Study Abroad Consultant`} />
      <meta itemProp="priceRange" content="$$" />
      <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress" className="hidden">
        <meta itemProp="addressLocality" content={city.name} />
        <meta itemProp="addressRegion" content="Gujarat" />
        <meta itemProp="addressCountry" content="IN" />
      </div>
    </article>
  );
};

// =============================================================================
// NAP CONSISTENCY COMPONENT
// =============================================================================

const NAPConsistency: React.FC = () => {
  return (
    <div 
      className="relative overflow-hidden rounded-[2.5rem] p-10 text-white bg-slate-900 border border-slate-800 shadow-2xl"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.4),transparent),radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.4),transparent)]" />
      <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-bl-[100px]" />
      
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs font-black uppercase tracking-widest mb-6 backdrop-blur-md">
            <Shield className="h-3.5 w-3.5" />
            <span className="opacity-90">Official Organization Schema</span>
            <Globe2 className="h-3.5 w-3.5" />
          </div>
          <h3 className="text-3xl md:text-4xl font-black mb-3 tracking-tight leading-tight">
            <span itemProp="name">Enbee Education Center Private Limited</span>
          </h3>
          <p className="text-indigo-200 text-lg font-medium" itemProp="alternateName">EEC • EEC Gujarat • EEC India</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          {/* Headquarters */}
          <div 
            className="group bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
            itemProp="address"
            itemScope
            itemType="https://schema.org/PostalAddress"
          >
            <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-300 group-hover:scale-110 transition-transform">
              <Building2 className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <h4 className="font-black text-xl mb-3 text-white tracking-tight">Headquarters</h4>
            <p className="text-slate-300 text-sm leading-relaxed mb-1" itemProp="streetAddress">
              3rd Floor, B-Wing, Windsor Plaza,<br/>RC Dutt Rd, Alkapuri
            </p>
            <p className="text-slate-300 text-sm font-medium">
              <span itemProp="addressLocality">Vadodara</span>, <span itemProp="addressRegion">Gujarat</span>
            </p>
            <meta itemProp="postalCode" content="390007" />
            <meta itemProp="addressCountry" content="IN" />
          </div>

          {/* Contact */}
          <div className="group bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform">
              <Phone className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <h4 className="font-black text-xl mb-3 text-white tracking-tight">Contact</h4>
            <div className="space-y-2">
              <p className="text-slate-300 text-sm">
                <a href="tel:+918758750036" className="hover:text-white transition-colors font-medium underline decoration-white/20" itemProp="telephone">+91 87587 50036</a>
              </p>
              <p className="text-slate-300 text-sm">
                <a href="https://wa.me/918758750036" className="hover:text-white transition-colors font-medium underline decoration-white/20">WhatsApp Support</a>
              </p>
              <p className="text-slate-300 text-sm">
                <a href="mailto:info@eecglobal.com" className="hover:text-white transition-colors font-medium underline decoration-white/20" itemProp="email">info@eecglobal.com</a>
              </p>
            </div>
          </div>

          {/* Network */}
          <div className="group bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
              <Award className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <h4 className="font-black text-xl mb-3 text-white tracking-tight">Network</h4>
            <div className="space-y-1">
              <p className="text-slate-300 text-sm font-medium">26 Branches</p>
              <p className="text-slate-300 text-sm font-medium">12 Cities in Gujarat</p>
              <p className="text-slate-300 text-sm font-medium">Since 1997</p>
            </div>
          </div>
        </div>

        {/* Website */}
        <div className="text-center mt-10">
          <a 
            href="https://eecglobal.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all hover:scale-105"
            itemProp="url"
          >
            Visit Official Website <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// MAIN LOCAL SEO COMPONENT
// =============================================================================

export const LocalSEO: React.FC = () => {
  const totalBranches = BRANCH_DATA.length;
  const totalCities = CITY_LOCAL_DATA.length;
  const avgRating = getAverageRating();
  const totalReviewCount = getTotalReviews();

  return (
    <section 
      className="mt-12 py-12 lg:py-16"
      aria-labelledby="local-seo-heading"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-[#0B1021] dark:via-[#0A0F1A] dark:to-[#0B1222]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-emerald-200/60 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-300 text-sm font-bold px-5 py-2.5 rounded-full mb-5 shadow-lg shadow-emerald-200/40">
            <Sparkles className="h-4 w-4" />
            <span>Local Presence Across Gujarat</span>
            <MapPin className="h-4 w-4" />
          </div>
          <h2 
            id="local-seo-heading"
            className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight"
            data-speakable="true"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500">{totalBranches} Branches</span> in {totalCities} Gujarat Cities
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Find your nearest <strong>EEC branch</strong> for personalized <strong>New Zealand visa guidance</strong>, 
            <strong> IELTS/PTE coaching</strong>, and <strong>study abroad consultation</strong>. 
            Walk-in consultations available at all locations.
          </p>
        </header>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Building2, label: 'Branches', value: totalBranches, color: 'indigo' },
            { icon: MapPin, label: 'Cities', value: totalCities, color: 'emerald' },
            { icon: Clock, label: 'Experience', value: '27 Years', color: 'amber' },
            { icon: Star, label: 'Google Rating', value: `${avgRating.toFixed(1)}/5`, color: 'rose' },
          ].map((stat, idx) => (
            <div key={idx} className="group relative bg-white dark:bg-slate-900 rounded-[2rem] p-6 border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-indigo-500/10 transition-all hover:-translate-y-1">
              <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}-500/5 rounded-bl-[60px] transition-transform group-hover:scale-110`} />
              
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-50 dark:bg-${stat.color}-900/20 text-${stat.color}-600 dark:text-${stat.color}-400 flex items-center justify-center mb-4`}>
                  <stat.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                
                <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-1">{stat.value}</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* City Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20">
          {CITY_LOCAL_DATA.map((city) => (
            <CityCard key={city.slug} city={city} />
          ))}
        </div>

        {/* NAP Consistency Section */}
        <NAPConsistency />

        {/* Local SEO Rich Text */}
        <div className="mt-20 relative bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(99,102,241,0.05),transparent_50%)]" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-bl-[150px]" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-8">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              Local Authority
            </div>
            
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-8 tracking-tight max-w-3xl">
              Why Choose EEC for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-600">New Zealand Student Visa</span> in Gujarat?
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg transition-all">
                <div className="mb-4 w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <span className="font-black text-lg">01</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium">
                  <strong>EEC (Enbee Education Center Private Limited)</strong> is Gujarat's most established and trusted 
                  <strong> study abroad consultancy</strong>, serving students across <strong>Ahmedabad, Surat, Vadodara</strong> and 9 other cities. 
                  Since 1997, we have helped over <strong>100,000 students</strong>.
                </p>
              </div>
              
              <div className="group p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg transition-all">
                <div className="mb-4 w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <span className="font-black text-lg">02</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium">
                  Our exclusive partnership with <strong>ESTERO New Zealand</strong> makes us the official representative 
                  of <strong>all 8 New Zealand universities</strong>. Our 
                  <strong> ENZRA certified counselors</strong> provide expert guidance on <strong>NZ student visa applications</strong> and interviews.
                </p>
              </div>
              
              <div className="group p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg transition-all">
                <div className="mb-4 w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <span className="font-black text-lg">03</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium">
                  Whether you're looking for <strong>IELTS coaching in Ahmedabad</strong>, 
                  <strong> PTE preparation in Surat</strong>, or <strong>New Zealand visa consultation in Vadodara</strong>, 
                  EEC's <strong>26 branches</strong> across Gujarat ensure you have access to world-class guidance close to home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalSEO;

