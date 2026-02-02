import React from 'react';
import UsaVisaApp from '@/features/usa-visa/components/UsaVisaApp';
import { Metadata } from 'next';
import BreadcrumbSchema from '@/features/shared/components/BreadcrumbSchema';
import SoftwareApplicationSchema from '@/features/shared/components/SoftwareApplicationSchema';

export const metadata: Metadata = {
    title: 'USA F-1 Visa Interview Prep - AI Powered | EEC',
    description: 'Practice for your USA F-1 Student Visa Interview with our advanced AI interviewer. Get real-time feedback, pronunciation guides, and personalized prep plans.',
    keywords: ['USA F1 Visa', 'F-1 Visa Interview', 'Visa Interview Prep', 'Study Abroad', 'USA Visa', 'Student Visa', 'AI Interview Practice'],
    robots: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
    },
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
            <BreadcrumbSchema
                items={[
                    { name: 'Home', url: 'https://ai.eecglobal.com/' },
                    { name: 'USA F-1 Visa Prep' }
                ]}
            />
            <SoftwareApplicationSchema
                name="USA F-1 Visa Interview Prep AI"
                description="AI-powered F-1 student visa interview preparation tool. Practice with realistic consular officer simulations, get pronunciation feedback, and receive personalized prep plans."
                url="https://ai.eecglobal.com/usavisaprep/"
                applicationCategory="EducationalApplication"
                aggregateRating={{
                    ratingValue: "4.8",
                    reviewCount: "1523"
                }}
                featureList={[
                    "AI Consular Officer Simulation",
                    "Voice & Pronunciation Analysis",
                    "Real-time Feedback",
                    "214(b) Refusal Prevention",
                    "DS-160 Guidance",
                    "Interview Confidence Scoring"
                ]}
                screenshot="https://ai.eecglobal.com/assets/screenshots/usa-visa-dashboard.png"
            />
            <UsaVisaApp />
        </div>
    );
}


