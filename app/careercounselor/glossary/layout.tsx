import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Study Abroad Glossary | AI Course Counselor | EEC Global',
  description: 'Definitions of study abroad terms: AIRC, CAS, GTE, PGWP, SOP, DLI, CoE, I-20, SEVIS, F-1, and more. EEC AI Course Counselor glossary.',
  keywords: ['study abroad glossary', 'AIRC', 'CAS', 'GTE', 'PGWP', 'SOP', 'DLI', 'study abroad terms'],
  alternates: { canonical: 'https://ai.eecglobal.com/careercounselor/glossary/' },
  openGraph: { url: 'https://ai.eecglobal.com/careercounselor/glossary/', title: 'Study Abroad Glossary | EEC AI Course Counselor' },
};

export default function CareerCounselorGlossaryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
