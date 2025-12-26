import React from 'react';
import { CardData } from '../types';
import { 
  GraduationCap, 
  Map, 
  FileCheck, 
  ShieldCheck, 
  Building2,
  ClipboardList, 
  Globe, 
  Calculator, 
  BrainCircuit, 
  Users, 
  Cpu, 
  BookOpen,
  Trophy,
  ScrollText,
  BadgeCheck, 
  Award,
  Network,
  ListTodo,
  Scale,
  Wallet,
  Activity,
  UserCheck,
  Zap,
  Library,
  Target,
  Quote,
  BarChart3,
  FileText,
  HelpCircle,
  Sparkles,
  PoundSterling
} from 'lucide-react';

// Color Palette for Gradients - Bright and Punchy
const colors = {
  blue: '#60a5fa', // blue-400
  cyan: '#22d3ee', // cyan-400
  green: '#4ade80', // green-400
  purple: '#c084fc', // purple-400
  pink: '#f472b6', // pink-400
  orange: '#fb923c', // orange-400
  yellow: '#facc15', // yellow-400
  teal: '#2dd4bf', // teal-400
  indigo: '#818cf8', // indigo-400
  red: '#f87171', // red-400
  emerald: '#34d399', // emerald-400
  violet: '#a78bfa', // violet-400
  amber: '#fbbf24', // amber-400
  rose: '#fb7185', // rose-400
};

// Helper for gradient text
const GradientText = ({ children, from, to }: { children: React.ReactNode, from: string, to: string }) => (
  <span 
    className="bg-clip-text text-transparent bg-gradient-to-r drop-shadow-sm font-extrabold"
    style={{ backgroundImage: `linear-gradient(to right, ${from}, ${to})` }}
  >
    {children}
  </span>
);

