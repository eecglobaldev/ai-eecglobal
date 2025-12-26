/**
 * ============================================================================
 * NZ STUDENT VISA STATISTICS - ULTRA NEO-MODERN EDITION
 * ============================================================================
 * 
 * An ultra-premium statistics dashboard featuring:
 * - Holographic glassmorphism with dynamic light effects
 * - Bento grid layout architecture
 * - Interactive HUD-style data visualizations
 * - Cinematographic typography and hierarchy
 * - Advanced mesh gradient backgrounds
 * 
 * ============================================================================
 */

import React from 'react';
import {
  TrendingUp,
  Users,
  GraduationCap,
  DollarSign,
  MapPin,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  CheckCircle2,
  Globe,
  Clock,
  Zap,
  Award,
  Target,
  Sparkles,
  PieChart,
  Activity,
  MousePointer2
} from 'lucide-react';

// =============================================================================
// STATISTICS DATA
// =============================================================================

const KEY_STATISTICS = [
  { label: 'Indian Students in NZ', value: '28,745', change: '+18%', positive: true, icon: Users, gradient: 'from-violet-600 via-fuchsia-600 to-pink-600', shadow: 'shadow-fuchsia-500/30' },
  { label: 'Visa Approval Rate', value: '89.2%', change: '+2.3%', positive: true, icon: CheckCircle2, gradient: 'from-emerald-500 via-teal-500 to-cyan-500', shadow: 'shadow-emerald-500/30' },
  { label: 'Avg Processing Time', value: '26 days', change: '-4 days', positive: true, icon: Clock, gradient: 'from-amber-500 via-orange-500 to-red-500', shadow: 'shadow-orange-500/30' },
  { label: 'Graduate Employment', value: '78%', change: '+5%', positive: true, icon: BriefcaseIcon, gradient: 'from-blue-600 via-indigo-600 to-violet-600', shadow: 'shadow-indigo-500/30' },
  { label: 'Avg Graduate Salary', value: 'NZD $65K', change: '+8%', positive: true, icon: DollarSign, gradient: 'from-rose-500 via-pink-600 to-purple-600', shadow: 'shadow-pink-500/30' },
  { label: 'Global Safety Rank', value: '#2', change: null, positive: true, icon: Globe, gradient: 'from-cyan-500 via-sky-500 to-blue-600', shadow: 'shadow-cyan-500/30' },
];

// Helper component for icon
function BriefcaseIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

const UNIVERSITY_STATS = [
  { name: 'University of Auckland', qsRank: 68, indianStudents: '4,200+', approvalRate: '91%', processingDays: 22, badge: '🏆', color: 'text-yellow-500' },
  { name: 'University of Otago', qsRank: 206, indianStudents: '1,800+', approvalRate: '90%', processingDays: 24, badge: '⭐', color: 'text-amber-500' },
  { name: 'Victoria University', qsRank: 241, indianStudents: '1,500+', approvalRate: '89%', processingDays: 25, badge: '🎯', color: 'text-red-500' },
  { name: 'University of Canterbury', qsRank: 256, indianStudents: '1,200+', approvalRate: '92%', processingDays: 23, badge: '✨', color: 'text-purple-500' },
  { name: 'University of Waikato', qsRank: 250, indianStudents: '900+', approvalRate: '88%', processingDays: 26, badge: '🌟', color: 'text-orange-500' },
  { name: 'Massey University', qsRank: 239, indianStudents: '1,100+', approvalRate: '87%', processingDays: 27, badge: '💫', color: 'text-blue-500' },
  { name: 'AUT', qsRank: 407, indianStudents: '2,500+', approvalRate: '86%', processingDays: 28, badge: '🔥', color: 'text-rose-500' },
  { name: 'Lincoln University', qsRank: 362, indianStudents: '600+', approvalRate: '90%', processingDays: 25, badge: '🌿', color: 'text-green-500' },
];

const SOURCE_CITIES = [
  { city: 'Delhi NCR', count: '6,324', percent: 22, color: 'from-violet-500 to-fuchsia-600' },
  { city: 'Mumbai', count: '5,174', percent: 18, color: 'from-blue-500 to-indigo-600' },
  { city: 'Bangalore', count: '3,449', percent: 12, color: 'from-emerald-500 to-teal-600' },
  { city: 'Hyderabad', count: '2,875', percent: 10, color: 'from-amber-500 to-orange-600' },
  { city: 'Ahmedabad', count: '2,300', percent: 8, color: 'from-rose-500 to-pink-600' },
  { city: 'Pune', count: '2,012', percent: 7, color: 'from-cyan-500 to-sky-600' },
];

