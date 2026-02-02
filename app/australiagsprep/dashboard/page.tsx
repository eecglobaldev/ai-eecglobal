'use client';

import dynamic from 'next/dynamic';
import BreadcrumbSchema from '@/features/shared/components/BreadcrumbSchema';

const AustraliaGsDashboard = dynamic(() => import('@/features/australia-gs/dashboard/AustraliaGsDashboard'), { ssr: false });

export default function AustraliaGsDashboardPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://ai.eecglobal.com/' },
          { name: 'Australia GS Prep', url: 'https://ai.eecglobal.com/australiagsprep/' },
          { name: 'Dashboard' }
        ]}
      />
      <AustraliaGsDashboard />
    </>
  );
}


