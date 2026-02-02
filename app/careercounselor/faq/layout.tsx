import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Study Abroad FAQ | AI Course Counselor | EEC Global',
  description: 'Frequently asked questions about study abroad, visa applications, test preparation, and EEC\'s AI Course Counselor. Get answers on USA, UK, Canada, Australia, Germany, and more.',
  keywords: ['study abroad FAQ', 'AI course counselor FAQ', 'visa questions', 'EEC study abroad', 'career guidance FAQ'],
  alternates: { canonical: 'https://ai.eecglobal.com/careercounselor/faq/' },
  openGraph: { url: 'https://ai.eecglobal.com/careercounselor/faq/', title: 'Study Abroad FAQ | EEC AI Course Counselor', description: 'FAQs about study abroad, visas, tests, and EEC services.' },
};

export default function CareerCounselorFAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
