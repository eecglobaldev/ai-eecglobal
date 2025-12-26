



import React, { useState, useRef, useEffect, useMemo, lazy, Suspense } from 'react';
import { portals } from '../data/knowledgeHubData';

// Lazily import all the heavy components that will be displayed in the hub
const GSGuide = lazy(() => import('./GSGuide').then(module => ({ default: module.GSGuide })));
const FinancialGuide = lazy(() => import('./FinancialGuide').then(module => ({ default: module.FinancialGuide })));
const ToolGuide = lazy(() => import('./ToolGuide').then(module => ({ default: module.ToolGuide })));
const AustraliaLifeGuide = lazy(() => import('./AustraliaLifeGuide').then(module => ({ default: module.AustraliaLifeGuide })));
const Faq = lazy(() => import('./Faq').then(module => ({ default: module.Faq })));
const ExpertPanel = lazy(() => import('./ExpertPanel').then(module => ({ default: module.ExpertPanel })));
const SuccessStories = lazy(() => import('./SuccessStories').then(module => ({ default: module.SuccessStories })));
const GSSOPGuide = lazy(() => import('./GSSOPGuide').then(module => ({ default: module.GSSOPGuide })));
const GSInterviewQuestionsGuide = lazy(() => import('./GSInterviewQuestionsGuide').then(module => ({ default: module.GSInterviewQuestionsGuide })));
const FinancialDocumentsGuide = lazy(() => import('./FinancialDocumentsGuide').then(module => ({ default: module.FinancialDocumentsGuide })));
const ApprovedBanksGuide = lazy(() => import('./ApprovedBanksGuide').then(module => ({ default: module.ApprovedBanksGuide })));
const PreDepartureIndiaGuide = lazy(() => import('./PreDepartureIndiaGuide').then(module => ({ default: module.PreDepartureIndiaGuide })));
const PSWCalculator = lazy(() => import('./PSWCalculator').then(module => ({ default: module.PSWCalculator })));
const PublicApiGuide = lazy(() => import('./PublicApiGuide').then(module => ({ default: module.PublicApiGuide })));
const BranchLocator = lazy(() => import('./BranchLocator').then(module => ({ default: module.BranchLocator })));


const XIcon = () => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;

const PortalCard = ({ portal, onClick, isActive }: { portal: any, onClick: () => void, isActive: boolean }) => {
    const activeClasses = isActive 
        ? 'shadow-[0_0_25px_3px_rgba(255,255,255,0.9)] dark:shadow-[0_0_25px_3px_rgba(255,255,255,0.4)] scale-105 shadow-2xl -translate-y-1' 
        : 'hover:-translate-y-1 hover:shadow-2xl hover:shadow-[0_0_25px_3px_rgba(255,255,255,0.9)] dark:hover:shadow-[0_0_25px_3px_rgba(255,255,255,0.4)]';
    
    return (
        <button
            onClick={onClick}
            aria-pressed={isActive}
            className={`group relative p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700/50 overflow-hidden cursor-pointer transform transition-all duration-300 text-left bg-gradient-to-br ${portal.gradient} ${activeClasses}`}
        >
            <div className="relative z-10 flex flex-col h-full">
                <div className="text-white/80" aria-hidden="true">{portal.icon}</div>
                <h3 className="mt-4 text-3xl font-bold text-white">{portal.title}</h3>
                <p className="mt-1 text-lg font-medium text-white/80 flex-grow">{portal.subtitle}</p>
                <div className="mt-4 text-xs font-semibold text-white/80 self-start border-b-2 border-transparent group-hover:border-white/80 transition-all">Explore Section &rarr;</div>
            </div>
            <div className="absolute inset-0 bg-black/10 dark:bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
        </button>
    );
};


const PortalContent = ({ portal }: { portal: typeof portals[0] }) => {
    switch (portal.id) {
        case 'gs-rulebook': return <div className="p-4 sm:p-6 lg:p-8"><GSGuide showVideo={false} /></div>;
        case 'gs-sop-playbook': return <div className="p-4 sm:p-6 lg:p-8"><GSSOPGuide /></div>;
        case 'gs-interview-questions': return <div className="p-4 sm:p-6 lg:p-8"><GSInterviewQuestionsGuide /></div>;
        case 'financial-blueprint': return <div className="p-4 sm:p-6 lg:p-8"><FinancialGuide /></div>;
        case 'financial-dossier': return <div className="p-4 sm:p-6 lg:p-8"><FinancialDocumentsGuide /></div>;
        case 'approved-banks': return <div className="p-4 sm:p-6 lg:p-8"><ApprovedBanksGuide /></div>;
        case 'pre-departure-guide': return <div className="p-4 sm:p-6 lg:p-8"><PreDepartureIndiaGuide /></div>;
        case 'career-hub': return <div className="p-4 sm:p-6 lg:p-8"><AustraliaLifeGuide /></div>;
        case 'psw-calculator': return <div className="p-4 sm:p-6 lg:p-8"><PSWCalculator /></div>;
        case 'success-stories': return <div className="p-4 sm:p-6 lg:p-8"><SuccessStories /></div>;
        case 'branch-locator': return <BranchLocator />;
        case 'tool-mastery': return <ToolGuide />;
        case 'experts': return <div className="p-4 sm:p-6 lg:p-8"><ExpertPanel /></div>;
        case 'public-api': return <div className="p-4 sm:p-6 lg:p-8"><PublicApiGuide /></div>;
        case 'faq': return <div className="p-4 sm:p-6 lg:p-8"><Faq /></div>;
        case 'video-guide':
            return (
                <div className="p-4 sm:p-6 lg:p-8">
                    <h3 className="text-2xl font-bold text-center text-slate-800 dark:text-slate-200 mb-6">Official Video Guide</h3>
                    <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700">
                        <iframe className="w-full h-full" src="https://www.youtube.com/embed/rbyBojb4e10" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                </div>
            );
        default: return null;
    }
};

