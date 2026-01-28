import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard - USA F-1 Visa Prep | EEC',
    description: 'Access your USA F-1 Visa interview practice sessions, feedback, and improvement plan.',
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: 'https://ai.eecglobal.com/usavisaprep/dashboard/',
    },
    openGraph: {
        title: 'Dashboard - USA F-1 Visa Prep | EEC',
        description: 'Access your USA F-1 Visa interview practice sessions, feedback, and improvement plan.',
        url: 'https://ai.eecglobal.com/usavisaprep/dashboard/',
        type: 'website',
    },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
