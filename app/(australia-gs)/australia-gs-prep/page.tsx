import { Metadata } from 'next';
import AustraliaGsApp from '@/features/australia-gs/components/AustraliaGsApp';
import AustraliaGsStructuredData from '@/features/australia-gs/components/AustraliaGsStructuredData';

export const metadata: Metadata = {
    title: 'Free AI Australia GS Interview Prep Tool by EEC',
    description: '10X your Australian student visa success with EEC\'s free AI-powered Genuine Student (GS) interview prep tool. Get hyper-personalized questions, practice with your voice, and receive instant, expert feedback. Designed for Indian students applying for the Subclass 500 visa.',
    keywords: ['Australia student visa', 'Genuine Student', 'GS interview', 'GS criteria Australia', 'EEC', 'study in Australia', 'visa interview prep', 'AI visa tool', 'Indian students', 'subclass 500 visa India', 'free AI interview coach', 'genuine student assessment Australia', 'GTE to GS changes', 'Australian visa interview questions for Indian students', 'EEC branches Gujarat', 'study abroad consultants India'],
    authors: [{ name: 'EEC (Enbee Education Center Private Limited)' }],
    publisher: 'EEC (Enbee Education Center Private Limited)',
    openGraph: {
        type: 'website',
        url: 'https://ai.eecglobal.com/australiagsprep/',
        title: 'Free AI Australia GS Interview Prep Tool by EEC',
        description: 'A 100% free, AI-powered tool for Indian students to prepare for the Australian Genuine Student (GS) visa interview.',
        siteName: 'EEC Australia GS Prep',
        locale: 'en_IN',
        images: [
            {
                url: '/assets/logos/eeclogo-main.png',
                width: 1200,
                height: 630,
                alt: 'EEC Australia GS Prep Tool',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free AI Australia GS Interview Prep Tool by EEC',
        description: 'A 100% free, AI-powered tool for Indian students to prepare for the Australian Genuine Student (GS) visa interview.',
        images: ['/assets/logos/eeclogo-main.png'],
    },
    alternates: {
        canonical: 'https://ai.eecglobal.com/australiagsprep/',
    },
    icons: {
        icon: [
            { url: 'https://australia.eecglobal.com/australialogo.png', type: 'image/png' },
            { url: '/favicon.ico', sizes: 'any' },
        ],
        apple: [
            { url: '/apple-touch-icon.png', sizes: '180x180' },
        ],
    },
    other: {
        'google-site-verification': 'rqiI0_ZlREHbdPNC1E_HUY_RMmHcYEiO6yL9HdZ1VfE',
    },
};

export default function AustraliaGsPrepPage() {
    return (
        <>
            <AustraliaGsStructuredData />
            <AustraliaGsApp />
        </>
    );
}
