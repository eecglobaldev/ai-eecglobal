import { Metadata } from 'next';
import TravelAgentApp from '@/features/travel-agent/components/TravelAgentApp';

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
    url: 'https://ai.eecglobal.com/travel-agent',
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
  alternates: {
    canonical: 'https://ai.eecglobal.com/travel-agent',
  },
};

export default function TravelAgentPage() {
  return <TravelAgentApp />;
}

