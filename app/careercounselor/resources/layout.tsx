import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resources | AI Course Counselor | EEC Global',
  description: 'Study abroad resources: test preparation, admissions guidance, visa services, financial guidance. EEC branches and countries served.',
  keywords: ['study abroad resources', 'EEC services', 'IELTS GRE GMAT', 'visa guidance', 'EEC branches'],
  alternates: { canonical: 'https://ai.eecglobal.com/careercounselor/resources/' },
  openGraph: { url: 'https://ai.eecglobal.com/careercounselor/resources/', title: 'Resources | EEC AI Course Counselor' },
};

export default function CareerCounselorResourcesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
