import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Use AI Course Counselor | Preparation Guide | EEC Global',
  description: 'Step-by-step guide to using EEC\'s free AI Course Counselor. Get career insights, university recommendations, and study abroad planning tips.',
  keywords: ['AI course counselor guide', 'study abroad preparation', 'career guidance steps', 'EEC course counselor'],
  alternates: { canonical: 'https://ai.eecglobal.com/careercounselor/preparation-guide/' },
  openGraph: { url: 'https://ai.eecglobal.com/careercounselor/preparation-guide/', title: 'Preparation Guide | EEC AI Course Counselor' },
};

export default function CareerCounselorPreparationGuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
