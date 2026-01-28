import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resources - USA F-1 Visa Prep | EEC',
  description: 'Document checklist, certifications, and useful links for your F-1 visa preparation.',
  keywords: ['F-1 resources', 'document checklist', 'EEC certifications', 'USA visa prep', 'EEC USA visa'],
  openGraph: {
    type: 'website',
    url: 'https://ai.eecglobal.com/usavisaprep/resources',
    title: 'Resources - USA F-1 Visa Prep | EEC',
    siteName: 'EEC USA F-1 Visa Prep',
    locale: 'en_IN',
  },
  alternates: { canonical: 'https://ai.eecglobal.com/usavisaprep/resources' },
  robots: { index: true, follow: true },
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
