import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - Australia GS Prep | EEC',
  description: 'Frequently asked questions about the Australian Genuine Student (GS) requirement, visa interview preparation, and EEC\'s free AI-powered GS prep tool.',
  keywords: [
    'Australia student visa FAQ',
    'Genuine Student requirement',
    'GS interview questions',
    'subclass 500 visa',
    'Australia visa FAQ',
    'GTE vs GS',
    'EEC Australia',
  ],
  authors: [{ name: 'EEC (Enbee Education Center Private Limited)' }],
  openGraph: {
    type: 'website',
    url: 'https://ai.eecglobal.com/australiagsprep/faq',
    title: 'FAQ - Australia GS Prep | EEC',
    description: 'Frequently asked questions about the Australian Genuine Student (GS) requirement and visa interview preparation.',
    siteName: 'EEC Australia GS Prep',
    locale: 'en_IN',
    images: [
      {
        url: '/assets/logos/eeclogo-main.png',
        width: 1200,
        height: 630,
        alt: 'EEC Australia GS Prep FAQ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ - Australia GS Prep | EEC',
    description: 'Frequently asked questions about the Australian Genuine Student (GS) requirement and visa interview preparation.',
    images: ['/assets/logos/eeclogo-main.png'],
  },
  alternates: {
    canonical: 'https://ai.eecglobal.com/australiagsprep/faq',
    languages: {
      'en-IN': 'https://ai.eecglobal.com/australiagsprep/faq',
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
    'og:type': 'article',
    'article:author': 'EEC (Enbee Education Center Private Limited)',
    'article:published_time': '2024-01-01T00:00:00Z',
    'article:modified_time': new Date().toISOString(),
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
