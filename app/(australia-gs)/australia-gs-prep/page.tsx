import { Metadata } from 'next';
import AustraliaGsApp from '@/features/australia-gs/components/AustraliaGsApp';

export const metadata: Metadata = {
    title: 'Australia GS Interview Prep | AI-Powered Practice Tool',
    description: 'Prepare for your Australia Graduate Skills Assessment interview with AI-powered feedback, personalized prep plans, and expert guidance from EEC Global.',
    keywords: ['Australia GS', 'Graduate Skills', 'Interview Prep', 'Study Abroad', 'Australia Visa', 'Student Visa', 'Genuine Student Test'],
    openGraph: {
        type: 'website',
        url: 'https://ai.eecglobal.com/australia-gs-prep',
        title: 'Australia GS Interview Prep | AI-Powered Practice',
        description: 'Master your Australia Graduate Skills interview with AI-powered practice and feedback.',
        siteName: 'EEC AI Tools',
        locale: 'en_IN',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Australia GS Interview Prep - AI Powered',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Australia GS Interview Prep | AI-Powered Practice',
        description: 'Master your Australia Graduate Skills interview with AI-powered practice and feedback.',
        images: ['/twitter-image.png'],
    },
    alternates: {
        canonical: 'https://ai.eecglobal.com/australia-gs-prep',
    },
};

export default function AustraliaGsPrepPage() {
    return <AustraliaGsApp />;
}
