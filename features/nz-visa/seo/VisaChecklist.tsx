/**
 * ============================================================================
 * INTERACTIVE VISA CHECKLIST - ULTRA NEO-MODERN EDITION
 * ============================================================================
 * 
 * An interactive checklist featuring:
 * - Holographic glass cards with dynamic light effects
 * - Fluid progress tracking with particle effects
 * - 3D-style toggle interactions
 * - Ambient gradient backgrounds
 * - Premium micro-interactions
 * 
 * ============================================================================
 */

import React, { useState } from 'react';
import {
  CheckCircle2,
  FileText,
  DollarSign,
  GraduationCap,
  Plane,
  Shield,
  Heart,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Target,
  Lightbulb,
  Printer,
  RotateCcw,
  MessageCircle,
  TrendingUp,
  Calendar,
  Award,
  ArrowRight,
  CheckCheck,
  Zap,
  MousePointer2
} from 'lucide-react';

// =============================================================================
// CHECKLIST DATA
// =============================================================================

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  required: boolean;
  tips: string[];
  timeline?: string;
}

interface ChecklistCategory {
  id: string;
  name: string;
  icon: React.FC<{ className?: string }>;
  gradient: string;
  shadow: string;
  items: ChecklistItem[];
}

const VISA_CHECKLIST: ChecklistCategory[] = [
  {
    id: 'academic',
    name: 'Academic Documents',
    icon: GraduationCap,
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    shadow: 'shadow-violet-500/25',
    items: [
      {
        id: 'offer-letter',
        title: 'Offer of Place from NZ Institution',
        description: 'Unconditional or conditional offer letter from NZQA-approved institution',
        required: true,
        tips: [
          'Must be from an approved institution listed on NZQA',
          'Ensure course dates and fees are clearly mentioned',
          'Keep both digital and printed copies'
        ],
        timeline: '8-12 weeks before visa'
      },
      {
        id: 'academic-transcripts',
        title: 'Academic Transcripts & Certificates',
        description: 'All previous education documents including mark sheets and degree certificates',
        required: true,
        tips: [
          'Get attested copies from issuing university',
          'Include all semesters/years of study',
          'Translate non-English documents'
        ]
      },
      {
        id: 'english-test',
        title: 'English Proficiency Score (IELTS/PTE/TOEFL)',
        description: 'Valid English test score meeting university requirements',
        required: true,
        tips: [
          'Most universities require IELTS 6.0-6.5 or PTE 50-58',
          'Score must be less than 2 years old',
          'Request official score report to be sent to university'
        ],
        timeline: '3-6 months before'
      },
      {
        id: 'sop',
        title: 'Statement of Purpose (SOP)',
        description: 'Personal statement explaining course choice and career goals',
        required: true,
        tips: [
          'Explain why NZ and why this specific course',
          'Demonstrate ties to India and return intent',
          'Be specific about career goals in India'
        ]
      },
      {
        id: 'cv-resume',
        title: 'CV/Resume',
        description: 'Updated resume showing education and work experience',
        required: true,
        tips: [
          'Include all work experience with dates',
          'Mention any gaps with explanation',
          'Keep it concise (2-3 pages max)'
        ]
      }
    ]
  },
  {
    id: 'financial',
    name: 'Financial Documents',
    icon: DollarSign,
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    shadow: 'shadow-emerald-500/25',
    items: [
      {
        id: 'tuition-receipt',
        title: 'Tuition Fee Payment Receipt',
        description: 'Proof of first semester/year tuition fee payment',
        required: true,
        tips: [
          'Most universities require at least first semester fee',
          'Keep bank transfer receipt/wire confirmation',
          'Amount should match offer letter'
        ],
        timeline: 'After accepting offer'
      },
      {
        id: 'fts-evidence',
        title: 'Funds to Support (FTS) Evidence',
        description: 'Proof of NZD $20,000 per year for living expenses',
        required: true,
        tips: [
          'Bank statements showing consistent balance',
          'Scholarship letters if applicable',
          'Education loan sanction letter if using loan'
        ]
      },
      {
        id: 'bank-statements',
        title: '6-Month Bank Statements',
        description: 'Bank statements from sponsor accounts showing fund availability',
        required: true,
        tips: [
          'Must show stable balance, not sudden deposits',
          'Include all sponsor accounts',
          'Get bank certified copies'
        ]
      },
      {
        id: 'ca-certificate',
        title: 'CA Certificate for Source of Funds',
        description: 'Chartered Accountant certificate verifying income and assets',
        required: true,
        tips: [
          'Must be from registered CA with membership number',
          'Should verify 3 years of income',
          'Include property valuations if applicable'
        ]
      },
      {
        id: 'sponsor-docs',
        title: 'Sponsor Declaration & Documents',
        description: 'Sponsor undertaking letter with their income proof',
        required: true,
        tips: [
          'Include relationship proof (if parent, birth certificate)',
          'Sponsor ITR for last 3 years',
          'Employment letter or business proof'
        ]
      },
      {
        id: 'itr',
        title: 'Income Tax Returns (3 Years)',
        description: 'ITR documents of student and sponsors',
        required: true,
        tips: [
          'Include ITR acknowledgments and computation',
          'Ensure income matches bank statements',
          'Higher income = stronger case'
        ]
      }
    ]
  },
  {
    id: 'identity',
    name: 'Identity & Travel Documents',
    icon: Plane,
    gradient: 'from-blue-500 via-sky-500 to-cyan-500',
    shadow: 'shadow-blue-500/25',
    items: [
      {
        id: 'passport',
        title: 'Valid Passport',
        description: 'Passport with at least 6 months validity beyond intended stay',
        required: true,
        tips: [
          'Check validity covers entire course duration + 6 months',
          'Ensure at least 2 blank pages available',
          'Note passport number matches all documents'
        ]
      },
      {
        id: 'photos',
        title: 'Passport-Size Photographs',
        description: 'Recent photographs meeting NZ visa specifications',
        required: true,
        tips: [
          '35mm x 45mm with white background',
          'Taken within last 6 months',
          'Keep digital copy for online application'
        ]
      },
      {
        id: 'birth-certificate',
        title: 'Birth Certificate',
        description: 'Official birth certificate for age verification',
        required: true,
        tips: [
          'Must match name on passport',
          'Get translated if not in English'
        ]
      },
      {
        id: 'travel-history',
        title: 'Previous Travel History Evidence',
        description: 'Copies of previous visas and travel stamps',
        required: false,
        tips: [
          'Good travel history strengthens application',
          'Include any previous NZ/Australia travel',
          'Explain any visa refusals honestly'
        ]
      }
    ]
  },
  {
    id: 'health',
    name: 'Health & Character Documents',
    icon: Heart,
    gradient: 'from-rose-500 via-pink-500 to-red-500',
    shadow: 'shadow-rose-500/25',
    items: [
      {
        id: 'medical-exam',
        title: 'Medical Examination Certificate',
        description: 'Medical exam from INZ-approved panel physician',
        required: true,
        tips: [
          'Must be from approved physician in your city',
          'Includes chest X-ray for TB screening',
          'Book appointment early - can take 2-3 weeks'
        ],
        timeline: 'After visa submission'
      },
      {
        id: 'health-insurance',
        title: 'Health Insurance Policy',
        description: 'Medical insurance covering NZ healthcare costs',
        required: true,
        tips: [
          'Many NZ institutions offer student insurance',
          'Must cover entire study period',
          'Minimum coverage as per INZ requirements'
        ]
      },
      {
        id: 'pcc',
        title: 'Police Clearance Certificate (PCC)',
        description: 'Character certificate from Indian police',
        required: true,
        tips: [
          'Apply at Passport Seva Kendra or regional passport office',
          'Takes 2-4 weeks to process',
          'Required if staying more than 24 months'
        ],
        timeline: '4-6 weeks before visa'
      }
    ]
  },
  {
    id: 'accommodation',
    name: 'Accommodation & Arrival',
    icon: Shield,
    gradient: 'from-amber-500 via-orange-500 to-yellow-500',
    shadow: 'shadow-amber-500/25',
    items: [
      {
        id: 'accommodation-proof',
        title: 'Accommodation Arrangement Proof',
        description: 'Evidence of where you will stay upon arrival',
        required: true,
        tips: [
          'University accommodation confirmation letter',
          'Or rental agreement/booking confirmation',
          'First few weeks arrangement is sufficient'
        ]
      },
      {
        id: 'flight-booking',
        title: 'Flight Itinerary (Optional)',
        description: 'Tentative flight booking showing intended travel date',
        required: false,
        tips: [
          'Do NOT book confirmed tickets before visa approval',
          'Show itinerary matching course start date',
          'Can help demonstrate genuine intent'
        ]
      }
    ]
  }
];

