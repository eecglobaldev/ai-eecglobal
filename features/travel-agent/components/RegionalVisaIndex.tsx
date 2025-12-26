
import { useState } from 'react';
import { GlobeIcon, ChevronDownIcon, ChevronUpIcon } from './Icons';

export const RegionalVisaIndex = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const targetStates = ["Gujarat", "Maharashtra", "Punjab", "Delhi", "Telangana"];
  const targetCountries = ["United States", "Canada", "United Kingdom", "Australia", "Germany"];

  return (
    <div className=" pt-1 border-t border-slate-200/50 dark:border-slate-800/50">
      <div className="border border-slate-200/50 dark:border-slate-800/50 rounded-xl overflow-hidden bg-slate-50/50 dark:bg-slate-900/30">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
        >
           <div className="flex items-center gap-2">
              <GlobeIcon className="w-3.5 h-3.5 text-violet-500 opacity-70" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200">
                Regional Visa Requirements Index
              </span>
           </div>
           {isOpen ? (
             <ChevronUpIcon className="w-3 h-3 text-slate-400" />
           ) : (
             <ChevronDownIcon className="w-3 h-3 text-slate-400" />
           )}
        </button>
        
        {isOpen && (
           <div className="px-4 pb-6 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
               <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {targetStates.map((state) => (
                     <div key={state} className="space-y-2">
                        <h4 className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-600 mb-1 border-b border-slate-200 dark:border-slate-800 pb-1">{state}</h4>
                        <ul className="space-y-1">
                           {targetCountries.map((country) => (
                              <li key={`${state}-${country}`}>
                                 <a 
                                   href={`#/destination/${encodeURIComponent(country)}/type/Student/state/${encodeURIComponent(state)}`}
                                   className="text-[9px] text-slate-500 hover:text-violet-600 dark:text-slate-500 dark:hover:text-violet-400 transition-colors block py-0.5 truncate"
                                 >
                                    Student Visa: {country}
                                 </a>
                              </li>
                           ))}
                        </ul>
                     </div>
                  ))}
               </div>
           </div>
        )}
      </div>
    </div>
  );
};
