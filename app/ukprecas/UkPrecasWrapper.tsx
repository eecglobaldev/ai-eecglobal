'use client';

import dynamic from 'next/dynamic';

// Dynamically import to prevent SSR/prerendering issues with Firebase
const UkPrecasApp = dynamic(() => import('@/features/uk-precas/components/UkPrecasApp'), {
  ssr: false,
});

export default function UkPrecasWrapper() {
  return <UkPrecasApp />;
}