// =============================================================================
// CHECKLIST ITEM COMPONENT
// =============================================================================

interface ChecklistItemProps {
  item: ChecklistItem;
  checked: boolean;
  onToggle: () => void;
  gradient: string;
}

const NeoChecklistItem: React.FC<ChecklistItemProps> = ({ item, checked, onToggle, gradient }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div 
      className={`group relative rounded-xl sm:rounded-[1.5rem] md:rounded-[2rem] transition-all duration-500 ${
        checked 
          ? 'bg-gradient-to-r from-emerald-500/5 to-teal-500/5 dark:from-emerald-500/10 dark:to-teal-500/10 border-transparent' 
          : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'
      }`}
    >
      {/* Dynamic Glow Border for Checked State */}
      {checked && (
        <div className="absolute inset-0 rounded-xl sm:rounded-[1.5rem] md:rounded-[2rem] border border-emerald-500/30 dark:border-emerald-500/50 shadow-[0_0_15px_-3px_rgba(16,185,129,0.15)] dark:shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)] pointer-events-none" />
      )}
      
      <div className="p-3 sm:p-4 md:p-5">
        <div className="flex items-start gap-3 sm:gap-4 md:gap-5">
          {/* Custom Checkbox */}
          <button
            onClick={onToggle}
            className={`relative flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 group/check ${
              checked 
                ? 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30 scale-100' 
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400'
            }`}
          >
            {checked ? (
              <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-white animate-in zoom-in duration-300" />
            ) : (
              <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-slate-300 dark:border-slate-600 group-hover/check:border-slate-400 transition-colors" />
            )}
          </button>
          
          <div className="flex-1 min-w-0 pt-0.5">
            <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-wrap mb-1.5 sm:mb-2">
              <h4 className={`font-bold text-sm sm:text-base md:text-lg transition-all duration-300 break-words ${
                checked 
                  ? 'text-emerald-600 dark:text-emerald-400 line-through decoration-2 decoration-emerald-500/30' 
                  : 'text-slate-900 dark:text-white'
              }`}>
                {item.title}
              </h4>
              
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                {item.required && (
                  <span className={`text-[9px] sm:text-[10px] uppercase font-black px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg ${
                    checked ? 'bg-emerald-100 text-emerald-600 opacity-50' : 'bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400'
                  }`}>
                    Required
                  </span>
                )}

                {item.timeline && (
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 flex items-center gap-1">
                    <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    <span className="whitespace-nowrap">{item.timeline}</span>
                  </span>
                )}
              </div>
            </div>
            
            <p className={`text-xs sm:text-sm transition-colors duration-300 break-words ${checked ? 'text-slate-400 dark:text-slate-600' : 'text-slate-600 dark:text-slate-400'}`}>
              {item.description}
            </p>
          </div>
          
          {/* Expand Button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              expanded 
                ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 rotate-180' 
                : 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400'
            }`}
          >
            <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
        
        {/* Expanded Tips */}
        <div className={`grid transition-all duration-300 ease-in-out ${expanded ? 'grid-rows-[1fr] opacity-100 mt-3 sm:mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="overflow-hidden">
            <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-100 dark:border-amber-500/20">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Lightbulb className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-500 flex-shrink-0" />
                <span className="text-[10px] sm:text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Expert Insights</span>
              </div>
              <ul className="space-y-1.5 sm:space-y-2">
                {item.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="break-words">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// MAIN VISA CHECKLIST COMPONENT
// =============================================================================

export const VisaChecklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(VISA_CHECKLIST.map(c => c.id))
  );

  const toggleItem = (itemId: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const totalItems = VISA_CHECKLIST.flatMap(c => c.items).length;
  const requiredItems = VISA_CHECKLIST.flatMap(c => c.items).filter(i => i.required).length;
  const completedItems = checkedItems.size;
  const progressPercent = Math.round((completedItems / totalItems) * 100);

  // Generate HowTo schema
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": "/nzvisaprep/#visa-checklist",
    "name": "NZ Student Visa Document Checklist 2025 - Complete Guide",
    "description": "Complete checklist of documents required for New Zealand student visa application from India. Includes academic, financial, identity, health, and accommodation documents.",
    "image": "/assets/nzvisaprep-og.png",
    "totalTime": "P4W",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "value": "50000"
    },
    "supply": VISA_CHECKLIST.flatMap(category => 
      category.items.map(item => ({
        "@type": "HowToSupply",
        "name": item.title
      }))
    ),
    "step": VISA_CHECKLIST.flatMap((category, catIdx) => 
      category.items.map((item, itemIdx) => ({
        "@type": "HowToStep",
        "position": catIdx * 10 + itemIdx + 1,
        "name": item.title,
        "text": item.description,
        "itemListElement": item.tips.map((tip, tipIdx) => ({
          "@type": "HowToTip",
          "position": tipIdx + 1,
          "text": tip
        }))
      }))
    )
  };

  return (
    <section 
      className="mt-8 sm:mt-16 py-12 sm:py-16 md:py-24 relative overflow-hidden"
      aria-labelledby="visa-checklist-heading"
      id="visa-checklist"
    >
      {/* Neo-Modern Background */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-[#0B0F19]">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        {/* Animated Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-500/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse delay-700" />
      </div>

      {/* Inject Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        {/* HUD Header */}
        <header className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 text-slate-900 dark:text-white mb-6 sm:mb-8 shadow-lg shadow-indigo-500/10">
            <div className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-indigo-500"></span>
            </div>
            <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase">Smart Document Tracker</span>
          </div>
          
          <h2 
            id="visa-checklist-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-b from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-500"
            data-speakable="true"
          >
            NZ Visa Checklist
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium px-2">
            <strong className="text-violet-600 dark:text-violet-400">{completedItems}/{totalItems}</strong> documents ready.
            Keep tracking to ensure 100% compliance.
          </p>
        </header>

        {/* Floating Progress HUD */}
        <div className="sticky top-2 sm:top-4 md:top-8 z-40 mb-6 sm:mb-8 md:mb-12">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 rounded-xl sm:rounded-[1.5rem] md:rounded-[2rem] blur opacity-30" />
          <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-xl sm:rounded-[1.5rem] md:rounded-[1.8rem] p-4 sm:p-5 md:p-6 border border-white/20 dark:border-slate-700/50 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center flex-shrink-0">
                  <svg 
                    className="w-full h-full transform -rotate-90" 
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Background circle */}
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="transparent"
                      className="text-slate-100 dark:text-slate-800"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray={175.93}
                      strokeDashoffset={175.93 - (175.93 * progressPercent) / 100}
                      className="text-violet-500 transition-all duration-1000 ease-out"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-none">{progressPercent}%</span>
                </div>
                <div className="min-w-0 flex-1 sm:flex-none">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate">Application Readiness</h3>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-medium uppercase tracking-wide mt-0.5 sm:mt-1 truncate">
                    {progressPercent === 100 ? 'Ready to Submit' : 'In Progress'}
                  </p>
                </div>
              </div>

              <div className="flex-1 hidden sm:block w-full sm:w-auto">
                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 transition-all duration-1000 ease-out relative"
                    style={{ width: `${progressPercent}%` }}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite]" />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 w-full sm:w-auto justify-end sm:justify-start">
                <button
                  onClick={() => setCheckedItems(new Set())}
                  className="p-2.5 sm:p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  title="Reset Checklist"
                >
                  <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button
                  onClick={() => window.print()}
                  className="p-2.5 sm:p-3 rounded-xl bg-violet-500 text-white hover:bg-violet-600 transition-colors shadow-lg shadow-violet-500/30"
                  title="Print Checklist"
                >
                  <Printer className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Checklist Categories */}
        <div className="space-y-4 sm:space-y-6">
          {VISA_CHECKLIST.map((category) => {
            const Icon = category.icon;
            const isExpanded = expandedCategories.has(category.id);
            const categoryChecked = category.items.filter(item => checkedItems.has(item.id)).length;
            const total = category.items.length;
            const isComplete = categoryChecked === total;
            
            return (
              <div 
                key={category.id}
                className="group relative"
              >
                {/* Glow Background */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${category.gradient} rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                
                <div className="relative bg-white dark:bg-[#0B0F19] rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-500 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-2xl">
                  {/* Header */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full p-4 sm:p-5 md:p-6 flex items-center justify-between gap-3 sm:gap-4"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 md:gap-5 min-w-0 flex-1">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg ${category.shadow} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
                      </div>
                      
                      <div className="text-left min-w-0 flex-1">
                        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                          <h3 className="text-base sm:text-lg md:text-xl font-black text-slate-900 dark:text-white tracking-tight break-words">{category.name}</h3>
                          {isComplete && (
                            <span className="p-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                              <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5 sm:mt-1">
                          {categoryChecked}/{total} completed
                        </p>
                      </div>
                    </div>

                    <div className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                      isExpanded 
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rotate-180' 
                        : 'text-slate-400'
                    }`}>
                      <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                  </button>

                  {/* Items */}
                  <div className={`transition-all duration-500 ease-in-out ${
                    isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="p-4 sm:p-5 md:p-6 pt-0 space-y-3 sm:space-y-4">
                      {/* Divider */}
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent mb-4 sm:mb-6" />
                      
                      {category.items.map((item) => (
                        <NeoChecklistItem
                          key={item.id}
                          item={item}
                          checked={checkedItems.has(item.id)}
                          onToggle={() => toggleItem(item.id)}
                          gradient={category.gradient}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ultra Premium CTA */}
        <div className="mt-12 sm:mt-16 md:mt-20 relative group cursor-pointer">
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] blur opacity-30 group-hover:opacity-60 transition-all duration-500 animate-pulse" />
          <div className="relative bg-[#0B0F19] rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-10 overflow-hidden border border-white/10">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-violet-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-fuchsia-600/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 text-center md:text-left">
              <div className="w-full md:w-auto">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-white/10 text-white text-[10px] sm:text-xs font-bold mb-3 sm:mb-4 border border-white/10">
                  <Zap className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-yellow-400" />
                  <span>PREMIUM SERVICE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2">Expert Verification</h3>
                <p className="text-sm sm:text-base text-slate-400 max-w-md mx-auto md:mx-0">
                  Get your documents reviewed by ENZRA certified experts before submission.
                </p>
              </div>

              <a
                href="https://wa.me/918758750036"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative inline-flex items-center gap-2 sm:gap-3 bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black tracking-tight text-sm sm:text-base hover:scale-105 transition-transform duration-300 w-full md:w-auto justify-center"
              >
                <span>Get Verified Now</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisaChecklist;
