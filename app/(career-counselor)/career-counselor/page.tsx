import { Metadata } from 'next';
import CareerCounselorApp from '@/features/career-counselor/components/CareerCounselorApp';

export const metadata: Metadata = {
  title: 'AI-Powered Study Abroad Course Counselor | EEC Global',
  description: 'Get instant career insights for any course worldwide. Explore job prospects, salaries, top companies & universities. Free AI-powered course counseling.',
  keywords: ['study abroad', 'course counselor', 'career guidance', 'university selection', 'job prospects', 'study abroad counseling', 'AI counselor'],
  openGraph: {
    type: 'website',
    url: 'https://ai.eecglobal.com/career-counselor',
    title: 'AI-Powered Study Abroad Course Counselor | EEC Global',
    description: 'Get instant career insights for any course worldwide. Explore job prospects, salaries, top companies & universities.',
    siteName: 'EEC AI Tools',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI-Powered Study Abroad Course Counselor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI-Powered Study Abroad Course Counselor | EEC Global',
    description: 'Get instant career insights for any course worldwide. Free AI-powered course counseling.',
    images: ['/twitter-image.png'],
  },
  alternates: {
    canonical: 'https://ai.eecglobal.com/career-counselor',
  },
};

export default function CareerCounselorPage() {
  return <CareerCounselorApp />;
}

