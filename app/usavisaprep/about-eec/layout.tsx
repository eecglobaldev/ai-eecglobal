import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About EEC - USA F-1 Visa Prep | EEC',
  description: 'EEC (Enbee Education Center): experts, testimonials, certifications, and 26 branches across Gujarat. USA F-1 visa preparation since 1997.',
  keywords: ['About EEC', 'USA visa experts', 'EEC branches', 'F-1 visa prep', 'EEC USA visa'],
  openGraph: {
    type: 'website',
    url: 'https://ai.eecglobal.com/usavisaprep/about-eec',
    title: 'About EEC - USA F-1 Visa Prep | EEC',
    siteName: 'EEC USA F-1 Visa Prep',
    locale: 'en_IN',
  },
  alternates: { canonical: 'https://ai.eecglobal.com/usavisaprep/about-eec' },
  robots: { index: true, follow: true },
};

export default function AboutEECLayout({ children }: { children: React.ReactNode }) {
  return children;
}
