import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About EEC | AI Course Counselor | EEC Global',
  description: 'EEC (Enbee Education Center) - Gujarat\'s largest and oldest study abroad company since 1997. 26 branches, 100,000+ students guided, AIRC & ICEF certified.',
  keywords: ['about EEC', 'Enbee Education Center', 'study abroad Gujarat', 'EEC Vadodara', 'AIRC certified'],
  alternates: { canonical: 'https://ai.eecglobal.com/careercounselor/about-eec/' },
  openGraph: { url: 'https://ai.eecglobal.com/careercounselor/about-eec/', title: 'About EEC | EEC AI Course Counselor' },
};

export default function CareerCounselorAboutEecLayout({ children }: { children: React.ReactNode }) {
  return children;
}
