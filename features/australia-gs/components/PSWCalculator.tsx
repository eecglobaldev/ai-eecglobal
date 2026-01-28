import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CITIES_DATA } from '../data/australiaData';

// --- ICONS ---
const SearchIcon = ({ className = '' }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>;
const ChevronDownIcon = ({ className = '' }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6" /></svg>;


const CityCard: React.FC<{ city: typeof CITIES_DATA[0] }> = ({ city }) => {
    const [isOpen, setIsOpen] = useState(false);

    const bonusLabel = {
        0: 'No Bonus',
        1: '+1 Bonus Year',
        2: '+2 Bonus Years'
    }[city.bonus];

    const bonusColor = {
        0: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
        1: 'bg-blue-100 text-blue-800 dark:bg-blue-900/70 dark:text-blue-200',
        2: 'bg-green-100 text-green-800 dark:bg-green-900/70 dark:text-green-200'
    }[city.bonus];

    return (
        <details onToggle={(e) => setIsOpen((e.currentTarget as HTMLDetailsElement).open)} className="bg-white dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 transition-shadow hover:shadow-md">
            <summary className="p-3 list-none cursor-pointer flex justify-between items-center">
                <div>
                    <h5 className="font-bold text-slate-800 dark:text-slate-200">{city.city}</h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{city.state}</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${bonusColor}`}>{bonusLabel}</span>
                    <ChevronDownIcon className={`dark:text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </summary>
            <div className="px-3 pb-3 border-t border-slate-200 dark:border-slate-700">
                <ul className="mt-2 space-y-2">
                    {city.unis.map(uni => (
                        <li key={uni.name} className="text-sm text-slate-600 dark:text-slate-400">
                            <span className="font-semibold text-slate-700 dark:text-slate-300">{uni.name}</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {uni.tags.map(tag => (
                                    <span key={tag} className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">{tag}</span>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </details>
    );
};

const qualifications = [
    { val: 1.5, label: "Diploma / VET" },
    { val: 2, label: "Bachelor's Degree" },
    { val: 3, label: "Bachelor's (1st Class Hons, STEM/ICT)" },
    { val: 3, label: "Master's Degree" },
    { val: 4, label: "Doctoral Degree (PhD)" }
];

export const PSWCalculator: React.FC = () => {
    const [selectedQualLabel, setSelectedQualLabel] = useState("Bachelor's Degree");
    const [locationCategory, setLocationCategory] = useState(2);
    const [searchTerm, setSearchTerm] = useState('');

    const { base, bonus, total } = useMemo(() => {
        const selectedQual = qualifications.find(q => q.label === selectedQualLabel);
        const baseYears = selectedQual ? selectedQual.val : 0;
        const bonusYears = locationCategory === 1 ? 0 : locationCategory === 2 ? 1 : 2;
        return { base: baseYears, bonus: bonusYears, total: baseYears + bonusYears };
    }, [selectedQualLabel, locationCategory]);

    const filteredCities = useMemo(() => {
        return CITIES_DATA.filter(city => {
            const matchesCategory = city.category === locationCategory;
            const matchesSearch = !searchTerm || city.city.toLowerCase().includes(searchTerm.toLowerCase()) || city.unis.some(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [locationCategory, searchTerm]);

    return (
        <div id="psw-calculator">
            <div className="text-center text-xs font-semibold text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/40 p-3 rounded-md mb-6 border border-blue-200 dark:border-blue-800/50">
                The following calculations are based on the special provisions for Indian nationals under the Australia-India ECTA agreement.
            </div>
            <p className="text-base text-center text-slate-600 dark:text-slate-400 mb-8">
                Estimate your Temporary Graduate visa (subclass 485) duration based on your degree and where you study in Australia.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                {/* Step 1 */}
                <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200"><span className="text-sm font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-200 mr-2">1</span>Select Your Qualification</h4>
                    <div className="mt-3 space-y-2">
                        {qualifications.map(d => (
                            <button key={d.label} onClick={() => setSelectedQualLabel(d.label)} className={`w-full p-3 rounded-lg border-2 text-left transition-colors ${selectedQualLabel === d.label ? 'bg-white dark:bg-slate-700 border-orange-500' : 'bg-slate-100 dark:bg-slate-700/50 border-transparent hover:border-slate-300 dark:hover:border-slate-600'}`}>
                                <span className="font-semibold text-slate-800 dark:text-slate-200">{d.label}</span>
                                <span className="text-xs block text-slate-500 dark:text-slate-300">
                                    {d.val > 0 ? `${d.val} Base Years` : 'Not Eligible for PSW'}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
                {/* Step 2 */}
                <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200"><span className="text-sm font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-200 mr-2">2</span>Select Study Location</h4>
                    <div className="mt-3 space-y-2">
                        {[{ val: 1, label: "Major City", bonus: 0, cities: "Sydney, Melbourne, Brisbane" }, { val: 2, label: "Regional Centre", bonus: 1, cities: "Perth, Adelaide, Gold Coast, etc." }, { val: 3, label: "Designated Regional Area", bonus: 2, cities: "Darwin, Townsville, etc." }].map(l => (
                            <button key={l.val} onClick={() => setLocationCategory(l.val)} className={`w-full p-3 rounded-lg border-2 text-left transition-colors ${locationCategory === l.val ? 'bg-white dark:bg-slate-700 border-orange-500' : 'bg-slate-100 dark:bg-slate-700/50 border-transparent hover:border-slate-300 dark:hover:border-slate-600'}`}>
                                <span className="font-semibold text-slate-800 dark:text-slate-200">{l.label}</span>
                                <span className="text-xs block text-slate-500 dark:text-slate-300">+{l.bonus} Bonus Year{l.bonus !== 1 ? 's' : ''} ({l.cities})</span>
                            </button>
                        ))}
                    </div>
                </div>
                {/* Step 3 */}
                <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-center"><span className="text-sm font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-200 mr-2"></span>Your Estimated Rights</h4>
                    <motion.div key={total} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="text-6xl font-extrabold text-orange-600 dark:text-orange-400 my-2">{total}</motion.div>
                    <p className="text-2xl font-bold text-slate-700 dark:text-slate-300">Years</p>
                    {base > 0 && <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">({base} Base Years (AI-ECTA) + {bonus} Bonus Year{bonus !== 1 ? 's' : ''})</p>}
                    {base === 0 && (
                        <div className="text-center mt-2 p-2 bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300 rounded-lg text-xs font-semibold">
                            This qualification is generally not eligible for Post-Study Work rights.
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-8">
                <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200 text-center mb-4">Cities & Universities in Your Selected Location Category</h4>
                <div className="relative max-w-md mx-auto mb-4">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><SearchIcon /></div>
                    <input type="text" placeholder="Search city or university..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white dark:bg-slate-700 text-sm" />
                </div>
                <AnimatePresence>
                    <motion.div layout className="space-y-2 max-w-md mx-auto">
                        {filteredCities.length > 0 ? filteredCities.map(city => (
                            <CityCard key={city.city} city={city} />
                        )) : <p className="text-center text-sm text-slate-500 dark:text-slate-400 py-4">No locations match your search.</p>}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};