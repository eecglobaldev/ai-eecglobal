'use client';

import dynamic from 'next/dynamic';

// Dynamically import to prevent SSR/prerendering issues with Firebase
const UsaVisaDashboard = dynamic(() => import('@/features/usa-visa/dashboard/UsaVisaDashboard'), {
  ssr: false,
});

export default function UsaVisaDashboardWrapper() {
  return <UsaVisaDashboard />;
}
