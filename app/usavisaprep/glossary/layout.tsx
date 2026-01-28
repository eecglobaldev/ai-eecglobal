import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Glossary - USA F-1 Visa Prep | EEC',
  description: 'F-1 visa terms and definitions: 214(b), I-20, SEVIS, Non-Immigrant Intent.',
  keywords: ['F-1 visa glossary', '214(b)', 'I-20', 'SEVIS', 'Non-Immigrant Intent', 'EEC USA visa'],
  openGraph: {
    type: 'website',
    url: 'https://ai.eecglobal.com/usavisaprep/glossary',
    title: 'Glossary - USA F-1 Visa Prep | EEC',
    description: 'F-1 visa terms and definitions.',
    siteName: 'EEC USA F-1 Visa Prep',
    locale: 'en_IN',
  },
  alternates: { canonical: 'https://ai.eecglobal.com/usavisaprep/glossary/' },
  robots: { index: true, follow: true },
};

export default function GlossaryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