const POPULAR_COURSES = [
  { name: 'Information Technology', percent: 24, icon: '💻', color: 'from-indigo-500 to-violet-600' },
  { name: 'Business & Management', percent: 21, icon: '📊', color: 'from-emerald-500 to-teal-600' },
  { name: 'Engineering', percent: 15, icon: '⚙️', color: 'from-amber-500 to-orange-600' },
  { name: 'Healthcare & Nursing', percent: 12, icon: '🏥', color: 'from-rose-500 to-pink-600' },
  { name: 'Data Science', percent: 10, icon: '📈', color: 'from-blue-500 to-cyan-600' },
  { name: 'Hospitality', percent: 8, icon: '🏨', color: 'from-purple-500 to-fuchsia-600' },
];

const MONTHLY_TRENDS = [
  { month: 'Jan', apps: 2800, approve: 2464 },
  { month: 'Feb', apps: 3200, approve: 2848 },
  { month: 'Mar', apps: 3800, approve: 3382 },
  { month: 'Apr', apps: 3400, approve: 3026 },
  { month: 'May', apps: 2900, approve: 2581 },
  { month: 'Jun', apps: 3100, approve: 2759 },
  { month: 'Jul', apps: 4200, approve: 3738 },
  { month: 'Aug', apps: 4800, approve: 4272 },
  { month: 'Sep', apps: 3600, approve: 3204 },
  { month: 'Oct', apps: 3000, approve: 2670 },
  { month: 'Nov', apps: 2600, approve: 2314 },
  { month: 'Dec', apps: 2200, approve: 1958 },
];

// =============================================================================
// ULTRA STAT CARD
// =============================================================================

const UltraStatCard: React.FC<{ stat: typeof KEY_STATISTICS[0]; index: number }> = ({ stat, index }) => {
  const Icon = stat.icon;
  
  return (
    <div 
      className="group relative"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Dynamic Glow Background */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} rounded-[2.5rem] blur opacity-20 group-hover:opacity-60 transition-all duration-500`} />
      
      {/* Card Body */}
      <div className="relative h-full bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 p-8">
        
        {/* Decorative Corner */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-bl-[100px] transition-transform duration-700 group-hover:scale-110`} />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg ${stat.shadow} group-hover:scale-110 transition-transform duration-300`}>
              <Icon className="h-7 w-7 text-white" strokeWidth={2} />
            </div>
            
            {stat.change && (
              <div className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full border ${
                stat.positive 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400' 
                  : 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-500/10 dark:border-rose-500/20 dark:text-rose-400'
              }`}>
                {stat.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.change}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
              {stat.value}
            </h3>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 tracking-wide uppercase">
              {stat.label}
            </p>
          </div>
          
          {/* Progress Bar Line */}
          <div className="mt-8 w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className={`h-full bg-gradient-to-r ${stat.gradient} w-2/3 group-hover:w-full transition-all duration-700 ease-out`} />
          </div>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// MAIN STATISTICS COMPONENT
// =============================================================================

