import { Metadata } from 'next';
import AustraliaGsApp from '@/features/australia-gs/components/AustraliaGsApp';
import AustraliaGsStructuredData from '@/features/australia-gs/components/AustraliaGsStructuredData';
import GoogleTagManager from '@/components/GoogleTagManager';
import BreadcrumbSchema from '@/features/shared/components/BreadcrumbSchema';
import SoftwareApplicationSchema from '@/features/shared/components/SoftwareApplicationSchema';

// FAQ data for schema (extracted from existing components)
const mainPageFAQSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the Genuine Student (GS) requirement for an Australian student visa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Genuine Student (GS) requirement is a key integrity measure for the Australian student visa program. It assesses whether an applicant is a genuine student intending to obtain a quality education in Australia. Applicants must demonstrate their understanding of the course, their future plans in their home country, and provide evidence of their circumstances.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much fund is required for Australia Student Visa 2025-2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As of May 2024, the financial requirement for the primary applicant is AUD 29,710 per year for living costs, plus the first year\'s tuition fee and travel expenses (approx AUD 2,000).',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use AI to write my GS Statement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'While you can use AI tools like EEC\'s AI Prep specifically designed for this to generate ideas and structure, your GS statement must be personal and authentic. Copy-pasting generic AI content can lead to refusal. Our tool helps you structure YOUR personal story.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use this tool for the subclass 500 visa interview?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, absolutely. This tool is specifically designed to prepare students for the interview component related to the Australian Student Visa (subclass 500), with a strong focus on satisfying the new Genuine Student (GS) criteria.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does EEC Global help with Australia Visa filing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, EEC Global has 26 branches across Gujarat and specializes in Australian student visas. We assist with University applications, GTE/GS drafting, and Visa filing ensuring high success rates.',
      },
    },
  ],
};

export const metadata: Metadata = {
  title: 'Free AI Australia GS Interview Prep Tool by EEC',
  description: '10X your Australian student visa success with EEC\'s free AI-powered Genuine Student (GS) interview prep tool. Get hyper-personalized questions, practice with your voice, and receive instant, expert feedback. Designed for Indian students applying for the Subclass 500 visa.',
  keywords: ['Australia student visa', 'Genuine Student', 'GS interview', 'GS criteria Australia', 'EEC', 'study in Australia', 'visa interview prep', 'AI visa tool', 'Indian students', 'subclass 500 visa India', 'free AI interview coach', 'genuine student assessment Australia', 'GTE to GS changes', 'Australian visa interview questions for Indian students', 'EEC branches Gujarat', 'study abroad consultants India'],
  authors: [{ name: 'EEC (Enbee Education Center Private Limited)' }],
  publisher: 'EEC (Enbee Education Center Private Limited)',
  openGraph: {
    type: 'website',
    url: 'https://ai.eecglobal.com/australiagsprep/',
    title: 'Free AI Australia GS Interview Prep Tool by EEC',
    description: 'A 100% free, AI-powered tool for Indian students to prepare for the Australian Genuine Student (GS) visa interview.',
    siteName: 'EEC Australia GS Prep',
    locale: 'en_IN',
    images: [
      {
        url: '/assets/logos/eeclogo-main.png',
        width: 1200,
        height: 630,
        alt: 'EEC Australia GS Prep Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Australia GS Interview Prep Tool by EEC',
    description: 'A 100% free, AI-powered tool for Indian students to prepare for the Australian Genuine Student (GS) visa interview.',
    images: ['/assets/logos/eeclogo-main.png'],
  },
  alternates: {
    canonical: 'https://ai.eecglobal.com/australiagsprep/',
    types: {
      'application/rss+xml': [{ url: '/australiagsprep/feed.xml', title: 'RSS Feed' }],
    },
  },
  other: {
    'google-site-verification': 'rqiI0_ZlREHbdPNC1E_HUY_RMmHcYEiO6yL9HdZ1VfE',
  },
  icons: {
    icon: [
      { url: '/assets/logos/australialogo.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
};

export default function AustraliaGsPrepPage() {
  return (
    <>
      <GoogleTagManager />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://ai.eecglobal.com/' },
          { name: 'Australia GS Prep' }
        ]}
      />
      <SoftwareApplicationSchema
        name="Australia GS Interview Prep AI"
        description="AI-powered Genuine Student (GS) interview preparation tool for Australian student visa (subclass 500). Practice with personalized questions, voice recording, and instant expert feedback."
        url="https://ai.eecglobal.com/australiagsprep/"
        applicationCategory="EducationalApplication"
        aggregateRating={{
          ratingValue: "4.9",
          reviewCount: "892"
        }}
        featureList={[
          "AI Mock Interviews",
          "Voice Recording & Analysis",
          "Real-time Feedback",
          "Personalized Questions",
          "GS Criteria Assessment",
          "Dashboard Analytics"
        ]}
        screenshot="https://ai.eecglobal.com/assets/screenshots/australia-gs-dashboard.png"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mainPageFAQSchema) }}
      />
      <AustraliaGsStructuredData />
      <AustraliaGsApp />
    </>
  );
}
