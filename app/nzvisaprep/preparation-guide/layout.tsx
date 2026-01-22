import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'NZ Student Visa Preparation Guide | EEC',
    description: 'Complete step-by-step guide for applying for a New Zealand student visa and preparing for your INZ credibility interview. Expert tips and preparation strategies.',
    keywords: [
        'NZ visa preparation guide',
        'New Zealand visa application',
        'INZ interview preparation',
        'NZ student visa guide',
        'NZ visa application steps',
        'INZ credibility interview tips',
    ],
    authors: [{ name: 'EEC - Enbee Education Center' }],
    publisher: 'EEC - Enbee Education Center',
    robots: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
        googleBot: 'index, follow',
    },
    alternates: {
        canonical: 'https://ai.eecglobal.com/nzvisaprep/preparation-guide/',
        languages: {
            'en-GB': 'https://ai.eecglobal.com/nzvisaprep/preparation-guide/',
            'en-IN': 'https://ai.eecglobal.com/nzvisaprep/preparation-guide/',
            'en-US': 'https://ai.eecglobal.com/nzvisaprep/preparation-guide/',
            'x-default': 'https://ai.eecglobal.com/nzvisaprep/preparation-guide/',
        },
    },
    openGraph: {
        type: 'article',
        url: 'https://ai.eecglobal.com/nzvisaprep/preparation-guide/',
        title: 'NZ Student Visa Preparation Guide | EEC',
        description: 'Complete step-by-step guide for applying for a New Zealand student visa and preparing for your INZ credibility interview.',
        siteName: 'EEC',
        locale: 'en_IN',
        alternateLocale: ['en_US', 'en_GB'],
        images: [
            {
                url: 'https://ai.eecglobal.com/assets/eeclogo.svg',
                secureUrl: 'https://ai.eecglobal.com/assets/eeclogo.svg',
                type: 'image/svg+xml',
                width: 1200,
                height: 630,
                alt: 'EEC - NZ Student Visa Preparation Guide',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@eecglobal',
        creator: '@eecglobal',
        title: 'NZ Student Visa Preparation Guide | EEC',
        description: 'Complete step-by-step guide for New Zealand student visa application and INZ interview preparation.',
        images: ['https://ai.eecglobal.com/assets/eeclogo.svg'],
    },
    other: {
        'geo.region': 'IN-GJ',
        'geo.placename': 'Gujarat, India',
        'geo.position': '22.3072;73.1812',
        'ICBM': '22.3072, 73.1812',
        'language': 'English',
        'article:author': 'EEC - Enbee Education Center',
        'article:publisher': 'https://www.facebook.com/eecglobal',
        'article:section': 'Education',
        'article:tag': 'NZ Visa, Preparation Guide, Student Visa, Study Abroad',
        'article:published_time': '2024-06-15T00:00:00+05:30',
        'article:modified_time': '2026-01-16T00:00:00+05:30',
        'theme-color': '#4f46e5',
    },
};

export default function NZVisaPreparationGuideLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
