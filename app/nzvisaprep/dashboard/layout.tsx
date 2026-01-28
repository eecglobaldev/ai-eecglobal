import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard - NZ Student Visa Prep | EEC',
    description: 'Your hub for New Zealand student visa interview practice and performance tracking.',
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: 'https://ai.eecglobal.com/nzvisaprep/dashboard/',
    },
    openGraph: {
        title: 'Dashboard - NZ Student Visa Prep | EEC',
        description: 'Your hub for New Zealand student visa interview practice and performance tracking.',
        url: 'https://ai.eecglobal.com/nzvisaprep/dashboard/',
        type: 'website',
    },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
