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
    title: 'AI-Powered EEC Visa & Travel Services',
    description: 'Get verified visa requirements and travel services for Indian students',
    type: 'website',
  },
};

export default function TravelAgentPage() {
  return <TravelAgentApp />;
}

