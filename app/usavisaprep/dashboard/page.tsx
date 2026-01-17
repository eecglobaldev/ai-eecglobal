'use client';

import dynamic from 'next/dynamic';

const UsaVisaDashboardWrapper = dynamic(() => import('./UsaVisaDashboardWrapper'), { ssr: false });

export default function UsaVisaDashboardPage() {
  return <UsaVisaDashboardWrapper />;
}


