import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resources - Australia GS Prep | EEC',
  description: 'Essential resources for Australian student visa applications: financial documents checklist, approved banks directory, and PSW rights calculator.',
  keywords: [
    'Australia student visa documents',
    'financial checklist',
    'approved banks Australia',
    'PSW calculator',
    'subclass 485',
    'ECTA agreement',
    'EEC Australia',
  ],
  authors: [{ name: 'EEC (Enbee Education Center Private Limited)' }],
  openGraph: {
    type: 'website',
    url: 'https://ai.eecglobal.com/australiagsprep/resources',
    title: 'Resources - Australia GS Prep | EEC',
    description: 'Essential resources for Australian student visa applications: financial documents checklist, approved banks directory, and PSW rights calculator.',
    siteName: 'EEC Australia GS Prep',
    locale: 'en_IN',
    images: [
      {
        url: '/assets/logos/eeclogo-main.png',
        width: 1200,
        height: 630,
        alt: 'EEC Australia GS Prep Resources',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resources - Australia GS Prep | EEC',
    description: 'Essential resources for Australian student visa applications: financial documents checklist, approved banks directory, and PSW rights calculator.',
    images: ['/assets/logos/eeclogo-main.png'],
  },
  alternates: {
    canonical: 'https://ai.eecglobal.com/australiagsprep/resources',
    languages: {
      'en-IN': 'https://ai.eecglobal.com/australiagsprep/resources',
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
    'og:type': 'website',
  },
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
