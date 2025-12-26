/**
 * BranchLocator Component
 * Complete branch discovery with ratings, reviews, timings & department contacts
 * Updated: December 2024
 */

import React, { useState, useMemo, useEffect } from 'react';
import { BRANCH_DATA, Branch, getAllCities, getTotalBranches, getAverageRating, getTotalReviews, getAllBranchPhones } from '../data/branches';
import { ReviewBadge, ViewOnGoogleButton, AllPhonesDisplay } from './ReviewSlider';
import { 
  MapPin, 
  MessageCircle, 
  Phone, 
  Building2, 
  Navigation, 
  Clock, 
  Sparkles,
  Search,
  ArrowRight,
  ExternalLink,
  Map,
  Star,
  Calendar,
  GraduationCap,
  FileCheck,
  Users,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

type GroupedBranches = Record<string, Branch[]>;

const normalizeCityName = (branch: Branch): string => {
    const cityMap: Record<string, string> = { 'EEC Vallabh Vidyanagar Anand': 'Anand' };
    if (branch.address.addressLocality && branch.address.addressLocality !== 'Nan' && branch.address.addressLocality.trim() !== '') {
        return branch.address.addressLocality;
    }
    return cityMap[branch.name] || 'Other';
}

// =============================================================================
// GENERATE SCHEMA FOR SEO
// =============================================================================

const generateBranchSchema = (branch: Branch): object => ({
    "@type": "LocalBusiness",
    "@id": `https://eecglobal.com/branches/${branch.identifier}`,
    "name": branch.name,
    "description": `${branch.name} - EEC Study Abroad Consultancy Branch providing IELTS/PTE coaching, university admissions, and visa guidance services for students planning to study in New Zealand, UK, USA, Canada, Australia, and Germany.`,
    "image": "/assets/eeclogo.svg",
    "url": "https://eecglobal.com",
    "telephone": branch.contactPoint[0]?.telephone || "+918758750036",
    "priceRange": "$$",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": branch.address.streetAddress,
        "addressLocality": branch.address.addressLocality,
        "addressRegion": branch.address.addressRegion,
        "addressCountry": "IN"
    },
    "geo": branch.geo ? {
        "@type": "GeoCoordinates",
        "latitude": branch.geo.latitude,
        "longitude": branch.geo.longitude
    } : undefined,
    "hasMap": branch.hasMap,
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "10:00",
            "closes": "19:00"
        }
    ],
    "sameAs": [
        "https://www.instagram.com/eecglobal",
        "https://www.facebook.com/eecglobal",
        "https://www.linkedin.com/school/eecindia"
    ],
    "parentOrganization": {
        "@type": "Organization",
        "@id": "https://eecglobal.com/#organization",
        "name": "Enbee Education Center Private Limited"
    },
    "aggregateRating": branch.googleRating ? {
        "@type": "AggregateRating",
        "ratingValue": branch.googleRating.rating.toString(),
        "reviewCount": branch.googleRating.totalReviews.toString(),
        "bestRating": "5",
        "worstRating": "1"
    } : undefined,
    "review": branch.googleRating?.reviews?.slice(0, 3).map((review: { author: string; rating: number; text: string; date: string }) => ({
        "@type": "Review",
        "author": { "@type": "Person", "name": review.author },
        "reviewRating": {
            "@type": "Rating",
            "ratingValue": review.rating.toString(),
            "bestRating": "5"
        },
        "reviewBody": review.text,
        "datePublished": review.date
    }))
});

// =============================================================================
// CONTACT DEPARTMENT COMPONENT
// =============================================================================

interface ContactDeptProps {
  type: string;
  telephone: string;
  whatsappUrl: string;
  icon: React.ElementType;
  color: string;
}

