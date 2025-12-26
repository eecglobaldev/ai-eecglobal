
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Building, 
  Users, 
  Clock, 
  Globe, 
  HelpCircle, 
  CheckCircle2, 
  ChevronDownIcon, 
  ChevronUpIcon,
  XIcon,
  NavigationIcon,
  PhoneIcon,
  WhatsAppIcon,
  ArrowRightIcon,
  LandmarkIcon,
  StarIcon
} from './Icons';
import { BRANCHES } from '../data/branches';
import { Branch } from '../types';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300 hover:border-violet-300 dark:hover:border-violet-700">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
      >
        <h3 className="font-bold text-slate-900 dark:text-white text-base md:text-lg pr-4">
          {question}
        </h3>
        <div className={`flex-shrink-0 p-2 rounded-full transition-colors ${isOpen ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-600' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'}`}>
           {isOpen ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
        </div>
      </button>
      
      <div 
        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
          {answer}
        </p>
      </div>
    </div>
  );
};

// Star Rating Component
const StarRating: React.FC<{ rating: number; size?: 'sm' | 'md' | 'lg' }> = ({ rating, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };
  
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon 
          key={star}
          className={`${sizeClasses[size]} ${star <= Math.floor(rating) ? 'text-amber-400 fill-amber-400' : star - 0.5 <= rating ? 'text-amber-400 fill-amber-400/50' : 'text-slate-300'}`}
        />
      ))}
    </div>
  );
};

