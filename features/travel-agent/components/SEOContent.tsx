
import { useState, useEffect } from 'react';
import { 
  BookOpenIcon, 
  CompassIcon, 
  MapIcon, 
  LandmarkIcon, 
  ScrollTextIcon, 
  ShieldIcon,
  ArrowRightIcon,
  MapPinIcon,
  XIcon,
  Building,
  NavigationIcon,
  PhoneIcon,
  WhatsAppIcon,
  Clock,
  StarIcon,
  MailIcon,
  CalendarIcon
} from './Icons';
import { BRANCHES } from '../data/branches';

// Auto-sliding review component
const ReviewSlider = ({ reviews }: { reviews: { text: string; rating: number }[] }) => {
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
    <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-2xl p-4 border border-amber-100 dark:border-amber-900/50 overflow-hidden">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          ))}
        </div>
        <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
          Real 5-Star Reviews
        </span>
      </div>
      
      <div className="relative min-h-[60px] overflow-hidden">
        {reviews.map((review, idx) => (
          <div
            key={idx}
            className={`transition-all duration-500 ease-in-out ${
              idx === currentIndex 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 absolute inset-0 translate-x-4'
            }`}
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
              "{review.text}"
            </p>
          </div>
        ))}
      </div>

      {reviews.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                idx === currentIndex 
                  ? 'bg-amber-500 w-4' 
                  : 'bg-amber-300 dark:bg-amber-700 hover:bg-amber-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const SEOContent = () => {
  const currentYear = new Date().getFullYear();
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const WA_PREFILLED_MSG = encodeURIComponent("Hi, I am contacting you from the EEC Travel & Visa Services web page");

  // Derive available cities dynamically from the verified branch data
  const availableCities = Array.from(new Set(BRANCHES.map(b => b.address.addressLocality))).sort();

  const cityBranches = selectedCity 
      ? BRANCHES.filter(b => b.address.addressLocality === selectedCity)
      : [];

  const popularRoutes = [
    { dest: "United States", type: "Student", label: "F1 Visa Requirements for USA" },
    { dest: "United Kingdom", type: "Student", label: "UK Tier 4 Student Visa Guide" },
    { dest: "Canada", type: "Student", label: "Canada Study Permit Process" },
    { dest: "Australia", type: "Student", label: "Australia Subclass 500 Visa" },
    { dest: "Germany", type: "Student", label: "German Student Visa Checklist" },
    { dest: "France", type: "Tourist", label: "Schengen Visa for France" },
    { dest: "United States", type: "Tourist", label: "US B1/B2 Tourist Visa" },
    { dest: "Dubai", type: "Tourist", label: "Dubai Express Visa from India" },
  ];

  const glossaryTerms = [
    { term: "SOP (Statement of Purpose)", def: "A critical essay stating your purpose of study, required for student visas in UK, Canada, and Australia." },
    { term: "CAS Letter", def: "Confirmation of Acceptance for Studies. A mandatory electronic document for UK Student Visa applications." },
    { term: "I-20 Form", def: "Certificate of Eligibility for Nonimmigrant Student Status, issued by US universities for F1 Visa interviews." },
    { term: "GIC (Guaranteed Investment Certificate)", def: "A mandatory investment of $10,000+ CAD for Indian students applying to Canada under SDS stream." },
    { term: "Schengen Area", def: "A zone of 27 European countries with no internal borders. A single visa allows travel across all member states." },
    { term: "Biometrics", def: "Fingerprinting and digital photo process conducted at VACs (Visa Application Centers) like VFS or BLS." }
  ];

  return (
    <section className="w-full bg-slate-100 dark:bg-slate-950/50 border-t border-slate-200 dark:border-slate-800 py-16 mt-16">
      
      {/* City Branches Modal */}
      {selectedCity && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-white/20 dark:border-slate-700 overflow-hidden relative flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300 ring-1 ring-white/10">
              
              {/* Premium Header */}
              <div className="relative h-40 bg-slate-950 flex items-center justify-center overflow-hidden flex-shrink-0">
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900 to-indigo-950 opacity-100"></div>
                 <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                 <div className="absolute -top-10 -left-10 w-48 h-48 bg-violet-600 rounded-full blur-[80px] opacity-30"></div>
                 <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-500 rounded-full blur-[80px] opacity-20"></div>

                 <div className="relative z-20 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full backdrop-blur-md border border-white/10 mb-2">
                        <MapPinIcon className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-widest">Selected City</span>
                    </div>
                    <h2 className="text-4xl font-black text-white tracking-tight">{selectedCity}</h2>
                 </div>

                 <button 
                   onClick={() => setSelectedCity(null)}
                   className="absolute top-5 right-5 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-md border border-white/10 hover:rotate-90 duration-300 z-30 shadow-lg"
                 >
                   <XIcon className="w-5 h-5" />
                 </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50 dark:bg-slate-900">
                  <p className="text-center text-slate-500 dark:text-slate-400 text-sm font-medium mb-6">
                     We found {cityBranches.length} premium branch{cityBranches.length !== 1 ? 'es' : ''} in {selectedCity} ready to assist you.
                  </p>

                  <div className="space-y-6">
                     {cityBranches.map((branch) => (
                        <div key={branch.identifier} className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 group">
                           
                           {/* Header with Name, Rating & Directions */}
                           <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5">
                              <div>
                                 <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                                    {branch.name}
                                 </h3>
                                 <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                                    <span className="flex items-center gap-1 px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-700 dark:text-emerald-400">
                                        <ShieldIcon className="w-3 h-3" /> Verified
                                    </span>
                                    {branch.googleReviews && (
                                      <a 
                                        href={branch.hasMap}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-1.5 px-2 py-1 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-700 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
                                      >
                                        <StarIcon className="w-3 h-3 fill-amber-500 text-amber-500" /> 
                                        <span className="font-bold">{branch.googleReviews.rating}</span>
                                        <span className="text-amber-600/70 dark:text-amber-500/70">({branch.googleReviews.reviewCount.toLocaleString()} reviews)</span>
                                      </a>
                                    )}
                                 </div>
                              </div>
                              <a 
                                href={branch.hasMap}
                                target="_blank"
                                rel="noreferrer"
                                className="px-4 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20"
                              >
                                 <NavigationIcon className="w-3.5 h-3.5" /> Get Directions
                              </a>
                           </div>

                           {/* Address */}
                           <div className="mb-5 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                                  <Building className="w-3 h-3" /> Full Address
                               </p>
                               <p className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                                   {branch.address.streetAddress}
                               </p>
                           </div>

                           {/* Comprehensive Timings */}
                           <div className="mb-5 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-2xl border border-blue-100 dark:border-blue-900/50">
                               <p className="text-[10px] font-bold text-blue-500 dark:text-blue-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                  <CalendarIcon className="w-3 h-3" /> Branch Timings
                               </p>
                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                  {branch.timings?.coachingCounseling && (
                                    <div className="flex items-center gap-2 text-xs">
                                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                                      <span className="text-slate-500 dark:text-slate-400">Coaching:</span>
                                      <span className="font-semibold text-slate-700 dark:text-slate-300">{branch.timings.coachingCounseling}</span>
                                    </div>
                                  )}
                                  {branch.timings?.visaCounseling && (
                                    <div className="flex items-center gap-2 text-xs">
                                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                                      <span className="text-slate-500 dark:text-slate-400">Visa:</span>
                                      <span className="font-semibold text-slate-700 dark:text-slate-300">{branch.timings.visaCounseling}</span>
                                    </div>
                                  )}
                                  {branch.timings?.demoClass && (
                                    <div className="flex items-center gap-2 text-xs">
                                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                                      <span className="text-slate-500 dark:text-slate-400">Demo:</span>
                                      <span className="font-semibold text-slate-700 dark:text-slate-300">{branch.timings.demoClass}</span>
                                    </div>
                                  )}
                                  {branch.timings?.general && (
                                    <div className="flex items-center gap-2 text-xs">
                                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                                      <span className="text-slate-500 dark:text-slate-400">Hours:</span>
                                      <span className="font-semibold text-slate-700 dark:text-slate-300">{branch.timings.general}</span>
                                    </div>
                                  )}
                                  {branch.timings?.workingDays && (
                                    <div className="flex items-center gap-2 text-xs">
                                      <CalendarIcon className="w-3.5 h-3.5 text-emerald-500" />
                                      <span className="text-slate-500 dark:text-slate-400">Working:</span>
                                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">{branch.timings.workingDays}</span>
                                    </div>
                                  )}
                                  {branch.timings?.closedOn && (
                                    <div className="flex items-center gap-2 text-xs">
                                      <XIcon className="w-3.5 h-3.5 text-red-500" />
                                      <span className="text-slate-500 dark:text-slate-400">Closed:</span>
                                      <span className="font-semibold text-red-500">{branch.timings.closedOn}</span>
                                    </div>
                                  )}
                               </div>
                           </div>

                           {/* Real Google Reviews Slider */}
                           {branch.googleReviews?.reviews && branch.googleReviews.reviews.length > 0 && (
                             <div className="mb-5">
                               <ReviewSlider reviews={branch.googleReviews.reviews} />
                             </div>
                           )}

                           {/* Contact Points - Department Wise */}
                           <div className="mb-5">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                 <PhoneIcon className="w-3 h-3" /> Contact Numbers (Department-Wise)
                              </p>
                              <div className="space-y-2">
                                 {branch.contactPoint.map((contact, cIdx) => (
                                     <div key={cIdx} className="flex flex-col sm:flex-row items-center justify-between p-1.5 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-slate-100 dark:border-slate-800">
                                         <div className="px-4 py-2.5 w-full sm:w-auto text-center sm:text-left">
                                            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{contact.contactType}</p>
                                            <p className="text-sm text-violet-600 dark:text-violet-400 font-mono font-semibold mt-0.5">{contact.telephone}</p>
                                         </div>
                                         <div className="flex w-full sm:w-auto p-1 gap-1.5">
                                            <a href={`tel:${contact.telephone}`} className="flex-1 py-2.5 px-4 bg-white dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700">
                                               <PhoneIcon className="w-3.5 h-3.5" /> Call
                                            </a>
                                            <a href={`${contact.url}?text=${WA_PREFILLED_MSG}`} target="_blank" rel="noreferrer" className="flex-1 py-2.5 px-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white text-xs font-bold hover:from-green-600 hover:to-emerald-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-500/20">
                                               <WhatsAppIcon className="w-3.5 h-3.5" /> WhatsApp
                                            </a>
                                         </div>
                                     </div>
                                 ))}
                              </div>
                           </div>

                           {/* Counselors Section */}
                           {branch.counselors && branch.counselors.filter(c => c.phone || c.email).length > 0 && (
                             <div className="p-4 bg-violet-50 dark:bg-violet-950/30 rounded-2xl border border-violet-100 dark:border-violet-900/50">
                               <p className="text-[10px] font-bold text-violet-500 dark:text-violet-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                 <MailIcon className="w-3 h-3" /> Counselor Contact
                               </p>
                               <div className="grid gap-2">
                                 {branch.counselors.filter(c => c.phone || c.email).map((counselor, idx) => (
                                   <div key={idx} className="flex flex-wrap items-center gap-2 text-xs">
                                     {counselor.phone && (
                                       <a 
                                         href={`tel:+91${counselor.phone.replace(/\s/g, '')}`}
                                         className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-violet-100 dark:hover:bg-violet-900/50 transition-colors border border-violet-200 dark:border-violet-800"
                                       >
                                         <PhoneIcon className="w-3 h-3 text-violet-500" />
                                         <span className="font-mono">{counselor.phone}</span>
                                       </a>
                                     )}
                                     {counselor.email && (
                                       <a 
                                         href={`mailto:${counselor.email}`}
                                         className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-violet-100 dark:hover:bg-violet-900/50 transition-colors border border-violet-200 dark:border-violet-800 truncate max-w-[200px]"
                                       >
                                         <MailIcon className="w-3 h-3 text-violet-500 flex-shrink-0" />
                                         <span className="truncate">{counselor.email}</span>
                                       </a>
                                     )}
                                   </div>
                                 ))}
                               </div>
                             </div>
                           )}

                        </div>
                     ))}
                  </div>
              </div>
           </div>
        </div>
      )}

      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpenIcon className="w-4 h-4" />
            <span>EEC Travel Knowledge Vault {currentYear}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
            Comprehensive Visa & Immigration Resource Center
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
            Access verified guides for Indian citizens. Powered by Enbee Education Center's 27 years of consular expertise. 
            Navigating the complexities of international travel and study abroad documentation from Gujarat to the World.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Column 1: Programmatic Routes (Internal Linking for Crawlers) */}
          <div className="md:col-span-4 space-y-8">
             <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                   <CompassIcon className="w-5 h-5 text-violet-600" />
                   <span>Popular Visa Corridors</span>
                </h3>
                <ul className="space-y-3">
                   {popularRoutes.map((route, i) => (
                      <li key={i}>
                         <a 
                           href={`#/destination/${encodeURIComponent(route.dest)}/type/${encodeURIComponent(route.type)}/state/Gujarat`}
                           className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 font-medium group transition-colors"
                         >
                            <span>{route.label}</span>
                            <ArrowRightIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity transform -rotate-45" />
                         </a>
                      </li>
                   ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <a href="https://www.eecglobal.com" target="_blank" rel="noreferrer" className="text-xs font-bold text-violet-600 uppercase tracking-wide flex items-center gap-1 hover:underline">
                        View All Destinations <ArrowRightIcon className="w-3 h-3" />
                    </a>
                </div>
             </div>

             {/* Local SEO Block */}
             <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                   <MapIcon className="w-5 h-5 text-emerald-600" />
                   <span>Gujarat Student Corridor</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-500 mb-4 leading-relaxed">
                   EEC specializes in student visa counseling for residents of Gujarat. We provide local biometric support and documentation services in:
                </p>
                <div className="flex flex-wrap gap-2">
                   {availableCities.map((city, i) => (
                      <button 
                        key={i} 
                        onClick={() => setSelectedCity(city)}
                        className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 hover:bg-violet-600 hover:text-white dark:hover:bg-violet-600 dark:hover:text-white transition-colors cursor-pointer"
                      >
                         {city}
                      </button>
                   ))}
                </div>
                <p className="text-[10px] text-slate-400 mt-3 italic text-center">
                  * Click a city to view local branch details
                </p>
             </div>
          </div>

          {/* Column 2: Glossary (NLP & Voice Search Optimization) */}
          <div className="md:col-span-8 space-y-8">
             
             {/* Glossary Section */}
             <div className="space-y-4">
                <h3 className="font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
                   <ScrollTextIcon className="w-6 h-6 text-amber-500" />
                   <span>Immigration Terminology (Glossary)</span>
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                   {glossaryTerms.map((item, i) => (
                      <div key={i} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-200 dark:hover:border-amber-900/50 transition-colors">
                         <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1">{item.term}</h4>
                         <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            {item.def}
                         </p>
                      </div>
                   ))}
                </div>
             </div>

             {/* Expertise Signals (E-E-A-T) */}
             <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 rounded-2xl p-8 text-white dark:text-slate-900 relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                   <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                         <LandmarkIcon className="w-5 h-5" />
                         Why EEC is the Authority on Visas
                      </h3>
                      <p className="text-sm opacity-90 leading-relaxed mb-4">
                         Since 1997, Enbee Education Center has processed over 50,000+ visas. Our "Forensic Documentation" approach reduces rejection risks by pre-emptively addressing common INA 214(b) (USA) and GTE/GS (Australia) refusal grounds.
                      </p>
                      <div className="flex gap-4">
                         <div className="flex flex-col">
                            <span className="text-2xl font-black">98%</span>
                            <span className="text-[10px] uppercase tracking-wider opacity-75">Success Rate</span>
                         </div>
                         <div className="flex flex-col">
                            <span className="text-2xl font-black">26</span>
                            <span className="text-[10px] uppercase tracking-wider opacity-75">Branches</span>
                         </div>
                         <div className="flex flex-col">
                            <span className="text-2xl font-black">27+</span>
                            <span className="text-[10px] uppercase tracking-wider opacity-75">Years</span>
                         </div>
                      </div>
                   </div>
                   <div className="w-full md:w-1/3 p-4 bg-white/10 dark:bg-black/5 rounded-xl backdrop-blur-sm border border-white/10 dark:border-black/5">
                      <h4 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                         <ShieldIcon className="w-3 h-3" />
                         Accreditations
                      </h4>
                      <ul className="space-y-2 text-xs font-medium opacity-80">
                         <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> AIRC Certified
                         </li>
                         <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> ICEF Agency Status
                         </li>
                         <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> British Council Trained
                         </li>
                         <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> CCEA (Canada) Grads
                         </li>
                      </ul>
                   </div>
                </div>
             </div>

          </div>
        </div>

        {/* Semantic Footer Keywords (Invisible to Eye, Visible to Bots) */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
           <p className="text-[10px] text-slate-400 dark:text-slate-600 text-center leading-loose">
              <strong>Relevant Keywords:</strong> Student Visa Consultants Vadodara, Study in USA, UK Student Visa fees {currentYear}, Canada SDS Colleges list, German Blocked Account amount, 
              Australia GTE requirements, US Visa Interview questions, Schengen Visa appointment availability India, 
              Foreign Exchange Rates Vadodara, Flight tickets to Toronto, IELTS Coaching Gujarat, TOEFL classes Ahmedabad.
           </p>
        </div>

      </div>
    </section>
  );
};
