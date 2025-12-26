import { Metadata } from 'next';
import NzVisaApp from '@/features/nz-visa/components/NzVisaApp';

export const metadata: Metadata = {
    title: 'New Zealand Student Visa Prep | AI-Powered Interview Practice Tool',
    description: 'Prepare for your New Zealand student visa interview with AI-powered feedback, personalized prep plans, and expert guidance from EEC Global.',
    keywords: ['New Zealand Visa', 'NZ Student Visa', 'Interview Prep', 'Study Abroad', 'NZ Visa', 'Student Visa', 'Visa Interview'],
    openGraph: {
        title: 'New Zealand Student Visa Prep | AI-Powered Practice',
        description: 'Master your New Zealand student visa interview with AI-powered practice and feedback.',
        type: 'website',
    },
};

export default function NzVisaPage() {
    return <NzVisaApp />;
}

