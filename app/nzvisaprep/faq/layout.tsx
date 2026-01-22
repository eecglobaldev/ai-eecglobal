import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'NZ Student Visa FAQ | EEC',
    description: 'Frequently asked questions about New Zealand student visas, INZ credibility interviews, and visa requirements. Get answers to common queries about NZ study visas.',
    keywords: [
        'NZ student visa FAQ',
        'New Zealand visa questions',
        'INZ credibility interview FAQ',
        'NZ student visa requirements',
        'New Zealand study visa FAQ',
        'NZ visa interview questions',
        'EEC NZ visa FAQ',
        'NZ visa preparation FAQ',
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
        canonical: 'https://ai.eecglobal.com/nzvisaprep/faq/',
        languages: {
            'en-GB': 'https://ai.eecglobal.com/nzvisaprep/faq/',
            'en-IN': 'https://ai.eecglobal.com/nzvisaprep/faq/',
            'en-US': 'https://ai.eecglobal.com/nzvisaprep/faq/',
            'x-default': 'https://ai.eecglobal.com/nzvisaprep/faq/',
        },
    },
    openGraph: {
        type: 'website',
        url: 'https://ai.eecglobal.com/nzvisaprep/faq/',
        title: 'NZ Student Visa FAQ | EEC',
        description: 'Get answers to your New Zealand student visa questions. Learn about INZ credibility interviews, visa requirements, and preparation tips with EEC\'s expert guidance.',
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
                alt: 'EEC - NZ Student Visa FAQ',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@eecglobal',
        creator: '@eecglobal',
        title: 'NZ Student Visa FAQ | EEC',
        description: 'Frequently asked questions about New Zealand student visas, INZ credibility interviews, and visa requirements.',
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
        'article:tag': 'NZ Visa, Student Visa, INZ Interview, Study Abroad',
        'theme-color': '#4f46e5',
    },
};

export default function NZVisaFAQLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