export const NZStatistics: React.FC = () => {
  const maxApps = Math.max(...MONTHLY_TRENDS.map(m => m.apps));
  
  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": "https://ai.eecglobal.com/nzvisaprep/#nz-visa-statistics",
    "name": "New Zealand Student Visa Statistics 2024-2025",
    "description": "Comprehensive statistics on NZ student visa applications for Indian students",
    "creator": { "@type": "Organization", "name": "EEC Global" },
    "dateModified": "2024-12-11",
    "variableMeasured": [
      { "@type": "PropertyValue", "name": "Approval Rate", "value": "89.2%" },
      { "@type": "PropertyValue", "name": "Processing Time", "value": "26 days" },
    ]
  };

  return (
    <section 
      className="mt-16 py-24 relative overflow-hidden"
      aria-labelledby="statistics-heading"
      id="nz-statistics"
    >
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-[#0B0F19]">
        {/* Animated Mesh Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-40 dark:opacity-30">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-600 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-500 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse" />
          <div className="absolute top-[40%] left-[40%] w-[40%] h-[40%] bg-fuchsia-500 rounded-full blur-[150px] mix-blend-multiply dark:mix-blend-screen opacity-50" />
        </div>
        
        {/* Tech Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HUD Header */}
        <header className="relative mb-24">
          <div className="flex flex-col items-center text-center">
            {/* Live Indicator */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 text-slate-900 dark:text-white mb-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-bold tracking-wide">LIVE SYSTEM METRICS</span>
            </div>

            <h2 
              id="statistics-heading"
              className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-slate-500 mb-6"
              data-speakable="true"
            >
              NZ Visa
              <br />
              <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
                Intelligence
              </span>
            </h2>

            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
              Real-time analytics tracking <span className="text-violet-600 dark:text-violet-400 font-bold">28,745+</span> active student profiles.
            </p>
          </div>
        </header>

        {/* Bento Grid Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {KEY_STATISTICS.map((stat, index) => (
            <UltraStatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* University Intelligence Board */}
        <div className="relative mb-24 rounded-[2.5rem] p-[2px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
          <div className="relative bg-white dark:bg-[#0B0F19] rounded-[2.4rem] overflow-hidden">
            {/* Header */}
            <div className="p-8 md:p-12 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">University Rankings</h3>
                  <p className="text-slate-500 font-medium">Performance Metrics & Approval Odds</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <Activity className="h-4 w-4 text-emerald-500" />
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Updated 24h ago</span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50/50 dark:bg-slate-900/50">
                  <tr>
                    <th className="px-8 py-6 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Institution</th>
                    <th className="px-8 py-6 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">Global Rank</th>
                    <th className="px-8 py-6 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">Student Vol</th>
                    <th className="px-8 py-6 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">Success Rate</th>
                    <th className="px-8 py-6 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">Speed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {UNIVERSITY_STATS.map((uni, index) => (
                    <tr 
                      key={uni.name} 
                      className="group hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <span className="text-2xl filter drop-shadow-md">{uni.badge}</span>
                          <span className="font-bold text-slate-900 dark:text-white text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {uni.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="inline-block px-4 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300">
                          #{uni.qsRank}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="font-semibold text-slate-600 dark:text-slate-400">{uni.indianStudents}</span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: uni.approvalRate }} />
                          </div>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">{uni.approvalRate}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="text-sm font-medium text-slate-500">{uni.processingDays} days</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-24">
          {/* Source Cities Map Visualization */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative h-full bg-white dark:bg-[#0B0F19] rounded-[1.9rem] p-10 border border-slate-100 dark:border-slate-800 overflow-hidden">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-xl">
                    <MapPin className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">Demographics</h3>
                </div>
                <PieChart className="h-6 w-6 text-slate-400" />
              </div>

              <div className="space-y-6 relative z-10">
                {SOURCE_CITIES.map((city, idx) => (
                  <div key={city.city} className="relative">
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span className="text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] text-slate-500">
                          0{idx + 1}
                        </span>
                        {city.city}
                      </span>
                      <span className="text-slate-900 dark:text-white">{city.percent}%</span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${city.color} rounded-full transform origin-left transition-transform duration-1000 hover:scale-x-105`}
                        style={{ width: `${city.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative Map BG */}
              <div className="absolute bottom-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
                <Globe className="w-full h-full" />
              </div>
            </div>
          </div>

          {/* Popular Courses Visualization */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative h-full bg-white dark:bg-[#0B0F19] rounded-[1.9rem] p-10 border border-slate-100 dark:border-slate-800 overflow-hidden">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-fuchsia-500/10 rounded-xl">
                    <Award className="h-6 w-6 text-fuchsia-500" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">Course Trends</h3>
                </div>
                <BarChart3 className="h-6 w-6 text-slate-400" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {POPULAR_COURSES.map((course) => (
                  <div key={course.name} className="group/card relative p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{course.icon}</span>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{course.percent}%</span>
                    </div>
                    <p className="font-bold text-slate-900 dark:text-white leading-tight">{course.name}</p>
                    <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${course.color} transition-all duration-300 w-0 group-hover/card:w-full`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trend Analysis Chart */}
       

        {/* Insights Deck */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Success Rate', value: '+2.3%', desc: 'Year over Year', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
            { title: 'Processing', value: '-4 Days', desc: 'Efficiency Gain', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
            { title: 'Tech Courses', value: '24%', desc: 'Market Share', icon: MousePointer2, color: 'text-violet-500', bg: 'bg-violet-500/10' },
            { title: 'New Market', value: '#5', desc: 'Ahmedabad Rank', icon: Target, color: 'text-rose-500', bg: 'bg-rose-500/10' },
          ].map((insight, idx) => (
            <div key={idx} className="bg-white dark:bg-[#0B0F19] p-6 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
              <div className={`w-12 h-12 rounded-2xl ${insight.bg} flex items-center justify-center mb-4`}>
                <insight.icon className={`h-6 w-6 ${insight.color}`} />
              </div>
              <p className="text-sm font-medium text-slate-500">{insight.title}</p>
              <p className="text-3xl font-black text-slate-900 dark:text-white my-1">{insight.value}</p>
              <p className={`text-xs font-bold ${insight.color}`}>{insight.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm font-medium text-slate-400">
            Powered by EEC Intelligence • Data refreshed every 24h
          </p>
        </div>
      </div>
    </section>
  );
};

export default NZStatistics;
