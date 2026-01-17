'use client';

import dynamic from 'next/dynamic';

// Dynamically import to prevent SSR/prerendering issues with Firebase
const NzVisaApp = dynamic(() => import('@/features/nz-visa/components/NzVisaApp'), {
  ssr: false,
});

export default function NzVisaPrepWrapper() {
  return <NzVisaApp />;
}
