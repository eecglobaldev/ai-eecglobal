import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'NZ Student Visa Resources | EEC',
    description: 'Essential resources for New Zealand student visa preparation: document checklist, cost calculator, verified statistics, and English test information.',
    keywords: [
        'NZ visa resources',
        'New Zealand visa checklist',
        'NZ visa cost calculator',
        'NZ visa statistics',
        'NZ student visa documents',
        'NZ visa requirements',
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
        canonical: 'https://ai.eecglobal.com/nzvisaprep/resources/',
        languages: {
            'en-GB': 'https://ai.eecglobal.com/nzvisaprep/resources/',
            'en-IN': 'https://ai.eecglobal.com/nzvisaprep/resources/',
            'en-US': 'https://ai.eecglobal.com/nzvisaprep/resources/',
            'x-default': 'https://ai.eecglobal.com/nzvisaprep/resources/',
        },
    },
    openGraph: {
        type: 'website',
        url: 'https://ai.eecglobal.com/nzvisaprep/resources/',
        title: 'NZ Student Visa Resources | EEC',
        description: 'Essential resources for New Zealand student visa preparation: document checklist, cost calculator, verified statistics, and English test information.',
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
                alt: 'EEC - NZ Student Visa Resources',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@eecglobal',
        creator: '@eecglobal',
        title: 'NZ Student Visa Resources | EEC',
        description: 'Essential resources for New Zealand student visa preparation: checklist, calculator, and statistics.',
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
        'article:tag': 'NZ Visa, Resources, Student Visa, Study Abroad',
        'theme-color': '#4f46e5',
    },
};

export default function NZVisaResourcesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
