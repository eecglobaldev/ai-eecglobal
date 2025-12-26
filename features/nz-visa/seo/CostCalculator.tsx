/**
 * ============================================================================
 * NZ STUDY COST CALCULATOR COMPONENT
 * ============================================================================
 * 
 * Critical for capturing:
 * - "NZ student visa cost calculator" high-intent keywords
 * - "Study in New Zealand cost" search queries
 * - "New Zealand university fees Indian students"
 * - Interactive engagement signals
 * 
 * ============================================================================
 */

import React, { useState, useMemo } from 'react';
import {
  Calculator,
  DollarSign,
  Home,
  Utensils,
  Bus,
  BookOpen,
  Heart,
  Plane,
  PiggyBank,
  TrendingUp,
  Info,
  ChevronDown,
  ChevronUp,
  Download,
  Share2,
  Clock,
  GraduationCap,
  Sparkles,
  RefreshCw,
  Wallet
} from 'lucide-react';

// =============================================================================
// COST DATA
// =============================================================================

interface CourseType {
  id: string;
  name: string;
  tuitionRangeNZD: [number, number];
  duration: string;
}

const COURSE_TYPES: CourseType[] = [
  { id: 'diploma', name: 'Diploma (Level 5-6)', tuitionRangeNZD: [18000, 26000], duration: '1-2 years' },
  { id: 'bachelor', name: 'Bachelor\'s Degree', tuitionRangeNZD: [22000, 35000], duration: '3 years' },
  { id: 'pgd', name: 'Postgraduate Diploma', tuitionRangeNZD: [26000, 38000], duration: '1 year' },
  { id: 'masters', name: 'Master\'s Degree', tuitionRangeNZD: [28000, 45000], duration: '1-2 years' },
  { id: 'phd', name: 'PhD (Domestic Fees)', tuitionRangeNZD: [7000, 9000], duration: '3-4 years' },
];

interface City {
  id: string;
  name: string;
  rentMonthlyNZD: [number, number];
  costOfLivingIndex: number;
}

const CITIES: City[] = [
  { id: 'auckland', name: 'Auckland', rentMonthlyNZD: [200, 350], costOfLivingIndex: 1.15 },
  { id: 'wellington', name: 'Wellington', rentMonthlyNZD: [180, 300], costOfLivingIndex: 1.10 },
  { id: 'christchurch', name: 'Christchurch', rentMonthlyNZD: [150, 250], costOfLivingIndex: 1.0 },
  { id: 'hamilton', name: 'Hamilton', rentMonthlyNZD: [140, 220], costOfLivingIndex: 0.95 },
  { id: 'dunedin', name: 'Dunedin', rentMonthlyNZD: [130, 200], costOfLivingIndex: 0.90 },
  { id: 'palmerston', name: 'Palmerston North', rentMonthlyNZD: [120, 190], costOfLivingIndex: 0.88 },
];

// Living costs (monthly in NZD)
const LIVING_COSTS = {
  food: { min: 300, max: 500 },
  transport: { min: 50, max: 150 },
  utilities: { min: 80, max: 150 },
  phone: { min: 30, max: 60 },
  entertainment: { min: 100, max: 200 },
  insurance: { min: 50, max: 80 },
};

// One-time costs (NZD)
const ONE_TIME_COSTS = {
  visaFee: 375,
  medicalExam: 400,
  flightTicket: { min: 700, max: 1200 },
  initialSetup: { min: 500, max: 1000 },
};

// Exchange rate (approximate)
const NZD_TO_INR = 52;

// =============================================================================
// CALCULATOR COMPONENT
// =============================================================================