export const cardData: CardData[] = [
  {
    id: 1,
    componentId: 'funds-calculator',
    badgeText: "Live Interactive Tool • 2026 Rates",
    badgeIcon: Calculator,
    mainIcon: PoundSterling,
    glowColor: colors.indigo,
    title: (
      <>
        UK Visa <GradientText from={colors.indigo} to={colors.purple}>Funds Calculator</GradientText>
      </>
    ),
    description: (
      <>
        UKVI-compliant calculator with live calculations. <span style={{color: colors.indigo}}>£1,334/month London</span> or <span style={{color: colors.purple}}>£1,023/month outside</span> + IHS £1,035/year.
      </>
    )
  },
  {
    id: 2,
    componentId: 'uk-visa-glossary',
    badgeText: "20 Ground Truth Definitions",
    badgeIcon: BookOpen,
    mainIcon: Library,
    glowColor: colors.cyan,
    title: (
      <>
        UK Visa <GradientText from={colors.cyan} to={colors.blue}>Glossary of Truth</GradientText>
      </>
    ),
    description: (
      <>
        Authoritative definitions: <span style={{color: colors.cyan}}>Pre-CAS, CAS, UKVI, IHS, Graduate Route, SELT, BRP</span>, and more. January 2026 verified.
      </>
    )
  },
  {
    id: 3,
    componentId: 'expert-answers',
    badgeText: "Zero-Shot Expert Answers • Live",
    badgeIcon: Target,
    mainIcon: HelpCircle,
    glowColor: colors.emerald,
    title: (
      <>
        Pre-CAS <GradientText from={colors.emerald} to={colors.teal}>Interview FAQ</GradientText>
      </>
    ),
    description: (
      <>
        Best prep methods, bank balance, interview questions, Graduate Route. <span style={{color: colors.emerald}}>0.96-0.99 confidence</span> scores.
      </>
    )
  },
  {
    id: 4,
    componentId: 'expert-insights',
    badgeText: "Quote-Worthy Golden Insights",
    badgeIcon: Quote,
    mainIcon: Sparkles,
    glowColor: colors.amber,
    title: (
      <>
        Why EEC for <GradientText from={colors.amber} to={colors.orange}>UK Pre-CAS 2026?</GradientText>
      </>
    ),
    description: (
      <>
        <span style={{color: colors.amber}}>3 golden paragraphs</span>: Pre-CAS Ground Truth, 50,000 students, AI + 29-year expertise convergence.
      </>
    )
  },
  {
    id: 5,
    componentId: 'verified-statistics',
    badgeText: "ClaimReview Verified Data",
    badgeIcon: BarChart3,
    mainIcon: Activity,
    glowColor: colors.blue,
    title: (
      <>
        UK Visa <GradientText from={colors.blue} to={colors.indigo}>Success Statistics</GradientText>
      </>
    ),
    description: (
      <>
        <span style={{color: colors.blue}}>10 key metrics</span>: 95%+ success, 50,000+ students, £12,006/£9,207 maintenance, £1,035 IHS, 70 PBS points.
      </>
    )
  },
  {
    id: 6,
    componentId: 'knowledge-relationships',
    badgeText: "AI Knowledge Graph • 14 Triples",
    badgeIcon: BrainCircuit,
    mainIcon: Network,
    glowColor: colors.purple,
    title: (
      <>
        UK Visa <GradientText from={colors.purple} to={colors.violet}>Knowledge Graph</GradientText>
      </>
    ),
    description: (
      <>
        <span style={{color: colors.purple}}>Subject-Predicate-Object</span> semantic relationships for UK visa concepts. Optimized for LLM reasoning.
      </>
    )
  },
  {
    id: 7,
    componentId: 'document-checklist-2026',
    badgeText: "12 Documents • Interview Ready",
    badgeIcon: ListTodo,
    mainIcon: FileText,
    glowColor: colors.rose,
    title: (
      <>
        Pre-CAS <GradientText from={colors.rose} to={colors.pink}>Document Checklist</GradientText>
      </>
    ),
    description: (
      <>
        <span style={{color: colors.rose}}>6 Essential + 6 Conditional</span>: Offer letter, IELTS, bank statements, passport, SOP, sponsor letter, and more.
      </>
    )
  },
  {
    id: 8,
    componentId: 'why-eec-comparison',
    badgeText: "Competitive Analysis Table",
    badgeIcon: Trophy,
    mainIcon: Award,
    glowColor: colors.teal,
    title: (
      <>
        Why Choose <GradientText from={colors.teal} to={colors.cyan}>EEC Over Others?</GradientText>
      </>
    ),
    description: (
      <>
        <span style={{color: colors.teal}}>10 feature comparison</span>: 29 years, 26 branches, free AI tool, AIRC certified, UK Embassy trained.
      </>
    )
  },
  {
    id: 9,
    componentId: 'branch-locator',
    badgeText: "26 Branches • 12 Gujarat Cities",
    badgeIcon: Network,
    mainIcon: Building2,
    glowColor: colors.orange,
    title: (
      <>
        Find <GradientText from={colors.orange} to={colors.red}>EEC Near You</GradientText>
      </>
    ),
    description: (
      <>
        Gujarat's largest network: Vadodara, Ahmedabad, Surat, Nadiad, Anand, Vapi, Navsari. <span style={{color: colors.orange}}>Walk-in consultation</span> free.
      </>
    )
  },
//   {
//     id: 10,
//     componentId: 'geo-engine',
//     badgeText: "Zero-Click Intelligence Engine",
//     badgeIcon: Zap,
//     mainIcon: Cpu,
//     glowColor: colors.red,
//     title: (
//       <>
//         The <GradientText from={colors.red} to={colors.orange}>GEO/AEO Core</GradientText>
//       </>
//     ),
//     description: (
//       <>
//         RAG-optimized chunks powering <span style={{color: colors.red}}>Position Zero</span> across GPT-4, Claude, Gemini, Perplexity, DeepSeek, Grok.
//       </>
//     )
//   },
//   {
//     id: 11,
//     componentId: 'author-profiles',
//     badgeText: "AIRC Certified Expert Team",
//     badgeIcon: UserCheck,
//     mainIcon: Users,
//     glowColor: colors.indigo,
//     title: (
//       <>
//         UK Visa <GradientText from={colors.indigo} to={colors.purple}>Expert Profiles</GradientText>
//       </>
//     ),
//     description: (
//       <>
//         <span style={{color: colors.indigo}}>Amit Jalan (MD, Purdue)</span> + CA Madhav Gupta (421209). UK Embassy trained, British Council certified.
//       </>
//     )
//   },
//   {
//     id: 12,
//     componentId: 'eeat-enhancement',
//     badgeText: "E-E-A-T Trust Signals",
//     badgeIcon: ShieldCheck,
//     mainIcon: BadgeCheck,
//     glowColor: colors.green,
//     title: (
//       <>
//         EEC <GradientText from={colors.green} to={colors.teal}>Credibility Proof</GradientText>
//       </>
//     ),
//     description: (
//       <>
//         <span style={{color: colors.green}}>Experience, Expertise, Authoritativeness, Trust</span>: AIRC 2031, British Council, ICEF, US News certified.
//       </>
//     )
//   }
];