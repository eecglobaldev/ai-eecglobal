import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard - UK Pre-CAS Prep | EEC',
    description: 'Track your UK Pre-CAS interview preparation, view scores, and access feedback.',
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: 'https://ai.eecglobal.com/ukprecas/dashboard/',
    },
    openGraph: {
        title: 'Dashboard - UK Pre-CAS Prep | EEC',
        description: 'Track your UK Pre-CAS interview preparation, view scores, and access feedback.',
        url: 'https://ai.eecglobal.com/ukprecas/dashboard/',
        type: 'website',
    },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
