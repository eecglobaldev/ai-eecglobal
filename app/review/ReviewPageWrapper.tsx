'use client';

import dynamic from 'next/dynamic';

// Dynamically import to prevent SSR/prerendering issues with Firebase
const ReviewPageClient = dynamic(() => import('./ReviewPageClient'), {
  ssr: false,
});

export default function ReviewPageWrapper() {
  return <ReviewPageClient />;
}
