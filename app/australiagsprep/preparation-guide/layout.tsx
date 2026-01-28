import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preparation Guide - Australia GS Prep | EEC',
  description: 'Complete step-by-step guide to prepare for your Australian Genuine Student (GS) visa interview, including the six GS pillars, interview questions, and SOP writing tips.',
  keywords: [
    'Australia GS interview preparation',
    'Genuine Student guide',
    'GS visa interview questions',
    'SOP writing guide',
    'subclass 500 preparation',
    'EEC Australia',
  ],
  authors: [{ name: 'EEC (Enbee Education Center Private Limited)' }],
  openGraph: {
    type: 'article',
    url: 'https://ai.eecglobal.com/australiagsprep/preparation-guide',
    title: 'Preparation Guide - Australia GS Prep | EEC',
    description: 'Complete step-by-step guide to prepare for your Australian Genuine Student (GS) visa interview.',
    siteName: 'EEC Australia GS Prep',
    locale: 'en_IN',
    images: [
      {
        url: '/assets/logos/eeclogo-main.png',
        width: 1200,
        height: 630,
        alt: 'EEC Australia GS Prep Preparation Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Preparation Guide - Australia GS Prep | EEC',
    description: 'Complete step-by-step guide to prepare for your Australian Genuine Student (GS) visa interview.',
    images: ['/assets/logos/eeclogo-main.png'],
  },
  alternates: {
    canonical: 'https://ai.eecglobal.com/australiagsprep/preparation-guide',
    languages: {
      'en-IN': 'https://ai.eecglobal.com/australiagsprep/preparation-guide',
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
    'article:author': 'EEC (Enbee Education Center Private Limited)',
    'article:published_time': '2024-01-01T00:00:00Z',
    'article:modified_time': new Date().toISOString(),
    'article:section': 'Education',
    'article:tag': 'Australia Student Visa, GS Interview, Visa Preparation',
  },
};

export default function PreparationGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
