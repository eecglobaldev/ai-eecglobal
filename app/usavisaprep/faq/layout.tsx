import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - USA F-1 Visa Prep | EEC',
  description: 'Frequently asked questions about the F-1 visa interview at US Consulate Mumbai, financial documentation, 214(b) refusal recovery, and EEC\'s free AI-powered USA visa prep tool.',
  keywords: [
    'F-1 visa FAQ',
    'USA student visa interview',
    'Mumbai Consulate',
    '214(b) refusal',
    'EEC USA visa',
  ],
  openGraph: {
    type: 'website',
    url: 'https://ai.eecglobal.com/usavisaprep/faq',
    title: 'FAQ - USA F-1 Visa Prep | EEC',
    description: 'Frequently asked questions about F-1 visa interview preparation and EEC\'s AI tool.',
    siteName: 'EEC USA F-1 Visa Prep',
    locale: 'en_IN',
  },
  alternates: {
    canonical: 'https://ai.eecglobal.com/usavisaprep/faq',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
