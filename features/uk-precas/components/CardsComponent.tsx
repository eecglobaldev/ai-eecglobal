import React, { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { cardData } from './constants';
import { CardData } from '../types';
import Card from './Card';


import { BranchLocator } from './BranchLocator';
import { GeoAeoContentSections } from './GeoAeoContentSections';
import { UKVisaGlossary } from './UKVisaGlossary';
import { ExpertAnswersFAQ } from './ExpertAnswersFAQ';
import { ExpertInsights } from './ExpertInsights';
import { VerifiedStatistics } from './VerifiedStatistics';
import { KnowledgeGraph } from './KnowledgeGraph';
import { DocumentChecklist } from './DocumentChecklist';
import { WhyEECComparison } from './WhyEECComparison';
import { FundsCalculator } from './FundsCalculator';

// X Icon Component
const XIcon = () => (
  <svg 
    aria-hidden="true" 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18"/>
    <path d="m6 6 12 12"/>
  </svg>
);

// Loading Spinner Icon
const LoadingSpinnerIcon = () => (
  <svg 
    aria-hidden="true" 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="animate-spin text-blue-600 dark:text-blue-400"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
  </svg>
);

// Loading Fallback
const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center h-96 min-h-[50vh] p-8" role="status" aria-live="polite">
    <LoadingSpinnerIcon />
    <p className="mt-4 text-lg font-semibold text-slate-600 dark:text-slate-300">Loading Content...</p>
  </div>
);

// Portal Content Component - Maps componentId to actual components
const PortalContent: React.FC<{ card: CardData }> = ({ card }) => {
  if (!card.componentId) return null;

  switch (card.componentId) {
   // Shared components
    case 'branch-locator':
      return <BranchLocator />;
   
    // UK Pre-CAS GeoAeoContentSections - Full component with section targeting
    case 'funds-calculator':
        return <FundsCalculator />;
    case 'uk-visa-glossary':
        return <UKVisaGlossary />;
    case 'expert-answers':
        return <ExpertAnswersFAQ />;
    case 'expert-insights':
        return <ExpertInsights />;
    case 'verified-statistics':
        return <VerifiedStatistics />;
    case 'knowledge-relationships':
        return <KnowledgeGraph />;
    case 'document-checklist-2026':
        return <DocumentChecklist />;
    case 'why-eec-comparison':
      return <WhyEECComparison />;
    
    default:
      return <GeoAeoContentSections />;
  }
};

export const CardsComponent: React.FC = () => {
  const [activeCard, setActiveCard] = useState<CardData | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLElement>(null);

  const clearHash = () => {
    if (typeof window !== 'undefined') {
      const { pathname, search } = window.location;
      window.history.replaceState(null, '', `${pathname}${search}`);
    }
  };

  const handleCardClick = (card: CardData) => {
    if (activeCard?.id === card.id) {
      portalRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => setActiveCard(null), 300);
      clearHash();
    } else {
      setActiveCard(card);
      if (typeof window !== 'undefined' && card.componentId) {
        const { pathname, search } = window.location;
        window.history.replaceState(null, '', `${pathname}${search}#${card.componentId}`);
      }
    }
  };

  const handleCloseContent = () => {
    portalRef.current?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => setActiveCard(null), 300);
    clearHash();
  };

  const memoizedCards = useMemo(() => cardData, []);

  useEffect(() => {
    if (activeCard) {
      setTimeout(() => {
        contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [activeCard]);

  useEffect(() => {
    // SSR guard: window is only available in the browser
    if (typeof window === 'undefined') return;

    const handleHashChange = () => {
      let hash = window.location.hash.replace('#', '');
      if (!hash) return;

      const cardToOpen = memoizedCards.find(c => c.componentId === hash);
      if (cardToOpen && activeCard?.id !== cardToOpen.id) {
        setActiveCard(cardToOpen);
      }
    };

    window.addEventListener('hashchange', handleHashChange, false);
    handleHashChange(); // Check on mount

    return () => {
      window.removeEventListener('hashchange', handleHashChange, false);
    };
  }, [activeCard, memoizedCards]);

  return (
    <section 
      id="knowledge-portal" 
      ref={portalRef} 
      className="py-6 sm:py-8 lg:py-12 scroll-mt-24 bg-white dark:bg-slate-800/40 rounded-xl sm:rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-700/50"
    >
      <div id="knowledge-portal-content" className="px-3 sm:px-4 md:px-6 lg:px-8">
        {/* <header className="text-center mb-12" id="knowledge-portal-header">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 dark:from-indigo-400 dark:to-purple-500">
            Complete NZ Visa Preparation Hub
          </h2>
          <p className="text-center text-lg text-slate-600 dark:text-slate-400 mt-2 max-w-3xl mx-auto">
            Your comprehensive knowledge base for New Zealand student visa journey. Click a card to explore a topic.
          </p>
        </header> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {memoizedCards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`transform transition-all duration-300 cursor-pointer ${
                activeCard?.id === card.id
                  ? 'scale-105 -translate-y-1 shadow-2xl shadow-[0_0_25px_3px_rgba(59,130,246,0.3)] dark:shadow-[0_0_25px_3px_rgba(99,102,241,0.4)] hover:rounded-3xl rounded-3xl '
                  : 'hover:-translate-y-1 hover:shadow-2xl hover:rounded-3xl'
              }`}
            >
              <Card data={card} />
            </div>
          ))}
        </div>

        <div
          ref={contentRef}
          className={`portal-content-wrapper mt-6 sm:mt-8 lg:mt-12 ${activeCard ? 'open' : ''}`}
        >
          {activeCard && (
            <div className="portal-content-container fade-in bg-slate-50 dark:bg-slate-900 rounded-xl sm:rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col">
              <header className="p-3 sm:p-4 md:p-6 flex-shrink-0 flex justify-between items-center border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                <h2 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200">
                  {activeCard.badgeText}
                </h2>
                <button 
                  onClick={handleCloseContent} 
                  className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                  aria-label="Close"
                >
                  <XIcon />
                </button>
              </header>
              <div className="flex-grow overflow-y-auto">
                <Suspense fallback={<LoadingFallback />}>
                  <PortalContent card={activeCard} />
                </Suspense>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CardsComponent;

