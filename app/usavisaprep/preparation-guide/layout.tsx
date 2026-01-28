import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preparation Guide - USA F-1 Visa Prep | EEC',
  description: 'Steps and tips for your F-1 visa interview: non-immigrant intent, 214(b), interview prep, financial docs, and EEC\'s AI tool.',
  keywords: ['F-1 preparation guide', '214(b)', 'Non-Immigrant Intent', 'visa interview tips', 'EEC USA visa'],
  openGraph: {
    type: 'website',
    url: 'https://ai.eecglobal.com/usavisaprep/preparation-guide',
    title: 'Preparation Guide - USA F-1 Visa Prep | EEC',
    siteName: 'EEC USA F-1 Visa Prep',
    locale: 'en_IN',
  },
  alternates: { canonical: 'https://ai.eecglobal.com/usavisaprep/preparation-guide' },
  robots: { index: true, follow: true },
};

export default function PreparationGuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
