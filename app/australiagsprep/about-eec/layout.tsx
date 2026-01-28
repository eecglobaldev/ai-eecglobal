import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About EEC - Australia GS Prep | EEC',
  description: 'Learn about EEC, Gujarat\'s largest study abroad company since 1997. Meet our expert team specializing in Australian student visas, read success stories, and find our 26 branches across Gujarat.',
  keywords: [
    'EEC Australia',
    'study abroad consultants Gujarat',
    'Australian visa experts',
    'EEC branches',
    'EEC team',
    'student visa success stories',
    'EEC Global',
  ],
  authors: [{ name: 'EEC (Enbee Education Center Private Limited)' }],
  openGraph: {
    type: 'website',
    url: 'https://ai.eecglobal.com/australiagsprep/about-eec',
    title: 'About EEC - Australia GS Prep | EEC',
    description: 'Learn about EEC, Gujarat\'s largest study abroad company since 1997. Meet our expert team specializing in Australian student visas.',
    siteName: 'EEC Australia GS Prep',
    locale: 'en_IN',
    images: [
      {
        url: '/assets/logos/eeclogo-main.png',
        width: 1200,
        height: 630,
        alt: 'EEC Australia GS Prep About',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About EEC - Australia GS Prep | EEC',
    description: 'Learn about EEC, Gujarat\'s largest study abroad company since 1997. Meet our expert team specializing in Australian student visas.',
    images: ['/assets/logos/eeclogo-main.png'],
  },
  alternates: {
    canonical: 'https://ai.eecglobal.com/australiagsprep/about-eec',
    languages: {
      'en-IN': 'https://ai.eecglobal.com/australiagsprep/about-eec',
    },
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  other: {
    'og:type': 'profile',
    'profile:first_name': 'EEC',
    'profile:last_name': 'Global',
  },
};

export default function AboutEECLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
