import { Metadata } from 'next';
import AustraliaGsApp from '@/features/australia-gs/components/AustraliaGsApp';

export const metadata: Metadata = {
    title: 'Australia GS Interview Prep | AI-Powered Practice Tool',
    description: 'Prepare for your Australia Graduate Skills Assessment interview with AI-powered feedback, personalized prep plans, and expert guidance from EEC Global.',
    keywords: ['Australia GS', 'Graduate Skills', 'Interview Prep', 'Study Abroad', 'Australia Visa', 'Student Visa'],
    openGraph: {
        title: 'Australia GS Interview Prep | AI-Powered Practice',
        description: 'Master your Australia Graduate Skills interview with AI-powered practice and feedback.',
        type: 'website',
    },
};

export default function AustraliaGsPrepPage() {
    return <AustraliaGsApp />;
}
