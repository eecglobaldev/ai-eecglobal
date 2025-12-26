import React, { useState, useMemo } from 'react';
import { BANK_DATA } from '../data/australiaData';

const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;

export const ApprovedBanksGuide: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const groupedAndFilteredBanks = useMemo(() => {
        const filtered = BANK_DATA.filter(bank => 
            bank.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return filtered.reduce((acc, bank) => {
            const type = bank.type.split(' (')[0]; // Handle '(Merged into SBI)'
            if (!acc[type]) {
                acc[type] = [];
            }
            acc[type].push(bank);
            return acc;
        }, {} as Record<string, typeof BANK_DATA>);

    }, [searchTerm]);

    const typeOrder = ['Public Sector Bank', 'Nationalized Bank', 'Private Sector Bank', 'Foreign Bank'];
    const sortedTypes = Object.keys(groupedAndFilteredBanks).sort((a, b) => typeOrder.indexOf(a) - typeOrder.indexOf(b));

    return (
        <div className="py-8">
            <header className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-slate-500">Approved Banks Directory</h2>
                <p className="text-center text-lg text-slate-600 dark:text-slate-400 mt-2 max-w-2xl mx-auto">
                    A complete list of financial institutions accepted by Australia for student visa applications.
                </p>
            </header>

            <div className="max-w-3xl mx-auto">
                <div className="relative mb-8">
                    <div className="absolute inset-y-0 left-0 pl-3 dark:text-white flex items-center pointer-events-none">
                        <SearchIcon />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for a bank..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 dark:text-white border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-brand dark:focus:ring-brand-light bg-white dark:bg-slate-700"
                    />
                </div>

                {sortedTypes.length > 0 ? (
                    <div className="space-y-6">
                        {sortedTypes.map(type => (
                            <div key={type}>
                                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2 mb-3">{type}s</h3>
                                <ul className="space-y-2">
                                    {groupedAndFilteredBanks[type].map(bank => (
                                        <li key={bank.name} className="p-3 bg-white dark:bg-slate-800/60 rounded-md border border-slate-200 dark:border-slate-700">
                                            <p className="font-semibold text-sm text-slate-700 dark:text-slate-300">{bank.name}</p>
                                            {bank.type.includes('Merged') && (
                                                <p className="text-xs text-slate-500 dark:text-slate-400">{bank.type.split(' (')[1].replace(')', '')}</p>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-slate-500 dark:text-slate-400">No banks found matching your search.</p>
                )}
            </div>
        </div>
    );
};