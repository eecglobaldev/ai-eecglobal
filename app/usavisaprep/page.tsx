import React from 'react';
import UsaVisaApp from '@/features/usa-visa/components/UsaVisaApp';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'USA F-1 Visa Interview Prep - AI Powered | EEC',
    description: 'Practice for your USA F-1 Student Visa Interview with our advanced AI interviewer. Get real-time feedback, pronunciation guides, and personalized prep plans.',
    keywords: ['USA F1 Visa', 'F-1 Visa Interview', 'Visa Interview Prep', 'Study Abroad', 'USA Visa', 'Student Visa', 'AI Interview Practice'],
    openGraph: {
        type: 'website',
        url: 'https://ai.eecglobal.com/usavisaprep/',
        title: 'USA F-1 Visa Interview Prep - AI Powered | EEC',
        description: 'Practice for your USA F-1 Student Visa Interview with our advanced AI interviewer. Get real-time feedback, pronunciation guides, and personalized prep plans.',
        siteName: 'EEC AI Tools',
        locale: 'en_IN',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'USA F-1 Visa Interview Prep - AI Powered',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'USA F-1 Visa Interview Prep - AI Powered | EEC',
        description: 'Practice for your USA F-1 Student Visa Interview with our advanced AI interviewer.',
        images: ['/twitter-image.png'],
    },
    alternates: {
        canonical: 'https://ai.eecglobal.com/usavisaprep/',
    },
};

export default function UsaVisaPrepPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
            <UsaVisaApp />
        </div>
    );
}




