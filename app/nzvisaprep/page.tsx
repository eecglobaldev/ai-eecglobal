import { Metadata } from 'next';
import GoogleTagManager from '@/components/GoogleTagManager';
import NzVisaPrepWrapper from './NzVisaPrepWrapper';

export const metadata: Metadata = {
    title: 'Free AI-Powered New Zealand Student Visa Interview Prep | EEC Global | Practice NZ Immigration Questions',
    description: 'India\'s first 100% FREE AI-powered New Zealand student visa interview preparation tool. Get hyper-personalized INZ credibility interview practice, model answers, expert guidance from certified ENZRA agents, and advanced analytics. Trusted by EEC since 1997 - Gujarat\'s largest study abroad company with 26 branches.',
    keywords: ['New Zealand student visa interview', 'NZ visa prep', 'INZ credibility interview', 'New Zealand study visa', 'student visa interview preparation', 'NZ immigration interview', 'ENZRA agent', 'study in New Zealand', 'New Zealand universities', 'NZ student visa from India', 'visa interview tips', 'INZ genuine temporary entry', 'NZ visa questions', 'AI visa preparation', 'EEC Global', 'study abroad Gujarat', 'IELTS New Zealand', 'PTE New Zealand', 'New Zealand ITP colleges', 'NZ post-study work visa', 'New Zealand PR pathway'],
    authors: [{ name: 'Enbee Education Center Private Limited' }],
    publisher: 'EEC Global',
    robots: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
    },
    alternates: {
        canonical: 'https://ai.eecglobal.com/nzvisaprep/',
        languages: {
            'en': 'https://ai.eecglobal.com/nzvisaprep',
            'en-IN': 'https://ai.eecglobal.com/nzvisaprep',
            'en-NZ': 'https://ai.eecglobal.com/nzvisaprep',
            'en-AU': 'https://ai.eecglobal.com/nzvisaprep',
            'en-GB': 'https://ai.eecglobal.com/nzvisaprep',
            'hi-IN': 'https://ai.eecglobal.com/nzvisaprep',
            'gu-IN': 'https://ai.eecglobal.com/nzvisaprep',
            'x-default': 'https://ai.eecglobal.com/nzvisaprep',
        },
        types: {
            'application/rss+xml': [{ url: '/nzvisaprep/feed.xml', title: 'RSS Feed' }],
        },
    },
    openGraph: {
        type: 'website',
        url: 'https://ai.eecglobal.com/nzvisaprep',
        title: 'Free AI-Powered New Zealand Student Visa Interview Prep | EEC Global',
        description: 'India\'s first 100% FREE AI tool for NZ student visa interview preparation. Get hyper-personalized practice with model answers, expert guidance from ENZRA certified agents, and advanced analytics. 26 branches across Gujarat since 1997.',
        siteName: 'EEC',
        locale: 'en_IN',
        alternateLocale: ['en_US'],
        images: [
            {
                url: 'https://ai.eecglobal.com/assets/nz-visa-prep-og.png',
                secureUrl: 'https://ai.eecglobal.com/assets/nz-visa-prep-og.png',
                type: 'image/png',
                width: 1200,
                height: 630,
                alt: 'EEC - AI-Powered New Zealand Student Visa Interview Preparation Tool',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@eecglobalindia',
        creator: '@eecglobalindia',
        title: 'Free AI-Powered NZ Student Visa Interview Prep | EEC Global',
        description: 'India\'s first 100% FREE AI tool for New Zealand student visa interview preparation. Hyper-personalized INZ credibility interview practice with model answers and expert guidance.',
        images: ['https://ai.eecglobal.com/assets/nz-visa-prep-og.png'],
    },
    other: {
        'google-site-verification': 'rqiI0_ZlREHbdPNC1E_HUY_RMmHcYEiO6yL9HdZ1VfE',
        'norton-safeweb-site-verification': '7NYJ-D5PT8TP1F0LE9QNH0B3-Y252UUDM6IC2G4Z01AAPSO4NSRCFEJNPSOTH90KP85755DOMJICRKSDGPC-1PLTL73PZ9SRZ5EQA-NU9KQTIJWYH55RJLI80QSVG3BL',
        'yandex-verification': 'a2004fffad6cb66d',
        'msvalidate.01': '9A9B2AD82F89ED85E7EA6D30FAD943EC',
        'p:domain_verify': 'f322a851a0ee625a14f30abb8d526f73',
        'indexnow-key': '77d764cbbebe467aa681c23bb5857364',
        'geo.region': 'IN-GJ',
        'geo.placename': 'Gujarat, India',
        'geo.position': '22.3072;73.1812',
        'ICBM': '22.3072, 73.1812',
        'linkedin:owner': 'eecindia',
    },
    icons: {
        icon: [
            { url: '/favicon.ico', type: 'image/x-icon' },
            { url: '/favicon.png', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        ],
        apple: [
            { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
    },
    manifest: '/site.webmanifest',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'black-translucent',
        title: 'NZ Visa Prep',
    },
    verification: {
        google: 'rqiI0_ZlREHbdPNC1E_HUY_RMmHcYEiO6yL9HdZ1VfE',
    },
};

export default function NzVisaPrepPage() {
    return (
        <>
            <GoogleTagManager gtmId="GTM-5KZ55893" />
            <NzVisaPrepWrapper />
        </>
    );
}

