import { Metadata } from 'next';
import Hero from "@/features/shared/components/Hero";
import Workflow from "@/features/shared/components/Workflow";
import ResourceHub from "@/features/shared/components/ResourceHub";

export const metadata: Metadata = {
  title: 'EEC AI Tools | Free Visa Interview Prep, PR Calculators & Study Abroad AI Agents',
  description: 'EEC AI Tools: The #1 free platform for Indian students. Practice USA F-1 & Australia Genuine Student (GS) visa interviews with AI, calculate German GPA & Australia PR points, and access verified 2026 career counseling.',
  keywords: [
    'EEC',
    'EEC Study Abroad',
    'AI Visa Interview Prep',
    'USA F1 Visa Mock Interview AI',
    'Australia Genuine Student Test Practice',
    'German Grade Calculator India',
    'Australia PR Points Calculator 189 190',
    'Study Abroad Career Counseling AI',
    'UK CAS Interview Questions',
    'New Zealand Student Visa Interview Guide',
    'Free Study Abroad Tools'
  ],
  openGraph: {
    type: 'website',
    url: 'https://ai.eecglobal.com/',
    title: 'EEC AI Tools | Master Your Visa Interview & Career Strategy',
    description: 'Stop guessing. Start winning. Use EEC\'s free AI agents to practice strict visa interviews (USA, AU, UK, NZ) and calculate your eligibility instantly.',
    siteName: 'EEC AI Tools',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EEC AI Tools - Master Your Visa Interview & Career Strategy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EEC AI Tools | The AI Advantage for Study Abroad',
    description: 'Don\'t risk rejection. Practice with EEC\'s AI Visa Officer and finding high-ROI courses for 2026. 100% Free.',
    images: ['/twitter-image.png'],
  },
  alternates: {
    canonical: 'https://ai.eecglobal.com/',
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
