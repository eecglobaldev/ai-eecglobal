import GlobalNav from '@/features/shared/components/GlobalNav';
import GlobalFooter from '@/features/shared/components/GlobalFooter';
import ThemeToggle from '@/features/shared/components/ThemeToggle';

export default function GlossaryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-[#020617] transition-colors duration-500">
            <GlobalNav />
            <main className="flex-grow">
                {children}
            </main>
            <GlobalFooter />
            <ThemeToggle />
        </div>
    );
}








