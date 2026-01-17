'use client';

import dynamic from 'next/dynamic';

const DashboardWrapper = dynamic(() => import('./DashboardWrapper'), { ssr: false });

export default function NzVisaDashboardPage() {
  return <DashboardWrapper />;
}


