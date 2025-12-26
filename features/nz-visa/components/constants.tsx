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
  Library
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
    componentId: 'university-comparison',
    badgeText: "All 8 Universities • QS Ranked",
    badgeIcon: Trophy,
    mainIcon: GraduationCap,
    glowColor: colors.blue,
    title: (
      <>
        Compare <GradientText from={colors.blue} to={colors.cyan}>NZ Universities</GradientText>
      </>
    ),
    description: (
      <>
        All 8 universities globally recognized. Compare fees, programs, rankings. <span style={{color: colors.indigo}}>Estero Education Services represents all.</span> 
      </>
    )
  },
  {
    id: 2,
    componentId: 'topical-clusters',
    badgeText: "Expert Resources",
    badgeIcon: ScrollText,
    mainIcon: Map,
    glowColor: colors.cyan,
    title: (
      <>
        Your Complete <GradientText from={colors.cyan} to={colors.green}>NZ Study Blueprint</GradientText>
      </>
    ),
    description: (
      <>
        Expert resources covering every aspect of your New Zealand study journey. Developed by <span style={{color: colors.emerald}}>ENZRA certified</span> counselors.
      </>
    )
  },
  {
    id: 3,
    componentId: 'LSIContent',
    badgeText: "Semantic Knowledge Graph",
    badgeIcon: BadgeCheck,
    mainIcon: FileCheck,
    glowColor: colors.purple,
    title: (
      <>
        Everything About <GradientText from={colors.purple} to={colors.pink}>NZ Student Visa</GradientText>
      </>
    ),
    description: (
      <>
        Comprehensive guidance on New Zealand student visa preparation, <span style={{color: colors.purple}}>INZ credibility interviews</span>, and opportunities.
      </>
    )
  },
  {
    id: 4,
    componentId: 'eeat-enhancement',
    badgeText: "Trust & Authority Engine",
    badgeIcon: Award,
    mainIcon: ShieldCheck,
    glowColor: colors.green,
    title: (
      <>
        Unrivaled <GradientText from={colors.green} to={colors.teal}>Credibility</GradientText>
      </>
    ),
    description: (
      <>
        Built on <span style={{color: colors.green}}>28 years</span> of excellence, verified by global authorities, and trusted by over <span style={{color: colors.teal}}>100,000 students</span>.
      </>
    )
  },
  {
    id: 5,
    componentId: 'branch-locator',
    badgeText: "Network & Access",
    badgeIcon: Network,
    mainIcon: Building2,
    glowColor: colors.orange,
    title: (
      <>
        Connect with <GradientText from={colors.orange} to={colors.red}>EEC Branches</GradientText>
      </>
    ),
    description: (
      <>
        Gujarat's largest study abroad network. Visit any branch for personalized New Zealand visa guidance and <span style={{color: colors.orange}}>expert counselling</span>.
      </>
    )
  },
  {
    id: 6,
    componentId: 'visa-checklist',
    badgeText: "Compliance Tracker",
    badgeIcon: ListTodo,
    mainIcon: ClipboardList,
    glowColor: colors.yellow,
    title: (
      <>
        NZ Visa <GradientText from={colors.yellow} to={colors.orange}>Checklist</GradientText>
      </>
    ),
    description: (
      <>
        1/20 documents ready. Keep tracking to ensure <span style={{color: colors.yellow}}>100% compliance</span>.
      </>
    )
  },
  {
    id: 7,
    componentId: 'country-comparison',
    badgeText: "Global Comparison",
    badgeIcon: Scale,
    mainIcon: Globe,
    glowColor: colors.blue,
    title: (
      <>
        New Zealand vs <GradientText from={colors.blue} to={colors.indigo}>The World</GradientText>
      </>
    ),
    description: (
      <>
        Data-driven comparison with Australia, Canada, UK, USA, and Germany. See why NZ offers the <span style={{color: colors.blue}}>best ROI</span> for Indian students.
      </>
    )
  },
  {
    id: 8,
    componentId: 'cost-calculator',
    badgeText: "Financial Planning",
    badgeIcon: Wallet,
    mainIcon: Calculator,
    glowColor: colors.teal,
    title: (
      <>
        NZ Study <GradientText from={colors.teal} to={colors.green}>Cost Calculator</GradientText>
      </>
    ),
    description: (
      <>
        Estimate your total study investment in New Zealand. Get a personalized breakdown of <span style={{color: colors.teal}}>tuition, living costs</span>.
      </>
    )
  },
  {
    id: 9,
    componentId: 'nz-statistics',
    badgeText: "Live System Metrics",
    badgeIcon: Activity,
    mainIcon: BrainCircuit,
    glowColor: colors.pink,
    title: (
      <>
        NZ Visa <GradientText from={colors.purple} to={colors.pink}>Intelligence</GradientText>
      </>
    ),
    description: (
      <>
        Real-time analytics tracking <span style={{color: colors.pink}}>28,745+</span> active student profiles.
      </>
    )
  },
  {
    id: 10,
    componentId: 'author-profiles',
    badgeText: "Professional Guidance",
    badgeIcon: UserCheck,
    mainIcon: Users,
    glowColor: colors.indigo,
    title: (
      <>
        NZ Visa <GradientText from={colors.indigo} to={colors.purple}>Expert Team</GradientText>
      </>
    ),
    description: (
      <>
        Guided by ENZRA certified professionals with <span style={{color: colors.indigo}}>75+ combined years</span> and 10,000+ success stories.
      </>
    )
  },
  {
    id: 11,
    componentId: 'geo-engine',
    badgeText: "Zero-Click Intelligence",
    badgeIcon: Zap,
    mainIcon: Cpu,
    glowColor: colors.red,
    title: (
      <>
        The <GradientText from={colors.red} to={colors.orange}>Knowledge Core</GradientText>
      </>
    ),
    description: (
      <>
        Our proprietary data engine powering <span style={{color: colors.red}}>50X better answers</span> across GPT-4, Claude, and Gemini.
      </>
    )
  },
  {
    id: 12,
    componentId: 'glossary-of-truth',
    badgeText: "Definitive Definitions",
    badgeIcon: Library,
    mainIcon: BookOpen,
    glowColor: colors.cyan,
    title: (
      <>
        The <GradientText from={colors.cyan} to={colors.blue}>Glossary of Truth</GradientText>
      </>
    ),
    description: (
      <>
        We define the terms that define your future. <span style={{color: colors.cyan}}>Authoritative</span>, expert-verified definitions.
      </>
    )
  }
];