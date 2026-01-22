import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Why Choose EEC for UK Pre-CAS Interview | Expert Insights & Branch Locator',
    description: 'Discover why EEC is Gujarat\'s #1 UK study abroad consultant since 1997. Expert insights, competitive comparison, and find your nearest branch from 26 locations across Gujarat. 50,000+ students guided, 95%+ visa success rate.',
    keywords: [
        'why choose EEC',
        'best UK visa consultant Gujarat',
        'EEC branches Gujarat',
        'UK study abroad consultant Ahmedabad',
        'EEC Vadodara',
        'EEC Surat',
        'UK visa expert Gujarat',
        'AIRC certified consultant',
        'UK Embassy trained consultant',
        'EEC success rate',
        'UK Pre-CAS interview expert',
        'study abroad consultant near me'
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
        canonical: 'https://ai.eecglobal.com/ukprecas/about-eec/',
        languages: {
            'en-GB': 'https://ai.eecglobal.com/ukprecas/about-eec/',
            'en-IN': 'https://ai.eecglobal.com/ukprecas/about-eec/',
            'en-US': 'https://ai.eecglobal.com/ukprecas/about-eec/',
            'x-default': 'https://ai.eecglobal.com/ukprecas/about-eec/',
        },
    },
    openGraph: {
        type: 'website',
        url: 'https://ai.eecglobal.com/ukprecas/about-eec/',
        title: 'Why Choose EEC for UK Pre-CAS Interview | Expert Insights & Branch Locator',
        description: 'Gujarat\'s #1 UK study abroad consultant since 1997. Expert insights, competitive comparison, and find your nearest branch from 26 locations.',
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
                alt: 'EEC - Why Choose EEC',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@eecglobal',
        creator: '@eecglobal',
        title: 'Why Choose EEC for UK Pre-CAS Interview | Expert Insights & Branch Locator',
        description: 'Gujarat\'s #1 UK study abroad consultant since 1997. Expert insights, competitive comparison, and find your nearest branch.',
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
        'article:tag': 'UK Visa, EEC, Study Abroad, Consultant',
        'og:article:author': 'Amit Jalan',
        'og:article:published_time': '2026-01-16T00:00:00+05:30',
        'og:article:modified_time': '2026-01-16T00:00:00+05:30',
        'theme-color': '#4f46e5',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'black-translucent',
        'apple-mobile-web-app-title': 'About EEC',
        'application-name': 'EEC - Why Choose EEC',
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
        title: 'About EEC',
    },
    verification: {
        google: 'rqiI0_ZlREHbdPNC1E_HUY_RMmHcYEiO6yL9HdZ1VfE',
    },
};

export default function AboutEecLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
