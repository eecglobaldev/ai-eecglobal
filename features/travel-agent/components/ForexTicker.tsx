
import React, { useEffect, useState, memo } from 'react';
import Flag from 'react-flagkit';

interface Rate {
  code: string;
  name: string;
  countryCode: string;
  symbol: string;
  rate: number;
  change: number;
}

// Removed JPY and THB as per previous request
const TARGET_CURRENCIES = [
  { code: 'USD', name: 'US Dollar', countryCode: 'US', symbol: '$' },
  { code: 'EUR', name: 'Euro', countryCode: 'EU', symbol: '€' },
  { code: 'GBP', name: 'British Pound', countryCode: 'GB', symbol: '£' },
  { code: 'CHF', name: 'Swiss Franc', countryCode: 'CH', symbol: 'Fr' },
  { code: 'CAD', name: 'Canadian Dollar', countryCode: 'CA', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', countryCode: 'AU', symbol: 'A$' },
  { code: 'AED', name: 'UAE Dirham', countryCode: 'AE', symbol: 'dh' },
  { code: 'NZD', name: 'NZ Dollar', countryCode: 'NZ', symbol: 'NZ$' },
  { code: 'SGD', name: 'Singapore Dollar', countryCode: 'SG', symbol: 'S$' },
];

const TickerItem = memo(({ item }: { item: Rate }) => {
  const [highlight, setHighlight] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    // Trigger highlight animation when rate changes
    if (item.change > 0) setHighlight('up');
    else setHighlight('down');

    const timer = setTimeout(() => setHighlight(null), 1000);
    return () => clearTimeout(timer);
  }, [item.rate]);

  const isValidRate = !isNaN(item.rate) && isFinite(item.rate) && item.rate > 0;

  return (
    <div className="inline-flex items-center gap-3 px-6 border-r border-slate-200/70 dark:border-white/10 min-w-max group cursor-default transition-colors hover:bg-slate-100/60 dark:hover:bg-white/5 py-3 relative h-14 box-border">
      <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
        highlight === 'up' ? 'bg-emerald-500/10 opacity-100' : 
        highlight === 'down' ? 'bg-rose-500/10 opacity-100' : 'opacity-0'
      }`} />

      <div className="filter drop-shadow-md transform group-hover:scale-110 transition-transform duration-300 grayscale-[10%] group-hover:grayscale-0 rounded overflow-hidden">
        <Flag country={item.countryCode} size={24} />
      </div>
      
      <div className="flex flex-col justify-center h-full">
        <div className="flex items-center gap-2">
           <span className="font-bold text-xs text-slate-900 dark:text-white tracking-wide">
             {item.code}
           </span>
           <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase hidden sm:inline-block tracking-wider opacity-80">
             {item.name}
           </span>
        </div>
        
        <div className="flex items-baseline gap-1.5">
           <span className="text-xs text-amber-500 dark:text-amber-400 font-bold">
             {item.symbol}
           </span>
           <span
             className={`font-mono font-bold text-sm transition-colors duration-300 ${
               highlight === 'up'
                 ? 'text-emerald-600 dark:text-emerald-400'
                 : highlight === 'down'
                 ? 'text-rose-600 dark:text-rose-400'
                 : 'text-slate-900 dark:text-white'
             }`}
           >
              {isValidRate ? item.rate.toFixed(2) : '--.--'}
           </span>
           <span
             className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md flex items-center ml-1 ${
               item.change >= 0
                 ? 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300'
                 : 'bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300'
             }`}
           >
              {item.change >= 0 ? '▲' : '▼'} {Math.abs(item.change).toFixed(2)}%
           </span>
        </div>
      </div>
    </div>
  );
});

