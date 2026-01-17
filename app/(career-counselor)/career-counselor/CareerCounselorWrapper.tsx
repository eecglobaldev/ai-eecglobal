'use client';

import dynamic from 'next/dynamic';

// Dynamically import to prevent SSR/prerendering issues with Firebase
const CareerCounselorApp = dynamic(() => import('@/features/career-counselor/components/CareerCounselorApp'), {
  ssr: false,
});

export default function CareerCounselorWrapper() {
  return <CareerCounselorApp />;
}
