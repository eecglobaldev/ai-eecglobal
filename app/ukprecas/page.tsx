import { Metadata } from 'next';
import UkPrecasStructuredData from '@/features/uk-precas/components/UkPrecasStructuredData';
import GoogleTagManager from '@/components/GoogleTagManager';
import UkPrecasWrapper from './UkPrecasWrapper';

export const metadata: Metadata = {
    title: 'UK Pre-CAS Interview Prep 2026 by EEC | AI-Powered Visa Interview Practice',
    description: 'Ace your UK Pre-CAS interview 2026 with EEC\'s AI tool. Free mock interviews, instant feedback & expert UKVI guidance for Tier 4 visa success. September 2026 & January 2027 UK intakes. 26 Gujarat branches.',
    keywords: [
        'UK Pre-CAS interview 2026',
        'UK student visa interview 2026',
        'CAS interview preparation 2026',
        'credibility interview',
        'Tier 4 student visa 2026',
        'UKVI interview 2026',
        'UK visa interview questions 2026',
        'how to prepare for UK visa interview 2026',
        'mock visa interview',
        'UK visa interview tips',
        'UK Pre-CAS guide',
        'IELTS for UK visa 2026',
        'UK visa coaching',
        'study abroad consultant Gujarat',
        'EEC',
        'Enbee Education Center',
        'UK visa Vadodara',
        'UK visa Ahmedabad',
        'UK visa Surat',
        'study in UK 2026',
        'September 2026 UK intake',
        'January 2027 UK intake',
        'Graduate Route 2026'
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
        canonical: 'https://ai.eecglobal.com/ukprecas/',
        languages: {
            'en-GB': 'https://ai.eecglobal.com/ukprecas/',
            'en-IN': 'https://ai.eecglobal.com/ukprecas/',
            'en-US': 'https://ai.eecglobal.com/ukprecas/',
            'x-default': 'https://ai.eecglobal.com/ukprecas/',
        },
    },
    openGraph: {
        type: 'website',
        url: 'https://ai.eecglobal.com/ukprecas/',
        title: 'UK Pre-CAS Interview Prep by EEC | AI-Powered Visa Interview Practice',
        description: 'Ace your UK Pre-CAS interview with EEC\'s AI-powered prep tool. Get personalized questions, real-time feedback, and expert guidance for UK student visa success. Practice with audio recording & transcription.',
        siteName: 'EEC',
        locale: 'en_GB',
        alternateLocale: ['en_US', 'en_IN'],
        images: [
            {
                url: 'https://ai.eecglobal.com/assets/eeclogo.svg',
                secureUrl: 'https://ai.eecglobal.com/assets/eeclogo.svg',
                type: 'image/svg+xml',
                width: 1200,
                height: 630,
                alt: 'EEC - UK Pre-CAS Interview Preparation',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@eecglobal',
        creator: '@eecglobal',
        title: 'UK Pre-CAS Interview Prep by EEC | AI-Powered Visa Interview Practice',
        description: 'Ace your UK Pre-CAS interview with EEC\'s AI-powered prep tool. Get personalized questions, real-time feedback, and expert guidance for UK student visa success.',
        images: ['https://ai.eecglobal.com/assets/eeclogo.svg'],
    },
    other: {
        'google-site-verification': 'rqiI0_ZlREHbdPNC1E_HUY_RMmHcYEiO6yL9HdZ1VfE',
        'msvalidate.01': '9A9B2AD82F89ED85E7EA6D30FAD943EC',
        'yandex-verification': '4c16d6e2b3107e7f',
        'indexnow-key': 'a76a6a94e6924e4eb33d0cf3ad7de3bc',
        'p:domain_verify': 'f322a851a0ee625a14f30abb8d526f73',
        'facebook-domain-verification': 'dch3wf3uiyuczeywymetwiixttq0e8',
        'norton-safeweb-site-verification': 'ZORUDVR8LPMT3RSOVOQVIP2DV87E5MW8SMBN-RJ80HOQVBOZRDYNN3A83OE0BVBQFIQHZ6VQVJM2KKFSMBB7FON9R59MNWCPAV7VRN5-DJWONIVMA6XO5FK-VVUDT7LC',
        'geo.region': 'IN-GJ',
        'geo.placename': 'Gujarat, India',
        'geo.position': '22.3072;73.1812',
        'ICBM': '22.3072, 73.1812',
        'language': 'English',
        'pinterest-rich-pin': 'true',
        'article:author': 'EEC - Enbee Education Center',
        'article:publisher': 'https://www.facebook.com/eecglobal',
        'article:section': 'Education',
        'article:tag': 'UK Visa, Pre-CAS Interview, Student Visa, Study Abroad',
        'og:article:author': 'Amit Jalan',
        'og:article:published_time': '2024-06-15T00:00:00+05:30',
        'og:article:modified_time': '2026-01-16T00:00:00+05:30',
        'theme-color': '#4f46e5',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'black-translucent',
        'apple-mobile-web-app-title': 'UK Pre-CAS Prep',
        'application-name': 'UK Pre-CAS Interview Prep',
        'msapplication-TileColor': '#4f46e5',
        'msapplication-config': '/browserconfig.xml',
        'format-detection': 'telephone=no',
    },
    icons: {
        icon: [
            { url: 'https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg', type: 'image/svg+xml' },
            { url: '/favicon.ico', sizes: 'any' },
        ],
        apple: [
            { url: '/apple-touch-icon.png', sizes: '180x180' },
        ],
    },
    manifest: '/manifest.json',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'black-translucent',
        title: 'UK Pre-CAS Prep',
    },
    verification: {
        google: 'rqiI0_ZlREHbdPNC1E_HUY_RMmHcYEiO6yL9HdZ1VfE',
    },
};

export default function UkPrecasPage() {
    return (
        <>
            <GoogleTagManager gtmId="GTM-TDBRW6C4" />
            <UkPrecasStructuredData />
            <UkPrecasWrapper />
        </>
    );
}

