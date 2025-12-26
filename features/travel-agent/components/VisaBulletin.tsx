import React, { useEffect, useState } from 'react';
import { generateVisaBulletin, VisaBulletinData } from '../services/gemini';
import { ShieldIcon, FileTextIcon, UserIcon, AlertCircleIcon, LockIcon } from './Icons';

interface VisaBulletinProps {
    destination: string;
    visaType: string;
}

export const VisaBulletin: React.FC<VisaBulletinProps> = ({ destination, visaType }) => {
    const [data, setData] = useState<VisaBulletinData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchBulletin = async () => {
            setLoading(true);
            try {
                const result = await generateVisaBulletin(destination, visaType);
                if (isMounted) setData(result);
            } catch (err) {
                console.error(err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetchBulletin();
        return () => { isMounted = false; };
    }, [destination, visaType]);

    if (loading) return (
        <div className="w-full max-w-4xl mx-auto mt-8 p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 animate-pulse flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-4 border-slate-300 dark:border-slate-700 border-t-violet-600 rounded-full animate-spin mb-3"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Retrieving Consular Directives...</span>
        </div>
    );

    if (!data) return null;

    const getRiskColor = (level: string) => {
        if (level === 'High') return 'text-rose-600 bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800';
        if (level === 'Medium') return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
        return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800';
    };

    return (
        <div className="w-full max-w-4xl mx-auto mt-8 relative">
            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 bg-white dark:bg-slate-900 rounded-[24px] shadow-xl transform rotate-1 border border-slate-200 dark:border-slate-800 z-0"></div>
            
            <div className="relative z-10 bg-white dark:bg-slate-950 rounded-[24px] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                
                {/* Header: Official Memorandum Style */}
                <div className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-200 dark:bg-slate-800 rounded-lg">
                            <LockIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">Official Visa Bulletin</h3>
                            <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400">REF: {data.bulletinId} • AUTH: EEC-GLOBAL</p>
                        </div>
                    </div>
                    <div className={`px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${getRiskColor(data.riskLevel)}`}>
                        <AlertCircleIcon className="w-3.5 h-3.5" />
                        Risk Assessment: {data.riskLevel}
                    </div>
                </div>

                {/* Content Grid */}
                <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
                    
                    {/* Consular Psychology */}
                    <article>
                        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-3">
                            <UserIcon className="w-4 h-4" /> Consular Psychology
                        </h4>
                        <p className="font-serif text-lg leading-relaxed text-slate-800 dark:text-slate-200 italic">
                            "{data.consularPsychology}"
                        </p>
                    </article>

                    {/* Economic Ties */}
                    <article>
                        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3">
                            <ShieldIcon className="w-4 h-4" /> Strong Ties Analysis
                        </h4>
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 font-medium text-justify">
                            {data.economicTiesAnalysis}
                        </p>
                    </article>

                    {/* Document Forensics - Handles Both Object and String */}
                    <article className="md:col-span-2 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-100 dark:border-slate-800">
                        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-3">
                            <FileTextIcon className="w-4 h-4" /> Forensic Document Protocol
                        </h4>
                        {typeof data.documentForensics === 'string' ? (
                            <p className="text-sm text-slate-700 dark:text-slate-300 font-mono leading-relaxed">
                                {data.documentForensics}
                            </p>
                        ) : (
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <span className="text-[10px] font-bold uppercase text-slate-500">Target Document</span>
                                    <p className="font-bold text-slate-900 dark:text-slate-100">{data.documentForensics?.document}</p>
                                </div>
                                <div className="flex-[2] p-3 bg-rose-50 dark:bg-rose-900/20 rounded-lg border border-rose-100 dark:border-rose-800/30">
                                    <span className="text-[10px] font-bold uppercase text-rose-600 dark:text-rose-400">Forensic Red Flag</span>
                                    <p className="text-sm text-rose-800 dark:text-rose-200 font-medium italic">
                                        "{data.documentForensics?.forgeryErrorReason}"
                                    </p>
                                </div>
                            </div>
                        )}
                    </article>
                    
                    {/* Policy Footer */}
                    <div className="md:col-span-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wide">
                            Active Policy Directive ({new Date().getFullYear()}): <span className="text-slate-600 dark:text-slate-300 normal-case">{data.recentPolicyShift}</span>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};