export const CostCalculator: React.FC = () => {
  const [courseType, setCourseType] = useState('bachelor');
  const [city, setCity] = useState('auckland');
  const [duration, setDuration] = useState(1);
  const [accommodation, setAccommodation] = useState<'shared' | 'studio' | 'oncampus'>('shared');
  const [showBreakdown, setShowBreakdown] = useState(false);

  const selectedCourse = COURSE_TYPES.find(c => c.id === courseType)!;
  const selectedCity = CITIES.find(c => c.id === city)!;

  const calculations = useMemo(() => {
    // Tuition
    const avgTuition = (selectedCourse.tuitionRangeNZD[0] + selectedCourse.tuitionRangeNZD[1]) / 2;
    const totalTuition = avgTuition * duration;

    // Rent (based on accommodation type)
    const rentMultiplier = accommodation === 'shared' ? 1 : accommodation === 'studio' ? 1.6 : 1.3;
    const avgRent = ((selectedCity.rentMonthlyNZD[0] + selectedCity.rentMonthlyNZD[1]) / 2) * rentMultiplier;
    const totalRent = avgRent * 12 * duration;

    // Other living costs (annual)
    const monthlyLiving = 
      (LIVING_COSTS.food.min + LIVING_COSTS.food.max) / 2 +
      (LIVING_COSTS.transport.min + LIVING_COSTS.transport.max) / 2 +
      (LIVING_COSTS.utilities.min + LIVING_COSTS.utilities.max) / 2 +
      (LIVING_COSTS.phone.min + LIVING_COSTS.phone.max) / 2 +
      (LIVING_COSTS.entertainment.min + LIVING_COSTS.entertainment.max) / 2;
    
    const adjustedMonthlyLiving = monthlyLiving * selectedCity.costOfLivingIndex;
    const totalLiving = adjustedMonthlyLiving * 12 * duration;

    // Insurance
    const totalInsurance = ((LIVING_COSTS.insurance.min + LIVING_COSTS.insurance.max) / 2) * 12 * duration;

    // One-time costs
    const oneTimeCosts = 
      ONE_TIME_COSTS.visaFee +
      ONE_TIME_COSTS.medicalExam +
      (ONE_TIME_COSTS.flightTicket.min + ONE_TIME_COSTS.flightTicket.max) / 2 +
      (ONE_TIME_COSTS.initialSetup.min + ONE_TIME_COSTS.initialSetup.max) / 2;

    // Total
    const totalNZD = totalTuition + totalRent + totalLiving + totalInsurance + oneTimeCosts;
    const totalINR = totalNZD * NZD_TO_INR;

    // FTS requirement
    const ftsRequired = 20000 * duration;

    // Potential part-time earnings (20 hrs/week at $22.70/hr avg)
    const weeklyEarnings = 25 * 22.70;
    const annualEarnings = weeklyEarnings * 48; // 48 weeks (accounting for breaks)
    const totalPotentialEarnings = annualEarnings * duration;

    return {
      tuition: { nzd: totalTuition, inr: totalTuition * NZD_TO_INR },
      rent: { nzd: totalRent, inr: totalRent * NZD_TO_INR },
      living: { nzd: totalLiving, inr: totalLiving * NZD_TO_INR },
      insurance: { nzd: totalInsurance, inr: totalInsurance * NZD_TO_INR },
      oneTime: { nzd: oneTimeCosts, inr: oneTimeCosts * NZD_TO_INR },
      total: { nzd: totalNZD, inr: totalINR },
      ftsRequired: { nzd: ftsRequired, inr: ftsRequired * NZD_TO_INR },
      potentialEarnings: { nzd: totalPotentialEarnings, inr: totalPotentialEarnings * NZD_TO_INR },
      netCost: { nzd: totalNZD - totalPotentialEarnings, inr: (totalNZD - totalPotentialEarnings) * NZD_TO_INR },
      monthlyLiving: adjustedMonthlyLiving,
      monthlyRent: avgRent,
    };
  }, [courseType, city, duration, accommodation, selectedCourse, selectedCity]);

  const formatCurrency = (amount: number, currency: 'NZD' | 'INR') => {
    if (currency === 'NZD') {
      return `NZD $${amount.toLocaleString('en-NZ', { maximumFractionDigits: 0 })}`;
    }
    return `₹${(amount / 100000).toFixed(2)} Lakhs`;
  };

  // Generate schema
  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "/nz-visa-prep/#cost-calculator",
    "name": "NZ Student Visa Cost Calculator 2025",
    "description": "Free interactive calculator to estimate total study costs in New Zealand including tuition fees, living expenses, accommodation, and visa costs for Indian students",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "provider": {
      "@type": "Organization",
      "name": "EEC"
    }
  };

  return (
    <section 
      className="mt-15 py-24 lg:py-32 relative overflow-hidden"
      aria-labelledby="calculator-heading"
      id="cost-calculator"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-[#0B1021] -z-20" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2" />

      {/* Inject Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 text-emerald-700 dark:text-emerald-300 mb-8 shadow-lg shadow-emerald-500/10">
            <Calculator className="h-4 w-4" />
            <span className="text-xs font-bold tracking-widest uppercase">Interactive Financial Engine</span>
          </div>
          <h2 
            id="calculator-heading"
            className="text-5xl md:text-6xl font-black tracking-tighter mb-6 text-slate-900 dark:text-white"
            data-speakable="true"
          >
            NZ Study <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500">Cost Calculator</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Estimate your total study investment in New Zealand. 
            Get a personalized breakdown of <strong className="text-emerald-600 dark:text-emerald-400">tuition, living costs, and potential earnings</strong>.
          </p>
        </header>

        {/* TL;DR Summary */}
        <div className="mb-10 p-6 bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">Quick Insight</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                A Master's in Auckland typically costs <strong className="text-emerald-600 dark:text-emerald-400">₹35-45 Lakhs</strong> for 1 year (tuition + living). 
                <br className="hidden sm:block" />
                FTS requirement is <strong className="text-emerald-600 dark:text-emerald-400">NZD 20,000/year</strong> (~₹10.5L). Part-time work can offset <strong className="text-emerald-600 dark:text-emerald-400">30-40%</strong> of living costs.
              </p>
            </div>
          </div>
        </div>

        {/* Calculator Main Interface */}
        <div className="grid lg:grid-cols-12 gap-3 sm:gap-4 md:gap-6 lg:gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4 md:space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-3 sm:p-4 md:p-6 lg:p-8 shadow-2xl relative overflow-hidden">
              {/* Decorative Corner */}
              <div className="absolute top-0 left-0 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-emerald-500/5 rounded-br-[60px] sm:rounded-br-[80px] md:rounded-br-[100px] pointer-events-none" />
              
              <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 relative z-10">
                {/* Course Type */}
                <div className="group">
                  <label className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm font-bold text-slate-900 dark:text-white mb-1.5 sm:mb-2 md:mb-3 uppercase tracking-wider">
                    <GraduationCap className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-emerald-500 flex-shrink-0" />
                    Course Level
                  </label>
                  <div className="relative">
                    <select
                      value={courseType}
                      onChange={(e) => setCourseType(e.target.value)}
                      className="w-full p-2.5 sm:p-3 md:p-4 pl-3 sm:pl-4 md:pl-5 border border-slate-200 dark:border-slate-700 rounded-lg sm:rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs sm:text-sm md:text-base focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none appearance-none transition-all cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/80"
                    >
                      {COURSE_TYPES.map(course => (
                        <option key={course.id} value={course.id}>
                          {course.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-slate-400 pointer-events-none" />
                  </div>
                  <p className="mt-1 sm:mt-1.5 md:mt-2 text-[9px] sm:text-[10px] md:text-xs text-slate-500 font-medium ml-0.5 sm:ml-1">Avg. Duration: {COURSE_TYPES.find(c => c.id === courseType)?.duration}</p>
                </div>

                {/* City */}
                <div className="group">
                  <label className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm font-bold text-slate-900 dark:text-white mb-1.5 sm:mb-2 md:mb-3 uppercase tracking-wider">
                    <Home className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-emerald-500 flex-shrink-0" />
                    Study City
                  </label>
                  <div className="relative">
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-2.5 sm:p-3 md:p-4 pl-3 sm:pl-4 md:pl-5 border border-slate-200 dark:border-slate-700 rounded-lg sm:rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs sm:text-sm md:text-base focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none appearance-none transition-all cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/80"
                    >
                      {CITIES.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Duration Slider */}
                <div className="group">
                  <label className="flex items-center justify-between text-[11px] sm:text-xs md:text-sm font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 md:mb-4 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5 sm:gap-2"><Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-emerald-500 flex-shrink-0" /> Duration</span>
                    <span className="px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-[9px] sm:text-[10px] md:text-xs">
                      {duration} Year{duration > 1 ? 's' : ''}
                    </span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex justify-between text-[8px] sm:text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 sm:mt-2 md:mt-3">
                    <span>1 Year</span>
                    <span>4 Years</span>
                  </div>
                </div>

                {/* Accommodation Toggles */}
                <div className="group">
                  <label className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm font-bold text-slate-900 dark:text-white mb-1.5 sm:mb-2 md:mb-3 uppercase tracking-wider">
                    <Home className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-emerald-500 flex-shrink-0" />
                    Accommodation
                  </label>
                  <div className="grid grid-cols-1 gap-2 sm:gap-2.5 md:gap-3">
                    {[
                      { id: 'shared', label: 'Shared Flat', desc: 'Most affordable option', icon: Utensils },
                      { id: 'oncampus', label: 'On-Campus', desc: 'Convenient & social', icon: BookOpen },
                      { id: 'studio', label: 'Studio Apt', desc: 'Private & premium', icon: Home },
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setAccommodation(opt.id as any)}
                        className={`relative flex items-center p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300 text-left group/opt ${
                          accommodation === opt.id
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                            : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-emerald-200 dark:hover:border-emerald-800'
                        }`}
                      >
                        <div className={`p-1.5 sm:p-2 rounded-lg mr-2.5 sm:mr-3 md:mr-4 flex-shrink-0 ${
                          accommodation === opt.id ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                        }`}>
                          <opt.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-bold text-[11px] sm:text-xs md:text-sm ${accommodation === opt.id ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                            {opt.label}
                          </p>
                          <p className="text-[9px] sm:text-[10px] md:text-xs text-slate-500 dark:text-slate-500 font-medium">{opt.desc}</p>
                        </div>
                        {accommodation === opt.id && (
                          <div className="absolute right-2.5 sm:right-3 md:right-4 w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 dark:bg-black rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-[2.5rem] p-6 sm:p-4 md:p-6 lg:p-8 xl:p-10 shadow-2xl relative overflow-hidden border border-slate-800">
              {/* Background Effects */}
              <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-[400px] lg:h-[400px] bg-emerald-500/10 rounded-full blur-[30px] sm:blur-[40px] md:blur-[60px] lg:blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-[300px] lg:h-[300px] bg-teal-500/10 rounded-full blur-[20px] sm:blur-[30px] md:blur-[45px] lg:blur-[60px]" />
              
              <div className="relative">
                {/* Total Cost Display */}
                <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
                  <p className="text-emerald-400 text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] mb-1 sm:mb-1.5 md:mb-2">Estimated Total Investment</p>
                  <div className="flex items-baseline justify-center gap-0.5 sm:gap-1 mb-1 sm:mb-1.5 md:mb-2">
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-white tracking-tight">
                      {formatCurrency(calculations.total.inr, 'INR').replace(' Lakhs', '')}
                    </span>
                    <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white/60">Lakhs</span>
                  </div>
                  <p className="text-slate-400 font-medium text-xs sm:text-sm md:text-base">
                    ~ {formatCurrency(calculations.total.nzd, 'NZD')}
                  </p>
                </div>

                {/* Bento Grid Stats */}
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                  {[
                    { label: 'Tuition Fees', value: calculations.tuition.inr, icon: GraduationCap, color: 'text-blue-400', bg: 'bg-blue-400/10' },
                    { label: 'Accommodation', value: calculations.rent.inr, icon: Home, color: 'text-purple-400', bg: 'bg-purple-400/10' },
                    { label: 'Living Costs', value: calculations.living.inr, icon: Utensils, color: 'text-orange-400', bg: 'bg-orange-400/10' },
                    { label: 'Visa & One-Time', value: calculations.oneTime.inr, icon: Plane, color: 'text-pink-400', bg: 'bg-pink-400/10' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-2.5 md:p-3 lg:p-4 border border-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 mb-1 sm:mb-1.5 md:mb-2">
                        <div className={`p-1 sm:p-1.5 md:p-2 rounded-lg ${stat.bg} flex-shrink-0`}>
                          <stat.icon className={`h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 ${stat.color}`} />
                        </div>
                        <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-bold text-slate-400 uppercase tracking-wider break-words leading-tight">{stat.label}</span>
                      </div>
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-white pl-0.5 sm:pl-1 break-words">{formatCurrency(stat.value, 'INR')}</p>
                    </div>
                  ))}
                </div>

                {/* Potential Earnings Card */}
                <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 border border-emerald-500/30 mb-4 sm:mb-5 md:mb-6 lg:mb-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTEgMWgydjJIMUMxeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
                  <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 md:gap-4">
                    <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4">
                      <div className="p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-lg sm:rounded-xl bg-emerald-500/20 text-emerald-400 flex-shrink-0">
                        <Wallet className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] sm:text-xs md:text-sm font-bold text-emerald-100 mb-0.5 break-words">Potential Earnings Offset</p>
                        <p className="text-[9px] sm:text-[10px] md:text-xs text-emerald-400/80 break-words">Part-time work (25hrs/week)</p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right w-full sm:w-auto">
                      <p className="text-lg sm:text-xl md:text-2xl font-black text-emerald-400 break-words">-{formatCurrency(calculations.potentialEarnings.inr, 'INR')}</p>
                    </div>
                  </div>
                </div>

                {/* Net Cost */}
                <div className="flex items-center justify-between py-3 sm:py-4 md:py-5 lg:py-6 border-t border-white/10">
                  <p className="text-[11px] sm:text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider">Net Investment</p>
                  <p className="text-xl sm:text-2xl md:text-3xl font-black text-white break-words">{formatCurrency(calculations.netCost.inr, 'INR')}</p>
                </div>

                {/* Toggle Details */}
                <button
                  onClick={() => setShowBreakdown(!showBreakdown)}
                  className="w-full mt-2 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 sm:gap-2"
                >
                  {showBreakdown ? (
                    <>
                      <span className="hidden sm:inline">Hide Detailed Breakdown</span>
                      <span className="sm:hidden">Hide Breakdown</span>
                      <ChevronUp className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                    </>
                  ) : (
                    <>
                      <span className="hidden sm:inline">View Full Breakdown</span>
                      <span className="sm:hidden">View Breakdown</span>
                      <ChevronDown className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {showBreakdown && (
              <div className="mt-3 sm:mt-4 md:mt-6 bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 border border-slate-200 dark:border-slate-800 shadow-xl animate-in fade-in slide-in-from-top-4 duration-500">
                 <div className="overflow-x-auto -mx-3 sm:-mx-4 md:mx-0 px-3 sm:px-4 md:px-0">
                  <table className="w-full text-[11px] sm:text-xs md:text-sm min-w-[400px] sm:min-w-[500px] md:min-w-0">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800">
                        <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-left font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[9px] sm:text-[10px] md:text-xs">Category</th>
                        <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-right font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[9px] sm:text-[10px] md:text-xs">NZD</th>
                        <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-right font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[9px] sm:text-[10px] md:text-xs">INR</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {[
                        { label: 'Tuition Fees', val: calculations.tuition },
                        { label: 'Accommodation', val: calculations.rent },
                        { label: 'Food & Living', val: calculations.living },
                        { label: 'Health Insurance', val: calculations.insurance },
                        { label: 'Visa & One-Time', val: calculations.oneTime },
                      ].map((row, i) => (
                        <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 font-medium text-slate-600 dark:text-slate-400 text-[11px] sm:text-xs md:text-sm">{row.label}</td>
                          <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-right text-slate-900 dark:text-white font-bold text-[11px] sm:text-xs md:text-sm">{formatCurrency(row.val.nzd, 'NZD')}</td>
                          <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-right text-slate-900 dark:text-white font-bold text-[11px] sm:text-xs md:text-sm">{formatCurrency(row.val.inr, 'INR')}</td>
                        </tr>
                      ))}
                      <tr className="bg-emerald-50 dark:bg-emerald-900/20">
                        <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 font-black text-emerald-700 dark:text-emerald-400 text-[11px] sm:text-xs md:text-sm">TOTAL</td>
                        <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-right text-emerald-700 dark:text-emerald-400 font-black text-[11px] sm:text-xs md:text-sm">{formatCurrency(calculations.total.nzd, 'NZD')}</td>
                        <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-right text-emerald-700 dark:text-emerald-400 font-black text-[11px] sm:text-xs md:text-sm">{formatCurrency(calculations.total.inr, 'INR')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostCalculator;