const ForexTicker: React.FC = () => {
  const [rates, setRates] = useState<Rate[]>([]);
  const [loading, setLoading] = useState(true);

  // Initial Fetch
  useEffect(() => {
    let isMounted = true;
    
    const fetchRates = async () => {
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/INR');
        const data = await response.json();
        
        if (data && data.rates && isMounted) {
          const processedRates = TARGET_CURRENCIES.map(curr => {
            const rawRate = data.rates[curr.code];
            // Safety check for undefined rates or division by zero/undefined
            if (!rawRate) return null;

            const inrValue = 1 / rawRate;
            // Initial random change for display
            const simulatedChange = (Math.random() * 0.8) * (Math.random() > 0.5 ? 1 : -1);

            return {
              ...curr,
              rate: inrValue,
              change: simulatedChange
            };
          }).filter((item): item is Rate => item !== null);

          setRates(processedRates);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
            console.error("Failed to fetch forex rates", error);
            setLoading(false);
        }
      }
    };

    fetchRates();

    return () => { isMounted = false; };
  }, []);

  // Live Jitter Effect
  useEffect(() => {
    if (loading || rates.length === 0) return;

    const interval = setInterval(() => {
       setRates(current => {
          if (current.length === 0) return current;
          const next = [...current];
          const idx = Math.floor(Math.random() * next.length);
          const item = next[idx];
          
          const jitter = (Math.random() * 0.05) * (Math.random() > 0.5 ? 1 : -1);
          let newRate = item.rate + jitter;
          if(newRate < 0) newRate = item.rate;

          const changeDelta = (jitter / item.rate) * 100;
          const newChange = item.change + changeDelta;

          next[idx] = { ...item, rate: newRate, change: newChange };
          return next;
       });
    }, 2000);

    return () => clearInterval(interval);
  }, [loading, rates.length]);

  // Loading Skeleton State
  if (loading) {
    return (
      <div className="w-full bg-slate-50 dark:bg-[#0B1120] border-b border-slate-200 dark:border-white/10 h-14 relative overflow-hidden flex items-center shadow-lg z-40 box-border select-none">
         {/* Static Label Placeholder - Exact Dimensions */}
         <div className="absolute left-0 top-0 bottom-0 bg-slate-50 dark:bg-[#0B1120] z-50 px-5 flex items-center gap-3 border-r border-slate-200 dark:border-white/10 h-14 min-w-[130px]">
            <div className="relative flex h-3 w-3 flex-shrink-0">
                <span className="bg-emerald-500/20 h-full w-full rounded-full animate-pulse"></span>
            </div>
             <div className="flex flex-col gap-1.5 w-full">
                <div className="h-2 bg-slate-200 dark:bg-white/10 rounded w-10 animate-pulse"></div>
                <div className="h-2 bg-slate-200 dark:bg-white/10 rounded w-14 animate-pulse"></div>
            </div>
         </div>

         {/* Skeleton Content */}
         <div className="flex items-center w-full pl-[130px]">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="px-6 border-r border-slate-200/70 dark:border-white/5 h-14 flex items-center min-w-[180px]">
                   <div className="flex items-center gap-3 w-full">
                       <div className="w-6 h-6 bg-slate-200 dark:bg-white/5 rounded-full animate-pulse"></div>
                       <div className="flex flex-col gap-1.5 flex-1">
                           <div className="h-2 bg-slate-200 dark:bg-white/5 rounded w-8 animate-pulse"></div>
                           <div className="h-2 bg-slate-200 dark:bg-white/5 rounded w-16 animate-pulse"></div>
                       </div>
                   </div>
                </div>
            ))}
         </div>
      </div>
    );
  }

  // Duplicate items 4 times to ensure no gaps on 4k screens
  // We use 4 sets because we translate -25% to loop seamlessly (1/4 of total width)
  const displayItems = [...rates, ...rates, ...rates, ...rates];

  return (
    <div className="w-full bg-slate-50 dark:bg-[#0B1120] border-b border-slate-200 dark:border-white/10 h-14 overflow-hidden relative z-40 shadow-lg flex select-none box-border transform-gpu">
      
      {/* Static Label - Always on top */}
      <div className="absolute left-0 top-0 bottom-0 bg-slate-50 dark:bg-[#0B1120] z-50 px-5 flex items-center gap-3 shadow-[10px_0_20px_rgba(15,23,42,0.25)] dark:shadow-[10px_0_20px_rgba(0,0,0,0.8)] border-r border-slate-200 dark:border-white/10 h-14 min-w-[130px]">
        <div className="relative flex h-3 w-3 flex-shrink-0">
           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/70 opacity-75"></span>
           <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
        </div>
        <div className="flex flex-col leading-none">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-emerald-500 dark:text-emerald-400 mb-0.5">
              Live
            </span>
            <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
              MARKET
            </span>
        </div>
      </div>

      {/* Ticker Container - No Left Padding to avoid jump */}
      <div className="flex items-center animate-ticker whitespace-nowrap will-change-transform hover:pause-animation">
        {displayItems.map((item, idx) => (
           <TickerItem key={`${item.code}-${idx}`} item={item} />
        ))}
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); } /* Move 1 set out of 4 */
        }
        .animate-ticker {
          animation: ticker 80s linear infinite;
        }
        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default ForexTicker;
