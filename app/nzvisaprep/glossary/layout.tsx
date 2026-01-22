import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'NZ Student Visa Glossary | EEC',
    description: 'Comprehensive glossary of New Zealand student visa terms. Authoritative definitions for INZ, GTE, FTS, PSWV, and all essential NZ visa terminology.',
    keywords: [
        'NZ visa glossary',
        'New Zealand visa terms',
        'INZ terminology',
        'NZ student visa definitions',
        'GTE definition',
        'FTS scheme',
        'NZ visa abbreviations',
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
        canonical: 'https://ai.eecglobal.com/nzvisaprep/glossary/',
        languages: {
            'en-GB': 'https://ai.eecglobal.com/nzvisaprep/glossary/',
            'en-IN': 'https://ai.eecglobal.com/nzvisaprep/glossary/',
            'en-US': 'https://ai.eecglobal.com/nzvisaprep/glossary/',
            'x-default': 'https://ai.eecglobal.com/nzvisaprep/glossary/',
        },
    },
    openGraph: {
        type: 'website',
        url: 'https://ai.eecglobal.com/nzvisaprep/glossary/',
        title: 'NZ Student Visa Glossary | EEC',
        description: 'Comprehensive glossary of New Zealand student visa terms. Authoritative definitions for INZ, GTE, FTS, PSWV, and all essential NZ visa terminology.',
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
                alt: 'EEC - NZ Student Visa Glossary',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@eecglobal',
        creator: '@eecglobal',
        title: 'NZ Student Visa Glossary | EEC',
        description: 'Comprehensive glossary of New Zealand student visa terms and definitions.',
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
        'article:tag': 'NZ Visa, Glossary, Student Visa, Study Abroad',
        'theme-color': '#4f46e5',
    },
};

export default function NZVisaGlossaryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