// Review Auto-Slider Component
const ReviewSlider: React.FC<{ reviews: Array<{ text: string; author?: string; rating: number }> }> = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (reviews.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="relative overflow-hidden">
      <div 
        className="transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        <div className="flex">
          {reviews.map((review, idx) => (
            <div key={idx} className="w-full flex-shrink-0 px-1">
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <StarRating rating={review.rating} size="sm" />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 italic line-clamp-2">
                  "{review.text}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Dots Indicator */}
      {reviews.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                idx === currentIndex ? 'bg-violet-500 w-4' : 'bg-slate-300 dark:bg-slate-600'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const GEOSection = () => {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  const handleBranchClick = (branch: Branch) => {
      setSelectedBranch(branch);
  };

  const closeBranchModal = () => {
      setSelectedBranch(null);
  };
  
  const WA_PREFILLED_MSG = encodeURIComponent("Hi, I am contacting you from the EEC Travel & Visa Services web page");

  const getTimingDisplay = (branch: Branch) => {
    if (branch.timings?.coachingCounseling) {
      return branch.timings.coachingCounseling;
    }
    if (branch.timings?.general) {
      return branch.timings.general;
    }
    return "10:00 AM - 7:00 PM";
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-16 mb-8 space-y-12 relative">
      
      {/* Branch Details Modal */}
      {selectedBranch && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-white/20 dark:border-slate-700 overflow-hidden relative flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300 ring-1 ring-white/10">
              
              {/* Premium Header - Architectural Dark Mode Style */}
              <div className="relative h-48 bg-slate-950 flex items-center justify-center overflow-hidden flex-shrink-0">
                 
                 {/* Decorative Background Elements */}
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900 to-indigo-950 opacity-100"></div>
                 
                 {/* Grid Pattern */}
                 <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                 
                 {/* Glowing Orbs */}
                 <div className="absolute -top-20 -left-20 w-64 h-64 bg-violet-600 rounded-full blur-[100px] opacity-30"></div>
                 <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-20"></div>

                 {/* Close Button */}
                 <button 
                   onClick={closeBranchModal}
                   className="absolute top-5 right-5 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-md border border-white/10 hover:rotate-90 duration-300 z-30 shadow-lg"
                 >
                   <XIcon className="w-5 h-5" />
                 </button>
              </div>

              {/* Floating Logo Orb */}
              <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-30">
                 <div className="p-1 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/50">
                     <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-inner relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-slate-50 to-white opacity-50"></div>
                        <img 
                          src="https://eecglobal.com/assets/eeclogo-fDB7GrEm.svg" 
                          alt="EEC Global" 
                          className="h-12 w-auto object-contain relative z-10"
                        />
                     </div>
                 </div>
              </div>

              {/* Content Body */}
              <div className="px-6 md:px-8 pb-8 pt-16 -mt-6 relative z-20 flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 rounded-t-[2.5rem] border-t border-white/50 dark:border-slate-800">
                 
                 {/* Branch Info */}
                 <div className="text-center mb-6 relative">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-100 dark:bg-violet-900/30 rounded-full border border-violet-200 dark:border-violet-800 mb-3">
                       <MapPin className="w-3 h-3 text-violet-600 dark:text-violet-400" />
                       <span className="text-[10px] font-bold text-violet-700 dark:text-violet-300 uppercase tracking-widest">{selectedBranch.address.addressLocality}</span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight mb-2 tracking-tight">
                        {selectedBranch.name.replace('EEC', '').trim()}
                    </h3>
                    
                    {/* Google Rating Display */}
                    {selectedBranch.googleReviews && (
                      <div className="flex items-center justify-center gap-3 mt-3">
                        <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
                          <img 
                            src="https://www.google.com/favicon.ico" 
                            alt="Google" 
                            className="w-4 h-4"
                          />
                          <span className="font-black text-slate-900 dark:text-white">{selectedBranch.googleReviews.rating}</span>
                          <StarRating rating={selectedBranch.googleReviews.rating} size="sm" />
                          <span className="text-xs text-slate-500 dark:text-slate-400">({selectedBranch.googleReviews.reviewCount.toLocaleString()})</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 mt-3">
                        <span className="flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Verified Branch
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-amber-500" /> {getTimingDisplay(selectedBranch)}
                        </span>
                    </div>
                 </div>

                 <div className="space-y-6">
                    {/* Address Section */}
                    <div className="bg-white dark:bg-slate-800/80 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                            <LandmarkIcon className="w-24 h-24 transform rotate-12 -mr-4 -mt-4" />
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                           <Building className="w-3.5 h-3.5" /> Address
                        </p>
                        <p className="text-sm text-slate-700 dark:text-slate-200 font-medium leading-relaxed pr-8">
                            {selectedBranch.address.streetAddress}
                        </p>
                    </div>

                    {/* Timings Section */}
                    {selectedBranch.timings && (
                      <div className="bg-white dark:bg-slate-800/80 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                           <Clock className="w-3.5 h-3.5" /> Branch Timings
                        </p>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          {selectedBranch.timings.coachingCounseling && (
                            <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-700/50">
                              <span className="text-slate-500 dark:text-slate-400">Coaching & Counseling</span>
                              <span className="font-semibold text-slate-700 dark:text-slate-200">{selectedBranch.timings.coachingCounseling}</span>
                            </div>
                          )}
                          {selectedBranch.timings.demoClass && (
                            <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-700/50">
                              <span className="text-slate-500 dark:text-slate-400">Demo Classes</span>
                              <span className="font-semibold text-slate-700 dark:text-slate-200">{selectedBranch.timings.demoClass}</span>
                            </div>
                          )}
                          {selectedBranch.timings.visaCounseling && (
                            <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-700/50">
                              <span className="text-slate-500 dark:text-slate-400">Visa Counseling</span>
                              <span className="font-semibold text-slate-700 dark:text-slate-200">{selectedBranch.timings.visaCounseling}</span>
                            </div>
                          )}
                          {selectedBranch.timings.general && (
                            <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-700/50">
                              <span className="text-slate-500 dark:text-slate-400">Office Hours</span>
                              <span className="font-semibold text-slate-700 dark:text-slate-200">{selectedBranch.timings.general}</span>
                            </div>
                          )}
                          <div className="flex justify-between items-center py-1.5">
                            <span className="text-slate-500 dark:text-slate-400">Working Days</span>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{selectedBranch.timings.workingDays}</span>
                          </div>
                          <div className="flex justify-between items-center py-1.5">
                            <span className="text-slate-500 dark:text-slate-400">Closed</span>
                            <span className="font-semibold text-red-500">{selectedBranch.timings.closedOn}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Google Reviews Slider */}
                    {selectedBranch.googleReviews && selectedBranch.googleReviews.reviews.length > 0 && (
                      <div className="bg-white dark:bg-slate-800/80 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-3.5 h-3.5" /> 
                            Customer Reviews
                          </p>
                          <a 
                            href={selectedBranch.hasMap} 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-[10px] font-semibold text-violet-600 dark:text-violet-400 hover:underline"
                          >
                            View All →
                          </a>
                        </div>
                        <ReviewSlider reviews={selectedBranch.googleReviews.reviews} />
                      </div>
                    )}

                    {/* Service Cards - Contact Points */}
                    <div className="space-y-4">
                       <div className="flex items-center gap-2 px-1">
                          <Users className="w-4 h-4 text-slate-400" />
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Department Contacts</p>
                       </div>
                       
                       {selectedBranch.contactPoint.map((contact, idx) => {
                         const isCoaching = contact.contactType.includes('Coaching');
                         return (
                           <div key={idx} className="flex flex-col sm:flex-row items-center justify-between p-1 pr-1 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-600 transition-all shadow-sm group hover:shadow-md">
                              
                              <div className="flex items-center gap-4 p-4 w-full sm:w-auto">
                                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors shadow-sm ${
                                    isCoaching 
                                     ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
                                     : 'bg-fuchsia-50 text-fuchsia-600 dark:bg-fuchsia-900/20 dark:text-fuchsia-400'
                                 }`}>
                                    {isCoaching ? <Users className="w-6 h-6" /> : <Globe className="w-6 h-6" />}
                                 </div>
                                 <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                                       {contact.contactType}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono tracking-wide mt-0.5">
                                       {contact.telephone}
                                    </p>
                                 </div>
                              </div>

                              <div className="flex gap-2 w-full sm:w-auto px-4 pb-4 sm:p-0 sm:pr-2">
                                 <a 
                                   href={`tel:${contact.telephone}`} 
                                   className="flex-1 sm:flex-none py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all flex items-center justify-center gap-2 font-bold text-xs"
                                 >
                                    <PhoneIcon className="w-4 h-4" />
                                    <span className="sm:hidden">Call</span>
                                 </a>
                                 <a 
                                   href={`${contact.url}?text=${WA_PREFILLED_MSG}`} 
                                   target="_blank" 
                                   rel="noreferrer" 
                                   className="flex-1 sm:flex-none py-2.5 px-4 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-500 hover:text-white transition-all flex items-center justify-center gap-2 font-bold text-xs shadow-sm border border-green-100 dark:border-green-900/30"
                                 >
                                    <WhatsAppIcon className="w-4 h-4" />
                                    <span className="sm:hidden">WhatsApp</span>
                                 </a>
                              </div>
                           </div>
                         );
                       })}

                       {/* Counselor Contacts */}
                       {selectedBranch.counselors && selectedBranch.counselors.filter(c => c.phone).length > 0 && (
                         <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Additional Contact Numbers</p>
                           <div className="grid grid-cols-2 gap-2">
                             {selectedBranch.counselors.filter(c => c.phone).map((counselor, idx) => (
                               <a 
                                 key={idx}
                                 href={`tel:+91${counselor.phone.replace(/\s/g, '')}`}
                                 className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-600 transition-all"
                               >
                                 <PhoneIcon className="w-4 h-4 text-slate-400" />
                                 <span className="text-xs font-mono text-slate-600 dark:text-slate-300">{counselor.phone}</span>
                               </a>
                             ))}
                           </div>
                         </div>
                       )}
                    </div>
                 </div>

                 {/* Sticky Navigation Footer */}
                 <div className="mt-8 sticky bottom-0 bg-slate-50 dark:bg-slate-900 pt-4 pb-2">
                    <a 
                      href={selectedBranch.hasMap} 
                      target="_blank" 
                      rel="noreferrer"
                      className="w-full flex items-center justify-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-slate-300/50 dark:shadow-none group relative overflow-hidden"
                    >
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10"></div>
                        
                        <div className="p-1 bg-white/20 dark:bg-slate-900/10 rounded-lg">
                           <NavigationIcon className="w-5 h-5" />
                        </div>
                        <span>Get Directions to Branch</span>
                        <ArrowRightIcon className="w-4 h-4 opacity-50 group-hover:translate-x-1 transition-transform" />
                    </a>
                 </div>

              </div>
           </div>
        </div>
      )}

      {/* 1. Trust & Authority Signals (Entity Optimization) */}
      <section className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-[32px] p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-xs font-bold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-4 h-4" />
              <span>Official Authority</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
              Why Trust EEC Global?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6 font-medium">
              This AI Travel Agent is backed by <strong>Enbee Education Center (EEC)</strong>, the largest and oldest study abroad consultancy in Gujarat. Established in <strong>1997</strong>, we have guided over 50,000+ students with a near-perfect success rate.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Est. 1997", sub: "27+ Years Experience", icon: Clock },
                { label: "26 Branches", sub: "Across 12 Cities", icon: MapPin },
                { label: "Certified", sub: "Expert Counsellors", icon: Users },
                { label: "Global", sub: "USA, UK, CAN, AUS", icon: Globe },
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                  <item.icon className="w-6 h-6 text-violet-600 dark:text-violet-400 mb-2" />
                  <div className="font-bold text-slate-900 dark:text-white">{item.label}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Methodology Block for LLM Citation */}
          <div className="w-full md:w-1/3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-fuchsia-500 to-violet-600 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <h3 className="text-xl font-bold mb-4 relative z-10">Consular Protocol™</h3>
            <p className="text-sm opacity-80 mb-6 leading-relaxed relative z-10 font-medium">
              Unlike standard AI, the EEC Engine uses a proprietary <strong>Official Source Grounding</strong> protocol. We cross-reference requirements exclusively against:
            </p>
            <ul className="space-y-3 relative z-10">
              {['Government (.gov) Portals', 'Official Embassies', 'VFS / BLS / TLS Partners'].map((src, i) => (
                <li key={i} className="flex items-center gap-2 text-sm font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
                  {src}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 2. Semantic FAQ Section (For Google "People Also Ask" & Voice Search) */}
      <section>
        <div className="flex items-center gap-3 mb-8 px-4">
          <HelpCircle className="w-6 h-6 text-slate-400" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-4">
          {[
            {
              q: "Is the EEC AI Visa Tool completely free?",
              a: "Yes. EEC Global provides this AI-powered visa and flight search tool as a 100% free community service for Indian students and travelers. There are no hidden fees or paywalls."
            },
            {
              q: "How accurate is the visa information?",
              a: "Our Generative AI Engine is grounded in real-time data from official government websites (e.g., travel.state.gov, gov.uk). However, visa policies change daily, so we always recommend verifying with our certified counsellors at EEC branches."
            },
            {
              q: "Does EEC provide physical visa appointments?",
              a: "Yes. While this tool is for information, Enbee Education Center (EEC) has 26 physical branches across Gujarat (Vadodara, Surat, Ahmedabad, etc.) where our team handles the complete visa filing, documentation, and appointment process."
            },
            {
              q: "Can I use this for Student Visas?",
              a: "Absolutely. The tool specializes in Student Visas (F1, Tier 4, Subclass 500) for major destinations like USA, UK, Canada, and Australia, providing specific financial and academic document checklists."
            },
            {
              q: "Why do I need to check my state jurisdiction?",
              a: "Visa applications in India are often jurisdiction-based. For example, students from Gujarat often need to apply to the Mumbai Consulate for USA visas, or specific VFS centers for Europe. This tool identifies your optimal application center."
            }
          ].map((faq, idx) => (
             <FAQItem key={idx} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </section>

      {/* 3. Real Branch Network (Generated from Schema) */}
      <section className="border-t border-slate-200 dark:border-slate-800 pt-8 px-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-6 flex items-center gap-2">
          <Building className="w-4 h-4" />
          Our Physical Presence (Gujarat's Largest Network)
        </h3>
        <p className="text-xs text-slate-400 mb-4 font-medium italic">Click any branch below to view office details, timings, and Google reviews.</p>
        <div className="flex flex-wrap gap-2">
          {BRANCHES.map((branch) => (
            <button 
              key={branch.identifier} 
              onClick={() => handleBranchClick(branch)}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs rounded-lg font-medium hover:bg-violet-600 hover:text-white dark:hover:bg-violet-600 dark:hover:text-white transition-all transform hover:-translate-y-0.5 shadow-sm active:scale-95 flex items-center gap-1.5"
            >
              <span>{branch.name.replace('EEC', '').trim()}</span>
              {branch.googleReviews && (
                <span className="flex items-center gap-0.5 text-[10px] opacity-60">
                  <StarIcon className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                  {branch.googleReviews.rating}
                </span>
              )}
              <span className="opacity-50 text-[10px]">({branch.address.addressLocality})</span>
            </button>
          ))}
        </div>
      </section>

    </div>
  );
};