const LoadingSpinnerIcon = () => (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin text-blue-600 dark:text-blue-400">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </svg>
);

const LoadingFallback = () => (
    <div className="flex flex-col items-center justify-center h-96 min-h-[50vh] p-8" role="status" aria-live="polite">
        <LoadingSpinnerIcon />
        <p className="mt-4 text-lg font-semibold text-slate-600 dark:text-slate-300">Loading Portal...</p>
    </div>
);


export const KnowledgeHub: React.FC = () => {
    const [activePortal, setActivePortal] = useState<typeof portals[0] | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const hubRef = useRef<HTMLElement>(null);

    const clearHash = () => {
        if (typeof window !== 'undefined') {
            const { pathname, search } = window.location;
            window.history.replaceState(null, '', `${pathname}${search}`);
        }
    };

    const handleCardClick = (portal: typeof portals[0]) => {
        if (activePortal?.id === portal.id) {
            hubRef.current?.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => setActivePortal(null), 300);
            clearHash();
        } else {
            setActivePortal(portal);
            if (typeof window !== 'undefined') {
                const { pathname, search } = window.location;
                window.history.replaceState(null, '', `${pathname}${search}#${portal.id}`);
            }
        }
    };
    
    const handleCloseContent = () => {
         hubRef.current?.scrollIntoView({ behavior: 'smooth' });
         setTimeout(() => setActivePortal(null), 300);
         clearHash();
    };

    const memoizedPortals = useMemo(() => portals, []);
    const visiblePortals = useMemo(() => portals.filter(p => p.id !== 'public-api'), []);


    useEffect(() => {
        if (activePortal) {
            setTimeout(() => {
                contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }, [activePortal]);

    useEffect(() => {
        const handleHashChange = () => {
            let hash = window.location.hash.replace('#', '');
            if (!hash) return;

            // Compatibility for old links
            if (hash === 'australia-study-hub') {
                hash = 'career-hub';
            }

            const portalToOpen = memoizedPortals.find(p => p.id === hash);
            if (portalToOpen && activePortal?.id !== portalToOpen.id) {
                setActivePortal(portalToOpen);
            }
        };

        window.addEventListener('hashchange', handleHashChange, false);
        handleHashChange(); // Check on mount

        return () => {
            window.removeEventListener('hashchange', handleHashChange, false);
        };
    }, [activePortal, memoizedPortals]);


    return (
        <section id="knowledge-hub" ref={hubRef} className="py-12 scroll-mt-24 bg-white dark:bg-slate-800/40 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-700/50">
            <div id="knowledge-hub-content" className="px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-12" id="knowledge-hub-header">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 dark:from-indigo-400 dark:to-purple-500">#1 Authority in India on Australia Student Visa Guidance</h2>
                    <p className="text-center text-lg text-slate-600 dark:text-slate-400 mt-2 max-w-3xl mx-auto">
                        Your complete knowledge base for the Australian student visa journey, condensed into an interactive hub. Click a card to explore a topic.
                    </p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {visiblePortals.map((portal) => (
                        <PortalCard
                            key={portal.id}
                            portal={portal}
                            onClick={() => handleCardClick(portal)}
                            isActive={activePortal?.id === portal.id}
                        />
                    ))}
                </div>

                <div
                    ref={contentRef}
                    className={`portal-content-wrapper ${activePortal ? 'open' : ''}`}
                >
                    {activePortal && (
                        <div className="portal-content-container fade-in bg-slate-50 dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col">
                            <header className="p-4 flex-shrink-0 flex justify-between items-center border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">{activePortal.title}</h2>
                                <button 
                                    onClick={handleCloseContent} 
                                    className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                                    aria-label="Close"
                                >
                                    <XIcon />
                                </button>
                            </header>
                            <div className="flex-grow overflow-y-auto">
                               <Suspense fallback={<LoadingFallback />}>
                                    <PortalContent portal={activePortal} />
                               </Suspense>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};