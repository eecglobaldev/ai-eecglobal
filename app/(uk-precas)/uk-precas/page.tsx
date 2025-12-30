import { Metadata } from 'next';
import UkPrecasApp from '@/features/uk-precas/components/UkPrecasApp';

export const metadata: Metadata = {
    title: 'UK Pre-CAS Interview Prep | AI-Powered Practice Tool',
    description: 'Prepare for your UK Pre-CAS credibility interview with AI-powered feedback, personalized prep plans, and expert guidance from EEC Global.',
    keywords: ['UK Pre-CAS', 'UK Visa Interview', 'Interview Prep', 'Study Abroad', 'UK Visa', 'Student Visa', 'Credibility Interview'],
    openGraph: {
        type: 'website',
        url: 'https://ai.eecglobal.com/ukprecas/',
        title: 'UK Pre-CAS Interview Prep | AI-Powered Practice',
        description: 'Master your UK Pre-CAS credibility interview with AI-powered practice and feedback.',
        siteName: 'EEC AI Tools',
        locale: 'en_IN',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'UK Pre-CAS Interview Prep - AI Powered',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'UK Pre-CAS Interview Prep | AI-Powered Practice',
        description: 'Master your UK Pre-CAS credibility interview with AI-powered practice and feedback.',
        images: ['/twitter-image.png'],
    },
    alternates: {
        canonical: 'https://ai.eecglobal.com/ukprecas/',
    },
};

export default function UkPrecasPage() {
    return <UkPrecasApp />;
}

