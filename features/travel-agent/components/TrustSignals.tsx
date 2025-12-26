import React from 'react';
import { ShieldIcon, UsersIcon, CheckIcon } from './Icons';

export const TrustSignals: React.FC = () => {
    return (
        <div className="w-full bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-3 overflow-hidden">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                
                {/* Simulated Live Ops Feed */}
                <div className="flex items-center gap-6 overflow-hidden w-full md:w-auto">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span>EEC Operations Center: <strong>Online</strong></span>
                    </div>
                    
                    <div className="hidden md:flex items-center gap-2 whitespace-nowrap">
                        <UsersIcon className="w-3.5 h-3.5" />
                        <span>Active Counsellors: <strong>42</strong></span>
                    </div>

                    <div className="hidden md:flex items-center gap-2 whitespace-nowrap">
                        <CheckIcon className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Data Last Synced: <strong>Just now</strong></span>
                    </div>
                </div>

                {/* Verification Badge */}
                <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
                    <ShieldIcon className="w-3.5 h-3.5 text-violet-600" />
                    <span>Verified by <strong>Enbee Education Center</strong> (Lic. #GJ-1997-REG)</span>
                </div>
            </div>
        </div>
    );
};