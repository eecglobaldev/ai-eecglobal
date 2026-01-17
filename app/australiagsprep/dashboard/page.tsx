'use client';

import dynamic from 'next/dynamic';

const AustraliaGsDashboard = dynamic(() => import('@/features/australia-gs/dashboard/AustraliaGsDashboard'), { ssr: false });

export default function AustraliaGsDashboardPage() {
  return <AustraliaGsDashboard />;
}