const ContactDept: React.FC<ContactDeptProps> = ({ type, telephone, whatsappUrl, icon: Icon, color }) => {
  if (!telephone || telephone.includes('nan')) return null;
  
  const colorClasses: Record<string, string> = {
    indigo: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-800/30',
    emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/30',
    violet: 'bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 border-violet-100 dark:border-violet-800/30'
  };

  return (
    <div className={`p-3 rounded-xl border ${colorClasses[color]} transition-all hover:shadow-md`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-[10px] font-bold uppercase tracking-wider">{type}</span>
      </div>
      <div className="flex items-center gap-2">
        <a 
          href={`tel:${telephone}`}
          className="flex-1 flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-white/60 dark:bg-slate-800/40 rounded-lg text-[11px] font-bold hover:bg-white dark:hover:bg-slate-800 transition-colors"
        >
          <Phone className="h-3 w-3" />
          {telephone.replace('+91 ', '')}
        </a>
        {whatsappUrl && !whatsappUrl.includes('nan') && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white rounded-lg transition-all"
            aria-label={`WhatsApp for ${type}`}
          >
            <MessageCircle className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
};

// =============================================================================
// TIMINGS DISPLAY COMPONENT
// =============================================================================

interface TimingsDisplayProps {
  timings: Branch['timings'];
  compact?: boolean;
}

const TimingsDisplay: React.FC<TimingsDisplayProps> = ({ timings, compact = false }) => {
  if (!timings) return null;

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
        <Clock className="h-3 w-3" />
        <span className="font-medium">
          {timings.general || timings.coachingCounseling || '10:00 AM - 07:00 PM'}
        </span>
        <span className="text-slate-300 dark:text-slate-600">•</span>
        <span>{timings.workingDays}</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 text-[10px]">
      {timings.coachingCounseling && (
        <div className="flex items-start gap-1.5">
          <GraduationCap className="h-3 w-3 text-indigo-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-bold text-slate-600 dark:text-slate-300">Coaching</p>
            <p className="text-slate-400">{timings.coachingCounseling}</p>
          </div>
        </div>
      )}
      {timings.visaCounseling && (
        <div className="flex items-start gap-1.5">
          <FileCheck className="h-3 w-3 text-emerald-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-bold text-slate-600 dark:text-slate-300">Visa Counseling</p>
            <p className="text-slate-400">{timings.visaCounseling}</p>
          </div>
        </div>
      )}
      {timings.demoClass && (
        <div className="flex items-start gap-1.5">
          <Users className="h-3 w-3 text-violet-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-bold text-slate-600 dark:text-slate-300">Demo Classes</p>
            <p className="text-slate-400">{timings.demoClass}</p>
          </div>
        </div>
      )}
      {timings.general && (
        <div className="flex items-start gap-1.5">
          <Clock className="h-3 w-3 text-amber-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-bold text-slate-600 dark:text-slate-300">General Hours</p>
            <p className="text-slate-400">{timings.general}</p>
          </div>
        </div>
      )}
      <div className="col-span-2 flex items-center gap-1.5 pt-1 border-t border-slate-100 dark:border-slate-800">
        <Calendar className="h-3 w-3 text-slate-400" />
        <span className="text-slate-500">{timings.workingDays}</span>
        <span className="text-rose-500 font-medium ml-1">Closed: {timings.closedOn}</span>
      </div>
    </div>
  );
};

// =============================================================================
// BRANCH CARD COMPONENT
// =============================================================================

const BranchCard: React.FC<{ branch: Branch; cityName: string }> = ({ branch, cityName }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const branchSchema = generateBranchSchema(branch);

    // Determine if branch is currently open
    const isOpen = () => {
      const now = new Date();
      const hours = now.getHours();
      const day = now.getDay();
      // Closed on Sunday (day = 0)
      if (day === 0) return false;
      // Open 10 AM - 7 PM (or 9 AM - 6 PM for some branches)
      return hours >= 10 && hours < 19;
    };

    const openStatus = isOpen();

    return (
        <article 
            className="group relative bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-indigo-500/30"
            itemScope
            itemType="https://schema.org/LocalBusiness"
            aria-label={`${branch.name} Branch Information`}
        >
            {/* Schema Markup */}
            <script 
                type="application/ld+json" 
                dangerouslySetInnerHTML={{ __html: JSON.stringify(branchSchema) }} 
            />
            
            {/* Header Section */}
            <div className="p-4 sm:p-6 pb-0">
              <header className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex-1 min-w-0">
                      <h3 
                          className="font-black text-lg sm:text-xl text-slate-900 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate"
                          itemProp="name"
                      >
                          {branch.name.replace('EEC ', '')}
                      </h3>
                      
                      {/* Status & Rating Row */}
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            openStatus 
                              ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30' 
                              : 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30'
                          }`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${openStatus ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                              {openStatus ? 'Open Now' : 'Closed'}
                          </span>
                          
                          {branch.googleRating && (
                            <ReviewBadge 
                              rating={branch.googleRating.rating} 
                              totalReviews={branch.googleRating.totalReviews} 
                            />
                          )}
                      </div>
                  </div>
                  
                  <div className="flex-shrink-0 bg-indigo-50 dark:bg-indigo-900/30 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl group-hover:scale-110 transition-transform">
                      <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
              </header>
              
              {/* Address */}
              <address 
                  className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed not-italic mb-4 pl-3 border-l-2 border-slate-200 dark:border-slate-700"
                  itemProp="address" 
                  itemScope 
                  itemType="https://schema.org/PostalAddress"
              >
                  <span itemProp="streetAddress" className="line-clamp-2">{branch.address.streetAddress}</span>
                  <div className="flex items-center gap-1 mt-1 text-slate-400 dark:text-slate-500 text-[10px] sm:text-xs">
                    <MapPin className="h-3 w-3" />
                    <span>{branch.address.addressLocality}, {branch.address.addressRegion}</span>
                  </div>
                  <meta itemProp="addressLocality" content={branch.address.addressLocality} />
                  <meta itemProp="addressRegion" content={branch.address.addressRegion} />
                  <meta itemProp="addressCountry" content={branch.address.addressCountry} />
              </address>

              {/* Compact Timings */}
              {branch.timings && <TimingsDisplay timings={branch.timings} compact />}
            </div>

            {/* Department Contacts - Shows ALL phone numbers */}
            <div className="px-4 sm:px-6 py-4 border-t border-slate-100 dark:border-slate-800 mt-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Phone className="h-3 w-3" />
                All Contact Numbers
              </p>
              
              {/* Department Contact Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                {branch.contactPoint.map((contact: { contactType: string; telephone: string; url: string }, index: number) => (
                  <ContactDept
                    key={index}
                    type={contact.contactType.replace(' Information', '')}
                    telephone={contact.telephone}
                    whatsappUrl={contact.url}
                    icon={index === 0 ? GraduationCap : FileCheck}
                    color={index === 0 ? 'indigo' : 'emerald'}
                  />
                ))}
              </div>

              {/* Additional Counselor Numbers (if different from contactPoints) */}
              {branch.counselors && branch.counselors.length > 0 && (() => {
                const contactPhones = branch.contactPoint.map((cp: { telephone: string }) => cp.telephone.replace(/\s/g, '').replace('+91', ''));
                const additionalCounselors = branch.counselors.filter((c: { phone: string }) => 
                  c.phone && 
                  c.phone.trim() !== '' && 
                  !contactPhones.some((cp: string) => cp.includes(c.phone.replace(/\s/g, '')))
                );
                
                if (additionalCounselors.length === 0) return null;
                
                return (
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Additional Counselors
                    </p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {additionalCounselors.map((counselor: { name: string; phone: string; email: string }, idx: number) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <a
                            href={`tel:+91${counselor.phone.replace(/\s/g, '')}`}
                            className="flex items-center gap-1.5 px-2 py-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors flex-1"
                          >
                            <Phone className="h-2.5 w-2.5" />
                            {counselor.phone.replace(/\s/g, '')}
                          </a>
                          <a
                            href={`https://Wa.Me/91${counselor.phone.replace(/\s/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-[#25D366]/10 text-[#25D366] rounded-lg hover:bg-[#25D366] hover:text-white transition-colors"
                            aria-label={`WhatsApp Counselor`}
                          >
                            <MessageCircle className="h-3 w-3" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Expandable Section */}
            {(branch.timings || branch.googleRating) && (
              <>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="w-full px-4 sm:px-6 py-2 flex items-center justify-center gap-1.5 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/10 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors border-t border-indigo-100 dark:border-indigo-900/30"
                >
                  {isExpanded ? 'Show Less' : 'Show Timings & Reviews'}
                  {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </button>

                {isExpanded && (
                  <div className="px-4 sm:px-6 py-4 space-y-4 bg-slate-50/50 dark:bg-slate-800/20 animate-in slide-in-from-top-2 duration-200">
                    {/* Detailed Timings */}
                    {branch.timings && (
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                          <Clock className="h-3 w-3" />
                          Operating Hours
                        </p>
                        <TimingsDisplay timings={branch.timings} />
                      </div>
                    )}

                    {/* View on Google Button - NO FAKE REVIEWS */}
                    {branch.googleRating && (
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                          <Star className="h-3 w-3 text-amber-500" />
                          Google Reviews
                        </p>
                        <ViewOnGoogleButton
                          mapUrl={branch.hasMap}
                          rating={branch.googleRating.rating}
                          totalReviews={branch.googleRating.totalReviews}
                          branchName={branch.name}
                        />
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-2 p-4 sm:p-6 pt-0">
                <a 
                    href={branch.hasMap} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400 transition-all group/btn"
                    aria-label={`Get directions to ${branch.name} on Google Maps`}
                    itemProp="hasMap"
                >
                    <Navigation className="h-3.5 w-3.5 group-hover/btn:scale-110 transition-transform" />
                    <span className="hidden sm:inline">Directions</span>
                </a>
                
                {branch.contactPoint[0]?.url && !branch.contactPoint[0].url.includes('nan') && (
                  <a 
                      href={branch.contactPoint[0].url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#25D366]/10 text-[#25D366] rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider hover:bg-[#25D366] hover:text-white transition-all group/btn"
                      aria-label={`Chat with ${branch.name} on WhatsApp`}
                  >
                      <MessageCircle className="h-3.5 w-3.5 group-hover/btn:scale-110 transition-transform" />
                      <span>WhatsApp</span>
                  </a>
                )}
                
                {branch.contactPoint[0]?.telephone && (
                  <a 
                      href={`tel:${branch.contactPoint[0].telephone}`} 
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all group/btn"
                      aria-label={`Call ${branch.name}`}
                      itemProp="telephone"
                  >
                      <Phone className="h-3.5 w-3.5 group-hover/btn:scale-110 transition-transform" />
                      <span>Call</span>
                  </a>
                )}
            </div>

            {/* Services Tags */}
            <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex flex-wrap gap-1.5">
                {['IELTS', 'PTE', 'NZ Visa', 'Admissions'].map((service) => (
                    <span 
                        key={service}
                        className="text-[9px] font-bold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md uppercase tracking-wider"
                    >
                        {service}
                    </span>
                ))}
            </div>

            {/* Hidden SEO metadata */}
            <meta itemProp="url" content="https://eecglobal.com" />
            <meta itemProp="priceRange" content="$$" />
            {branch.geo && (
                <div itemProp="geo" itemScope itemType="https://schema.org/GeoCoordinates" className="hidden">
                    <meta itemProp="latitude" content={String(branch.geo.latitude)} />
                    <meta itemProp="longitude" content={String(branch.geo.longitude)} />
                </div>
            )}
        </article>
    );
};

// =============================================================================
// MAIN BRANCH LOCATOR COMPONENT
// =============================================================================

export const BranchLocator: React.FC = () => {
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    const groupedBranches = useMemo((): GroupedBranches => {
        const groups: GroupedBranches = {};
        BRANCH_DATA.forEach((branch: Branch) => {
            const city = normalizeCityName(branch);
            if (!groups[city]) {
                groups[city] = [];
            }
            groups[city].push(branch);
        });
        const sortedCities = Object.keys(groups).sort((a, b) => groups[b].length - groups[a].length);
        return sortedCities.reduce((acc, key) => {
            acc[key] = groups[key];
            return acc;
        }, {} as GroupedBranches);
    }, []);

    const cities = useMemo(() => Object.keys(groupedBranches), [groupedBranches]);
    const totalBranches = getTotalBranches();
    const totalCities = cities.length;
    const avgRating = getAverageRating();
    const totalReviewCount = getTotalReviews();

    useEffect(() => {
        if (cities.length > 0 && !selectedCity) {
            setSelectedCity(cities[0]);
        }
    }, [cities, selectedCity]);

    // Generate aggregate schema
    const branchNetworkSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://eecglobal.com/#branchnetwork",
        "name": "EEC Branch Network",
        "description": `EEC operates ${totalBranches} branches across ${totalCities} cities in Gujarat, India, providing study abroad consultancy services.`,
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": avgRating.toFixed(1),
            "reviewCount": totalReviewCount.toString(),
            "bestRating": "5",
            "worstRating": "1"
        },
        "location": BRANCH_DATA.map((branch: Branch) => ({
            "@type": "Place",
            "name": branch.name,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": branch.address.streetAddress,
                "addressLocality": branch.address.addressLocality,
                "addressRegion": "Gujarat",
                "addressCountry": "IN"
            },
            "geo": branch.geo ? {
                "@type": "GeoCoordinates",
                "latitude": branch.geo.latitude,
                "longitude": branch.geo.longitude
            } : undefined,
            "hasMap": branch.hasMap
        }))
    };

    return (
        <section 
            className="mt-20 py-20 lg:py-32 relative overflow-hidden"
            aria-labelledby="branch-locator-heading"
            id="branches"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-slate-50 dark:bg-[#0B1021] -z-20" />
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.15),transparent_50%)] -z-10" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[120px] -z-10 translate-x-1/2 translate-y-1/2" />

            <script 
                type="application/ld+json" 
                dangerouslySetInnerHTML={{ __html: JSON.stringify(branchNetworkSchema) }} 
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Header Section */}
                <header className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 text-indigo-700 dark:text-indigo-300 mb-8 shadow-lg shadow-indigo-500/10">
                        <MapPin className="h-4 w-4" />
                        <span className="text-xs font-bold tracking-widest uppercase">
                            {totalBranches} Branches • {totalCities} Cities • Gujarat
                        </span>
                    </div>
                    <h2 
                        id="branch-locator-heading"
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 text-slate-900 dark:text-white"
                    >
                        Connect with <br className="md:hidden" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600">
                            EEC Branches
                        </span>
                    </h2>
                    <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
                        Gujarat's largest study abroad network. Visit any branch for personalized 
                        <strong className="text-indigo-600 dark:text-indigo-400"> New Zealand</strong> visa guidance and expert counselling.
                    </p>
                    
                    {/* Stats Row */}
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8">
                      <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-md">
                        <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                        <span className="text-lg font-black text-slate-900 dark:text-white">{avgRating.toFixed(1)}</span>
                        <span className="text-sm text-slate-500">Avg Rating</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-md">
                        <Users className="h-5 w-5 text-indigo-500" />
                        <span className="text-lg font-black text-slate-900 dark:text-white">{totalReviewCount.toLocaleString()}+</span>
                        <span className="text-sm text-slate-500">Reviews</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-md">
                        <Clock className="h-5 w-5 text-emerald-500" />
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Mon-Sat 10AM-7PM</span>
                      </div>
                    </div>
                    
                    {/* Quick Contact CTA */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                        <a 
                            href="https://Wa.Me/918758750036" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                            aria-label="Contact EEC on WhatsApp"
                        >
                            <MessageCircle className="h-5 w-5 fill-white" />
                            <span>WhatsApp: +91 87587 50036</span>
                        </a>
                        <a 
                            href="tel:+918758750036"
                            className="group inline-flex items-center gap-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all hover:bg-slate-50 dark:hover:bg-slate-700 shadow-md hover:shadow-lg hover:-translate-y-1"
                            aria-label="Call EEC main number"
                        >
                            <Phone className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                            <span>Call Now</span>
                        </a>
                    </div>
                </header>
                
                {/* Branch Grid Layout */}
                <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 min-h-[600px]">
                    {/* City Sidebar */}
                    <aside className="lg:col-span-3" aria-label="City Selection">
                        <nav className="p-2 bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 sticky top-24 shadow-2xl shadow-indigo-500/5">
                            <div className="p-4 pb-2">
                                <h3 className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-widest flex items-center gap-2 mb-4">
                                    <Map className="h-4 w-4 text-indigo-500" />
                                    Select City
                                </h3>
                            </div>
                            <ul className="space-y-1 max-h-[60vh] overflow-y-auto custom-scrollbar p-2" role="list">
                                {cities.map(city => (
                                    <li key={city}>
                                        <button 
                                            onClick={() => setSelectedCity(city)}
                                            className={`w-full text-left font-bold px-4 py-3 rounded-xl sm:rounded-2xl transition-all text-sm flex justify-between items-center group ${
                                                selectedCity === city 
                                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                            }`}
                                            aria-current={selectedCity === city ? 'true' : undefined}
                                            aria-label={`View ${groupedBranches[city].length} branches in ${city}`}
                                        >
                                            <span className="flex items-center gap-3">
                                                {selectedCity === city && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                                                {city}
                                            </span>
                                            <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${
                                                selectedCity === city 
                                                    ? 'bg-white/20 text-white' 
                                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-500 group-hover:bg-white group-hover:shadow-sm'
                                            }`}>
                                                {groupedBranches[city].length}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </aside>

                    {/* Branch Cards */}
                    <main className="lg:col-span-9" role="region" aria-live="polite" aria-label="Branch listings">
                        {selectedCity && (
                            <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 sm:h-12 w-1.5 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500" />
                                    <div>
                                        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                            {selectedCity}
                                        </h3>
                                        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
                                            {groupedBranches[selectedCity].length} Location{groupedBranches[selectedCity].length !== 1 && 's'} Found
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                                    {groupedBranches[selectedCity].map((branch, idx) => (
                                        <BranchCard 
                                            key={branch.identifier} 
                                            branch={branch} 
                                            cityName={selectedCity}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </main>
                </div>

                {/* SEO Content Section */}
                <section className="mt-20 sm:mt-24" aria-label="About EEC Branch Network">
                    <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                        <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200 dark:border-slate-800 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-indigo-500/10 rounded-bl-[80px] sm:rounded-bl-[100px] transition-transform group-hover:scale-110" />
                            
                            <h3 className="font-black text-slate-900 dark:text-white text-xl sm:text-2xl mb-6 flex items-center gap-3">
                                <span className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                                    <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
                                </span>
                                Why Visit EEC?
                            </h3>
                            <ul className="space-y-3 sm:space-y-4">
                                {[
                                    'ENZRA Certified counsellors',
                                    'Free consultation & profile assessment',
                                    'Document review for INZ interviews',
                                    'IELTS/PTE coaching at all branches',
                                    'Since 1997 - Trusted by 100k+ students'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="mt-1 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                            <div className="w-2 h-2 rounded-full bg-green-500" />
                                        </div>
                                        <span className="font-bold text-slate-700 dark:text-slate-300 text-sm sm:text-base">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200 dark:border-slate-800 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-purple-500/10 rounded-bl-[80px] sm:rounded-bl-[100px] transition-transform group-hover:scale-110" />
                            
                            <h3 className="font-black text-slate-900 dark:text-white text-xl sm:text-2xl mb-6 flex items-center gap-3">
                                <span className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                                    <Search className="h-5 w-5 sm:h-6 sm:w-6" />
                                </span>
                                Services Offered
                            </h3>
                            <ul className="space-y-3 sm:space-y-4">
                                {[
                                    'Student Visa Application Assistance',
                                    'INZ Credibility Interview Prep',
                                    'FTS (Funds to Support) Guidance',
                                    'University Selection (All 8 NZ Unis)',
                                    'Post-Study Work Visa Support'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="mt-1 w-5 h-5 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                                            <ArrowRight className="w-3 h-3 text-purple-600" />
                                        </div>
                                        <span className="font-bold text-slate-700 dark:text-slate-300 text-sm sm:text-base">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default BranchLocator;
