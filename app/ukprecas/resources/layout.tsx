import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'UK Pre-CAS Interview Resources 2026 | Documents, Calculator, Statistics & English Tests',
    description: 'Complete UK Pre-CAS interview resources: document checklist, funds calculator, verified statistics, and English test preparation. Everything you need for September 2026 & January 2027 UK intakes.',
    keywords: [
        'UK Pre-CAS resources',
        'UK visa documents checklist',
        'UK visa funds calculator',
        'UK visa statistics 2026',
        'IELTS for UK visa',
        'PTE UKVI',
        'UK student visa documents',
        'maintenance funds calculator',
        'UK visa success rate',
        'English test requirements UK visa',
        'Pre-CAS interview documents',
        'UK visa preparation resources'
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
        canonical: 'https://ai.eecglobal.com/ukprecas/resources/',
        languages: {
            'en-GB': 'https://ai.eecglobal.com/ukprecas/resources/',
            'en-IN': 'https://ai.eecglobal.com/ukprecas/resources/',
            'en-US': 'https://ai.eecglobal.com/ukprecas/resources/',
            'x-default': 'https://ai.eecglobal.com/ukprecas/resources/',
        },
    },
    openGraph: {
        type: 'website',
        url: 'https://ai.eecglobal.com/ukprecas/resources/',
        title: 'UK Pre-CAS Interview Resources 2026 | Documents, Calculator, Statistics & English Tests',
        description: 'Complete UK Pre-CAS interview resources: document checklist, funds calculator, verified statistics, and English test preparation.',
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
                alt: 'EEC - UK Pre-CAS Interview Resources',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@eecglobal',
        creator: '@eecglobal',
        title: 'UK Pre-CAS Interview Resources 2026 | Documents, Calculator, Statistics & English Tests',
        description: 'Complete UK Pre-CAS interview resources: document checklist, funds calculator, verified statistics, and English test preparation.',
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
        'article:tag': 'UK Visa, Pre-CAS Interview, Resources, Study Abroad',
        'og:article:author': 'Amit Jalan',
        'og:article:published_time': '2026-01-16T00:00:00+05:30',
        'og:article:modified_time': '2026-01-16T00:00:00+05:30',
        'theme-color': '#4f46e5',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'black-translucent',
        'apple-mobile-web-app-title': 'UK Pre-CAS Resources',
        'application-name': 'UK Pre-CAS Interview Resources',
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
        title: 'UK Pre-CAS Resources',
    },
    verification: {
        google: 'rqiI0_ZlREHbdPNC1E_HUY_RMmHcYEiO6yL9HdZ1VfE',
    },
};

export default function ResourcesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
