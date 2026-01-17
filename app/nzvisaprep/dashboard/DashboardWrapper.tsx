'use client';

import dynamic from 'next/dynamic';

// Dynamically import to prevent SSR/prerendering issues with Firebase
const NzVisaDashboard = dynamic(() => import('@/features/nz-visa/dashboard/NzVisaDashboard'), {
  ssr: false,
});

export default function DashboardWrapper() {
  return <NzVisaDashboard />;
}
