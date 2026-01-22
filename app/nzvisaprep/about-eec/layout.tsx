import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About EEC - NZ Student Visa Experts | EEC',
    description: 'Gujarat\'s #1 New Zealand study abroad consultant since 1997. Meet our expert team, read success stories, and find our 26 branches across Gujarat.',
    keywords: [
        'EEC New Zealand',
        'NZ visa experts',
        'ENZRA certified agents',
        'EEC branches Gujarat',
        'NZ study abroad consultant',
        'EEC success stories',
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
        canonical: 'https://ai.eecglobal.com/nzvisaprep/about-eec/',
        languages: {
            'en-GB': 'https://ai.eecglobal.com/nzvisaprep/about-eec/',
            'en-IN': 'https://ai.eecglobal.com/nzvisaprep/about-eec/',
            'en-US': 'https://ai.eecglobal.com/nzvisaprep/about-eec/',
            'x-default': 'https://ai.eecglobal.com/nzvisaprep/about-eec/',
        },
    },
    openGraph: {
        type: 'website',
        url: 'https://ai.eecglobal.com/nzvisaprep/about-eec/',
        title: 'About EEC - NZ Student Visa Experts | EEC',
        description: 'Gujarat\'s #1 New Zealand study abroad consultant since 1997. Meet our expert team, read success stories, and find our 26 branches across Gujarat.',
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
                alt: 'EEC - About EEC',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@eecglobal',
        creator: '@eecglobal',
        title: 'About EEC - NZ Student Visa Experts | EEC',
        description: 'Gujarat\'s #1 New Zealand study abroad consultant since 1997. Expert team and 26 branches across Gujarat.',
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
        'article:tag': 'EEC, NZ Visa Experts, Study Abroad Consultant',
        'theme-color': '#4f46e5',
    },
};

export default function NZVisaAboutEecLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
