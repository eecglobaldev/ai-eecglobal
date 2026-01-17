'use client';

import dynamic from 'next/dynamic';

// Dynamically import to prevent SSR/prerendering issues with Firebase
const UkPrecasDashboard = dynamic(() => import('@/features/uk-precas/dashboard/UkPrecasDashboard'), {
  ssr: false,
});

export default function UkPrecasDashboardWrapper() {
  return <UkPrecasDashboard />;
}
