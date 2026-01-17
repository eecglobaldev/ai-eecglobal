'use client';

import dynamic from 'next/dynamic';

const UkPrecasDashboardWrapper = dynamic(() => import('./UkPrecasDashboardWrapper'), { ssr: false });

export default function UkPrecasDashboardPage() {
  return <UkPrecasDashboardWrapper />;
}


