import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard - Australia GS Prep | EEC',
    description: 'Manage your Australia Genuine Student (GS) interview practice and view personalized insights.',
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: 'https://ai.eecglobal.com/australiagsprep/dashboard/',
    },
    openGraph: {
        title: 'Dashboard - Australia GS Prep | EEC',
        description: 'Manage your Australia Genuine Student (GS) interview practice and view personalized insights.',
        url: 'https://ai.eecglobal.com/australiagsprep/dashboard/',
        type: 'website',
    },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
