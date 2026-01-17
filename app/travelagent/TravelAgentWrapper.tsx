'use client';

import dynamic from 'next/dynamic';

// Dynamically import to prevent SSR/prerendering issues with Firebase
const TravelAgentApp = dynamic(() => import('@/features/travel-agent/components/TravelAgentApp'), {
  ssr: false,
});

export default function TravelAgentWrapper() {
  return <TravelAgentApp />;
}
