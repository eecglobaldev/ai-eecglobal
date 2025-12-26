import { Metadata } from 'next';
import NzVisaApp from '@/features/nz-visa/components/NzVisaApp';

export const metadata: Metadata = {
    title: 'New Zealand Student Visa Prep | AI-Powered Interview Practice Tool',
    description: 'Prepare for your New Zealand student visa interview with AI-powered feedback, personalized prep plans, and expert guidance from EEC Global.',
    keywords: ['New Zealand Visa', 'NZ Student Visa', 'Interview Prep', 'Study Abroad', 'NZ Visa', 'Student Visa', 'Visa Interview'],
    openGraph: {
        type: 'website',
        url: 'https://ai.eecglobal.com/nz-visa',
        title: 'New Zealand Student Visa Prep | AI-Powered Practice',
        description: 'Master your New Zealand student visa interview with AI-powered practice and feedback.',
        siteName: 'EEC AI Tools',
        locale: 'en_IN',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'New Zealand Student Visa Prep - AI Powered',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'New Zealand Student Visa Prep | AI-Powered Practice',
        description: 'Master your New Zealand student visa interview with AI-powered practice and feedback.',
        images: ['/twitter-image.png'],
    },
    alternates: {
        canonical: 'https://ai.eecglobal.com/nz-visa',
    },
};

export default function NzVisaPage() {
    return <NzVisaApp />;
}

