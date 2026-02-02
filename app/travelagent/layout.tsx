import type { Metadata } from 'next';
import TravelAgentHeader from '@/features/travel-agent/components/TravelAgentHeader';

export const metadata: Metadata = {
  title: 'Travel & Visa | EEC',
  description: 'Visa requirements, student and tourist visa guides, and travel services by EEC.',
  other: {},
};

export default function TravelAgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TravelAgentHeader />
      {children}
    </>
  );
}
