import { Metadata } from 'next';
import Hero from "@/features/shared/components/Hero";
import Workflow from "@/features/shared/components/Workflow";
import ResourceHub from "@/features/shared/components/ResourceHub";

export const metadata: Metadata = {
  title: 'EEC AI Tools | Free Visa Interview Prep, PR Calculators & Study Abroad AI Agents',
  description: 'EEC AI Tools: The #1 free platform for Indian students. Practice USA F-1 & Australia Genuine Student (GS) visa interviews with AI. Get career counseling, visa prep, and study abroad guidance.',
  keywords: [
    'EEC AI Tools',
    'Visa Interview Prep',
    'USA F1 Visa',
    'Australia GS',
    'Study Abroad',
    'Career Counselor',
    'Visa Prep',
    'PR Calculator',
    'Study Abroad AI'
  ],
  openGraph: {
    title: 'EEC AI Tools | Free Visa Interview Prep & Study Abroad AI Agents',
    description: 'Practice visa interviews with AI, get career counseling, and find the best study abroad options.',
    type: 'website',
  },
};

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Workflow />
      <ResourceHub />
    </div>
  );
}
