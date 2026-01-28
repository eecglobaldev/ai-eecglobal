import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Glossary - Australia GS Prep | EEC',
  description: 'Comprehensive glossary of terms related to Australian student visas, Genuine Student (GS) requirement, and visa application process.',
  keywords: [
    'Australia student visa glossary',
    'GS requirement terms',
    'subclass 500 visa definitions',
    'Australian visa terminology',
    'CoE OSHC PSW',
    'ECTA agreement',
    'EEC Australia',
  ],
  authors: [{ name: 'EEC (Enbee Education Center Private Limited)' }],
  openGraph: {
    type: 'website',
    url: 'https://ai.eecglobal.com/australiagsprep/glossary',
    title: 'Glossary - Australia GS Prep | EEC',
    description: 'Comprehensive glossary of terms related to Australian student visas and the Genuine Student requirement.',
    siteName: 'EEC Australia GS Prep',
    locale: 'en_IN',
    images: [
      {
        url: '/assets/logos/eeclogo-main.png',
        width: 1200,
        height: 630,
        alt: 'EEC Australia GS Prep Glossary',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Glossary - Australia GS Prep | EEC',
    description: 'Comprehensive glossary of terms related to Australian student visas and the Genuine Student requirement.',
    images: ['/assets/logos/eeclogo-main.png'],
  },
  alternates: {
    canonical: 'https://ai.eecglobal.com/australiagsprep/glossary',
    languages: {
      'en-IN': 'https://ai.eecglobal.com/australiagsprep/glossary',
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
  },
};

export default function GlossaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
