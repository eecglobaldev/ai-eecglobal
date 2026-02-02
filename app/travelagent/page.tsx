import { Metadata } from 'next';
import TravelAgentWrapper from './TravelAgentWrapper';
import BreadcrumbSchema from '@/features/shared/components/BreadcrumbSchema';
import SoftwareApplicationSchema from '@/features/shared/components/SoftwareApplicationSchema';

export const metadata: Metadata = {
  title: 'AI-Powered EEC Visa & Travel Services | Free Visa Requirements Checker',
  description: 'First of its kind, 100% free tool for Indian students. Get verified Tourist & Student visa requirements, forensic risk analysis, and flight searches for USA, Canada, UK, Australia, Europe & more.',
  keywords: [
    'visa requirements',
    'student visa',
    'tourist visa',
    'visa checker',
    'India visa',
    'USA visa',
    'UK visa',
    'Canada visa',
    'Australia visa',
    'visa application',
    'visa documents',
    'visa processing',
    'EEC travel',
    'visa services'
  ],
  openGraph: {
    type: 'website',
    url: 'https://ai.eecglobal.com/travelagent/',
    title: 'AI-Powered EEC Visa & Travel Services',
    description: 'Get verified visa requirements and travel services for Indian students. 100% free tool.',
    siteName: 'EEC AI Tools',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI-Powered EEC Visa & Travel Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI-Powered EEC Visa & Travel Services',
    description: 'Get verified visa requirements and travel services for Indian students. 100% free.',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  alternates: {
    canonical: 'https://ai.eecglobal.com/travelagent/',
  },
};

export default function TravelAgentPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://ai.eecglobal.com/' },
          { name: 'Visa & Travel Agent' }
        ]}
      />
      <SoftwareApplicationSchema
        name="AI Visa & Travel Requirements Checker"
        description="Free AI-powered visa requirements checker for Indian students. Get verified tourist and student visa requirements, forensic risk analysis, and flight searches for USA, Canada, UK, Australia, and more."
        url="https://ai.eecglobal.com/travelagent/"
        applicationCategory="BusinessApplication"
        aggregateRating={{
          ratingValue: "4.5",
          reviewCount: "267"
        }}
        featureList={[
          "Visa Requirements Checker",
          "Document Checklist",
          "Forensic Risk Analysis",
          "Flight Search",
          "Travel Services",
          "Country-specific Guidance"
        ]}
        screenshot="https://ai.eecglobal.com/assets/screenshots/travel-agent.png"
      />
      <TravelAgentWrapper />
    </>
  );
}
