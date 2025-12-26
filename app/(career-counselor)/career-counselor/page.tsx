import { Metadata } from 'next';
import CareerCounselorApp from '@/features/career-counselor/components/CareerCounselorApp';

export const metadata: Metadata = {
  title: 'AI-Powered Study Abroad Course Counselor | EEC Global',
  description: 'Get instant career insights for any course worldwide. Explore job prospects, salaries, top companies & universities. Free AI-powered course counseling.',
  keywords: 'study abroad, course counselor, career guidance, university selection, job prospects, study abroad counseling',
};

export default function CareerCounselorPage() {
  return <CareerCounselorApp />;
}

