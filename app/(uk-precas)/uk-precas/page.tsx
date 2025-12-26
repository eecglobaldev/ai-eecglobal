import { Metadata } from 'next';
import UkPrecasApp from '@/features/uk-precas/components/UkPrecasApp';

export const metadata: Metadata = {
    title: 'UK Pre-CAS Interview Prep | AI-Powered Practice Tool',
    description: 'Prepare for your UK Pre-CAS credibility interview with AI-powered feedback, personalized prep plans, and expert guidance from EEC Global.',
    keywords: ['UK Pre-CAS', 'UK Visa Interview', 'Interview Prep', 'Study Abroad', 'UK Visa', 'Student Visa', 'Credibility Interview'],
    openGraph: {
        title: 'UK Pre-CAS Interview Prep | AI-Powered Practice',
        description: 'Master your UK Pre-CAS credibility interview with AI-powered practice and feedback.',
        type: 'website',
    },
};

export default function UkPrecasPage() {
    return <UkPrecasApp />;
}

